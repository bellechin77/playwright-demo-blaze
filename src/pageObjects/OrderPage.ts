import { Page } from '@playwright/test';

export class OrderPage {
  // Constructor that accepts the Page object from Playwright
  constructor(private page: Page) {}
  
  /**
   * Method to perform the sign-up process.
   * @param custName    - The customer name for the order
   * @param custCountry - The country of the customer 
   * @param custCity    - The city of the customer 
   * @param cardNo      - The credit card number of the customer
   * @param cardMonth   - The expiry month of the credit card
   * @param cardYear    - The expiry year of the credit card
   */

  async placeOrder(custName: string, custCountry: string, custCity: string, cardNo: string, cardMonth: string, cardYear: string) {
    // Fill in the "Name" field
    await this.page.getByRole('textbox', { name: 'Name' }).fill(custName);

    // Fill in the "Country" field
    await this.page.getByRole('textbox', { name: 'Country' }).fill(custCountry);
 
    // Fill in the "City" field
    await this.page.getByRole('textbox', { name: 'City' }).fill(custCity);

    // Fill in the "Credit card" field
    await this.page.getByRole('textbox', { name: 'Credit card' }).fill(cardNo);

    // Fill in the "Month" field
    await this.page.getByRole('textbox', { name: 'Month' }).fill(cardMonth);

    // Fill in the "Month" field
    await this.page.getByRole('textbox', { name: 'Year' }).fill(cardYear);

    // Click the "Purchase" button to submit the form
    await this.page.getByRole('button', { name: 'Purchase' }).click();
  }
}