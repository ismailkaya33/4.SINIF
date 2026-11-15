// 4/D — Defter notu / sketchnote aracı için tekrar çalıştırılabilir testler.
//
// Kullanım (depo kökünden):
//   node tools/sketchnote/test/calistir.mjs              tüm testler (yaklaşık 1–2 dakika)
//   node tools/sketchnote/test/calistir.mjs --hizli      yalnız uç durum örnekleri (gerçek notların düzen karşılaştırması yok)
//   node tools/sketchnote/test/calistir.mjs --guncelle   gerçek notların "beklenen düzen" dosyalarını yeniden yazar
//                                                        (bir notu BİLEREK değiştirdikten sonra çalıştırılır)
//   node tools/sketchnote/test/calistir.mjs <sözcük>     adında bu sözcük geçen testler
//
// Üç tür test var:
//   1) Uç durumlar  — test/ornekler/*.js: çok uzun madde, tek görsel, eksik/bozuk resim, 3 sayfayı aşan not, boş blok,
//                     yanlış blok adı, Türkçe karakterler, taşan başlık … Her biri için beklenen sonuç aşağıdaki tabloda.
//   2) Komut satırı — yanlış seçenek, eksik değer, yanlış uzantı; PNG/PDF gerçekten yazılıyor mu, boyutu doğru mu.
//   3) Gerçek notlar — notlar/*.js hatasız derleniyor mu ve sayfalardaki yazı düzeni test/beklenen/<ad>.json ile aynı mı
//                     (bir değişiklik mevcut notların satır/sayfa düzenini bozarsa burada yakalanır).
//   4) Tek komutla basım — tools/defter-bas.mjs dosyaları doğru klasöre koyuyor mu, resmi eksik notu portala yazmıyor mu.
// Test örnekleri gerçek ders içeriği değildir; portala ve baskıya gitmez.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const BURASI = path.dirname(fileURLToPath(import.meta.url));
const DEPO = path.join(BURASI, '..', '..', '..');
const ARAC = path.join(DEPO, 'tools', 'sketchnote-yap.mjs');
const ORNEK = (ad) => path.join('tools', 'sketchnote', 'test', 'ornekler', ad + '.js');
const GECICI = fs.mkdtempSync(path.join(os.tmpdir(), 'sketchnote-test-'));
const ONCEDEN = new Set(fs.readdirSync(os.tmpdir())); // testten önce de duran geçici dosyalar sayılmaz
const secenekler = process.argv.slice(2);
const guncelle = secenekler.includes('--guncelle'), hizli = secenekler.includes('--hizli');
const suzgec = secenekler.find(a => !a.startsWith('--'));

const kos = (argumanlar, cwd = DEPO) => new Promise((coz) => {
  execFile(process.execPath, [ARAC, ...argumanlar], { cwd, encoding: 'utf8', maxBuffer: 64 << 20 }, (hata, stdout, stderr) => {
    coz({ kod: hata ? (typeof hata.code === 'number' ? hata.code : 1) : 0, cikti: (stdout || '') + (stderr || '') });
  });
});
const pngBoyutu = (dosya) => { const b = fs.readFileSync(dosya); return b.toString('latin1', 1, 4) === 'PNG' ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null; };
const pdfSayfa = (dosya) => (fs.readFileSync(dosya, 'latin1').match(/\/Type\s*\/Page(?![s\w])/g) || []).length;

// ---- 1) Uç durumlar: [örnek, ek seçenekler, beklenen çıkış kodu, çıktıda olması gerekenler, olmaması gerekenler] ----
const K = ['--kontrol'];
const UC_DURUMLAR = [
  ['uzun-madde', K, 0, ['Kontrol tamam: not 2 sayfa'], ['HATA', 'Uyarı']],
  ['tek-gorsel', K, 0, ['not 1 sayfa, kes-yapıştır 1 sayfa (1 görsel)'], ['HATA', 'Uyarı']],
  ['eksik-resim', K, 0, ['resim henüz yok', 'yok.png', 'istem', 'DİKKAT: 2 resim eksik'], ['HATA']],
  ['var-olan-resim', K, 0, ['Kontrol tamam'], ['HATA', 'Uyarı', 'DİKKAT']],
  ['bozuk-resim', K, 0, ['dosya resim değil', 'DİKKAT: 1 resim eksik'], ['HATA']],
  ['cok-sayfa', K, 0, ['Not 5 sayfa tuttu (kural: 1–3 sayfa)', 'Kontrol tamam: not 5 sayfa'], ['HATA']],
  ['bos-blok', K, 1, ['Blok 2 boş', 'Blok 3 tanınmadı ya da boş (madde)', 'Blok 4 tanınmadı ya da boş (adim)'], ['Kontrol tamam']],
  ['yanlis-blok-adi', K, 1, ['Blok 2 tanınmadı ya da boş (maddde)'], ['Kontrol tamam']],
  ['iki-turlu-blok', K, 1, ['bir blokta tek tür olur'], ['Kontrol tamam']],
  ['turkce-karakter', K, 0, ['Kontrol tamam: not 1 sayfa'], ['HATA']],
  ['uzun-sozcuk', K, 1, ['sağdan taşıyor'], ['Kontrol tamam']],
  ['uzun-baslik', K, 0, ['Kontrol tamam'], ['HATA', 'sığmıyor']],
  ['cok-uzun-baslik', K, 1, ['Not başlığı satıra sığmıyor', 'Alt konu başlığı satıra sığmıyor'], ['Kontrol tamam']],
  ['tanimsiz-gorsel', K, 1, ['Görsel 5 tanımlı değil'], ['Kontrol tamam']],
  ['uc-gorsel-yan-yana', K, 1, ['yan yana en çok 2 görsel'], ['Kontrol tamam']],
  ['gorselsiz', K, 0, ['Kontrol tamam: not 2 sayfa.'], ['HATA', 'kes-yapıştır']],
  ['gorselsiz', ['--kes', path.join(GECICI, 'gorselsiz-kes.pdf')], 1, ['Bu notta görsel yok'], ['PDF:']],
  ['dev-blok', K, 1, ['tek bir blok sayfaya sığmayacak kadar uzun'], ['Kontrol tamam']],
  ['gorsel-ici-tasma', K, 0, ['Görsel 1:', 'Görsel 2:', 'görsel kutusundan taşıyor', 'Kontrol tamam'], ['HATA']],
  ['ciz-hatasi', K, 1, ['Not çizilirken hata oluştu', 'olmayanDegisken'], ['Kontrol tamam']],
  ['sozdizimi-hatasi', K, 1, ['Not dosyası okunamadı', 'satır'], ['Kontrol tamam']],
  ['kullanilmayan-gorsel', K, 0, ['Görsel 2 (Örnek şema) notta hiçbir yere yerleştirilmemiş', 'Görsel 1 notta 2 kez kullanılmış'], ['HATA']],
  ['serbest-duzen', K, 0, ['Kontrol tamam: not 1 sayfa.'], ['HATA']],
  ['serbest-duzen', ['--kes', path.join(GECICI, 'serbest-kes.pdf')], 1, ['--kes yalnız defter notu'], ['PDF:']],
  ['harita-5-kutu', K, 0, ['bilinmeyen simge: olmayan-simge', 'Kontrol tamam: not 1 sayfa.'], ['HATA']],
  ['harita-tasma', K, 1, ['Yazı kutudan taşıyor', 'Uzun'], ['Kontrol tamam']],
  ['harita-kutusuz', K, 1, ['kutular'], ['Kontrol tamam']],
  ['harita-uzun-baslik', K, 0, ['Kontrol tamam'], ['HATA']],
  ['cagri-yok', K, 1, ['çağrısı yok'], ['Kontrol tamam']],
  // ---- 2) Komut satırı ----
  ['tek-gorsel', ['--kess', 'x.pdf'], 1, ['Bilinmeyen seçenek: --kess'], []],
  ['tek-gorsel', ['--png'], 1, ['--png seçeneğinden sonra'], []],
  ['tek-gorsel', ['--png', '--kes', 'x.pdf'], 1, ['--png seçeneğinden sonra'], []],
  ['tek-gorsel', ['--png', 'cikti.jpg'], 1, ['.png ile bitmeli'], []],
  ['tek-gorsel', ['--olcek', 'büyük', '--kontrol'], 1, ['--olcek'], []],
  ['tek-gorsel', [], 1, ['En az biri gerekli'], []],
  ['eksik-resim', ['--istemler'], 0, ['=== Görsel 1: Olmayan resim', '(henüz yok)', 'Bir görsel oluştur: deneme.', '(istem yazılmamış)'], ['HATA']],
  ['var-olan-resim', ['--istemler'], 0, ['(VAR)'], ['henüz yok']],
];

const sonuclar = [];
const kaydet = (ad, tamam, ayrinti) => { sonuclar.push({ ad, tamam, ayrinti }); console.log(`${tamam ? '  geçti ' : '  KALDI '} ${ad}${tamam || !ayrinti ? '' : '\n         ' + String(ayrinti).split('\n').join('\n         ')}`); };

async function ucDurum([ornek, ek, kod, olmali, olmamali]) {
  const ad = `${ornek} ${ek.map(e => (path.isAbsolute(e) ? path.basename(e) : e)).join(' ')}`.trim();
  const s = await kos([ORNEK(ornek), ...ek]);
  const eksik = olmali.filter(t => !s.cikti.includes(t)), fazla = olmamali.filter(t => s.cikti.includes(t));
  const tamam = s.kod === kod && !eksik.length && !fazla.length;
  kaydet(ad, tamam, tamam ? '' : `beklenen çıkış ${kod}, gelen ${s.kod}` + (eksik.length ? `\nçıktıda yok: ${eksik.join(' | ')}` : '') + (fazla.length ? `\nçıktıda olmamalıydı: ${fazla.join(' | ')}` : '') + '\n--- çıktı ---\n' + s.cikti.trim().slice(0, 900));
}

// ---- 2b) Dosyalar gerçekten yazılıyor mu? ----
async function dosyaTestleri() {
  // tek sayfalı not: ad.png (numarasız), 1240×1754 × ölçek; kes-yapıştır PDF 1 sayfa; HTML tek parça ve internetsiz
  const p = (ad) => path.join(GECICI, ad);
  let s = await kos([ORNEK('var-olan-resim'), '--png', p('tek.png'), '--olcek', '1', '--pdf', p('tek.pdf'), '--kes', p('tek-kes.pdf'), '--kes-png', p('tek-kes.png'), '--html', p('tek.html')]);
  const b = fs.existsSync(p('tek.png')) && pngBoyutu(p('tek.png'));
  kaydet('dosya: tek sayfalı PNG 1240×1754 (ölçek 1)', s.kod === 0 && b && b[0] === 1240 && b[1] === 1754, s.cikti + ' boyut=' + b);
  kaydet('dosya: PDF 1 sayfa + kes-yapıştır PDF 1 sayfa', s.kod === 0 && fs.existsSync(p('tek.pdf')) && pdfSayfa(p('tek.pdf')) === 1 && pdfSayfa(p('tek-kes.pdf')) === 1, s.cikti);
  const h = fs.existsSync(p('tek.html')) ? fs.readFileSync(p('tek.html'), 'utf8') : '';
  kaydet('dosya: HTML tek parça, dış adres yok, resim gömülü', /data:image\/png;base64,/.test(h) && !/(?:src|href)\s*=\s*["']https?:/i.test(h) && !/@import|url\(\s*["']?https?:/i.test(h), 'HTML denetimi');
  // çok sayfalı not: ad-1.png … ad-N.png; PDF sayfa sayısı = N; varsayılan ölçek 1.6 → 1984×2806
  s = await kos([ORNEK('cok-sayfa'), '--png', p('cok.png'), '--pdf', p('cok.pdf')]);
  const sayfalar = [1, 2, 3, 4, 5].map(i => p(`cok-${i}.png`));
  const b2 = fs.existsSync(sayfalar[0]) && pngBoyutu(sayfalar[0]);
  kaydet('dosya: 5 sayfalı not → cok-1.png … cok-5.png (1984×2806)', s.kod === 0 && sayfalar.every(f => fs.existsSync(f)) && !fs.existsSync(p('cok.png')) && !fs.existsSync(p('cok-6.png')) && b2 && b2[0] === 1984 && b2[1] === 2806, s.cikti);
  kaydet('dosya: 5 sayfalı PDF', s.kod === 0 && pdfSayfa(p('cok.pdf')) === 5, 'PDF sayfa sayısı: ' + (fs.existsSync(p('cok.pdf')) ? pdfSayfa(p('cok.pdf')) : 'dosya yok'));
  // hata olduğunda hiçbir dosya yazılmaz
  s = await kos([ORNEK('bos-blok'), '--png', p('hatali.png'), '--pdf', p('hatali.pdf')]);
  kaydet('dosya: hatalı notta PNG/PDF yazılmaz', s.kod === 1 && !fs.existsSync(p('hatali.png')) && !fs.existsSync(p('hatali.pdf')), s.cikti);
  // başka klasörden çalıştırınca resim depo köküne göre bulunur
  s = await kos([path.join(DEPO, ORNEK('var-olan-resim')), '--kontrol'], GECICI);
  kaydet('dosya: başka klasörden çalıştırınca resim yine bulunur', s.kod === 0 && !s.cikti.includes('resim henüz yok'), s.cikti);
  // boşluklu ve Türkçe karakterli çıktı yolu
  s = await kos([ORNEK('tek-gorsel'), '--png', p('Türkçe klasör/çıktı ş.png'), '--olcek', '0.5']);
  kaydet('dosya: boşluklu ve Türkçe karakterli çıktı yolu', s.kod === 0 && fs.existsSync(p('Türkçe klasör/çıktı ş.png')), s.cikti);
  // geçici HTML dosyası arkada kalmaz
  const kalan = fs.readdirSync(os.tmpdir()).filter(f => /^sketchnote-.*\.html$/.test(f) && !ONCEDEN.has(f));
  kaydet('dosya: geçici HTML arkada kalmıyor', kalan.length === 0, 'kalan: ' + kalan.join(', '));
}

// ---- 3) Gerçek notlar: hatasız derleniyor mu, düzen beklenenle aynı mı? ----
async function gercekNot(dosya) {
  const ad = path.basename(dosya, '.js');
  const imzaYolu = path.join(GECICI, ad + '.imza.json'), beklenenYolu = path.join(BURASI, 'beklenen', ad + '.json');
  const s = await kos([path.join('tools', 'sketchnote', 'notlar', dosya), '--imza', imzaYolu]);
  if (s.kod !== 0) return kaydet(`not: ${ad} hatasız derleniyor`, false, s.cikti);
  const yeni = fs.readFileSync(imzaYolu, 'utf8');
  if (guncelle || !fs.existsSync(beklenenYolu)) {
    fs.mkdirSync(path.dirname(beklenenYolu), { recursive: true }); fs.writeFileSync(beklenenYolu, yeni);
    return kaydet(`not: ${ad} — beklenen düzen ${guncelle ? 'güncellendi' : 'ilk kez yazıldı'}`, true);
  }
  const eski = JSON.parse(fs.readFileSync(beklenenYolu, 'utf8')), simdi = JSON.parse(yeni);
  // Karşılaştırma sayfa sayfa ve boşluklardan bağımsız yapılır: "→", "≠" gibi Kalam yazı tipinde olmayan işaretler
  // bilgisayarın kendi yazı tipiyle çizilir; genişlikleri Windows/Linux'ta farklı olabildiği için bir satırın nerede
  // bölündüğü bilgisayara göre değişebilir. Yazının kendisi, sırası ve hangi sayfada olduğu ise değişmemelidir.
  const duz = (sayfa) => sayfa.join('').replace(/\s+/g, '');
  const farklar = []; let satirFarki = false;
  for (const tur of ['not', 'kes']) {
    const x = eski[tur] || [], y = simdi[tur] || [];
    if (x.length !== y.length) { farklar.push(`${tur}: sayfa sayısı ${x.length} → ${y.length}`); continue; }
    x.forEach((sayfa, i) => {
      if (JSON.stringify(sayfa) === JSON.stringify(y[i])) return;
      if (duz(sayfa) === duz(y[i])) { satirFarki = true; return; }
      const j = sayfa.findIndex((t, k) => t !== y[i][k]);
      farklar.push(`${tur} sayfa ${i + 1}: ${j < 0 ? `satır sayısı ${sayfa.length} → ${y[i].length}` : `"${sayfa[j]}" → "${y[i][j]}"`}`);
    });
  }
  kaydet(`not: ${ad} düzeni beklenenle aynı (${simdi.not.length} sayfa${simdi.kes ? `, kes ${simdi.kes.length}` : ''})${satirFarki ? ' — yalnız satır bölünmesi farklı (yazı tipi farkı)' : ''}`, !farklar.length,
    farklar.slice(0, 6).join('\n') + '\n(değişiklik bilerek yapıldıysa: node tools/sketchnote/test/calistir.mjs --guncelle)');
}

// ---- 4) Tek komutla basım (tools/defter-bas.mjs) ----
const kosBas = (argumanlar) => new Promise((coz) => {
  execFile(process.execPath, [path.join(DEPO, 'tools', 'defter-bas.mjs'), ...argumanlar], { cwd: DEPO, encoding: 'utf8', maxBuffer: 64 << 20 }, (hata, stdout, stderr) => {
    coz({ kod: hata ? (typeof hata.code === 'number' ? hata.code : 1) : 0, cikti: (stdout || '') + (stderr || '') });
  });
});
async function basTestleri() {
  const kok = path.join(GECICI, 'bas'), kayit = path.join(DEPO, 'tools', 'sketchnote', 'yayin.json');
  const kayitOnce = fs.existsSync(kayit) ? fs.readFileSync(kayit, 'utf8') : null;
  // resimsiz (hepsi kodla çizilen) not: doğru klasörlere basılır
  let s = await kosBas(['mat-carpma', '--cikti-kok', kok, '--olcek', '0.5']);
  const beklenen = ['Matematik/DefterNotlari/mat-carpma-1.png', 'Matematik/DefterNotlari/mat-carpma-2.png', 'Matematik/DefterNotlari/mat-carpma-3.png', 'Baski/Matematik/mat-carpma-defter-notu.pdf', 'Baski/Matematik/mat-carpma-kes-yapistir.pdf'];
  kaydet('defter-bas: mat-carpma doğru klasörlere basılıyor', s.kod === 0 && beklenen.every(f => fs.existsSync(path.join(kok, f))), s.cikti);
  // resmi eksik not: portal klasörüne yazmayı reddeder; --taslak ile yalnız Baski/<Ders>/taslak/ altına basar
  s = await kosBas(['fen-miknatislar', '--cikti-kok', kok]);
  if (/resim eksik/.test(s.cikti)) {
    kaydet('defter-bas: resmi eksik not portal klasörüne basılmıyor', s.kod === 1 && !fs.existsSync(path.join(kok, 'Fen', 'DefterNotlari')), s.cikti);
    s = await kosBas(['fen-miknatislar', '--taslak', '--cikti-kok', kok, '--olcek', '0.5']);
    kaydet('defter-bas: --taslak yalnız Baski/Fen/taslak/ altına basıyor', s.kod === 0 && fs.existsSync(path.join(kok, 'Baski', 'Fen', 'taslak', 'fen-miknatislar-1.png')) && !fs.existsSync(path.join(kok, 'Fen', 'DefterNotlari')), s.cikti);
  } else kaydet('defter-bas: fen-miknatislar (resimleri bu bilgisayarda var) basılıyor', s.kod === 0, s.cikti);
  s = await kosBas(['boyle-bir-not-yok']);
  kaydet('defter-bas: olmayan not adı anlaşılır hata veriyor', s.kod === 1 && s.cikti.includes('adında not yok'), s.cikti);
  s = await kosBas([]);
  kaydet('defter-bas: durum tablosu bütün notları listeliyor', s.kod === 0 && ['mat-carpma', 'fen-miknatislar', 'sos-yonler', 'tr-cumle-bilgisi'].every(a => s.cikti.includes(a)), s.cikti);
  const kayitSonra = fs.existsSync(kayit) ? fs.readFileSync(kayit, 'utf8') : null;
  kaydet('defter-bas: test, depodaki basım kaydına (yayin.json) dokunmuyor', kayitOnce === kayitSonra, 'yayin.json değişti');
}

// ---- çalıştır (aynı anda en çok 4 tarayıcı) ----
async function havuz(isler, n = 4) {
  let i = 0; const calis = async () => { while (i < isler.length) await isler[i++](); };
  await Promise.all(Array.from({ length: Math.min(n, isler.length) }, calis));
}
const bas = Date.now();
const gec = (ad) => !suzgec || ad.includes(suzgec);
console.log('Uç durumlar ve komut satırı');
await havuz(UC_DURUMLAR.filter(u => gec(u[0])).map(u => () => ucDurum(u)));
if (!suzgec || 'dosya'.includes(suzgec)) { console.log('Dosya çıktıları'); await dosyaTestleri(); }
if (!hizli) {
  console.log('Gerçek notlar');
  const notlar = fs.readdirSync(path.join(DEPO, 'tools', 'sketchnote', 'notlar')).filter(f => f.endsWith('.js') && gec(f)).sort();
  await havuz(notlar.map(f => () => gercekNot(f)), 3);
  if (!suzgec || 'defter-bas'.includes(suzgec)) { console.log('Tek komutla basım (defter-bas)'); await basTestleri(); }
}
fs.rmSync(GECICI, { recursive: true, force: true });
const kalan = sonuclar.filter(s => !s.tamam);
console.log(`\n${sonuclar.length} testten ${sonuclar.length - kalan.length} geçti, ${kalan.length} kaldı (${Math.round((Date.now() - bas) / 1000)} sn).`);
if (kalan.length) { console.log('Kalanlar:\n' + kalan.map(s => '  - ' + s.ad).join('\n')); process.exit(1); }
