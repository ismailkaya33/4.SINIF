// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Türkçe karakterler her yerde: başlık, alt konu, ara başlık, madde, kalın, örnek, etiket, görsel içi yazı.
Sketchnote.defterNotu({
  baslik: 'ÇIĞ, ŞİİR, ÜZÜM, ÖĞLE, IĞDIR',
  bloklar: [
    { konu: '1. İıĞğÜüŞşÖöÇç âîû ÂÎÛ' },
    { ara: 'Şapkalı harfler: kâğıt, hâlâ, millî' },
    { madde: '**Iğdır**, **İstanbul**, **Şanlıurfa**, **Çorum**, **Ödemiş**, **Ünye**, **Gümüşhane**: ığ, iş, öç, üç; "tırnak" ve \'kesme\'.' },
    { ornek: 'çığlık → ÇIĞLIK   •   iğne → İĞNE   •   ıslak → ISLAK   •   kâr ≠ kar' },
    { dikkat: 'Büyük **İ** noktalı, büyük **I** noktasızdır: ilik → İLİK, ılık → ILIK.' },
    { adim: ['Şöyle böyle: çöğür', 'Öğüt: gül gülü güllü'] },
    { gorseller: [1, 2] },
  ],
  gorseller: [
    { ad: 'Şemalı görsel', ciz(S) { S.yazi(255, 180, 'ĞÜŞİÖÇ ğüşıöç', 34, { class: 'kalin', 'text-anchor': 'middle' }); } },
    { ad: 'Çığ düşen dağ', resim: 'tools/sketchnote/test/ornekler/resimler/yok-çığ.png', istem: 'Bir görsel oluştur: dağ.',
      etiketler: [{ x: 255, y: 336, t: 'ÇIĞ: dağdan düşen kar kütlesi', boy: 22 }] },
  ],
});
