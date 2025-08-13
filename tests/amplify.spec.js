// @ts-check
const { test, expect, request } = require('@playwright/test');
const { getData, postData } = require('../support/apiUtils');
const { getCreatedDates, executeQuery } = require('../support/database.js');
const LoginPage = require('../pages/LoginPage');

test.describe('Client Login & Validation Suite', () => {

  test('Login in account and validates UI', async ({ page }) => {
    const loginPage = new LoginPage(page);
     await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!');

    // Navigate through menu
    await page.locator('//*[@class=\"topnav-items\"]/amp-top-nav-menuitem/div/a[@title=\"Clients\"]').click();
    await page.locator('//*[@class=\"topnav-subitems\"]/amp-top-subnav-item/div/a[@title=\"Clients\"]').click();

    await page.locator('(//th[@class=\"drag-exclude amp-table-filter\"])[1]//*[@placeholder=\"Search\"]').fill('Barton, Clint and Laura');
    await page.keyboard.press('Enter');

    const nameElement = page.locator('.name-display-style', { hasText: 'Barton, Clint and Laura' });
    await expect(nameElement).toBeVisible();
    await nameElement.click();

  });

 test('Login & verify Task Management-Admin Flow | Task Workflow', async ({ page }) => {
     const loginPage = new LoginPage(page);
     await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!' , 'admin');

     await page.waitForTimeout(10000)

   //  await page.locator('//div[@class="\topnav-useritems\"]//a[@class=\"topnav-usermenu\"]').click({ state: 'visible', timeout: 10000 });
    //click on System
 //   await page.locator('//a[@class=\"topnav-app-item\" and @title=\"System\"]').click({ state: 'visible', timeout: 10000 });

    await page.locator('//a[contains(@href, \"/admin/organization\") and contains(text(), \"Organizations\")]').click();

    await page.locator('//span[contains(@class, \"item-title\") and contains(text(), \"Task Management\")]').click();

  await expect(page.locator('//span[contains(text(), "Add New Group")]')).toBeVisible({ timeout: 10000 });

  await expect(page.locator('//div[contains(text(), "Task Types")]')).toBeVisible({ timeout: 10000 });

  await expect(page.locator('//div[contains(text(), "Task Workflows")]')).toBeVisible({ timeout: 10000 });

  await page.locator('//button[contains(text(), \"Add New Task Workflow\")]').click();
  await expect(page.locator('//div[contains(text(), \"From Scratch\")]')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('//div[contains(text(), \"Clone\")]')).toBeVisible({ timeout: 10000 });

  await expect(page.locator('//button[contains(text(), \"Cancel\")]')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('//button[contains(text(), \"Confirm\")]')).toBeVisible({ timeout: 10000 })

 //Cancel
  await page.locator('//button[contains(text(), \"Cancel\")]').click();


   });

 test('Login & verify Task Management-Admin Flow| Task Type', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!' , 'admin');

       await page.locator('//a[contains(@href, \"/admin/organization\") and contains(text(), \"Organizations\")]').click();

       await page.locator('//span[contains(@class, \"item-title\") and contains(text(), \"Task Management\")]').click();


     await page.locator('//*[contains(text(), "Add New Task Type")]').click();

     await expect(page.locator(' //div[contains(text(), \"Add Task Type\")]')).toBeVisible({ timeout: 10000 });
     await expect(page.locator('//*[@id="task-type-name"]')).toBeVisible({ timeout: 10000 });
     await expect(page.locator('//*[@id="workflow"]')).toBeVisible({ timeout: 10000 });
     await expect(page.locator('//*[@id="assigned-group"]')).toBeVisible({ timeout: 10000 });
     await expect(page.locator('//button[@class="modal-cancel-button"]')).toBeVisible({ timeout: 10000 });
     await expect(page.locator('//button[@class="save-task-type-button"]')).toBeVisible({ timeout: 10000 });

    //Cancel
     await page.locator('//button[contains(text(), \"Cancel\")]').click();
      });

 test('Login & verify Task Management-Admin Flow| Add Group', async ({ page }) => {
              const loginPage = new LoginPage(page);
              await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!' , 'admin');

             await page.locator('//a[contains(@href, \"/admin/organization\") and contains(text(), \"Organizations\")]').click();

             await page.locator('//span[contains(@class, \"item-title\") and contains(text(), \"Task Management\")]').click();


           await page.locator('//*[contains(text(), "Add New Group")]').click();

           await expect(page.locator('//*[@id="group-name"]')).toBeVisible({ timeout: 10000 });
           await expect(page.locator('//*[@id="taskManagementAdminPanelApp"]//div[@class="amp-dropdown-selection"]')).toBeVisible({ timeout: 10000 });
           await expect(page.locator('//*[@id="group-name"]')).toBeVisible({ timeout: 10000 });
           await expect(page.locator('//*[@id="displayName"]//span[contains(text(),"Member Name")]')).toBeVisible({ timeout: 10000 });
           await expect(page.locator('//span[contains(text(),"Job Title")]')).toBeVisible({ timeout: 10000 });
           await expect(page.locator('  (//*[@class="amp-th-title clickable"]/span[contains(text(),"Owner")])[2]')).toBeVisible({ timeout: 10000 });

          //Cancel
           await page.locator('//*[@class=\"btn group-modal-cancel\"]').click();
            });


test('Login & verify Task Management- user Flow', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!', 'tasks');
        await page.locator('//div[@class=\"topnav-useritems\"]//a[@class=\"topnav-usermenu\"]').click();
            //click on System
        await page.locator('//a[@class=\"topnav-app-item\" and @title=\"System\"]').click();
        await page.locator('//a[contains(@href, \"/admin/organization\") and contains(text(), \"Organizations\")]').click();
        await page.locator('//span[contains(@class, \"item-title\") and contains(text(), \"Task Management\")]').click();
});

 test('Login in account and validates UI', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!' , '');

        // Navigate through menu
        await page.locator('//*[@class=\"topnav-items\"]/amp-top-nav-menuitem/div/a[@title=\"Clients\"]').click();
        await page.locator('//*[@class=\"topnav-subitems\"]/amp-top-subnav-item/div/a[@title=\"Clients\"]').click();

        await page.locator('(//th[@class=\"drag-exclude amp-table-filter\"])[1]//*[@placeholder=\"Search\"]').fill('Barton, Clint and Laura');
        await page.keyboard.press('Enter');

        const nameElement = page.locator('.name-display-style', { hasText: 'Barton, Clint and Laura' });
        await expect(nameElement).toBeVisible();
        await nameElement.click();

      });

test('API validation with Playwright', async ({ playwright }) => {
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

  expect(response.status()).toBe(200);

  const json = await response.json();
  console.log(json.data.items);
  expect(json.data.items.length).toBeGreaterThan(0);

  await reqContext.dispose();
});

  test.skip('Should retrieve and validate CreatedDate from CRM_Household table', async () => {
    const results = await getCreatedDates();
    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);

    const row = results[0];
    console.log(`HouseholdName: ${row.HouseholdName}`);
    console.log(`CreatedDate: ${row.CreatedDate}`);

    // Example UI assertion logic here if needed
    expect(row).toHaveProperty('CreatedDate');
  });

  test('Should execute a query and validate results', async () => {
    const results = await executeQuery(`SELECT TOP (1) * FROM [dbo].[CRM_Household]`);
    expect(results).toBeInstanceOf(Array);
    console.log(results);

    for (const row of results) {
      expect(row).toHaveProperty('HouseholdName');
      expect(row).toHaveProperty('CreatedDate');

    }
  });

});
