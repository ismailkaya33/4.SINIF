# TESTS
- Panel: `node .github/scripts/verify-appsscript-integration.mjs`; `for f in tests/*.cjs; do node $f; done` → 2026-11-18 hepsi geçti (5 test).
- Önizleme: Playwright (hazır Chromium) ile dosyayı açıp 360/1280 px kontrolü; google.script.run olmadığı için gerçek veri testi yapılamadı.
- Site dalı testleri bu çalışmada koşulmadı.
