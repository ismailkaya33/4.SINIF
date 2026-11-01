# 4/D | Tek seferlik Apps Script kurulum paketi

Bu paket **iki ayrı** Apps Script projesine uygulanır. GitHub yalnız kaynak kodunu tutar; öğrenci verileri özel E-Tabloda kalır.

## A. ÖĞRENCİ — mevcut bağlı Apps Script projesi
| Apps Script adı | GitHub kaynağı | Durum |
| --- | --- | --- |
| `OgrenciGiris.html` | `portal/appsscript/OgrenciGiris_Guncel.html` | Güncellenmiş sürüm; test edilmeden canlıya yükleme |
| `EtkinlikSonuclari.gs` | `portal/appsscript/EtkinlikSonuclari.gs` | Güncellenmiş doğrulama; öncesinde oyunla uçtan uca kontrol |
| `OgrenciDuyurulari.gs` | `portal/appsscript/OgrenciDuyurulari.gs` | Tarih doğrulama güncellemesi |
| `SonucDogrulamaTestleri.gs` | `portal/appsscript/SonucDogrulamaTestleri.gs` | İsteğe bağlı test; öğrenciler için işlev sunmaz |
| `GirisDenemeKoruma_Oneri.gs` | `portal/appsscript/GirisDenemeKoruma_Oneri.gs` | **YÜKLEME / ETKİNLEŞTİRME!** Mevcut giriş fonksiyonu henüz görülmedi |

**KRİTİK EKSİK:** Çalışan Apps Script projesindeki `Kod.gs`, `GirisGuvenligi.gs` ve `OgrenciOturum.gs` GitHub hazırlık dalında mevcut değil. Yedekleri ve kaynak kodları görülmeden bu projeye yeni sıfırdan ana dosya uygulanamaz. `Kod_doGet_yonlendirme.gs` ikinci bir `doGet` olarak eklenmemeli. `EtkinlikOynat.html` eski alternatif oynatıcıdır; güncel giriş içindeki tam ekran iframe ile aynı anda devreye alınmamalı.

## B. ÖĞRETMEN — ayrı ve yalnız öğretmene özel Apps Script
| Apps Script adı | GitHub kaynağı |
| --- | --- |
| `Kod.gs` | `portal/ogretmen-rapor/OgretmenRapor.gs` |
| `OgretmenRapor.html` | `portal/ogretmen-rapor/OgretmenRapor.html` |
| `OgretmenDuyuruTaslak.gs` | `portal/ogretmen-rapor/OgretmenDuyuruTaslak.gs` |

Öğretmen projesinde ScriptProperties `OZEL_TABLO_ID` kendi özel tablona bağlı olmalıdır; GitHub'a gerçek değer eklenmez. Öğretmen kodları öğrenci projesine asla eklenmez.

## Tek kurulumdan önce
1. İki mevcut Apps Script projesinin tüm kaynak dosyalarını **ayrı, erişimi sınırlı** yedekle. Gerçek öğrenci kodu, ad, token veya tablo içeriği GitHub'a yüklenmez.
2. Eksik temel sunucu dosyalarını gizli veriler temizlenmiş biçimde topla; giriş güvenliğiyle son entegrasyonu yap.
3. Öğrenci projesinde tek `doGet` kaldığını ve aynı isimde fonksiyon çakışması olmadığını kontrol et.
4. Sonuç doğrulaması; gerçek pilot oyun sonucuyla, güvenli çıkış ve süresi biten token ile test edilmeli.
5. Öğretmen paneli yalnız **Yalnızca ben**. Öğrenci dağıtımının erişimi de öğretmen ayrıca onay verene kadar genişletilmeyecek.
6. Dağıtım sürümü değişmeden yalnız `/dev` test edilerek doğrulama yapılmalı. Öğrencilerin erişim yetkisini değiştirmek açık izin gerektirir.

## Gerçek durum
GitHub'daki kodlar hazırlık dalındadır ve çalışan Apps Script projelerine otomatik yüklenmez. **Paket henüz canlıya alınmaya hazır değildir**: eksik temel sunucu dosyaları ve gerçek ortam entegrasyon testi birer blokerdir.

## Korunanlar
GitHub Pages ana sayfası, orijinal oyun ve mevcut Firebase bağımlı özellikler değiştirilmez. Her iki Apps Script projesi birbirinden ayrı kalır.
