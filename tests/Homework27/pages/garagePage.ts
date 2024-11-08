import { Page, Locator } from "@playwright/test";

export class GaragePage {
    private page: Page;
    elements: Map<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        this.elements = new Map([
            ["addCarBtn", this.page.locator('//button[contains(text(),"Add car")]')],
            ["mileage", this.page.locator('#addCarMileage')],
            ["model", this.page.locator('#addCarModel')],
            ["addBtn", this.page.locator('//div[@class="modal-footer d-flex justify-content-end"]//button[contains(text(),"Add")]')],
            ["carsList", this.page.locator('//ul[@class="car-list"]')],
        ]);
    }
    async addCar(mileage: string){
        await this.elements.get('addCarBtn')?.click();
        await this.elements.get('model')?.selectOption({index: 2});
        await this.elements.get('mileage')?.fill(mileage);
        await this.elements.get('addBtn')?.click();
    }


}