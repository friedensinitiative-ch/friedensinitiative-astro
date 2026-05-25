# Patch v0.5 – Inhalte aus altem React-Repo + neue Seiten

## Was diesem Patch zugrunde liegt

- Alte Locale-Inhalte (Training, Yoga, Yagya, Media, About) aus dem React-Repo übernommen
- Neue Seiten angelegt: About (`/ueber-uns`, `/en/about`, `/fr/a-propos`), Kontakt (`/kontakt`, `/en/contact`, `/fr/contact`)
- Home-Seiten erweitert mit Training-, Yoga-, Yagya-, Media-Sektionen
- Maharishi aus Nav entfernt (Inhalt ist auf About-Seite)
- Sveltia-Config komplett für neue Felder aktualisiert
- Yagya-Bild aus altem Repo übernommen
- Footer mit Trademark-Hinweis erweitert
- Kontakt-Formular: Netlify Forms native Integration

## So anwenden

1. Dev-Server stoppen (falls läuft): Strg+C, J
2. Diesen Patch-Ordner in Dein Projekt mergen:
   - Alle Dateien aus `src/` über bestehende kopieren (überschreiben)
   - Alle Dateien aus `public/` über bestehende kopieren (überschreiben)
   - Neue Verzeichnisse `src/components/home/`, `public/images/` und neue Files werden automatisch angelegt

PowerShell-Befehl (aus dem entpackten Patch-Ordner):
```
Copy-Item -Recurse -Force * C:\Users\fkaeg\Projects\friedensinitiative-astro\
```

3. Dev-Server neu starten: `npm run dev`
4. Im Browser prüfen:
   - http://localhost:4321/ – Startseite mit Training, Yoga, Yagya, Media
   - http://localhost:4321/ueber-uns – About-Seite
   - http://localhost:4321/kontakt – Kontakt-Formular
   - Sprach-Switcher quer durchprobieren

5. Wenn alles passt, committen + pushen:
```
git add .
git commit -m "Add content from old site: training/yoga/yagya/media sections, about + contact pages"
git push
```

Netlify baut automatisch. Nach ~2 Minuten ist alles live.

## Was Du danach noch tun solltest

- Netlify Forms: Site settings → Forms → Form notifications aktivieren (E-Mail bei Eingang)
- Impressum + Datenschutz: Inhalt ergänzen (im CMS oder als Markdown-Files)
- DonorBox Form-ID eintragen (sobald aus Mailchimp/altem Repo bekannt)
- QR-Codes für Bank und TWINT als Bilder hochladen
