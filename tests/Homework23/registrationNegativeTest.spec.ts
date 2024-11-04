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

test.describe("Field 'Name'", () => {
  test("Verify error message for the 'Name' field", async () => {
    await registrationPage.clickOnElement("name");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toBeVisible();
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Name required"
    );
  });
  test("Field 'Name': verify wrong data error message", async () => {
    await registrationPage.enterInfo("name", wrongTestData[0].name);
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Name is invalid"
    );
  });
  test("Field 'Name': verify wrong length error message", async () => {
    await registrationPage.enterInfo("name", wrongLengthTestData[0].name);
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });
  test("Field 'Name': verify border on error", async () => {
    await registrationPage.clickOnElement("name");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("name")).toHaveCSS(
      "border-bottom-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Field 'Last Name'", () => {
  test("Verify error message for the 'Last Name' field", async () => {
    await registrationPage.clickOnElement("lastName");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toBeVisible();
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Last name required"
    );
  });
  test("Field 'Last Name': verify wrong data error message", async () => {
    await registrationPage.enterInfo("lastName", wrongTestData[0].lastName);
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Last name is invalid"
    );
  });
  test("Field 'Last Name': verify wrong length error message", async () => {
    await registrationPage.enterInfo(
      "lastName",
      wrongLengthTestData[0].lastName
    );
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });
  test("Field 'Last Name': verify border on error", async () => {
    await registrationPage.clickOnElement("lastName");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("lastName")).toHaveCSS(
      "border-bottom-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Field 'Email'", () => {
  test("Verify error message for the 'Email' field", async () => {
    await registrationPage.clickOnElement("email");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toBeVisible();
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Email required"
    );
  });
  test("Field 'Email': verify wrong data error message", async () => {
    await registrationPage.enterInfo("email", wrongTestData[0].email);
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Email is incorrect"
    );
  });
  test("Field 'Email': verify border on error", async () => {
    await registrationPage.clickOnElement("email");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("email")).toHaveCSS(
      "border-bottom-color",
      "rgb(220, 53, 69)"
    );
  });
});

test.describe("Field 'Password'", () => {
  test("Field 'Password': verify error message for the 'Password' field", async () => {
    await registrationPage.clickOnElement("password");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toBeVisible();
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Password required"
    );
  });
  test("Field 'Password': verify wrong data error message", async () => {
    await registrationPage.enterInfo("password", wrongTestData[0].password);
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });
  test("Field 'Password': verify border on error", async () => {
    await registrationPage.clickOnElement("password");
    await page.press("body", "Tab");
    expect(registrationPage.elements.get("password")).toHaveCSS(
      "border-bottom-color",
      "rgb(220,53,69)"
    );
  });
});

test.describe("Field ' Re-enter Password'", () => {
  test("Field ' Re-enter Password': verify error message for the 'Re-enter Password' field", async () => {
    await registrationPage.clickOnElement("re-enterPassword");
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toBeVisible();
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Re-enter password required"
    );
  });
  test("Field ' Re-enter Password': verify wrong data error message", async () => {
    await registrationPage.enterInfo(
      "re-enterPassword",
      validTestData[0].reEnterPassword
    );
    await registrationPage.enterInfo(
      "re-enterPassword",
      wrongTestData[0].reEnterPassword
    );
    await page.press("body", "Tab");
    await expect(registrationPage.elements.get("errorMsg")).toHaveText(
      "Passwords do not match"
    );
  });
});

test.afterAll(async () => {
  await page.context().browser().close();
});
