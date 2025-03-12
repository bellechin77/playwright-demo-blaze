import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  // Constructor that accepts the Page object from Playwright  
  constructor(private page: Page) {}
  
  /**
   * Method to add a product to the shopping cart.
   * @param productName - The name of the product to add to the cart
   */

  async checkNumberOfItemsInCart(itemCount: number) {  

        // Check the cart has items added
        const cartTable = this.page.locator('table').filter({ has: this.page.locator('tbody') });
        await expect(cartTable).toBeVisible();

        // Validate the item count
        const itemRows =  cartTable.locator('td').filter({ has: this.page.locator('a', { hasText: 'Delete' }) });
        await expect(itemRows).toHaveCount(itemCount);  
  };

  async clickPlaceOrder() { 
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  };
};