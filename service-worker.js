const CACHE_NAME = 'rdhs-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/AboutUs.html',
  '/MonthlyStatistics.html',
  '/contact.html',
  '/manifest.json',
  '/service-worker.js',
  '/icon-192.png',
  '/icon-512.png',

  // If these exist, include your CSS/JS
  '/style.css',
  '/main.js',

  // Sub-pages or folders
  '/CardDetails/index.html',
  '/statistics/index.html',

  // Any image files you use
  '/images/logo.png' // Replace or add more image paths if needed
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
      // fallback to homepage if offline and resource not cached
      return caches.match('/index.html');
    })
  );
});

