// src/content/config.ts
// -----------------------------------------------------------------------------
// Astro content collections.
//
// "donate" collection: longer-form prose texts for the donation page, one
// Markdown file per locale. Editors get a WYSIWYG editor in Sveltia CMS for
// these. Structural fields (IBAN, BIC, button labels) stay in locale JSON.
// -----------------------------------------------------------------------------
import { defineCollection, z } from 'astro:content';

const donate = defineCollection({
  type: 'content',
  schema: z.object({
    // Editors don't need to fill these — they're filename-derived — but the
    // schema makes them available in templates.
    locale: z.enum(['de', 'en', 'fr']),
  }),
});

export const collections = { donate };
