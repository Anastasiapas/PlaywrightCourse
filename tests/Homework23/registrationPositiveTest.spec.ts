import { chromium, expect, test } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";
import { wrongTestData, wrongLengthTestData, validTestData } from "./testData";

let registrationPage: RegistrationPage;
let page: any;

test.beforeEach(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
  });
  page = await context.newPage();
  await page.goto("https://qauto.forstudy.space/");
  registrationPage = new RegistrationPage(page);
  await registrationPage.clickOnElement("signUpBtn");
});

test.describe("Verify user can be registered", () => {
  test("Verify user can be registered", async () => {
    await registrationPage.enterInfo(
        "name",
        validTestData[0].name
    );
    await registrationPage.enterInfo(
        "lastName",
        validTestData[0].lastName
    );
    await registrationPage.enterInfo(
        "email",
        validTestData[0].email
    );
    await registrationPage.enterInfo(
        "password",
        validTestData[0].password
    );
    await registrationPage.enterInfo(
        "re-enterPassword",
        validTestData[0].reEnterPassword
    );
    await registrationPage.clickOnElement("registerBtn");
    await expect(registrationPage.elements.get("userProfile")).toBeVisible();
  });
});

test.afterAll(async () => {
  await page.context().browser().close();
});
