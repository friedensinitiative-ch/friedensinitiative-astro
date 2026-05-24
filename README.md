# Friedensinitiative – Astro Migration

Statische Website der Globalen Friedensinitiative Schweiz, gebaut mit
[Astro](https://astro.build) und [Sveltia CMS](https://sveltia.dev).

Diese Codebase ist eine Migration von der bisherigen React/Decap-CMS-Lösung.
Sie läuft als **Staging** parallel zur Produktion und wird erst nach
Abnahme zur neuen Produktions-Site.

---

## Architektur

```
src/
├── pages/                  Routen (Dateisystem = URL)
│   ├── index.astro         Deutsche Startseite  (/)
│   ├── en/                 Englische Seiten     (/en/...)
│   └── fr/                 Französische Seiten  (/fr/...)
├── layouts/
│   ├── BaseLayout.astro    HTML-Skelett, Head, Fonts
│   └── PageLayout.astro    + Nav + Footer
├── components/             Wiederverwendbare Bausteine
│   ├── Nav.astro
│   ├── Hero.astro
│   └── Footer.astro
├── i18n/
│   ├── index.ts            useTranslations, localizedPath, getLocale
│   └── locales/
│       ├── de.json         Deutsche Texte (Default)
│       ├── en.json         Englische Texte
│       └── fr.json         Französische Texte
└── styles/
    └── global.css          Tailwind + Base Styles

public/
├── admin/
│   ├── index.html          Sveltia CMS Loader
│   └── config.yml          CMS-Konfiguration (eine Collection pro Sprache)
├── uploads/                Bilder die über CMS hochgeladen werden
└── favicon.svg
```

### i18n-Strategie

- **Default-Locale Deutsch** – ohne URL-Prefix (`/`, `/spenden`).
- **Englisch und Französisch** mit Prefix (`/en/...`, `/fr/...`).
- Übersetzungen liegen als JSON-Dateien pro Sprache (`src/i18n/locales/*.json`).
- Komponenten holen sich Texte über `useTranslations(locale)` und Dot-Notation:
  `t('hero.title')`.
- Highlight-Marker `{{highlight}}...{{/highlight}}` werden zu gold-akzentuierten
  Spans gerendert (siehe `renderHighlight()`).

### Warum eine Collection pro Sprache?

Aus der bisherigen Decap-Erfahrung: Wenn mehrere CMS-"files"-Einträge dieselbe
Quell-JSON-Datei bearbeiten, gibt es Merge-Konflikte sobald zwei Editoren
gleichzeitig speichern. Eine Collection pro Sprache ↔ eine JSON-Datei
vermeidet das vollständig.

---

## Lokale Entwicklung

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:4321
npm run build    # Produktions-Build nach dist/
npm run preview  # Preview des Builds
```

---

## Sveltia CMS

Editoren erreichen das CMS unter `/admin/` (z.B.
`https://friedensinitiative-astro.netlify.app/admin/`).

### Authentifizierung

Sveltia CMS verwendet **GitHub OAuth direkt** (nicht Netlify Identity).
Dazu wird ein kleiner Auth-Helper benötigt, der den OAuth-Flow abwickelt.

**Empfohlen:** Cloudflare Workers Deployment des offiziellen
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) Workers.

Nach Deployment:
1. URL des Auth-Workers in `public/admin/config.yml` → `backend.base_url` eintragen.
2. GitHub OAuth App registrieren, Client-ID + Secret im Worker hinterlegen.
3. Repo-Namen in `backend.repo` anpassen.

(Details siehe nächste Migrations-Phase.)

### Editorial Workflow

`publish_mode: editorial_workflow` ist aktiv: Änderungen erstellen Pull
Requests statt direkter Commits. Das gibt Reviewing-Möglichkeit vor
Publikation. Auskommentieren falls direkte Veröffentlichung gewünscht.

---

## Deployment

- **Staging** läuft auf Netlify als separates Projekt
  (`friedensinitiative-astro.netlify.app`) – nicht in der Produktion.
- Build-Konfiguration in `netlify.toml`.
- Jeder Push auf `main` triggert einen Production-Build.
- Pull Requests bekommen automatisch Deploy Previews.

---

## Nächste Schritte (Migrations-Phasen)

1. ✅ **Grundgerüst** – Astro-Projekt, i18n, Layouts, Hero, Nav, Footer
2. ✅ **Lokalisierte URL-Slugs** – `/spenden` ↔ `/en/donate` ↔ `/fr/dons`
3. ✅ **Donate-Seite** – Hybrid Markdown+JSON, alle Sektionen, QR-Platzhalter, DonorBox-Slot
4. ⬜ **Cloudflare Worker** für Sveltia-OAuth deployen
5. ⬜ **GitHub + Netlify** Setup für Staging
6. ⬜ **DonorBox Form-ID** eintragen (aus Mailchimp/altem Repo)
7. ⬜ **QR-Codes** ersetzen (Swiss QR-Bill + TWINT Merchant)
8. ⬜ **About / Maharishi / Kontakt** – aus altem Repo übernehmen
9. ⬜ **Test-Cycle**: Editor-Tests, Mehrsprachigkeit prüfen, SEO-Check
10. ⬜ **Domain-Swap**: Produktion umstellen

---

## Lokales Testen — Quickstart

```bash
# 1. ZIP entpacken (falls noch nicht passiert)
unzip friedensinitiative-astro-v0.2.zip
cd friedensinitiative-astro

# 2. Dependencies installieren (einmalig, dauert ~1 Min)
npm install

# 3. Dev-Server starten
npm run dev
```

Browser öffnet sich automatisch auf `http://localhost:4321`. Änderungen
an Astro-Dateien werden mit Hot-Reload sofort gezeigt.

**Was Du testen kannst:**
- Startseite (DE) auf `/`
- Englische Startseite auf `/en/`
- Spendenseite auf `/spenden`, `/en/donate`, `/fr/dons`
- Sprach-Switcher oben rechts — bleibt auf derselben logischen Seite
- Navigation zwischen den Seiten
- Responsive Layout (Browser-Fenster verkleinern)
