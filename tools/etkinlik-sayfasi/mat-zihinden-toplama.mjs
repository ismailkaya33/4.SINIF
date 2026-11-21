// Defter notu: Matematik/DefterNotlari/zihindentoplama.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Zihinden Toplama',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Onlukları ve birlikleri ayrı topla', maddeler: [
      '46 + 37 → 40 + 30 = [70] , 6 + 7 = [13] , 70 + 13 = [83]',
      '58 + 25 → 50 + 20 = [70] , 8 + 5 = [13] , 70 + 13 = [83]',
      '67 + 26 → 60 + 20 = [80] , 7 + 6 = [13] , 80 + 13 = [93]',
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Yuvarla, sonra düzelt', yonerge: 'Sayıyı en yakın onluğa ya da yüzlüğe tamamla, sonra fazlasını çıkar.', maddeler: [
      '49 + 36 → 50 + 36 = [86] , 86 − 1 = [85]',
      '78 + 19 → 78 + 20 = [98] , 98 − 1 = [97]',
      '298 + 45 → 300 + 45 = [345] , 345 − 2 = [343]',
      '1 997 + 350 → 2 000 + 350 = [2 350] , 2 350 − 3 = [2 347]',
    ] },
    { tur: 'bosluk', baslik: '10\'un ve 100\'ün katlarıyla topla', maddeler: [
      '340 + 50 = [390]', '470 + 60 = [530]', '2 300 + 500 = [2 800]', '4 600 + 700 = [5 300]', '3 800 + 1 200 = [5 000]', '650 + 350 = [1 000]',
    ] },
    { tur: 'bosluk', baslik: 'Tamamla: 100, 1 000', maddeler: ['37 + [63] = 100', '58 + [42] = 100', '450 + [550] = 1 000', '725 + [275] = 1 000', '[180] + 820 = 1 000'] },
    { tur: 'tablo', genis: true, baslik: 'Sayı zinciri', yonerge: 'Her adımda yazan sayıyı zihninden ekle.', ortala: true,
      basliklar: ['Başla', '+ 30', '+ 200', '+ 25', '+ 1 500'], satirlar: [['245', '[275]', '[475]', '[500]', '[2 000]'], ['1 360', '[1 390]', '[1 590]', '[1 615]', '[3 115]']] },
    { tur: 'eslestir', genis: true, baslik: 'Toplamı aynı olanları eşleştir', yonerge: 'Soldaki işlemin yanına, toplamı aynı olan sağdaki işlemin harfini yaz.', ciftler: [
      ['38 + 47', '50 + 35'], ['64 + 28', '70 + 22'], ['75 + 46', '80 + 41'], ['199 + 56', '200 + 55'], ['45 + 45', '50 + 40'],
    ], fazla: ['60 + 33'] },
    { tur: 'tablo', genis: true, baslik: 'Hızlı toplama tablosu', yonerge: 'Satırdaki ve sütundaki sayıyı zihninden topla.', ortala: true,
      basliklar: ['+', '25', '48', '99', '250'],
      satirlar: [['**25**', '[50]', '[73]', '[124]', '[275]'], ['**150**', '[175]', '[198]', '[249]', '[400]'], ['**1 300**', '[1 325]', '[1 348]', '[1 399]', '[1 550]']] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Zihinden çöz, yolunu yaz', sorular: [
      { s: 'Bir kırtasiyeci sabah 48, öğleden sonra 37 defter sattı. Bir günde kaç defter sattı?', yer: 16, cozum: '40 + 30 = 70, 8 + 7 = 15, 70 + 15 = 85', cevap: '85 defter' },
      { s: 'Deniz 1 600 TL\'lik bir bisiklet ve 350 TL\'lik bir kask aldı. Kaç TL ödedi?', yer: 16, cozum: '1 600 + 300 = 1 900, 1 900 + 50 = 1 950', cevap: '1 950 TL' },
      { s: 'Okulumuzda 298 kız ve 305 erkek öğrenci var. Önce yaklaşık sayıyı, sonra tam sayıyı bul.', yer: 16, cozum: 'Yaklaşık: 300 + 300 = 600. Tam: 298 + 305 = 603', cevap: '≈ 600, tam 603' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: '39 + 47 işlemini zihinden yaparken hangisi işimizi kolaylaştırır?', sec: ['40 + 47 + 1', '40 + 47 − 1', '39 + 50 + 3'], d: 1, alt: true },
      { s: 'Hangi ikilinin toplamı 100\'dür?', sec: ['45 + 65', '37 + 63', '28 + 82'], d: 1 },
      { s: '250 + 250 + 250 + 250 işleminin sonucu kaçtır?', sec: ['750', '1 250', '1 000'], d: 2 },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['47 + 30 işleminde yalnız onlar basamağı değişir.', true],
      ['99 ile 99\'un toplamı 200\'dür.', false],
      ['500 ile 500\'ün toplamı 1 000\'dir.', true],
      ['Sayıların yerini değiştirmek toplamı değiştirir.', false],
      ['36 + 49 işleminde 49\'u 50 yapıp sonuçtan 1 çıkarabiliriz.', true],
    ] },
    { tur: 'bosluk', baslik: 'Kutuya sayıyı yaz', yonerge: 'Eşitliği sağlayan sayıyı bul.', maddeler: [
      '55 + [45] = 100', '[380] + 620 = 1 000', '1 250 + [750] = 2 000', '[64] + 36 = 100', '2 450 + [550] = 3 000',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Yöntemini anlat', sorular: [
      { s: '68 + 27 işlemini zihinden nasıl yaparsın? Adım adım yaz.', satir: 2, cevap: '60 + 20 = 80, 8 + 7 = 15, 80 + 15 = 95' },
      { s: '199 + 99 işlemi için en kolay yolu yaz ve sonucu bul.', satir: 2, cevap: '200 + 100 = 300, 300 − 2 = 298' },
    ] },
  ]],
};
