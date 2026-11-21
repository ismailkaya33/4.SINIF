// Defter notu: Turkce/DefterNotlari/metninbolumleri.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Metnin Bölümleri',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Bölümleri tanıyalım', kutu: ['giriş', 'gelişme', 'sonuç'], maddeler: [
      'Kişilerin, yerin ve zamanın tanıtıldığı, olayın başladığı bölüme [giriş] denir.',
      'Olayların geliştiği, sorunun ortaya çıktığı ve en uzun bölüme [gelişme] denir.',
      'Sorunun çözüldüğü, olayın bittiği bölüme [sonuç] denir.',
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Kayıp Kedi Pamuk', metin: [
      '(A) Akşam olunca Pamuk kendiliğinden eve döndü. Meğer bütün gün komşunun sıcak kömürlüğünde uyumuş. Selin, Pamuk\'a sarıldı ve o günden sonra kapıyı hep kapalı tuttu.',
      '(B) Selin, okul dönüşü kapının açık kaldığını gördü. Pamuk evde yoktu! Bütün sokağı dolaştı, ağaçların tepesine baktı, komşulara sordu. Arkadaşlarıyla birlikte “Kayıp kedi” ilanları yazıp duvarlara astılar.',
      '(C) Selin, bir apartmanın ikinci katında annesi ve kedisi Pamuk ile yaşıyordu. Pamuk bembeyaz tüylü, yeşil gözlü, çok meraklı bir kediydi.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Paragrafları sırala', yonerge: 'Paragrafların harfini doğru bölüme yaz ve nasıl anladığını açıkla.', basliklar: ['Bölüm', 'Paragraf', 'Nasıl anladım?'], genislik: ['16%', '14%', '70%'], satirlar: [
      ['Giriş', '[C]', '[Kişiler (Selin, annesi, Pamuk) ve yer tanıtılıyor.]'], ['Gelişme', '[B]', '[Sorun çıkıyor: Pamuk kayboluyor, aranıyor.]'], ['Sonuç', '[A]', '[Sorun çözülüyor: Pamuk eve dönüyor.]'],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Metnin kahramanları kimlerdir? Olay nerede geçiyor?', satir: 1, cevap: 'Selin, annesi, Pamuk; apartman ve sokak.' },
      { s: 'Gelişme bölümündeki sorun nedir?', satir: 1, cevap: 'Pamuk\'un kaybolması.' },
      { s: 'Selin bu olaydan ne ders çıkardı?', satir: 1, cevap: 'Kapıyı açık bırakmamak gerektiğini.' },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi giriş bölümünde yer almaz?', sec: ['Kişilerin tanıtılması', 'Sorunun çözülmesi', 'Yerin tanıtılması'], d: 1 }, { s: '“Herkes çok mutluydu ve bir daha hiç kavga etmediler.” cümlesi hangi bölümdendir?', sec: ['Giriş', 'Gelişme', 'Sonuç'], d: 2 }] },
    { tur: 'bosluk', genis: true, baslik: 'Bölüm ipuçları', kutu: ['giriş', 'gelişme', 'sonuç'], maddeler: ['“Bir varmış bir yokmuş…” ile başlayan bölüm genellikle [giriş] bölümüdür.', '“Birdenbire, o sırada, ama” gibi sözlerle olayın değiştiği bölüm [gelişme] bölümüdür.', '“Sonunda, o günden sonra” gibi sözlerle biten bölüm [sonuç] bölümüdür.'] },
  ], [
    { tur: 'eslestir', genis: true, baslik: 'Cümle hangi bölümden?', yonerge: 'Cümlenin yanına giriş için a, gelişme için b, sonuç için c yaz.', ciftler: [
      ['Bir zamanlar küçük bir köyde Ali adında bir çoban yaşardı.', 'Giriş'],
      ['Birden gökyüzü karardı, şiddetli bir fırtına başladı.', 'Gelişme'],
      ['O günden sonra ikisi ayrılmaz dost oldular.', 'Sonuç'],
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Metnin en uzun bölümü genellikle gelişme bölümüdür.', true],
      ['Giriş bölümünde sorun çözülür.', false],
      ['Sonuç bölümünde olay tamamlanır.', true],
      ['“Bir varmış bir yokmuş” sözü genellikle sonuç bölümünde kullanılır.', false],
    ] },
    { tur: 'metin', genis: true, baslik: 'Yarım kalan hikâye', metin: [
      'Giriş: Deniz ile kardeşi Can, yaz tatilinde dedelerinin bahçeli evine gitti. Bahçede kocaman bir ceviz ağacı vardı.',
      'Gelişme: Bir gün Can ağaca tırmandı ama inemedi. Dal sallandıkça korkuyla bağırmaya başladı. Deniz ne yapacağını düşündü…',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Sonuç bölümünü sen yaz', sorular: [
      { s: 'Hikâyenin sonuç bölümünü yaz. Sorun nasıl çözüldü?', satir: 5, cevap: 'Örnek: Deniz hemen dedesini çağırdı. Dedesi merdiven getirdi, Can\'ı yavaşça indirdi. Can artık tek başına yüksek ağaçlara tırmanmayacağına söz verdi.' },
      { s: 'Hikâyeye bir başlık bul.', satir: 1, cevap: 'Örnek: Ceviz Ağacındaki Macera' },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['giriş', 'gelişme', 'sonuç', 'olay', 'kahraman', 'yer', 'zaman'] },
    { tur: 'bosluk', baslik: 'Hatırla', maddeler: ['Olayın kahramanlarına [kişiler] denir.', 'Olayın geçtiği yere [mekân] da denir.', 'Olayın ne zaman olduğu [zaman] ı gösterir.'] },
  ]],
};
