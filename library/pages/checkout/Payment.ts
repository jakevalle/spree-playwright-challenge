import { FrameLocator, Locator, Page } from '@playwright/test'
import { CardDetails } from '../../types/CardDetails';

export class PaymentPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly mobileNoInput: Locator;
    readonly paymentFrame: FrameLocator;
    readonly payNowButton: Locator;
    readonly cardButton: Locator;
    readonly cardNumberInput: Locator;
    readonly expDateInput: Locator;
    readonly cvvInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentFrame = page.frameLocator('[title="Secure payment input frame"]:not([tabindex])');
        this.emailInput = this.paymentFrame.getByRole('textbox', { name: 'Email' });
        this.mobileNoInput = this.paymentFrame.getByRole('textbox', { name: 'Mobile number' });
        this.cardButton = this.paymentFrame.getByTestId('card');
        this.cardNumberInput = this.paymentFrame.getByRole('textbox', { name: 'Card number' });
        this.expDateInput = this.paymentFrame.getByRole('textbox', { name: 'Expiration date MM / YY' });
        this.cvvInput = this.paymentFrame.getByRole('textbox', { name: 'Security code' });
        this.payNowButton = page.getByRole('button', { name: 'Pay now' });
    }

    async fillPaymentDetails(card: CardDetails) {
        await this.cardButton.waitFor({state: 'visible'});
        await this.cardButton.click();

        await this.cardNumberInput.fill(card.No);
        await this.expDateInput.fill(card.expDate);
        await this.cvvInput.fill(card.cvv);

        // await this.page.waitForLoadState('networkidle');
        await this.emailInput.waitFor({state: 'visible'});
        await this.mobileNoInput.waitFor({state: 'visible'});

        await this.payNowButton.scrollIntoViewIfNeeded();
        await this.payNowButton.waitFor({state: 'visible'});
        await this.payNowButton.click();
    }
}