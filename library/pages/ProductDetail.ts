import { Locator, Page, expect } from '@playwright/test'
import { ProductOrder } from '../types/ProductOrder';
export class ProductDetailPage {
    readonly page: Page;
    readonly name: Locator;
    readonly regularPrice: Locator;
    readonly salePrice: Locator;   
    readonly quantitySpinButton: Locator;
    readonly addToCartButton: Locator;
    readonly colorListBox: Locator;
    readonly sizeButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('[data-editor-name="Name"]');
        this.regularPrice = page.locator('[data-editor-name="Price"] p:nth-of-type(1)');
        this.salePrice = page.locator('[data-editor-name="Price"] p:nth-of-type(2)');
        this.quantitySpinButton = page.getByRole('spinbutton', { name: 'Quantity' });
        this.addToCartButton = page.getByRole('button', { name: 'Add To Cart' });
        this.colorListBox =  page.getByRole('listbox', { name: 'Color' });
        this.sizeButton =  page.getByLabel('Please choose Size');
    }

    async getPriceDisplay() { 
        let regularPrice = await this.regularPrice.textContent();
        let salePrice = (await this.salePrice.count() > 0) ? await this.salePrice.textContent() : "";
        
        return salePrice ? `${regularPrice?.trim()} ${salePrice?.trim()}` : `${regularPrice?.trim()}`;
    }

    async addProductToCart(productOrder: ProductOrder) {
        await this.page.waitForLoadState('networkidle');

        await this.colorListBox.getByRole('option', { name: productOrder.color}).click();

        await this.sizeButton.click();
        let sizeOption = this.page.getByRole('menuitem', { name: productOrder.size });
        await sizeOption.waitFor({ state: 'attached' });
        await sizeOption.click();
        await sizeOption.waitFor({ state: 'detached' });

        await this.quantitySpinButton.fill(productOrder.quantity.toString());

        await this.addToCartButton.click();
    }
}