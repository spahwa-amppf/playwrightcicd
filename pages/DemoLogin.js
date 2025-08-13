const Utils = require('./utility/Utils');
const FieldLabels = require('./utility/FieldName');

class DemoLogin {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    if (!page) {
      throw new Error("Page object is undefined in DemoLogin constructor");
    }
    this.page = page;
    this.utils = new Utils(this.page);
  }

  async navigate(route = '') {
    await this.page.goto('https://forms-test.amplifyplatform.com/' + route);
  }

  async login(email, password) {
    await this.navigate();
    await this.utils.getLocatorByRoleAndName('link', FieldLabels.login.loginLink).click();
    await this.utils.getLocatorByRoleAndName('textbox', FieldLabels.login.emailTextbox).fill(email);
    await this.utils.getLocatorByRoleAndName('button', FieldLabels.login.nextButton).click();
    await this.utils.getLocatorByRoleAndName('textbox', FieldLabels.login.passwordTextbox).fill(password);
    await this.utils.getLocatorByRoleAndName('button', FieldLabels.login.submitButton).click();
  }
}

module.exports = DemoLogin;
