import { Locator, Page } from '@playwright/test'

export class ProductsPage{
    readonly page: Page;
       
    constructor(page: Page) {
        this.page = page;    
    }

    async openProduct(productId: string) {
        const product = this.page.locator(`#${productId}`);
        await product.scrollIntoViewIfNeeded();
        await product.click();
    }
}