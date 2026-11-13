// 4/D — Kodla defter notu + kes-yapıştır görselleri (öğretmenin kararları, 2026-11-13).
// Bir not dosyası iki çıktı verir:
//   1) Not sayfaları (renkli, A4 dikey, spiral defter görünümü). Konu 1–3 sayfa sürebilir; sığmayan blok bir sonraki
//      sayfaya geçer, başlık sayfa sonunda yalnız kalmaz, sayfalar "1 / 3" diye numaralanır. Görsellerin yeri
//      "✂ Görsel N — buraya yapıştır" kesik çizgili kutuyla, ilgili yazının yanında gösterilir.
//   2) Kes-yapıştır sayfaları (#kes): görseller ikişerli gruplanır (1+2, 3+4, …). Her grup bir A4: 2 sütun × 4 satır,
//      her satır bir öğrencinin takımı → 1 A4 = 4 öğrenci. Tek kalan görselin A4'ünde 8 kopya (8 öğrenci).
//      Varsayılan siyah-beyaz boyama (#kes-renkli: renkli).
// Görsel boyutu iki çıktıda da aynıdır: 8,5 × 6 cm (öğrenci defterine sığar).
//
// Not dosyası:
//   Sketchnote.defterNotu({ baslik, bloklar: [...], gorseller: [{ ad, ciz(S, renkli) }, ...] })
// Bloklar (yukarıdan aşağı akar):
//   { konu: '1. Alt konu başlığı' }           büyük kırmızı alt konu başlığı
//   { ara: 'Ara başlık' }                     pastel hap etiket
//   { madde: 'Metin **anahtar kelime** …' }    renkli madde imi; **…** kırmızı-kalın
//   { adim: ['…', '…'] }                      numaralı adımlar (1, 2, 3 …)
//   { ornek: '25 × 10 = 250' }                girintili örnek satırı (→)
//   { gorsel: 1, metin: ['madde', …] }        görsel 1 sağda, maddeler solda
//   { gorseller: [1, 2] }                     görseller yan yana
//   { dikkat: 'Metin' }                       sarı not kutusu
//   { sayfa: true }                           buradan yeni sayfaya geç
//   herhangi bir bloğa birlikte: true         bir sonraki blokla aynı sayfada kalır (ör. problem + çözüm adımları)
// Görsel: { ad, ciz(S, renkli) } kodla çizim  ya da  { ad, resim: 'Baski/Fen/resimler/x.png', istem: 'ChatGPT istemi',
//   etiketler: [{ x, y, t, ok }] }  (resim yoksa yer tutucu; istemler: node tools/sketchnote-yap.mjs <not> --istemler)
// Görsel çizimi 510 × 360 birimlik alanda yapılır (8,5 × 6 cm). S.r(renk) siyah-beyazda dolguyu kaldırır,
// S.m(renk) siyah-beyazda yazıyı siyah yapar. Alt alta işlem için Sketchnote.dikey(S, x, y, satirlar, ops).
// Sayfa seçimi (PNG için): #not&s=2, #kes&s=1. Sayfa sayıları body[data-sayfa], body[data-kes-sayfa].
(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const CM = 1240 / 21;
  const GW = 510, GH = 360, KW = 8.5 * CM, KH = 6 * CM, K = KW / GW;
  const R = { kirmizi: '#d62828', lacivert: '#1d3557', mavi: '#1f6fd1', sari: '#f2b705', yesil: '#2a9d8f', pembe: '#e5527a', gri: '#8a8a8a' };
  const HAPLAR = ['#ffe08a', '#b7e4c7', '#ffc8dd', '#bde0fe'];
  const MADDE_IMI = [R.kirmizi, R.mavi, R.yesil, R.sari];
  const SOL = 140, SAG = 1195, UST_ILK = 190, UST = 150, ALT = 1705;
  const MADDE_BOY = 31, MADDE_SATIR = 43, KONU_H = 92, ARA_H = 100;

  function sekil(ust, ad, ozellik) {
    const n = document.createElementNS(NS, ad);
    for (const [k, v] of Object.entries(ozellik)) n.setAttribute(k, v);
    return ust.appendChild(n);
  }

  // **kalın** işaretli metni satırlara böler: [[{t, kalin, bitisik}], …]
  function satirlaIsaretli(S, metin, boy, gen) {
    const kelimeler = []; let kalin = false, onceki = '';
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
      const ek = satir.length && !k.bitisik ? bosluk : 0;
      if (satir.length && g + ek + w > gen) { satirlar.push(satir); satir = []; g = 0; }
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
  const satirSay = (S, metin, boy, gen) => satirlaIsaretli(S, metin, boy, gen).length;

  // Alt alta işlem: rakamlar sabit aralıkla, sağa hizalı (basamaklar tam alt alta gelir).
  // satirlar: [{ t: '136' }, { t: '24', isaret: '×' }, { cizgi: true }, { t: '544', etiket: '136 × 4', renk },
  //            { t: '2720', isaret: '+', soluk: 1 } (sağdan 1 rakam soluk/mavi), { elde: { 2: '1' } } (sağdan 2. basamağın üstüne küçük elde)]
  function dikey(S, x, y, satirlar, ops) {
    const o = Object.assign({ boy: 40, ara: 46, adim: 25, etiketX: x + 26, etiketBoy: 21 }, ops || {});
    let yy = y; let enGenis = 0;
    for (const s of satirlar) if (s.t) enGenis = Math.max(enGenis, s.t.length);
    for (const s of satirlar) {
      if (s.cizgi) { S.ekle(S.rc.line(x - (enGenis + 1.2) * o.adim, yy - o.ara + 14, x + 8, yy - o.ara + 14, S.o({ strokeWidth: 2.6, roughness: 0.6 }))); continue; }
      if (s.elde) {
        for (const [bas, t] of Object.entries(s.elde))
          S.yazi(x - (Number(bas) - 0.5) * o.adim + 2, yy - o.boy * 0.95, t, o.boy * 0.5, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
        continue;
      }
      const rakamlar = s.t.split('');
      rakamlar.forEach((c, i) => {
        const sagdan = rakamlar.length - i; // 1 = birler
        const soluk = s.soluk && sagdan <= s.soluk;
        S.yazi(x - (sagdan - 0.5) * o.adim, yy, c, o.boy, { class: 'kalin', 'text-anchor': 'middle', fill: soluk ? S.m(R.mavi) : S.m(s.renk || '#1f1f1f') });
      });
      if (s.isaret) S.yazi(x - (enGenis + 0.9) * o.adim, yy, s.isaret, o.boy, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      if (s.etiket) S.yazi(o.etiketX, yy - 4, s.etiket, o.etiketBoy, { class: 'kalin', fill: S.m(s.etiketRenk || R.yesil) });
      yy += o.ara;
    }
    return yy;
  }

  // Bir görseli (x, y) köşesine 8,5 × 6 cm çizer.
  function gorselCiz(S, v, no, x, y, renkli, cerceve) {
    const g = v.gorseller[no - 1];
    if (!g) { S.tasmaKontrol('Görsel ' + no + ' tanımlı değil', 1, 0); return; }
    S.tohumla(1000 * no); // her kopyada aynı çizim
    S.r = (c) => (renkli ? c : undefined);
    S.m = (c) => (renkli ? c : '#111');
    S.renkli = renkli;
    S.grup(x, y, K, () => {
      const grup = S.svg.lastChild;
      sekil(grup, 'rect', { x: 0, y: 0, width: GW, height: GH, fill: '#fff' });
      if (g.resim) resimYuvasi(S, grup, g, renkli);
      if (g.ciz) g.ciz(S, renkli);
      for (const e of g.etiketler || []) etiket(S, e, renkli);
      sekil(grup, 'rect', { x: 0, y: 0, width: GW, height: GH, fill: 'none', stroke: cerceve, 'stroke-width': 2.2 / K, 'stroke-dasharray': `${10 / K} ${7 / K}` });
      sekil(grup, 'circle', { cx: 22, cy: 22, r: 15, fill: renkli ? R.lacivert : '#fff', stroke: '#111', 'stroke-width': 2 });
      S.yazi(22, 29, String(no), 20, { class: 'kalin', 'text-anchor': 'middle', fill: renkli ? '#fff' : '#111' });
    });
  }
  // ChatGPT (ya da başka kaynaktan) gelen resim: yuvaya kırpılarak sığar; siyah-beyaz baskıda gri tonlu.
  // Resim dosyası yoksa yer tutucu çizilir (sayfa düzeni yine görülür).
  function resimYuvasi(S, grup, g, renkli) {
    const veri = (Sketchnote.RESIMLER || {})[g.resim];
    if (veri) {
      const im = sekil(grup, 'image', { href: veri, x: 0, y: 0, width: GW, height: GH, preserveAspectRatio: 'xMidYMid slice' });
      if (!renkli) im.setAttribute('filter', 'url(#gri)');
      return;
    }
    const kirp = sekil(grup, 'svg', { x: 0, y: 0, width: GW, height: GH, overflow: 'hidden' }); // çizgiler kutudan taşmasın
    sekil(kirp, 'rect', { x: 0, y: 0, width: GW, height: GH, fill: '#f3f5f9' });
    for (let d = -GH; d < GW; d += 26) sekil(kirp, 'line', { x1: d, y1: GH, x2: d + GH, y2: 0, stroke: '#e2e7ef', 'stroke-width': 3 });
    S.yazi(GW / 2, GH / 2 - 22, 'ChatGPT ile çizilecek', 26, { class: 'kalin', 'text-anchor': 'middle', fill: '#7a8599' });
    S.yazi(GW / 2, GH / 2 + 12, g.ad, 22, { 'text-anchor': 'middle', fill: '#7a8599' });
    S.yazi(GW / 2, GH / 2 + 40, g.resim.split('/').pop(), 17, { 'text-anchor': 'middle', fill: '#9aa3b2' });
  }
  // Resim üstüne etiket: { x, y, t, ok: [[x1,y1],[x2,y2],...], renk, boy } — beyaz zeminli, okunaklı
  function etiket(S, e, renkli) {
    const boy = e.boy || 24, renk = renkli ? (e.renk || R.kirmizi) : '#111';
    if (e.ok) S.ok(e.ok, renkli ? (e.okRenk || R.kirmizi) : '#111');
    const w = S.genislik(e.t, boy, { class: 'kalin' });
    const x = e.x - w / 2;
    sekil(S.svg.lastChild, 'rect', { x: x - 10, y: e.y - boy * 0.95, width: w + 20, height: boy * 1.35, rx: 10, fill: '#fff', 'fill-opacity': 0.92, stroke: renk, 'stroke-width': 2 });
    S.yazi(e.x, e.y, e.t, boy, { class: 'kalin', 'text-anchor': 'middle', fill: renk });
  }
  function makas(svg, x, y) {
    sekil(svg, 'circle', { cx: x - 8, cy: y - 9, r: 6, fill: 'none', stroke: '#555', 'stroke-width': 2 });
    sekil(svg, 'circle', { cx: x - 8, cy: y + 9, r: 6, fill: 'none', stroke: '#555', 'stroke-width': 2 });
    sekil(svg, 'path', { d: `M ${x - 3} ${y - 6} L ${x + 14} ${y + 6} M ${x - 3} ${y + 6} L ${x + 14} ${y - 6}`, stroke: '#555', 'stroke-width': 2.2, fill: 'none' });
  }

  // ---- Sayfa yapısı ----
  function yeniSayfa(ilk) {
    if (ilk) return ilk;
    const kap = document.querySelector('.sayfa').cloneNode(false);
    const svg = document.createElementNS(NS, 'svg');
    for (const a of ['viewBox', 'xmlns', 'role', 'aria-label']) svg.setAttribute(a, document.getElementById('s').getAttribute(a));
    kap.appendChild(svg);
    document.body.insertBefore(kap, document.querySelector('script'));
    return svg;
  }
  function defterZemini(svg) {
    for (let x = 118; x < 1240; x += 29.5) sekil(svg, 'line', { x1: x, y1: 0, x2: x, y2: 1754, stroke: '#e3ebf5', 'stroke-width': 1.2 });
    for (let y = 20; y < 1754; y += 29.5) sekil(svg, 'line', { x1: 100, y1: y, x2: 1240, y2: y, stroke: '#e3ebf5', 'stroke-width': 1.2 });
    sekil(svg, 'line', { x1: 110, y1: 0, x2: 110, y2: 1754, stroke: '#f28b82', 'stroke-width': 2.5 });
    for (let y = 45; y < 1740; y += 62) {
      sekil(svg, 'circle', { cx: 66, cy: y, r: 9, fill: '#d9d9d9', stroke: '#9a9a9a', 'stroke-width': 1.5 });
      sekil(svg, 'path', { d: `M 66 ${y} C 40 ${y - 6} 18 ${y - 2} 14 ${y + 10}`, fill: 'none', stroke: '#555', 'stroke-width': 5, 'stroke-linecap': 'round' });
    }
  }

  // Blok yükseklikleri (sayfaya yerleştirmek için önce ölçülür)
  function yukseklik(S, b) {
    if (b.konu) return KONU_H;
    if (b.ara) return ARA_H;
    if (b.madde) return satirSay(S, b.madde, MADDE_BOY, SAG - SOL - 32) * MADDE_SATIR + 14;
    if (b.adim) return b.adim.reduce((t, m) => t + satirSay(S, m, MADDE_BOY, SAG - SOL - 50) * MADDE_SATIR + 14, 0);
    if (b.ornek) return satirSay(S, '→ ' + b.ornek, 31, SAG - SOL - 60) * 44 + 12;
    if (b.dikkat) return satirSay(S, b.dikkat, 32, SAG - SOL - 70) * 44 + 34 + 14;
    if (b.gorsel) {
      const gen = SAG - KW - 30 - SOL;
      const metin = (b.metin || []).reduce((t, m) => t + satirSay(S, m, MADDE_BOY, gen - 32) * MADDE_SATIR + 14, 0);
      return Math.max(40 + metin, 58 + KH);
    }
    if (b.gorseller) return 68 + KH;
    return 0;
  }

  function notSayfalari(S0, v) {
    // 1) Bloklar sayfalara dağıtılır
    const sayfalar = [[]]; let y = UST_ILK;
    v.bloklar.forEach((b, i) => {
      if (b.sayfa) { if (sayfalar[sayfalar.length - 1].length) { sayfalar.push([]); y = UST; } return; }
      const h = yukseklik(S0, b);
      // Başlıklar (konu, ara) ve 'birlikte: true' işaretli bloklar bir sonraki blokla aynı sayfada kalır (zincir).
      let gerek = h;
      for (let j = i; j < v.bloklar.length - 1; j++) {
        const bu = v.bloklar[j], sonraki = v.bloklar[j + 1];
        if (!(bu.konu || bu.ara || bu.birlikte) || sonraki.sayfa) break;
        gerek += yukseklik(S0, sonraki);
      }
      if (y + gerek > ALT && sayfalar[sayfalar.length - 1].length) { sayfalar.push([]); y = UST; }
      sayfalar[sayfalar.length - 1].push(b); y += h;
    });
    const n = sayfalar.length;
    // 2) Her sayfa çizilir
    let araSay = 0, imi = 0;
    sayfalar.forEach((bloklar, si) => {
      const svg = yeniSayfa(si === 0 ? S0.svg : null);
      const S = si === 0 ? S0 : Object.assign(Sketchnote.araclar(svg), { tasmaKontrol: S0.tasmaKontrol });
      defterZemini(svg);
      if (si === 0) {
        const bg = S.genislik(v.baslik, 64, { class: 'kalin' });
        const bx = 655 - bg / 2 - 40;
        sekil(svg, 'rect', { x: bx, y: 50, width: bg + 80, height: 92, rx: 46, fill: '#ffe3ea', stroke: R.pembe, 'stroke-width': 3, 'stroke-dasharray': '10 6' });
        S.yazi(655, 117, v.baslik, 64, { class: 'kalin', 'text-anchor': 'middle', fill: R.kirmizi });
        for (const [x1] of [[bx - 70], [bx + bg + 98]])
          sekil(svg, 'path', { d: `M ${x1} 96 q 13 -14 26 0 t 26 0`, fill: 'none', stroke: R.pembe, 'stroke-width': 4, 'stroke-linecap': 'round' });
      } else {
        S.yazi(SOL, 82, v.baslik + ' (devam)', 34, { class: 'kalin', fill: R.kirmizi });
        sekil(svg, 'line', { x1: SOL, y1: 96, x2: SOL + S.genislik(v.baslik + ' (devam)', 34, { class: 'kalin' }), y2: 96, stroke: R.pembe, 'stroke-width': 3, 'stroke-dasharray': '8 6' });
      }
      if (n > 1) S.yazi(655, 1735, `${si + 1} / ${n}`, 26, { class: 'kalin', 'text-anchor': 'middle', fill: R.gri });

      let y = si === 0 ? UST_ILK : UST;
      const madde = (x, yy, metin, gen, imiRenk) => {
        sekil(svg, 'circle', { cx: x + 10, cy: yy - 11, r: 8, fill: imiRenk || MADDE_IMI[imi++ % MADDE_IMI.length] });
        return yazIsaretli(S, x + 32, yy, metin, MADDE_BOY, gen - 32, MADDE_SATIR, R.lacivert);
      };
      const yapistirKutusu = (no, x, yy) => {
        makas(svg, x + 14, yy + 17);
        S.yazi(x + 36, yy + 26, `Görsel ${no} — buraya yapıştır`, 26, { class: 'kalin', fill: R.pembe });
        gorselCiz(S, v, no, x, yy + 38, true, R.pembe);
        return 38 + KH;
      };
      for (const b of bloklar) {
        const bas = y;
        if (b.konu) {
          y += 8;
          S.yazi(SOL, y + 30, b.konu, 40, { class: 'kalin', fill: R.kirmizi });
          const w = S.genislik(b.konu, 40, { class: 'kalin' });
          S.ekle(S.rc.line(SOL, y + 43, SOL + w, y + 41, S.o({ stroke: R.kirmizi, strokeWidth: 3, roughness: 0.8 })));
          y = bas + KONU_H;
        } else if (b.ara) {
          y += 4;
          const w = S.genislik(b.ara, 34, { class: 'kalin' });
          sekil(svg, 'rect', { x: SOL, y: y, width: w + 44, height: 52, rx: 26, fill: HAPLAR[araSay++ % HAPLAR.length] });
          S.yazi(SOL + 22, y + 37, b.ara, 34, { class: 'kalin', fill: R.lacivert });
          y = bas + ARA_H;
        } else if (b.madde) {
          y += madde(SOL, y, b.madde, SAG - SOL) * MADDE_SATIR + 14;
        } else if (b.adim) {
          b.adim.forEach((m, i) => {
            sekil(svg, 'circle', { cx: SOL + 16, cy: y - 11, r: 17, fill: HAPLAR[i % HAPLAR.length], stroke: R.lacivert, 'stroke-width': 1.5 });
            S.yazi(SOL + 16, y - 2, String(i + 1), 24, { class: 'kalin', 'text-anchor': 'middle', fill: R.lacivert });
            y += yazIsaretli(S, SOL + 50, y, m, MADDE_BOY, SAG - SOL - 50, MADDE_SATIR, R.lacivert) * MADDE_SATIR + 14;
          });
        } else if (b.ornek) {
          y += yazIsaretli(S, SOL + 60, y, '→ ' + b.ornek, 31, SAG - SOL - 60, 44, R.mavi) * 44 + 12;
        } else if (b.dikkat) {
          const satir = satirSay(S, b.dikkat, 32, SAG - SOL - 70);
          const h = satir * 44 + 34;
          sekil(svg, 'rect', { x: SOL, y: y - 30, width: SAG - SOL, height: h, rx: 10, fill: '#fff6c9', stroke: R.sari, 'stroke-width': 3 });
          S.yazi(SOL + 18, y + 6, '!', 40, { class: 'kalin', fill: R.kirmizi });
          yazIsaretli(S, SOL + 50, y + 4, b.dikkat, 32, SAG - SOL - 70, 44, R.lacivert);
          y += h + 14;
        } else if (b.gorsel) {
          const gx = SAG - KW, metinGen = gx - 30 - SOL;
          let ty = y + 40;
          for (const m of b.metin || []) ty += madde(SOL, ty, m, metinGen) * MADDE_SATIR + 14;
          yapistirKutusu(b.gorsel, gx, y - 30);
          y = bas + yukseklik(S, b);
          void ty;
        } else if (b.gorseller) {
          const say = b.gorseller.length, bosluk = 40, top = say * KW + (say - 1) * bosluk;
          let x = SOL + (SAG - SOL - top) / 2;
          for (const no of b.gorseller) { yapistirKutusu(no, x, y - 30); x += KW + bosluk; }
          y = bas + yukseklik(S, b);
        }
      }
      S0.tasmaKontrol('Sayfa ' + (si + 1), y - 40, ALT + 10);
    });
    return n;
  }

  function kesSayfalari(S0, v, renkli) {
    const gruplar = [];
    for (let i = 1; i <= v.gorseller.length; i += 2) gruplar.push(i + 1 <= v.gorseller.length ? [i, i + 1] : [i]);
    gruplar.forEach((grp, si) => {
      const svg = yeniSayfa(si === 0 ? S0.svg : null);
      const S = si === 0 ? S0 : Object.assign(Sketchnote.araclar(svg), { tasmaKontrol: S0.tasmaKontrol });
      const ogrenci = grp.length === 2 ? 4 : 8;
      S.yazi(620, 62, v.baslik + ' — kes-yapıştır görselleri' + (gruplar.length > 1 ? ` (${si + 1}/${gruplar.length})` : ''), 34, { class: 'kalin', 'text-anchor': 'middle' });
      const aciklama = grp.length === 2 ? `her satır bir öğrenci: Görsel ${grp[0]} + Görsel ${grp[1]}` : `Görsel ${grp[0]}`;
      S.yazi(620, 102, `${ogrenci} öğrenci için · ${aciklama} · 8,5 × 6 cm · kesik çizgiden kesin`, 24, { 'text-anchor': 'middle', fill: '#444' });
      const bosluk = 56, x0 = (1240 - 2 * KW - bosluk) / 2, y0 = 135, satirAra = (1754 - 30 - y0 - 4 * KH) / 3;
      for (let h = 0; h < 8; h++) {
        const sat = Math.floor(h / 2), sut = h % 2;
        const x = x0 + sut * (KW + bosluk), y = y0 + sat * (KH + satirAra);
        gorselCiz(S, v, grp[h % grp.length], x, y, renkli, '#555');
        if (sut === 0) makas(svg, x - 22, y + KH / 2);
      }
    });
    return gruplar.length;
  }

  function defterNotu(v) {
    return Sketchnote.ciz(S => {
      const [mod, ...parametre] = (location.hash || '#not').slice(1).split('&');
      const secili = Number((parametre.find(p => p.startsWith('s=')) || 's=0').slice(2));
      const kes = mod.startsWith('kes');
      document.title = v.baslik + (kes ? ' — kes-yapıştır' : ' — defter notu');
      const n = kes ? kesSayfalari(S, v, mod === 'kes-renkli') : notSayfalari(S, v);
      document.body.dataset[kes ? 'kesSayfa' : 'sayfa'] = String(n);
      if (secili) document.querySelectorAll('.sayfa').forEach((d, i) => { d.style.display = i + 1 === secili ? '' : 'none'; });
    });
  }

  Sketchnote.defterNotu = defterNotu;
  Sketchnote.dikey = dikey;
  Sketchnote.R = R;
})();
