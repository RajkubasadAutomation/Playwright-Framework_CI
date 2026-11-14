// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  retries:1,
  timeout: 100000,
  expect: {
    timeout: 50000,
  },
  reporter: 'html',
  use: {
    actionTimeout: 10 * 10000,
    navigationTimeout: 30 * 10000,
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'off',
    ignoreHTTPSErrors: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: 'only-on-failure',
        video:'on-all-retries',
        trace:'on'
      },
    },
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        headless:true,
        screenshot:'only-on-failure',
        video:'on-first-retry'
      },
    },
    
   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile',
      use: { 
         headless: true,
        ...devices['iPhone SE (3rd gen)'] },
    },*/

  ]

});
module.exports = config;