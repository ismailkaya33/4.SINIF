# TESTS
- Panel: `node .github/scripts/verify-appsscript-integration.mjs`; `for f in tests/*.cjs; do node $f; done` → 2026-11-18 hepsi geçti (5 test); 2026-11-18 ikinci çalışmada ogrenci-ozet.cjs eklendi, 6 test geçti.
- Önizleme: Playwright (hazır Chromium) ile dosyayı açıp 360/1280 px kontrolü; google.script.run olmadığı için gerçek veri testi yapılamadı.
- Site dalı testleri bu çalışmada koşulmadı.
Güvenlik taraması: kod değişmedi, test çalıştırılmadı (2026-11-19).

- 2026-11-19: panel tests/*.cjs ve verify-appsscript geçti; site icerik-denetle çalıştı (yalnız büyük-dosya uyarıları); kurtulus.html 360 px taşma ölçümü temiz.
- 2026-11-20: Fen besin sayfaları 360 px Playwright kontrolü (taşma/konsol) geçti; icerik-denetle yalnız eski büyük-dosya uyarıları.
- 2026-11-21: Tailwind CDN'e bağlı sayfalarda (örn. Insanhaklari/farkliyasamlar.html) bu ortamda dokunma boyu ölçülemez (CDN erişimi yok); yerelde Edge ile ölçülmeli.
