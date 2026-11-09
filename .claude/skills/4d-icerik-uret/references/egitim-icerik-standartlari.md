# Eğitim İçeriği Standartları (4. Sınıf, MEB Müfredatı)

Bu dosya, her yeni çalışmada otomatik uygulanacak kalite kurallarıdır. Çalışma isteğinde bu kurallarla çelişen bir şey yazarsam, o çalışma için istek geçerlidir.

## 1. Genel ilkeler ve öncelik sırası
1. **Kazanım doğruluğu:** Her içerik belirtilen MEB kazanımına hizmet eder; kazanım dışı içerik eklenmez.
2. **Bilimsel/tarihî doğruluk:** Uydurma bilgi, uydurma alıntı yok (Atatürk'e atfedilen yeni söz uydurulmaz). Emin olunmayan bilgi işaretlenir.
3. **Çalışan mekanik:** Her buton, geçiş ve puanlama çalışır. Görsel süs doğruluktan sonra gelir.
4. **Kullanılabilirlik:** Akıllı tahtada ve öğrencinin telefon/tabletinde aynı sürüm sorunsuz çalışır.
5. **Görsel kalite:** Sade, hızlı, minimal. Süs amaçlı emoji, gereksiz animasyon ve ses yok.

## 2. Pedagojik kurallar (tüm çıktılar)
- Bir ekranda/slaytta **tek fikir**; az metin, büyük yazı, bol boşluk (bilişsel yük).
- Dil 4. sınıf düzeyine uygun, kısa cümleli, net.
- Soru sayısı ve etkileşim türü kazanımın doğasına göre değişir (işlemsel / kavramsal / tutum-değer). Tutum kazanımlarında notlandırılmayan yansıtma görevleri eklenir.
- **Tekrar yasağı:** Bir sorudaki cümle, olay veya durum başka soruda kullanılmaz. Aynı kavram yeniden sorulacaksa cümle ve durum değişir.
- **Seçenek kalitesi:** Çeldiriciler makuldür ama tek doğru cevap kesindir. Seçeneklerde eş/yakın anlamlı ifadeler aynı anda bulunmaz (ör. iki deyimin aynı anlama gelmesi gibi).
- Uzun bölümler kısa tutulur; özellikle son beceri bölümü bıkkınlık yaratacak kadar uzun olmaz.
- Sorular özgündür; kitaptan aynen kopyalanmaz. Kitaptaki sorulardan **benzer ama özgün** soru üretilir.

## 3. Etkileşimli HTML etkinlik/oyun
- **Tek dosya** (`index.html` veya belirtilen ad), çevrimdışı çalışır, harici kaynağa bağımlı değildir. Arayüz tamamen Türkçedir.
- İlerleme `localStorage` ile kaydedilir (kaydetme yoksa sorun çıkarmadan çalışır).
- **Motor + veri ayrımı:** İçerik (sorular, sözcükler) düzenlenebilir bir veri alanında durur; öğretmen kodu bozmadan içeriği değiştirebilir.
- Öğrenci soruyu geçip sonra geri dönebilir.
- **Öğretmen takip paneli zorunludur:** öğrenci başına tamamladı mı, puan, süre ve hangi kazanımda/soruda zorlandığı görünür. Panel yalnızca öğretmene açıktır (öğrenci ekranında görünmez).
- Takip verisi toplamak için çevrimdışı tek dosya yetmez, bir veri toplama altyapısı gerekir (bkz. madde 8). Altyapı bağlanmadıysa panel örnek veriyle çalışır ve bunun örnek veri olduğu açıkça belirtilir; gerçek takip varmış gibi gösterilmez.
- Dokunmatik ve fare kontrolü, büyük dokunma alanları, okunur yazı boyutu.
- Puanlama ve doğru/yanlış mantığı teslimden önce çalıştırılarak sınanır.

## 3.1 İnteraktif ders oyunları (ders içinde oynanan, kazanım odaklı)
- **Öğrenme önce, oyun sonra:** Oyun mekaniği kazanımı pekiştirmelidir. Refleks, şans veya şekil, bilgiyi gölgelememeli. Öğrenci her turda kazanım bilgisiyle etkileşmeli.
- **Süre ve yapı:** Bir oyun 5-15 dakikada bitecek şekilde tasarlanır. 3-5 kademeli seviye, can ve puan sistemi, hız artışı kademeli olur. Yenilgi cezalandırıcı değil, yanlış yapılan konunun yeniden sorulduğu bir fırsattır.
- **Geri bildirim:** Her yanıttan sonra kısa ve doğru bir açıklama gösterilir (yalnızca "yanlış" değil, "neden").
- **Soru havuzu veri alanında durur:** Yeterli sayıda, rastgele sıralı, aynı oyunda tekrar etmeyen soru. Öğretmen soruları koda dokunmadan değiştirebilir.
- **Mekanik çeşitliliği:** Kazanıma göre seçilir (ör. üç şeritli koşu, eşleştirme, sürükle-bırak, hafıza kartı, çengel bulmaca, sıralama, harita keşfi). Çok mekanikli oyunlarda önce **en fazla 2-3 mekanik tam çalışır halde** yapılır, kalanlar aşamalı eklenir; yarım mekanik teslim edilmez.
- **Sınıf kullanımı:** Aynı sürüm hem akıllı tahtada (tüm sınıf, büyük yazı) hem öğrencinin cihazında çalışır. İstenirse sıra veya takım modu eklenir.
- **Performans:** Düşük donanımlı tablet ve telefonlarda akıcı çalışır. 3D (ör. Three.js) yalnızca gerçekten gerekliyse ve mobilde sınanabiliyorsa kullanılır; aksi halde 2D tercih edilir.
- **Kontrol ve erişilebilirlik:** Dokunma, fare ve klavye desteklenir; dokunma alanları büyük, yazı okunur, ses isteğe bağlıdır.
- **Uygunluk:** Gerçekçi şiddet yok, korkutucu/rekabeti aşırı artıran öğe yok, "kaybetti" mesajı moral bozmaz.
- **Takip:** Oyun sonucu (tamamlama, puan, süre, yanlış yapılan kazanımlar) öğretmen takip paneline iletilir (madde 3 ve 8).
- **Dürüstlük:** Çalışmayan veya sınanmamış mekanik, çalışıyormuş gibi sunulmaz.

## 4. Baskı materyali (defter notu, çalışma kâğıdı, ev ödevi)
- A4, yazdırmaya uygun, sade (az mürekkep). Türkçe karakter sorunu olmayan yazı tipi kullanılır.
- **Defter notu:** Öğrencinin deftere yazabileceği kadar kısa; bilgi kutusu, örnek, kısa özet. Anahtar kavramlar vurgulanır.
- **Çalışma kâğıdı/kes-yapıştır:** Net yönerge, yeterli boşluk, kesme çizgileri belirgin.
- **Ev ödevi:** Kısa, ders içinde öğrenileni pekiştirir, yeni konu açmaz.
- Cevap anahtarı öğretmen kopyasında ayrı verilir.

## 5. Ölçme-değerlendirme
- Soru türleri çeşitlidir (çoktan seçmeli, eşleştirme, doğru-yanlış, boşluk doldurma, tablo, kavram haritası, bulmaca vb.) ve kazanıma uygun seçilir.
- Her soru bir kazanıma bağlanır; teslimde **kazanım–soru eşleşme tablosu** verilir.
- Cevap anahtarı ve puanlama yönergesi eklenir.
- Çıktı yalnızca "başardı/başaramadı" değil, hangi kazanımda eksik olduğunu gösterecek şekilde düzenlenir.

## 6. Akıllı tahta sunumu
- Bir slaytta tek kavram, en fazla bir satır başlık/altyazı; ayrıntı öğretmen notuna yazılır.
- Büyük punto, yüksek kontrast, bol boşluk. Ana ekranda "4. sınıf" gibi etiket yazısı olmaz.
- Örnekler günlük hayattan ve doğadan seçilir.

## 7. Görseller ve içerik kaynağı
- Fotoğraf ve haritalar **yalnızca öğretmenin verdiği dosyalardan** (zip/PDF) kullanılır. Gerçek fotoğraf uydurulmaz veya "benzer" diye üretilmez.
- Harita yanlış ya da belirsizse kullanılmaz; mümkünse gerçek koordinatlı katman tercih edilir.
- Tarihî içerikte kaynak notu tutulur; şiddet gerçekçi gösterilmez.
- Telifli metin (ders kitabı, şarkı, şiir) aynen kopyalanmaz.

## 8. Paylaşım alanı (web sitesi / uygulama; öğrenci, veli, diğer öğretmenler)
- Hedef: eğitim içeriklerinin öğrenci, veli ve diğer öğretmenlerle paylaşıldığı bir web sitesi veya uygulama. Etkinlikler bu alana bağlantıyla eklenebilecek şekilde, bağımsız çalışan sayfalar olarak hazırlanır.
- Kullanıcı rolleri ayrıdır: **öğrenci** (etkinliği yapar), **veli** (içeriğe bakar, kısa açıklama görür), **öğretmen** (içerik ve takip paneli, cevap anahtarı).
- Öğrenci sonuçları (öğretmen takip paneli) bu alanda toplanır. Toplama yöntemi (ör. Google Apps Script + Sheets ya da barındırılan bir uygulama + veritabanı) çalışma başında netleştirilir.
- Kişisel veri en az düzeyde tutulur: öğrenci adı yerine gerekirse takma ad/numara; herkese açık sayfada öğrenci adı, notu veya sonuç görünmez. Veri yalnızca öğretmen paneline düşer.
- Her etkinlik ders, ünite, kazanım ve sürüm bilgisiyle adlandırılır (ör. `Fen_4_Besinler_F.4.2.1_v2`).
- Bağlanmamış veya sınanmamış altyapı çalışıyormuş gibi gösterilmez.

## 9. Dürüst teslim raporu
Rapor **büyük/karmaşık işlerde (oyun, motor, uygulama, çok bölümlü içerik) veya istendiğinde** verilir; küçük işlerde gerekmez. Küçük işte bile çalışmayan ya da sınanamayan bir şey varsa bir cümleyle belirtilir. Rapor şunları içerir:
- **Çalıştırılıp sınanan:** ne, nasıl sınandı.
- **Sadece kodla kontrol edilen:** sınanmadı ama mantık incelendi.
- **Yapılmayan/eksik/riskli** noktalar.
- Kazanım–içerik eşleşmesi.
Rapor, olmayan bir özelliği varmış gibi göstermez.

## 10. Çalışma düzeni
- Büyük işler aşamalara bölünür; önce prototip, onaydan sonra devam.
- Her sohbet tek iş için açılır; başta kazanım, ilgili ünite PDF'i ve varsa görsel zip'i verilir.
- Çıktı dışında gereksiz açıklama yazılmaz; sorular tek mesajda toplanır.
