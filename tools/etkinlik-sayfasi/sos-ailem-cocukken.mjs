// Defter notu: Sosyal/DefterNotlari/ailemcocuk.jpg ("Ailem Çocukken") — kazanım kodu doğrulanmalı
export default {
  ders: 'Sosyal', baslik: 'Ailem Çocukken: Geçmişte ve Günümüzde Çocukluk',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['geleneksel çocuk oyunları', 'kültürümüzün', 'sokaklarda', 'kendileri', 'fabrikalarda'], maddeler: [
      'Geçmişten günümüze kuşaktan kuşağa aktarılan oyunlara [geleneksel çocuk oyunları] denir. Bu oyunlar [kültürümüzün] bir parçasıdır.',
      'Eskiden çocuklar zamanlarının büyük bölümünü [sokaklarda] , bahçelerde ve mahalle aralarında geçirirdi.',
      'Geçmişte çocuklar oyuncaklarını çoğunlukla [kendileri] yapardı.',
      'Günümüzde oyuncaklar çoğunlukla [fabrikalarda] üretilmektedir.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Geçmiş mi, günümüz mü?', kelimeler: ['bez bebek', 'uzaktan kumandalı araba', 'telden araba', 'tablet oyunu', 'topaç', 'robot oyuncak', 'tel tekerlek çevirme', 'konuşan bebek'], gruplar: [
      { ad: 'Geçmişte yaygındı', uyeler: ['bez bebek', 'telden araba', 'topaç', 'tel tekerlek çevirme'] },
      { ad: 'Günümüzde yaygın', uyeler: ['uzaktan kumandalı araba', 'tablet oyunu', 'robot oyuncak', 'konuşan bebek'] },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Geçmişte ve günümüzde', basliklar: ['', 'Geçmişte', 'Günümüzde'], genislik: ['26%', '37%', '37%'], satirlar: [
      ['**Oyunlar nerede oynanırdı / oynanıyor?**', '[sokakta, bahçede, mahallede]', '[evde, parkta, okulda, ekran başında]'],
      ['**Oyuncaklar nasıl yapılırdı / yapılıyor?**', '[tahta, tel, bez, taş, iple elde]', '[fabrikalarda, plastik ve pilli]'],
      ['**Hangi oyunlar yaygındı / yaygın?**', '[saklambaç, körebe, seksek, beştaş]', '[bilgisayar, tablet oyunları, yapım setleri]'],
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Geçmişte oynanan oyunların hepsi unutulmuştur.', false],
      ['Oyun oynarken paylaşmayı ve kurallara uymayı öğreniriz.', true],
      ['Teknolojinin gelişmesiyle çocukların oyunları değişmiştir.', true],
      ['Geçmişte çocuklar Karagöz ve Hacivat gösterilerini izlerdi.', true],
    ] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Aile büyüğümle röportaj', yonerge: 'Annene, babana ya da büyükanne-büyükbabana sor; cevapları yaz.', basliklar: ['Soru', 'Cevap'], genislik: ['45%', '55%'], satirlar: [
      ['Çocukken en sevdiğin oyun neydi?', ''], ['Oyuncaklarını nereden bulurdun?', ''], ['Okuldan sonra ne yapardın?', ''], ['En sevdiğin yiyecek ya da şeker neydi?', ''], ['Benim çocukluğumdan farklı olan ne?', ''],
    ], satirYuk: '12mm' },
    { tur: 'yaz', genis: true, baslik: 'Karşılaştır', sorular: [
      { s: 'Röportajdaki cevaplara göre büyüğünün çocukluğu ile senin çocukluğun arasındaki iki benzerlik ve iki farkı yaz.', satir: 4, cevap: 'Öğrencinin kendi cevabı; benzerlik (ör. ikimiz de saklambaç oynadık) ve fark (ör. o oyuncağını kendisi yapardı) belirtilmeli.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi geçmişte çocukların kendi yaptığı oyuncaklardan biridir?', sec: ['Robot', 'Tahta araba', 'Tablet'], d: 1 },
      { s: 'Geleneksel çocuk oyunlarını yaşatmanın yararı nedir?', sec: ['Kültürümüzün gelecek nesillere aktarılmasını sağlar', 'Teknolojiyi geliştirir', 'Oyuncak fiyatlarını düşürür'], d: 0, alt: true },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['topaç', 'seksek', 'beştaş', 'körebe', 'misket', 'tombik'] },
    { tur: 'yaz', baslik: 'Oyuncak tasarla', sorular: [
      { s: 'Evdeki atık malzemelerle (kutu, şişe kapağı, ip) yapabileceğin bir oyuncağı anlat.', satir: 5, cevap: 'Öğrencinin kendi cevabı.' },
    ] },
  ]],
};
