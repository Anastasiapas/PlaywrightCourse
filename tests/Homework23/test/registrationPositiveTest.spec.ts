import { expect, test } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { wrongTestData, wrongLengthTestData, validTestData } from "../testData/testData";

let registrationPage: RegistrationPage;
let page: any;

test.beforeEach(async ({ page }) => {
  registrationPage = new RegistrationPage(page);
  await page.goto('/');
  await registrationPage.clickOnElement("signUpBtn");
});

test.describe("Verify user can be registered", () => {
  test("Verify user can be registered", async () => {
    await registrationPage.enterInfo("name", validTestData[0].name);
    await registrationPage.enterInfo("lastName", validTestData[0].lastName);
    await registrationPage.enterInfo("email", validTestData[0].email);
    await registrationPage.enterInfo("password", validTestData[0].password);
    await registrationPage.enterInfo("re-enterPassword", validTestData[0].password);
    await registrationPage.clickOnElement("registerBtn");
    await expect(registrationPage.elements.get("userProfile")).toBeVisible();
  });
});

