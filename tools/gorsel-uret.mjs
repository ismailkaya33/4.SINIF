#!/usr/bin/env node
// 4/D — Yapay zekâ ile görsel üretimi (boyama sayfası, poster, resimli defter notu).
//
// Kullanım:
//   node tools/gorsel-uret.mjs --istem istem.txt --cikti Baski/Sosyal/oyunlar-boyama.png [seçenekler]
// Seçenekler:
//   --saglayici gemini|openai   (varsayılan: gemini)
//   --model <ad>                (varsayılan: gemini → GEMINI_GORSEL_MODEL ya da gemini-3-pro-image,
//                                            openai → OPENAI_GORSEL_MODEL ya da gpt-image-1)
//   --oran 2:3                  en-boy oranı (A4 dikey için 2:3; yatay için 3:2)
//   --boyut 2K                  yalnız Gemini: 1K / 2K / 4K
//   --ornek resim.png           örnek/düzeltilecek resim (birden çok kez verilebilir)
//   --pdf                       ayrıca aynı adla A4 PDF basar (Edge ile)
//   --adtarih                   PDF'in üstüne "Ad / Tarih" şeridi ekler
//   --modeller                  bu anahtarla kullanılabilen görsel modellerini listeler
//
// Anahtar: Windows ortam değişkeni GEMINI_API_KEY (ya da OPENAI_API_KEY). Anahtar depoya YAZILMAZ,
// ekrana basılmaz. Uygulama yeniden başlatılmadıysa kullanıcı kaydından (HKCU\Environment) okunur.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

function arg(ad, coklu = false) {
  const v = [];
  for (let i = 2; i < process.argv.length; i++) if (process.argv[i] === '--' + ad) v.push(process.argv[i + 1]);
  return coklu ? v : v[0];
}
const bayrak = ad => process.argv.includes('--' + ad);
const dur = m => { console.error('HATA: ' + m); process.exit(1); };

// Türkçe klavyede "I" yerine "İ" yazılabildiği için iki yazım da denenir (GEMINI_API_KEY / GEMİNİ_API_KEY).
function anahtar(ad) {
  const adlar = [...new Set([ad, ad.replace(/I/g, 'İ')])];
  for (const a of adlar) if (process.env[a]) return process.env[a].trim();
  if (process.platform === 'win32') {
    // reg.exe çıktısı OEM kod sayfasında gelir ("İ" bozulur); PowerShell ile kullanıcı değişkeni okunur.
    // Komutta Türkçe harf geçmesin diye ad içindeki ASCII dışı harfler "I" sayılarak karşılaştırılır.
    try {
      const v = execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command',
        `$e=[Environment]::GetEnvironmentVariables('User'); foreach($k in $e.Keys){ if(($k -creplace '[^\\x00-\\x7F]','I') -ceq '${ad}'){ $e[$k]; break } }`],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (v) return v;
    } catch { /* yok */ }
  }
  return null;
}

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const mimeOf = f => MIME[path.extname(f).toLowerCase()] || dur('Desteklenmeyen resim türü: ' + f);

// ---------------- Gemini ----------------
async function gemini({ istem, model, oran, boyut, ornekler }) {
  const key = anahtar('GEMINI_API_KEY') || dur('GEMINI_API_KEY bulunamadı (kurulum: CLAUDE.md → "Görsel üretimi").');
  const parts = ornekler.map(f => ({ inlineData: { mimeType: mimeOf(f), data: fs.readFileSync(f).toString('base64') } }));
  parts.push({ text: istem });
  const imageConfig = { aspectRatio: oran };
  if (boyut) imageConfig.imageSize = boyut;
  const govde = { contents: [{ role: 'user', parts }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig } };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  let r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(govde) });
  if (r.status === 400 && boyut) {           // bazı modeller imageSize desteklemez → bir kez onsuz dene
    delete imageConfig.imageSize;
    r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(govde) });
  }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = j.error?.message || r.statusText;
    if (r.status === 404) dur(`Model bulunamadı: ${model}. Kullanılabilenler için: node tools/gorsel-uret.mjs --modeller\n${msg}`);
    if (r.status === 429 && /free_tier[^\n]*limit: 0/.test(msg))
      dur(`Bu model (${model}) ücretsiz katmanda kapalı: anahtarın projesine faturalandırma eklenmeli (aistudio.google.com → API anahtarları → "Faturalandırmayı ayarla"). Bu arada Chrome'daki Gemini yolu kullanılabilir.`);
    if (r.status === 429) dur('Kota/limit doldu ya da bu model ücretsiz katmanda yok (faturalandırma gerekebilir).\n' + msg);
    if (r.status === 401 || r.status === 403) dur('Anahtar geçersiz ya da yetkisiz.\n' + msg);
    dur(`Gemini ${r.status}: ${msg}`);
  }
  const cand = j.candidates?.[0];
  const res = (cand?.content?.parts || []).filter(p => p.inlineData?.data && !p.thought);
  const metin = (cand?.content?.parts || []).filter(p => p.text && !p.thought).map(p => p.text).join('\n').trim();
  if (!res.length) dur('Resim gelmedi. ' + (cand?.finishReason ? 'Sebep: ' + cand.finishReason + '. ' : '') + (metin || JSON.stringify(j.promptFeedback || {})));
  const son = res[res.length - 1].inlineData;
  return { veri: Buffer.from(son.data, 'base64'), mime: son.mimeType, metin };
}

async function geminiModeller() {
  const key = anahtar('GEMINI_API_KEY') || dur('GEMINI_API_KEY bulunamadı.');
  const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000', { headers: { 'x-goog-api-key': key } });
  const j = await r.json();
  if (!r.ok) dur(j.error?.message || r.statusText);
  const liste = (j.models || []).filter(m => /image|imagen/i.test(m.name));
  liste.forEach(m => console.log(m.name.replace('models/', '').padEnd(42), m.displayName || ''));
  if (!liste.length) console.log('Adında "image" geçen model yok.');
}

// ---------------- OpenAI (yedek) ----------------
async function openai({ istem, model, oran, ornekler }) {
  const key = anahtar('OPENAI_API_KEY') || dur('OPENAI_API_KEY bulunamadı.');
  const size = oran === '1:1' ? '1024x1024' : (oran.split(':').map(Number).reduce((a, b) => a / b) > 1 ? '1536x1024' : '1024x1536');
  let r;
  if (ornekler.length) {
    const fd = new FormData();
    fd.append('model', model); fd.append('prompt', istem); fd.append('size', size);
    ornekler.forEach(f => fd.append('image[]', new Blob([fs.readFileSync(f)], { type: mimeOf(f) }), path.basename(f)));
    r = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { authorization: 'Bearer ' + key }, body: fd });
  } else {
    r = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST', headers: { authorization: 'Bearer ' + key, 'content-type': 'application/json' },
      body: JSON.stringify({ model, prompt: istem, size, n: 1 })
    });
  }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) dur(`OpenAI ${r.status}: ${j.error?.message || r.statusText}`);
  const b64 = j.data?.[0]?.b64_json || dur('Resim gelmedi.');
  return { veri: Buffer.from(b64, 'base64'), mime: 'image/png', metin: '' };
}

// ---------------- A4 PDF ----------------
function edgeYolu() {
  const adaylar = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'];
  return adaylar.find(fs.existsSync) || dur('Edge bulunamadı; PDF basılamadı.');
}
export function a4Pdf(resim, pdf, adTarih) {
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><style>
@page{size:A4 portrait;margin:7mm}html,body{margin:0}
.s{width:196mm;height:283mm;display:flex;flex-direction:column;align-items:center;font-family:'Segoe UI',Arial,sans-serif}
.at{width:100%;display:flex;gap:10mm;font-size:10pt;margin-bottom:2mm}.at span{flex:1;border-bottom:1px dotted #000;padding-bottom:1mm}
.r{flex:1;min-height:0;width:100%;display:flex;justify-content:center}.r img{max-width:100%;max-height:100%;object-fit:contain}
</style></head><body><div class="s">${adTarih ? '<div class="at"><span>Ad Soyad:</span><span style="flex:.5">Tarih:</span></div>' : ''}
<div class="r"><img src="${pathToFileURL(path.resolve(resim)).href}"></div></div></body></html>`;
  const gecici = path.resolve(pdf).replace(/\.pdf$/i, '') + '.tmp.html';
  fs.writeFileSync(gecici, html);
  try {
    execFileSync(edgeYolu(), ['--headless', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=' + path.resolve(pdf), pathToFileURL(gecici).href], { stdio: 'ignore' });
  } finally { fs.rmSync(gecici, { force: true }); }
}

// ---------------- Ana akış ----------------
async function ana() {
  const saglayici = (arg('saglayici') || 'gemini').toLowerCase();
  if (bayrak('modeller')) return saglayici === 'gemini' ? geminiModeller() : dur('--modeller yalnız Gemini için.');

  const pdfTek = arg('pdf-yap');                // yalnız var olan resimden PDF: --pdf-yap resim.png
  if (pdfTek) { const p = pdfTek.replace(/\.[a-z]+$/i, '.pdf'); a4Pdf(pdfTek, p, bayrak('adtarih')); return console.log('PDF: ' + p); }

  const istemDosya = arg('istem') || dur('--istem <dosya.txt> gerekli.');
  const istem = fs.readFileSync(istemDosya, 'utf8').trim() || dur('İstem dosyası boş.');
  const cikti = arg('cikti') || dur('--cikti <yol.png> gerekli.');
  const oran = arg('oran') || '2:3';
  const ornekler = arg('ornek', true);
  ornekler.forEach(f => fs.existsSync(f) || dur('Örnek resim yok: ' + f));
  const model = arg('model') || (saglayici === 'openai'
    ? (process.env.OPENAI_GORSEL_MODEL || 'gpt-image-1')
    : (process.env.GEMINI_GORSEL_MODEL || 'gemini-3-pro-image'));

  console.log(`Çiziliyor: ${saglayici} / ${model} / oran ${oran}${ornekler.length ? ' / örnek ' + ornekler.length : ''} …`);
  const t = Date.now();
  const sonuc = saglayici === 'openai'
    ? await openai({ istem, model, oran, ornekler })
    : await gemini({ istem, model, oran, boyut: arg('boyut') || '2K', ornekler });

  let hedef = cikti;
  const uz = sonuc.mime === 'image/jpeg' ? '.jpg' : sonuc.mime === 'image/webp' ? '.webp' : '.png';
  if (path.extname(hedef).toLowerCase() !== uz) hedef = hedef.replace(/\.[a-z]+$/i, '') + uz;
  fs.mkdirSync(path.dirname(path.resolve(hedef)), { recursive: true });
  fs.writeFileSync(hedef, sonuc.veri);
  console.log(`Resim: ${hedef} (${Math.round(sonuc.veri.length / 1024)} KB, ${((Date.now() - t) / 1000).toFixed(0)} sn)`);
  if (sonuc.metin) console.log('Modelin notu: ' + sonuc.metin.slice(0, 400));
  if (bayrak('pdf')) { const p = hedef.replace(/\.[a-z]+$/i, '.pdf'); a4Pdf(hedef, p, bayrak('adtarih')); console.log('PDF: ' + p); }
}

ana().catch(e => dur(e.message));
