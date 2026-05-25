# Patch v1.0 — Mailchimp-Style Spenden-Seite + About-Zeitachse + Contact-Heading

Dieser Patch passt drei Seiten an das Layout der Mailchimp-Vorlage und der
alten Live-Site an.

## Was sich ändert

### Spenden-Seite (alle 3 Sprachen)

**Komplett umgebaut im Mailchimp-Stil:**

- Kurze Einleitung statt der drei Absätze
- Goldene horizontale Trennlinien zwischen den Abschnitten
- Drei klar getrennte Sektionen mit gold-uppercase-Überschriften:
  1. **SPENDEN PER BANKÜBERWEISUNG — SPESENFREI**
     - QR-Code links, Bankdaten rechts als Mono-Text-Block
     - "Spesenfrei spenden per Überweisung — Ihre Spende kommt vollumfänglich dem Projekt zugute:" Heading
  2. **SPENDEN MIT TWINT**
     - "Jetzt mit TWINT spenden!" Badge-Box links + TWINT-QR rechts
     - Fallback-Link zu RaiseNow
  3. **SPENDEN MIT KREDITKARTE (DONORBOX)**
     - Heading + Intro mit Link zur Donorbox-Seite
     - Iframe-Embed
- Impact-Karten ("Warum spenden / Wie verwendet / Globale Wirkung") **entfernt** —
  die waren nicht in der Mailchimp-Vorlage
- Footer-Notizen zentriert: Ehrenamt + Email + Steuer-Notiz

### Über uns / About-Seite (alle 3 Sprachen)

**Wie auf der alten Live-Site:**

- **Zeitachse mit Jahresangaben** neben jeder Bio-Sektion:
  - 1918 — Early Life and Training
  - 1955 — Teaching Mission
  - 1960er+ — Vedic Science
- **Maharishi-Zitat als Blockquote** unter der Zeitachse:
  *"Das Ziel der Transzendentalen Meditation ist der Zustand der Erleuchtung..."*
- Layout: Jahres-Marker links (gross, gold), Inhalt rechts

### Kontakt-Seite (alle 3 Sprachen)

- **"Nachricht senden" / "Send Message" / "Envoyer un message"** Heading
  vor dem Formular (wie auf der alten Live-Site)

## Anwenden

1. ZIP entpacken
2. PowerShell in den entpackten Ordner wechseln
3. Verifizieren mit `dir` — Du musst `src/` sehen
4. **Erst die 3 alten Komponenten löschen** (siehe DELETE_THESE_FILES.txt):

```
Remove-Item C:\Users\fkaeg\Projects\friedensinitiative-astro\src\components\donate\DonateHero.astro
Remove-Item C:\Users\fkaeg\Projects\friedensinitiative-astro\src\components\donate\DonateFooter.astro
Remove-Item C:\Users\fkaeg\Projects\friedensinitiative-astro\src\components\donate\DonateImpactCards.astro
```

5. Dann den Patch anwenden:

```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
```

6. Lokal testen:

```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run dev
```

Im Browser durchklicken: `/spenden`, `/ueber-uns`, `/kontakt` + alle drei
Sprachvarianten.

7. Build prüfen:

```
npm run build
```

(Sollte 15 Seiten in ~5 Sek bauen)

8. Wenn alles passt:

```
git add -A
git commit -m "Rewrite donate pages in Mailchimp style, add timeline + quote to About, Send Message heading on Contact"
git push
```

Bei "rejected" wegen Sveltia:

```
git pull --rebase
# Konflikt? git checkout --theirs <datei> && git add <datei> && git rebase --continue
git push
```

## Hinweis

Falls Du irgendwann doch die Impact-Karten wieder willst (Warum spenden / Wie
verwendet / Globale Wirkung), sag Bescheid — die Locales-Strings sind noch da,
ich müsste nur eine neue Komponente bauen.
