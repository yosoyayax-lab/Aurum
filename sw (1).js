const CACHE = 'aurum-v2';
const ASSETS = [
  'https://yosoyayax-lab.github.io/Aurum/',
  'https://yosoyayax-lab.github.io/Aurum/index.html',
  'https://yosoyayax-lab.github.io/Aurum/manifest.json',
  'https://yosoyayax-lab.github.io/Aurum/icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
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
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('https://yosoyayax-lab.github.io/Aurum/')))
  );
});
