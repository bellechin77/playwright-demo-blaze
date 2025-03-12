import { test, expect } from '@playwright/test';
import { ProductPage } from '../pageObjects/ProductPage.ts';
import { CartPage } from '../pageObjects/CartPage.ts';
import { OrderPage } from '../pageObjects/OrderPage.ts';

test.describe('Shopping Cart Test', () => {

    // Before hook: Navigate to the base URL and open the Sign-up page
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(`${baseURL}/`);

        // Verify that the current URL matches the base URL
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));

        // Ensure the category menu is visible on the homepage  
        const catMenu = page.getByRole('link', { name: 'CATEGORIES' })
        await expect(catMenu).toBeVisible();
    });

    // After hook: Verify that the cart contains 3 items 
    test.afterEach(async ({ page, baseURL }, testInfo) => {
        const cartPage = new CartPage(page);

        // Navigate to the cart page
        await page.getByRole('link', { name: 'Cart', exact: true }).click();

        // Ensure that the cart table contains 3 items
        await cartPage.checkNumberOfItemsInCart(3);

        // Initiate the order
        await cartPage.clickPlaceOrder();

        const orderPage = new OrderPage(page);
        await orderPage.placeOrder('John Doe', 'Spain', 'Barcelona', '1234567890123456', '12', '30');

        // Assert that the confirmation popup appears
        const alertPopup = page.locator('.sweet-alert.showSweetAlert.visible');
        await expect(alertPopup).toBeVisible();

        // Assert that the h2 element contains the correct text
        const alertMessage = alertPopup.locator('h2');
        await expect(alertMessage).toHaveText('Thank you for your purchase!');

        // Click the "OK" button in the success popup to close it
        // await page.locator('.sa-confirm-button-container button.confirm').click();
        await page.getByRole('button', {name: 'OK'}).click();

        // Verify redirection to the home page
        await expect(page).toHaveURL(new RegExp(`${baseURL}/`));
    });

    // Test case: Add multiple products to the cart and verify the product is successfully added
    test('Add multiple products to the cart', async ({ page }) => {

        // Listen for every success alert when a product is added and navigate back to home page
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Product added');
            await dialog.accept(); 
        });
    
        const productPage = new ProductPage(page);

        // Select the "Phones" category and add the first product to the cart
        await page.getByRole('link', { name: 'Phones' }).click();
        let cardLink = page.locator('.card-title > a').first();
        await expect(cardLink).toBeVisible();
        let cardTitle: string = await cardLink.innerText();
        await cardLink.click();
        await productPage.addToCart(cardTitle);
        await page.getByRole('link', { name: 'Home' }).click();

        // Select the "Laptops" category and add the last product to the cart
        await page.getByRole('link', { name: 'Laptops' }).click();
        cardLink = page.locator('.card-title > a').last();
        await expect(cardLink).toBeVisible();
        cardTitle = await cardLink.innerText();
        await cardLink.click();
        await productPage.addToCart(cardTitle);
        await page.getByRole('link', { name: 'Home' }).click();

        // Select the "Monitors" category and add a specific product to the cart
        await page.getByRole('link', { name: 'Monitors' }).click();
        const productTitle = 'Apple monitor 24';
        cardLink = page.locator('.card-title > a').filter({ hasText: productTitle });
        await expect(cardLink).toBeVisible();
        cardTitle = await cardLink.innerText();
        
        await cardLink.click();
        await productPage.addToCart(cardTitle);
        await page.getByRole('link', { name: 'Home' }).click();
    });
});