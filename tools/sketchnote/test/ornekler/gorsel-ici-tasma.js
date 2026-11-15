// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Görselin içindeki yazı ve etiket 8,5 × 6 cm kutudan taşıyor: basılır ama uyarı verilir.
Sketchnote.defterNotu({
  baslik: 'GÖRSEL İÇİ TAŞMA',
  bloklar: [{ konu: '1. Konu' }, { gorseller: [1, 2] }],
  gorseller: [
    { ad: 'Taşan yazı', ciz(S) { S.yazi(300, 180, 'Bu yazı görsel kutusunun sağ kenarından dışarı taşacak kadar uzundur', 26, {}); } },
    { ad: 'Taşan etiket', resim: 'tools/sketchnote/test/ornekler/resimler/yok.png', istem: 'x',
      etiketler: [{ x: 255, y: 336, t: 'Bu etiket kutuya sığmayacak kadar uzun yazılmış bir açıklama cümlesidir', boy: 22 }] },
  ],
});
