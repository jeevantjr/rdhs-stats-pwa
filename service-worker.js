const CACHE_NAME = 'rdhs-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',

  // Images
  '/images/icon-192.png',
  '/images/icon-512-from-building.png',
  '/images/login-bg.jpg',

  // CardDetails
  '/CardDetails/index.html',
  '/CardDetails/MOHCadreDetails.html',
  '/CardDetails/HospitalCadreDetails.html',
  '/CardDetails/MOHCadreDetails.pdf',
  '/CardDetails/HospitalCadreDetails.pdf',
  '/CardDetails/rdhs.pdf',

  // Statistics
  '/statistics/index.html',
  '/statistics/communicable-diseases.html',
  '/statistics/health-personnel.html',
  '/statistics/hospitals-by-ds.html',
  '/statistics/maternal-deaths.html',
  '/statistics/registered-births.html',
  '/statistics/unprotected-births.html',
];

// Install: Cache everything
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch: Serve cached or go to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match('/offline.html') // Optional fallback page
        )
      );
    })
  );
});

