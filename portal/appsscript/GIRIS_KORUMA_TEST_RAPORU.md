# Giriş koruması: doğrulama ve entegrasyon notu

## Test sonucu (1 Kasım 2026)
`GirisDenemeKoruma_Oneri.gs` fonksiyonları Apps Script servis taklitleriyle 6 ayrı senaryoda kontrol edildi: özel tuzun kurulması, ilk deneme, beş başarısız deneme, farklı kodların bağımsızlığı, sayacın sıfırlanması ve ScriptLock başarısızlığında hata. Altısı da geçti.

Bu **canlı Apps Script testi değildir**. Gerçek servislerin gecikmeleri, CacheService tahliyeleri ve eşzamanlı istek davranışları doğrulanmamıştır.

## Canlı sisteme geçiş koşulları
- Öğrenci projesindeki mevcut `GirisGuvenligi.gs` ve `ogrenciGirisiYap` kodu incelenmeden modül **entegre edilmemeli**.
- Kod bütünlüğü doğrulandığında ve öğretmen dağıtıma hazır olduğunda gizli ScriptProperties anahtarı `GIRIS_LIMIT_SALT` için `girisKorumaTuzuHazirla_` düzenleyiciden bir kez çalıştırılmalı. Tuz değeri loglanmamalı/yayımlanmamalı.
- Doğrulama başarısızlığında sayaç artırılmalı; limit dolduğunda giriş reddedilmeli; başarılı doğrulamada sayaç temizlenmeli. Bunlar halen mevcut `ogrenciGirisiYap` fonksiyonuna ekli değildir.
- Rate limit öncesinde kullanıcı kodu için biçim doğrulaması yapılmalı. Denemeler mümkünse hem kod bazında hem anonim toplam trafik açısından sınırlandırılmalı.
- Bu önlem **yalnızca aynı kod için** denemeleri azaltır; tüm kod alanını tarama riskini çözmez. Öğrenci kodu tek başına kimlik doğrulamak için yeterince uzun/rasgele değilse dağıtım açılmamalı.
- Tüm güvenlik servisleri yetkisiz durumda erişimi reddetmeli. Kodları, tokenları ve gerçek öğrencileri loga veya GitHub'a koyma.

## Çalışır test sınırı
Test edilmiş güvenlik garantisi: **hiçbiri canlı olarak doğrulanmadı**. Yalnızca modülün simüle edilmiş işlevleri test edildi. Öğrenci uygulaması hâlâ öğretmene özel dağıtım olarak korunmalı.
