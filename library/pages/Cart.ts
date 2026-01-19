import { Locator, Page, FrameLocator } from '@playwright/test'

export class CartPage {
    readonly page: Page;
    readonly gPayButton: Locator;
    readonly linkButton: Locator;
    readonly checkoutButton: Locator;
    readonly paymentOptionsFrame: FrameLocator;
    readonly totalCost: Locator;
    readonly products:Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('link', {name: 'Checkout'});
        this.paymentOptionsFrame = page.frameLocator('[title="Secure express checkout frame"]');
        this.gPayButton = this.paymentOptionsFrame.getByRole('button', { name: 'Checkout with GPay' });
        this.linkButton = this.paymentOptionsFrame.getByRole('button', { name: 'Pay with Link' });
        this.totalCost = page.locator('#cart_summary span.shopping-cart-total-amount');
        this.products = page.locator('#line-items');
    }

    async getProductsCount() {
        await this.products.waitFor({state: 'visible'});
        return await this.products.getByRole('listitem').count();
    }

    async getProductInCartUsingName(productName: string) {
        let product = this.products.locator('li', { hasText: productName });
        product.waitFor({state: 'visible'});
        return product;
    }

    async proceedToCheckout(option?: string) {
        if (option) {
            switch(option) {
                case 'gpay':
                    await this.gPayButton.click();
                    break;
                case 'link':
                    await this.linkButton.click();
                    break;
            }
        }
        else {
            this.checkoutButton.click();
        }
    }
}