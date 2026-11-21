// Türkçe — Çıkarım yapma ve başlık bulma. Etkinlik: Turkce/cikarimbaslik.html (örnekler oradan: ıslak şemsiye, arılar).
// Kazanımlar (etkinlikteki kodlar; sayfaya yazılmaz, doğrulanmalı): T.4.3.28 okuduklarıyla ilgili çıkarım yapar;
// T.4.3.21 metnin içeriğine uygun başlık belirler.
// Görsel 1 ChatGPT (resim yuvası: ipucunu resimde görmek için sahne; Türkçe etiketleri kod yazar), Görsel 2 kodla (başlık hunisi).
const ORTAK = ' Yatay 3:2. Tarz: renkli karikatür tarzı (çocuk dergisindeki esprili karikatürler gibi); karakterlerin yüz ifadeleri abartılı ve canlı, başları ve elleri biraz büyük, pozları hareketli ve neşeli; canlı doygun renkler, yumuşak gölge, orta kalınlıkta koyu kontur, sade açık arka plan; 10–13 yaş için eğlenceli ama özenli. Boyama sayfası gibi renksiz olmasın; bilinen bir çizgi film karakterine ya da stüdyo tarzına benzemesin; kimseyle alay eden ya da korkutucu öğe olmasın. Resimde hiçbir yazı, harf, sayı ya da konuşma balonu olmasın (yazıları sonradan ben ekleyeceğim). Alt kenarda yazı için sade boşluk bırak.';

Sketchnote.defterNotu({
  baslik: 'ÇIKARIM YAPMA VE BAŞLIK BULMA',
  bloklar: [
    { konu: '1. Çıkarım yapma' },
    { madde: 'Metin her şeyi **açıkça** söylemez. Metindeki **ipuçlarını** kendi **bildiklerimizle** birleştirip bir sonuca varmaya **çıkarım yapmak** denir.' },
    { gorsel: 1, metin: [
      '**İpucu:** Şemsiyesinden sular damlıyordu.',
      '**Bildiğim:** Yağmurda şemsiye ıslanır.',
      '**Çıkarım:** Dışarıda yağmur yağıyor.',
      'İPUCU + BİLDİKLERİM = **ÇIKARIM**',
    ] },
    { adim: [
      'Metni dikkatle oku; ipucu olan sözcüklerin **altını çiz**.',
      'İpuçlarını **bildiklerinle** birleştir: "Bu bana ne anlatıyor?"',
      'Metnin **söylemediği** kadar ileri gitme; çıkarımın metne dayansın.',
    ] },
    { ornek: 'Mert kahvaltı etmedi, simide uzun uzun baktı.  →  Çıkarım: Mert çok acıkmıştı.' },
    { dikkat: '"Fırtına yüzünden okullar tatil oldu." demek ipucundan **fazlasıdır**: Metinde buna kanıt yoktur.' },

    { konu: '2. Başlık bulma' },
    { madde: 'Başlık, metnin **konusunu** ya da **ana fikrini** yansıtır.' },
    { madde: 'İyi bir başlık **kısa**, **ilgi çekici** olur ve metnin **tamamını** kapsar.' },
    { gorsel: 2, metin: [
      'Yalnız bir **ayrıntıyı** anlatan başlık **çok dar** kalır.',
      'Metinden çok daha büyük bir konuyu anlatan başlık **çok geniş** kalır.',
      'Uygun başlık, metindeki **bütün** cümleleri kapsar.',
    ] },
    { ara: 'Başlık nasıl bulunur?' },
    { adim: [
      'Konuyu bul: "Metin **kimi ya da neyi** anlatıyor?"',
      'Ana fikri bul: "Yazar bize **ne söylemek** istiyor?"',
      'Kısa ve ilgi çekici bir başlık yaz; **soru** biçiminde de olabilir.',
      'Kontrol et: Başlık bütün paragrafları kapsıyor mu?',
    ] },
    { ornek: 'Metin: musluğu kapatmak, damlatan musluğu onartmak  →  Başlık: "Suyu Nasıl Koruruz?"' },
  ],

  gorseller: [
    // 1 — İpucunu resimde gör (ChatGPT)
    { ad: 'İpucundan çıkarım', resim: 'Baski/Turkce/resimler/cikarim-semsiye.png',
      istem: 'Bir görsel oluştur: Bir evin giriş holünde, okuldan yeni gelmiş 10 yaşında bir kız çocuğu. Sol elindeki kapalı şemsiyeden yere su damlıyor ve yerde küçük bir su birikintisi var; montunun omuzları ve saçının uçları ıslak; kapının önünde ıslak ayakkabılar duruyor. Arkadaki pencereden gri bulutlu bir gökyüzü görünüyor ama yağmur damlaları çizilmesin. Kız resmin ortasında, şemsiye sol tarafta belirgin olsun; resmin üst kısmında yazı için sade boşluk kalsın.' + ORTAK,
      etiketler: [{ x: 190, y: 44, t: 'İpucu: ıslak şemsiye', boy: 20, renk: '#d62828' }, { x: 255, y: 336, t: 'Çıkarım: Dışarıda yağmur yağıyor.', boy: 21, renk: '#1d3557' }] },
    // 2 — Başlık hunisi: çok geniş / uygun / çok dar (kodla)
    { ad: 'Uygun başlık', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI;
      yazi(255, 34, 'Hangi başlık uygun?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      yazi(255, 64, 'Metin: Arılar çiçek tozu taşıyarak bitkilere ve bize yardım eder.', 16, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const kutu = (x1, x2, y, etiket, baslik, renk, dolu) => {
        ekle(rc.rectangle(x1, y, x2 - x1, 66, o(Object.assign({ strokeWidth: dolu ? 2.8 : 1.8 }, dolu ? { fill: S.r('#fff3b0'), fillStyle: 'solid' } : {}))));
        yazi((x1 + x2) / 2, y + 24, etiket, 18, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(renk) });
        yazi((x1 + x2) / 2, y + 54, baslik, 23, Object.assign({ 'text-anchor': 'middle' }, dolu ? { class: 'kalin' } : {}));
      };
      kutu(18, 492, 86, 'ÇOK GENİŞ (yanlış)', '"Hayvanlar"', R.kirmizi, 0);
      kutu(78, 432, 172, 'UYGUN (doğru)', '"Arıların Doğaya Yardımı"', R.yesil, 1);
      kutu(148, 362, 258, 'ÇOK DAR (yanlış)', '"Arılar Bal Yapar"', R.kirmizi, 0);
      yazi(255, 350, 'Başlık metnin tamamını kapsar.', 18, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
  ],
});
