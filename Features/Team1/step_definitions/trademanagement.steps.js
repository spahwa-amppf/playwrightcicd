import {TaskManagementPage} from "../../../pages/TaskManagementPage";

const { LoginPage } = require('../../../pages/LoginPage');
const { TradeManagementPage } = require('../../../pages/TradeManagementPage');
// const { FirmsPage } = require('../../../pages/FirmsPage');

import { createBdd } from 'playwright-bdd';
const { Given, When, Then } = createBdd();
import { test, expect } from '@playwright/test';
import {ClientsPage} from "../../../pages/ClientsPage";
import {TaskWorkflowPage} from "../../../pages/TaskWorkflowPage";
import {PersonaPage} from "../../../pages/PersonaPage";


Then('the user navigates to Investing', async ({ page }, text) => {

    const  clientsPage= new ClientsPage(page);
    if (text === 'InvestingPage') {
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        await clientsPage.navigateToInvesting();
        await taskWorkflowPage.waitBeforeNavigation();
    }
});

Then('the user initiates Trade Management', async ({page}) => {
    this.TradeManagementPage = new TradeManagementPage(this.page);
    await this.TradeManagementPage.navigateToTradeManagement();
});

Then('the user click on Staged from the left navigation', async ({page}) => {
    await this.TradeManagement.navigateToTradeManagement();
});

Then('the user should see {string} section header', async ({page}, menuName) => {

    if (menuName === 'StagedTrades') {
        const taskWorkflowPage = new TaskWorkflowPage(page);
        const clientsPage = new ClientsPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        await clientsPage.navigateToStagedIcon();
        await taskWorkflowPage.waitBeforeNavigation();
    }

});

Then('the user should see a dropdown labeled {string}', async ({}, arg) => {
    // Step: And the user should see a dropdown labeled "My Orders"
    // From: Features\Team2\features\TradeManagement.feature:9:5
});

Then('the user should see a button labeled {string} with a check icon', async ({}, arg) => {
    // Step: And the user should see a button labeled "Send Selected" with a check icon
    // From: Features\Team2\features\TradeManagement.feature:10:5
});

Then('the table should contain the following column headers:', async ({}, dataTable) => {
    // Step: Then the table should contain the following column headers:
    // From: Features\Team2\features\TradeManagement.feature:17:5
});

Then('each column in the table should have a search input below the header', async ({}) => {
    // Step: Then each column in the table should have a search input below the header
    // From: Features\Team2\features\TradeManagement.feature:36:5
});

Then('each sortable column should have a sort icon next to the header name', async ({}) => {
    // Step: And each sortable column should have a sort icon next to the header name
    // From: Features\Team2\features\TradeManagement.feature:37:5
});

Then('the user click on Approved from the left navigation', async ({}) => {
    // Step: Then the user click on Approved from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:44:5
});

Then('the trade approvals table should be visible', async ({}) => {
    // Step: And the trade approvals table should be visible
    // From: Features\Team2\features\TradeManagement.feature:46:5
});



Then('each column in the trade approvals table should have a search field', async ({}) => {
    // Step: Then each column in the trade approvals table should have a search field
    // From: Features\Team2\features\TradeManagement.feature:72:5
});

Then('sortable columns should have sort icons beside the header text', async ({}) => {
    // Step: And sortable columns should have sort icons beside the header text
    // From: Features\Team2\features\TradeManagement.feature:73:5
});

Then('the user click on Rejected from the left navigation', async ({}) => {
    // Step: Then the user click on Rejected from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:80:5
});

Then('each row in the table should contain a clickable Account', async ({}) => {
    // Step: Then each row in the table should contain a clickable Account
    // From: Features\Team2\features\TradeManagement.feature:81:5
});

Then('each row should display a non-empty {string} indicating rejection reason', async ({}, arg) => {
    // Step: And each row should display a non-empty "Message" indicating rejection reason
    // From: Features\Team2\features\TradeManagement.feature:82:5
});

Then('the Order Type should be displayed in uppercase format', async ({}) => {
    // Step: And the Order Type should be displayed in uppercase format
    // From: Features\Team2\features\TradeManagement.feature:83:5
});

Then('the user clicks on Rejected from the left navigation', async ({}) => {
    // Step: Then the user clicks on Rejected from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:90:5
});

Then('the user scrolls to the bottom of the table', async ({}) => {
    // Step: Then the user scrolls to the bottom of the table
    // From: Features\Team2\features\TradeManagement.feature:91:5
});

Then('all rejected trade records should be visible', async ({}) => {
    // Step: Then all rejected trade records should be visible
    // From: Features\Team2\features\TradeManagement.feature:92:5
});

Then('the user click on In Progress from the left navigation', async ({}) => {
    // Step: Then the user click on In Progress from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:99:5
});

Then('the Staged tab should be highlighted', async ({}) => {
    // Step: Then the Staged tab should be highlighted
    // From: Features\Team2\features\TradeManagement.feature:100:5
});

Then('the following column headers should be visible in the table', async ({}, dataTable) => {
    // Step: And the following column headers should be visible in the table
    // From: Features\Team2\features\TradeManagement.feature:101:5
});


Then('the {string} button should be visible', async ({}, arg) => {
    // Step: And the "Send Selected" button should be visible
    // From: Features\Team2\features\TradeManagement.feature:114:5
});

Then('the order filter dropdown should be present and defaulted to {string}', async ({}, arg) => {
    // Step: And the order filter dropdown should be present and defaulted to "My Orders"
    // From: Features\Team2\features\TradeManagement.feature:115:5
});

Then('the user clicks on Approved from the left navigation', async ({}) => {
    // Step: Then the user clicks on Approved from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:121:5
});

Then('the Trade Approvals tab should be highlighted', async ({}) => {
    // Step: Then the Trade Approvals tab should be highlighted
    // From: Features\Team2\features\TradeManagement.feature:122:5
});

Then('the user click on Complete from the left navigation', async ({}) => {
    // Step: Then the user click on Complete from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:142:5
});

Then('the user should see the {string} heading with success icon', async ({}, arg) => {
    // Step: Then the user should see the "Complete" heading with success icon
    // From: Features\Team2\features\TradeManagement.feature:143:5
});

Then('the following column headers should be displayed:', async ({}, dataTable) => {
    // Step: And the following column headers should be displayed:
    // From: Features\Team2\features\TradeManagement.feature:144:5
});

Given('the user is logged in and navigates to the Trade Dashboard', async ({}) => {
    // Step: Given the user is logged in and navigates to the Trade Dashboard
    // From: Features\Team2\features\TradeManagement.feature:159:5
});

Then('the Rebalancer card with count should be visible', async ({}) => {
    // Step: Then the Rebalancer card with count should be visible
    // From: Features\Team2\features\TradeManagement.feature:160:5
});

Then('the Swap card should be visible', async ({}) => {
    // Step: And the Swap card should be visible
    // From: Features\Team2\features\TradeManagement.feature:161:5
});

Then('the account data table should be loaded', async ({}) => {
    // Step: And the account data table should be loaded
    // From: Features\Team2\features\TradeManagement.feature:162:5
});

Then('each row in the table should contain account name, balance, household, and tradable icon', async ({}) => {
    // Step: And each row in the table should contain account name, balance, household, and tradable icon
    // From: Features\Team2\features\TradeManagement.feature:163:5
});

Then('the {string} button should be visible for each row', async ({}, arg) => {
    // Step: And the "View" button should be visible for each row
    // From: Features\Team2\features\TradeManagement.feature:164:5
});
Then('the user navigates to {string}', async ({page}, menuName) => {

    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Trade Management': () => clientsPage.navigateToTradeManagement(),

    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }

});




Then('the user click on {string} from the left navigation', async ({page}, menuName) => {
    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Management': () => clientsPage.navigateToManagement(),
        'Staged': () => clientsPage.navigateToStaged(),
        'Approvals': () => clientsPage.navigateToApprovals(),
        'Rejected': () => clientsPage.navigateToRejected(),
        'In Progress': () => clientsPage.navigateToInprogress(),
        'Complete': () => clientsPage.navigateToComplete(),
        'Post-Trade': () => clientsPage.navigateToPostTrade(),
        'Order Requests': () => clientsPage.navigateToOrderRequests(),
        'Settings': () => clientsPage.navigateToSettings(),
    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }
});


Then('the user click on Approval from the left navigation', async ({}) => {
    // Step: Then the user click on Approval from the left navigation
    // From: Features\Team2\features\TradeManagement.feature:55:5
});
