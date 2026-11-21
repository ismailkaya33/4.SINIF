// Fen — Sigara ve alkolün zararları (2. Ünite Besinlerimiz, 11. hafta). Kazanım kodu F.4.2.1.5 — yıllık plandan; sayfaya yazılmaz.
// HASSAS KONU (öğretmenin onayıyla): bilgi + "Hayır diyebilirim". Aile işaret edilmez/suçlanmaz; korkutucu görsel,
// uydurma sayısal istatistik, marka/logo yok. Yeşilay adı yalnız yazıyla geçer.
// Görsel 1–2 kodla (vücut şeması: sigara → akciğer, kalp-damar, diş-ağız-ten; alkol → beyin, karaciğer),
// 3–4 ChatGPT (resim yuvası; Baski/Fen/resimler/, GitHub'a gitmez).
// Bilgi kontrolü: 18 yaş altına tütün ve alkol satışı Türkiye'de yasaktır; nargile tütün içerir; elektronik sigaraların
// çoğu nikotin içerir; pencere açmak dumanı yok etmez (eşyaya/giysiye siner).
const ORTAK = ' Yatay 3:2. Tarz: renkli karikatür tarzı (çocuk dergisindeki esprili karikatürler gibi); karakterlerin yüz ifadeleri abartılı ve canlı, başları ve elleri biraz büyük, pozları hareketli ve neşeli; canlı doygun renkler, yumuşak gölge, orta kalınlıkta koyu kontur, sade açık arka plan; 10–13 yaş için eğlenceli ama özenli. Boyama sayfası gibi renksiz olmasın; bilinen bir çizgi film karakterine ya da stüdyo tarzına benzemesin; kimseyle alay eden ya da korkutucu öğe olmasın. Resimde hiçbir yazı, harf, sayı, logo ya da marka olmasın. Alt kenarda yazı için sade boşluk bırak.';

// Sade vücut şeması (510 × 360 alanın sol yarısı). vurgu: renklendirilecek organlar; ötekiler soluk kesik çizgi.
function govde(S, vurgu) {
  const { rc, o, ekle } = S, R = Sketchnote.R;
  const ten = o({ strokeWidth: 2 });
  ekle(rc.line(100, 152, 70, 272, o({ strokeWidth: 2.2 }))); ekle(rc.line(190, 152, 220, 272, o({ strokeWidth: 2.2 })));
  ekle(rc.rectangle(112, 294, 26, 56, ten)); ekle(rc.rectangle(152, 294, 26, 56, ten));
  ekle(rc.path('M 96 146 Q 145 134 194 146 L 200 292 Q 145 304 90 292 Z', o({ strokeWidth: 2.2 })));
  ekle(rc.line(145, 130, 145, 146, ten));
  ekle(rc.circle(145, 94, 72, ten));
  const org = (ad, ciz, renk) => {
    const acik = vurgu.includes(ad);
    return ciz(acik ? o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 5, strokeWidth: 2.4 })
                    : o({ stroke: '#b5b5b5', strokeWidth: 1.4, strokeLineDash: [5, 4] }));
  };
  org('beyin', p => ekle(rc.ellipse(145, 80, 50, 26, p)), R.pembe);
  org('agiz', p => ekle(rc.rectangle(133, 106, 24, 10, p)), R.kirmizi);
  ekle(rc.line(145, 140, 145, 160, o({ strokeWidth: 1.6 })));
  org('akciger', p => { ekle(rc.ellipse(125, 190, 34, 66, p)); ekle(rc.ellipse(166, 190, 34, 66, p)); }, R.mavi);
  org('kalp', p => ekle(rc.path('M 160 248 C 140 234 136 216 148 210 C 155 206 160 212 160 216 C 160 212 165 206 172 210 C 184 216 180 234 160 248 Z', p)), R.kirmizi);
  org('karaciger', p => ekle(rc.path('M 108 250 Q 140 240 176 248 Q 166 270 128 270 Q 108 266 108 250 Z', p)), '#a0522d');
}
// Sağdaki açıklama kutusu: başlık + 1–2 satır; ok organı gösterir.
function kutu(S, y, h, baslik, satirlar, hedef, renk) {
  const { rc, o, ekle, yazi, ok, genislik } = S, R = Sketchnote.R;
  ekle(rc.rectangle(262, y, 240, h, o({ strokeWidth: 1.8 })));
  S.fosfor(276, y + 9, 212, 26, S.r(renk));
  const sig = (t, boy, ek) => { while (boy > 13 && genislik(t, boy, ek) > 222) boy--; return boy; };
  yazi(382, y + 28, baslik, sig(baslik, 21, { class: 'kalin' }), { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
  satirlar.forEach((t, i) => yazi(382, y + 54 + i * 22, t, sig(t, 18), { 'text-anchor': 'middle', fill: S.m(R.lacivert) }));
  ok([[260, y + h / 2], [(260 + hedef[0]) / 2, (y + h / 2 + hedef[1]) / 2 + 6], hedef], S.m(R.mavi));
}

Sketchnote.defterNotu({
  baslik: 'SİGARA VE ALKOLÜN ZARARLARI',
  bloklar: [
    { konu: '1. Sigara, alkol ve vücudumuz' },
    { madde: '**Sigara** tütünden yapılır. Dumanında **nikotin** ve birçok zararlı madde vardır.' },
    { madde: 'Duman ağızdan girer, **akciğerlere** iner. Zararlı maddeler kana karışıp bütün vücuda yayılır.' },
    { madde: '**Alkol**, alkollü içeceklerde bulunur. Vücutta en çok **beyni** ve **karaciğeri** etkiler.' },
    { gorseller: [1, 2] },

    { konu: '2. Pasif içicilik' },
    { gorsel: 3, metin: [
      'Sigara içmediği hâlde dumanlı ortamda bulunan kişi de dumanı solur ve zarar görür. Buna **pasif içicilik** denir.',
      'Çocukların akciğerleri hâlâ geliştiği için duman onlara **daha çok** zarar verir.',
      'Pencere açmak dumanı yok etmez; duman eşyalara ve giysilere **siner**.' ] },
    { dikkat: 'Çevrende sigara içen biri olabilir. Bu **senin suçun değil**; o kişi de kötü biri değil. Dumandan uzak durabilirsin; güvendiğin bir yetişkinle konuşabilirsin.' },

    { konu: '3. Bağımlılık nedir?' },
    { madde: 'Zararlı olduğunu bildiği hâlde bir şeyi bırakmakta çok zorlanmaya **bağımlılık** denir.' },
    { madde: 'Sigaradaki **nikotin** ve **alkol** bağımlılık yapar. Bağımlılık çoğu zaman "bir tane" ile başlar.' },
    { madde: '**Nargile** de tütün içerir; **elektronik sigaraların** çoğunda nikotin vardır. Hiçbiri zararsız değildir.' },
    { dikkat: 'En kolay yol **hiç başlamamaktır**. Ülkemizde 18 yaşından küçüklere sigara ve alkol satmak yasaktır.' },

    { konu: '4. Hayır diyebilirim!', birlikte: true },
    { adim: [
      'Kibar ve kararlı ol: **"Hayır, teşekkürler."**',
      'Israr edilirse **ortamdan uzaklaş**.',
      'Öğretmenine, rehber öğretmenine ya da güvendiğin bir büyüğe **anlat**.' ] },
    { madde: 'Sağlıklı seçimler: **spor**, **oyun**, **temiz hava**, bol **su**, **meyve ve sebze**, yeterli **uyku**.' },
    { madde: '**Yeşilay**, ülkemizde bağımlılıklara karşı çalışan bir kuruluştur.' },
  ],

  gorseller: [
    // 1 — Sigaranın etkilediği organlar (kodla)
    { ad: 'Sigaranın etkilediği organlar', ciz(S) {
      const R = Sketchnote.R;
      S.yazi(255, 30, 'Sigara nerelere zarar verir?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      govde(S, ['agiz', 'akciger', 'kalp']);
      kutu(S, 48, 88, 'DİŞ, AĞIZ, TEN', ['sararmış diş, ağız kokusu', 'yıpranmış cilt'], [160, 112], Sketchnote.SARI);
      kutu(S, 150, 88, 'AKCİĞERLER', ['öksürük', 'nefes darlığı, çabuk yorulma'], [186, 176], Sketchnote.MAVI);
      kutu(S, 252, 88, 'KALP VE DAMARLAR', ['kalp yorulur', 'damarlar zarar görür'], [178, 232], Sketchnote.SARI);
    } },
    // 2 — Alkolün etkilediği organlar (kodla)
    { ad: 'Alkolün etkilediği organlar', ciz(S) {
      const R = Sketchnote.R;
      S.yazi(255, 30, 'Alkol nerelere zarar verir?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      govde(S, ['beyin', 'karaciger']);
      kutu(S, 52, 110, 'BEYİN', ['dikkat ve karar bozulur', 'denge bozulur,', 'tepkiler yavaşlar'], [172, 82], Sketchnote.MAVI);
      kutu(S, 214, 110, 'KARACİĞER', ['alkolü temizlemeye', 'çalışırken yorulur', 've zarar görür'], [178, 256], Sketchnote.SARI);
    } },
    { ad: 'Dumanlı oda – temiz hava', resim: 'Baski/Fen/resimler/alkol-sigara-3-pasif.png',
      istem: 'Bir görsel oluştur: İki eşit panel yan yana. Sol panelde kapalı bir oturma odasında koltukta oturan 10 yaşlarında bir çocuğun çevresini havada süzülen açık gri duman bulutları sarmış; çocuk elini burnunun önüne götürmüş, rahatsız ama sakin görünüyor. Sağ panelde aynı çocuk güneşli bir bahçede ağaçların arasında derin ve ferah nefes alıyor, gökyüzü açık mavi. Hiçbir panelde sigara, sigara içen kişi, hastane, hastalık ya da korkutucu bir öğe olmasın.' + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'Dumanlı ortam', boy: 21, renk: '#d62828' }, { x: 383, y: 336, t: 'Temiz hava', boy: 21, renk: '#2a9d8f' }] },
  ],
});
