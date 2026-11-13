# 4/D Sınıf Portalı — Sistem Envanteri

**Tarih:** 13 Kasım 2026 · **Hazırlayan:** Claude (salt okunur inceleme)
**İncelenen:** `main` dalı (etkinlik sitesi, araçlar, skill'ler) ve `hazirlik/kazanim-takibi-20261101` dalı (öğrenci portalı + öğretmen raporu kaynakları).
**Kapsam dışı:** Canlı Google sitesi, Google E-Tablosu, yalnız öğretmenin bilgisayarında duran klasörler (`YillikPlan/`, `Baski/`, `VeliRaporlari/`). Bunlar bu incelemede açılamadı; onlarla ilgili cümleler belgelere ve koda dayanır.

> Bu rapora gizli anahtar, tablo/proje/dağıtım kimliği, öğrenci adı, öğrenci kodu veya başka kişisel veri **yazılmamıştır**. Kod içinde geçen kimlikler bilerek dışarıda bırakıldı.
> İnceleme sırasında depodaki hiçbir dosya değiştirilmedi; yalnız bu rapor dosyası eklendi.

---

## 0. Kısa özet (5 dakikada okunacak kısım)

Sistem, bir sınıf öğretmeninin tek başına kurduğu yapıya göre **olgun ve dikkatli tasarlanmış**. Benzetmeyle:
**GitHub sitesi kütüphane rafı**, **Google Apps Script portalı giriş kapısı ve kayıt defteri**, **Google E-Tablosu öğretmenin kasası**, **Claude skill'leri de kütüphanecinin yazılı çalışma talimatları**.

| Alan | Durum | Bir cümleyle |
|---|---|---|
| İçerik üretimi | 🟢 Güçlü | Ayrıntılı kalite kuralları, hazır oyun kalıbı, otomatik kontrol betiği var. |
| İçerik sayısı | 🟢 | 71 etkinlik (7 ders), 33 defter notu görseli, 6 değerlendirme. |
| Yayın otomasyonu | 🟢 | Yeni dosya yüklenince liste kendiliğinden güncelleniyor; portal GitHub'dan canlıya çıkıyor. |
| Sonuç takibi | 🟡 Kısmi | 71 etkinlikten 21'i öğretmen raporuna sonuç yazıyor; 3 etkinlik mesaj gönderdiği halde takipte değil. |
| Güvenlik / çocuk verisi | 🟡 İyi ama birkaç açık uç | Kod, oturum ve kayıt mantığı özenli; giriş sınırının sınıfı toptan kilitleyebilmesi ve KVKK metni bekliyor. |
| Eski içerik kalitesi | 🟠 | Eski etkinliklerin çoğu yeni kurallara (ipucu, kayıt, görsel zenginlik, çevrimdışı) uymuyor. |
| Bakım yükü | 🟠 | Bazı listeler elle tutuluyor (defter notları portal koduna gömülü), çok sayıda eski dal duruyor, eski Firebase parçaları hâlâ yayında. |

**En değerli 5 geliştirme fırsatı** (ayrıntı Bölüm 9'da):
1. Mesaj gönderen ama takipte olmayan 3 etkinliği takibe almak (özellikle *Geçmişte Biz* ünite değerlendirmesi).
2. Giriş sınırını "tüm sınıf kilitlenmesin" diye düzeltmek.
3. Defter notu listesini portal kodundan çıkarıp `bu-hafta.json` gibi bir dosyaya taşımak (her yeni not için portal yayını gerekmesin).
4. Eski etkinlikleri öncelik sırasıyla yeni kalıba taşımak (önce çevrimdışı bozulanlar ve çok büyük dosyalar).
5. Otomasyonda sürüm sabitleme ve testleri GitHub'da da çalıştırma.

---

## 1. Klasör yapısı

### 1.1 `main` dalı (herkese açık site: GitHub Pages)

```
4.SINIF/
├─ CLAUDE.md              Claude için sistem özeti (öğretmenin talimatları)
├─ MIMARI.md              Sistemin sade anlatımı (parçalar, sonuç mesajı, dallar)
├─ index.html             Öğrenciyi Apps Script portalına yönlendiren kapı sayfası
├─ materyaller.html       Kodsuz materyal kataloğu (icerik-katalogu.json'dan okur)
├─ icerik-katalogu.json   Portalda görünen tüm etkinliklerin listesi (71 satır)
├─ bu-hafta.json          Portal ana sayfasındaki "Bu Haftanın Etkinlikleri" şeridi
├─ uygulama.html, manifest.json, sw.js, cevrimdisi.html, uygulama/   Telefona kurulum (PWA)
├─ ogrenci/, ogretmen/    ESKİ Firebase tabanlı giriş ve öğretmen paneli (bkz. 7.4)
├─ Turkce/ Matematik/ Fen/ Sosyal/ Insanhaklari/ Trafik/   Ders etkinlikleri + DefterNotlari/
├─ Oyunlar/               Serbest oyunlar (takip, defter notu, değerlendirme yok — öğretmenin kararı)
├─ Deneme/                Deneme sınavı öğrenci kitapçığı (PDF)
├─ test/                  Portalın takip ettiği iki test sürümü (kayipsayilar, oruntuler)
├─ tools/                 Yerel yardımcı programlar (bkz. Bölüm 5)
├─ .claude/skills/        Claude'un 4 çalışma talimatı (bkz. Bölüm 3)
└─ .github/workflows/     GitHub otomasyonları (bkz. Bölüm 6)
```

`.gitignore` ile GitHub'a gitmeyenler: `YillikPlan/`, `VeliRaporlari/`, `ClassDojo*.pdf`. Skill'e göre `Baski/` da `.git/info/exclude` ile yerel tutuluyor (bu kopyada yok — beklenen durum).

### 1.2 `hazirlik/kazanim-takibi-20261101` dalı (portal kaynakları)

```
portal/
├─ appsscript/            Öğrenci portalı (Apps Script): giriş, oturum, sonuç kaydı, defter takibi,
│                         duyurular, anketler, aylık davranış raporu, Ayın Yıldızları + arayüz (~130 KB HTML)
├─ ogretmen-rapor/        Öğretmene özel rapor projesi (ayrı Apps Script)
├─ etkinlik-kayitlari.json   Takipli etkinliklerin TEK listesi (21 otomatik + 23 seçili)
├─ etkinlik-takip-politikasi.json, etkinlik-katalogu.json, mevcut-site-etkinlikleri.json, new-content.json
├─ etkinlik-sonuc-semasi.mjs  Sonuç mesajı biçim tanımı
└─ *.md                   Kurulum, güvenlik, tasarım ve test notları (8 belge)
tools/katalog-esitle.mjs  Listeyi sunucu koduna, portala ve rapora işleyen eşitleyici
tests/*.cjs               2 yerel test (defter işaretleme, ilerleme bildirimleri)
.github/scripts/          Yayın öncesi doğrulama ve güvenli birleştirme betikleri
ogretmen/kazanim-analizi.html  "Yerel pilot" kazanım analizi sayfası
```

### 1.3 Dallar
GitHub'da 21 dal var: `main`, portal dalı, 3 `hazirlik/…`, 1 `pilot/…`, 3 `test…`, 9 `yedek/…`/`backup/…`, 2 `claude/…`. İki açık/eski çekme isteği (PR #1, #2) dallara bağlı görünüyor. Yedek dalların çoğu 2–6 Kasım tarihli.

---

## 2. Talimat dosyaları (CLAUDE.md ve MIMARI.md)

**CLAUDE.md** kısa ve iyi düzenlenmiş: tek çalışma yeri, skill tablosu, görsel üretim akışı, parçalar, kurallar, aylık ClassDojo süreci. Öne çıkan kurallar:
- Göndermeden (push) önce onay; portal dalında çift dikkat (o dala gönderim **anında canlıya** çıkar).
- Sır ve öğrenci verisi depoya yazılmaz; Claude canlı siteye kod girmez.
- Test edilmeyen şeye "çalışıyor" denmez; kazanım kodu uydurulmaz.
- Token tasarrufu kuralları (büyük portal dosyasını bütün okumama vb.).

**MIMARI.md** kod bilmeyen birine yönelik çok iyi bir anlatım: üç parça, tablo sekmeleri, sonuç mesajının biçimi, PWA, gelecekte mobil uygulama/Firebase-Supabase yol haritası, dal tablosu. "Değişmemesi gereken iki şey: sonuç mesajı ve katalog" ilkesi mimarinin en sağlam kararı.

**Tutarsızlıklar / eskimiş yerler:**
| Yer | Sorun |
|---|---|
| `4d-icerik-uret` §4.2 başlığı | "Varsayılan yol: Chrome'daki Gemini" diyor; aynı bölümün sonu ve CLAUDE.md "önce ChatGPT, Gemini yedek" diyor. |
| `egitim-icerik-standartlari.md` §3 | "Öğretmen takip paneli zorunludur… örnek veriyle çalışır" diyor; SKILL.md §5 "ayrı öğretmen paneli YOKTUR, sonuç portala gider" diyor. Eski kural güncellenmemiş. |
| `references/portal-bulgulari.md` | 47 dosyalık eski taramaya dayanıyor; şu an 71 etkinlik var. |
| `portal/appsscript/README.md` | "Kod.gs, GirisGuvenligi.gs, OgrenciOturum.gs bu dalda yok" ve "yalnız pilot Matematik oyunu takipli" diyor; ikisi de artık doğru değil. |
| `MIMARI.md` §1 tablo listesi | `OTURUMLAR`, `VELI_RAPORLARI`, `AYIN_YILDIZLARI`, duyuru ve anket sayfalarını saymıyor. |
| `MIMARI.md` §6 | `GirisDenemeKoruma_Oneri.gs` "taslak hazır" diyor; canlıda zaten ayrı bir sınır (`GirisGuvenligi.gs`) çalışıyor. İkisinin ilişkisi belgede açık değil. |

---

## 3. Claude skill'leri (çalışma talimatları)

| Skill | Ne yapar | Değerlendirme |
|---|---|---|
| `4d-icerik-uret` (215 satır + 3 başvuru belgesi + kalıp + 2 betik) | Kazanım planı → tür/mekanik seçimi → soru/çeldirici kuralları → teknik standart → **zorunlu görsel zenginlik** → görsel üretimi (ChatGPT/Gemini) → portal bağlantısı → defter notu "iki parça" kuralı → teslim kontrol listesi | Sistemin kalbi. Pedagojik öncelik sırası net (kazanım > mekanik > çalışan kod > görsel > hız). Çok sayıda "öğretmenin kararı (tarih)" notu, kararların izlenebilir olmasını sağlıyor. |
| `4d-etkinlik-takibe-al` | Etkinliği sonuç takibine alma: mesaj kontrolü → `etkinlik-kayitlari.json` → `katalog-esitle.mjs` → doğrulama → **onaylı** yayın | Kısa ve doğru. |
| `4d-canli-kontrol` | Yayından sonra GitHub Actions + site + portal kontrolü | `gh run list` komutlarını kullanıyor; bulut oturumunda `gh` yalnız arama için var, orada GitHub araçlarıyla yapılmalı (yerel bilgisayarda sorun yok). |
| `4d-haftalik-hatirlatma` | Yıllık plandan bu/sıradaki hafta → eksik etkinlik/defter notu listesi → `bu-hafta.json` önerisi | İyi tasarlanmış; zamanlanmış görevde "hiçbir şey gönderme" güvencesi var. |

**Materyal şablonları ve kontrol araçları** (`4d-icerik-uret` içinde):
- `assets/oyun-iskeleti.html` (419 satır): tek `OYUN` veri nesnesi, karıştırma, 3 kademeli ipucu, ikinci şans, açıklamalı çözüm, tema/sahne/karakter SVG'leri, sayı doğrusu/blok çizimleri, konfeti, ses, yol haritası, rozetli bitiş ekranı.
- `assets/rapor_motoru.js` (v2): madde kaydı, seviye hesabı (Ustalaştı / Gelişiyor / Destek gerekli / Veri az), "Kazanım Karnem" ekranı, portala `4d:activity-finished` ve `4d:item-result` mesajları.
- `scripts/birlestir.py`: motoru etkinliğe gömer. `scripts/html_kontrol.py`: dış bağımlılık, `alert`, dil etiketi vb. otomatik kontrol.

**Durum:** Kalıptan üretilen yeni etkinlikler (9 dosya: Kantin Dedektifi, Özdeyişler, Konum Kâşifi, Geçmişte Biz, Oyun Araçları, Çıkarım-Başlık, Çıkarmada Tahmin, iki konu değerlendirmesi) kuralların hepsine uyuyor. Eski etkinlikler uymuyor (Bölüm 4.3).

---

## 4. İçerik envanteri

### 4.1 Derslere göre (`icerik-katalogu.json`, 71 satır, gizli yok)

| Ders | Etkinlik | Defter notu görseli | Değerlendirme | Sonuç takipli |
|---|---:|---:|---|---:|
| Türkçe | 21 | 7 | Atasözü-Deyim (konu) | 5 |
| Matematik | 17 | 6 | Doğal Sayılar (ünite), Toplama-Çıkarma Problemleri (konu) | 6 (+2 test/ sürümü) |
| Fen Bilimleri | 12 | 7 | Besinler (ünite), Ünite Değ. 1 (ünite) | 2 |
| Sosyal Bilgiler | 9 | 13 | Geçmişte Biz (ünite) | 2 |
| İnsan Hakları | 5 | 0 | — | 2 |
| Trafik Güvenliği | 3 | 0 | — | 2 |
| Oyunlar | 4 | — (kural gereği) | — (kural gereği) | — (kural gereği) |
| **Toplam** | **71** | **33 görsel** | **6** | **21** (2’si test/ sürümü) |

Katalog ile klasörler **birebir tutarlı** (eksik ya da fazla satır yok). `bu-hafta.json`'daki 7 yolun hepsi mevcut; şerit 27 Kasım'da kendiliğinden gizlenecek.

### 4.2 Sonuç takibi eşleşmesi
- Portaldaki 21 takipli kimliğin hepsi sunucu izin listesinde var (eşitleyici doğru çalışmış).
- **Sonuç mesajı gönderdiği halde takipte olmayan 3 dosya:**
  - `Sosyal/sos-gecmistebiz-sinav.html` — yeni ünite değerlendirmesi, rapor motoru gömülü; 13 Kasım'da "yayına alındı" ama portal kayıt listesinde yok → öğrenci çözse bile **sonuç tabloya yazılmaz.** (En önemli eksik.)
  - `Turkce/pekistirme.html` (kimlik `tur-pekistirme`) ve `Turkce/sozavcıları.html` (kimlik `tur-sozavcilar`) — "seçili etkinlikler" listesinde var (öğrenci "tamamladım" der), ama otomatik sonuç izin listesinde yok.
- İki takipli kimlikte kazanım kodu bekliyor: `mat-oruntuler` ("KOD_BEKLIYOR") ve `tur-ozdeyisler` ("doğrulanmalı").
- Eski takipli kayıtların bir kısmında kazanım alanı kod yerine açıklama ("Toplama ve çıkarma problemleri 1"); kazanım haritası bunları koda bağlayamaz.
- Soru bazlı kayıt (`4d:item-result`) sunucuda **yalnız Fen Besinler değerlendirmesi** için açık; rapor motorlu 9 yeni etkinlik bu mesajı gönderiyor ama kaydedilmiyor (skill bunu dürüstçe "ayrı geliştirme" diye not etmiş).

### 4.3 Teknik kalite taraması (71 etkinlik, otomatik tarama)
| Ölçüt | Sayı | Not |
|---|---:|---|
| Sonuç mesajı gönderen | 22 | 21 takipte + 3 takipsiz (bir dosya test/ sürümüyle sayılıyor) |
| Rapor motoru v2 gömülü | 9 | Hepsi kalıptan üretilen yeni etkinlikler |
| İlerleme kaydı (`localStorage`) | 17 | 54 etkinlikte sayfa yenilenince baştan başlanıyor |
| `alert/confirm/prompt` kullanan | 9 | Portal penceresinde engellenebilir (skill bunu yasaklıyor) |
| Dış kaynağa bağımlı (CDN, Google Fonts) | 4 | `Insanhaklari/farkliyasamlar`, `Insanhaklari/insanolmasorumlulugu`, `Trafik/yayaolarak…` (Tailwind CDN) ve `Oyunlar/toplamaoyun` → internetsiz sınıfta görünüm bozulur; ikisi takipli |

**Çok büyük dosyalar** (telefonda/akıllı tahtada yavaş açılır, öğrencinin mobil verisini tüketir):
| Dosya | Boyut |
|---|---:|
| `Sosyal/kurtulus.html` | 11,7 MB (99 gömülü resim) |
| `logo.png` | 6,2 MB |
| `Turkce/sozavcıları.html` | 3,8 MB |
| `Matematik/sayiproblemleri.html` | 1,5 MB |
| Defter notu PNG'leri | çoğu 1–2,7 MB |

Ayrıca `Turkce/sozavcıları.html` dosya adında Türkçe "ı" var; skill'in "ASCII ad" kuralına aykırı ve bağlantılarda kodlama sorunu riski taşıyor (portal bu yüzden `decodeURI` kullanıyor).

### 4.4 Defter notları
33 görsel (Türkçe 7, Matematik 6, Fen 7, Sosyal 13), İnsan Hakları ve Trafik'te henüz yok. `tools/defter-kazanim.json`'daki 5 eşleşmenin **5'inin de dosyası yok** (ör. `Matematik/DefterNotlari/cikarmadatahmin.png`); ya henüz yüklenmemiş ya da adları farklı. Kazanım haritası bu notları "var" sayamaz.

---

## 5. Yerel araçlar (`tools/`)

| Araç | Ne yapar | Girdi → Çıktı |
|---|---|---|
| `icerik-katalogu-guncelle.mjs` | Ders klasörleri ↔ katalog eşitleme (yeni ekler, silineni çıkarır, elle düzeltmeyi korur) | klasörler → `icerik-katalogu.json` (GitHub'da otomatik çalışır) |
| `yillik-plan-oku.mjs` | Yıllık plan .docx'lerini harici kütüphanesiz okur | `YillikPlan/*.docx` → `yillik-plan.json` |
| `haftalik-hatirlatma.mjs` | Bu/sıradaki haftanın kazanımları + portalda olanlar | plan + katalog → ekrana ham liste |
| `kazanim-haritasi.mjs` | Yıllık plan × etkinlik × defter notu tablosu | → `Baski/kazanim-haritasi.html` (yerel) |
| `gorsel-uret.mjs` | A4 PDF basma (`--pdf-yap`), yapıştırmalık 2'li dizme (`--ikili`); API ile çizim (faturalandırma kapalı olduğu için şu an pasif) | PNG → PDF |
| `classdojo-rapor.py` | ClassDojo aylık PDF'inden veli raporu ve Ayın Yıldızları satırları | PDF → `VeliRaporlari/…/*.tsv` (yerel) |
| `defter-kazanim.json` | Defter notu → kazanım eşleşmesi | (bkz. 4.4) |
| `katalog-esitle.mjs` (portal dalı) | Takip listesini sunucu izin listesine, portal arayüzüne ve rapora işler | `etkinlik-kayitlari.json` → `KATALOG BASLA/BITIR` bölümleri |

**Gözlemler:** Araçlar sade, bağımlılıksız ve iyi yorumlanmış. Takvim mantığı (`baslangic()` ve hafta hesabı) iki dosyada kopya; yıl sabit (2026/2027) yazılmış → gelecek eğitim yılında elle güncellenmeli. Araçların kendi testleri yok.

---

## 6. Otomasyonlar (GitHub Actions)

| İş akışı | Dal | Tetikleyici | Ne yapar |
|---|---|---|---|
| `icerik-katalogu.yml` | `main` | Ders klasörüne `.html` gönderimi | Katalogu günceller, kaydeder, Pages'i yeniden yayımlatır |
| `appsscript-sync.yml` | portal dalı | `portal/appsscript/**` gönderimi veya elle (onay metniyle, varsayılan "yalnız kontrol") | Doğrulama betiği → uzak projeyi çek → güvenli birleştir → yükle → **mevcut** öğrenci dağıtımını güncelle (yeni adres oluşturmaz) |
| `teacher-report-sync.yml` | portal dalı | `portal/ogretmen-rapor/**` gönderimi | Öğretmen projesini çek → birleştir → yükle → mevcut dağıtımı güncelle |

**Güçlü yanlar:** Kimlik bilgileri GitHub gizli değişkenlerinde; iş sonunda siliniyor; korumalı "environment" kullanılıyor; elle çalıştırmada açık onay metni ve kuru deneme; yanlışlıkla yeni öğrenci adresi oluşmasını engelleyen kontrol; tek seferde tek yayın (concurrency).

**Riskler / eksikler:**
- `@google/clasp@latest` sürümü sabitlenmemiş → yeni bir clasp sürümü komut adlarını değiştirirse yayın bir gün aniden kırılabilir; ayrıca her çalışmada denetlenmemiş en son paket iniyor.
- Öğretmen raporu iş akışı yayından önce doğrulama betiğini **çalıştırmıyor** (öğrenci iş akışı çalıştırıyor).
- `tests/*.cjs` testleri hiçbir iş akışında çalışmıyor; yalnız elle.
- `main` dalında içerik için otomatik kalite kontrolü yok (ör. `html_kontrol.py`'nin gönderimde çalışması).
- Katalog iş akışı `main`'e kendisi commit atıyor; aynı anda yerelde çalışan biri için "git pull" unutulursa çakışma doğabilir (skill "işe başlarken git pull" diyerek bunu karşılıyor).

---

## 7. Portal entegrasyonları

### 7.1 Öğrenci portalı (Apps Script) — neler yapabiliyor
| Özellik | Sunucu dosyası | Tablo sayfası |
|---|---|---|
| 6 karakterli kodla giriş, 7 günlük oturum, çıkış | `Kod.gs`, `OgrenciOturum.gs`, `GirisGuvenligi.gs` | `Sayfa1`, `OTURUMLAR` |
| Takipli etkinliği portal içinde açma ve sonucu kaydetme | `EtkinlikSonuclari.gs`, `EtkinlikKayitDefteri.gs`, `EtkinlikOynat.html` | `ETKINLIK_SONUCLARI` |
| Soru bazlı yanıt (yalnız Fen Besinler) | `EtkinlikSonuclari.gs` | `ETKINLIK_SORU_SONUCLARI` |
| "Tamamladım" beyanı (seçili etkinlikler) | `OgrenciCalismaDurumu.gs` | `ETKINLIK_TAMAMLAMA` |
| "Defter notunu yazdım" işareti | `OgrenciCalismaDurumu.gs` | `DEFTER_TAMAMLAMA` |
| Kendi ilerlemem | `EtkinlikSonuclari.gs` | — |
| Duyurular (TASLAK → YAYINDA → ARŞİV) | `OgrenciDuyurulari.gs` | duyuru sayfası |
| Anketler | `OgrenciAnketleri.gs` | anket sayfaları |
| Aylık davranış raporum (ClassDojo) | `VeliRaporu.gs` | `VELI_RAPORLARI` |
| Ayın Yıldızları + Onur Listesi | `AyinYildizlari.gs` | `AYIN_YILDIZLARI` |
| Ana sayfa: kısayollar, arama, ders süzgeci, "YENİ" rozeti, Bu Haftanın Etkinlikleri, Benim Köşem | `OgrenciGiris_Guncel.html` | `icerik-katalogu.json` ve `bu-hafta.json`'u siteden okur |

### 7.2 Öğretmen raporu (ayrı, öğretmene özel proje)
Bölümler: Öğrenciler · Etkinliğe göre katılım · Zorlanılan etkinlikler · Kazanımlar · Seçilen etkinlikler (tamamlama bildirimleri) · Defter notları "yazdım" takibi · Besinler soru bazlı yanıtlar · Son 7 günde yüklenenler · Ders içerikleri · Anketler (hazır şablonlar, durum değiştirme) · Duyuru taslağı. TEST türü öğrenciler bilerek gösterilmez.

### 7.3 Güvenlik tasarımı — iyi yapılmış olanlar
- Öğrenci kimliği **istemciden alınmıyor**; her kayıt sunucudaki oturumdan çözülüyor.
- Oturum anahtarı tabloya düz değil, **SHA-256 özetiyle** yazılıyor; giriş kodları da sayaçta özetli tutuluyor.
- Sonuç kaydı sıkı doğrulanıyor (izinli kimlik, `doğru + yanlış = toplam`, süre ≤ 1 gün, deneme kimliği biçimi) ve aynı deneme iki kez yazılmıyor.
- Portal, etkinlikten gelen mesajı yalnız `ismailkaya33.github.io` kaynağından ve açık oyun penceresinden kabul ediyor.
- Aynı kodun iki öğrencide olması durumunda giriş açılmıyor; sunucu hata ayrıntısı öğrenciye gösterilmiyor; eşzamanlılık için kilit kullanılıyor.
- Takip listesi tek dosyadan üretiliyor ve yayın öncesi doğrulanıyor.

### 7.4 Açık uçlar ve riskler
| # | Konu | Neden önemli | Öneri |
|---|---|---|---|
| 1 | **Toplu giriş sınırı:** 5 dakikada toplam 80 deneme (başarılılar dahil) aşılırsa herkes kilitleniyor. | Kodu deneyen tek bir kişi ya da sınıfça arka arkaya giriş + yenilemeler tüm sınıfı 5 dakika dışarıda bırakabilir. Kod başına sınır ise yalnız *aynı* yanlış kodu tekrarlayanı durdurur. | Toplam sayaca yalnız **başarısız** denemeleri saymak ve eşiği sınıf düzenine göre ayarlamak; `GirisDenemeKoruma_Oneri.gs` ile birleştirip tek koruma bırakmak. |
| 2 | `OTURUMLAR`, `ETKINLIK_SONUCLARI` sayfaları sürekli büyüyor; her istekte tüm satırlar taranıyor. | Yıl sonuna doğru giriş/kayıt yavaşlar, Apps Script süre sınırına yaklaşılır. | Süresi dolan oturumları haftalık temizleyen zamanlanmış bir işlev; tekrar kontrolü için son N satıra bakmak ya da önbellek. |
| 3 | Eski **Firebase** parçaları hâlâ yayında: `ogrenci/index.html`, `ogretmen/index.html`, `materyaller.html`, `Matematik/kayipsayilar.html`. | Bakımsız ikinci bir giriş/panel ve veritabanı; Firebase kuralları açık kalırsa veri riski. Portal belgesi "henüz silinmemeli" diyor. | Firebase'de hangi verinin kaldığını ve kuralları gözden geçirip eski sayfaları emekliye ayırma planı. |
| 4 | Öğrenci adı tarayıcıya gidiyor (giriş sonrası "Merhaba …"). | Beklenen davranış; ancak KVKK aydınlatma metni hâlâ "bekleyenler" listesinde. | Aydınlatma metnini tamamlamak (veliye: hangi veri, nerede, kim görür, ne kadar saklanır). |
| 5 | Portal arayüzü tek dosyada ~130 KB, 1.329 satır. | Her değişiklik riskli ve pahalı; Claude için de okuma maliyeti yüksek (CLAUDE.md bunu zaten not etmiş). | Bölümleri ayrı `include` dosyalarına bölmek (Apps Script `HtmlService` buna izin verir). |
| 6 | Defter notu listesi portal koduna gömülü (~50 resim yolu). | Her yeni defter notu için **canlı portal yayını** gerekiyor (en riskli dala dokunuluyor). | `defter-notlari.json` gibi bir listeyi `main`'de tutup portalın onu okuması (tıpkı `bu-hafta.json`). |
| 7 | Sonuçlar oyun içinde hesaplanıyor. | README'nin de dediği gibi bunlar "öğretim geri bildirimi"dir, güvenli sınav kaydı değildir; bilgili bir öğrenci sahte sonuç gönderebilir. | Not/karne kararında tek kaynak olarak kullanılmamalı (bilinçli sınırlama olarak belgede kalmalı). |

---

## 8. Eksikler (özet liste)

**İçerik**
- İnsan Hakları ve Trafik'te defter notu yok; İnsan Hakları, Trafik ve Sosyal'de etkinlik sayısı az.
- Eski etkinliklerin ~%75'inde ilerleme kaydı, ~%87'sinde rapor motoru yok; 9 dosyada `alert`, 4 dosyada dış bağımlılık.
- Kazanım kodu eksik/açıklama olarak yazılmış takipli kayıtlar (Bölüm 4.2).
- `defter-kazanim.json` eşleşmeleri gerçek dosyalarla örtüşmüyor.

**Takip**
- *Geçmişte Biz* ünite değerlendirmesinin sonuçları kaydedilmiyor.
- Soru bazlı analiz yalnız tek değerlendirmede; yeni etkinlikler gönderdiği halde boşa gidiyor.
- Kazanım analizi sayfası (`ogretmen/kazanim-analizi.html`) hâlâ "yerel pilot".

**Altyapı ve bakım**
- Otomasyonda sürüm sabitleme, öğretmen akışında doğrulama, testlerin CI'da çalışması yok.
- Belgelerde eskimiş kısımlar (Bölüm 2 tablosu).
- 21 dal; hangilerinin artık gereksiz olduğu belirsiz.
- Büyük dosyalar (11,7 MB etkinlik, 6,2 MB logo, 1–2,7 MB defter notları).
- Yıl değişince güncellenmesi gereken sabit tarihli takvim kodu.

**Belgelenmiş ama bekleyen**
- KVKK aydınlatma metni.
- Görsel üretiminde API yolu (faturalandırma kapalı; şu an tarayıcı + elle indirme).

---

## 9. Geliştirme fırsatları (önceliklendirilmiş)

Her madde için: **etki** (öğrenciye/öğretmene faydası), **emek**, **risk** (canlı portala dokunuyor mu).

### Hemen (bu hafta, küçük işler)
| # | İş | Etki | Emek | Risk |
|---|---|---|---|---|
| 1 | `sos-gecmistebiz-sinav`, `tur-pekistirme`, `tur-sozavcilar`'ı takibe almak (`4d-etkinlik-takibe-al`) | Yüksek | Az | Portal yayını → onay |
| 2 | `mat-oruntuler` ve `tur-ozdeyisler` kazanım kodlarını öğretmenle doğrulamak | Orta | Az | Portal yayını |
| 3 | Belgelerdeki tutarsızlıkları düzeltmek (Bölüm 2 tablosu) | Orta (Claude'un hata yapmasını önler) | Az | Yok |
| 4 | `defter-kazanim.json`'u gerçek dosya adlarıyla düzeltmek | Orta | Az | Yok |
| 5 | Dış bağımlılığı olan 4 etkinliği çevrimdışı hale getirmek (Tailwind/Google Fonts kaldırma) | Orta | Orta | Yalnız site |

### Kısa vade (2–4 hafta)
| # | İş | Etki | Emek | Risk |
|---|---|---|---|---|
| 6 | Giriş sınırını düzeltmek (7.4 #1) | Yüksek (sınıf kilitlenmesini önler) | Az | Portal yayını, TEST40 ile sınama |
| 7 | Defter notu listesini JSON'a taşımak (7.4 #6) | Yüksek (bakım kolaylığı, daha az canlı yayın) | Orta | Bir kez portal yayını |
| 8 | Büyük resimleri küçültmek (logo → ~100 KB; defter notları → WebP/JPEG ~300 KB; `kurtulus.html` resimlerini ayrı dosyaya) | Yüksek (telefonda hız, veri) | Orta | Yalnız site |
| 9 | `clasp` sürümünü sabitlemek; öğretmen akışına doğrulama, iki akışa `tests/*.cjs` eklemek | Orta (sessiz kırılmayı önler) | Az | Düşük |
| 10 | `main`'e gönderimde `html_kontrol.py`'yi çalıştıran hafif bir kontrol (uyarı verir, yayını durdurmaz) | Orta | Az | Yok |
| 11 | Süresi dolan oturumları temizleyen zamanlanmış işlev | Orta | Az | Portal yayını |

### Orta vade (dönem içinde)
| # | İş | Etki | Emek | Risk |
|---|---|---|---|---|
| 12 | Eski etkinlikleri kalıba taşıma — öncelik: (a) takipli ama motorsuz olanlar, (b) bu haftanın konuları, (c) çok kullanılanlar | Yüksek | Yüksek (etkinlik başına) | Yalnız site + takip |
| 13 | `4d:item-result` kaydını genel hale getirmek (tüm rapor motorlu etkinlikler) ve öğretmen raporunda "en çok yanılınan soru/yanılgı etiketi" görünümü | Yüksek (hangi kazanımda zorlanıldığı) | Orta | Portal + rapor yayını |
| 14 | Kazanım analizi sayfasını canlı rapora bağlamak: yıllık plan × sonuç → "kazanım karnesi" (sınıf ve öğrenci düzeyinde) | Yüksek | Orta-Yüksek | Rapor yayını |
| 15 | İnsan Hakları ve Trafik için defter notları; Sosyal/İnsan Hakları/Trafik etkinlik sayısını artırmak (haftalık hatırlatma zaten yol gösteriyor) | Orta | Süreklilik | Yalnız site |
| 16 | Portal arayüzünü parçalara bölmek (7.4 #5) | Orta (bakım) | Orta | Portal yayını, dikkatli sınama |
| 17 | Gereksiz dalları ve eski PR'ları öğretmen onayıyla temizlemek; Firebase emeklilik planı | Orta (sadelik, güvenlik) | Az-Orta | Geri dönüşsüz adımlar → onay |

### Uzun vade (isteğe bağlı)
- **Veliye yönelik özet:** Veli raporu portalda var; kazanım karnesinin sadeleştirilmiş hali eklenebilir (KVKK metni tamamlandıktan sonra).
- **Uyarlanabilir tekrar:** Rapor motorundaki yanılgı etiketleriyle, öğrencinin yanıldığı konuya göre "senin için önerilen etkinlik" kartı.
- **Yeni yıl hazırlığı:** Takvim kodundaki sabit yılları plandan okunur hale getirmek; katalogda "eğitim yılı" alanı.
- **Mobil uygulama / yeni sunucu:** MIMARI.md'deki yol haritası yerinde; sonuç mesajı ve katalog biçimi korunduğu sürece etkinliklere dokunmadan geçiş mümkün.

---

## 10. Yöntem ve sınırlamalar
- İnceleme: dosya listesi, belgelerin okunması, betiklerin ve iş akışlarının satır satır incelenmesi, 71 etkinlik üzerinde otomatik metin taraması (mesaj, motor, `localStorage`, `alert`, dış adres, gömülü resim sayısı), katalog ↔ klasör ↔ takip listesi çapraz kontrolü.
- **Çalıştırılmadı:** Etkinlikler tarayıcıda oynanmadı; Apps Script canlı ortamı, Google E-Tablosu, GitHub Actions geçmişi ve Firebase kuralları görülmedi. Bu yüzden "çalışıyor/çalışmıyor" hükümleri yalnız koda dayanır, canlıda doğrulanmalıdır.
- Otomatik tarama metin aramasıdır; örneğin bir dosya `localStorage`'ı başka bir adla kullanıyorsa sayılmamış olabilir.
