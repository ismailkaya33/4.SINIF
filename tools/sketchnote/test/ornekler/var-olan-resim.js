// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Resim dosyası var (küçük deneme resmi): sayfaya gömülür; yer tutucu ve eksik resim uyarısı çıkmaz.
Sketchnote.defterNotu({
  baslik: 'RESİMLİ',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Kısa bir madde.' }, { gorseller: [1] }],
  gorseller: [
    { ad: 'Deneme resmi', resim: 'tools/sketchnote/test/ornekler/resimler/deneme.png', istem: 'Bir görsel oluştur: deneme.',
      etiketler: [{ x: 255, y: 336, t: 'Deneme etiketi', boy: 22 }] },
  ],
});
