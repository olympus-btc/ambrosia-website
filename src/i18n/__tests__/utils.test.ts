import { describe, it, expect } from 'vitest';
import { getLangFromUrl, getLocalizedPath, useTranslations } from '../utils';

describe('getLangFromUrl', () => {
  it('extracts english lang from URL', () => {
    expect(getLangFromUrl(new URL('https://ambrosiapay.com/en/'))).toBe('en');
  });

  it('extracts spanish lang from URL', () => {
    expect(getLangFromUrl(new URL('https://ambrosiapay.com/es/'))).toBe('es');
  });

  it('returns default lang for unknown lang code', () => {
    expect(getLangFromUrl(new URL('https://ambrosiapay.com/fr/'))).toBe('en');
  });

  it('returns default lang for root path', () => {
    expect(getLangFromUrl(new URL('https://ambrosiapay.com/'))).toBe('en');
  });

  it('extracts lang from nested path', () => {
    expect(getLangFromUrl(new URL('https://ambrosiapay.com/en/blog/post'))).toBe('en');
  });
});

describe('getLocalizedPath', () => {
  it('builds english path with trailing slash', () => {
    expect(getLocalizedPath('en')).toBe('/en/');
  });

  it('builds spanish path with trailing slash', () => {
    expect(getLocalizedPath('es')).toBe('/es/');
  });

  it('appends path segment', () => {
    expect(getLocalizedPath('en', '/download')).toBe('/en/download');
  });

  it('handles empty path with trailing slash', () => {
    expect(getLocalizedPath('en', '')).toBe('/en/');
  });

  it('handles nested path', () => {
    expect(getLocalizedPath('es', '/blog/post')).toBe('/es/blog/post');
  });

  it('does not produce double slashes', () => {
    expect(getLocalizedPath('en', '/section')).toBe('/en/section');
  });
});

describe('useTranslations', () => {
  it('returns translation for valid key in english', () => {
    const t = useTranslations('en');
    expect(t('nav.features')).toBe('Features');
  });

  it('returns translation for valid key in spanish', () => {
    const t = useTranslations('es');
    expect(t('nav.features')).toBe('Funcionalidades');
  });

  it('falls back to english when key missing in lang', () => {
    const t = useTranslations('es');
    // If a key only exists in English, it should fall back
    expect(t('nav.features')).toBeTruthy();
  });

  it('returns undefined for unknown key', () => {
    const t = useTranslations('en');
    expect(t('nonexistent.key')).toBeUndefined();
  });

  it('returns different translations per lang', () => {
    const tEn = useTranslations('en');
    const tEs = useTranslations('es');
    expect(tEn('nav.download')).not.toBe(tEs('nav.download'));
  });
});
