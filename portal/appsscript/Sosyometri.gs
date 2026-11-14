/** 4/D öğrenci projesi: Sosyometri ("Sınıf Arkadaşlarım") anketi — oturumla okuma ve cevap kaydı.
 *
 * SOSYOMETRI_TURLARI sayfası (yalnız öğretmen panelinden yazılır):
 *   Kimlik (13 hane) | Baslik | SorularJSON {secim, sorular:[{id, metin, simge}]} | Durum (TASLAK/YAYINDA/ARSIV) | Olusturma
 * SOSYOMETRI sayfası (yalnız bu dosya yazar; her öğrenci ve tur için TEK satır):
 *   Zaman | TurKimlik | OgrenciNo | CevaplarJSON {soruId:[seçilen öğrenci no]} | DuzeltmeSayisi
 *
 * Gizlilik:
 *  - Sınıf listesi yalnız oturumu açık öğrenciye, kendisi ve TEST hesapları çıkarılarak gönderilir.
 *  - Tarayıcıya öğrenci numarası gitmez; her arkadaş için o tura özel, tek yönlü özet (id) gönderilir.
 *  - Öğrenci yalnız kendi cevabını görür; başkasının cevabını okuyan bir öğrenci işlevi YOKTUR.
 *  - Cevap anket açıkken bir kez düzeltilebilir (öğretmenin kararı 2026-11-14).
 */
const SOSYO_TUR_SAYFASI_ = 'SOSYOMETRI_TURLARI';
const SOSYO_CEVAP_SAYFASI_ = 'SOSYOMETRI';
const SOSYO_DUZELTME_HAKKI_ = 1;

function sosyoDurumNormal_(v) {
  return String(v || '').trim().toUpperCase().replace(/̇/g, '')
    .replace(/Ş/g, 'S').replace(/İ/g, 'I').replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/Ç/g, 'C');
}

/** Turun soru tanımını güvenli biçime çevirir; bozuksa null. */
function sosyoTanimOku_(json) {
  let veri;
  try { veri = JSON.parse(String(json || '')); } catch (e) { return null; }
  if (!veri || !Array.isArray(veri.sorular) || !veri.sorular.length || veri.sorular.length > 6) return null;
  const secim = Number(veri.secim);
  if (!Number.isInteger(secim) || secim < 1 || secim > 5) return null;
  const gorulen = {};
  const sorular = [];
  for (let i = 0; i < veri.sorular.length; i++) {
    const s = veri.sorular[i] || {};
    const id = String(s.id || ''), metin = String(s.metin || '').trim();
    if (!/^[a-z]{1,20}$/.test(id) || gorulen[id] || !metin) return null;
    gorulen[id] = true;
    sorular.push({id: id, metin: metin.slice(0, 160), simge: String(s.simge || '').slice(0, 8)});
  }
  return {secim: secim, sorular: sorular};
}

/** Yayındaki en yeni tur (aynı anda tek tur açık olmalı; öğretmen paneli bunu sağlar). */
function sosyoAcikTur_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SOSYO_TUR_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) return null;
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues();
  for (let i = rows.length - 1; i >= 0; i--) {
    const kimlik = String(rows[i][0]).trim();
    if (sosyoDurumNormal_(rows[i][3]) !== 'YAYINDA' || !/^[0-9]{13}$/.test(kimlik)) continue;
    const tanim = sosyoTanimOku_(rows[i][2]);
    // Öğretmenin tur ayrımı için eklenen "(gg.aa.yyyy)" tarihi öğrenciye gösterilmez.
    const baslik = String(rows[i][1]).trim().replace(/\s*\(\d{2}\.\d{2}\.\d{4}\)$/, '').slice(0, 80);
    if (tanim) return {kimlik: kimlik, baslik: baslik || 'Sınıf Arkadaşlarım', secim: tanim.secim, sorular: tanim.sorular};
  }
  return null;
}

/** Sınıf listesi: TEST hesapları ve numarası iki kez geçen satırlar çıkarılır. Yalnız sunucuda kullanılır. */
function sosyoSinifListesi_() {
  const sh = kayitSayfasi_();
  if (sh.getLastRow() < 2) return [];
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues();
  const sayi = {};
  rows.forEach(function (r) { const no = String(r[0]).trim(); if (no) sayi[no] = (sayi[no] || 0) + 1; });
  return rows.filter(function (r) {
    const no = String(r[0]).trim();
    return no && sayi[no] === 1 && String(r[1]).trim() && String(r[3]).trim().toUpperCase() !== 'TEST';
  }).map(function (r) { return {no: String(r[0]).trim(), ad: String(r[1]).trim().slice(0, 60)}; });
}

/** Tarayıcıya giden arkadaş kimliği: tura özel tek yönlü özet; numaraya geri çevrilemez. */
function sosyoArkadasKimligi_(turKimlik, no) {
  return ozet_('4d-sosyometri|' + turKimlik + '|' + no).slice(0, 16);
}

/** Öğrencinin seçebileceği arkadaşlar (kendisi hariç), id -> no eşlemesiyle. */
function sosyoArkadaslar_(tur, benimNo) {
  const liste = sosyoSinifListesi_().filter(function (o) { return o.no !== String(benimNo); })
    .sort(function (a, b) { return a.ad.localeCompare(b.ad, 'tr'); });
  const noIle = {};
  const arkadaslar = liste.map(function (o) {
    const id = sosyoArkadasKimligi_(tur.kimlik, o.no);
    noIle[id] = o.no;
    return {id: id, ad: o.ad};
  });
  return {arkadaslar: arkadaslar, noIle: noIle};
}

function sosyoCevapSayfasi_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SOSYO_CEVAP_SAYFASI_);
  if (!sh) {
    sh = ss.insertSheet(SOSYO_CEVAP_SAYFASI_);
    sh.appendRow(['Zaman', 'TurKimlik', 'OgrenciNo', 'CevaplarJSON', 'DuzeltmeSayisi']);
  }
  return sh;
}

/** Öğrencinin bu turdaki satırı: {satir, cevap, duzeltme} ya da null. */
function sosyoBenimSatirim_(turKimlik, no) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SOSYO_CEVAP_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) return null;
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 5).getDisplayValues();
  for (let i = rows.length - 1; i >= 0; i--) {
    if (String(rows[i][1]).trim() !== turKimlik || String(rows[i][2]).trim() !== String(no)) continue;
    let cevap = null;
    try { cevap = JSON.parse(String(rows[i][3])); } catch (e) { cevap = null; }
    return {satir: i + 2, cevap: cevap, duzeltme: Math.max(0, Number(rows[i][4]) || 0)};
  }
  return null;
}

/** Cevabı doğrular: her soruda tam `secim` kadar, birbirinden farklı, listede olan arkadaş. */
function sosyoCevapDogrula_(tur, noIle, cevaplar) {
  if (!cevaplar || typeof cevaplar !== 'object' || Array.isArray(cevaplar)) return null;
  const gereken = Math.min(tur.secim, Object.keys(noIle).length);
  if (gereken < 1) return null;
  const temiz = {};
  for (let i = 0; i < tur.sorular.length; i++) {
    const s = tur.sorular[i], c = cevaplar[s.id];
    if (!Array.isArray(c) || c.length !== gereken) return null;
    if (c.some(function (x) { return typeof x !== 'string' || !Object.prototype.hasOwnProperty.call(noIle, x); })) return null;
    if (new Set(c).size !== c.length) return null;
    temiz[s.id] = c.map(function (x) { return noIle[x]; });
  }
  if (Object.keys(cevaplar).some(function (k) { return !tur.sorular.some(function (s) { return s.id === k; }); })) return null;
  return temiz;
}

/** Oturumu açık öğrenciye açık turu, seçebileceği arkadaşları ve KENDİ cevabını gönderir. */
function ogrenciSosyometri(token) {
  if (!oturumTokenGecerliBicimdeMi_(token)) return {basarili: false};
  const oturum = oturumKaydi_(token);
  const ogrenci = oturum ? kayitNoIle_(oturum.no) : null;
  if (!ogrenci) return {basarili: false};
  const tur = sosyoAcikTur_();
  if (!tur) return {basarili: true, acik: false};
  const a = sosyoArkadaslar_(tur, ogrenci.no);
  if (!a.arkadaslar.length) return {basarili: true, acik: false};
  const kayit = sosyoBenimSatirim_(tur.kimlik, ogrenci.no);
  let cevap = null;
  if (kayit && kayit.cevap) {
    const idIle = {};
    Object.keys(a.noIle).forEach(function (id) { idIle[a.noIle[id]] = id; });
    cevap = {};
    tur.sorular.forEach(function (s) {
      cevap[s.id] = (Array.isArray(kayit.cevap[s.id]) ? kayit.cevap[s.id] : [])
        .map(function (no) { return idIle[String(no)]; }).filter(Boolean);
    });
  }
  return {
    basarili: true, acik: true,
    tur: {kimlik: tur.kimlik, baslik: tur.baslik},
    secim: Math.min(tur.secim, a.arkadaslar.length),
    sorular: tur.sorular,
    arkadaslar: a.arkadaslar,
    cevapladi: !!kayit,
    cevap: cevap,
    duzeltebilir: !kayit || kayit.duzeltme < SOSYO_DUZELTME_HAKKI_
  };
}

/** Cevabı oturumla kaydeder. İlk cevap yeni satır; düzeltme aynı satırın üzerine yazılır (bir kez). */
function sosyometriCevapla(token, turKimlik, cevaplar) {
  const kimlik = String(turKimlik || '');
  if (!oturumTokenGecerliBicimdeMi_(token) || !/^[0-9]{13}$/.test(kimlik)) return {basarili: false, mesaj: 'Anket bulunamadı.'};
  const oturum = oturumKaydi_(token);
  const ogrenci = oturum ? kayitNoIle_(oturum.no) : null;
  if (!ogrenci) return {basarili: false, mesaj: 'Oturum kapanmış. Yeniden giriş yap.'};
  const tur = sosyoAcikTur_();
  if (!tur || tur.kimlik !== kimlik) return {basarili: false, mesaj: 'Bu anket artık açık değil.'};
  const a = sosyoArkadaslar_(tur, ogrenci.no);
  const temiz = sosyoCevapDogrula_(tur, a.noIle, cevaplar);
  if (!temiz) return {basarili: false, mesaj: 'Her soruda ' + Math.min(tur.secim, a.arkadaslar.length) + ' arkadaşını seç.'};
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return {basarili: false, mesaj: 'Sistem meşgul. Tekrar dene.'};
  try {
    const sh = sosyoCevapSayfasi_();
    const kayit = sosyoBenimSatirim_(kimlik, ogrenci.no);
    if (!kayit) {
      // Sayı gibi görünen kimliklerin metin kalması için başına ' konur.
      sh.appendRow([new Date(), "'" + kimlik, "'" + String(ogrenci.no), JSON.stringify(temiz), 0]);
      return {basarili: true, duzeltebilir: true};
    }
    if (kayit.duzeltme >= SOSYO_DUZELTME_HAKKI_) {
      return {basarili: false, mesaj: 'Cevabını daha önce değiştirdin. Artık değiştiremezsin.'};
    }
    sh.getRange(kayit.satir, 1).setValue(new Date());
    sh.getRange(kayit.satir, 4, 1, 2).setValues([[JSON.stringify(temiz), kayit.duzeltme + 1]]);
    return {basarili: true, duzeltebilir: kayit.duzeltme + 1 < SOSYO_DUZELTME_HAKKI_};
  } finally {
    lock.releaseLock();
  }
}
