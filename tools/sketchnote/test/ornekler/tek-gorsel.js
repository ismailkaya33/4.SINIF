// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Tek görselli not: kes-yapıştır sayfasında aynı görselden 8 kopya (8 öğrenci).
Sketchnote.defterNotu({
  baslik: 'TEK GÖRSEL',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Kısa bir madde.' }, { gorseller: [1] }],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
