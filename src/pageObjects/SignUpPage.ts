export class SignUpPage {
  // Constructor that accepts the Page object from Playwright
  constructor(private page: Page) {}
  
  /**
   * Method to perform the sign-up process.
   * @param username - The username for the new user
   * @param password - The password for the new user
   */

  async signUp(username: string, password: string) {
    // Locate the parent navigation menu on the page
    const navMenu = this.page.locator('.navbar-nav'); 

    // Locate the "Sign up" link within the navigation menu  
    const signUpLink = navMenu.locator('a', { hasText: 'Sign up' }); 

    // Click the "Sign up" link to navigate to the sign-up page
    await signUpLink.click(); 

    // Fill in the "Username" field
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);

    // Fill in the "Password" field
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);

    // Click the "Sign up" button to submit the form
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }
}
  