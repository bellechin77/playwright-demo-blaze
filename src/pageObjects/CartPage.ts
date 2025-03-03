export class CartPage {
    constructor(private page: Page) {}
  
    async addToCart(productName: string) {  
      await this.page.getByRole('link', { name: productName }).click();
      await this.page.getByRole('link', { name: 'Add to cart' }).click();
  
      // Wait for and handle the alert dialog
      this.page.once('dialog', async (dialog) => {
        await dialog.accept(); // Accepts the alert popup
      });
      }
  }