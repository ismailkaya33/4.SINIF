// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Resim dosyası yok: yer tutucu basılır, uyarı verilir, basım durmaz.
Sketchnote.defterNotu({
  baslik: 'EKSİK RESİM',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Kısa bir madde.' }, { gorseller: [1, 2] }],
  gorseller: [
    { ad: 'Olmayan resim', resim: 'tools/sketchnote/test/ornekler/resimler/yok.png', istem: 'Bir görsel oluştur: deneme.',
      etiketler: [{ x: 255, y: 336, t: 'Etiket: İğne, Şişe, Çığ', boy: 22 }] },
    { ad: 'İstemsiz resim', resim: 'tools/sketchnote/test/ornekler/resimler/yok2.png' },
  ],
});
