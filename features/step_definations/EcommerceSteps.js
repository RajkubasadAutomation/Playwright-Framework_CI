import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import POManager from '../../pageObjects/POManager.js';

Given('a login Ecommerce application  with {string} and {string}', { timeout: 10000 }, async function (username, password) {
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.enter_Valid_Login(username, password);
})

When('add {string} to cart', async function (productname) {
    this.dashboardPage = this.poManager.getdashboardPage();;
    await this.dashboardPage.productAddToCart(productname);
    await this.dashboardPage.navigate_ToCart();
})

Then('verify {string} is displayed in the cart', async function (productname) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.check_CartPage(productname);
})
When('enter valid details and place the order', async function () {
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.placeOrder('ind', " India");
});
Then('verify order is present in ther order history', async function () {
    this.ordersPage = this.poManager.getordersPage();
    const orderId = await this.ordersPage.getOrderId();
    await this.ordersPage.navigateToOrdersPage();
    await this.ordersPage.verifyOrderisDisplayed(orderId);
});
Given('a login Ecommerce2 application  with {string} and {string}', { timeout: 60000 }, async function(user, pwd){
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.enter_Valid_Login(user,pwd);
})
Then('verify Error Message is displayed',async function(){
  console.log(await this.page.locator('#toast-container').textContent());
  await expect(await this.page.locator('#toast-container')).toContainText(' Incorrect email or password. ')
})
