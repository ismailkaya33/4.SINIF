/** 4/D Öğrenci Portalı — E-Tabloya bağlı Apps Script. */
const GIRIS_SAYFA_ADI = 'Sayfa1';
const OTURUM_SAYFA_ADI = 'OTURUMLAR';
const OTURUM_MILISANIYE = 7 * 24 * 60 * 60 * 1000;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('OgrenciGiris')
    .setTitle('4/D Öğrenci Girişi');
}

function kayitSayfasi_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sayfa = ss.getSheetByName(GIRIS_SAYFA_ADI);
  if (!sayfa) throw new Error('Öğrenci kayıt sayfası bulunamadı.');
  return sayfa;
}

function kayitBul_(kod) {
  const sayfa = kayitSayfasi_();
  const sonSatir = sayfa.getLastRow();
  if (sonSatir < 2) return null;
  const rows = sayfa.getRange(2, 1, sonSatir - 1, 4).getDisplayValues();
  for (const [no, ad, girisKodu, tur] of rows) {
    if (String(girisKodu).trim().toUpperCase() === kod) {
      return {
        no: String(no).trim(),
        ad: String(ad).trim(),
        misafir: String(tur).trim().toUpperCase() === 'TEST'
      };
    }
  }
  return null;
}

function ozet_(metin) {
  return Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    metin,
    Utilities.Charset.UTF_8
  ).map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
}

// Önceki deneme fonksiyonu ogrenciGirisiTest bilerek kaldırıldı.
// Giriş için tek API: ogrenciGirisiYap(kod).
