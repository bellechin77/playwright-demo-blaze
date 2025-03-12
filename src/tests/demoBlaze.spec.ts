import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjects/SignUpPage.ts';
import { LoginPage } from '../pageObjects/LoginPage.ts';
import { ProductPage } from '../pageObjects/ProductPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';
import fs from 'fs';

test.describe('Demo Blaze Application', () => {

    // Before hook: Navigates to the homepage before each test
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/`);

        // Verify that the current URL matches the base URL
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));
    });

    // After hook: Verify redirection to the home page & take a screenshot if the test fails
    test.afterEach(async ({ page, baseURL }, testInfo) => {
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));

        // Capture a screenshot if test fails
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
        await page.getByRole('link', { name: 'Sign up' }).click();
        await signUpPage.signUp('testuser' + Date.now(), 'testpass');
    
        // Listen for the dialog event (alert) after sign-up
        page.on('dialog', (dialog) => {
            expect(dialog.message()).toBe('Sign up successful.');
            dialog.dismiss(); 
        });
    
        // Assert the "Log in" link is visible after the sign-up 
        await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
    });

    /**
    * Test: Login
    * Verifies the user can log in successfully and the "Log out" link appears.
    */
    test('User can log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
    
        // Perform login action
        await page.getByRole('link', { name: 'Log in' }).click();
        await loginPage.login('testautouser', 'testautopass');

        // Assert the welcome message is visible after login
        await expect(page.getByText(/Welcome testautouser/)).toBeVisible();
  
        // Assert that "Log out" link is visible after login
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });

    /**
    * Test: Add to Cart
    * Verifies the user can add a product to the shopping cart and see it in the cart.
    */
    test('User can add a product to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);

        // Listen for every success alert when a product is added 
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Product added');
            await dialog.accept(); 
        });

        // Locate the product card that contains the specified product name
        const productCard = page.locator('.card-title > a').filter({ hasText: 'Nexus 6' });
        await expect(productCard).toBeVisible();
        const cardTitle = await productCard.innerText();
        await productCard.click();

        // Add a product to the cart
        await productPage.addToCart(cardTitle);        
 
        // Navigate to the Cart page
        const cartPage = new CartPage(page);
        await page.getByRole('link', { name: 'Cart', exact: true }).click();

        // Ensure that the cart table contains 1 item
        await cartPage.checkNumberOfItemsInCart(1);

        // Return to home page
        await page.getByRole('link', { name: 'Home' }).click();
 
    });
});