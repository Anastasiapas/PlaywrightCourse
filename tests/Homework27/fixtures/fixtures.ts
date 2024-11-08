import { LoginPage } from "../pages/loginPage";
import { user } from "../credentials";
import { RemoveCarPage } from "../pages/removeCarPage";
import * as fs from "fs";
import { test as base, expect, BrowserContext } from "@playwright/test";

type myFixtures = {
  loggedInUser: LoginPage;
  cleanUp: RemoveCarPage;
};

const authFile = './auth.json'
export const test = base.extend<myFixtures>({
  loggedInUser: async ({ page, browser }, use) => {

    const context = await browser.newContext();

    if (fs.existsSync(authFile)) {
      await context.storageState({ path: authFile });
    } else {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.login(user.email, user.password);
    await use(loginPage);
  }},
  cleanUp: async ({ page }, use) => {
    const cleanUpPage = new RemoveCarPage(page);
    await use(cleanUpPage);
    await cleanUpPage.removeCar();
  },
});

export { expect } from "@playwright/test";
