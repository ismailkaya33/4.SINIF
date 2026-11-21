// Defter notu: Turkce/DefterNotlari/pekistirme.JPG — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Pekiştirmeler',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Pekiştirme nedir?', kutu: ['pekiştirme', 'ilk hecesine', 'm, p, r, s', 'bitişik'], maddeler: [
      'Bir kelimenin anlamını kuvvetlendirmek için yapılan değişikliğe [pekiştirme] denir: mavi → masmavi.',
      'Pekiştirmede kelimenin [ilk hecesine] genellikle [m, p, r, s] harflerinden biri eklenir: ye-m-yeşil, ka-p-kara, te-r-temiz, be-m-beyaz.',
      'Pekiştirmeli kelimeler [bitişik] yazılır: “kıp kırmızı” değil “kıpkırmızı”.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Pekiştirmeli biçimini yaz', ortala: true, basliklar: ['Kelime', 'Pekiştirme', 'Kelime', 'Pekiştirme'], satirlar: [
      ['mavi', '[masmavi]', 'yeşil', '[yemyeşil]'], ['kırmızı', '[kıpkırmızı]', 'beyaz', '[bembeyaz]'], ['sarı', '[sapsarı]', 'siyah', '[simsiyah]'],
      ['temiz', '[tertemiz]', 'uzun', '[upuzun]'], ['dolu', '[dopdolu]', 'yeni', '[yepyeni]'], ['sıcak', '[sımsıcak]', 'düz', '[dümdüz]'], ['sıkı', '[sımsıkı]', 'kara', '[kapkara]'],
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Cümleyi pekiştirmeyle tamamla', maddeler: [
      'Bulutsuz gökyüzü [masmavi] görünüyordu. (mavi)', 'Yağmurdan sonra her yer [yemyeşil] oldu. (yeşil)', 'Kar yağınca sokaklar [bembeyaz] oldu. (beyaz)',
      'Utanınca yanakları [kıpkırmızı] oldu. (kırmızı)', 'Annem odamı [tertemiz] yapmış. (temiz)', 'Bayram için [yepyeni] ayakkabılar aldık. (yeni)',
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi pekiştirmeli bir kelimedir?', sec: ['masmavi', 'mavimsi', 'mavili'], d: 0 }, { s: 'Hangisinin yazımı doğrudur?', sec: ['sap sarı', 'sapsarı', 'sap-sarı'], d: 1 }, { s: 'Hangisinde pekiştirme yanlış yapılmıştır?', sec: ['bembeyaz', 'yemyeşil', 'kıskırmızı'], d: 2 }] },
    { tur: 'bosluk', genis: true, baslik: 'Pekiştirmeyi bul, kelimenin aslını yaz', maddeler: ['Kocaman bir kutu dopdolu oyuncakla geldi. → dopdolu: [dolu]', 'Kardeşim yepyeni defterini sımsıkı tuttu. → yepyeni: [yeni] , sımsıkı: [sıkı]', 'Sapsarı yapraklar dümdüz yola düştü. → sapsarı: [sarı] , dümdüz: [düz]'] },
  ], [
    { tur: 'siniflandir', genis: true, baslik: 'Hangi harf eklenmiş?', kelimeler: ['masmavi', 'kapkara', 'tertemiz', 'sapsarı', 'yemyeşil', 'yepyeni', 'bembeyaz', 'büsbütün'], gruplar: [
      { ad: 'm', uyeler: ['yemyeşil', 'bembeyaz'] }, { ad: 'p', uyeler: ['kapkara', 'sapsarı', 'yepyeni'] }, { ad: 'r', uyeler: ['tertemiz'] }, { ad: 's', uyeler: ['masmavi', 'büsbütün'] },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Yazım hatasını düzelt', sorular: [
      { s: 'Bahçemiz baharda yem yeşil oldu.', satir: 1, cevap: 'Bahçemiz baharda yemyeşil oldu.' },
      { s: 'Kardeşimin elleri sım sıcaktı.', satir: 1, cevap: 'Kardeşimin elleri sımsıcaktı.' },
      { s: 'Masmavi deniz, bem-beyaz kumsal.', satir: 1, cevap: 'Masmavi deniz, bembeyaz kumsal.' },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Pekiştirmeler kelimenin anlamını güçlendirir.', true],
      ['“Kıp kırmızı” ayrı yazılır.', false],
      ['“Tertemiz” kelimesinde “r” harfi eklenmiştir.', true],
      ['Pekiştirme yalnız renk bildiren kelimelerle yapılır.', false],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Pekiştirmeli kelimeleri bul.', boyut: 10, kelimeler: ['masmavi', 'yemyeşil', 'sapsarı', 'tertemiz', 'kapkara', 'dopdolu'] },
    { tur: 'yaz', genis: true, baslik: 'Betimle', sorular: [
      { s: 'Bir bahar sabahını en az üç pekiştirmeli kelime kullanarak anlat.', satir: 4, cevap: 'Örnek: Gökyüzü masmaviydi. Ağaçlar yemyeşil yapraklarla kaplanmıştı. Bembeyaz papatyalar tarlayı süslüyordu.' },
    ] },
  ]],
};
