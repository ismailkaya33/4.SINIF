// Yıllık plan (.docx) dosyalarını hafta hafta okunabilir bir listeye çevirir.
// Kullanım: node tools/yillik-plan-oku.mjs
// Girdi:  YillikPlan/*.docx   (yerel; GitHub'a gönderilmez)
// Çıktı:  YillikPlan/yillik-plan.json
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { join } from 'node:path';

const KLASOR = 'YillikPlan';

// --- .docx içinden word/document.xml dosyasını çıkar (küçük zip okuyucu) ---
function docxXml(dosya) {
  const b = readFileSync(dosya);
  let eocd = b.length - 22;
  while (eocd >= 0 && b.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  const adet = b.readUInt16LE(eocd + 10);
  let p = b.readUInt32LE(eocd + 16);
  for (let i = 0; i < adet; i++) {
    const yontem = b.readUInt16LE(p + 10), boy = b.readUInt32LE(p + 20);
    const adBoy = b.readUInt16LE(p + 28), ekBoy = b.readUInt16LE(p + 30), yorumBoy = b.readUInt16LE(p + 32);
    const yerel = b.readUInt32LE(p + 42);
    const ad = b.toString('utf8', p + 46, p + 46 + adBoy);
    if (ad === 'word/document.xml') {
      const veriBas = yerel + 30 + b.readUInt16LE(yerel + 26) + b.readUInt16LE(yerel + 28);
      const ham = b.subarray(veriBas, veriBas + boy);
      return (yontem === 8 ? inflateRawSync(ham) : ham).toString('utf8');
    }
    p += 46 + adBoy + ekBoy + yorumBoy;
  }
  throw new Error('document.xml bulunamadı: ' + dosya);
}

const coz = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

// Tablonun her satırını hücre yazıları dizisine çevir
function satirlar(xml) {
  return [...xml.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)].map(tr =>
    [...tr[0].matchAll(/<w:tc[ >][\s\S]*?<\/w:tc>/g)].map(tc =>
      coz([...tc[0].matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)].map(m => m[1]).join('')).replace(/\s+/g, ' ').trim()));
}

const DERSLER = [
  { anahtar: 'TÜRKÇE', ders: 'Türkçe', on: 'T', derinlik: 2 },
  { anahtar: 'MATEMATİK', ders: 'Matematik', on: 'M', derinlik: 3 },
  { anahtar: 'FEN', ders: 'Fen Bilimleri', on: 'F', derinlik: 3 },
  { anahtar: 'SOSYAL', ders: 'Sosyal Bilgiler', on: 'SB', derinlik: 2 },
  { anahtar: 'İNSAN HAKLARI', ders: 'İnsan Hakları', on: 'Y', derinlik: 2 },
  { anahtar: 'TRAFİK', ders: 'Trafik Güvenliği', on: 'TG', derinlik: 2 },
  { anahtar: 'MÜZİK', ders: 'Müzik', on: 'Mü', derinlik: 2 },
  { anahtar: 'GÖRSEL', ders: 'Görsel Sanatlar', on: 'G', derinlik: 2 },
  { anahtar: 'BEDEN', ders: 'Beden Eğitimi ve Oyun', on: 'BO', derinlik: 3 },
];

const HAFTA = /(\d+)\s*(?:-\s*(\d+))?\s*\.\s*HAFTA/i;
const BIRIM = /(\d+)\s*\.\s*(?:ÜNİTE|TEMA)|Tema No:\s*(\d+)/i;

function dersOku(dosya, tanim) {
  const rows = satirlar(docxXml(dosya));
  // Kazanım kodu: ön ek + .4. + parçalar (ör. M.4.1.2.3., SB.4.2.1., Mü.4.A.2., T4.2.5.)
  const kod = new RegExp(`(?<!\\d)${tanim.on}\\.?4\\.((?:[0-9A-Z]+\\.)*[0-9A-Z]+)\\.?(?=\\s|[A-ZÇĞİÖŞÜ])`, 'g');
  const haftalar = new Map();
  let su = null, birim = '', metinAdi = '';
  for (const r of rows) {
    const tum = r.join(' | ');
    const b = tum.match(BIRIM), temaNo = tum.match(/Tema No:\s*(\d+)/i);
    if ((b || /ALAN ADI:\s*\d/i.test(tum)) && /ÜNİTE|Tema/i.test(r[0] + (r[1] || '') + (r[2] || ''))) {
      const tema = tum.match(/Tema Adı:\s*([^|]+)/i);
      const unite = tum.match(/\d+\s*\.\s*ÜNİTE\s*:?\s*([^|]*?)(?:\s*S[üu]re\s*:|\||$)/i);
      const alan = tum.match(/ALAN ADI:\s*(\d+)\s*\.\s*([^|]*?)\s*S[ÜU]RE/i);
      birim = (alan ? `${alan[1]}. Ünite: ${alan[2]}` : tema ? `${temaNo ? temaNo[1] : b[1]}. Tema: ${tema[1].trim()}` : unite ? `${b[1]}. Ünite: ${unite[1]}` : birim).trim().replace(/[:\s]+$/, '');
    }
    for (let i = 0; i < r.length; i++) {
      const h = r[i].match(HAFTA);
      if (!h) continue;
      const bas = +h[1], son = +(h[2] || h[1]);
      let tarih = r[i].slice(h.index + h[0].length).replace(/^[\s)]+/, '').trim();
      if (!tarih && /\d/.test(r[i + 1] || '') && !HAFTA.test(r[i + 1])) tarih = r[i + 1];
      // Türkçe: metin adı satırdaki 6. hücrede
      metinAdi = tanim.on === 'T' ? (r[5] || '') : '';
      su = { bas, son, tarih };
      for (let n = bas; n <= son; n++) if (!haftalar.has(n))
        haftalar.set(n, { hafta: n, tarih, birim, metin: metinAdi || undefined, kazanimlar: [] });
      break;
    }
    if (!su) continue;
    const bulunan = [];
    for (const m of tum.matchAll(kod)) {
      if (m[1].split('.').length !== tanim.derinlik) continue;
      bulunan.push({ kod: `${tanim.on}.4.${m[1]}.`, bas: m.index, metinBas: m.index + m[0].length });
    }
    bulunan.forEach((k, j) => {
      const bitis = Math.min(bulunan[j + 1]?.bas ?? Infinity, tum.indexOf(' | ', k.metinBas) === -1 ? Infinity : tum.indexOf(' | ', k.metinBas));
      let ad = tum.slice(k.metinBas, bitis === Infinity ? undefined : bitis).trim();
      ad = ad.replace(/(ARA|YARIYIL) TAT[İI]L[İI]?/gi, '').replace(/^[\s.*:,;-]+/, '').trim();
      const nokta = ad.search(/\.(\s|$)/);
      if (nokta > 0) ad = ad.slice(0, nokta + 1);
      for (let n = su.bas; n <= su.son; n++) {
        const w = haftalar.get(n);
        if (!w.kazanimlar.some(x => x.kod === k.kod)) w.kazanimlar.push({ kod: k.kod, ad });
      }
    });
  }
  // Yeni kazanım gelmeyen hafta: önceki haftanın son kazanımı devam ediyor
  const liste = [...haftalar.values()].sort((a, b) => a.hafta - b.hafta);
  let onceki = null;
  for (const w of liste) {
    if (!w.kazanimlar.length && onceki) w.devam = onceki.kazanimlar.at(-1) || onceki.devam;
    onceki = w.kazanimlar.length ? w : (w.devam ? { kazanimlar: [w.devam] } : onceki);
  }
  return liste;
}

const sonuc = { aciklama: 'Yıllık plandan otomatik çıkarıldı (tools/yillik-plan-oku.mjs). Kaynak: YillikPlan/*.docx', olusturma: new Date().toISOString().slice(0, 10), dersler: {} };
for (const f of readdirSync(KLASOR).filter(f => f.toLowerCase().endsWith('.docx'))) {
  const ust = f.toLocaleUpperCase('tr');
  const t = DERSLER.find(d => ust.includes(d.anahtar));
  if (!t) { console.log('Tanınmayan dosya, atlandı:', f); continue; }
  const h = dersOku(join(KLASOR, f), t);
  sonuc.dersler[t.ders] = h;
  console.log(`${t.ders}: ${h.length} hafta, ${new Set(h.flatMap(w => w.kazanimlar.map(k => k.kod))).size} kazanım`);
}
writeFileSync(join(KLASOR, 'yillik-plan.json'), JSON.stringify(sonuc, null, 1), 'utf8');
console.log('Yazıldı:', join(KLASOR, 'yillik-plan.json'));
