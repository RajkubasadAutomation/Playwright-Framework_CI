import { Before, After, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import POManager from '../../pageObjects/POManager.js';

Before(async function () {
    let browser;

    if (process.env.PLAYWRIGHT_SERVICE_URL) {
        // ✅ Running in Azure (GitHub Actions CI)
        // Connect to Microsoft Playwright Testing cloud browser
        browser = await chromium.connect(process.env.PLAYWRIGHT_SERVICE_URL, {
            timeout: 3 * 60 * 1000, // 3 minutes
        });
    } else {
        // ✅ Running locally
        browser = await chromium.launch({
            headless: false,
        });
    }

    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    this.browser = browser; // store to close in After hook
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
    console.log('Scenario done — browser closed');
});

BeforeStep(function () {
    console.log('This IS EVERY STEP ');
});

AfterStep(async function ({ result }) {
    // Take screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});
