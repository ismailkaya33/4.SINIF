// Defter notu: Fen/DefterNotlari/dengelibeslenme.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Dengeli Beslenme',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Tanımı tamamla', kutu: ['dengeli', 'yeterli', 'kahvaltı', 'çeşitli', 'su', 'abur cubur'], maddeler: [
      'Vücudumuzun ihtiyacı olan besin içeriklerini [yeterli] miktarda ve [dengeli] şekilde almaya dengeli beslenme denir.',
      'Her öğünde [çeşitli] besin gruplarından yemeliyiz.',
      'Güne enerjik başlamak için [kahvaltı] yı atlamamalıyız.',
      'Gün boyunca bol [su] içmeliyiz.',
      'Cips, gazlı içecek ve şekerleme gibi [abur cubur] ları az tüketmeliyiz.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Besin gruplarına yerleştir', kelimeler: ['süt', 'ekmek', 'elma', 'yumurta', 'yoğurt', 'bulgur', 'ıspanak', 'nohut', 'peynir', 'makarna', 'portakal', 'tavuk'], gruplar: [
      { ad: 'Süt grubu', uyeler: ['süt', 'yoğurt', 'peynir'] },
      { ad: 'Et-yumurta-baklagil', uyeler: ['yumurta', 'nohut', 'tavuk'] },
      { ad: 'Sebze-meyve', uyeler: ['elma', 'ıspanak', 'portakal'] },
      { ad: 'Tahıl grubu', uyeler: ['ekmek', 'bulgur', 'makarna'] },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Tabağımı değerlendiriyorum', yonerge: 'Her öğündeki eksik besin grubunu bul ve tabağa eklenebilecek bir besin öner.',
      basliklar: ['Öğün', 'Tabakta olanlar', 'Eksik grup', 'Önerim'], genislik: ['14%', '36%', '25%', '25%'],
      satirlar: [
        ['Kahvaltı', 'peynir, yumurta, ekmek, süt', '[sebze-meyve]', '[domates, salatalık]'],
        ['Öğle', 'pilav, makarna, ekmek', '[et-yumurta-baklagil, sebze]', '[kuru fasulye, salata]'],
        ['Akşam', 'mercimek çorbası, köfte, salata', '[süt grubu]', '[yoğurt, ayran]'],
      ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Yalnız sevdiğimiz besinleri yemek dengeli beslenmedir.', false],
      ['Fazla yemek de az yemek de sağlığımıza zarar verir.', true],
      ['Kahvaltı yapmayan öğrencinin dikkati dağılabilir.', true],
      ['Gazlı içecekler suyun yerini tutar.', false],
      ['Yemekleri yavaş ve iyice çiğneyerek yemeliyiz.', true],
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi sağlıklı bir ara öğündür?', sec: ['Şekerleme', 'Bir avuç fındık ve elma', 'Gazlı içecek'], d: 1, alt: true },
      { s: 'Dengeli beslenmenin yararı hangisidir?', sec: ['Sık hastalanırız', 'Büyür ve gelişiriz', 'Çabuk yoruluruz'], d: 1, alt: true },
    ] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Can\'ın Bir Günü', metin: [
      'Can sabah kahvaltı yapmadı. Teneffüste kantinden cips ve gazlı içecek aldı. Öğle yemeğinde yalnız patates kızartması yedi, salatayı tabağının kenarına itti. Akşam ise çok acıktığı için bir oturuşta iki tabak makarna yedi, sonra hemen yattı.',
      'Can son günlerde derslerde yorgun hissediyor, beden eğitimi dersinde çabuk soluklanıyor.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Can\'a yardım et', sorular: [
      { s: 'Can\'ın yaptığı üç beslenme hatasını yaz.', satir: 2, cevap: 'Kahvaltı yapmadı; abur cubur tüketti; sebze yemedi; akşam çok yiyip hemen yattı.' },
      { s: 'Can\'ın yorgun hissetmesinin nedeni ne olabilir?', satir: 1, cevap: 'Dengesiz beslenmesi; yeterli besin içeriği alamaması.' },
      { s: 'Can için dengeli bir günlük menü hazırla.', satir: 0 },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Can\'ın yeni menüsü', basliklar: ['Kahvaltı', 'Ara öğün', 'Öğle', 'Akşam'], genislik: ['25%', '25%', '25%', '25%'], satirYuk: '22mm', satirlar: [
      ['?Örnek: peynir, yumurta, ekmek, domates, süt', '?meyve, ceviz', '?kuru fasulye, pilav, salata', '?sebze yemeği, yoğurt, ekmek'],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Kelimeleri bul ve işaretle.', boyut: 10, kelimeler: ['süt', 'tahıl', 'sebze', 'meyve', 'kahvaltı', 'su', 'dengeli', 'öğün'] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [['Öğün atlamak kilo vermenin sağlıklı yoludur.', false], ['Meyve ve sebzeleri her gün yemeliyiz.', true], ['Ambalajlı yiyecekleri alırken içindekiler kısmını okuyabiliriz.', true], ['Yemekten hemen sonra yatmak sindirimi kolaylaştırır.', false]] },
    { tur: 'yaz', baslik: 'Kantin önerisi', sorular: [{ s: 'Okul kantini için sağlıklı üç ürün öner.', satir: 2, cevap: 'Örnek: ayran, meyve, tam buğday simit, peynirli sandviç' }] },
    { tur: 'yaz', baslik: 'Kendini değerlendir', sorular: [
      { s: 'Dün ne yediğini düşün. Hangi besin grubundan az yedin? Bunu nasıl düzeltirsin?', satir: 3, cevap: 'Öğrencinin kendi cevabı.' },
    ] },
  ]],
};
