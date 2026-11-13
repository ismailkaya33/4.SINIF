// Fen — Kuvvetin Etkileri (ara tatil sonrası ilk konu; kazanım kodu doğrulanmalı). 2026-11-13.
Sketchnote.defterNotu({
  baslik: 'KUVVETİN ETKİLERİ',
  bloklar: [
    { ara: 'Kuvvet nedir?' },
    { madde: 'Bir cisme uygulanan **itme** ya da **çekme** etkisine **kuvvet** denir.' },
    { gorsel: 1, metin: [
      'Bir kutuyu ya da kapıyı ittiğimizde **itme** kuvveti uygularız.',
      'Çekmeceyi açarken ya da ipi çekerken **çekme** kuvveti uygularız.',
      'Kuvveti göremeyiz ama **etkilerini** görebiliriz.',
    ] },
    { ara: 'Kuvvetin etkileri' },
    { gorsel: 2, metin: [
      'Duran bir cismi **hareket ettirir**.',
      'Hareket eden cismi **durdurur**, **hızlandırır** ya da **yavaşlatır**.',
      'Hareket eden cismin **yönünü** değiştirir.',
      'Bazı cisimlerin **şeklini** değiştirir.',
    ] },
    { ara: 'Günlük hayattan örnekler' },
    { madde: 'Duran topa vurunca top **hareket eder**.' },
    { madde: 'Kaleci gelen topu tutunca top **durur**.' },
    { madde: 'Gelen topa kafa vurunca topun **yönü değişir**.' },
    { madde: 'Oyun hamurunu sıkınca hamurun **şekli değişir**.' },
  ],
  gorseller: [
    { ad: 'İtme ve çekme', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 48, 'İtme ve Çekme', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      ekle(rc.line(255, 74, 255, 340, o({ strokeWidth: 1.6, strokeLineDash: [8, 8] })));
      // İTME: zemin, kutu, itme oku
      ekle(rc.line(20, 270, 240, 270, o({ strokeWidth: 2 })));
      ekle(rc.rectangle(120, 170, 100, 100, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 8 })));
      ekle(rc.line(120, 170, 220, 270, o({ strokeWidth: 1.4 }))); ekle(rc.line(220, 170, 120, 270, o({ strokeWidth: 1.4 })));
      ok([[30, 220], [70, 218], [110, 220]], S.m(R.kirmizi));
      yazi(128, 318, 'İTME', 34, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // ÇEKME: dolap, açılmış çekmece, çekme oku
      ekle(rc.rectangle(285, 120, 120, 150, o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1.2 })));
      ekle(rc.rectangle(300, 140, 90, 50, o({ fill: '#fff', fillStyle: 'solid' })));
      ekle(rc.rectangle(345, 205, 110, 50, o({ fill: '#fff', fillStyle: 'solid' })));
      ekle(rc.circle(445, 230, 12, o({ fill: S.r(R.kirmizi) || '#fff', fillStyle: 'solid', strokeWidth: 2 })));
      ok([[452, 230], [475, 231], [500, 230]], S.m(R.kirmizi));
      ekle(rc.line(270, 270, 500, 270, o({ strokeWidth: 2 })));
      yazi(390, 318, 'ÇEKME', 34, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    { ad: 'Kuvvetin etkileri', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R, SARI = Sketchnote.SARI;
      yazi(270, 44, 'Kuvvetin Etkileri', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      ekle(rc.line(255, 64, 255, 350, o({ strokeWidth: 1.4, strokeLineDash: [8, 8] })));
      ekle(rc.line(16, 208, 494, 208, o({ strokeWidth: 1.4, strokeLineDash: [8, 8] })));
      const top = (x, y) => ekle(rc.circle(x, y, 34, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2 })));
      const etiket = (x, y, t) => yazi(x, y, t, 23, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // 1) Harekete geçirir: kuvvet oku topa değiyor, top ileri gidiyor
      ok([[30, 130], [55, 129], [82, 130]], S.m(R.kirmizi));
      top(102, 130);
      for (const dy of [-10, 0, 10]) ekle(rc.line(130 + Math.abs(dy), 130 + dy, 165, 130 + dy, o({ strokeWidth: 1.6 })));
      ok([[175, 130], [200, 129], [230, 130]], S.m(R.mavi));
      etiket(128, 190, 'Hareket ettirir');
      // 2) Durdurur: top duvara gelip duruyor
      for (const dy of [-10, 0, 10]) ekle(rc.line(285, 130 + dy, 330 - Math.abs(dy), 130 + dy, o({ strokeWidth: 1.6 })));
      top(372, 130);
      ekle(rc.rectangle(392, 84, 26, 80, o({ fill: S.r(R.mavi), fillStyle: 'cross-hatch', hachureGap: 7, fillWeight: 1.2 })));
      etiket(383, 190, 'Durdurur');
      // 3) Yönünü değiştirir: zemine çarpıp seken top
      ekle(rc.line(20, 300, 240, 300, o({ strokeWidth: 2 })));
      ok([[30, 230], [80, 262], [120, 296]], S.m(R.mavi));
      ok([[124, 296], [170, 262], [215, 230]], S.m(R.mavi));
      top(122, 282);
      etiket(128, 336, 'Yönünü değiştirir');
      // 4) Şeklini değiştirir: yuvarlak hamur → bastırılınca yassı
      ekle(rc.circle(305, 270, 52, o({ fill: S.r(R.pembe), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2 })));
      ok([[340, 270], [362, 269], [384, 270]], S.m(R.kirmizi));
      ekle(rc.ellipse(440, 284, 96, 30, o({ fill: S.r(R.pembe), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2 })));
      ok([[440, 228], [441, 248], [440, 264]], S.m(R.kirmizi));
      etiket(383, 336, 'Şeklini değiştirir');
    } },
  ],
});
