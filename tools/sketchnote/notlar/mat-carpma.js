// Matematik — Doğal Sayılarla Çarpma İşlemi (ara tatil sonrası ilk konu; kazanım kodu doğrulanmalı). 2026-11-13.
// Kontrol: 4+4+4=12, 3×4=12, 24×3=72, 3×4=4×3, 9×1=9, 9×0=0, 25×10=250, 25×100=2500, 25×1000=25 000.
Sketchnote.defterNotu({
  baslik: 'ÇARPMA İŞLEMİ',
  bloklar: [
    { ara: 'Çarpma işlemi nedir?' },
    { madde: 'Aynı sayıların tekrar tekrar toplanmasının kısa yoluna **çarpma işlemi** denir. Çarpma işlemi **×** işaretiyle gösterilir.' },
    { gorsel: 1, metin: [
      'Üç tabakta dörder elma var.',
      'Toplama ile: 4 + 4 + 4 = 12',
      'Çarpma ile kısaca: **3 × 4 = 12**',
      '"Üç kere dört, on iki" diye okunur.',
    ] },
    { ara: 'Çarpma işleminin terimleri' },
    { gorsel: 2, metin: [
      'Çarpılan sayıların her birine **çarpan** denir.',
      'Çarpma işleminin sonucuna **çarpım** denir.',
      'Basamaklı çarpmada çarpmaya **birler basamağından** başlarız.',
    ] },
    { ara: 'Bilmemiz gerekenler' },
    { madde: 'Çarpanların yeri değişirse çarpım **değişmez**: 3 × 4 = 4 × 3 = 12' },
    { madde: 'Bir sayının **1** ile çarpımı sayının **kendisidir**: 9 × 1 = 9' },
    { madde: 'Bir sayının **0** ile çarpımı **0**\'dır: 9 × 0 = 0' },
    { madde: '**10, 100, 1000** ile çarparken sayının sağına **1, 2, 3 sıfır** yazarız.' },
    { ornek: '25 × 10 = 250   •   25 × 100 = 2500   •   25 × 1000 = 25 000' },
  ],
  gorseller: [
    { ad: 'Tekrarlı toplama', ciz(S) {
      const { rc, o, ekle, yazi, fosfor } = S, R = Sketchnote.R;
      yazi(270, 48, 'Çarpma = Tekrarlı Toplama', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      for (const cx of [100, 255, 410]) {
        ekle(rc.ellipse(cx, 150, 140, 64, o({ fill: S.r(Sketchnote.MAVI), fillStyle: 'hachure', hachureGap: 9, fillWeight: 1.2 })));
        for (const dx of [-42, -14, 14, 42]) {
          ekle(rc.circle(cx + dx, 132, 26, o({ fill: S.r(R.kirmizi), fillStyle: 'hachure', hachureGap: 5, strokeWidth: 2 })));
          ekle(rc.line(cx + dx, 119, cx + dx + 4, 110, o({ strokeWidth: 2 })));
        }
        yazi(cx, 214, '4', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      }
      yazi(255, 264, '4 + 4 + 4 = 12', 34, { 'text-anchor': 'middle' });
      const w = S.genislik('3 × 4 = 12', 42, { class: 'kalin' });
      fosfor(255 - w / 2 - 14, 296, w + 28, 46, S.r(Sketchnote.SARI) || 'none');
      yazi(255, 332, '3 × 4 = 12', 42, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    { ad: 'Terimler', ciz(S) {
      const { yazi, ok, ekle, rc, o } = S, R = Sketchnote.R;
      yazi(270, 48, 'Çarpma İşleminin Terimleri', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const sag = 250, boy = 56;
      yazi(sag, 128, '24', boy, { class: 'kalin', 'text-anchor': 'end' });
      yazi(150, 196, '×', boy, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(sag, 196, '3', boy, { class: 'kalin', 'text-anchor': 'end' });
      ekle(rc.line(130, 216, sag + 14, 216, o({ strokeWidth: 3 })));
      yazi(sag, 282, '72', boy, { class: 'kalin', 'text-anchor': 'end', fill: S.m(R.mavi) });
      const et = (y, t) => { ok([[352, y], [310, y + 2], [sag + 22, y]], S.m(R.mavi)); yazi(362, y + 10, t, 32, { class: 'kalin', fill: S.m(R.kirmizi) }); };
      et(110, 'çarpan'); et(178, 'çarpan'); et(264, 'çarpım');
      yazi(36, 336, '× → çarpma işareti', 24, { fill: S.m(R.lacivert) });
    } },
  ],
});
