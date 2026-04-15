import { test, expect } from '@playwright/test';

test.describe('Download section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/#download');
  });

  test('version badge shows a semver-like version', async ({ page }) => {
    const badge = page.locator('#download .font-mono').first();
    await expect(badge).toBeVisible();
    const text = await badge.innerText();

    expect(text).toMatch(/\d+\.\d+/);
  });

  test('all download links have a real URL (not # or empty)', async ({ page }) => {
    const downloadLinks = page.locator('#download a.dl-item');
    const count = await downloadLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await downloadLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
      expect(href).not.toBe('');
    }
  });

  test('Linux platform card is present', async ({ page }) => {
    const card = page.locator('#download').getByText('Linux').first();
    await expect(card).toBeVisible();
  });

  test('Windows platform card is present', async ({ page }) => {
    const card = page.locator('#download').getByText('Windows').first();
    await expect(card).toBeVisible();
  });

  test('macOS platform card is present', async ({ page }) => {
    const card = page.locator('#download').getByText('macOS').first();
    await expect(card).toBeVisible();
  });

  test('each platform card shows a verify command', async ({ page }) => {
    const verifyCodes = page.locator('#download code.font-mono');
    const count = await verifyCodes.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const text = await verifyCodes.nth(i).innerText();
      expect(text.trim()).not.toBe('');
    }
  });

  test('"Need Help" links have real hrefs', async ({ page }) => {
    const helpSection = page.locator('#download').getByText('Need Help').locator('..');
    const helpLinks = helpSection.locator('a.dl-item');
    const count = await helpLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);

    for (let i = 0; i < count; i++) {
      const href = await helpLinks.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');
    }
  });
});
