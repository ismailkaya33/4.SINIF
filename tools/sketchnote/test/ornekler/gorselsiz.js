// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Hiç görseli olmayan not: not sayfası basılır; kes-yapıştır istenirse anlaşılır hata verir.
Sketchnote.defterNotu({
  baslik: 'GÖRSELSİZ NOT',
  bloklar: [{ konu: '1. Konu' }, { madde: 'Yalnız yazıdan oluşan **kısa** not.' }, { sayfa: true }, { sayfa: true }, { madde: 'İkinci sayfa.' }, { sayfa: true }],
});
