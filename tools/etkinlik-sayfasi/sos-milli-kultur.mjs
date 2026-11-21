// Defter notu: Sosyal/DefterNotlari/millikultur.png — kazanım: SB.4.2.2 (tools/defter-kazanim.json)
export default {
  ders: 'Sosyal', baslik: 'Millî Kültür Ögelerimiz',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kavramları tamamla', kutu: ['kültür', 'millî kültür', 'korumak', 'birlik ve beraberliğini'], maddeler: [
      'Bir toplumun tarih boyunca ürettiği, nesilden nesile aktardığı maddi ve manevi özelliklerin tümüne [kültür] denir.',
      'Bir millete ait olan, o milleti diğerlerinden ayıran yaşam biçimine [millî kültür] denir.',
      'Kültürel ögelerimiz milletimizin [birlik ve beraberliğini] güçlendirir.',
      'Kültürümüzü tanımak, [korumak] ve gelecek nesillere aktarmak hepimizin görevidir.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Kültür ögelerini grupla', kelimeler: ['mantı', 'zeybek', 'çini', 'yağlı güreş', 'Keloğlan', 'tarhana', 'horon', 'ebru', 'cirit', 'Dede Korkut', 'baklava', 'halay'], gruplar: [
      { ad: 'Yemek', uyeler: ['mantı', 'tarhana', 'baklava'] }, { ad: 'Halk oyunu', uyeler: ['zeybek', 'horon', 'halay'] }, { ad: 'El sanatı', uyeler: ['çini', 'ebru'] }, { ad: 'Spor', uyeler: ['yağlı güreş', 'cirit'] }, { ad: 'Masal-destan', uyeler: ['Keloğlan', 'Dede Korkut'] },
    ] },
    { tur: 'eslestir', baslik: 'Halk oyununu yöresiyle eşleştir', ciftler: [
      ['Horon', 'Karadeniz'], ['Zeybek', 'Ege'], ['Halay', 'Güneydoğu Anadolu'], ['Bar', 'Erzurum'],
    ], fazla: ['Trakya'] },
    { tur: 'yaz', baslik: 'Gelenek ve göreneklerimiz', sorular: [
      { s: 'Bayramlarda ailende yapılan iki geleneği yaz.', satir: 2, cevap: 'Örnek: Büyüklerin elini öpmek, misafire şeker/lokum ikram etmek, akraba ziyareti.' },
      { s: 'Asker uğurlama ya da kına gecesi gibi bir geleneği bir cümleyle anlat.', satir: 2, cevap: 'Örnek: Asker uğurlamada davul zurna çalınır, asker adayı omuzlarda taşınır.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi geleneksel bir Türk sporudur?', sec: ['Cirit', 'Basketbol', 'Tenis'], d: 0 }, { s: 'Keloğlan ve Nasreddin Hoca hangi kültür ögesine örnektir?', sec: ['Mimari eser', 'Masal ve fıkra', 'El sanatı'], d: 1 }, { s: 'Hangisi kültürümüzü korumak için yapılabilecek bir davranış değildir?', sec: ['Büyüklerimizden eski oyunları öğrenmek', 'Tarihî eserlere zarar vermek', 'Yöresel yemekleri tanımak'], d: 1 }] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Mimari eserlerimiz ve el sanatlarımız', basliklar: ['Örnek', 'Hangi kültür ögesi?'], genislik: ['50%', '50%'], satirlar: [
      ['Safranbolu evleri', '[mimari eser]'], ['Halı ve kilim dokumacılığı', '[el sanatı]'], ['Tarihi köprüler ve hanlar', '[mimari eser]'], ['Bakırcılık, çömlekçilik', '[el sanatı]'], ['Karagöz ve Hacivat', '[geleneksel gösteri sanatı]'], ['Nasreddin Hoca fıkraları', '[halk edebiyatı (fıkra)]'],
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Çini Atölyesi', metin: [
      'Okul gezisinde bir çini atölyesine gittik. Usta, toprağı önce şekillendirdi, sonra fırında pişirdi. Pişen karoların üzerine lale ve karanfil motiflerini fırçayla tek tek çizdi. Bize, çininin camilerde, türbelerde ve saraylarda yüzyıllardır süsleme için kullanıldığını anlattı. “Bu sanatı öğrenecek gençler olmazsa çini unutulur.” dedi.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Çini nasıl yapılır? Kısaca sırala.', satir: 1, cevap: 'Toprak şekillendirilir, fırında pişirilir, üzerine motifler çizilir.' },
      { s: 'Ustanın son sözü bize hangi sorumluluğu hatırlatıyor?', satir: 2, cevap: 'Kültürümüzü yaşatmak, öğrenip gelecek nesillere aktarmak.' },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Kültür ögeleri yalnız eski zamanlarda vardı, bugün yoktur.', false],
      ['Yöresel yemekler millî kültürümüzün bir parçasıdır.', true],
      ['Ebru, kâğıda su üzerinde desen aktarma sanatıdır.', true],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['kültür', 'çini', 'ebru', 'halay', 'kilim', 'gelenek', 'mantı'] },
    { tur: 'yaz', genis: true, baslik: 'Ailemden bir kültür ögesi', sorular: [
      { s: 'Ailende ya da çevrende yaşatılan bir kültür ögesini (yemek, el sanatı, gelenek) yaz ve bir büyüğüne sorarak nasıl yapıldığını anlat.', satir: 3, cevap: 'Öğrencinin kendi cevabı.' },
    ] },
  ]],
};
