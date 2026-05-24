// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://friedensinitiative-astro.netlify.app',
  // i18n configuration
  // Default locale is German (most visitors); English and French as additional.
  // Strategy: "prefix-other-locales" — German URLs stay clean (/, /spenden),
  // others get a prefix (/en/, /fr/donate).
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({
      // We provide our own base styles, so don't inject Tailwind's preflight reset
      // separately — let Tailwind handle it through the standard import.
      applyBaseStyles: true,
    }),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-CH',
          en: 'en',
          fr: 'fr',
        },
      },
    }),
  ],
});
