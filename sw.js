// Service worker mínimo: guarda la "cáscara" de la app para que abra sin señal.
// Las llamadas al backend (script.google.com) nunca se cachean.
const VERSION = 'gh-campo-v5';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'logo-gh.png', 'apple-touch-icon.png', 'icons/icon-32.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // primero la red (así se actualiza sola); si no hay señal, lo guardado
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then((r) => { const c = r.clone(); caches.open(VERSION).then((ch) => ch.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match('index.html'))));
});
