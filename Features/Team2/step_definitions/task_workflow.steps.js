const { LoginPage } = require('../../../pages/LoginPage');
const { TaskWorkflowPage } = require('../../../pages/TaskWorkflowPage');
const { FirmsPage } = require('../../../pages/FirmsPage');

import { createBdd } from 'playwright-bdd';
const { Given, When, Then } = createBdd();
import { test, expect } from '@playwright/test';


Given('the user navigates to the login page', async ({ page }) => {
 const envUrls = {
     dev: 'https://amplify-uidev2.azurewebsites.net',
     qa: 'https://app-westus-qa-gloabl-web-001.azurewebsites.net',
     prod: ''
   };
  const loginPage = new LoginPage(page);
  await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!');

});

When('I enter username {string} and password {string}', async ({}, arg, arg1) => {

});


When('the user navigates to the Organizations section as {string}',  async ({ page }, role) => {

    if (role === 'admin') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!');

        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
        await taskWorkflowPage.navigateToOrganizations();
    } else if (role === 'user') {
        const loginPage = new LoginPage(page);
        await loginPage.login_uidev2('demo_ng', 'Dem0NexGen!');
        const taskWorkflowPage = new TaskWorkflowPage(page);
        await taskWorkflowPage.waitBeforeNavigation();
       // await taskWorkflowPage.navigateToTaskManagementViaRoute();
    } else {
        throw new Error('Invalid role');
    }

});



When('I navigated to {string} page', async ({ page }, route) => {
    const taskWorkflowPage = new TaskWorkflowPage(page);
    await taskWorkflowPage.waitBeforeNavigation();
    await taskWorkflowPage.navigateToTaskManagementViaRoute(route);
});


Then('I selected {string} Firms', async ({page}, arg) => {
    const taskWorkflowPage = new TaskWorkflowPage(page);
    await taskWorkflowPage.waitBeforeNavigation();

    const firmsPage = new FirmsPage(page);
    await firmsPage.selectFirmsName(arg);

});


When('the user navigates to the Organizations section',async ({ page }) => {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.navigateToOrganizations();
});



When('navigates to Task Management', async ({ page }) => {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.navigateToTaskManagement();
});

Then('the Task Management screen should display the workflow sections',async ({ page }) => {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.verifyTaskWorkflowSection();
});

When('user initiates Add New Task Workflow', async function ({ page }) {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.openAddNewWorkflow();
});

Then('the options From Scratch and Clone should be visible', async function ({ page }) {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.verifyWorkflowOptions();
});

Then('Cancel and Confirm buttons should be available', async function ({ page }) {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.verifyActionButtons();
});

When('the user clicks Cancel to exit', async function ({ page }) {
  const taskWorkflowPage = new TaskWorkflowPage(page);
  await taskWorkflowPage.cancelAddWorkflow();
});

Then('I select a task type to deletel', async ({}) => {

});

When('I upload {int} reference files to the task type', async ({}, arg) => {

});

Then('the task type should appear in the task type list', async ({}) => {

});

Then('I should see a {string} column in the task type list', async ({}, arg) => {

});

Then('the {string} value for the newly created task type should be {string}', async ({}, arg, arg1) => {

});

When('I create a new group by clicking {string}', async ({}, arg) => {

});

When('I define a task type by clicking {string} and assign the cloned workflow', async ({}, arg) => {

});

Then('the task type is saved successfully', async ({}) => {

});

When('I try to edit the stage requirements in the cloned workflow', async ({}) => {

});

Then('a validation message should be displayed as', async ({}) => {

});

When('I modify the workflow description with base64 encoded content', async ({}) => {

});

Then('the system should prevent saving and show an error message {string}', async ({}, arg) => {

});

Given('a workflow is open for editing', async ({}) => {

});

When('I add or update a stage with base64 content in its description', async ({}) => {

});

Then('the system should reject the input and display {string}', async ({}, arg) => {

});

Given('a workflow stage is open for configuration', async ({}) => {

});

When('I add or update a stage requirement with base64 content in its description', async ({}) => {

});

Then('the system should block the update and show a message {string}', async ({}, arg) => {

});


Given('I am logged in as {string}', async ({}, arg) => {

});

When('I click on the {string} tab', async ({ page }, tabName) => {

    if (tabName === 'Task Management') {
        const tabLocator = page.locator('//span[contains(@class, "item-title") and contains(text(), "Task Management")]');
        await tabLocator.waitFor({ state: 'visible' });
        await tabLocator.click();
    } else if (tabName === 'Users') {

    } else if (tabName === 'Advisors') {

    }


});


When('I click on the {string} button under Task Workflows', async ({ page }, arg) => {

    const taskWorkflowPage = new TaskWorkflowPage(page);
    await taskWorkflowPage.openAddNewWorkflow();
    await taskWorkflowPage.AddNewTaskWorkflow();
    await taskWorkflowPage.CloneWorkflow_click();

});

Then('a pop-up window should appear with the option to {string}', async ({}, arg) => {


});

When('I choose {string}', async ({}, arg) => {


});

When('I select the {string} option in the next prompt', async ({}, arg) => {


});

When('I click {string} to continue', async ({}, arg) => {


});

Then('a new configuration window should open', async ({}) => {


});

When('I fill in the required workflow details: Name, Description, Task steps, Assigned roles or teams', async ({}) => {


});

When('I click {string}', async ({}, arg) => {

});

Then('the workflow should be created and saved successfully', async ({}) => {

});

When('I navigate to {string} in the admin panel', async ({}, arg) => {

});

Then('I should see the {string} option on the screen', async ({}, arg) => {

});

When('I click on the {string} option in the new pop-up window', async ({}, arg) => {

});

When('I choose the workflow I want to clone', async ({}) => {

});

When('I modify the workflow details as needed', async ({}) => {

});

Then('I click {string} and the cloned workflow should be created successfully', async ({}, arg) => {

});

Given('I am logged in to Amplify as {string}', async ({}, arg) => {

});

When('I click on {string} from the admin dashboard', async ({}, arg) => {

});

When('I navigate to the organization-level settings page', async ({}) => {

});

When('I click on {string} from the left navigation', async ({}, arg) => {

});

Then('I should see screen options like Groups, Types, and Workflows', async ({}) => {

});

When('I click {string} to create a group category', async ({}, arg) => {

});

When('I click {string} to define a task type', async ({}, arg) => {

});

Then('I click {string} to create a workflow', async ({}, arg) => {

});

Given('I am logged in to Amplify with valid user credentials', async ({}) => {

});

When('I navigate to {string} from the Admin panel', async ({}, arg) => {

});

When('I select {string} from the left sidebar menu', async ({}, arg) => {

});

When('I click on {string} under the Groups section', async ({}, arg) => {

});

Then('a new pop-up window should appear', async ({}) => {

});

When('I enter the group name under the Group Information section', async ({}) => {

});

When('I choose Group Members, assign an Owner from the dropdown', async ({}) => {

});

Then('I click {string} to create the new group', async ({}, arg) => {

});

Given('I am logged in to Amplify with authorized credentials', async ({}) => {

});

When('I go to {string} in the Admin panel', async ({}, arg) => {

});

When('I select {string} from the menu options', async ({}, arg) => {

});

When('I click on {string} under Task Type', async ({}, arg) => {

});

When('I enter the task type name and assign a group', async ({}) => {

});

When('I select an appropriate workflow', async ({}) => {

});

Then('I click {string} to complete the task type setup', async ({}, arg) => {

});

When('I navigate to {string} from the admin panel', async ({}, arg) => {

});

When('I open organization-level settings', async ({}) => {

});

When('I select {string} from the left navigation', async ({}, arg) => {

});

Then('I should see options like Groups, Types, and Workflows', async ({}) => {

});

When('I click {string} to create a group', async ({}, arg) => {

});

Then('I click {string} to update or create a workflow', async ({}, arg) => {

});

Given('I am logged in to Amplify with admin access rights', async ({}) => {

});

When('I select {string} from the menu', async ({}, arg) => {

});

When('I open {string} and click {string}', async ({}, arg, arg1) => {

});

Then('I select the workflow I want to delete', async ({}) => {

});

When('I click the {string} icon', async ({}, arg) => {

});

Then('the selected workflow should be removed from the list', async ({}) => {

});

Given('I am logged in as the administrator', async ({}) => {

});

When('I navigate to {string} from the Admin menu', async ({}, arg) => {

});

When('I select {string} from the left sidebar', async ({}, arg) => {

});

Then('I open the workflow where a stage is needed', async ({}) => {

});

When('I scroll down and click {string}', async ({}, arg) => {

});

When('I fill in all required stage information fields', async ({}) => {

});

Then('I click {string} to complete stage creation', async ({}, arg) => {

});

When('I navigate to {string} from the side navigation', async ({}, arg) => {

});

When('I select {string} and click {string}', async ({}, arg, arg1) => {

});

Then('I open the workflow where the stage needs updating', async ({}) => {

});

When('I scroll down and update the stage information', async ({}) => {

});

Then('the updated stage should be saved successfully', async ({}) => {

});

Given('I am logged in with appropriate admin credentials', async ({}) => {

});

When('I go to {string} in the navigation menu', async ({}, arg) => {

});

When('I click on {string} in the left menu', async ({}, arg) => {

});

Then('I choose the group to delete', async ({}) => {

});

Then('the selected group should be removed from the system', async ({}) => {

});

Given('I am logged in using admin account', async ({}) => {

});

When('I go to {string} section from the Admin menu', async ({}, arg) => {

});

When('I click on {string}, then {string}', async ({}, arg, arg1) => {

});

Then('I should see a popup modal with the task type details from', async ({}) => {

});

Then('the new task type should be created successfully', async ({}) => {

});

When('I click on the Cancel button in the modal', async ({}) => {

});

Then('the modal should close without creating a new task type', async ({}) => {

});

When('I go to {string} in the admin panel', async ({}, arg) => {

});

Then('I should see the popup for task type creation with file upload option', async ({}) => {

});

When('I click on the {string} button and select files', async ({}, arg) => {

});

When('I click on the Cancel button instead of saving', async ({}) => {

});

Then('the modal should close and no task type should be created', async ({}) => {

});
When(/^user initiates AddNewTaskWorkflow$/, function () {

});



Then('the response status should be {int}', async ({}, arg) => {

});






Then('the response status should be {string}', async ({}, arg) => {
    // Step: Then the response status should be 200
    // From: Features\Team2\features\API.feature:7:5
});

Given('the user navigates to the Clients section as {string}', async ({}, arg) => {
    // Step: Given the user navigates to the Clients section as "user"
    // From: Features\Team2\features\taskManagment.feature:172:3
});

When('I go to {string} in the client section', async ({}, arg) => {
    // Step: When I go to "Tasks" in the client section
    // From: Features\Team2\features\taskManagment.feature:173:3
});

When('I enter a valid Task Type', async ({}) => {
    // Step: When I enter a valid Task Type
    // From: Features\Team2\features\taskManagment.feature:177:3
});

Then('another pop-up window should appear', async ({}) => {
    // Step: Then another pop-up window should appear
    // From: Features\Team2\features\taskManagment.feature:179:3
});

When('I fill in {string} and {string}', async ({}, arg, arg1) => {
    // Step: When I fill in "Task Name" and "Description"
    // From: Features\Team2\features\taskManagment.feature:180:3
});

Then('the new task should be created successfully', async ({}) => {
    // Step: Then the new task should be created successfully
    // From: Features\Team2\features\taskManagment.feature:182:3
});



When('a new window appears', async ({}) => {
    // Step: And a new window appears
    // From: Features\Team2\features\taskManagment.feature:187:3
});

When('I select a Group Member from the dropdown', async ({}) => {
    // Step: And I select a Group Member from the dropdown
    // From: Features\Team2\features\taskManagment.feature:189:3
});

Then('a pop-up window should appear', async ({}) => {
    // Step: Then a pop-up window should appear
    // From: Features\Team2\features\taskManagment.feature:190:3
});

Then('I should see the list of members related to the selected Group Member displayed', async ({}) => {
    // Step: Then I should see the list of members related to the selected Group Member displayed
    // From: Features\Team2\features\taskManagment.feature:191:3
});


Given('the user logs in to Amplify', async ({}) => {
    // Step: Given the user logs in to Amplify
    // From: Features\Team2\features\taskManagment.feature:196:3
});

When('the user navigates to the Clients → Tasks section', async ({}) => {
    // Step: When the user navigates to the Clients → Tasks section
    // From: Features\Team2\features\taskManagment.feature:197:3
});

When('clicks on the Task Management tab', async ({}) => {
    // Step: And clicks on the Task Management tab
    // From: Features\Team2\features\taskManagment.feature:198:3
});

When('selects a Task Title from the list', async ({}) => {
    // Step: And selects a Task Title from the list
    // From: Features\Team2\features\taskManagment.feature:199:3
});

When('clicks on the Stage section inside the Task', async ({}) => {
    // Step: And clicks on the Stage section inside the Task
    // From: Features\Team2\features\taskManagment.feature:200:3
});

When('clicks on any created stage', async ({}) => {
    // Step: And clicks on any created stage
    // From: Features\Team2\features\taskManagment.feature:201:3
});

Then('the stage details should be displayed', async ({}) => {
    // Step: Then the stage details should be displayed
    // From: Features\Team2\features\taskManagment.feature:202:3
});

When('the user uses pagination arrows', async ({}) => {
    // Step: When the user uses pagination arrows
    // From: Features\Team2\features\taskManagment.feature:203:3
});

Then('the stage list should update accordingly', async ({}) => {
    // Step: Then the stage list should update accordingly
    // From: Features\Team2\features\taskManagment.feature:204:3
});



When('the user navigates to the Admin Organizations section', async ({}) => {
    // Step: When the user navigates to the Admin Organizations section
    // From: Features\Team2\features\taskManagment.feature:210:3
});

When('the user clicks on the Task Management tab', async ({}) => {
    // Step: And the user clicks on the Task Management tab
    // From: Features\Team2\features\taskManagment.feature:211:3
});

When('the user opens the Task Workflow section', async ({}) => {
    // Step: And the user opens the Task Workflow section
    // From: Features\Team2\features\taskManagment.feature:212:3
});

When('the user selects a workflow from the list', async ({}) => {
    // Step: And the user selects a workflow from the list
    // From: Features\Team2\features\taskManagment.feature:213:3
});

Then('a new popup window should appear', async ({}) => {
    // Step: Then a new popup window should appear
    // From: Features\Team2\features\taskManagment.feature:214:3
});

When('the user navigates to the Stage section', async ({}) => {
    // Step: When the user navigates to the Stage section
    // From: Features\Team2\features\taskManagment.feature:215:3
});

When('the user selects the stage to be deleted', async ({}) => {
    // Step: And the user selects the stage to be deleted
    // From: Features\Team2\features\taskManagment.feature:216:3
});

When('the user clicks on the Delete stage icon', async ({}) => {
    // Step: And the user clicks on the Delete stage icon
    // From: Features\Team2\features\taskManagment.feature:217:3
});

Then('the selected stage should be deleted successfully', async ({}) => {
    // Step: Then the selected stage should be deleted successfully
    // From: Features\Team2\features\taskManagment.feature:218:3
});



When('navigates to the Hamburger menu', async ({}) => {
    // Step: And navigates to the Hamburger menu
    // From: Features\Team2\features\taskManagment.feature:224:3
});

Then('the user should see a button labeled {string}', async ({}, arg) => {
    // Step: Then the user should see a button labeled "Initialize Tasks"
    // From: Features\Team2\features\taskManagment.feature:226:3
});



Then('a {string} should appear with the labels {string} and {string}', async ({}, arg, arg1, arg2) => {
    // Step: Then a "Model Popup" should appear with the labels "Cancel" and "Continue"
    // From: Features\Team2\features\taskManagment.feature:234:3
});



When('the user navigates to the Clients', async ({}) => {
    // Step: When the user navigates to the Clients
    // From: Features\Team2\features\taskManagment.feature:197:3
});

Then('navigates to Tasks section', async ({}) => {
    // Step: Then navigates to Tasks section
    // From: Features\Team2\features\taskManagment.feature:198:3
});

Then('the user selects a Task Title from the list', async ({}) => {
    // Step: And the user selects a Task Title from the list
    // From: Features\Team2\features\taskManagment.feature:227:3
});

Then('the user clicks on the {string} section inside the Task', async ({}, arg) => {
    // Step: And the user clicks on the "Stage" section inside the Task
    // From: Features\Team2\features\taskManagment.feature:228:3
});

Then('the user clicks on any created stage', async ({}) => {
    // Step: And the user clicks on any created stage
    // From: Features\Team2\features\taskManagment.feature:229:3
});

Then('the user should be able to see the stage details', async ({}) => {
    // Step: Then the user should be able to see the stage details
    // From: Features\Team2\features\taskManagment.feature:230:3
});

When('the user uses the arrows to navigate stage pagination', async ({}) => {
    // Step: When the user uses the arrows to navigate stage pagination
    // From: Features\Team2\features\taskManagment.feature:231:3
});

Then('the pagination should work correctly and display the appropriate stages', async ({}) => {
    // Step: Then the pagination should work correctly and display the appropriate stages
    // From: Features\Team2\features\taskManagment.feature:232:3
});

When('I select one member and assign them as Owner from the dropdown', async ({}) => {
    // Step: And I select one member and assign them as Owner from the dropdown
    // From: Features\Team2\features\taskManagment.feature:260:3
});

Then('I click on Add button', async ({}) => {
    // Step: Then I click on Add button
    // From: Features\Team2\features\taskManagment.feature:261:3
});

Then('I click on Ok', async ({}) => {
    // Step: Then I click on Ok
    // From: Features\Team2\features\taskManagment.feature:263:3
});

When('I select multiple members and assign one of them as Owner from the dropdown', async ({}) => {
    // Step: And I select multiple members and assign one of them as Owner from the dropdown
    // From: Features\Team2\features\taskManagment.feature:275:3
});


When('I select multiple members and assign multiple owners', async ({}) => {
    // Step: And I select multiple members and assign multiple owners
    // From: Features\Team2\features\taskManagment.feature:290:3
});

When('I enter the group name {string}', async ({}, arg) => {
    // Step: When I enter the group name "TeamAlpha2025ValidEntryUpToFiftyCharactersMaxOK"
    // From: Features\Team2\features\taskManagment.feature:303:3
});

Then('the group should be created successfully without validation error', async ({}) => {
    // Step: Then the group should be created successfully without validation error
    // From: Features\Team2\features\taskManagment.feature:306:3
});

When('I enter the task type name {string}', async ({}, arg) => {
    // Step: When I enter the task type name "QAReviewRound1TaskTypeForProjectX2025Final"
    // From: Features\Team2\features\taskManagment.feature:313:3
});

When('I assign a group', async ({}) => {
    // Step: And I assign a group
    // From: Features\Team2\features\taskManagment.feature:314:3
});

Then('the task type should be created successfully without error', async ({}) => {
    // Step: Then the task type should be created successfully without error
    // From: Features\Team2\features\taskManagment.feature:317:3
});

Then('I choose a group not assigned to any task type to delete', async ({}) => {
    // Step: Then I choose a group not assigned to any task type to delete
    // From: Features\Team2\features\taskManagment.feature:325:3
});

Then('the message {string} should be displayed', async ({}, arg) => {
    // Step: And the message "Group deleted successfully" should be displayed
    // From: Features\Team2\features\taskManagment.feature:328:3
});

Then('the stage list should update accordingly to reflect the new page of stages', async ({}) => {
    // Step: Then the stage list should update accordingly to reflect the new page of stages
    // From: Features\Team2\features\taskManagment.feature:342:3
});

When('the user attempts to move to the next stage without completing all required fields', async ({}) => {
    // Step: When the user attempts to move to the next stage without completing all required fields
    // From: Features\Team2\features\taskManagment.feature:355:3
});

Then('an alert should appear saying, {string}', async ({}, arg) => {
    // Step: Then an alert should appear saying, "All required stage requirements need to be completed before proceeding to a new stage."
    // From: Features\Team2\features\taskManagment.feature:356:3
});


Given('the user has filled in all mandatory fields \\(text input, date selection, dropdown, checkbox)', async ({}) => {
    // Step: Given the user has filled in all mandatory fields (text input, date selection, dropdown, checkbox)
    // From: Features\Team2\features\taskManagment.feature:359:3
});

When('the user clicks the button to move to the next stage', async ({}) => {
    // Step: When the user clicks the button to move to the next stage
    // From: Features\Team2\features\taskManagment.feature:360:3
});

Then('the transition should proceed successfully', async ({}) => {
    // Step: Then the transition should proceed successfully
    // From: Features\Team2\features\taskManagment.feature:361:3
});

Given('the user is viewing a stage in the {string} section', async ({}, arg) => {
    // Step: Given the user is viewing a stage in the "Stage" section
    // From: Features\Team2\features\taskManagment.feature:364:3
});

When('the user uses the pagination arrows', async ({}) => {
    // Step: When the user uses the pagination arrows
    // From: Features\Team2\features\taskManagment.feature:365:3
});

Then('the pagination should update the view with the appropriate stages', async ({}) => {
    // Step: Then the pagination should update the view with the appropriate stages
    // From: Features\Team2\features\taskManagment.feature:366:3
});

Then('I select a task type to delete', async ({}) => {
    // Step: Then I select a task type to delete
    // From: Features\Team2\features\taskManagment.feature:154:3
});

Then('I choose a group to delete', async ({}) => {
    // Step: Then I choose a group to delete
    // From: Features\Team2\features\taskManagment.feature:382:3
});

When('the delete request is still processing', async ({}) => {
    // Step: And the delete request is still processing
    // From: Features\Team2\features\taskManagment.feature:384:3
});

Then('the {string} icon for any other group should be disabled', async ({}, arg) => {

});

Then('no new delete operation should be allowed until the first completes', async ({}) => {

});

When('the workflow delete request is processing', async ({}) => {

});

Then('all other delete icons in the workflow list should be disabled', async ({}) => {

});

Then('no additional delete requests should be triggered', async ({}) => {

});

When('the delete request is still being processed', async ({}) => {

});

Then('the delete icon for other task types should be disabled', async ({}) => {

});


Then('the UI should prevent triggering another delete action until the current one completes', async ({}) => {

});
