// 4/D — Etkinlik kataloğunu (portal/etkinlik-kayitlari.json) kod dosyalarına uygular.
//
// Kullanım (depo klasöründe):
//   node tools/katalog-esitle.mjs           -> dosyaları listeye göre günceller
//   node tools/katalog-esitle.mjs --kontrol -> sadece kontrol eder; fark varsa hata verir
//
// Her dosyada "KATALOG BASLA: ..." ile "KATALOG BITIR: ..." arasındaki bölüm bu komutla
// yazılır. O bölümleri elle değiştirmeyin; değişikliği JSON dosyasında yapın.
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
// Windows'ta Git dosyaları CRLF satır sonuyla açabilir; karşılaştırma LF üzerinden yapılır.
const oku = p => readFileSync(join(KOK, p), 'utf8').replace(/\r\n/g, '\n');
const crlfMi = p => readFileSync(join(KOK, p), 'utf8').includes('\r\n');
const js = v => JSON.stringify(v);
const tekTirnak = v => "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

export function katalogYukle() {
  const k = JSON.parse(oku('portal/etkinlik-kayitlari.json'));
  const idler = new Set(), yollar = new Set();
  for (const e of k.otomatikSonuc) {
    if (!/^[a-z0-9-]{3,60}$/.test(e.id)) throw Error('Geçersiz etkinlik kimliği: ' + e.id);
    if (idler.has(e.id)) throw Error('Aynı kimlik iki kez yazılmış: ' + e.id);
    if (yollar.has(e.yol)) throw Error('Aynı dosya iki kez yazılmış: ' + e.yol);
    if (!/^[A-Za-zÇĞİÖŞÜçğıöşü0-9_\/-]+\.html$/.test(e.yol)) throw Error('Geçersiz dosya yolu: ' + e.yol);
    if (!e.ad || !e.konu || !e.kazanim) throw Error('Eksik ad/konu/kazanım: ' + e.id);
    if (!Number.isSafeInteger(e.maxTotal) || e.maxTotal < 1 || e.maxTotal > 1000) throw Error('maxTotal 1-1000 olmalı: ' + e.id);
    idler.add(e.id); yollar.add(e.yol);
  }
  const secili = new Set();
  for (const s of k.seciliEtkinlikler) {
    if (secili.has(s.yol)) throw Error('Seçili listede tekrar: ' + s.yol);
    secili.add(s.yol);
  }
  for (const e of k.otomatikSonuc) {
    if (e.dersListesinde && !secili.has(e.yol)) throw Error('Ders listesindeki takipli etkinlik seçili listede yok: ' + e.yol);
  }
  return k;
}

function bolumler(k) {
  const site = k.siteAdresi, oto = k.otomatikSonuc, listede = oto.filter(e => e.dersListesinde);
  const ic = (girinti, satirlar) => satirlar.map(s => girinti + s).join(',\n');
  return {
    'portal/appsscript/EtkinlikKayitDefteri.gs': [{
      ad: 'sunucu-izin-listesi',
      eski: /const SONUC_IZINLI_ETKINLIKLER_ = Object\.freeze\(\{[\s\S]*?\n\}\);/,
      yeni: 'const SONUC_IZINLI_ETKINLIKLER_ = Object.freeze({\n' +
        ic('  ', oto.map(e => `${tekTirnak(e.id)}: Object.freeze({konu:${tekTirnak(e.konu)},kazanim:${tekTirnak(e.kazanim)},maxTotal:${e.maxTotal}})`)) + '\n});'
    }],
    'portal/appsscript/EtkinlikSonuclari.gs': [{
      ad: 'ilerleme-yollari',
      eski: /const paths = \{[\s\S]*?\n  \};/,
      yeni: 'const paths = {\n' + ic('    ', listede.map(e => `${tekTirnak(e.id)}:${tekTirnak(e.yol)}`)) + '\n  };'
    }],
    'portal/appsscript/OgrenciCalismaDurumu.gs': [{
      ad: 'secili-etkinlikler',
      eski: /const SECILI_ETKINLIKLER_ = Object\.freeze\(\[[\s\S]*?\n\]\);/,
      yeni: 'const SECILI_ETKINLIKLER_ = Object.freeze([\n' + ic(' ', k.seciliEtkinlikler.map(s => tekTirnak(s.yol))) + '\n]);'
    }],
    'portal/appsscript/OgrenciGiris_Guncel.html': [{
      ad: 'portal-takipli-oyunlar',
      eski: /const takipliOyunlar=Object\.freeze\(\{.*?\}\);\nconst resultTrackByPath=Object\.freeze\(\{.*?\}\);\nconst trackedNames=\{.*?\};/,
      yeni: 'const takipliOyunlar=Object.freeze(' + js(Object.fromEntries(oto.map(e => [e.id, site + e.yol]))) + ');\n' +
        'const resultTrackByPath=Object.freeze(' + js(Object.fromEntries(listede.map(e => [e.yol, e.id]))) + ');\n' +
        'const trackedNames=' + js(Object.fromEntries(oto.map(e => [e.id, e.ad]))) + ';'
    }, {
      ad: 'portal-secili-etkinlikler',
      eski: /const seciliEtkinlikler=new Set\(\[[\s\S]*?\n\]\);/,
      yeni: 'const seciliEtkinlikler=new Set(' + js(k.seciliEtkinlikler.map(s => s.yol)) + ');'
    }],
    'portal/ogretmen-rapor/OgretmenRapor.gs': [{
      ad: 'rapor-etkinlik-kimlikleri',
      eski: /const allIds=\[.*?\]; \/\/ İzlenebilir etkinlikler/,
      yeni: 'const allIds=' + js(oto.map(e => e.id)) + '; // İzlenebilir etkinlikler'
    }, {
      ad: 'rapor-secili-etkinlikler',
      eski: /const selectedActivities=\[[\s\S]*?\n  \];/,
      yeni: 'const selectedActivities=' + js(k.seciliEtkinlikler.map(s => s.yol)) + ';'
    }],
    'portal/ogretmen-rapor/OgretmenRapor.html': [{
      ad: 'rapor-etkinlik-adlari',
      eski: /function activityName\(id\)\{return \(\{.*?\}\)\[id\]\|\|id\}/,
      yeni: 'const ETKINLIK_ADLARI=' + js(Object.fromEntries(oto.map(e => [e.id, e.ad]))) + ';\n' +
        'function activityName(id){return ETKINLIK_ADLARI[id]||id}'
    }, {
      ad: 'rapor-tamamlama-adlari',
      eski: /function completionName\(id\)\{return \(\{[\s\S]*?\}\)\[id\]\|\|id\}/,
      yeni: 'const TAMAMLAMA_ADLARI=' + js(Object.fromEntries(k.seciliEtkinlikler.map(s => [s.yol, s.ad]))) + ';\n' +
        'function completionName(id){return TAMAMLAMA_ADLARI[id]||id}'
    }]
  };
}

const basla = ad => `/* KATALOG BASLA: ${ad} — elle değiştirmeyin, portal/etkinlik-kayitlari.json dosyasını düzenleyin */`;
const bitir = ad => `/* KATALOG BITIR: ${ad} */`;
const kacis = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function bolumUygula(metin, b, dosya) {
  const blok = basla(b.ad) + '\n' + b.yeni + '\n' + bitir(b.ad);
  const isaretli = new RegExp(kacis(basla(b.ad)) + '[\\s\\S]*?' + kacis(bitir(b.ad)));
  if (isaretli.test(metin)) return metin.replace(isaretli, () => blok);
  if (!b.eski.test(metin)) throw Error(dosya + ': "' + b.ad + '" bölümü bulunamadı.');
  return metin.replace(b.eski, () => blok);
}

function politikaUygula(metin, k) {
  const p = JSON.parse(metin);
  const otomatik = new Set(k.otomatikSonuc.filter(e => e.dersListesinde).map(e => e.yol));
  for (const e of p.mevcutEtkinlikler || []) if (otomatik.has(e.konum)) e.takip = 'otomatik_sonuc';
  return JSON.stringify(p, null, 2) + '\n';
}

/** Hangi dosyaların listeyle uyuşmadığını döndürür (hiçbir şey yazmaz). */
export function katalogFarklari() {
  const k = katalogYukle(), farkli = [], yeniler = {};
  for (const [dosya, liste] of Object.entries(bolumler(k))) {
    const eski = oku(dosya);
    let yeni = eski;
    for (const b of liste) yeni = bolumUygula(yeni, b, dosya);
    yeniler[dosya] = yeni;
    if (yeni !== eski) farkli.push(dosya);
  }
  const pol = 'portal/etkinlik-takip-politikasi.json', polEski = oku(pol), polYeni = politikaUygula(polEski, k);
  if (JSON.stringify(JSON.parse(polEski)) !== JSON.stringify(JSON.parse(polYeni))) farkli.push(pol);
  yeniler[pol] = polYeni;
  return {farkli, yeniler};
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const kontrol = process.argv.includes('--kontrol');
  const {farkli, yeniler} = katalogFarklari();
  if (kontrol) {
    if (farkli.length) { console.error('Liste ile uyuşmayan dosyalar:\n - ' + farkli.join('\n - ') + '\nÇözüm: node tools/katalog-esitle.mjs'); process.exit(1); }
    console.log('Katalog kontrolü tamam: tüm dosyalar etkinlik listesiyle uyumlu.');
  } else {
    for (const d of farkli) writeFileSync(join(KOK, d), crlfMi(d) ? yeniler[d].replace(/\n/g, '\r\n') : yeniler[d], 'utf8');
    console.log(farkli.length ? 'Güncellenen dosyalar:\n - ' + farkli.join('\n - ') : 'Değişiklik gerekmedi; her şey zaten uyumlu.');
  }
}
