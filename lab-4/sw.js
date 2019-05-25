const CACHE = 'lab-4-cache-v1';
const URLS = [
  'index.html',
  'assets/app.css',
  'assets/app.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function(cache) {
        console.log('Opened cache'+ CACHE);
        return cache.addAll(URLS);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response ? response : fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {

  const VALID_CACHES = ['lab-4-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (VALID_CACHES.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});