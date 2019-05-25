const CACHE = 'lab-1-cache-v1';
const URLS = [
  'index.html',
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
