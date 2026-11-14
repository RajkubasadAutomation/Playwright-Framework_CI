const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
module.exports = defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    /*
    Playwright Workspaces Reporter:
    Uploads test results and reports to Microsoft Playwright Testing in Azure Portal.
    HTML reporter must come BEFORE the Azure reporter.
    */
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);
