// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Boş blok: sessizce atlanmaz, hata verilir.
Sketchnote.defterNotu({
  baslik: 'BOŞ BLOK',
  bloklar: [{ konu: '1. Konu' }, {}, { madde: '' }, { adim: [] }, { madde: 'Dolu madde.' }],
  gorseller: [],
});
