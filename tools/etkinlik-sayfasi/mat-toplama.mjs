// Defter notu: Matematik/DefterNotlari/toplama.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Toplama İşlemi',
  sayfalar: [[
    { tur: 'islem', genis: true, baslik: 'Alt alta topla. Eldeleri unutma!', islemler: ['4678+2595', '3809+1497', '2956+4048', '5387+2765'] },
    { tur: 'bosluk', baslik: 'Terimler ve özellikler', maddeler: [
      '2 345 + 1 236 = 3 581 işleminde 2 345 ve 1 236 sayılarına [toplanan], 3 581 sayısına [toplam] denir.',
      '4 528 + 0 = [4 528] → Bir sayıya [sıfır] eklenirse toplam değişmez.',
      '1 250 ile 3 470 toplanırken sıraları değişirse toplam [değişmez].',
      'Üç sayıyı toplarken önce hangi ikisini topladığımız sonucu [değiştirmez].',
    ] },
    { tur: 'bosluk', baslik: 'Kayıp rakamları bul', yonerge: 'Kutulara gelecek rakamları yaz.', numarasiz: true, maddeler: [
      'a) 3 {6} 4 7 + 2 4 {7} 8 = 6 125',
      'b) 1 {5} 0 9 + 4 3 8 {6} = 5 895',
      'c) {3} 7 6 5 + 3 {1} 5 5 = 6 920',
    ] },
    { tur: 'yaz', baslik: 'Hatayı bul', sorular: [
      { s: 'Ece 2 658 + 1 375 işleminin sonucunu 3 923 buldu. Ece nerede yanıldı? Doğru sonucu yaz.', satir: 3, cevap: 'Eldeleri bir sonraki basamağa eklemeyi unuttu. Doğru sonuç 4 033.' },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Önce tahmin et, sonra topla', yonerge: 'Sayıları en yakın yüzlüğe yuvarlayarak tahmin et; sonra gerçek toplamı bul.', ortala: true,
      basliklar: ['İşlem', 'Yuvarlanmış hâli', 'Tahminim', 'Gerçek toplam', 'Fark'],
      satirlar: [
        ['2 389 + 1 512', '[2 400 + 1 500]', '[3 900]', '[3 901]', '[1]'],
        ['4 762 + 3 149', '[4 800 + 3 100]', '[7 900]', '[7 911]', '[11]'],
        ['1 655 + 2 270', '[1 700 + 2 300]', '[4 000]', '[3 925]', '[75]'],
      ] },
    { tur: 'tablo', baslik: 'Toplama tablosu', yonerge: 'Satırdaki ve sütundaki sayıyı topla.', ortala: true,
      basliklar: ['+', '1 250', '2 375', '3 408'],
      satirlar: [['**1 500**', '[2 750]', '[3 875]', '[4 908]'], ['**2 645**', '[3 895]', '[5 020]', '[6 053]'], ['**4 080**', '[5 330]', '[6 455]', '[7 488]']] },
    { tur: 'bosluk', baslik: 'Zihinden hızlı topla', maddeler: [
      '2 500 + 3 500 = [6 000]', '4 990 + 10 = [5 000]', '3 200 + 1 800 = [5 000]', '6 450 + 550 = [7 000]', '1 999 + 1 001 = [3 000]',
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Dört basamaklı iki sayının toplamı her zaman dört basamaklıdır.', false],
      ['5 000 + 3 999 işleminin sonucu 9 000\'den küçüktür.', true],
      ['Toplanan sayılardan biri artarsa toplam da artar.', true],
      ['Bir sayıya 0 eklenirse sonuç 0 olur.', false],
      ['En büyük dört basamaklı sayı ile 1\'in toplamı 10 000\'dir.', true],
    ] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Problem çöz', sorular: [
      { s: 'Bir kütüphanede 2 375 hikâye kitabı var. Bilim kitapları, hikâye kitaplarından 1 248 fazladır. Kütüphanede toplam kaç kitap vardır?', yer: 24, cozum: 'Bilim: 2 375 + 1 248 = 3 623. Toplam: 2 375 + 3 623 = 5 998', cevap: '5 998 kitap' },
      { s: 'Bir çiftlikte ocak ayında 1 865 yumurta toplandı. Şubat ayında ocaktan 497 fazla yumurta toplandı. İki ayda toplam kaç yumurta toplandı?', yer: 24, cozum: 'Şubat: 1 865 + 497 = 2 362. Toplam: 1 865 + 2 362 = 4 227', cevap: '4 227 yumurta' },
      { s: 'Bir okulda 1. dönem 1 426 fidan, 2. dönem 1 389 fidan dikildi. Hedef 3 000 fidandı. Hedefe ulaşıldı mı? Ulaşıldıysa kaç fidan fazla dikildi?', yer: 24, cozum: '1 426 + 1 389 = 2 815. 2 815 < 3 000 → hedefe ulaşılamadı; 185 fidan eksik.', cevap: 'Hayır, 185 eksik' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: '3 456 + 2 789 işleminin sonucu hangi iki sayı arasındadır?', sec: ['5 000 – 6 000', '6 000 – 7 000', '7 000 – 8 000'], d: 1 },
      { s: 'Hangisinin sonucu en büyüktür?', sec: ['4 999 + 1', '2 500 + 2 400', '3 600 + 1 300'], d: 0 },
      { s: '▲ + 1 275 = 4 000 ise ▲ kaçtır?', sec: ['2 725', '3 725', '5 275'], d: 0 },
    ] },
    { tur: 'bosluk', baslik: 'Sayı dedektifi', maddeler: [
      'Ardışık iki sayının toplamı 2 501 ise bu sayılar [1 250] ve [1 251]\'dir.',
      '1 000 artırılınca 6 432 olan sayı [5 432]\'dir.',
      'Rakamları farklı en büyük dört basamaklı sayı ile en küçük dört basamaklı sayının toplamı [10 876]\'dır.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Problem kur', sorular: [
      { s: 'Aşağıdaki bilgileri kullanarak bir toplama problemi yaz ve çöz: “Pazartesi 1 345 kişi, salı 2 180 kişi müzeyi gezdi.”', satir: 4, cevap: 'Örnek: Pazartesi 1 345, salı 2 180 kişi müzeyi gezdi. İki günde kaç kişi gezdi? 1 345 + 2 180 = 3 525 kişi.' },
    ] },
  ]],
};
