#!/usr/bin/env node
// 4/D — Basılı ETKİNLİK SAYFASI üretici (öğretmenin isteği, 2026-11-21: defter notu olan her konu için 2 sayfa,
// A4'ü verimli kullanan, seviyeye uygun punto, gereksiz boşluk yok).
//
// Kullanım:
//   node tools/etkinlik-sayfasi-yap.mjs tools/etkinlik-sayfasi/<ad>.mjs      → tek konu
//   node tools/etkinlik-sayfasi-yap.mjs --hepsi                              → klasördeki bütün konular
//   ek: --html-yalniz (PDF basmaz)  --sessiz
// Çıktı: Baski/<Ders>/etkinlik-sayfalari/<ad>.html + <ad>.pdf (öğrenci, 2 sayfa) + <ad>-cevap.pdf (cevap anahtarı)
// Baski/ klasörü GitHub'a gitmez (.git/info/exclude). Konu dosyası biçimi: tools/etkinlik-sayfasi/OKU-BENI.md
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const KLASOR = path.join(KOK, 'tools', 'etkinlik-sayfasi');
const arg = process.argv.slice(2);
const secenek = { hepsi: arg.includes('--hepsi'), htmlYalniz: arg.includes('--html-yalniz'), sessiz: arg.includes('--sessiz') };
const dosyalar = secenek.hepsi
  ? fs.readdirSync(KLASOR).filter(f => f.endsWith('.mjs')).sort().map(f => path.join(KLASOR, f))
  : arg.filter(a => !a.startsWith('--')).map(a => path.resolve(a));
if (!dosyalar.length) { console.error('Konu dosyası verin ya da --hepsi yazın.'); process.exit(1); }

const DERS_ADI = { Turkce: 'Türkçe', Matematik: 'Matematik', Fen: 'Fen Bilimleri', Sosyal: 'Sosyal Bilgiler', Insanhaklari: 'İnsan Hakları, Yurttaşlık ve Demokrasi', Trafik: 'Trafik Güvenliği' };

// ---------- yardımcılar ----------
const kac = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let ANAHTAR = false;
// Satır içi biçim: [cevap] → boşluk (anahtarda kırmızı cevap), **kalın**, __altı çizili__, {k}...{/k} kutu
function satir(s) {
  let t = kac(s);
  // boşluktan sonra gelen ek ve noktalama boşluğa yapışsın: [su] dan → [su]dan, [x] . → [x].
  t = t.replace(/\] (?=(?:lardır|lerdir|ları|leri|lara|lere|lar|ler|dır|dir|dur|dür|tır|tir|dan|den|tan|ten|nın|nin|yı|yi|yu|yü|ya|ye|ı|i|u|ü|a|e)(?![a-zçğıöşü]))/g, ']').replace(/\] (?=[.,;:!?)])/g, ']');
  t = t.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<u>$1</u>');
  t = t.replace(/\{([^{}]{1,3})\}/g, (_, c) => `<span class="kutucuk${ANAHTAR ? ' a' : ''}">${ANAHTAR ? c : ''}</span>`); // {7} → rakam kutusu
  t = t.replace(/\[([^\]]*)\]/g, (_, c) => {
    const gen = Math.max(14, Math.min(70, c.length * 2.25 + 6));
    return ANAHTAR ? `<span class="bos a" style="min-width:${gen}mm">${c || '—'}</span>` : `<span class="bos" style="width:${gen}mm"></span>`;
  });
  return t;
}
function karistir(dizi, tohum) { // her basımda aynı sıra
  let h = 2166136261; for (const ch of tohum) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  const a = dizi.slice(); const r = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const HARF = 'abcçdefgğhıijklmnoprs';
const cizgiler = (n, ornek) => ANAHTAR && ornek
  ? `<div class="ornek">${satir(ornek)}</div>`
  : Array.from({ length: n }, () => '<div class="cizgi"></div>').join('');

// Alt alta işlem: "4567 + 2389", "803 - 457", "236 x 24"
function islemHesap(ifade) {
  const m = ifade.replace(/\s/g, '').match(/^(\d+)([+\-x×*])(\d+)$/);
  if (!m) throw new Error('İşlem anlaşılamadı: ' + ifade);
  const a = +m[1], b = +m[3], op = m[2] === '+' ? '+' : m[2] === '-' ? '−' : '×';
  return { a, b, op, sonuc: op === '+' ? a + b : op === '−' ? a - b : a * b };
}
function islemKutu(ifade, bosYer) {
  const { a, b, op, sonuc } = islemHesap(ifade);
  const gen = Math.max(String(a).length, String(b).length + 1, String(sonuc).length);
  const sag = s => `<div class="isat">${kac(String(s).padStart(gen, ' ')).replace(/ /g, '&nbsp;')}</div>`;
  const ara = (op === '×' && String(b).length > 1) ? `<div class="isara" style="height:${(String(b).length) * 5.2}mm"></div>` : '';
  const alt = ANAHTAR ? `<div class="isat a">${String(sonuc).padStart(gen, ' ').replace(/ /g, '&nbsp;')}</div>` : `<div class="isat bosat">&nbsp;</div>`;
  return `<div class="islem" style="width:${gen * 3.4 + 7}mm">${sag(a)}<div class="isop">${op}</div>${sag(b)}<div class="ischizgi"></div>${ANAHTAR ? '' : ara}${alt}${bosYer ? '' : ''}</div>`;
}

// Kelime avı: kelimeler sağa, aşağı (ve istenirse çapraz) yerleşir; boşluklar Türkçe harflerle dolar. Her basımda aynı.
function kelimeAvi(kelimeler, n, capraz) {
  const ABC = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
  let h = 7; for (const k of kelimeler.join('')) h = (h * 31 + k.charCodeAt(0)) >>> 0;
  const r = () => ((h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 4294967296);
  const yonler = capraz ? [[0, 1], [1, 0], [1, 1]] : [[0, 1], [1, 0]];
  const uzun = kelimeler.find(k => k.replace(/[^\p{L}]/gu, '').length > n);
  if (uzun) throw new Error(`Kelime avı: “${uzun}” ızgaradan (${n}) uzun; boyut büyütülmeli`);
  for (let deneme = 0; deneme < 200; deneme++) {
    const g = Array.from({ length: n }, () => Array(n).fill('')); const yerler = []; let tamam = true;
    for (const ham of [...kelimeler].sort((a, b) => b.length - a.length)) {
      const k = [...ham.toLocaleUpperCase('tr').replace(/[^A-ZÇĞIİÖŞÜ]/g, '')];
      let kondu = false;
      for (let t = 0; t < 300 && !kondu; t++) {
        const [dr, dc] = yonler[Math.floor(r() * yonler.length)];
        const r0 = Math.floor(r() * (n - dr * (k.length - 1))), c0 = Math.floor(r() * (n - dc * (k.length - 1)));
        if (r0 < 0 || c0 < 0) continue;
        if (k.every((ch, i) => [ '', ch ].includes(g[r0 + dr * i][c0 + dc * i]))) {
          const yer = k.map((ch, i) => { g[r0 + dr * i][c0 + dc * i] = ch; return [r0 + dr * i, c0 + dc * i]; });
          yerler.push(yer); kondu = true;
        }
      }
      if (!kondu) { tamam = false; break; }
    }
    if (tamam) { for (const sat of g) for (let c = 0; c < n; c++) if (!sat[c]) sat[c] = ABC[Math.floor(r() * ABC.length)]; return { izgara: g, yerler }; }
  }
  throw new Error('Kelime avı yerleşmedi: ızgarayı büyütün');
}

// ---------- bloklar ----------
const BLOK = {
  metin: b => `<div class="metinkutu">${(Array.isArray(b.metin) ? b.metin : [b.metin]).map(p => `<p>${satir(p)}</p>`).join('')}</div>`,
  bosluk: b => (b.kutu ? `<div class="kelimeler">${b.kutu.map(k => `<span>${kac(k)}</span>`).join('')}</div>` : '') +
    `<ol class="liste${b.numarasiz ? ' nosuz' : ''}">${b.maddeler.map(m => `<li>${satir(m)}</li>`).join('')}</ol>`,
  dy: b => `<ul class="dy">${b.maddeler.map(([s, d]) => `<li><span class="dyk${ANAHTAR ? ' a' : ''}">${ANAHTAR ? (d ? 'D' : 'Y') : ''}</span>${satir(s)}</li>`).join('')}</ul>`,
  eslestir: b => {
    const sag = karistir([...b.ciftler.map(c => c[1]), ...(b.fazla || [])], JSON.stringify(b.ciftler));
    const harf = x => HARF[sag.indexOf(x)];
    return `<div class="esles"><ol class="liste">${b.ciftler.map(c => `<li><span class="eskut${ANAHTAR ? ' a' : ''}">${ANAHTAR ? harf(c[1]) : ''}</span>${satir(c[0])}</li>`).join('')}</ol>` +
      `<ul class="harfli">${sag.map((s, i) => `<li><b>${HARF[i]})</b> ${satir(s)}</li>`).join('')}</ul></div>`;
  },
  coktan: b => `<ol class="liste coktan">${b.sorular.map(q => `<li>${satir(q.s)}<div class="secenek${q.alt ? ' alt' : ''}">${q.sec.map((o, i) => `<span class="${ANAHTAR && i === q.d ? 'dogru' : ''}"><b>${'ABCD'[i]})</b> ${satir(o)}</span>`).join('')}</div></li>`).join('')}</ol>`,
  tablo: b => `<table class="tablo"${b.ortala ? ' data-o="1"' : ''}${b.satirYuk && !ANAHTAR ? ` data-y="1" style="--y:${b.satirYuk}"` : ''}>${b.basliklar ? `<tr>${b.basliklar.map((h, i) => `<th${b.genislik ? ` style="width:${b.genislik[i]}"` : ''}>${satir(h)}</th>`).join('')}</tr>` : ''}${b.satirlar.map(r => `<tr>${r.map(c => `<td>${String(c).startsWith('?') ? (ANAHTAR ? `<span class="ornek">${satir(c.slice(1))}</span>` : '') : satir(c)}</td>`).join('')}</tr>`).join('')}</table>`,
  yaz: b => `<ol class="liste${b.sorular.length === 1 ? ' nosuz' : ''}">${b.sorular.map(q => `<li>${satir(q.s)}${cizgiler(q.satir ?? 1, q.cevap)}</li>`).join('')}</ol>`,
  islem: b => `<div class="islemler" style="grid-template-columns:repeat(${b.sutun || 4},1fr)">${b.islemler.map((x, i) => `<div class="iskap"><i>${String.fromCharCode(97 + i)})</i>${islemKutu(x)}</div>`).join('')}</div>`,
  problem: b => `<ol class="liste${b.sorular.length === 1 ? ' nosuz' : ''}">${b.sorular.map(q => `<li>${satir(q.s)}<div class="cozum" style="height:${ANAHTAR ? 'auto' : (q.yer || 22) + 'mm'}">${ANAHTAR ? `<div class="ornek">${satir(q.cozum || '')}</div>` : '<span>Çözüm:</span>'}</div><div class="sonuc">Cevap: ${ANAHTAR ? `<span class="bos a">${kac(q.cevap)}</span>` : '<span class="bos" style="width:34mm"></span>'}</div></li>`).join('')}</ol>`,
  siniflandir: b => {
    const tum = b.kelimeler || karistir(b.gruplar.flatMap(g => g.uyeler), JSON.stringify(b.gruplar));
    return `<div class="kelimeler">${tum.map(k => `<span>${kac(k)}</span>`).join('')}</div><div class="gruplar" style="grid-template-columns:repeat(${b.gruplar.length},1fr)">${b.gruplar.map(g => `<div class="grup"><h4>${satir(g.ad)}</h4>${ANAHTAR ? `<div class="ornek">${g.uyeler.map(kac).join(', ')}</div>` : Array.from({ length: g.satir ?? g.uyeler.length }, () => '<div class="cizgi k"></div>').join('')}</div>`).join('')}</div>`;
  },
  kelimeavi: b => {
    const { izgara, yerler } = kelimeAvi(b.kelimeler, b.boyut || 12, b.capraz !== false);
    const isaret = new Set(ANAHTAR ? yerler.flat().map(([r, c]) => r + ',' + c) : []);
    return `<div class="avi"><table class="izgara">${izgara.map((sat, r) => `<tr>${sat.map((h, c) => `<td${isaret.has(r + ',' + c) ? ' class="a"' : ''}>${h}</td>`).join('')}</tr>`).join('')}</table>` +
      `<div class="aranan">${b.kelimeler.map(k => `<span>☐ ${kac(k.toLocaleUpperCase('tr'))}</span>`).join('')}</div></div>`;
  },
  html: b => ANAHTAR && b.anahtarHtml ? b.anahtarHtml : b.html,
};

function blokHtml(b, no) {
  const ic = BLOK[b.tur]; if (!ic) throw new Error('Bilinmeyen blok türü: ' + b.tur);
  const sinif = ['blok', b.genis ? 'genis' : '', b.tur === 'metin' ? 'okuma' : ''].join(' ');
  const bas = b.baslik === false ? '' : `<h3>${b.tur === 'metin' ? '' : `<b class="no">${no}</b>`}${satir(b.baslik || '')}${b.puan ? `<em>${b.puan}</em>` : ''}</h3>`;
  return `<section class="${sinif}"${b.kenar === false ? ' data-k="0"' : ''}>${bas}${b.yonerge ? `<p class="yon">${satir(b.yonerge)}</p>` : ''}${ic(b)}</section>`;
}

const CSS = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; background: #ddd; }
body { font-family: "Segoe UI", "Calibri", Arial, sans-serif; color: #111; font-size: 11pt; line-height: 1.28; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sayfa { width: 210mm; height: 297mm; margin: 0 auto 8px; background: #fff; padding: 7mm 8mm 5mm; display: flex; flex-direction: column; overflow: hidden; }
@media print { body { background: #fff; } .sayfa { margin: 0; break-after: page; } }
.ust { display: flex; align-items: stretch; gap: 3mm; border: 1.4px solid #111; border-radius: 2.5mm; padding: 1.6mm 2.6mm; margin-bottom: 2.2mm; }
.ust .ders { font-size: 8.5pt; text-transform: uppercase; letter-spacing: .4px; color: #444; }
.ust h1 { font-size: 15pt; margin: 0; line-height: 1.1; }
.ust .sol { flex: 1; min-width: 0; }
.ust .kim { font-size: 9.5pt; display: grid; grid-template-columns: auto 44mm; gap: .6mm 1.5mm; align-items: end; }
.ust .kim span { border-bottom: 1px dotted #333; height: 4.6mm; }
.ust .rozet { font-size: 9pt; border-left: 1px solid #999; padding-left: 2.4mm; display: flex; align-items: center; white-space: nowrap; }
.ust.anahtar { border-color: #c00; } .ust.anahtar h1 { color: #c00; }
.icerik { flex: 1; min-height: 0; column-count: 2; column-gap: 4mm; column-fill: balance; }
.alt { font-size: 7.5pt; color: #666; display: flex; justify-content: space-between; border-top: .6px solid #bbb; padding-top: .8mm; margin-top: 1.2mm; }
.blok { break-inside: avoid; border: 1px solid #888; border-radius: 2.2mm; padding: 1.6mm 2.2mm 1.8mm; margin: 0 0 2.2mm; }
.blok[data-k="0"] { border: none; padding: 0; }
.blok.genis { column-span: all; }
.blok h3 { font-size: 11pt; margin: 0 0 .9mm; display: flex; align-items: center; gap: 1.6mm; line-height: 1.2; }
.blok h3 em { margin-left: auto; font-style: normal; font-weight: 400; font-size: 8.5pt; color: #555; }
.no { display: inline-grid; place-items: center; min-width: 5.6mm; height: 5.6mm; border-radius: 50%; background: #111; color: #fff; font-size: 9pt; flex: none; }
.yon { margin: 0 0 1mm; font-size: 10pt; color: #222; font-style: italic; }
.okuma { background: #f3f3f3; border-color: #bbb; }
.okuma h3 { justify-content: center; }
.metinkutu p { margin: 0 0 1mm; text-indent: 5mm; text-align: justify; }
.metinkutu p:last-child { margin-bottom: 0; }
.liste { margin: 0; padding-left: 5.2mm; }
.liste > li { margin: 0 0 1.1mm; padding-left: .5mm; }
.liste > li:last-child { margin-bottom: 0; }
.liste.nosuz { list-style: none; padding-left: 0; }
.bos { display: inline-block; border-bottom: 1.1px solid #111; height: 4.4mm; vertical-align: -1mm; margin: 0 .6mm; }
.bos.a { border-bottom-color: #c00; color: #c00; font-weight: 700; height: auto; vertical-align: baseline; padding: 0 1mm; text-align: center; }
.kelimeler { display: flex; flex-wrap: wrap; gap: 1.2mm 1.4mm; margin: 0 0 1.4mm; padding: 1.2mm; border: 1px dashed #777; border-radius: 1.6mm; }
.kelimeler span { border: 1px solid #999; border-radius: 1.2mm; padding: 0 1.6mm; font-size: 10pt; background: #f4f4f4; }
.dy { list-style: none; margin: 0; padding: 0; }
.dy li { display: flex; gap: 1.8mm; margin: 0 0 1.1mm; align-items: flex-start; }
.dyk, .eskut { flex: none; width: 6.2mm; height: 6.2mm; border: 1.2px solid #111; border-radius: 1.2mm; display: inline-grid; place-items: center; font-weight: 700; margin-top: -.4mm; }
.dyk.a, .eskut.a { color: #c00; border-color: #c00; }
.esles { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm; }
.esles .liste li { display: flex; gap: 1.4mm; align-items: flex-start; }
.harfli { list-style: none; margin: 0; padding: 0; }
.harfli li { margin: 0 0 1.1mm; }
.coktan > li { margin-bottom: 1.4mm; }
.secenek { display: flex; flex-wrap: wrap; gap: .3mm 4mm; font-size: 10.5pt; }
.secenek.alt { flex-direction: column; }
.secenek .dogru { color: #c00; font-weight: 700; outline: 1.2px solid #c00; border-radius: 1mm; padding: 0 .8mm; }
.tablo { width: 100%; border-collapse: collapse; font-size: 10.5pt; }
.tablo th, .tablo td { border: 1px solid #555; padding: .8mm 1.4mm; text-align: left; vertical-align: middle; }
.tablo th { background: #e6e6e6; font-size: 10pt; }
.tablo[data-o="1"] td, .tablo[data-o="1"] th { text-align: center; }
.tablo .bos { margin: 0; }
.tablo .bos:not(.a) { display: block; width: auto !important; height: 6.2mm; }
.tablo .bos.a { min-width: 0 !important; }
.tablo[data-y] td { height: var(--y); }
.avi { display: flex; flex-wrap: wrap; gap: 1.6mm 3mm; align-items: flex-start; }
.izgara { border-collapse: collapse; font-family: Consolas, "Courier New", monospace; font-weight: 700; font-size: 11.5pt; }
.izgara td { width: 6mm; height: 6mm; text-align: center; border: .6px solid #aaa; padding: 0; }
.izgara td.a { background: #ffd6d6; color: #c00; }
.aranan { display: flex; flex-wrap: wrap; gap: .6mm 3mm; font-size: 9.5pt; font-weight: 600; flex: 1; min-width: 26mm; }
.kutucuk { display: inline-grid; place-items: center; width: 5.4mm; height: 6mm; border: 1.2px solid #111; border-radius: 1mm; vertical-align: -1.4mm; margin: 0 .3mm; font-weight: 700; }
.kutucuk.a { color: #c00; border-color: #c00; }
.cizgi { border-bottom: 1px solid #777; height: 7.2mm; }
.cizgi.k { height: 6.4mm; }
.ornek { color: #c00; font-style: italic; margin: .6mm 0 .4mm; font-size: 10pt; }
.islemler { display: grid; gap: 2mm 2mm; }
.iskap { display: flex; gap: 1mm; align-items: flex-start; }
.iskap i { font-style: normal; font-weight: 700; font-size: 10pt; }
.islem { font-family: Consolas, "Courier New", monospace; font-size: 13pt; position: relative; letter-spacing: 1.2mm; line-height: 1.25; text-align: right; }
.isat { text-align: right; } .isat.a { color: #c00; font-weight: 700; }
.isat.bosat { height: 6.6mm; }
.isop { position: absolute; left: 0; top: 5.6mm; }
.ischizgi { border-top: 1.4px solid #111; margin: .3mm 0; }
.isara { border-bottom: 1px dashed #999; }
.cozum { border: 1px dashed #999; border-radius: 1.4mm; margin: .8mm 0; padding: .4mm 1.2mm; }
.cozum span { font-size: 8pt; color: #888; }
.sonuc { text-align: right; font-size: 10.5pt; }
.gruplar { display: grid; gap: 1.6mm; }
.grup { border: 1px solid #999; border-radius: 1.6mm; padding: .8mm 1.6mm 1.2mm; }
.grup h4 { margin: 0; font-size: 10pt; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: .5mm; }
svg text { font-family: "Segoe UI", Arial, sans-serif; }
.a, .ak { color: #c00; }
.ak-yaln { display: none; } .ANAHTAR .ak-yaln { display: inline; } .ANAHTAR .ogr-yaln { display: none; }
`;

// Taşma ve doluluk denetimi (tarayıcıda çalışır, sonucu <body data-…> içine yazar)
const DENETIM = `<script>
addEventListener('load', () => {
  const sonuc = [], tasma = [];
  document.querySelectorAll('.sayfa').forEach((s, i) => {
    const ic = s.querySelector('.icerik'); const r = ic.getBoundingClientRect();
    if (ic.scrollWidth > ic.clientWidth + 2 || ic.scrollHeight > ic.clientHeight + 2) tasma.push('Sayfa ' + (i + 1) + ' taşıyor');
    let sol = 0, sag = 0; const orta = r.left + r.width / 2; ic.querySelectorAll(':scope > .blok').forEach(b => { const br = b.getBoundingClientRect(); if (br.left >= r.right - 2) { tasma.push('Sayfa ' + (i + 1) + ': blok sayfa dışında'); return; } if (b.getClientRects().length > 1) tasma.push('Sayfa ' + (i + 1) + ': “' + (b.querySelector('h3') || b).textContent.trim().slice(0, 30) + '” iki sütuna bölündü'); const alt = br.bottom - r.top; if (br.left < orta - 5) sol = Math.max(sol, alt); if (br.right > orta + 5) sag = Math.max(sag, alt); });
    const y = v => Math.round(v / r.height * 100); sonuc.push(y(Math.max(sol, sag)) + (Math.abs(sol - sag) > r.height * 0.06 ? '(' + y(Math.min(sol, sag)) + ')' : ''));
  });
  document.body.dataset.doluluk = sonuc.join(',');
  document.body.dataset.tasma = tasma.join(' | ');
  document.body.dataset.hazir = '1';
});
</script>`;

function sayfaHtml(k, sayfa, i, toplam) {
  const ders = DERS_ADI[k.ders] || k.ders;
  const ust = `<header class="ust${ANAHTAR ? ' anahtar' : ''}"><div class="sol"><div class="ders">${kac(ders)} · Etkinlik sayfası ${i + 1}/${toplam}</div><h1>${kac(k.baslik)}${ANAHTAR ? ' — CEVAP ANAHTARI' : ''}</h1></div>` +
    (ANAHTAR ? '' : `<div class="kim"><b>Ad Soyad:</b><span></span><b>No / Tarih:</b><span></span></div>`) + `</header>`;
  return `<div class="sayfa">${ust}<main class="icerik">${sayfa.map(b => blokHtml(b, ++NO)).join('')}</main><footer class="alt"><span>4/D · ${kac(ders)}</span><span>${kac(k.baslik)} · ${i + 1}/${toplam}</span></footer></div>`;
}
let NO = 0;
function belge(k, anahtar) {
  ANAHTAR = anahtar; NO = 0;
  const govde = k.sayfalar.map((s, i) => sayfaHtml(k, s, i, k.sayfalar.length)).join('');
  return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${kac(k.baslik)}${anahtar ? ' — Cevap Anahtarı' : ' — Etkinlik Sayfası'}</title><style>${CSS}${k.css || ''}</style></head><body class="${anahtar ? 'ANAHTAR' : ''}">${govde}${DENETIM}</body></html>`;
}

// ---------- tarayıcı ----------
const TAR = [process.env.SKETCHNOTE_TARAYICI, 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', '/usr/bin/chromium', '/usr/bin/google-chrome']
  .find(p => p && fs.existsSync(p));
const ORTAK = ['--headless', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=5000', ...(process.platform === 'win32' ? [] : ['--no-sandbox'])];
const calistir = (ek, dosya) => execFileSync(TAR, [...ORTAK, ...ek, pathToFileURL(dosya).href], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 });
const ozellik = (dom, ad) => { const m = (dom.match(/<body[^>]*>/) || [''])[0].match(new RegExp(`data-${ad}="([^"]*)"`)); return m ? m[1] : null; };

let hataVar = false;
const ozet = [];
for (const dosya of dosyalar) {
  const ad = path.basename(dosya, '.mjs');
  let k;
  try { k = (await import(pathToFileURL(dosya).href + '?t=' + Date.now())).default; }
  catch (e) { console.error(`✗ ${ad}: konu dosyası okunamadı → ${e.message}`); hataVar = true; continue; }
  // Sayısal denetim: metindeki "a + b = [c]" kalıpları ve problemlerdeki işlem cevapları hesaplanır
  const yanlis = [];
  const sayi = s => Number(String(s).replace(/[\s.]/g, ''));
  const tara = v => {
    if (typeof v === 'string') {
      const duz = v.replace(/\{([^{}]{1,3})\}/g, '$1');
      // yalnız tek işlemli eşitlik: "a op b = c" (öncesinde ve sonrasında başka işlem yoksa)
      for (const m of duz.matchAll(/(?<![\d\]+\-−x×:÷(]\s*\[?)\[?(\d[\d ]*\d|\d)\]?\s*([+\-−x×:÷])\s*\[?(\d[\d ]*\d|\d)\]?\s*=\s*\[?(\d[\d ]*\d|\d)\]?(?!\s*[+\-−x×:÷(\d])/g)) {
        const a = sayi(m[1]), b = sayi(m[3]), c = sayi(m[4]);
        const g = m[2] === '+' ? a + b : '-−'.includes(m[2]) ? a - b : 'x×'.includes(m[2]) ? a * b : a / b;
        if (g !== c) yanlis.push(`${m[0].trim()} (doğrusu ${g})`);
      }
    } else if (Array.isArray(v)) v.forEach(tara); else if (v && typeof v === 'object') Object.values(v).forEach(tara);
  };
  tara(k.sayfalar);
  if (yanlis.length) { console.error(`✗ ${ad}: hesap hatası → ${yanlis.join(' ; ')}`); hataVar = true; }
  const hedefKlasor = path.join(KOK, 'Baski', k.ders, 'etkinlik-sayfalari');
  fs.mkdirSync(hedefKlasor, { recursive: true });
  const htmlYol = path.join(hedefKlasor, ad + '.html');
  const anahtarYol = path.join(hedefKlasor, ad + '-cevap.html');
  try { fs.writeFileSync(htmlYol, belge(k, false)); fs.writeFileSync(anahtarYol, belge(k, true)); }
  catch (e) { console.error(`✗ ${ad}: ${e.message}`); hataVar = true; continue; }
  if (secenek.htmlYalniz || !TAR) { ozet.push(`${ad}: HTML yazıldı`); continue; }
  const dom = calistir(['--dump-dom'], htmlYol);
  const tasma = ozellik(dom, 'tasma'), dol = ozellik(dom, 'doluluk');
  const domA = calistir(['--dump-dom'], anahtarYol);
  const tasmaA = ozellik(domA, 'tasma');
  if (ozellik(dom, 'hazir') !== '1') { console.error(`✗ ${ad}: sayfa ölçülemedi`); hataVar = true; continue; }
  const pdf = htmlYol.replace(/\.html$/, '.pdf'), pdfA = anahtarYol.replace(/\.html$/, '.pdf');
  calistir(['--print-to-pdf=' + pdf, '--no-pdf-header-footer'], htmlYol);
  calistir(['--print-to-pdf=' + pdfA, '--no-pdf-header-footer'], anahtarYol);
  const onizleme = arg.find(a => a.startsWith('--onizleme='));
  if (onizleme) { // iki sayfa yan yana değil alt alta: 794×(1123×n) px
    const yol = path.resolve(onizleme.split('=')[1], ad + (arg.includes('--anahtar') ? '-cevap' : '') + '.png');
    calistir(['--screenshot=' + yol, `--window-size=794,${1131 * k.sayfalar.length}`, '--force-device-scale-factor=1'], arg.includes('--anahtar') ? anahtarYol : htmlYol);
  }
  fs.rmSync(anahtarYol); // anahtarın HTML'i gerekmez; PDF yeter
  const not = tasma ? `  ⚠ TAŞMA: ${tasma}` : '';
  const notA = tasmaA ? `  ⚠ ANAHTAR TAŞMA: ${tasmaA}` : '';
  if (tasma || tasmaA) hataVar = true;
  ozet.push(`${tasma || tasmaA ? '✗' : '✓'} ${ad}  doluluk %${dol.split(',').join(' / %')}${not}${notA}`);
}
if (!secenek.sessiz || hataVar) console.log(ozet.join('\n'));
process.exit(hataVar ? 2 : 0);
