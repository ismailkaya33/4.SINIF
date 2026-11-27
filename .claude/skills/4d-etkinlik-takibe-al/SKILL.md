---
name: 4d-etkinlik-takibe-al
description: 4/D sınıf portalında (ismailkaya33/4.SINIF) bir etkinliğin sonucunu öğretmen raporuna otomatik kaydettirmek için kullan. "Bu etkinliğin sonucunu öğretmen görsün", "etkinliği takibe al", "yeni etkinlik ekledim, rapora düşsün" gibi isteklerde çalışır.
---

# 4/D — Etkinliği sonuç takibine alma

Kullanıcı öğretmendir ve kod bilmez. Her adımı sade Türkçe ile, teknik terimi açıklayarak anlat.

## Ön kontrol (main dalı, etkinlik dosyası)
1. Etkinlik oyun sonunda `MIMARI.md` içindeki "sonuç mesajı"nı gönderiyor mu?
   - `type:'4d:activity-finished'`, `schemaVersion:1`, sabit bir `activityId`
   - `correct + wrong = total`, `firstTry <= correct`, `attemptId` 12–80 karakter
   - Mesaj yalnızca **bir kez** gider (`finishSent` benzeri bir bayrak) ve "Yeniden oyna" bayrağı sıfırlar.
   - Mesaj **her bitişte** gider: "her görev doğru olursa" şartı yasak; geçilen görev yanlış sayılır (CLAUDE.md "Sonuç kuralı").
2. Göndermiyorsa önce bunu `main` dalında ekle. Bu değişiklik GitHub Pages ile birkaç dakikada yayına çıkar.
   `4d-icerik-uret` ile üretilen etkinliklerde `rapor_motoru.js` v2 bu mesajı zaten gönderir; yalnızca `OYUN.id` portal
   kimliğiyle aynı olmalı. Oyunlar klasörü takibe alınmaz (öğretmenin kararı).

## Kayıt (hazirlik/kazanim-takibi-20261101 dalı)
1. `portal/etkinlik-kayitlari.json` → `otomatikSonuc` listesine ekle: `id`, `yol`, `ad`, `konu`, `kazanim`, `maxTotal`, `dersListesinde`,
   `tur` (`etkinlik` | `degerlendirme`: değerlendirmede ilk cevap kesin) ve `soruSayisi` (boşları hesaplamak için; bilinmiyorsa yazma).
   Ders listesindeyse `seciliEtkinlikler` listesinde de olmalı.
2. `node tools/katalog-esitle.mjs` çalıştır (KATALOG BASLA/BITIR bölümlerini kendisi yazar; o bölümleri elle düzenleme).
3. `node .github/scripts/verify-appsscript-integration.mjs` çalıştır; geçmeli.
4. main klasöründe `node tools/portal-sonuc-testi.mjs --dosya <bu dal>/portal/appsscript/OgrenciGiris_Guncel.html` çalıştır;
   "TAMAM" demeli (her takipli etkinlik portal içinde açılıp sonucu kaydediliyor). Portal öğrenci sayfasına dokunan
   HER değişiklikte (takiple ilgisi olmasa bile) bu test yayından önce çalışır.
5. Etkinlik main'e de gidiyorsa `node tools/sonuc-takip-kontrol.mjs` hata vermemeli (iki dal aynı gün yayınlanır).

## Yayın — ONAY GEREKİR
Bu dala `portal/appsscript/**` veya `portal/ogretmen-rapor/**` değişikliği gönderilince GitHub Actions öğrenci ve öğretmen
uygulamasını **hemen canlıya** alır. Göndermeden önce kullanıcıya ne değişeceğini sade dille söyle ve açık "evet" al.
Göndermeden sonra `4d-canli-kontrol` skill'ini izle.

**Sıra (2026-11-27 dersi):** main'deki "İçerik bekçisi" (`.github/workflows/icerik-bekcisi.yml`) sonuç kodu olup portalda
takipsiz yeni etkinliği HATA sayar. Bu yüzden önce **portal kaydını**, sonra **etkinlik dosyasını (main)** gönder.
Ters sırada gönderildiyse bekçi kırmızı olur: portal kaydı yayına çıkınca `gh run rerun <id>` ile yeniden çalıştır.
Portal testleri: `node tools/portal-sonuc-testi.mjs --dosya <kopya>/portal/appsscript/OgrenciGiris_Guncel.html`
(Playwright gerekir; bu bilgisayarda yoksa `$env:NODE_PATH` Codex'in `...\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules` klasörü).

## Bilinmesi gerekenler
- Öğretmen raporu `Sayfa1` içinde `Tur=TEST` olan öğrencileri (ör. TEST40) göstermez; TEST40 sonucu yalnız
  `ETKINLIK_SONUCLARI` tablosunda görünür.
- TEST40 ile Claude giriş yapamaz (canlı Google sitesi); girişi kullanıcı kendisi yapar.
