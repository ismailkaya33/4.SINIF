# Codex iş tarifi — Cevap defteri, 2. aşama (2026-11-27)

**Amaç (öğretmenin kararı):** Öğrenci kaç soru cevapladıysa o kadar sonuç öğretmene gider. Bitirdiği her soru anında
kaydedilir ve değiştirilemez. Etkinliği sonra açınca kayıtlı sorular kilitli görünür, öğrenci yalnız kalanları çözer.
Protokol: `MIMARI.md` → "Cevap defteri". Örnek tam uygulama: `Fen/besinlerdegerlendirme.html` (en alttaki betik).
Portal, sunucu ve öğretmen raporu **hazır** (Claude yaptı); bu iş yalnız etkinlik dosyalarıdır.

## Kurallar (değişmez)
- `portal/`, `.github/`, `icerik-katalogu.json`, `bu-hafta.json` dosyalarına dokunma. Dosya adı/kimlik değiştirme.
- `4d:activity-finished` mesajını silme ve değiştirme (eski kayıt; rapor cevap defteri olanı tercih eder).
- Soru kimliği (`questionId` / madde `id`) **sabit** olmalı: karıştırma, rastgele seçim ya da sırayla değişmez.
  Rastgele havuzdan soru seçen etkinlikte kimlik havuzdaki sorunun kendi kimliğidir.
- Kayıtlı soru: cevabı ve doğru/yanlış işareti görünür, değiştirilemez, puana yeniden eklenmez.
- Portal dışında (kodsuz) açılınca etkinlik bugünkü gibi çalışır; kilit yoktur.
- Cevaplanmayan soru boş kalır; öğrenci her zaman "Bitir / karnemi gör" diyebilir.

## A. Rapor motoru v3 kullanan 20 etkinlik
Motor `4d:answer` ve `4d:ready` mesajlarını zaten gönderiyor. Her dosyada yapılacak:
1. `RaporMotoru.onKayitli(fn)` ile kayıtlı maddeleri al; haritada/listede tamamlandı göster, oyun akışında atla
   (`RaporMotoru.kayitli(maddeId)` ile sor). Kayıtlı madde yeniden açılırsa "tekrar" olarak oynanabilir (`tekrar:true`, puan yok).
2. Her maddenin `madde` kimliği dolu ve dosya içinde tekil olmalı. Değilse sabit kimlik ver.
3. Dosyanın toplam (ilk kez sorulan) madde sayısını rapor et → Claude takip listesine `soruSayisi` yazar.

`Fen/kuvvetparki.html`, `Fen/miknatislaboratuvari.html`, `Fen/sagligimibenkorurum.html`, `Insanhaklari/haklarimizinpesinde.html`,
`Matematik/carpmaustalari.html`, `Matematik/cikarmadatahmin.html`, `Matematik/kisayoldancarpma.html`,
`Matematik/mat-toplama-problemleri-sinav.html`, `Sosyal/konumkasifi.html`, `Sosyal/krokiatolyesi.html`,
`Sosyal/sos-gecmistebiz-sinav.html`, `Trafik/oyunaraclari.html`, `Trafik/ulasimaraclari.html`, `Turkce/bilgidedektifi.html`,
`Turkce/cikarimbaslik.html`, `Turkce/cumlekasabasi.html`, `Turkce/gercekmihayalmi.html`, `Turkce/kantindedektifi.html`,
`Turkce/ozdeyisler.html`, `Turkce/tur-atasozu-deyim-sinav.html`

## B. Kendi sonuç kodu olan 13 etkinlik (motor yok)
`MIMARI.md` "Cevap defteri" protokolünü `Fen/besinlerdegerlendirme.html`'deki gibi ekle: açılışta `4d:ready`; her soru
bitince bir kez `4d:answer` (onay `4d:answer-ack` gelene kadar 5 sn'de bir yeniden); `4d:saved-answers` gelince geri yükle ve kilitle.
Her dosyanın soru sayısını ve soru kimliklerinin nasıl üretildiğini rapor et.

- `Turkce/ikilemeler.html`
- `Turkce/pekistirme.html`
- `Turkce/sozavcıları.html`
- `Matematik/cikarmaislemi.html`
- `Matematik/dogalsayilardegerlendirme.html`
- `Matematik/toplamacikarmaproblem1.html`
- `Matematik/toplamacikarmaproblem2.html`
- `Fen/besinkasifleri.html`
- `Sosyal/oyunzamani.html`
- `Insanhaklari/hakozgurluksorumluluk2.html`
- `Insanhaklari/insanolmasorumlulugu.html`
- `Trafik/yayaolaraktrafikkurallarietkinligi.html`
- `Insanhaklari/farkliyasamlar.html`

## Teslim ve denetim (Claude yapar)
- Her dosya için: değişen satırlar, soru sayısı, kimlik kuralı, kendi denediğin senaryo (2 soru cevapla → kapat → aç → kilitli mi).
- Claude: `node tools/sonuc-takip-kontrol.mjs` (cevap defteri YOK satırı kalmamalı), sözdizimi denetimi, portal içinde
  sahte sunucuyla "cevapla → kapat → aç → kalan" testi, sonra öğretmen onayıyla yayın. Önce bu haftanın listesindekiler (`bu-hafta.json`).
