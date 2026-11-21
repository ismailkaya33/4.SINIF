// Defter notu: Turkce/DefterNotlari/tr-bilgi-kaynagi-1..2.png — kazanım kodu doğrulanmalı
export default {
  ders: 'Turkce', baslik: 'Bilgi Kaynağı Güvenilir mi?',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['bilgi kaynağı', 'güvenilir', 'yazarı', 'güncel', 'karşılaştırmalıyız'], maddeler: [
      'Bir konuda bilgi edinmek için başvurduğumuz kitap, ansiklopedi, sözlük, internet sitesi ve uzman kişilere [bilgi kaynağı] denir.',
      'Doğru bilgi veren, kim tarafından hazırlandığı belli olan kaynaklar [güvenilir] kaynaktır.',
      'Bir kaynağın [yazarı] ya da hazırlayan kurumu belli olmalıdır.',
      'Bilgi [güncel] olmalıdır; tarihine bakarız.',
      'Bir bilgiyi en az iki farklı kaynakla [karşılaştırmalıyız] .',
    ] },
    { tur: 'eslestir', genis: true, baslik: 'Hangi kaynağa başvurursun?', ciftler: [
      ['Bir kelimenin anlamını ve yazılışını öğrenmek', 'Türkçe Sözlük'], ['Bir ilin nüfusunu öğrenmek', 'Resmî kurumun (TÜİK) internet sitesi'], ['Dişlerimin neden ağrıdığını öğrenmek', 'Diş hekimi'],
      ['Yarın hava nasıl olacak, öğrenmek', 'Meteoroloji Genel Müdürlüğü'], ['Bir hayvanın yaşam alanını öğrenmek', 'Çocuk ansiklopedisi'],
    ], fazla: ['Tanımadığım birinin sosyal medya paylaşımı'] },
    { tur: 'tablo', genis: true, baslik: 'Güven kontrol listesi', yonerge: 'Bir internet sitesine bakarken sorulacak soruları tamamla.', basliklar: ['Soru', 'Neden önemli?'], genislik: ['45%', '55%'], satirlar: [
      ['Yazarı ya da kurumu belli mi?', '[Kimin yazdığını bilirsek bilginin kaynağını anlarız.]'], ['Bilgi ne zaman yazılmış?', '[Eski bilgi değişmiş olabilir.]'], ['Başka kaynaklarla aynı mı?', '[Farklı kaynaklar doğruluyorsa bilgi daha güvenilirdir.]'], ['Reklam ya da satış amacı var mı?', '[Satış amacı olan bilgi abartılı olabilir.]'],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi bir bilginin güvenilir olduğunu gösterir?', sec: ['Çok renkli bir sitede yazması', 'Resmî bir kurumun sitesinde yazması', 'Arkadaşımın duyduğunu söylemesi'], d: 1 }, { s: '“Bu haberi hemen 10 kişiye gönder!” diyen bir mesaj gelirse ne yapmalıyız?', sec: ['Hemen herkese göndeririz', 'Bir büyüğümüze danışır, paylaşmayız', 'Mesajdaki bağlantıya tıklarız'], d: 1 }, { s: 'Hangisi bir bilgi kaynağı değildir?', sec: ['Sözlük', 'Ansiklopedi', 'Silgi'], d: 2 }] },
  ], [
    { tur: 'siniflandir', genis: true, baslik: 'Güvenilir mi, şüpheli mi?', kelimeler: ['Sağlık Bakanlığının sitesindeki aşı bilgisi', '“Bu ilacı içen 1 günde 10 kilo verir!” reklamı', 'Okul kütüphanesindeki ansiklopedi', 'Kimin yazdığı belli olmayan bir mesaj zinciri', 'Fen kitabımızdaki bilgi', '“Hemen paylaş, yoksa başına kötü şey gelir!” yazısı'], gruplar: [
      { ad: 'Güvenilir ✓', uyeler: ['Sağlık Bakanlığının sitesindeki aşı bilgisi', 'Okul kütüphanesindeki ansiklopedi', 'Fen kitabımızdaki bilgi'] },
      { ad: 'Şüpheli ✗', uyeler: ['“Bu ilacı içen 1 günde 10 kilo verir!” reklamı', 'Kimin yazdığı belli olmayan bir mesaj zinciri', '“Hemen paylaş, yoksa başına kötü şey gelir!” yazısı'] },
    ] },
    { tur: 'metin', genis: true, baslik: 'Okuyalım: Zehra\'nın Ödevi', metin: [
      'Zehra “Yunuslar” ile ilgili bir ödev hazırlıyordu. İnternette karşısına çıkan ilk sitede “Yunuslar balıktır ve suyun altında nefes alır.” yazıyordu. Sitenin yazarı belli değildi ve sayfa reklamlarla doluydu. Zehra bilgiyi hemen yazmadı. Okul kütüphanesinden bir hayvanlar ansiklopedisi aldı. Ansiklopedide yunusların memeli olduğunu ve nefes almak için su yüzeyine çıktığını okudu. Öğretmenine de sorarak bilgisini doğruladı.',
    ] },
    { tur: 'yaz', genis: true, baslik: 'Metne göre cevapla', sorular: [
      { s: 'İlk sitenin güvenilir olmadığını gösteren iki ipucu yaz.', satir: 1, cevap: 'Yazarı belli değildi; sayfa reklamlarla doluydu (ve bilgi yanlıştı).' },
      { s: 'Zehra bilgiyi nasıl doğruladı?', satir: 1, cevap: 'Ansiklopediden okudu ve öğretmenine sordu; iki kaynakla karşılaştırdı.' },
      { s: 'Sen Zehra\'nın yerinde olsan başka hangi kaynağa başvururdun?', satir: 1, cevap: 'Örnek: Bir akvaryum/hayvanat bahçesinin resmî sitesi, fen kitabı, bir biyolog.' },
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['İnternetteki her bilgi doğrudur.', false],
      ['Çok kişinin paylaştığı bir bilgi mutlaka doğrudur.', false],
      ['Bilgiyi kullanırken kaynağını belirtmeliyiz.', true],
      ['Emin olmadığımız bir bilgiyi paylaşmadan önce araştırmalıyız.', true],
    ] },
    { tur: 'yaz', genis: true, baslik: 'Araştır', sorular: [
      { s: 'Merak ettiğin bir konuyu yaz. Bu konuda başvuracağın iki güvenilir kaynağı ve nedenini yaz.', satir: 3, cevap: 'Öğrencinin kendi cevabı; kaynaklar güvenilirlik ölçütlerine uymalı.' },
    ] },
  ]],
};
