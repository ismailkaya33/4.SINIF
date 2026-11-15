// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Uzun ama sığdırılabilir başlıklar: yazı boyu küçülerek sığar, hata vermez.
Sketchnote.defterNotu({
  baslik: 'DOĞAL SAYILARLA ÇARPMA İŞLEMİ',
  bloklar: [
    { konu: '1. Üç basamaklı doğal sayılarla iki basamaklı doğal sayıların çarpımı' },
    { ara: 'Kısa yoldan çarpma: 10, 100 ve 1000 ile çarparken dikkat edilecekler' },
    { madde: 'Kısa bir madde.' },
    { gorseller: [1] },
  ],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
