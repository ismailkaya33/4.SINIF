---
name: 4d-haftalik-hatirlatma
description: 4/D sınıfı için yıllık plana göre bu hafta ve sıradaki hafta hangi konuların işleneceğini çıkarıp portalda (etkinlik, defter notu) neyin eksik olduğunu hatırlatmak ve portal ana sayfasındaki "Bu Haftanın Etkinlikleri" listesini (bu-hafta.json) güncellemek için kullan. "Bu hafta ne hazırlayalım?", "sıradaki konu ne?", "haftalık hatırlatma", "eksik etkinlik/defter notu var mı?" gibi isteklerde ve haftalık zamanlanmış görevde çalışır.
---

# 4/D — Haftalık hatırlatma

Öğretmen kod bilmez. Çıktı kısa, sade Türkçe, ders ders bir "hazırlanacaklar" listesi olsun.

## 1. Bilgiyi topla
```
git pull
node tools/yillik-plan-oku.mjs        # yalnız YillikPlan/*.docx değiştiyse veya yillik-plan.json yoksa
node tools/haftalik-hatirlatma.mjs    # tarih vermek için: node tools/haftalik-hatirlatma.mjs 2026-11-23
```
- `YillikPlan/` yereldir, GitHub'a gönderilmez (`.gitignore`). Plan yoksa öğretmenden .docx dosyalarını bu klasöre
  koymasını iste.
- Betik takvimi plandaki tarihlerden çıkarır; tatil haftasında "okul haftası değil" der, sıradaki haftaya odaklan.

## 2. Karşılaştır (bunu sen yaparsın, betik yapmaz)
Her portal dersi için (Türkçe, Matematik, Fen, Sosyal, İnsan Hakları, Trafik) bu hafta + sıradaki haftanın
kazanımlarına bak ve portal içerik adlarıyla, defter notu dosya adlarıyla anlamca eşleştir:
- ✅ Etkinlik de defter notu da var
- 🟡 Yalnız biri var (hangisinin eksik olduğunu yaz)
- 🔴 Hiçbiri yok → hazırlanacaklar listesinin başına
- Türkçe'de kazanımlar her hafta tekrar eder; o haftanın **metin adına** ve yeni gelen dil bilgisi kazanımına
  (eş sesli, noktalama, hikâye unsurları vb.) odaklan, "konuşma stratejilerini uygular" gibi genel olanları sayma.
- Ünite sonu yaklaşıyorsa (sıradaki haftada yeni ünite başlıyorsa) değerlendirme testi olup olmadığına bak.
- Oyunlar bölümü bu karşılaştırmaya girmez: oyunlar için defter notu ve değerlendirme gerekmez (öğretmenin kararı).
  Oyunlar klasöründeki bir oyun bir dersin etkinliği yerine sayılmaz.
- Müzik, Görsel Sanatlar, Beden Eğitimi: portalda klasörleri yok; yalnız bir satırla konuyu söyle.
- Eşleştirmeden emin değilsen "emin değilim, kontrol eder misiniz?" yaz; uydurma.

## 3. Sun
Biçim:
```
📅 9. hafta (9–13 Kasım) · sıradaki: 10. hafta (23–27 Kasım)

Hazırlanacaklar (öncelik sırasıyla)
1. 🔴 Fen – Dengeli beslenme (F.4.2.1.4.) → etkinlik yok
2. 🟡 Matematik – Çıkarmada tahmin (M.4.1.3.3.) → etkinlik var, defter notu yok
...
Hazır olanlar: kısaca tek satırda.
```
Sonunda tek soru: "Hangisini hazırlayayım?" Öğretmen seçerse `4d-icerik-uret` skill'iyle üret.
Baskı materyali (ev ödevi, çalışma kâğıdı) önerme/sorma; yalnız etkinlik ve defter notu.

## 4. "Bu Haftanın Etkinlikleri" şeridini güncelle (`bu-hafta.json`)
Öğrenci portalı ana sayfasındaki şerit, `main` dalındaki `bu-hafta.json` dosyasından okunur (portal dalına dokunmaz).
1. Dosyayı oku. `bitis` tarihi geçtiyse ya da bu/sıradaki hafta değiştiyse güncelleme öner.
2. Yeni liste: 2. adımda ✅/🟡 çıkan, **portalda var olan** etkinliklerin site yolları (`icerik-katalogu.json`'daki `yol`,
   `gizli: true` olanlar hariç), ders başına 1–2, toplam en çok 12. Oyunlar klasörü girmez. Etkinliği olmayan dersi atla.
3. `baslik`: "10. hafta • 23–27 Kasım" biçimi (iki hafta birlikteyse "9–10. hafta • 2–27 Kasım").
   `bitis`: o haftanın son okul günü (YYYY-AA-GG); bu tarihten sonra şerit kendiliğinden gizlenir.
4. Öğretmene listeyi ad olarak göster ("Türkçe – Kantin Dedektifi" …), onay alınca `main`'e gönder.
   GitHub Pages birkaç dakikada yayınlar; portalı yeniden yayınlamak gerekmez.

## 5. Zamanlanmış görevde
Görev kendiliğinden çalıştıysa hiçbir şey üretme, gönderme (push) yapma; yalnız listeyi hazırla ve bildirim gönder.
`bu-hafta.json` için önerilen yeni listeyi bildirime ekle ama dosyayı değiştirme. Ana dalda (`main`) kal, dosya değiştirme.
