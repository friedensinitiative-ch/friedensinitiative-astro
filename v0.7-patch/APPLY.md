# Patch v0.7 – Echte Original-Assets übernommen

## Was sich gegenüber v0.6 ändert

Mein selbstgemachter Globus war ein netter Platzhalter — jetzt aber das **echte Original-Branding**:

- **Logo:** Goldene Weltkarte (logo.png aus dem alten Repo) in Nav und Footer
- **Favicon-Set:** ico, PNG (32/192/512), Apple-Touch-Icon — auf allen Geräten
- **Swiss QR-Bill:** echter QR-Code auf der Spendenseite (statt Platzhalter)
- **TWINT QR:** echter Merchant-QR-Code (statt Platzhalter)
- **Schweizer Vereinsangaben** auf About-Seite:
  - Gründung 12. Juli 2012 in Seelisberg
  - Vereinssitz Basel, Art. 60 ff. ZGB
  - UID: CHE-142.469.811
  - Steuerbefreiung Kanton Basel-Stadt seit 15.01.2013
  - Link für Statuten-Download (Datei muss noch hochgeladen werden)
- **Bürozeiten** auf Kontakt-Seite (Mo–Fr 9–17 Uhr, Wochenende geschlossen)
- **Telefon-Link** funktional

## Anwenden

1. **Erst die alte SVG-Datei aus v0.6 löschen:**
```
Remove-Item C:\Users\fkaeg\Projects\friedensinitiative-astro\public\favicon.svg -ErrorAction SilentlyContinue
```

2. **Patch entpacken** und in den entpackten Ordner wechseln.
3. **Verifizieren** dass Du am richtigen Ort bist:
```
dir
```
Du musst src/, public/ und APPLY.md sehen.

4. **Files rüberkopieren:**
```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
Copy-Item -Recurse -Force public\* C:\Users\fkaeg\Projects\friedensinitiative-astro\public\
```

5. **Lokal testen:**
```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run dev
```

Wichtig im Browser: **Strg+F5** (Hard-Reload), damit der Browser-Cache umgangen wird – sonst zeigt er noch alte Favicons.

6. **Wenn alles passt:**
```
git add .
git commit -m "Add original branding: world map logo, favicons, real QR codes, Swiss org details"
git push
```

Falls "rejected" wegen Sveltia:
```
git pull --rebase
# bei Konflikt: git checkout --theirs <datei> && git add <datei> && git rebase --continue
git push
```

## Noch ausstehend

- **Statuten-PDF** hochladen nach `public/uploads/statuten.pdf` (Link existiert schon auf About-Seite)
- **Impressum + Datenschutz**-Seiten anlegen (Folgearbeit)
- **Domain** friedensinitiative.ch umziehen (wenn alles steht)
