export class CartPage {
    constructor(private page: Page) {}
  
    async addToCart(productName: string) {  
 
        // Ensure the product table is loaded
        await this.page.waitForSelector('#tbodyid');

        // Locate the parent product table
        const productTable = this.page.locator('#tbodyid');

        // Locate the first matching product link
        const productLink = productTable.locator('tr', { hasText: productName }).locator('a').first();
        
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