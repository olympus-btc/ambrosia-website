import { test, expect } from '@playwright/test';

test.describe('Redirects & routing', () => {
  test('/ loads the English homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/en/ loads the English homepage', async ({ page }) => {
    await page.goto('/en/');
    await expect(page).toHaveURL('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('/es/ loads the Spanish homepage', async ({ page }) => {
    await page.goto('/es/');
    await expect(page).toHaveURL('/es/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('/ and /en/ render the same title', async ({ page }) => {
    await page.goto('/');
    const titleRoot = await page.title();

    await page.goto('/en/');
    const titleEn = await page.title();

    expect(titleRoot).toBe(titleEn);
  });
});
