// 4/D — Kodla defter notu + kes-yapıştır görselleri (öğretmenin kararı, 2026-11-13).
// Bir not dosyası iki sayfa üretir:
//   1) Not sayfası (renkli, A4 dikey, spiral defter görünümü). Görsellerin yeri "✂ Görsel N — buraya yapıştır"
//      kesik çizgili kutuyla, ilgili yazının yanında gösterilir.
//   2) Kes-yapıştır sayfası (#kes): 2 sütun × 4 satır = 8 hücre. Görseller sırayla dizilir; 2 görselli notta her satır
//      bir öğrencinin takımıdır (4 öğrenci), 1 görselli notta 8 öğrenci. Varsayılan siyah-beyaz boyama (#kes-renkli: renkli).
// Görsel boyutu her iki sayfada da aynıdır: 8,5 × 6 cm (öğrenci defterine sığar).
//
// Not dosyası:
//   Sketchnote.defterNotu({ baslik, bloklar: [...], gorseller: [{ ad, ciz(S, renkli) }, ...] })
// Bloklar (yukarıdan aşağı akar):
//   { ara: 'Ara başlık' }                     pastel hap etiket
//   { madde: 'Metin **anahtar kelime** …' }    renkli madde imi; **…** kırmızı-kalın
//   { ornek: 'Elif kitap okudu.' }            girintili örnek satırı (→)
//   { gorsel: 1, metin: ['madde', …] }        görsel 1 sağda, maddeler solda
//   { gorseller: [1, 2] }                     görseller yan yana
//   { dikkat: 'Metin' }                       sarı not kutusu
// Görsel çizimi 510 × 360 birimlik alanda yapılır (8,5 × 6 cm). S.r(renk) siyah-beyazda dolguyu kaldırır,
// S.m(renk) siyah-beyazda yazıyı siyah yapar.
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const CM = 1240 / 21;
  const GW = 510, GH = 360, KW = 8.5 * CM, KH = 6 * CM, K = KW / GW;
  const R = { kirmizi: '#d62828', lacivert: '#1d3557', mavi: '#1f6fd1', sari: '#f2b705', yesil: '#2a9d8f', pembe: '#e5527a' };
  const HAPLAR = ['#ffe08a', '#b7e4c7', '#ffc8dd', '#bde0fe'];
  const MADDE_IMI = [R.kirmizi, R.mavi, R.yesil, R.sari];

  function sekil(ad, ozellik, ust) {
    const n = document.createElementNS(NS, ad);
    for (const [k, v] of Object.entries(ozellik)) n.setAttribute(k, v);
    return (ust || document.getElementById('s')).appendChild(n);
  }

  // **kalın** işaretli metni satırlara böler: [[{t, kalin}], …]
  function satirlaIsaretli(S, metin, boy, gen) {
    const kelimeler = []; let kalin = false;
    let onceki = '';
    String(metin).split('**').forEach((parca, pi) => {
      // ** sınırında boşluk yoksa önceki kelimeye yapışık yazılır ("**0**'dır", "**değişmez**:")
      const yapisik = pi > 0 && !onceki.endsWith(' ') && !parca.startsWith(' ');
      parca.split(' ').forEach((k, ki) => {
        if (k) kelimeler.push({ t: k, kalin, bitisik: yapisik && ki === 0 && kelimeler.length > 0 });
      });
      if (parca) onceki = parca;
      kalin = !kalin;
    });
    const bosluk = S.genislik('a a', boy) - S.genislik('aa', boy);
    const satirlar = []; let satir = [], g = 0;
    for (const k of kelimeler) {
      const w = S.genislik(k.t, boy, k.kalin ? { class: 'kalin' } : {});
      if (satir.length && g + bosluk + w > gen) { satirlar.push(satir); satir = []; g = 0; }
      g += (satir.length && !k.bitisik ? bosluk : 0) + w; satir.push(k);
    }
    if (satir.length) satirlar.push(satir);
    return satirlar;
  }
  function yazIsaretli(S, x, y, metin, boy, gen, satirAra, renk) {
    const satirlar = satirlaIsaretli(S, metin, boy, gen);
    satirlar.forEach((satir, i) => {
      const t = S.yazi(x, y + i * satirAra, '', boy, { fill: renk, style: 'white-space:pre' });
      satir.forEach((k, j) => {
        const ts = document.createElementNS(NS, 'tspan');
        ts.textContent = (j && !k.bitisik ? ' ' : '') + k.t;
        if (k.kalin) { ts.setAttribute('class', 'kalin'); ts.setAttribute('fill', R.kirmizi); }
        t.appendChild(ts);
      });
    });
    return satirlar.length;
  }

  // Bir görseli (x, y) köşesine 8,5 × 6 cm çizer.
  function gorselCiz(S, v, no, x, y, renkli, cerceve) {
    const g = v.gorseller[no - 1];
    S.tohumla(1000 * no); // her kopyada aynı çizim
    S.r = (c) => (renkli ? c : undefined);
    S.m = (c) => (renkli ? c : '#111');
    S.renkli = renkli;
    S.grup(x, y, K, () => {
      sekil('rect', { x: 0, y: 0, width: GW, height: GH, fill: '#fff', stroke: cerceve, 'stroke-width': 2.2 / K, 'stroke-dasharray': `${10 / K} ${7 / K}` }, S.svg.lastChild);
      g.ciz(S, renkli);
      // köşede görsel numarası
      const c = sekil('circle', { cx: 22, cy: 22, r: 15, fill: renkli ? R.lacivert : '#fff', stroke: '#111', 'stroke-width': 2 }, S.svg.lastChild);
      const t = S.yazi(22, 29, String(no), 20, { class: 'kalin', 'text-anchor': 'middle', fill: renkli ? '#fff' : '#111' });
      void c; void t;
    });
  }

  function notSayfasi(S, v) {
    const svg = S.svg;
    // Kareli zemin, kırmızı kenar çizgisi, spiral
    for (let x = 118; x < 1240; x += 29.5) sekil('line', { x1: x, y1: 0, x2: x, y2: 1754, stroke: '#e3ebf5', 'stroke-width': 1.2 });
    for (let y = 20; y < 1754; y += 29.5) sekil('line', { x1: 100, y1: y, x2: 1240, y2: y, stroke: '#e3ebf5', 'stroke-width': 1.2 });
    sekil('line', { x1: 110, y1: 0, x2: 110, y2: 1754, stroke: '#f28b82', 'stroke-width': 2.5 });
    for (let y = 45; y < 1740; y += 62) {
      sekil('circle', { cx: 66, cy: y, r: 9, fill: '#d9d9d9', stroke: '#9a9a9a', 'stroke-width': 1.5 });
      sekil('path', { d: `M 66 ${y} C 40 ${y - 6} 18 ${y - 2} 14 ${y + 10}`, fill: 'none', stroke: '#555', 'stroke-width': 5, 'stroke-linecap': 'round' });
    }
    // Başlık
    const bg = S.genislik(v.baslik, 64, { class: 'kalin' });
    const bx = 655 - bg / 2 - 40;
    sekil('rect', { x: bx, y: 50, width: bg + 80, height: 92, rx: 46, fill: '#ffe3ea', stroke: R.pembe, 'stroke-width': 3, 'stroke-dasharray': '10 6' });
    S.yazi(655, 117, v.baslik, 64, { class: 'kalin', 'text-anchor': 'middle', fill: R.kirmizi });
    for (const [x1, x2] of [[bx - 70, bx - 18], [bx + bg + 98, bx + bg + 150]])
      sekil('path', { d: `M ${x1} 96 q 13 -14 26 0 t 26 0`, fill: 'none', stroke: R.pembe, 'stroke-width': 4, 'stroke-linecap': 'round' });

    const SOL = 140, SAG = 1195, ALT = 1725;
    let y = 190, ara = 0, imi = 0;
    const madde = (x, yy, metin, gen) => {
      sekil('circle', { cx: x + 10, cy: yy - 11, r: 8, fill: MADDE_IMI[imi++ % MADDE_IMI.length] });
      return yazIsaretli(S, x + 32, yy, metin, 33, gen - 32, 46, R.lacivert);
    };
    const yapistirKutusu = (no, x, yy) => {
      makas(S, x + 14, yy + 17);
      S.yazi(x + 36, yy + 26, `Görsel ${no} — buraya yapıştır`, 26, { class: 'kalin', fill: R.pembe });
      gorselCiz(S, v, no, x, yy + 38, true, R.pembe);
      return 38 + KH;
    };
    for (const b of v.bloklar) {
      if (b.ara) {
        y += 8;
        const w = S.genislik(b.ara, 36, { class: 'kalin' });
        sekil('rect', { x: SOL, y: y, width: w + 44, height: 54, rx: 27, fill: HAPLAR[ara++ % HAPLAR.length] });
        S.yazi(SOL + 22, y + 39, b.ara, 36, { class: 'kalin', fill: R.lacivert });
        y += 54 + 48;
      } else if (b.madde) {
        y += madde(SOL, y, b.madde, SAG - SOL) * 46 + 14;
      } else if (b.ornek) {
        y += yazIsaretli(S, SOL + 60, y, '→ ' + b.ornek, 31, SAG - SOL - 60, 44, R.mavi) * 44 + 12;
      } else if (b.dikkat) {
        const satir = satirlaIsaretli(S, b.dikkat, 32, SAG - SOL - 70).length;
        const h = satir * 44 + 34;
        sekil('rect', { x: SOL, y: y - 30, width: SAG - SOL, height: h, rx: 10, fill: '#fff6c9', stroke: R.sari, 'stroke-width': 3 });
        S.yazi(SOL + 18, y + 6, '!', 40, { class: 'kalin', fill: R.kirmizi });
        yazIsaretli(S, SOL + 50, y + 4, b.dikkat, 32, SAG - SOL - 70, 44, R.lacivert);
        y += h + 14;
      } else if (b.gorsel) {
        const gx = SAG - KW, metinGen = gx - 30 - SOL;
        let ty = y + 40;
        for (const m of b.metin || []) ty += madde(SOL, ty, m, metinGen) * 46 + 14;
        const h = yapistirKutusu(b.gorsel, gx, y - 30);
        y = Math.max(ty, y - 30 + h + 50);
      } else if (b.gorseller) {
        const n = b.gorseller.length, bosluk = 40, top = n * KW + (n - 1) * bosluk;
        let x = SOL + (SAG - SOL - top) / 2;
        let h = 0;
        for (const no of b.gorseller) { h = yapistirKutusu(no, x, y - 30); x += KW + bosluk; }
        y += h + 30;
      }
    }
    S.tasmaKontrol('Not sayfası', y - 40, ALT);
  }

  function kesSayfasi(S, v, renkli) {
    const n = v.gorseller.length, ogrenci = Math.floor(8 / n);
    S.yazi(620, 62, v.baslik + ' — kes-yapıştır görselleri', 34, { class: 'kalin', 'text-anchor': 'middle' });
    S.yazi(620, 102, `${ogrenci} öğrenci için · ${n === 1 ? 'Görsel 1' : 'her satır bir öğrenci: ' + v.gorseller.map((_, i) => 'Görsel ' + (i + 1)).join(' + ')} · 8,5 × 6 cm · kesik çizgiden kesin`, 24, { 'text-anchor': 'middle', fill: '#444' });
    const bosluk = 56, x0 = (1240 - 2 * KW - bosluk) / 2, y0 = 135, satirAra = (1754 - 30 - y0 - 4 * KH) / 3;
    for (let h = 0; h < 8; h++) {
      const sat = Math.floor(h / 2), sut = h % 2;
      const x = x0 + sut * (KW + bosluk), y = y0 + sat * (KH + satirAra);
      gorselCiz(S, v, (h % n) + 1, x, y, renkli, '#555');
      if (sut === 0) makas(S, x - 22, y + KH / 2);
    }
  }
  function makas(S, x, y) {
    sekil('circle', { cx: x - 8, cy: y - 9, r: 6, fill: 'none', stroke: '#555', 'stroke-width': 2 });
    sekil('circle', { cx: x - 8, cy: y + 9, r: 6, fill: 'none', stroke: '#555', 'stroke-width': 2 });
    sekil('path', { d: `M ${x - 3} ${y - 6} L ${x + 14} ${y + 6} M ${x - 3} ${y + 6} L ${x + 14} ${y - 6}`, stroke: '#555', 'stroke-width': 2.2, fill: 'none' });
  }

  function defterNotu(v) {
    return Sketchnote.ciz(S => {
      const mod = (location.hash || '').slice(1);
      document.title = v.baslik + (mod.startsWith('kes') ? ' — kes-yapıştır' : ' — defter notu');
      if (mod.startsWith('kes')) kesSayfasi(S, v, mod === 'kes-renkli');
      else notSayfasi(S, v);
    });
  }

  Sketchnote.defterNotu = defterNotu;
  Sketchnote.R = R;
})();
