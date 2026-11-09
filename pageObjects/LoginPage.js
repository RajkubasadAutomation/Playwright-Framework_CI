class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = page.locator("[id='userEmail']");
        this.password = page.locator("#userPassword");
        this.signinbtn = page.locator('[value="Login"]');
        this.waitforProducts=page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }


    async enter_Valid_Login(username, password) {
        await this.page.locator("[id='userEmail']").fill(username);
        await this.page.locator("#userPassword").fill(password);
        await this.page.locator('[value="Login"]').click();
        await this.waitforProducts;
    }
}

export default LoginPage;