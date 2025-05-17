const CACHE_NAME = 'rdhs-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',

  // Images (icons, backgrounds, etc.)
  '/images/icon-192.png',
  '/images/icon-512-from-building.png',
  '/images/login-bg.jpg',

  // CardDetails files
  '/CardDetails/index.html',
  '/CardDetails/MOHCadreDetails.html',
  '/CardDetails/HospitalCadreDetails.html',
  '/CardDetails/MOHCadreDetails.pdf',
  '/CardDetails/HospitalCadreDetails.pdf',
  '/CardDetails/rdhs.pdf',

  // Statistics files
  '/statistics/index.html',
  '/statistics/communicable-diseases.html',
  '/statistics/health-personnel.html',
  '/statistics/hospitals-by-ds.html',
  '/statistics/maternal-deaths.html',
  '/statistics/registered-births.html',
  '/statistics/unprotected-births.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
