// Defter notu: tools/sketchnote/notlar/fen-miknatislar.js (4 alt konu) — kazanım kodları doğrulanmalı
// Bilgi kontrolü: alüminyum, bakır, altın mıknatısa yapışmaz; etki kâğıt/karton/cam/su/plastikten geçer; çekim kutuplarda en güçlü.
export default {
  ders: 'Fen', baslik: 'Mıknatıslar',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Mıknatısı tanıyalım', kutu: ['mıknatıs', 'demir', 'nikel', 'kobalt', 'kutup', 'kuzey', 'güney', 'kutuplarında'], maddeler: [
      'Bazı maddeleri kendine çeken cisimlere [mıknatıs] denir.',
      'Mıknatıs [demir] , [nikel] ve [kobalt] içeren cisimleri çeker.',
      'Mıknatısın iki ucuna [kutup] denir: [kuzey] kutbu (N) ve [güney] kutbu (S).',
      'Mıknatısın çekim etkisi [kutuplarında] en güçlü, ortasında en zayıftır.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Çeker mi, çekmez mi?', yonerge: 'Cisimleri mıknatısın çektiği ve çekmediği olarak ayır.',
      kelimeler: ['ataş', 'tahta kalem', 'demir çivi', 'alüminyum kutu', 'toplu iğne', 'plastik tarak', 'çelik vida', 'bakır tel'], gruplar: [
      { ad: 'Mıknatıs çeker', uyeler: ['ataş', 'demir çivi', 'toplu iğne', 'çelik vida'] },
      { ad: 'Mıknatıs çekmez', uyeler: ['tahta kalem', 'alüminyum kutu', 'plastik tarak', 'bakır tel'] },
    ] },
    { tur: 'tablo', baslik: 'Kutuplar: iter mi, çeker mi?', yonerge: 'Karşı karşıya gelen kutuplara göre "iter" ya da "çeker" yaz.',
      basliklar: ['Karşılaşan kutuplar', 'Sonuç'], genislik: ['55%', '45%'], ortala: true, satirlar: [
      ['N  ⟷  N', '[iter]'], ['N  ⟷  S', '[çeker]'], ['S  ⟷  S', '[iter]'], ['S  ⟷  N', '[çeker]'],
    ] },
    { tur: 'eslestir', baslik: 'Mıknatıs şekilleri', yonerge: 'Tarifi mıknatısın adıyla eşleştir.', ciftler: [
      ['Ortası delik ve yuvarlak', 'halka mıknatıs'], ['U harfine benzer', 'at nalı mıknatıs'], ['Uzun ve dikdörtgen', 'çubuk mıknatıs'], ['Yassı, para gibi yuvarlak', 'disk mıknatıs'],
    ], fazla: ['pusula'] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Mıknatıs bütün metalleri çeker.', false],
      ['Aynı kutuplar birbirini iter.', true],
      ['Altın yüzük mıknatısa yapışır.', false],
      ['Mıknatısın etkisi kâğıdın içinden geçer.', true],
      ['Çubuk mıknatısın en güçlü çektiği yer tam ortasıdır.', false],
    ] },
    { tur: 'tablo', genis: true, baslik: 'Mıknatıs nerede kullanılır?', yonerge: 'Mıknatısın bu eşyalarda ne işe yaradığını yaz.',
      basliklar: ['Eşya', 'Mıknatıs ne işe yarar?'], genislik: ['30%', '70%'], satirlar: [
      ['Buzdolabı kapağı', '?Kapağın sıkıca kapalı kalmasını sağlar.'],
      ['Pusula', '?Yön bulmamızı sağlar.'],
      ['Hurdalıktaki vinç', '?Demir parçalarını öteki atıklardan ayırır.'],
    ] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Ataş Labirenti', metin: [
      'Elif kartona bir labirent çizdi ve labirentin başına bir ataş koydu. Kartonun altında küçük bir mıknatısı yavaşça gezdirdi. Ataş, kartonun üstünde mıknatısı izleyerek labirentin yollarında ilerledi ve çıkışa ulaştı.',
      'Sonra Elif su dolu bir cam bardağın dibine bir ataş bıraktı. Mıknatısı bardağın dışından yukarı doğru kaydırınca ataş da bardağın içinde yukarı çıktı. Kardeşi Can alüminyum folyodan bir top yapıp mıknatısa yaklaştırdı ama top mıknatısa yapışmadı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Ataş kartonun üstünde neden hareket etti?', satir: 1, cevap: 'Mıknatısın etkisi kartonun içinden geçtiği için.' },
      { s: 'Bardak deneyinde mıknatısın etkisi hangi maddelerin içinden geçti?', satir: 1, cevap: 'Camın ve suyun içinden.' },
      { s: 'Folyo top neden mıknatısa yapışmadı?', satir: 1, cevap: 'Folyo alüminyumdur; alüminyum mıknatısa yapışmaz.' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hurdalıktaki mıknatıslı vinç hangisini kaldırır?', sec: ['Plastik şişe', 'Demir parçası', 'Tahta kasa'], d: 1 },
      { s: 'Hangisinde mıknatıs kullanılmaz?', sec: ['Pusula', 'Buzdolabı kapağı', 'Tahta cetvel'], d: 2 },
      { s: 'Küçük mıknatıslar için hangisi doğrudur?', sec: ['Yutulursa çok tehlikelidir.', 'Banka kartına yaklaştırılabilir.', 'Bütün metalleri çeker.'], d: 0, alt: true },
    ] },
    { tur: 'bosluk', baslik: 'Cümleyi tamamla', kutu: ['çeker', 'iter', 'pusula', 'demir'], maddeler: [
      'Zıt kutuplar birbirini [çeker] .',
      'S kutbu ile S kutbu birbirini [iter] .',
      'Yön bulmak için [pusula] kullanırız.',
      'Mıknatıslı vinç [demir] parçalarını ayırır.',
    ] },
    { tur: 'kelimeavi', genis: true, baslik: 'Kelime avı', yonerge: 'Kelimeleri bul ve işaretle.', boyut: 10, kelimeler: ['mıknatıs', 'kutup', 'demir', 'nikel', 'kobalt', 'pusula', 'ataş', 'çekim'] },
  ]],
};
