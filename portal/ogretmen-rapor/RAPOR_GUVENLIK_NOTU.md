# Öğretmen raporu erişim notu

Apps Script web uygulaması **Execute as me** yapılandırmasıyla açılırsa, çağrıları öğretmen hesabının yetkileriyle çalışır. Bu yüzden öğrencilerin erişebildiği aynı projede herkese açık `google.script.run` çağrılabilir bir rapor fonksiyonu eklemek, başka öğrencilerin verilerini açığa çıkarabilir.

Güvenli tasarım: özel öğretmen e-tablosu ve ayrı Apps Script rapor projesi veya mevcut Firebase öğretmen kimlik doğrulaması + sunucuda rol kontrolü. Rapor yalnızca öğretmene sunulmalı. Gerçek sınıf verileri demo JSON dosyalarına konmamalı.

Şimdilik öğrenci web uygulamasına rapor okuma işlevi EKLEMEYİN.
