'use strict';

importScripts('/cache-polyfill.js');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('airhorner').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/assets/scss/main.min.css',
        '/assets/app.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
