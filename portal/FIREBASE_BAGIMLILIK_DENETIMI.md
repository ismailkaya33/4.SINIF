# Firebase bağımlılık denetimi — 4/D

Ana dal dosyaları incelendi. **Firebase projesi henüz silinmemeli.**

| Ana dal dosyası | Firebase kullanımı | Güvenli karar |
|---|---|---|
| `index.html` | Firestore `announcements` okur; ana sayfada duyurular | Yeni özel duyuru servisi hazırlanıp doğrulanmadan değiştirme |
| `ogrenci/index.html` | Firebase Auth e-posta/şifre ve Firestore profil okuma | Yeni Apps Script öğrenci girişiyle farklıdır; önce gerçek öğrenci erişimi ve rotası doğrulanmalı |
| `ogretmen/index.html` | Firebase Google Auth, Firestore duyuru ekleme/silme, `attempts` okuma | Duyurular çalışıyorsa Firebase'e bağlıdır; aynı anda silme |
| `Matematik/kayipsayilar.html` | Anonim giriş ve `attempts` koleksiyonuna yazma | Canlı orijinal oyun korunmalı |
| `test/kayipsayilar.html` | Ayrı test sürümü Apps Script ebeveynine sonuç mesajı gönderir | Apps Script pilot raporuna bağlı test yolu |

## Geçiş sınırları

- Mevcut sitede 7 ders bölümü ve 50 etkinlik bağlantısı korunacak.
- Öğrenciler için **Apps Script + özel E-Tablo** veri yolu zaten MİSAFİR ile doğrulandı. Başka Firebase giriş hesabı açtırma.
- Öğretmen raporu ayrı, yalnız öğretmene açık Apps Script projesinde kalacak.
- Öğrenci verileri ve tablo kimlikleri, giriş kodları, tokenlar GitHub'a yüklenmeyecek.
- **Duyurular Firebase'den okunmaya devam ediyor.** Firebase kaldırılmadan önce alternatif öğretmen yazma + öğrenci okuma tasarımı ve yetki testi gerekir.
- Firebase `attempts` geçmişi özel E-Tabloya otomatik taşınmış değildir. İki sistemi tek rapor olarak göstermeyin.

## Sıradaki güvenli aşama
Ayrı Apps Script öğretmen projesinde, yalnız öğretmen hesabıyla duyuru oluşturma/düzenleme ve özel tablodan okuma; öğrenci projesinde ise yalnız doğrulanmış oturuma açık duyuru listeleme. Doğrulanmadan hiçbir gerçek duyuru/kayıt taşınmaz.
