const CACHE = 'aituz-v1';
const ASSETS = [
  './', './index.html',
  './css/variables.css', './css/base.css', './css/animations.css',
  './css/components.css', './css/layout.css', './css/sections.css',
  './js/i18n.js', './js/data.js', './js/planner.js', './js/budget.js',
  './js/currency.js', './js/weather.js', './js/checklist.js', './js/map.js',
  './js/quiz.js', './js/theme.js', './js/offline.js', './js/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => cached)
    )
  );
});