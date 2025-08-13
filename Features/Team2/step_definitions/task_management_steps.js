import { createBdd } from 'playwright-bdd';
const { Given, When, Then } = createBdd();
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { TaskManagementPage } = require('../../../pages/TaskManagementPage');
const { ClientsPage } = require('../../../pages/ClientsPage');

Given('I am logged in as {string}', async ({ page }) => {
  this.loginPage = new LoginPage(this.page);
  await this.navigate(route);
  await this.loginPage.login(role);

});

Given('I am logged in with username {string} and password {string}', async ({ page }, username, password) => {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login_uidev2(username, password);
});

When('I navigate to {string} in admin panel', async ({ page }, menuName) => {
  this.taskManagementPage = new TaskManagementPage(this.page);
  if (menuName === 'Organizations') {
    await this.taskManagementPage.navigateToOrganizations();
  }
});

When('I select {string}', async  ({ page },submenuName) => {
  if (submenuName === 'Task Management') {
    await this.taskManagementPage.selectTaskManagement();
  }
});

When('I click on {string}', async ({ page }, buttonName) => {
  if (buttonName === 'Add New Task Type') {
    await this.taskManagementPage.openAddNewTaskType();
  } else if (buttonName === 'Add New Group') {
    await this.taskManagementPage.openAddNewGroup();
  }
});

Then('I should see the {string} modal with required fields visible', async ({ page }, modalName) => {
  if (modalName === 'Add Task Type') {
    await this.taskManagementPage.verifyAddTaskTypeModal();
  } else if (modalName === 'Add Group') {
    await this.taskManagementPage.verifyAddGroupModal();
  }
});

When('I cancel the Add Task Type modal', async () => {
  await this.taskManagementPage.cancelAddTaskTypeModal();
});

When('I cancel the Add Group modal', async () => {
  await this.taskManagementPage.cancelAddGroupModal();
});

When('I open the user menu', async () => {
  await this.taskManagementPage.openUserMenu();
});

When('I click on Menu {string}', async ({}, arg) => {
 if (menuName === 'System') {
     await this.taskManagementPage.clickSystem();
   }
});

When('I navigate to "Clients" menu', async() => {
  this.clientsPage = new ClientsPage(this.page);
  await this.clientsPage.navigateToClients();
});

When('I search for client {string}', async({ page }, clientName) => {
  await this.clientsPage.searchClient(clientName);
});

Then('I should see the client in the results', async() => {
  // Assuming clientName is stored in the test context or passed explicitly
  // For simplicity, you can store clientName on this object
  await this.clientsPage.verifyClientVisible(this.clientName);
});

When('I open the client details', async() => {
  await this.clientsPage.openClientDetails(this.clientName);
});
