// Defter notu: Insanhaklari/DefterNotlari/ih-hak-ihlali-1..2.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Insanhaklari', baslik: 'Haklarım Kısıtlanırsa',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['hak ihlali', 'doğaldır', 'Ben dili', 'güvendiğim bir yetişkine', 'kısıtlanması'], maddeler: [
      'Bir hakkın çiğnenmesine, ona saygı gösterilmemesine [hak ihlali] denir.',
      'Bir hakkı kullanmamızın engellenmesine ya da sınırlandırılmasına hakkın [kısıtlanması] denir.',
      'Hakkımız kısıtlanınca üzülmek, kızmak [doğaldır] .',
      'Duygularımızı kimseyi kırmadan anlatmanın yolu [Ben dili] dir.',
      'Sorun çözülmezse [güvendiğim bir yetişkine] başvururum.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Hangi hak kısıtlanıyor?', basliklar: ['Durum', 'Kısıtlanan hak'], genislik: ['65%', '35%'], satirlar: [
      ['Teneffüste bir grup, Ali\'yi her gün oyuna almıyor.', '[oyun oynama hakkı]'], ['Ayşe\'nin söz hakkı her seferinde arkadaşları tarafından kesiliyor.', '[düşüncesini ifade etme hakkı]'], ['Bir öğrencinin çantası izinsiz karıştırılıyor.', '[özel hayatın gizliliği]'], ['Bir çocuk okula gönderilmiyor, çalıştırılıyor.', '[eğitim hakkı]'], ['Sırada bekleyen çocuğun önüne geçiliyor.', '[eşit davranılma hakkı]'],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Sen dili mi, Ben dili mi?', yonerge: 'Ben dili duyguyu ve isteği söyler; Sen dili suçlar.', kelimeler: ['Sen hep sıramı alıyorsun, çok kabasın!', 'Sözüm kesilince üzülüyorum, bitirmeme izin verir misin?', 'Kalemimi sorulmadan alınca rahatsız oluyorum, lütfen önce sor.', 'Senin yüzünden kaybettik!'], gruplar: [
      { ad: 'Ben dili ✓', uyeler: ['Sözüm kesilince üzülüyorum, bitirmeme izin verir misin?', 'Kalemimi sorulmadan alınca rahatsız oluyorum, lütfen önce sor.'] },
      { ad: 'Sen dili ✗', uyeler: ['Sen hep sıramı alıyorsun, çok kabasın!', 'Senin yüzünden kaybettik!'] },
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi bir hak ihlalidir?', sec: ['Sınıfta söz alarak konuşmak', 'Bir arkadaşın günlüğünü izinsiz okumak', 'Oyunda sırayla oynamak'], d: 1 }, { s: 'Hakkın kısıtlandığını düşündüğünde ilk ne yapmalısın?', sec: ['Sakin kalıp duygunu Ben diliyle söylemek', 'Bağırıp kavga etmek', 'Sessizce ağlamak ve kimseye söylememek'], d: 0, alt: true }] },
  ], [
    { tur: 'yaz', genis: true, baslik: 'Ben diliyle söyle', yonerge: 'Formül: Ben … hissediyorum, çünkü … . … istiyorum.', sorular: [
      { s: 'Arkadaşın oyunda kuralları sürekli kendine göre değiştiriyor.', satir: 2, cevap: 'Örnek: Kurallar değişince haksızlığa uğramış hissediyorum, çünkü oyun adil olmuyor. Baştaki kurallarla oynamak istiyorum.' },
      { s: 'Biri senin resmini izinsiz alıp panoya kendi adıyla asmış.', satir: 2, cevap: 'Örnek: Resmimi kendi adınla görünce çok üzüldüm, çünkü onu ben yaptım. Adımın yazılmasını istiyorum.' },
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Kime başvururum?', ciftler: [
      ['Okulda bir arkadaşım sürekli alay ediliyor.', 'Öğretmenime ve rehber öğretmenime'], ['Evde çözemediğim bir sorun yaşıyorum.', 'Annem, babam ya da güvendiğim bir aile büyüğüme'], ['Tehlikedeyim, acil yardım gerekiyor.', '112\'ye'], ['Okul bahçesinde bir sorun yaşanıyor, öğretmenim yakında değil.', 'Nöbetçi öğretmene ya da okul idaresine'],
    ], fazla: ['Hiç kimseye söylemem'] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Hakkım kısıtlandığında bağırıp kavga etmeliyim.', false],
      ['Başkalarının haklarına saygı göstermek benim de sorumluluğumdur.', true],
      ['Haksızlığa uğrayan bir arkadaşıma destek olabilirim.', true],
      ['Bir sorunu büyüklere anlatmak “ispiyonculuk”tur, yapılmamalıdır.', false],
    ] },
    { tur: 'tablo', genis: true, baslik: 'Çözümde benim sorumluluğum', basliklar: ['Durum', 'Benim yapabileceğim'], genislik: ['50%', '50%'], satirlar: [
      ['Sınıfta biri dışlanıyor.', '[Onu oyuna/gruba davet ederim, öğretmene söylerim.]'], ['Bir arkadaşım sıramı alıyor.', '[Sakin kalır, Ben diliyle söylerim.]'], ['Arkadaşlarım birini taklit edip gülüyor.', '[Katılmam, onları uyarırım.]'],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Söz veriyorum', sorular: [
      { s: 'Haklara saygılı bir sınıf için kendine iki söz ver.', satir: 2, cevap: 'Örnek: Kimsenin sözünü kesmeyeceğim. Kimseyi oyundan dışlamayacağım.' },
    ] },
  ]],
};
