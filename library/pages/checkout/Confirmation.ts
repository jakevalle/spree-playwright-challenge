import { Locator, Page, expect } from '@playwright/test'

export class ConfirmationPage {
    readonly page: Page;
    readonly confirmationNo: Locator;
    readonly confirmationSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmationNo = page.locator('div#checkout strong');
        this.confirmationSection = page.locator('div#checkout');
    }

    async getConfirmationNo() {
        return await this.confirmationNo.textContent();
    }

    async verifyDetails() {
        await expect(this.page.locator('#checkout')).toContainText('Thanks Test for your order!');   
        await expect(this.page.locator('#checkout')).toContainText('Your order is confirmed!');   
        await expect(this.page.locator('#checkout')).toContainText('When your order is ready, you will receive an email confirmation.'); 
    }
}