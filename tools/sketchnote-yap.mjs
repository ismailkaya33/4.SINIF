// 4/D — Kodla sketchnote: not dosyasını tek parça HTML'e çevirir, Edge ile PNG ve A4 PDF basar.
//
// Kullanım:
//   node tools/sketchnote-yap.mjs tools/sketchnote/notlar/<ad>.js [--html cikti.html] [--png cikti.png] [--pdf cikti.pdf] [--olcek 1.6]
// Örnek:
//   node tools/sketchnote-yap.mjs tools/sketchnote/notlar/fen-besin-icerikleri.js --png Baski/Fen/besin-icerikleri.png --pdf Baski/Fen/besin-icerikleri.pdf
//
// --html  internetsiz açılan tek dosya (yazı tipi ve çizim kütüphanesi gömülü, ~130 KB)
// --png   1240×1754 × ölçek piksel resim (varsayılan ölçek 1.6 → 1984×2806; portal/defter notu için)
// --pdf   A4 dikey, vektör (baskıda her boyutta keskin)
// Basmadan önce taşma kontrolü yapılır: bir kutunun yazısı kutudan taşarsa hangi kutu olduğu yazılır ve basılmaz.
// Tarayıcı: Windows'ta Edge; başka yerde SKETCHNOTE_TARAYICI ortam değişkeni ya da bilinen Chromium yolları.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KOK = path.join(path.dirname(fileURLToPath(import.meta.url)), 'sketchnote');
const dur = (m) => { console.error('HATA: ' + m); process.exit(1); };
const arg = (ad) => { const i = process.argv.indexOf('--' + ad); return i > 0 ? process.argv[i + 1] : undefined; };

const notYolu = process.argv[2];
if (!notYolu || notYolu.startsWith('--') || !fs.existsSync(notYolu)) dur('Not dosyası verilmedi ya da bulunamadı. Örnek: node tools/sketchnote-yap.mjs tools/sketchnote/notlar/fen-besin-icerikleri.js --pdf cikti.pdf');
const [htmlCikti, pngCikti, pdfCikti] = [arg('html'), arg('png'), arg('pdf')];
const olcek = Number(arg('olcek') || 1.6);
if (!htmlCikti && !pngCikti && !pdfCikti) dur('En az biri gerekli: --html, --png ya da --pdf');

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
].join('\n');
const html = oku('sayfa.html')
  .replace('/*FONTLAR*/', () => fontlar)
  .replace('/*ROUGH*/', () => '/* rough.js 4.6.6 — MIT, (c) Preet Shihn */\n' + oku('rough.js'))
  .replace('/*SKETCHNOTE*/', () => oku('sketchnote.js'))
  .replace('/*NOT*/', () => fs.readFileSync(notYolu, 'utf8'));
const hedefHtml = htmlCikti || path.join(os.tmpdir(), 'sketchnote-' + path.basename(notYolu, '.js') + '.html');
fs.mkdirSync(path.dirname(path.resolve(hedefHtml)), { recursive: true });
fs.writeFileSync(hedefHtml, html);
if (htmlCikti) console.log('HTML:', htmlCikti, `(${Math.round(html.length / 1024)} KB)`);
if (!pngCikti && !pdfCikti) process.exit(0);

// 2) Tarayıcı
function tarayici() {
  const adaylar = [process.env.SKETCHNOTE_TARAYICI,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', '/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/microsoft-edge'];
  return adaylar.find(p => p && fs.existsSync(p)) || dur('Edge/Chromium bulunamadı (SKETCHNOTE_TARAYICI ile yol verilebilir).');
}
const TAR = tarayici();
const url = pathToFileURL(path.resolve(hedefHtml)).href;
const ortak = ['--headless', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=10000', ...(process.platform === 'win32' ? [] : ['--no-sandbox'])];
const calistir = (ek) => execFileSync(TAR, [...ortak, ...ek, url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 });

// 3) Kontrol: çizim bitti mi, taşma var mı?
const dom = calistir(['--dump-dom']);
if (!/data-hazir="1"/.test(dom)) dur('Sayfa çizilemedi (not dosyasında yazım hatası olabilir). HTML\'i tarayıcıda açıp F12 ile bakın: ' + hedefHtml);
const tasma = dom.match(/data-tasma="([^"]*)"/);
if (tasma) dur('Yazı kutudan taşıyor: ' + tasma[1] + ' → metni kısaltın ya da kutu sayısını azaltın. Basılmadı.');

// 4) Bas
for (const c of [pngCikti, pdfCikti]) if (c) fs.mkdirSync(path.dirname(path.resolve(c)), { recursive: true });
if (pngCikti) {
  calistir(['--screenshot=' + path.resolve(pngCikti), '--window-size=1240,1754', '--force-device-scale-factor=' + olcek]);
  console.log('PNG:', pngCikti, `(${Math.round(1240 * olcek)}×${Math.round(1754 * olcek)})`);
}
if (pdfCikti) {
  calistir(['--print-to-pdf=' + path.resolve(pdfCikti), '--no-pdf-header-footer']);
  console.log('PDF:', pdfCikti, '(A4)');
}
if (!htmlCikti) fs.rmSync(hedefHtml, { force: true });
