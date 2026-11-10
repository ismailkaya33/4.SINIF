/** 4/D AYRI öğretmen raporu projesine eklenir. Öğrenci projesine EKLENMEZ.
 * Anketler: hazır şablondan TASLAK ekleme, yayımlama/arşivleme, sonuç özeti.
 * Yeni anket şablonu eklemek için ANKET_SABLONLARI_ listesine bir nesne eklenir.
 */
const OGRETMEN_ANKET_SAYFASI_ = 'ANKETLER';
const OGRETMEN_ANKET_CEVAP_SAYFASI_ = 'ANKET_CEVAPLARI';

const ANKET_DERSLERI_ = [
  {id: 'tr', ad: 'Türkçe', simge: '📖'},
  {id: 'mat', ad: 'Matematik', simge: '🔢'},
  {id: 'fen', ad: 'Fen Bilimleri', simge: '🔬'},
  {id: 'sos', ad: 'Sosyal Bilgiler', simge: '🌍'},
  {id: 'ih', ad: 'İnsan Hakları', simge: '🤝'},
  {id: 'trf', ad: 'Trafik Güvenliği', simge: '🚦'}
];

// Konular: 2026-11-10 itibarıyla işlenmiş konular (portal etkinlikleri + yıllık plan).
const ANKET_KONULARI_ = {
  tr: [
    {id: 'tr-anlam', ad: 'Eş sesli, eş ve zıt anlamlı kelimeler', simge: '🔤'},
    {id: 'tr-mecaz', ad: 'Gerçek, mecaz ve terim anlam', simge: '💭'},
    {id: 'tr-anafikir', ad: 'Metnin konusu ve ana fikri', simge: '💡'},
    {id: 'tr-hikaye', ad: 'Hikâye unsurları, metnin bölümleri', simge: '📚'},
    {id: 'tr-yazim', ad: 'Noktalama ve yazım kuralları', simge: '✏️'},
    {id: 'tr-soz', ad: 'Atasözü, deyim, ikileme, pekiştirme', simge: '🗣️'}
  ],
  mat: [
    {id: 'mat-basamak', ad: 'Basamaklar, sayıları okuma-yazma', simge: '🔢'},
    {id: 'mat-sirala', ad: 'Sayıları karşılaştırma ve sıralama', simge: '⚖️'},
    {id: 'mat-yuvarla', ad: 'Yuvarlama', simge: '🎯'},
    {id: 'mat-oruntu', ad: 'Sayı örüntüleri', simge: '🔁'},
    {id: 'mat-toplama', ad: 'Toplama ve zihinden toplama', simge: '➕'},
    {id: 'mat-cikarma', ad: 'Çıkarma ve zihinden çıkarma', simge: '➖'},
    {id: 'mat-problem', ad: 'Problem çözme', simge: '🧩'}
  ],
  fen: [
    {id: 'fen-kayac', ad: 'Kayaçlar ve madenler', simge: '🪨'},
    {id: 'fen-fosil', ad: 'Fosiller', simge: '🦴'},
    {id: 'fen-dunya', ad: 'Dünya\'nın dönmesi ve dolanması', simge: '🌍'},
    {id: 'fen-gece', ad: 'Gece-gündüz, gün ve yıl', simge: '🌙'},
    {id: 'fen-besin', ad: 'Besinler ve besin içerikleri', simge: '🥕'},
    {id: 'fen-beslenme', ad: 'Sağlıklı ve dengeli beslenme', simge: '🥗'}
  ],
  sos: [
    {id: 'sos-kimlik', ad: 'Kimliğim ve hayatımdaki olaylar', simge: '🪪'},
    {id: 'sos-ilgi', ad: 'İlgi, ihtiyaç ve yeteneklerim', simge: '⭐'},
    {id: 'sos-saygi', ad: 'Farklılıklara saygı, empati', simge: '💞'},
    {id: 'sos-aile', ad: 'Aile tarihi', simge: '👨‍👩‍👧'},
    {id: 'sos-kultur', ad: 'Millî kültür ve çocuk oyunları', simge: '🎎'},
    {id: 'sos-mucadele', ad: 'Millî Mücadele ve kahramanları', simge: '🇹🇷'}
  ],
  ih: [
    {id: 'ih-insan', ad: 'İnsan olmanın nitelikleri', simge: '🧑'},
    {id: 'ih-haklar', ad: 'Doğuştan gelen haklarımız', simge: '📜'},
    {id: 'ih-cocuk', ad: 'Çocuk ve yetişkin farkları', simge: '🧒'},
    {id: 'ih-sorumluluk', ad: 'Hak, özgürlük ve sorumluluk', simge: '⚖️'},
    {id: 'ih-yasanti', ad: 'Farklı çocukların yaşantıları', simge: '🌐'}
  ],
  trf: [
    {id: 'trf-kavram', ad: 'Trafikle ilgili temel kavramlar', simge: '🚗'},
    {id: 'trf-isaret', ad: 'Trafik işaretleri ve levhalar', simge: '⚠️'},
    {id: 'trf-yaya', ad: 'Yaya olarak trafik kuralları', simge: '🚶'},
    {id: 'trf-yol', ad: 'Güvenli yollar', simge: '🛣️'}
  ]
};

function anketDersleriArti_(son) {
  return ANKET_DERSLERI_.concat([son]);
}

const ANKET_SABLONLARI_ = [
  {
    id: 'dersler-ve-oyunlar',
    baslik: 'Dersler ve Oyunlar Anketi',
    aciklama: 'Zorlanılan ders ve konu, yeni oyun isteği, sevilen oyun türleri (4 soru).',
    sorular: [
      {id: 's1', metin: 'En çok zorlandığın ders hangisi?', tip: 'tek',
        secenekler: anketDersleriArti_({id: 'yok', ad: 'Hiçbirinde zorlanmıyorum', simge: '😎'})},
      {id: 's2', metin: 'O derste en zor gelen konu hangisi?', tip: 'tek', bagli: 's1', gruplar: ANKET_KONULARI_},
      {id: 's3', metin: 'Hangi derste yeni bir oyun istersin?', tip: 'tek',
        secenekler: anketDersleriArti_({id: 'farketmez', ad: 'Fark etmez, hepsi olur', simge: '🎲'})},
      {id: 's4', metin: 'Hangi tür oyunları seviyorsun? (En çok 2 tane seç)', tip: 'coklu', enFazla: 2,
        secenekler: [
          {id: 'yarisma', ad: 'Bilgi yarışması', simge: '🏆'},
          {id: 'eslestirme', ad: 'Eşleştirme', simge: '🃏'},
          {id: 'bulmaca', ad: 'Bulmaca', simge: '🧩'},
          {id: 'macera', ad: 'Hikâyeli macera', simge: '🗺️'},
          {id: 'hiz', ad: 'Hız oyunu', simge: '⚡'},
          {id: 'surukle', ad: 'Sürükle-bırak', simge: '🖐️'}
        ]}
    ]
  }
];

function ogretmenAnketTablosu_() {
  const id = PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if (!id) throw Error('OZEL_TABLO_ID yok.');
  return SpreadsheetApp.openById(id);
}

function ogretmenAnketDurumu_(v) {
  return String(v || '').trim().toUpperCase().replace(/̇/g, '')
    .replace(/Ş/g, 'S').replace(/İ/g, 'I').replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/Ç/g, 'C');
}

/** Panelde "Hazır anketler" listesi. */
function ogretmenHazirAnketleri() {
  return ANKET_SABLONLARI_.map(function (s) { return {id: s.id, baslik: s.baslik, aciklama: s.aciklama}; });
}

/** Hazır şablonu TASLAK olarak ekler. Öğrenciler, öğretmen "Yayımla" diyene kadar görmez. */
function ogretmenHazirAnketEkle(sablonId) {
  const sablon = ANKET_SABLONLARI_.filter(function (s) { return s.id === String(sablonId || ''); })[0];
  if (!sablon) throw Error('Hazır anket bulunamadı.');
  const ss = ogretmenAnketTablosu_();
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    let sh = ss.getSheetByName(OGRETMEN_ANKET_SAYFASI_);
    if (!sh) sh = ss.insertSheet(OGRETMEN_ANKET_SAYFASI_);
    if (sh.getLastRow() === 0) sh.appendRow(['Kimlik', 'Baslik', 'SorularJSON', 'Durum', 'BitisTarihi']);
    const last = sh.getLastRow(), previous = last > 1 ? Number(sh.getRange(last, 1).getValue()) : 0;
    const next = Math.max(Date.now(), Number.isSafeInteger(previous) ? previous + 1 : 0);
    sh.appendRow([next, sablon.baslik, JSON.stringify({sablon: sablon.id, sorular: sablon.sorular}), 'TASLAK', '']);
    return {basarili: true, durum: 'TASLAK'};
  } finally { lock.releaseLock(); }
}

function ogretmenAnketDurumDegistir(kimlik, durum) {
  const hedef = String(kimlik || ''), yeni = String(durum || '').toUpperCase();
  if (!/^[0-9]{13}$/.test(hedef) || !['TASLAK', 'YAYINDA', 'ARSIV'].includes(yeni)) throw Error('Anket veya durum geçersiz.');
  const sh = ogretmenAnketTablosu_().getSheetByName(OGRETMEN_ANKET_SAYFASI_);
  if (!sh) throw Error('ANKETLER sayfası bulunamadı.');
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const n = sh.getLastRow() - 1; if (n < 1) throw Error('Anket bulunamadı.');
    const keys = sh.getRange(2, 1, n, 1).getDisplayValues();
    const i = keys.findIndex(function (r) { return String(r[0]).trim() === hedef; });
    if (i < 0) throw Error('Anket bulunamadı.');
    sh.getRange(i + 2, 4).setValue(yeni);
    return {basarili: true, durum: yeni};
  } finally { lock.releaseLock(); }
}

/** Anketler + sonuç özeti. TEST (misafir) öğrencilerin cevapları sayılmaz. */
function ogretmenAnketListesi() {
  const ss = ogretmenAnketTablosu_();
  const sh = ss.getSheetByName(OGRETMEN_ANKET_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) return {anketler: [], ogrenciSayisi: 0};
  const kayit = ss.getSheetByName('Sayfa1');
  const roster = {};
  (kayit && kayit.getLastRow() > 1 ? kayit.getRange(2, 1, kayit.getLastRow() - 1, 4).getDisplayValues() : []).forEach(function (r) {
    const no = String(r[0]).trim();
    if (no && String(r[3]).trim().toUpperCase() !== 'TEST') roster[no] = String(r[1]).trim();
  });
  const cevapSh = ss.getSheetByName(OGRETMEN_ANKET_CEVAP_SAYFASI_);
  const cevapRows = cevapSh && cevapSh.getLastRow() > 1 ? cevapSh.getRange(2, 1, cevapSh.getLastRow() - 1, 4).getDisplayValues() : [];
  const ogrenciSayisi = Object.keys(roster).length;
  let arsivSayisi = 0;
  const anketler = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues().reverse().filter(function (r) {
    return ogretmenAnketDurumu_(r[3]) !== 'ARSIV' || ++arsivSayisi <= 20;
  }).map(function (r) {
    const kimlik = String(r[0]).trim();
    let tanim = null;
    try { tanim = JSON.parse(String(r[2])); } catch (e) { tanim = null; }
    const sorular = tanim && Array.isArray(tanim.sorular) ? tanim.sorular : [];
    const cevaplar = {};
    cevapRows.forEach(function (c) {
      const no = String(c[2]).trim();
      if (String(c[1]).trim() !== kimlik || !roster[no] || cevaplar[no]) return;
      try { cevaplar[no] = JSON.parse(String(c[3])); } catch (e) { /* bozuk satır atlanır */ }
    });
    const cevaplayanlar = Object.keys(cevaplar);
    const ozet = sorular.map(function (s) {
      const seceneklerHepsi = s.bagli
        ? Object.keys(s.gruplar || {}).reduce(function (a, k) {
          return a.concat((s.gruplar[k] || []).map(function (x) { return {id: x.id, ad: x.ad, simge: x.simge, grup: k}; }));
        }, [])
        : (s.secenekler || []);
      const sayim = seceneklerHepsi.map(function (x) {
        const kimler = cevaplayanlar.filter(function (no) {
          const c = cevaplar[no][s.id];
          return Array.isArray(c) ? c.indexOf(x.id) >= 0 : c === x.id;
        }).map(function (no) { return roster[no]; }).sort(function (a, b) { return a.localeCompare(b, 'tr'); });
        return {id: x.id, ad: x.ad, simge: x.simge || '', grup: x.grup || '', sayi: kimler.length, kimler: kimler};
      });
      return {id: s.id, metin: s.metin, tip: s.tip, bagli: s.bagli || '', cevapSayisi: cevaplayanlar.filter(function (no) { return cevaplar[no][s.id] !== undefined; }).length, secenekler: sayim};
    });
    const bekleyenler = Object.keys(roster).filter(function (no) { return !cevaplar[no]; })
      .map(function (no) { return roster[no]; }).sort(function (a, b) { return a.localeCompare(b, 'tr'); });
    return {kimlik: kimlik, baslik: String(r[1]), durum: ogretmenAnketDurumu_(r[3]), cevapSayisi: cevaplayanlar.length,
      bekleyenler: bekleyenler, sorular: ozet};
  });
  return {anketler: anketler, ogrenciSayisi: ogrenciSayisi, dersler: ANKET_DERSLERI_};
}
