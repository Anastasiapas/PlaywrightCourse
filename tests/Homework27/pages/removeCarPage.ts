import { Page, Locator } from "@playwright/test";

export class RemoveCarPage {
    private page: Page;
    elements: Map<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        this.elements = new Map([
            ["editCar", this.page.locator('//button[@class="car_edit btn btn-edit"]')],
            ["removeCarBtn", this.page.locator('//button[contains(text(),"Remove car")]')],
            ["removeBtn", this.page.locator('//div[@class="modal-content"]//button[text()="Remove"]')],
        ]);
    }

    async waitForElement(element: string) {
        const locator = this.elements.get(element);
        if (!locator) {
            throw new Error(`Element '${element}' not found in elements map.`);
        }
        await locator.waitFor({ state: "visible" });
    }
    async removeCar(){
        await this.elements.get('editCar')?.click();
        await this.elements.get('removeCarBtn')?.click();
        await this.waitForElement('removeBtn');
        await this.elements.get('removeBtn')?.click();
    }
};