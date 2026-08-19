/* ==========================================================================
   سرویس‌ورکر روستای لاتیدان — کش آفلاین
   استراتژی: cache-first برای دارایی‌های ثابت، network-first برای صفحات HTML
   ========================================================================== */
const CACHE = 'latidan-v1';

const PRECACHE = [
    './',
    './index.html',
    './en/',
    './en/index.html',
    './404.html',
    './manifest.webmanifest',
    './assets/css/main.css',
    './assets/js/main.js',
    './assets/fonts/Vazirmatn-Variable.woff2',
    './assets/vendor/leaflet/leaflet.css',
    './assets/vendor/leaflet/leaflet.js',
    './assets/img/latidan-bridge.webp',
    './assets/img/latidan-village.webp',
    './assets/img/kol-river.webp',
    './assets/img/latidan-mountain.webp',
    './assets/img/kolometli-entrance.webp',
    './assets/img/bridge-arches.webp',
    './assets/img/bridge-visit.webp',
    './assets/img/village-life.webp',
    './assets/img/favicon.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll(PRECACHE).catch(() => {}))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);

    // کاشی‌های نقشه را کش نمی‌کنیم (حجیم و متغیر)
    if (url.hostname.endsWith('tile.openstreetmap.org')) return;

    // صفحات HTML: ابتدا شبکه، در صورت قطعی از کش
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE).then((c) => c.put(req, copy));
                    return res;
                })
                .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
        );
        return;
    }

    // دارایی‌های ثابت: ابتدا کش
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(req).then((cached) => {
                if (cached) return cached;
                return fetch(req).then((res) => {
                    if (res.ok) {
                        const copy = res.clone();
                        caches.open(CACHE).then((c) => c.put(req, copy));
                    }
                    return res;
                }).catch(() => cached);
            })
        );
    }
});
