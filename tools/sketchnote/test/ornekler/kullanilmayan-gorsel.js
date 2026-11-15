// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Görsel tanımlı ama notta yeri yok; bir görsel de iki kez kullanılmış → uyarı.
Sketchnote.defterNotu({
  baslik: 'KULLANILMAYAN GÖRSEL',
  bloklar: [{ konu: '1. Konu' }, { gorseller: [1, 1] }],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }, { ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
