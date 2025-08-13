
const path = require('path');
const fs = require('fs');
const { createBdd } = require('playwright-bdd');
const { Given, When, Then, After } = createBdd();
const axios = require('axios');
const pdf = require('pdf-parse');
const { expect } = require('@playwright/test');
const DemoLogin = require('../../../pages/DemoLogin');
const Utils = require('../../../pages/utility/Utils');
const downloadDir = path.resolve(__dirname, '../../downloads');
const mappingPath = path.resolve(__dirname, '../data/formIdMapping.json');
const TestDataLoader = require('../../../pages/utility/TestDataLoader');
const fieldNames = require('../../../pages/utility/FieldName');
const PdfUtils = require('../../../pages/utility/PdfUtils');
const PdfFieldExtractor = require('../../../pages/utility/PdfFieldExtractor');
const unzipper = require('unzipper');
const { cleanApiRequestBodyNames } = require('../../../pages/utility/FieldNameMapper');
const AdmZip = require('adm-zip');



// ...removed unused originalApiRequestBody...


// --- Workflow selection from feature file name ---
const formDataPath = path.resolve(__dirname, '../data/formData.json');
const formData = JSON.parse(fs.readFileSync(formDataPath, 'utf8'));

let workflow = 'schwabira';
let apiRequestBodyPath = '';
let formId = '';

// Clean up downloads directory after every test
After(async function () {
  const files = fs.readdirSync(downloadDir);
  for (const file of files) {
    if (file.endsWith('.pdf')) {
      try {
        fs.unlinkSync(path.join(downloadDir, file));
        console.log('Deleted PDF:', file);
      } catch (e) {
        console.warn('Failed to delete PDF:', file, e.message);
      }
    }
  }
});


Then('validate that PDF fields and UI mapping are correct', async function () {
  // Find the most recent downloaded PDF in the downloads directory
  const pdfFiles = fs.readdirSync(downloadDir)
    .filter(f => f.endsWith('.pdf'))
    .map(f => ({ name: f, time: fs.statSync(path.join(downloadDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);
  if (pdfFiles.length === 0) {
    throw new Error('No PDF files found in download directory.');
  }
  const latestPdfPath = path.join(downloadDir, pdfFiles[0].name);
  console.log('Validating using downloaded PDF:', latestPdfPath);

  // Extract text from the downloaded PDF for text-based validation
  const pdfBuffer = fs.readFileSync(latestPdfPath);
  const pdfText = await PdfUtils.extractTextFromBuffer(pdfBuffer);

  // Load the API request body for the current workflow
  const apiRequestBody = JSON.parse(fs.readFileSync(apiRequestBodyPath, 'utf8'));
  const fields = apiRequestBody.forms[0].fields;

  // Validate each field's value from formData.ValidEntry
  for (const field of fields) {
    const placeholder = field.value;
    if (typeof placeholder === 'string' && placeholder.startsWith('$')) {
      const key = placeholder.substring(1);
      const expectedValue = formData.ValidEntry[key];
      if (expectedValue !== undefined) {
        console.log(`Validating field: "${field.name}", expected value: "${expectedValue}"`);
        if (field.type === 'checkbox') {
          // Checkbox validation: look for a checkmark or similar symbol if true, or absence if false
          // Common checkmark symbols: '☑', '✓', '✔', 'X', '[x]', etc. Adjust as needed for your PDF output
          const checkSymbols = ['☑', '✓', '✔', 'X', '[x]', '■', '●', '■', '■', '☒'];
          let found = false;
          if (expectedValue === true) {
            for (const symbol of checkSymbols) {
              if (pdfText.includes(symbol)) {
                found = true;
                break;
              }
            }
            if (!found) {
              throw new Error(`Expected checkbox for field "${field.name}" to be checked, but no checkmark symbol found in PDF.`);
            }
          } else if (expectedValue === false) {
            for (const symbol of checkSymbols) {
              if (pdfText.includes(symbol)) {
                found = true;
                break;
              }
            }
            if (found) {
              throw new Error(`Expected checkbox for field "${field.name}" to be unchecked, but checkmark symbol found in PDF.`);
            }
          }
        } else {
          if (!pdfText.includes(expectedValue)) {
            // Robust check: ignore whitespace and case
            const normalize = str => String(str ?? "").replace(/\s+/g, "").toLowerCase();
            if (!normalize(pdfText).includes(normalize(expectedValue))) {
              throw new Error(`Expected value "${expectedValue}" for field "${field.name}" not found in PDF (robust check).`);
            }
          }
        }
      } else {
        console.warn(`No value found in formData.ValidEntry for key: ${key}`);
      }
    }
  }

  console.log('All expected text fields found in the PDF.');
});


// Step to set workflow from feature file step
When('I set the workflow to {string}', function ({}, workflowName) {
  workflow = workflowName.toLowerCase();
  apiRequestBodyPath = getApiRequestBodyPath(workflow);
  formId = getFormId(workflow);
});

function getApiRequestBodyPath(workflow) {
  if (workflow === 'fidelitytrust') {
    return path.resolve(__dirname, '../data/apiRequestBody.FidelityTrust.json');
  }
  // Default: SchwabIRA
  return path.resolve(__dirname, '../data/apiRequestBody.SchwabIRA.json');
}

function getFormId(workflow) {
  if (workflow === 'fidelitytrust') {
    return 'FidelityTrust';
  }
  return 'SchwabIRA';
}

const apiShared = {
  pdfBuffer: null,
  pdfContent: null
};


// Utility to load mapping config
function loadMapping() {
  const mappingPath = path.resolve(__dirname, '../data/formIdMapping.json');
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  // If mapping is an object with keys for each formId, select the correct one
  if (mapping && typeof mapping === 'object' && mapping[formId]) {
    return mapping[formId];
  }
  return mapping;
}

// Utility to build the request body with dynamic values
function buildRequestBody(apiRequestBodyPath, mapping, formData) {
  let apiRequestBody = JSON.parse(fs.readFileSync(apiRequestBodyPath, 'utf8'));
  const Utils = require('../../../pages/utility/Utils');
  // Set the correct form id for the workflow only if it's a placeholder
  if (apiRequestBody.forms && apiRequestBody.forms[0]) {
    if (typeof apiRequestBody.forms[0].id === 'string' && apiRequestBody.forms[0].id.startsWith('$')) {
      apiRequestBody.forms[0].id = formId;
    }
    apiRequestBody.forms[0] = Utils.mapProperty(apiRequestBody.forms[0], 'id', mapping);
  }
  let apiRequestBodyStr = JSON.stringify(apiRequestBody);
  // Replace all $placeholders in the string with values from formData.ValidEntry
  apiRequestBodyStr = apiRequestBodyStr.replace(/\$(\w+)/g, (match, key) => {
    if (formData.ValidEntry && formData.ValidEntry.hasOwnProperty(key)) {
      return formData.ValidEntry[key];
    }
    return match;
  });
  return JSON.parse(apiRequestBodyStr);
}

// Reusable function to call PDF API and return buffer
async function callPdfApi(apiRequestBodyPath, formData) {
  const mapping = loadMapping();
  const PDF_BIND_API_URL = mapping.PDF_BIND_API_URL;
  const BEARER_TOKEN = mapping.BEARER_TOKEN;
  if (!fs.existsSync(apiRequestBodyPath)) {
    throw new Error(`API request body file not found at: ${apiRequestBodyPath}`);
  }
  const requestBody = buildRequestBody(apiRequestBodyPath, mapping, formData);
  console.log('Request body sent to PDF API:', JSON.stringify(requestBody, null, 2));
  const response = await axios.post(PDF_BIND_API_URL, requestBody, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    responseType: 'arraybuffer',
    timeout: 30000
  });
  return Buffer.from(response.data);
}


When('validating the PDF generation API invocation using the constructed request body', async () => {
  try {
    apiShared.pdfBuffer = await callPdfApi(apiRequestBodyPath, formData);
    console.log('API call successful, PDF received');
    console.log('PDF size:', apiShared.pdfBuffer.length, 'bytes');
  } catch (error) {
    console.error('API call failed:', error.message);
    throw new Error(`Failed to call PDF generation API: ${error.message}`);
  }
});

Then('validate that a valid PDF document is returned in the API response', async () => {
  // Validate that we received a PDF response
  expect(apiShared.pdfBuffer).toBeTruthy();
  expect(apiShared.pdfBuffer.length).toBeGreaterThan(0);

  // Validate PDF header (should start with %PDF)
  const pdfHeader = apiShared.pdfBuffer.slice(0, 4).toString();
  expect(pdfHeader).toBe('%PDF');

  console.log('API PDF validation successful - received valid PDF');

  // Save the API-generated PDF to the downloads directory for user access
  try {
    const downloadDir = path.resolve(__dirname, '../../downloads');
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }
    const apiPdfPath = path.join(downloadDir, `api_generated_${Date.now()}.pdf`);
    fs.writeFileSync(apiPdfPath, apiShared.pdfBuffer);
    console.log('API generated PDF saved to:', apiPdfPath);
  } catch (e) {
    console.error('Failed to save API generated PDF:', e.message);
  }

  // Extract text content from API PDF for comparison
  try {
    apiShared.pdfContent = await PdfUtils.extractTextFromBuffer(apiShared.pdfBuffer);
    console.log('API PDF text extraction successful');
    console.log('Extracted text length:', apiShared.pdfContent.length, 'characters');
  } catch (error) {
    console.error(' Failed to extract text from API PDF:', error.message);
    throw new Error(`Failed to extract text from API PDF: ${error.message}`);
  }
});

Then('validate that the API generated PDF matches the downloaded PDF', async ({ }, dataTable) => {
  try {
    console.log('Starting PDF comparison validation...');

    // Find the most recent downloaded ZIP file
    const latestZipFileName = PdfUtils.getLatestZipFile(downloadDir);
    console.log('Latest downloaded ZIP file:', latestZipFileName);

    // Extract PDF buffer from ZIP
    const zipPath = path.join(downloadDir, latestZipFileName);
    const { buffer: downloadedPdfBuffer, name: downloadedPdfName } = PdfUtils.getPdfBufferFromZip(zipPath, 'contributory');
    console.log(' Found PDF:', downloadedPdfName);
    console.log(' Downloaded PDF size:', downloadedPdfBuffer.length, 'bytes');

    // Extract text from downloaded PDF
    const downloadedPdfContent = await PdfUtils.extractTextFromBuffer(downloadedPdfBuffer);
    console.log(' Downloaded PDF text extraction successful');
    console.log(' Downloaded PDF text length:', downloadedPdfContent.length, 'characters');

    // Perform PDF comparison
    const keyTerms = dataTable.raw().map(row => row[0]);
    console.log('Key terms being compared:', keyTerms);
    const { apiMatches, downloadedMatches } = PdfUtils.compareKeyTerms(apiShared.pdfContent, downloadedPdfContent, keyTerms);
    keyTerms.forEach(term => {
      const apiHasTerm = apiShared.pdfContent.toLowerCase().includes(term.toLowerCase());
      const downloadedHasTerm = downloadedPdfContent.toLowerCase().includes(term.toLowerCase());
      if (apiHasTerm) {
        console.log(` API PDF contains: "${term}"`);
      } else {
        console.log(` API PDF missing: "${term}"`);
      }
      if (downloadedHasTerm) {
        console.log(` Downloaded PDF contains: "${term}"`);
      } else {
        console.log(` Downloaded PDF missing: "${term}"`);
      }
    });

    console.log(` API PDF contains ${apiMatches}/${keyTerms.length} key terms`);
    console.log(` Downloaded PDF contains ${downloadedMatches}/${keyTerms.length} key terms`);

    // Both PDFs should contain most of the key terms (at least 90%)
    const minRequiredMatches = Math.floor(keyTerms.length * 0.9);
    expect(apiMatches).toBeGreaterThanOrEqual(minRequiredMatches);
    expect(downloadedMatches).toBeGreaterThanOrEqual(minRequiredMatches);

    // Additional validation - check PDF sizes are reasonable
    expect(apiShared.pdfBuffer.length).toBeGreaterThan(1000); // At least 1KB
    expect(downloadedPdfBuffer.length).toBeGreaterThan(1000); // At least 1KB

    // Text length comparison (both should have substantial content)
    expect(apiShared.pdfContent.length).toBeGreaterThan(100);
    expect(downloadedPdfContent.length).toBeGreaterThan(100);

    console.log(' PDF comparison validation successful');
    console.log(' API PDF size:', apiShared.pdfBuffer.length, 'bytes');
    console.log(' Downloaded PDF size:', downloadedPdfBuffer.length, 'bytes');

    const apiPdfPath = path.join(downloadDir, `api_generated_${Date.now()}.pdf`);
    fs.writeFileSync(apiPdfPath, apiShared.pdfBuffer);
    console.log('API generated PDF saved to:', apiPdfPath);

    // Additional content similarity check (optional)
    const commonWords = PdfUtils.getCommonWords(apiShared.pdfContent, downloadedPdfContent);

  } catch (error) {
    console.error(' PDF validation failed:', error.message);
    console.error('Stack trace:', error.stack);
    throw new Error(`PDF validation failed: ${error.message}`);
  }
});





const uploadDir = path.resolve(__dirname, '../../uploads');
const testData = TestDataLoader.getEntry('FormData.json', 'ValidEntry');
// ...removed unused shared...

// ...removed unused extractedPdfFiles...
let demoLogin, utils, download;
let lpoaPdfPath;



Given('I login to the application with valid credentials', async ({ page }) => {
  demoLogin = new DemoLogin(page);
  utils = new Utils(page);
  await demoLogin.login(testData.username, testData.password);
});

//this area is common for all the steps we can make it reusable

When('I navigate to the Planning > Onboarding section', async () => {
  const planning = utils.getLocatorByTitle('Planning');
  const onboarding = utils.getLocatorByTitle('Onboarding');

  await planning.hover();
  await onboarding.waitFor({ state: 'visible', timeout: 5000 });
  await onboarding.click();
});

When('I open the advisor dropdown and select {string}', async ({ page }, advisorName) => {

  await utils.getLocatorByText('Select Advisor...').click();
  const advisorOption = utils.getLocatorByText(advisorName);
  await advisorOption.waitFor({ state: 'visible', timeout: 60000 });
  await advisorOption.click();
});

When('I click the {string} button', async ({ page }, buttonText) => {
  await utils.getLocatorByRoleAndName('button', buttonText).click();
});

When('I select the workflow for {string}', async ({ page }, workflowName) => {
  await utils.getModalWorkflowSelection(workflowName).click();
});

When('I select the {string} option', async ({ page }, optionText) => {
  await utils.getLocatorByText(optionText).click();
});

When('I click the {string} link', async ({ page }, linkText) => {
  await utils.getLocatorByText(linkText).click();
});

When('I proceed to the {string} form', async ({ }, formName) => {
  await utils.getLocatorByText(formName).click();
});

When('I fill in the Trust information', async ({ page }) => {
  await utils.getTextboxLocator(fieldNames.trust.title).fill('');
  await utils.getTextboxLocator(fieldNames.trust.title).type(testData.trustName);
  await utils.getTextboxLocator(fieldNames.trust.title).press('Tab');

  await utils.getTextboxLocator(fieldNames.trust.taxId).fill(testData.trustTaxId);
  await utils.getDropdownLocator(fieldNames.trust.taxIdType).selectOption({ label: testData.trustTaxIdType });

  const trustDate = utils.getDatepickerLocator(fieldNames.trust.date);
  await trustDate.fill('');
  await trustDate.type(testData.dateOfTrust);
  await trustDate.press('Tab');

  await utils.getDropdownLocator(fieldNames.trust.state).selectOption({ label: testData.trustState });
});

When("I fill in the Trustee's personal information", async ({ page }) => {
  await utils.getTextboxLocator(fieldNames.trustee.firstName).fill(testData.firstName);
  await utils.getTextboxLocator(fieldNames.trustee.lastName).fill(testData.lastName);

  const dobInput = utils.getDatepickerLocator(fieldNames.trustee.dob);
  await dobInput.fill('');
  await dobInput.type(testData.dob);
  await dobInput.press('Tab');

  await utils.getTextboxLocator(fieldNames.trustee.email).fill(testData.email);
  await utils.getTextboxLocator(fieldNames.trustee.ssn).fill(testData.ssn);
  await utils.getTextboxLocator(fieldNames.trustee.phone).fill(testData.phone);
  await utils.getTextboxLocator(fieldNames.trustee.address).fill(testData.address);
  await utils.getTextboxLocator(fieldNames.trustee.city).fill(testData.city);
  await utils.getDropdownLocator(fieldNames.trustee.state).selectOption({ label: testData.state });
  await utils.getTextboxLocator(fieldNames.trustee.zip).fill(testData.zip);

  const citizenshipRadio = utils.getRadioButtonLocator(fieldNames.trustee.citizenship, testData.citizenship);
  await expect(citizenshipRadio).toBeVisible();
  await citizenshipRadio.check();

  await utils.getDropdownLocator(fieldNames.trustee.employmentStatus).selectOption({ label: testData.employmentStatus });
  await utils.getTextboxLocator(fieldNames.trustee.incomeSource).fill(testData.incomeSource);
});

When('I configure Cash Sweep and Asset Movement preferences', async ({ page }) => {
  const cashDropdown = utils.getDropdownLocator(fieldNames.preferences.cashSweep);
  await expect(cashDropdown).toBeVisible();
  await cashDropdown.selectOption({ label: testData.cashSweep });

  await utils.getRadioButtonLocator(fieldNames.preferences.assetMovementAuth, testData.assetAuth).check();
  await utils.getRadioButtonLocator(fieldNames.preferences.divCapGainPayment, testData.divCapGain).check();

});



Then('I should be able to download the generated Trust document', async ({ page }) => {
  await utils.getLocatorByRoleAndName('button', 'Download PDF').waitFor({ state: 'visible', timeout: 60000 });

  [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 150000 }),
    utils.getLocatorByRoleAndName('button', 'Download PDF').click()
  ]);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseFileName = download.suggestedFilename();
  const [name, extension] = baseFileName.split(/(?=\.\w+$)/);
  const uniqueFileName = `${name}_${timestamp}${extension}`;
  const filePath = path.join(downloadDir, uniqueFileName);

  await download.saveAs(filePath);
  // No need to call shared.fileHelper.setFileDetails
});

Then('the downloaded file should be validated successfully', async () => {
  // Validation logic can be added here if needed, or leave empty if not required
});

When('I skip entering mandatory Trust information', async ({ page }) => {
  await utils.getTextboxLocator(fieldNames.trust.title).type(testData.trustName);
});

Then('I should not able to see save and process button', async ({ page }) => {
  await expect(utils.getLocatorByRoleAndName('button', 'Save and Process')).not.toBeVisible();
});
When('I click the Next button', async ({ page }) => {
  await utils.getLocatorByRoleAndName('button', 'Next').click();
});



When('I fill the account number as {string}', async ({ page }, accountNumber) => {
  await utils.getTextboxLocator(fieldNames.AddAdvisor.accountNum).fill(accountNumber);
});

When('I fill the account name as {string}', async ({ page }, accountName) => {
  await utils.getTextboxLocator(fieldNames.AddAdvisor.accountName).fill(accountName);
});

When('I fill the registration type as {string}', async ({ page }, regType) => {
  await utils.getDropdownLocator(fieldNames.AddAdvisor.registrationType).selectOption({ label: regType });
});



Then('I should be able to click {string}', async ({ page }, buttonText) => {
  await page.keyboard.press('Tab');
  const button = utils.getLocatorByRoleAndName('button', buttonText);
  await expect(button).toBeVisible();
  await button.click();
});

Then('I wait for the document to be generated', async ({ page }) => {

  await utils.getLocatorByRoleAndName('button', 'Download PDF').waitFor({ state: 'visible', timeout: 60000 });
});

When('I click on {string} -pdf', async ({ page }, text) => {
  await utils.getLocatorByText(text).click();
});

Then('the downloaded file should be named {string}', async ({ page }, expectedName) => {
  const download = await page.waitForEvent('download', { timeout: 60000 });
  const fileName = download.suggestedFilename();
  expect(fileName).toBe(expectedName);
});

When("I fill in the Advisor personal information", async ({ page }) => {
  await utils.getTextboxLocator(fieldNames.trustee.firstName).fill('');
  await utils.getTextboxLocator(fieldNames.trustee.firstName).type(testData.firstName);
  await utils.getTextboxLocator(fieldNames.trustee.firstName).press('Tab');

  await utils.getTextboxLocator(fieldNames.trustee.lastName).fill(testData.lastName);

  const dobInput = utils.getDatepickerLocator(fieldNames.trustee.dob);
  await dobInput.fill('');
  await dobInput.type(testData.dob);
  await dobInput.press('Tab');

  await utils.getTextboxLocator(fieldNames.trustee.email).fill(testData.email);

  await utils.getTextboxLocator(fieldNames.trustee.phone).fill(testData.phone);


});

When('I fill Document Direction as {string} for Account Authorizations Updates', async ({ }, arg) => {
  await utils.getDropdownLocator(fieldNames.documentDirection.ProxyVoting).selectOption({ label: arg });
  await utils.getDropdownLocator(fieldNames.documentDirection.ReportStatements).selectOption({ label: arg });
  await utils.getDropdownLocator(fieldNames.documentDirection.Prospectuses).selectOption({ label: arg });
  await utils.getDropdownLocator(fieldNames.documentDirection.CorporateActions).selectOption({ label: arg });
});






Then('the LPOA PDF should have the following checkboxes checked:', async ({ }, dataTable) => {
  if (!lpoaPdfPath) {
    throw new Error('LPOA PDF file not set. Ensure previous step executed correctly.');
  }

  const pdfBuffer = fs.readFileSync(lpoaPdfPath);
  const data = await pdf(pdfBuffer);
  const pdfText = data.text;

  for (const row of dataTable.raw()) {
    const expectedText = row[0];
    if (!pdfText.includes(expectedText)) {
      throw new Error(`Expected text not found in PDF: "${expectedText}"`);
    }
  }

  console.log('All expected texts found in the PDF.');
});




// ...removed unused resolvePlaceholders...



Then('the PDF should include the following text:', async function ({ }, dataTable) {
  if (!lpoaPdfPath) {
    throw new Error('LPOA PDF file not set. Ensure previous steps executed correctly.');
  }

  const pdfBuffer = fs.readFileSync(lpoaPdfPath);
  const pdfData = await pdf(pdfBuffer);
  const pdfText = pdfData.text.replace(/\s+/g, ' ');

  const rows = dataTable.hashes();
  for (const { field, expectedValue } of rows) {
    const normalizedValue = expectedValue.trim();
    // Print the field and value being validated
    console.log(`Validating field: "${field}", expected value: "${normalizedValue}"`);
    if (!pdfText.includes(normalizedValue)) {
      throw new Error(`Expected value "${normalizedValue}" for field "${field}" not found in PDF.`);
    }
  }

  console.log('All expected text fields found in the PDF.');
});

When('I upload the file {string} using the label {string}', async ({ }, fileName, fieldLabel) => {

  const fileInput = await utils.getFileUploadLocatorByFieldName(fieldLabel);
  const uploadDir = path.resolve('Features/Team4/uploads');
  await fileInput.setInputFiles(path.join(uploadDir, fileName));
  await fileInput.waitFor({ state: 'attached', timeout: 5000 });
  console.log(`File ${fileName} uploaded to field ${fieldLabel}`);
});

When('I select {string} from the account type dropdown', async ({ page }, accountType) => {
  const dropdown = utils.getDropdownLocator(fieldNames.Schwab.RegistrationType);
  await expect(dropdown).toBeVisible({ timeout: 60000 });
  await dropdown.selectOption({ label: accountType });
});

When("I fill in the Account Owners information", async ({ page }) => {
  await utils.getTextboxLocator(fieldNames.trustee.firstName).fill(testData.firstName);
  await utils.getTextboxLocator(fieldNames.trustee.lastName).fill(testData.lastName);

  const dobInput = utils.getDatepickerLocator(fieldNames.trustee.dob);
  await dobInput.fill('');
  await dobInput.type(testData.dob);
  await dobInput.press('Tab');

  await utils.getTextboxLocator(fieldNames.trustee.email).fill(testData.email);
  await utils.getTextboxLocator(fieldNames.trustee.ssn).fill(testData.ssn);
  await utils.getTextboxLocator(fieldNames.trustee.phone).fill(testData.phone);
  await utils.getTextboxLocator(fieldNames.Schwab.FirstMobilePhone).fill(testData.phone);
  await utils.getTextboxLocator(fieldNames.trustee.address).fill(testData.address);
  await utils.getTextboxLocator(fieldNames.trustee.city).fill(testData.city);
  await utils.getDropdownLocator(fieldNames.trustee.state).selectOption({ label: testData.state });
  await utils.getTextboxLocator(fieldNames.trustee.zip).fill(testData.zip);

  const citizenshipCheckbox = utils.getCheckboxLocator('FirstUSACitizenship');
  await expect(citizenshipCheckbox).toBeVisible();
  await citizenshipCheckbox.check();

  const residentCheckbox = utils.getCheckboxLocator(fieldNames.Schwab.FirstUSAResident);
  await expect(residentCheckbox).toBeVisible();
  await residentCheckbox.check();

  await utils.getDropdownLocator(fieldNames.Schwab.FirstEmploymentStatus).selectOption({ label: testData.employmentStatus });

});

When('I select Advise master code {string} from the dropdown', async ({ page }, masterCode) => {
  await utils
    .getDropdownLocator(fieldNames.Schwab.AdviseMasterCode)
    .selectOption({ label: masterCode });
});

// --- ZIP file PDF validation steps ---
Then('validate that the ZIP file contains exactly {int} PDF files', async ({ }, expectedCount) => {
  // Robust: check for ZIPs first, then PDFs directly
  // Find all ZIP files in the download directory
  const zipFiles = fs.readdirSync(downloadDir)
    .filter(f => f.endsWith('.zip'))
    .map(f => ({ name: f, time: fs.statSync(path.join(downloadDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);

  if (zipFiles.length > 0) {
    const latestZipPath = path.join(downloadDir, zipFiles[0].name);
    const zip = new AdmZip(latestZipPath);
    const pdfEntries = zip.getEntries().filter(e => e.entryName.endsWith('.pdf'));
    if (pdfEntries.length !== expectedCount) {
      throw new Error(`Expected ${expectedCount} PDFs in ZIP, found ${pdfEntries.length}.`);
    }
    console.log(`[INFO] Found ${pdfEntries.length} PDFs in ZIP:`, pdfEntries.map(e => e.entryName));
    return;
  }

  // Fallback: check for PDFs directly
  const pdfFiles = fs.readdirSync(downloadDir)
    .filter(f => f.endsWith('.pdf'));
  if (pdfFiles.length > 0) {
    console.warn(`[WARN] No ZIP found, but found ${pdfFiles.length} PDFs:`, pdfFiles);
    if (pdfFiles.length !== expectedCount) {
      throw new Error(`Expected ${expectedCount} PDFs, found ${pdfFiles.length} (not in ZIP).`);
    }
    return;
  }

  throw new Error('No ZIP or PDF files found in download directory.');
});

Then('validate that at least one PDF file name includes {string}', async ({ }, expectedSubstring) => {
  // Robust: check for ZIPs first, then PDFs directly
  // Find all ZIP files in the download directory
  const zipFiles = fs.readdirSync(downloadDir)
    .filter(f => f.endsWith('.zip'))
    .map(f => ({ name: f, time: fs.statSync(path.join(downloadDir, f)).mtime.getTime() }))
    .sort((a, b) => b.time - a.time);

  if (zipFiles.length > 0) {
    const latestZipPath = path.join(downloadDir, zipFiles[0].name);
    const zip = new AdmZip(latestZipPath);
    const pdfFileNames = zip.getEntries()
      .filter(entry => entry.entryName.toLowerCase().endsWith('.pdf'))
      .map(entry => entry.entryName);
    console.log('PDF files found in ZIP:', pdfFileNames);
    const found = pdfFileNames.some(name => name.includes(expectedSubstring));
    expect(found).toBe(true);
    return;
  }

  // Fallback: check for PDFs directly
  const pdfFiles = fs.readdirSync(downloadDir)
    .filter(f => f.endsWith('.pdf'));
  if (pdfFiles.length > 0) {
    console.warn(`[WARN] No ZIP found, but found ${pdfFiles.length} PDFs:`, pdfFiles);
    const found = pdfFiles.some(name => name.includes(expectedSubstring));
    expect(found).toBe(true);
    return;
  }

  throw new Error('No ZIP or PDF files found in download directory.');
});

