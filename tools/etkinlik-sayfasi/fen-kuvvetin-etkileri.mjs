// Defter notu: Fen/DefterNotlari/fen-kuvvetin-etkileri-1..2.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Kuvvetin Etkileri',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kuvvet nedir?', kutu: ['itme', 'çekme', 'kuvvet', 'göremeyiz', 'uzaklaştırır', 'yaklaştırır'], maddeler: [
      'Bir cismi hareket ettirmek, durdurmak ya da şeklini değiştirmek için uygulanan itme ya da çekme etkisine [kuvvet] denir.',
      'Kuvveti [göremeyiz] ; ama cisimler üzerindeki etkilerini görebiliriz.',
      '[itme] kuvveti cismi bizden [uzaklaştırır] ; [çekme] kuvveti cismi bize [yaklaştırır] .',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'İtme mi, çekme mi?', kelimeler: ['kapıyı kapatmak', 'çekmeceyi açmak', 'alışveriş arabasını sürmek', 'kovayı kuyudan çıkarmak', 'topa vurmak', 'halat çekmek', 'salıncaktaki arkadaşını sallamak', 'fişi prizden çıkarmak'], gruplar: [
      { ad: 'İtme', uyeler: ['kapıyı kapatmak', 'alışveriş arabasını sürmek', 'topa vurmak', 'salıncaktaki arkadaşını sallamak'] },
      { ad: 'Çekme', uyeler: ['çekmeceyi açmak', 'kovayı kuyudan çıkarmak', 'halat çekmek', 'fişi prizden çıkarmak'] },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Kuvvetin harekete etkisi', yonerge: 'Her olayda kuvvetin cisme etkisini yaz: hareket ettirir, durdurur, hızlandırır, yavaşlatır, yönünü değiştirir.',
      basliklar: ['Olay', 'Kuvvetin etkisi'], genislik: ['60%', '40%'],
      satirlar: [
        ['Duran topa ayağımızla vururuz.', '[hareket ettirir]'],
        ['Kaleci üzerine gelen topu tutar.', '[durdurur]'],
        ['Salıncaktaki arkadaşımızı arkadan iteriz.', '[hızlandırır]'],
        ['Bisikletin frenine basarız.', '[yavaşlatır]'],
        ['Tenis raketi gelen topu geri gönderir.', '[yönünü değiştirir]'],
        ['Rüzgâr, uçan uçurtmanın gittiği yönü değiştirir.', '[yönünü değiştirir]'],
      ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Kuvvet yalnız hareket eden cisimlere uygulanır.', false],
      ['Bir cisme kuvvet uygulanınca birden fazla etki görülebilir.', true],
      ['Çekmeceyi açarken itme kuvveti uygularız.', false],
      ['Kuvvet, hareket eden bir cismi durdurabilir.', true],
    ] },
  ], [
    { tur: 'siniflandir', genis: true, baslik: 'Kuvvetin şekle etkisi', yonerge: 'Kuvvet kalkınca eski şekline dönen ve dönmeyen cisimleri ayır.', kelimeler: ['sünger', 'oyun hamuru', 'yay', 'buruşturulmuş kâğıt', 'lastik top', 'ezilmiş teneke kutu', 'paket lastiği', 'kil'], gruplar: [
      { ad: 'Eski şekline döner', uyeler: ['sünger', 'yay', 'lastik top', 'paket lastiği'] },
      { ad: 'Eski şekline dönmez', uyeler: ['oyun hamuru', 'buruşturulmuş kâğıt', 'ezilmiş teneke kutu', 'kil'] },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Bahçede Futbol', metin: [
      'Defne yerde duran topa sertçe vurdu. Top hızla kaleye doğru giderken kaleci Ahmet atladı ve topu iki eliyle yakaladı. Top bir an elinin içinde basıldı, biraz yassılaştı. Sonra Ahmet topu yere bıraktı ve ayağıyla yönünü değiştirerek arkadaşına pas verdi.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Metindeki kuvvet etkilerini bul', basliklar: ['Metindeki olay', 'Kuvvetin etkisi'], genislik: ['60%', '40%'], satirlar: [
      ['Defne duran topa vurdu.', '[hareket ettirdi]'], ['Ahmet topu yakaladı.', '[durdurdu]'], ['Top elinin içinde basıldı.', '[şeklini değiştirdi]'], ['Ahmet ayağıyla pas verdi.', '[yönünü değiştirdi]'],
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisinde kuvvet cismin şeklini kalıcı olarak değiştirmiştir?', sec: ['Sıkılan sünger', 'Ezilen gazoz kutusu', 'Gerilen yay'], d: 1, alt: true },
      { s: 'Hangisinde çekme kuvveti uygulanır?', sec: ['Kapıyı kapatmak', 'Bavulu tekerleğiyle peşimizden sürüklemek', 'Topa kafa vurmak'], d: 1, alt: true },
    ] },
    { tur: 'bosluk', baslik: 'Cümleyi tamamla', kutu: ['itme', 'çekme', 'yönünü', 'şeklini'], maddeler: ['Okçu yayı gerince yayın [şeklini] değiştirir.', 'Kova ipini yukarı çekerken [çekme] kuvveti uygularız.', 'Futbolcu kafa vuruşuyla topun [yönünü] değiştirir.', 'Bebek arabasını sürerken [itme] kuvveti uygularız.'] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Kelimeleri bul ve işaretle.', boyut: 10, kelimeler: ['itme', 'çekme', 'kuvvet', 'hız', 'yön', 'şekil', 'durdurma'] },
  ]],
};
