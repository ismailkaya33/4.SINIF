// Defter notu: Fen/DefterNotlari/fen-alkol-sigara-1..2.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Sigara ve Alkolün Zararları',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kavramları tamamla', kutu: ['akciğerlere', 'pasif içicilik', 'bağımlılık', 'hayır', 'beyne', 'karaciğere'], maddeler: [
      'Sigara dumanı en çok [akciğerlere] zarar verir; nefes almayı zorlaştırır.',
      'Alkol [karaciğere] ve [beyne] zarar verir; dikkati ve dengeyi bozar.',
      'Sigara içilen ortamda bulunup dumanı solumaya [pasif içicilik] denir.',
      'Bir maddeyi bırakmak istediği hâlde bırakamamaya [bağımlılık] denir.',
      'Sigara ya da alkol teklif edildiğinde kararlı bir şekilde [hayır] demeliyiz.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Hangi organ, nasıl etkilenir?', basliklar: ['Organ', 'Sigaranın zararı', 'Alkolün zararı'], genislik: ['18%', '41%', '41%'], satirlar: [
      ['Akciğer', '[nefes darlığı, öksürük, hastalık]', '—'],
      ['Kalp ve damarlar', '[kalbi yorar, damarları daraltır]', '[kalbi yorar]'],
      ['Beyin', '[dikkati azaltır]', '[dikkati, dengeyi ve kararı bozar]'],
      ['Karaciğer', '—', '[karaciğeri hasta eder]'],
      ['Dişler ve cilt', '[dişleri sarartır, cildi yıpratır]', '—'],
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Sigara içmeyen biri de sigara dumanından zarar görebilir.', true],
      ['“Bir kereden bir şey olmaz.” düşüncesi bağımlılığın başlangıcı olabilir.', true],
      ['Alkol insanı daha dikkatli yapar.', false],
      ['Arabada ve kapalı ortamda sigara içilmesi çocuklar için zararsızdır.', false],
      ['Sağlıklı yaşam için zararlı maddelerden uzak durmalıyız.', true],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Sağlığı koruyan mı, bozan mı?', kelimeler: ['düzenli uyumak', 'sigara içmek', 'spor yapmak', 'alkol kullanmak', 'bol su içmek', 'dumanlı ortamda oturmak'], gruplar: [{ ad: 'Sağlığımı korur ✓', uyeler: ['düzenli uyumak', 'spor yapmak', 'bol su içmek'] }, { ad: 'Sağlığımı bozar ✗', uyeler: ['sigara içmek', 'alkol kullanmak', 'dumanlı ortamda oturmak'] }] },
    { tur: 'eslestir', genis: true, baslik: 'Durumu doğru davranışla eşleştir', ciftler: [
      ['Bir büyüğün yanımızda sigara yakıyor.', 'Kibarca ortamdan uzaklaşır ya da pencereyi açmasını rica ederiz.'],
      ['Bir arkadaşımız gizlice sigara denemeyi teklif ediyor.', '“Hayır!” der, ortamdan ayrılır, bir büyüğe anlatırız.'],
      ['Bir yakınımız sigarayı bırakmak istiyor.', 'Ona destek olur, ALO 171 hattını öneririz.'],
    ], fazla: ['“Bir kere denemekten zarar gelmez.” deriz.'] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Mert\'in Kararı', metin: [
      'Mert parkta top oynarken üst sınıftan iki çocuk yanına geldi. Ellerinde bir sigara paketi vardı. “Sen de dene, herkes deniyor. Denemeyen korkaktır!” dediler.',
      'Mert bir an durdu. Fen dersinde sigaranın akciğerlere verdiği zararı ve bağımlılığı öğrendiğini hatırladı. Gözlerinin içine bakarak “Hayır, istemiyorum. Ben sağlığımı seviyorum.” dedi ve topunu alıp arkadaşlarının yanına gitti. Eve gelince olanları annesine anlattı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Çocuklar Mert\'i ikna etmek için hangi sözü söyledi? Bu söz neden yanlıştır?', satir: 2, cevap: '“Herkes deniyor, denemeyen korkaktır.” Herkesin yapması bir şeyi doğru yapmaz; hayır demek cesaret ister.' },
      { s: 'Mert “hayır” derken hangi adımları uyguladı?', satir: 2, cevap: 'Kararlı ve net söyledi, göz teması kurdu, gerekçesini söyledi, ortamdan uzaklaştı, bir büyüğe anlattı.' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Pasif içiciliğe örnek hangisidir?', sec: ['Sigara içilen odada oturan çocuk', 'Bahçede koşan çocuk', 'Spor yapan çocuk'], d: 0, alt: true },
      { s: 'Bağımlılıktan korunmanın en iyi yolu hangisidir?', sec: ['Az miktarda denemek', 'Hiç başlamamak', 'Arkadaşlara uymak'], d: 1, alt: true },
    ] },
    { tur: 'bosluk', baslik: '“Hayır” demenin yolları', yonerge: 'Kısa “hayır” cümleleri yaz.', numarasiz: true, maddeler: [
      '1) “Hayır, teşekkürler; [sağlığımı seviyorum] .”',
      '2) “Hayır, [ben spor yapıyorum] .”',
      '3) “Hayır, [başka bir şey yapalım] .”',
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [['Sigara dumanı odadan hemen çıkıp gider, eşyalara sinmez.', false], ['Spor yapmak, sağlıklı yaşamın bir parçasıdır.', true], ['Bağımlılık yapan maddelerden uzak durmak bir cesaret örneğidir.', true]] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Kelimeleri ızgarada bul ve işaretle. Kelimeler sağa, aşağı ya da çapraz yazılmıştır.', boyut: 11, kelimeler: ['akciğer', 'bağımlılık', 'hayır', 'duman', 'sağlık', 'karaciğer', 'pasif'] },
    { tur: 'yaz', genis: true, baslik: 'Afiş sözü', sorular: [
      { s: 'Sigara ve alkolden uzak durmak için bir afiş sözü yaz. Sözünü bir arkadaşına okut.', satir: 2, cevap: 'Örnek: Temiz hava, sağlam beden; “Hayır” demek benden!' },
    ] },
  ]],
};
