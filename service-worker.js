const CACHE_NAME = 'rdhs-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/AboutUs.html',
  '/MonthlyStatistics.html',
  '/contact.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/service-worker.js',

  // Subdirectories
  '/CardDetails/index.html',
  '/statistics/index.html',

  // Images folder (if any images used)
  '/images/logo.png', // replace with real image names if you have any

  // CSS & JS (replace with real file names if different)
  '/style.css',
  '/main.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/index.html');
    })
  );
});
