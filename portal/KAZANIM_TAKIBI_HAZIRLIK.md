# 4/D — Kazanım takibi hazırlığı

Bu dal (`hazirlik/kazanim-takibi-20261101`) **canlı öğrenci sistemine bağlanmaz**. Ana dal, Apps Script MİSAFİR girişi ve Firebase öğretmen paneli değiştirilmedi.

## Mevcut ayrım
- Apps Script: Öğrenci kodunu doğrular, süreli oturum oluşturur, çıkışta iptal eder.
- GitHub `ogrenci/index.html`: Ayrı, eski Firebase e-posta/şifre pilotudur.
- `Matematik/kayipsayilar.html`: Anonim Firebase oturumunda kullanıcı tarafından elle girilen test koduyla sonuç kaydeder; bu kod **doğrulanmış öğrenci kimliği değildir**.
- `ogretmen/index.html`: Firebase attempts ve announcements verilerini okur. Güvenlik kuralları Firebase konsolunda ayrıca kontrol edilmelidir.

## İlk hazırlık
`ogretmen/kazanim-analizi.html` istemci tarafında örnek veya seçilen JSON'u işler. Ağ üzerinden veri göndermez; tarayıcıda kalıcı saklama yoktur. Öğrenci adları, okul numaraları ve giriş kodları **dosyaya yazılmamalı**. Örnek veriler uydurmadır. Pilot analiz sonuçları tanılayıcıdır, not veya kesin kazanım kararı değildir.

### Beklenen sonuç biçimi
```json
[
  {"studentRef":"ORNEK-A","activityId":"mat-kayip","outcomeId":"M.4.1.3.4","correct":8,"total":10}
]
```
`studentRef`: **rastgele üretilmiş** takma kimlik (öğrenci kodunun kendisi, adı veya okul numarası değil). Alanlar: `activityId`, `outcomeId`, `correct`, `total`. Bir kayıt bir tamamlanan etkinlik denemesini temsil eder.

## Sonraki güvenli entegrasyon
1. Apps Script erişimi hâlen `Yalnızca ben`; dağıtımı açmadan önce sunucu fonksiyonlarının saldırı yüzeyi ve yetkilendirme sınırları denetlenmeli.
2. Kimlik doğrulama ve sonuç kayıtları **aynı güvenilir sunucu işleminde** eşleştirilmeli. Sadece tarayıcıdan gönderilmiş `studentRef` veya okul numarası asla kimlik kanıtı sayılmamalı.
3. Çocuklara ait ham veri yalnızca özel Google E-Tablo veya uygun şekilde kurallandırılmış özel depoda tutulmalı. Firebase güvenlik kuralları yerinde doğrulanmadan canlı öğrenci verisi yazılmamalı.
4. Etkinlik sonuçları öğretmen paneline ancak sunucu doğrulaması ve rol denetimi tamamlanınca entegre edilmeli. Öğretmen tarafı tek başına HTML gizlemesiyle korunmamalı.
5. Mevcut anonim test sonuçları gerçek öğrencilerin sonuçlarıyla birleştirilmemeli.

## Geri alma
Yeni dosyalar yalnızca bu dalda oluşturuldu. Ana dalda değişiklik yoktur; silinmesi canlı siteyi etkilemez.
