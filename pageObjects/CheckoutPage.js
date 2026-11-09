import { expect } from "@playwright/test";
class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.country = page.locator('[placeholder="Select Country"]');
        this.country_result = page.locator('.ta-results');
        this.placeOrderBtn = page.locator('.action__submit');
        this.successMsg = page.locator('.hero-primary');

    }

    async placeOrder(country, countryName) {
        await this.country.pressSequentially(country,{dealy:150});
        const dropdown = this.country_result;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text == countryName) {
                await dropdown.locator("button").nth(i).click();
                break;
            }

        }
        await this.placeOrderBtn.click();
        await expect(this.successMsg).toHaveText(" Thankyou for the order. ",{timeout:120000});

    }
}
export default CheckoutPage;