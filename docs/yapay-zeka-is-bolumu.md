# Yapay zekâ iş bölümü (Claude, ChatGPT Plus, Gemini Pro)

Hazırlanma: 2026-11-20. Neden: 7 paralel Opus alt ajanı 5 saatlik Claude kotasını iki kez dakikalar içinde bitirdi.
İlke: **her iş, onu hatasız yapabilen en hafif araçla** yapılır. Kalite kontrolü (kazanım, cevap doğruluğu, test) hafiflemez.

## 1. Elimizdeki araçlar

| Abonelik | Araç | Model kademesi | Güçlü yanı | Sınır |
|---|---|---|---|---|
| Claude | Bu oturum (ana) | Opus (ağır) | Karar, kural takibi, proje bilgisi, araç kullanımı, yayın | 5 saatlik pencere; en pahalı kademe |
| Claude | Alt ajan | Sonnet (orta) | Liste ile denetim, özetleme, web taraması | Sıfırdan başlar, dosyaları yeniden okur |
| Claude | Alt ajan | Haiku (hafif) | Tek dosyada basit arama/sayım | Yorum gerektiren işe uygun değil |
| ChatGPT Plus | Codex CLI (`codex exec`) | Codex kod modeli; akıl yürütme düşük/orta/yüksek | Uzun HTML/JS yazma, brife göre düzeltme | Plus'ın kendi 5 saatlik pencereleri |
| ChatGPT Plus | ChatGPT web (Chrome) | Görsel üretimi | Sahne/nesne resmi | Görsel başına birkaç dakika |
| Gemini Pro | **Antigravity CLI (`agy`)** — 2026-11-21 kuruldu, öğretmenin Google AI Pro girişiyle | Gemini 4 Neon (high) | Türkçe dil/yazım denetimi, uzun okuma, metin/soru üretimi | Abonelik kotası |
| ~~Gemini (ücretsiz anahtar)~~ | ~~Gemini CLI~~ | — | **Emekli (öğretmenin kararı 2026-11-27)**; kullanılmaz | — |
| Gemini Pro | Gemini web (Chrome) | Görsel (yedek) | ChatGPT kotası bitince | — |
| — | Komutlar (node/python) | Model yok | Test, sayı doğrulama, katalog, baskı | — |

## 2. Hangi iş kimde?

| İş | Yapan | Kademe | Not |
|---|---|---|---|
| Haftanın konusu, kazanım seçimi, etkinlik brifi (soru türleri, zorluk, çeldirici kuralı) | Claude ana | Opus | Kararın kendisi; dışarı verilmez |
| Etkinlik HTML'ini brif + `oyun-iskeleti.html` ile yazmak | **Codex** | orta (karmaşıksa yüksek) | En çok token yiyen iş buydu |
| Denetçi bulgularını uygulamak (düzeltme turu) | **Codex** | düşük/orta | Claude bulgu listesini verir, diff'i okur |
| Pedagojik denetim (son sürüme bir kez) | `pedagojik-denetci` | Sonnet | Hassas konuda (sağlık, hak ihlali, aile) Claude ana da okur |
| İkinci göz: cevap doğruluğu, ipucu sızıntısı (salt okuma) | **Codex** | orta | Denemede güvenilir çıktı |
| Türkçe yazım/dil denetimi | **Antigravity (Gemini 4 Neon)** | high | 2026-11-21 denemesi: 3 tuzaklı hatanın 3'ünü buldu, doğruya dokunmadı. Flash bu işe verilmez. Claude son kararı verir |
| Uzun belge karşılaştırması (yıllık plan, çok dosya) | **Antigravity** | Neon high | Dosya içeriği istemin içine gömülür |
| Kısa metin taslağı (yönerge, ipucu metni çeşitlemesi) | **Antigravity** ya da Codex | — | Claude seçer ve düzeltir (Gemini CLI emekli) |
| Defter notu kaynağı (`tools/sketchnote/notlar/*.js`) | Claude ana | Opus | Kısa ama doğruluk kritik; kod çizim kurallarına bağlı |
| Sahne/nesne görseli (gerçekten gerekiyorsa) | ChatGPT web | — | Basit kutu, cümle, liste için görsel yok |
| Test (Edge headless), `html_kontrol.py`, `dogrula.mjs`, `katalog-esitle` | Komut | yok | Claude çalıştırır, yalnız sonucu okur |
| `bu-hafta.json`, `defter-notlari.json`, kayıt listesi düzenleme | Claude ana | Opus (doğrudan araç) | Alt ajana verilmez; birkaç satırlık iş |
| Portal Apps Script kodu (canlıya çıkar) | Yalnız Claude ana | Opus | Dış yapay zekâya verilmez (bilerek) |
| Canlı kontrol (sayfa 200 mü, katalogda mı) | Komut | yok | Ajan gerekmez |
| Haftalık repo keşfi | `repo-kasifi` | Sonnet | Zaten Sonnet |
| Yayın (commit/push) | Claude ana | Opus | Onay kuralı aynen |

## 3. "Gereğinden ağır model kullanma" kuralları

1. Bir komut yetiyorsa model çalışmaz (test, sayım, JSON doğrulama, dosya listesi).
2. Birkaç satırlık düzenleme ana oturumda doğrudan yapılır; alt ajan açılmaz (ajan dosyaları baştan okur, daha pahalıdır).
3. Uzun kod üretimi Codex'e; Claude Opus brif yazar ve sonucu denetler, kodu kendisi baştan yazmaz.
4. Uzun belge okuma/karşılaştırma ve kısa metin çeşitlemesi Antigravity'ye (Gemini Pro).
5. Aynı anda en çok 1–2 Claude alt ajanı. Denetçi her taslağa değil, son sürüme bir kez.
6. Görsel yalnız sahne/nesne gerektiğinde. İnsan Hakları ve Trafik için defter notu yok.
7. Ters yönde de kural: hassas ya da canlıya çıkan işte hafif model kullanılmaz (kazanım kararı, sağlık/hak konuları, portal kodu).

## 4. Güvenlik sınırları (dış yapay zekâlar için)

- Codex ve Gemini **öğrenci adı/kodu, anahtar, tablo kimliği, `portal/`, `KVKK/`, `VeliRaporlari/`, `YillikPlan/*.docx`** görmez.
  Yalnız brif, ilgili ders klasörü ve şablon verilir; çalışma kopyası `scratchpad` altındadır.
- Dış araçlar commit/push yapmaz; Claude çıktıyı okur, test eder, denetletir, sonra onaylı yayın kuralına göre gönderir.
- Girişleri öğretmen yapar (tarayıcıda bir kez); Claude şifre girmez.
- Kazanım kodunu dış araç önerirse yıllık plandan doğrulanmadan kullanılmaz.

## 5. Kota bitince sıra

Etkinlik yazımı: Codex → (Codex bitti) Antigravity → Claude Sonnet alt ajanı → Claude Opus (son çare).
İnceleme: Antigravity → Claude Sonnet. Görsel: ChatGPT web → Gemini web.

**Dört rol (öğretmenin kararı 2026-11-27):** Claude = karar, denetim, portal kodu, yayın · Codex = uzun HTML ·
Antigravity = Türkçe dil denetimi, uzun okuma, küçük düzeltme dalları · ChatGPT web = resim (Gemini web yedek).
Gemini CLI emekli. Aşağıdaki 5a bölümü kurulum geçmişidir.
Claude'un kendi kotası bitince öğretmen `Promptlar/` klasöründeki hazır promptlarla çalışmaya devam eder (bugünkü düzen).

## 5a. Kurulum sonrası gerçek durum (2026-11-20)

- **Codex CLI çalışıyor** (ChatGPT girişi hazır). PowerShell `.ps1` engeli yüzünden `codex.cmd` olarak çağrılır.
- **Gemini CLI kişisel Google girişiyle çalışmıyor** (Google bu istemciyi kişisel hesaplara kapattı, "Antigravity"ye yönlendiriyor).
  Bilgisayardaki API anahtarıyla çalışıyor, ama ücretsiz katmanda **Pro modelleri kapalı**, yalnız **Flash** var (zaman zaman yoğunluk hatası).
- Sonuç: Gemini CLI = yalnız hafif işler (kısa metin çeşitlemesi, yazım taraması). Pro düzeyi uzun inceleme Chrome'da **Gemini web**'de
  (Pro abonelik) yapılır. Ücretsiz katmana öğrenci verisi asla gönderilmez.

### İlk deneme sonucu (2026-11-20)

- **Codex** (Çarpma Ustaları, salt okuma): 16 sorunun hepsini hesaplayıp doğruladı; 1 gerçek ÖNEMLİ bulgu (son "hata bul" sorusunun
  kökü cevabı sezdiriyordu) + 3 küçük öneri. Güvenilir → inceleme ve kod işi Codex'e verilebilir.
- **Gemini Flash** (Bilgi Dedektifi, yazım taraması): 10 iddianın yalnız 1'i doğru (zekâ şapkası). "Peri bacası"nın bitişik yazılması ve
  alıntıdan sonra noktanın kaldırılması önerileri TDK kurallarına aykırı. → **Türkçe yazım/dil denetimi Gemini Flash'a verilmez**;
  Flash yalnız taslak metin çeşitlemesi gibi Claude'un zaten denetleyeceği işlerde kullanılır. Türkçe dil denetimi Claude'da kalır.

## 6. Uygulama planı

| Adım | İş | Durum |
|---|---|---|
| 1 | Bu belge + hafıza notu | yapıldı |
| 2 | Codex CLI ve Gemini CLI kurulumu (`npm install -g @openai/codex @google/gemini-cli`) | kuruldu 2026-11-20 (codex-cli 0.171.0, gemini 0.70.0) |
| 3 | Öğretmen her birine bir kez giriş yapar (ChatGPT hesabı / Google hesabı; tarayıcı açılır) | 2'den sonra |
| 4 | Deneme: küçük bir düzeltmeyi Codex'e, bir etkinliğin Türkçe incelemesini Gemini'ye yaptırıp sonucu karşılaştırma | 3'ten sonra |
| 5 | `4d-dis-yapay-zeka` skill'i: brif şablonu, komutlar, verilecek/verilmeyecek dosyalar, çıktı kontrol listesi | deneme iyi giderse |
| 6 | `CLAUDE.md`'ye tek satır yönlendirme (bu belgeye) | 5 ile birlikte |
| 7 | Sonraki haftalık hazırlıkta (12. hafta) bu düzenle ilk gerçek kullanım | — |

## Antigravity masaüstü uygulaması (IDE) ile görev paylaşımı (2026-11-27)
- Öğretmen Antigravity masaüstü uygulamasını kurdu. Kuralları kök dizindeki `GEMINI.md` (Antigravity bunu kendiliğinden okur;
  Codex okumaz). Görev panosu: `docs/antigravity/GOREVLER.md`.
- Öğretmenin kararı (2026-11-27): Antigravity, öğretmen başındayken `main`'den açtığı **`antigravity/<kisa-ad>`** dallarında
  çalışır, yalnız bu dallara commit/push eder (canlıya çıkmazlar). §4'teki "dış araçlar commit/push yapmaz" kuralının tek istisnası budur.
- İşi: görsel düzeltme, dosya küçültme, tarayıcıda deneme, küçük hata, Türkçe dil denetimi. `portal/` ve canlı dallar yasak.
- **Denetim:** yalnız öğretmen sohbette "yayınla" deyince, Claude tek sefer `docs/antigravity/DENETIM-TALIMATI.md`'ye göre yapar
  (önce bedava komut kontrolleri; denetçi ajan yalnız soru/metin değiştiyse). Bulut otonom görevi denetim yapmaz (kota kararı 2026-11-27).

## Antigravity CLI (Gemini Pro) nasıl çağrılır? (2026-11-21)
- Program: `C:\Users\ismai\AppData\Local\Microsoft\WinGet\Packages\Google.AntigravityCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\agy.exe`
  (winget `Google.AntigravityCLI`, sürüm 1.5.13). Giriş öğretmenin Google hesabıyla bir kez yapıldı.
- İstem **stdin'den** verilir, `-p` yazılmaz (PowerShell 5.1 tırnaklı uzun argümanı bozar):
  `[Console]::OutputEncoding=[Text.Encoding]::UTF8; Get-Content istem.txt -Raw -Encoding UTF8 | & $agy --mode plan --print-timeout 240s --model gemini-4-neon-high`
- Başsız modda araç izni sorulamaz: dosyayı kendisi okumaya kalkarsa "auto-denied" der. Bu yüzden incelenecek metin
  **istem dosyasının içine** konur; scratchpad'de çalıştırılır. `--dangerously-skip-permissions` kullanılmaz.
- Öğrenci verisi, `portal/`, anahtar, `KVKK/`, `VeliRaporlari/` istemlere konmaz.
