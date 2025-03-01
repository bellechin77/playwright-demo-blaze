import { CartPage } from '../pageObjects/CartPage.ts';

test.describe('User can add a product to the cart', async ({ page }) => {
  await page.goto('/');
  const cartPage = new CartPage(page);
  await cartPage.addToCart('Samsung galaxy s6');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
});