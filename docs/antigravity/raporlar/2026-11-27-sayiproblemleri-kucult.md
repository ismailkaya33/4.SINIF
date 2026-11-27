# AG1 — Matematik/sayiproblemleri.html gömülü görsellerini küçültme
Tarih: 2026-11-27 | Dal: antigravity/sayiproblemleri-kucult | Durum: DENETİM BEKLİYOR

## Ne yaptım
- [Matematik/sayiproblemleri.html](../../../Matematik/sayiproblemleri.html) içindeki 16 adet gömülü JPEG problem görselini inceledim; görseller ekranda en fazla 190 px yükseklikte (telefonda 150 px) görünmesine rağmen dosyada 492×627 ile 639×663 px boyutlarında tutulduğu için dosyanın 1,56 MB'ını kaplıyordu.
- 16 görselin tamamını `ffmpeg` (`libwebp`, kalite 75, yükseklik 400 px — 190 px görüntü alanının 2 katından fazla netlik) ile sıkıştırıp yeniden gömdüm.
- Toplam dosya boyutu **1.603.736 bayttan (1.566,1 KB)** **451.008 bayta (440,4 KB)** indi (**%71,9 küçülme**; kabul ölçütü ≤ 600 KB).
- Dosya adı, HTML/CSS/JavaScript kod mantığı, sorular ve cevaplar tek karakter bile değiştirilmedi (görsel veri dizileri dışındaki metin birebir aynı kaldı).
- Görev panosunda (`docs/antigravity/GOREVLER.md`) AG1 satırını bu çalışma dalıyla birlikte `DENETİM BEKLİYOR` durumuna çektim.

## Değişen dosyalar
- `Matematik/sayiproblemleri.html`: Yalnız 16 gömülü görsel `data:image/jpeg;base64,...` biçiminden 400 px yüksekliğinde sıkıştırılmış `data:image/webp;base64,...` biçimine dönüştürüldü (1.566,1 KB → 440,4 KB). Kod mantığı, sorular, cevaplar ve dosya adı değişmedi.
- `docs/antigravity/GOREVLER.md`: AG1 satırının durumu `DENETİM BEKLİYOR`, dalı `antigravity/sayiproblemleri-kucult` olarak güncellendi.
- `docs/antigravity/raporlar/2026-11-27-sayiproblemleri-kucult.md`: Bu çalışma ve test raporu eklendi.

## Test sonuçları
- `node tools/icerik-denetle.mjs`:
  - Öncesi: `0 HATA · 16 UYARI · 29 BİLGİ`
  - Sonrası: `0 HATA · 16 UYARI · 29 BİLGİ` (yeni HATA/UYARI/BİLGİ yok; `sayiproblemleri.html` içindeki mevcut `confirm()` uyarısı önceki hâlinden aynen duruyor).
- `python .claude/skills/4d-icerik-uret/scripts/html_kontrol.py Matematik/sayiproblemleri.html` (`Python314\python.exe` ile çalıştırıldı):
  - `0 HATA`, 3 mevcut `UYARI` (`shuffle`, `RaporMotoru`, `confirm()` — dokunulmayan koddan), 3 `BİLGİ` (`dosya boyutu 440 KB`).
- Görsel boyut karşılaştırması:
  - Öncesi: 16 JPEG, ikili boyutları 49,0–95,4 KB (toplam HTML: 1.566,1 KB)
  - Sonrası: 16 WebP (314×400 ile 408×400 px), ikili boyutları 13,2–25,5 KB (toplam HTML: 440,4 KB).
- Yerleşik tarayıcı testi (`http://127.0.0.1:4173/sayiproblemleri.html` yerel test sunucusunda):
  - **Konsol ve sayfa hataları:** 0 konsol hatası, 0 yakalanmamış sayfa hatası.
  - **360 px (telefon):** Yatay kaydırma yok (`scrollWidth` taşması 0), görünür tüm 27 düğme en az 44 px (44–47,6 px), yazılar ve görsellerdeki sayılar ekran görüntüsünde net ve okunaklı.
  - **1280 px (akıllı tahta):** Yatay kaydırma yok, görünür tüm düğmeler en az 44 px, 16 görselin tamamı yüklendi (`naturalHeight = 400`, `naturalWidth = 314–408`).
  - **Uçtan uca oynanış:** 1. problemden 16. probleme kadar tüm 16 soru doğru cevaplarla çözüldü; puan `16 ⭐` ve ilerleme çubuğu `%100` oldu.

## Yapamadıklarım / emin olmadıklarım
- Çok eski tarayıcılarda (2020 öncesi iOS 13 ve altı Safari gibi) WebP desteği sınırlı olabilir; günümüz telefon, tablet ve akıllı tahta tarayıcılarının tamamında (Chrome, Edge, Safari 14+, Firefox) çevrimdışı olarak sorunsuz çalışır. Eski cihaz uyumu istenirse aynı görseller JPEG ile ~520–560 KB civarına da çekilebilir.
- Test sırasında fark edilen, önceki hâlden beri var olan iki küçük görsel kırpma gözlemi (AG1 kapsamında dokunulmadı): Problem 8 görselinde `K Aracı` sol kenardan kırpılmış (üç değerin tamamı soru metninde yazılı), Problem 12 görselinde de alttan başka bir soruya ait kırpılmış yazı ucu görünüyor.

## Öğretmenin bakması gerekenler
- Bu değişiklik henüz canlı siteye (`main`) alınmadı; yalnızca `antigravity/sayiproblemleri-kucult` çalışma dalında bekliyor.
- İsterseniz Claude'a **"antigravity/sayiproblemleri-kucult dalını denetle / yayınla"** dediğinizde tek seferlik denetim yapılıp onayınızla canlıya alınabilir.
- İsterseniz Problem 8 ve 12'deki orijinal kaynak kırpma izleri ve mevcut `confirm()` uyarısı için ileride ayrı görev eklenebilir.
