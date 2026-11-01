/**
 * 4/D — Giriş denemesi sınırı (ENTEGRASYON TASLAĞI).
 * Tek başına yüklemek korumayı etkinleştirmez. Mevcut GirisGuvenligi.gs
 * ve ogrenciGirisiYap işlevi incelendikten sonra çağrılar entegre edilmelidir.
 *
 * Tehdit modeli: ip adresine erişim yok. Bu nedenle kullanıcı kodunun
 * SHA-256 özeti üzerinden sınırlama uygulanır. Bu yalnızca aynı koda
 * tekrar tekrar denemeleri yavaşlatır; farklı kodlara dağıtılmış tahminleri
 * tek başına engellemez. CacheService mutlak güvenlik sınırı değildir.
 */
const GIRIS_LIMIT_ADEDI_=5;
const GIRIS_LIMIT_PENCERE_SN_=15*60;
function girisDenemeAnahtari_(girisKodu) {
  const props=PropertiesService.getScriptProperties();
  // Sabit tuz olmadan hash'lerin sözlükle çözülmesi kolaylaşır.
  let salt=props.getProperty('GIRIS_LIMIT_SALT');
  if(!salt)throw Error('GIRIS_LIMIT_SALT özelliği henüz ayarlanmadı.');
  const payload=salt+':'+String(girisKodu||'').trim().toUpperCase();
  const digest=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,payload);
  return '4d:login:'+Utilities.base64EncodeWebSafe(digest).slice(0,40);
}
function girisDenemeIzinli_(girisKodu) {
  const cache=CacheService.getScriptCache();
  const key=girisDenemeAnahtari_(girisKodu);
  return Number(cache.get(key)||0)<GIRIS_LIMIT_ADEDI_;
}
function girisBasarisizDenemeKaydet_(girisKodu) {
  // Yarış durumlarını azaltır; CacheService kesin atomik sayaç sağlamaz.
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(5000))return false;
  try {
    const cache=CacheService.getScriptCache(),key=girisDenemeAnahtari_(girisKodu);
    const old=Number(cache.get(key)||0);
    cache.put(key,String(Math.min(old+1,GIRIS_LIMIT_ADEDI_)),GIRIS_LIMIT_PENCERE_SN_);
    return true;
  } finally {lock.releaseLock();}
}
function girisBasariliDenemeTemizle_(girisKodu) {
  CacheService.getScriptCache().remove(girisDenemeAnahtari_(girisKodu));
}
