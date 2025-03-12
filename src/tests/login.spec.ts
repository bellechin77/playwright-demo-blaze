import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.ts';

test.describe('Login Test', () => {

    // Before hook: Navigate to the base URL and open the Sign-up page
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/`);

        // Verify that the current URL matches the base URL
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));

        // Click the "Log in" link from the navigation menu  
        await page.getByRole('link', { name: 'Log in' }).click();
    });

    // After hook: Verify redirection to the home page and check the logout link visibility
    test.afterEach(async ({ page, baseURL }, testInfo) => {
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });

    // Test case: Log in as an existing user
    test('User can log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
    
        // Fill in and submit the log in form
        await loginPage.login('testautouser', 'testautopass');
        
        // Assert the welcome message is visible after login
        await expect(page.getByText(/Welcome testautouser/)).toBeVisible();
    });
});