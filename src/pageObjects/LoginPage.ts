import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
      await this.page.getByRole('link', { name: 'Log in' }).click();
      await this.page.getByRole('textbox', { name: 'loginusername' }).fill(username);
      await this.page.getByRole('textbox', { name: 'loginpassword' }).fill(password);
      await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}