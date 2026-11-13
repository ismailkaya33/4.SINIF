// Sosyal Bilgiler — Yönler ve Yön Bulma (ara tatil sonrası ilk konu; kazanım kodu doğrulanmalı). 2026-11-13.
// Not: öğle vakti gölgenin kuzeye düşmesi ülkemiz (Kuzey Yarım Küre) için geçerlidir. Güvenilmez halk yöntemleri
// (yosun, karınca yuvası vb.) bilerek yazılmadı.
Sketchnote.defterNotu({
  baslik: 'YÖNLER',
  bloklar: [
    { ara: 'Ana yönler ve ara yönler' },
    { madde: 'Dört **ana yön** vardır: **kuzey, güney, doğu, batı**.' },
    { gorsel: 1, metin: [
      'İki ana yönün arasındaki yönlere **ara yön** denir.',
      'Ara yönler: **kuzeydoğu, kuzeybatı, güneydoğu, güneybatı**.',
      'Haritalarda **kuzey** genellikle **yukarıyı** gösterir.',
    ] },
    { ara: 'Güneş ile yön bulma' },
    { madde: '**Güneş** her sabah **doğudan** doğar, akşam **batıdan** batar.' },
    { gorsel: 2, metin: [
      'Sabah Güneş\'in doğduğu yöne dönüp kollarımızı yana açarız.',
      'Önümüz **doğu**, arkamız **batı**dır.',
      'Sol kolumuz **kuzeyi**, sağ kolumuz **güneyi** gösterir.',
    ] },
    { ara: 'Başka yön bulma yolları' },
    { madde: '**Pusula**nın renkli ibresi her zaman **kuzeyi** gösterir.' },
    { madde: 'Geceleri **Kutup Yıldızı** kuzey yönündedir.' },
    { madde: 'Ülkemizde öğle vakti cisimlerin **gölgesi kuzeye** düşer.' },
  ],
  gorseller: [
    { ad: 'Yön gülü', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      const cx = 255, cy = 192, U = 112, A = 66, D = 18;
      // ara yön uçları (ince), sonra ana yön uçları (büyük)
      for (let i = 0; i < 4; i++) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const uc = [cx + A * Math.cos(a), cy + A * Math.sin(a)];
        const y1 = [cx + D * Math.cos(a + Math.PI / 2), cy + D * Math.sin(a + Math.PI / 2)], y2 = [cx + D * Math.cos(a - Math.PI / 2), cy + D * Math.sin(a - Math.PI / 2)];
        ekle(rc.polygon([y1, uc, y2], o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 1.8 })));
      }
      for (let i = 0; i < 4; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 2;
        const uc = [cx + U * Math.cos(a), cy + U * Math.sin(a)];
        const y1 = [cx + 24 * Math.cos(a + Math.PI / 2), cy + 24 * Math.sin(a + Math.PI / 2)], y2 = [cx + 24 * Math.cos(a - Math.PI / 2), cy + 24 * Math.sin(a - Math.PI / 2)];
        ekle(rc.polygon([y1, uc, y2], o({ fill: S.r(i === 0 ? R.kirmizi : SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
      }
      ekle(rc.circle(cx, cy, 20, o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 2 })));
      const ana = { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) }, araY = { 'text-anchor': 'middle', fill: S.m(R.lacivert) };
      yazi(cx, 66, 'KUZEY', 28, ana);
      yazi(cx, 342, 'GÜNEY', 28, ana);
      yazi(cx - U - 52, cy + 10, 'BATI', 28, ana);
      yazi(cx + U + 54, cy + 10, 'DOĞU', 28, ana);
      yazi(cx - 112, cy - 84, 'kuzeybatı', 22, araY);
      yazi(cx + 112, cy - 84, 'kuzeydoğu', 22, araY);
      yazi(cx - 112, cy + 98, 'güneybatı', 22, araY);
      yazi(cx + 112, cy + 98, 'güneydoğu', 22, araY);
    } },
    { ad: 'Güneş ile yön bulma', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R, SARI = Sketchnote.SARI;
      yazi(300, 40, 'Güneş ile Yön Bulma', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // Ufuk ve doğan Güneş (çocuğun önünde)
      ekle(rc.line(40, 110, 470, 110, o({ strokeWidth: 2 })));
      ekle(rc.arc(255, 110, 76, 76, Math.PI, 2 * Math.PI, false, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 6 })));
      for (let i = 1; i < 6; i++) { const a = Math.PI + i * Math.PI / 6; ekle(rc.line(255 + 46 * Math.cos(a), 110 + 46 * Math.sin(a), 255 + 60 * Math.cos(a), 110 + 60 * Math.sin(a), o({ stroke: S.m(R.sari), strokeWidth: 2.4 }))); }
      yazi(360, 98, 'ÖNÜ: DOĞU', 24, { class: 'kalin', fill: S.m(R.kirmizi) });
      // Arkadan görünen çocuk, kollar yana açık
      ekle(rc.circle(255, 156, 40, o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 2.4 })));
      ekle(rc.line(255, 176, 255, 258, o({ strokeWidth: 3 })));
      ekle(rc.line(255, 258, 232, 312, o({ strokeWidth: 3 })));
      ekle(rc.line(255, 258, 278, 312, o({ strokeWidth: 3 })));
      ekle(rc.line(178, 200, 332, 200, o({ strokeWidth: 3 })));
      ok([[178, 200], [160, 200], [140, 200]], S.m(R.mavi));
      ok([[332, 200], [350, 200], [370, 200]], S.m(R.mavi));
      yazi(80, 178, 'sol kol', 22, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(80, 210, 'KUZEY', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(432, 178, 'sağ kol', 22, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(432, 210, 'GÜNEY', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(255, 345, 'ARKASI: BATI', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
  ],
});
