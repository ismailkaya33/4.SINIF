// Defter notu: Fen/DefterNotlari/besinlerintazeligi.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Fen', baslik: 'Besinlerin Tazeliği',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Tazeliği nasıl anlarız?', kutu: ['renk', 'koku', 'son tüketim', 'küf', 'ambalaj', 'sertlik'], maddeler: [
      'Bozulan besinlerin [renk] i değişir; örneğin muz kararır, et morarır.',
      'Bozulan süt ve yumurtadan kötü bir [koku] gelir.',
      'Ekmeğin ve peynirin üzerinde yeşil-gri lekeler gibi [küf] oluşabilir.',
      'Paketli besinlerde [son tüketim] tarihine mutlaka bakılır.',
      '[ambalaj] ı şişmiş, yırtılmış ya da ezilmiş konserveler alınmaz.',
      'Taze sebze ve meyveler diri olur; bayatlayınca yumuşar ya da [sertlik] i değişir.',
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Taze mi, bayat/bozuk mu?', kelimeler: ['parlak kırmızı domates', 'küflenmiş ekmek', 'ekşi kokan süt', 'kabuğu sağlam yumurta', 'kapağı şişmiş konserve', 'diri yeşil marul', 'kararmış muz lekeleri yayılmış', 'son tüketim tarihi geçmemiş yoğurt'], gruplar: [
      { ad: 'Taze ✓', uyeler: ['parlak kırmızı domates', 'kabuğu sağlam yumurta', 'diri yeşil marul', 'son tüketim tarihi geçmemiş yoğurt'] },
      { ad: 'Bozuk / tüketilmez ✗', uyeler: ['küflenmiş ekmek', 'ekşi kokan süt', 'kapağı şişmiş konserve', 'kararmış muz lekeleri yayılmış'] },
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Ekmeğin küflü kısmını kesip atarsak kalanını rahatça yiyebiliriz.', false],
      ['Bozuk besin yemek mide ağrısı, ishal ve kusmaya yol açabilir.', true],
      ['Yumurta su dolu bir kaba konunca dibe batıyorsa tazedir.', true],
      ['Son tüketim tarihi geçmiş bir besin, kokusu iyiyse yenebilir.', false],
      ['Açık tezgâhlarda güneş altında bekleyen et ve balık alınmamalıdır.', true],
    ] },
    { tur: 'tablo', genis: true, baslik: 'Etiket okuyalım', yonerge: 'Bugünün tarihi 21 Kasım. Etiketlere bakarak tabloyu doldur.',
      basliklar: ['Ürün', 'Son tüketim tarihi', 'Tüketilir mi?', 'Neden?'], genislik: ['20%', '24%', '18%', '38%'],
      satirlar: [
        ['Süt', '28 Kasım', '[Evet]', '[Tarihi geçmemiş]'],
        ['Yoğurt', '15 Kasım', '[Hayır]', '[Tarihi geçmiş]'],
        ['Peynir', '3 Aralık', '[Evet]', '[Tarihi geçmemiş]'],
        ['Meyve suyu', '21 Kasım', '[Evet, bugün]', '[Son gün; açılınca hemen tüketilmeli]'],
      ] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Market Alışverişi', metin: [
      'Kerem annesiyle markete gitti. Annesi süt şişelerinin tarihine baktı, en yeni tarihli olanı seçti. Kerem bir konserve kutusu uzattı; annesi kutunun kapağının şiştiğini gösterip “Bunu almayalım, içi bozulmuş olabilir.” dedi.',
      'Manavda Kerem, rengi kararmış ve yumuşamış elmaları değil, parlak ve sert elmaları seçti. Eve gelince de dondurulmuş besinleri hemen derin dondurucuya koydular.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Kerem\'in annesi sütü seçerken neye dikkat etti?', satir: 1, cevap: 'Son tüketim tarihine; en yeni tarihli olanı seçti.' },
      { s: 'Konserve kutusu neden alınmadı?', satir: 1, cevap: 'Kapağı şişmişti; içi bozulmuş olabilir.' },
      { s: 'Kerem elma seçerken hangi özelliklere baktı?', satir: 1, cevap: 'Rengine (parlak) ve sertliğine.' },
    ] },
    { tur: 'coktan', baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Hangisi besinin bozulduğunu gösterir?', sec: ['Parlak rengi', 'Küf ve kötü koku', 'Sağlam ambalajı'], d: 1, alt: true },
      { s: 'Bozuk besin yediğimizi düşünürsek ne yapmalıyız?', sec: ['Hiçbir şey olmamış gibi davranırız', 'Bir büyüğümüze haber verir, gerekirse doktora gideriz', 'Daha çok yeriz'], d: 1, alt: true },
    ] },
    { tur: 'eslestir', baslik: 'Belirtiyi besinle eşleştir', ciftler: [
      ['Ekşi kokar, topaklanır.', 'Süt'], ['Üzerinde yeşil lekeler olur.', 'Ekmek'], ['Kabuğu kararır, yumuşar.', 'Muz'], ['Kapağı şişer.', 'Konserve'],
    ], fazla: ['Pirinç'] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Tazelikle ilgili kelimeleri bul ve işaretle.', boyut: 9, kelimeler: ['koku', 'renk', 'küf', 'tarih', 'ambalaj', 'taze', 'bayat'] },
    { tur: 'yaz', genis: true, baslik: 'Afiş sözü yaz', sorular: [
      { s: 'Okul kantini için “taze besin” ile ilgili kısa ve etkili bir afiş sözü yaz.', satir: 2, cevap: 'Örnek: Önce bak, kokla, tarihe göz at; sonra afiyetle tat!' },
    ] },
  ]],
};
