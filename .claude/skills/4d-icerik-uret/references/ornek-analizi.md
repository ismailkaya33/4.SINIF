# Örnek oyunların analizi

Kullanıcının yüklediği yedi örnek incelendi. Bunlar "iyi/kötü" etiketi değil, her birinden alınacak ve kaçınılacak şeylerin kaydıdır. Aşağıdaki bulguların çoğu kodda doğrudan görülen şeylerdir. Tamamı çalıştırılarak test edilmedi, "doğrulanmadı" denen yerler işaretlidir.

## Karşılaştırma özeti

| Örnek | Tür | En güçlü yanı | En ciddi eksiği |
|---|---|---|---|
| Sayı Avcıları (doğal sayılar değerlendirme) | Soru merdiveni | İpucu → ikinci şans → adım adım çözüm, kopyalanabilir öğretmen raporu | İlerleme kaydedilmiyor, kod sıkıştırılmış |
| Çarpma Kahramanları | Aksiyon + uyarlanabilir tekrar | 144 çarpım için ustalık haritası ve ağırlıklı tekrar | 6 mod aynı sorunun farklı görünümü, geri bildirim zayıf |
| Dünya'nın Hareketleri | 3B simülasyon + sınav | Sürüklenebilir gerçek zamanlı küre, saat dilimi tahmini | Cevap konumu dengesiz, ilerleme kaydı yok |
| Ördek Avcısı | Aksiyon | Üç zorluk, güvenli depolama, sentez ses, otomatik duraklatma | Yanlışta öğretici geri bildirim yok |
| Uzaylı Toplama | Aksiyon | Yanılgı temelli çeldirici (eldeyi unutma) | Dokunmatik kontrol çalışmıyor |
| İnsan Olma Sorumluluğu | Sekmeli etkinlik | Her seçenek için açıklama, söz/sertifika (tutum kazanımı) | CDN bağımlılığı, doğru cevap hep A |
| Metnin Bölümleri | Basit quiz | Sade, hafif | İçerik çok az, cevap sızıyor, kazanımı ölçmüyor |

## 1. Sayı Avcıları – Doğal Sayılar Değerlendirme

Alınacaklar:
- 5 görev × 5 soru, her soruda en çok 3 kademeli ipucu. İpuçları yavaş yavaş açılıyor (önce yöntem, sonra işlem).
- Yanlış → bölüm sonunda "bir şans daha" → yine yanlışsa **adım adım çözüm** ve doğru şık. Hata öğrenme fırsatına dönüyor.
- Soruyu geçip dönme, önceki soruya gitme.
- Seçenekler her soruda karıştırılıyor (`ord`), doğru cevap indeks değil sabit `a` ile tutulup karışık sıraya eşleniyor.
- Görsel destek: abaküs, sayı doğrusu, tablo, kart, bulut; sürüklenebilir "yaratıcı tahta" (rakam kartı + çizim).
- Bölüm sonunda kopyalanabilir öğretmen raporu (puan, ilk denemede doğru, ikinci şansta doğru, çözümle öğrenilen soru numaraları, ipucu, süre). Sunucu gerekmiyor.
- Veri ile motor ayrı (`D` dizisi). Karanlık mod, safe-area desteği.
- Kontrol ettiğim altı sorunun hesapları (1, 6, 12, 19, 20, 22) doğru çıktı. Tamamı doğrulanmadı.

Eksikler:
- İlerleme `localStorage`'a yazılmıyor, sayfa yenilenince başa dönülüyor.
- Kod tek satırlara sıkıştırılmış, öğretmenin soru eklemesi zor.
- Öğrenci ekranında "kitap sorusu N" etiketi var (kaynak izleme için iyi ama öğrenci için gürültü olabilir).

## 2. Çarpma Kahramanları – 12'ler Evreni

Alınacaklar:
- **Uyarlanabilir motor**: her çarpım için deneme, doğru/yanlış, seri, ortalama süre, durum (gri/sarı/yeşil/altın) ve ağırlık tutuluyor. Yanlış yapılan çarpımın ağırlığı artıyor, simetriği (a×b ↔ b×a) de etkileniyor. Son 4 soru tekrar etmiyor.
- 12×12 ustalık haritası ve "zorlandıklarımı çalış" modu.
- Çeldiriciler yakın çarpımlardan: a×(b±1), (a±1)×b, cevap±a, cevap±b.
- Öğrencinin seçtiği tempo (yavaş/dengeli/hızlı/turbo) ve zorluk (çırak/kaşif/usta/efsane).
- Dış bağlantı yok, depolama `try/catch` içinde, bölüm sonunda zorlanılan ve gelişen çarpımlar listeleniyor.
- Tek motor, çok görünüm: oyun mantığı `AdaptiveEngine` içinde, sahneler ayrı.

Eksikler:
- Altı mod aynı çoktan seçmeli soruyu farklı görünümle sunuyor. Bilişsel eylem değişmiyor, çeşitlilik görsel.
- Yanlışta doğru cevap kısa süre kayan metin olarak görünüp geçiyor. Neden yanlış olduğu, strateji (örn. 7×8 için 5-6-7-8 örüntüsü, 9'lar için parmak yöntemi) yok.
- Canvas `devicePixelRatio`'suz, yüksek çözünürlüklü ekranda bulanık olabilir. Sekme gizlenince otomatik duraklatma bulunmadı (aramada çıkmadı).
- Karakter/robot çizimi ve zırh rengi atölyesi gibi görsel zenginlik öğretmenin istediği yöndedir (SKILL.md 4.1); yalnız bu cila, eksik öğrenme içeriğinin yerini tutmamalı.
- Dosyanın sahne çizimi bölümünün tamamı okunmadı, orada bir hata olabilir.

## 3. Dünya'nın Hareketleri (gündüz-gece 3B)

Alınacaklar:
- Gerçek zamanlı WebGL küre: sürükle-döndür, iki parmakla yakınlaştır, eksen ve Güneş göster/gizle. Gündüz-gece çizgisi (terminatör) konumdan hesaplanıyor, yani model fiziksel olarak tutarlı.
- Şehir saatleri: öğrenci tahmin ediyor, küreden doğrulayabiliyor. "Fener deneyi" analojisi.
- Kalite düğmesi (düşük/yüksek), WebGL yoksa yedek mesaj, dış bağlantı yok.
- Her sorudan sonra açıklama, rozet ve karne.

Eksikler:
- 10 soruluk "Uzay Görevleri"nde 7 sorunun doğru cevabı ilk seçenek (`a=0`) ve seçenekler karıştırılmıyor. İlk şıkkı seçen öğrenci puan topluyor.
- Şehir saat farkları sabit (Wellington +9). Kasımda yaz saati nedeniyle gerçek fark +10 olur. Sabit fark kullanıldığı öğrenciye belirtilmiyor.
- Birçok soru doğru-yanlış veya 2–3 seçenekli (tahmin şansı yüksek).
- İlerleme kaydı yok, kod yoğun ve sıkıştırılmış.
- WebGL yedeği yalnızca bir mesaj, eski sınıf tabletinde oyun tamamen boş kalabilir.

## 4. Ördek Avcısı (çarpım tablosu)

Alınacaklar:
- `localStorage` için bellek yedekli güvenli sarmalayıcı.
- Sentez ses (dosya yok), kombo/rozet, yüksek skor, 3 zorluk.
- `visibilitychange` ile otomatik duraklatma, Esc ile duraklat, klavye 1–5.
- Çift cevap kilidi (`lock`), `devicePixelRatio` ölçekleme.
- Çeldiriciler çarpım yakınlarından.

Eksikler:
- Hareketli hedefler ve can sistemi okuma yavaş öğrenciyi zorlayabilir, baskısız mod yok.
- Yanlışta yalnızca "Doğru: N" gösteriliyor, neden açıklanmıyor, yanlış yapılan çarpım tekrar sorulmuyor.
- Öğretmen/veli raporu yok.

## 5. Uzaylı Toplama Macerası

Alınacaklar:
- Çeldirici üretimi yanılgı temelli: eldeyi unutma (`noCarrySum`), ±10/100/1000. Eldeli/eldesiz işlemler dengeli seçiliyor.
- Yanlışta "Doğrusu N" mesajı, hız kademeli artış, sakin başlangıç tempo.

Eksikler:
- **Hata**: işaretçi (fare/dokunma) olayı `ship.target` değişkenine yazıyor, ama gemi `targetX/targetY` değişkenlerinden okunuyor. Telefonda/dokunmatik ekranda gemi hareket etmiyor, yalnızca klavye çalışıyor. Başlangıç ekranı ise "parmağınla hareket et" diyor.
- Google Fonts bağlantısı var (çevrimdışı yedek Arial).
- `localStorage` yok, ilerleme/rekor kaydı yok.

## 6. İnsan Olma Sorumluluğum (tutum/değer kazanımı)

Alınacaklar:
- Üç etkinlik türü: kart eşleştirme (16 kart, 8 sorumluluk alanı), senaryo kararı (6 olay), söz + yazdırılabilir sertifika.
- Her seçenek için ayrı açıklama (yanlış seçeneğin neden uygun olmadığı da yazıyor).
- Yansıtma/söz bölümü notsuz, tutum kazanımına uygun.
- Konu özeti sekmesi.

Eksikler:
- Dış bağımlılık üç tane: Tailwind CDN, Tone.js CDN, Google Fonts. İnternetsiz açılırsa biçimsiz görünür ve ses çalışmaz.
- Altı senaryonun altısında da doğru seçenek A ve seçenekler karıştırılmıyor. Doğru seçenek aynı zamanda en uzun ve en nazik olanı, yani tahmin edilebilir.
- Eşleştirmede 8 kategori, yanlışta sınırsız deneme. Eleme yoluyla geçilebilir. Bazı kartlar belirsiz olabilir (örn. okul bahçesini temiz kullanmak "Çevre" mi, "Diğer İnsanlar" mı).
- İlerleme kaydı yok. Öğrenci adı yalnızca sertifikada, cihazda kalıyor (olumlu).

## 7. Metnin Bölümleri (Gizemli Kütüphane)

Alınacaklar:
- Sade, hafif, dış bağlantı yok. Kazanıma (hikâye edici/bilgilendirici metin bölümleri) yönelik doğru niyet.

Eksikler:
- İçerik çok az: 6 metin sınıflama, 6 tanım, 1 hikâye sıralama, 1 bilgilendirici sıralama. Her oynayışta aynısı, karıştırma yok.
- Tanımlarda cevap sızıyor: "konuya giriş yapılan" (→ Giriş), "düğümlerin çözüldüğü" (→ Çözüm).
- Bölüm 3–4 yönergesi doğru sırayı açıkça yazıyor (Serim → Düğüm → Çözüm). Öğrenci paragrafları **etiketlemek** yerine sıralıyor. Kazanım ölçülmüyor.
- Yanlışta sınırsız deneme, yalnızca hata sayacı. İpucu, açıklama, ikinci şans yok. İlk bölümde iki seçenekle deneyerek geçilebilir.
- Tema (kütüphane) mekanikle bağlantısız.

## Çıkan genel dersler

1. **Pedagojik derinlik > cila.** En iyi örnek (Sayı Avcıları) en az "oyun" olanıdır, çünkü yanlıştan öğretiyor.
2. **Test edilmemiş kontrol yolu en sık hata kaynağı** (Uzaylı Toplama'da dokunma). Üç girdi yolunu ayrı ayrı dene.
3. **Seçenek karıştırma ve cevap konumu** tüm örneklerde ya iyi (Sayı Avcıları, Çarpma Kahramanları, Ördek) ya da zayıf (Dünya'nın Hareketleri, İnsan Olma). Motor seviyesinde zorunlu olsun.
4. **Dış bağımlılık** çevrimdışı sınıfı bozar. Tek dosya, sistem fontu, sentez ses.
5. **Kayıt**: yenilemede ilerleme kaybı ev ödevi kullanımını bozar. Güvenli `localStorage` + bellek yedeği.
6. **Uyarlanabilir tekrar** (Çarpma Kahramanları'ndan) otomatikleştirme kazanımlarında çok değerli. Kavramsal kazanımlarda ise ipucu merdiveni (Sayı Avcıları'ndan) daha uygun.
7. **Öğretmene sunucusuz rapor** (kopyalanabilir metin) ev ödevi için pratik bir ara çözüm.
