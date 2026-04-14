import { test, expect } from '@playwright/test';

test.describe('Footer links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('GitHub repository link is present and correct', async ({ page }) => {
    const footer = page.locator('footer');
    const ghLink = footer.getByRole('link', { name: /github/i }).first();
    await expect(ghLink).toHaveAttribute('href', 'https://github.com/olympus-btc/ambrosia');
  });

  test('Tutorial link is present and correct', async ({ page }) => {
    const footer = page.locator('footer');
    const link = footer.getByRole('link', { name: /tutorial/i });
    await expect(link).toHaveAttribute('href', 'https://tutorial.ambrosiapay.com/');
  });

  test('Discord link is present and correct', async ({ page }) => {
    const footer = page.locator('footer');
    const link = footer.getByRole('link', { name: /discord/i });
    await expect(link).toHaveAttribute('href', /discord\.gg/);
  });

  test('external footer links have target="_blank" and rel="noopener noreferrer"', async ({ page }) => {
    const footer = page.locator('footer');
    const externalLinks = footer.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('contact email link is present', async ({ page }) => {
    const footer = page.locator('footer');
    const emailLink = footer.locator('a[href="mailto:contact@ambrosiapay.com"]');
    await expect(emailLink).toBeVisible();
  });

  test('legal section has Privacy and Terms links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer.locator('a[href="#privacy"]')).toBeVisible();
    await expect(footer.locator('a[href="#terms"]')).toBeVisible();
  });

  test('license link points to GitHub LICENSE file', async ({ page }) => {
    const footer = page.locator('footer');
    const licenseLinks = footer.locator('a[href*="LICENSE"]');
    await expect(licenseLinks.first()).toBeVisible();
  });
});

test.describe('Footer links — Spanish', () => {
  test('footer language links exist on /es/', async ({ page }) => {
    await page.goto('/es/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'English' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'Español' })).toBeVisible();
  });
});
