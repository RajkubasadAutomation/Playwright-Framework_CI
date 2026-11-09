class DashboardPage {

    constructor(page) {
        this.page = page;
        this.listOf_Products = page.locator('.card-body');
        this.products_Name = page.locator('.card-body h5');
        this.cart = page.locator('[routerlink="/dashboard/cart"]')
    }


    async productAddToCart(productName) {
        await this.listOf_Products.first().waitFor();
        const allProductsNames = await this.products_Name.allTextContents();
        console.log(allProductsNames);
        const productCount = await this.listOf_Products.count();
        console.log("TOTAL PRODUCTS IN CART==>" + productCount);
        for (let i = 0; i < productCount; i++) {
            if (await this.listOf_Products.nth(i).locator('b').textContent() == productName) {
                await this.listOf_Products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigate_ToCart() {
        await this.cart.click();
    }
}
export default DashboardPage;