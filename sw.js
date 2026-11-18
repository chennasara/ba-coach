// Version erhöhen, wenn du Dateien änderst – dann lädt die App die neue Version.
const VERSION = 'ba-coach-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts: aus dem Cache, im Hintergrund aktualisieren
  if (url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION + '-fonts').then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  if (url.origin !== location.origin) return;

  // Seitenaufrufe: zuerst Netz (für Updates), offline aus dem Cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const copy = r.clone(); if (r.ok) caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Übrige Dateien: zuerst Cache
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
