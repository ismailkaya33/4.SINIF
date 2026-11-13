# 4/D Sınıf Portalı — Claude için sistem özeti

Sahibi: İsmail Kaya (ismailkaya33), 4/D sınıf öğretmeni. **Kod bilmiyor:** sade Türkçe konuş, teknik terimi benzetmeyle
açıkla, kullanıcıdan bir adım istenecekse tıklanacak yeri tek tek yaz. Müfredat: MEB 4. sınıf.

## Tek çalışma yeri
Her şey bu klasörden (`C:\Users\ismai\Projeler\4.SINIF`) ve Claude Code'dan üretilir: içerik, etkinlik, portal, panel.
Ayrı bir sohbet projesi kullanılmaz. Kurallar burada ve `.claude/skills/` altında durur; başka kopya tutma.

| Skill | Ne zaman |
|---|---|
| `4d-icerik-uret` | Etkinlik, oyun, değerlendirme, defter notu, çalışma kâğıdı, sunum üretmek (kalite kuralları burada) |
| `4d-etkinlik-takibe-al` | Bir etkinliğin sonucu öğretmen paneline düşsün |
| `4d-canli-kontrol` | Gönderilen değişikliğin canlıda çalıştığını kontrol etmek |
| `4d-haftalik-hatirlatma` | Yıllık plana göre bu/sıradaki haftanın konuları ve portalda eksik etkinlik/defter notu |

Ajan: `pedagojik-denetci` (`.claude/agents/`) — yeni/yenilenen etkinlik veya değerlendirmeyi **yayın onayı istenmeden önce**
salt okunur denetler (kazanım, cevap doğruluğu, dil, erişilebilirlik, sonuç mesajı). Dosya değiştirmez; son karar öğretmenin.

**Görsel üretimi** (boyama, poster, resimli not): Claude in Chrome ile öğretmenin ChatGPT Plus (yedek: Gemini Pro) hesabında çizdirilir,
tam boyutlu resmi öğretmen indirir, Claude A4 PDF yapar (`node tools/gorsel-uret.mjs --pdf-yap`). API anahtarı
(`GEMİNİ_API_KEY`) kurulu ama faturalandırma yok → araçla doğrudan çizim kapalı. Ayrıntı: `4d-icerik-uret` 4.2.
Tarz: boyama sayfası gibi değil, olgun görünüm; konuya göre **el yazısı defter** ya da **sketchnote** (Claude seçer).

Yıllık plan: `YillikPlan/*.docx` (yerel, GitHub'a gitmez) → `node tools/yillik-plan-oku.mjs` → `YillikPlan/yillik-plan.json`.

## Parçalar (ayrıntı: `MIMARI.md`)
- **Etkinlik sitesi:** `main` dalı → GitHub Pages `https://ismailkaya33.github.io/4.SINIF/`. Ders klasörleri:
  `Turkce, Matematik, Fen, Sosyal, Insanhaklari, Trafik, Oyunlar`. Kodsuz katalog: `materyaller.html`.
- **İçerik listesi:** `icerik-katalogu.json`. Ders klasörüne `.html` gelince GitHub Actions (`icerik-katalogu.yml`) listeye
  ekler; portal, öğretmen raporu ve katalog bu listeden okur. Gizlemek: `"gizli": true`.
- **Öğrenci portalı + öğretmen raporu:** Google Apps Script. Kaynağı `hazirlik/kazanim-takibi-20261101` dalında `portal/`.
  Bu dala `portal/appsscript/**` veya `portal/ogretmen-rapor/**` gönderimi **anında canlıya** çıkar → önce öğretmenin onayı.
- **Sonuç akışı:** öğrenci 6 haneli kodla girer → takipli etkinlik portal içinde açılır → etkinlik `postMessage`
  (`4d:activity-finished`) gönderir → portal oturumla `ETKINLIK_SONUCLARI` sayfasına yazar. Soru bazlı `4d:item-result`
  (rapor motoru gönderir) portalda **henüz kaydedilmiyor**; yalnız Fen Besinler ayrı mesajla (`4d:question-answer`) kaydedilir.
  Etkinlik doğrudan sunucuya POST etmez; öğrenci kodu etkinlik sayfasına taşınmaz.
- **Takipli etkinlik listesi:** `portal/etkinlik-kayitlari.json` (portal dalı) → `node tools/katalog-esitle.mjs`.
- **Oyunlar** klasörü için sonuç kaydı yapılmaz; defter notu ve değerlendirme de hazırlanmaz/önerilmez (öğretmenin kararı).

## Kurallar
- Göndermeden (push) önce ne yayınlanacağını söyle ve onay al; portal dalında iki kez dikkat et.
- İşe başlarken `git pull`; iş bitince klasörü **main** dalında bırak.
- Sır (anahtar, tablo kimliği, öğrenci adı/kodu) depoya yazılmaz; öğrenci verisi herkese açık sayfaya gömülmez.
- TEST40 öğretmen raporunda bilerek görünmez; Claude canlı Google sitesine kod girmez, girişi öğretmen yapar.
- Test etmediğin şeyi "çalışıyor" deme. Önizleme: Edge headless + sahte veri.
- Kazanım kodunu uydurma; emin değilsen "doğrulanmalı" yaz ve sor.
- Bekleyenler: KVKK aydınlatma metni.
- **Token tasarrufu:** tarayıcıda ekran görüntüsü yerine önce metin okuma (`get_page_text`/`read_page`/`find`) kullan;
  görüntü gerekirse küçük ölçek (`scale` 0.5) ya da `zoom`. `portal/appsscript/OgrenciGiris_Guncel.html` (~100 KB)
  bütün okunmaz: önce `Grep` ile yeri bul, sadece o aralığı oku. Aynı dosyayı tekrar tekrar okuma.

## Aylık ClassDojo raporu
Öğretmen ClassDojo PDF'ini klasöre bırakır → `python -I tools/classdojo-rapor.py "<pdf>"` → `VeliRaporlari/<ay>/tabloya-yapistir.tsv`
(klasör ve PDF `.gitignore`'da, GitHub'a gitmez). Rapor portalda olduğu için WhatsApp'a öğrenci başına PDF bölünmez
(öğretmenin kararı; istenirse `--bol`). TSV'yi Claude panoya kopyalar (`Set-Clipboard`), öğretmen portal tablosundaki
`VELI_RAPORLARI` sayfasına yapıştırılır (en alttaki boş satıra; başlık satırı zararsız). Portal `VeliRaporu.gs` ile
öğrenciye yalnız kendi adındaki `YAYINDA` satırları gösterir. Ad eşleşmesi için öğretmen Apps Script'te
`veliRaporuEslesmeKontrolu` çalıştırır. Claude ClassDojo'ya giriş yapmaz.

**Ayın Yıldızları:** aynı araç `yildizlar-yapistir.tsv` de üretir (ilk üç = net puan olumlu−geliştirme; "GELİŞEN" =
önceki aya göre olumlu yüzdesi en çok artan, ilk üç hariç). Öğretmen `AYIN_YILDIZLARI` sayfasına yapıştırır; portal
`AyinYildizlari.gs` ile gösterir (ad "AD S." biçiminde; kayıt adı yalnız "Bu sensin" için, tarayıcıya gitmez).
Ödül: istediği yemeği ısmarlama hakkı. Eşitlikte öğretmen karar verir.

**ClassDojo beceri düzeni (2026-11-11):** olumlu 8 davranış (+1/+2) + 5 değerlendirme düzeyi (85–100 +5, 70–84 +4,
55–69 +3, 45–54 +2, tamamladı +1; e-Okul aralıkları); geliştirmesi gerek 6 (−1, kötü davranış −2). İngilizce adlı
beceriler İngilizce öğretmeninindir, dokunulmaz. Silinen/yeniden adlandırılan becerilerin geçmiş puanları raporda
eski adıyla kalır.
