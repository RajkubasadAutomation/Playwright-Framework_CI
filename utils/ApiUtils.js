class ApiUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayLoad
            }
        );
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();
        const orderRequest = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:
                {
                    'authorization': response.token,
                    'content-type': 'application/json'
                }
            }
        );
        const orderResponseJson = await orderRequest.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }

}

export default ApiUtils;
//module.exports = { ApiUtils };