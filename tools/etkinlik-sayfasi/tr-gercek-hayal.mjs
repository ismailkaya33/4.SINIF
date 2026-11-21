// Defter notu: Turkce/DefterNotlari/tr-gercek-hayal-1..2.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Gerçek ve Hayalî Ögeler, Kahramanlar',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['gerçek', 'hayalî', 'kahraman', 'dış görünüş', 'karakter'], maddeler: [
      'Gerçek hayatta olabilecek kişi, varlık ve olaylara [gerçek] öge denir.',
      'Gerçek hayatta olamayacak, hayal gücüyle yazılmış ögelere [hayalî] öge denir.',
      'Hikâyede olayları yaşayan kişi ya da hayvanlara [kahraman] denir.',
      'Kahramanın boyu, saçı, giysisi onun [dış görünüş] özelliğidir; cesur, sabırlı olması ise [karakter] özelliğidir.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Gerçek mi, hayalî mi?', kelimeler: ['Kar yağdı, okullar tatil oldu.', 'Ağaç, çocuğa bir sır fısıldadı.', 'Arılar çiçeklerden nektar topladı.', 'Halı kızı alıp bulutlara uçtu.', 'Dedem bahçeyi suladı.', 'Ay, gülümseyerek el salladı.', 'Kedi süt içti.', 'Tavşan saatine bakıp telaşlandı.'], gruplar: [
      { ad: 'Gerçek', uyeler: ['Kar yağdı, okullar tatil oldu.', 'Arılar çiçeklerden nektar topladı.', 'Dedem bahçeyi suladı.', 'Kedi süt içti.'] },
      { ad: 'Hayalî', uyeler: ['Ağaç, çocuğa bir sır fısıldadı.', 'Halı kızı alıp bulutlara uçtu.', 'Ay, gülümseyerek el salladı.', 'Tavşan saatine bakıp telaşlandı.'] },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Bilge Kaplumbağa', metin: [
      'Göl kenarında yaşayan yaşlı kaplumbağa Tosbi, her sabah güneşlenir, yosun yerdi. Bir gün aceleci tavşan Pıtırcık yanına geldi ve “Seninle yarışırım, hem de seni geçerim!” dedi. Tosbi gözlüğünü düzeltip sakin sakin “Peki, yarın yarışalım.” diye cevap verdi.',
      'Yarış günü Pıtırcık hızla koştu ama yolda bir ağacın altında uyuyakaldı. Tosbi yavaş ama kararlı adımlarla yürüdü ve bitiş çizgisine önce o vardı. Ormandaki bütün hayvanlar Tosbi\'yi alkışladı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [{ s: 'Hikâyenin kahramanları kimlerdir?', satir: 1, cevap: 'Kaplumbağa Tosbi ve tavşan Pıtırcık (ormandaki hayvanlar).' }, { s: 'Metindeki iki hayalî ögeyi yaz. Neden hayalî olduklarını açıkla.', satir: 2, cevap: 'Tavşanın konuşması, kaplumbağanın gözlük takması; gerçekte hayvanlar konuşmaz ve gözlük takmaz.' }, { s: 'Pıtırcık neden yarışı kaybetti?', satir: 1, cevap: 'Kendine çok güvendi, yolda uyudu.' }] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Metindeki ögeleri ayır', basliklar: ['Gerçek ögeler', 'Hayalî ögeler'], genislik: ['50%', '50%'], satirlar: [
      ['[Kaplumbağa göl kenarında yaşar.]', '[Tavşan konuşur, yarışmaya çağırır.]'], ['[Kaplumbağa güneşlenir, yosun yer.]', '[Kaplumbağa gözlük takar.]'], ['[Tavşan hızlı koşar.]', '[Hayvanlar alkışlar.]'],
    ] },
    { tur: 'tablo', genis: true, baslik: 'Kahramanları karşılaştır', basliklar: ['', 'Tosbi', 'Pıtırcık'], genislik: ['24%', '38%', '38%'], satirlar: [
      ['**Dış görünüş**', '[yaşlı, gözlüklü, kabuklu]', '[hızlı, uzun kulaklı]'], ['**Karakter**', '[sakin, sabırlı, kararlı]', '[aceleci, kendini beğenmiş]'], ['**Davranışından örnek**', '[sakin sakin cevap verdi]', '[“seni geçerim” dedi, uyudu]'],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi Pıtırcık\'ın bir karakter özelliğidir?', sec: ['Uzun kulaklı olması', 'Aceleci olması', 'Hızlı koşması'], d: 1 },
      { s: 'Metindeki hangi olay gerçek hayatta olabilir?', sec: ['Tavşanın ağacın altında uyuması', 'Kaplumbağanın gözlük takması', 'Hayvanların alkışlaması'], d: 0 },
      { s: 'Bu hikâyenin bize verdiği ders nedir?', sec: ['Hızlı olan her zaman kazanır.', 'Sabırlı ve kararlı olan başarır.', 'Yarışmak kötüdür.'], d: 1 },
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Şaşırtıcı olan her şey hayalîdir.', false],
      ['Masallarda ve fabllarda gerçek ögeler de bulunabilir.', true],
      ['Kahramanın karakteri davranışlarından anlaşılır.', true],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Hayal gücünü kullan', sorular: [
      { s: 'Sınıfındaki bir eşya bir gün konuşmaya başlasa ne derdi? İçinde bir gerçek, bir hayalî öge olan 3–4 cümle yaz.', satir: 4, cevap: 'Öğrencinin kendi cevabı; en az bir gerçek ve bir hayalî öge bulunmalı.' },
    ] },
  ]],
};
