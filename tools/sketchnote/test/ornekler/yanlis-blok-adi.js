// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Blok adında yazım hatası ("maddde"): eskiden sessizce kayboluyordu; artık hata verir.
Sketchnote.defterNotu({
  baslik: 'YANLIŞ BLOK ADI',
  bloklar: [{ konu: '1. Konu' }, { maddde: 'Bu madde kaybolmamalı.' }, { madde: 'Dolu madde.' }],
});
