// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Bir blokta iki tür (madde + gorseller): ikincisi sessizce kaybolmasın, hata versin.
Sketchnote.defterNotu({
  baslik: 'İKİ TÜRLÜ BLOK',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Madde.', gorseller: [1] }],
  gorseller: [{ ad: 'Örnek şema', ciz(S) { S.yazi(255, 180, 'Örnek görsel', 30, { class: 'kalin', 'text-anchor': 'middle' }); } }],
});
