// Defter notu: Turkce/DefterNotlari/tr-cikarim-baslik-1..2.png — kazanım (bekleyen): T.4.3.28, T.4.3.21 — doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Çıkarım Yapma ve Başlık Bulma',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['ipuçlarından', 'çıkarım', 'başlık', 'konusunu', 'kısa'], maddeler: [
      'Metinde açıkça yazılmayan bir bilgiyi [ipuçlarından] yararlanarak bulmaya [çıkarım] yapmak denir.',
      'Metnin adına [başlık] denir. Başlık metnin [konusunu] ya da ana düşüncesini yansıtır.',
      'İyi bir başlık [kısa] , ilgi çekici ve metinle uyumludur.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'İpucundan çıkarım yap', basliklar: ['İpuçları', 'Çıkarımım'], genislik: ['62%', '38%'], satirlar: [
      ['Ece\'nin şemsiyesinden su damlıyor, ayakkabıları ıslak.', '[Dışarıda yağmur yağıyor.]'],
      ['Kerem\'in elinde çanta ve forma var, saat 08.15.', '[Kerem okula gidiyor.]'],
      ['Mutfaktan mis gibi kek kokusu geliyor, fırın çalışıyor.', '[Biri kek pişiriyor.]'],
      ['Ağaçlar yapraksız, insanlar atkı ve bere takmış.', '[Mevsim kış.]'],
      ['Ali\'nin dizi yara bandıyla kaplı, bisikleti çizilmiş.', '[Ali bisikletten düşmüş.]'],
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım', metin: [
      'Zil çaldığında Deniz\'in elleri titriyordu. Gece boyunca neredeyse hiç uyumamıştı. Öğretmen kâğıtları dağıtınca derin bir nefes aldı. İlk soruyu okuyunca yüzünde bir gülümseme belirdi; dün akşam tam da bu konuyu tekrar etmişti.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metinden çıkarım yap', sorular: [
      { s: 'Deniz o gün sınıfta ne yapıyor olabilir? Hangi ipuçlarından anladın?', satir: 2, cevap: 'Sınava giriyor. İpuçları: öğretmen kâğıtları dağıttı, soruyu okudu, konuyu tekrar etmişti.' },
      { s: 'Deniz sınavdan önce nasıl hissediyordu? Neden?', satir: 1, cevap: 'Heyecanlı/kaygılı; elleri titriyordu, uyuyamamıştı.' },
      { s: 'Deniz ilk soruyu okuyunca neden gülümsedi?', satir: 1, cevap: 'Soruyu biliyordu, çünkü o konuyu tekrar etmişti.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Hangi çıkarım doğru?', sorular: [{ s: 'Selin\'in masasında kalem kutusu, boya kalemleri ve yarım kalmış bir resim var. Selin şimdi ne yapıyor olabilir?', sec: ['Yemek yiyor', 'Resim yapıyor', 'Uyuyor'], d: 1 }, { s: 'Sokaklar ıslak, havada gökkuşağı var. Az önce ne olmuş olabilir?', sec: ['Yağmur yağmış', 'Kar yağmış', 'Rüzgâr esmiş'], d: 0 }] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım', metin: [
      'Bal arıları çiçekten çiçeğe konarak nektar toplar. Bu sırada vücutlarına yapışan çiçek tozlarını başka çiçeklere taşırlar. Böylece bitkilerin meyve ve tohum vermesine yardım ederler. Arılar olmasaydı elma, kiraz, kavun gibi pek çok meyveyi yiyemezdik. Bu yüzden arıları korumalı, bahçelerde zehirli ilaçları dikkatli kullanmalıyız.',
    ] },
    { tur: 'coktan', genis: true, baslik: 'Bu metne en uygun başlık', sorular: [
      { s: 'Metne en uygun başlık hangisidir?', sec: ['Bal Nasıl Yapılır?', 'Meyvelerin Gizli Kahramanları: Arılar', 'Bahçede Bir Gün'], d: 1 },
      { s: 'Metnin konusu nedir?', sec: ['Arıların bitkilere yararı', 'Meyvelerin renkleri', 'Zehirli ilaçların yapılışı'], d: 0 },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Başlık bul', yonerge: 'Her kısa metne uygun bir başlık yaz.', sorular: [
      { s: 'Kış gelince sincap, yazın sakladığı fındıkları buldu. Karnını doyurdu, sıcak yuvasında kışı rahat geçirdi.', satir: 1, cevap: 'Örnek: Tutumlu Sincap' },
      { s: 'Okulumuzun bahçesine 40 fidan diktik. Her sınıf bir fidana bakmayı üstlendi. Bahar gelince fidanlar yeşerdi.', satir: 1, cevap: 'Örnek: Yeşil Okulumuz / Fidanlarımız Büyüyor' },
      { s: 'Ayşe kütüphaneden bir uzay kitabı aldı. Okudukça gezegenleri daha çok merak etti ve büyüyünce astronot olmaya karar verdi.', satir: 1, cevap: 'Örnek: Yıldızlara Uzanan Hayal' },
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Çıkarım yaparken metindeki ipuçlarını kullanırız.', true],
      ['Başlık, metnin yalnız bir cümlesini anlatır.', false],
      ['Bir metne birden fazla uygun başlık bulunabilir.', true],
      ['Çıkarım yaparken metinle ilgisi olmayan tahminler yaparız.', false],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Dedektif ol', sorular: [
      { s: 'Sınıfına gelen yeni öğretmenin hangi dersin öğretmeni olduğunu anlamak için hangi ipuçlarına bakarsın? İki ipucu yaz.', satir: 2, cevap: 'Örnek: Elindeki kitap ya da araçlar (cetvel, flüt, top), tahtaya yazdıkları.' },
    ] },
    { tur: 'bosluk', baslik: 'İyi bir başlık…', maddeler: ['[kısa] olmalıdır.', 'metnin [konusunu] yansıtmalıdır.', 'okuyanın [ilgisini] çekmelidir.'] },
  ]],
};
