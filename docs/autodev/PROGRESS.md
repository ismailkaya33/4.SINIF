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
- İş (c) bitti: 84 etkinlik sayfası 360 px'de tarandı. Düzeltildi (claude/site-gelistirme): Fen/besinlerdegerlendirme.html görsel taşması; Fen/madenler2.html 2 görsele alt metin. Kalanlar ONERI'ye yazıldı. Test: icerik-denetle çalıştı (yalnız eski büyük-dosya uyarıları), taşma yeniden ölçüldü. Etkinlik içeriği değişmediği için pedagojik denetçi çalıştırılmadı.
- Sıradaki: iş d (güvenlik taraması).
Öğretmenin bakmasi gerekenler (ek):
4. Site düzeltmeleri canlıda değil; claude/site-gelistirme dalında. main'e alma kararı sizin.

## 2026-11-19 00:15 UTC (üçüncü çalışma)
- İş (d) bitti: güvenlik taraması (yalnız okuma, kod değişmedi). Bulgular: öğretmen panelinde HTML kaçış sorunu yok (veri `textContent` ile yazılıyor, `innerHTML` yalnız 2 sabit metinde); öğrenci sayfasında `innerHTML` yok; oyundan gelen mesaj kaynak+pencere kontrolüyle süzülüyor; dış bağlantılar `noopener`; oturum kodu rastgele 2 UUID, sunucuda özetle (hash) saklı; giriş deneme sınırı çalışıyor (kod başına + genel); rapor ayrı projede, öğrenci projesinde rapor okuma işlevi yok. Ciddi açık bulunmadı.
- Küçük notlar ONERI'ye yazıldı (2 öğretmen işlevi tarayıcıdan çağrılabilir ama veri döndürmüyor; kullanılmayan `GirisDenemeKoruma_Oneri.gs`).
- Test: kod değişmediği için çalıştırılmadı.
- ONAYLI bölümü boş; güvenli küçük düzeltme de yapılmadı (ONERI'deki site notları düşük öncelikli ve onay bekliyor).
Öğretmenin bakmasi gerekenler:
1. Güvenlik taramasında ciddi sorun çıkmadı; sizden bir işlem gerekmiyor.
2. ONAYLI listesi boş: yeni iş için ONERI'den seçip Claude'a "şunu onayla" demeniz yeterli.
3. Önceki çalışmaların panel ve site düzeltmeleri hâlâ yalnız claude/ dallarında; canlıya alma kararı sizin.
Engel yok.

## 2026-11-19 10:15 UTC (dördüncü çalışma)
- ONAYLI boştu; güvenli küçük düzeltme yapıldı: Sosyal/kurtulus.html üst çubuğu 360 px'de 5 px taşıyordu (ses düğmesi); boşluklar küçültüldü, taşma kalktı. Dal: claude/site-gelistirme.
- Test: 360 px'de taşma yok (Playwright), icerik-denetle yalnız eski büyük-dosya uyarıları, panel testleri ve verify-appsscript geçti.
Öğretmenin bakmasi gerekenler:
1. Düzeltme canlıda değil; claude/site-gelistirme dalında, main'e alma kararı sizin.
2. ONAYLI liste hâlâ boş; ONERI'den seçip onaylayabilirsiniz.
Engel yok.

## 2026-11-20 00:15 UTC (beşinci çalışma)
- ONAYLI boştu; güvenli küçük düzeltme: Fen/besinlerdegerlendirme.html (bulmaca harf kutuları) ve Fen/besinakademisi.html (5 boşluk) giriş kutularına ekran okuyucu etiketi (aria-label) eklendi. Dal: claude/site-gelistirme.
- Test: JS sözdizimi tamam, 360 px'de taşma yok, konsol hatası yok (Playwright); icerik-denetle yalnız eski büyük-dosya uyarıları. Panel kodu değişmedi.
Öğretmenin bakmasi gerekenler:
1. Düzeltme canlıda değil; claude/site-gelistirme dalında, main'e alma kararı sizin.
2. ONAYLI liste hâlâ boş; ONERI'den seçip onaylayabilirsiniz.
Engel yok.

## 2026-11-21 00:15 UTC (altıncı çalışma)
- ONAYLI boştu. Güvenli küçük düzeltme olarak Insanhaklari/farkliyasamlar.html düğme boyu denendi; sayfa Tailwind'i internetten (CDN) yüklüyor, bu ortamda erişim yok, ölçüm güvenilmez çıktı. Test edemediğim değişikliği göndermemek için kod değiştirilmedi.
- Test: kod değişmediği için çalıştırılmadı.
Öğretmenin bakmasi gerekenler:
1. Bu çalışmada hiçbir şey değişmedi; ONAYLI liste hâlâ boş, ONERI'den seçip onaylayabilirsiniz.
2. Önceki site düzeltmeleri hâlâ yalnız claude/site-gelistirme dalında; main'e alma kararı sizin.
Engel yok.

## 2026-11-22 00:15 UTC (yedinci çalışma)
- ONAYLI boştu. Güvenli küçük düzeltme aranarak tüm site HTML'lerinde kırık bağlantı/görsel taraması yapıldı (yalnız okuma): kırık bağlantı yok. Kod değişmedi.
- Test: kod değişmediği için çalıştırılmadı.
Öğretmenin bakmasi gerekenler:
1. Bu çalışmada hiçbir şey değişmedi; site bağlantıları sağlam.
2. ONAYLI liste hâlâ boş; ONERI'den seçip onaylayabilirsiniz.
3. claude/site-gelistirme ve claude/ogretmen-paneli-gelistirme dalındaki düzeltmeler canlıda değil; alma kararı sizin.
Engel yok.

## 2026-11-22 10:15 UTC (sekizinci çalışma)
- ONAYLI boştu; yeni güvenli küçük düzeltme bulunmadı (ilk taramalar zaten yapılmış, kalanlar ONERI'de onay bekliyor). Kod değişmedi, test çalıştırılmadı.
Öğretmenin bakmasi gerekenler:
1. Bu çalışmada hiçbir şey değişmedi.
2. ONAYLI liste hâlâ boş; ONERI'den seçip onaylayabilirsiniz.
3. claude/ dallarındaki düzeltmeler canlıda değil; alma kararı sizin.
Engel yok.
