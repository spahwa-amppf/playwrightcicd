const {expect} = require("@playwright/test");

class ClientsPage {
  constructor(page) {
    this.page = page;
    this.clientsMenu = this.page.locator('//*[@class="topnav-items"]/amp-top-nav-menuitem/div/a[@title="Clients"]');
    this.clientsSubMenu = this.page.locator('//*[@class="topnav-subitems"]/amp-top-subnav-item/div/a[@title="Clients"]');
    this.searchInput = this.page.locator('(//th[@class="drag-exclude amp-table-filter"])[1]//*[@placeholder="Search"]');
    this.clientNameDisplay = (name) => this.page.locator('.name-display-style', {hasText: name});
    // this.page = page;
    this.InvestingPage = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/div/div[2]/amp-top-nav-menu/div/amp-top-nav-menuitem[3]/div/a/div');
    this.TradeManagement = this.page.locator('a[title="Trade Management"]');

    // Task Type locators

    this.Stagedleftnavigation = this.page.locator('//a[@class=\'sidemenu-item clickable\']/span[@class=\'item-title\' and text()=\'Staged\']');
    this.Management = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Management\']]');
    this.Approvals = this.page.locator('//a[contains(@class, "sidemenu-item") and .//span[text()="Approvals"]]');
    this.Rejected = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Rejected\']]');
    this.InProgress = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'In Progress\']]');
    this.Completed = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Complete\']]');
    this.PostTrade = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Post-Trade\']]');
    this.OrderRequest = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Order Requests\']]\n');
    this.Settings = this.page.locator('//a[@class=\'sidemenu-item clickable\'][span[@class=\'item-title\' and text()=\'Settings\']]');

    // Group locators
    this.ReBalancer = this.page.locator('//a[@href="/account/rebalance"][div[@class="trade-app-title" and text()="Rebalancer"]]');
    this.Swap = this.page.locator('//a[@href="/trade/swap"][div[@class="trade-app-title" and text()="Swap"]]');
    this.Market = this.page.locator('//a[contains(@class, \'sidemenu-item\') and .//span[text()=\'Market\']]');
    this.Watchlists = this.page.locator('//span[@class=\'item-title\' and text()=\'Watchlists\']');
    this.Marquee = this.page.locator('//a[contains(@class, \'sidemenu-item\') and .//span[text()=\'Marquee\']]');
    this.Filter = this.page.locator('//a[contains(@class, \'sidemenu-item\') and .//span[text()=\'Filter\']]');
    this.ApplyFilter = this.page.locator('//button[contains(text(), \'Apply Filter\')]');


    // User flow locators
    this.StagedIcon = this.page.locator('//*[@id="trade_app"]/div[2]/div[2]/div/div[1]/div[1]/div');
    this.Reports = this.page.locator('//div[contains(@class, \'topnav-subitem\')]//a[@href=\'/reports\' and @title=\'Reports\']');
    this.adminbutton = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/amp-top-subnav/div[1]/div[2]/amp-top-subnav-appgroup[1]/div/div[2]/amp-top-subnav-appitem[2]/a/div');
    this.Research = this.page.locator('//div[contains(@class, \'topnav-subitem\')]//a[@href=\'/research/market\' and @title=\'Research\']');
    this.Dashboard  = this.page.locator('//a[contains(@class, \'sidemenu-item\') and .//span[text()=\'Dashboard\']]');
    this.Filter = this.page.locator('//a[contains(@class, \'sidemenu-item\') and .//span[text()=\'Filter\']]');
    // this.systemMenu = this.page.locator('//span[@class=\'item-title\' and text()=\'Marquee\']');
    this.Onboarding = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/div/div[2]/amp-top-nav-menu/div/amp-top-nav-menuitem[2]/div/a');
    this.planning = this.page.locator('//*[@id="topNav"]/amp-top-nav/div/div/div[2]/amp-top-nav-menu/div/amp-top-nav-menuitem[2]/div/a');
    this.Onboarding = this.page.locator('//a[@href=\'/onboarding/dashboard\' and @title=\'Onboarding\']');
    this.Advisor = this.page.locator('//div[@class=\'card-title\']/div[text()=\'Advisor\']');
    this.AdvisorSearch = this.page.locator('//*[@id="dashboard2"]/div[1]/div[1]/div/div[1]/div/div[2]/div[1]/div[3]/div[1]/div[1]');
    this.Tonystark = this.page.locator('//ul[contains(@class, \'all-advisor\')]//li[.//h5[text()=\'Tony Stark\']]');
    this.JamesRhodes = this.page.locator('//div[@class=\'advisor-name-img\' and .//h5[text()=\'James Rhodes\']]');
    this.LarryBird = this.page.locator('//li[.//h5[text()=\'Larry Bird\']]');
    this.JarvisDemoBot = this.page.locator('//div[@class=\'advisor-name-img\'][.//h5[text()=\'Jarvis Demo Bot\']]');


  }
  async navigateToTradeManagement() {
    await this.InvestingPage.click();
    await this.TradeManagement.click();
  }

  async navigateToClients() {
    await this.clientsMenu.click();
    await this.clientsSubMenu.click();
  }

  async navigateToOnboarding() {
    await this.planning.click();
    await this.Onboarding.click();
  }

  async navigateToAdvisorSearch() {
    await this.AdvisorSearch.click();
  }

  async navigateToMarket() {
    await this.Market.click();
  }

  async navigateToApplyFilter() {
    await this.ApplyFilter.click();
  }

  async navigateToFilter() {
    await expect(this.Filter).toBeVisible();
  }

  async navigateToWatchlists() {
    await this.Watchlists.click();
  }

  async navigateToMarquee() {
    await expect(this.Marquee).toBeVisible();
  }


  async navigateToTonystark() {
    // await this.Tonystark.click();
    await expect(this.Tonystark).toBeVisible();
  }

  async navigateToJamesRhodes() {
    // await this.Tonystark.click();
    await expect(this.JamesRhodes).toBeVisible();
  }

  async navigateToLarryBird() {
    // await this.Tonystark.click();
    await expect(this.LarryBird).toBeVisible();
  }

  async navigateToJarvisDemoBot() {
    // await this.Tonystark.click();
    await expect(this.JarvisDemoBot).toBeVisible();
  }



  async navigateToAdvisor() {
    await expect(this.Advisor).toBeVisible();
  }

  async navigateToApprovals() {
    await this.Approvals.click();
  }


  async navigateToReports() {
    await this.Reports.click();
  }

  async navigateToResearch() {
    await this.InvestingPage.click();
    await this.Research.click();
  }

  async navigateToRejected() {
    await this.Rejected.click();
  }

  async navigateToStagedIcon() {
    // await this.StagedIcon.toBeVisible();
    await expect(this.StagedIcon).toBeVisible();
  }

  async navigateToInprogress() {
    await this.InProgress.click();
  }

  async navigateToStaged() {
    await this.Stagedleftnavigation.click();
  }

  async navigateToInvesting() {
    await this.InvestingPage.click();
}

  async navigateToComplete() {
    await this.Completed.click();
  }

  async navigateToOrderRequests() {
    await this.OrderRequest.click();
  }

  async navigateToPostTrade() {
    await this.PostTrade.click();
  }

  async navigateToSettings() {
    await this.Settings.click();
  }

  async navigateToManagement() {
    await this.Management.click();
  }

  async searchClient(clientName) {
    await this.searchInput.fill(clientName);
    await this.page.keyboard.press('Enter');
  }

  async verifyClientVisible(clientName) {
    await this.clientNameDisplay(clientName).waitFor({ state: 'visible', timeout: 10000 });
  }

  async openClientDetails(clientName) {
    await this.clientNameDisplay(clientName).click();
  }
}

module.exports = { ClientsPage };
