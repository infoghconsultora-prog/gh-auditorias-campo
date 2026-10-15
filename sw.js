// Service worker mínimo: guarda la "cáscara" de la app para que abra sin señal.
// Las llamadas al backend (script.google.com) nunca se cachean.
const V = 'gh-campo-v1';
const CASCARA = ['./', 'index.html', 'manifest.webmanifest', 'logo-gh.png', 'icon-192.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(CASCARA)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // primero la red (así se actualiza sola); si no hay señal, lo guardado
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(V).then((ch) => ch.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match('index.html'))));
});
