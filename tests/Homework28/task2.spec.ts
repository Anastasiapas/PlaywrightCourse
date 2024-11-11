import {test} from "@playwright/test";
import {expect} from "@playwright/test";

test.describe("API", () => {
    let authToken;

    test.beforeEach(async ({request}) => {
        const authRequest = await request.post("/api/auth/signin", {
            data: {
                email: "pasichnyk.nas23+678@gmail.com",
                password: "12345Rr!",
                remember: false,
            },
        });
        const authBody = await authRequest.json();
        authToken = authBody.token;
    });

    test("Verify a car can be added ", async ({request}) => {
        const newCar = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 67000,
        };

        const response = await request.post("/api/cars", {
            data: newCar,
            headers:{
                Authorization: `Bearer ${authToken}`,
            },
        });

        const body = await response.json();
        console.log(body);
        console.log(response);
        expect(response.status()).toBe(201);
        expect(body.data.mileage).toBe(newCar.mileage);
    });

    test("Verify invalid brand ID error message", async ({request}) => {
        const newCar = {
            carBrandId: 18374587,
            carModelId: 1,
            mileage: 54000,
        };

        const response = await request.post("/api/cars", {
            data: newCar,
            headers:{
                Authorization: `Bearer ${authToken}`,
            },
        });

        const body = await response.json();
        console.log(body);
        console.log(response);
        expect(response.status()).toBe(404);
        expect(body.message).toBe("Brand not found");
    });


    test("Verify null mileage error message ", async ({request}) => {
        const newCar = {
            carBrandId: 18374587,
            carModelId: 1,
            mileage: null,
        };

        const response = await request.post("/api/cars", {
            data: newCar,
            headers:{
                Authorization: `Bearer ${authToken}`,
            },
        });
        const body = await response.json();
        console.log(body);
        console.log(response);
        expect(body.status).toBe('error');
        expect(body.message).toBe('Invalid mileage type');
    });
});
