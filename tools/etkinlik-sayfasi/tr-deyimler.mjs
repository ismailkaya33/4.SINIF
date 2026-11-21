// Defter notu: Turkce/DefterNotlari/deyimler.png — kazanım: T.4.3.11 (tools/defter-kazanim.json)
export default {
  ders: 'Turkce', baslik: 'Deyimler',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Deyim nedir?', kutu: ['kalıplaşmış', 'mecaz', 'ilgi çekici', '-mak/-mek', 'öğüt vermez'], maddeler: [
      'Deyimler, bir durumu [ilgi çekici] bir şekilde anlatan [kalıplaşmış] söz gruplarıdır.',
      'Deyimlerin çoğu [mecaz] anlamlıdır: “kulak vermek” kulağı birine vermek değildir.',
      'Deyimlerin çoğu [-mak/-mek] ekiyle biter: göz atmak, dil dökmek.',
      'Deyimler atasözleri gibi [öğüt vermez] .',
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Deyimi anlamıyla eşleştir', ciftler: [
      ['göz atmak', 'kısaca bakmak'], ['kulak vermek', 'dikkatle dinlemek'], ['etekleri zil çalmak', 'çok sevinmek'], ['küplere binmek', 'çok öfkelenmek'],
      ['pireyi deve yapmak', 'küçük bir şeyi çok büyütmek'], ['dili tutulmak', 'şaşırıp konuşamamak'], ['eli açık', 'cömert'], ['ayağını denk almak', 'dikkatli davranmak'],
    ], fazla: ['çok yorulmak'] },
    { tur: 'bosluk', genis: true, baslik: 'Cümleye uygun deyimi yaz', kutu: ['içi içine sığmıyordu', 'ağzı kulaklarına vardı', 'göz yumdu', 'kılı kırk yarar', 'burnu havada', 'ateş pahası'], maddeler: [
      'Karnesini görünce sevinçten [ağzı kulaklarına vardı] .',
      'Yarın geziye gideceğimiz için Ayşe\'nin heyecandan [içi içine sığmıyordu] .',
      'Öğretmen, küçük kardeşin yaramazlığına bu seferlik [göz yumdu] .',
      'Dedem her işi en ince ayrıntısına kadar düşünür, [kılı kırk yarar] .',
      'Bayram öncesi ayakkabılar [ateş pahası] olmuştu.',
      'Kimseyi beğenmeyen [burnu havada] biriyle arkadaşlık zordur.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Deyimin anlamını yaz', sorular: [{ s: 'dört gözle beklemek →', satir: 1, cevap: 'çok istekle, sabırsızlıkla beklemek' }, { s: 'kulak misafiri olmak →', satir: 1, cevap: 'başkalarının konuşmasını istemeden duymak' }, { s: 'gözü tok →', satir: 1, cevap: 'başkasının malında gözü olmayan, kanaatkâr' }, { s: 'ağzı sıkı →', satir: 1, cevap: 'sır saklayan' }] },
  ], [
    { tur: 'coktan', genis: true, baslik: 'Altı çizili deyimin anlamı', sorular: [
      { s: 'Kardeşim yeni bisikletini görünce __etekleri zil çaldı__.', sec: ['Çok korktu', 'Çok sevindi', 'Çok yoruldu'], d: 1 },
      { s: 'Bu konuya bir de sen __kafa yor__.', sec: ['Derinlemesine düşün', 'Başını ağrıt', 'Hemen unut'], d: 0 },
      { s: 'Ali, arkadaşının sözüne __kulak asmadı__.', sec: ['Dikkatle dinledi', 'Çok güldü', 'Önemsemedi'], d: 2 },
      { s: 'Sınav __eli kulağında__, hazırlanmaya başlamalıyız.', sec: ['Çok yakında', 'Çok uzakta', 'İptal edildi'], d: 0 },
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Duygularına göre grupla', kelimeler: ['ağzı kulaklarına varmak', 'küplere binmek', 'ödü kopmak', 'etekleri zil çalmak', 'tepesi atmak', 'yüreği ağzına gelmek'], gruplar: [
      { ad: 'Sevinç', uyeler: ['ağzı kulaklarına varmak', 'etekleri zil çalmak'] },
      { ad: 'Öfke', uyeler: ['küplere binmek', 'tepesi atmak'] },
      { ad: 'Korku', uyeler: ['ödü kopmak', 'yüreği ağzına gelmek'] },
    ] },
    { tur: 'dy', baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['“Göz atmak” deyiminde göz gerçekten atılır.', false],
      ['Deyimlerin kelimeleri değiştirilemez.', true],
      ['“Eli açık” deyimi cimri anlamındadır.', false],
      ['Deyimler anlatımı güçlendirir.', true],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Deyimlerde geçen organ adlarını bul.', boyut: 9, kelimeler: ['göz', 'kulak', 'el', 'ayak', 'dil', 'burun', 'yürek', 'baş'] },
    { tur: 'yaz', genis: true, baslik: 'Deyimle anlat', sorular: [
      { s: '“dil dökmek” deyimini bir cümlede kullan.', satir: 1, cevap: 'Örnek: Annemi parka götürmeye ikna etmek için çok dil döktüm.' },
      { s: '“gözden düşmek” deyimini bir cümlede kullan.', satir: 1, cevap: 'Örnek: Sözünü tutmayınca arkadaşlarının gözünden düştü.' },
      { s: 'Bugün yaşadığın bir olayı en az iki deyim kullanarak anlat.', satir: 3, cevap: 'Öğrencinin kendi cevabı; iki deyim doğru anlamıyla kullanılmalı.' },
    ] },
  ]],
};
