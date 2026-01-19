import { Locator, Page, expect } from '@playwright/test'

export class Header {
    readonly page: Page;
    readonly shopAllLink: Locator;
    readonly accountPanelLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.shopAllLink = page.getByLabel('Top').getByRole('link', { name: 'Shop All' });
        this.accountPanelLink = page.getByLabel('Open account panel')
    }

    async goToProducts() {
        await this.shopAllLink.click();
    }

    async openAccountPanel() {
        await this.accountPanelLink.click();
    }
}