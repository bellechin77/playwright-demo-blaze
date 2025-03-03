import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {

      const navMenu = this.page.locator('.navbar-nav'); // Locate the parent navigation menu
      const loginLink = navMenu.locator('a', { hasText: 'Log in' }); // Locate "Sign up" link inside it

      await loginLink.click(); // Click the "Log in" link
      // await this.page.getByRole('link', { name: 'Log in' }).click();
      await this.page.locator('#loginusername').fill(username);
      await this.page.locator('#loginpassword').fill(password);
      await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}