export class CartPage {
    constructor(private page: Page) {}
  
    async addToCart(productName: string) {  
 
      const productTable = this.page.locator('#tbodyid'); // Locate the parent product table
      const productLink = productTable.locator('tr', { hasText: productName }).locator('a'); // Locate product link
      
      await productLink.click(); // Click the nested product link
      await this.page.getByRole('link', { name: 'Add to cart' }).click();

      // Wait for and handle the alert dialog
      this.page.once('dialog', async (dialog) => {
        await dialog.accept(); // Accepts the alert popup
      });
      }
  }