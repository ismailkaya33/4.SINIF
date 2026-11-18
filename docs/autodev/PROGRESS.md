# PROGRESS
## 2026-11-18 00:10 UTC (ilk çalışma)
- docs/autodev kuruldu. İş (a): OgretmenRapor.html'de 13 bölüm başlığı açılır/kapanır düğme oldu; ilk bölüm açık, menü bağlantıları ilgili bölümü açar. Düğme yüksekliği 44 px.
- Değişen: portal/ogretmen-rapor/OgretmenRapor.html. Dal: claude/ogretmen-paneli-gelistirme.
- Test: 360 ve 1280 px'de yatay taşma yok, 13 düğme, menü tıklaması bölümü açıyor; mevcut tüm testler geçti.
- Sıradaki: iş b (özet kartları), sonra c, d.
Öğretmenin bakmasi gerekenler:
1. Yeni görünüm canlıda değil; yalnız claude/ dalında. İsterseniz Claude ile birlikte inceleyip portal dalına alırız.
2. Bölümler artık kapalı başlıyor; menüden tıklayınca açılır. Beğenmezseniz söyleyin.
3. ONAYLI'daki b, c, d işleri sıradaki çalışmalarda yapılacak.

## 2026-11-18 10:15 UTC (ikinci çalışma)
- İş (b) bitti: panele "Öğrenci takip özeti" bölümü eklendi (sınıf doğru oranı, geride kalan, desteğe ihtiyacı olabilir sayıları + öğrenci kartları: tamamlanan etkinlik, doğru oranı, son etkinlik). OgretmenRapor.gs'e yalnız okuma amaçlı iki alan eklendi (lastAt, lastId); veri yazılmıyor, tablo yapısı değişmedi.
- Değişen: portal/ogretmen-rapor/OgretmenRapor.html, OgretmenRapor.gs, tests/ogrenci-ozet.cjs (yeni).
- Test: tüm tests/*.cjs ve verify-appsscript geçti; 360/1280 px'de yatay taşma yok, konsol hatası yok (sahte veriyle).
- Sıradaki: iş c (site taraması), sonra d (güvenlik taraması).
Öğretmenin bakmasi gerekenler:
1. Yeni "Öğrenci takip özeti" bölümü canlıda değil; yalnız claude/ogretmen-paneli-gelistirme dalında.
2. "Geride" kuralı: sonucu gelen etkinliklerin yarısından azını tamamlayan. "Desteğe ihtiyacı olabilir": doğru oranı %50'nin altı. Eşikleri değiştirmek isterseniz söyleyin.
3. Kartlar yalnız etkinlik sonuçlarını kullanır (veli HAYIR süzmesi gerektiren veri yok).
