# Sonuç Kaydı — Apps Script kuruluma hazır dosya

Dosya: `EtkinlikSonuclari.gs`. Bu dosya şu an **GitHub'daki hazırlık dalındadır**; Apps Script uygulamasına otomatik yüklenmemiştir.

**Bağımlılık:** Mevcut Apps Script'te `oturumKaydi_(token)` ve `kayitNoIle_(no)` işlevleri çalışmalıdır. Bu modül **mevcut giriş/çıkış fonksiyonlarını değiştirmez**.

### Yapılanlar
- Sonuç için izinli etkinlik ve sayısal alan doğrulaması.
- Oturum token'ı ile **sunucu tarafında** öğrenci numarası bulunması.
- `ETKINLIK_SONUCLARI` özel e-tablo sayfasına öğrenci sonucu kaydı.
- Aynı öğrenci + etkinlik + `attemptId` için tekrar kaydın atlanması.
- Token ve giriş kodunun sonuç tablosuna kaydedilmemesi.

### Bilinmesi gerekenler
- Kullanıcı oyunun JavaScript'ini değiştirerek yüksek bir skor gönderebilir. Bu kayıtlar yalnızca biçimsel olmayan öğretim geri bildirimi içindir.
- Buradaki `attemptId` oyunda bir kez üretilmelidir; `crypto.randomUUID()` ya da güvenilir eşdeğeri kullanılmalı. Giriş kodu değildir.
- `google.script.run.etkinlikSonucuKaydet(token, veri)` yalnız Apps Script HTML sayfasından çalışır; `github.io` için doğrudan çalışmaz.
- Sunucuda deneme başına/öğrenci başına hız sınırı ve etkinlik cevap anahtarı doğrulaması henüz tamamlanmadı. **Öğrenci erişimini açma.**
- Öğretmen paneli hâlâ Firebase'deki deneme kayıtlarını görür; Apps Script sonuçları henüz bu panele bağlanmaz.
- Kazanım kodunun ders programına göre öğretmen tarafından doğrulanması gerekir.

### Deneme verisi (yalnız geçerli oturum token'ıyla Apps Script içinde)
```js
const veri = {
  activityId: 'mat-kayipsayilar',
  attemptId: 'deneme_20261101_00001',
  correct: 8, wrong: 2, total: 10,
  wrongAttempts: 3, firstTry: 7, durationSeconds: 312
};
// google.script.run.etkinlikSonucuKaydet(token, veri)
```

Gerçek öğrenci bilgilerini veya token'ı GitHub'a koymayın.
