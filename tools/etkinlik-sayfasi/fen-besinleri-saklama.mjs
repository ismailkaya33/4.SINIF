// Defter notu: Fen/DefterNotlari/besinlerisaklama.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Besinleri Saklama',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Saklama yöntemleri', kutu: ['buzdolabında', 'dondurma', 'kurutma', 'konserve', 'turşu', 'kuru ve serin'], maddeler: [
      'Süt, yoğurt, et ve peynir [buzdolabında] saklanır.',
      'Et, tavuk ve bezelye uzun süre saklanacaksa derin dondurucuda [dondurma] yöntemi kullanılır.',
      'Kayısı, incir, biber ve domates güneşte [kurutma] ile kışa saklanır.',
      'Besinlerin pişirilip hava almayan kavanozlara konulmasına [konserve] denir.',
      'Salatalık, lahana ve biber tuzlu suda ve sirkede [turşu] yapılarak saklanır.',
      'Un, pirinç, makarna ve bakliyat [kuru ve serin] bir yerde, kapalı kapta saklanır.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Hangi besin nasıl saklanır?', yonerge: 'Her besin için uygun saklama yöntemini yaz ve nedenini açıkla.',
      basliklar: ['Besin', 'Saklama yöntemi', 'Neden?'], genislik: ['20%', '30%', '50%'],
      satirlar: [
        ['Kıyma', '[derin dondurucuda]', '[çabuk bozulur, soğuk bozulmayı yavaşlatır]'],
        ['Kayısı', '[kurutarak]', '[suyu azalınca mikrop üremez]'],
        ['Pirinç', '[kuru, serin, kapalı kapta]', '[nem ve böceklerden korunur]'],
        ['Salatalık', '[turşu yaparak]', '[tuz ve sirke bozulmayı önler]'],
        ['Domates sosu', '[konserve yaparak]', '[hava almayan kapta uzun süre kalır]'],
      ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Saklama yöntemleriyle ilgili kelimeleri bul ve işaretle.', boyut: 11, kelimeler: ['kurutma', 'turşu', 'konserve', 'salamura', 'dondurma', 'buzdolabı', 'kiler'] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Çözülen et yeniden dondurulabilir.', false],
      ['Sıcak yemek biraz soğuduktan sonra buzdolabına konulmalıdır.', true],
      ['Ekmek nemli yerde saklanırsa çabuk küflenir.', true],
      ['Çiğ et ile pişmiş yemekler aynı kapta saklanmamalıdır.', true],
    ] },
  ], [
    { tur: 'eslestir', genis: true, baslik: 'Yöntemi örnekle eşleştir', ciftler: [
      ['Kurutma', 'Pestil, kuru üzüm, erişte'], ['Turşu', 'Lahana, biber, salatalık'], ['Dondurma', 'Bezelye, et, balık'], ['Konserve', 'Reçel, salça, kavanozda fasulye'], ['Salamura', 'Peynirin tuzlu suda saklanması'],
    ], fazla: ['Taze ekmeğin hemen yenmesi'] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Ninemin Kiler Dolabı', metin: [
      'Yaz tatilinde köydeki nineme gittim. Ninem bahçedeki domatesleri ikiye kesip tepsilere dizdi ve güneşe koydu. Biberleri ipe dizip duvara astı. Bir kısım domatesi de kaynatıp salça yaptı, kavanozlara doldurdu.',
      'Kilerde un, bulgur ve nohut kapaklı kaplardaydı. Ninem, “Kışın pazara gidemesek de bu besinler bize yeter.” dedi. Peynirleri ise tuzlu suyun içine koydu.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Metindeki saklama yöntemlerini bul', basliklar: ['Besin', 'Kullanılan yöntem'], genislik: ['40%', '60%'], satirlar: [
      ['Domates (güneşte)', '[kurutma]'], ['Biber (ipe dizilerek)', '[kurutma]'], ['Salça', '[konserve]'], ['Un, bulgur, nohut', '[kuru ve serin yerde, kapalı kapta saklama]'], ['Peynir', '[salamura]'],
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Besinleri doğru saklamanın yararı hangisi değildir?', sec: ['Bozulmayı geciktirir', 'İsrafı azaltır', 'Besinleri hemen bozar'], d: 2, alt: true },
      { s: 'Dondurulmuş et nasıl çözdürülmelidir?', sec: ['Güneşte bekleterek', 'Buzdolabının alt rafında', 'Sıcak suda saatlerce'], d: 1, alt: true },
    ] },
    { tur: 'dy', baslik: 'Buzdolabı kuralları', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [['Süt ürünleri ve et buzdolabında saklanır.', true], ['Buzdolabına besinler sıkış tıkış doldurulmalıdır.', false], ['Açılan konserve kendi kutusunda uzun süre bekletilmez.', true]] },
    { tur: 'yaz', baslik: 'Düşün ve yaz', sorular: [
      { s: 'Buzdolabı icat edilmeden önce insanlar yazın besinlerini nasıl korurdu? İki yol yaz.', satir: 3, cevap: 'Kurutma, tuzlama/salamura, turşu, serin kilerde ya da kuyuda saklama.' },
    ] },
  ]],
};
