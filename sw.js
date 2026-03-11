// Service Worker for phrakham.life PWA
// Cache version — bump this on each deploy to refresh cached content
var CACHE_VERSION = 'v1-20260311120519';
var CORE_CACHE = 'core-' + CACHE_VERSION;
var RUNTIME_CACHE = 'runtime-' + CACHE_VERSION;

// Shell pages: nav pages + book indexes (pre-cached on install)
var SHELL_PAGES = [
  '/',
  '/nt/',
  '/ot/',
  '/about/',
  '/resources/',
  '/symbols/',
  '/articles/',
  '/nt/james/',
];

var CORE_ASSETS = SHELL_PAGES.concat([
  '/assets/css/style.css',
  '/assets/js/dark-mode.js',
  '/assets/js/tooltip.js',
  '/favicon.ico'
]);

// Install: pre-cache core shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CORE_CACHE).then(function(cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CORE_CACHE && key !== RUNTIME_CACHE;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: network-first for HTML, cache-first for assets
self.addEventListener('fetch', function(event) {
  var request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (fonts are self-hosted now)
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // HTML pages: network-first, fallback to cache
  if (request.headers.get('Accept') && request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(request).then(function(response) {
        var clone = response.clone();
        caches.open(RUNTIME_CACHE).then(function(cache) {
          cache.put(request, clone);
        });
        return response;
      }).catch(function() {
        return caches.match(request).then(function(cached) {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  // CSS, JS, images, fonts: cache-first
  event.respondWith(
    caches.match(request).then(function(cached) {
      return cached || fetch(request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open(RUNTIME_CACHE).then(function(cache) {
            cache.put(request, clone);
          });
        }
        return response;
      });
    })
  );
});
