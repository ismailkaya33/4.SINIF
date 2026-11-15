// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Yan yana 3 görsel sayfaya sığmaz → hata.
Sketchnote.defterNotu({
  baslik: 'ÜÇ GÖRSEL',
  bloklar: [{ konu: '1. Konu' }, { gorseller: [1, 2, 3] }],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }, { ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }, { ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
