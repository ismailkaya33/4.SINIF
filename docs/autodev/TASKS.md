# TASKS
## ONAYLI
## ONERI
- Güvenlik taraması (19 Kasım) küçük notları: (1) `veliRaporuEslesmeKontrolu` ve `sonucDogrulamaTestiniCalistir` öğrenci projesinde herkese açık işlev; veri döndürmüyorlar (yalnız günlük/test) ama sonuna `_` eklenip gizlenebilir (Apps Script'te `_` ile biten işlev tarayıcıdan çağrılamaz). risk: orta (öğretmen düzenleyiciden çalıştırma yolunu değiştirir; portal dalı, onay dalı gerekir), küçük.
- `GirisDenemeKoruma_Oneri.gs` kullanılmıyor (gerçek koruma `GirisGuvenligi.gs`'te çalışıyor); karışıklık olmasın diye silinebilir/arşive alınabilir. risk: düşük, küçük.
- Öğretmen paneli CSP/çerçeve ayarı yok; Apps Script bunu sınırlı destekler, şimdilik gerek yok.
(İlk tarama henüz yapılmadı; sonraki çalışmada 15-25 öneri yazılacak.)
- Panel bölümleri şimdilik "ilk açık, diğerleri kapalı"; öğretmen açık kalma tercihi isterse hatırlama (localStorage) eklenebilir. risk: düşük, küçük.
- Site (c taramasından kalanlar, düşük öncelik): Insanhaklari/farkliyasamlar.html'de 25 düğme 30 px'den kısa; Fen/besinlerdegerlendirme.html ve besinakademisi.html'de etiketsiz giriş kutuları (bulmaca harf kutuları); Sosyal/kurtulus.html'de 360 px'de 5 px taşma (ses düğmesi). risk: düşük, küçük.
- Site: Turkce/sozavcıları.html 3,8 MB ve birkaç defter notu PNG'si 1,6–2,4 MB (icerik-denetle uyarısı); görseller küçültülürse telefonda hızlı açılır. risk: orta (dosya adı değişmemeli).
## BITTI
- [x] P3 | güvenlik | d. Salt okuma güvenlik taraması | TAMAM (2026-11-19): ciddi açık bulunmadı, 3 küçük öneri ONERI'de.
- [x] P1 | panel | a. Panel uzun listeleri açılır bölümlere ayrıldı | TAMAM (2026-11-18)
- [x] P1 | panel | b. Öğrenci takip özet kartları (geride kalanlar, doğru oranı, son etkinlik), salt okuma | TAMAM (2026-11-18)
- [x] P2 | site | c. Mobil/erişilebilirlik taraması (84 sayfa, 360 px) | TAMAM (2026-11-18): 2 düzeltme claude/site-gelistirme dalında (besinlerdegerlendirme görsel taşması, madenler2 alt metin).
