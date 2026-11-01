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
  const salt=props.getProperty('GIRIS_LIMIT_SALT');
  if(!salt||salt.length<32)throw Error('GIRIS_LIMIT_SALT en az 32 karakter olmalı.');
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
  if(!lock.tryLock(5000))throw Error('Giriş denemesi kaydedilemedi.');
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

/**
 * Sadece öğretmen tarafından Apps Script düzenleyicisinden BİR KEZ çalıştırılır.
 * Tuz öğrencilere gösterilmez, kaynak koda yazılmaz.
 */
function girisKorumaTuzuHazirla_() {
  const props=PropertiesService.getScriptProperties();
  const existing=props.getProperty('GIRIS_LIMIT_SALT');
  if(existing){if(existing.length<32)throw Error('Mevcut tuz yetersiz.');return true;}
  const seed=Utilities.getUuid()+Utilities.getUuid()+Utilities.getUuid();
  props.setProperty('GIRIS_LIMIT_SALT',seed);
  return true;
}
