/** 4/D — İzlenen etkinlikleri tek yerde tanımla.
 * Yeni bir etkinliği izlemeye almak için önce oyun sonu köprüsü,
 * testler ve öğretmen onayı tamamlanmalı. Sadece burada kayıt açmak yetmez.
 */
/* KATALOG BASLA: sunucu-izin-listesi — elle değiştirmeyin, portal/etkinlik-kayitlari.json dosyasını düzenleyin */
const SONUC_IZINLI_ETKINLIKLER_ = Object.freeze({
  'mat-kayipsayilar': Object.freeze({konu:'Matematik',kazanim:'M.4.1.3.4',maxTotal:1000}),
  'mat-oruntuler': Object.freeze({konu:'Matematik',kazanim:'SAYI_ORUNTULERI_KOD_BEKLIYOR',maxTotal:1000}),
  'mat-dogalsayilar-degerlendirme': Object.freeze({konu:'Matematik',kazanim:'Doğal sayıları değerlendirme',maxTotal:1000}),
  'mat-toplamacikarma-1': Object.freeze({konu:'Matematik',kazanim:'Toplama ve çıkarma problemleri 1',maxTotal:1000}),
  'mat-toplamacikarma-2': Object.freeze({konu:'Matematik',kazanim:'Toplama ve çıkarma problemleri 2',maxTotal:1000}),
  'insan-sorumluluk': Object.freeze({konu:'İnsan Hakları, Yurttaşlık ve Demokrasi',kazanim:'İnsan olma sorumluluğu',maxTotal:1000}),
  'trafik-yaya': Object.freeze({konu:'Trafik Güvenliği',kazanim:'Yaya olarak trafik kuralları',maxTotal:1000}),
  'fen-besinlerdegerlendirme': Object.freeze({konu:'Fen Bilimleri',kazanim:'Besinler ve Özellikleri — Ünite Değerlendirme',maxTotal:200}),
  'tur-ikilemeler': Object.freeze({konu:'Türkçe',kazanim:'İkilemeler',maxTotal:200}),
  'mat-cikarmaislemi': Object.freeze({konu:'Matematik',kazanim:'Çıkarma işlemi',maxTotal:200}),
  'fen-besinkasifleri': Object.freeze({konu:'Fen Bilimleri',kazanim:'Besinler — Görev Haritası final testi',maxTotal:200}),
  'sos-oyunzamani': Object.freeze({konu:'Sosyal Bilgiler',kazanim:'SB.4.2.3 Geçmişten günümüze çocuk oyunları',maxTotal:200}),
  'insan-farkliyasamlar': Object.freeze({konu:'İnsan Hakları, Yurttaşlık ve Demokrasi',kazanim:'Y.4.2.3 Çocuk yaşantılarını karşılaştırma',maxTotal:200})
});
/* KATALOG BITIR: sunucu-izin-listesi */
function etkinlikTanimi_(id) {
  if (typeof id !== 'string' ||
      !Object.prototype.hasOwnProperty.call(SONUC_IZINLI_ETKINLIKLER_, id)) return null;
  return SONUC_IZINLI_ETKINLIKLER_[id];
}
