// Türkçe — Cümle Bilgisi (ara tatil sonrası ilk konu; kazanım kodu doğrulanmalı). 2026-11-13.
Sketchnote.defterNotu({
  baslik: 'CÜMLE BİLGİSİ',
  bloklar: [
    { ara: 'Cümle nedir?' },
    { madde: 'Bir duygu, düşünce, istek ya da olayı **tam olarak anlatan** sözcük grubuna **cümle** denir.' },
    { gorsel: 1, metin: [
      'Sözcükler **anlamlı bir sıra** ile dizilince cümle oluşur.',
      'Cümle **büyük harfle** başlar.',
      'Cümlenin sonuna **nokta (.)**, **soru işareti (?)** ya da **ünlem işareti (!)** konur.',
    ] },
    { ara: 'Cümle çeşitleri' },
    { gorsel: 2, metin: [
      '**Olumlu cümle:** İş ya da olayın **yapıldığını** bildirir.',
      '**Olumsuz cümle:** İş ya da olayın **yapılmadığını** bildirir.',
      '**Soru cümlesi:** Bir şey öğrenmek için sorulur, sonuna **?** konur.',
    ] },
    { dikkat: 'Olumsuz cümlelerde genellikle **-ma, -me** ekleri ya da **değil, yok** sözcükleri bulunur.' },
  ],
  gorseller: [
    { ad: 'Sözcüklerden cümleye', ciz(S) {
      const { rc, o, ekle, yazi, ok, genislik } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 46, 'Sözcüklerden Cümleye', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // Karışık sözcük kartları
      const kart = (x, y, t, renk) => {
        const w = genislik(t, 30) + 30;
        ekle(rc.rectangle(x - w / 2, y - 30, w, 46, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.2, strokeWidth: 2 })));
        yazi(x, y + 2, t, 30, { 'text-anchor': 'middle' });
      };
      kart(110, 108, 'okudu', SARI); kart(260, 124, 'kitap', MAVI); kart(400, 104, 'Elif', R.pembe);
      ok([[255, 152], [256, 172], [255, 196]], S.m(R.mavi));
      // Doğru sıralı cümle
      const cumle = 'Elif kitap okudu.';
      const w = genislik(cumle, 40, { class: 'kalin' }), x0 = 255 - w / 2;
      ekle(rc.rectangle(x0 - 20, 206, w + 40, 64, o({ strokeWidth: 2.4 })));
      yazi(255, 252, cumle, 40, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // E harfi ve nokta işaretleniyor
      const eW = genislik('E', 40, { class: 'kalin' });
      ekle(rc.circle(x0 + eW / 2, 238, 46, o({ stroke: S.m(R.kirmizi), strokeWidth: 2.4 })));
      ekle(rc.circle(x0 + w - 4, 246, 24, o({ stroke: S.m(R.kirmizi), strokeWidth: 2.4 })));
      ok([[x0 - 4, 312], [x0 + 2, 290], [x0 + eW / 2 - 4, 266]], S.m(R.kirmizi));
      yazi(x0 - 30, 340, 'büyük harf', 24, { class: 'kalin', fill: S.m(R.kirmizi) });
      ok([[x0 + w + 20, 312], [x0 + w + 8, 290], [x0 + w - 2, 262]], S.m(R.kirmizi));
      yazi(x0 + w - 10, 340, 'nokta', 24, { class: 'kalin', fill: S.m(R.kirmizi) });
    } },
    { ad: 'Cümle çeşitleri', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R;
      yazi(270, 44, 'Cümle Çeşitleri', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const satirlar = [
        ['+', 'Olumlu', 'Bugün hava güneşli.', R.yesil],
        ['−', 'Olumsuz', 'Bugün hava güneşli değil.', R.kirmizi],
        ['?', 'Soru', 'Bugün hava güneşli mi?', R.mavi],
      ];
      satirlar.forEach(([isaret, ad, ornek, renk], i) => {
        const y = 78 + i * 92;
        ekle(rc.circle(52, y + 34, 50, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
        yazi(52, y + 46, isaret, 38, { class: 'kalin', 'text-anchor': 'middle', fill: '#111' });
        yazi(92, y + 22, ad, 24, { class: 'kalin', fill: S.m(renk) });
        // konuşma balonu
        ekle(rc.rectangle(92, y + 30, 400, 46, o({ strokeWidth: 2 })));
        yazi(106, y + 62, ornek, 28, { fill: S.m(R.lacivert) });
      });
    } },
  ],
});
