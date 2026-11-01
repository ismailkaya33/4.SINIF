# 4/D öğrenci sunucu API'si — bütünleşik test notu (2026-11-01)

Kullanıcıdan alınan `Kod.gs`, `GirisGuvenligi.gs` ve `OgrenciOturum.gs` dosyaları birlikte, **sahte Google Apps Script servisleri ve sahte MİSAFİR kayıtları** kullanılarak test edildi. Gerçek öğrenci kayıtları, giriş kodları ve oturum tokenları kullanılmadı.

## Geçen 7 senaryo
1. Yanlış giriş kodu reddedildi.
2. Test MİSAFİR hesabı giriş yapabildi.
3. Giriş sonrasında oturum doğrulanabildi.
4. Güvenli çıkış başarılı.
5. Çıkış sonrasında aynı oturum reddedildi.
6. Bozuk giriş kodu biçimi reddedildi.
7. `doGet` doğru öğrenci HTML sayfasına yönlendirildi.

**7/7 PASS — yalnızca servis taklidi ortamında.**

## Ortaya çıkan risk ve değişiklik
`Kod.gs` içinde `Sayfa1` bulunamazsa ilk uygun diğer sayfaya yönelme davranışı kaldırıldı. Böylece yanlış sekme kimlik doğrulama kaynağı olamaz.

## Canlı dağıtım durumu
- Kaynaklar GitHub hazırlık dalındadır, gerçek Apps Script projesine **otomatik aktarılmamıştır**.
- Mevcut `GirisGuvenligi.gs` zaten kod bazlı 5 hata/5 dakika ve genel 80 deneme/5 dakika sınırına sahiptir; alternatif giriş limit modülü **uygulanmamalı**.
- 7 günlük oturum süresi politika olarak gözden geçirilmeli; paylaşılan cihazlarda güvenli çıkış özellikle önemlidir.
- Daha önce çalışan MİSAFİR uçtan uca pilot korunmuştur; ancak yeni bütünleşik sürüm gerçek Google Apps Script'te yeniden sınanmalıdır.
