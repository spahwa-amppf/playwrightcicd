import {test, expect} from '@playwright/test';

export class TaskWorkflowPage {
  constructor(page) {
    if (!page) {
      throw new Error("Page object is undefined in TaskWorkflowPage constructor");
    }
    this.page = page;
  }

  async waitBeforeNavigation() {
    await this.page.waitForTimeout(10000); // wait 10 seconds
  }

  async getCurrentUrl() {
    return await this.page.url();
  }

  async navigateToTaskManagementViaRoute(route = '') {
    const currentUrl = await this.getCurrentUrl(); // Use this.getCurrentUrl()
    await this.page.goto(`${currentUrl}/${route}`); // Correct template literal
  }

  async navigateToOrganizations() {

    const organizationsLink = this.page.locator('//a[contains(@href, "/admin/organization") and contains(text(), "Organizations")]');
    await organizationsLink.waitFor({ state: 'visible' }); // smart wait
    await organizationsLink.click();
  }

  async navigateToTaskManagement() {
    await this.page.locator('//span[contains(text(), "Task Management")]').click();
  }

  async TaskManagementLeftSide() {
    await this.page.locator('//span[contains(text(), "Task Management")]').click();
  }

  async verifyTaskWorkflowSection() {
    await expect(this.page.locator('//span[contains(text(), "Add New Group")]')).toBeVisible();
    await expect(this.page.locator('//div[contains(text(), "Task Types")]')).toBeVisible();
    await expect(this.page.locator('//div[contains(text(), "Task Workflows")]')).toBeVisible();
  }

  async AddNewGroup() {
    await this.page.locator('//span[contains(text(), "Add New Group")]').click();
  }

  async FromScratch() {
    await this.page.locator('//div[contains(text(), \"From Scratch\")]').click();
  }

  async Confirm() {
    await this.page.locator('//button[contains(text(), \"Confirm\")]').click();
  }

  async AddGroup() {
    await expect(this.page.locator('//*[contains(text(), \"Add New Group\")]')).toBeVisible();
  }

  async System() {
    await this.page.locator('//a[@class=\"topnav-app-item\" and @title=\"System\"]').click();
  }
  
  async AddNewTaskType() {
    await this.page.locator('//*[contains(text(), "Add New Task Type")]').click();
  }

  async TaskType() {
    await this.page.locator('//div[contains(text(), "Task Types")]').click();
  }


  async AddTaskType() {
    await expect(this.page.locator('//div[contains(text(), \"Add Task Type\")]')).toBeVisible();
  }

  async openAddNewWorkflow() {
    await expect(this.page.locator('//button[contains(text(), \"Add New Task Workflow\")]')).toBeVisible();
  }

  async AddNewTaskWorkflow() {
    await this.page.locator('//button[contains(text(), \"Add New Task Workflow\")]').click();
  }
  async CreateNewWorkflow() {
    await expect(this.page.locator('//*[contains(text(), \"Create New Workflow\")]')).toBeVisible();
  }

  async verifyWorkflowOptions() {

    await expect(this.page.locator('//div[contains(text(), \"From Scratch\")]')).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator('//div[contains(text(), \"Clone\")]')).toBeVisible({ timeout: 10000 });
  }
  async CloneWorkflow_click() {
    await this.page.locator('//div[contains(text(), \"Clone\")]').click();
  }

  async verifyActionButtons() {
    await this.page.locator('//div[contains(text(), \"From Scratch\")]').click();
    await this.page.locator('//button[contains(text(), \"Confirm\")]').click();

    await this.page.locator('//div[contains(text(), \"Clone\")]').click();
    await this.page.locator('//button[contains(text(), \"Confirm\")]').click();

  }

  async cancelAddWorkflow() {
    await this.page.locator('//button[contains(text(), \"Cancel\")]').click();
  }
}
