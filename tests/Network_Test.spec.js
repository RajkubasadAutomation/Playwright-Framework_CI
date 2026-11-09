import { test, expect, request } from '@playwright/test';
import ApiUtils from '../utils/ApiUtils';
const fakePayLoad={data:[],message:"No Orders"};

const loginPayLoad = { userEmail: "testing1996@gmail.com", userPassword: "Test@123" };
const orderPayload={"orders":[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils= new ApiUtils(apiContext,loginPayLoad);
    response=await apiUtils.createOrder(orderPayload);
})

test('@api Network Intercepting: check no Orders to disply in orders section', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client');

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route=>{
           const response= await page.request.fetch(route.request());
            let body= JSON.stringify(fakePayLoad);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    console.log(await page.locator('.mt-4').textContent());
})

test.skip('Failing this test for report purpose',async function({page}){
    await page.goto('https://rahulshettyacademy.com/client');
    await expect(this.successMsg).toHaveText(" Thankyou for the order. ",{timeout:120000});
    
})