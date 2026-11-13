// Matematik — Doğal Sayılarla Çarpma İşlemi, 7 alt konu (öğretmen onayladı 2026-11-13; kazanım kodları doğrulanmalı).
// Hesap kontrolü: 3×5=5×3=15; 32×3=96; 32×1=32; 32×0=0; 247×3=741 (7×3=21, 4×3+2=14, 2×3+1=7);
// 136×4=544, 136×20=2720, 544+2720=3264; 215×2=430, 215×30=6450, 430+6450=6880; 47×10=470, ×100=4700, ×1000=47 000;
// 12×30=360; 8×400=3200; 15×2000=30 000; 40×300=12 000; 46×5=230; 18×50=900; 36×25=900; (2×3)×4=2×(3×4)=24;
// 5×7×2=70; 25×9×4=900; 48×21=1008, tahmin 50×20=1000; 24×28=672 (24×8=192, 24×20=480), tahmin 20×30=600.
Sketchnote.defterNotu({
  baslik: 'ÇARPMA İŞLEMİ',
  bloklar: [
    { konu: '1. Çarpma işleminin anlamı ve terimleri' },
    { madde: 'Aynı sayıların tekrar tekrar toplanmasının kısa yoluna **çarpma işlemi** denir. Çarpma işlemi **×** işaretiyle gösterilir, "kere" diye okunur.' },
    { madde: '5 + 5 + 5 = 15 toplamasını kısaca **3 × 5 = 15** diye yazarız.' },
    { madde: 'Çarpılan sayıların her birine **çarpan**, işlemin sonucuna **çarpım** denir.' },
    { madde: 'Çarpanların yeri değişirse çarpım **değişmez**: 3 × 5 = 5 × 3 = 15' },
    { madde: 'Bir sayının **1** ile çarpımı kendisidir, **0** ile çarpımı **0**\'dır: 32 × 1 = 32, 32 × 0 = 0' },
    { gorseller: [1, 2] },

    { konu: '2. Eldeli çarpma' },
    { madde: 'Alt alta çarpmada çarpmaya **birler basamağından** başlarız. Bir basamağın çarpımı 10 ya da daha büyükse birlerini yazar, onlarını **elde** olarak bir sonraki basamağın çarpımına **ekleriz**.' },
    { ara: 'İki basamaklı sayıyla çarpma' },
    { adim: [
      'Önce çarpanın **birler** basamağıyla çarparız: 136 × 4 = 544',
      'Sonra **onlar** basamağıyla çarparız; birler basamağına **0** yazarız: 136 × 20 = 2720',
      'Bulduğumuz iki sonucu **toplarız**: 544 + 2720 = **3264**',
    ] },
    { ornek: 'Sen de dene: 215 × 32 → 430 + 6450 = 6880' },
    { gorseller: [3, 4] },

    { konu: '3. 10, 100, 1000 ve katlarıyla kısa yoldan çarpma' },
    { madde: 'Bir sayıyı **10, 100, 1000** ile çarparken sayının sağına sırasıyla **1, 2, 3 sıfır** yazarız.' },
    { ornek: '47 × 10 = 470   •   47 × 100 = 4700   •   47 × 1000 = 47 000' },
    { madde: 'Sonu sıfırlı sayıları çarparken önce **sıfır olmayan** kısımları çarparız, sonra iki sayının sonundaki **sıfırların toplamı** kadar sıfır ekleriz.' },
    { ornek: '12 × 30 = 360   •   8 × 400 = 3200   •   15 × 2000 = 30 000' },

    { konu: '4. 5, 25 ve 50 ile kısa yoldan çarpma' },
    { madde: '**× 5:** Sayıyı 10 ile çarp, sonucun **yarısını** al. (5, 10\'un yarısıdır.)' },
    { madde: '**× 50:** Sayıyı 100 ile çarp, sonucun **yarısını** al. (50, 100\'ün yarısıdır.)' },
    { madde: '**× 25:** Sayıyı 100 ile çarp, sonucun **yarısının yarısını** al.' },
    { gorseller: [5, 6] },

    { konu: '5. Üç sayı ile çarpma' },
    { madde: 'Üç sayıyı çarparken hangi ikisini **önce** çarptığımız sonucu **değiştirmez**.' },
    { ornek: '(2 × 3) × 4 = 6 × 4 = 24   •   2 × (3 × 4) = 2 × 12 = 24' },
    { madde: 'İşlemi kolaylaştırmak için çarpımı **10** ya da **100** olan ikiliyi önce çarparız.' },
    { ornek: '5 × 7 × 2 = (5 × 2) × 7 = 70   •   25 × 9 × 4 = (25 × 4) × 9 = 900' },

    { konu: '6. Çarpma işleminin sonucunu tahmin etme' },
    { madde: 'Çarpanları en yakın **onluğa** ya da **yüzlüğe** yuvarlarız, sonra yuvarlanmış sayıları çarparız.' },
    { ornek: '48 × 21 → 50 × 20 = 1000 (tahmin)   •   gerçek sonuç 1008' },

    { konu: '7. Çarpma problemleri' },
    { madde: '"Her birinde", "tanesi", "katı" gibi ifadeler çoğu zaman **çarpma** gerektirir.' },
    { madde: '**Örnek:** Bir okulda **24** sınıf var. Her sınıfta **28** öğrenci var. Okulda kaç öğrenci vardır?', birlikte: true },
    { adim: [
      '**Anla:** Verilen 24 sınıf, her sınıfta 28 öğrenci. İstenen toplam öğrenci sayısı.',
      '**Çöz:** 24 × 28 → 24 × 8 = 192, 24 × 20 = 480, 192 + 480 = **672**',
      '**Kontrol et:** 20 × 30 = 600; 672 tahmine yakın. Cevap: **672 öğrenci**',
    ] },
    { gorseller: [7, 8] },
  ],

  gorseller: [
    // 1 — Dizi modeli
    { ad: 'Dizi modeli', ciz(S) {
      const { rc, o, ekle, yazi, fosfor } = S, R = Sketchnote.R;
      yazi(270, 44, 'Dizi Modeli', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(200, 80, '5 tane', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++)
        ekle(rc.circle(100 + c * 50, 112 + r * 52, 34, o({ fill: S.r(R.mavi), fillStyle: 'hachure', hachureGap: 5, strokeWidth: 2 })));
      ekle(rc.line(74, 92, 74, 236, o({ strokeWidth: 2.2 })));
      yazi(46, 160, '3', 32, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(46, 186, 'sıra', 20, { 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(440, 120, '5 + 5 + 5', 26, { 'text-anchor': 'middle' });
      yazi(440, 154, '= 15', 26, { 'text-anchor': 'middle' });
      const w = S.genislik('3 × 5 = 15', 28, { class: 'kalin' });
      fosfor(440 - w / 2 - 8, 180, w + 20, 40, S.r(Sketchnote.SARI) || 'none');
      yazi(440, 210, '3 × 5 = 15', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      ekle(rc.line(20, 262, 490, 262, o({ strokeWidth: 1.4, strokeLineDash: [8, 8] })));
      yazi(255, 298, 'Sütunlar: 3 + 3 + 3 + 3 + 3 = 15', 23, { 'text-anchor': 'middle' });
      yazi(255, 334, '5 × 3 = 15 → çarpım değişmedi', 23, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    // 2 — Terimler
    { ad: 'Terimler', ciz(S) {
      const { yazi, ok } = S, R = Sketchnote.R;
      yazi(270, 44, 'Çarpma İşleminin Terimleri', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      Sketchnote.dikey(S, 230, 125, [{ t: '32' }, { t: '3', isaret: '×' }, { cizgi: true }, { t: '96', renk: R.mavi }], { boy: 54, adim: 34, ara: 66 });
      const et = (y, t) => { ok([[352, y], [310, y + 2], [250, y]], S.m(R.mavi)); yazi(362, y + 10, t, 32, { class: 'kalin', fill: S.m(R.kirmizi) }); };
      et(110, 'çarpan'); et(176, 'çarpan'); et(242, 'çarpım');
      yazi(40, 330, '× : çarpma işareti ("kere" diye okunur)', 22, { fill: S.m(R.lacivert) });
    } },
    // 3 — Eldeli çarpma
    { ad: 'Eldeli çarpma', ciz(S) {
      const { yazi, ekle, rc, o } = S, R = Sketchnote.R;
      yazi(270, 40, 'Eldeli Çarpma', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      Sketchnote.dikey(S, 200, 140, [{ elde: { 2: '2', 3: '1' } }, { t: '247' }, { t: '3', isaret: '×' }, { cizgi: true }, { t: '741', renk: R.mavi }], { boy: 48, adim: 32, ara: 62 });
      yazi(120, 330, 'küçük kırmızı rakamlar: elde', 20, { 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      ekle(rc.line(250, 70, 250, 340, o({ strokeWidth: 1.2, strokeLineDash: [6, 7] })));
      const adim = (y, no, a, b) => {
        yazi(270, y, no + ')', 21, { class: 'kalin', fill: S.m(R.kirmizi) });
        yazi(296, y, a, 21, { class: 'kalin' });
        yazi(296, y + 27, b, 21, { fill: S.m(R.lacivert) });
      };
      adim(100, '1', '7 × 3 = 21', '1 yaz, 2 elde');
      adim(185, '2', '4 × 3 = 12, +2 = 14', '4 yaz, 1 elde');
      adim(270, '3', '2 × 3 = 6, +1 = 7', '7 yaz');
    } },
    // 4 — İki basamaklı sayıyla çarpma
    { ad: 'İki basamaklı çarpma', ciz(S) {
      const { yazi } = S, R = Sketchnote.R;
      yazi(270, 40, 'İki Basamaklı Sayıyla Çarpma', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      Sketchnote.dikey(S, 230, 92, [
        { t: '136' }, { t: '24', isaret: '×' }, { cizgi: true },
        { t: '544', etiket: '← 136 × 4' }, { t: '2720', isaret: '+', soluk: 1, etiket: '← 136 × 20' }, { cizgi: true },
        { t: '3264', renk: R.kirmizi, etiket: '← toplam', etiketRenk: R.kirmizi },
      ], { boy: 40, adim: 27, ara: 48, etiketX: 262, etiketBoy: 22 });
      yazi(255, 338, 'Onlarla çarparken birler basamağına 0 yazarız.', 20, { 'text-anchor': 'middle', fill: S.m(R.mavi) });
    } },
    // 5 — Sonu sıfırlı sayılarla çarpma
    { ad: 'Sonu sıfırlı sayılar', ciz(S) {
      const { yazi, ekle, rc, o, ok, genislik } = S, R = Sketchnote.R;
      yazi(270, 40, 'Sonu Sıfırlı Sayılarla Çarpma', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // 40 × 300 — sıfırlar mavi ve halkalı
      const parcalar = [['4', '#1f1f1f'], ['0', R.mavi], ['×', '#1f1f1f'], ['3', '#1f1f1f'], ['00', R.mavi]];
      const boy = 46, ws = parcalar.map(([t]) => genislik(t, boy, { class: 'kalin' }) + (t === '×' ? 36 : 0));
      let x = 255 - ws.reduce((a, b) => a + b, 0) / 2; const xs = [];
      parcalar.forEach(([t, r], i) => { xs.push(x); yazi(t === '×' ? x + ws[i] / 2 : x, 106, t, boy, Object.assign({ class: 'kalin', fill: S.m(r) }, t === '×' ? { 'text-anchor': 'middle' } : {})); x += ws[i]; });
      for (const i of [1, 4]) ekle(rc.ellipse(xs[i] + ws[i] / 2, 92, ws[i] + 18, 50, o({ stroke: S.m(R.mavi), strokeWidth: 2 })));
      // iki kutu
      ekle(rc.rectangle(30, 160, 210, 64, o({ fill: S.r(Sketchnote.SARI), fillStyle: 'hachure', hachureGap: 9, fillWeight: 1.2 })));
      yazi(135, 202, '4 × 3 = 12', 28, { class: 'kalin', 'text-anchor': 'middle' });
      ekle(rc.rectangle(270, 160, 210, 64, o({ fill: S.r(Sketchnote.MAVI), fillStyle: 'hachure', hachureGap: 9, fillWeight: 1.2 })));
      yazi(375, 202, '1 + 2 = 3 sıfır', 26, { class: 'kalin', 'text-anchor': 'middle' });
      ok([[xs[0] + 6, 124], [120, 140], [135, 156]], S.m(R.kirmizi));
      ok([[xs[4] + ws[4] / 2, 124], [380, 140], [375, 156]], S.m(R.kirmizi));
      ok([[135, 228], [170, 254], [215, 270]], S.m(R.kirmizi));
      ok([[375, 228], [340, 254], [295, 270]], S.m(R.kirmizi));
      yazi(255, 318, '= 12 000', 44, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    // 6 — 5, 25, 50 ile kısa yoldan
    { ad: '5, 25, 50 ile kısa yoldan', ciz(S) {
      const { yazi, ekle, rc, o } = S, R = Sketchnote.R;
      yazi(270, 40, '5, 25 ve 50 ile Kısa Yoldan', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const satir = [
        ['× 5', '10 ile çarp, yarısını al', '46 × 5 → 460 → yarısı 230'],
        ['× 50', '100 ile çarp, yarısını al', '18 × 50 → 1800 → yarısı 900'],
        ['× 25', '100 ile çarp, yarısının yarısını al', '36 × 25 → 3600 → 1800 → 900'],
      ];
      satir.forEach(([etiket, kural, ornek], i) => {
        const y = 62 + i * 94;
        ekle(rc.rectangle(18, y + 8, 92, 76, o({ fill: S.r(i === 1 ? Sketchnote.MAVI : Sketchnote.SARI), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.2 })));
        yazi(64, y + 58, etiket, 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
        yazi(124, y + 38, kural, 21, { class: 'kalin' });
        yazi(124, y + 70, ornek, 21, { fill: S.m(R.mavi) });
        if (i < 2) ekle(rc.line(18, y + 92, 492, y + 92, o({ strokeWidth: 1.2, strokeLineDash: [6, 7] })));
      });
    } },
    // 7 — Tahmin
    { ad: 'Tahmin', ciz(S) {
      const { yazi, ekle, rc, o, ok } = S, R = Sketchnote.R;
      yazi(270, 40, 'Tahmin Etme', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const dogru = (y, bas, isaret, hedef) => {
        const X = (v) => 40 + (v - bas) * 24;
        ekle(rc.line(X(bas) - 10, y, X(bas + 10) + 10, y, o({ strokeWidth: 2.2 })));
        for (let v = bas; v <= bas + 10; v++) ekle(rc.line(X(v), y - (v % 5 ? 7 : 12), X(v), y + (v % 5 ? 7 : 12), o({ strokeWidth: 1.6, roughness: 0.5 })));
        for (const v of [bas, bas + 5, bas + 10]) yazi(X(v), y + 36, String(v), 20, { 'text-anchor': 'middle' });
        ekle(rc.circle(X(isaret), y, 16, o({ fill: S.r(R.kirmizi) || '#111', fillStyle: 'solid', strokeWidth: 1.5 })));
        yazi(X(isaret), y - 20, String(isaret), 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
        ok([[X(isaret), y - 34], [(X(isaret) + X(hedef)) / 2, y - 62], [X(hedef), y - 22]], S.m(R.mavi));
      };
      dogru(130, 40, 48, 50);
      dogru(258, 20, 21, 20);
      yazi(330, 84, '48 → 50', 22, { class: 'kalin', fill: S.m(R.mavi) });
      yazi(330, 212, '21 → 20', 22, { class: 'kalin', fill: S.m(R.mavi) });
      ekle(rc.line(322, 112, 322, 330, o({ strokeWidth: 1.2, strokeLineDash: [6, 7] })));
      yazi(418, 140, 'Tahmin:', 21, { class: 'kalin', 'text-anchor': 'middle' });
      yazi(418, 172, '50 × 20 = 1000', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(418, 262, 'Gerçek:', 21, { class: 'kalin', 'text-anchor': 'middle' });
      yazi(418, 294, '48 × 21 = 1008', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(418, 330, 'çok yakın!', 21, { 'text-anchor': 'middle', fill: S.m(R.yesil) });
    } },
    // 8 — Problem çözme adımları
    { ad: 'Problem çözme adımları', ciz(S) {
      const { yazi, ekle, rc, o, ok } = S, R = Sketchnote.R;
      yazi(270, 40, 'Problem Çözme Adımları', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const kutular = [
        [30, 66, '1. Anla', 'Verilen ne? İstenen ne?', Sketchnote.SARI],
        [270, 66, '2. Planla', 'Hangi işlem?', Sketchnote.MAVI],
        [270, 214, '3. Çöz', 'İşlemi yap.', R.yesil],
        [30, 214, '4. Kontrol et', 'Tahminle karşılaştır.', R.pembe],
      ];
      for (const [x, y, bas, alt, renk] of kutular) {
        ekle(rc.rectangle(x, y, 210, 112, o({ strokeWidth: 2.4 })));
        ekle(rc.rectangle(x + 10, y + 12, 190, 40, o({ stroke: 'none', fill: S.r(renk), fillStyle: 'hachure', hachureGap: 7, fillWeight: 1.6 })));
        yazi(x + 105, y + 42, bas, 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
        yazi(x + 105, y + 88, alt, 20, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      }
      ok([[244, 122], [256, 121], [266, 122]], S.m(R.mavi));
      ok([[375, 182], [376, 197], [375, 210]], S.m(R.mavi));
      ok([[266, 270], [254, 271], [244, 270]], S.m(R.mavi));
    } },
  ],
});
