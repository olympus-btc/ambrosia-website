import { test, expect } from '@playwright/test';

const SECTIONS = ['features', 'why-ambrosia', 'how-it-works', 'open-source', 'download'] as const;

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/');
  });

  test('header is visible and fixed at the top', async ({ page }) => {
    const header = page.locator('header#header');
    await expect(header).toBeVisible();
    const position = await header.evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  test('logo links to the localised homepage', async ({ page }) => {
    const logo = page.locator('header a[href="/en/"]').first();
    await expect(logo).toBeVisible();
  });

  for (const section of SECTIONS) {
    test(`nav link scrolls to #${section}`, async ({ page }) => {
      const link = page.locator(`header nav a[href="#${section}"]`).first();
      await expect(link).toBeVisible();

      await link.click();

      const target = page.locator(`#${section}`);
      await expect(target).toBeInViewport({ ratio: 0.1 });
    });
  }

  test('mobile menu button toggles the mobile nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const btn = page.locator('#mobile-menu-btn');
    const mobileNav = page.locator('#mobile-nav');

    await expect(mobileNav).toBeHidden();

    await btn.click();
    await expect(mobileNav).toBeVisible();

    await btn.click();
    await expect(mobileNav).toBeHidden();
  });

  test('clicking a mobile nav link closes the menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    await page.locator('#mobile-menu-btn').click();
    const mobileNav = page.locator('#mobile-nav');
    await expect(mobileNav).toBeVisible();

    await mobileNav.locator('a').first().click();
    await expect(mobileNav).toBeHidden();
  });
});
