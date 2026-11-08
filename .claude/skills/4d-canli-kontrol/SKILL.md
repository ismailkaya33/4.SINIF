---
name: 4d-canli-kontrol
description: 4/D sınıf portalında (ismailkaya33/4.SINIF) bir değişikliği GitHub'a gönderdikten sonra canlıda doğru çalıştığını kontrol etmek için kullan. "Yayına çıktı mı?", "canlıda kontrol et", "Actions geçti mi?", "TEST40 ile deneyelim" gibi isteklerde çalışır.
---

# 4/D — Canlı yayın kontrolü

Kullanıcı kod bilmez; sonucu "çalışıyor / çalışmıyor / şu adımı sizin yapmanız gerekiyor" diye sade anlat.

## 1. GitHub tarafı
- `main` dalı → GitHub Pages: `gh run list --repo ismailkaya33/4.SINIF --branch main --limit 3`
  ("pages build and deployment" başarılı olmalı).
- `hazirlik/kazanim-takibi-20261101` dalı → iki iş akışı:
  - "4D Apps Script - kontrollu kaynak aktarimi" (öğrenci portalı)
  - "4D Teacher report - source sync" (öğretmen raporu)
  `gh run list --repo ismailkaya33/4.SINIF --branch hazirlik/kazanim-takibi-20261101 --limit 4`
- Başarısızsa: `gh run view <id> --log-failed` ile nedeni bul, kullanıcıya bir cümleyle açıkla.

## 2. Site tarafı (giriş gerekmez)
- Değişen sayfayı `https://ismailkaya33.github.io/4.SINIF/...` adresinden yerleşik tarayıcıda aç ve metni oku.
- Telefon uygulaması: `uygulama.html`, `manifest.json`, `sw.js` açılıyor mu?

## 3. Portal tarafı (kullanıcı girişi gerekir)
- Öğrenci portalı: `https://script.google.com/macros/s/AKfycbzXyUUynqADi0RQjqvEq4lvUUnwQ6bJa1aPueWfsgQTMNiuEbrFnZw5phWg_Eztwjer/exec`
- TEST40 kodunu Claude girmez; kullanıcıdan yerleşik tarayıcıda kendisinin girmesini iste, sonra sayfayı oku.
- Bir etkinliği sonuna kadar oynamak tabloya gerçek satır yazar: önce kullanıcıdan izin al.
- Öğretmen raporu TEST türü öğrencileri göstermez; TEST40 sonucunu kullanıcı `ETKINLIK_SONUCLARI` sekmesinde görür.

## 4. Rapor
Kısa bir tabloyla bitir: ne kontrol edildi, sonuç, kullanıcının yapması gereken (varsa).
