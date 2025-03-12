import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  // Constructor that accepts the Page object from Playwright  
  constructor(private page: Page) {}
  
  /**
   * Method to add a product to the shopping cart.
   * @param productName - The name of the product to add to the cart
   */

    async addToCart(cardTitle: string) {  

        // Verify that the product name is same as the selected card title
        const productName = this.page.getByRole('heading', {name: cardTitle});
        await expect(productName).toBeVisible();

        // Click the "Add to cart" link to add the product to the cart
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
    };
};