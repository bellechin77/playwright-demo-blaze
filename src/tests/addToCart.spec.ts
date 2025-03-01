import { CartPage } from '../pages/CartPage.ts';

test('User can add a product to the cart', async ({ page }) => {
  await page.goto('/');
  const cartPage = new CartPage(page);
  await cartPage.addToCart('Samsung galaxy s6');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
});