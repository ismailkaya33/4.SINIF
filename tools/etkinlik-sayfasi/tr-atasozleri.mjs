// Defter notu: Turkce/DefterNotlari/atasozleri.png — kazanım: T.4.3.11 (tools/defter-kazanim.json)
export default {
  ders: 'Turkce', baslik: 'Atasözleri',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Atasözü nedir?', kutu: ['deneyimler', 'öğüt', 'kalıplaşmış', 'belli değildir', 'kısa'], maddeler: [
      'Atasözleri, atalarımızın uzun [deneyimler] sonucu ulaştığı düşünceleri anlatır.',
      'Atasözleri genellikle [öğüt] verir, yol gösterir.',
      'Atasözleri [kalıplaşmış] sözlerdir; kelimeleri değiştirilemez, yerleri değiştirilemez.',
      'Atasözlerini kimin söylediği [belli değildir] .',
      'Atasözleri [kısa] ve özlüdür; az sözle çok şey anlatır.',
    ] },
    { tur: 'bosluk', baslik: 'Atasözünü tamamla', maddeler: [
      'Damlaya damlaya [göl] olur.', 'Ağaç yaş iken [eğilir] .', 'Bugünün işini [yarına] bırakma.', 'Bir elin nesi var, iki elin [sesi] var.', 'Tatlı dil yılanı [deliğinden] çıkarır.', 'İşleyen demir [ışıldar] .', 'Sakla samanı, gelir [zamanı] .',
    ] },
    { tur: 'eslestir', baslik: 'Atasözünü anlamıyla eşleştir', ciftler: [
      ['Damlaya damlaya göl olur.', 'Küçük birikimler zamanla büyür.'],
      ['Üzüm üzüme baka baka kararır.', 'İnsan arkadaşından etkilenir.'],
      ['İşleyen demir ışıldar.', 'Çalışan kişi gelişir, parlar.'],
      ['Komşu komşunun külüne muhtaçtır.', 'Komşular birbirine her zaman gerekir.'],
      ['Ağaç yaş iken eğilir.', 'Eğitim küçük yaşta verilmelidir.'],
    ], fazla: ['Çok konuşan çok yanılır.'] },
    { tur: 'coktan', genis: true, baslik: 'Duruma uygun atasözü', sorular: [
      { s: 'Ece her gün kumbarasına biraz para attı. Yıl sonunda bisiklet alacak kadar parası oldu.', sec: ['Damlaya damlaya göl olur.', 'Ağaç yaş iken eğilir.', 'Tatlı dil yılanı deliğinden çıkarır.'], d: 0 },
      { s: 'Sınıfça el ele verdik, okul bahçesini bir saatte temizledik.', sec: ['Sakla samanı, gelir zamanı.', 'Bir elin nesi var, iki elin sesi var.', 'İşleyen demir ışıldar.'], d: 1 },
      { s: 'Kerem ödevini hep son güne bıraktı ve yetiştiremedi.', sec: ['Üzüm üzüme baka baka kararır.', 'Komşu komşunun külüne muhtaçtır.', 'Bugünün işini yarına bırakma.'], d: 2 },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Anlamını açıkla', sorular: [{ s: 'Sakla samanı, gelir zamanı.', satir: 1, cevap: 'Gereksiz görünen bir şey bir gün işe yarayabilir; hemen atmamalıyız.' }, { s: 'Tatlı dil yılanı deliğinden çıkarır.', satir: 1, cevap: 'Güzel ve kibar konuşmakla en zor işler bile başarılır.' }, { s: 'Bir elin nesi var, iki elin sesi var.', satir: 1, cevap: 'İş birliği yapılınca işler daha kolay başarılır.' }] },
  ], [
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['“Ağaç yaşken eğilir.” yerine “Fidan küçükken eğilir.” dersek yine atasözü olur.', false],
      ['Atasözleri genellikle öğüt veren sözlerdir.', true],
      ['Atasözlerinin hepsi gerçek anlamlıdır.', false],
      ['Atasözlerini söyleyen kişinin adı bellidir.', false],
      ['“Damlaya damlaya göl olur.” sözü sabırlı ve düzenli olmayı öğütler.', true],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Atasözü mü, deyim mi?', yonerge: 'Atasözleri yargı bildirir, öğüt verir; deyimler bir durumu anlatır, çoğu “-mak/-mek” ile biter.', kelimeler: ['göz atmak', 'Sabreden derviş muradına ermiş.', 'kulak vermek', 'Tatlı dil yılanı deliğinden çıkarır.', 'etekleri zil çalmak', 'Çok bilen çok yanılır.'], gruplar: [
      { ad: 'Atasözü', uyeler: ['Sabreden derviş muradına ermiş.', 'Tatlı dil yılanı deliğinden çıkarır.', 'Çok bilen çok yanılır.'] },
      { ad: 'Deyim', uyeler: ['göz atmak', 'kulak vermek', 'etekleri zil çalmak'] },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Karınca ile Ağustos Böceği', metin: [
      'Yaz boyunca karınca sıcakta çalıştı, yuvasına buğday taşıdı. Ağustos böceği ise ağacın gölgesinde şarkı söyledi, “Kış daha çok uzak!” diyerek güldü. Kış gelince her yer karla kaplandı. Aç kalan ağustos böceği karıncanın kapısını çaldı. Karınca ona biraz buğday verdi ve “Gelecek yaz sen de çalış.” dedi.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'Bu hikâyeye en uygun atasözü hangisidir? Neden?', satir: 2, cevap: 'Sakla samanı, gelir zamanı. / İşleyen demir ışıldar. Karınca çalışıp biriktirdiği için kışın aç kalmadı.' },
      { s: 'Sen olsan ağustos böceğine hangi atasözüyle öğüt verirdin?', satir: 1, cevap: 'Bugünün işini yarına bırakma.' },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', yonerge: 'Atasözlerindeki kelimeleri bul.', boyut: 10, kelimeler: ['damla', 'göl', 'ağaç', 'demir', 'üzüm', 'komşu', 'saman'] },
    { tur: 'yaz', baslik: 'Hikâyeni yaz', sorular: [
      { s: 'Seçtiğin bir atasözünü anlatan 3–4 cümlelik kısa bir olay yaz.', satir: 6, cevap: 'Öğrencinin kendi cevabı; olay atasözünün anlamıyla uyumlu olmalı.' },
    ] },
  ]],
};
