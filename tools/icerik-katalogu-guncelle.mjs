// 4/D — İçerik listesini (icerik-katalogu.json) ders klasörlerindeki dosyalarla eşitler.
//
// GitHub bu komutu, bir ders klasörüne .html dosyası yüklendiğinde kendiliğinden çalıştırır:
//  - yeni dosya   -> listeye eklenir (adı dosyanın <title> yazısından, tarih bugün)
//  - silinen dosya -> listeden çıkarılır
//  - var olan satırlara (ad, gizli...) dokunulmaz; elle yaptığınız düzeltmeler korunur.
//
// Elle çalıştırmak için (depo klasöründe): node tools/icerik-katalogu-guncelle.mjs
import {readFileSync, writeFileSync, readdirSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOSYA = join(KOK, 'icerik-katalogu.json');
export const DERSLER = {
  Turkce: 'Türkçe', Matematik: 'Matematik', Fen: 'Fen Bilimleri', Sosyal: 'Sosyal Bilgiler',
  Insanhaklari: 'İnsan Hakları', Trafik: 'Trafik Güvenliği', Oyunlar: 'Oyunlar'
};

function bugun() {
  // Türkiye saatiyle bugünün tarihi (YYYY-AA-GG)
  return new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
}

function baslikOku(yol) {
  const metin = readFileSync(join(KOK, yol), 'utf8').slice(0, 200000);
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(metin);
  const ham = m ? m[1] : yol.split('/').pop().replace(/\.html$/i, '');
  return ham.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim().slice(0, 120) || yol;
}

export function katalogYaz(k) {
  // Her içerik tek satırda: GitHub'ın sayfasından düzenlemesi kolay olsun.
  const satirlar = k.icerikler.map(x => '    ' + JSON.stringify({yol: x.yol, ad: x.ad, ders: x.ders, eklenme: x.eklenme, gizli: !!x.gizli}));
  return '{\n' +
    '  "aciklama": ' + JSON.stringify(k.aciklama) + ',\n' +
    '  "siteAdresi": ' + JSON.stringify(k.siteAdresi) + ',\n' +
    '  "icerikler": [\n' + satirlar.join(',\n') + '\n  ]\n}\n';
}

export const ACIKLAMA = 'Portalda görünen etkinliklerin listesi. Ders klasörüne yeni .html yüklenince GitHub bu listeye kendisi ekler. Adı düzeltmek için "ad" yazısını değiştirin; bir etkinliği öğrencilerden gizlemek için "gizli": true yapın.';

export function guncelle({yaz = true} = {}) {
  const k = existsSync(DOSYA) ? JSON.parse(readFileSync(DOSYA, 'utf8'))
    : {aciklama: ACIKLAMA, siteAdresi: 'https://ismailkaya33.github.io/4.SINIF/', icerikler: []};
  const varolan = new Set();
  for (const klasor of Object.keys(DERSLER)) {
    if (!existsSync(join(KOK, klasor))) continue;
    for (const ad of readdirSync(join(KOK, klasor), {withFileTypes: true})) {
      if (ad.isFile() && /\.html$/i.test(ad.name)) varolan.add(klasor + '/' + ad.name);
    }
  }
  const eklenen = [], silinen = [];
  k.icerikler = k.icerikler.filter(x => { if (varolan.has(x.yol)) return true; silinen.push(x.yol); return false; });
  const kayitli = new Set(k.icerikler.map(x => x.yol));
  for (const yol of [...varolan].sort((a, b) => a.localeCompare(b, 'tr'))) {
    if (kayitli.has(yol)) continue;
    k.icerikler.push({yol, ad: baslikOku(yol), ders: DERSLER[yol.split('/')[0]], eklenme: bugun(), gizli: false});
    eklenen.push(yol);
  }
  const yeni = katalogYaz(k);
  const eski = existsSync(DOSYA) ? readFileSync(DOSYA, 'utf8').replace(/\r\n/g, '\n') : '';
  if (yaz && yeni !== eski) writeFileSync(DOSYA, yeni, 'utf8');
  return {eklenen, silinen, degisti: yeni !== eski};
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const s = guncelle();
  console.log('Eklenen: ' + (s.eklenen.join(', ') || 'yok'));
  console.log('Çıkarılan: ' + (s.silinen.join(', ') || 'yok'));
  console.log(s.degisti ? 'icerik-katalogu.json güncellendi.' : 'Değişiklik yok.');
}
