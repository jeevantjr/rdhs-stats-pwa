const CACHE_NAME = 'rdhs-cache-v22'; // Update this version after every significant change
const DEBUG = false; // Set to true for development logging

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
   '/rdhs-stats-pwa/statistics/statistics/Bed.html',
  '/rdhs-stats-pwa/statistics/statistics/Inward.html',
  '/rdhs-stats-pwa/statistics/statistics/Outdoor.html',
   '/rdhs-stats-pwa/statistics/statistics/Dengue.html',

  // Clinic Details
  '/rdhs-stats-pwa/institutions/index.html',
  '/rdhs-stats-pwa/institutions/institutionschedule.html',
  '/rdhs-stats-pwa/institutions/specialclinicsdetails.html',

  // Health Education
  '/rdhs-stats-pwa/healtheducation/index.html',
  '/rdhs-stats-pwa/healtheducation/FeedYourBaby.html',
  '/rdhs-stats-pwa/healtheducation/Leptospirosistamil.html',
   '/rdhs-stats-pwa/healtheducation/Leptospirosissinhala.html',

  // Monthly statistics (adjust if these are outside your scope)
  '/rdhs-stats-pwa/MonthlyStatistics/index.html',
  '/rdhs-stats-pwa/MonthlyStatistics/dengue2.html',
 '/rdhs-stats-pwa/MonthlyStatistics/Anaemia.html',
  '/rdhs-stats-pwa/MonthlyStatistics/Leprosy.html', 
   '/rdhs-stats-pwa/MonthlyStatistics/ChildDeaths.html',
  '/rdhs-stats-pwa/MonthlyStatistics/Underweight.html',
 '/rdhs-stats-pwa/MonthlyStatistics/TeenagePregnant.html',

  //Notice Board
  '/rdhs-stats-pwa/NoticeBoard.html',
  
  // Offline fallback page
  '/rdhs-stats-pwa/offline.html',
];

// Install event with resilient caching
self.addEventListener('install', (event) => {
  if (DEBUG) console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          if (DEBUG) console.log('[Service Worker] Cached:', url);
        } catch (err) {
          console.warn('[Service Worker] Failed to cache:', url, err);
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  if (DEBUG) console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            if (DEBUG) console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    // Network-first strategy for navigation
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cloned);
            })
          );
          return response;
        })
        .catch(() => {
          if (DEBUG) console.warn('[Service Worker] Offline fallback for navigation.');
          return caches.match('/rdhs-stats-pwa/offline.html');
        })
    );
  } else {
    // Cache-first strategy for static assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            const cloned = networkResponse.clone();
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, cloned);
              })
            );
            return networkResponse;
          })
          .catch(() => {
            if (DEBUG) console.warn('[Service Worker] Request failed and no cache found:', event.request.url);
            return caches.match('/rdhs-stats-pwa/offline.html');
          });
      })
    );
  }
});
