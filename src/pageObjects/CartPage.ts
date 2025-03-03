export class CartPage {
  // Constructor that accepts the Page object from Playwright  
  constructor(private page: Page) {}
  
  /**
   * Method to add a product to the shopping cart.
   * @param productName - The name of the product to add to the cart
   */

  async addToCart(productName: string) {  
    
    // Ensure the product grid is loaded
    await this.page.waitForSelector('.card');

    // Locate the product card that contains the specified product name
    const productCard = this.page.locator('.card', { hasText: productName });
  
    // Locate the product link inside the card
    const productLink = productCard.locator('a').first(); 
          
    // Ensure the product link is visible before clicking
    await productLink.waitFor();
    await productLink.click();

    // Click the "Add to cart" link to add the product to the cart
    await this.page.getByRole('link', { name: 'Add to cart' }).click();

    // Listen for the dialog popup after adding the product to the cart
    this.page.once('dialog', async (dialog) => {
      // Get the dialog message and check if it matches the expected text
      const dialogMessage = dialog.message();
    
      // Assert that the dialog message is "Product added."
      const addToCartSuccess = dialogMessage === 'Product added.';
      expect(addToCartSuccess).toBeTruthy();

      // Accept the dialog after confirming the success message
      await dialog.accept(); 

      // Force a full page reload after adding to cart
      await this.page.reload();  
    });
  }
}