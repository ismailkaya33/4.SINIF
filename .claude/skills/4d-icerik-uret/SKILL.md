---
name: 4d-icerik-uret
description: 4/D sınıfı için MEB 4. sınıf kazanımlarına uygun her türlü eğitim içeriği üretirken kullan — interaktif etkinlik/oyun (tek dosya HTML), değerlendirme testi, defter notu, çalışma kâğıdı, ev ödevi, akıllı tahta sunumu. "Şu kazanım için etkinlik yap", "oyun hazırla", "defter notu", "çalışma kâğıdı", "değerlendirme testi" gibi isteklerde devreye girer. İçeriği üretir, kontrol eder, depodaki doğru ders klasörüne koyar.
---

# 4/D — Eğitim içeriği üretimi (tek kaynak)

Kullanıcı 4/D sınıf öğretmenidir, kod bilmez. Sade Türkçe konuş; teknik terimi kullanırsan kısa bir benzetmeyle açıkla.
Bu skill, sohbetten gelen iki belgenin birleşimidir:
- **Bağlayıcı kalite kuralları:** `references/egitim-icerik-standartlari.md` (her işte uygulanır; istekle çelişirse o iş için istek geçerlidir).
- **Etkileşimli etkinlik yöntemi:** aşağıdaki bölümler + `references/ornek-analizi.md`, `references/portal-bulgulari.md`.

Öncelik sırası: **kazanım doğruluğu > öğrenmeyi gerçekten sağlayan mekanik > çalışan, test edilmiş kod > görsel zenginlik ve eğlence > hız.**
Görsel zenginlik "varsa iyi olur" değil, **zorunludur** (bkz. bölüm 4.1). Düz, süssüz, eğlencesiz etkinlik teslim edilmez.

## 0. Başlamadan önce (eksik olanı tek mesajda sor, en fazla 3 soru)
- Ders, ünite, **kazanım kodu ve metni** (kodu uydurma; emin değilsen "doğrulanmalı" diye işaretle ve sor)
- Çıktı türü: etkileşimli etkinlik / oyun / değerlendirme / defter notu / çalışma kâğıdı / sunum
- Kaynak: ünite PDF'i, görsel zip'i var mı? Fotoğraf/harita yalnızca öğretmenin verdiği dosyalardan kullanılır.
Kullanıcı hazır bir istem veya dosya verdiyse onu esas al, tekrar sorma.

## 1. Kazanım planı — üretimden önce yaz
| Kazanım kodu | Kazanım (öğrenci dili) | Bilişsel eylem | Madde sayısı | Hedeflenen yanılgı etiketleri | Mekanik |
|---|---|---|---|---|---|
- Etkinlik başına 1–4 kazanım, her kazanım için **en az 4 madde** (panel 3'ün altında "veri az" der).
- Her yanlış seçenek gerçek bir **yanılgıyı** temsil eder ve etiketlenir (`elde-unuttu`, `hep-yukari`).
- Maddeler kolaydan zora; aynı cümle/olay/durum iki soruda kullanılmaz (tekrar yasağı).
Büyük işlerde planı gösterip onay al (prototip → onay → devam).

## 2. Tür ve mekanik seçimi
| Kazanımın doğası | Uygun tür | Uygun olmayan |
|---|---|---|
| Otomatikleştirme (çarpım tablosu, hızlı işlem) | Aksiyon/koşu/nişan, kısa sorular, ayarlanabilir tempo | — |
| Kavram, sınıflama | Sürükle-bırak sınıflama, eşleştirme, sıralama, kart çevirme | Hızlı aksiyon |
| Sıralama/süreç | Olay kartlarını sıraya koyma, bölüm etiketleme | Sırayı yönergede söylemek |
| Yorumlama, çıkarım | Kaynak metin/görsel + soru merdiveni, ipucu | Süreli yarış |
| Tutum/değer | Senaryo + gerekçeli seçim, puansız yansıtma | Notlu doğru-yanlış |
| Uzamsal/bilimsel model | Sürüklenebilir model, tahmin et-dene-açıkla | Yalnız metin sorusu |
- Ana eylem kazanımın bilişsel eylemiyle aynı olsun. Aynı soruyu farklı görünümle sunmak yeni mod değildir.
- Çok mekanikli oyunda önce en fazla 2–3 mekanik **tam çalışır** yapılır; yarım mekanik teslim edilmez.
- 5–15 dakika; 3–5 kademe; yenilgi ceza değil, yanlış konunun yeniden sorulduğu fırsattır.

## 3. Soru, çeldirici, geri bildirim
- Çeldirici = gerçek yanılgı; tek doğru kesin; seçeneklerde eş/yakın anlamlı ifade yok; cevap metinde sızmıyor.
- Seçenekler her gösterimde karışır; doğru cevap kimlikle tutulur, sürekli en uzun seçenek olmaz. Doğru-yanlışı az kullan.
- Yanlışta: "Henüz değil" + ipucu (≤3 kademe) → ikinci şans → 2. yanlışta açıklamalı çözüm. Doğru cevap ekranda okunacak kadar kalır ("Devam" düğmesi).
- Her maddede kısa `why` (neden doğru). Geçilen soruya sonra dönülebilir; bölüm sonunda yanlışlara "bir şans daha".
- Sorular özgün; kitaptan aynen kopya yok. Atatürk'e söz atfı yok; gerçekçi şiddet ve korkutucu öğe yok.

## 4. Teknik standart (HTML etkinlik/oyun)
- **Tek dosya**, çevrimdışı: dış CDN, Google Fonts, harici görsel yok (görsel gerekiyorsa dosyaya gömülü). Sistem fontu, Web Audio sesi (kapatılabilir).
- Akıllı tahta + telefon/tablet aynı sürüm; dokunma, fare, klavye aynı durumu günceller; büyük dokunma alanları, ≥18 px yazı, taşma yok.
- **Veri ile motor ayrı:** içerik dosyanın başında yorumlu tek `OYUN` nesnesinde; öğretmen kodu bozmadan değiştirebilir.
- Tek `state`, tek doğrulama fonksiyonu, çift tıklama kilidi; ilerleme/rekor `localStorage`'da, her erişim `try/catch` içinde.
- Erişilebilirlik: renk + simge + metin; kontrast; `prefers-reduced-motion`; `lang="tr"`, UTF-8.
- `alert/confirm/prompt` kullanma (portal penceresinde engellenebilir).

## 4.1 Görsel zenginlik ve eğlence (zorunlu)
Öğretmenin kararı (2026-11-10): etkinlikler görsel olarak **zengin, renkli ve eğlenceli** olur. Beyaz zemin + düz metin +
gri düğmeden oluşan "sade" ekran kabul edilmez. Görsel, öğrenmeyi destekler; süs de serbesttir ama soruyu gölgelemez.
- **Tema ve hikâye:** Her etkinliğin konuyla bağlantılı bir teması olur (kesirler → pizzacı, besinler → aşçı mutfağı,
  trafik → şehir haritası, noktalama → dedektif). Başlık ekranında büyük tema çizimi + bir-iki cümlelik hikâye/görev.
- **Rehber karakter:** SVG ile çizilmiş, konuya uygun sevimli bir karakter. Doğruda sevinir, yanlışta "bir daha dene"
  der; ipucunu konuşma balonuyla verir. Karakter her etkinlikte farklı olabilir.
- **Her soruda görsel:** Soru kartında konuyu canlandıran bir çizim veya simge bulunur (SVG, CSS çizimi, emoji).
  Matematikte nesne grupları, model, sayı doğrusu, kesir şekli; Fen'de organ/besin/devre çizimi; Türkçe'de olay sahnesi;
  Sosyal'de mekân/zaman çizelgesi. Görsel cevabı sızdırmaz.
- **Renk ve zemin:** Derse ve temaya özgü canlı palet (CSS değişkenleri), desenli veya geçişli (gradyan) arka plan,
  gölgeli yuvarlak köşeli kartlar, renkli büyük düğmeler, büyük ve dost görünümlü başlık yazısı. Kontrast korunur.
- **Hareket ve kutlama:** Doğruda konfeti/yıldız patlaması, puanın sayarak artması, kartın zıplaması; yanlışta hafif
  sallanma; bölüm geçişinde kısa animasyon. Her efekt ≤1 sn, oyunu bekletmez, `prefers-reduced-motion` açıksa kapanır.
- **Ödül ve ilerleme:** Toplanan yıldız/rozet/nesne, görsel ilerleme çubuğu veya ilerlenen yol haritası,
  bölüm sonunda rozet ekranı. Bitiş ekranı bir kutlama ekranıdır (karakter + rozetler + "Kazanım Karnem").
- **Ses:** Web Audio ile kısa doğru/yanlış/kutlama sesleri; varsayılan açık, köşede görünür ses kapatma düğmesi.
- **Teknik sınır (değişmez):** Her şey dosyaya gömülü: satır içi SVG, CSS, emoji, Canvas. Dış görsel, font, kütüphane yok.
  Gerçek fotoğraf/harita yalnız öğretmenin verdiği dosyalardan. Düşük donanımlı tablette akıcı kalır (büyük resim yerine
  SVG; aynı anda en fazla ~60 konfeti parçası).
- **Ölçü:** Soru metni ve seçenekler ekranın en görünür öğesidir; okuma alanının arkası sakin kalır; sürekli yanıp sönen
  veya döngüde dönen dikkat dağıtıcı öğe yok.
- **Görsel kontrol:** Teslimden önce Edge headless ile başlık, soru, doğru geri bildirim ve bitiş ekranının görüntüsü
  alınır; "Bir 4. sınıf öğrencisi bunu açınca heyecanlanır mı?" sorusuna dürüstçe bakılır, cevap hayırsa zenginleştirilir.
  Görüntüler öğretmene gösterilir.
- Bu bölüm **baskı materyaline uygulanmaz** (defter notu, çalışma kâğıdı, ev ödevi az mürekkepli kalır; ama küçük
  siyah-beyaz çizim ve simge eklenebilir).

## 4.2 Resimli materyal: Gemini ile çizim (öğretmenin kararı, 2026-11-12)
Claude kodla (SVG) ancak basit çizim yapar. **Boyama sayfası, poster, resimli defter notu gibi illüstrasyon kalitesi
gereken işlerde resmi yapay zekâ çizer**; Claude istemi yazar, kontrol eder, sayfaya yerleştirir.
**Varsayılan yol: Chrome'daki Gemini (aşağıda 1–5).** Öğretmenin kararı (2026-11-12): API ücretsiz katmanında resim
modelleri kapalı (limit 0), faturalandırma açılmadı; tam boyutlu resmi öğretmen kendisi indirir ve `İndirilenler`
klasörüne düşer — Claude oradan `Baski/<Ders>/` klasörüne ASCII adla kopyalar, PDF'i `--pdf-yap` ile basar:
`node tools/gorsel-uret.mjs --pdf-yap Baski/<Ders>/<konu>-boyama.png --adtarih`.
**Araç yolu (yalnız faturalandırma açılırsa):** `GEMINI_API_KEY` (Türkçe klavyede `GEMİNİ_API_KEY` de olur) ile:
```
node tools/gorsel-uret.mjs --istem <istem.txt> --cikti Baski/<Ders>/<konu>-boyama.png --pdf [--adtarih] [--ornek ornek.png]
```
İstem dosyası scratchpad'e yazılır. Örnek resim verilirse (öğretmenin attığı örnek ya da düzeltilecek önceki çıktı)
`--ornek` ile eklenir; düzeltmede istem "bu resimde yalnız şunu değiştir: …" diye yazılır. Model hatasında
`--modeller` ile güncel görsel modeli bulunur, `--model` ile verilir. Yedek: `--saglayici openai` (`OPENAI_API_KEY`).
Çıktı resmi Claude açıp (Read) bölüm 3'teki gibi kontrol eder.

**Görsel tarz (öğretmenin kararı, 2026-11-12):** Resimli defter notu, poster ve resimli çalışma kâğıdı **boyama sayfası
gibi olmaz**: kalın siyah dış çizgi, büyük sevimli çizgi film karakteri ve aşırı süs yok. Konu 4. sınıf düzeyinde kalır
ama görünüm olgun ve düzenlidir (10–13 yaş). İki tarzdan biri kullanılır; hangisi olacağına konuya göre Claude karar
verir ve öğretmene hangisini seçtiğini bir cümleyle söyler:
- **El yazısı defter** (işlem, kural, adım adım çözüm ağırlıklı konular: Matematik işlemleri, yazım/noktalama, dil
  bilgisi). İstemin tarz kısmı: "kareli defter sayfası üzerine öğrencinin kendi el yazısıyla tuttuğu düzenli ders notu
  (bullet journal), koyu mavi tükenmez kalem yazısı, önemli kelimelerin altında sarı ve pembe fosforlu kalem vurgusu,
  başlığın üstünde yarı saydam yeşil washi bant, kenarlarda küçük el çizimi oklar ve kesik çizgili not kutusu; karakter
  yok, temiz illüstrasyon."
- **Sketchnote** (kavram, süreç, ilişki ağırlıklı konular: Fen, Sosyal, İnsan Hakları, Trafik, metin türleri, kavram
  haritası). İstemin tarz kısmı: "sketchnote (görsel not) tarzı, beyaz zemin üzerinde ince siyah kalem çizgileri, yalnız
  sarı ve mavi iki vurgu rengi, el çizimi düzensiz çerçeveler ve konuşma bulutları, kıvrımlı oklar, küçük fikir çizimleri
  (ampul, büyüteç, konuyla ilgili nesne), el yazısı görünümlü ama okunaklı yazı; sevimli karakter yok."
- Her istemde ayrıca: "Hedef kitle 10–13 yaş: görünüm olgun, düzenli ve okunaklı olsun; boyama sayfası gibi kalın siyah
  dış çizgiler, büyük sevimli çizgi film karakterleri ve aşırı süs olmasın."
- Öğretmen açıkça **boyama sayfası** isterse yalnız o iş için aşağıdaki boyama tarifi kullanılır.

Tarayıcı yolu:
1. **Claude in Chrome** ile yeni sekmede `gemini.google.com/app` açılır (öğretmenin hesabı Chrome'da açık; Claude
   giriş yapmaz, şifre girmez). Giriş yoksa öğretmenden girmesini iste.
2. İstem Claude tarafından Türkçe ve ayrıntılı yazılır: "Bir görsel oluştur:" + sınıf düzeyi + biçim (A4 dikey;
   boyama ise "yalnız kalın siyah dış çizgi, beyaz zemin, renk/gri/gölge yok, büyük boyama alanları") + başlık ve her
   kartın adı/sahnesi + "tüm yazılar doğru Türkçe karakterlerle". Kazanıma bağlı içerik planı istemden önce yapılır.
3. Sonuç ekranda kontrol edilir: Türkçe yazım (İ/ı, ş, ğ), eksik/yanlış kart, korkutucu veya uygunsuz öğe. Hata
   varsa aynı sohbette düzeltme istenir (en fazla 2–3 tur), sonra öğretmene gösterilir.
4. Tam boyutlu resmi **öğretmen indirir** (Claude indirme düğmesine basmaz; öğretmene "resmin üstündeki indirme
   düğmesi" der). Claude `İndirilenler`'deki en yeni resmi açıp doğrular, `Baski/<Ders>/` klasörüne ASCII adla
   kopyalar (`<konu>-boyama.png`). Ön izleme resmi (~700 px) baskı için yetersizdir, kullanılmaz.
5. Claude resmi A4 HTML'e yerleştirir (gerekirse Ad/Tarih şeridi) ve Edge ile PDF basar. Teslim: PNG + PDF.
- **Hazır istemler:** `Baski/istemler/boyama-posterleri.md` (Sosyal + Fen, yıl boyu, ORTAK BAŞ + konu İÇERİK) ve
  `Baski/istemler/defter-notlari-*.md` (renkli defter notu stili). Yeni istem yazınca buraya eklenir.
- Chrome'da ChatGPT'ye yazarken: yeni sohbet aç, kutuya **tıkla** (arka sekmede odak gelmez), tek paragraf yaz, Enter.
  Birkaç istek ayrı sekmelerde aynı anda gönderilebilir. Sonucu görmek için resmi JS ile tam ekran kaplamaya koyup
  `zoom` ile iki yarıda oku, sonra kaplamayı kaldır.
- **ChatGPT** (`chatgpt.com`, öğretmenin Plus hesabı Chrome'da açık): aynı akış. 2026-11-12 karşılaştırmasında
  öğretmen ChatGPT çizimini daha iyi buldu → **önce ChatGPT**, Gemini yedek. İstem tek paragraf yazılır (Enter gönderir).
  ChatGPT resmi 1024×1536 verir (A4'te ~125 dpi, çizgi için yeterli).
- Gerçek kişi, marka, çizgi film karakteri veya kitap sayfası taklidi istenmez; Atatürk/tarihî kişi resmi çizdirilmez
  (öğretmenin verdiği görsel kullanılır).
- Etkileşimli HTML etkinliklerde görseller yine dosyaya gömülü olur; Gemini resmi gömülecekse küçültülüp
  (WebP/PNG, birkaç yüz KB) `data:` olarak eklenir.

## 5. Öğretmene sonuç (portal bağlantısı)
Öğrenciler 6 haneli kodla portala girer; etkinlik portalın içinde açılınca sonuç öğretmen paneline kendiliğinden gider. **EKR1 kodu, öğrencinin kod kopyalaması ve ayrı öğretmen paneli YOKTUR.**
- `assets/rapor_motoru.js` (v2) etkinliğe gömülür: `python -I scripts/birlestir.py kaynak.html cikti.html`.
- Oyun başında `RaporMotoru.init({oyunId, oyunAdi, kazanimlar})`, her maddeden sonra `RaporMotoru.kaydet({kazanim, madde, yanilgi, ilkDenemeDogru, deneme, ipucu, cozumGoruldu, sureMs, tekrar})`, sonda `RaporMotoru.ekranCiz(el)` (öğrenciye "Kazanım Karnem" + sonucu portala gönderir; oyun başına bir kez).
- `oyunId` = portal kayıt listesindeki kimlik (ör. `tur-ikilemeler`). Yeni kimlik için `4d-etkinlik-takibe-al` skill'ine göre `portal/etkinlik-kayitlari.json` dosyasına eklenir (portal dalı; canlıya çıkmadan önce öğretmenin onayı).
- **Oyunlar klasörü için sonuç kaydı gerekmez** (öğretmenin kararı); rapor motoru eklenmeyebilir.
- **Oyunlar bölümüne defter notu ve değerlendirme (test) yapılmaz, önerilmez, eksik sayılmaz** (öğretmenin kararı).
  Oyunlar yalnız oyundur; `Oyunlar/DefterNotlari/` klasörü açılmaz.
- Seviye kuralı: ilk denemede doğru ≥%85 ve ipucu ≤%25 → Ustalaştı; ≥%60 → Gelişiyor; altı → Destek gerekli; <3 madde → Veri az; `tekrar` maddeleri seviyeye katılmaz.
- Madde bazlı mesaj (`4d:item-result`) motor tarafından gönderilir; portalın bunu kaydetmesi ayrı bir geliştirmedir (kurulmadıysa kurulmuş gibi söyleme).

## 6. Diğer çıktılar
- **Defter notu / çalışma kâğıdı / ev ödevi / ölçme / sunum:** `references/egitim-icerik-standartlari.md` bölüm 4–6'ya uy (A4, az mürekkep; cevap anahtarı ayrı; kazanım–soru eşleşme tablosu; slaytta tek kavram).
- Defter notu görselleri `<Ders>/DefterNotlari/` altına gider; portal defter listesi ayrıca güncellenir (portal dalı).
- **Çıktı alınacak materyal (ev ödevi, sınıf içi etkinlik kâğıdı, çalışma kâğıdı, ölçme kâğıdı) siteye/portala gönderilmez
  ve gönderilsin mi diye sorulmaz** (öğretmenin kararı: PDF'i basıp dağıtıyor). Öğretmen açıkça isterse gönderilir.
  Bu dosyalar ders klasörüne değil `Baski/<Ders>/` klasörüne konur (yalnızca bu bilgisayarda; `.git/info/exclude` ile
  GitHub'a gitmez). Teslim: HTML + Edge ile basılmış A4 PDF yan yana; cevap anahtarı ayrı PDF.
  Defter notu bu kuralın dışındadır (portala gider).

## 7. Çalışma akışı ve dosyanın yeri
1. Kazanımı 2–3 satırda özetle, türü ve mekaniği bir cümleyle gerekçelendir, kazanım planını yaz.
2. Etkinliği `assets/oyun-iskeleti.html` kalıbından başlat (karıştırma, ipucu, ikinci şans, çözüm, rapor çağrıları hazır), içeriği `OYUN` nesnesine yaz, motoru `birlestir.py` ile göm.
   Kalıpta görsel donanım hazırdır: `OYUN.tema` (renkler, hikâye, karakter adı, ödül simgesi), `sahneSVG()` başlık çizimi,
   `karakterSVG()` rehber karakter (mutlu/düşün/üzgün), her maddede `gorsel` (`bloklar`, `sayiDogrusu`, `emoji`, `svg`),
   konfeti, ses, yol haritası, rozetli bitiş ekranı. **Tema, sahne ve karakter her etkinlikte konuya göre değiştirilir**
   (örnekteki "Hazine Adası/baykuş" her etkinliğe kopyalanmaz); konuya özgü yeni görsel türü gerekiyorsa `CIZ` içine eklenir.
3. Kontrol: `python -I scripts/html_kontrol.py dosya.html` + sayısal cevapları kodla doğrula + tarayıcıda (Edge headless olur) en az iki profille oyna (hepsi doğru / yanılgılı). Sınanmayan şeyi "çalışıyor" deme.
4. Dosya adı: ASCII, küçük harf, boşluksuz (ör. `cumhuriyet.html`). Dosyayı depoda (`C:\Users\ismai\Projeler\4.SINIF`, **main** dalı) ilgili ders klasörüne koy: `Turkce`, `Matematik`, `Fen`, `Sosyal`, `Insanhaklari`, `Trafik`, `Oyunlar`.
5. GitHub'a göndermeden önce öğretmene ne yayınlanacağını söyle ve onay al. Gönderince GitHub `icerik-katalogu.json`'a kendisi ekler; 2–3 dk sonra portalda "YENİ" etiketiyle görünür.
6. Teslim mesajı kısa (büyük işte dürüst teslim raporu: sınanan / yalnızca kodla bakılan / eksik-riskli / kazanım eşleşmesi).

## 8. Teslim öncesi kontrol listesi
- [ ] Her soru kazanıma/kaynağa bağlı; kazanım kodu programdan veya "doğrulanmalı"
- [ ] Çeldiriciler etiketli gerçek yanılgı; çift doğru, eş anlamlı seçenek, cevap sızıntısı yok
- [ ] Seçenekler karışıyor; doğru cevap konumu/uzunluğu dengeli
- [ ] İpucu → ikinci şans → çözüm akışı çalışıyor; `why` her maddede
- [ ] Dokunma, fare, klavye ayrı ayrı denendi; telefon ve tahta görünümünde taşma yok
- [ ] İnternetsiz açılıyor; `localStorage` kapalıyken çalışıyor
- [ ] (Takipli etkinlikte) `oyunId` gerçek kimlik; oyun sonunda tek `4d:activity-finished` mesajı gidiyor
- [ ] Görsel zenginlik (4.1): tema + rehber karakter + her soruda görsel + kutlama efekti + ödül/ilerleme + ses düğmesi var; ekran görüntüleri alındı
- [ ] Türkçe karakter ve yazım doğru; süre hedefe uygun; final bölümü kısa
- [ ] Sınanmayan/kurulmayan özellik için iddia yok
