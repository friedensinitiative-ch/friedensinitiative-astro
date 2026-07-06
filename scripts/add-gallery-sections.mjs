// scripts/add-gallery-sections.mjs
// One-off: add localized gallery.sections headings to de/en/fr locale files.
// Run: node scripts/add-gallery-sections.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const SECTIONS = {
  de: {
    maharishi: 'Maharishi & die vedische Tradition',
    pandits: 'Maharishi Vedic Pandits',
    kongo: 'Friedensprojekt Kongo',
  },
  en: {
    maharishi: 'Maharishi & the Vedic Tradition',
    pandits: 'Maharishi Vedic Pandits',
    kongo: 'Congo Peace Project',
  },
  fr: {
    maharishi: 'Maharishi & la tradition védique',
    pandits: 'Maharishi Vedic Pandits',
    kongo: 'Projet de paix au Congo',
  },
};

for (const loc of ['de', 'en', 'fr']) {
  const path = new URL(`../src/i18n/locales/${loc}.json`, import.meta.url);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  data.gallery = data.gallery || {};
  data.gallery.sections = SECTIONS[loc];
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log(loc, '-> gallery.sections set');
}
