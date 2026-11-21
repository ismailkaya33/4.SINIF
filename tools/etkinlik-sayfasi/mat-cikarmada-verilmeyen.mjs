// Defter notu: Matematik/DefterNotlari/cikarmadaverilmeyen.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Matematik', baslik: 'Çıkarma İşleminde Verilmeyenleri Bulma',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kuralı tamamla', kutu: ['toplarız', 'çıkarırız'], maddeler: [
      'Verilmeyen **eksileni** bulmak için fark ile çıkanı [toplarız] .',
      'Verilmeyen **çıkanı** bulmak için eksilenden farkı [çıkarırız] .',
      'Verilmeyen **toplananı** bulmak için toplamdan verilen toplananı [çıkarırız] .',
    ] },
    { tur: 'tablo', baslik: 'Tabloyu tamamla', ortala: true, basliklar: ['Eksilen', 'Çıkan', 'Fark'], satirlar: [
      ['[7 425]', '2 375', '5 050'], ['6 300', '[2 860]', '3 440'], ['[9 012]', '4 568', '4 444'], ['8 000', '[3 125]', '4 875'], ['5 742', '2 396', '[3 346]'],
    ] },
    { tur: 'bosluk', baslik: 'Şekillerin yerine gelecek sayı', maddeler: [
      '▲ − 1 845 = 3 270 → ▲ = [5 115]', '6 400 − ■ = 2 785 → ■ = [3 615]', '● + 2 368 = 7 000 → ● = [4 632]', '4 507 + ★ = 9 106 → ★ = [4 599]',
    ] },
    { tur: 'tablo', baslik: 'Toplamı 6 000 yap', ortala: true, basliklar: ['Toplanan', 'Toplanan', 'Toplam'], satirlar: [['2 345', '[3 655]', '6 000'], ['[4 728]', '1 272', '6 000'], ['3 096', '[2 904]', '6 000'], ['[5 375]', '625', '6 000']] },
    { tur: 'tablo', genis: true, baslik: 'Sayı makinesi', yonerge: 'Makine giren her sayıdan 1 250 çıkarıyor. Boşlukları doldur.', ortala: true,
      basliklar: ['Giren sayı', '3 000', '[4 600]', '[6 250]', '8 125', '[2 500]'], satirlar: [['Çıkan sayı', '[1 750]', '3 350', '5 000', '[6 875]', '1 250']] },
    { tur: 'bosluk', genis: true, baslik: 'Bul ve ters işlemle kontrol et', maddeler: ['▲ − 2 750 = 1 480 → ▲ = [4 230] → Kontrol: 4 230 − 2 750 = [1 480]', '5 300 − ■ = 2 675 → ■ = [2 625] → Kontrol: 5 300 − 2 625 = [2 675]'] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Fark ile çıkanın toplamı eksileni verir.', true],
      ['Eksilenden fark çıkarılırsa çıkan bulunur.', true],
      ['Verilmeyen eksileni bulmak için çıkarma yapılır.', false],
      ['Toplam ve bir toplanan biliniyorsa diğer toplanan bulunabilir.', true],
    ] },
    { tur: 'yaz', baslik: 'Hatayı bul', sorular: [
      { s: 'Can, “▲ − 1 200 = 3 500” işleminde ▲ yerine 2 300 yazdı. Hatası nedir? Doğrusunu bul.', satir: 3, cevap: 'Eksileni bulmak için çıkarma yaptı; toplamalıydı: 3 500 + 1 200 = 4 700' },
    ] },
  ], [
    { tur: 'problem', genis: true, baslik: 'Problem çöz', sorular: [
      { s: 'Bir sayıdan 1 750 çıkarınca 2 480 kalıyor. Bu sayı kaçtır?', yer: 15, cozum: '2 480 + 1 750 = 4 230', cevap: '4 230' },
      { s: 'Bir kütüphanede 5 200 kitap vardı. Köy okullarına kitap gönderilince 3 465 kitap kaldı. Kaç kitap gönderildi?', yer: 15, cozum: '5 200 − 3 465 = 1 735', cevap: '1 735 kitap' },
      { s: 'Melis kumbarasındaki paraya 1 345 TL ekleyince parası 4 000 TL oldu. Melis\'in önceden kaç TL\'si vardı?', yer: 15, cozum: '4 000 − 1 345 = 2 655', cevap: '2 655 TL' },
      { s: 'Bir tarladan 2 870 kg domates toplandı, tarlada 1 965 kg domates kaldı. Tarlada başlangıçta kaç kg domates vardı? Toplanan domates, kalandan kaç kg fazladır?', yer: 18, cozum: '2 870 + 1 965 = 4 835. 2 870 − 1 965 = 905', cevap: '4 835 kg; 905 kg' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: '■ − 2 500 = 1 800 ise ■ kaçtır?', sec: ['700', '4 300', '3 300'], d: 1 },
      { s: 'Eksilen 9 000, fark 3 250 ise çıkan kaçtır?', sec: ['5 750', '12 250', '6 750'], d: 0 },
      { s: '3 456 + ▲ = 5 000 ise ▲ kaçtır?', sec: ['2 544', '8 456', '1 544'], d: 2 },
    ] },
    { tur: 'bosluk', baslik: 'Sayı bilmeceleri', maddeler: [
      'Aklımdan bir sayı tuttum, 999 çıkardım, 1 001 kaldı. Tuttuğum sayı [2 000] .',
      'Aklımdan bir sayı tuttum, 3 000\'den çıkardım, 1 275 kaldı. Tuttuğum sayı [1 725] .',
      'Aklımdan bir sayı tuttum, 2 450 ekledim, 6 000 oldu. Tuttuğum sayı [3 550] .',
    ] },
    { tur: 'dy', baslik: 'Kontrol et', yonerge: 'Bulunan sayı doğruysa D, yanlışsa Y yaz.', maddeler: [['▲ − 2 300 = 1 700 → ▲ = 4 000', true], ['5 000 − ■ = 3 250 → ■ = 8 250', false], ['● + 3 999 = 9 999 → ● = 6 000', true], ['7 200 − ★ = 7 200 → ★ = 0', true]] },
    { tur: 'yaz', genis: true, baslik: 'Problem kur', sorular: [
      { s: '“? − 1 500 = 2 250” işlemine uygun bir problem yaz ve çöz.', satir: 3, cevap: 'Örnek: Bir çiftçi elmalarından 1 500 kg sattı, 2 250 kg kaldı. Başta kaç kg vardı? 2 250 + 1 500 = 3 750' },
    ] },
  ]],
};
