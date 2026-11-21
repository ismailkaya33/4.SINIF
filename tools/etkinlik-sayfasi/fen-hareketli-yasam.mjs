// Defter notu: Fen/DefterNotlari/hareketliyasam.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Hareketli Yaşam ve Besin İsrafı',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hareketli yaşıyorum', kutu: ['fiziksel aktivite', 'kaslarımızı', 'kemiklerimizi', 'uyumamıza', 'hareketsiz', 'enerjik'], maddeler: [
      'Sağlıklı büyümek için dengeli beslenmenin yanında düzenli [fiziksel aktivite] de yapmalıyız.',
      'Düzenli hareket etmek [kaslarımızı] ve [kemiklerimizi] güçlendirir.',
      'Hareket etmek kendimizi daha [enerjik] hissetmemizi sağlar.',
      'Fiziksel aktiviteler daha iyi [uyumamıza] ve dikkatimizin artmasına yardım eder.',
      'Uzun süre [hareketsiz] kalmamalı, ekran karşısındaki zamanı sınırlandırmalıyız.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Hareketli mi, hareketsiz mi?', kelimeler: ['ip atlamak', 'saatlerce tablet oynamak', 'bisiklete binmek', 'koltukta dizi izlemek', 'yüzmek', 'merdiven çıkmak', 'bütün gün bilgisayar başında oturmak', 'top oynamak'], gruplar: [
      { ad: 'Hareketli yaşam ✓', uyeler: ['ip atlamak', 'bisiklete binmek', 'yüzmek', 'merdiven çıkmak', 'top oynamak'] },
      { ad: 'Hareketsiz yaşam ✗', uyeler: ['saatlerce tablet oynamak', 'koltukta dizi izlemek', 'bütün gün bilgisayar başında oturmak'] },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Haftalık hareket planım', yonerge: 'Her gün en az bir hareketli etkinlik planla ve kaç dakika yapacağını yaz.', ortala: true,
      basliklar: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      satirlar: [['', '', '', '', '', '', ''], ['… dk', '… dk', '… dk', '… dk', '… dk', '… dk', '… dk']] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi düzenli hareketin yararlarından biri değildir?', sec: ['Kasları güçlendirir', 'Uykuyu düzenler', 'Dikkati azaltır'], d: 2 }, { s: 'Okul çıkışında en sağlıklı seçim hangisidir?', sec: ['Eve yürüyerek gitmek', 'Saatlerce oyun oynamak', 'Koltukta uzanmak'], d: 0 }] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Yürüyüş ve koşu birer fiziksel aktivitedir.', true],
      ['Hareket etmek yalnız sporcular için gereklidir.', false],
      ['Düzenli hareket sağlıklı vücut ağırlığını korumamıza yardım eder.', true],
      ['Ekran karşısında geçirdiğimiz zamanın bir sınırı olmalıdır.', true],
    ] },
  ], [
    { tur: 'bosluk', genis: true, baslik: 'Besin israfı', kutu: ['çöpe', 'ihtiyacımızdan', 'saklamamak', 'bütçesine', 'doğal kaynaklara'], maddeler: [
      'Üretilen besinlerin tüketilmeden [çöpe] atılmasına besin israfı denir.',
      '[ihtiyacımızdan] fazla yiyecek almak ve besinleri uygun koşullarda [saklamamak] israfa neden olur.',
      'Besin israfı hem aile [bütçesine] hem de [doğal kaynaklara] zarar verir.',
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Sorunu çözümle eşleştir', ciftler: [
      ['Markette gereğinden fazla ürün alıyoruz.', 'Alışverişten önce liste hazırlamalıyız.'],
      ['Tabağımızda yemek artıyor.', 'Yiyebileceğimiz kadar almalıyız.'],
      ['Ekmekler bayatlıyor.', 'Bayat ekmeği farklı yemeklerde kullanmalıyız.'],
      ['Tarihi yaklaşan besinler unutuluyor.', 'Önce onları tüketmeliyiz.'],
      ['Besinler dolapta bozuluyor.', 'Uygun koşullarda saklamalıyız.'],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Kelimeleri bul ve işaretle.', boyut: 10, kelimeler: ['israf', 'liste', 'yürüyüş', 'yüzme', 'kas', 'kemik', 'enerji'] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Okul Yemekhanesi', metin: [
      'Okulumuzda bir hafta boyunca yemekhanede artan ekmekler tartıldı. Pazartesi 12 kg, salı 9 kg, çarşamba 7 kg, perşembe 5 kg, cuma 3 kg ekmek arttı. Öğrenciler pazartesi günü “Ekmek israf edilmesin.” afişleri asmış, tabaklarına yiyebilecekleri kadar ekmek almaya başlamışlardı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Artan ekmek miktarı hafta boyunca nasıl değişti? Bunun nedeni ne olabilir?', satir: 2, cevap: 'Her gün azaldı (12 kg\'dan 3 kg\'a). Öğrenciler afişlerle bilinçlendi, yiyebileceği kadar aldı.' },
      { s: 'Bir haftada toplam kaç kg ekmek israf edildi?', satir: 1, cevap: '12 + 9 + 7 + 5 + 3 = 36 kg' },
      { s: 'Evinde besin israfını önlemek için yapabileceğin iki şey yaz.', satir: 2, cevap: 'Örnek: Tabağıma yiyebileceğim kadar alırım; artan yemeği saklayıp ertesi gün yeriz.' },
    ] },
  ]],
};
