// Türkçe — Bilgi kaynağı güvenilir mi? (11. hafta; T.4.3.36 Bilgi kaynaklarının güvenilirliğini sorgular — yıllık plandan;
// kazanım kodu sayfaya yazılmaz). 4 alt konu: kaynak türleri, 5 soruluk güven kontrol listesi, güvenilir/şüpheli
// ipuçları karşılaştırması, örnek. Görseller kodla çizildi (resim yuvası yok). Bütün site/kişi adları uydurmadır.
// Bilgi kontrolü: Ankara, 13 Ekim 1923'te başkent ilan edildi.
Sketchnote.defterNotu({
  baslik: 'BİLGİ KAYNAĞI GÜVENİLİR Mİ?',
  bloklar: [
    { konu: '1. Bilgi kaynakları' },
    { madde: 'Bir konuda bilgi edinmek için başvurduğumuz her şeye **bilgi kaynağı** denir.' },
    { madde: 'Kitaplar, **ansiklopediler**, sözlükler, atlaslar, gazete ve dergiler, internet sayfaları, **uzman kişiler**, **resmî kurumlar**, müze ve kütüphaneler bilgi kaynağıdır.' },
    { gorsel: 1, metin: [
      'Her kaynak **aynı derecede güvenilir değildir**. Bu yüzden bilgiyi kullanmadan önce **sorgularız**.',
      'Bilgiyi en iyi, konuyu **bilen** ya da o işten **sorumlu** olan kaynak verir.',
      'Örnek: Müzenin açılış saatini en iyi **müzenin kendi sayfası** bilir.',
    ] },

    { konu: '2. Güven kontrol listesi' },
    { madde: 'Bir bilgiye inanmadan ya da onu paylaşmadan önce şu **beş soruyu** sorarız:', birlikte: true },
    { adim: [
      '**Kim yazdı?** Yazarı ya da kurumu belli mi? Konunun uzmanı mı?',
      '**Ne zaman yazıldı?** Tarihi var mı? Bilgi güncel mi?',
      '**Kanıt var mı?** Bilginin nereden alındığını gösteriyor mu?',
      '**Başka kaynak da söylüyor mu?** En az iki güvenilir kaynakla karşılaştırırız.',
      '**Satış mı yapıyor?** Amacı bilgi vermek mi, bir şey satmak mı?',
    ] },
    { dikkat: 'Beğeni ve paylaşım sayısı ya da "ŞOK!", "%100 kesin!" gibi sözler bir bilgiyi doğru yapmaz.' },

    { konu: '3. Güvenilir mi, şüpheli mi?' },
    { gorsel: 2, metin: [
      'Görseldeki iki sayfayı **karşılaştır**: Güvenilir kaynağın ve şüpheli kaynağın **ipuçlarını** bul.',
      'Fotoğraflar bilgisayarla **değiştirilebilir**; tek başına kanıt değildir.',
      '**Reklam** ile bilgiyi ayırırız: Reklam, ürünü olduğundan iyi gösterir.',
      'Emin olmadığımız bilgiyi **paylaşmayız**.',
    ] },

    { konu: '4. Örnek: Zehra\'nın araştırması' },
    { madde: 'Zehra, "Ankara ne zaman başkent oldu?" sorusunu üç kaynakta araştırdı:', birlikte: true },
    { ornek: 'Ansiklopedi (yazar: uzmanlar, 2022): **13 Ekim 1923**' },
    { ornek: 'Resmî kurumun sayfası (geçen ay güncellendi): **13 Ekim 1923**' },
    { ornek: 'İsimsiz paylaşım (tarih yok): "1930\'da oldu, kesin bilgi!!!"' },
    { madde: 'Sonuç: İki güvenilir kaynak **aynı bilgiyi** veriyor. Zehra ödevine **13 Ekim 1923** yazar ve kullandığı **kaynakları** belirtir.' },
  ],

  gorseller: [
    // 1 — Kaynaklar: genellikle güvenilir / mutlaka kontrol et
    { ad: 'Kaynaklar ve güven', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      const ort = { 'text-anchor': 'middle' }, kalin = { class: 'kalin', 'text-anchor': 'middle' };
      // bant başlıkları
      ekle(rc.rectangle(130, 10, 250, 34, o({ fill: S.r('#d6e6fb'), fillStyle: 'solid', strokeWidth: 2 })));
      yazi(255, 35, 'Genellikle güvenilir', 22, Object.assign({ fill: S.m(R.lacivert) }, kalin));
      ekle(rc.line(20, 186, 490, 186, o({ strokeWidth: 1.6, strokeLineDash: [8, 6], roughness: 0.6 })));
      ekle(rc.rectangle(130, 196, 250, 34, o({ fill: S.r('#fbdada'), fillStyle: 'solid', strokeWidth: 2 })));
      yazi(255, 221, 'Mutlaka kontrol et!', 22, Object.assign({ fill: S.m(R.kirmizi) }, kalin));
      // Ansiklopedi
      for (let i = 0; i < 3; i++) ekle(rc.rectangle(52 + i * 6, 120 - i * 22, 82 - i * 12, 20, o({ fill: S.r([MAVI, SARI, R.yesil][i]), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2 })));
      yazi(95, 172, 'ansiklopedi', 20, ort);
      // Uzman kişi (önlüklü)
      ekle(rc.circle(255, 76, 30, o({ strokeWidth: 2.2 })));
      ekle(rc.path('M 228 140 Q 228 98 255 96 Q 282 98 282 140 Z', o({ fill: S.r('#ffffff'), fillStyle: 'solid', strokeWidth: 2.2 })));
      ekle(rc.path('M 246 100 Q 240 118 252 124', o({ stroke: S.m(MAVI) || '#111', strokeWidth: 2.4 })));
      ekle(rc.circle(254, 126, 8, o({ stroke: S.m(MAVI) || '#111', strokeWidth: 2 })));
      yazi(255, 172, 'uzman kişi', 20, ort);
      // Resmî kurum binası
      ekle(rc.polygon([[365, 82], [415, 56], [465, 82]], o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
      for (let i = 0; i < 4; i++) ekle(rc.rectangle(373 + i * 25, 88, 9, 44, o({ strokeWidth: 1.8 })));
      ekle(rc.rectangle(362, 134, 106, 10, o({ fill: S.r(SARI), fillStyle: 'solid', strokeWidth: 2 })));
      yazi(415, 172, 'resmî kurum', 20, ort);
      // İsimsiz paylaşım (telefon)
      ekle(rc.rectangle(70, 244, 52, 84, o({ strokeWidth: 2.4 })));
      ekle(rc.circle(96, 272, 26, o({ fill: S.r('#fbdada'), fillStyle: 'solid', strokeWidth: 1.8 })));
      yazi(96, 280, '?', 24, kalin);
      ekle(rc.line(80, 300, 112, 300, o({ strokeWidth: 1.6 }))); ekle(rc.line(80, 310, 106, 310, o({ strokeWidth: 1.6 })));
      yazi(96, 352, 'isimsiz paylaşım', 19, ort);
      // Reklam (megafon + indirim)
      ekle(rc.polygon([[222, 278], [262, 256], [262, 318], [222, 298]], o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 6, strokeWidth: 2.2 })));
      ekle(rc.rectangle(208, 278, 14, 20, o({ strokeWidth: 2 })));
      yazi(296, 282, '%50', 22, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(296, 306, 'AL!', 20, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(255, 352, 'reklam', 19, ort);
      // Söylenti (konuşma balonları)
      ekle(rc.ellipse(410, 268, 124, 44, o({ strokeWidth: 2 })));
      yazi(410, 275, 'Duydum ki...', 18, ort);
      ekle(rc.ellipse(428, 312, 104, 36, o({ fill: S.r('#d6e6fb'), fillStyle: 'solid', strokeWidth: 2 })));
      yazi(428, 318, 'Bence...', 18, ort);
      yazi(415, 352, 'söylenti', 19, ort);
    } },
    // 2 — Güvenilir sayfa ile şüpheli paylaşımın karşılaştırması
    { ad: 'Güvenilir mi, şüpheli mi?', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R, MAVI = Sketchnote.MAVI;
      const tik = (x, y) => ekle(rc.linearPath([[x, y], [x + 6, y + 7], [x + 18, y - 9]], o({ stroke: S.m(R.yesil), strokeWidth: 3, roughness: 0.6 })));
      const carpi = (x, y) => { ekle(rc.line(x, y - 8, x + 14, y + 6, o({ stroke: S.m(R.kirmizi), strokeWidth: 3, roughness: 0.5 }))); ekle(rc.line(x + 14, y - 8, x, y + 6, o({ stroke: S.m(R.kirmizi), strokeWidth: 3, roughness: 0.5 }))); };
      yazi(125, 30, 'GÜVENİLİR', 24, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.yesil) });
      yazi(385, 30, 'ŞÜPHELİ', 24, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      // Sol: ansiklopedi sayfası
      ekle(rc.rectangle(14, 44, 222, 262, o({ strokeWidth: 2.4 })));
      ekle(rc.rectangle(24, 54, 202, 30, o({ fill: S.r('#d6e6fb'), fillStyle: 'solid', strokeWidth: 1.6 })));
      yazi(125, 76, 'Ansiklopedi', 20, { class: 'kalin', 'text-anchor': 'middle' });
      const sol = ['Yazar: uzmanlar', 'Tarih: 2024', 'Kaynakları var', 'Sakin, açık dil', 'Satış yok'];
      sol.forEach((t, i) => { tik(26, 116 + i * 40); yazi(52, 122 + i * 40, t, 19, {}); });
      // Sağ: telefon paylaşımı
      ekle(rc.rectangle(284, 44, 202, 262, o({ strokeWidth: 2.4 })));
      ekle(rc.rectangle(294, 54, 182, 30, o({ fill: S.r('#fbdada'), fillStyle: 'solid', strokeWidth: 1.6 })));
      yazi(385, 76, 'ŞOK!!! İnanılmaz!', 19, { class: 'kalin', 'text-anchor': 'middle' });
      const sag = ['Yazar: ?', 'Tarih: yok', 'Kanıt: yok', 'Abartılı başlık', 'HEMEN SATIN AL!'];
      sag.forEach((t, i) => { carpi(296, 116 + i * 40); yazi(320, 122 + i * 40, t, 19, {}); });
      // Alt hatırlatma
      yazi(255, 340, 'Kim? • Ne zaman? • Kanıt? • Başka kaynak? • Satış?', 19, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
  ],
});
