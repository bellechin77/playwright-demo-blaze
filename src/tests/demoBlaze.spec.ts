import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjects/SignUpPage.ts';
import { LoginPage } from '../pageObjects/LoginPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';

test.describe('Demo Blaze Application', () => {

  // Before hook: Navigates to the homepage before each test
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);
  });

  // After hook: Takes a screenshot if the test fails
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  // Test 1: Sign Up
  test('User can sign up', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.signUp('testuser' + Date.now(), 'testpass');
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });

  // Test 2: Login
  test('User can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('testautouser', 'testautopass');
    await expect(page.getByText(/Welcome testautouser/)).toBeVisible();
  
    // Non-retrying assertion
    const loginSuccess = await page.getByText(/Welcome testautouser/).isVisible();
    expect(loginSuccess).toBeTruthy();
  });

  // Test 3: Add to cart
  test('User can add a product to the cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.addToCart('Samsung galaxy s6');
    await page.getByRole('link', { name: 'Cart' , exact: true}).click();
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
  });
});