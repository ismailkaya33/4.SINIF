# TESTS
- Panel: `node .github/scripts/verify-appsscript-integration.mjs`; `for f in tests/*.cjs; do node $f; done` → 2026-11-18 hepsi geçti (5 test); 2026-11-18 ikinci çalışmada ogrenci-ozet.cjs eklendi, 6 test geçti.
- Önizleme: Playwright (hazır Chromium) ile dosyayı açıp 360/1280 px kontrolü; google.script.run olmadığı için gerçek veri testi yapılamadı.
- Site dalı testleri bu çalışmada koşulmadı.
