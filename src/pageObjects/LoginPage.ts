import { Page } from '@playwright/test';

export class LoginPage {
  // Constructor that accepts the Page object from Playwright
  constructor(private page: Page) {}

  /**
   * Method to perform the login process.
   * @param username - The username for the user to log in
   * @param password - The password for the user to log in
   */

  async login(username: string, password: string) {
    // Locate the parent navigation menu on the page
    const navMenu = this.page.locator('.navbar-nav'); 
    
    // Locate the "Log in" link within the navigation menu
    const loginLink = navMenu.locator('a', { hasText: 'Log in' }); 

    // Click the "Log in" link to navigate to the login page
    await loginLink.click(); 

    // Fill in the "Username" field on the login page
    await this.page.locator('#loginusername').fill(username);

    // Fill in the "Password" field on the login page
    await this.page.locator('#loginpassword').fill(password);

    // Click the "Log in" button to submit the login form
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}