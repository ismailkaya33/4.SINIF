// Türkçe — Gerçek ve hayalî ögeler + Kahramanları karşılaştırma (10–11. hafta).
// Kazanımlar (yıllık plandan, ana oturum verdi; kod sayfaya yazılmaz): T.4.3.26 gerçek ve hayalî ögeleri ayırt eder;
// T.4.3.27 kahramanların özelliklerini karşılaştırır. Etkinlik: Turkce/gercekmihayalmi.html (örnek kahramanlar oradan).
// Görsel 1 ChatGPT (resim yuvası; Türkçe etiketleri kod yazar), Görsel 2 kodla (Venn şeması).
// Karşılaştırma tablosu bilerek görsel yapılmadı ("gereksiz görsel yok": öğrenci tabloyu deftere kendisi çizer).
const ORTAK = ' Yatay 3:2. Tarz: temiz ve olgun eğitim illüstrasyonu, yumuşak düz renkler, ince koyu kontur, sade arka plan; 10–13 yaş için olgun görünüm; boyama sayfası gibi kalın çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın. Resimde hiçbir yazı, harf, sayı ya da konuşma balonu olmasın (yazıları sonradan ben ekleyeceğim). Alt kenarda yazı için sade boşluk bırak.';
const IKI_PANEL = ' Resim ortadan ince beyaz bir boşlukla iki eşit panele bölünsün.';

Sketchnote.defterNotu({
  baslik: 'GERÇEK, HAYALÎ VE KAHRAMANLAR',
  bloklar: [
    { konu: '1. Gerçek ve hayalî ögeler' },
    { madde: 'Metinde **gerçek hayatta olabilecek** kişi, varlık ve olaylara **gerçek öge** denir.' },
    { madde: 'Gerçek hayatta **olamayacak**, hayal gücüyle yazılmış kişi, varlık ve olaylara **hayalî öge** denir.' },
    { gorsel: 1, metin: [
      'Kendine sor: **Bu, gerçek hayatta olabilir mi?**',
      'Olabiliyorsa **gerçek**, olamıyorsa **hayalî** öge.',
      'Hayvanın fındık saklaması gerçek; **insan gibi konuşması** hayalîdir.',
    ] },
    { ornek: 'Gerçek: Kar yağdı.  •  Dede bahçeyi suladı.  •  Arılar bal yaptı.' },
    { ornek: 'Hayalî: Ağaç konuştu.  •  Halı uçtu.  •  Bulut şarkı söyledi.' },
    { dikkat: '**Şaşırtıcı** olan her şey hayal değildir: İki metreden uzun bir basketbolcu **gerçek** olabilir. Fabl ve masallarda da gerçek ögeler bulunur.' },

    { konu: '2. Kahramanları karşılaştırma' },
    { madde: 'Hikâyede olayları yaşayan kişi ya da hayvanlara **kahraman** denir.' },
    { madde: '**Dış görünüş:** gözle görülen özelliklerdir: boy, saç, göz rengi, giysi.' },
    { madde: '**Karakter:** kahramanın huyudur: cesur, aceleci, sabırlı, yardımsever. **Davranışlarından** anlaşılır.' },
    { ara: 'Karşılaştırma nasıl yapılır?' },
    { adim: [
      'İki kahramanın adını tablonun üstüne yaz.',
      'Satırlara **dış görünüş** ve **karakter** yaz; bulduğun özellikleri doğru kutuya yerleştir.',
      'İkisinde de olan özellikler **benzerlik**, yalnız birinde olanlar **farklılıktır**.',
      'Her özelliği metindeki bir cümleyle **kanıtla**.',
    ] },
    { ornek: 'Mert: uzun boylu (dış görünüş), aceleci (karakter)  •  Zeynep: gözlüklü, yardımsever' },
    { gorsel: 2, metin: [
      'Venn şemasında her daireye bir kahraman yazılır.',
      'İki dairenin **kesiştiği** yere **ortak** özellikler yazılır.',
      'Kanıtsız yargı olmaz: "Gözlüklü, o hâlde çalışkan." demek **yanlıştır**.',
    ] },
  ],

  gorseller: [
    // 1 — Aynı sincap: gerçek / hayalî (ChatGPT)
    { ad: 'Gerçek mi, hayalî mi?', resim: 'Baski/Turkce/resimler/gercek-hayal-sincap.png',
      istem: 'Bir görsel oluştur: Aynı kızıl sincabın iki hâli. Sol panel: sonbahar ormanında gerçekçi bir kızıl sincap, ön patileriyle toprağa bir fındık gömüyor, yerde sararmış yapraklar. Sağ panel: aynı sincap küçük bir koltukta oturmuş, yuvarlak gözlük takmış, patilerinde açık bir kitap okuyor, yanındaki küçük masada bir çay fincanı var; masal havası.' + IKI_PANEL + ORTAK,
      etiketler: [{ x: 128, y: 336, t: 'GERÇEK: fındık saklar', boy: 20, renk: '#2a9d8f' }, { x: 383, y: 336, t: 'HAYALÎ: kitap okur', boy: 20 }] },
    // 2 — Venn şeması (kodla)
    { ad: 'Kahramanları karşılaştırma', ciz(S) {
      const { rc, o, ekle, yazi } = S, R = Sketchnote.R;
      yazi(255, 36, 'Fındık ile Kara: Benzer ve Farklı', 25, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      ekle(rc.ellipse(180, 222, 310, 222, o({ stroke: S.m(R.kirmizi), strokeWidth: 2.6 })));
      ekle(rc.ellipse(330, 222, 310, 222, o({ stroke: S.m(R.mavi), strokeWidth: 2.6 })));
      yazi(92, 84, 'FINDIK', 23, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
      yazi(418, 84, 'KARA', 23, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.mavi) });
      yazi(255, 162, 'İKİSİ DE', 18, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.yesil) });
      ['kızıl tüylü', 'aceleci', 'dikkatsiz'].forEach((t, i) => yazi(104, 196 + i * 36, t, 21, { 'text-anchor': 'middle' }));
      ['siyah tüylü', 'dikkatli', 'paylaşımcı'].forEach((t, i) => yazi(406, 196 + i * 36, t, 21, { 'text-anchor': 'middle' }));
      ['kış için', 'yiyecek saklar', '', 'ormanda yaşar'].forEach((t, i) => yazi(255, 198 + i * 21, t, 17, { 'text-anchor': 'middle' }));
      yazi(255, 352, 'Ortada: iki kahramanda da olan özellikler', 18, { 'text-anchor': 'middle', fill: S.m(R.lacivert) });
    } },
  ],
});
