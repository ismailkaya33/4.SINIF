# 4/D — GitHub → Apps Script tek tıkla senkronizasyon

## Durum
Google Apps Script API öğretmen tarafından etkinleştirildi. GitHub Actions iş akışı **main dalında kuruldu**, ancak Google OAuth yetkisi için henüz GitHub Secret eklenmediğinden çalıştırılmaya hazır değil. **Hiçbir Apps Script projesine kod gönderilmedi.**

## İlk kurulum: öğretmenin bilgisayarında bir kez
1. Bilgisayarda Node.js kurulmalı. Terminalde `npm install -g @google/clasp` çalıştır.
2. `clasp login` ile Google hesabında oturum aç (yalnızca kendi bilgisayarında; kimlik dosyasını sohbete YAPIŞTIRMA).
3. Üretilen `~/.clasprc.json` dosyasının içeriğini sadece GitHub'ın **Settings → Secrets and variables → Actions** arayüzünden `CLASPRC_JSON` adlı **repository secret** olarak kaydet. Bu dosya OAuth refresh token içerir; dosyayı GitHub kaynak dosyası olarak commit etme, sohbete gönderme. Hesap güvenliği için ayrı, dar yetkili hesabı düşün.
4. Aynı menüye `STUDENT_SCRIPT_ID` adlı secret olarak mevcut öğrenci Apps Script proje kimliğini gir. Proje editör bağlantısındaki `/projects/...` parçasıdır; **web uygulamasının /exec deployment ID'si değildir**.
5. `TEACHER_SCRIPT_ID` adlı secret olarak ayrı öğretmen Apps Script proje kimliğini gir. Öğretmen scripti kimliği URL'den alınır.
6. GitHub → Actions → **4D Apps Script - kontrollu kaynak aktarimi** → Run workflow. Hedef `student` için `SYNC_STUDENT`, öğretmen için `SYNC_TEACHER` yaz. Hedefi önce öğrenci kodlarını alan **yedek bir test scriptiyle** denemek daha güvenlidir.

## İş akışının sınırları
- İş akışı yalnızca **elle** çalıştırılır; GitHub'daki bir commitin otomatik üretime geçmesi söz konusu değildir.
- Her çalışmada `clasp pull` ile karşı taraftaki mevcut kodlar çekilir. Sadece açıkça sayılan kaynak dosyalar değiştirilir; diğer kaynaklar ve mevcut `appsscript.json` korunur.
- Kaynak listesinde olmayan `MisafirSonucTesti.gs`, eski dosyalar ve manifest silinmez.
- Hedefte `Kod`, `GirisGuvenligi`, `OgrenciOturum` ve `OgrenciGiris` gibi beklenen dosyalar bulunmazsa öğrenci aktarımı durur.
- `clasp push --force` tüm script kaynaklarını yazar. Bu nedenle uzaktaki dosyalar önce çekilse bile ağ veya API hatalarına karşı mevcut scriptin yedeği saklanmalıdır.
- Bu işlem yalnızca **kaynak kodu günceller**; `/exec` web uygulamasında yeni sürümü otomatik yayımlamaz. Son yayımlama ayrı, bilinçli işlem olmalıdır.
- Mevcut öğretmen uygulamasının paylaşım izni **Yalnızca ben** kalmalıdır.
- Yeni etkinlik `mat-oruntuler` hazırlık dalındadır; etkinlik ve kazanım doğrulaması yapılmadan ilk senkronizasyonu canlıya uygulamak doğru olmaz.

## Tek yönlü senkronizasyon
**GitHub → Google Apps Script** ana akıştır. Google Apps Script düzenleyicisinde sonradan elle değiştirilen kodlar sonraki eşitlemede üzerlerine yazılabilir. Bundan sonra esas geliştirmeler GitHub hazırlık dalında yapılmalı.

## Kurtarma ve yetki iptali
GitHub Actions secret bir insanın OAuth yenileme tokenını içerir. Repo yöneticileri bu sırra doğrudan erişmese de yetkili iş akışlarının onu kullanabilmesi güvenlik riski oluşturur. Sızıntı şüphesinde Google hesabından uygulama yetkisini kaldırıp `CLASPRC_JSON` secretını sil ve `clasp login` ile yeniden yetkilendir.

## Dosyalar
- `.github/workflows/appsscript-sync.yml` — yalnız manuel başlatılan aktarım.
- `.github/scripts/prepare-appsscript-sync.mjs` — uzaktan indirilen projeye yalnız izinli kod dosyalarını yerleştirir.
- `portal/TEK_SEFERLIK_KURULUM_PAKETI.md` — canlıya aktarılan modüllerin listesi ve test koşulları.
