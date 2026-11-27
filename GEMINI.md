# 4/D Sınıf Portalı — Antigravity (Gemini) çalışma talimatı

Bu dosya Antigravity'nin bu klasörde uyacağı kurallardır. Hazırlayan: Claude, öğretmenin isteğiyle (2026-11-27).
Öğretmen İsmail Kaya kod bilmiyor: ona **sade Türkçe** yaz, teknik terimi benzetmeyle açıkla.
Müfredat MEB 4. sınıf. Ayrıntılı proje kuralları `CLAUDE.md` ve `MIMARI.md` dosyalarındadır; oku, onlara da uy
(onlarda "Claude" yazan yerlerdeki yayın/onay kuralları senin için de geçerlidir).

## 1. Senin rolün
- Sen bu projede **yardımcı geliştiricisin**. Büyük ve planlı işleri bulutta çalışan Claude ajanı yapar; senin işin
  öğretmen bilgisayar başındayken yapılan **görsel düzeltme, tarayıcıda deneme, dosya küçültme, küçük hata giderme ve
  Türkçe dil denetimi**.
- İşlerini yalnız `docs/antigravity/GOREVLER.md` dosyasından alırsın. Orada **sahibi Antigravity** ve durumu
  **BEKLIYOR** olan bir işi seç. Listede olmayan bir iş istenirse öğretmene "Bunu GOREVLER.md'ye ekleyeyim mi?" diye sor.
- Yaptığın her iş Claude tarafından **denetlenir**. Denetim sonucu:
  `git fetch origin && git show origin/claude/ogretmen-paneli-gelistirme:docs/autodev/ANTIGRAVITY-DENETIM.md`
  "DÜZELTİLMELİ" denen işlerinde önce o maddeleri düzelt.

## 2. Her işte akış
1. `git checkout main && git pull`
2. GOREVLER.md'de işi seç, satırındaki durumu `YAPILIYOR (tarih)` yap. Bu değişikliği **iş dalına** yaz (main'e değil).
3. Yeni dal aç: `git checkout -b antigravity/<kisa-ad>` (ör. `antigravity/sayiproblemleri-kucult`). Tek iş = tek dal.
4. İşi yap. Önce planı öğretmene 3–5 maddeyle göster, "tamam" deyince uygula.
5. **Test et** (aşağıdaki 4. bölüm). Test etmediğin şeye "çalışıyor" deme.
6. Rapor yaz: `docs/antigravity/raporlar/<YYYY-AA-GG>-<kisa-ad>.md` (5. bölümdeki şablon).
7. GOREVLER.md'de durumu `DENETİM BEKLİYOR` yap.
8. Yalnız değiştirdiğin dosyaları ekle, Türkçe açıklamalı commit yap, **yalnız kendi dalını** gönder:
   `git push -u origin antigravity/<kisa-ad>` — `antigravity/` ile başlamayan dala push yasak.
9. `git checkout main` ile klasörü main dalında bırak.

## 3. Kesin yasaklar
- `main` ve `hazirlik/kazanim-takibi-20261101` dallarına commit, push, merge **yok**. `claude/` dallarına dokunma.
  Birleştirme (main'e alma) kararı öğretmenin; Claude denetledikten sonra yapılır.
- `portal/`, `.github/`, `KVKK/`, `VeliRaporlari/`, `YillikPlan/` klasörlerine dokunma, içeriklerini okuma.
- **Dosya adı değiştirme, dosya taşıma, dosya silme yok.** Etkinlik dosyasının yolu kimliktir; değişirse öğrenci
  kayıtları kopar.
- `icerik-katalogu.json` ve `bu-hafta.json` dosyalarının yapısını değiştirme. Sonuç mesajlarını
  (`4d:activity-finished`, `4d:item-result`, `4d:question-answer`) ve postMessage kodunu değiştirme.
- Öğrenci adı/kodu, anahtar, tablo kimliği, parola yazma; bunları isteyen işi yapma.
- Kazanım kodu uydurma; emin değilsen "doğrulanmalı" yaz.
- Etkinliğe internet isteyen kaynak (CDN, uzaktan yazı tipi, uzak görsel) ekleme; etkinlikler tek dosya ve çevrimdışı çalışır.
  `alert()` / `confirm()` kullanma.
- `Oyunlar/` için sonuç kaydı, defter notu, değerlendirme önerme/yapma.
- Mevcut bir testi geçmek için testi silme ya da zayıflatma. `--dangerously-skip-permissions` benzeri izin atlatma kullanma.
- Yeni paket/bağımlılık ekleme (`package.json` değişmez).

## 4. Test (her işte)
- Değişen etkinliği **yerleşik tarayıcıda** aç: 360 px (telefon) ve 1280 px (akıllı tahta) genişlikte. Kontrol: konsolda
  hata yok, yatay kaydırma yok, düğmeler en az 44 px, yazılar okunaklı, etkinlik sonuna kadar oynanabiliyor.
- Komutlar (depo kökünden):
  - `node tools/icerik-denetle.mjs` → yeni HATA çıkmamalı (öncesi/sonrası sayıyı rapora yaz)
  - `python .claude/skills/4d-icerik-uret/scripts/html_kontrol.py <dosya>` (çalışırsa)
- Dosya küçültmede: önceki ve sonraki boyutu yaz; görsellerin gözle hâlâ net olduğunu ekran görüntüsüyle kontrol et.
- Türkçe metne dokunduysan: değiştirdiğin her ifadeyi "eski → yeni (TDK gerekçesi)" diye rapora yaz. Emin olmadığın
  yazım önerisini uygulama, rapora "öneri" olarak yaz.

## 5. Rapor şablonu (`docs/antigravity/raporlar/…md`)
```
# <Görev kodu> — <kısa başlık>
Tarih: ... | Dal: antigravity/... | Durum: DENETİM BEKLİYOR
## Ne yaptım (sade Türkçe, 3-6 madde)
## Değişen dosyalar (yol + ne değişti)
## Test sonuçları (komut + sonuç; tarayıcı 360/1280 px gözlemi)
## Yapamadıklarım / emin olmadıklarım
## Öğretmenin bakması gerekenler
```

## 6. Öğretmenle konuşma
- Her adımı kısa söyle; bir şey tıklaması gerekiyorsa yeri tek tek yaz.
- Bir iş beklenenden büyük çıkarsa ya da yasaklara değiyorsa **dur**, rapora yaz, öğretmene söyle.
