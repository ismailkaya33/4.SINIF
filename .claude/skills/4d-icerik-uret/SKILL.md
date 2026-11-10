---
name: 4d-icerik-uret
description: 4/D sınıfı için MEB 4. sınıf kazanımlarına uygun her türlü eğitim içeriği üretirken kullan — interaktif etkinlik/oyun (tek dosya HTML), değerlendirme testi, defter notu, çalışma kâğıdı, ev ödevi, akıllı tahta sunumu. "Şu kazanım için etkinlik yap", "oyun hazırla", "defter notu", "çalışma kâğıdı", "değerlendirme testi" gibi isteklerde devreye girer. İçeriği üretir, kontrol eder, depodaki doğru ders klasörüne koyar.
---

# 4/D — Eğitim içeriği üretimi (tek kaynak)

Kullanıcı 4/D sınıf öğretmenidir, kod bilmez. Sade Türkçe konuş; teknik terimi kullanırsan kısa bir benzetmeyle açıkla.
Bu skill, sohbetten gelen iki belgenin birleşimidir:
- **Bağlayıcı kalite kuralları:** `references/egitim-icerik-standartlari.md` (her işte uygulanır; istekle çelişirse o iş için istek geçerlidir).
- **Etkileşimli etkinlik yöntemi:** aşağıdaki bölümler + `references/ornek-analizi.md`, `references/portal-bulgulari.md`.

Öncelik sırası: **kazanım doğruluğu > öğrenmeyi gerçekten sağlayan mekanik > çalışan, test edilmiş kod > sadelik ve hız > görsel cila.**

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
- [ ] Türkçe karakter ve yazım doğru; süre hedefe uygun; final bölümü kısa
- [ ] Sınanmayan/kurulmayan özellik için iddia yok
