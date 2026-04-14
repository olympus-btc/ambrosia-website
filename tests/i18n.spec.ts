import { test, expect } from '@playwright/test';

test.describe('i18n — language switching', () => {
  test('EN page shows English nav labels', async ({ page }) => {
    await page.goto('/en/');

    const nav = page.locator('header nav').first();
    await expect(nav.getByRole('link', { name: 'Features' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Why Ambrosia' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'How it Works' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Open Source' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Download' })).toBeVisible();
  });

  test('ES page shows Spanish nav labels', async ({ page }) => {
    await page.goto('/es/');

    const nav = page.locator('header nav').first();
    await expect(nav.getByRole('link', { name: 'Funcionalidades' })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Por qué Ambrosia/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Cómo Funciona/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /Descargar/i })).toBeVisible();
  });

  test('language picker switches from EN to ES', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('header a[href="/es/"]').click();

    await expect(page).toHaveURL('/es/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('language picker switches from ES to EN', async ({ page }) => {
    await page.goto('/es/');
    await page.locator('header a[href="/en/"]').click();

    await expect(page).toHaveURL('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('active language is visually marked in picker', async ({ page }) => {
    await page.goto('/en/');
    const enLink = page.locator('nav a[href="/en/"][aria-current="page"]');
    await expect(enLink).toBeVisible();

    await page.goto('/es/');
    const esLink = page.locator('nav a[href="/es/"][aria-current="page"]');
    await expect(esLink).toBeVisible();
  });

  test('footer language switcher links to correct locales', async ({ page }) => {
    await page.goto('/en/');

    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en/');
    await expect(footer.getByRole('link', { name: 'Español' })).toHaveAttribute('href', '/es/');
  });
});
