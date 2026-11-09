import { expect } from "@playwright/test";
class CartPage {

    constructor(page) {
        this.page = page;
        this.viewcartProduct=page.locator('div li');
        this.checkout_Btn=page.getByText('Checkout')
    }

    async check_CartPage(productName) {
        await this.viewcartProduct.first().waitFor();
        const bol = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        expect(bol).toBeTruthy();
        await this.checkout_Btn.click();
    }
}
export default CartPage;