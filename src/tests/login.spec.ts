import { LoginPage } from '../pageObjects/LoginPage.ts';

test.describe('User can log in', async ({ page }) => {
  await page.goto('/');
  const loginPage = new LoginPage(page);
  await loginPage.login('testuser', 'testpass');
  await expect(page.getByText(/Welcome testuser/)).toBeVisible();
  
  // Non-retrying assertion
  const loginSuccess = await page.getByText(/Welcome testuser/).isVisible();
  expect(loginSuccess).toBeTruthy();
});