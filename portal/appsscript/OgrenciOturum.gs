/** Öğrenci oturum API'si — pilot/test amaçlı. */
function oturumSayfasi_() {
  const s = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(OTURUM_SAYFA_ADI);
  if (!s) throw new Error('OTURUMLAR sayfası bulunamadı.');
  return s;
}

function oturumTokenGecerliBicimdeMi_(token) {
  return typeof token === 'string' &&
    /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}-[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(token);
}

function oturumAc_(ogrenci) {
  const token = Utilities.getUuid() + '-' + Utilities.getUuid();
  const simdi = new Date();
  oturumSayfasi_().appendRow([
    ozet_(token), String(ogrenci.no), simdi,
    new Date(simdi.getTime() + OTURUM_MILISANIYE)
  ]);
  return token;
}

function oturumKaydi_(token) {
  if (!oturumTokenGecerliBicimdeMi_(token)) return null;
  const sheet = oturumSayfasi_();
  const count = sheet.getLastRow() - 1;
  if (count < 1) return null;
  const hash = ozet_(token);
  const rows = sheet.getRange(2, 1, count, 4).getValues();
  const now = Date.now();
  for (let i = rows.length - 1; i >= 0; i--) {
    const [stored, no, , expiry] = rows[i];
    if (stored === hash && expiry instanceof Date && expiry.getTime() > now) {
      return {no: String(no), row: i + 2};
    }
  }
  return null;
}

function kayitNoIle_(no) {
  const sheet = kayitSayfasi_();
  const sonSatir = sheet.getLastRow();
  if (sonSatir < 2) return null;
  const rows = sheet.getRange(2, 1, sonSatir - 1, 4).getDisplayValues();
  const row = rows.find(r => String(r[0]).trim() === String(no));
  if (!row) return null;
  return {
    no: String(row[0]).trim(),
    ad: String(row[1]).trim(),
    misafir: String(row[3]).trim().toUpperCase() === 'TEST'
  };
}

/** Tarayıcıdan çağrılan giriş API'si. */
function ogrenciGirisiYap(kod) {
  const input = String(kod || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(input)) {
    return {basarili: false, mesaj: '6 karakterli kodunu kontrol et.'};
  }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return {basarili: false, mesaj: 'Sistem meşgul. Tekrar dene.'};
  }
  try {
    const check = girisKontrol_(input, Date.now());
    if (!check.izin) {
      return {basarili: false, mesaj: 'Çok fazla giriş denemesi. Bir süre sonra tekrar dene.'};
    }
    const student = kayitBul_(input);
    if (!student) {
      hataliGirisiKaydet_(check);
      return {basarili: false, mesaj: 'Giriş doğrulanamadı.'};
    }
    const token = oturumAc_(student);
    basariliGirisTemizle_(check);
    return {basarili: true, token, ogrenciAdi: student.ad, misafir: student.misafir};
  } finally {
    lock.releaseLock();
  }
}

/** Oturum her görüntülemede sunucuda doğrulanır. */
function oturumBilgisi(token) {
  const kayit = oturumKaydi_(token);
  if (!kayit) return {basarili: false};
  const student = kayitNoIle_(kayit.no);
  if (!student) return {basarili: false};
  return {basarili: true, ogrenciAdi: student.ad, misafir: student.misafir};
}

/** Sunucudaki oturumu iptal eder. */
function cikisYap(token) {
  if (!oturumTokenGecerliBicimdeMi_(token)) return false;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Sistem meşgul. Tekrar dene.');
  try {
    const record = oturumKaydi_(token);
    // Oturum zaten yoksa da çıkış tamamlanmış sayılır.
    if (!record) return true;
    oturumSayfasi_().deleteRow(record.row);
    return true;
  } finally {
    lock.releaseLock();
  }
}