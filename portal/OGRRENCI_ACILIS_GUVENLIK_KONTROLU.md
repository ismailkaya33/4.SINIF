# 4/D — Öğrencilere açmadan önce güvenlik kontrolü

## Pilot doğrulandı
- MİSAFİR girişi, oturum kontrolü, güvenli çıkış.
- Tam ekran Matematik oyunu ve sonuç gönderimi.
- Öğretmen raporu 39 gerçek öğrenci, MİSAFİR sonuçları hariç.
- Öğretmen duyurusu TASLAK → YAYINDA → ARSIV; öğrenci görünürlüğü test edildi.

## Açılıştan önce ZORUNLU
1. Öğrenci Apps Script dağıtımının erişimi şu an **Yalnızca ben**. Bu nedenle öğrenciler henüz erişemez. Erişimi genişletmek ayrı, açık öğretmen onayı gerektirir.
2. 6 karakterli öğrenci giriş kodlarının tahmin edilebilirliği ve kaba kuvvet korumasını değerlendir. Beş dakikalık sayaçlar tümdeneme yükünü sınırlasa bile yetkisiz kişinin geçerli kodu deneme olasılığı sıfırlanmaz. Gerçek giriş kodlarını GitHub'a asla koyma.
3. Öğrenci Apps Script projesi ve öğretmen raporu Apps Script projesi **kesinlikle ayrı** tutulmalı. Öğrencilerin eriştiği projeye `ogretmenRaporVerisi`, `duyuruEkleOgretmen`, `ogretmenDuyuruDurumDegistir` eklenmemeli.
4. Öğrenciye açık uç noktalarda kimlik yalnızca sunucunun doğruladığı oturum tokenından türemeli. Öğrenci numarası istemciden kabul edilmemeli.
5. Gerçek öğrenci hesabıyla giriş, yanlış kod, süresi bitmiş token, çıkış sonrası erişim, tekrar sonuç kaydı ve iki eşzamanlı kayıt testleri yapılmalı. Testte gerçek öğrencinin adı, kodu, tokenı ekran görüntülerine veya GitHub'a aktarılmamalı.
6. Sonuç kaydının istemci tarafından üretilen sayılar olduğu belirtilmeli; pedagojik takip verisidir, yüksek güvenli sınav/puanlama kanıtı değildir.
7. Duyuruların eski Firebase kaynaklı anasite akışı ile Apps Script pilot akışının ayrı olduğuna dikkat edilmeli; Firebase projesine dokunulmamalı.

## İlk sürüm kapsamı
- 7 ders bölümü / 50 eski bağlantı (çoğu takip edilmez)
- Matematik Kayıp Sayılar pilot etkinliği (takipli)
- Duyurular ve öğretmen raporu
- Yeni etkinlikler yalnızca testten sonra takipli olarak işaretlenecek

## Kesinlikle yapılmayacaklar
- Öğrenci şifrelerini, isimlerini, tablo kimliklerini veya tokenları GitHub'a koymak
- Öğretmen raporunu öğrenci projesine taşımak
- Öğretmen onayı olmadan dağıtım erişimini açmak
- Çalışan ana siteyi sürpriz şekilde değiştirmek
