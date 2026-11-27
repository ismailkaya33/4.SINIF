# 4/D Portalı — İyileştirme Listesi ve Takip

Bu dosyayı takip ajanı her hafta günceller. Öğretmen de elle işaretleyebilir.
Durum: [ ] bekliyor · [~] sürüyor · [x] bitti · [!] öğretmen kararı bekliyor

Son tarama: 2026-11-22 (pazar; dosya/katalog okuma + `haftalik-hatirlatma.mjs`; katalogda 78 kayıt, **gizli 0**; portal dalında takipli 24 — dosya okundu, değiştirilmedi; canlı site/portal denenmedi). Ayrıntılı denetim: `C:\Users\ismai\Projeler\4D_ARASTIRMA_RAPORLARI\`.

## Öğretmen kararları (ajan bunlara uyar)
- Türkçe'de ders kitabı metinleri ve kitap çalışmaları sınıfta KİTAPTAN yapılır; portala metne özel etkinlik yapılmaz (ör. Çanakkale Türküsü, Yılın Babası için etkinlik gerekmez).
- Türkçe etkinlik önerileri yalnızca DİL BİLGİSİ ve OKUMA ANLAMA (kazanım temelli, metinden bağımsız/özgün kısa metinli) alanlarında üretilir.
- 2026-11-10: `Turkce/sozavcıları.html` **eski adında kalır** (öğretmen kararı; ASCII'ye çevirme geri alındı). Etkinliğin dosya yolu
  portalda kimlik olarak kullanılıyor ve Google tablosuna (ETKINLIK_TAMAMLAMA) bu adla yazılıyor; ad değişirse eski
  "Tamamladım" işaretleri eşleşmez. Ad değiştirme önerilmez; gerekirse site + portal dalı + tablodaki kayıtlar aynı gün birlikte değişmeli.
- 2026-11-10: Oyunlar bölümü için defter notu ve değerlendirme gerekmez; eksik sayılmaz, önerilmez.
- 2026-11-27: **Sonuç kuralı** (CLAUDE.md): öğrenci portaldan yaptığı her ders etkinliğinin sonucu öğretmen panelinde görünür.
  Yeni etkinlik sonuç kodsuz/takipsiz yayınlanmaz; geçilen görev sonucu engellemez; portal değişikliği `tools/portal-sonuc-testi.mjs`'ten geçmeden yayınlanmaz.
- 2026-11-23: Trafik (TG.4.1.6 ve TG.4.1.7) için defter notu artık üretilmeyecek; eksik sayılmaz, önerilmez (öğretmen kararı).

### Tüm öğretmen kararları (tek defter — 2026-11-27'de dağınık yerlerden toplandı)
Kural: yeni karar buraya tarihle yazılır; değişen kararın eskisi silinmez, `~~üstü çizilir~~`. Ayrıntılı uygulama CLAUDE.md ve skill'lerde.

**Çalışma düzeni**
- 2026-11-10: Her şey tek yerden: bu klasör + Claude Code. Kural kopyası tutulmaz.
- 2026-11-17: Bulut otonom görevi yalnız `claude/` dallarına onaysız gönderir; `main` ve portal dalı her zaman onaylı.
- 2026-11-20: Haftalık hazırlıkta onaylar başta tek seferde alınır, iş sırasında sorulmaz.
- 2026-11-20: Aynı anda en çok 1–2 alt ajan; tasarruf anlatılmaz, uygulanır; kalite düşmez.
- 2026-11-21: Uzun üretim önce Codex'te; Claude brif + denetim + yayın.
- 2026-11-27: Antigravity yalnız `antigravity/` dallarında; denetimi öğretmen "yayınla" deyince Claude bir kez yapar.
- 2026-11-27: **Dört rol:** Claude (karar, denetim, portal, yayın) · Codex (uzun HTML) · Antigravity (Türkçe denetim, küçük düzeltme) · ChatGPT web (resim). Gemini CLI emekli.
- 2026-11-27: **"Bitti" = canlıda TEST40 ile denendi.** Denenmeyenler aşağıdaki "TEST40 deneme listesi"ne yazılır; öğretmen cuma dener.
- 2026-11-27: **11 Aralık'a kadar yeni özellik molası** (takip boşluğu, deneme, KVKK, temizlik ve haftalık içerik sürer).
- 2026-11-27: **KVKK 3 soru** (gizlilik metni? veli onayı? silme tarihi?) — biri "hayır"sa yapılmaz.
- 2026-11-27: **C bölümünde en çok 10 açık fikir.** Yeni fikir ancak biri arşive inince ya da B'ye geçince eklenir; 4 hafta karar verilmeyen fikir arşive iner.
- 2026-11-27: Bulut otonom görevi haftada 1 (Pazartesi 03:00) çalışır. ~~Günde 2 kez (03:00/13:00), 2026-11-17~~
- 2026-11-27: Sonuç kodu olmayan 45 eski etkinlik toplu dönüştürülmez; biri tekrar için derse alınırsa o gün sonuç kodu eklenip takibe alınır.
- 2026-11-27: `.github/workflows/icerik-bekcisi.yml` main'e her gönderimde içerik denetimi + sonuç kuralı + 1 MB uyarısı yapar (yalnız kontrol).
- 2026-11-27 reddedildi (bir daha önerilmez): kopya belgelere "asıl kaynak" başlığı; eski yedek/test dallarının silinmesi; "klasörde tek yazan oturum" kuralı.

**İçerik**
- 2026-11-10: "X sayfalık" = basılacak A4 PDF. Baskı materyali (ödev, etkinlik kâğıdı) siteye/portala gitmez; yalnız defter notu gider.
- 2026-11-12: Defter notu iki parça: not sayfası + kes-yapıştır görselleri. Basit liste/tablo/soru akışı görsel olmaz, öğrenci yazar (2026-11-14, 2026-11-27).
- 2026-11-13: Sorular kolay olmasın: kazanımın üst sınırı, çok adımlı, tersine çalışma, hata bulma; en kolayı da iki adımlı.
- 2026-11-13: Büyük eski dosyalar şimdilik küçültülmez; yeni etkinlik < 500 KB.
- 2026-11-13: Kavram haritası/şema kodla çizilir (`sketchnote-yap.mjs`), ChatGPT'ye değil.
- 2026-11-14: Resmi ChatGPT çizer (yedek Gemini web), Claude indirir. 2026-11-21: tarz karikatür; kes-yapıştır varsayılan siyah-beyaz.
- 2026-11-20: İnsan Hakları ve Trafik için defter notu yok.
- 2026-11-21: Her defter notu konusuna 2 sayfa A4 etkinlik sayfası + cevap anahtarı; sayfa dolu, satır arası sıkı.
- 2026-11-22: Tahta sorularında gerçek öğrenci adı (yalnız ad) + okul no, yalnız `Baski/` altında, olumlu rolde.
- 2026-11-23: Oyun = canlı aksiyon (Ördek Avcısı, Çarpma Kahramanları); soru + şık + puan oyun değildir. Yeni oyunda mekanik önce onaylanır.
- 2026-11-26: Etkinliklerde okul/öğretmen/öğrenci adı geçmez; açık kütüphane anonim.

**Portal, veri, KVKK**
- 2026-11-10: Öğrenci 6 haneli kodla girer; EKR1/kod kopyalama yolu yok.
- 2026-11-11: ClassDojo raporu portalda; öğrenci başına PDF bölünmez.
- 2026-11-11: Konu değerlendirme puanı ClassDojo'da kalır; Ayın Yıldızları ilk üçü yemek ısmarlama hakkı kazanır.
- 2026-11-12: Portal görsel değişikliğinde önce önizleme gösterilir (V7).
- 2026-11-23: Drive yalnız `Baski/` klasörünü eşitler; tahtaya gidecek dosya `Baski/tahta/`'ya, tek dosya ve internetsiz.
- 2026-11-26: Sosyometri portaldan kaldırıldı; yeniden istenirse kâğıt + rehber öğretmen.
- 2026-11-26: Kaynak kitap: ödev = o gün ders programındaki dersin işlenen konusu; portal yalnız liste gösterir, "yaptım" işareti yok.
- 2026-11-27: Sonuç kuralı ve cevap defteri (soru soru kayıt, ilk kayıt kesin) — yukarıda ve `MIMARI.md` 2.

## TEST40 deneme listesi (öğretmen cuma dener; denenince [x] ve tarih)
Nasıl: telefonda portala TEST40 koduyla girin → maddeyi açın → sonunu getirin → Claude'a "denedim" deyin; Claude tabloda satırı kontrol eder.
- [ ] T1. Yeni öğrenci ana sayfası (12 Kasım): kısayollar, arama, ders süzgeci, "Bu Haftanın Etkinlikleri" şeridi görünüyor mu?
- [ ] T2. Türkçe Kantin Dedektifi bitince `ETKINLIK_SONUCLARI`'na satır düşüyor mu?
- [ ] T3. 10 Kasım'da yayına çıkan 4 etkinlik (Konum Kâşifi, Metin Dedektifi, Güvenli Sürüş, Tahmin Ustası) sonuç yazıyor mu?
- [ ] T4. "Kaynak Kitap Ödevlerim" ve "Ders Programım" kartları doğru görünüyor mu?
- [ ] T5. Cevap defteri (27 Kasım): bir soruyu cevaplayıp etkinliği kapatın, yeniden açın — kaldığı yerden devam ediyor mu?

## A. Eksikler (tespit edildi)
- [~] A1. **2026-11-27 ölçüm (`node tools/sonuc-takip-kontrol.mjs --hepsi`):** sonuç kodu olan her etkinlik takipte; A22'deki 7 etkinlik 27 Kasım'da takibe alındı. KALAN: 45 eski etkinlikte sonuç kodu hiç yok (yalnız "bitirdim" bildirimi) + `Matematik/carpmaatolyesi.html` (26 Kasım, güncel konu) sonuç kodu yok. Bundan sonra `.github/workflows/icerik-bekcisi.yml` her gönderimde denetler. Eski not: (2026-11-22 güncel) Portal dalında takipli kayıt 24; katalogdaki 74 ders etkinliğinin (Oyunlar hariç) ~51'i takipsiz (yol karşılaştırması, doğrulanmalı). En acil: A22 (bu haftanın şeridindeki 7 yeni etkinlik). (skill: 4d-etkinlik-takibe-al)
- [ ] A2-eski. `Turkce/sozavcıları.html` ~4 MB → yalnız görselleri küçült (ad değişmez, bkz. öğretmen kararları)
- [ ] A3. `Fen/besinlerdegerlendirme.html` ~0,7 MB ve `Matematik/toplamacikarmaproblem1.html` ~0,65 MB → görsel/veri küçültme
- 2026-11-13 öğretmen kararı (A2, A3, A14, A15 için): **şimdilik küçültülmeyecek.** İşlenen konunun etkinlikleri gerekmedikçe tekrar açılmıyor; tahtada telefon interneti kullanıldığı için yalnız YENİ etkinlikler küçük tutulur (gömülü resim sıkıştırılmış, hedef < 500 KB).
- [ ] A14. (YENİ 2026-11-11) `Sosyal/kurtulus.html` **~12 MB** (en büyük dosya, önceki listede yoktu): telefonda/yavaş internette açılmayabilir. Görselleri küçült (ad değişmez; portalda kimlik olarak kullanılıyor olabilir).
- [ ] A15. (YENİ 2026-11-11) `Matematik/sayiproblemleri.html` ~1,6 MB → görsel küçültme
- [~] A5. (2026-11-22) 10. hafta defter notlarının çoğu klasörlerde artık var (tr-cikarim-baslik, sos-yonler/kroki, ih-hak-ihlali, mat-carpma, fen-alkol-sigara). KALAN: M.4.1.3.3 (çıkarmada tahmin) için ayrı not görünmüyor (dosya adı eşleşmesi doğrulanmalı).
- [ ] A6. Defter notu dosya adı/uzantı tutarsızlığı (.png/.jpeg/.JPG)
- [ ] A7. Etkinliklerde erişilebilirlik yok (aria etiketi, sesli yönerge, büyük yazı)
- [ ] A8. Etkinlik kataloğunda kazanım kodu alanı yok (kod uydurulmayacak, emin olunmayan "doğrulanmalı")
- [ ] A10. Ünite sonu değerlendirmesi: Fen'de var; Sosyal'de "Geçmişte Biz" eklendi (gizli). Türkçe, Matematik, İnsan Hakları, Trafik yok
- [ ] A11. Baskı materyali yalnız 3 ödev (çalışma kâğıdı, kes-yapıştır yok)
- [ ] A16. (2026-11-22 sayım; doğrulanmalı) 83 etkinlik dosyasının 34'ünde `aria-` var; 82'sinde sesli okuma (speechSynthesis) yok. 20 Kasım'da besin etkinliklerine ekran okuyucu etiketi eklenmiş (git günlüğü) — A7 ile birlikte ele alınacak.
- [~] A12. Etkinlikler otomatik test edilmiyor → 2026-11-27: `tools/sonuc-takip-kontrol.mjs` (sonuç kodu + takip) ve `tools/portal-sonuc-testi.mjs` (portal açma + kayıt) eklendi. KALAN: GitHub Actions'a bağlamak (portal dalında yayından önce otomatik).
- [ ] A17. (YENİ 2026-11-12) `Turkce/DefterNotlari/ozdeyis.PNG` depoda takipsiz (git'e eklenmemiş) görünüyor ve `ozdeyisler.png` ile aynı konu olabilir → öğretmen: iki dosya aynı mı, biri fazla mı? (A6 ile birlikte düzenlenir)
- [~] A18. (2026-11-22) 10. hafta başlıyor (23 Kasım). Defter notu dosyalarının çoğu indirilmiş; portal defter listesine eklenip eklenmediği bu taramada kontrol EDİLMEDİ (portal dalı) → doğrulanmalı. Kalan: Trafik defter notu (A5). Not: İnsan Hakları'nda `haklarimizinpesinde.html` (20 Kasım) Y.4.2.4 etkinliği olabilir — kazanım eşleşmesi doğrulanmalı.
- [~] A19. (2026-11-22; 15 Kasım'a göre) 11–12. hafta boşlukları ad eşleştirmesiyle (doğrulanmalı): KAPANAN: Matematik çarpma (Çarpma Ustaları + 3 defter notu), Sosyal kroki (Kroki Atölyesi + 2 not), Trafik ulaşım araçları, Fen sigara/alkol (etkinlik + 2 defter notu). KALAN: Sosyal doğal/beşerî unsurlar SB.4.3.3, İnsan Hakları Y.4.2.5–Y.4.2.6 (etkinlik yok), Matematik çarpmada ikinci etkinlik (M.4.1.4.2–4.3; doğrulanmalı), Not: C13 (sigara/alkol senaryo kartı) hâlâ geçerli.
- [x] A20. (2026-11-23) `bu-hafta.json` yerelde hazırlandı: başlık "10–12. hafta • 23 Kasım–11 Aralık", bitiş 11 Aralık, 12 etkinlik yolu dosyalarla eşleşiyor. 2026-11-27 öğretmen onayıyla main'e gönderildi. 12. haftanın yeni etkinlikleri çıkınca şerit yeniden düzenlenebilir; sınır 12.

### Türkçe boşluk analizi (2026-11-10) — dil bilgisi ve okuma anlama
Not: etkinliklerde kazanım kodu yazılı olmadığından eşleştirme ADIYLA yapıldı → "doğrulanmalı".
VAR (17 etkinlik): ana fikir/ana duygu, konu, metnin bölümleri, hikâye dedektifi, eş sesli (2), eş-zıt anlam, gerçek/mecaz/terim (2), ikileme, pekiştirme, noktalama, harf-hece, doğru yazım, atasözü-deyim.
YOK (öncelik sırası; hafta = yıllık plandaki ilk geçtiği hafta):
1. Çıkarım yapma T.4.3.28 (h1'den beri) + başlık belirleme T.4.3.21 + bağlamdan anlam tahmini T.4.3.12
2. Gerçek–hayalî ayrımı T.4.3.26, kahraman özellikleri T.4.3.27 (h3–4)
3. Grafik/tablo/çizelge okuma T.4.3.34, görsel soruları T.4.3.13
4. Yönergeleri kavrama T.4.3.25 ve yönerge yazma T.4.4.2 (h13)
5. Bağlaçlar T.4.4.18 (h14), şekil-sembol-işaret T.4.3.22 (h16)
6. Metin türlerini ayırt etme T.4.3.23, bilgi kaynağı güvenilirliği T.4.3.36 (h11)
7. Kısaltmalar T.4.4.16 (h24), sayıları doğru yazma T.4.4.17 (h28)
Önerilen ilk üç etkinlik: (a) Çıkarım ve Başlık Dedektifi, (b) Gerçek mi Hayal mi + Kahraman Karşılaştırma, (c) Tablo ve Grafik Okuma.

## B. Öneriler
### Öğretmen tarafı
- [ ] B1. Raporda "sınıfın en çok zorlandığı kazanımlar" ekranı  (portal dalı → onay şart)
- [ ] B2. Soru bazlı kaydı tüm değerlendirme testlerine yaymak
- [ ] B3. Portal ana sayfasında "bu haftanın etkinlikleri" (yıllık plana bağlı)
- [ ] B4. Veli köşesi: haftalık özet + evde 1–2 etkinlik (öğrenci verisi içermeyen sürüm)
### Öğrenci tarafı
- [ ] B5. Yıldız/rozet ve haftalık ilerleme çubuğu
- [ ] B6. Düşük puanda "tekrar dene / ikinci etkinliğe geç" önerisi
- [ ] B7. Kolay-orta-zor seviye ve ipucu sistemi
- [ ] B8. Sesli yönerge (tarayıcı sesli okuma)
- [ ] B9. Ortak üst çubuk ve ortak tasarım dili (62 etkinlik tek portal gibi)
### Teknik
- [ ] B10. Seçmeli çevrimdışı mod ("bu haftanın etkinliklerini indir")
- [ ] B11. GitHub Actions'a etkinlik açılış/mesaj testi

### Portalın görsel gelişimi (öğretmen isteği, 2026-11-10)
- [ ] V1. Mevcut görünümü incele: öğrenci portalı (Apps Script), `materyaller.html`, `uygulama.html` ekran görüntüleri (telefon + akıllı tahta)
- [ ] V2. Ortak tasarım dili: renk, yazı tipi, düğme, ders renkleri (Türkçe/Matematik/Fen/Sosyal/İnsan Hakları/Trafik) — B9 ile birlikte
- [x] V3. 2026-11-12 akşam canlıya çıktı (portal 0e6ec65 + main bu-hafta.json). Haftalık şerit main'deki `bu-hafta.json`dan okunur; her hafta güncellenmeli (bitiş: 27 Kasım). Gerçek cihazda öğrenci girişiyle henüz denenmedi. Ana sayfa: ders kartları, "bu haftanın etkinlikleri" şeridi, arama ve ders/konu filtresi
- [ ] V4. Büyük, parmakla kolay kullanılan düğmeler; 9–10 yaş için sade yönlendirme; akıllı tahtada okunaklı boyut
- [ ] V5. Giriş ekranı ve ilerleme görünümü (yıldız/rozet — B5 ile birlikte)
- [ ] V6. Etkinlik küçük resimleri ve kısa açıklamalar (şimdi yalnız ad var)
- [ ] V7. ONAYLANDI 2026-11-12 (öğretmen, sohbetten): uygulama Claude Code'da başlatılınca önce önizleme/taslak gösterilir, yayın öncesi öğretmenin görmesi şart (portal dalı anında canlıya çıkar)

### Değerlendirme Sınavları bölümü (öğretmen isteği, 2026-11-10)
- [~] D1. Kararlar (2026-11-10): sınavlar çoğunlukla KONU bazlı, ünite sonlarında ÜNİTE sınavı da olabilir; öğrenciler istedikleri zaman açabilir; sonuçları yalnız ÖĞRETMEN görür (öğrenciye puan/doğru-yanlış gösterilmez, yalnız "tamamlandı" benzeri nötr bitiş ekranı); ders ve konu, öğretmenin yükleyeceği görsellerdeki sorulardan belirlenecek.
  Süre sınırı YOK, tekrar hakkı sınırı YOK (öğretmen kararı, 2026-11-10). Sıradaki: öğretmen görselleri gönderince ilk deneme sınavı.
- [ ] D2. Portalda ayrı "Değerlendirme Sınavları" bölümü; ders ve ünite bazlı liste
- [x] D3. (2026-11-12 akşam kontrol: zaten tamam — sınav main'de yayında, katalogda görünür, `degerlendirme: konu`; portal dalında `mat-toplama-problemleri-sinav` takipte ve ders listesinde. Aşağıdaki not eski.) Ortak sınav şablonu: ilk deneme hazır → `Deneme/mat-toplama-problemleri-sinav.html` (Matematik, 16 özgün soru, M.4.1.2.4 / M.4.1.3.4 / M.4.1.2.2). Tarayıcıda sınandı (portal iframe'inde mesajlar, klavye, telefon, boş bırakma, yarım kalanı sürdürme, localStorage kapalı). Dosya Matematik/ klasörüne taşındı, katalogda GİZLİ kayıtlı, yerelde commit edildi (bc9983a) ama push edilemedi (bu ortamda GitHub yazma yetkisi yok) → ONAYLANDI 2026-11-12 (öğretmen): Claude Code'da gönderilecek. Portala/sonuç kaydına henüz bağlanmadı; portal kaydı (`oyunId: mat-toplama-problemleri-sinav`) ve sınav bölümü öğretmen onayı bekliyor.
- [ ] D4. Sonuçlar öğretmen raporuna soru bazlı düşsün (B2 ile birlikte; yeni sayfa/sekme portal dalı → onay)
- [ ] D5. Kazanım bazlı sonuç özeti (hangi kazanımda eksik) — B1 ile birlikte
- [ ] D6. Mevcut değerlendirmeleri (Fen Besinler, Fen 1. Ünite, Matematik Doğal Sayılar) bu bölüme taşı; eksik ders/ünite sınavlarını planla (A10)
- [ ] D7. Sınav sonrası yanlış yapılan konuya yönlendirme (B6 ile birlikte)

## C. Ajanın yeni fikirleri
(En çok 10 açık fikir — öğretmenin kararı 2026-11-27. Ajan yeni fikri ancak yer varsa ekler; 4 hafta karar verilmeyen fikir C-arşiv'e iner. Öğretmen beğendiğini B'ye taşıtır.)
- [ ] C6. (2026-11-11) **Hafta başı 1 dakikalık "uyarı kartı" raporu:** Raporun en üstünde "Bu hafta hiç etkinlik açmayan öğrenci sayısı" ve "en çok yanlış yapılan 3 kazanım" (isim değil, sayı; ayrıntıya öğretmen girer). B1 ile birlikte yapılabilir.
- [ ] C7. (2026-11-12) **"Hatırlama Köprüsü" mini etkinliği:** Her hafta, 2–3 hafta önce işlenen konudan 3 soruluk kısa etkinlik. Aralıklı tekrar, öğrenileni kalıcı yapar (genel eğitim ilkesi); yeni içerik yazmadan mevcut etkinlik sorularından derlenebilir. Öğretmen hangi konuların tekrar edileceğini seçer.
- [ ] C8. (2026-11-12) **"Çıkış bileti" kartı:** Ders sonunda öğrencinin tek soruluk, yazdırılabilir küçük kartı (günün kazanımı, 1 soru, "anladım / yarım anladım / anlamadım" kutusu). Elle toplanır, teknik kurulum gerekmez; öğretmen ertesi gün hangi konuyu tekrar edeceğini 2 dakikada görür. `Baski/tahta/` günün sorusu düzenine eklenebilir.
- [ ] C9. (2026-11-12) **Büyük dosya bekçisi:** Ders klasörüne 1 MB üstü .html gelince GitHub Actions uyarı yazsın (A14'teki 12 MB gibi sorunlar baştan yakalansın). B11 ile aynı yerde yürür, içeriği değiştirmez, yalnız uyarır.


- [ ] C15. (2026-11-15) **`bu-hafta.json` kırık bağlantı bekçisi:** GitHub Actions'ta dosyadaki her yolun sitede gerçekten var olduğunu ve en çok 12 olduğunu denetleyen küçük kontrol; hata varsa uyarı yazar, içeriği değiştirmez. Haftalık şeridin yanlış yazılan bir yol yüzünden boş/kırık görünmesini önler. C9 ile aynı yerde yürür.
- [ ] C19. (2026-11-15 akşam) **Ortak "Yazıyı büyüt / yüksek kontrast" düğmesi:** Tek küçük ortak dosya (örn. `ortak/erisim.js`) her etkinliğe 2 düğme ekler: yazıyı büyüt, yüksek kontrast. Tahtada arka sıradakiler ve okuma güçlüğü olanlar için işe yarar. A7/B8'den farkı: etkinlikleri tek tek yeniden yazmadan toplu eklenebilmesi. Yeni dosya + etkinlik dosyalarına tek satır eklemek gerekir → onay şart; önce 3 etkinlikte denenmeli (doğrulanmalı).
- [ ] C20. (2026-11-15 akşam) **Haftalık hatırlatmaya "takipsiz etkinlik" bölümü:** `node tools/haftalik-hatirlatma.mjs` çıktısına, o haftanın konusuna ait olup portalda takipli (sonuç gönderen) olmayan etkinliklerin adı eklensin. A1'deki "~43" kaba sayım elle değil araçla ve her hafta aynı yöntemle çıksın. Yalnız araç çıktısı değişir; içerik ve portal dalı etkilenmez.
- [ ] A21. (YENİ 2026-11-18) `Turkce/dogrusunuyaz.html`: "yeraltı / yer altı" ve "kuru yemiş / kuruyemiş" çiftleri TDK'den doğrulanmalı (oyun şu an yeraltı ve kuru yemiş'i doğru sayıyor). TDK sözlük sitesi bulut bilgisayara cevap vermiyor; öğretmen sozluk.gov.tr'den bakıp söyleyecek.
- [x] A22. (2026-11-27 kapandı: 7'si de portal takip listesinde, araçla doğrulandı; TEST40 denemesi T listesinde.) (YENİ 2026-11-22) **Bu haftanın şeridindeki 12 etkinliğin 7'si takipsiz** (sonucu öğretmen raporuna düşmez): Türkçe Gerçek mi Hayal mi, Türkçe Bilgi Dedektifi, Matematik Çarpma Ustaları, Fen Sağlığımı Ben Korurum, Sosyal Kroki Atölyesi, İnsan Hakları Haklarımızın Peşinde, Trafik Ulaşım Araçları. Hepsi 20 Kasım'da eklendi. Öğretmen: pazartesi 23 Kasım'dan önce takibe alınsın mı? (Portal dalı → onay şart; Claude Code'da `4d-etkinlik-takibe-al`.) Doğrulanmalı: aynı işi mevcut takipliler kapsıyor olabilir. (2026-11-23 hazırlık notu) Etkinlik sayfaları sonuç mesajını gönderiyor; kimlikler: tur-gercek-hayal, tur-bilgi-kaynagi, mat-carpma, fen-alkol-sigara, sos-kroki, insan-hak-kisitlama, trafik-ulasim-araclari; kazanım kodları sayfalardan: T.4.3.26/27, T.4.3.36, M.4.1.4.1–2, F.4.2.1.5, SB.4.3.2, Y.4.2.4–5, TG.4.1.7 (hepsi doğrulanmalı); maxTotal 200 (diğerleriyle aynı). Kayıt YAPILMADI: bu bilgisayardaki portal dalı kopyası GitHub'dan 12 değişiklik geride ve güncelleme indirilemedi (bağlantı yarım kaldı); eski kopya üstüne yazmak canlıyı bozabilir. Claude Code'da `git pull` ile güncelleyip `4d-etkinlik-takibe-al` ile yapılmalı, önce öğretmene gösterilip onay alınmalı.
- [x] A23 / A17 → 2026-11-27 öğretmen kararı: `ozdeyis.PNG` fazlalıktı, silindi (`ozdeyisler.png` kalır); repo keşfi dosyaları gönderildi. `Oyunlar/sayikosucusu.html` silindi; reddedilen "Kısa Yol Kervanı" `Yerel/taslaklar/`'da (git dışı), ileride Matematik etkinliğine çevrilebilir.
- [x] A23-eski. (YENİ 2026-11-22) `Turkce/DefterNotlari/ozdeyis.PNG` hâlâ git'te takipsiz (A17) ve `docs/repo-kesif/2026-11-21.md` ile `incelenenler.md` değişikliği commit edilmemiş görünüyor; öğretmen kararı: ozdeyis.PNG mi ozdeyisler.png mi kalsın?
- [ ] C22. (2026-11-22) **Pazartesi "Tek Sayfa Hafta Özeti" çıktısı:** `haftalik-hatirlatma.mjs` çıktısına ek olarak yazdırılabilir tek A4: haftanın kazanımları, her derste tahtada açılacak etkinlik sırası, hazır defter notu, takipli/takipsiz işareti. Öğretmen sabah 1 dakikada bakar. C20'den farkı: ekran çıktısı değil, sınıfa götürülecek kâğıt. Yalnız araç + `Baski/` (git dışı), portal dalı etkilenmez.
- [ ] C23. (2026-11-22) **"Yönerge Dedektifi" planı (T.4.3.25, 13. hafta):** Türkçe boşluk analizi 4. madde hâlâ açık: yönergeyi okuyup adım sırasını doğru dizme etkinliği (özgün kısa yönergeler: oyun kuralı, deney adımı, tarif). Yönerge yazma (T.4.4.2) için kâğıt eki. Kazanım kodları yıllık plan çıktısından, doğrulanmalı. Önce Codex'e brif (iş bölümü kuralı).
- [ ] C26. (2026-11-22) **"Çarpma Hız Kartları" yazdırma paketi (M.4.1.4.x, 11. hafta):** 2–5'lik çarpım tabloları için kesilip katlanan kart ve 1 dakikalık "kaç doğru?" çizelgesi; öğrenci kendi ilerlemesini kâğıtta işaretler (öğrenci verisi dijitale girmez). Çarpma Ustaları etkinliğini tamamlar; `Baski/Matematik/` altında, portal dalına dokunmaz. Kazanım kodları doğrulanmalı.

### C-arşiv (2026-11-27; öğretmen "geri al" derse C'ye döner)
- [arşiv] C1. (2026-11-11) **Sınıf ortak hedefi (iş birliği):** Portalda "4/D bu hafta 150 etkinlik tamamlasın" gibi tek bir ortak ilerleme çubuğu. Öğrenci adı/sıralaması göstermez, yarış yerine takım duygusu verir; çekingen öğrenciyi de motive eder. Portal dalı → onay şart. _(Arşiv nedeni: Yeni portal özelliği (mola).)_
- [arşiv] C2. (2026-11-11) **"Bugün şunu öğreniyorum" cümlesi:** Her etkinliğin açılışında kazanımın çocuk diliyle tek cümlesi (ör. "Metne başlık bulmayı öğreniyorum"). Kazanım kodu uydurmadan; cümleler öğretmen onayıyla yazılır. A8 ile birlikte yürür.
- [arşiv] C3. (2026-11-11) **Yazdırılabilir "Evde 5 Dakika" veli kartı:** Yıllık plandan haftalık otomatik hazırlanan tek sayfalık A5 kart: haftanın konusu, evde yapılacak 1 etkinlik, portal adresi için QR kod. Öğrenci verisi içermez (KVKK metni beklerken de güvenli). B4'ün yazdırılabilir, bekleme gerektirmeyen sürümü.
- [arşiv] C4. (2026-11-11) **Renk körlüğü dostu doğru/yanlış:** Doğru-yanlış geri bildirimi yalnız yeşil/kırmızı değil, ✓ / ✗ simgesi ve kısa yazıyla da verilsin. Etkinliklerde bu durumun nasıl olduğu taranmadı → önce örnek 5 etkinlikte kontrol edilmeli (doğrulanmalı). _(Arşiv nedeni: Antigravity görevi AG3 olarak açık.)_
- [arşiv] C5. (2026-11-11) **Sonuç tablosunun haftalık yedeği:** ETKINLIK_SONUCLARI ve ETKINLIK_TAMAMLAMA sayfalarının haftada bir otomatik kopyası (Google tablosunda zaman tetikleyicisi). Yanlışlıkla silme/bozulmada öğrenci verisi kaybolmaz. Apps Script tarafı → onay şart; Claude canlı siteye kod girmez, kurulumu öğretmen adım adım yapar. _(Arşiv nedeni: Apps Script tarafı (mola).)_
- [arşiv] C10. (2026-11-12) **Dönem sonu "İşlediğimiz Konular" veli sayfası:** Kazanım haritası aracının çıktısından öğrenci verisi içermeyen tek sayfalık özet: dönemde işlenen konular + evde tekrar önerisi. Veli toplantısı/karne günü için; KVKK metni beklerken de güvenli. C3 ile aynı altyapı.
- [arşiv] C11. (2026-11-12) **20 Kasım Dünya Çocuk Hakları Günü ile İnsan Hakları Y.4.2.4 etkinliği:** Eksik olan Y.4.2.4 etkinliğini (hak kısıtlanınca hissedilenleri ifade etme) bu güne denk getir; sonunda sınıfça yazdırılabilir "Haklarım" panosu. 20 Kasım takvim bilgisidir; MEB 2026-27 çalışma takvimi doğrulanmalı. _(Arşiv nedeni: Tarihi geçti (20 Kasım).)_
- [arşiv] C12. (2026-11-12) **24 Kasım Öğretmenler Günü "Teşekkür Kartı" (yazdırılabilir):** Öğrencinin doldurup süsleyeceği tek sayfalık A5 kart (3 cümle başlangıcı). Öğrenci verisi yok, portal dalına dokunmaz; 10. hafta içinde yetişir. Yazma kazanımı kodu doğrulanmalı. _(Arşiv nedeni: Tarihi geçti (24 Kasım).)_
- [arşiv] C13. (2026-11-15) **Sigara/alkol haftası (F.4.2.1.5–6) için "Hayır Diyebilirim" senaryo kartları:** Duygusal olarak hassas konu; puansız, kısa rol canlandırma kartları (arkadaşın teklif etmesi, evde duman, "ne yapabilirim?"). Dil kapsayıcı olmalı: hiçbir çocuğun ailesini işaret etmez, sonuçta öğrenci verisi alınmaz. Yazdırılabilir kart + tahta sunumu olarak Baski/ altında üretilebilir; portal dalına dokunmaz. Kazanım adı yıllık plandan alındı.
- [arşiv] C14. (2026-11-15) **"Sınıfımın Krokisi" yazdırma paketi (SB.4.3.2):** Kareli A4 çalışma kâğıdı + simge/işaret kutusu (kapı, pencere, sıra) + tahtada örnek kroki. Öğrenci kendi sırasından çizer; ölçek/yön (Konum Kâşifi'nde işlenen yönler) pekişir. Kroki çizme bilgisayarda değil kâğıtta daha doğal olduğu için etkinlik yerine baskı önerilir.
- [arşiv] C16. (2026-11-15) **Veli WhatsApp grubu için "Bu hafta" hazır metin:** Yıllık plandan her hafta 4–5 satırlık, çocuk diliyle yazılmış kısa mesaj taslağı (konular + evde sorulacak tek soru + portal adresi). Öğretmen kopyalayıp gönderir; öğrenci adı/puanı içermez. C3'teki basılı karttan farkı: ek baskı gerektirmez, her hafta 1 dakikada hazır.
- [arşiv] C17. (2026-11-15) **Etkinlikte "Soruda hata var" bildirimi:** Öğrenci ya da öğretmen şüpheli soruyu tek dokunuşla işaretlesin; kayıt yalnız etkinlik adı + soru numarası içersin (öğrenci kodu yok). İçerik hatası daha hızlı yakalanır. Portal/Apps Script tarafı → onay şart. _(Arşiv nedeni: Portal özelliği (mola).)_
- [arşiv] C18. (2026-11-15 akşam) **"Okuma Akıcılığı" 1 dakikalık çizelge (kâğıt):** Öğrenci haftada bir kısa özgün metni 1 dakika okur, öğretmen okunan sözcük sayısını sınıf listesine yazar; dönem boyunca küçük bir ilerleme çizgisi çıkar. Okuma stratejisi kazanımlarını (T.4.3.1, T.4.3.6; kodlar yıllık plan çıktısından alındı, doğrulanmalı) somut izler. Elle tutulur, portala/öğrenci verisi dijitale girmez.
- [arşiv] C21. (2026-11-15 akşam) **Çevrimdışı önbellek sürüm kontrolü:** Yeni etkinlik eklenince `sw.js` eski önbelleği gösteriyor mu? Telefonda/tahtada öğrencinin eski sürümü görmesi riskini (özellikle düzeltilen soru) azaltmak için önbellek adına tarih/sürüm eklenmesi düşünülebilir. Henüz `sw.js` incelenmedi → önce okunup durum doğrulanmalı. _(Arşiv nedeni: sw.js etkinlikleri saklamıyor (MIMARI 4); önbellek sürümü 27 Kasım'da yenilendi.)_
- [arşiv] C24. (2026-11-22) **Okuma güçlüğü dostu yazı seçeneği:** Ortak erişim düğmesine (C19) üçüncü seçenek: geniş harf/satır aralığı + açık krem zemin; OFL lisanslı bir okunaklı yazı tipi yerel gömülürse çevrimdışı da çalışır. Tahtada arka sıra ve okuma güçlüğü olan öğrenciler için. Önce 2 etkinlikte denenmeli, yazı tipi lisansı ve dosya boyutu (hedef < 500 KB) doğrulanmalı. Onay şart (etkinlik dosyalarına satır eklenir).
- [arşiv] C25. (2026-11-22) **Etkinlik sonunda "Nasıl geçti?" 3 yüzlü yoklama (puansız):** Kolay / tam kıvamında / zor — tek dokunuş. Öğrenci kodu eklenmeden etkinlik başına sayı olarak toplanır; öğretmen hangi etkinliğin fazla zor/kolay hissedildiğini görür, kazanım temelli zorluk (B7) için veri olur. Portal/Apps Script → onay şart; KVKK metnine yeni veri türü sayılır, önce `gizlilik.html` güncellenmeli. _(Arşiv nedeni: Yeni veri türü (mola + KVKK 3 soru).)_

## D. Tamamlananlar
- [x] 2026-11-22 (A9'dan taşındı; kısmen) 9–10. hafta etkinlikleri ve İnsan Hakları `haklarimizinpesinde.html` (20 Kasım; Y.4.2.4 eşleşmesi doğrulanmalı) katalogda; defter notu eksikleri A5/A18'de.
- [x] 2026-11-22 (git günlüğünden; canlıda denenmedi) 20 Kasım: 7 yeni etkinlik + 7 defter notu + haftalık şerit; Fen sigara/alkol defter notu; besin etkinliklerinde ekran okuyucu etiketi; Kurtuluş etkinliğinde 360 px taşma düzeltmesi.
- [x] 2026-11-18 `Matematik/kayipsayilar.html`: eski Firebase "test kodu" kayıt bölümü kaldırıldı (sonuç akışı kuralına aykırıydı). `Turkce/dogrusunuyaz.html`: kırmızıbiber, açıkgöz, arabozucu bitişik yazım doğru sayılacak şekilde düzeltildi (öğretmen onayı; Claude'un bilgisine göre, TDK sitesinden doğrulanamadı).
- [x] 2026-11-15 (A4'ten taşındı) 2026-11-12 akşam: 3 etkinlik yayına alındı (canlı katalogda gizli=false doğrulandı). "Geçmişte Biz" gizli kaldı.
  ONAYLANDI 2026-11-12 (öğretmen, sohbetten): yayına alınsın — uygulama Claude Code'da başlatılınca yapılır; "Geçmişte Biz" ünite sınavı için açılış zamanı ayrıca sorulmalı. Gizli etkinlikler (4): Sayı Örüntüsü Laboratuvarı, Uzay Gemisi Tamiri, Dünya'nın Hareketleri: Dönme ve Dolanma → [!] yayına alınsın mı? (4. gizli kayıt "Ünite Değerlendirme: Geçmişte Biz" bilerek gizli; ünite sınavı olarak ne zaman açılacağı öğretmen kararı)
- [x] 2026-11-10 A9 (kısmen): Matematik "Tahmin Ustası: Çıkarmada Tahmin" (M.4.1.3.3) yayında ve takipte (`mat-cikarmadatahmin`).
  Fen dengeli beslenme ve Matematik toplama-çıkarma problemleri zaten vardı (Besin Kaşifleri, Problemler 1-2). Defter notu (M.4.1.3.3) henüz yok.
- [x] 2026-11-10 Portal hatası düzeltildi: katalogdan gelen takipli etkinlikler ders listesinde görünmüyordu
  (Tahmin Ustası, İnsan Hakları "Çocuk Yaşantılarını Karşılaştırıyoruz"). Artık görünüyor ve portal içinde açılıyor.
- [x] 2026-11-10 10. hafta (23–27 Kasım) etkinlikleri yayında ve takipte:
  Sosyal "Konum Kâşifi" (SB.4.3.1, `sos-konum`), Türkçe "Metin Dedektifi: Çıkarım ve Başlık" (T.4.3.28 + T.4.3.21, `tur-cikarim-baslik`),
  Trafik "Güvenli Sürüş: Oyun Araçları" (TG.4.1.6, `trafik-oyunaraclari`).
  Kalan: İnsan Hakları Y.4.2.4 (öğretmen kararı: karma — hak kısıtlanıyor mu? puanlı, "ne hissederdin?" puansız).
  Defter notları yok: M.4.1.3.3, SB.4.3.1, T.4.3.28/T.4.3.21, TG.4.1.6.
  Bugünkü 4 etkinlik TEST40 ile gerçek portalda henüz denenmedi (ETKINLIK_SONUCLARI'nda satır çıkmalı).

- [~] 2026-11-12 (Claude, öğretmen okuldayken) — yerelde hazır, GitHub'a gönderilmedi (onay bekliyor):
  · Türkçe "Kantin Dedektifi" (T.4.3.34 tablo/grafik/çizelge, 11 soru, `Turkce/kantindedektifi.html`, oyunId `tur-tablo-grafik`;
    portal kaydı 2026-11-12 akşam eklendi ve canlıya çıktı; TEST40 denemesi bekliyor) → Türkçe boşluk analizi 3. madde kapanır.
    Kantin Dedektifi ve Geçmişte Biz 2026-11-12 akşam main'e gönderildi (yayında).
  · Sosyal 2. Ünite değerlendirmesi "Geçmişte Biz" (SB.4.2.1–4, 16 soru, katalogda gizli + "unite") → A10 kısmen.
  · 10. hafta 5 defter notu ChatGPT'de çizildi, kontrol edildi (M.4.1.3.3, SB.4.3.1, T.4.3.28/21, TG.4.1.6, Y.4.2.3–4);
    öğretmen indirecek → `<Ders>/DefterNotlari/` + portal defter listesi → A5/A9 defter eksikleri kapanır.
  · Kazanım haritası aracı (`tools/kazanim-haritasi.mjs` → `Baski/kazanim-haritasi.html`) → A8'in ilk adımı.
  · Günün Sorusu tahta sunumu 10. hafta (`Baski/tahta/`), boyama posteri istem kütüphanesi (`Baski/istemler/`).
- [~] 2026-11-13 **Haftalık Ders Paketi denemesi (Matematik, 10. hafta 23–27 Kasım, M.4.1.3.4)** — giriş sayfası `Baski/Matematik/hafta10-paket.html`.
  Yeni: Problem Atölyesi (şerit şema, A4'te 2 öğrenci), ödeve "Zorlandım" kutuları, tahtada çözümlü ödev sunumu (`Baski/tahta/mat-problemler-odev-cozum.html`,
  16 soru × Anla/Planla/Çöz/Kontrol), çıkış kartı (`Baski/tahta/mat-cikis-kartlari-hafta10.html` + 16'lı boş kart PDF), ClassDojo puan tablosu.
  Hepsi yerelde (Baski/ GitHub'a gitmez). Sınıfta denendikten sonra öğretmen geri bildirimiyle diğer derslere yayılacak; çarpma (11. hafta) sıradaki paket.
- [x] 2026-11-11 A13 / A13-eski (Türkçe boşluk analizi) kapatıldı; sonuç B bölümü üstündeki 'Türkçe boşluk analizi'nde duruyor.

## E. Haftalık ajan günlüğü
- 2026-11-10: Liste ilk kez oluşturuldu.
- 2026-11-10: sozavcıları.html ad değişikliği geri alındı (öğretmen kararı); A2 yalnız görsel küçültmeye indirildi.
- 2026-11-11: Durum kontrolü yapıldı. Yeni bulgu: `Sosyal/kurtulus.html` ~12 MB (A14), `sayiproblemleri.html` ~1,6 MB (A15). 9–10. hafta etkinlikleri tamam; kalan: İnsan Hakları Y.4.2.4 ve 5 konuda defter notu. 5 yeni fikir (C1–C5, C6) eklendi. Bekleyen [!]: A4 (3 gizli etkinlik), V7 (portal görsel değişikliği), D3 (sınavın push'u). Test/çalıştırma yapılmadı; yalnız dosya taraması.
- 2026-11-12: Durum kontrolü (yalnız dosya taraması, çalıştırma/test yok). Değişen: katalog 68→70 kayıt, takipli kayıt 14→20, Türkçe Kantin Dedektifi (T.4.3.34) ve Sosyal Geçmişte Biz (gizli) eklendi. Dosya boyutları aynı (A2, A3, A14, A15 açık). Bekleyen: 10. hafta defter notlarının indirilmesi (A18), İnsan Hakları Y.4.2.4 etkinliği, A4 ve V7 kararları, D3 push'u. 4 yeni fikir (C7–C10), 2 yeni madde (A17, A18).
- 2026-11-12 (ikinci tarama, aynı gün): liste zaten güncelmiş; rakamlar yeniden doğrulandı (katalog 70, takipli 20, gizli 4, büyük dosyalar aynı). 2 zamana bağlı fikir eklendi (C11–C12). Hiçbir şey çalıştırılıp denenmedi.
- 2026-11-12 (ikinci kayıt): Öğretmen A4, V7 ve D3'ü sohbetten onayladı. Takip ajanı yalnız bu dosyayı düzenlediği için uygulama yapılmadı; Claude Code'da başlatılması bekliyor.
- 2026-11-15 (pazar): Durum kontrolü (yalnız dosya/okuma; test/çalıştırma yok). Katalog 71, gizli 0, takipli 24 (3 gün önce 20→24). Büyük dosyalar aynı (A2/A3/A14/A15 ertelendi). 10. hafta defter notu görselleri hâlâ klasörlerde yok (A5/A18); İnsan Hakları Y.4.2.4 etkinliği yok. Yeni: A19 (11–12. hafta boşlukları), A20 (bu-hafta.json 27 Kasım'da bitiyor), 5 fikir C13–C17. A4 D bölümüne taşındı. Bekleyen [!]: V7, D3 push (uygulama Claude Code'da başlatılınca).
- 2026-11-15 (akşam, ikinci kontrol): Katalog 71, gizli 0, portal dalında takipli 24 (salt okuma), büyük dosyalar aynı (A2/A3/A14/A15 ertelendi), `bu-hafta.json` yolları dosyalarla eşleşiyor (bitiş 27 Kasım). Insanhaklari ve Trafik defter notlarında hâlâ yalnız not-1.txt (A5/A18). Yeni bir eksik yok; 4 yeni fikir (C18–C21). Bekleyen [!]: V7, D3 push — Claude Code'da başlatılınca. Hiçbir şey çalıştırılıp denenmedi.
- 2026-11-22 (pazar): Durum kontrolü (yalnız dosya/katalog okuma ve hatırlatma aracı; canlı site/portal denenmedi). Katalog 71→78, gizli 0, portal dalında takipli 24 (değişmedi) → bu haftanın şeridindeki 12'nin 7'si takipsiz (A22). A9 kapatıldı; A5/A18/A19/A20/A16 güncellendi; büyük dosyalar aynı (ertelendi). 10. hafta 23 Kasım'da başlıyor. Yeni: A22–A23, fikirler C22–C26. Bekleyen [!]: A22, V7, D3 push.
