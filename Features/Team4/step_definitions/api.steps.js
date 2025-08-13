import { createBdd } from 'playwright-bdd';
import playwright from "mssql/lib/base/transaction";
const { Given, When, Then } = createBdd();

const { test, expect, request  } = require('@playwright/test');

const { getData, postData , getData2 } = require('../../../support/apiUtils');
const { getCreatedDates, executeQuery } = require('../../../support/database');
const LoginPage = require('../../../pages/LoginPage');

When('I send a GET request to {string}', async function ({}, endpointTemplate, dataTable) {
  const rows = dataTable.hashes();
  const clientID = rows[0].clientID;

  // Replace placeholder in endpoint
  const endpoint = endpointTemplate.replace('<clientID>', clientID);


    // Use API Utils
      this.lastResponse = await getData2(endpoint);
      this.lastJson = await this.lastResponse.json();

      expect(this.lastJson.data).toBeDefined();

});

// Validate that response contains key
Then('the response body should contain {string}', async ({}, key) => {
  const json = this.lastJson; // retrieve from context
   expect(json[key]).toBeDefined();
});