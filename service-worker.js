const CACHE_NAME = 'rdhs-cache-v2'; // Make sure to update version on each change

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
  '/rdhs-stats-pwa/statistics/unprotected-births.html',

  // Clinic Details
  '/rdhs-stats-pwa/institutions/index.html',
  '/rdhs-stats-pwa/institutions/institutionschedule.html',
  '/rdhs-stats-pwa/institutions/specialclinicsdetails.html',

  // Health Education
  '/rdhs-stats-pwa/healtheducation/FeedYourBaby.html',
    '/rdhs-stats-pwa/healtheducation/index.html',

  //monthly statistics
  '/MonthlyStatistics/dengue.html',
  '/MonthlyStatistics/index.html',

  // Optional offline fallback (if created)
  // '/rdhs-stats-pwa/offline.html',
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() =>
        caches.match('/rdhs-stats-pwa/offline.html') // Optional
      );
    })
  );
});

