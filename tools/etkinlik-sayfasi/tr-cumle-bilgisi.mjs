// Defter notu: Turkce/DefterNotlari/tr-cumle-bilgisi-1..3.png (tools/sketchnote/notlar/tr-cumle-bilgisi.js) — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Cümle Bilgisi',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['cümle', 'olumlu', 'olumsuz', 'soru', 'ünlem', 'kurallı', 'devrik'], maddeler: [
      'Bir duygu, düşünce ya da olayı tam olarak anlatan kelime dizisine [cümle] denir.',
      'İşin, oluşun yapıldığını bildiren cümleye [olumlu] , yapılmadığını bildiren cümleye [olumsuz] cümle denir.',
      'Bir şeyi öğrenmek için kurulan cümleye [soru] cümlesi denir; sonuna soru işareti konur.',
      'Sevinç, korku, şaşkınlık, istek gibi duyguları coşkuyla anlatan cümleye [ünlem] cümlesi denir.',
      'Yüklemi sonda olan cümleye [kurallı] , yüklemi sonda olmayan cümleye [devrik] cümle denir.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Olumludan olumsuza, olumsuzdan olumluya', basliklar: ['Cümle', 'Karşıt biçimi'], genislik: ['50%', '50%'], satirlar: [
      ['Kardeşim sütünü içti.', '[Kardeşim sütünü içmedi.]'], ['Bu akşam parka gideceğiz.', '[Bu akşam parka gitmeyeceğiz.]'], ['Ödevimi henüz bitirmedim.', '[Ödevimi bitirdim.]'], ['Bahçede hiç çiçek yok.', '[Bahçede çiçek var.]'],
    ] },
    { tur: 'tablo', genis: true, baslik: 'Cümlenin türünü yaz', yonerge: 'Her cümlenin sonuna uygun noktalama işaretini koy ve türünü yaz: olumlu, olumsuz, soru, ünlem.', basliklar: ['Cümle', 'İşaret', 'Türü'], genislik: ['62%', '12%', '26%'], ortala: false, satirlar: [
      ['Eyvah, otobüsü kaçırdık', '[!]', '[ünlem]'], ['Yarın okula kaçta gideceğiz', '[?]', '[soru]'], ['Kitabımı evde unutmadım', '[.]', '[olumsuz]'], ['Sabahları erken kalkarım', '[.]', '[olumlu]'], ['Ne güzel bir gün', '[!]', '[ünlem]'], ['Kantinde simit kalmamış', '[.]', '[olumsuz]'],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Soru cümlesi kur', yonerge: 'Altı çizili kelimeyi cevap olarak alan bir soru cümlesi yaz.', sorular: [
      { s: '__Pazar günü__ dedemlere gideceğiz.', satir: 1, cevap: 'Ne zaman dedemlere gideceğiz?' },
      { s: 'Elif kitabını __çantasına__ koydu.', satir: 1, cevap: 'Elif kitabını nereye koydu?' },
      { s: '__Kardeşim__ bahçede top oynuyor.', satir: 1, cevap: 'Bahçede kim top oynuyor?' },
    ] },
  ], [
    { tur: 'siniflandir', genis: true, baslik: 'Kurallı mı, devrik mi?', kelimeler: ['Ali okula erken geldi.', 'Geldi bahar, açtı çiçekler.', 'Sevdim bu kitabı çok.', 'Annem bize kek yaptı.', 'Gidelim yarın sinemaya.', 'Kuşlar ağaçta ötüyor.'], gruplar: [
      { ad: 'Kurallı (yüklem sonda)', uyeler: ['Ali okula erken geldi.', 'Annem bize kek yaptı.', 'Kuşlar ağaçta ötüyor.'] },
      { ad: 'Devrik (yüklem sonda değil)', uyeler: ['Geldi bahar, açtı çiçekler.', 'Sevdim bu kitabı çok.', 'Gidelim yarın sinemaya.'] },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Devrik cümleyi kurallı yap', sorular: [
      { s: 'Okudum dün akşam bu masalı.', satir: 1, cevap: 'Dün akşam bu masalı okudum.' },
      { s: 'Çok güzel yağıyor kar.', satir: 1, cevap: 'Kar çok güzel yağıyor.' },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Sebep–sonuç mu, amaç–sonuç mu?', yonerge: 'Sebep: işin neden olduğunu; amaç: işin hangi niyetle yapıldığını anlatır. Uygun olanı yaz.', basliklar: ['Cümle', 'Türü'], genislik: ['72%', '28%'], satirlar: [
      ['Yağmur yağdığı için maç ertelendi.', '[sebep–sonuç]'], ['Sınavı kazanmak için çok çalıştı.', '[amaç–sonuç]'], ['Hasta olduğundan okula gelemedi.', '[sebep–sonuç]'], ['Kitap almak üzere kırtasiyeye gitti.', '[amaç–sonuç]'], ['Erken kalksın diye saati kurdu.', '[amaç–sonuç]'],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi ünlem cümlesidir?', sec: ['Bugün hava güzel.', 'Aman, düşeceksin!', 'Saat kaç?'], d: 1 },
      { s: '“Kardeşim yemeğini bitirdi.” cümlesinin olumsuzu hangisidir?', sec: ['Kardeşim yemeğini bitirmedi.', 'Kardeşim yemeğini bitirdi mi?', 'Kardeşim yemeğini bitirsin!'], d: 0 },
      { s: 'Hangisinde amaç–sonuç ilişkisi vardır?', sec: ['Üşüdüğü için montunu giydi.', 'Dişleri çürümesin diye şekeri azalttı.', 'Yorulduğundan erken uyudu.'], d: 1 },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Sen yaz', sorular: [
      { s: 'Teneffüste yaşadığın bir olayı anlatan bir olumlu, bir olumsuz ve bir ünlem cümlesi yaz.', satir: 3, cevap: 'Örnek: Bahçede ip atladık. Kimse kavga etmedi. Ne eğlenceli bir teneffüstü!' },
    ] },
  ]],
};
