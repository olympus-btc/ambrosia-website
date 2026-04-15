import { describe, it, expect } from 'vitest';
import { selectOGImage, buildCanonicalURL, buildOGImageURL } from '../';

describe('selectOGImage', () => {
  it('returns English OG image by default', () => {
    expect(selectOGImage('en')).toBe('/og-image.png');
  });

  it('returns Spanish OG image for es lang', () => {
    expect(selectOGImage('es')).toBe('/og-image-es.png');
  });

  it('returns override when provided', () => {
    expect(selectOGImage('en', '/custom-og.png')).toBe('/custom-og.png');
  });

  it('override takes precedence over lang', () => {
    expect(selectOGImage('es', '/custom-og.png')).toBe('/custom-og.png');
  });
});

describe('buildCanonicalURL', () => {
  const site = 'https://ambrosiapay.com';

  it('builds URL from pathname and site', () => {
    expect(buildCanonicalURL('/en/', site)).toBe('https://ambrosiapay.com/en/');
  });

  it('uses override when provided', () => {
    expect(buildCanonicalURL('/en/', site, '/es/')).toBe('https://ambrosiapay.com/es/');
  });

  it('uses fallback site when none provided', () => {
    expect(buildCanonicalURL('/en/')).toBe('https://ambrosiapay.com/en/');
  });

  it('handles nested paths', () => {
    expect(buildCanonicalURL('/en/blog/post', site)).toBe('https://ambrosiapay.com/en/blog/post');
  });
});

describe('buildOGImageURL', () => {
  const site = 'https://ambrosiapay.com';

  it('builds full OG image URL', () => {
    expect(buildOGImageURL('/og-image.png', site)).toBe('https://ambrosiapay.com/og-image.png');
  });

  it('builds Spanish OG image URL', () => {
    expect(buildOGImageURL('/og-image-es.png', site)).toBe('https://ambrosiapay.com/og-image-es.png');
  });

  it('uses fallback site when none provided', () => {
    expect(buildOGImageURL('/og-image.png')).toBe('https://ambrosiapay.com/og-image.png');
  });
});
