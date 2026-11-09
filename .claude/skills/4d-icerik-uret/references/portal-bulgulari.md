# Kullanıcının eğitim portalından bulgular

47 küçük dosya (<200 KB) incelendi: Fen, İnsan Hakları, Matematik, Sosyal, Trafik, Türkçe, oyunlar. Büyük dosyalar (kurtuluşyolu 7,5 MB, sözavcıları 3,9 MB, sayiproblemleri 1,6 MB vb.) okunmadı. Bulgular otomatik tarama ve örnek okumaya dayanır, her dosya tek tek çalıştırılmadı.

## Genel tablo
- Dış bağımlılık: 2 dosyada (besinakademisi, yaya trafik dosyası). Çevrimdışı sınıfta bozulur, sistem fontu ve yerel ses kullan.
- İlerleme kaydı: 43/47 dosyada yok (localStorage kullanılmıyor, ör. noktalamaisaretleri). Sayfa yenilenince başa dönülür.
- Zengin görev şeması (stage/type/why/hint) yalnızca bazı Türkçe dosyalarda var; 29 dosyada hiç yok (ör. millimucadele doğru-yanlış + `e` açıklama var, ama ipucu ve aşama yok).
- Görev türü sıklığı: mc/choice/mcq, tf, match, classify, input, drag, reflect, order/sort, boss.
- Karıştırma kodu olmayan 4 dosyada (fosiller, fosiller2, toplamacikarmaproblem2, millikultur) cevap indeksi dağılımı kabaca dengeli göründü; konum yanlılığı **kanıtlanmadı**. Yine de motor seviyesinde karıştırma zorunlu tutulsun.

## Alınacak desenler
1. noktalamaisaretleri: `attempts`, `firstTry`, `hintUsed`; yanlışta cevap gösterilmez; geçilen görev inceleme bölümünde cevap + `why` ile görünür.
2. hikayededektifi: `evidence` (kanıtı işaretle) türü ve final `boss` görevi, her görevde `explanation`.
3. millimucadele: kısa doğru-yanlış önermelerinde gerekçe (`e`) şart.

## Eksik kalanlar
- Kayıt (güvenli localStorage), öğretmen raporu, ipucu merdiveni (tek ipucu yerine ≤3 kademe), uyarlanabilir tekrar.
