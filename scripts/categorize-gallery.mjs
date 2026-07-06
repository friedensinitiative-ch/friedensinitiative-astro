// scripts/categorize-gallery.mjs
// One-off: add a `category` field to every gallery.json entry and append the
// four Congo images (single webp, no responsive variants -> use `src`).
// Run: node scripts/categorize-gallery.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const PATH = new URL('../src/data/gallery.json', import.meta.url);
const data = JSON.parse(readFileSync(PATH, 'utf8'));

// Maharishi category: all maharishi-* plus his master and the vedic-heritage image.
const MAHARISHI = new Set([
  'maharishi-portrait',
  'maharishi-meditating',
  'maharishi-ganga',
  'maharishi-lake-louise',
  'maharishi-explaining',
  'maharishi-cultivate',
  'maharishi-mind-thirsty',
  'maharishi-eternal-bliss',
  'maharishi-bliss-inside',
  'maharishi-divine-inside',
  'brahmananda-saraswati',
  'vedic-sages',
]);

for (const item of data) {
  if (item.category === 'kongo') continue; // idempotent: keep already-added kongo
  item.category = MAHARISHI.has(item.slug) ? 'maharishi' : 'pandits';
}

// Congo entries — single webp in /images/kongo/, no -w400/-w800/-w1600/.jpg variants.
const KONGO = [
  {
    slug: 'kongo-gruppenmeditation-kasindi',
    src: '/images/kongo/gruppenmeditation-kasindi.webp',
    caption: 'Group meditation in Kasindi, North Kivu',
    aspectRatio: '4/3',
    category: 'kongo',
  },
  {
    slug: 'kongo-schulkinder-wiese',
    src: '/images/kongo/schulkinder-meditation-wiese.webp',
    caption: 'Schoolchildren meditating outdoors',
    aspectRatio: '4/3',
    category: 'kongo',
  },
  {
    slug: 'kongo-schulkinder-stuehle',
    src: '/images/kongo/schulkinder-meditation-stuehle.webp',
    caption: 'Schoolchildren meditating in the classroom',
    aspectRatio: '4/3',
    category: 'kongo',
  },
  {
    slug: 'kongo-tm-lehrer',
    src: '/images/kongo/tm-lehrer-bamande-nancy-clovis.webp',
    caption: 'TM teachers Bamande, Nancy and Clovis',
    aspectRatio: '4/3',
    category: 'kongo',
  },
];

// Idempotent: only append kongo entries that aren't present yet.
const existing = new Set(data.map((i) => i.slug));
for (const k of KONGO) if (!existing.has(k.slug)) data.push(k);

writeFileSync(PATH, JSON.stringify(data, null, 2) + '\n');

const counts = data.reduce((a, i) => ((a[i.category] = (a[i.category] || 0) + 1), a), {});
console.log('counts:', counts, 'total:', data.length);
