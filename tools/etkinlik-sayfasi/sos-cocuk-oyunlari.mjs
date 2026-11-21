// Defter notu: Sosyal/DefterNotlari/cocukoyun.png — kazanım: SB.4.2.3 (tools/defter-kazanim.json)
export default {
  ders: 'Sosyal', baslik: 'Geleneksel Çocuk Oyunları',
  sayfalar: [[
    { tur: 'eslestir', genis: true, baslik: 'Oyunu tarifiyle eşleştir', ciftler: [
      ['Körebe', 'Gözü bağlı ebe, diğerlerini yakalamaya çalışır.'],
      ['Seksek', 'Yere çizilen karelere taş atılır, tek ayakla sekilir.'],
      ['Beştaş', 'Beş küçük taş havaya atılıp yerden toplanır.'],
      ['Mendil kapmaca', 'İki takım ortadaki mendili kapıp kaçmaya çalışır.'],
      ['Saklambaç', 'Ebe sayarken diğerleri saklanır, ebe onları arar.'],
      ['Halat çekme', 'İki takım bir ipi kendi tarafına çeker.'],
    ], fazla: ['Bilgisayarda yarış oyunu'] },
    { tur: 'siniflandir', genis: true, baslik: 'Oyunları grupla', kelimeler: ['saklambaç', 'beştaş', 'halat çekme', 'seksek', 'yakan top', 'misket', 'mendil kapmaca', 'ip atlama'], gruplar: [
      { ad: 'Takımla / kalabalık oynanır', uyeler: ['saklambaç', 'halat çekme', 'yakan top', 'mendil kapmaca'] },
      { ad: 'Az kişiyle de oynanır', uyeler: ['beştaş', 'seksek', 'misket', 'ip atlama'] },
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Oyun bize ne kazandırır?', kutu: ['paylaşmayı', 'kurallara', 'iş birliği', 'arkadaşlık', 'hareket'], maddeler: [
      'Oyun oynarken [paylaşmayı] ve yardımlaşmayı öğreniriz.',
      'Takım oyunlarında [iş birliği] yaparız.',
      'Oyunun [kurallara] uyarak oynanması gerekir.',
      'Oyunlar [arkadaşlık] bağlarımızı güçlendirir.',
      'Bahçede oynanan oyunlar bedenimizi [hareket] ettirir, sağlığımızı korur.',
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Geleneksel oyunlar için pahalı oyuncaklar gerekir.', false],
      ['Bazı geleneksel oyunlar bugün de oynanmaktadır.', true],
      ['Oyunlarda kaybetmeyi kabul etmek de önemlidir.', true],
      ['Geleneksel oyunlar bölgeden bölgeye farklı adlar alabilir.', true],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Benim oyunum', sorular: [{ s: 'En sevdiğin geleneksel oyun hangisi? Neden seviyorsun?', satir: 2, cevap: 'Öğrencinin kendi cevabı.' }] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Bir oyunun kurallarını yaz', yonerge: 'Sevdiğin bir geleneksel oyunu seç ve tabloyu doldur.', basliklar: ['', ''], genislik: ['30%', '70%'], satirlar: [
      ['**Oyunun adı**', ''], ['**Kaç kişiyle oynanır?**', ''], ['**Gerekli malzemeler**', ''], ['**Nasıl oynanır?**', ''], ['**Kim kazanır?**', ''],
    ], satirYuk: '11mm' },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Teneffüste Seksek', metin: [
      'Teneffüs zili çalınca Defne tebeşirle yere seksek çizdi. Kerem ilk kez oynayacaktı, kuralları bilmiyordu. Defne ona taşı kareye atmayı, çizgiye basmadan tek ayakla sekmeyi anlattı. Kerem ilk turda çizgiye bastı ve sırayı kaybetti. Önce üzüldü ama sonra gülerek tekrar sıraya girdi. Teneffüs bittiğinde sınıfın yarısı seksek oynuyordu.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Sekseğin kuralları nelerdir? Metinden bul.', satir: 1, cevap: 'Taş kareye atılır, çizgiye basmadan tek ayakla sekilir; çizgiye basan sırayı kaybeder.' },
      { s: 'Kerem kaybedince nasıl davrandı? Bu davranış doğru mu?', satir: 1, cevap: 'Önce üzüldü ama gülerek tekrar sıraya girdi; doğru, kaybetmeyi kabul etti.' },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['seksek', 'körebe', 'beştaş', 'misket', 'halat', 'mendil', 'ebe'] },
    { tur: 'yaz', baslik: 'Yeni oyun icat et', sorular: [
      { s: 'Arkadaşlarınla bahçede oynayabileceğin yeni bir oyun icat et. Adını ve iki kuralını yaz.', satir: 5, cevap: 'Öğrencinin kendi cevabı; oyunun adı ve en az iki kuralı yazılmalı.' },
    ] },
    { tur: 'dy', baslik: 'Oyun kuralları', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [['Oyunda hile yapmak kabul edilebilir.', false], ['Oyuna katılmak isteyen arkadaşımızı almalıyız.', true], ['Oyun bitince alanı toplamak hepimizin görevidir.', true]] },
  ]],
};
