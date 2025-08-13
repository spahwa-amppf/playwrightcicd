import { test, expect } from '@playwright/test';
class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = 'h1';
  }

  async navigate() {
    await this.page.goto('https://demo.amplifyplatform.com');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getHeadingText() {
    return await this.page.textContent(this.heading);
  }
}

module.exports = HomePage;
