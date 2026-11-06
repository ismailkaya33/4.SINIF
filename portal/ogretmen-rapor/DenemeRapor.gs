const DENEME1_KONULAR = ["Metinden bilgi bulma", "Ana fikir", "Metinden çıkarım", "Cümlede anlam", "Kurallı cümle oluşturma", "Sözcüğün bağlamdaki anlamı", "Zıt anlamlı sözcükler", "Bilgilendirici metin", "Eş anlamlı sözcükler", "Deyimler", "Eş sesli sözcükler", "Yabancı sözcüklerin Türkçe karşılıkları", "Noktalama işaretleri", "Grafik yorumlama", "Hikâye unsurları", "Doğal sayıları çözümleme", "Doğal sayıları okuma ve yazma", "Abaküs ve basamak değeri", "Ritmik sayma", "Basamak değeri", "Doğal sayıları karşılaştırma", "Onluğa yuvarlama", "Yüzlüğe yuvarlama", "Sayı örüntüleri", "Rakamlarla sayı oluşturma", "Rakamlarla sayı oluşturma", "Basamak ve bölükler", "Onluk taban blokları", "Yüzlüğe yuvarlama problemi", "Doğal sayılar arasında sıralama", "Yer kabuğu ve kayaçlar", "Kayaçların büyüklükleri", "Madenlerin kullanım alanları", "Fosillerin oluşumu", "Paleontoloji", "Dünya’nın dönme hareketi", "Dünya’nın dolanma hareketi", "Dünya’nın dönme yönü", "Gece ve gündüz", "Dünya’nın dolanma süresi", "Mineraller", "Bor madeni", "Kayaçların oluşumu", "Madenleri tanıma", "Fosillerin yaşları", "Kimlik kartındaki bilgiler", "Kimlik kartı başvurusu", "Resmî belgeler", "Kronolojik sıralama", "Atatürk’ün hayatı kronolojisi", "Fiziksel özellikler", "İlgi alanları", "Empati", "Bireysel farklılıklar", "Kimlik ve parmak izi", "Erişilebilirlik", "Aile tarihi kaynakları", "Farklılıklara saygı", "İlgi ve yetenekler", "Kronolojik sıralama", "Classroom objects", "Asking permission", "Numbers and operations", "Asking permission", "Number patterns", "Word order: permission", "Nationalities", "Classroom instructions", "There is / there are", "Classroom objects", "Besmele", "Salavat", "Dinî ifadelerin kullanımı", "Yardımlaşma ve sevap", "Şükür ifadeleri"];
function deneme1OgretmenRaporu() {
  const email = Session.getActiveUser().getEmail();
  if (!email || email !== PropertiesService.getScriptProperties().getProperty('DENEME_OGRETMEN_EMAIL')) throw Error('Öğretmen erişimi gerekiyor.');
  const db = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID'));
  const sheet = db.getSheetByName('DENEME_1_KAYIT');
  return deneme1Analiz_(sheet ? sheet.getDataRange().getValues().slice(1) : []);
}

function deneme1Analiz_(rows) {
  const ogrenciler = [];
  const sorular = DENEME1_KONULAR.map((konu, i) => ({no: i + 1, konu, dogru: 0, yanlis: 0, bos: 0}));
  const dersler = {};
  const konular = {};
  for (const row of rows) {
    if (row[1] !== 'ÖĞRENCİ' || row[2] !== 'bitti') continue;
    const sonuc = JSON.parse(row[5]);
    if (!/^[DYB]{75}$/.test(row[7])) throw Error('Soru sonuçları eksik.');
    ogrenciler.push({no: row[0], sonuc});
    let index = 0;
    for (const ders of sonuc.dersler) {
      const toplam = dersler[ders.ad] || (dersler[ders.ad] = {dogru: 0, yanlis: 0, bos: 0});
      for (const tur of ['dogru', 'yanlis', 'bos']) toplam[tur] += ders[tur];
      const adet = ders.dogru + ders.yanlis + ders.bos;
      for (let i = 0; i < adet; i++, index++) {
        const soru = sorular[index];
        const tur = {D: 'dogru', Y: 'yanlis', B: 'bos'}[row[7][index]];
        soru[tur]++;
        const id = ders.ad + ' / ' + soru.konu;
        const konu = konular[id] || (konular[id] = {dogru: 0, yanlis: 0, bos: 0});
        konu[tur]++;
      }
    }
  }
  return {ogrenciler, sorular, dersler, konular};
}
