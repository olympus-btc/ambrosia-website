import type { Lang } from '@i18n/ui';

const FALLBACK_SITE = 'https://ambrosiapay.com';

const DEFAULT_OG_IMAGES: Record<Lang, string> = {
  en: '/og-image.png',
  es: '/og-image-es.png',
};

export function selectOGImage(lang: Lang, override?: string): string {
  return override ?? DEFAULT_OG_IMAGES[lang] ?? DEFAULT_OG_IMAGES.en;
}

export function buildCanonicalURL(pathname: string, site?: URL | string, override?: string): string {
  const base = site ?? FALLBACK_SITE;
  return new URL(override ?? pathname, base).href;
}

export function buildOGImageURL(imagePath: string, site?: URL | string): string {
  const base = site ?? FALLBACK_SITE;
  return new URL(imagePath, base).href;
}
