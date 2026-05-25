# add-thanks-strings.ps1
# Adds the `thanks` i18n strings to your existing locale files without touching
# other keys. Run AFTER copying the rest of the v1.1 patch.

param(
    [string]$ProjectPath = "C:\Users\fkaeg\Projects\friedensinitiative-astro"
)

$locales = @{
    "de" = @{
        title = "Vielen Dank"
        subtitle = "Ihre Nachricht ist angekommen"
        message = "Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb von 24-48 Stunden an Werktagen."
        backLink = "Zurück zur Startseite"
    }
    "en" = @{
        title = "Thank You"
        subtitle = "Your message has been received"
        message = "We have received your message and will typically respond within 24-48 hours on business days."
        backLink = "Back to homepage"
    }
    "fr" = @{
        title = "Merci"
        subtitle = "Votre message a bien été reçu"
        message = "Nous avons reçu votre message et répondrons généralement dans les 24 à 48 heures les jours ouvrables."
        backLink = "Retour à la page d'accueil"
    }
}

foreach ($lang in $locales.Keys) {
    $path = Join-Path $ProjectPath "src\i18n\locales\$lang.json"
    if (-not (Test-Path $path)) {
        Write-Warning "File not found: $path"
        continue
    }
    $data = Get-Content $path -Raw | ConvertFrom-Json -AsHashtable
    $data.thanks = $locales[$lang]
    $json = $data | ConvertTo-Json -Depth 10
    Set-Content -Path $path -Value $json -Encoding UTF8 -NoNewline
    Write-Host "Updated $lang.json"
}

Write-Host ""
Write-Host "Done. Now: npm run build"
