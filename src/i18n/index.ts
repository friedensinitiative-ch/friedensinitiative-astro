// src/i18n/index.ts
// -----------------------------------------------------------------------------
// i18n utility for Astro pages and components.
//
// Strategy:
//  - The three locale files (de.json, en.json, fr.json) live next to this file
//    in ./locales/ and are imported eagerly. They are small (~10-30kb each).
//  - Pages call `getLocale(Astro.url)` to determine which locale to render.
//  - Components receive the active `t` (translation function) via props or
//    by calling `useTranslations(locale)` at the top of an .astro file.
//  - Sveltia CMS edits these JSON files directly via the GitHub backend, so
//    no runtime fetching is required. Build-time only.
// -----------------------------------------------------------------------------

import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const locales = ['de', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

// All translation dictionaries keyed by locale.
const dictionaries = { de, en, fr } as const;

/**
 * Detect the active locale from a URL pathname.
 * Examples:
 *   /            -> 'de' (default, no prefix)
 *   /spenden     -> 'de'
 *   /en/         -> 'en'
 *   /en/donate   -> 'en'
 *   /fr/dons     -> 'fr'
 */
export function getLocale(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first === 'en' || first === 'fr') return first;
  return defaultLocale;
}

/**
 * Build a localized path. Pass the desired locale and a path without prefix.
 *   localizedPath('de', '/spenden')  -> '/spenden'
 *   localizedPath('en', '/donate')   -> '/en/donate'
 *   localizedPath('fr', '/dons')     -> '/fr/dons'
 */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean}`;
}

/**
 * Resolve a dot-notated key against the dictionary for a locale.
 *   t('hero.title') -> dictionary.hero.title
 * Falls back gracefully to the default locale if a key is missing in a
 * non-default locale, and returns the key itself if nothing is found.
 */
function resolveKey(dict: any, key: string): string | undefined {
  return key.split('.').reduce((obj, part) => {
    if (obj && typeof obj === 'object' && part in obj) return obj[part];
    return undefined;
  }, dict as any);
}

export function useTranslations(locale: Locale) {
  const primary = dictionaries[locale];
  const fallback = dictionaries[defaultLocale];

  return function t(key: string): string {
    const value = resolveKey(primary, key) ?? resolveKey(fallback, key);
    if (typeof value === 'string') return value;
    // Last resort: return the key itself so missing strings are visible.
    return key;
  };
}

/**
 * Render text with {{highlight}}...{{/highlight}} markers as gold-accented
 * spans. Use this for headings where editors mark important words.
 * Returns an HTML string (use set:html in templates).
 */
export function renderHighlight(text: string): string {
  return text.replace(
    /\{\{highlight\}\}(.*?)\{\{\/highlight\}\}/g,
    '<span class="text-brand-gold-400">$1</span>'
  );
}
