// Türkçe — Cümle Bilgisi: 6 alt konu (1–3 öğretmen onayladı; 4–6 öğretmenin isteğiyle eklendi 2026-11-13, programla
// doğrulanmalı; kazanım kodları doğrulanmalı).
// Görsel 1, 3, 5, 8, 9 kodla; 2, 4, 6, 7 ChatGPT (resim yuvası; cümleler resmin üstüne kodla yazılır → yazım hatası olmaz).
// Not: Türkçede sözcük sırası esnektir (devrik cümle); bu yüzden "cümle değildir" örneği olarak sıra bozukluğu değil,
// anlamı tamamlanmamış söz grubu ("Elif kitap") kullanıldı.
const ORTAK = ' Yatay 3:2. Tarz: temiz ve olgun eğitim illüstrasyonu, yumuşak düz renkler, ince koyu kontur, sade arka plan; 10–13 yaş için olgun görünüm; boyama sayfası gibi kalın çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın. Resimde hiçbir yazı, harf, sayı ya da konuşma balonu olmasın (yazıları sonradan ben ekleyeceğim). Alt kenarda yazı için sade boşluk bırak.';
const IKI_PANEL = ' Resim ortadan ince beyaz bir boşlukla iki eşit panele bölünsün.';

Sketchnote.defterNotu({
  baslik: 'CÜMLE BİLGİSİ',
  bloklar: [
    { konu: '1. Cümle nedir?' },
    { madde: 'Bir duygu, düşünce, istek ya da olayı **tam olarak anlatan** sözcük grubuna **cümle** denir.' },
    { madde: 'Cümlenin anlamı **tamamdır**: "Elif kitap" eksik kalır; "Elif kitap okudu." bir cümledir.' },
    { madde: 'Cümle **büyük harfle** başlar; sonuna **nokta (.)**, **soru işareti (?)** ya da **ünlem işareti (!)** konur.' },
    { gorseller: [1, 2] },

    { konu: '2. Olumlu ve olumsuz cümle' },
    { madde: '**Olumlu cümle:** İş, oluş ya da durumun **gerçekleştiğini** ya da **var olduğunu** bildirir.' },
    { ornek: 'Ali okula geldi.   •   Bahçede bir kedi var.   •   Hava güneşli.' },
    { madde: '**Olumsuz cümle:** İş, oluş ya da durumun **gerçekleşmediğini** ya da **olmadığını** bildirir.' },
    { ornek: 'Ali okula gelmedi.   •   Bahçede kedi yok.   •   Hava güneşli değil.' },
    { madde: 'Olumsuz cümleler çoğunlukla **-ma, -me** ekleriyle ya da **değil, yok** sözcükleriyle kurulur. **değil** her zaman **ayrı** yazılır.' },
    { gorseller: [3, 4] },

    { konu: '3. Soru cümlesi' },
    { madde: 'Bir şeyi **öğrenmek** için sorulan cümlelere **soru cümlesi** denir. Sonuna **soru işareti (?)** konur.' },
    { madde: 'Soru cümleleri **kim, ne, nerede, ne zaman, nasıl, neden, kaç** gibi soru sözcükleriyle ya da **mı, mi, mu, mü** ile kurulur.' },
    { madde: '**mı, mi, mu, mü** her zaman **ayrı** yazılır: Geldin **mi**? Okudun **mu**?' },
    { ornek: 'Ali okula geldi.  →  Ali okula geldi mi?  →  Ali okula ne zaman geldi?' },
    { gorseller: [5, 6] },

    { konu: '4. Ünlem cümlesi (duygu ve istek)' },
    { madde: '**Sevinç, şaşkınlık, korku, üzüntü** gibi duyguları anlatan cümlelerin sonuna **ünlem işareti (!)** konur.' },
    { ornek: 'Ne güzel bir hediye!   •   Eyvah, otobüsü kaçırdık!   •   Of, çok yoruldum!' },
    { madde: '**Seslenme** ve **emir** bildiren cümlelerin sonuna da ünlem işareti konabilir: Ali, buraya gel! Dikkat et!' },

    { konu: '5. Kurallı ve devrik cümle' },
    { madde: 'Cümlede işi, oluşu ya da durumu bildiren sözcüğe **yüklem** denir: Elif kitap **okudu**.' },
    { madde: 'Yüklemi **sonda** olan cümleye **kurallı cümle** denir: Çocuklar bahçede **oynuyor**.' },
    { madde: 'Yüklemi **sonda olmayan** cümleye **devrik cümle** denir: **Oynuyor** çocuklar bahçede.' },
    { gorseller: [7, 8] },

    { konu: '6. Cümlede sebep-sonuç ve amaç-sonuç' },
    { gorsel: 9, metin: [
      '**Sebep-sonuç:** Bir olayın **neden** olduğu anlatılır: Çok koştuğu için yoruldu.',
      '"için, -dığı için, bu yüzden, -den" gibi sözcük ve eklerle kurulur: Hasta olduğundan okula gelmedi.',
      '**Amaç-sonuç:** Bir işin **hangi amaçla** yapıldığı anlatılır: Kitap almak için kırtasiyeye gitti.',
    ] },
  ],

  gorseller: [
    // 1 — Sözcüklerden cümleye (kodla)
    { ad: 'Sözcüklerden cümleye', ciz(S) {
      const { rc, o, ekle, yazi, ok, genislik } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 42, 'Sözcüklerden Cümleye', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const kart = (x, y, t, renk) => {
        const w = genislik(t, 28) + 28;
        ekle(rc.rectangle(x - w / 2, y - 28, w, 42, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.2, strokeWidth: 2 })));
        yazi(x, y + 2, t, 28, { 'text-anchor': 'middle' });
      };
      kart(110, 96, 'okudu', SARI); kart(258, 110, 'kitap', MAVI); kart(398, 92, 'Elif', R.pembe);
      ok([[255, 140], [256, 160], [255, 180]], S.m(R.mavi));
      const cumle = 'Elif kitap okudu.';
      const w = genislik(cumle, 38, { class: 'kalin' }), x0 = 255 - w / 2;
      ekle(rc.rectangle(x0 - 20, 190, w + 40, 60, o({ strokeWidth: 2.4 })));
      yazi(x0, 234, cumle, 38, { class: 'kalin', fill: S.m(R.lacivert) });
      const eW = genislik('E', 38, { class: 'kalin' });
      ekle(rc.circle(x0 + eW / 2, 220, 44, o({ stroke: S.m(R.kirmizi), strokeWidth: 2.4 })));
      const nX = x0 + w - genislik('.', 38, { class: 'kalin' }) / 2;
      ekle(rc.circle(nX, 228, 24, o({ stroke: S.m(R.kirmizi), strokeWidth: 2.4 })));
      ok([[x0 - 6, 300], [x0 - 2, 276], [x0 + eW / 2 - 4, 246]], S.m(R.kirmizi));
      yazi(x0 - 40, 326, 'büyük harf', 22, { class: 'kalin', fill: S.m(R.kirmizi) });
      ok([[nX + 26, 300], [nX + 14, 276], [nX + 2, 244]], S.m(R.kirmizi));
      yazi(nX - 10, 326, 'nokta', 22, { class: 'kalin', fill: S.m(R.kirmizi) });
    } },
    // 2 — Olay anlatan cümle (ChatGPT)
    { ad: 'Bir olayı anlatan cümle', resim: 'Baski/Turkce/resimler/cumle-2-olay.png',
      istem: 'Bir görsel oluştur: Okul bahçesinde 10 yaşında bir kız çocuğu bir bankta oturmuş, elindeki kitabı dikkatle okuyor; arkada ağaçlar ve okul binasının bir köşesi.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Elif bahçede kitap okuyor.', boy: 24, renk: '#1d3557' }] },
    // 3 — Olumludan olumsuza (kodla)
    { ad: 'Olumludan olumsuza', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R;
      yazi(270, 40, 'Olumlu → Olumsuz', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(128, 80, 'OLUMLU', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.yesil) });
      yazi(388, 80, 'OLUMSUZ', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      const satirlar = [
        ['Ali okula geldi.', 'Ali okula gel', 'me', 'di.', '-me'],
        ['Kuşlar uçuyor.', 'Kuşlar uç', 'mu', 'yor.', '-mu'],
        ['Bahçede kedi var.', 'Bahçede kedi ', 'yok', '.', 'yok'],
        ['Hava güneşli.', 'Hava güneşli ', 'değil', '.', 'değil'],
      ];
      satirlar.forEach(([olumlu, a, ek, b], i) => {
        const y = 122 + i * 60;
        yazi(128, y, olumlu, 22, { 'text-anchor': 'middle' });
        ok([[238, y - 7], [256, y - 8], [276, y - 7]], S.m(R.mavi));
        const t = S.yazi(388, y, '', 22, { 'text-anchor': 'middle', style: 'white-space:pre' });
        for (const [p, kalin] of [[a, 0], [ek, 1], [b, 0]]) {
          const ts = document.createElementNS('http://www.w3.org/2000/svg', 'tspan'); ts.textContent = p;
          if (kalin) { ts.setAttribute('class', 'kalin'); ts.setAttribute('fill', S.m(R.kirmizi)); ts.setAttribute('text-decoration', 'underline'); }
          t.appendChild(ts);
        }
        if (i < 3) ekle(rc.line(20, y + 26, 490, y + 26, o({ strokeWidth: 1, strokeLineDash: [5, 7] })));
      });
      yazi(255, 346, 'olumsuzluk: -ma / -me, yok, değil', 19, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
    // 4 — Hava güneşli / değil (ChatGPT)
    { ad: 'Olumlu ve olumsuz', resim: 'Baski/Turkce/resimler/cumle-4-olumlu-olumsuz.png',
      istem: 'Bir görsel oluştur: Aynı okul bahçesinin iki hâli. Sol panel: güneşli, açık mavi gökyüzü, çocuklar dışarıda top oynuyor. Sağ panel: aynı bahçe bulutlu ve yağmurlu, bahçe boş, su birikintileri var.' + IKI_PANEL + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Hava güneşli.', boy: 22, renk: '#2a9d8f' }, { x: 383, y: 336, t: 'Hava güneşli değil.', boy: 22 }] },
    // 5 — Soru sözcükleri (kodla)
    { ad: 'Soru sözcükleri', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 40, 'Soru Cümlesi Nasıl Kurulur?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      ekle(rc.circle(255, 150, 76, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.4 })));
      yazi(255, 168, '?', 54, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      const sozler = ['kim?', 'ne?', 'nerede?', 'ne zaman?', 'nasıl?', 'neden?', 'kaç?'];
      sozler.forEach((t, i) => {
        const a = -Math.PI / 2 + i * 2 * Math.PI / sozler.length;
        const x = 255 + 150 * Math.cos(a) * 1.15, y = 150 + 88 * Math.sin(a);
        yazi(x, y + 8, t, 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.mavi) });
        ekle(rc.line(255 + 42 * Math.cos(a), 150 + 42 * Math.sin(a), 255 + 104 * Math.cos(a), 150 + 56 * Math.sin(a), o({ strokeWidth: 1.4 })));
      });
      ekle(rc.rectangle(40, 268, 430, 74, o({ strokeWidth: 2, stroke: S.m(MAVI) })));
      yazi(255, 298, 'ya da  mı / mi / mu / mü  (ayrı yazılır)', 21, { class: 'kalin', 'text-anchor': 'middle' });
      yazi(255, 330, 'Geldin mi?   Okudun mu?   Hazır mısın?', 21, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
    // 6 — Soru soran öğrenci (ChatGPT)
    { ad: 'Soru soran öğrenci', resim: 'Baski/Turkce/resimler/cumle-6-soru.png',
      istem: 'Bir görsel oluştur: Sınıfta sırasında oturan 10 yaşında bir erkek öğrenci, merakla elini kaldırmış öğretmenine bir şey soruyor; öğretmen tahtanın önünde gülümseyerek dinliyor. Öğrenci resmin solunda, öğretmen sağında; üst kısımda yazı için boş alan kalsın.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Öğretmenim, bu soruyu tekrar anlatır mısınız?', boy: 19, renk: '#1d3557' }] },
    // 7 — Ünlem: şaşkınlık ve sevinç (ChatGPT)
    { ad: 'Ünlem cümlesi', resim: 'Baski/Turkce/resimler/cumle-7-unlem.png',
      istem: 'Bir görsel oluştur: Doğum günü masasında 10 yaşında bir kız çocuğu, yeni açtığı hediye kutusundan çıkan bir teleskobu görünce sevinç ve şaşkınlıkla iki elini yanaklarına götürmüş; yüz ifadesi net ve doğal.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'Ne güzel bir hediye!', boy: 26 }] },
    // 8 — Kurallı / devrik (kodla)
    { ad: 'Kurallı ve devrik cümle', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI;
      yazi(270, 40, 'Kurallı mı, Devrik mi?', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const satir = (y, baslik, renk, parcalar) => {
        yazi(24, y - 34, baslik, 21, { class: 'kalin', fill: S.m(renk) });
        let x = 24;
        for (const [t, yuklem] of parcalar) {
          const w = S.genislik(t, 26, yuklem ? { class: 'kalin' } : {}) + 22;
          ekle(rc.rectangle(x, y - 26, w, 40, o({ fill: yuklem ? S.r(SARI) : undefined, fillStyle: 'hachure', hachureGap: 7, strokeWidth: yuklem ? 2.6 : 1.6 })));
          yazi(x + w / 2, y + 2, t, 26, Object.assign({ 'text-anchor': 'middle' }, yuklem ? { class: 'kalin', fill: S.m(R.kirmizi) } : {}));
          x += w + 8;
        }
      };
      satir(118, 'KURALLI: yüklem sonda', R.yesil, [['Çocuklar', 0], ['bahçede', 0], ['oynuyor.', 1]]);
      satir(218, 'DEVRİK: yüklem sonda değil', R.kirmizi, [['Oynuyor', 1], ['çocuklar', 0], ['bahçede.', 0]]);
      ekle(rc.rectangle(24, 262, 462, 1, o({ strokeWidth: 1, strokeLineDash: [5, 7] })));
      yazi(255, 300, 'sarı kutu: yüklem (işi, oluşu bildiren sözcük)', 20, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(255, 332, 'Devrik cümle şiirde ve konuşmada sık görülür.', 20, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
    // 9 — Sebep-sonuç / amaç-sonuç (kodla)
    { ad: 'Sebep-sonuç ve amaç-sonuç', ciz(S) {
      const { rc, o, ekle, yazi, ok } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 40, 'Sebep mi, Amaç mı?', 28, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const blok = (y, baslik, sol, sag, solEt, sagEt, renk) => {
        yazi(24, y, baslik, 22, { class: 'kalin', fill: S.m(R.kirmizi) });
        ekle(rc.rectangle(24, y + 14, 200, 66, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.2, strokeWidth: 2 })));
        ekle(rc.rectangle(286, y + 14, 200, 66, o({ strokeWidth: 2 })));
        yazi(124, y + 44, sol, 20, { class: 'kalin', 'text-anchor': 'middle' });
        yazi(124, y + 70, solEt, 17, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
        yazi(386, y + 44, sag, 20, { class: 'kalin', 'text-anchor': 'middle' });
        yazi(386, y + 70, sagEt, 17, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
        ok([[230, y + 47], [256, y + 46], [280, y + 47]], S.m(R.mavi));
      };
      blok(84, 'SEBEP → SONUÇ', 'Yağmur yağdığı için', 'ıslandık.', 'neden oldu?', 'ne oldu?', SARI);
      blok(206, 'AMAÇ → SONUÇ', 'Kazanmak için', 'çok çalıştı.', 'ne istedi?', 'ne yaptı?', MAVI);
      yazi(255, 334, 'Sebep: olayın nedeni  •  Amaç: ulaşılmak istenen', 19, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
  ],
});
