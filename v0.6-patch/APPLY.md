# Patch v0.6 – Logo, Favicon, Branding-Politur

## Neue Elemente

- **Logo:** Goldener Globus mit Längen-/Breitengraden (SVG, inline) – in Nav und Footer
- **Favicon:** Gleiches Motiv als SVG (Browser-Tab)
- **Hero-Hintergrund:** Subtile Mandala (Sacred Geometry, 8 Achsen, 4 Kreise) in Gold mit ~6% Opazität
- **Ornamentale Trennlinie** im Hero: Gold-Linie · Diamant · Gold-Linie (zwischen Titel und Beschreibung)
- **DonorBox** mit echten Campaign-IDs eingesetzt (3 Sprachen):
  - de: friedensinitiative
  - en: peaceinitiative
  - fr: initiative-mondiale-de-paix
- **YouTube-Video** in Media-Sektion (ID: ZQOxpwHk0fQ, youtube-nocookie für Datenschutz)
- **Social-Icons** im Footer: YouTube, Facebook, Twitter/X
- **Telefonnummer** auf Kontakt-Seiten: +41 44 260 44 72
- **Yagya-Pandits-Count:** korrigiert auf 1331 (aus altem siteConfig)
- **Footer-Logo:** Globus + "Globale Friedensinitiative Schweiz" zentriert

## Anwenden

1. ZIP entpacken
2. PowerShell in den entpackten Patch-Ordner wechseln
3. Verifizieren mit `dir` (Du musst src/, public/ und APPLY.md sehen)
4. Inhalte ins Projekt kopieren:

```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
Copy-Item -Recurse -Force public\* C:\Users\fkaeg\Projects\friedensinitiative-astro\public\
```

5. Dev-Server starten:

```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run dev
```

6. Im Browser prüfen:
   - Logo in Nav und Footer
   - Favicon im Browser-Tab
   - Mandala im Hero-Hintergrund
   - Diamant-Trenner im Hero
   - YouTube-Video auf Startseite
   - Social-Icons im Footer
   - Telefonnummer auf /kontakt
   - DonorBox auf /spenden (zeigt jetzt die echte Friedensinitiative-Kampagne)

7. Committen und pushen:

```
git add .
git commit -m "Add branding: logo, favicon, mandala, donorbox IDs, social, phone"
git push
```

Falls "rejected" wegen Sveltia-Aktivität:
```
git pull --rebase
# bei Konflikt in de.json: git checkout --theirs src/i18n/locales/de.json && git add src/i18n/locales/de.json && git rebase --continue
git push
```
