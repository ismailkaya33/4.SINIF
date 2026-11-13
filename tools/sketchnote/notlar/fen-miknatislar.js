// Fen — Mıknatıslar: 4 alt konu (öğretmen seçti 2026-11-13; kazanım kodları doğrulanmalı).
// Görsel 3, 5, 8 kodla (şema); 1, 2, 4, 6, 7 ChatGPT (resim yuvası). Resimler: Baski/Fen/resimler/ (GitHub'a gitmez).
// Bilgi kontrolü: anahtarların çoğu pirinçtir (çekilmez) → örnek olarak kullanılmadı; alüminyum kutu, bakır, altın çekilmez;
// mıknatıs etkisi kâğıt/cam/su/plastikten geçer; çekim kutuplarda en güçlü.
const ORTAK = ' Yatay 3:2. Tarz: temiz ve olgun eğitim illüstrasyonu, yumuşak düz renkler, ince koyu kontur, sade açık arka plan; 10–13 yaş için olgun görünüm; boyama sayfası gibi kalın çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın. Resimde hiçbir yazı, harf (mıknatıs üzerinde N ve S harfleri dahil), sayı ya da ok olmasın; mıknatısın iki ucu kırmızı ve mavi renkle ayrılsın. Alt kenarda yazı için sade boşluk bırak.';

Sketchnote.defterNotu({
  baslik: 'MIKNATISLAR',
  bloklar: [
    { konu: '1. Mıknatıs ve çektiği maddeler' },
    { madde: 'Bazı maddeleri **kendine çeken** cisimlere **mıknatıs** denir.' },
    { madde: 'Mıknatıs **demir, nikel, kobalt** ve bunları içeren cisimleri **çeker**: ataş, toplu iğne, demir çivi, çelik vida.' },
    { madde: 'Mıknatıs **tahta, plastik, cam, kâğıt, kumaş, lastik** gibi maddeleri **çekmez**.' },
    { dikkat: 'Her metal mıknatısa yapışmaz! **Alüminyum** içecek kutusu, **bakır** tel ve **altın** yüzük mıknatısa yapışmaz.' },
    { gorseller: [1, 2] },

    { konu: '2. Mıknatısın kutupları' },
    { madde: 'Mıknatısın iki ucuna **kutup** denir: **kuzey kutbu (N)** ve **güney kutbu (S)**.' },
    { madde: 'Mıknatısın çekim etkisi **kutuplarında en güçlü**, ortasında en zayıftır.' },
    { madde: '**Aynı** kutuplar birbirini **iter** (N ile N, S ile S). **Zıt** kutuplar birbirini **çeker** (N ile S).' },
    { gorseller: [3, 4] },

    { konu: '3. Mıknatısın şekilleri ve aradan etkisi' },
    { madde: 'Mıknatıslar farklı şekillerde olabilir: **çubuk**, **U (at nalı)**, **halka** ve **disk** mıknatıs.' },
    { madde: 'Mıknatısın etkisi **kâğıt, karton, cam, su** ve **plastik** gibi maddelerin **içinden geçer**.' },
    { ornek: 'Kâğıdın altında gezdirilen mıknatıs, kâğıdın üstündeki ataşı hareket ettirir.' },
    { ornek: 'Su dolu bardağın dibindeki ataş, bardağın dışından mıknatısla yukarı çıkarılabilir.' },
    { gorseller: [5, 6] },

    { konu: '4. Mıknatısların kullanım alanları' },
    { madde: 'Buzdolabı kapağı ve süsleri, çanta ve kalemlik kapakları, **pusula**, mıknatıslı oyuncaklar ve yazı tahtası mıknatısları.', birlikte: true },
    { madde: 'Hurdalıklarda büyük **mıknatıslı vinçler** demir parçalarını öteki atıklardan ayırır.', birlikte: true },
    { dikkat: 'Küçük mıknatıslar **yutulursa çok tehlikelidir**. Mıknatısları banka kartı gibi manyetik şeritli kartlara yaklaştırmayız.', birlikte: true },
    { gorseller: [7, 8] },
  ],

  gorseller: [
    { ad: 'Mıknatısın çektikleri', resim: 'Baski/Fen/resimler/miknatis-1-ceker.png',
      istem: 'Bir görsel oluştur: Masanın üzerinde bir el, kırmızı-mavi bir çubuk mıknatısı tutuyor; mıknatısın uçlarına ataşlar, toplu iğneler ve küçük demir çiviler yapışmış, bir kısmı havada asılı duruyor.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'ÇEKER: ataş, toplu iğne, demir çivi', boy: 21, renk: '#2a9d8f' }] },
    { ad: 'Mıknatısın çekmedikleri', resim: 'Baski/Fen/resimler/miknatis-2-cekmez.png',
      istem: 'Bir görsel oluştur: Masanın üzerinde kırmızı-mavi bir çubuk mıknatıs ve hemen yanında, ona yapışmadan duran tahta kurşun kalem, plastik silgi, cam bilye, kâğıt parçası, lastik ve gümüş renkli alüminyum içecek kutusu.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'ÇEKMEZ: tahta, plastik, cam, kâğıt, alüminyum', boy: 20 }] },
    // 3 — Kutupların etkileşimi (kodla)
    { ad: 'Kutuplar: iter mi, çeker mi?', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R;
      yazi(270, 40, 'Kutuplar: İter mi, Çeker mi?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const mik = (x, y, sol) => { // sol: 'N' ya da 'S' (soldaki uç)
        const sag = sol === 'N' ? 'S' : 'N', renk = { N: R.kirmizi, S: R.mavi };
        for (const [i, k] of [[0, sol], [1, sag]]) {
          ekle(rc.rectangle(x + i * 60, y, 60, 40, o({ fill: S.r(renk[k]), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
          yazi(x + i * 60 + 30, y + 30, k, 26, { class: 'kalin', 'text-anchor': 'middle' });
        }
      };
      const satir = (y, a, b, sonuc, cek) => {
        mik(24, y, a); mik(cek ? 172 : 196, y, b);
        if (cek) { ok([[150, y + 20], [158, y + 21], [166, y + 20]], S.m(R.yesil)); ok([[192, y + 20], [184, y + 21], [176, y + 20]], S.m(R.yesil)); }
        else { ok([[152, y + 20], [140, y + 21], [128, y + 20]], S.m(R.kirmizi)); ok([[192, y + 20], [204, y + 21], [216, y + 20]], S.m(R.kirmizi)); }
        yazi(330, y + 18, sonuc, 22, { class: 'kalin', fill: S.m(cek ? R.yesil : R.kirmizi) });
        yazi(330, y + 42, cek ? 'zıt kutuplar' : 'aynı kutuplar', 18, { fill: S.m(R.lacivert) });
      };
      satir(76, 'N', 'N', 'ÇEKER', true);
      satir(160, 'N', 'S', 'İTER', false);
      satir(244, 'S', 'N', 'İTER', false);
      yazi(255, 340, 'N: kuzey kutbu (kırmızı)  •  S: güney kutbu (mavi)', 18, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
    { ad: 'Çekim kutuplarda güçlü', resim: 'Baski/Fen/resimler/miknatis-4-kutuplar.png',
      istem: 'Bir görsel oluştur: Kırmızı-mavi bir çubuk mıknatıs, bir ataş yığınına batırılıp yukarı kaldırılmış; ataşlar mıknatısın iki ucunda salkım gibi toplanmış, mıknatısın ortasında neredeyse hiç ataş yok. Mıknatıs yatay, resmin ortasında.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Çekim kutuplarda en güçlü, ortada en zayıf', boy: 20 }] },
    // 5 — Mıknatıs şekilleri (kodla)
    { ad: 'Mıknatıs şekilleri', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R;
      yazi(270, 40, 'Mıknatıs Şekilleri', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const K = S.r(R.kirmizi), M = S.r(R.mavi), dol = (r) => o({ fill: r, fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 });
      // çubuk
      ekle(rc.rectangle(30, 100, 80, 44, dol(K))); ekle(rc.rectangle(110, 100, 80, 44, dol(M)));
      yazi(70, 130, 'N', 24, { class: 'kalin', 'text-anchor': 'middle' }); yazi(150, 130, 'S', 24, { class: 'kalin', 'text-anchor': 'middle' });
      yazi(110, 176, 'çubuk', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // U (at nalı)
      ekle(rc.path('M 300 70 L 300 130 A 50 50 0 0 0 400 130 L 400 70 L 372 70 L 372 130 A 22 22 0 0 1 328 130 L 328 70 Z', o({ fill: S.r('#c9c9c9'), fillStyle: 'hachure', hachureGap: 8, strokeWidth: 2.2 })));
      ekle(rc.rectangle(300, 62, 28, 30, dol(K))); ekle(rc.rectangle(372, 62, 28, 30, dol(M)));
      yazi(314, 56, 'N', 20, { class: 'kalin', 'text-anchor': 'middle' }); yazi(386, 56, 'S', 20, { class: 'kalin', 'text-anchor': 'middle' });
      yazi(350, 210, 'U (at nalı)', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // halka
      ekle(rc.circle(110, 270, 90, dol(M))); ekle(rc.circle(110, 270, 40, o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 2 })));
      yazi(110, 340, 'halka', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // disk
      ekle(rc.ellipse(350, 262, 110, 40, dol(K))); ekle(rc.line(295, 262, 295, 282, o())); ekle(rc.line(405, 262, 405, 282, o()));
      ekle(rc.path('M 295 282 A 55 20 0 0 0 405 282', o({ fill: S.r(R.mavi), fillStyle: 'hachure', hachureGap: 6 })));
      yazi(350, 340, 'disk', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
    } },
    { ad: 'Etki kartondan geçer', resim: 'Baski/Fen/resimler/miknatis-6-aradan.png',
      istem: 'Bir görsel oluştur: Bir çocuk iki eliyle yatay tuttuğu kartondan bir labirent oyununu inceliyor; bir eliyle kartonun altında küçük bir mıknatısı gezdiriyor, kartonun üstündeki ataş labirentin yolunda ilerliyor. Kartonun altı ve üstü yandan bakınca birlikte görünsün.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Mıknatısın etkisi kartonun içinden geçer', boy: 21 }] },
    { ad: 'Mıknatıslı vinç', resim: 'Baski/Fen/resimler/miknatis-7-vinc.png',
      istem: 'Bir görsel oluştur: Bir hurdalıkta, vincin ucundaki büyük yuvarlak mıknatıs, yerdeki karışık hurda yığınından demir parçalarını kaldırıyor; yerde tahta ve plastik atıklar kalıyor. Gündüz, sade gökyüzü.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Mıknatıslı vinç demir parçalarını ayırır', boy: 21 }] },
    // 8 — Kullanım alanları (kodla)
    { ad: 'Mıknatıs nerede kullanılır?', ciz(S) {
      const { rc, o, ekle, yazi, ok, genislik } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 40, 'Mıknatıs Nerede Kullanılır?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      ekle(rc.ellipse(255, 196, 150, 70, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 7, strokeWidth: 2.6 })));
      yazi(255, 205, 'MIKNATIS', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      const dallar = [[96, 96, 'buzdolabı kapağı'], [414, 96, 'çanta kapağı'], [74, 196, 'pusula'], [436, 196, 'oyuncaklar'], [110, 300, 'kalemlik kapağı'], [400, 300, 'hurda vinci']];
      for (const [x, y, t] of dallar) {
        const w = genislik(t, 20, { class: 'kalin' }) + 22, dx = x < 255 ? 1 : -1;
        const bas = [255 - dx * (Math.abs(y - 196) < 10 ? 76 : 44), 196 + (y - 196) * 0.36];
        const uc = [x + dx * (w / 2 + 6), y + (y < 196 ? 10 : y > 196 ? -14 : 0)];
        ok([bas, [(bas[0] + uc[0]) / 2, (bas[1] + uc[1]) / 2], uc], S.m(R.mavi));
        ekle(rc.rectangle(x - w / 2, y - 20, w, 34, o({ fill: S.r(MAVI), fillStyle: 'hachure', hachureGap: 9, fillWeight: 1, strokeWidth: 1.8 })));
        yazi(x, y + 3, t, 20, { class: 'kalin', 'text-anchor': 'middle' });
      }
    } },
  ],
});
