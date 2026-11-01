/**
 * 4/D — Kod.gs içindeki mevcut doGet() fonksiyonu için ÖNERİLEN DEĞİŞİM.
 * Doğrudan Apps Script'e yüklenmemiştir.
 * Aynı projede iki doGet fonksiyonu bırakılmamalıdır.
 * Mevcut diğer Kod.gs yardımcı fonksiyonlarını SİLMEYİN.
 */
function doGet(e) {
  const sayfa = e && e.parameter && e.parameter.sayfa;
  if (sayfa === 'oyun') {
    return HtmlService.createHtmlOutputFromFile('EtkinlikOynat')
      .setTitle('4/D | Matematik Etkinliği');
  }
  return HtmlService.createHtmlOutputFromFile('OgrenciGiris')
    .setTitle('4/D Öğrenci Girişi');
}
/** Sadece izinli sayfa yönlendirmesi; diğer parametreler yok sayılır. */
