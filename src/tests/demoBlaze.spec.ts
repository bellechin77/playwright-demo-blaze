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

    /**
    * Test: Sign Up
    * Verifies the user can sign up successfully and the sign-up success message is shown.
    */
    test('User can sign up', async ({ page }) => {
        const signUpPage = new SignUpPage(page);
    
        // Perform sign-up action
        await signUpPage.signUp('testuser' + Date.now(), 'testpass');
    
        // Listen for the dialog event (alert) after sign-up
        page.once('dialog', async (dialog) => {   
            // Get the dialog message and check if it matches the expected text
            const dialogMessage = dialog.message();
    
            // Assert the dialog message indicates sign-up success
            const signUpSuccess = dialogMessage === 'Sign up successful.';
            expect(signUpSuccess).toBeTruthy();
    
            // Accept the dialog
            await dialog.accept();
        });
    
        // Assert the "Sign up" button is still visible after the sign-up attempt
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });

    /**
    * Test: Login
    * Verifies the user can log in successfully and the "Log out" link appears.
    */
    test('User can log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
    
        // Perform login action
        await loginPage.login('testautouser', 'testautopass');

        // Assert the welcome message is visible after login
        await expect(page.getByText(/Welcome testautouser/)).toBeVisible();
  
        // Assert that "Log out" link is visible in the navigation menu after login
        const navMenu = page.locator('.navbar-nav'); // Locate the parent navigation menu
        const logoutVisible = await navMenu.locator('a', { hasText: 'Log out' }).isVisible(); 
        expect(logoutVisible).toBeTruthy(); 
    });

    /**
    * Test: Add to Cart
    * Verifies the user can add a product to the shopping cart and see it in the cart.
    */
    test('User can add a product to the cart', async ({ page }) => {
        const cartPage = new CartPage(page);
    
        // Add a product to the cart
        await cartPage.addToCart('Nexus 6');
    
        // Navigate to the Cart page
        await page.getByRole('link', { name: 'Cart', exact: true }).click();

        // Reload the cart page to ensure cart updates (fix for Firefox & WebKit)
        await page.reload();

        // Ensure the cart contains the product by checking localStorage
        const cartContainsProduct = await page.evaluate(() => {
            return localStorage.getItem('cart')?.includes('Nexus 6');
        });

        expect(cartContainsProduct).toBeTruthy();

        // Wait for the cart table to be populated
        await page.waitForFunction(() => {
            const cartItems = document.querySelectorAll('#tbodyid tr');
            return cartItems.length > 0;
        }, { timeout: 10000 });

        // Assert that the added product is visible in the cart
        const cartTable = page.locator('#tbodyid'); // Locate the parent table body
        const productCell = cartTable.locator('tr', { hasText: 'Nexus 6' }).locator('td');

        // Ensure the product is displayed in the cart
        await expect(productCell.first()).toBeVisible();
    });
});