// Defter notu: Matematik/DefterNotlari/cikarmadefternotu.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Çıkarma İşlemi',
  sayfalar: [[
    { tur: 'islem', genis: true, baslik: 'Alt alta çıkar. Gerekirse onluk boz!', islemler: ['7254-3876', '8003-2647', '6420-1785', '9100-4356'] },
    { tur: 'islem', genis: true, baslik: 'Sıfırlı sayılardan çıkar', islemler: ['5000-2378', '7006-3459', '4030-1867', '6000-45'] },
    { tur: 'bosluk', baslik: 'Terimler ve kurallar', maddeler: [
      '8 450 − 3 120 = 5 330 işleminde 8 450 [eksilen] , 3 120 [çıkan] , 5 330 [fark] adını alır.',
      'Bir sayıdan 0 çıkarılırsa sonuç [sayının kendisi] olur.',
      'Bir sayıdan kendisi çıkarılırsa sonuç [0] olur.',
      'Sağlama yaparken fark ile çıkanı toplarız; sonuç [eksilen] olmalıdır.',
    ] },
    { tur: 'bosluk', baslik: 'Kayıp rakamları bul', numarasiz: true, maddeler: [
      'a) 8 {4} 3 2 − 3 6 {5} 7 = 4 775',
      'b) 7 0 {6} 1 − 2 {8} 4 5 = 4 216',
    ] },
    { tur: 'bosluk', baslik: 'Zihinden hızlı çıkar', maddeler: ['5 000 − 1 000 = [4 000]', '3 600 − 600 = [3 000]', '7 250 − 250 = [7 000]', '9 000 − 1 = [8 999]', '4 100 − 200 = [3 900]'] },
    { tur: 'yaz', baslik: 'Hatayı bul', sorular: [
      { s: 'Mert 5 302 − 2 768 işleminin sonucunu 3 466 buldu. Mert nerede yanıldı? Doğru sonucu yaz.', satir: 3, cevap: 'Her basamakta büyük rakamdan küçüğü çıkardı, onluk bozmadı. Doğrusu 2 534.' },
    ] },
    { tur: 'bosluk', baslik: 'Çıkar ve sağlamasını yap', maddeler: [
      '6 125 − 2 487 = [3 638] → Sağlama: 3 638 + 2 487 = [6 125]',
      '9 000 − 3 456 = [5 544] → Sağlama: 5 544 + 3 456 = [9 000]',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Önce tahmin et, sonra çıkar', yonerge: 'Sayıları en yakın yüzlüğe yuvarlayarak tahmin et; sonra gerçek farkı bul.', ortala: true,
      basliklar: ['İşlem', 'Yuvarlanmış hâli', 'Tahminim', 'Gerçek fark'],
      satirlar: [
        ['6 812 − 2 395', '[6 800 − 2 400]', '[4 400]', '[4 417]'],
        ['9 148 − 4 726', '[9 100 − 4 700]', '[4 400]', '[4 422]'],
        ['5 560 − 1 280', '[5 600 − 1 300]', '[4 300]', '[4 280]'],
      ] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Problem çöz', sorular: [
      { s: 'Bir müzeyi hafta sonu 7 250 kişi gezdi. Bunların 3 485\'i cumartesi geldi. Pazar günü kaç kişi geldi? Pazar günü cumartesiden kaç kişi fazla geldi?', yer: 24, cozum: 'Pazar: 7 250 − 3 485 = 3 765. Fark: 3 765 − 3 485 = 280', cevap: '3 765 kişi; 280 fazla' },
      { s: 'Bir fabrika 9 000 şişe su üretti. 4 375 şişeyi sabah, 2 980 şişeyi öğleden sonra marketlere gönderdi. Fabrikada kaç şişe kaldı?', yer: 22, cozum: '9 000 − 4 375 = 4 625, 4 625 − 2 980 = 1 645', cevap: '1 645 şişe' },
      { s: 'Ayşe\'nin 2 450 TL\'si vardı. 1 275 TL\'ye tablet kılıfı, 680 TL\'ye kulaklık aldı. Kaç TL\'si kaldı?', yer: 22, cozum: '2 450 − 1 275 = 1 175, 1 175 − 680 = 495', cevap: '495 TL' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Farkı 2 500 olan işlem hangisidir?', sec: ['6 000 − 3 000', '4 500 − 2 500', '5 000 − 2 500'], d: 2, alt: true },
      { s: 'Eksilen 7 300, fark 2 800 ise çıkan kaçtır?', sec: ['4 500', '10 100', '5 500'], d: 0 },
      { s: '8 000 − ▲ = 3 650 ise ▲ kaçtır?', sec: ['5 650', '4 350', '11 650'], d: 1 },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Çıkarmada sayıların yeri değişirse sonuç değişmez.', false],
      ['Fark ile çıkanın toplamı eksileni verir.', true],
      ['4 000\'den 1 çıkarınca 3 999 kalır.', true],
      ['Onluk bozduğumuz basamaktaki rakam 1 azalır.', true],
      ['Eksilen, farktan her zaman küçüktür.', false],
    ] },
    { tur: 'eslestir', genis: true, baslik: 'İşlemi farkıyla eşleştir', ciftler: [['8 000 − 2 750', '5 250'], ['6 305 − 1 980', '4 325'], ['9 999 − 4 444', '5 555'], ['7 040 − 3 560', '3 480']], fazla: ['3 520'] },
    { tur: 'yaz', genis: true, baslik: 'Problem kur', sorular: [
      { s: 'Cevabı 1 250 olan bir çıkarma problemi yaz ve çöz.', satir: 3, cevap: 'Örnek: 3 000 sayfalık kitaplardan 1 750 sayfa okundu. Kaç sayfa kaldı? 3 000 − 1 750 = 1 250' },
    ] },
  ]],
};
