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
2. Göndermiyorsa önce bunu `main` dalında ekle. Bu değişiklik GitHub Pages ile birkaç dakikada yayına çıkar.

## Kayıt (hazirlik/kazanim-takibi-20261101 dalı)
1. `portal/etkinlik-kayitlari.json` → `otomatikSonuc` listesine ekle: `id`, `yol`, `ad`, `konu`, `kazanim`, `maxTotal`, `dersListesinde`.
   Ders listesindeyse `seciliEtkinlikler` listesinde de olmalı.
2. `node tools/katalog-esitle.mjs` çalıştır (KATALOG BASLA/BITIR bölümlerini kendisi yazar; o bölümleri elle düzenleme).
3. `node .github/scripts/verify-appsscript-integration.mjs` çalıştır; geçmeli.

## Yayın — ONAY GEREKİR
Bu dala `portal/appsscript/**` veya `portal/ogretmen-rapor/**` değişikliği gönderilince GitHub Actions öğrenci ve öğretmen
uygulamasını **hemen canlıya** alır. Göndermeden önce kullanıcıya ne değişeceğini sade dille söyle ve açık "evet" al.
Göndermeden sonra `4d-canli-kontrol` skill'ini izle.

## Bilinmesi gerekenler
- Öğretmen raporu `Sayfa1` içinde `Tur=TEST` olan öğrencileri (ör. TEST40) göstermez; TEST40 sonucu yalnız
  `ETKINLIK_SONUCLARI` tablosunda görünür.
- TEST40 ile Claude giriş yapamaz (canlı Google sitesi); girişi kullanıcı kendisi yapar.
