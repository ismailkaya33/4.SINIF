// 4/D — Kodla sketchnote: not dosyasını tek parça HTML'e çevirir, Edge ile PNG ve A4 PDF basar.
//
// Kullanım:
//   node tools/sketchnote-yap.mjs tools/sketchnote/notlar/<ad>.js [--html cikti.html] [--png cikti.png] [--pdf cikti.pdf]
//        [--kes kes.pdf] [--kes-png kes.png] [--renkli] [--olcek 1.6]
//   node tools/sketchnote-yap.mjs <not>.js --istemler     (ChatGPT ile çizilecek görsellerin istemlerini listeler)
//   node tools/sketchnote-yap.mjs <not>.js --kontrol      (hiçbir şey basmaz; yalnız denetler: sayfa sayısı, taşma, uyarılar)
// Örnek:
//   node tools/sketchnote-yap.mjs tools/sketchnote/notlar/fen-besin-icerikleri.js --png Baski/Fen/besin-icerikleri.png --pdf Baski/Fen/besin-icerikleri.pdf
//
// --html  internetsiz açılan tek dosya (yazı tipi ve çizim kütüphanesi gömülü, ~130 KB)
// --png   1240×1754 × ölçek piksel resim (varsayılan ölçek 1.6 → 1984×2806; çok sayfalı notta ad-1.png, ad-2.png …)
// --pdf   A4 dikey, vektör (baskıda her boyutta keskin)
// --kes   (yalnız defter notu) kes-yapıştır sayfası PDF: 8 görsel hücresi (2 görselli notta 4 öğrenci), 8,5 × 6 cm
// --kes-png  aynı sayfanın resmi (kontrol için)   --renkli  kes-yapıştır sayfası renkli (varsayılan siyah-beyaz boyama)
// --imza  (test için) sayfalardaki yazıların dökümünü JSON olarak yazar; tools/sketchnote/test/calistir.mjs kullanır
// Basmadan önce denetim yapılır. Üç tür ileti vardır:
//   HATA   → basılmaz (yazı sayfaya/kutuya sığmıyor, blok adı yanlış, görsel tanımsız, not dosyası bozuk …)
//   Uyarı  → basılır ama bakılmalı (resim henüz yok, görsel içi yazı kenara taşıyor, not 3 sayfayı aşıyor …)
// Resim yolları (resim: 'Baski/…') önce çalışılan klasöre, yoksa depo köküne göre aranır.
// Tarayıcı: Windows'ta Edge; başka yerde SKETCHNOTE_TARAYICI ortam değişkeni ya da bilinen Chromium yolları.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KOK = path.join(path.dirname(fileURLToPath(import.meta.url)), 'sketchnote');
const DEPO = path.join(KOK, '..', '..');
let geciciHtml = null;
const temizle = () => { if (geciciHtml) { try { fs.rmSync(geciciHtml, { force: true }); } catch { /* önemli değil */ } geciciHtml = null; } };
const dur = (m) => { temizle(); console.error('HATA: ' + m); process.exit(1); };

// ---- Komut satırı ----
const DEGERLI = ['html', 'png', 'pdf', 'kes', 'kes-png', 'olcek', 'imza'];
const BAYRAK = ['renkli', 'istemler', 'kontrol'];
const secenek = {};
const notYolu = process.argv[2];
if (!notYolu || notYolu.startsWith('--') || !fs.existsSync(notYolu)) dur('Not dosyası verilmedi ya da bulunamadı. Örnek: node tools/sketchnote-yap.mjs tools/sketchnote/notlar/fen-besin-icerikleri.js --pdf cikti.pdf');
for (let i = 3; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) dur(`Anlaşılmayan değer: "${a}" (dosya adında boşluk varsa tırnak içine alın)`);
  const ad = a.slice(2);
  if (BAYRAK.includes(ad)) { secenek[ad] = true; continue; }
  if (!DEGERLI.includes(ad)) dur(`Bilinmeyen seçenek: ${a} — geçerli olanlar: ${[...DEGERLI, ...BAYRAK].map(x => '--' + x).join(', ')}`);
  const d = process.argv[++i];
  if (d === undefined || d.startsWith('--')) dur(`${a} seçeneğinden sonra bir dosya adı/değer gerekli.`);
  secenek[ad] = d;
}
const { html: htmlCikti, png: pngCikti, pdf: pdfCikti, kes: kesCikti, 'kes-png': kesPng, imza: imzaCikti } = secenek;
const kesMod = secenek.renkli ? 'kes-renkli' : 'kes';
const olcek = Number(secenek.olcek || 1.6);
if (!(olcek >= 0.5 && olcek <= 4)) dur('--olcek 0.5 ile 4 arasında bir sayı olmalı (varsayılan 1.6).');
for (const [ad, yol, uzanti] of [['--png', pngCikti, '.png'], ['--kes-png', kesPng, '.png'], ['--pdf', pdfCikti, '.pdf'], ['--kes', kesCikti, '.pdf'], ['--html', htmlCikti, '.html']])
  if (yol && path.extname(yol).toLowerCase() !== uzanti) dur(`${ad} dosya adı ${uzanti} ile bitmeli: ${yol}`);

// Not dosyasını tarayıcısız okur (resim yolları ve ChatGPT istemleri için). Tarayıcıya özgü her şey (Sketchnote.R.kirmizi,
// Sketchnote.dikey(...), Sketchnote.ciz(S => …)) burada zararsız bir sahte nesneyle karşılanır; yalnız veriyi yakalarız.
const NOT_METNI = fs.readFileSync(notYolu, 'utf8');
function notVerisi() {
  let v = null, tur = null;
  const sahte = () => new Proxy(function () {}, { get: (_, k) => (k === Symbol.toPrimitive ? () => '' : sahte()), apply: () => sahte() });
  const Sketchnote = new Proxy({
    defterNotu: (x) => { v = x; tur = 'defter'; }, kavramHaritasi: (x) => { v = x; tur = 'harita'; }, ciz: () => { tur = tur || 'serbest'; },
    SARI: '', MAVI: '', MUREKKEP: '',
  }, { get: (o, k) => (k in o ? o[k] : sahte()) });
  try { vm.runInNewContext(NOT_METNI, { Sketchnote, console: { log() {}, error() {} } }, { filename: path.basename(notYolu) }); }
  catch (e) {
    const satir = /:(\d+)(?::\d+)?\)?\s*$/m.exec(String(e.stack || '').split('\n').find(s => s.includes(path.basename(notYolu))) || '');
    dur(`Not dosyası okunamadı (${path.basename(notYolu)}${satir ? ', satır ' + satir[1] : ''}): ${e.message}`);
  }
  if (!tur) dur('Not dosyasında Sketchnote.defterNotu(…), Sketchnote.kavramHaritasi(…) ya da Sketchnote.ciz(…) çağrısı yok.');
  return { veri: v || {}, tur };
}
const { veri: VERI, tur: NOT_TURU } = notVerisi();
const GORSELLER = Array.isArray(VERI.gorseller) ? VERI.gorseller.filter(g => g && typeof g === 'object') : [];

// Resim dosyasını bulur: önce çalışılan klasöre, sonra depo köküne göre.
function resimBul(r) {
  if (typeof r !== 'string' || !r) return null;
  for (const aday of [r, path.join(DEPO, r)]) if (fs.existsSync(aday) && fs.statSync(aday).isFile()) return aday;
  return null;
}
// Dosyanın gerçekten resim olup olmadığına ilk baytlarından bakar (indirilen dosya bazen HTML ya da başka türde olur).
function resimTuru(dosya) {
  const b = Buffer.alloc(12); const fd = fs.openSync(dosya, 'r'); fs.readSync(fd, b, 0, 12, 0); fs.closeSync(fd);
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg';
  if (b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}

if (secenek.istemler) {
  const liste = GORSELLER.map((g, i) => ({ no: i + 1, ...g })).filter(g => g.resim);
  if (!liste.length) { console.log('Bu notta ChatGPT ile çizilecek görsel yok.'); process.exit(0); }
  for (const g of liste) console.log(`\n=== Görsel ${g.no}: ${g.ad}\nDosya: ${g.resim} ${resimBul(g.resim) ? '(VAR)' : '(henüz yok)'}\nİstem:\n${g.istem || '(istem yazılmamış)'}`);
  process.exit(0);
}
if (!htmlCikti && !pngCikti && !pdfCikti && !kesCikti && !kesPng && !secenek.kontrol && !imzaCikti) dur('En az biri gerekli: --html, --png, --pdf, --kes, --kes-png ya da --kontrol');
if ((kesCikti || kesPng) && NOT_TURU !== 'defter') dur('--kes yalnız defter notu (Sketchnote.defterNotu) için kullanılır.');

// 1) Tek parça HTML
const oku = (p) => fs.readFileSync(path.join(KOK, p), 'utf8');
const fontYuzu = (dosya, kalinlik, aralik) =>
  `@font-face{font-family:'Kalam';font-style:normal;font-display:block;font-weight:${kalinlik};` +
  `src:url(data:font/woff2;base64,${fs.readFileSync(path.join(KOK, 'fontlar', dosya)).toString('base64')}) format('woff2');unicode-range:${aralik};}`;
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const LATIN_EK = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF';
const fontlar = [
  fontYuzu('kalam-latin-ext-400-normal.woff2', 400, LATIN_EK), fontYuzu('kalam-latin-400-normal.woff2', 400, LATIN),
  fontYuzu('kalam-latin-ext-700-normal.woff2', 700, LATIN_EK), fontYuzu('kalam-latin-700-normal.woff2', 700, LATIN),
  // Rakamlar Andika'dan (Kalam'ın 1'i I harfine benziyor); sonra tanımlandığı için 0–9'da bu yüz kullanılır
  fontYuzu('andika-latin-400-normal.woff2', 400, 'U+0030-0039'), fontYuzu('andika-latin-700-normal.woff2', 700, 'U+0030-0039'),
].join('\n');
// Resimleri sayfaya gömer (internetsiz açılsın); eksik olanlar yer tutucuyla basılır
const eksikResimler = [], bozukResimler = [];
function resimBetigi() {
  const R = {};
  for (const g of GORSELLER) {
    if (!g.resim || typeof g.resim !== 'string') continue;
    const dosya = resimBul(g.resim);
    if (!dosya) { eksikResimler.push(g.resim); console.log('Uyarı: resim henüz yok, yer tutucu basılacak →', g.resim); continue; }
    const tur = resimTuru(dosya);
    if (!tur) { bozukResimler.push(g.resim); console.log('Uyarı: dosya resim değil (PNG/JPG/WebP olmalı), yer tutucu basılacak →', g.resim); continue; }
    R[g.resim] = `data:${tur};base64,${fs.readFileSync(dosya).toString('base64')}`;
  }
  return `Sketchnote.RESIMLER = ${JSON.stringify(R)};\n`;
}
const html = oku('sayfa.html')
  .replace('/*FONTLAR*/', () => fontlar)
  .replace('/*ROUGH*/', () => '/* rough.js 4.6.6 — MIT, (c) Preet Shihn */\n' + oku('rough.js'))
  .replace('/*SKETCHNOTE*/', () => oku('sketchnote.js'))
  .replace('/*DEFTER*/', () => oku('defter.js'))
  .replace('/*NOT*/', () => resimBetigi() + NOT_METNI.replace(/<\/script/gi, '<\\/script'));
if (!htmlCikti) geciciHtml = path.join(os.tmpdir(), `sketchnote-${path.basename(notYolu, '.js')}-${process.pid}.html`);
const hedefHtml = htmlCikti || geciciHtml;
fs.mkdirSync(path.dirname(path.resolve(hedefHtml)), { recursive: true });
fs.writeFileSync(hedefHtml, html);
if (htmlCikti) console.log('HTML:', htmlCikti, `(${Math.round(html.length / 1024)} KB)`);
if (!pngCikti && !pdfCikti && !kesCikti && !kesPng && !secenek.kontrol && !imzaCikti) { temizle(); process.exit(0); }

// 2) Tarayıcı
function tarayici() {
  const adaylar = [process.env.SKETCHNOTE_TARAYICI,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/microsoft-edge',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
  try { // Playwright'ın indirdiği başka sürüm varsa onu da dene
    for (const d of fs.readdirSync('/opt/pw-browsers')) if (/^chromium-\d+$/.test(d)) adaylar.push(`/opt/pw-browsers/${d}/chrome-linux64/chrome`, `/opt/pw-browsers/${d}/chrome-linux/chrome`);
  } catch { /* klasör yok */ }
  return adaylar.find(p => p && fs.existsSync(p)) || dur('Edge/Chromium bulunamadı (SKETCHNOTE_TARAYICI ile yol verilebilir).');
}
const TAR = tarayici();
const url = pathToFileURL(path.resolve(hedefHtml)).href;
const ortak = ['--headless', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=10000', ...(process.platform === 'win32' ? [] : ['--no-sandbox'])];
const calistir = (ek, mod) => {
  try { return execFileSync(TAR, [...ortak, ...ek, mod ? url + '#' + mod : url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 << 20 }); }
  catch (e) { return dur('Tarayıcı çalıştırılamadı: ' + String(e.message).split('\n')[0]); }
};

// 3) Kontrol: çizim bitti mi, hata/taşma/uyarı var mı?  4) Bas
const coz = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const gorulenUyari = new Set();
const imza = {};
function kontrol(mod) {
  const dom = calistir(['--dump-dom'], mod);
  const govde = (dom.match(/<body[^>]*>/) || [''])[0];
  const oz = (ad) => { const m = govde.match(new RegExp(`data-${ad}="([^"]*)"`)); return m ? coz(m[1]) : null; };
  const hata = oz('hata');
  if (hata) dur(`Not çizilirken hata oluştu: ${hata}\n       (not dosyasındaki yazımı kontrol edin: ${notYolu})`);
  if (oz('hazir') !== '1') dur('Sayfa çizilemedi (not dosyasında yazım hatası olabilir). HTML\'i tarayıcıda açıp F12 ile bakın: ' + hedefHtml);
  for (const u of (oz('uyari') || '').split(' | ').filter(Boolean)) if (!gorulenUyari.has(u)) { gorulenUyari.add(u); console.log('Uyarı: ' + u); }
  const tasma = oz('tasma');
  if (tasma) dur('Basılmadı. Düzeltilmesi gerekenler:\n' + tasma.split(' | ').map(t => '  - ' + t).join('\n'));
  const n = Number(oz('kes-sayfa') || oz('sayfa') || 1);
  // Sayfalardaki yazıların dökümü (yer tutucu yazıları hariç) — düzenin değişip değişmediğini sınamak için
  imza[mod && mod.startsWith('kes') ? 'kes' : 'not'] = dom.split(/<div class="sayfa"/).slice(1).map(s =>
    [...s.matchAll(/<text([^>]*)>([\s\S]*?)<\/text>/g)].filter(m => !/data-yt=/.test(m[1])).map(m => coz(m[2].replace(/<[^>]+>/g, ''))));
  return n;
}
const hazirla = (c) => fs.mkdirSync(path.dirname(path.resolve(c)), { recursive: true });
// Çok sayfalıysa her sayfa ayrı resim: ad-1.png, ad-2.png …
const png = (c, mod, n) => {
  hazirla(c);
  for (let i = 1; i <= n; i++) {
    const hedef = n > 1 ? c.replace(/\.png$/i, `-${i}.png`) : c;
    calistir(['--screenshot=' + path.resolve(hedef), '--window-size=1240,1754', '--force-device-scale-factor=' + olcek], n > 1 ? `${mod || 'not'}&s=${i}` : mod);
    if (!fs.existsSync(hedef)) dur('PNG yazılamadı: ' + hedef);
    console.log('PNG:', hedef, `(${Math.round(1240 * olcek)}×${Math.round(1754 * olcek)})`);
  }
};
const pdf = (c, mod, n) => {
  hazirla(c); calistir(['--print-to-pdf=' + path.resolve(c), '--no-pdf-header-footer'], mod);
  if (!fs.existsSync(c)) dur('PDF yazılamadı: ' + c);
  console.log('PDF:', c, `(A4, ${n} sayfa)`);
};
let notSayfa = null, kesSayfa = null;
if (pngCikti || pdfCikti || secenek.kontrol || imzaCikti) {
  notSayfa = kontrol();
  if (pngCikti) png(pngCikti, undefined, notSayfa);
  if (pdfCikti) pdf(pdfCikti, undefined, notSayfa);
}
if (kesCikti || kesPng || ((secenek.kontrol || imzaCikti) && NOT_TURU === 'defter' && GORSELLER.length)) {
  kesSayfa = kontrol(kesMod);
  if (kesPng) png(kesPng, kesMod, kesSayfa);
  if (kesCikti) pdf(kesCikti, kesMod, kesSayfa);
}
if (imzaCikti) { hazirla(imzaCikti); fs.writeFileSync(imzaCikti, JSON.stringify(imza, null, 1) + '\n'); }
if (secenek.kontrol) console.log(`Kontrol tamam: not ${notSayfa} sayfa` + (kesSayfa ? `, kes-yapıştır ${kesSayfa} sayfa (${GORSELLER.length} görsel)` : '') + '.');
if (eksikResimler.length || bozukResimler.length)
  console.log(`DİKKAT: ${eksikResimler.length + bozukResimler.length} resim eksik/bozuk → çıktıda gri "ChatGPT ile çizilecek" kutusu var. Bu hâliyle portala konmamalı, baskıya gitmemeli.`);
temizle();
