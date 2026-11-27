// 4/D — Portal sonuç testi: öğrenci portalındaki HER takipli etkinlik, öğrencinin açtığı her yoldan
// (ders listesi ve "Bu Haftanın Etkinlikleri") portal içinde açılıyor ve sonucu öğretmene kaydediliyor mu?
// Kural (öğretmenin kararı 2026-11-27): portal koduna yapılan her değişiklik yayından ÖNCE bu testten geçer.
//
// Kullanım (depo klasöründe, main dalında):
//   node tools/portal-sonuc-testi.mjs                    -> portal dalındaki (origin) güncel portalı dener
//   node tools/portal-sonuc-testi.mjs --dosya <yol>      -> yereldeki bir OgrenciGiris_Guncel.html kopyasını dener
// Gerçek Google sunucusu ve öğrenci verisi KULLANILMAZ: sunucu çağrıları sahte (stub), giriş sahte koddur.
// Etkinlik sayfaları yerine boş sayfa yüklenir ve oradan geçerli bir sonuç mesajı gönderilir; yani bu test
// portalın "açma + sonucu alma" tarafını sınar. Etkinliğin mesajı doğru üretmesi tools/sonuc-takip-kontrol.mjs'te.
// Gerekli: Playwright (Windows'ta Edge ile, Linux'ta Chromium ile çalışır).
import {readFileSync, existsSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORTAL_DALI = 'hazirlik/kazanim-takibi-20261101';
const PORTAL_YOLU = 'portal/appsscript/OgrenciGiris_Guncel.html';
const i = process.argv.indexOf('--dosya');
let portalHtml;
if (i > 0) portalHtml = readFileSync(process.argv[i + 1], 'utf8');
else {
  const git = (...a) => execFileSync('git', a, {cwd: KOK, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20});
  try { git('fetch', '-q', 'origin', `${PORTAL_DALI}:refs/remotes/origin/${PORTAL_DALI}`); } catch (e) { /* çevrimdışı */ }
  portalHtml = git('show', `origin/${PORTAL_DALI}:${PORTAL_YOLU}`);
}
let chromium;
try { chromium = createRequire(import.meta.url)('playwright').chromium; }
catch (e) { console.error('Playwright bulunamadı. Kurulum: npm i -g playwright (ya da testi bulut oturumunda çalıştırın).'); process.exit(2); }

const STUB = "(()=>{window.__calls=[];const U='12345678-1234-1234-1234-123456789abc';const TOKEN=U+'-'+U;\nconst cevap={ogrenciGirisiYap:{basarili:true,token:TOKEN,ogrenciAdi:'Deneme'},oturumBilgisi:{basarili:true,ogrenciAdi:'Deneme'},\n etkinlikSonucuKaydet:{basarili:true,tekrar:false},seciliEtkinlikTamamla:{basarili:true},seciliEtkinlikDurumum:{basarili:true,tamamlananlar:[]}};\nfunction run(){let ok=null,fail=null;const p=new Proxy({},{get(_,n){if(n==='withSuccessHandler')return f=>{ok=f;return p};if(n==='withFailureHandler')return f=>{fail=f;return p};if(n==='withUserObject')return()=>p;\n return(...a)=>{window.__calls.push({n,a:JSON.parse(JSON.stringify(a))});const r=n in cevap?cevap[n]:{basarili:true};setTimeout(()=>ok&&ok(r),5)}}});return p}\nwindow.google={script:{run:new Proxy({},{get(_,n){return run()[n]}})}};})();";
const SONUC = id => ({type: '4d:activity-finished', schemaVersion: 1, activityId: id,
  attemptId: 'test_' + Math.random().toString(36).slice(2, 12) + 'xx', correct: 3, wrong: 1, total: 4, wrongAttempts: 1, firstTry: 2, durationSeconds: 30});

const tarayici = await chromium.launch(process.platform === 'win32' ? {channel: 'msedge'} : {});
const pg = await tarayici.newPage({viewport: {width: 1280, height: 900}});
const sayfaHatalari = [];
pg.on('pageerror', e => sayfaHatalari.push(e.message));
await pg.addInitScript(STUB);
await pg.route('https://portal.test/**', r => r.fulfill({contentType: 'text/html', body: portalHtml}));
await pg.route('https://ismailkaya33.github.io/4.SINIF/**', r => {
  const p = decodeURIComponent(new URL(r.request().url()).pathname.replace(/^\/4\.SINIF\//, ''));
  if (p.endsWith('.html')) return r.fulfill({contentType: 'text/html', body: '<!doctype html><title>deneme</title><p>etkinlik</p>'});
  const f = join(KOK, p);
  if (existsSync(f) && statSync(f).isFile()) return r.fulfill({body: readFileSync(f), contentType: p.endsWith('.json') ? 'application/json' : undefined});
  return r.fulfill({status: 404, body: ''});
});
await pg.route(/^https:\/\/(?!portal\.test|ismailkaya33\.github\.io).*/, r => r.fulfill({status: 204, body: ''}));
await pg.goto('https://portal.test/');
await pg.fill('#kod', 'ABC123'); await pg.click('#giris'); await pg.waitForTimeout(2500);
const takip = await pg.evaluate(() => Object.assign({}, resultTrackByPath));

async function sonucDene(yol) {
  const fr = pg.frames().find(f => yol && decodeURIComponent(f.url()).includes('/4.SINIF/' + yol));
  if (!fr) return 'PORTAL İÇİNDE AÇILMADI';
  await fr.evaluate(m => window.parent.postMessage(m, '*'), SONUC(takip[yol]));
  await pg.waitForTimeout(300);
  return (await pg.evaluate(() => window.__calls.filter(x => x.n === 'etkinlikSonucuKaydet').length)) ? 'tamam' : 'SONUÇ KAYDEDİLMEDİ';
}
const temizle = () => pg.evaluate(() => { window.__calls = []; const d = document.getElementById('oyundanDon'); if (d) d.click(); });
const hatalar = [];
let n = 0;
for (const yol of Object.keys(takip)) {
  await temizle();
  const var_ = await pg.evaluate(y => { const a = [...document.querySelectorAll('#dersIzgarasi a[href]')].find(a => { try { return decodeURIComponent(new URL(a.href).pathname) === '/4.SINIF/' + y; } catch (e) { return false; } }); if (!a) return false; a.click(); return true; }, yol);
  await pg.waitForTimeout(400);
  const d = var_ ? await sonucDene(yol) : 'DERS LİSTESİNDE BAĞLANTI YOK';
  n++; if (d !== 'tamam') hatalar.push('Ders listesi · ' + yol + ': ' + d);
}
const kartSayisi = await pg.evaluate(() => document.querySelectorAll('#anaHaftaSerit .anaBasla').length);
for (let k = 0; k < kartSayisi; k++) {
  await temizle();
  const ad = await pg.evaluate(k => { const b = document.querySelectorAll('#anaHaftaSerit .anaBasla')[k]; b.click(); return b.closest('.anaKart').querySelector('h4').textContent; }, k);
  await pg.waitForTimeout(400);
  const src = await pg.evaluate(() => document.getElementById('oyunCer').getAttribute('src') || '');
  const yol = decodeURIComponent(src).replace(/^.*\/4\.SINIF\//, '').replace(/\?.*$/, '');
  if (!takip[yol]) continue;   // takipsiz etkinlik: sonuç beklenmez
  const d = await sonucDene(yol);
  n++; if (d !== 'tamam') hatalar.push('Bu Haftanın Etkinlikleri · ' + ad + ': ' + d);
}
await tarayici.close();
console.log(`${Object.keys(takip).length} takipli etkinlik, ${kartSayisi} "Bu Hafta" kartı; ${n} açılış denendi.`);
if (sayfaHatalari.length) console.log('Portal sayfasında JavaScript hatası: ' + sayfaHatalari[0]);
if (hatalar.length || sayfaHatalari.length) { console.log('BAŞARISIZ:\n - ' + hatalar.join('\n - ')); process.exit(1); }
console.log('TAMAM: her takipli etkinlik portal içinde açılıyor ve sonucu öğretmene kaydediliyor.');
