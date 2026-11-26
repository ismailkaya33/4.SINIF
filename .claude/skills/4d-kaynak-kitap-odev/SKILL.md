---
name: 4d-kaynak-kitap-odev
description: 4/D sınıfı için kaynak kitap setinden (Z Kitap "Avcı", "Ödev Yaprakları", "Hafta Sonu Ödev Avcısı") haftalık ödev planı çıkarmak ve portaldaki "Kaynak Kitap Ödevlerim" kartını (kaynak-odev.json) güncellemek için kullan. "Kaynak kitaptan ödev", "avcıdan hangi sayfalar", "bu hafta kitap ödevi", "kaldığımız yer" gibi isteklerde ve haftalık hatırlatmada çalışır.
---

# 4/D — Kaynak kitap ödev planı

Öğretmen kod bilmez; çıktı kısa ve sade Türkçe olsun. Kitaplar okula gelmez (yasak), ödev evde yapılır.

## Dosyalar
| Dosya | Ne |
|---|---|
| `kaynak-kitap/kitaplar.json` | 8 kitabın içindekiler haritası (sayfa ↔ konu) + Hafta Sonu Ödev Avcısı'nın 35 haftası |
| `kaynak-kitap/ilerleme.json` | Kaldığımız yer: kitap başına son verilen sayfa, son verilen hafta sonu yaprağı |
| `kaynak-kitap/ders-programi.json` | Haftalık ders programı (hangi gün hangi ders kaç saat) |
| `kaynak-odev.json` (site kökü) | Portal kartının okuduğu haftalık liste; `bitis`ten sonra kart gizlenir |
| `KaynakKitap/icindekiler/` | İçindekiler ekran görüntüleri; telifli, yalnız yerelde (`.gitignore`) |

Kitap id'leri: `tr-avci, tr-oy, mat-avci, mat-oy, fen-avci, fen-oy, sos-avci, sos-oy`.
Portala yalnız kitap adı, sayfa numarası ve konu adı gider; kitap içeriği asla kopyalanmaz.

## Öğretmen kuralları (2026-11-26)
- Ödev, **o gün ders programında olan dersin**, işlenmekte olan ya da işlenmiş konusundan verilir.
- Sayfa sınırı yok; konu bir hafta sürüyorsa sayfalar o haftanın günlerine ve hafta sonuna yayılır.
- Hafta sonu ödev yaprağında (Hafta Sonu Ödev Avcısı, haftalar sırayla) **işlenmemiş bir konu varsa o hafta sonu verilmez**.
- Geride kalanlara dönülmez, güncel konudan devam edilir.
- Türkçe dil bilgisi Avcı'daki sırayla işlenir (Cümle Bilgisi 81 → Kurallı-Devrik 87 → Sebep-Sonuç 95 → Karşılaştırma 101 …).
- Kitabı olan öğrenci için zorunlu. Öğrenci yalnız listeyi görür; "yaptım" işareti yok.

## Haftalık adımlar
1. `git pull`, sonra sıradaki haftanın konularını yıllık plandan al (`node tools/haftalik-hatirlatma.mjs <pazartesi>`).
2. Taslak üret (yazmadan):
   ```
   node tools/kaynak-odev-oner.mjs --baslangic 2026-11-30 --konu tr=1,mat=2,fen=0,sos=2
   ```
   `--konu`: ders başına kaç bölüm ilerlensin (0 = o derse yeni sayfa yok). Kitabın sıradaki bölümü yıllık plandaki
   konudan **ilerideyse** (ör. Fen'de kitap Kuvvet'te, plan hâlâ Besinler'de) o dersi 0 yap.
   Belirli bir sayfaya kadar: `--kadar mat-avci=92`. Hafta sonu yaprağında işlenmemiş konu varsa `--hafta-sonu hayir`.
3. Öğretmene gün gün tabloyu ve sıradaki hafta sonu yaprağının 4 konusunu göster. Tek soru: "Bu liste uygun mu?"
   Öğretmen "çarpma uzadı" gibi düzeltme verirse `--konu`/`--kadar` ile yeniden üret.
4. Onay gelince: `node tools/kaynak-odev-oner.mjs ... --yaz --ilerle` → `kaynak-odev.json` ve `kaynak-kitap/ilerleme.json`
   değişir. Ne yayınlanacağını söyleyip onay al, `main`'e gönder. GitHub Pages birkaç dakikada yayınlar; portal dalına dokunulmaz.
5. Öğretmen sınıfta farklı sayfa verdiyse (ör. "dün 83–84'ü verdim") `ilerleme.json`'u elle düzelt.

## Zamanlanmış görevde
Yalnız 2. adımdaki taslağı bildirime ekle; dosya yazma, gönderme yapma.

## Denetim
Kitap haritası değişince: `node tools/kaynak-odev-oner.mjs --denetle` (sıra, çakışma, eksik hafta). `dogrulanmali: true`
işaretli bölümleri öğretmene sor ya da `KaynakKitap/icindekiler/` görüntülerinden kontrol et.
