# Matematik 1 soru takibi pilotu

30 soruluk `Matematik/toplamacikarmaproblem1.html` için ilk cevap, son cevap, deneme sayısı ve çalışma oturumu kaydı. Doğruluk sunucudaki sabit cevap anahtarından hesaplanır. `SORU_DENEMELERI` özel E-Tabloda oluşturulur; GitHub'a öğrenci verisi yazılmaz. Öğretmen raporu ayrı, öğretmene özel projede kalmalıdır.

## Doğrulama

- `node .github/scripts/test-question-pilot.mjs`
- `node .github/scripts/verify-appsscript-integration.mjs`
- Sahte verilerle tekrar gönderim, gecikmiş eski paket, değiştirilen ilk cevap, yanlış→doğru, geçersiz oturum, oyun tekrar/sıfırlama ve cevap anahtarı eşleşmesi test edildi.
- Gerçek Apps Script, E-Tablo ve tarayıcı testi henüz yapılmadı.

## Deneme ve yayın

Bu dal otomatik yayın dalı değildir. Mevcut `hazirlik/kazanim-takibi-20261101` dalına birleştirmek öğrenci canlı dağıtımını tetikler; test tamamlanmadan birleştirmeyin.

1. Öğrenci ve öğretmen Apps Script projelerinin mevcut sürümlerini yedekleyin.
2. Öğrenci için EtkinlikSonuclari.gs ve OgrenciGiris_Guncel.html; öğretmen için OgretmenRapor.gs ve OgretmenRapor.html değişikliklerini ayrı test projelerinde uygulayın. Öğretmen projesini yalnız öğretmene açık tutun.
3. Test portalında pilot HTML'nin test adresini takipliOyunlar içindeki mat-toplamacikarma-1 adresine bağlayın. Mevcut köprü yalnız aynı GitHub Pages origin'ini kabul eder.
4. MİSAFİR ile yanlış, bölüm tekrarı ve doğru cevabı deneyin. Özel tabloda ilk yanlışın ve ikinci doğrunun ayrı satırlar olduğunu doğrulayın; MİSAFİR öğretmen sınıf raporunda görünmemeli.
5. Bağlantı kesip geri açın; tekilleştirmeyi ve yarım bırakılan etkinlikte yanıtların görünmesini doğrulayın. Öğretmen raporunu yalnız sentetik test öğrencisiyle ayrıca kontrol edin.
6. Test sonrası etkinlik HTML'si main dalında, iki Apps Script projesi mevcut dağıtım adresleri korunarak birlikte güncellenmelidir.

## Sınırlar

- Cevap verilmeyen sorular için “Yanıt kaydı yok” gösterilir; görülme/atlanma ölçülmez.
- İlk cevaptan sonra çözüm açılır; sonraki doğru cevap yardımsız başarı sayılmaz.
- Yeni sayfa açılışı veya “Baştan başla” yeni çalışma oturumudur; oyun kaldığı sorudan devam etmez.
- Portala ulaşmış bekleyen yanıtlar mevcut oturumun sessionStorage kuyruğunda yeniden denenir. Sekme kapatıldığında gönderilmemiş veriler garanti edilmez. Doğrudan HTML açılışında öğrenci kaydı yapılmaz.
- Rapor her çalışma oturumunu ayrı gösterir; sınıf soru istatistikleri sonraki aşamadır.
