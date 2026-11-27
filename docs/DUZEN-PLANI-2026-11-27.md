# 4/D Portalı — Yolculuk analizi ve düzen planı

Hazırlanma: 27 Kasım 2026, Claude. Dayanak: 5 Ekim–27 Kasım arası 587 git kaydı (31 dal), hafıza notları (24 dosya),
`IYILESTIRME-LISTESI.md`, `docs/yapay-zeka-is-bolumu.md`, bulut ajanının `docs/autodev/` kayıtları, zamanlanmış görevler.
Canlı site, portal ve tablo bu analiz için açılmadı.

---

## 1. Sizin çalışma biçiminiz (gözlem)

| # | Gördüğüm kalıp | Kanıt |
|---|---|---|
| 1 | **Hedef büyük ve büyüyor.** "Etkinlik sitesi" ile başladı, "her yönüyle sınıf öğretmeni asistanı"na dönüştü. | 7 haftada: portal, öğretmen raporu, ClassDojo raporu, Ayın Yıldızları, KVKK, sosyometri, e-Okul formu, kaynak kitap planı, açık kütüphane, repo keşfi, otonom ajan, 6 yapay zekâ aracı. 1 Kasım'da tek günde 161 kayıt. |
| 2 | **Kuralları önceden değil, beğenmediğiniz anda koyuyorsunuz** — ve o an çok net konuşuyorsunuz. | "Sorular çok kolay, gülebilirler", "Bu oyun değil, test olmuş", "Örnekle alakası yok", "Bunu öğrenci kendisi çizer". Kalıcı kuralların çoğu bu cümlelerden doğdu. |
| 3 | **Bazı kararlar kısa sürede birkaç kez değişiyor.** | Görsel: Claude SVG → Gemini → ChatGPT; siz indirirsiniz → Claude indirir; "olgun, karaktersiz" → renkli karikatür → aynı gün siyah-beyaz. Drive paylaşımı 3 kez değişti. Veli "hayır" → askı → ertesi gün geri. Sosyometri açıldı → 12 gün sonra kaldırıldı. |
| 4 | **Okuldayken iş yürüsün istiyorsunuz.** | "Onayları başta topla, sonra sorma"; telefondan bağlanma; günde 2 kez çalışan bulut ajanı. |
| 5 | **Kota sıkıntısı araç sayısını artırdı.** | Codex, Gemini CLI, Antigravity CLI, Antigravity masaüstü, ChatGPT web, Gemini web, `Promptlar/`, `SOHBET-BASLANGIC.md`, `PORTAL-OZETI…`, `GEMINI.md`. |
| 6 | **Sınıfın gerçeği kâğıt.** | Okul ağı GitHub'ı engelliyor, tahtada telefon interneti kullanıyorsunuz, fotokopi renksiz → işin ağırlığı `Baski/` (PDF) ve Drive'a kaydı. |
| 7 | **Asıl derdiniz hep aynı:** öğrenci konuyu anladı mı? | 11 Kasım'da söylediğiniz; ama yapılan işlerin çoğu yeni içerik/özellik, "anlamayı okuma" tarafı (B1, D4, D5, soru bazlı kayıt) hâlâ bekliyor. |

**Kısaca:** Hızlı, cesur ve net karar veren bir kullanıcısınız. Zayıf nokta sizin değil sistemin: her yeni fikir
yeni bir parça ekliyor, ama eski parçaların "bitti mi, gerçekten çalışıyor mu" kontrolü arkada kalıyor.

---

## 2. Birlikte tekrar tekrar yaptığımız hatalar

### A. "Hazır" dedik ama canlıda denemedik
- TEST40 ile hiç denenmeyenler: yeni ana sayfa (12 Kasım), Kantin Dedektifi, 23 Kasım'daki 4 etkinlik, Kaynak Kitap kartı.
- `ETKINLIK_SONUCLARI`'na satır düştüğü hiçbir yeni etkinlikte doğrulanmadı.
- **Ders:** "Bitti" = canlıda bir kez denendi. Gerisi "hazır, denenmedi".

### B. Elle eşitlenen listeler kayıyor
- Takipli etkinlik: katalogda ~74 ders etkinliği var, portalda yalnız 24'ü sonuç kaydediyor; bu haftanın şeridindeki 12'nin 7'si takipsiz (A22).
- Defter notu: bir not için 4 elle adım vardı (15 Kasım raporu); yeni notlar portalda görünmedi.
- `bu-hafta.json`: her hafta elle; bir kez tarihi geçti.
- **Ders:** Elle iki yere yazılan her şey er geç ayrışır → tek liste + araç ya da otomatik bekçi.

### C. Portal dalı ile main çok ayrıştı
- Portal dalında main'de olmayan **367** kayıt var. Yerel portal kopyası geride kaldığı için 22 Kasım'da takip işi yapılamadı.
- 31 dalın ~20'si eski yedek/test dalı; hangisinin önemli olduğu belirsiz.

### D. Yarım iş yerelde birikiyor
- Şu an klasörde: **`IYILESTIRME-LISTESI.md`'de çözülmemiş birleştirme çakışması** (git "UU" diyor; içinde 3 çakışma işareti var),
  gönderilmemiş `bu-hafta.json`, skill değişikliği, 2 oyun dosyası, `ozdeyis.PNG` (15 gündür kararsız), `Paylasim/`, yeni araç dosyası.
- Çakışma çözülmezse Pazar 23:00'teki "listeyi gönder" görevi de takılır.

### E. Kotayı bir anda yaktık
- 20 Kasım: 7 paralel Opus ajanı + denetim turları → kota iki kez dakikalar içinde bitti.
- 21 Kasım: 35 konuluk etkinlik sayfasını Claude tek başına yazdı → kota yine bitti.
- Bulut ajanı 23 Kasım'dan beri **10 çalışmadır "değişiklik yok"** yazıyor (ONAYLI listesi boş) — boşuna çalışıyor.
  Önceki çalışmalarının ürünü (`claude/` dallarındaki panel ve site düzeltmeleri) hiç canlıya alınmadı.

### F. İçerik kalitesi ilk sürümde tutmadı
- Kolay sorular, "oyun" adına test, gereksiz kes-yapıştır görseli, SVG çizimin zayıf kalması, defter aracının sessizce satır atlaması,
  `kayipsayilar.html`'de eski Firebase kaydı, iki etkinlikte okul adı, `sozavcıları.html`'in adının değiştirilip geri alınması.
- Hepsi düzeltildi ve kurala bağlandı. **Ders:** her düzeltme gerçekten kurala/skill'e girdi; bu iyi çalışıyor.

### G. KVKK sonradan geldi
- Sosyometri yayına çıktı; onay vermeyen bir velinin çocuğu cevapladı. Sonra metin, form, askıya alma yöntemi kuruldu.
- Hâlâ açık: tabloda `VELI_ONAYLARI` sayfası yok; sosyometri cevaplarının silindiği doğrulanmadı; e-Okul formu + tablosunun
  silinmesi bekliyor; gizlilik metninin okul idaresince onayı bekliyor.

### H. Kurallar yine birden çok yerde
- "Tek çalışma yeri" kararı (10 Kasım) sonrası kural kopyaları geri geldi: `GEMINI.md`, `Promptlar/` (11 dosya),
  `SOHBET-BASLANGIC.md`, `PORTAL-OZETI-YAPAY-ZEKA-ICIN.md`.
- Bir çelişki şimdiden oluştu: `CLAUDE.md` "renkli karikatür" diyor, skill ise "varsayılan siyah-beyaz" (21 Kasım kararı).
- Öğretmen kararları 4 yere dağılmış: `CLAUDE.md`, skill'ler, hafıza notları, `IYILESTIRME-LISTESI.md`.

### I. Fikir listesi şişiyor
- C1–C26: 26 fikir, hiçbiri onaylanıp B'ye geçmedi. Liste 30 KB; okunmuyor, sadece büyüyor.

---

## 3. Sizden karar istediğim konular (öneri)

Her birinde benim önerim kalın yazılı. Uygun bulmadığınızı söylemeniz yeterli.

| # | Karar | Öneri |
|---|---|---|
| K1 | **"Bitti" ne demek?** | **Canlıda TEST40 ile bir kez denenmeden "bitti" denmez.** Haftada bir 10 dakikalık "TEST40 turu" (Cuma); Claude size denenecekleri tek liste hâlinde verir. |
| K2 | **2 haftalık yeni özellik molası** | **Evet.** Bu sürede yalnız: takip boşluğu, canlı deneme, KVKK kapanışı, temizlik. Haftalık içerik üretimi sürer. |
| K3 | **Kişisel veri işleyen her yeni fikir** | **Önce 3 soruluk kontrol:** gizlilik metninde var mı? veli onayında var mı? ne zaman silinecek? Üçü "evet" değilse yapılmaz. |
| K4 | **Bulut otonom ajanı** | **Haftada 1 çalışsın (Pazar gece)** ve yalnız ONAYLI listesi doluysa iş yapsın; `claude/` dallarındaki birikmiş işe bir kez birlikte bakıp ya alalım ya silelim. |
| K5 | **Araç sayısı** | **4 aktif rol:** Claude (karar, denetim, portal kodu, yayın) · Codex (uzun HTML) · Antigravity (Türkçe dil denetimi + küçük düzeltme dalları) · ChatGPT web (resim). Gemini CLI (Flash) emekli; Gemini web yalnız yedek. |
| K6 | **Kuralların tek yeri** | **`CLAUDE.md` + skill'ler asıl kaynak.** Diğer yapay zekâ dosyalarının (GEMINI.md, Promptlar, özetler) başına "kopya — asıl kaynak CLAUDE.md, tarih" yazılır; kural değişince Claude hepsini aynı oturumda günceller. |
| K7 | **Karar defteri** | **Tüm öğretmen kararları tek yerde:** `IYILESTIRME-LISTESI.md` → "Öğretmen kararları". Karar değişince eskisi silinmez, üstü çizilip yenisi tarihle yazılır. |
| K8 | **Fikir listesi sınırı** | **En çok 10 açık fikir.** 4 hafta karar verilmeyen "arşiv"e iner; takip ajanı yeni fikri ancak yer açılınca ekler. |
| K9 | **Eski dallar** | **~20 yedek/test dalı silinsin** (önce hepsi tek bir arşiv etiketiyle saklanır, geri getirilebilir). |
| K10 | **Kararsız dosyalar** | `ozdeyis.PNG`, `Oyunlar/kisayolkervani.html` (oyun değil dediğiniz), `sayikosucusu.html`, `Paylasim/` — **her biri için "al / sil / bekle" kararı** bir kez verilsin. |

---

## 4. Envanter: elimizdeki her şey

### Yapay zekâlar
| Araç | Rolü | Durum |
|---|---|---|
| Claude Code (bu oturum, Opus) | Karar, brif, denetim, portal kodu, yayın | aktif |
| `pedagojik-denetci` ajanı (Sonnet) | Yayından önce içerik denetimi, son sürüme bir kez | aktif |
| `repo-kasifi` ajanı (Sonnet) | Haftalık ücretsiz araç keşfi | aktif; 19 Kasım önerileri (Playwright, axe-core, lychee, Excalidraw, OpenBoard) kararınızı bekliyor |
| Codex CLI (ChatGPT Plus) | Uzun etkinlik HTML'i, düzeltme turları | aktif, denendi, güvenilir |
| Antigravity CLI (Gemini Pro) | Türkçe dil denetimi, uzun okuma | aktif, denendi |
| Antigravity masaüstü | `antigravity/` dallarında küçük işler | 27 Kasım'da başladı; 4 görev bekliyor |
| ChatGPT web (Chrome) | Resim çizimi | aktif |
| Gemini web (Chrome) | Resim yedeği | yedek |
| Gemini CLI (ücretsiz Flash) | — | **emekli önerisi**: Türkçede güvenilmez çıktı |

### Zamanlanmış görevler
| Görev | Ne zaman | Yer | Not |
|---|---|---|---|
| Otonom proje geliştirme | Her gün 03:00 ve 13:00 | Bulut | 10 çalışmadır boş → K4 |
| İyileştirme listesi takip ajanı | Pazar 22:13 | Bulut (Cowork) | yalnız listeyi düzenler |
| İyileştirme listesini gönder | Pazar 23:00 | Bu bilgisayar | çakışma çözülmeli |
| Repo keşfi | Cumartesi 10:00 | Bu bilgisayar | |
| Haftalık hatırlatma | Cuma 16:00 | Bu bilgisayar | |

### Skill'ler (iş tarifleri)
`4d-icerik-uret`, `4d-etkinlik-takibe-al`, `4d-canli-kontrol`, `4d-haftalik-hatirlatma`, `4d-kaynak-kitap-odev`.

### Araçlar (`tools/`)
İçerik: `sketchnote-yap`, `etkinlik-sayfasi-yap`, `defter-bas`, `gorsel-uret` (faturasız, kapalı).
Liste/kontrol: `icerik-katalogu-guncelle`, `icerik-denetle`, `kazanim-haritasi`, `haftalik-hatirlatma`, `yillik-plan-oku`, `kaynak-odev-oner`.
Rapor: `classdojo-rapor.py`. Form: `eokul-bilgi-formu/`.

### Belgeler (kim neyi okur)
| Dosya | Okuyan | Tür |
|---|---|---|
| `CLAUDE.md`, `.claude/skills/` | Claude | **asıl kaynak** |
| `MIMARI.md` | herkes | asıl kaynak (yapı) |
| `IYILESTIRME-LISTESI.md` | Claude, takip ajanı, otonom ajan | iş listesi + kararlar |
| `docs/yapay-zeka-is-bolumu.md` | Claude | asıl kaynak (iş bölümü) |
| `GEMINI.md`, `docs/antigravity/*` | Antigravity | kopya |
| `Promptlar/*` | siz (kota bitince) | kopya |
| `SOHBET-BASLANGIC.md` | siz (sohbet yapay zekâsı) | kopya |
| `docs/PORTAL-OZETI-YAPAY-ZEKA-ICIN.md` | dış yapay zekâ | kopya (25 Kasım fotoğrafı) |
| `docs/FABLE-DENEME-RAPORU.md` | — | arşiv |

---

## 5. Düzen planı

### Ek ders (27 Kasım, Aşama 0 sırasında görüldü)
Aynı klasörde aynı gün 5 ayrı Claude oturumu çalışmış; biri bu oturum sürerken çakışmayı çözüp yeni dosya bıraktı.
**Kural önerisi:** bir oturum klasörde iş yaparken ikincisi yalnız okur; yazacaksa kendi kopyasında (worktree) çalışır.
Bir oturum işini bitirince kendi dosyalarını commit eder; başka oturumun dosyasına dokunulmaz.

### Aşama 0 — Masayı toplama (tek oturum, bu hafta sonu) — 27 Kasım'da yapıldı
Sonuç: çakışmayı başka oturum çözmüştü; görsel tarz çelişkisi giderildi; `ozdeyis.PNG` ve `sayikosucusu.html` silindi,
Kervan `Yerel/taslaklar/`'a taşındı; bekleyenler main'e gönderildi. Açık kalan: `Paylasim/`, `docs/PORTAL-OZETI…`,
`tools/etkinlik-sayfasi/mat-carpma-kutulu.mjs` (kararı sorulmadı), `tools/cevap-defteri-testi.mjs` (başka oturumun işi).

1. `IYILESTIRME-LISTESI.md` çakışmasını çöz (iki sürümü yan yana gösteririm, hangisinin kalacağını siz seçersiniz).
2. Bekleyen yerel değişiklikler için K10 kararları → commit; `bu-hafta.json`'un 11 Aralık sürümünü gönder (canlıdaki 4 Aralık'ta bitiyor).
3. `CLAUDE.md`'deki görsel tarz cümlesini skill ile aynı yap (siyah-beyaz varsayılan).
4. Klasörü `main`'de, temiz bırak.

### Aşama 1 — Tek kaynak ve sade araç takımı — 27 Kasım'da yapıldı
Kararlar: K1, K2 (11 Aralık'a kadar), K3, K4 (Pazartesi 03:00), K5, K7, K8 kabul; K6, K9 ve "tek yazan oturum" **reddedildi**.
Yapılanlar: kurallar CLAUDE.md'ye; bütün kararlar ve TEST40 deneme listesi `IYILESTIRME-LISTESI.md`'ye; fikirler 26 → 10 açık
(16'sı C-arşiv'de); iş bölümünde Gemini CLI emekli; envanter `MIMARI.md` 8. bölümde; bulut ajanı haftalık.
Aşağıdaki özgün adımlar kayıt için duruyor.

1. Bu belgedeki envanteri `MIMARI.md`'ye "Araçlar ve ajanlar" bölümü olarak taşı; bu belge arşive iner.
2. Kopya belgelerin başına "asıl kaynak / tarih" satırı; `PORTAL-OZETI`'ni yeniden üretmeyi tek komut yap.
3. Dağınık kararları `IYILESTIRME-LISTESI.md` → "Öğretmen kararları"na topla (K7); hafıza notları yalnız oraya işaret etsin.
4. Fikir listesini 10'a indir (K8): sizinle 10 dakikalık "al / arşiv" turu.
5. Gemini CLI'yi iş bölümünden çıkar; otonom ajanı haftalığa çek (K4, K5).

### Aşama 2 — Elle eşitlenenleri bitirme (2. hafta)
1. **Takip boşluğu (A22):** portal dalını güncelle, şeritteki 7 etkinliği takibe al — önce size gösterilir, onayla gönderilir.
2. `haftalik-hatirlatma` çıktısına "takipsiz etkinlik" ve "portalda görünmeyen defter notu" bölümü (C20).
3. GitHub Actions bekçileri (yalnız uyarır, içeriği değiştirmez): 1 MB üstü dosya (C9), `bu-hafta.json` kırık yol (C15),
   portal listesinde olmayan defter notu. İleride: Playwright ile "etkinlik açılıyor, sonuç mesajı gidiyor mu" testi (B11).
4. `claude/` dallarındaki birikmiş işi birlikte gözden geçir → al ya da sil; eski dalları arşivle (K9).

### Aşama 3 — Doğrulama ve KVKK kapanışı (3. hafta)
1. İlk "TEST40 turu": denenmemiş tüm canlı işler tek listede (K1). Sonuçlar listeye "denendi" diye işlenir.
2. KVKK: `VELI_ONAYLARI` sayfası, sosyometri cevaplarının silinmesi, e-Okul formunun silinmesi, idare onayı — her biri için
   size tıklanacak adımlar tek tek yazılır.
3. "Anlamayı okuma" işine dönüş: B1/C6 (en çok zorlanılan kazanım, hafta başı uyarı kartı) — asıl derdinize hizmet eden ilk yeni özellik.

### Sürekli haftalık ritim (Aşama 3'ten sonra)
| Gün | Ne olur | Kim |
|---|---|---|
| Cuma 16:00 | Sıradaki haftanın konuları + eksikler + takipsizler | zamanlanmış görev |
| Hafta sonu | Haftalık hazırlık: onaylar başta tek seferde, üretim Codex'te, denetim + yayın Claude'da | siz + Claude |
| Pazar gece | İyileştirme listesi güncellenir; (onaylı iş varsa) otonom ajan çalışır | bulut |
| Hafta içi | Sınıfta kullanım; telefondan küçük düzeltmeler | siz |
| Cuma | 10 dakikalık TEST40 turu + haftanın sonuçlarına bakış | siz (liste Claude'dan) |

### Başarı ölçüsü (3 hafta sonra bakacağız)
- Klasörde 1 günden eski commit edilmemiş değişiklik yok.
- Şeritteki etkinliklerin hepsi takipli; canlıda denenmemiş iş listesi boş.
- Açık fikir ≤ 10; kural çelişkisi yok; otonom ajanın boş çalışması yok.
- KVKK bekleyenleri kapandı.
