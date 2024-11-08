import { Page, Locator } from "@playwright/test";

export class LoginPage {
    private page: Page;
    elements: Map<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        this.elements = new Map([
            ["signIn", this.page.locator('//button[contains(text(),"Sign In")]')],
            ["email", this.page.locator('#signinEmail')],
            ["password", this.page.locator("#signinPassword")],
            ["login", this.page.locator('//button[contains(text(),"Login")]')],
        ]);
    }

    async waitForElement(element: string) {
        const locator = this.elements.get(element);
        if (!locator) {
            throw new Error(`Element '${element}' not found in elements map.`);
        }
        await locator.waitFor({ state: "visible" });
    }
    async login(email: string, password: string){
        await this.elements.get('signIn')?.click();
        await this.elements.get('email')?.fill(email);
        await this.elements.get('password')?.fill(password);
        await this.elements.get('login')?.click();
    }
}
