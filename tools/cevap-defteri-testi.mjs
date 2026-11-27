// 4/D — Cevap defteri testi: etkinlik portal içinde açılınca soru soru kayıt, kilit ve "kaldığı yerden devam" çalışıyor mu?
// Senaryo (her etkinlik için): aç → 2 soru cevapla → kapat → aç (2 kilitli mi?) → 1 soru daha → kapat → aç (3 kilitli mi?).
// Ayrıca: aynı soru iki kez kaydedilmeye çalışılıyor mu, soru kimliği protokole uyuyor mu, sayfada JS hatası var mı.
//
// Kullanım (depo klasöründe):
//   node tools/cevap-defteri-testi.mjs --tarif <test-tarifi.mjs> [--kok <etkinlik klasörü>] [--yol Ders/dosya.html]
//   --tarif : her etkinlik için {soruSayisi, baslat(fr), cevapla(fr,n), kilitliSayisi(fr)} veren modül
//   --kok   : etkinlik dosyalarının okunacağı klasör (varsayılan: depo). Orada olmayan dosya depodan okunur.
//   --ekran : (isteğe bağlı) 2. açılışın ekran görüntülerinin kaydedileceği klasör
// Gerçek Google sunucusu ve öğrenci verisi KULLANILMAZ: sunucu sahtedir, cevapları bellekte tutar.
import {readFileSync, existsSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {dirname, join, resolve} from 'node:path';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORTAL_DALI = 'hazirlik/kazanim-takibi-20261101';
const arg = (ad) => { const i = process.argv.indexOf(ad); return i > 0 ? process.argv[i + 1] : null; };
const tarifYolu = arg('--tarif');
if (!tarifYolu) { console.error('--tarif <test-tarifi.mjs> gerekli'); process.exit(2); }
const etkKok = resolve(arg('--kok') || KOK);
const tekYol = arg('--yol');
const ekranKlasoru = arg('--ekran');   // verilirse 2. açılışın ekran görüntüsü buraya kaydedilir
const tarifler = (await import(pathToFileURL(resolve(tarifYolu)).href)).default;

const git = (...a) => execFileSync('git', a, {cwd: KOK, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20});
try { git('fetch', '-q', 'origin', `${PORTAL_DALI}:refs/remotes/origin/${PORTAL_DALI}`); } catch (e) { /* çevrimdışı */ }
const portalHtml = git('show', `origin/${PORTAL_DALI}:portal/appsscript/OgrenciGiris_Guncel.html`);
let chromium;
try { chromium = createRequire(import.meta.url)('playwright').chromium; }
catch (e) { console.error('Playwright bulunamadı. Kurulum: npm i -g playwright'); process.exit(2); }

// Sahte sunucu: cevapları bellekte tutar; ilk kayıt kilitlidir (gerçek sunucu gibi).
const STUB = `(()=>{window.__calls=[];window.__defter={};const U='12345678-1234-1234-1234-123456789abc';const TOKEN=U+'-'+U;
function yanit(n,a){
 if(n==='ogrenciGirisiYap')return{basarili:true,token:TOKEN,ogrenciAdi:'Deneme'};
 if(n==='oturumBilgisi')return{basarili:true,ogrenciAdi:'Deneme'};
 if(n==='etkinlikSonucuKaydet')return{basarili:true,tekrar:false};
 if(n==='seciliEtkinlikDurumum')return{basarili:true,tamamlananlar:[]};
 if(n==='etkinlikCevaplarim'){const d=window.__defter[a[1]]||{};return{basarili:true,cevaplar:Object.values(d)};}
 if(n==='etkinlikCevabiKaydet'){const v=a[1];const d=window.__defter[v.activityId]=window.__defter[v.activityId]||{};
  if(d[v.questionId])return{basarili:true,kilitli:true,kayit:d[v.questionId]};
  d[v.questionId]={questionId:v.questionId,correct:v.correct,firstTry:v.firstTry,answer:v.answer||''};return{basarili:true,kilitli:false,kayit:d[v.questionId]};}
 return{basarili:true};}
function run(){let ok=null;const p=new Proxy({},{get(_,n){if(n==='withSuccessHandler')return f=>{ok=f;return p};if(n==='withFailureHandler'||n==='withUserObject')return()=>p;
 return(...a)=>{const c=JSON.parse(JSON.stringify(a));window.__calls.push({n,a:c});const r=yanit(n,c);setTimeout(()=>ok&&ok(r),5)}}});return p}
window.google={script:{run:new Proxy({},{get(_,n){return run()[n]}})}};})();`;

function dosyaOku(p) {
  for (const k of [etkKok, KOK]) { const f = join(k, p); if (existsSync(f) && statSync(f).isFile()) return readFileSync(f); }
  return null;
}

const tarayici = await chromium.launch(process.platform === 'win32' ? {channel: 'msedge'} : {});
const pg = await tarayici.newPage({viewport: {width: 1280, height: 900}});
const hatalar = [];
pg.on('pageerror', e => hatalar.push('portal: ' + e.message));
await pg.addInitScript(STUB);
await pg.route('https://portal.test/**', r => r.fulfill({contentType: 'text/html', body: portalHtml}));
await pg.route('https://ismailkaya33.github.io/4.SINIF/**', r => {
  const p = decodeURIComponent(new URL(r.request().url()).pathname.replace(/^\/4\.SINIF\//, ''));
  const b = dosyaOku(p);
  if (!b) return r.fulfill({status: 404, body: ''});
  const tip = p.endsWith('.html') ? 'text/html; charset=utf-8' : p.endsWith('.json') ? 'application/json' : p.endsWith('.js') ? 'text/javascript' : undefined;
  return r.fulfill({body: b, contentType: tip});
});
await pg.route(/^https:\/\/(?!portal\.test|ismailkaya33\.github\.io).*/, r => r.fulfill({status: 204, body: ''}));
await pg.goto('https://portal.test/');
await pg.fill('#kod', 'ABC123'); await pg.click('#giris'); await pg.waitForTimeout(2500);
const takip = await pg.evaluate(() => Object.assign({}, resultTrackByPath));

const bekle = ms => pg.waitForTimeout(ms);
async function ac(yol) {
  await pg.evaluate(() => { const d = document.getElementById('oyundanDon'); if (d && d.offsetParent !== null) d.click(); });
  await bekle(300);
  const ok = await pg.evaluate(y => { const a = [...document.querySelectorAll('#dersIzgarasi a[href]')].find(a => { try { return decodeURIComponent(new URL(a.href).pathname) === '/4.SINIF/' + y; } catch (e) { return false; } }); if (!a) return false; a.click(); return true; }, yol);
  if (!ok) throw Error('ders listesinde bağlantı yok');
  for (let i = 0; i < 40; i++) {
    const fr = pg.frames().find(f => decodeURIComponent(f.url()).includes('/4.SINIF/' + yol));
    if (fr) { await fr.waitForLoadState('load'); await bekle(1200); return fr; }   // 4d:ready → saved-answers için zaman
    await bekle(250);
  }
  throw Error('portal içinde açılmadı');
}
const kayitlar = id => pg.evaluate(id => Object.keys(window.__defter[id] || {}), id);
const kayitCagrilari = id => pg.evaluate(id => window.__calls.filter(c => c.n === 'etkinlikCevabiKaydet' && c.a[1].activityId === id).map(c => c.a[1].questionId), id);

const sonuc = [];
for (const [yol, t] of Object.entries(tarifler)) {
  if (tekYol && yol !== tekYol) continue;
  const id = takip[yol], adim = [];
  const satir = {yol, durum: 'TAMAM', ayrinti: adim};
  sonuc.push(satir);
  const kotu = m => { satir.durum = 'BAŞARISIZ'; adim.push('✗ ' + m); };
  if (!id) { kotu('portal takip listesinde yok (önce takibe alınmalı)'); continue; }
  const frHata = [];
  const dinle = e => frHata.push(e.message);
  pg.on('pageerror', dinle);
  try {
    let fr = await ac(yol);
    await t.baslat(fr);
    const n1 = await t.cevapla(fr, 2); await bekle(800);
    const k1 = await kayitlar(id);
    adim.push(`1. açılış: ${n1} soru cevaplandı → sunucuda ${k1.length} kayıt [${k1.join(', ')}]`);
    if (k1.length !== 2) kotu(`2 kayıt bekleniyordu, ${k1.length} var`);
    const kotuKimlik = k1.filter(q => !/^[A-Za-z0-9_.:-]{1,60}$/.test(q));
    if (kotuKimlik.length) kotu('kimlik deseni bozuk: ' + kotuKimlik.join(','));

    fr = await ac(yol);
    await t.baslat(fr);
    const kl1 = await t.kilitliSayisi(fr);
    if (ekranKlasoru) await pg.screenshot({path: join(ekranKlasoru, yol.replace(/[\/\\]/g, '_') + '-2acilis.png')});
    adim.push(`2. açılış: ekranda ${kl1} kilitli soru`);
    if (kl1 < k1.length) kotu(`kayıtlı ${k1.length} soru kilitli görünmüyor (${kl1})`);
    const n2 = await t.cevapla(fr, 1); await bekle(800);
    const k2 = await kayitlar(id);
    const yeni = k2.filter(q => !k1.includes(q));
    adim.push(`   ${n2} soru daha → sunucuda ${k2.length} kayıt (yeni: ${yeni.join(', ') || '-'})`);
    if (k2.length !== k1.length + 1 || yeni.length !== 1) kotu('kalan sorudan 1 yeni kayıt bekleniyordu');

    fr = await ac(yol);
    await t.baslat(fr);
    const kl2 = await t.kilitliSayisi(fr);
    adim.push(`3. açılış: ekranda ${kl2} kilitli soru`);
    if (kl2 < k2.length) kotu(`kayıtlı ${k2.length} soru kilitli görünmüyor (${kl2})`);

    const hazir = await pg.evaluate(id => window.__calls.filter(c => c.n === 'etkinlikCevaplarim' && c.a[1] === id).length, id);
    if (hazir < 3) kotu(`etkinlik açılışta kayıtlı cevapları istemiyor (4d:ready ${hazir}/3)`);
    const cagri = await kayitCagrilari(id);
    const tekrar = cagri.filter((q, i) => cagri.indexOf(q) !== i);
    if (tekrar.length) kotu('kayıtlı soru yeniden gönderildi: ' + [...new Set(tekrar)].join(','));
    if (t.soruSayisi) adim.push(`soru sayısı (tarif): ${t.soruSayisi}`);
  } catch (e) { kotu('test hatası: ' + e.message.split('\n')[0]); }
  pg.off('pageerror', dinle);
  if (frHata.length) kotu('JavaScript hatası: ' + frHata[0]);
}

// Kodsuz (portal dışı) açılış: hata vermeden başlıyor ve cevaplanabiliyor mu?
for (const [yol, t] of Object.entries(tarifler)) {
  if (tekYol && yol !== tekYol) continue;
  const satir = sonuc.find(s => s.yol === yol);
  const p2 = await tarayici.newPage({viewport: {width: 1280, height: 900}});
  const h = []; p2.on('pageerror', e => h.push(e.message));
  await p2.route('https://ismailkaya33.github.io/4.SINIF/**', r => { const p = decodeURIComponent(new URL(r.request().url()).pathname.replace(/^\/4\.SINIF\//, '')); const b = dosyaOku(p); return b ? r.fulfill({body: b, contentType: p.endsWith('.html') ? 'text/html; charset=utf-8' : undefined}) : r.fulfill({status: 404, body: ''}); });
  await p2.route(/^https:\/\/(?!ismailkaya33\.github\.io).*/, r => r.fulfill({status: 204, body: ''}));
  try {
    await p2.goto('https://ismailkaya33.github.io/4.SINIF/' + encodeURI(yol)); await p2.waitForTimeout(800);
    const fr = p2.mainFrame(); await t.baslat(fr); const n = await t.cevapla(fr, 1); const kl = await t.kilitliSayisi(fr);
    satir.ayrinti.push(`kodsuz açılış: ${n} soru cevaplandı, ${kl} kilitli/tamamlandı görünüyor`);
  } catch (e) { satir.durum = 'BAŞARISIZ'; satir.ayrinti.push('✗ kodsuz açılış: ' + e.message.split('\n')[0]); }
  if (h.length) { satir.durum = 'BAŞARISIZ'; satir.ayrinti.push('✗ kodsuz açılışta JavaScript hatası: ' + h[0]); }
  await p2.close();
}
await tarayici.close();

for (const s of sonuc) { console.log(`${s.durum === 'TAMAM' ? '✓' : '✗'} ${s.yol}  ${s.durum}`); for (const a of s.ayrinti) console.log('    ' + a); }
if (hatalar.length) console.log('Portal sayfasında JavaScript hatası: ' + hatalar[0]);
const kotuSay = sonuc.filter(s => s.durum !== 'TAMAM').length;
console.log(`\n${sonuc.length} etkinlik denendi, ${kotuSay} başarısız.`);
process.exit(kotuSay || hatalar.length ? 1 : 0);
