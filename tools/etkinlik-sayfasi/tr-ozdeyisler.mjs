// Defter notu: Turkce/DefterNotlari/ozdeyisler.png — kazanım kodu doğrulanmalı (yıllık planda bulunamadı)
export default {
  ders: 'Turkce', baslik: 'Özdeyişler',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Özdeyiş nedir?', kutu: ['özdeyiş', 'bellidir', 'belli değildir', 'düşündürür', 'vecize'], maddeler: [
      'Ünlü kişilerin derin anlamlı, kısa ve etkili sözlerine [özdeyiş] denir. Özdeyişlere [vecize] de denir.',
      'Özdeyişi söyleyen kişi [bellidir] ; atasözünü söyleyen kişi ise [belli değildir] .',
      'Özdeyişler okuyanı [düşündürür] , yol gösterir.',
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Özdeyişi söyleyeniyle eşleştir', ciftler: [
      ['“Hayatta en hakiki mürşit ilimdir.”', 'Mustafa Kemal Atatürk'],
      ['“Yaratılanı severiz Yaratan\'dan ötürü.”', 'Yunus Emre'],
      ['“Okunacak en büyük kitap insandır.”', 'Hacı Bektaş-ı Veli'],
      ['“Ya olduğun gibi görün, ya göründüğün gibi ol.”', 'Mevlânâ Celâleddin-i Rûmî'],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Özdeyiş mi, atasözü mü?', kelimeler: ['Damlaya damlaya göl olur.', '“Egemenlik kayıtsız şartsız milletindir.” (Atatürk)', 'Ağaç yaş iken eğilir.', '“İncinsen de incitme.” (Hacı Bektaş-ı Veli)', 'Bugünün işini yarına bırakma.', '“Gelin tanış olalım, işi kolay kılalım.” (Yunus Emre)'], gruplar: [
      { ad: 'Özdeyiş (söyleyeni belli)', uyeler: ['“Egemenlik kayıtsız şartsız milletindir.” (Atatürk)', '“İncinsen de incitme.” (Hacı Bektaş-ı Veli)', '“Gelin tanış olalım, işi kolay kılalım.” (Yunus Emre)'] },
      { ad: 'Atasözü (söyleyeni belli değil)', uyeler: ['Damlaya damlaya göl olur.', 'Ağaç yaş iken eğilir.', 'Bugünün işini yarına bırakma.'] },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Özdeyişlere vecize de denir.', true],
      ['Bütün özdeyişleri Atatürk söylemiştir.', false],
      ['Özdeyişler tırnak içinde, söyleyenin adıyla yazılır.', true],
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Özdeyişi tamamla', maddeler: ['“Hayatta en hakiki mürşit [ilimdir].” (Atatürk)', '“Yurtta sulh, [cihanda] sulh.” (Atatürk)', '“Okunacak en büyük kitap [insandır].” (Hacı Bektaş-ı Veli)', '“Yaratılanı severiz [Yaratan]\'dan ötürü.” (Yunus Emre)'] },
    { tur: 'yaz', genis: true, baslik: 'Düşün ve yaz', sorular: [{ s: 'Atatürk\'ün “Öğretmenler! Yeni nesil sizin eseriniz olacaktır.” sözü öğretmenlere hangi görevi veriyor?', satir: 2, cevap: 'Yeni yetişen çocukları iyi yetiştirme görevi.' }] },
  ], [
    { tur: 'yaz', genis: true, baslik: 'Ne anlatıyor?', yonerge: 'Özdeyişin ne anlatmak istediğini kendi cümlelerinle yaz.', sorular: [
      { s: '“Hayatta en hakiki mürşit ilimdir.” (Atatürk)', satir: 2, cevap: 'Hayatta bize en doğru yolu gösteren bilimdir.' },
      { s: '“İncinsen de incitme.” (Hacı Bektaş-ı Veli)', satir: 2, cevap: 'Biri seni üzse bile sen kimseyi üzme.' },
      { s: '“Gelin tanış olalım, işi kolay kılalım.” (Yunus Emre)', satir: 2, cevap: 'Birbirimizi tanırsak iş birliği yapar, işleri kolaylaştırırız.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Özdeyişi atasözünden ayıran özellik hangisidir?', sec: ['Kısa olması', 'Söyleyeninin belli olması', 'Öğüt vermesi'], d: 1 },
      { s: '“Yurtta sulh, cihanda sulh.” sözü hangi değeri öne çıkarır?', sec: ['Barış', 'Tutumluluk', 'Temizlik'], d: 0 },
      { s: 'Hangisi bir özdeyişin özelliği değildir?', sec: ['Düşündürür', 'Kısa ve etkilidir', 'Söyleyeni bilinmez'], d: 2 },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['vecize', 'ilim', 'barış', 'sevgi', 'insan', 'kitap'] },
    { tur: 'yaz', genis: true, baslik: 'Kendi özdeyişin', sorular: [
      { s: 'Okul, arkadaşlık ya da doğa hakkında kendi özdeyişini yaz. Altına adını yaz.', satir: 2, cevap: 'Örnek: “Paylaşılan sevinç çoğalır.” — Öğrencinin adı' },
      { s: 'En sevdiğin özdeyişi sınıfın panosu için güzel yazıyla yaz ve nedenini açıkla.', satir: 2, cevap: 'Öğrencinin kendi cevabı.' },
    ] },
  ]],
};
