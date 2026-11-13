// Fen — Kuvvetin Etkileri: 3 alt konu (öğretmen onayladı 2026-11-13; kazanım kodları doğrulanmalı).
// Mıknatıslar ayrı not olacak. Görsel 1–5 ChatGPT ile çizilir (resim yuvası), Görsel 6 kodla özet şema.
// Resimler öğretmenin bilgisayarında: Baski/Fen/resimler/ (GitHub'a gitmez). İstemler: --istemler
const ORTAK = ' Yatay 3:2. Tarz: temiz ve olgun eğitim illüstrasyonu, yumuşak düz renkler, ince koyu kontur, açık sade arka plan; 10–13 yaş için olgun görünüm; boyama sayfası gibi kalın çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın. Resimde hiçbir yazı, harf, sayı, ok ya da işaret olmasın (etiketleri sonradan ben ekleyeceğim). Alt kenarda yazı için biraz sade boşluk bırak.';
const IKI_PANEL = ' Resim ortadan ince beyaz bir boşlukla iki eşit panele bölünsün.';

Sketchnote.defterNotu({
  baslik: 'KUVVETİN ETKİLERİ',
  bloklar: [
    { konu: '1. Kuvvet nedir?' },
    { madde: 'Bir cismi hareket ettirmek, durdurmak ya da şeklini değiştirmek için uygulanan **itme** ya da **çekme** etkisine **kuvvet** denir.' },
    { madde: 'Kuvveti **göremeyiz**; ama cisimler üzerindeki **etkilerini** görebiliriz.' },
    { madde: '**İtme:** Kuvvet cismi bizden **uzaklaştırır**. Kapıyı kapatmak, alışveriş arabasını sürmek, topa vurmak itmedir.' },
    { madde: '**Çekme:** Kuvvet cismi bize **yaklaştırır**. Çekmeceyi açmak, ipi çekmek, kovayı kuyudan çekmek çekmedir.' },
    { gorseller: [1, 2] },

    { konu: '2. Kuvvetin harekete etkisi' },
    { madde: 'Kuvvet **duran** bir cismi **hareket ettirir**: Duran topa vurunca top hareket eder.' },
    { madde: 'Kuvvet **hareket eden** bir cismi **durdurur**: Kaleci gelen topu tutar.' },
    { madde: 'Kuvvet hareket eden cismi **hızlandırır** ya da **yavaşlatır**: Salıncağı ittikçe salıncak hızlanır; fren, bisikleti yavaşlatır.' },
    { madde: 'Kuvvet hareket eden cismin **yönünü değiştirir**: Raket, gelen tenis topunu geri gönderir.' },
    { gorseller: [3, 4] },

    { konu: '3. Kuvvetin şekle etkisi' },
    { madde: 'Kuvvet bazı cisimlerin **şeklini değiştirir**: oyun hamurunu sıkmak, kâğıdı buruşturmak, süngeri sıkmak.' },
    { madde: 'Sünger, yay ve lastik top gibi cisimler kuvvet kalkınca **eski şekline döner**.' },
    { madde: 'Oyun hamuru, buruşturulmuş kâğıt ve ezilmiş teneke kutu ise eski şekline **dönmez**.' },
    { dikkat: 'Bir cisme kuvvet uygulanınca birden fazla etki görülebilir. Futbol topuna vurunca top hem **hareket eder** hem de bir an **şekli değişir**.' },
    { gorseller: [5, 6] },
  ],

  gorseller: [
    { ad: 'İtme', resim: 'Baski/Fen/resimler/kuvvet-1-itme.png',
      istem: 'Bir görsel oluştur: Markette 10 yaşında bir çocuk, içi dolu alışveriş arabasını iki eliyle önüne doğru itiyor; gövdesi öne eğik, bir ayağı geride, itme çabası duruşundan belli. Yan görünüm, çocuk solda, araba sağda.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'İTME: arabayı kendimizden uzaklaştırırız' , boy: 22 }] },
    { ad: 'Çekme', resim: 'Baski/Fen/resimler/kuvvet-2-cekme.png',
      istem: 'Bir görsel oluştur: Bahçede 10 yaşında bir çocuk, ipine bağlı tahta oyuncak el arabasını arkasından kendine doğru çekiyor; ip gergin, çocuk geriye doğru yürüyor. Yan görünüm, çocuk sağda, oyuncak araba solda.' + ORTAK,
      etiketler: [{ x: 255, y: 336, t: 'ÇEKME: arabayı kendimize yaklaştırırız', boy: 22 }] },
    { ad: 'Hareket ettirir / Durdurur', resim: 'Baski/Fen/resimler/kuvvet-3-hareket-durdurma.png',
      istem: 'Bir görsel oluştur: Sol panel: okul bahçesinde bir çocuk yerde duran futbol topuna ayağıyla vuruyor, top yeni harekete geçiyor. Sağ panel: eldivenli bir kaleci üzerine gelen topu iki eliyle tutup durduruyor.' + IKI_PANEL + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Hareket ettirir', boy: 22 }, { x: 383, y: 336, t: 'Durdurur', boy: 22 }] },
    { ad: 'Hızlandırır / Yönünü değiştirir', resim: 'Baski/Fen/resimler/kuvvet-4-hiz-yon.png',
      istem: 'Bir görsel oluştur: Sol panel: parkta bir çocuk, salıncakta oturan arkadaşını arkasından itiyor; salıncak öne doğru savruluyor. Sağ panel: bir çocuk tenis raketiyle üzerine gelen topa vuruyor, top geldiği yönün tersine geri gidiyor (topun yolu hafif hareket çizgileriyle belli).' + IKI_PANEL + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Hızlandırır', boy: 22 }, { x: 383, y: 336, t: 'Yönünü değiştirir', boy: 22 }] },
    { ad: 'Şeklini değiştirir', resim: 'Baski/Fen/resimler/kuvvet-5-sekil.png',
      istem: 'Bir görsel oluştur: Sol panel: masada iki el, bir top oyun hamurunu bastırıp yassılaştırıyor; yanında yassı kalmış hamur. Sağ panel: iki el bir mutfak süngerini sıkıyor; yanında bırakılınca eski şekline dönmüş aynı sünger.' + IKI_PANEL + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Hamur: eski şekline dönmez', boy: 19 }, { x: 383, y: 336, t: 'Sünger: eski şekline döner', boy: 19 }] },
    // 6 — Kodla özet şema
    { ad: 'Kuvvetin etkileri (özet)', ciz(S) {
      const { rc, o, ekle, yazi, ok, genislik } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(270, 40, 'Kuvvetin Etkileri', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      // merkez
      ekle(rc.ellipse(255, 196, 170, 92, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 7, strokeWidth: 2.6 })));
      yazi(255, 192, 'KUVVET', 30, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(255, 220, 'itme / çekme', 20, { 'text-anchor': 'middle' });
      const kutu = (cx, cy, t, renk) => {
        const w = genislik(t, 21, { class: 'kalin' }) + 24;
        ekle(rc.rectangle(cx - w / 2, cy - 22, w, 38, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.2, strokeWidth: 2 })));
        yazi(cx, cy + 4, t, 21, { class: 'kalin', 'text-anchor': 'middle' });
      };
      const dallar = [
        [100, 92, 'hareket ettirir', MAVI], [410, 92, 'durdurur', MAVI],
        [78, 196, 'hızlandırır', R.yesil], [432, 196, 'yavaşlatır', R.yesil],
        [118, 304, 'yönünü değiştirir', R.pembe], [392, 304, 'şeklini değiştirir', R.pembe],
      ];
      for (const [x, y, t, renk] of dallar) {
        const dx = x < 255 ? 1 : -1;
        const bas = [255 - dx * 78 * (Math.abs(y - 196) < 10 ? 1 : 0.55), 196 + (y - 196) * 0.42];
        const uc = [x + dx * (Math.abs(y - 196) < 10 ? 62 : 30), y + (y < 196 ? 18 : y > 196 ? -24 : 0)];
        ok([bas, [(bas[0] + uc[0]) / 2, (bas[1] + uc[1]) / 2 + (y === 196 ? 0 : 4)], uc], S.m(R.mavi));
        kutu(x, y, t, renk);
      }
    } },
  ],
});
