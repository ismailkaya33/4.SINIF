/** 4/D öğrenci projesi: yayındaki anketleri okuma ve oturumla cevap kaydetme.
 *
 * ANKETLER sayfası (öğretmen panelinden doldurulur):
 *   Kimlik | Baslik | SorularJSON | Durum (TASLAK/YAYINDA/ARSIV) | BitisTarihi
 * ANKET_CEVAPLARI sayfası (yalnız bu dosya yazar):
 *   Zaman | AnketKimlik | OgrenciNo | CevaplarJSON
 *
 * Soru biçimi: {id, metin, tip:'tek'|'coklu', enFazla?, secenekler:[{id,ad,simge}]}
 *   veya bağlı soru: {id, metin, tip:'tek', bagli:'s1', gruplar:{<s1 cevabı>:[secenekler]}}
 *   Bağlı sorunun önceki cevaba ait grubu yoksa soru atlanır.
 * Her öğrenci bir ankete bir kez cevap verir. Öğrenci kodu/adı cevaba yazılmaz; yalnız öğrenci no.
 */
const ANKET_SAYFASI_ = 'ANKETLER';
const ANKET_CEVAP_SAYFASI_ = 'ANKET_CEVAPLARI';

function anketDurumuNormal_(v) {
  return String(v || '').trim().toUpperCase().replace(/̇/g, '')
    .replace(/Ş/g, 'S').replace(/İ/g, 'I').replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/Ç/g, 'C');
}

const ANKET_KIMLIK_ = /^[a-z0-9-]{1,40}$/;

/** Sayfadaki JSON'u güvenli bir soru listesine çevirir; bozuksa null. */
function anketSorulariniOku_(json) {
  let veri;
  try { veri = JSON.parse(String(json || '')); } catch (e) { return null; }
  const sorular = veri && Array.isArray(veri.sorular) ? veri.sorular : null;
  if (!sorular || !sorular.length || sorular.length > 10) return null;
  const secenekTemizle = function (liste) {
    if (!Array.isArray(liste) || liste.length < 2 || liste.length > 12) return null;
    const temiz = liste.map(function (s) {
      return s && ANKET_KIMLIK_.test(String(s.id)) && String(s.ad || '').trim()
        ? {id: String(s.id), ad: String(s.ad).slice(0, 80), simge: String(s.simge || '').slice(0, 8)} : null;
    });
    if (temiz.some(function (x) { return !x; })) return null;
    if (new Set(temiz.map(function (x) { return x.id; })).size !== temiz.length) return null;
    return temiz;
  };
  const gorulen = {};
  const sonuc = [];
  for (let i = 0; i < sorular.length; i++) {
    const s = sorular[i] || {};
    const id = String(s.id || ''), metin = String(s.metin || '').trim();
    if (!ANKET_KIMLIK_.test(id) || gorulen[id] || !metin) return null;
    const tip = s.tip === 'coklu' ? 'coklu' : 'tek';
    const soru = {id: id, metin: metin.slice(0, 160), tip: tip};
    if (tip === 'coklu') soru.enFazla = Math.max(1, Math.min(5, Number(s.enFazla) || 2));
    if (s.bagli) {
      if (!gorulen[s.bagli] || tip !== 'tek' || !s.gruplar || typeof s.gruplar !== 'object') return null;
      soru.bagli = String(s.bagli);
      soru.gruplar = {};
      const anahtarlar = Object.keys(s.gruplar);
      if (!anahtarlar.length || anahtarlar.length > 12) return null;
      for (let j = 0; j < anahtarlar.length; j++) {
        const g = secenekTemizle(s.gruplar[anahtarlar[j]]);
        if (!g || !ANKET_KIMLIK_.test(anahtarlar[j])) return null;
        soru.gruplar[anahtarlar[j]] = g;
      }
    } else {
      soru.secenekler = secenekTemizle(s.secenekler);
      if (!soru.secenekler) return null;
    }
    gorulen[id] = true;
    sonuc.push(soru);
  }
  return sonuc;
}

/** Öğrencinin cevaplarını soru tanımına göre doğrular; geçerliyse temiz nesne döner. */
function anketCevabiDogrula_(sorular, cevaplar) {
  if (!cevaplar || typeof cevaplar !== 'object' || Array.isArray(cevaplar)) return null;
  const temiz = {};
  for (let i = 0; i < sorular.length; i++) {
    const s = sorular[i];
    let secenekler = s.secenekler;
    if (s.bagli) {
      secenekler = s.gruplar[temiz[s.bagli]];
      if (!secenekler) { if (cevaplar[s.id] !== undefined && cevaplar[s.id] !== null) return null; continue; }
    }
    const izinli = {};
    secenekler.forEach(function (x) { izinli[x.id] = true; });
    const c = cevaplar[s.id];
    if (s.tip === 'coklu') {
      if (!Array.isArray(c) || !c.length || c.length > s.enFazla) return null;
      if (new Set(c).size !== c.length || c.some(function (x) { return !izinli[x]; })) return null;
      temiz[s.id] = c.map(String);
    } else {
      if (typeof c !== 'string' || !izinli[c]) return null;
      temiz[s.id] = c;
    }
  }
  const fazla = Object.keys(cevaplar).filter(function (k) { return !sorular.some(function (s) { return s.id === k; }); });
  if (fazla.length) return null;
  return temiz;
}

function yayindakiAnketler_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ANKET_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) return [];
  const now = Date.now();
  return sh.getRange(2, 1, sh.getLastRow() - 1, 5).getValues()
    .filter(function (r) { return anketDurumuNormal_(r[3]) === 'YAYINDA'; })
    .filter(function (r) { return !r[4] || (r[4] instanceof Date && Number.isFinite(r[4].getTime()) && r[4].getTime() >= now); })
    .map(function (r) {
      return {kimlik: String(r[0]).trim(), baslik: String(r[1]).slice(0, 120), sorular: anketSorulariniOku_(r[2])};
    })
    .filter(function (a) { return /^[0-9]{13}$/.test(a.kimlik) && a.sorular; });
}

function anketCevapVerenler_(ogrenciNo) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ANKET_CEVAP_SAYFASI_);
  const cevaplanan = {};
  if (!sh || sh.getLastRow() < 2) return cevaplanan;
  sh.getRange(2, 2, sh.getLastRow() - 1, 2).getDisplayValues().forEach(function (r) {
    if (String(r[1]).trim() === String(ogrenciNo)) cevaplanan[String(r[0]).trim()] = true;
  });
  return cevaplanan;
}

/** Oturumu açık öğrenciye, henüz cevaplamadığı yayındaki anketleri gönderir. */
function ogrenciAnketleri(token) {
  const oturum = oturumKaydi_(token);
  if (!oturum || !kayitNoIle_(oturum.no)) return {basarili: false, anketler: []};
  const cevaplanan = anketCevapVerenler_(oturum.no);
  const anketler = yayindakiAnketler_().filter(function (a) { return !cevaplanan[a.kimlik]; }).slice(0, 3);
  return {basarili: true, anketler: anketler};
}

/** Cevabı oturumla kaydeder. Aynı ankete ikinci cevap kabul edilmez. */
function anketCevapla(token, kimlik, cevaplar) {
  const anketId = String(kimlik || '');
  if (!/^[0-9]{13}$/.test(anketId)) return {basarili: false, mesaj: 'Anket bulunamadı.'};
  const oturum = oturumKaydi_(token);
  if (!oturum || !kayitNoIle_(oturum.no)) return {basarili: false, mesaj: 'Oturum kapanmış. Yeniden giriş yap.'};
  const anket = yayindakiAnketler_().filter(function (a) { return a.kimlik === anketId; })[0];
  if (!anket) return {basarili: false, mesaj: 'Bu anket artık açık değil.'};
  const temiz = anketCevabiDogrula_(anket.sorular, cevaplar);
  if (!temiz) return {basarili: false, mesaj: 'Lütfen bütün soruları cevapla.'};
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return {basarili: false, mesaj: 'Sistem meşgul. Tekrar dene.'};
  try {
    if (anketCevapVerenler_(oturum.no)[anketId]) return {basarili: true, zatenVar: true};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(ANKET_CEVAP_SAYFASI_);
    if (!sh) {
      sh = ss.insertSheet(ANKET_CEVAP_SAYFASI_);
      sh.appendRow(['Zaman', 'AnketKimlik', 'OgrenciNo', 'CevaplarJSON']);
    }
    // Sayı gibi görünen kimliklerin metin kalması için başına ' konur.
    sh.appendRow([new Date(), "'" + anketId, "'" + String(oturum.no), JSON.stringify(temiz)]);
    return {basarili: true};
  } finally {
    lock.releaseLock();
  }
}
