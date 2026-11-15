// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Notta olmayan görsel numarası (5) → hata.
Sketchnote.defterNotu({
  baslik: 'TANIMSIZ GÖRSEL',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Madde.' }, { gorseller: [1, 5] }],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
