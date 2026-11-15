// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Dosya var ama resim değil (indirme hatası gibi): yer tutucu basılır, uyarı verilir.
Sketchnote.defterNotu({
  baslik: 'BOZUK RESİM',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Kısa bir madde.' }, { gorseller: [1] }],
  gorseller: [{ ad: 'Bozuk dosya', resim: 'tools/sketchnote/test/ornekler/resimler/bozuk.png', istem: 'Bir görsel oluştur: deneme.' }],
});
