# BA Karriere-Coach – PWA

Installierbare Web-App zur Vorbereitung auf den Einstieg als Junior Business Analystin.
Läuft offline, ohne Login, auf Handy und Laptop.

## Inhalt

```
index.html              die App
manifest.webmanifest    Name, Farben, Icons
sw.js                   Service Worker (Offline-Funktion)
icons/                  App-Symbole
```

## Veröffentlichen mit GitHub Pages

1. Auf github.com ein neues **öffentliches** Repository erstellen, z. B. `ba-coach`.
2. **Add file → Upload files**: den *Inhalt* dieses Ordners hochladen (inkl. Ordner `icons`), dann **Commit changes**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, Ordner `/ (root)` → **Save**.
4. Nach 1–2 Minuten ist die App erreichbar unter
   `https://DEIN-NAME.github.io/ba-coach/`

## Installieren

- **iPhone (Safari):** Link öffnen → Teilen-Symbol → «Zum Home-Bildschirm».
- **Android (Chrome):** Link öffnen → Menü ⋮ → «App installieren».
- **Laptop (Chrome/Edge):** Installations-Symbol rechts in der Adressleiste.

Danach einmal online öffnen – ab dann funktioniert die App auch offline.

## Testen auf dem eigenen Rechner

```
python3 -m http.server 8000
```
Dann `http://localhost:8000` öffnen. (Direkt per Doppelklick geht der Service Worker nicht.)

## Änderungen machen

1. `index.html` anpassen (Fragen, Situationen, Fahrplan stehen als Arrays im Skript: `PLAN`, `W`, `Q`, `SIT`, `IQ`).
2. In `sw.js` die Zeile `const VERSION = 'ba-coach-v1';` hochzählen (`v2`, `v3` …).
3. Neu hochladen. Die App lädt das Update beim nächsten Öffnen mit Internet.

## Daten

Fortschritt, Notizen und Bewerbungen werden lokal im Browser gespeichert (`localStorage`).
Sie bleiben auf dem jeweiligen Gerät und werden nicht synchronisiert.
Beim Löschen der Browserdaten oder Deinstallieren der App gehen sie verloren.
