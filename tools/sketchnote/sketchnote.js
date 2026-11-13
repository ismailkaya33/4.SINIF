// 4/D — Kodla sketchnote (el çizimi görünümlü kavram haritası / şema).
// rough.js (MIT) + Kalam yazı tipi (OFL) ile A4 dikey SVG çizer. Yazıyı model değil kod yazar → Türkçe yazım birebir doğru.
// Kullanım: notlar/<ad>.js içinde
//   Sketchnote.kavramHaritasi({ baslik, giris, merkez: ['SATIR1','SATIR2'], rozet: '6', kutular: [...], unutma: [...] });
// ya da serbest düzen için:  Sketchnote.ciz(S => { S.yazi(...); S.ok(...); S.simge.ampul(...); });
// Paketleme ve PDF/PNG: node tools/sketchnote-yap.mjs tools/sketchnote/notlar/<ad>.js --png ... --pdf ...
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const G = 1240, Y = 1754; // A4 dikey, 150 dpi birim
  const SARI = '#f2b705', MAVI = '#1f6fd1', MUREKKEP = '#1f1f1f';

  function araclar(svg) {
    const rc = rough.svg(svg);
    let tohum = 7; // sabit tohum: aynı not her seferinde aynı çizilir
    const o = (ek) => Object.assign({ seed: tohum++, stroke: MUREKKEP, strokeWidth: 2.4, roughness: 1.3, bowing: 1.1 }, ek || {});
    let hedef = svg; // çizimin eklendiği yer (grup içinde çizmek için değişir)
    const ekle = (n) => { hedef.appendChild(n); return n; };
    // (x, y) noktasına k ölçeğinde bir grup açar; fn içindeki her çizim bu gruba girer.
    function grup(x, y, k, fn) {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('transform', `translate(${x} ${y}) scale(${k})`);
      hedef.appendChild(g); const eski = hedef; hedef = g;
      try { fn(); } finally { hedef = eski; }
      return g;
    }
    const tohumla = (n) => { tohum = n; };
    const tasmalar = [];

    function yazi(x, y, metin, boy, ek) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('font-size', boy);
      for (const [k, v] of Object.entries(ek || {})) t.setAttribute(k, v);
      t.textContent = metin; return ekle(t);
    }
    function genislik(metin, boy, ek) { const t = yazi(-9999, -9999, metin, boy, ek); const g = t.getComputedTextLength(); t.remove(); return g; }
    // Kelimeleri genişliğe göre satırlara böler; son satırın y'sini döndürür.
    function satirla(metin, boy, gen, ek) {
      const olc = yazi(-9999, -9999, '', boy, ek);
      const satirlar = []; let s = '';
      for (const k of String(metin).split(' ')) {
        const den = s ? s + ' ' + k : k; olc.textContent = den;
        if (olc.getComputedTextLength() > gen && s) { satirlar.push(s); s = k; } else s = den;
      }
      if (s) satirlar.push(s); olc.remove();
      return satirlar;
    }
    function paragraf(x, y, metin, boy, gen, satirAra, ek) {
      const satirlar = satirla(metin, boy, gen, ek);
      satirlar.forEach((st, i) => yazi(x, y + i * satirAra, st, boy, ek));
      return y + (satirlar.length - 1) * satirAra;
    }
    // Fosforlu kalem taraması (yazının altına). Mavi, okunurluk için yarı saydam.
    function fosfor(x, y, w, h, renk, ek) {
      const n = ekle(rc.rectangle(x, y, w, h, o(Object.assign({ stroke: 'none', fill: renk, fillStyle: 'hachure', hachureGap: 6, fillWeight: 2.2, hachureAngle: -50, roughness: 1.6 }, ek))));
      if (renk === MAVI) n.setAttribute('opacity', '0.5');
      return n;
    }
    // Kıvrımlı ok: noktalar [[x,y],...], son nokta ucu
    function ok(noktalar, renk) {
      const r = renk || MAVI;
      ekle(rc.curve(noktalar, o({ stroke: r, strokeWidth: 2.8, roughness: 1 })));
      const [a, b] = [noktalar[noktalar.length - 2], noktalar[noktalar.length - 1]];
      const aci = Math.atan2(b[1] - a[1], b[0] - a[0]), u = 20;
      for (const d of [0.45, -0.45])
        ekle(rc.line(b[0], b[1], b[0] - u * Math.cos(aci + d), b[1] - u * Math.sin(aci + d), o({ stroke: r, strokeWidth: 2.8, roughness: 0.8 })));
    }
    function cerceve(x, y, w, h, ek) { return ekle(rc.rectangle(x, y, w, h, o(Object.assign({ strokeWidth: 2.6, roughness: 1.6, bowing: 1.6 }, ek)))); }
    function tasmaKontrol(ad, altY, sinir) { if (altY > sinir) { tasmalar.push(ad); console.error('TASMA: ' + ad); } }

    // ---- Simgeler: merkez (cx, cy), yaklaşık 100×100 alan. Yeni simge buraya eklenir. ----
    const simge = {
      yumurta(cx, cy) { // protein
        ekle(rc.ellipse(cx - 12, cy + 4, 50, 66, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
        ekle(rc.ellipse(cx + 28, cy + 26, 26, 16, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 2 })));
        ekle(rc.ellipse(cx + 34, cy + 6, 26, 16, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 2 })));
      },
      ekmek(cx, cy) {
        const d = `M ${cx-46} ${cy+26} L ${cx-46} ${cy-4} Q ${cx-46} ${cy-30} ${cx-20} ${cy-30} L ${cx+20} ${cy-30} Q ${cx+46} ${cy-30} ${cx+46} ${cy-4} L ${cx+46} ${cy+26} Z`;
        ekle(rc.path(d, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
        for (const dx of [-22, 0, 22]) ekle(rc.line(cx + dx - 8, cy - 18, cx + dx + 8, cy - 2, o({ strokeWidth: 2 })));
      },
      sise(cx, cy) {
        ekle(rc.rectangle(cx - 9, cy - 46, 18, 12, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 2 })));
        const d = `M ${cx-9} ${cy-34} L ${cx-9} ${cy-22} Q ${cx-28} ${cy-14} ${cx-28} ${cy+4} L ${cx-28} ${cy+34} L ${cx+28} ${cy+34} L ${cx+28} ${cy+4} Q ${cx+28} ${cy-14} ${cx+9} ${cy-22} L ${cx+9} ${cy-34} Z`;
        ekle(rc.path(d, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
        ekle(rc.ellipse(cx + 2, cy + 12, 22, 14, o({ strokeWidth: 1.8 })));
      },
      portakal(cx, cy) {
        ekle(rc.circle(cx, cy + 4, 74, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
        ekle(rc.circle(cx, cy + 4, 50, o({ strokeWidth: 1.6 })));
        for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; ekle(rc.line(cx, cy + 4, cx + 25 * Math.cos(a), cy + 4 + 25 * Math.sin(a), o({ strokeWidth: 1.6 }))); }
        ekle(rc.ellipse(cx + 26, cy - 34, 30, 14, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 1.8 })));
      },
      dis(cx, cy) {
        const x = cx, y = cy + 2;
        const d = `M ${x-30} ${y-22} C ${x-30} ${y-44} ${x-6} ${y-40} ${x} ${y-32} C ${x+6} ${y-40} ${x+30} ${y-44} ${x+30} ${y-22} C ${x+30} ${y} ${x+22} ${y+10} ${x+18} ${y+34} C ${x+15} ${y+44} ${x+8} ${y+40} ${x+5} ${y+20} C ${x+3} ${y+10} ${x-3} ${y+10} ${x-5} ${y+20} C ${x-8} ${y+40} ${x-15} ${y+44} ${x-18} ${y+34} C ${x-22} ${y+10} ${x-30} ${y} ${x-30} ${y-22} Z`;
        ekle(rc.path(d, o({ fill: '#fff', fillStyle: 'solid' })));
        for (const [a, b, c, e] of [[x+36, y-34, x+48, y-46], [x+40, y-18, x+54, y-20], [x-38, y-36, x-50, y-48]])
          ekle(rc.line(a, b, c, e, o({ stroke: MAVI, strokeWidth: 2.6 })));
      },
      bardak(cx, cy) {
        ekle(rc.polygon([[cx-30, cy+4], [cx+30, cy+4], [cx+24, cy+40], [cx-24, cy+40]], o({ stroke: 'none', fill: MAVI, fillStyle: 'hachure', hachureGap: 6, fillWeight: 2 })));
        ekle(rc.polygon([[cx-34, cy-30], [cx+34, cy-30], [cx+24, cy+40], [cx-24, cy+40]], o()));
        simge.damla(cx + 50, cy - 26, 0.8);
      },
      damla(cx, cy, k) {
        const s = k || 1;
        ekle(rc.path(`M ${cx} ${cy-22*s} C ${cx+14*s} ${cy-4*s} ${cx+16*s} ${cy+8*s} ${cx} ${cy+14*s} C ${cx-16*s} ${cy+8*s} ${cx-14*s} ${cy-4*s} ${cx} ${cy-22*s} Z`, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 2 })));
      },
      ampul(cx, cy) {
        ekle(rc.circle(cx, cy - 14, 76, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
        ekle(rc.rectangle(cx - 18, cy + 24, 36, 26, o()));
        ekle(rc.line(cx - 18, cy + 34, cx + 18, cy + 34, o({ strokeWidth: 1.8 })));
        ekle(rc.line(cx - 18, cy + 42, cx + 18, cy + 42, o({ strokeWidth: 1.8 })));
        for (let i = 0; i < 5; i++) { const a = Math.PI + i * Math.PI / 4; ekle(rc.line(cx + 50 * Math.cos(a), cy - 14 + 50 * Math.sin(a), cx + 66 * Math.cos(a), cy - 14 + 66 * Math.sin(a), o({ stroke: MAVI, strokeWidth: 2.6 }))); }
      },
      buyutec(cx, cy) {
        ekle(rc.circle(cx - 8, cy - 8, 60, o({ fill: MAVI, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4 })));
        ekle(rc.line(cx + 14, cy + 14, cx + 40, cy + 40, o({ strokeWidth: 6 })));
      },
      yildiz(cx, cy) {
        const n = []; for (let i = 0; i < 10; i++) { const r = i % 2 ? 18 : 42, a = -Math.PI / 2 + i * Math.PI / 5; n.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
        ekle(rc.polygon(n, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 7 })));
      },
    };

    return { svg, rc, o, ekle, grup, tohumla, yazi, genislik, satirla, paragraf, fosfor, ok, cerceve, simge, tasmaKontrol, tasmalar, G, Y, SARI, MAVI, MUREKKEP };
  }

  // Yazı tipleri yüklendikten sonra çizer (ölçüm doğru olsun diye); bitince body[data-hazir="1"].
  async function ciz(fn) {
    await Promise.all(['400 32px Kalam', '700 40px Kalam'].map(f => document.fonts.load(f, 'İğşıÇÖÜ')));
    const svg = document.getElementById('s');
    const S = araclar(svg);
    await fn(S);
    if (S.tasmalar.length) document.body.dataset.tasma = S.tasmalar.join(', ');
    document.body.dataset.hazir = '1';
  }

  // Hazır düzen: başlık + giriş + ortada çember + iki sütun kutu (4 ya da 6 kutu önerilir) + "Unutma!" kutusu.
  // kutu: { ad, is, ornek, simge }  — simge adı yukarıdaki listeden; 'ornek' boş bırakılabilir.
  function kavramHaritasi(v) {
    return ciz(S => {
      const { yazi, genislik, satirla, paragraf, fosfor, ok, cerceve, simge, o, ekle, rc, SARI, MAVI } = S;
      document.title = v.baslik + ' — sketchnote';
      // Başlık
      const bg = genislik(v.baslik, 78, { class: 'kalin' });
      fosfor(620 - bg / 2 - 24, 62, bg + 48, 70, SARI);
      yazi(620, 120, v.baslik, 78, { class: 'kalin', 'text-anchor': 'middle' });
      ekle(rc.line(620 - bg / 2 - 10, 140, 620 + bg / 2 + 10, 136, o({ strokeWidth: 3 })));
      ekle(rc.line(620 - bg / 2 + 20, 150, 620 + bg / 2 - 20, 148, o({ strokeWidth: 2 })));
      let ust = 175;
      if (v.giris) ust = paragraf(90, 205, v.giris, 34, 1060, 44) + 36;

      // Unutma kutusunun yeri (altta)
      const unutma = v.unutma && v.unutma.length;
      const UH = unutma ? Math.max(170, 116 + v.unutma.reduce((t, m) => t + satirla(m, 32, 960).length * 42 + 8, 0)) : 0;
      const UY = unutma ? Y - 44 - UH : Y - 30;
      // Kutular
      const k = v.kutular, satir = Math.ceil(k.length / 2);
      const KW = 420, ara = 20, SOL = 30, SAG = G - 30 - KW;
      const alan = UY - 30 - ust;
      const KH = Math.min(420, (alan - (satir - 1) * ara) / satir);
      ust += (alan - (satir * KH + (satir - 1) * ara)) / 2; // kutular az ise dikeyde ortala
      const SY = (i) => ust + i * (KH + ara);
      k.forEach((b, i) => {
        const x = i < satir ? SOL : SAG, y = SY(i % satir);
        cerceve(x, y, KW, KH);
        const adG = genislik(b.ad, 40, { class: 'kalin' });
        fosfor(x + 18, y + 26, adG + 26, 44, i % 2 ? MAVI : SARI, i % 2 ? { hachureGap: 8, fillWeight: 1.6 } : {});
        yazi(x + 31, y + 62, b.ad, 40, { class: 'kalin' });
        const asagi = adG + 70 > KW - 130; // başlık uzunsa simge açıklamanın yanına iner
        if (b.simge && simge[b.simge]) simge[b.simge](x + KW - 62, asagi ? y + 150 : y + 62);
        let son = paragraf(x + 24, y + 132, b.is, 32, KW - 48 - (b.simge && asagi ? 110 : 0), 40);
        if (b.ornek) {
          const oy = Math.max(son + 56, b.simge && asagi ? y + 232 : 0);
          yazi(x + 24, oy, 'Örnek:', 30, { class: 'kalin', fill: MAVI });
          const og = genislik('Örnek:', 30, { class: 'kalin' }) + 12;
          son = paragraf(x + 24 + og, oy, b.ornek, 30, KW - 48 - og, 38);
        }
        S.tasmaKontrol(b.ad, son, y + KH - 18);
      });
      // Merkez çember
      const MX = 620, MY = ust + (satir * KH + (satir - 1) * ara) / 2, R = 122;
      ekle(rc.circle(MX, MY, 236, o({ fill: SARI, fillStyle: 'hachure', hachureGap: 9, strokeWidth: 3 })));
      ekle(rc.circle(MX, MY, 196, o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 1.8 })));
      const m = v.merkez || [v.baslik];
      m.forEach((t, i) => {
        let boy = i ? 33 : 42; while (genislik(t, boy, { class: 'kalin' }) > 170 && boy > 22) boy -= 2;
        yazi(MX, MY + (m.length === 1 ? 14 : i ? 30 : -12), t, boy, { class: 'kalin', 'text-anchor': 'middle' });
      });
      if (v.rozet) {
        ekle(rc.circle(MX + 78, MY - 82, 54, o({ fill: MAVI, fillStyle: 'solid', strokeWidth: 2 })));
        yazi(MX + 78, MY - 69, v.rozet, 38, { class: 'kalin', 'text-anchor': 'middle', fill: '#fff' });
      }
      // Oklar: çemberden her kutunun iç kenarına
      for (let i = 0; i < satir; i++) {
        const ky = SY(i) + KH / 2, dy = ky - MY;
        for (const yon of [-1, 1]) {
          if (yon === 1 && i + satir >= k.length) continue; // sağda kutu yoksa
          const hedefX = yon < 0 ? SOL + KW + 8 : SAG - 8;
          if (Math.abs(dy) < 40) { ok([[MX + yon * R, MY], [hedefX, MY]]); continue; }
          const aci = (yon < 0 ? Math.PI : 0) + 0.22 * Math.PI * Math.sign(dy) * yon;
          const bas = [MX + R * Math.cos(aci), MY + R * Math.sin(aci)];
          ok([bas, [MX + yon * 150, MY + dy * 0.62], [hedefX, ky - Math.sign(dy) * 10]]);
        }
      }
      // Unutma kutusu
      if (unutma) {
        simge.ampul(105, UY + UH / 2);
        cerceve(190, UY, 1020, UH, { strokeLineDash: [14, 10], strokeWidth: 2.4, roughness: 1.2, bowing: 1.1 });
        const ug = genislik('Unutma!', 40, { class: 'kalin' });
        fosfor(208, UY + 22, ug + 26, 46, MAVI, { hachureGap: 8, fillWeight: 1.6 });
        yazi(221, UY + 60, 'Unutma!', 40, { class: 'kalin' });
        let uy = UY + 116;
        v.unutma.forEach((t, i) => { uy = paragraf(222, uy, t, 32, 960, 42) + 50; });
        S.tasmaKontrol('Unutma', uy - 50, UY + UH - 18);
      }
      if (v.ek) v.ek(S); // isteğe bağlı ek çizim
    });
  }

  window.Sketchnote = { ciz, kavramHaritasi, araclar, SARI, MAVI, MUREKKEP };
})();
