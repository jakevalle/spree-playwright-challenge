import { Locator, Page } from '@playwright/test'

export class MyAccountPage {
    readonly page:Page;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Log out'});
    }

    async logOut() {
        await this.logoutButton.click();
    }
}