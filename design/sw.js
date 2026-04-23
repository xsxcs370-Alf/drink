const CACHE = 'daily-log-v1';
const ASSETS = [
  './Daily Log.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;500&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => {}))
  );
});
