import { Locator, Page } from '@playwright/test'
import { DeliveryDetails } from '../../types/DeliveryDetails';

export class AddressPage {
    readonly page: Page;
    readonly countryDropdown: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly streetInput: Locator;
    readonly buildingInput: Locator;
    readonly cityInput: Locator;
    readonly postalCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryDropdown = page.getByLabel('Country');
        this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
        this.streetInput = page.getByRole('textbox', { name: 'Street and house number' });
        this.buildingInput = page.getByRole('textbox', { name: 'Apartment, suite, etc. (' });
        this.cityInput = page.getByRole('textbox', { name: 'City' });
        this.postalCodeInput = page.getByRole('textbox', { name: 'Postal Code' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone (optional)' });
        this.saveButton = page.getByRole('button', { name: 'Save and Continue' });
    }

    async fillAddress(details: DeliveryDetails) {
        await this.countryDropdown.selectOption({ label: details.country });
        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        await this.streetInput.fill(details.street);
        await this.buildingInput.fill(details.building);
        await this.cityInput.fill(details.city);
        await this.postalCodeInput.fill(details.postalCode);
        await this.phoneInput.fill(details.phone);

        await this.saveButton.click();
    }
}