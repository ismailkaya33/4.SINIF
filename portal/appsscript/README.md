# 4/D | Öğrenci Apps Script kaynakları

**Geçerli dağıtım rehberi:** [Tek seferlik kurulum paketi](../TEK_SEFERLIK_KURULUM_PAKETI.md).

## Doğrulanmış pilot davranışı
- MİSAFİR girişi ve güvenli çıkış, öğretmen tarafından canlı `/dev` ortamında sınandı.
- Matematik Kayıp Sayılar oyunu sonuç yazmayı başardı.
- Öğretmen duyuruları: TASLAK → YAYINDA → ARSIV ve öğrenci görünürlüğü test edildi.
- Öğretmen raporu ayrı projede çalışıyor.

## GitHub'da hazırlanan, henüz canlı projeye aktarılmamış güncellemeler
- `OgrenciGiris_Guncel.html`: gecikmiş asenkron yanıt koruması ve oyun ekranı sıfırlama.
- `EtkinlikSonuclari.gs`: toplam sorular ve doğru+yanlış tutarlılığı.
- `OgrenciDuyurulari.gs`: geçersiz son kullanma tarihini reddetme.
- `SonucDogrulamaTestleri.gs`: dokuz veri doğrulama testi.
- `GirisDenemeKoruma_Oneri.gs`: **henüz canlıya alınmayacak** bağımsız giriş denemesi sınırı taslağı. Mevcut `ogrenciGirisiYap` koduyla bütünleştirilmiş değildir.

## Bilinen sınırlamalar
- Mevcut `Kod.gs`, `GirisGuvenligi.gs`, `OgrenciOturum.gs` dosyalarının temel kaynakları henüz bu dalda yok.
- Google Apps Script'in gerçek CacheService, LockService, HtmlService davranışı yerel JavaScript testlerinden farklı olabilir.
- Koddan üretilmiş oyun skorları öğretim geri bildirimi içindir, güvenli sınav kaydı değildir.
- Eski 50 etkinliğin yalnız pilot Matematik oyunu takip altyapısına bağlıdır.
- Önce tüm dosyaları tek pakette kontrol edip `/dev` ortamında test et, ardından öğretmen onayıyla yeni dağıtım sürümüne geç.
- Gerçek öğrenci kodları, isimler, tokenlar ve özel tablo kimlikleri GitHub'a yazılmaz.
