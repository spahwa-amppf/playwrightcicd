import { createBdd } from 'playwright-bdd';
const { Given, When, Then } = createBdd();

const { test, expect, request  } = require('@playwright/test');

const { getData, postData } = require('../../support/apiUtils.js');
const { getCreatedDates, executeQuery } = require('../../support/database');
const LoginPage = require('../../pages/LoginPage');

Given('the user logs in with {string} environment', async ({ page }, environment) => {
  const envUrls = {
    dev: 'https://dev.example.com/login',
    qa: 'https://qa.example.com/login',
    prod: 'https://example.com/login'
  };

  const targetUrl = envUrls[environment];
  if (!targetUrl) throw new Error(`Unknown environment: ${environment}`);

  await page.goto(targetUrl);
});

Given('I have a valid bearer token', async ({}) => {

});



Given('I open the login page', async function () {
  await this.initPage();
   this.loginPage = new LoginPage(this.page);
   await this.loginPage.goto();

});

/*When('I enter username {string} and password {string}', async function (username, password) {
   await loginPage.login('demo_ng', 'Dem0NexGen!');
});*/

Then('I should see the dashboard', async function () {

  // Navigate through menu
       await page.locator('//*[@class=\"topnav-items\"]/amp-top-nav-menuitem/div/a[@title=\"Clients\"]').click();
       await page.locator('//*[@class=\"topnav-subitems\"]/amp-top-subnav-item/div/a[@title=\"Clients\"]').click();

       await page.locator('(//th[@class=\"drag-exclude amp-table-filter\"])[1]//*[@placeholder=\"Search\"]').fill('Barton, Clint and Laura');
       await page.keyboard.press('Enter');

       const nameElement = page.locator('.name-display-style', { hasText: 'Barton, Clint and Laura' });
       await expect(nameElement).toBeVisible();
       await nameElement.click();

});

Then('verify the API Response', async function () {
 const reqContext = await playwright.request.newContext();

  const body = {
    filters: {
      status: 'CLI001'
    },
    sort: 'name',
    pageNum: 1,
    itemLimit: 20,
    enableCaching: true
  };

  const response = await postData(reqContext, 'https://demo.amplifyplatform.com/api/client/search-paged', body);
  console.log(response);
  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.data.items.length).toBeGreaterThan(0);

  await reqContext.dispose();

});

Then('verify the Database Response', async function () {
  const results = await executeQuery(`SELECT TOP (1) * FROM [dbo].[CRM_Household]`);
    expect(results).toBeInstanceOf(Array);
    console.log(results);

    for (const row of results) {
      expect(row).toHaveProperty('HouseholdName');
      expect(row).toHaveProperty('CreatedDate');

    }
});

Then('I get a successful response', async () => {

});

