import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.OrdersPage = new OrdersPage(this.page);
        this.CartPage = new CartPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getdashboardPage() {
        return this.dashboardPage;
    }

    getordersPage() {
        return this.OrdersPage;
    }
    getCartPage() {
        return this.CartPage;
    }
    getCheckoutPage() {
        return this.CheckoutPage;
    }

}
export default POManager;