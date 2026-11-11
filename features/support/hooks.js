import { Before,After,BeforeStep,AfterStep,BeforeAll,AfterAll,Status} from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import POManager from '../../pageObjects/POManager.js';

Before(async function () {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After(function(){
    console.log("This is last:once all scenario done this will execute")
})

BeforeStep(function(){
    console.log('This IS EVERY STEP ')
})

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
       await this.page.screenshot({path:'screenshot1.png'});
  }
})


