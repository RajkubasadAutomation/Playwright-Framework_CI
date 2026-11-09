import { expect } from "@playwright/test";
class OrdersPage {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersPage = page.locator('[routerlink*="orders"]');
        this.orders_table = page.locator('tbody');
        this.orderId_SummaryPage = page.locator('.col-text');
    }

    async getOrderId() {
        const orderiD = await this.orderId.textContent();
        return orderiD;
    }

    async navigateToOrdersPage() {
        await this.ordersPage.first().click();
    }

    async verifyOrderisDisplayed(orderId) {
        await this.orders_table.waitFor();
        const rows = this.orders_table.locator('tr');
        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderNo = await rows.nth(i).locator('th').textContent();
            if (orderId.includes(rowOrderNo)) {
                await rows.nth(i).locator('button').first().click();
                break;
            }
        }
        const orderIdDetails = await this.orderId_SummaryPage.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}
export default OrdersPage;