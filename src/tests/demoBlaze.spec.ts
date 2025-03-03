import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjects/SignUpPage.ts';
import { LoginPage } from '../pageObjects/LoginPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';
import fs from 'fs';

test.describe('Demo Blaze Application', () => {

  // Before hook: Navigates to the homepage before each test
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);
  });

  // After hook: Takes a screenshot if the test fails
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        // Ensure 'screenshots' directory exists
        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }
        
        // Take a screenshot with a safe file name
        const fileName = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_') + '.png';
        await page.screenshot({ path: `screenshots/${fileName}` });
    }
  });

  // Test 1: Sign Up
  test('User can sign up', async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    // Perform sign-up action
    await signUpPage.signUp('testuser' + Date.now(), 'testpass');
    
    // Listen for the dialog event (alert)
    page.once('dialog', async (dialog) => {   
        // Get the dialog message and check if it matches the expected text
        const dialogMessage = dialog.message();
    
        // Assert that the dialog message is "Sign up successful."
        const signUpSuccess = dialogMessage === 'Sign up successful.';
        expect(signUpSuccess).toBeTruthy();
    
        // Accept the dialog
        await dialog.accept();
     });
    
    // Assert the "Sign up" button is visible after the sign-up attempt
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  });

  // Test 2: Login
  test('User can log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Perform login action
    await loginPage.login('testautouser', 'testautopass');

    // Assert the welcome message is visible
    await expect(page.getByText(/Welcome testautouser/)).toBeVisible();
  
    // Non-retrying assertion: To check if the "Log out" link is visible after login
    const navMenu = page.locator('.navbar-nav'); // Locate the parent navigation menu
    const logoutVisible = await navMenu.locator('a', { hasText: 'Log out' }).isVisible(); 
    expect(logoutVisible).toBeTruthy(); 
  });

  // Test 3: Add to cart
  test('User can add a product to the cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.addToCart('Nexus 6');
    await page.getByRole('link', { name: 'Cart', exact: true }).click()

    // Verify that the product cell is visible
    const cartTable = page.locator('#tbodyid'); // Locate the parent table body
    const productCell = cartTable.locator('tr', { hasText: 'Nexus 6' }).locator('td');

    await expect(productCell.first()).toBeVisible();
});
});