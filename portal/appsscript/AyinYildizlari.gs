/** 4/D öğrenci projesi: "Ayın Yıldızları" (ayın ilk üçü + ayın en çok gelişeni) OKUMA.
 *
 * Tablo sayfası: AYIN_YILDIZLARI (öğretmen her ay yapıştırır; GitHub'a yazılmaz).
 * Sütunlar (1. satır başlık):
 *  A Ay       "2026-10 Ekim"
 *  B Ödül     1 / 2 / 3 / GELİŞEN
 *  C Öğrenci  Portalda görünecek ad (ör. "RENAS A.")
 *  D Not      İsteğe bağlı kısa açıklama (boş bırakılabilir)
 *  E Kayıt adı Portal kaydındaki tam ad (yalnız "bu sensin" işareti için; tarayıcıya GÖNDERİLMEZ)
 *  F Durum    YAYINDA / TASLAK (yalnız YAYINDA görünür)
 * Not: veliRaporAdNormal_ VeliRaporu.gs içindedir.
 */
const YILDIZ_SAYFASI_ = 'AYIN_YILDIZLARI';
const YILDIZ_ODULLER_ = {'1': 1, '2': 2, '3': 3, 'GELISEN': 4};

function ogrenciAyinYildizlari(token) {
  const oturum = oturumKaydi_(token);
  const ogrenci = oturum ? kayitNoIle_(oturum.no) : null;
  if (!ogrenci) return {basarili: false, aylar: []};
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(YILDIZ_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) return {basarili: true, aylar: []};
  const benim = veliRaporAdNormal_(ogrenci.ad);
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 6).getDisplayValues();
  const aylar = {};
  rows.forEach(r => {
    const ay = String(r[0]).trim();
    const odul = veliRaporAdNormal_(r[1]).replace(/\s|\./g, '');
    const ad = String(r[2]).trim();
    if (!ay || !ad || !YILDIZ_ODULLER_[odul] || veliRaporAdNormal_(r[5]).replace(/\s/g, '') !== 'YAYINDA') return;
    (aylar[ay] = aylar[ay] || []).push({
      sira: YILDIZ_ODULLER_[odul],
      ad: ad.slice(0, 40),
      not: String(r[3]).trim().slice(0, 80),
      ben: !!benim && veliRaporAdNormal_(r[4]) === benim
    });
  });
  const liste = Object.keys(aylar).sort((a, b) => b.localeCompare(a)).slice(0, 12)
    .map(ay => ({ay: ay.slice(0, 40), yildizlar: aylar[ay].sort((a, b) => a.sira - b.sira).slice(0, 8)}));
  return {basarili: true, aylar: liste};
}
