// Defter notu: Fen/DefterNotlari/besinler1..3.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Besinler ve Besin İçerikleri',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kavramları tamamla', kutu: ['besin', 'karbonhidrat', 'yağ', 'protein', 'vitamin', 'mineral', 'su'], maddeler: [
      'Canlıların yaşamlarını sürdürebilmek için yediği ve içtiği maddelere [besin] denir.',
      'Vücudumuzun en çabuk kullandığı enerji kaynağı [karbonhidrat] lardır.',
      'Vücudumuza en fazla enerji veren ve bizi soğuktan koruyan besin içeriği [yağ] dır.',
      'Büyüme, gelişme ve yaraların onarılması için [protein] gerekir.',
      'Hastalıklara karşı direnç kazanmamıza en çok [vitamin] ler yardımcı olur.',
      'Kemiklerimizin ve dişlerimizin sağlam olması için kalsiyum gibi [mineral] lere ihtiyaç vardır.',
      'Vücudumuzun yaklaşık üçte ikisi [su] dan oluşur.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Besinleri en çok içerdikleri besin içeriğine göre grupla', kelimeler: ['ekmek', 'yumurta', 'zeytinyağı', 'portakal', 'makarna', 'balık', 'tereyağı', 'havuç', 'pirinç', 'mercimek', 'ceviz', 'domates'], gruplar: [
      { ad: 'Karbonhidrat', uyeler: ['ekmek', 'makarna', 'pirinç'] },
      { ad: 'Protein', uyeler: ['yumurta', 'balık', 'mercimek'] },
      { ad: 'Yağ', uyeler: ['zeytinyağı', 'tereyağı', 'ceviz'] },
      { ad: 'Vitamin', uyeler: ['portakal', 'havuç', 'domates'] },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Besin içeriklerini ızgarada bul ve işaretle.', boyut: 12, kelimeler: ['karbonhidrat', 'protein', 'vitamin', 'mineral', 'yağ', 'su', 'besin'] },
    { tur: 'eslestir', baslik: 'Görevleriyle eşleştir', ciftler: [
      ['Karbonhidrat', 'Hızlı enerji verir.'], ['Protein', 'Büyümeyi ve onarımı sağlar.'], ['Yağ', 'Enerji depolar, ısı kaybını önler.'], ['Vitamin', 'Hastalıklara karşı korur.'], ['Su', 'Vücut ısısını dengeler.'],
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Vitaminler en çok taze meyve ve sebzelerde bulunur.', true],
      ['Su bir besin değildir, bu yüzden az içmeliyiz.', false],
      ['Kuru baklagiller (nohut, fasulye) protein bakımından zengindir.', true],
    ] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Elif\'in Kahvaltısı', metin: [
      'Elif sabah aceleyle kalktı ve kahvaltı etmeden okula gitti. İkinci derste başı dönmeye, dikkati dağılmaya başladı. Öğretmeni Elif\'e kahvaltının neden önemli olduğunu anlattı: “Vücudumuz gece boyunca dinlenir. Sabah, güne başlamak için enerjiye ihtiyacı vardır.”',
      'Ertesi sabah Elif; peynir, yumurta, tam buğday ekmeği, domates, birkaç ceviz ve bir bardak süt ile kahvaltı yaptı. O gün derslerine çok daha dikkatle katıldı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Elif\'in başı neden dönmüş olabilir?', satir: 1, cevap: 'Kahvaltı etmediği için vücuduna yeterli enerji almamıştı.' },
      { s: 'Elif\'in ikinci kahvaltısındaki besinlerden birer örnek yaz: protein → ………, karbonhidrat → ………, yağ → ………', satir: 1, cevap: 'Protein: yumurta/peynir; karbonhidrat: ekmek; yağ: ceviz' },
      { s: 'Sence bu kahvaltıya hangi besini eklersek daha dengeli olur? Neden?', satir: 2, cevap: 'Örnek: Bir meyve (portakal) eklenirse vitamin de alınır.' },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Besin dedektifi', yonerge: 'Her besinin en çok içerdiği besin içeriğini ve bir görevini yaz.',
      basliklar: ['Besin', 'En çok içerdiği', 'Vücudumuzdaki görevi'], genislik: ['22%', '26%', '52%'],
      satirlar: [
        ['Bal', '[karbonhidrat]', '[enerji verir]'],
        ['Tavuk eti', '[protein]', '[büyümeyi ve onarımı sağlar]'],
        ['Fındık', '[yağ]', '[enerji verir, ısı kaybını önler]'],
        ['Mandalina', '[vitamin]', '[hastalıklardan korur]'],
        ['Yoğurt', '[protein, mineral]', '[kemik ve dişleri güçlendirir]'],
      ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Kış aylarında hastalanmamak için hangisini daha çok yemeliyiz?', sec: ['Cips', 'Meyve ve sebze', 'Şekerleme'], d: 1 },
      { s: 'Bir sporcunun kaslarını onarmak için en çok hangisine ihtiyacı vardır?', sec: ['Proteine', 'Suya', 'Şekere'], d: 0 },
      { s: 'Hangisi bir besin içeriği değildir?', sec: ['Vitamin', 'Mineral', 'Plastik'], d: 2 },
    ] },
    { tur: 'bosluk', baslik: 'Bilmeceler', maddeler: ['Beni portakalda, limonda bulursun; hastalıklara karşı seni korurum. Ben [vitamin] .', 'Ekmekte, makarnada, balda varım; koşarken sana enerji veririm. Ben [karbonhidrat] .', 'Yumurtada, balıkta, mercimekte varım; büyümene yardım ederim. Ben [protein] .'] },
    { tur: 'yaz', baslik: 'Sen olsan?', sorular: [
      { s: 'Su içmeyi unutan bir arkadaşına su içmenin önemini iki cümleyle anlat.', satir: 3, cevap: 'Örnek: Vücudumuzun çoğu sudur. Su, vücut ısısını dengeler ve sindirime yardım eder.' },
    ] },
  ]],
};
