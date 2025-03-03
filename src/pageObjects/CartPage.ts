export class CartPage {
    constructor(private page: Page) {}
  
    async addToCart(productName: string) {  
      await this.page.getByRole('link', { name: productName }).click();
      await this.page.getByRole('link', { name: 'Add to cart' }).click();
      await this.page.waitForEvent('dialog'); // Handle alert popup
      await this.page.getByRole('link', { name: 'Cart', exact: true }).click()
      }
  }