import { test, expect } from '@playwright/test';
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log In"]');

 }

  async navigate(route = '') {

      const envUrls = {
          dev: 'https://amplify-uidev2.azurewebsites.net',
          qa: 'https://app-westus-qa-gloabl-web-001.azurewebsites.net',
          prod: 'https://your-prod-url.com'
      };

      const baseUrl = envUrls['dev']; // Default to 'dev'
      await this.page.goto(`${baseUrl}/${route}`);
  }

/* async navigate() {
        const baseUrl = 'https://amplify-uidev2.azurewebsites.net';
        await this.page.goto(`${baseUrl}`);
 }*/

  async login(email, password) {
    await this.navigate();
    await this.page.getByText('Log In').click();
    await this.emailInput.fill(email);
    await this.page.getByText('Next').click();
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async login_uidev2(email, password, route) {
      await this.navigate('admin');
      await this.emailInput.fill(email);
      await this.page.getByText('Next').click();
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

  async verifyDashboard() {
      await this.page.waitForSelector('#dashboard');
      expect(await this.page.isVisible('#dashboard')).toBeTruthy();
  }
}

module.exports = { LoginPage };