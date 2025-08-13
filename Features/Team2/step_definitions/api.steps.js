import { createBdd } from 'playwright-bdd';
import playwright from "mssql/lib/base/transaction";
const { Given, When, Then } = createBdd();

const { test, expect, request  } = require('@playwright/test');

const { getData, postData } = require('../../../support/apiUtils');
const { getCreatedDates, executeQuery } = require('../../../support/database');
const LoginPage = require('../../../pages/LoginPage');

Given('the user logs in with {string} environment', async ({ page }, environment) => {
  const envUrls = {
    dev: 'https://amplify-uidev.azurewebsites.net/',
    qa: 'https://app-westus-qa-global-auth-001.azurewebsites.net',
    prod: 'https://amplifyplatform.com'
  };

  const targetUrl = envUrls[environment];
  if (!targetUrl) throw new Error(`Unknown environment: ${environment}`);

  await page.goto(targetUrl);
});


When('I get all organizations', async () => {
  const reqContext = await request.newContext();
  const url = 'https://amplify-test-west-api-uidev2.azurewebsites.net/organization/21';

  const response = await getData(reqContext, url);
  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.data).toBeDefined();

  await reqContext.dispose();
});

// ServiceTaskTypes validation placeholder
Then('I query ServiceTaskTypes for each and validate response', async () => {

});


Then('I call the News endpoint with topic {string}', async () => {
  const reqContext = await request.newContext();
  const url = 'https://amplify-uidev2.azurewebsites.net/';

  const response = await getData(reqContext, url);
  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.data).toBeDefined();

  await reqContext.dispose();
});



Then('I call the Research endpoint with topic {string}', async () => {
  const reqContext = await request.newContext();
  const url = 'https://amplify-uidev2.azurewebsites.net/research/market';

  const response = await getData(reqContext, url);
  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.data).toBeDefined();

  await reqContext.dispose();
});


Then('I call the Onboarding endpoint with topic {string}', async () => {
  const reqContext = await request.newContext();
  const url = 'https://amplify-uidev2.azurewebsites.net/onboarding/account/b98e01c4-cf43-413c-a557-24efd4413038';

  const response = await getData(reqContext, url);
  expect(response.status()).toBe(200);

  const json = await response.json();
  expect(json.data).toBeDefined();

  await reqContext.dispose();
});
