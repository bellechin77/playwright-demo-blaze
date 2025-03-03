export class SignUpPage {
    constructor(private page: Page) {}
  
    async signUp(username: string, password: string) {
      const navMenu = this.page.locator('.navbar-nav'); // Locate the parent navigation menu
      const signUpLink = navMenu.locator('a', { hasText: 'Sign up' }); // Locate "Sign up" link inside it

      await signUpLink.click(); // Click the "Sign up" link
      // await this.page.getByRole('link', { name: 'Sign up' }).click();
      await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
      await this.page.getByRole('button', { name: 'Sign up' }).click();
    }
  }
  