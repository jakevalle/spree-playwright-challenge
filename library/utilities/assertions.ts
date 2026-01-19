import { Page, expect } from '@playwright/test'

export async function expectFlashMessage(page: Page, message: string) {
    const flashMessage = page.locator('#flashes');
    await expect(flashMessage).toBeVisible();
    await expect(flashMessage).toHaveText(message);
}