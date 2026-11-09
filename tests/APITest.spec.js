import { test, expect } from '@playwright/test';

test('@API Pure API Test: Create order and verify response', async ({ request }) => {
        // 1. Send Login Request
        const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
                data: { userEmail: "testing1996@gmail.com", userPassword: "Test@123" }
        });

        // Assert status and get token
        expect(loginResponse.status()).toBe(200);
        const loginJson = await loginResponse.json();
        const token = loginJson.token;
        expect(token).toBeTruthy();
        // 2. Send Create Order Request
        const orderResponse = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
                data: { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] },
                headers: {
                        'authorization': token,
                        'content-type': 'application/json'
                }
        });
        // Assert API response directly
        expect(orderResponse.status()).toBe(201);
        const orderJson = await orderResponse.json();
        expect(orderJson.message).toBe("Order Placed Successfully");
});