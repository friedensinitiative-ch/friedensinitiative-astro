# Patch v0.8 – Echte Fotos + Live-Site Parity

## Was sich ändert

- **Vier neue Fotos** integriert (WebP optimiert, je 25-250 KB):
  - Training-Sektion: Maharishi Vedic Pandit Students
  - Yoga-Sektion: Pandit Meditating
  - Yagya-Sektion: Pandits Reciting
  - About-Seite: Maharishi Mahesh Yogi (Portrait)
- **Responsive Bilder** mit 2 Auflösungen (800w/1600w) + WebP + JPG-Fallback, lazy loading
- **Layout-Wechsel:** Sektionen sind jetzt zweispaltig (Text/Bild alternierend) auf Desktop, einspaltig auf Mobile
- **Stats korrigiert:**
  - DE: "1331" (deutsch ohne Komma), EN: "1,331", FR: "1 331"
  - Years: "10–20" (vorher "10")
- **Copyright erweitert** mit UID und Rechtsform:
  - DE: "Alle Inhalte © 2026 Globale Friedensinitiative Schweiz, ein gemeinnütziger Verein, UID: CHE-142.469.811. Alle Rechte vorbehalten."
  - EN, FR analog
- **Media-Sektion erweitert:**
  - "Featured Video" Label über dem Titel
  - Buttons unter dem Video: "More Videos" (YouTube-Playlist) und "Photo Gallery" (Anchor #gallery)

## Was unverändert bleibt

- Logo nur in Nav/Footer (KEIN grosses Logo im Hero – wie gewünscht)
- Sprach-Switcher als DE/EN/FR Pills (keine Flaggen)
- Footer mit Logo (bleibt wie in v0.7)
- YouTube-Video bleibt eingebettet (echtes Video, kein Bild-Link)

## Anwenden

1. Patch entpacken
2. PowerShell in den entpackten Ordner wechseln
3. Mit `dir` verifizieren (du musst src/ und public/ sehen)
4. Files rüberkopieren:

```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
Copy-Item -Recurse -Force public\* C:\Users\fkaeg\Projects\friedensinitiative-astro\public\
```

5. Lokal testen:
```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run dev
```

(Strg+F5 im Browser, damit alte Bilder nicht aus dem Cache kommen)

6. Wenn alles passt:
```
git add .
git commit -m "Add real photos, fix stats, UID in copyright, featured video label"
git push
```

Bei "rejected" wegen Sveltia:
```
git pull --rebase
# falls Konflikt: git checkout --theirs <datei> && git add <datei> && git rebase --continue
git push
```

## Performance-Hinweis

Alle Bilder sind WebP mit JPG-Fallback und lazy-loading. Initial-Load (nur Hero sichtbar) ist unverändert schnell – Bilder unten laden erst beim Scrollen.

Gesamtgrösse aller 4 Bilder zusammen (WebP, 800w): ~225 KB. Das ist weniger als das eine alte yagya-ceremony.jpg vorher (706 KB) – die Site wird sogar schneller!
