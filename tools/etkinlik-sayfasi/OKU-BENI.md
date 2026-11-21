# Etkinlik sayfaları (basılı, 2 × A4)

Öğretmenin isteği (2026-11-21): defter notu olan her konu için **2 sayfalık, çıktıya hazır etkinlik sayfası**.
A4 verimli kullanılır (iki sütun, sıkı satır arası, 11 pt gövde), her konunun ayrı cevap anahtarı vardır.
Baskı materyalidir: portala/siteye gönderilmez.

## Basmak

```
node tools/etkinlik-sayfasi-yap.mjs tools/etkinlik-sayfasi/<ad>.mjs   # tek konu
node tools/etkinlik-sayfasi-yap.mjs --hepsi                            # hepsi (~4 dk)
```

Çıktı: `Baski/<Ders>/etkinlik-sayfalari/<ad>.pdf` (öğrenci, 2 sayfa) + `<ad>-cevap.pdf` + `<ad>.html`.
Araç her konu için **doluluk** yazar (`%95 / %90(78)` = 1. sayfa %95, 2. sayfa %90, kısa sütun %78).
Hedef her sayfada %85–100; `TAŞMA` çıkarsa blok çıkarılır ya da kısaltılır. `hesap hatası` çıkarsa
metindeki “a + b = [c]” eşitliği yanlıştır. `--onizleme=<klasör>` PNG önizleme verir.

## Konu dosyası

```js
export default {
  ders: 'Matematik', baslik: 'Toplama İşlemi',
  sayfalar: [[ /* 1. sayfanın blokları */ ], [ /* 2. sayfanın blokları */ ]],
};
```

Her blok `{ tur, baslik, yonerge?, genis? }` alır (`genis: true` iki sütunu kaplar). Türler:

| tur | alanlar |
|---|---|
| `bosluk` | `maddeler: ['Metin [cevap] metin']`, `kutu?: [kelime havuzu]`, `numarasiz?` |
| `dy` | `maddeler: [['cümle', true/false]]` |
| `eslestir` | `ciftler: [[sol, sağ]]`, `fazla?: [çeldirici]` (sağ sütun karışık basılır) |
| `coktan` | `sorular: [{ s, sec: [A, B, C], d: doğruSıra, alt? }]` |
| `tablo` | `basliklar`, `satirlar` (hücrede `[cevap]` boşluk; `?metin` öğrencide boş, anahtarda örnek), `genislik?`, `ortala?`, `satirYuk?` |
| `yaz` | `sorular: [{ s, satir, cevap }]` (cevap anahtarda örnek olarak görünür) |
| `problem` | `sorular: [{ s, yer (mm), cozum, cevap }]` |
| `islem` | `islemler: ['4678+2595', '608x43']` (alt alta; sonucu araç hesaplar) |
| `siniflandir` | `gruplar: [{ ad, uyeler }]`, `kelimeler?` (verilmezse karışık) |
| `kelimeavi` | `kelimeler`, `boyut` (ızgara; en uzun kelimeden küçük olamaz) |
| `metin` | `metin: [paragraflar]` (okuma parçası, numarasız) |
| `html` | `html`, `anahtarHtml` (SVG yön gülü, kroki, aile ağacı gibi) |

Satır içi: `[cevap]` boşluk, `{7}` rakam kutusu, `**kalın**`, `__altı çizili__`. Boşluktan sonra gelen ek ve
noktalama boşluğa yapışır (`[su] dan` → `____dan`).
