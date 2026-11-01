/** Pilot giriş sınırlaması. IP veya kullanıcı bazlı güvenilir kimlik tespiti değildir. */
const SINIR_PENCERE_MS = 5 * 60 * 1000;
const KOD_MAX_HATA = 5;
const TOPLAM_MAX_DENEME = 80;

function sayacBilgisi_(key, now) {
  const raw = PropertiesService.getScriptProperties().getProperty(key);
  let r;
  try { r = raw ? JSON.parse(raw) : null; } catch (_) { r = null; }
  if (!r || !Number.isFinite(r.t) || now - r.t >= SINIR_PENCERE_MS || now < r.t) {
    return {t: now, n: 0};
  }
  return r;
}

function saya_(key, value) {
  PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(value));
}

// Bu işlev yalnızca ogrenciGirisiYap içindeki ScriptLock altında çağrılır.
function girisKontrol_(kod, now) {
  const kodKey = 'k_' + ozet_(kod);
  const tumKey = 'g_total';
  const kodSayac = sayacBilgisi_(kodKey, now);
  const toplam = sayacBilgisi_(tumKey, now);
  if (kodSayac.n >= KOD_MAX_HATA || toplam.n >= TOPLAM_MAX_DENEME) {
    return {izin: false};
  }
  toplam.n++;
  saya_(tumKey, toplam);
  return {izin: true, kodKey, kodSayac};
}

function hataliGirisiKaydet_(kontrol) {
  kontrol.kodSayac.n++;
  saya_(kontrol.kodKey, kontrol.kodSayac);
}

function basariliGirisTemizle_(kontrol) {
  PropertiesService.getScriptProperties().deleteProperty(kontrol.kodKey);
}
