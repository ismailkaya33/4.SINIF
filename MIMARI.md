# 4/D Sınıf Portalı — Nasıl Çalışıyor? (Basit Anlatım)

Bu belge, portalın parçalarını kod bilmeyen birinin de anlayacağı şekilde anlatır.
İleride bir mobil uygulama ya da yeni bir site yapılırsa, buradaki kurallara uyulursa
mevcut etkinlikler ve öğrenci kayıtları olduğu gibi kullanılabilir.

## 1. Üç ana parça

| Parça | Nerede durur? | Ne işe yarar? | Benzetme |
|---|---|---|---|
| **Etkinlik sitesi** | GitHub → `main` dalı → `ismailkaya33.github.io/4.SINIF` | Oyunlar, testler, defter notları | Kütüphanedeki kitaplar |
| **Öğrenci portalı** | Google Apps Script (öğrenci projesi) | Öğrenci kodu ile giriş, etkinliği açma, sonucu kaydetme | Kütüphanenin giriş kapısı ve kayıt defteri |
| **Öğretmen raporu** | Google Apps Script (ayrı, öğretmene özel proje) | Sonuçları tablo halinde öğretmene gösterir | Öğretmenin not defteri |

Bütün kayıtlar öğretmenin özel **Google E-Tablosu**nda durur:

| Sayfa (sekme) | İçinde ne var? |
|---|---|
| `Sayfa1` | Öğrenci listesi ve giriş kodları (`Tur=TEST` olanlar raporda sayılmaz) |
| `ETKINLIK_SONUCLARI` | Her bitirilen etkinlik için bir satır: doğru, yanlış, süre… |
| `ETKINLIK_SORU_SONUCLARI` | Soru soru cevaplar (şimdilik yalnız Fen Besinler değerlendirmesi, `4d:question-answer` mesajıyla) |
| `ETKINLIK_TAMAMLAMA` | Öğrencinin “bitirdim” beyanları |
| `DEFTER_TAMAMLAMA` | “Defter notunu yazdım” işaretleri |
| `OTURUMLAR` | Açık oturumlar (anahtar özetli saklanır, 7 gün) |
| `VELI_RAPORLARI` | Aylık ClassDojo özeti; öğrenci yalnız kendi `YAYINDA` satırını görür |
| `AYIN_YILDIZLARI` | Ayın Yıldızları ve Onur Listesi |
| Duyuru ve anket sayfaları | Öğretmenin duyuruları (TASLAK → YAYINDA → ARŞİV) ve anket yanıtları |

## 2. Bir etkinliğin sonucu öğretmene nasıl ulaşır?

1. Öğrenci portala kodu ile girer.
2. Takipli bir etkinliğe dokunur; etkinlik portalın **içinde** bir pencerede açılır.
3. Etkinlik bitince portala kısa bir **mesaj** gönderir (aşağıdaki “sonuç mesajı”).
4. Portal mesajı kontrol eder ve Google tablosuna yazar.
5. Öğretmen raporu tabloyu okuyup gösterir.

Etkinlik doğrudan tabloya yazamaz; her zaman portal üzerinden geçer. Bu, öğrenci
bilgilerinin güvenli kalmasını sağlar.

### Sonuç mesajı (her etkinlik aynı biçimi kullanır)

```js
window.parent.postMessage({
  type: '4d:activity-finished', // sabit
  schemaVersion: 1,             // sabit
  activityId: 'tur-ikilemeler', // etkinliğin kimliği (katalogdaki "id")
  attemptId: 'ik_…',            // her oynayışta yeni, 12-80 harf/rakam
  correct: 16, wrong: 0, total: 16, // correct + wrong = total olmalı
  wrongAttempts: 4,             // toplam yanlış deneme sayısı
  firstTry: 12,                 // ilk denemede doğru sayısı (correct'ten büyük olamaz)
  durationSeconds: 300          // süre (en fazla 1 gün)
}, '*');
```

Kurallar: mesaj **oyun sonunda bir kez** gönderilir; “Yeniden oyna” yeni bir `attemptId`
ile yeni bir mesaj üretir.

## 3. Etkinlik listesi tek yerde: `portal/etkinlik-kayitlari.json`

(`hazirlik/kazanim-takibi-20261101` dalında)

Bir etkinliği takibe almak için:

1. Etkinliğin oyun sonunda yukarıdaki mesajı gönderdiğinden emin olun.
2. `portal/etkinlik-kayitlari.json` dosyasındaki `otomatikSonuc` listesine bir satır ekleyin.
3. `node tools/katalog-esitle.mjs` komutunu çalıştırın. Bu komut sunucu izin listesini,
   öğrenci portalını ve öğretmen raporunu kendiliğinden günceller.
4. Değişikliği GitHub'a gönderin; GitHub Actions kontrolleri çalıştırır ve portalı yayımlar.

Kontroller listeyle kod arasında uyumsuzluk görürse yayını durdurur.

## 4. Telefona kurulum (PWA)

Site artık “uygulama gibi” kurulabilir:

- Android/Chrome: `ismailkaya33.github.io/4.SINIF/uygulama.html` → “Bu portalı telefonuma kur”.
- iPhone/iPad: Safari → Paylaş → “Ana Ekrana Ekle”.

Dosyalar: `manifest.json` (uygulamanın adı ve simgesi), `sw.js` (küçük yardımcı),
`uygulama.html` (açılış ekranı), `cevrimdisi.html` (internet yok uyarısı), `uygulama/` (simgeler).
`sw.js` etkinlik sayfalarını saklamaz; öğrenciler her zaman en güncel etkinliği görür.

## 5. İleride mobil uygulama ya da yeni site yapılırsa

| Adım | Ne zaman? | Not |
|---|---|---|
| Kurulabilir site (PWA) | **Şimdi var** | Mağaza gerekmez, güncelleme anında gelir |
| Mağaza uygulaması | Okul/veli gerçekten isterse | Aynı site Capacitor ile paketlenir, yeniden yazılmaz |
| Yeni sunucu (Firebase/Supabase) | Birden çok sınıf, bildirim, anlık panel gerekirse | Sonuç mesajı ve katalog biçimi aynı kalırsa etkinlikler değişmez |

Değişmemesi gereken iki şey: **sonuç mesajının biçimi** ve **etkinlik kataloğu**.
Bunlar korunduğu sürece arka taraf (Google, Firebase…) değişse bile etkinliklere dokunmak gerekmez.

## 6. Güvenlik ve çocuk verisi

- Öğrenci adı ve kodları yalnız öğretmenin özel tablosunda durur; GitHub'a konmaz.
- Öğretmen raporu ayrı ve öğretmene özel projedir; öğrencilerle paylaşılmaz.
- Yanlış giriş sınırı canlıda `GirisGuvenligi.gs` ile çalışır: aynı yanlış kod 5 kez ya da tüm portalda
  5 dakikada 60 yanlış deneme → 5 dakika bekleme. Başarılı girişler sayılmaz. (`GirisDenemeKoruma_Oneri.gs` eski
  taslaktır, yayına gönderilmez.)
- Öğretmen raporunun gizliliği Apps Script'teki dağıtım ayarına bağlıdır: **Erişim = Yalnızca ben** olmalı.
- Soru bazlı `4d:item-result` mesajı portalda henüz kaydedilmez (yalnız Fen Besinler ayrı mesajla kaydedilir).
- Mobil uygulamaya geçmeden önce: tahmin edilmesi zor giriş kodları ve velilere KVKK aydınlatma metni.

## 6.1 Bir değişiklik bozuk çıkarsa geri alma

- **Etkinlik sitesi (`main`):** bozuk commit `git revert` ile geri alınıp gönderilir; birkaç dakikada eski hali yayında.
- **Portal dalı:** aynı şekilde `git revert` + gönderim; GitHub Actions önceki kodu canlıya geri yükler.
  Acil durumda öğretmen Apps Script'te Dağıt → Dağıtımları yönet → mevcut dağıtımı düzenle → önceki sürümü seçer
  (adres değişmez).

## 7. Hangi dal ne için?

| Dal | İçerik | Yayın |
|---|---|---|
| `main` | Etkinlik sitesi | Her değişiklik birkaç dakikada GitHub Pages'te yayında |
| `hazirlik/kazanim-takibi-20261101` | Öğrenci portalı + öğretmen raporu kaynakları | Bu dala gönderilen portal değişikliği **otomatik olarak canlıya** çıkar |
| `yedek/…`, `backup/…` | Eski hallerin yedekleri | Yayın yok |
