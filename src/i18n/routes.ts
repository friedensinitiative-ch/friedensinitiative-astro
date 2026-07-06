// src/i18n/routes.ts
// -----------------------------------------------------------------------------
// Localized URL slug mapping.
//
// Every page has a "route key" (e.g. 'donate', 'about'). For each locale we
// define the URL slug to use. This way:
//   - buildPath('donate', 'de') -> '/spenden'
//   - buildPath('donate', 'en') -> '/en/donate'
//   - buildPath('donate', 'fr') -> '/fr/dons'
//
// To switch a user's language while keeping them on the same page, we look
// up the page's route key from the current path, then resolve the new
// locale's slug for that key.
// -----------------------------------------------------------------------------

import type { Locale } from './index';
import { defaultLocale } from './index';

export type RouteKey =
  | 'home'
  | 'about'
  | 'donate'
  | 'contact'
  | 'gallery'
  | 'thanks'
  | 'imprint'
  | 'privacy'
  | 'india'
  | 'congo';

/**
 * Slug table — one entry per route key, one slug per locale.
 * Slugs do NOT include the locale prefix; that's added by buildPath().
 * Use '' for the home route.
 */
export const routeSlugs: Record<RouteKey, Record<Locale, string>> = {
  home:    { de: '',           en: '',         fr: ''            },
  about:   { de: 'ueber-uns',  en: 'about',    fr: 'a-propos'    },
  donate:  { de: 'spenden',    en: 'donate',   fr: 'dons'        },
  contact: { de: 'kontakt',    en: 'contact',  fr: 'contact'     },
  gallery: { de: 'galerie',    en: 'gallery',  fr: 'galerie'     },
  india:   { de: 'indien',     en: 'india',    fr: 'inde'        },
  congo:   { de: 'kongo',      en: 'congo',    fr: 'congo'       },
  thanks:  { de: 'danke',      en: 'thank-you', fr: 'merci'      },
  imprint: { de: 'impressum',  en: 'imprint',  fr: 'mentions-legales' },
  privacy: { de: 'datenschutz', en: 'privacy', fr: 'confidentialite' },
};

/**
 * Build an absolute path for a given route + locale.
 *   buildPath('donate', 'de') -> '/spenden'
 *   buildPath('donate', 'en') -> '/en/donate'
 *   buildPath('home',   'fr') -> '/fr/'
 */
export function buildPath(route: RouteKey, locale: Locale): string {
  const slug = routeSlugs[route][locale];
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  if (route === 'home') return `${prefix}/`;
  return `${prefix}/${slug}`;
}

/**
 * Reverse lookup: given a URL pathname, figure out which RouteKey it is.
 * Returns 'home' as fallback. Used by the language switcher to keep the
 * user on the same logical page across locales.
 */
export function getRouteKey(url: URL): RouteKey {
  const segments = url.pathname.split('/').filter(Boolean);

  // Strip locale prefix if present
  if (segments[0] === 'en' || segments[0] === 'fr') segments.shift();

  if (segments.length === 0) return 'home';

  const slug = segments[0];
  // Search all locales for a matching slug
  for (const [key, slugs] of Object.entries(routeSlugs)) {
    for (const locale of ['de', 'en', 'fr'] as const) {
      if (slugs[locale] === slug) return key as RouteKey;
    }
  }
  return 'home';
}
