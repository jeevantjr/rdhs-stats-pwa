const CACHE_NAME = 'rdhs-cache-v1';

const urlsToCache = [
  '/rdhs-stats-pwa/',
  '/rdhs-stats-pwa/index.html',
  '/rdhs-stats-pwa/manifest.json',

  // Images
  '/rdhs-stats-pwa/images/icon-192.png',
  '/rdhs-stats-pwa/images/icon-512-from-building.png',
  '/rdhs-stats-pwa/images/login-bg.jpg',

  // CardDetails
  '/rdhs-stats-pwa/CardDetails/index.html',
  '/rdhs-stats-pwa/CardDetails/MOHCadreDetails.html',
  '/rdhs-stats-pwa/CardDetails/HospitalCadreDetails.html',
  '/rdhs-stats-pwa/CardDetails/MOHCadreDetails.pdf',
  '/rdhs-stats-pwa/CardDetails/HospitalCadreDetails.pdf',
  '/rdhs-stats-pwa/CardDetails/rdhs.pdf',

  // Statistics
  '/rdhs-stats-pwa/statistics/index.html',
  '/rdhs-stats-pwa/statistics/communicable-diseases.html',
  '/rdhs-stats-pwa/statistics/health-personnel.html',
  '/rdhs-stats-pwa/statistics/hospitals-by-ds.html',
  '/rdhs-stats-pwa/statistics/maternal-deaths.html',
  '/rdhs-stats-pwa/statistics/registered-births.html',
  '/rdhs-stats-pwa/statistics/unprotected-births.html'
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
          caches.match('/rdhs-stats-pwa/offline.html') // Optional fallback page
        )
      );
    })
  );
});
