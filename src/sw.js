var cacheName = 'professor-oak';
var filesToCache = [
  '/',
  '/index.html',
  '/oak.css',
	'https://fonts.googleapis.com/css?family=Press+Start+2P'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    }).catch(error => console.log('failed to fetch', error));
  );
});
