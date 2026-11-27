# Repo keşfi — incelenen depolar

`repo-kasifi` ajanının hafızası. Ajan buradaki depoları yeniden önermez. Haftalık rapor dosyaları bu klasörde
`YYYY-AA-GG.md` adıyla durur.

Karar sütunu: **önerildi** (öğretmene sunuldu) · **izlemede** (sonra tekrar bakılacak) · **elendi** ·
**benimsendi** (projeye alındı) · **reddedildi** (öğretmen istemedi — bir daha önerilmez).
Öğretmen bir öneriyi beğenmezse satırı "reddedildi" yapmak yeterli.

| Depo | Tarih | Karar | Gerekçe |
|---|---|---|---|
| microsoft/playwright | 2026-11-19 | önerildi | Etkinlik açılış/mesaj testi (B11, A12); Apache-2.0, bakımlı, öğrenci verisi yok |
| dequelabs/axe-core | 2026-11-19 | önerildi | Erişilebilirlik taraması (A7, A16); MPL-2.0, Playwright testine eklenir |
| lycheeverse/lychee-action | 2026-11-19 | önerildi | Kırık bağlantı/yol denetimi (C9, C15, B11); Apache-2.0, `--offline` ile yerel tarama |
| lycheeverse/lychee | 2026-11-19 | önerildi | lychee-action'ın motoru; Apache-2.0, son sürüm v0.24.2 |
| excalidraw/excalidraw | 2026-11-19 | önerildi | Tahtada şema/kroki aracı, tarayıcıda çevrimdışı; MIT, öğretmen kullanır |
| OpenBoard-org/OpenBoard | 2026-11-19 | önerildi | Windows tahta yazılımı, GPL-3.0 ayrı program; tahtada denenmeli |
| teacherdotdev/timer-toolbox | 2026-11-19 | izlemede | Pie timer güzel ama 1 yıldız, hazır adres doğrulanamadı, bun gerekir |
| pagedjs/pagedjs | 2026-11-19 | izlemede | MIT, bakımlı; mevcut A4 PDF araçları yeterli |
| ahmetaa/zemberek-nlp | 2026-11-19 | izlemede | Apache-2.0 Türkçe imla; TDK'nın yerini tutmaz, Java gerekir |
| pa11y/pa11y | 2026-11-19 | elendi | LGPL-3.0; axe-core + Playwright aynı işi yapıyor |
| ThisIsDelicious/TeacherToolkit-releases | 2026-11-19 | elendi | Lisans yok, yalnız .exe, 0 yıldız |
| QinXuanYun/Random-Roll-Call | 2026-11-19 | elendi | Lisans yok, Çince, 0 yıldız |
| clydeofficial/tdk-sozluk | 2026-11-19 | elendi | Resmî olmayan TDK kazıyıcısı, lisans algılanmadı, çok yeni |
| StarlangSoftware/TurkishSpellChecker | 2026-11-19 | elendi | GPL-3.0, TDK doğrulaması değil |
| mucahidkambur/tdk-sozluk | 2026-11-19 | elendi | Android uygulaması, 2024'ten beri güncellenmedi |
| raviqqe/muffet | 2026-11-19 | elendi | lychee ile aynı iş |
| stevenvachon/broken-link-checker | 2026-11-19 | elendi | lychee ile aynı iş |
| untitaker/hyperlink | 2026-11-19 | elendi | lychee ile aynı iş |
| kristoff-it/superhtml | 2026-11-19 | elendi | HTML doğrulayıcı, öncelik düşük |
| validator/validator | 2026-11-19 | elendi | HTML doğrulayıcı (vnu), öncelik düşük |
| OpenBoardView/OpenBoardView | 2026-11-19 | elendi | Alakasız (devre kartı görüntüleyici) |
| dgryc/ClassroomTimer | 2026-11-19 | elendi | 1 yıldız, açıklamasız, kullanım kanıtı yok |
| Mike825/LuckyStudentPicker | 2026-11-19 | elendi | GPL-3.0, 3 yıldız, kullanım kanıtı yok |
| luisfernandez0422/UTRGV_math_manipulatives | 2026-11-19 | elendi | 0 yıldız, lisans yok (benzer manipülatif depoları da) |
| debpalash/VoiceStudio | 2026-11-19 | elendi | AGPL-3.0, sınıf ihtiyacına uzak |
| altic-dev/FluidVoice | 2026-11-19 | elendi | GPL-3.0, yalnız macOS |
| lovell/sharp | 2026-11-21 | önerildi | Etkinlik içi gömülü resim küçültme (A14, A2, A3, A15); Apache-2.0, bakımlı, yerel |
| jsxgraph/jsxgraph | 2026-11-21 | önerildi | Geometri etkinlikleri bileşeni; MIT/LGPL çift lisans, CDN yerine yerel gömülür, boyut denenmeli |
| GoogleChromeLabs/squoosh | 2026-11-21 | önerildi | Öğretmen tarayıcıda tek resim küçültür; Apache-2.0, kendi istatistiği var, öğrenci verisi yüklenmemeli |
| OHF-Voice/piper1-gpl | 2026-11-21 | izlemede | GPL-3.0 ayrı araç; Türkçe ses CC BY-NC-SA ve tek, önce tarayıcı sesi denenmeli |
| chartjs/Chart.js | 2026-11-21 | izlemede | MIT; B1 başlayınca grafik için, şimdi gerek yok |
| google/clasp | 2026-11-21 | izlemede | Apache-2.0; kazancı belirsiz, canlıya anında çıkma riski |
| rhasspy/piper | 2026-11-21 | elendi | Arşivlenmiş, piper1-gpl'ye taşındı |
| GoogleChrome/workbox | 2026-11-21 | elendi | sw.js zaten var; C21 için gerekmez |
| rough-stuff/rough | 2026-11-21 | elendi | Son push 2024-07; sketchnote aracı var |
| eKoopmans/html2pdf.js | 2026-11-21 | elendi | PDF araçları projede var |
| Hopding/pdf-lib | 2026-11-21 | elendi | Son push 2024-07, ihtiyaç yok |
| mozilla/pdf.js | 2026-11-21 | elendi | İhtiyaç yok |
| google/guetzli | 2026-11-21 | elendi | Arşivlenmiş |
| mozilla/TTS | 2026-11-21 | elendi | 2023'ten beri güncellenmedi |
| mathigon/studio | 2026-11-21 | elendi | Sunucu gerektirir, lisans NOASSERTION |
| svgdotjs/svg.js | 2026-11-21 | elendi | Lisans algılanmadı, ihtiyaç yok |
| diffusionstudio/vits-web | 2026-11-21 | elendi | Lisans yok, 2024'ten beri güncel değil |
| oxipng/oxipng | 2026-11-21 | elendi | sharp yeter |
| svg/svgo | 2026-11-21 | elendi | SVG küçültme ihtiyacı yok |
| ikarienator/Geoboard | 2026-11-21 | elendi | Lisans yok, 2014'ten beri güncel değil |
| edutekno/geoboard | 2026-11-21 | elendi | Lisans yok, 0 yıldız (benzer geoboard/tangram depoları da) |
