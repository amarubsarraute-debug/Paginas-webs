// ═══════════════════════════════════════════
// POLARIS — Service Worker (offline + install)
// Subí el número de versión para forzar actualización del cache.
// ═══════════════════════════════════════════

const CACHE = 'polaris-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/data.js',
  './js/state.js',
  './js/ui.js',
  './js/timer.js',
  './js/screens/hoy.js',
  './js/screens/polaris.js',
  './js/screens/personaje.js',
  './js/screens/shadow.js',
  './js/screens/progreso.js',
  './js/modules/visualizacion.js',
  './js/modules/inseguridades.js',
  './js/modules/constraint.js',
  './js/dataio.js',
  './js/notifications.js',
  './js/config.js',
  './js/app.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon.png',
  './assets/fonts/inter-latin-400-normal.woff2',
  './assets/fonts/inter-latin-500-normal.woff2',
  './assets/fonts/inter-latin-600-normal.woff2',
  './assets/fonts/fraunces-latin-400-normal.woff2',
  './assets/fonts/fraunces-latin-500-normal.woff2',
  './assets/fonts/fraunces-latin-600-normal.woff2',
  './assets/fonts/fraunces-latin-400-italic.woff2',
  './assets/fonts/fraunces-latin-600-italic.woff2',
];

// Install: precache resiliente (un asset faltante no rompe todo)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.allSettled(ASSETS.map((a) => cache.add(a))))
      .then(() => self.skipWaiting())
  );
});

// Activate: limpiar caches viejos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first; navegaciones offline → index.html
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const reqUrl = new URL(e.request.url);
  if (reqUrl.pathname.includes('/seed/')) return; // el seed siempre va a la red, nunca al cache
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((resp) => {
          // cachear en caliente recursos propios (mismo origen)
          if (resp.ok && e.request.url.startsWith(self.location.origin)) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return resp;
        })
        .catch(() => {
          if (e.request.mode === 'navigate') return caches.match('./index.html');
        });
    })
  );
});

// Clic en notificación → enfocar o abrir la app
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cl) => {
      for (const c of cl) {
        if ('focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./index.html');
    })
  );
});
