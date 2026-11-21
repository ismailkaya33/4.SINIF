// Defter notu: Sosyal/DefterNotlari/mersinkultur.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Sosyal', baslik: 'Yaşadığımız Çevre: Mersin\'in Kültür Ögeleri',
  sayfalar: [[
    { tur: 'siniflandir', genis: true, baslik: 'Mersin\'in kültür ögelerini grupla', kelimeler: ['tantuni', 'Silifke kaşık oyunları', 'iğne oyası', 'Kızkalesi', 'cezerye', 'kıl çadır dokumacılığı', 'yaylaya çıkma', 'Tarihi Tarsus evleri', 'kerebiç', 'kilim dokumacılığı', 'Cennet-Cehennem mağaraları', 'batırık'], gruplar: [
      { ad: 'Yemek ve tatlı', uyeler: ['tantuni', 'cezerye', 'kerebiç', 'batırık'] },
      { ad: 'El sanatı', uyeler: ['iğne oyası', 'kıl çadır dokumacılığı', 'kilim dokumacılığı'] },
      { ad: 'Halk oyunu ve gelenek', uyeler: ['Silifke kaşık oyunları', 'yaylaya çıkma'] },
      { ad: 'Tarihî yer', uyeler: ['Kızkalesi', 'Tarihi Tarsus evleri', 'Cennet-Cehennem mağaraları'] },
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Ne nedir?', ciftler: [
      ['Kerebiç', 'Çöven köpüğüyle sunulan tatlı'], ['Cezerye', 'Fıstıklı ve cevizli tatlı'], ['Batırık', 'İnce bulgurla yapılan yöresel yemek'], ['Kaşık oyunu', 'Tahta kaşıklarla oynanan Silifke oyunu'], ['Yörük', 'Toroslarda yaylaya göç eden topluluk'],
    ], fazla: ['Karadeniz\'in halk oyunu'] },
    { tur: 'bosluk', genis: true, baslik: 'Cümleyi tamamla', kutu: ['Çamlıyayla', 'Silifke', 'yayla', 'Tarsus', 'tantuni'], maddeler: [
      'Mersin denilince akla gelen ilk lezzet [tantuni] dir.',
      'Keklik ve Mengi gibi kaşık oyunları [Silifke] yöresine aittir.',
      'Zarif iğne oyaları [Çamlıyayla] (Namrun) yöresine aittir.',
      'Havalar ısınınca Toros Dağları\'nın serin [yayla] larına göç edilir.',
      'Taş ve ahşap işçiliğiyle yapılan tarihî evler [Tarsus] ilçesindedir.',
    ] },
    { tur: 'eslestir', baslik: 'Nerede?', yonerge: 'Kültür ögesini yöresiyle eşleştir.', ciftler: [['Tarihi Tarsus evleri', 'Tarsus'], ['Kaşık oyunları (Keklik, Mengi)', 'Silifke'], ['İğne oyası', 'Çamlıyayla (Namrun)'], ['Gözne yaylası', 'Toros Dağları']] },
    { tur: 'yaz', baslik: 'Sen de anlat', sorular: [{ s: 'Mersin\'de tattığın ya da gördüğün bir kültür ögesini anlat. Nerede, kiminle gördün?', satir: 4, cevap: 'Öğrencinin kendi cevabı.' }] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Yaylaya Göç', metin: [
      'Haziran gelince Zeynep\'in ailesi her yıl olduğu gibi yaylaya hazırlandı. Dedesi kıl çadırları kamyonete yükledi, ninesi kilimleri katladı. Gözne\'deki yaylaya vardıklarında hava serindi, her yer yemyeşildi. Akşam komşular toplandı; gençler kaşık oyunu oynadı, ninesi herkese kerebiç ikram etti. Zeynep, “Bu geleneği ben de çocuklarıma anlatacağım.” dedi.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Metindeki kültür ögelerini bul', basliklar: ['Kültür ögesi türü', 'Metindeki örnek'], genislik: ['45%', '55%'], satirlar: [
      ['Gelenek', '[yaylaya göç etmek]'], ['El sanatı', '[kıl çadır, kilim]'], ['Halk oyunu', '[kaşık oyunu]'], ['Yöresel tatlı', '[kerebiç]'],
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Yaylaya çıkma geleneği Mersin\'de hâlâ yaşatılmaktadır.', true],
      ['Kızkalesi, Mersin\'in tarihî miraslarından biridir.', true],
      ['Kültür ögelerimizi korumak yalnız devletin görevidir.', false],
      ['Kıl çadır dokumacılığı Yörük kültürünün bir parçasıdır.', true],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi Mersin\'in tarihî yerlerinden biri değildir?', sec: ['Kanlıdivane', 'Ashab-ı Kehf', 'Sümela Manastırı'], d: 2 },
      { s: 'Mersin\'e gelen bir turiste hangi yemeği önerirsin?', sec: ['Tantuni', 'Kuymak', 'Hamsi tava'], d: 0 },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 10, kelimeler: ['tantuni', 'cezerye', 'kerebiç', 'yayla', 'kilim', 'oya', 'tarsus'] },
    { tur: 'yaz', baslik: 'Tanıtım kartı', sorular: [
      { s: 'Mersin\'i hiç görmemiş bir arkadaşına şehrimizi üç cümleyle tanıt.', satir: 5, cevap: 'Örnek: Mersin\'de tantuni ve cezerye çok meşhurdur. Silifke\'de kaşık oyunları oynanır. Kızkalesi ve Tarsus evleri görülmeye değer.' },
    ] },
  ]],
};
