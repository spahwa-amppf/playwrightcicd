class TaskManagementPage {
  constructor(page) {
    this.page = page;
    this.organizationsLink = this.page.locator('//a[contains(@href, "/admin/organization") and contains(text(), "Organizations")]');
    this.taskManagementMenu = this.page.locator('//span[contains(@class, "item-title") and contains(text(), "Task Management")]');

    // Task Type locators
    this.addNewTaskTypeBtn = this.page.locator('//*[contains(text(), "Add New Task Type")]');
    this.addTaskTypeModal = this.page.locator('//div[contains(text(), "Add Task Type")]');
    this.taskTypeNameInput = this.page.locator('//*[@id="task-type-name"]');
    this.workflowInput = this.page.locator('//*[@id="workflow"]');
    this.assignedGroupInput = this.page.locator('//*[@id="assigned-group"]');
    this.taskTypeCancelBtn = this.page.locator('//button[contains(text(), "Cancel")]');
    this.taskTypeSaveBtn = this.page.locator('//button[contains(@class, "save-task-type-button")]');

    // Group locators
    this.addNewGroupBtn = this.page.locator('//*[contains(text(), "Add New Group")]');
    this.groupNameInput = this.page.locator('//*[@id="group-name"]');
    this.groupDropdownSelection = this.page.locator('//*[@id="taskManagementAdminPanelApp"]//div[@class="amp-dropdown-selection"]');
    this.memberNameSpan = this.page.locator('//*[@id="displayName"]//span[contains(text(),"Member Name")]');
    this.jobTitleSpan = this.page.locator('//span[contains(text(),"Job Title")]');
    this.ownerColumn = this.page.locator('(//*[@class="amp-th-title clickable"]/span[contains(text(),"Owner")])[2]');
    this.groupCancelBtn = this.page.locator('//*[@class="btn group-modal-cancel"]');

    // User flow locators
    this.userMenu = this.page.locator('//div[@class="topnav-useritems"]//a[@class="topnav-usermenu"]');
    this.systemMenu = this.page.locator('//a[@class="topnav-app-item" and @title="System"]');
  }

  async navigateToOrganizations() {
    await this.organizationsLink.click();
  }

  async selectTaskManagement() {
    await this.taskManagementMenu.click();
  }

  // Task Type flow
  async openAddNewTaskType() {
    await this.addNewTaskTypeBtn.click();
  }

  async verifyAddTaskTypeModal() {
    await this.addTaskTypeModal.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskTypeNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.workflowInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.assignedGroupInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskTypeCancelBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.taskTypeSaveBtn.waitFor({ state: 'visible', timeout: 10000 });
  }

  async cancelAddTaskTypeModal() {
    await this.taskTypeCancelBtn.click();
  }

  // Group flow
  async openAddNewGroup() {
    await this.addNewGroupBtn.click();
  }

  async verifyAddGroupModal() {
    await this.groupNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.groupDropdownSelection.waitFor({ state: 'visible', timeout: 10000 });
    await this.memberNameSpan.waitFor({ state: 'visible', timeout: 10000 });
    await this.jobTitleSpan.waitFor({ state: 'visible', timeout: 10000 });
    await this.ownerColumn.waitFor({ state: 'visible', timeout: 10000 });
  }

  async cancelAddGroupModal() {
    await this.groupCancelBtn.click();
  }

  // User flow
  async openUserMenu() {
    await this.userMenu.click();
  }

  async clickSystem() {
    await this.systemMenu.click();
  }
}

module.exports = { TaskManagementPage };
