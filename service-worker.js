const CACHE_NAME = 'app-viajes-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Las llamadas al backend (Apps Script) nunca pasan por caché, siempre van a la red.
  if (url.includes('script.google.com') || url.includes('script.googleusercontent.com')) {
    return;
  }

  // Para el HTML de la app: red primero (así siempre ves la última versión subida).
  // Si no hay conexión, se usa la última copia guardada como respaldo.
  const esNavegacion = event.request.mode === 'navigate' || event.request.destination === 'document';
  if (esNavegacion) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copia = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Para el resto de archivos estáticos (iconos, manifest): caché primero, red de respaldo.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
