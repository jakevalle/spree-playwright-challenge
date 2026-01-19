import { Locator, Page, expect } from '@playwright/test'
import { AccountDetails } from '../types/AccountDetails';

export class AccountPanel {
    readonly page: Page;
    readonly signUpLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmationInput: Locator;
    readonly signUpButton: Locator;
    readonly loginButton: Locator;
    readonly rememberMeCheckBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
        this.emailInput = page.locator('#user_email');
        this.passwordInput = page.locator('#user_password');
        this.passwordConfirmationInput = page.locator('#user_password_confirmation');
        this.signUpButton = page.locator('input[value="Sign Up"]');
        this.loginButton = page.locator('#login-button');
        this.rememberMeCheckBox = page.locator('#user_remember_me')
    }

    async signUp(account: AccountDetails) {
        await this.signUpLink.click();
        await expect(this.signUpButton).toBeVisible();

        await this.emailInput.fill(account.email);
        await this.passwordInput.fill(account.password);
        await this.passwordConfirmationInput.fill(account.password);
        await this.signUpButton.click();
    }

    async logIn(account: AccountDetails, rememberMe: boolean = false) {
        await expect(this.loginButton).toBeVisible();

        await this.emailInput.fill(account.email);
        await this.passwordInput.fill(account.password);
        await this.rememberMeCheckBox.setChecked(rememberMe);
        await this.loginButton.click();
    }
}