// Defter notu: Matematik/DefterNotlari/toplamacikarmaproblemleri.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Toplama ve Çıkarma Problemleri',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Problem çözme adımları', kutu: ['anlarım', 'plan', 'kontrol', 'isteneni'], maddeler: [
      'Önce problemi okur ve [anlarım] : verilenleri ve [isteneni] yazarım.',
      'Sonra [plan] yaparım: hangi işlemleri hangi sırayla yapacağıma karar veririm.',
      'İşlemi yapar, sonucu tahminle ya da ters işlemle [kontrol] ederim.',
    ] },
    { tur: 'problem', genis: true, baslik: 'Çok adımlı problemler', sorular: [
      { s: 'Bir kırtasiyede 4 250 kalem vardı. Pazartesi 1 375, salı 1 180 kalem satıldı. Çarşamba 2 000 kalem daha geldi. Kırtasiyede kaç kalem oldu?', yer: 26, cozum: '4 250 − 1 375 = 2 875, 2 875 − 1 180 = 1 695, 1 695 + 2 000 = 3 695', cevap: '3 695 kalem' },
      { s: 'Zeynep 2 580 adım yürüdü. Kerem, Zeynep\'ten 945 adım az; Ali, Kerem\'den 1 260 adım fazla yürüdü. Üçü toplam kaç adım yürüdü?', yer: 26, cozum: 'Kerem: 2 580 − 945 = 1 635. Ali: 1 635 + 1 260 = 2 895. Toplam: 2 580 + 1 635 = 4 215, 4 215 + 2 895 = 7 110', cevap: '7 110 adım' },
      { s: 'Okul, 6 000 TL ile spor malzemesi alacak. 2 450 TL\'ye top, 1 875 TL\'ye file aldı. Kalan parayla 1 900 TL\'lik formaları alabilir mi? Kaç TL artar ya da eksik kalır?', yer: 26, cozum: '2 450 + 1 875 = 4 325, 6 000 − 4 325 = 1 675. 1 675 < 1 900 → alamaz. 1 900 − 1 675 = 225', cevap: 'Alamaz, 225 TL eksik' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Hangi işlemle çözülür?', sorular: [
      { s: 'Ağaçta 1 250 elma vardı, 375 tanesi toplandı. Ağaçta kaç elma kaldı?', sec: ['1 250 + 375', '1 250 − 375', '375 − 1 250'], d: 1 },
      { s: 'Ece\'nin 2 300 pulu var. Mert\'in, Ece\'den 450 fazla pulu var. Mert\'in kaç pulu var?', sec: ['2 300 + 450', '2 300 − 450', '450 + 450'], d: 0 },
      { s: 'Sinemada 1 200 koltuk var; 865\'i dolu. Kaç koltuk boş?', sec: ['1 200 + 865', '865 − 1 200', '1 200 − 865'], d: 2 },
    ] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Biraz daha zor', sorular: [
      { s: 'İki sayının toplamı 8 400\'dür. Sayılardan biri 3 675 ise diğer sayı, birinciden kaç fazladır?', yer: 22, cozum: 'Diğer sayı: 8 400 − 3 675 = 4 725. Fark: 4 725 − 3 675 = 1 050', cevap: '1 050 fazla' },
      { s: 'Bir çiftçi 5 120 kg buğdayın 2 345 kg\'ını sattı, 1 500 kg\'ını ambara koydu. Geriye kaç kg buğday kaldı?', yer: 22, cozum: '5 120 − 2 345 = 2 775, 2 775 − 1 500 = 1 275', cevap: '1 275 kg' },
      { s: 'Bir kumbarada 3 450 TL vardı. Babası 1 250 TL ekledi, Ece 2 875 TL\'lik bir bisiklet aldı. Kumbarada kaç TL kaldı?', yer: 22, cozum: '3 450 + 1 250 = 4 700, 4 700 − 2 875 = 1 825', cevap: '1 825 TL' },
      { s: 'Bir otoparkta sabah 1 248 araç vardı. Öğlen 563 araç çıktı, 789 araç girdi. Öğleden sonra otoparkta kaç araç vardı?', yer: 22, cozum: '1 248 − 563 = 685, 685 + 789 = 1 474', cevap: '1 474 araç' },
    ] },
    { tur: 'bosluk', baslik: 'Tahminle kontrol et', maddeler: [
      'Arda bir problemin cevabını 7 290 buldu. Tahmin etti: 4 980 + 2 310 ≈ [5 000] + [2 300] = [7 300] . Arda\'nın cevabı [mantıklı] .',
      'Selin 6 105 − 2 890 işleminin sonucunu 4 215 buldu. Tahmin: [6 100] − [2 900] = [3 200] . Selin\'in cevabı [yanlış] , doğrusu [3 215] .',
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['“Fazla” sözcüğü geçen her problem toplama ile çözülür.', false],
      ['Problemi çözdükten sonra sonucu kontrol etmeliyiz.', true],
      ['Bir problemde birden fazla işlem yapılabilir.', true],
      ['“Kaç kaldı?” sorusu genellikle çıkarma ile çözülür.', true],
    ] },
    { tur: 'yaz', genis: true, baslik: 'İşleme uygun problem kur', sorular: [
      { s: '4 500 − 1 275 + 800 işlemlerine uygun bir problem yaz ve çöz.', satir: 4, cevap: 'Örnek: Depoda 4 500 kg un vardı. 1 275 kg satıldı, sonra 800 kg geldi. Depoda kaç kg un oldu? 4 500 − 1 275 = 3 225, 3 225 + 800 = 4 025' },
    ] },
  ]],
};
