// 4/D — Defter notunu TEK KOMUTLA basar: denetler, dosyaları doğru klasörlere koyar, sırada ne olduğunu söyler.
// (tools/sketchnote-yap.mjs aracının üstünde ince bir kabuktur; çizimi o yapar.)
//
// Kullanım (depo kökünden):
//   node tools/defter-bas.mjs                    bütün notların durumu (hangisi hazır, hangisi resim bekliyor, hangisi eski)
//   node tools/defter-bas.mjs mat-carpma         notu denetle ve bas
//   node tools/defter-bas.mjs mat-carpma --taslak   resimler eksik olsa da "taslak" olarak bas (portal klasörüne yazmaz)
//   node tools/defter-bas.mjs fen-miknatislar --istemler   ChatGPT ile çizilecek görsellerin istemleri
//   seçenekler: --renkli (kes-yapıştır renkli)   --olcek 1.2 (portal resmi daha küçük dosya olsun)
//
// Dosyalar nereye gider? (ad = not dosyasının adı, ör. fen-miknatislar; ders ön ekten anlaşılır: mat-, fen-, sos-, tr-, ih-, trf-)
//   <Ders>/DefterNotlari/<ad>.png  (çok sayfalıysa <ad>-1.png, <ad>-2.png …)   → portala/siteye gidecek resim
//   Baski/<Ders>/<ad>-defter-notu.pdf                                          → yazdırılacak not (yalnız bu bilgisayarda)
//   Baski/<Ders>/<ad>-kes-yapistir.pdf                                         → yazdırılacak kes-yapıştır görselleri
// Güvenlik: ChatGPT resmi eksikse portal klasörüne YAZMAZ (gri "ChatGPT ile çizilecek" kutulu sayfa yanlışlıkla
// yayımlanmasın). O durumda --taslak ile Baski/<Ders>/taslak/ altına basılır. Hiçbir şeyi GitHub'a göndermez.
// Yayım kaydı: tools/sketchnote/yayin.json (hangi not, kaynağın hangi hâliyle, kaç sayfa basıldı) → "eski mi?" sorusu için.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const NOTLAR = path.join(DEPO, 'tools', 'sketchnote', 'notlar');
const ARAC = path.join(DEPO, 'tools', 'sketchnote-yap.mjs');
const KAYIT = path.join(DEPO, 'tools', 'sketchnote', 'yayin.json');
const DERS = { mat: 'Matematik', fen: 'Fen', sos: 'Sosyal', tr: 'Turkce', ih: 'Insanhaklari', trf: 'Trafik' };
const dur = (m) => { console.error('HATA: ' + m); process.exit(1); };

const arg = process.argv.slice(2);
const bayrak = (ad) => arg.includes('--' + ad);
const deger = (ad) => { const i = arg.indexOf('--' + ad); return i >= 0 ? arg[i + 1] : undefined; };
const DEGERLI = ['olcek', 'cikti-kok'];
const adlar = arg.filter((a, i) => !a.startsWith('--') && !(i > 0 && DEGERLI.includes(arg[i - 1].slice(2))));
for (const a of arg.filter(a => a.startsWith('--'))) if (!['taslak', 'istemler', 'renkli', 'hepsi', ...DEGERLI].includes(a.slice(2))) dur(`Bilinmeyen seçenek: ${a}`);
// --cikti-kok: çıktıların yazılacağı kök klasör (yalnız test için; varsayılan depo kökü)
const KOK = deger('cikti-kok') ? path.resolve(deger('cikti-kok')) : DEPO;
const goreli = (p) => path.relative(KOK, p).split(path.sep).join('/') || '.';

const tumNotlar = () => fs.readdirSync(NOTLAR).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).sort();
const kaynak = (ad) => path.join(NOTLAR, ad + '.js');
const dersi = (ad) => DERS[ad.split('-')[0]] || null;
const ozet = (ad) => crypto.createHash('sha256').update(fs.readFileSync(kaynak(ad))).digest('hex').slice(0, 16);
const kayitOku = () => { try { return JSON.parse(fs.readFileSync(KAYIT, 'utf8')); } catch { return { aciklama: 'Defter notlarının son basım kaydı (tools/defter-bas.mjs yazar; elle düzenlemeyin).', notlar: {} }; } };
const yayindaki = (ad) => { // <Ders>/DefterNotlari/ altındaki resimleri: ad.png ya da ad-1.png, ad-2.png …
  const k = path.join(DEPO, dersi(ad) || '', 'DefterNotlari');
  if (!dersi(ad) || !fs.existsSync(k)) return [];
  return fs.readdirSync(k).filter(f => f === ad + '.png' || new RegExp('^' + ad.replace(/[-]/g, '\\-') + '-\\d+\\.png$').test(f)).sort();
};
// Aracı çalıştırır; çıktısını ve çıkış kodunu döndürür.
function kos(ek, goster) {
  const r = spawnSync(process.execPath, [ARAC, ...ek], { cwd: DEPO, encoding: 'utf8', maxBuffer: 64 << 20 });
  const cikti = (r.stdout || '') + (r.stderr || '');
  if (goster) process.stdout.write(cikti.split('\n').filter(s => s && !/^(PNG|PDF|HTML):/.test(s)).map(s => '  ' + s).join('\n') + (cikti.trim() ? '\n' : ''));
  return { kod: r.status === null ? 1 : r.status, cikti };
}
// Notu basmadan denetler: sayfa sayıları, eksik resimler, uyarılar.
function denetle(ad) {
  const r = kos([kaynak(ad), '--kontrol']);
  const m = /Kontrol tamam: not (\d+) sayfa(?:, kes-yapıştır (\d+) sayfa \((\d+) görsel\))?/.exec(r.cikti);
  const eksik = [...r.cikti.matchAll(/Uyarı: (?:resim henüz yok|dosya resim değil)[^→]*→\s*(.+)/g)].map(x => x[1].trim());
  const uyari = [...r.cikti.matchAll(/^Uyarı: (.+)$/gm)].map(x => x[1]).filter(u => !/resim henüz yok|dosya resim değil/.test(u));
  return { tamam: r.kod === 0 && !!m, sayfa: m ? +m[1] : 0, kes: m && m[2] ? +m[2] : 0, gorsel: m && m[3] ? +m[3] : 0, eksik, uyari, cikti: r.cikti };
}

// ---- Durum tablosu ----
function durum() {
  const kayit = kayitOku().notlar;
  console.log('Defter notlarının durumu (kaynak: tools/sketchnote/notlar/)\n');
  const satirlar = [];
  for (const ad of tumNotlar()) {
    const d = denetle(ad), yayin = yayindaki(ad), k = kayit[ad];
    let hal, yap;
    if (!dersi(ad)) { hal = 'ad ön eki tanınmıyor'; yap = 'dosya adını mat-/fen-/sos-/tr-/ih-/trf- ile başlatın'; }
    else if (!d.tamam) { hal = 'HATA VAR'; yap = `node tools/defter-bas.mjs ${ad}  (hatayı gösterir)`; }
    else if (d.eksik.length) { hal = `resim bekliyor (${d.eksik.length})`; yap = `node tools/defter-bas.mjs ${ad} --istemler`; }
    else if (!yayin.length) { hal = 'basılmaya hazır'; yap = `node tools/defter-bas.mjs ${ad}`; }
    else if (yayin.length !== d.sayfa) { hal = `yayındaki ESKİ (${yayin.length} sayfa; kaynak ${d.sayfa} sayfa)`; yap = `node tools/defter-bas.mjs ${ad}`; }
    else if (k && k.kaynak !== ozet(ad)) { hal = 'yayındaki ESKİ (kaynak sonradan değişmiş)'; yap = `node tools/defter-bas.mjs ${ad}`; }
    else if (k) { hal = 'yayında, güncel'; yap = '—'; }
    else { hal = 'yayında (basım kaydı yok; güncelliği bilinmiyor)'; yap = 'emin olmak için yeniden basın'; }
    if (d.tamam && d.eksik.length && yayin.length) hal += yayin.length !== d.sayfa ? `; yayındaki ESKİ (${yayin.length}/${d.sayfa} sayfa)` : '; yayında var';
    satirlar.push({ ad, sayfa: d.tamam ? d.sayfa : '?', gorsel: d.tamam ? d.gorsel : '?', hal, yap, uyari: d.uyari });
  }
  const g = Math.max(...satirlar.map(s => s.ad.length), 3);
  for (const s of satirlar) {
    console.log(`${s.ad.padEnd(g)}  ${String(s.sayfa).padStart(2)} sayfa  ${String(s.gorsel).padStart(2)} görsel  ${s.hal}`);
    if (s.yap !== '—') console.log(`${''.padEnd(g)}  → ${s.yap}`);
    for (const u of s.uyari) console.log(`${''.padEnd(g)}  ! ${u}`);
  }
  console.log('\n"resim bekliyor": ChatGPT görselleri Baski/<Ders>/resimler/ klasörüne konunca basılabilir (öğretmenin bilgisayarında).');
  console.log('"yayındaki ESKİ": sitedeki resim, notun şimdiki hâlinden farklı; yeniden basılıp gönderilmesi gerekir (öğretmenin onayıyla).');
}

// ---- Bir notu bas ----
function bas(ad) {
  if (!fs.existsSync(kaynak(ad))) dur(`"${ad}" adında not yok. Var olanlar: ${tumNotlar().join(', ')}`);
  const ders = dersi(ad);
  if (!ders) dur(`Not adının başı dersi göstermeli (mat-, fen-, sos-, tr-, ih-, trf-): ${ad}`);
  if (bayrak('istemler')) { process.stdout.write(kos([kaynak(ad), '--istemler']).cikti); return true; }
  console.log(`\n${ad} (${ders})`);
  const d = denetle(ad);
  if (!d.tamam) { process.stdout.write(d.cikti.split('\n').filter(Boolean).map(s => '  ' + s).join('\n') + '\n'); console.log('  Basılmadı: önce yukarıdaki hata düzeltilmeli.'); return false; }
  for (const u of d.uyari) console.log('  Uyarı: ' + u);
  const taslak = d.eksik.length > 0;
  if (taslak && !bayrak('taslak')) {
    console.log(`  ${d.eksik.length} resim eksik:`); for (const e of d.eksik) console.log('    - ' + e);
    console.log('  Basılmadı: gri kutulu sayfa yanlışlıkla portala gitmesin diye durdum.');
    console.log(`  • İstemleri görmek için:  node tools/defter-bas.mjs ${ad} --istemler`);
    console.log(`  • Düzeni görmek için taslak basmak:  node tools/defter-bas.mjs ${ad} --taslak`);
    return false;
  }
  const baski = path.join(KOK, 'Baski', ders, ...(taslak ? ['taslak'] : []));
  const pngHedef = taslak ? path.join(baski, ad + '.png') : path.join(KOK, ders, 'DefterNotlari', ad + '.png');
  const pdfHedef = path.join(baski, ad + '-defter-notu.pdf'), kesHedef = path.join(baski, ad + '-kes-yapistir.pdf');
  // eski sayfa resimleri kalmasın (not 3 sayfadan 2 sayfaya düştüyse ad-3.png artık yanlış olur)
  if (!taslak) for (const f of yayindaki(ad)) if (KOK === DEPO) fs.rmSync(path.join(DEPO, ders, 'DefterNotlari', f));
  const ek = [kaynak(ad), '--png', pngHedef, '--pdf', pdfHedef];
  if (d.gorsel) ek.push('--kes', kesHedef);
  if (bayrak('renkli')) ek.push('--renkli');
  if (deger('olcek')) ek.push('--olcek', deger('olcek'));
  const r = kos(ek);
  if (r.kod !== 0) { process.stdout.write(r.cikti); return false; }
  const pngler = d.sayfa > 1 ? Array.from({ length: d.sayfa }, (_, i) => pngHedef.replace(/\.png$/, `-${i + 1}.png`)) : [pngHedef];
  const boyut = (f) => `${(fs.statSync(f).size / 1048576).toFixed(1)} MB`;
  console.log(taslak ? '  TASLAK basıldı (resimler eksik; portala konmaz):' : '  Basıldı:');
  for (const f of pngler) console.log(`    ${taslak ? 'taslak resim' : 'portal resmi '}  ${goreli(f)}  (${boyut(f)})`);
  console.log(`    yazdırılacak   ${goreli(pdfHedef)}  (${d.sayfa} sayfa)`);
  if (d.gorsel) console.log(`    kes-yapıştır   ${goreli(kesHedef)}  (${d.kes} sayfa; her sayfa 4 öğrencilik${d.gorsel % 2 ? ', son sayfa 8 öğrencilik' : ''} → sınıf mevcudu ÷ 4 kopya)`);
  if (!taslak) {
    if (KOK === DEPO) { const k = kayitOku(); k.notlar[ad] = { kaynak: ozet(ad), sayfa: d.sayfa, tarih: new Date().toISOString().slice(0, 10) }; fs.writeFileSync(KAYIT, JSON.stringify(k, null, 1) + '\n'); }
    const buyuk = pngler.filter(f => fs.statSync(f).size > 1500 * 1024);
    if (buyuk.length) console.log(`  Not: ${buyuk.length} resim 1,5 MB'tan büyük (telefonda yavaş açılır). Daha küçük dosya için: --olcek 1.2`);
    console.log('  Sırada (öğretmenin onayıyla):');
    console.log('    1) Resimlere bir göz atın (Claude resmi açıp kontrol eder).');
    console.log(`    2) GitHub'a gönderim: ${pngler.map(goreli).join(', ')} + tools/sketchnote/yayin.json`);
    console.log('    3) Öğrenciler görsün diye portalın defter notu listesine eklenir (portal dalı → anında canlıya çıkar; ayrıca onay gerekir).');
    console.log('    4) Baski/ altındaki PDF\'ler yazdırılır (GitHub\'a gitmez).');
  }
  return true;
}

if (!fs.existsSync(NOTLAR)) dur('tools/sketchnote/notlar klasörü bulunamadı (depo kökünden çalıştırın).');
if (bayrak('hepsi')) { let hata = 0; for (const ad of tumNotlar()) if (!bas(ad)) hata++; process.exit(hata && !bayrak('istemler') ? 1 : 0); }
else if (!adlar.length) durum();
else { let hata = 0; for (const ad of adlar) if (!bas(ad.replace(/\.js$/, '').split(/[\\/]/).pop())) hata++; process.exit(hata ? 1 : 0); }

