import { test, expect } from '@playwright/test';
class FirmsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
 }

    async selectFirmsName(firmName) {

        const firmNameLocator = this.page.locator('//span[contains(text(), "Stark Advisors")]/..');
        await firmNameLocator.waitFor({ state: 'visible' }); // smart wait
        await firmNameLocator.click();
    }


}

module.exports = { FirmsPage };