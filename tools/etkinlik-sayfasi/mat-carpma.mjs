// Defter notu: Matematik/DefterNotlari/mat-carpma-1..3.png (tools/sketchnote/notlar/mat-carpma.js) — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Çarpma İşlemi',
  sayfalar: [[
    { tur: 'bosluk', baslik: 'Anlamı ve terimleri', maddeler: [
      '6 × 8 = 48 işleminde 6 ve 8 [çarpan] , 48 [çarpım] adını alır.',
      '7 + 7 + 7 + 7 toplamını çarpma ile 4 × 7 = [28] diye yazarız.',
      'Bir sayının 1 ile çarpımı [sayının kendisidir] .',
      'Bir sayının 0 ile çarpımı [0] olur.',
    ] },
    { tur: 'bosluk', baslik: '10, 100, 1 000 ve katlarıyla', maddeler: [
      '37 × 10 = [370]', '45 × 100 = [4 500]', '8 × 1 000 = [8 000]', '24 × 30 = [720]', '16 × 200 = [3 200]', '7 × 4 000 = [28 000]',
    ] },
    { tur: 'islem', genis: true, baslik: 'Alt alta çarp', islemler: ['426x7', '1508x6', '374x25', '608x43'] },
    { tur: 'islem', genis: true, baslik: 'Biraz daha', islemler: ['1245x8', '2309x4', '143x36', '507x18'] },
    { tur: 'bosluk', baslik: '5, 25 ve 50 ile kısa yoldan', maddeler: [
      '48 × 5 → 48\'in yarısı [24] , 24 × 10 = [240]',
      '64 × 50 → 64\'ün yarısı [32] , 32 × 100 = [3 200]',
      '36 × 25 → 36\'nın dörtte biri [9] , 9 × 100 = [900]',
    ] },
    { tur: 'bosluk', baslik: 'Üç sayıyı akıllıca çarp', maddeler: [
      '5 × 7 × 2 → 5 × 2 = [10] , 10 × 7 = [70]',
      '25 × 9 × 4 → 25 × 4 = [100] , 100 × 9 = [900]',
      '50 × 13 × 2 → 50 × 2 = [100] , 100 × 13 = [1 300]',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Önce tahmin et, sonra çarp', yonerge: 'Çarpanları yuvarla, tahmini çarpımı bul; sonra gerçek çarpımı hesapla.', ortala: true,
      basliklar: ['İşlem', 'Yuvarlanmış hâli', 'Tahminim', 'Gerçek çarpım'],
      satirlar: [
        ['387 × 21', '[400 × 20]', '[8 000]', '[8 127]'],
        ['612 × 48', '[600 × 50]', '[30 000]', '[29 376]'],
        ['295 × 33', '[300 × 30]', '[9 000]', '[9 735]'],
      ] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Problem çöz', sorular: [
      { s: 'Bir kitap 248 sayfadır. Kütüphaneye bu kitaptan 36 tane geldi. Gelen kitapların toplam kaç sayfası vardır?', yer: 24, cozum: '248 × 36 = 8 928', cevap: '8 928 sayfa' },
      { s: 'Bir okulda 18 sınıf var. Her sınıfta 16 sıra, her sırada 2 öğrenci oturuyor. Okulda kaç öğrenci vardır?', yer: 22, cozum: '18 × 16 = 288, 288 × 2 = 576', cevap: '576 öğrenci' },
      { s: 'Tanesi 125 TL olan tişörtlerden 24 tane alan öğretmen kasiyere 5 000 TL verdi. Kaç TL para üstü alır?', yer: 22, cozum: '125 × 24 = 3 000, 5 000 − 3 000 = 2 000', cevap: '2 000 TL' },
    ] },
    { tur: 'yaz', baslik: 'Hatayı bul', sorular: [
      { s: 'Selin 243 × 12 işleminin sonucunu 729 buldu. Hatası nedir? Doğru sonucu bul.', satir: 3, cevap: 'Onlar basamağıyla çarpınca 243 yerine 2 430 yazmalıydı (bir basamak sola kaydırma). 486 + 2 430 = 2 916' },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [['Çarpanların yeri değişirse çarpım değişmez.', true], ['Bir sayıyı 100 ile çarpınca sağına iki sıfır yazılır.', true], ['25 × 4 işleminin sonucu 29\'dur.', false], ['Bir sayının 0 ile çarpımı sayının kendisidir.', false]] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: '45 × 20 işleminin sonucu kaçtır?', sec: ['90', '900', '9 000'], d: 1 },
      { s: '4 × 25 × 7 işleminin sonucu kaçtır?', sec: ['700', '175', '2 800'], d: 0 },
      { s: '▲ × 8 = 0 ise ▲ kaçtır?', sec: ['8', '1', '0'], d: 2 },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Çarpım tablosu bulmacası', yonerge: 'Satırdaki ve sütundaki sayıları çarp.', ortala: true,
      basliklar: ['×', '6', '9', '20', '50', '100'],
      satirlar: [['**7**', '[42]', '[63]', '[140]', '[350]', '[700]'], ['**15**', '[90]', '[135]', '[300]', '[750]', '[1 500]'], ['**24**', '[144]', '[216]', '[480]', '[1 200]', '[2 400]']] },
  ]],
};
