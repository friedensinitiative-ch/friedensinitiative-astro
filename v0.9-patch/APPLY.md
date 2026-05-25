# Patch v0.9 – Foto-Galerie

## Was hinzugefügt wird

- **Galerie-Seite** in 3 Sprachen:
  - `/galerie` (DE)
  - `/en/gallery` (EN)
  - `/fr/galerie` (FR)
- **42 Fotos** thematisch kuratiert:
  - 10× Maharishi Mahesh Yogi (Portraits, Lehre, Meditation)
  - 1× Swami Brahmananda Saraswati (Maharishis Meister)
  - 1× Vedic Sages Illustration
  - 14× Pandits beim Chanting, Aarti, Yagya, Recitation
  - 11× Pandit-Studenten (Meditation, Gemeinschaft, Feste)
  - 3× Lehrer & Schüler
  - 2× Spezial-Bilder
- **Lightbox** mit:
  - Vor/Zurück-Pfeile (auch Tasten ← → + Swipe auf Mobile)
  - Esc zum Schliessen
  - Schwarzer Hintergrund, Klick auf Backdrop schliesst
  - Bildunterschrift + Counter ("3 of 42")
  - Volle Tastatur-Navigation
- **Galerie-Eintrag in Nav** (zwischen "Über uns" und "Kontakt")
- **Photo-Gallery-Button** auf Startseite verlinkt jetzt korrekt auf die Galerie

## Performance

- WebP mit 3 Auflösungen (400w Grid, 800w/1600w Lightbox), JPG-Fallback
- Lazy-loading: nur sichtbare Thumbnails werden geladen
- Galerie-Grid initial ~3 MB total (alle 42 Thumbnails)
- Lightbox lädt Vollbild erst beim Öffnen

## Anwenden

1. ZIP entpacken
2. PowerShell in den entpackten Ordner wechseln
3. Verifizieren mit `dir` (du musst src/ und public/ sehen)
4. Kopieren ins Projekt:

```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
Copy-Item -Recurse -Force public\* C:\Users\fkaeg\Projects\friedensinitiative-astro\public\
```

5. Lokal testen:

```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run dev
```

(Strg+F5 im Browser)

6. Testen:
   - http://localhost:4321/galerie öffnen
   - Auf Bild klicken → Lightbox öffnet sich
   - Pfeil-Taste rechts → nächstes Bild
   - Esc → schliessen
   - In Nav: "Galerie" anklicken aus Home/About/Kontakt heraus
   - Sprachen quer durchklicken (Galerie funktioniert in DE/EN/FR)

7. Wenn alles passt:
```
git add .
git commit -m "Add photo gallery: 42 curated photos with lightbox"
git push
```

Bei "rejected" wegen Sveltia:
```
git pull --rebase
# Konflikt? git checkout --theirs <datei> && git add <datei> && git rebase --continue
git push
```

## Sveltia-CMS

Die Galerie-Bildunterschriften sind aktuell **nicht** im CMS bearbeitbar (sind in `src/data/gallery.json` als statische Daten). Falls Du sie später im CMS bearbeiten willst, sag Bescheid – dann erweitern wir die Sveltia-Config entsprechend.

## Wo Bilder hinzufügen / entfernen

Aktuelle Datei: `src/data/gallery.json`
Bilder liegen in: `public/images/gallery/`

Pro Bild gibt es 4 Dateien (slug-w400.webp, slug-w800.webp, slug-w1600.webp, slug.jpg). Für neue Bilder musst Du die in diesen Varianten erstellen. Falls Du das nicht selbst machen willst, schick mir neue Originale und ich generiere sie.
