// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Bölünemeyen çok uzun sözcük: satır sağdan taşar → hata.
Sketchnote.defterNotu({
  baslik: 'UZUN SÖZCÜK',
  bloklar: [{ konu: '1. Konu' }, { madde: 'ÇekoslovakyalılaştıramadıklarımızdanmışsınızcasınaÇekoslovakyalılaştıramadıklarımızdanmışsınızcasına bir sözcük.' }],
});
