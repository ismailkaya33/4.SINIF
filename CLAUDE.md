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

Yıllık plan: `YillikPlan/*.docx` (yerel, GitHub'a gitmez) → `node tools/yillik-plan-oku.mjs` → `YillikPlan/yillik-plan.json`.

## Parçalar (ayrıntı: `MIMARI.md`)
- **Etkinlik sitesi:** `main` dalı → GitHub Pages `https://ismailkaya33.github.io/4.SINIF/`. Ders klasörleri:
  `Turkce, Matematik, Fen, Sosyal, Insanhaklari, Trafik, Oyunlar`. Kodsuz katalog: `materyaller.html`.
- **İçerik listesi:** `icerik-katalogu.json`. Ders klasörüne `.html` gelince GitHub Actions (`icerik-katalogu.yml`) listeye
  ekler; portal, öğretmen raporu ve katalog bu listeden okur. Gizlemek: `"gizli": true`.
- **Öğrenci portalı + öğretmen raporu:** Google Apps Script. Kaynağı `hazirlik/kazanim-takibi-20261101` dalında `portal/`.
  Bu dala `portal/appsscript/**` veya `portal/ogretmen-rapor/**` gönderimi **anında canlıya** çıkar → önce öğretmenin onayı.
- **Sonuç akışı:** öğrenci 6 haneli kodla girer → takipli etkinlik portal içinde açılır → etkinlik `postMessage`
  (`4d:activity-finished`, gerekirse `4d:item-result`) gönderir → portal oturumla `ETKINLIK_SONUCLARI` sayfasına yazar.
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
- Bekleyenler: KVKK aydınlatma metni, aylık veli raporu (sonraya bırakıldı).
