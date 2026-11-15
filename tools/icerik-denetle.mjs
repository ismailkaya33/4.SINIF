// 4/D — İçerik denetimi: etkinlik dosyaları, içerik listesi (icerik-katalogu.json), haftalık şerit (bu-hafta.json),
// defter notları ve site içi bağlantılar birbiriyle tutarlı mı? Hiçbir dosyayı değiştirmez, internete çıkmaz.
//
// Kullanım (depo kökünden):
//   node tools/icerik-denetle.mjs            özet + bulgular
//   node tools/icerik-denetle.mjs --tablo    ayrıca her etkinlik için tek satırlık durum tablosu
//   node tools/icerik-denetle.mjs --json     makinenin okuyacağı çıktı
// Çıkış kodu: HATA varsa 1, yoksa 0 (UYARI ve BİLGİ çıkış kodunu değiştirmez).
//
// HATA   = öğrencinin karşısına bozuk şey çıkar (listede olup dosyası olmayan etkinlik, kırık bağlantı, bozuk JSON …)
// UYARI  = kurala aykırı ya da riskli (internet isteyen etkinlik, alert/confirm kullanımı, ASCII olmayan dosya adı …)
// BİLGİ  = bilinmesi iyi olur (portalda/katalog sayfasında bağlantısı olmayan defter notu, çok büyük dosya …)
// Pedagojik doğruluğa (cevap anahtarı, dil düzeyi) BAKMAZ; o iş pedagojik-denetci ajanının ve öğretmenindir.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DERSLER = { Turkce: 'Türkçe', Matematik: 'Matematik', Fen: 'Fen Bilimleri', Sosyal: 'Sosyal Bilgiler', Insanhaklari: 'İnsan Hakları', Trafik: 'Trafik Güvenliği', Oyunlar: 'Oyunlar' };
const KOD_ONEKI = { Turkce: 'T', Matematik: 'M', Fen: 'F', Sosyal: 'SB', Insanhaklari: 'Y', Trafik: 'TG' };
const bulgular = [];
const ekle = (duzey, konu, ileti) => bulgular.push({ duzey, konu, ileti });
const var_ = (p) => fs.existsSync(path.join(KOK, p));
const oku = (p) => fs.readFileSync(path.join(KOK, p), 'utf8');
const jsonOku = (p) => { try { return JSON.parse(oku(p).replace(/^﻿/, '')); } catch (e) { ekle('HATA', p, 'Dosya okunamadı ya da bozuk: ' + e.message); return null; } };
const bugun = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

// ---- 1) Ders klasörlerindeki dosyalar ----
const dosyalar = [];   // { yol, klasor, ad }
const defterler = [];  // 'Fen/DefterNotlari/x.png'
for (const klasor of Object.keys(DERSLER)) {
  if (!var_(klasor)) { ekle('UYARI', klasor, 'Ders klasörü yok.'); continue; }
  for (const d of fs.readdirSync(path.join(KOK, klasor), { withFileTypes: true })) {
    if (d.isFile() && /\.html$/i.test(d.name)) dosyalar.push({ yol: `${klasor}/${d.name}`, klasor, ad: d.name });
    if (d.isDirectory() && d.name === 'DefterNotlari')
      for (const f of fs.readdirSync(path.join(KOK, klasor, d.name))) if (/\.(png|jpe?g|webp)$/i.test(f)) defterler.push(`${klasor}/DefterNotlari/${f}`);
  }
}
if (var_('Oyunlar/DefterNotlari')) ekle('UYARI', 'Oyunlar/DefterNotlari', 'Oyunlar için defter notu klasörü açılmaz (öğretmenin kararı).');

// ---- 2) İçerik listesi ↔ dosyalar ----
const katalog = jsonOku('icerik-katalogu.json');
const kayitlar = (katalog && Array.isArray(katalog.icerikler)) ? katalog.icerikler : [];
const kayit = new Map();
for (const k of kayitlar) {
  if (!k || typeof k.yol !== 'string') { ekle('HATA', 'icerik-katalogu.json', 'Yolu olmayan bir satır var.'); continue; }
  if (kayit.has(k.yol)) ekle('HATA', k.yol, 'İçerik listesinde iki kez yazılmış.');
  kayit.set(k.yol, k);
  const klasor = k.yol.split('/')[0];
  if (!var_(k.yol)) ekle('HATA', k.yol, 'İçerik listesinde var ama dosyası yok → portalda açılmayan (kırık) etkinlik.');
  if (!k.ad || !String(k.ad).trim()) ekle('HATA', k.yol, 'İçerik listesinde adı boş.');
  if (DERSLER[klasor] && k.ders !== DERSLER[klasor]) ekle('UYARI', k.yol, `İçerik listesinde ders "${k.ders}" yazıyor; klasöre göre "${DERSLER[klasor]}" olmalı.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(k.eklenme || ''))) ekle('UYARI', k.yol, `"eklenme" tarihi YYYY-AA-GG biçiminde değil: ${k.eklenme}`);
  else if (k.eklenme > bugun) ekle('UYARI', k.yol, `"eklenme" tarihi gelecekte: ${k.eklenme}`);
  if (typeof k.gizli !== 'boolean') ekle('UYARI', k.yol, '"gizli" alanı true/false değil.');
  if (k.degerlendirme !== undefined && !['konu', 'unite'].includes(k.degerlendirme)) ekle('UYARI', k.yol, `"degerlendirme" yalnız "konu" ya da "unite" olabilir: ${k.degerlendirme}`);
  if (/sinav|degerlendirme/i.test(k.yol) && !k.degerlendirme) ekle('UYARI', k.yol, 'Dosya adı değerlendirme/sınav gibi ama listede "degerlendirme" alanı yok → portalda Değerlendirmeler bölümüne düşmez.');
  if (klasor === 'Oyunlar' && k.degerlendirme) ekle('UYARI', k.yol, 'Oyunlar klasöründe değerlendirme olmaz (öğretmenin kararı).');
  if (/\(?\b(?:T|M|F|SB|Y|TG)\.4(?:\.\d+)+\)?/.test(String(k.ad))) ekle('BİLGİ', k.yol, `Öğrencinin gördüğü adda kazanım kodu geçiyor: "${k.ad}"`);
}
for (const d of dosyalar) if (!kayit.has(d.yol)) ekle('UYARI', d.yol, 'Dosya var ama içerik listesinde yok → portalda görünmez (GitHub\'a gönderilince kendiliğinden eklenir).');

// ---- 3) Her etkinlik dosyası ----
const satirlar = [];
for (const d of dosyalar) {
  const ham = oku(d.yol), boyutKB = Math.round(Buffer.byteLength(ham) / 1024);
  const s = ham.replace(/data:[a-z0-9/+.\-]+;base64,[A-Za-z0-9+/=]+/gi, 'DATA'); // gömülü resimler denetimi şaşırtmasın
  const oyun = d.klasor === 'Oyunlar', k = kayit.get(d.yol);
  if (/[^\x20-\x7E]/.test(d.ad) || /[A-Z ]/.test(d.ad)) ekle('UYARI', d.yol, 'Dosya adı kurala uymuyor (ASCII, küçük harf, boşluksuz olmalı). Adı değiştirmek portaldaki bağlantıları bozar; yeni dosyalarda dikkat edilmeli.');
  if (!/<html[^>]*\blang=["']tr["']/i.test(s)) ekle('UYARI', d.yol, '<html lang="tr"> yok (ekran okuyucu ve Türkçe büyük/küçük harf için gerekli).');
  if (!/<meta[^>]*charset=["']?utf-8/i.test(s)) ekle('UYARI', d.yol, 'UTF-8 karakter kümesi belirtilmemiş (Türkçe harfler bozuk görünebilir).');
  if (!/name=["']viewport["']/i.test(s)) ekle('UYARI', d.yol, 'Telefon/tablet görünümü ayarı (viewport) yok.');
  const baslik = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(s) || [])[1];
  if (!baslik || !baslik.trim()) ekle('UYARI', d.yol, 'Sayfa başlığı (<title>) yok.');
  const dis = [...new Set([...s.matchAll(/(?:src|href)\s*=\s*["'](https?:\/\/[^"']+)/gi), ...s.matchAll(/url\(\s*["']?(https?:\/\/[^"')]+)/gi), ...s.matchAll(/@import\s+["'](https?:\/\/[^"']+)/gi), ...s.matchAll(/\bimport\s[^"'\n]*["'](https?:\/\/[^"']+)/g)]
    .map(m => m[1]).filter(u => !/^https?:\/\/(?:www\.)?w3\.org\//.test(u)).map(u => { try { return new URL(u).host; } catch { return u; } }))];
  const kutuphane = dis.filter(h => /cdn|cloudflare|unpkg|jsdelivr|gstatic|googleapis/.test(h));
  if (kutuphane.length) ekle('UYARI', d.yol, `İnternet olmadan tam çalışmaz: dış kaynak yüklüyor (${kutuphane.join(', ')}). Kural: tek dosya, çevrimdışı.`);
  const pencere = [...s.matchAll(/(^|[^\w.$])(alert|confirm|prompt)\s*\(/g)].map(m => m[2]);
  if (pencere.length) ekle(oyun ? 'BİLGİ' : 'UYARI', d.yol, `${[...new Set(pencere)].join('/')}() penceresi kullanıyor (${pencere.length} yer) → portal penceresinde engellenebilir; sayfa içi ileti kullanılmalı.`);
  const bitis = /4d:activity-finished/.test(s);
  const kimlik = (/activityId\s*:\s*['"]([\w-]+)['"]/.exec(s) || /\bid\s*:\s*['"]([\w-]+)['"],\s*\n?\s*ad\s*:/.exec(s) || /"id"\s*:\s*"([\w-]+)",\s*"ad"/.exec(s) || [])[1] || '';
  if (bitis && !/schemaVersion\s*:\s*1\b/.test(s)) ekle('UYARI', d.yol, 'Sonuç mesajı gönderiyor ama schemaVersion: 1 bulunamadı.');
  if (oyun && bitis) ekle('BİLGİ', d.yol, 'Oyunlar klasöründe sonuç mesajı var (oyunlar takip edilmez).');
  const kodlar = [...new Set((s.replace(/ör\.\s*"(?:T|M|F|SB|Y|TG)\.4(?:\.\d+){2,3}"/g, '').match(/\b(?:T|M|F|SB|Y|TG)\.4(?:\.\d+){2,3}\b/g) || []))].filter(c => !KOD_ONEKI[d.klasor] || c.startsWith(KOD_ONEKI[d.klasor] + '.'));
  if (boyutKB > 3000) ekle('BİLGİ', d.yol, `Dosya çok büyük (${(boyutKB / 1024).toFixed(1)} MB) → telefonda yavaş açılır, kota tüketir.`);
  // dosyanın içindeki site içi bağlantılar
  for (const m of s.matchAll(/(?:href|src)\s*=\s*["']([^"'#?:]+\.(?:html|png|jpe?g|webp|json|js|css|pdf))(?:[?#][^"']*)?["']/gi)) {
    const hedef = path.posix.normalize(path.posix.join(path.posix.dirname(d.yol), m[1]));
    if (!hedef.startsWith('..') && !var_(hedef)) ekle('HATA', d.yol, `Kırık bağlantı: ${m[1]}`);
  }
  satirlar.push({ yol: d.yol, kb: boyutKB, liste: k ? (k.gizli ? 'gizli' : 'var') : 'YOK', sonuc: bitis ? (kimlik || 'var') : '—', cevrimdisi: kutuphane.length ? 'hayır' : 'evet', pencere: pencere.length, kazanim: kodlar.join(' ') });
}

// ---- 4) Haftalık şerit ----
if (var_('bu-hafta.json')) {
  const h = jsonOku('bu-hafta.json');
  if (h) {
    if (!Array.isArray(h.etkinlikler)) ekle('HATA', 'bu-hafta.json', '"etkinlikler" listesi yok.');
    else {
      if (h.etkinlikler.length > 12) ekle('UYARI', 'bu-hafta.json', `En çok 12 etkinlik olmalı (${h.etkinlikler.length} var).`);
      for (const y of h.etkinlikler) {
        if (!var_(y)) ekle('HATA', 'bu-hafta.json', `Listedeki etkinliğin dosyası yok: ${y}`);
        else if (!kayit.has(y)) ekle('UYARI', 'bu-hafta.json', `İçerik listesinde olmayan etkinlik: ${y}`);
        else if (kayit.get(y).gizli) ekle('UYARI', 'bu-hafta.json', `Gizli etkinlik haftalık şeritte: ${y}`);
        if (String(y).startsWith('Oyunlar/')) ekle('UYARI', 'bu-hafta.json', `Oyunlar klasörü haftalık şeride girmez: ${y}`);
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(h.bitis || ''))) ekle('UYARI', 'bu-hafta.json', '"bitis" tarihi YYYY-AA-GG biçiminde değil.');
    else if (h.bitis < bugun) ekle('BİLGİ', 'bu-hafta.json', `"bitis" tarihi geçmiş (${h.bitis}) → şerit portalda gizli; yeni hafta için güncellenmeli.`);
  }
}

// ---- 5) Defter notları ----
const dk = var_('tools/defter-kazanim.json') ? jsonOku('tools/defter-kazanim.json') : null;
if (dk) {
  for (const y of Object.keys(dk.eslesme || {})) if (!var_(y)) ekle('UYARI', 'tools/defter-kazanim.json', `"eslesme"de yazan not dosyası yok: ${y} ("bekleyen"e alınmalı)`);
  for (const y of Object.keys(dk.bekleyen || {})) if (var_(y)) ekle('BİLGİ', 'tools/defter-kazanim.json', `"bekleyen"deki not artık klasörde: ${y} ("eslesme"ye taşınabilir)`);
}
const materyal = var_('materyaller.html') ? oku('materyaller.html') : '';
for (const y of defterler) if (materyal && !materyal.includes(y)) ekle('BİLGİ', y, 'Defter notu sitede duruyor ama katalog sayfasında (materyaller.html) bağlantısı yok. Portal listesi ayrı tutulur (portal dalı); orada da eklenmemiş olabilir.');
for (const y of defterler) { const b = fs.statSync(path.join(KOK, y)).size; if (b > 1500 * 1024) ekle('BİLGİ', y, `Defter notu resmi büyük (${(b / 1048576).toFixed(1)} MB) → telefonda yavaş açılır.`); }
// kodla üretilen notlar: kaynağı var, yayımlanmış resmi var mı?
const notKlasoru = 'tools/sketchnote/notlar';
const ONEK = { mat: 'Matematik', fen: 'Fen', sos: 'Sosyal', tr: 'Turkce', ih: 'Insanhaklari', trf: 'Trafik' };
if (var_(notKlasoru)) for (const f of fs.readdirSync(path.join(KOK, notKlasoru)).filter(f => f.endsWith('.js'))) {
  const ad = f.replace(/\.js$/, ''), ders = ONEK[ad.split('-')[0]];
  if (!ders) { ekle('BİLGİ', `${notKlasoru}/${f}`, 'Dosya adının başı bir dersi göstermiyor (mat-, fen-, sos-, tr-, ih-, trf-).'); continue; }
  const yayin = defterler.filter(y => y.startsWith(`${ders}/DefterNotlari/${ad}`));
  if (!yayin.length) ekle('BİLGİ', `${notKlasoru}/${f}`, `Not kaynağı hazır ama ${ders}/DefterNotlari/ altında resmi yok (henüz yayımlanmamış).`);
}

// ---- 6) Kök sayfalardaki site içi bağlantılar ----
for (const sayfa of ['index.html', 'materyaller.html', 'uygulama.html', 'cevrimdisi.html', 'gizlilik.html', 'veli-onay-formu.html', 'ogrenci/index.html', 'ogretmen/index.html']) {
  if (!var_(sayfa)) continue;
  const s = oku(sayfa);
  for (const m of s.matchAll(/(?:href|src)\s*=\s*["']([^"'#:]+?)(?:[?#][^"']*)?["']/gi)) {
    const ham = m[1].trim(); if (!ham || ham.startsWith('//') || ham.startsWith('{') || ham.includes('${') || ham.includes("'+")) continue;
    let hedef = path.posix.normalize(path.posix.join(path.posix.dirname(sayfa), decodeURI(ham)));
    if (hedef.startsWith('..')) continue;
    if (hedef.endsWith('/') || hedef === '.') hedef = path.posix.join(hedef, 'index.html');
    if (!var_(hedef)) ekle('HATA', sayfa, `Kırık bağlantı: ${ham}`);
    else if (kayit.has(hedef) && kayit.get(hedef).gizli) ekle('UYARI', sayfa, `Gizli etkinliğe bağlantı veriyor: ${ham}`);
  }
}
if (var_('manifest.json')) { const m = jsonOku('manifest.json'); for (const i of (m && m.icons) || []) if (!var_(i.src)) ekle('HATA', 'manifest.json', `Simge dosyası yok: ${i.src}`); }
if (var_('sw.js')) for (const m of oku('sw.js').matchAll(/'([\w/.-]+\.(?:html|json|png))'/g)) if (!var_(m[1])) ekle('HATA', 'sw.js', `Saklanacak dosya yok: ${m[1]} (uygulama kurulumu başarısız olur)`);
for (const [y, mb] of [['logo.png', 1]]) if (var_(y) && fs.statSync(path.join(KOK, y)).size > mb * 1048576)
  ekle('BİLGİ', y, `Dosya ${(fs.statSync(path.join(KOK, y)).size / 1048576).toFixed(1)} MB; sayfa simgesi olarak kullanılıyor → küçültülmeli (birkaç yüz KB yeter).`);

// ---- Çıktı ----
const sira = { HATA: 0, UYARI: 1, 'BİLGİ': 2 };
bulgular.sort((a, b) => sira[a.duzey] - sira[b.duzey] || a.konu.localeCompare(b.konu, 'tr'));
const say = (d) => bulgular.filter(b => b.duzey === d).length;
if (process.argv.includes('--json')) { console.log(JSON.stringify({ tarih: bugun, etkinlik: satirlar, bulgular }, null, 1)); process.exit(say('HATA') ? 1 : 0); }
const dersSay = Object.keys(DERSLER).map(k => `${DERSLER[k]} ${dosyalar.filter(d => d.klasor === k).length}`).join(' · ');
console.log(`4/D içerik denetimi — ${bugun}`);
console.log(`Etkinlik dosyası: ${dosyalar.length} (${dersSay})`);
console.log(`İçerik listesi: ${kayitlar.length} satır (${kayitlar.filter(k => k.gizli).length} gizli, ${kayitlar.filter(k => k.degerlendirme).length} değerlendirme) · Defter notu resmi: ${defterler.length}`);
console.log(`Sonuç mesajı gönderen etkinlik: ${satirlar.filter(s => s.sonuc !== '—').length} · İnternet isteyen: ${satirlar.filter(s => s.cevrimdisi === 'hayır').length}`);
console.log(`\nBulgular: ${say('HATA')} HATA · ${say('UYARI')} UYARI · ${say('BİLGİ')} BİLGİ`);
for (const d of ['HATA', 'UYARI', 'BİLGİ']) {
  const l = bulgular.filter(b => b.duzey === d); if (!l.length) continue;
  console.log(`\n${d}`);
  for (const b of l) console.log(`  - ${b.konu}: ${b.ileti}`);
}
if (process.argv.includes('--tablo')) {
  console.log('\nEtkinlik tablosu (liste = içerik listesinde mi; sonuç = portala sonuç mesajı; kazanım = dosyada yazan, dersine uyan kodlar)');
  console.log(['dosya'.padEnd(50), 'KB'.padStart(6), 'liste'.padEnd(6), 'çevrimdışı'.padEnd(10), 'sonuç'.padEnd(30), 'kazanım'].join(' '));
  for (const s of satirlar) console.log([s.yol.padEnd(50), String(s.kb).padStart(6), s.liste.padEnd(6), s.cevrimdisi.padEnd(10), s.sonuc.padEnd(30), s.kazanim].join(' '));
}
process.exit(say('HATA') ? 1 : 0);
