import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjects/SignUpPage.ts';
import { LoginPage } from '../pageObjects/LoginPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';

test.describe('Demo Blaze Application', () => {
  let SignUpPage: SignUpPage;
  let LoginPage: LoginPage;
  let CartPage: CartPage;

  // Before hook: Navigates to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    SignUpPage = new SignUpPage(page);
    LoginPage = new LoginPage(page);
    CartPage = new CartPage(page);
  });

  // After hook: Takes a screenshot if the test fails
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  // Test 1: Sign Up
  test('User can sign up', async ({ page }) => {
    await signUpPage.signUp('testuser' + Date.now(), 'testpass');
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });

  // Test 2: Login
  test('User can log in', async ({ page }) => {
    await loginPage.login('testuser', 'testpass');
    await expect(page.getByText(/Welcome testuser/)).toBeVisible();
  
    // Non-retrying assertion
    const loginSuccess = await page.getByText(/Welcome testuser/).isVisible();
    expect(loginSuccess).toBeTruthy();
  });

  // Test 3: Add to cart
  test('User can add a product to the cart', async ({ page }) => {
    await cartPage.addToCart('Samsung galaxy s6');
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
  });
});