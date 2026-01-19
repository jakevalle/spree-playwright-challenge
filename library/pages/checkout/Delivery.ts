import { Locator, Page } from '@playwright/test'

export class DeliveryPage {
    readonly page: Page;
    readonly saveButton: Locator;
    readonly deliveryMethodList:Locator;

    constructor(page: Page) {
        this.page = page;
        this.deliveryMethodList = page.locator('#shipping-method');
        this.saveButton = page.getByRole('button', { name: 'Save and Continue' });
    }
    
    async selectDelivery(methodName: string) {
        await this.page.locator('li', { hasText: methodName }).click();
        await this.saveButton.click();
    }

    async getDeliveryMethod(methodName: string) {
        let deliveryMethod = this.deliveryMethodList.locator('li', { hasText: methodName });
        deliveryMethod.waitFor({state: 'visible'});
        return deliveryMethod;
    }
}