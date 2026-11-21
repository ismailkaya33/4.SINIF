// Defter notu: Turkce/DefterNotlari/gercekmecaz.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Gerçek, Mecaz ve Terim Anlam',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kuralı tamamla', kutu: ['gerçek', 'mecaz', 'terim'], maddeler: [
      'Bir kelimenin akla gelen ilk anlamına [gerçek] anlam denir: “Soğuk su içtim.”',
      'Kelimenin gerçek anlamından uzaklaşarak kazandığı yeni anlama [mecaz] anlam denir: “Bana soğuk davrandı.”',
      'Bir bilim, sanat ya da meslek dalına özgü anlam taşıyan kelimelere [terim] denir: “Üçgenin üç kenarı vardır.”',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Altı çizili kelimenin anlamı', yonerge: 'Her cümlede altı çizili kelimenin gerçek (G), mecaz (M) ya da terim (T) anlamlı olduğunu yaz.', basliklar: ['Cümle', 'G / M / T'], genislik: ['85%', '15%'], ortala: false, satirlar: [
      ['Bu çanta çok __ağır__, taşıyamıyorum.', '[G]'], ['Arkadaşına __ağır__ sözler söyledi.', '[M]'],
      ['Çayına iki şeker koydu, çok __tatlı__ oldu.', '[G]'], ['Bebeğin __tatlı__ gülüşüne bayıldık.', '[M]'],
      ['Dikdörtgenin karşılıklı __kenar__ları eşittir.', '[T]'], ['Kapının önü __kırık__ camlarla doluydu.', '[G]'],
      ['Sözlerin beni çok __kırdı__.', '[M]'], ['Bitkiler __fotosentez__ ile besin üretir.', '[T]'],
      ['Ali sınıfın en __sıcak__kanlı çocuğudur.', '[M]'], ['Müzik dersinde yeni bir __nota__ öğrendik.', '[T]'],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Terimleri ders adlarına göre grupla', kelimeler: ['açı', 'kesir', 'kuvvet', 'besin', 'nota', 'ritim', 'cümle', 'özne', 'harita', 'kroki', 'mıknatıs', 'çarpım'], gruplar: [
      { ad: 'Matematik', uyeler: ['açı', 'kesir', 'çarpım'] }, { ad: 'Fen', uyeler: ['kuvvet', 'besin', 'mıknatıs'] }, { ad: 'Müzik', uyeler: ['nota', 'ritim'] }, { ad: 'Türkçe', uyeler: ['cümle', 'özne'] }, { ad: 'Sosyal', uyeler: ['harita', 'kroki'] },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Terimle cümle kur', sorular: [{ s: '“kesir” (matematik terimi) kelimesini bir cümlede kullan.', satir: 1, cevap: 'Örnek: Pastanın dörtte birini kesirle 1/4 diye gösterdik.' }, { s: '“besin” (fen terimi) kelimesini bir cümlede kullan.', satir: 1, cevap: 'Örnek: Süt, kemiklerimiz için önemli bir besindir.' }] },
  ], [
    { tur: 'yaz', genis: true, baslik: 'İki anlamda kullan', yonerge: 'Kelimeyi önce gerçek, sonra mecaz anlamıyla birer cümlede kullan.', sorular: [
      { s: '**sert** → Gerçek: ……………………………………… Mecaz: ………………………………………', satir: 1, cevap: 'Gerçek: Bu ceviz çok sert. Mecaz: Bana sert bir sesle konuştu.' },
      { s: '**keskin** → Gerçek: ……………………………………… Mecaz: ………………………………………', satir: 1, cevap: 'Gerçek: Keskin bıçakla dikkatli ol. Mecaz: Kartalın keskin gözleri var. / Keskin bir zekâsı var.' },
      { s: '**yumuşak** → Gerçek: ……………………………………… Mecaz: ………………………………………', satir: 1, cevap: 'Gerçek: Yastığım çok yumuşak. Mecaz: Öğretmenimiz yumuşak bir dille konuştu.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangi cümlede “acı” kelimesi mecaz anlamlıdır?', sec: ['Biber çok acıydı.', 'Acı bir haber aldık.', 'Acı kahve içmem.'], d: 1 },
      { s: 'Hangi cümlede terim anlamlı bir kelime vardır?', sec: ['Karesinin alanını hesapladık.', 'Bahçede kuşlar ötüyordu.', 'Kitabımı sıramda unuttum.'], d: 0 },
      { s: '“Gözü pek bir çocuktu.” cümlesinde anlatılmak istenen nedir?', sec: ['Gözleri büyüktür', 'Cesurdur', 'Gözlük takar'], d: 1 },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Soğuk Kış Günü', metin: [
      'Sabah dışarısı çok soğuktu. Mert kalın montunu giydi ve okula gitti. Sınıfa yeni gelen öğrenci önce herkese soğuk davrandı; kimseyle konuşmadı. Teneffüste Mert ona sıcak bir gülümsemeyle yaklaştı. Birlikte matematik dersindeki açı sorularını çözdüler. Akşam eve dönerken ikisinin de yüzü gülüyordu.',
    ] },
    { tur: 'tablo', baslik: 'Metinden bul', basliklar: ['Anlam', 'Metinden örnek'], satirlar: [['Gerçek', '[soğuktu, kalın montunu]'], ['Mecaz', '[soğuk davrandı, sıcak bir gülümseme, yüzü gülüyordu]'], ['Terim', '[açı]']] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Bir kelime farklı cümlelerde farklı anlamlar kazanabilir.', true],
      ['“Kesir” Türkçe dersine ait bir terimdir.', false],
      ['“Taş kalpli” sözünde “taş” mecaz anlamlıdır.', true],
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Mecaz anlamını eşleştir', ciftler: [['soğuk davranmak', 'ilgisiz, sevimsiz davranmak'], ['ağır söz', 'kırıcı söz'], ['tatlı dil', 'güzel ve kibar konuşma'], ['sıcak karşılamak', 'içtenlikle karşılamak'], ['ince düşünceli', 'başkalarının duygularını önemseyen']], fazla: ['çok zayıf'] },
  ]],
};
