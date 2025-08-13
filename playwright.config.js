const { defineConfig } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

process.env.ENV = process.env.ENV || 'dev';
const testDir = defineBddConfig({
  paths: ['Features/**/**/**.feature'],
  require: ['Features/**/step_definitions/**.js', 'Features/commonSteps/**.js']
});

module.exports = defineConfig({
  testDir,
  timeout: 120_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
 reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: { slowMo: 500 }
  },
projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
