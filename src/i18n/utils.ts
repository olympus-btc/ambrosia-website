import { ui, defaultLang, type Lang, type TranslationKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey | string): string {
    return ui[lang][key as TranslationKey] || ui[defaultLang][key as TranslationKey];
  };
}

export function getLocalizedPath(lang: Lang, path: string = ''): string {
  return `/${lang}${path}`;
}
