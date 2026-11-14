/** 4/D öğrenci projesi: veli onay formundaki "Onaylamıyorum" cevaplarının portalda uygulanması (KVKK).
 *
 * VELI_ONAYLARI sayfası (öğretmen panelindeki "Onay tablosunu hazırla" düğmesi açar; öğretmen elle doldurur):
 *   A OgrenciNo | B Ad (yalnız öğretmen için) | C Portal | D Sosyometri | E DavranisRaporu | F AyinYildizlari | G Not
 * Değerler: EVET / HAYIR (boş = form henüz gelmedi). "HAYIR" olan alan o öğrenci için uygulanmaz:
 *   Sosyometri     → listede görünmez, ankete katılamaz, sonuçlara girmez
 *   DavranisRaporu → aylık rapor portalda gösterilmez
 *   AyinYildizlari → adı Ayın Yıldızları listesinde görünmez
 *   Portal         → giriş kodu verilmez (öğretmen kodu kaldırır); burada ayrıca denetlenmez
 */
const VELI_ONAY_SAYFASI_ = 'VELI_ONAYLARI';
const VELI_ONAY_ALANLARI_ = {Portal: 2, Sosyometri: 3, DavranisRaporu: 4, AyinYildizlari: 5};

/** "hayır", "Hayir", "HAYIR", "H" aynı sayılır; "evet", "E" aynı sayılır; başka her şey boş. */
function veliOnayDegeri_(v) {
  const s = String(v || '').trim().toUpperCase().split('İ').join('I');
  if (s === 'HAYIR' || s === 'H') return 'HAYIR';
  if (s === 'EVET' || s === 'E') return 'EVET';
  return '';
}

/** {no: {Portal:'EVET'|'HAYIR'|'', ...}} — sayfa yoksa boş nesne. Bir çalıştırmada bir kez okunur. */
let veliOnayOnbellek_ = null;
function veliOnaylari_() {
  if (veliOnayOnbellek_) return veliOnayOnbellek_;
  const sonuc = {};
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VELI_ONAY_SAYFASI_);
  if (sh && sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 6).getDisplayValues().forEach(function (r) {
      const no = String(r[0]).replace(/^'/, '').trim();
      if (!no) return;
      const kayit = {};
      Object.keys(VELI_ONAY_ALANLARI_).forEach(function (k) { kayit[k] = veliOnayDegeri_(r[VELI_ONAY_ALANLARI_[k]]); });
      sonuc[no] = kayit;
    });
  }
  veliOnayOnbellek_ = sonuc;
  return sonuc;
}

/** Velinin bu alan için açıkça "HAYIR" dediği öğrenci mi? */
function veliOnayiYok_(no, alan) {
  const k = veliOnaylari_()[String(no || '').trim()];
  return !!k && k[alan] === 'HAYIR';
}
