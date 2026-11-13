// Sosyal Bilgiler — Yönler: 3 alt konu (öğretmen onayladı 2026-11-13; kazanım kodları doğrulanmalı).
// Görsel 1, 2, 5, 6 kodla; 3, 4 ChatGPT (resim yuvası). Öğle gölgesinin kuzeye düşmesi ülkemiz için geçerlidir.
// Güvenilmez halk yöntemleri (yosun, karınca yuvası) bilerek yazılmadı.
const ORTAK = ' Yatay 3:2. Tarz: temiz ve olgun eğitim illüstrasyonu, yumuşak düz renkler, ince koyu kontur, sade arka plan; 10–13 yaş için olgun görünüm; boyama sayfası gibi kalın çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın. Resimde hiçbir yazı, harf, sayı, ok ya da işaret olmasın (etiketleri sonradan ben ekleyeceğim).';

Sketchnote.defterNotu({
  baslik: 'YÖNLER',
  bloklar: [
    { konu: '1. Ana yönler ve ara yönler' },
    { madde: 'Bulunduğumuz yeri ya da bir yerin konumunu anlatmak için **yönleri** kullanırız.' },
    { madde: 'Dört **ana yön** vardır: **kuzey (K), güney (G), doğu (D), batı (B)**.' },
    { madde: 'Kuzey ile güney, doğu ile batı birbirinin **tam karşısındadır**.' },
    { madde: 'İki ana yönün arasındaki yönlere **ara yön** denir: **kuzeydoğu (KD), kuzeybatı (KB), güneydoğu (GD), güneybatı (GB)**.' },
    { madde: 'Ara yönlerin adında önce **kuzey** ya da **güney** söylenir: "kuzeydoğu" deriz, "doğukuzey" demeyiz.' },
    { gorseller: [1, 2] },

    { konu: '2. Yön bulma' },
    { madde: '**Güneş** her sabah **doğudan** doğar, akşam **batıdan** batar.' },
    { madde: 'Sabah Güneş\'in doğduğu yöne dönüp kollarımızı açarsak önümüz **doğu**, arkamız **batı**, sol kolumuz **kuzey**, sağ kolumuz **güney** olur.' },
    { madde: '**Pusula**nın renkli ucu her zaman **kuzeyi** gösterir.' },
    { madde: 'Ülkemizde öğle vakti cisimlerin **gölgesi kuzeye** düşer.' },
    { madde: 'Geceleri **Kutup Yıldızı** kuzeyi gösterir. Onu **Büyükayı** takımyıldızının yardımıyla buluruz.' },
    { gorseller: [3, 4] },

    { konu: '3. Harita ve krokide yön' },
    { madde: '**Kroki**, bir yerin kuş bakışı görünüşünün ölçü kullanılmadan kabaca çizilmiş hâlidir.' },
    { madde: 'Harita ve krokilerde **kuzey** genellikle **yukarıdadır** ve bir **yön oku** ile gösterilir.' },
    { madde: 'Bir yerin konumunu anlatırken **yönleri** ve **çevresindeki yerleri** kullanırız.', birlikte: true },
    { ornek: 'Okul, parkın **doğusundadır**   •   Kütüphane, okulun **güneybatısındadır**   •   Market, okulun **güneyindedir**' },
    { gorseller: [5, 6] },
  ],

  gorseller: [
    // 1 — Yön gülü
    { ad: 'Yön gülü', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(440, 40, 'Yön Gülü', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const cx = 200, cy = 192, U = 108, A = 68;
      for (let i = 0; i < 4; i++) {
        const a = Math.PI / 4 + i * Math.PI / 2;
        const uc = [cx + A * Math.cos(a), cy + A * Math.sin(a)];
        const y1 = [cx + 16 * Math.cos(a + Math.PI / 2), cy + 16 * Math.sin(a + Math.PI / 2)], y2 = [cx + 16 * Math.cos(a - Math.PI / 2), cy + 16 * Math.sin(a - Math.PI / 2)];
        ekle(rc.polygon([y1, uc, y2], o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 1.8 })));
      }
      for (let i = 0; i < 4; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 2;
        const uc = [cx + U * Math.cos(a), cy + U * Math.sin(a)];
        const y1 = [cx + 24 * Math.cos(a + Math.PI / 2), cy + 24 * Math.sin(a + Math.PI / 2)], y2 = [cx + 24 * Math.cos(a - Math.PI / 2), cy + 24 * Math.sin(a - Math.PI / 2)];
        ekle(rc.polygon([y1, uc, y2], o({ fill: S.r(i === 0 ? R.kirmizi : SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
      }
      ekle(rc.circle(cx, cy, 18, o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 2 })));
      const ana = { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) }, ara = { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.mavi) };
      yazi(cx, 62, 'K', 30, ana); yazi(cx, 340, 'G', 30, ana); yazi(cx - U - 26, cy + 11, 'B', 30, ana); yazi(cx + U + 26, cy + 11, 'D', 30, ana);
      yazi(cx - 84, cy - 74, 'KB', 22, ara); yazi(cx + 84, cy - 74, 'KD', 22, ara); yazi(cx - 84, cy + 92, 'GB', 22, ara); yazi(cx + 84, cy + 92, 'GD', 22, ara);
      // açıklama
      const sat = [['K', 'kuzey'], ['G', 'güney'], ['D', 'doğu'], ['B', 'batı']];
      sat.forEach(([k, a], i) => { yazi(414, 98 + i * 34, k, 24, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) }); yazi(434, 98 + i * 34, ': ' + a, 22, {}); });
      yazi(446, 268, 'kırmızı uç:', 20, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(446, 294, 'kuzey', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    // 2 — Ara yönler ızgarası
    { ad: 'Ara yönlerin adı', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 40, 'Ara Yönler Nasıl Adlandırılır?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const hucre = [
        ['kuzeybatı', 'KB', MAVI], ['kuzey', 'K', SARI], ['kuzeydoğu', 'KD', MAVI],
        ['batı', 'B', SARI], ['', '', null], ['doğu', 'D', SARI],
        ['güneybatı', 'GB', MAVI], ['güney', 'G', SARI], ['güneydoğu', 'GD', MAVI],
      ];
      const W = 140, H = 86, x0 = 45, y0 = 62;
      hucre.forEach(([ad, kisa, renk], i) => {
        const x = x0 + (i % 3) * W, y = y0 + Math.floor(i / 3) * H;
        ekle(rc.rectangle(x, y, W, H, o({ fill: renk ? S.r(renk) : undefined, fillStyle: 'hachure', hachureGap: 9, fillWeight: 1.2, strokeWidth: 2 })));
        if (!ad) { ekle(rc.circle(x + W / 2, y + H / 2 - 6, 26, o({ fill: S.r(R.kirmizi) || '#fff', fillStyle: 'solid' }))); yazi(x + W / 2, y + H - 12, 'BEN', 18, { class: 'kalin', 'text-anchor': 'middle' }); return; }
        yazi(x + W / 2, y + 38, kisa, 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(renk === MAVI ? R.mavi : R.kirmizi) });
        yazi(x + W / 2, y + 68, ad, 20, { 'text-anchor': 'middle' });
      });
      yazi(255, 342, 'kuzey + doğu = kuzeydoğu  •  güney + batı = güneybatı', 19, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
    // 3 — Güneş ile yön bulma (ChatGPT)
    { ad: 'Güneş ile yön bulma', resim: 'Baski/Sosyal/resimler/yonler-3-gunes.png',
      istem: 'Bir görsel oluştur: Sabah erken saatte açık bir arazide 10 yaşında bir çocuk, arkası bize dönük, ufukta yeni doğan Güneş\'e bakıyor ve iki kolunu yanlara doğru düz açmış. Güneş resmin üst ortasında ufuk çizgisinin hemen üstünde; çocuk resmin ortasında, ayakta. Kolların uçlarında ve çocuğun arkasında yazı için boş alan kalsın.' + ORTAK,
      etiketler: [{ x: 255, y: 34, t: 'önü: DOĞU', boy: 22 }, { x: 82, y: 200, t: 'sol kol: KUZEY', boy: 19 }, { x: 428, y: 200, t: 'sağ kol: GÜNEY', boy: 19 }, { x: 255, y: 340, t: 'arkası: BATI', boy: 22 }] },
    // 4 — Pusula ve gölge (ChatGPT)
    { ad: 'Pusula ve öğle gölgesi', resim: 'Baski/Sosyal/resimler/yonler-4-pusula-golge.png',
      istem: 'Bir görsel oluştur: Sol panel: bir çocuğun avucunda yuvarlak bir pusula, yakından; ibrenin bir ucu kırmızı, diğer ucu beyaz; kadranda harf ya da rakam olmasın. Sağ panel: öğle vakti, Güneş gökyüzünde yüksekte; düz bir zeminde tek bir ağaç ve ağacın gölgesi resmin üst tarafına doğru (Güneş\'in tersine) kısa ve belirgin düşüyor.' + ' Resim ortadan ince beyaz bir boşlukla iki eşit panele bölünsün.' + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Kırmızı uç kuzeyi gösterir', boy: 18 }, { x: 383, y: 336, t: 'Öğle gölgesi kuzeyi gösterir', boy: 18 }] },
    // 5 — Kutup Yıldızı (kodla; şematik)
    { ad: 'Kutup Yıldızı', ciz(S, renkli) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R;
      if (renkli) ekle(rc.rectangle(0, 0, 510, 360, o({ stroke: 'none', fill: '#1d2b4a', fillStyle: 'solid', roughness: 0 })));
      const acik = renkli ? '#fff' : '#111', sari = renkli ? '#ffd166' : '#111';
      yazi(270, 40, 'Kutup Yıldızı\'nı Bulma', 26, { class: 'kalin', 'text-anchor': 'middle', fill: acik });
      const yildiz = (x, y, r, renk) => { const n = []; for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, a = -Math.PI / 2 + i * Math.PI / 5; n.push([x + rr * Math.cos(a), y + rr * Math.sin(a)]); } ekle(rc.polygon(n, o({ stroke: renk, fill: renkli ? renk : undefined, fillStyle: 'solid', strokeWidth: 1.6, roughness: 0.6 }))); };
      // Büyükayı (şematik): kepçe + sap
      const B = { alkaid: [118, 300], mizar: [158, 278], alioth: [198, 270], megrez: [240, 272], phecda: [250, 318], merak: [312, 316], dubhe: [306, 264] };
      const cizgi = [['alkaid', 'mizar'], ['mizar', 'alioth'], ['alioth', 'megrez'], ['megrez', 'dubhe'], ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez']];
      for (const [a, b] of cizgi) ekle(rc.line(...B[a], ...B[b], o({ stroke: acik, strokeWidth: 1.4, strokeLineDash: [5, 5], roughness: 0.4 })));
      for (const k of Object.keys(B)) yildiz(...B[k], 9, acik);
      // İşaretçi yıldızlar → Kutup Yıldızı (Merak→Dubhe yönünde yaklaşık 5 kat)
      const P = [B.dubhe[0] + (B.dubhe[0] - B.merak[0]) * 4, B.dubhe[1] + (B.dubhe[1] - B.merak[1]) * 3.4];
      S.ok([B.dubhe, [(B.dubhe[0] + P[0]) / 2, (B.dubhe[1] + P[1]) / 2], [P[0], P[1] + 22]], renkli ? '#7fb3ff' : '#111');
      yildiz(P[0], P[1], 16, sari);
      yazi(P[0] + 26, P[1] + 8, 'Kutup Yıldızı', 22, { class: 'kalin', fill: sari });
      yazi(150, 340, 'Büyükayı', 22, { class: 'kalin', 'text-anchor': 'middle', fill: acik });
      yazi(410, 300, 'kepçenin ucundaki', 17, { 'text-anchor': 'middle', fill: acik });
      yazi(410, 320, 'iki yıldızdan', 17, { 'text-anchor': 'middle', fill: acik });
      yazi(410, 340, 'yukarı doğru git', 17, { 'text-anchor': 'middle', fill: acik });
    } },
    // 6 — Kroki
    { ad: 'Krokide yön', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(200, 40, 'Okulumuzun Krokisi', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // yollar
      ekle(rc.rectangle(30, 182, 450, 30, o({ fill: S.r('#c9c9c9'), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1, strokeWidth: 1.4 })));
      ekle(rc.rectangle(222, 60, 30, 290, o({ fill: S.r('#c9c9c9'), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1, strokeWidth: 1.4 })));
      const bina = (x, y, w, h, t, renk) => { ekle(rc.rectangle(x, y, w, h, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4, strokeWidth: 2.2 }))); yazi(x + w / 2, y + h / 2 + 8, t, 21, { class: 'kalin', 'text-anchor': 'middle' }); };
      bina(268, 100, 130, 70, 'OKUL', R.kirmizi);
      bina(268, 226, 130, 62, 'MARKET', SARI);
      bina(268, 300, 130, 48, 'EV', R.yesil);
      bina(80, 226, 128, 62, 'KÜTÜPHANE', MAVI);
      // park (okulun batısı — yolun öbür yanında)
      ekle(rc.rectangle(60, 92, 145, 78, o({ fill: S.r(R.yesil), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1, strokeWidth: 2 })));
      for (const [x, y] of [[90, 120], [130, 112], [170, 124]]) ekle(rc.circle(x, y, 26, o({ fill: S.r('#2a9d8f') || '#fff', fillStyle: 'solid', strokeWidth: 1.6 })));
      yazi(132, 160, 'PARK', 20, { class: 'kalin', 'text-anchor': 'middle' });
      // yön oku
      S.ok([[460, 140], [461, 100], [460, 62]], S.m(R.kirmizi));
      yazi(460, 160, 'K', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
  ],
});
