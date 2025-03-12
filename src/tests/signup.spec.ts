import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjects/SignUpPage.ts';

test.describe('Signup Test', () => {

    // Before hook: Navigate to the base URL and open the Sign-up page
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/`);

        // Verify that the current URL matches the base URL
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));

        // Click the "Sign up" link from the navigation menu  
        await page.getByRole('link', { name: 'Sign up' }).click();
    });

    // After hook: Verify redirection to the home page and check the login link visibility
    test.afterEach(async ({ page, baseURL }, testInfo) => {
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));
        await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
    });

    // Test case: Successfully sign up a new user
    test('User can sign up', async ({ page }) => {
        const signUpPage = new SignUpPage(page);
    
        // Fill in and submit the sign up form
        await signUpPage.signUp('testuser' + Date.now(), 'testpass');
        
        // Verify the success alert message after sign-up
        page.on('dialog', (dialog) => {
            expect(dialog.message()).toBe('Sign up successful.');
            dialog.dismiss(); 
        });
    });
});