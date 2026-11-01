/** 4/D — İzlenen etkinlikleri tek yerde tanımla.
 * Yeni bir etkinliği izlemeye almak için önce oyun sonu köprüsü,
 * testler ve öğretmen onayı tamamlanmalı. Sadece burada kayıt açmak yetmez.
 */
const SONUC_IZINLI_ETKINLIKLER_ = Object.freeze({
  'mat-kayipsayilar': Object.freeze({
    konu: 'Matematik',
    kazanim: 'M.4.1.3.4',
    maxTotal: 1000
  }),
  'mat-oruntuler': Object.freeze({
    konu: 'Matematik',
    kazanim: 'KAZANIM_DOGRULANACAK',
    maxTotal: 1000
  })
});
function etkinlikTanimi_(id) {
  if (typeof id !== 'string' ||
      !Object.prototype.hasOwnProperty.call(SONUC_IZINLI_ETKINLIKLER_, id)) return null;
  return SONUC_IZINLI_ETKINLIKLER_[id];
}
