// scripts/postbuild-netlify-forms.mjs
// -----------------------------------------------------------------------------
// Inject Netlify Forms attributes into built HTML.
//
// WHY THIS EXISTS
// Astro's HTML build pipeline strips "unknown" attributes (data-netlify,
// data-netlify-honeypot) and removes hidden inputs it considers unused.
// Netlify Forms NEEDS those exact attributes in the static HTML for its
// deploy-time form detector to register the forms. Without them, POSTs
// to the form endpoint return 404.
//
// WHAT THIS SCRIPT DOES
// After `astro build`, we walk every contact-form HTML file in `dist/` and
// re-inject what Astro stripped:
//   1. data-netlify="true"
//   2. data-netlify-honeypot="bot-field"
//   3. <input type="hidden" name="form-name" value="contact-{locale}" />
//
// We also create a static __forms.html file in dist/ that lists every form
// for Netlify's detection crawler.
//
// SAFE TO RUN MULTIPLE TIMES
// The script is idempotent — it only injects if the attributes are missing.
// -----------------------------------------------------------------------------

import { readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const FORM_PAGES = [
  { path: 'kontakt/index.html',     formName: 'contact-de' },
  { path: 'en/contact/index.html',  formName: 'contact-en' },
  { path: 'fr/contact/index.html',  formName: 'contact-fr' },
];

async function injectNetlifyForms(htmlPath, formName) {
  let html;
  try {
    html = await readFile(htmlPath, 'utf-8');
  } catch (err) {
    console.warn(`[netlify-forms] Skipping ${htmlPath} (not built yet?)`);
    return;
  }

  const formTagRegex = new RegExp(`<form\\b([^>]*?name="${formName}"[^>]*?)>`, 'i');
  const match = html.match(formTagRegex);
  if (!match) {
    console.warn(`[netlify-forms] Could not find form name="${formName}" in ${htmlPath}`);
    return;
  }

  const originalTag = match[0];
  let newTag = originalTag;
  let didChange = false;

  if (!/\bdata-netlify\s*=/.test(newTag)) {
    newTag = newTag.replace('<form', '<form data-netlify="true"');
    didChange = true;
  }
  if (!/\bdata-netlify-honeypot\s*=/.test(newTag)) {
    newTag = newTag.replace('<form', '<form data-netlify-honeypot="bot-field"');
    didChange = true;
  }
  if (didChange) {
    html = html.replace(originalTag, newTag);
  }

  const formBlockRegex = new RegExp(
    `(<form\\b[^>]*?name="${formName}"[^>]*?>)([\\s\\S]*?)(</form>)`,
    'i'
  );
  const blockMatch = html.match(formBlockRegex);
  if (blockMatch) {
    const [whole, openTag, body, closeTag] = blockMatch;
    if (!/name=["']form-name["']/.test(body)) {
      const hiddenInput = `<input type="hidden" name="form-name" value="${formName}" />`;
      const replaced = `${openTag}${hiddenInput}${body}${closeTag}`;
      html = html.replace(whole, replaced);
      didChange = true;
    }
  }

  if (didChange) {
    await writeFile(htmlPath, html, 'utf-8');
    console.log(`[netlify-forms] ✓ Patched ${relative(DIST_DIR, htmlPath)}`);
  } else {
    console.log(`[netlify-forms] = Already OK: ${relative(DIST_DIR, htmlPath)}`);
  }
}

async function writeStaticDetectionForms() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Form detection (Netlify)</title>
  <meta name="robots" content="noindex, nofollow" />
</head>
<body>
  <form name="contact-de" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact-de" />
    <input type="text" name="bot-field" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
  </form>
  <form name="contact-en" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact-en" />
    <input type="text" name="bot-field" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
  </form>
  <form name="contact-fr" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact-fr" />
    <input type="text" name="bot-field" />
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
  </form>
</body>
</html>
`;
  const outPath = join(DIST_DIR, '__forms.html');
  await writeFile(outPath, html, 'utf-8');
  console.log(`[netlify-forms] ✓ Wrote __forms.html`);
}

async function main() {
  console.log('[netlify-forms] Post-build form injection starting...');
  for (const { path, formName } of FORM_PAGES) {
    await injectNetlifyForms(join(DIST_DIR, path), formName);
  }
  await writeStaticDetectionForms();
  console.log('[netlify-forms] Done.');
}

main().catch((err) => {
  console.error('[netlify-forms] FAILED:', err);
  process.exit(1);
});
