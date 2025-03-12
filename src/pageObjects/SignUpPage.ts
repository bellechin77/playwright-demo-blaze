import { Page } from '@playwright/test';

export class SignUpPage {
  // Constructor that accepts the Page object from Playwright
  constructor(private page: Page) {}
  
  /**
   * Method to perform the sign-up process.
   * @param username - The username for the new user
   * @param password - The password for the new user
   */

  async signUp(username: string, password: string) {
    // Fill in the "Username" field
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);

    // Fill in the "Password" field
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Click the "Sign up" button to submit the form
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }
}
  