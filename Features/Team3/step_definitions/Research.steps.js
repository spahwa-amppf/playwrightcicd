import {TaskWorkflowPage} from "../../../pages/TaskWorkflowPage";

const { LoginPage } = require('../../../pages/LoginPage');
// const { TaskWorkflowPage } = require('../../../pages/TaskWorkflowPage');
// const { FirmsPage } = require('../../../pages/FirmsPage');

import { createBdd } from 'playwright-bdd';
const { Given, When, Then } = createBdd();
import { test, expect } from '@playwright/test';
import {ClientsPage} from "../../../pages/ClientsPage";

Then('the {string} widget is visible', async ({}, arg) => {
    // Step: And the "Asset Under Management" widget is visible
    // From: Features\Team2\features\Research.feature:7:5
});

Then('the {string} section is displayed with risk metrics', async ({}, arg) => {
    // Step: And the "Book Characteristics" section is displayed with risk metrics
    // From: Features\Team2\features\Research.feature:9:5
});

Then('the {string} panel shows allocation breakdowns', async ({}, arg) => {
    // Step: And the "Book Composition" panel shows allocation breakdowns
    // From: Features\Team2\features\Research.feature:10:5
});

Then('the {string} panel is present with News and Events tabs', async ({}, arg) => {
    // Step: And the "Notifications" panel is present with News and Events tabs
    // From: Features\Team2\features\Research.feature:11:5
});

Then('the {string} tab is selected in the sidebar', async ({}, arg) => {

});

Then('the {string} tab is visible in the sidebar', async ({page}, menuName) => {
    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Watchlists': () => clientsPage.navigateToWatchlists(),
        'Market': () => clientsPage.navigateToMarket(),
        'Marquee': () => clientsPage.navigateToMarquee(),
        'Filter': () => clientsPage.navigateToFilter(),
        'ApplyFilter': () => clientsPage.navigateToApplyFilter(),


    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }

});


When('the user clicks on the {string} option in the left navigation panel', async ({}, arg) => {
    // Step: When the user clicks on the "Filter" option in the left navigation panel
    // From: Features\Team2\features\Research.feature:29:5
});

Then('the Filter popup should appear', async ({}) => {
    // Step: Then the Filter popup should appear
    // From: Features\Team2\features\Research.feature:30:5
});

Then('the Filter popup should show the following sections:', async ({}, dataTable) => {
    // Step: And the Filter popup should show the following sections:
    // From: Features\Team2\features\Research.feature:31:5
});

Then('the user should see the list of Advisors', async ({}) => {
    // Step: And the user should see the list of Advisors
    // From: Features\Team2\features\Research.feature:36:5
});

Then('the user selects an Advisor', async ({}) => {
    // Step: And the user selects an Advisor
    // From: Features\Team2\features\Research.feature:37:5
});

Then('the user should see related Households', async ({}) => {
    // Step: Then the user should see related Households
    // From: Features\Team2\features\Research.feature:38:5
});

Then('the user should see related Accounts', async ({}) => {
    // Step: And the user should see related Accounts
    // From: Features\Team2\features\Research.feature:39:5
});

When('the user clicks on the {string} button', async ({}, arg) => {
    // Step: When the user clicks on the "Apply Filter" button
    // From: Features\Team2\features\Research.feature:40:5
});

Then('the Watchlists section should refresh and display data based on the applied filter', async ({}) => {
    // Step: Then the Watchlists section should refresh and display data based on the applied filter
    // From: Features\Team2\features\Research.feature:41:5
});


Given('the Watchlists page is displayed in default view', async ({}) => {
    // Step: And the Watchlists page is displayed in default view
    // From: Features\Team2\features\Research.feature:49:5
});

When('the user clicks on the {string} icon in the top-right corner', async ({}, arg) => {
    // Step: When the user clicks on the "Toggle View" icon in the top-right corner
    // From: Features\Team2\features\Research.feature:50:5
});

Then('the watchlist layout should switch to the alternate view', async ({}) => {
    // Step: Then the watchlist layout should switch to the alternate view
    // From: Features\Team2\features\Research.feature:51:5
});

Then('the layout should retain all watchlists with their respective data', async ({}) => {
    // Step: And the layout should retain all watchlists with their respective data
    // From: Features\Team2\features\Research.feature:52:5
});

Then('the user navigate to {string}', async ({page}, menuName) => {

    const taskWorkflowPage = new TaskWorkflowPage(page);
    const clientsPage = new ClientsPage(page);
    // await taskWorkflowPage.waitBeforeNavigation();

    const navigationMap = {
        'Research': () => clientsPage.navigateToResearch(),
    };

    if (navigationMap[menuName]) {
        await navigationMap[menuName]();
        // await taskWorkflowPage.waitBeforeNavigation();
    } else {
        throw new Error(`Unknown menu name: ${menuName}`);
    }

});


