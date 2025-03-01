import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUpPage.ts';

test('User can sign up', async ({ page }) => {
  await page.goto('/');
  const signUpPage = new SignUpPage(page);
  await signUpPage.signUp('testuser' + Date.now(), 'testpass');
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
});