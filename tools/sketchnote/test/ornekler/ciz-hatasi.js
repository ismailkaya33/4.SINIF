// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Görsel çiziminde program hatası (tanımsız değişken): "Sayfa çizilemedi" yerine hatanın kendisi gösterilir.
Sketchnote.defterNotu({
  baslik: 'ÇİZİM HATASI',
  bloklar: [{ konu: '1. Konu' }, { gorseller: [1] }],
  gorseller: [{ ad: 'Hatalı', ciz(S) { S.yazi(10, 10, olmayanDegisken, 20, {}); } }],
});
