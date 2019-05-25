const CACHE = 'lab-3-cache-v1';
const URLS = [
  'index.html',
  'assets/app.css',
  'assets/app.js',
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
        return response || fetch(event.request);
      }
    )
  );
});