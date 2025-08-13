import { createBdd } from 'playwright-bdd';
import {LoginPage} from "../../../pages/LoginPage";
import page, {PersonaPage} from "../../../pages/PersonaPage";
import {ClientsPage} from "../../../pages/ClientsPage";
import {TaskWorkflowPage} from "../../../pages/TaskWorkflowPage";
import {TradeManagementPage} from "../../../pages/TradeManagementPage";
import {TaskManagementPage} from "../../../pages/TaskManagementPage";
const { Given, When, Then } = createBdd();

const { test, expect, request  } = require('@playwright/test');

const { getData, postData } = require('../../../support/apiUtils');
const { getCreatedDates, executeQuery } = require('../../../support/database');
//const LoginPage = require('../../../pages/LoginPage');

Given('The HomePage is opened', async ({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigateDefault();

});


Given('the user is logged in as {string}', async ({page}, role) => {

    if (role === 'admin') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        // await taskWorkflowPage.checkIntermeddiatePage()
        // await taskWorkflowPage.navigateToTaskManagementViaAdminRoute();
    } else if (role === 'user') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2 ('demo_ng', 'Dem0NexGen!');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        // await taskWorkflowPage.navigateToTaskManagementViaRoute();
    }
    else if (role === 'singleFirmAdministrator') {
        const taskWorkflowPage = new TaskWorkflowPage(page);
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('qa_firmadmin_1', 'chwBiyr&G4tk0M(B');
        await taskWorkflowPage.waitBeforeNavigation();
    }  else if (role === 'MultiAdvisorSingleFirm') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2 ('demo_ng', 'Dem0NexGen!');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        // await taskWorkflowPage.navigateToTaskManagementViaRoute();
    } else if (role === 'AdvisorSingleFirm') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2 ('qa_adv_1', 'chwBiyr&G4tk0M(B');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        // await taskWorkflowPage.navigateToTaskManagementViaRoute();
    }else if (role === 'MultiCSASingleFirm') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('qa_csa_m', 'chwBiyr&G4tk0M(B');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        // await taskWorkflowPage.navigateToTaskManagementViaRoute();
    }


    else {
        throw new Error('Invalid role');
    }
});

When('the user navigates to the {string} section', async ({page}, menuName) => {
    this.PersonaPage = new PersonaPage(this.page);
    if (menuName === 'organizations') {
        await this.PersonaPage.navigateToOrganizations();

    }
});



Then('Navigate to {string}', async ({page}, text) => {

    const  clientsPage= new ClientsPage(page);
    if (text === 'Clients') {
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        await clientsPage.navigateToClients();
        await taskWorkflowPage.waitBeforeNavigation();
    }
});

Then('the user should see only one form listed under {string}', async ({}, arg) => {



});

Then('the user should not be able to see the Admin option', async ({}) => {
    // Step: And the user should not be able to see the Admin option
    // From: Features\Team2\features\persona.feature:16:5
});


Then('the user click on {string} button', async ({}, arg) => {
    // Step: Then the user click on "Household" button
    // From: Features\Team2\features\persona.feature:23:5
});

Then('the user clicks on {string} dropdown and able to see multiple advisors', async ({ page }, dropdownName, dataTable) => {
    // Click the Advisor search input — use the right XPath or CSS selector
    const advisorInput = page.locator(' (//input[@placeholder="Search"])[2]');
    await advisorInput.click();

    // Clear any existing text (if required)
    await advisorInput.fill('James Rhodes');

    // Loop through each advisor in the table and check visibility
    const advisors = dataTable.raw().flat(); // ['James Rhodes', 'Tony Stark', 'Larry Bird']

    for (const name of advisors) {
        // Type the advisor name
        await advisorInput.fill(name);

        // Wait for the results to filter
        const result = page.locator(`//td[normalize-space(text())="${name}"]`);
        await expect(result).toBeVisible();

        // Optional: Clear for the next name
        await advisorInput.fill('Tony Stark');
    }
});


Then('the page title should be {string}', async ({}, arg) => {
    this.clientsPage = new ClientsPage(this.page);
    await this.clientsPage.navigateToClients();
});

Then('the {string} upload button should be available', async ({}, arg) => {
    // Step: And the "Choose File" upload button should be available
    // From: Features\Team2\features\persona.feature:8:5
});

Then('the top and left menu icons are there', async ({}) => {
    // Step: And the top and left menu icons are there
    // From: Features\Team2\features\persona.feature:9:5
});

Then('the Advisor column should display only one unique name', async ({}) => {
    // Step: Then the Advisor column should display only one unique name
    // From: Features\Team2\features\persona.feature:15:5
});

Then('that name should match the logged-in advisor', async ({}) => {
    // Step: And that name should match the logged-in advisor
    // From: Features\Team2\features\persona.feature:16:5
});

Then('no other advisor names should be shown', async ({}) => {
    // Step: And no other advisor names should be shown
    // From: Features\Team2\features\persona.feature:17:5
});

Then('the {string} button is there to add household details', async ({}, arg) => {
    // Step: And the "+ Household" button is there to add household details
    // From: Features\Team2\features\persona.feature:18:5
});

Given('the user is logged in as an {string} with multi-advisor access', async ({}, arg) => {
    // Step: Given the user is logged in as an "Admin" with multi-advisor access
    // From: Features\Team2\features\persona.feature:22:5
});

Then('the Advisor column should display multiple advisor names', async ({}) => {
    // Step: Then the Advisor column should display multiple advisor names
    // From: Features\Team2\features\persona.feature:24:5
});

Then('{string} and {string} buttons are there', async ({}, arg, arg1) => {
    // Step: And "+ Household" and "Export" buttons are there
    // From: Features\Team2\features\persona.feature:25:5
});

Given('the user is logged in as a customer service user for a single advisor', async ({}) => {
    // Step: Given the user is logged in as a customer service user for a single advisor
    // From: Features\Team2\features\persona.feature:28:5
});

Then('only one advisor name should appear in the Advisor column', async ({}) => {
    // Step: Then only one advisor name should appear in the Advisor column
    // From: Features\Team2\features\persona.feature:30:5
});

Then('that name should match the assigned advisor for the logged-in user', async ({}) => {
    // Step: And that name should match the assigned advisor for the logged-in user
    // From: Features\Team2\features\persona.feature:31:5
});

Then('{string} button for adding new clients', async ({}, arg) => {
    // Step: And "+ Household" button for adding new clients
    // From: Features\Team2\features\persona.feature:32:5
});

Given('the user is logged in with customer service role and multi-advisor visibility', async ({}) => {
    // Step: Given the user is logged in with customer service role and multi-advisor visibility
    // From: Features\Team2\features\persona.feature:36:5
});

When('the user accesses the {string} section', async ({}, arg) => {

});

Then('multiple advisor names should be visible in the Advisor column', async ({}) => {
    // Step: Then multiple advisor names should be visible in the Advisor column
    // From: Features\Team2\features\persona.feature:38:5
});

Then('each advisor should be linked to at least one client', async ({}) => {
    // Step: And each advisor should be linked to at least one client
    // From: Features\Team2\features\persona.feature:39:5
});

Then('{string}, {string}, and filtering options are there', async ({}, arg, arg1) => {
    // Step: And "+ Household", "Export", and filtering options are there
    // From: Features\Team2\features\persona.feature:40:5
});
Then(/^the user clicks on "([^"]*)"$/, function () {

});

Then('Navigate to {string} page', async ({page}, text) => {
    const  clientsPage= new ClientsPage(page);
    if (text === 'Onboarding') {
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        await clientsPage.navigateToOnboarding();
        await taskWorkflowPage.waitBeforeNavigation();
    }

});

Then('the user click on {string}', async ({page}, menuName) => {
    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Advisor': () => clientsPage.navigateToAdvisor(),
        'AdvisorSearch': () => clientsPage.navigateToAdvisorSearch(),

    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }
});

Then('the user Validate {string}', async ({page}, menuName) => {
    // Step: Then the user Search "Tony stark"



    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Tony stark': () => clientsPage.navigateToTonystark(),
        'James Rhodes': () => clientsPage.navigateToJamesRhodes(),
        'Larry Bird': () => clientsPage.navigateToLarryBird(),
        'Jarvis Demo Bot': () => clientsPage.navigateToJarvisDemoBot(),


    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }

});

