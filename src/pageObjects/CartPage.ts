export class CartPage {
    constructor(private page: Page) {}
  
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

        // Click "Add to cart" button
        await this.page.getByRole('link', { name: 'Add to cart' }).click();

        // Handle alert popup
        this.page.once('dialog', async (dialog) => {
            await dialog.accept(); // Accept the alert
        });
  }
}