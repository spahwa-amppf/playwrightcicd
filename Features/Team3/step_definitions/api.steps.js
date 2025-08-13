import { createBdd } from 'playwright-bdd';
import playwright from "mssql/lib/base/transaction";
const { Given, When, Then } = createBdd();

const { test, expect, request  } = require('@playwright/test');

const { getData, postData } = require('../../../support/apiUtils');
const { getCreatedDates, executeQuery } = require('../../../support/database');
const LoginPage = require('../../../pages/LoginPage');

let lastResponse;
let lastJson;

When('I call the Research endpoint POST call {string}', async ({},topic) => {

  const body = {
    accountIds: ['7d4174b4-f761-481c-9b94-c7ebd1aaf6c1'],
    filterAccountIds: ['7d4174b4-f761-481c-9b94-c7ebd1aaf6c1']
  };

  lastResponse = await postData(
    'https://api-test.amplifyplatform.com/v1/client/bi/hierarchy',
    { data: body }
  );

  expect(lastResponse.status()).toBe(200);

  lastJson = await lastResponse.json();
  expect(lastJson.data).toBeDefined();


});

Then('the response should contain valid advisor section data', async () => {
  const advisorSection = lastJson.data.find((section) => section.title === 'advisor');
  expect(advisorSection).toBeDefined();
  expect(advisorSection.items.length).toBeGreaterThan(0);

  for (const advisor of advisorSection.items) {
    expect(advisor.name).toBeDefined();
    expect(typeof advisor.name).toBe('string');

    expect(advisor.id).toBeDefined();
    expect(typeof advisor.id).toBe('number');

    expect(advisor.firmId).toBeDefined();
    expect(typeof advisor.firmId).toBe('number');
  }
});
