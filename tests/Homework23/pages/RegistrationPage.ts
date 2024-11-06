import { Page, Locator } from "@playwright/test";

export class RegistrationPage {
  private page: Page;
  elements: Map<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = new Map([
      ["signUpBtn", this.page.locator('//button[contains(text(), "Sign up")]')],
      ["name", this.page.locator('//input[@id="signupName"]')],
      ["lastName", this.page.locator("#signupLastName")],
      ["email", this.page.locator("#signupEmail")],
      ["password", this.page.locator("#signupPassword")],
      ["re-enterPassword", this.page.locator("#signupRepeatPassword")],
      ["registerBtn", this.page.locator('//button[contains(text(), "Register")]'),],
      ["errorMsg", this.page.locator('//div[@class="invalid-feedback"]')],
      ["homeTab", this.page.locator('//a[@class="btn header-link -active" and contains(text(), "Home")]'),],
      ["userProfile", this.page.locator("#userNavDropdown")],
    ]);
  }

  async waitForElement(element: string) {
    const locator = this.elements.get(element);
    if (!locator) {
      throw new Error(`Element '${element}' not found in elements map.`);
    }
    await locator.waitFor({ state: "visible" });
  }

  async clickOnElement(element: string) {
    await this.waitForElement(element);
    await this.elements.get(element)?.click();
  }

  async enterInfo(element: string, text: string) {
    await this.waitForElement(element);
    await this.elements.get(element)?.fill(text);
  }
}
