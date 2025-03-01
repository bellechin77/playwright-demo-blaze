export class CartPage {
    constructor(private page: Page) {}
  
    async addToCart(productName: string) {  
      await this.page.getByText(productName).click();
      await this.page.getByRole('button', { name: 'Add to cart' }).click();
      await this.page.waitForEvent('dialog'); // Handle alert popup
      }
  }