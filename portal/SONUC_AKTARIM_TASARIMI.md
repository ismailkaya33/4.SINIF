# 4/D — Güvenli etkinlik sonuç aktarımı (hazırlık)
## Durum
Bu doküman geliştirme dalındadır. **Canlı veri kaydı etkin değildir.** Ana dal ve mevcut Firebase anonim test kaydı değiştirilmedi.

## Mimari karar
Öğrencilerin kişisel sonuçları güvenilmeyen GitHub Pages tarayıcı kodundan doğrudan Google E-Tablo'ya veya Firebase'e yazılmayacak. Apps Script, öğrenci oturum token'ını **sunucu tarafında** doğrulayıp kimliği kendi kayıt sayfasından bulacak. İstemciden gelen `studentRef`, ad, okul numarası veya öğrenci kodu kimlik olarak kabul edilmeyecek.

Önerilen pilot, Apps Script'in HtmlService içinde çalışan bir etkinlik kabuğu kullanmasıdır: `google.script.run` çağrıları aynı Apps Script uygulamasının sunucu fonksiyonlarına gider. Farklı köken olan `github.io` sayfasındaki `sessionStorage` burada doğrudan okunamaz. Açık web uygulamasına gizli token taşıyan GET parametreleri kullanma. GitHub Pages'ten doğrudan Apps Script'e JSON POST yapmak da tarayıcının cross-origin güvenlik sınırları nedeniyle varsayılan çözüm değildir.

## Etkinlik veri şeması (v1)
```json
{
  "schemaVersion": 1,
  "activityId": "mat-kayipsayilar",
  "outcomeId": "M.4.1.3.4",
  "correct": 8,
  "wrong": 2,
  "total": 10,
  "wrongAttempts": 3,
  "firstTry": 7,
  "durationSeconds": 312
}
```
`outcomeId` merkezi katalogdan sunucuda belirlenecek; istemcide gelen kazanım koduna **güvenilmeyecek**. Doğru + yanlış = toplam şartı her oyunda geçerli olmayabilir (atlanmış sorular); etkinlik bazında anlam ayrıca kontrol edilecek. Başarı yüzdesi tek başına kesin öğrenme yargısı değildir.

## Sunucu tarafı korumalar
1. Sunucu işlemi `oturumKaydi_(token)` ile geçerlilik doğrulasın; `kayitNoIle_` ile aktif öğrenci kaydına bağlasın.
2. Gönderimde token dışında kimlik alanı kabul etmesin; token hiçbir log'a, URL'ye veya GitHub'a yazılmasın.
3. `activityId` sunucu tarafındaki izinli katalogda bulunmalı; sayısal alanlar tamsayı, sınırlandırılmış ve makul aralıkta olmalı.
4. Tek etkinliğin tekrar gönderimi için benzersiz `attemptId` kullan; `LockService` ile yinelenen kaydı önle. Sık gönderim için oturum başına hız limiti uygula.
5. Kayıtlar yalnızca öğretmen hesabının eriştiği özel sayfada depolansın. Sonuçları istemciye yığma hâlinde sunma.
6. Öğrencinin aktifliğini, oturum süresi ve güvenli çıkış sonrası geçerliliğini her kayıtta yeniden kontrol et.
7. Üretime çıkmadan önce "Erişimi olanlar: Yalnızca ben" dağıtım ayarı ve Google tarafından istenen giriş gereklilikleri ayrı cihazda test edilsin; açık dağıtıma geçmek için ayrıca öğretmen onayı alınsın.
8. Öğrencinin kendi istemcisinden gelen `correct` değeri kolayca değiştirilebilir. Bu sonuçlar **biçimsel değerlendirme değil, öğretim geri bildirimi** olarak kullanılacak. Daha güçlü doğruluk gerekiyorsa sunucuda cevap anahtarıyla kontrol yapılmalı.

## Öğretmen paneli
Firebase öğretmen paneli mevcut anonimli test kaydını görmeye devam eder; Apps Script'teki özel öğrenci sonuçlarıyla **henüz birleşmemiştir**. Birleştirme aşamasında verinin kaynak güveni açıkça ayrılmalı.

## İlk doğrulama kontrol listesi
- [ ] Apps Script dosyaları öğretmen tarafından paylaşılarak güncel sürüm kontrol edildi.
- [ ] Test öğrencisiyle oturum açıldı, bir deneme kaydedildi.
- [ ] Aynı isteğin tekrar gönderimi tek kayıt oluşturdu.
- [ ] Çıkıştan sonra eski token'la kayıt reddedildi.
- [ ] Öğrenci A'nın öğrenci B adına kayıt oluşturamadığı kontrol edildi.
- [ ] Öğrenci verileri GitHub içeriğine ve herkese açık Firebase koleksiyonlarına yazılmadı.
