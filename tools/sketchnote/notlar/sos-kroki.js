// Sosyal Bilgiler — Kroki (11. hafta). Kazanım: SB.4.3.2 Günlük yaşamında kullandığı mekânların krokisini çizer
// (SB.4.3.2 yıllık planda doğrulandı). Etkinlik: Sosyal/krokiatolyesi.html. Önceki not: sos-yonler.js (yönler, krokide yön).
// İki görsel de kodla çizildi (resim yuvası yok): 1) aynı odanın yandan ve kuşbakışı görünüşü, 2) açıklama kutulu örnek sınıf krokisi.
Sketchnote.defterNotu({
  baslik: 'KROKİ',
  bloklar: [
    { konu: '1. Kroki nedir?' },
    { madde: '**Kroki**, bir yerin **kuşbakışı** (yukarıdan) görünüşünün **ölçü kullanılmadan**, yaklaşık olarak çizilmiş hâlidir.' },
    { madde: 'Krokide eşyalar ve yerler basit **simgelerle** gösterilir. Desen, renk ve küçük ayrıntılar çizilmez.' },
    { madde: 'Evimizin, sınıfımızın, okul bahçemizin yerini ya da bir yere nasıl gidileceğini anlatmak için kroki çizeriz.' },

    { konu: '2. Resim, kroki ve harita' },
    { gorsel: 1, metin: [
      '**Resim / fotoğraf:** önden ya da yandan görünüştür; her ayrıntı ve renk görünür.',
      '**Kroki:** kuşbakışıdır; ölçüsüz, yaklaşık çizilir; simge, açıklama kutusu ve yön oku vardır.',
      '**Harita:** kuşbakışıdır; **ölçekli**, yani belli oranda küçültülerek çizilir.',
    ] },

    { konu: '3. Kroki çizerken' },
    { adim: [
      'Çizeceğin yeri iyi gözle; büyük eşyaların yerini belirle.',
      'Kâğıda **yön okunu** çiz. Kuzey genellikle yukarıda gösterilir.',
      'Duvarları ya da sınırları çiz; **kapı** ve **pencereleri** göster.',
      'Eşyaları yukarıdan göründükleri gibi **basit simgelerle** yerleştir.',
      '**Açıklama kutusu** çiz; her simgenin anlamını yaz. Krokine bir **başlık** ver.',
    ] },

    { konu: '4. Simgeler ve açıklama kutusu' },
    { gorsel: 2, metin: [
      'Simgelerin ne anlama geldiği **açıklama kutusunda** (lejant) yazılır.',
      'Açıklama kutusu olmayan krokiyi başkaları **anlayamaz**.',
      'Krokiyi okurken önce **yön okuna**, sonra açıklama kutusuna bakarız.',
    ] },
    { ara: 'Görsel 2\'yi okuyalım', birlikte: true },
    { ornek: 'Tahta **kuzey** duvarındadır   •   Pencere **batı** duvarındadır' },
    { ornek: 'Dolap **kuzeydoğu** köşesindedir   •   Saksı **güneybatı** köşesindedir' },
    { ornek: 'Kapı **güney** duvarındadır; içeri giren öğrenci **kuzeye**, yani tahtaya bakar.' },
    { dikkat: 'Kâğıdın üstü her zaman kuzey değildir; yönü **yön oku** gösterir. "Kapıdan girince sağda" denirse kapıdan **içeri bakan** kişinin sağını düşün.' },
  ],

  gorseller: [
    // 1 — Aynı odanın yandan ve kuşbakışı görünüşü
    { ad: 'Yandan ve kuşbakışı', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, MAVI = Sketchnote.MAVI, SARI = Sketchnote.SARI;
      const kalin = { class: 'kalin', 'text-anchor': 'middle' };
      yazi(128, 36, 'YANDAN (resim)', 22, Object.assign({ fill: S.m(R.kirmizi) }, kalin));
      yazi(378, 36, 'KUŞBAKIŞI (kroki)', 22, Object.assign({ fill: S.m(R.mavi) }, kalin));
      // Sol: önden görünüş
      ekle(rc.rectangle(18, 56, 220, 236, o({ strokeWidth: 2 })));
      ekle(rc.line(18, 292, 238, 292, o({ strokeWidth: 3.2 })));
      ekle(rc.rectangle(104, 82, 58, 48, o({ fill: S.r('#bfe6ff'), fillStyle: 'solid', strokeWidth: 2 })));
      ekle(rc.line(133, 82, 133, 130, o({ strokeWidth: 1.6 }))); ekle(rc.line(104, 106, 162, 106, o({ strokeWidth: 1.6 })));
      ekle(rc.rectangle(30, 112, 52, 180, o({ fill: S.r('#e8c49a'), fillStyle: 'hachure', hachureGap: 8, strokeWidth: 2.2 })));
      ekle(rc.line(56, 112, 56, 292, o({ strokeWidth: 1.6 })));
      ekle(rc.circle(50, 200, 6, o({ fill: '#111', fillStyle: 'solid' }))); ekle(rc.circle(62, 200, 6, o({ fill: '#111', fillStyle: 'solid' })));
      ekle(rc.rectangle(150, 222, 76, 10, o({ fill: S.r('#d9a66b'), fillStyle: 'solid', strokeWidth: 2 })));
      ekle(rc.line(158, 232, 158, 292, o({ strokeWidth: 2.6 }))); ekle(rc.line(218, 232, 218, 292, o({ strokeWidth: 2.6 })));
      yazi(56, 316, 'dolap', 18, { 'text-anchor': 'middle' }); yazi(188, 316, 'masa', 18, { 'text-anchor': 'middle' }); yazi(133, 152, 'pencere', 16, { 'text-anchor': 'middle' });
      // Ok
      S.ok([[240, 190], [254, 186], [266, 190]], S.m(R.kirmizi));
      // Sağ: kuşbakışı kroki
      const X = 276, Y = 70, W = 196, H = 222;
      ekle(rc.rectangle(X, Y, W, H, o({ strokeWidth: 5 })));
      ekle(rc.rectangle(X + 70, Y - 7, 58, 14, o({ fill: S.r('#bfe6ff'), fillStyle: 'solid', strokeWidth: 2 }))); ekle(rc.line(X + 70, Y, X + 128, Y, o({ strokeWidth: 1.2, roughness: 0.5 })));
      ekle(rc.rectangle(X + 10, Y + 10, 52, 40, o({ fill: S.r('#e8c49a'), fillStyle: 'hachure', hachureGap: 8, strokeWidth: 2.2 })));
      ekle(rc.line(X + 10, Y + 10, X + 62, Y + 50, o({ strokeWidth: 1.5 }))); ekle(rc.line(X + 62, Y + 10, X + 10, Y + 50, o({ strokeWidth: 1.5 })));
      ekle(rc.rectangle(X + 118, Y + 12, 68, 30, o({ fill: S.r('#d9a66b'), fillStyle: 'solid', strokeWidth: 2 })));
      ekle(rc.circle(X + 152, Y + 58, 20, o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 5, strokeWidth: 2 })));
      // kapı (güney duvarı ortası): boşluk + kanat + açılma yayı
      ekle(rc.rectangle(X + 74, Y + H - 4, 52, 8, o({ stroke: 'none', fill: '#fff', fillStyle: 'solid', roughness: 0 })));
      ekle(rc.line(X + 76, Y + H, X + 76, Y + H - 46, o({ strokeWidth: 2.6 })));
      ekle(rc.arc(X + 76, Y + H, 92, 92, -Math.PI / 2, 0, false, o({ strokeWidth: 1.6, strokeLineDash: [6, 5] })));
      yazi(X + 36, Y + 72, 'dolap', 17, { 'text-anchor': 'middle' }); yazi(X + 152, Y + 92, 'masa', 17, { 'text-anchor': 'middle' }); yazi(X + 100, Y + H - 56, 'kapı', 17, { 'text-anchor': 'middle' });
      // yön oku
      S.ok([[494, 150], [495, 120], [494, 92]], S.m(R.kirmizi));
      yazi(494, 172, 'K', 24, Object.assign({ fill: S.m(R.kirmizi) }, kalin));
      yazi(255, 344, 'Aynı oda: önden ve yukarıdan bakış', 19, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      void SARI;
    } },
    // 2 — Örnek sınıf krokisi + açıklama kutusu (lejant)
    { ad: 'Sınıfımızın krokisi', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, MAVI = Sketchnote.MAVI, SARI = Sketchnote.SARI;
      const U = 58, X = 14, Y = 58, C = 5, RW = 5;
      yazi(170, 36, 'Sınıfımızın Krokisi', 24, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const W = C * U, H = RW * U;   // 290 x 290 → alt kenar 348
      // simge çizicileri (x, y = sol üst; k = ölçek)
      const tahta = (x, y, w) => ekle(rc.rectangle(x, y, w, 10, o(S.r('#2f6b4f') ? { fill: '#2f6b4f', fillStyle: 'solid', strokeWidth: 1.8 } : { fill: '#111', fillStyle: 'cross-hatch', hachureGap: 2.5, strokeWidth: 1.8 })));
      const omasa = (x, y, k) => { ekle(rc.rectangle(x, y + 18 * k, 42 * k, 22 * k, o({ fill: S.r('#c98f5a'), fillStyle: 'solid', strokeWidth: 1.8 }))); ekle(rc.circle(x + 21 * k, y + 7 * k, 13 * k, o({ fill: S.r(SARI), fillStyle: 'solid', strokeWidth: 1.6 }))); };
      const sira = (x, y, k) => { ekle(rc.rectangle(x, y, 42 * k, 14 * k, o({ fill: S.r('#f6d28f'), fillStyle: 'solid', strokeWidth: 1.8 })));
        ekle(rc.circle(x + 12 * k, y + 26 * k, 12 * k, o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 4, strokeWidth: 1.4 }))); ekle(rc.circle(x + 30 * k, y + 26 * k, 12 * k, o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 4, strokeWidth: 1.4 }))); };
      const dolap = (x, y, w, h) => { ekle(rc.rectangle(x, y, w, h, o({ fill: S.r('#e8c49a'), fillStyle: 'solid', strokeWidth: 2 }))); ekle(rc.line(x, y, x + w, y + h, o({ strokeWidth: 1.4 }))); ekle(rc.line(x + w, y, x, y + h, o({ strokeWidth: 1.4 }))); };
      const pencereD = (x, y, h) => { ekle(rc.rectangle(x - 6, y, 12, h, o({ fill: S.r('#bfe6ff'), fillStyle: 'solid', strokeWidth: 1.8 }))); ekle(rc.line(x, y, x, y + h, o({ strokeWidth: 1.2, roughness: 0.6 }))); };
      const saksi = (cx, cy, d) => { ekle(rc.circle(cx, cy, d, o({ fill: S.r('#c56a3a'), fillStyle: 'solid', strokeWidth: 1.8 }))); ekle(rc.circle(cx, cy, d * 0.55, o({ fill: S.r(R.yesil), fillStyle: 'solid', strokeWidth: 1 }))); };
      const kapi = (hx, hy, r) => { ekle(rc.line(hx, hy, hx, hy - r, o({ strokeWidth: 2.6 }))); ekle(rc.arc(hx, hy, 2 * r, 2 * r, -Math.PI / 2, 0, false, o({ strokeWidth: 1.5, strokeLineDash: [5, 4] }))); };
      // duvarlar (güney duvarında kapı boşluğu)
      const kx = X + 4 * U + 6;
      ekle(rc.line(X, Y, X + W, Y, o({ strokeWidth: 5 }))); ekle(rc.line(X, Y, X, Y + H, o({ strokeWidth: 5 }))); ekle(rc.line(X + W, Y, X + W, Y + H, o({ strokeWidth: 5 })));
      ekle(rc.line(X, Y + H, kx, Y + H, o({ strokeWidth: 5 }))); ekle(rc.line(kx + 44, Y + H, X + W, Y + H, o({ strokeWidth: 5 })));
      // eşyalar
      tahta(X + 2 * U - 14, Y + 4, U + 28);
      omasa(X + U + 8, Y + 10, 1);
      dolap(X + 4 * U + 6, Y + 6, 46, 40);
      pencereD(X, Y + U + 12, U * 2 - 24);
      saksi(X + 28, Y + H - 28, 30);
      kapi(kx, Y + H, 42);
      for (const c of [1, 2, 3]) for (const r of [2, 3]) sira(X + c * U + 8, Y + r * U + 4, 1);
      // yön oku
      S.ok([[400, 112], [401, 88], [400, 62]], S.m(R.kirmizi));
      yazi(426, 92, 'K', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // açıklama kutusu
      const LX = 328, LY = 130;
      ekle(rc.rectangle(LX, LY - 6, 176, 226, o({ strokeWidth: 1.8, strokeLineDash: [8, 5] })));
      yazi(LX + 88, LY + 18, 'Açıklama', 19, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const satir = (i) => LY + 34 + i * 27;
      tahta(LX + 8, satir(0) + 4, 34); yazi(LX + 52, satir(0) + 15, 'tahta', 16, {});
      omasa(LX + 12, satir(1) - 2, 0.6); yazi(LX + 52, satir(1) + 15, 'öğretmen masası', 16, {});
      sira(LX + 12, satir(2) + 1, 0.6); yazi(LX + 52, satir(2) + 15, 'sıra', 16, {});
      dolap(LX + 12, satir(3) + 2, 26, 18); yazi(LX + 52, satir(3) + 15, 'dolap', 16, {});
      ekle(rc.rectangle(LX + 8, satir(4) + 6, 34, 9, o({ fill: S.r('#bfe6ff'), fillStyle: 'solid', strokeWidth: 1.6 }))); ekle(rc.line(LX + 8, satir(4) + 10.5, LX + 42, satir(4) + 10.5, o({ strokeWidth: 1.1, roughness: 0.5 }))); yazi(LX + 52, satir(4) + 15, 'pencere', 16, {});
      ekle(rc.line(LX + 14, satir(5) + 22, LX + 14, satir(5) + 2, o({ strokeWidth: 2.2 }))); ekle(rc.arc(LX + 14, satir(5) + 22, 40, 40, -Math.PI / 2, 0, false, o({ strokeWidth: 1.3, strokeLineDash: [4, 3] }))); yazi(LX + 52, satir(5) + 15, 'kapı', 16, {});
      saksi(LX + 25, satir(6) + 10, 18); yazi(LX + 52, satir(6) + 15, 'saksı', 16, {});
    } },
  ],
});
