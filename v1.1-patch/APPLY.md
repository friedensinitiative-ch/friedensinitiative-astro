# Patch v1.1 — Fix Kontaktformular (404 nach Submit)

## Was war kaputt

Nach dem Absenden des Kontaktformulars zeigte Netlify eine 404-Seite.
Drei Probleme:

1. **`form-name`-Input wurde im gebauten HTML weggelassen.** Astro hat das
   Hidden-Input wegoptimiert. Ohne dieses Feld weiss Netlify nicht, welcher
   Form eine Submission zugeordnet werden soll → 404.
2. **Kein `action`-Attribut.** Netlify versucht in dem Fall, zur Origin-URL
   zurückzuredirecten, was wegen Astro's Trailing-Slash-Verhalten oft
   ebenfalls 404 erzeugt.
3. **Netlify's Form-Detection-Crawler hat die Form möglicherweise gar nicht
   entdeckt.** Der Crawler scannt statisches HTML beim Deploy. Wenn der
   gerenderte Output zwischen Build-Phasen variiert, kann das fehlschlagen.

## Was der Fix macht

1. **`ContactForm.astro` neu geschrieben**: Hidden-Input für `form-name` ist
   jetzt direkt nach dem öffnenden `<form>`-Tag (ohne dazwischenliegende
   HTML-Kommentare, die Astro wegoptimieren könnte). `action="..."` wird
   gesetzt und zeigt auf die lokalisierte Danke-Seite.

2. **Drei Danke-Seiten** in 3 Sprachen:
   - `/danke` (DE)
   - `/en/thank-you` (EN)
   - `/fr/merci` (FR)

3. **`public/__forms.html`**: statische HTML-Datei mit allen drei
   Form-Definitionen (`contact-de`, `contact-en`, `contact-fr`). Diese Datei
   wird nicht verlinkt und ist `noindex` – sie existiert nur damit Netlifys
   Form-Detection-Crawler die Forms beim Deploy garantiert findet.
   Das ist Standard-Praxis bei Astro+Netlify-Forms.

4. **`routes.ts`** um `thanks`-Route erweitert.

5. **PowerShell-Script `add-thanks-strings.ps1`** fügt die Texte für die
   Danke-Seiten in Deine bestehenden Locale-Files ein, ohne andere Keys
   anzutasten.

## Anwenden

### 1. Dateien kopieren

```
cd C:\Users\fkaeg\Downloads\friedensinitiative-astro-v1.1-patch\v1.1-patch
```

```
Copy-Item -Recurse -Force src\* C:\Users\fkaeg\Projects\friedensinitiative-astro\src\
```

```
Copy-Item -Recurse -Force public\* C:\Users\fkaeg\Projects\friedensinitiative-astro\public\
```

### 2. Locale-Strings einfügen

```
.\add-thanks-strings.ps1
```

(Bei Script-Block-Fehler: `powershell -ExecutionPolicy Bypass -File add-thanks-strings.ps1`)

### 3. Lokal bauen + prüfen

```
cd C:\Users\fkaeg\Projects\friedensinitiative-astro
npm run build
```

Sollte 18 Seiten bauen (15 vorher + 3 Danke-Seiten).

Kurz im gebauten HTML verifizieren:

```
Select-String -Path dist\kontakt\index.html -Pattern 'form-name|action='
```

Erwartete Ausgabe: mindestens `name="form-name" value="contact-de"` und `action="/danke"`.

### 4. Push

```
git add .
git commit -m "Fix contact form 404: explicit form-name input, action attr, dedicated thanks pages, static form detection"
git push
```

### 5. Auf Netlify testen

Nach dem Deploy:

1. https://friedensinitiative-astro.netlify.app/kontakt aufrufen
2. Formular ausfüllen, abschicken
3. **Erwartung**: Du landest auf https://friedensinitiative-astro.netlify.app/danke
4. **Im Netlify-Dashboard**: Site settings → Forms — dort sollten jetzt
   `contact-de`, `contact-en`, `contact-fr` als erkannte Forms auftauchen,
   und die Submission als neuer Eintrag erscheinen

### 6. Optional: Email-Benachrichtigungen aktivieren

Site settings → Forms → Form notifications → Add notification → Email →
Adresse eintragen (z.B. `info@friedensinitiative.ch`) → Save.

## Wichtiger Hinweis

Netlify Forms hat ein Kontingent von **100 Submissions/Monat** im Free-Plan.
Bei höherem Aufkommen Plan-Upgrade oder Wechsel auf eine alternative
Form-Backend-Lösung nötig (z.B. Formspree, eigene Function).
