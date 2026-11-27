# Antigravity görev panosu

Kurallar: `GEMINI.md`. Görevleri öğretmen ya da Claude ekler. Antigravity yalnız **sahibi Antigravity** ve durumu
**BEKLIYOR** olan işi alır. Durumlar: BEKLIYOR → YAPILIYOR (tarih) → DENETİM BEKLİYOR → ONAYA HAZIR / DÜZELTİLMELİ → BİTTİ (tarih).
Denetim sonuçları: `claude/ogretmen-paneli-gelistirme` dalında `docs/autodev/ANTIGRAVITY-DENETIM.md`.

Çakışmayı önlemek için: bulutta çalışan Claude ajanının işleri `claude/` dallarındadır ve buraya yazılmaz.
Bir dosya Claude'un açık bir işindeyse (o dalın `docs/autodev/TASKS.md` dosyasında YARIM) Antigravity o dosyaya dokunmaz.

| Kod | İş | Kabul ölçütü | Kaynak | Risk | Sahibi | Durum | Dal |
|---|---|---|---|---|---|---|---|
| AG1 | `Matematik/sayiproblemleri.html` içindeki gömülü görselleri küçült (~1,6 MB). Dosya adı ve kod mantığı aynı kalır. | Dosya ≤ 600 KB; görseller telefonda net; etkinlik baştan sona oynanıyor; `icerik-denetle` yeni HATA yok | IYILESTIRME A15 | düşük | Antigravity | BEKLIYOR | — |
| AG2 | `Fen/besinlerdegerlendirme.html` (~0,7 MB) ve `Matematik/toplamacikarmaproblem1.html` (~0,65 MB) görsellerini küçült | Her biri ≤ 350 KB; sonuç mesajı kodu değişmemiş; tarayıcı testi geçti | IYILESTIRME A3 | düşük | Antigravity | BEKLIYOR | — |
| AG3 | Renk körlüğü kontrolü: 5 etkinlikte doğru/yanlış geri bildirimi yalnız renkle mi veriliyor? Yalnız renkse ✓ / ✗ simgesi ve kısa yazı ekle | Rapor: 5 dosyanın durumu; düzeltilenlerde renk yanında simge+yazı var; puanlama değişmemiş | IYILESTIRME C4 | düşük | Antigravity | BEKLIYOR | — |
| AG4 | Türkçe yazım/dil denetimi (salt okuma): `Turkce/anafikiranaduygu.html`, `Turkce/tur-atasozu-deyim-sinav.html` ve öğretmenin seçeceği 1 Türkçe etkinliğin yönerge ve soru metinleri | Rapor: "eski → öneri (TDK gerekçesi)" listesi; dosya **değiştirilmez**, kararı Claude ve öğretmen verir | yapay-zeka-is-bolumu.md | düşük | Antigravity | BEKLIYOR | — |
