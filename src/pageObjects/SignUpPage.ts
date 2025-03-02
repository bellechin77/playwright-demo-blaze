export class SignUpPage {
    constructor(private page: Page) {}
  
    async signUp(username: string, password: string) {
      await this.page.getByRole('link', { name: 'Sign up' }).click();
      await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
      await this.page.getByRole('button', { name: 'Sign up' }).click();
    }
  }
  