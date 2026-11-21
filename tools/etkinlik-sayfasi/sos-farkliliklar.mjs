// Defter notu: Sosyal/DefterNotlari/farkliliklarimizvesaygi.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Sosyal', baslik: 'Farklılıklarımız ve Farklılıklara Saygı',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kavramları tamamla', kutu: ['empati', 'saygı', 'ayrımcılık', 'farklılık', 'dezavantajlı'], maddeler: [
      'Birbirimizden farklı özelliklere sahip olmamıza [farklılık] denir.',
      'Kendimizi başka birinin yerine koyarak onun duygu ve düşüncelerini anlamaya çalışmaya [empati] denir.',
      'İnsanların farklı özelliklerini, düşüncelerini ve seçimlerini kabul edip onlara değer vermeye [saygı] denir.',
      'Bir kişiye özellikleri nedeniyle haksız ve farklı davranmaya [ayrımcılık] denir.',
      'Engelli, yoksul ya da kronik hastalığı olan bireyler günlük yaşamda zorluklarla karşılaşabilir; bu kişilere [dezavantajlı] bireyler denir.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Ben ve arkadaşım', yonerge: 'Kendini ve bir arkadaşını karşılaştır. Benzer ve farklı yönlerinizi yaz.', basliklar: ['', 'Ben', 'Arkadaşım'], genislik: ['24%', '38%', '38%'], satirlar: [
      ['**Sevdiği oyun**', '', ''], ['**Yeteneği**', '', ''], ['**Sevdiği yemek**', '', ''], ['**İlgi alanı**', '', ''],
    ], satirYuk: '9mm' },
    { tur: 'eslestir', genis: true, baslik: 'Empati kurarken', yonerge: 'Adımları sıraya koymak için kutulara 1–4 yaz.', ciftler: [
      ['Karşımızdakini dikkatle dinleriz.', '1'], ['Ne hissettiğini anlamaya çalışırız.', '2'], ['Kendimizi onun yerine koyarız.', '3'], ['Ona uygun davranır, gerekirse yardım ederiz.', '4'],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Doğru mu, yanlış mı davranış?', kelimeler: ['Tekerlekli sandalyedeki arkadaşı oyuna katmak', 'Farklı şiveyle konuşanla alay etmek', 'Yardım isteyene destek olmak', 'Yeni gelen öğrenciyi yalnız bırakmak', 'Farklı düşünceleri dinlemek', 'Birini giysileri yüzünden küçümsemek'], gruplar: [
      { ad: 'Saygılı davranış ✓', uyeler: ['Tekerlekli sandalyedeki arkadaşı oyuna katmak', 'Yardım isteyene destek olmak', 'Farklı düşünceleri dinlemek'] },
      { ad: 'Ayrımcılık ✗', uyeler: ['Farklı şiveyle konuşanla alay etmek', 'Yeni gelen öğrenciyi yalnız bırakmak', 'Birini giysileri yüzünden küçümsemek'] },
    ] },
  ], [
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Yeni Arkadaşımız', metin: [
      'Sınıfımıza Ahmet adında yeni bir öğrenci geldi. Ahmet işitme cihazı kullanıyordu. İlk gün bazı öğrenciler ona uzaktan baktı, kimse yanına oturmadı. Teneffüste Elif, Ahmet\'in yanına gitti. Yüzüne bakarak, yavaş ve açık konuştu. Ahmet resim yapmayı çok sevdiğini anlattı. Ertesi gün sınıf panosu için birlikte afiş hazırladılar. Afiş o kadar güzel oldu ki bütün sınıf Ahmet\'i tebrik etti.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'İlk gün Ahmet nasıl hissetmiş olabilir? Neden?', satir: 1, cevap: 'Yalnız, üzgün ya da dışlanmış; kimse yanına oturmadı.' },
      { s: 'Elif nasıl empati kurdu? Davranışlarından örnek ver.', satir: 2, cevap: 'Ahmet\'in yanına gitti, yüzüne bakarak yavaş ve açık konuştu, onu dinledi.' },
      { s: 'Bu metin bize hangi mesajı veriyor?', satir: 1, cevap: 'Farklılıklarımız bizi ayırmak için değil, birbirimizi tamamlamak içindir; herkes değerlidir.' },
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Farklı olmak, daha iyi ya da daha kötü olmak demektir.', false],
      ['Empati yapmak, karşımızdakiyle aynı düşünmek zorunda olmak demektir.', false],
      ['Engelli olmak bir insanın değersiz olduğu anlamına gelmez.', true],
      ['Dezavantajlı bireylere acıyarak değil, eşit ve saygılı davranmalıyız.', true],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Sen olsan ne yapardın?', sorular: [
      { s: 'Arkadaşın, sınıfa yeni gelen öğrencinin aksanıyla dalga geçiyor.', sec: ['Ben de gülerim', 'Arkadaşımı uyarır, yeni öğrenciyi yanıma çağırırım', 'Hiçbir şey yapmam'], d: 1, alt: true },
      { s: 'Takımına, koşamayan bir arkadaşın da katılmak istiyor.', sec: ['Onu da katabileceğimiz bir oyun seçeriz', 'Onu oyuna almayız', 'Oyunu bırakırız'], d: 0, alt: true },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Sınıf sözleşmesi', sorular: [
      { s: 'Sınıfımızda farklılıklara saygı için üç kural yaz.', satir: 3, cevap: 'Örnek: Kimseyle alay etmeyiz. Herkesi oyunlara katarız. Farklı düşünceleri dinleriz.' },
    ] },
  ]],
};
