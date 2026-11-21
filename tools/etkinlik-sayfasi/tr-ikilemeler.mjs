// Defter notu: Turkce/DefterNotlari/ikilemeler.jpeg — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'İkilemeler',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'İkileme nedir?', kutu: ['ikileme', 'virgül', 'güçlendirir', 'yansıma'], maddeler: [
      'Anlamı kuvvetlendirmek için aynı ya da anlamca ilgili iki kelimenin yan yana kullanılmasına [ikileme] denir.',
      'İkilemeler anlatımı [güçlendirir] , cümleyi daha etkili yapar.',
      'İkilemelerin arasına [virgül] konmaz: “yavaş yavaş”.',
      '“şırıl şırıl, hışır hışır” gibi doğadaki sesleri anlatan ikilemelere [yansıma] ikileme denir.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'İkilemeleri türüne göre grupla', kelimeler: ['yavaş yavaş', 'az çok', 'şırıl şırıl', 'eğri büğrü', 'koşa koşa', 'aşağı yukarı', 'tıkır tıkır', 'kitap mitap', 'güle güle', 'er geç', 'pıtır pıtır', 'çoluk çocuk'], gruplar: [
      { ad: 'Aynı kelimenin tekrarı', uyeler: ['yavaş yavaş', 'koşa koşa', 'güle güle'] },
      { ad: 'Zıt anlamlı', uyeler: ['az çok', 'aşağı yukarı', 'er geç'] },
      { ad: 'Ses yansımalı', uyeler: ['şırıl şırıl', 'tıkır tıkır', 'pıtır pıtır'] },
      { ad: 'Biri anlamsız / yakın anlamlı', uyeler: ['eğri büğrü', 'kitap mitap', 'çoluk çocuk'] },
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Cümleye uygun ikilemeyi yaz', kutu: ['şırıl şırıl', 'koşa koşa', 'yavaş yavaş', 'ince ince', 'tatlı tatlı', 'erken erken', 'derin derin', 'mışıl mışıl'], maddeler: [
      'Teneffüs zili çalınca çocuklar bahçeye [koşa koşa] çıktı.', 'Dereden [şırıl şırıl] sular akıyordu.', 'Bebek beşiğinde [mışıl mışıl] uyuyor.', 'Kar taneleri [yavaş yavaş] yere düşüyordu.',
      'Ninem bize [tatlı tatlı] masallar anlattı.', 'Ormanda [derin derin] nefes aldık.', 'Annem soğanları [ince ince] doğradı.', 'Sınav günü [erken erken] kalktım.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'İkilemeyle cümle kur', sorular: [{ s: 'ağlaya ağlaya →', satir: 1, cevap: 'Kaybolan çocuk ağlaya ağlaya annesini aradı.' }, { s: 'er geç →', satir: 1, cevap: 'Çalışırsan er geç başarırsın.' }, { s: 'çıtır çıtır →', satir: 1, cevap: 'Fırından çıtır çıtır simitler çıktı.' }] },
  ], [
    { tur: 'yaz', genis: true, baslik: 'Yazım hatasını düzelt', yonerge: 'Cümlelerdeki ikileme yanlışlarını bul, doğrusunu yaz.', sorular: [
      { s: 'Misafirler, yavaş, yavaş içeri girdiler.', satir: 1, cevap: 'Misafirler yavaş yavaş içeri girdiler. (İkilemeye virgül konmaz.)' },
      { s: 'Çocuklar güle-güle oynuyordu.', satir: 1, cevap: 'Çocuklar güle güle oynuyordu. (Kısa çizgi konmaz.)' },
      { s: 'Yağmur pıtırpıtır cama vuruyordu.', satir: 1, cevap: 'Yağmur pıtır pıtır cama vuruyordu. (Ayrı yazılır.)' },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Köyde Bir Sabah', metin: [
      'Sabah erkenden horozlar ötmeye başladı. Güneş yavaş yavaş dağların ardından yükseldi. Ninem bahçede tavuklara yem serperken tavuklar pıtır pıtır koşturuyordu. Dedem çeşmeden kova kova su taşıdı. Kahvaltıda sıcak sıcak ekmeklerimizi yedik. Sonra çoluk çocuk hep birlikte bağa gittik.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Metindeki ikilemeleri bul', basliklar: ['İkileme', 'Türü'], genislik: ['50%', '50%'], satirlar: [
      ['[yavaş yavaş]', '[aynı kelimenin tekrarı]'], ['[pıtır pıtır]', '[ses yansımalı]'], ['[kova kova]', '[aynı kelimenin tekrarı]'], ['[sıcak sıcak]', '[aynı kelimenin tekrarı]'], ['[çoluk çocuk]', '[yakın anlamlı]'],
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['“Az çok” zıt anlamlı kelimelerle yapılmış bir ikilemedir.', true],
      ['İkilemelerin arasına virgül konur.', false],
      ['“Mışıl mışıl” bir ses yansımasıdır.', true],
      ['İkilemeler anlatımı zayıflatır.', false],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'İkilemelerin ilk kelimesini bul.', boyut: 9, kelimeler: ['yavaş', 'şırıl', 'pıtır', 'koşa', 'güle', 'tıkır', 'mışıl'] },
    { tur: 'yaz', genis: true, baslik: 'Sıra sende', sorular: [
      { s: 'Yağmurlu bir günü en az üç ikileme kullanarak anlat.', satir: 3, cevap: 'Örnek: Yağmur pıtır pıtır yağıyordu. Sokaklardan sular şırıl şırıl akıyordu. Eve koşa koşa döndük.' },
    ] },
  ]],
};
