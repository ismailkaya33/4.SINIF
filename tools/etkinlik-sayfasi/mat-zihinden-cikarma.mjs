// Defter notu: Matematik/DefterNotlari/zihindencikarma.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Zihinden Çıkarma',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Önce onlukları, sonra birlikleri çıkar', maddeler: [
      '85 − 32 → 85 − 30 = [55] , 55 − 2 = [53]',
      '74 − 46 → 74 − 40 = [34] , 34 − 6 = [28]',
      '93 − 57 → 93 − 50 = [43] , 43 − 7 = [36]',
      '162 − 45 → 162 − 40 = [122] , 122 − 5 = [117]',
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Yuvarla, sonra düzelt', yonerge: 'Çıkanı tamamla, fazla çıkardığını geri ekle.', maddeler: [
      '82 − 29 → 82 − 30 = [52] , 52 + 1 = [53]',
      '145 − 98 → 145 − 100 = [45] , 45 + 2 = [47]',
      '3 450 − 990 → 3 450 − 1 000 = [2 450] , 2 450 + 10 = [2 460]',
    ] },
    { tur: 'bosluk', baslik: 'İkisine de aynı sayıyı ekle', yonerge: 'Eksilene ve çıkana aynı sayıyı eklersek fark değişmez.', maddeler: [
      '63 − 28 = 65 − [30] = [35]', '91 − 47 = 94 − [50] = [44]', '152 − 99 = 153 − [100] = [53]',
    ] },
    { tur: 'bosluk', baslik: '10\'un, 100\'ün katlarıyla çıkar', maddeler: [
      '560 − 40 = [520]', '730 − 90 = [640]', '4 800 − 600 = [4 200]', '6 200 − 700 = [5 500]', '9 000 − 2 500 = [6 500]', '1 000 − 375 = [625]',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Sayı zinciri', yonerge: 'Her adımda yazan sayıyı zihninden çıkar.', ortala: true,
      basliklar: ['Başla', '− 250', '− 300', '− 45', '− 5', '− 99'], satirlar: [['1 000', '[750]', '[450]', '[405]', '[400]', '[301]'], ['2 600', '[2 350]', '[2 050]', '[2 005]', '[2 000]', '[1 901]']] },
    { tur: 'eslestir', genis: true, baslik: 'İşlemi sonucuyla eşleştir', ciftler: [
      ['86 − 39', '47'], ['72 − 48', '24'], ['100 − 64', '36'], ['250 − 75', '175'], ['1 000 − 450', '550'],
    ], fazla: ['53', '125'] },
    { tur: 'tablo', genis: true, baslik: 'Hızlı çıkarma tablosu', yonerge: 'Satırdaki sayıdan sütundaki sayıyı zihninden çıkar.', ortala: true, basliklar: ['−', '25', '48', '99', '250'], satirlar: [['**300**', '[275]', '[252]', '[201]', '[50]'], ['**1 000**', '[975]', '[952]', '[901]', '[750]'], ['**2 450**', '[2 425]', '[2 402]', '[2 351]', '[2 200]']] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Zihinden çöz, yolunu yaz', sorular: [
      { s: 'Elif\'in 95 TL\'si vardı. 38 TL\'lik bir kitap aldı. Kaç TL\'si kaldı?', yer: 15, cozum: '95 − 30 = 65, 65 − 8 = 57', cevap: '57 TL' },
      { s: 'Bir otobüste 64 yolcu vardı. Durakta 29 kişi indi. Otobüste kaç yolcu kaldı?', yer: 15, cozum: '64 − 30 = 34, 34 + 1 = 35', cevap: '35 yolcu' },
      { s: 'Okul gezisi için 1 000 TL ayrıldı. Ulaşıma 450 TL, yemeğe 275 TL harcandı. Kaç TL kaldı?', yer: 15, cozum: '1 000 − 450 = 550, 550 − 275 = 275', cevap: '275 TL' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: '64 − 29 işlemini kolaylaştıran yol hangisidir?', sec: ['64 − 30 − 1', '64 − 30 + 1', '64 − 20 − 1'], d: 1 },
      { s: '500 − 199 işleminin sonucu kaçtır?', sec: ['301', '299', '311'], d: 0 },
      { s: 'Hangisinin sonucu 25\'tir?', sec: ['90 − 75', '80 − 65', '100 − 75'], d: 2 },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['70 − 25 ile 75 − 30 işlemlerinin sonucu aynıdır.', true],
      ['100\'den 1 çıkarınca 101 kalır.', false],
      ['Eksilene ve çıkana aynı sayı eklenirse fark değişmez.', true],
      ['Zihinden çıkarma yaparken alt alta işlem yazarız.', false],
      ['1 000 − 999 işleminin sonucu 1\'dir.', true],
    ] },
    { tur: 'bosluk', baslik: 'Kutuya sayıyı yaz', yonerge: 'Eşitliği sağlayan sayıyı bul.', maddeler: [
      '100 − [35] = 65', '[90] − 45 = 45', '1 000 − [250] = 750', '[800] − 350 = 450', '2 000 − [1 250] = 750',
    ] },
    { tur: 'yaz', genis: true, baslik: 'İki farklı yol', sorular: [
      { s: '83 − 47 işlemini iki farklı yolla zihinden yap. Hangi yolu daha kolay buldun?', satir: 3, cevap: '1. yol: 83 − 40 = 43, 43 − 7 = 36. 2. yol: 86 − 50 = 36' },
    ] },
  ]],
};
