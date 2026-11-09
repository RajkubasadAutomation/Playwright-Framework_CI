import { test, expect, } from '@playwright/test';
import POManager from '../pageObjects/POManager';
import placeorderTestData from '../utils/placeorderTestData.json';
const dataSet = JSON.parse(JSON.stringify(placeorderTestData));

for (const data of dataSet) {
    test(`@web E2E-Ecommerce App:login & add the product ${data.productName} & place Order, Verify order from orders Page`, async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.enter_Valid_Login(data.userName,data.passWord);
        const dashboard = poManager.getdashboardPage();
        await dashboard.productAddToCart(data.productName);
        await dashboard.navigate_ToCart();
        const cartPage = poManager.getCartPage();
        await cartPage.check_CartPage(data.productName);
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.placeOrder('ind', " India");
        const ordersPage = poManager.getordersPage();
        const orderId = await ordersPage.getOrderId();
        await ordersPage.navigateToOrdersPage();
        await ordersPage.verifyOrderisDisplayed(orderId);
    })
}