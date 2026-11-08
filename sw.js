// 4/D portalı — telefona kurulabilir uygulama (PWA) yardımcısı.
// Yalnızca uygulama giriş sayfasını, çevrimdışı uyarısını ve simgeleri saklar.
// Etkinlik sayfalarına KARIŞMAZ: onlar her zaman doğrudan internetten gelir,
// böylece öğrenciler eski bir etkinlik sürümü görmez.
const SURUM = '4d-uygulama-v1';
const SAKLANANLAR = ['uygulama.html', 'cevrimdisi.html', 'manifest.json',
  'uygulama/ikon-192.png', 'uygulama/ikon-512.png', 'uygulama/ikon-180.png'];

self.addEventListener('install', olay => {
  olay.waitUntil(caches.open(SURUM).then(c => c.addAll(SAKLANANLAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', olay => {
  olay.waitUntil(caches.keys()
    .then(adlar => Promise.all(adlar.filter(a => a.startsWith('4d-uygulama-') && a !== SURUM).map(a => caches.delete(a))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', olay => {
  const istek = olay.request;
  if (istek.method !== 'GET') return;
  const adres = new URL(istek.url);
  if (adres.origin !== self.location.origin) return;
  const kok = new URL('./', self.location).pathname;
  const yol = adres.pathname.startsWith(kok) ? adres.pathname.slice(kok.length) : null;
  if (yol === null || !SAKLANANLAR.includes(yol)) return; // diğer her şey normal şekilde internetten
  // Önce internet; internet yoksa saklanan kopya; o da yoksa çevrimdışı sayfası.
  olay.respondWith(fetch(istek).then(cevap => {
    if (cevap.ok) { const kopya = cevap.clone(); caches.open(SURUM).then(c => c.put(istek, kopya)); }
    return cevap;
  }).catch(() => caches.match(istek).then(k => k || caches.match('cevrimdisi.html'))));
});
