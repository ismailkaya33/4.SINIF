# 4/D | Tek seferlik Apps Script kurulum paketi

Bu paket **iki ayrı** Apps Script projesine uygulanır. GitHub yalnız kaynak kodunu tutar; öğrenci verileri özel E-Tabloda kalır.

## A. ÖĞRENCİ — mevcut bağlı Apps Script projesi
| Apps Script adı | GitHub kaynağı | Durum |
| --- | --- | --- |
| `Kod.gs` | `portal/appsscript/Kod.gs` | Mevcut temel sürüm, güvenli sekme seçimi düzeltmesi |
| `GirisGuvenligi.gs` | `portal/appsscript/GirisGuvenligi.gs` | Mevcut giriş sınırı, ayrı taslak kullanılmaz |
| `OgrenciOturum.gs` | `portal/appsscript/OgrenciOturum.gs` | Mevcut oturum sunucu API'si |
| `OgrenciGiris.html` | `portal/appsscript/OgrenciGiris_Guncel.html` | Güncellenmiş sürüm; test edilmeden canlıya yükleme |
| `EtkinlikKayitDefteri.gs` | `portal/appsscript/EtkinlikKayitDefteri.gs` | Etkinlik izin listesi; sonuç kaydından önce yüklenmeli |
| `EtkinlikSonuclari.gs` | `portal/appsscript/EtkinlikSonuclari.gs` | Güncellenmiş doğrulama; öncesinde oyunla uçtan uca kontrol |
| `OgrenciDuyurulari.gs` | `portal/appsscript/OgrenciDuyurulari.gs` | Tarih doğrulama güncellemesi |
| `SonucDogrulamaTestleri.gs` | `portal/appsscript/SonucDogrulamaTestleri.gs` | İsteğe bağlı test; öğrenciler için işlev sunmaz |
| `GirisDenemeKoruma_Oneri.gs` | `portal/appsscript/GirisDenemeKoruma_Oneri.gs` | **YÜKLEME / ETKİNLEŞTİRME!** Mevcut giriş fonksiyonu henüz görülmedi |

**TAMAMLANDI:** Çalışan projedeki `Kod.gs`, `GirisGuvenligi.gs` ve `OgrenciOturum.gs` kaynakları öğretmen tarafından sağlandı ve GitHub hazırlık dalına kaydedildi. `Kod.gs` için kayıt sayfasının yanlış sekmeye düşmesini önleyen ek bir güvenlik düzeltmesi hazırlandı. `Kod_doGet_yonlendirme.gs` ikinci bir `doGet` olarak eklenmemeli. `EtkinlikOynat.html` eski alternatif oynatıcıdır; güncel giriş içindeki tam ekran iframe ile aynı anda devreye alınmamalı.

## B. ÖĞRETMEN — ayrı ve yalnız öğretmene özel Apps Script
| Apps Script adı | GitHub kaynağı |
| --- | --- |
| `Kod.gs` | `portal/ogretmen-rapor/OgretmenRapor.gs` |
| `OgretmenRapor.html` | `portal/ogretmen-rapor/OgretmenRapor.html` |
| `OgretmenDuyuruTaslak.gs` | `portal/ogretmen-rapor/OgretmenDuyuruTaslak.gs` |

Öğretmen projesinde ScriptProperties `OZEL_TABLO_ID` kendi özel tablona bağlı olmalıdır; GitHub'a gerçek değer eklenmez. Öğretmen kodları öğrenci projesine asla eklenmez.

## Tek kurulumdan önce
1. Öğrenci temel sunucu kodları kaynak olarak hazır. **Canlı Apps Script projelerinin sürüm/geri dönüş yedekleri** aktarım öncesinde ayrıca alınmalı.
2. Mevcut giriş güvenliği kodunda 5 dakikada aynı kod için 5 başarısız deneme ve toplam 80 deneme sınırı zaten var; alternatif `GirisDenemeKoruma_Oneri.gs` yüklenmeyecek.
3. Öğrenci projesinde tek `doGet` kaldığını ve aynı isimde fonksiyon çakışması olmadığını kontrol et.
4. Sonuç doğrulaması; gerçek pilot oyun sonucuyla, güvenli çıkış ve süresi biten token ile test edilmeli.
5. Öğretmen paneli yalnız **Yalnızca ben**. Öğrenci dağıtımının erişimi de öğretmen ayrıca onay verene kadar genişletilmeyecek.
6. Dağıtım sürümü değişmeden yalnız `/dev` test edilerek doğrulama yapılmalı. Öğrencilerin erişim yetkisini değiştirmek açık izin gerektirir.

## Gerçek durum
GitHub'daki kodlar hazırlık dalındadır ve çalışan Apps Script projelerine otomatik yüklenmez. **Paket henüz canlıya alınmaya hazır değildir**: gerçek Apps Script ortamında bütünleşik regresyon testleri ve aktarım öncesi yedek gereklidir.

## Korunanlar
GitHub Pages ana sayfası, orijinal oyun ve mevcut Firebase bağımlı özellikler değiştirilmez. Her iki Apps Script projesi birbirinden ayrı kalır.

## Son ek doğrulamalar (2026-11-01)
- `Kod.gs` yinelenen giriş kodunu ve boş öğrenci kimliğini reddeder.
- `OgrenciOturum.gs` yinelenen öğrenci numarası için kimlik döndürmez.
- Bu iki kontrol için 5 sahte veri senaryosu geçti; gerçek Google Apps Script testi değildir.
- Öğretmen duyurularının bitiş tarihi, `toISOString()` ile UTC gününe kaydırılmadan E-Tablo yerel tarihi olarak okunur.
- **Ayrı giriş limiti taslağı kurulmayacak**; çalışan `GirisGuvenligi.gs` kodu kullanılacak.

## Son paket bütünlüğü kontrolü — 1 Kasım 2026
- Öğrenci projesi 6 `.gs` kaynağı birlikte incelendi: 22 farklı fonksiyon, **fonksiyon adı çakışması yok**, birleşik JavaScript sözdizimi geçerli.
- Öğretmen projesinin `OgretmenRapor.gs` + `OgretmenDuyuruTaslak.gs` kaynakları incelendi: 6 farklı fonksiyon, **çakışma yok**, birleşik sözdizimi geçerli.
- Her iki projenin HTML JavaScript blokları ayrı ayrı sözdizimi kontrolünden geçti.
- Öğretmen, iki çalışan Apps Script projesinin yedeğini aldığını teyit etti. Bu teyit kaynak bazlıdır; yedekleri bağlantıdan ayrıca açıp doğrulamadık.
- Bu statik doğrulamalar canlı Apps Script fonksiyon çalıştırması ve web uygulaması regresyon testinin yerine geçmez.

### Son yükleme için karışıklığı önleyen kesin dosya listesi
**Öğrenci:** `Kod.gs`, `GirisGuvenligi.gs`, `OgrenciOturum.gs`, `EtkinlikKayitDefteri.gs`, `EtkinlikSonuclari.gs`, `OgrenciDuyurulari.gs` ve `OgrenciGiris.html` (GitHub'daki `OgrenciGiris_Guncel.html`). İsteğe bağlı test: `SonucDogrulamaTestleri.gs`. Mevcut başka işlevler varsa silinmez; öncesinde fark kontrolü gerekir.

**Öğretmen:** `Kod.gs` (GitHub'daki `OgretmenRapor.gs`), `OgretmenDuyuruTaslak.gs`, `OgretmenRapor.html`.

**Yüklenmeyecek eski/alternatifler:** `GirisDenemeKoruma_Oneri.gs`, `Kod_doGet_yonlendirme.gs`, `EtkinlikOynat.html`, `OgretmenRapor_Taslak.html`.

## Çoklu etkinlik takibi — yeni hazırlık (2026-11-01)
- `EtkinlikKayitDefteri.gs` ile takip edilebilir etkinliklerin sunucu izin listesi ayrıldı.
- `EtkinlikSonuclari.gs`, yalnız izin listesinde bulunan etkinlikleri kabul eder ve etkinlik başına `maxTotal` uygular.
- Mevcut pilot `mat-kayipsayilar` korunur. Kaydı olmayan diğer 50 etkinlik otomatik takip edilmiyor.
- Bu iki dosya **birlikte aktarılmalıdır**; tekini yüklemek sonuç kaydını bozar. Güncel sürüm henüz çalışan Apps Script'e aktarılmadı.
- 9 doğrulama testi bu iki modül birlikte yüklenmişken tekrar çalıştırıldı, 9/9 geçti.
