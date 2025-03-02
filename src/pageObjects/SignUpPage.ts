export class SignUpPage {
    constructor(private page: Page) {}
  
    async signUp(username: string, password: string) {
      await this.page.getByRole('link', { name: 'Sign up' }).click();
      await this.page.getByPlaceholder('Username').fill(username);
      await this.page.getByPlaceholder('Password').fill(password);
      await this.page.getByRole('button', { name: 'Sign up' }).click();
    }
  }
  