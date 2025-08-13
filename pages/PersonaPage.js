class PersonaPage {
  constructor(page) {
    this.page = page;
    this.organizations = this.page.locator('//a[contains(@href, "/admin/organization") and contains(text(), "Organizations")]');
    //this.taskManagementMenu = this.page.locator('//span[contains(@class, "item-title") and contains(text(), "Task Management")]');

    this.Clients = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/div/div[2]/amp-top-nav-menu/div/amp-top-nav-menuitem[4]/div/a/div');

    this.ToClients = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/amp-top-subnav/div[1]/div[2]/amp-top-subnav-item[1]/div');
  }

  // async navigateToClients() {
  //   await this.Clients.click();
  // }

  async navigateToOrganizations() {
    await this.ToClients.click();
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

module.exports = { PersonaPage };
