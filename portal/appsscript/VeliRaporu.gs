/** 4/D öğrenci projesi: aylık ClassDojo raporunu yalnızca oturumu açık öğrenciye OKUMA.
 *
 * Tablo sayfası: VELI_RAPORLARI (öğretmen her ay yapıştırır; GitHub'a yazılmaz).
 * Sütunlar (1. satır başlık):
 *  A Ay            "2026-10 Ekim"
 *  B Dönem         "1 Ekim 2026 – 1 Kasım 2026"
 *  C Öğrenci       ClassDojo'daki ad (portal kaydındaki adla eşleştirilir)
 *  D Olumlu sayısı E Olumlu puan
 *  F Geliştirme sayısı G Geliştirme puanı
 *  H Yüzde (olumlu oranı)
 *  I Olumlu davranışlar        "ÖDEV YAPILMIŞ +22 | GOOD +4"
 *  J Geliştirmesi gerekenler   "EKSİK ÖDEV -4 | GÜRÜLTÜCÜ -6"
 *  K Durum         YAYINDA / TASLAK (yalnız YAYINDA görünür)
 */
const VELI_RAPOR_SAYFASI_ = 'VELI_RAPORLARI';
const VELI_RAPOR_SUTUN_ = 11;

/** Büyük/küçük harf, Türkçe harf ve boşluk farkını yok sayarak ad karşılaştırır. */
function veliRaporAdNormal_(v) {
  return String(v || '').replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase()
    .replace(/̇/g, '')
    .replace(/Ç/g, 'C').replace(/Ğ/g, 'G').replace(/İ/g, 'I').replace(/Ö/g, 'O')
    .replace(/Ş/g, 'S').replace(/Ü/g, 'U').replace(/Â/g, 'A').replace(/Î/g, 'I').replace(/Û/g, 'U')
    .replace(/\s+/g, ' ').trim();
}

function veliRaporDurumNormal_(v) {
  return veliRaporAdNormal_(v).replace(/\s/g, '');
}

function veliRaporSayi_(v) {
  const n = Number(String(v || '').replace('%', '').replace(',', '.').replace(/[^\d.\-]/g, ''));
  return Number.isFinite(n) ? Math.abs(Math.round(n)) : 0;
}

/** "ÖDEV YAPILMIŞ +22 | GOOD +4" → [{ad:'ÖDEV YAPILMIŞ', puan:22}, ...] */
function veliRaporDavranislar_(metin) {
  return String(metin || '').split('|').map(s => s.trim()).filter(Boolean).slice(0, 25).map(s => {
    const m = /^(.*?)\s*([+\-−]?\s*\d+)$/.exec(s);
    return m ? {ad: m[1].trim().slice(0, 60), puan: veliRaporSayi_(m[2])} : {ad: s.slice(0, 60), puan: 0};
  }).filter(d => d.ad);
}

/** Tarayıcıdan çağrılır: yalnız kendi raporlarını döndürür (en yeni ay önce, en çok 12). */
function ogrenciAylikRaporlari(token) {
  const oturum = oturumKaydi_(token);
  const ogrenci = oturum ? kayitNoIle_(oturum.no) : null;
  if (!ogrenci) return {basarili: false, raporlar: []};
  // Velisi davranış raporuna "HAYIR" dediyse rapor gösterilmez (VeliOnaylari.gs).
  if (veliOnayiYok_(ogrenci.no, 'DavranisRaporu')) return {basarili: true, raporlar: []};
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VELI_RAPOR_SAYFASI_);
  if (!sh) return {basarili: true, raporlar: []};
  const count = Math.max(0, sh.getLastRow() - 1);
  if (!count) return {basarili: true, raporlar: []};
  const ad = veliRaporAdNormal_(ogrenci.ad);
  if (!ad) return {basarili: true, raporlar: []};
  const rows = sh.getRange(2, 1, count, VELI_RAPOR_SUTUN_).getDisplayValues();
  const raporlar = rows
    .filter(r => veliRaporDurumNormal_(r[10]) === 'YAYINDA' && veliRaporAdNormal_(r[2]) === ad && String(r[0]).trim())
    .sort((a, b) => String(b[0]).trim().localeCompare(String(a[0]).trim()))
    .slice(0, 12)
    .map(r => ({
      ay: String(r[0]).trim().slice(0, 40),
      donem: String(r[1]).trim().slice(0, 80),
      olumlu: {sayi: veliRaporSayi_(r[3]), puan: veliRaporSayi_(r[4]), davranislar: veliRaporDavranislar_(r[8])},
      gelistirme: {sayi: veliRaporSayi_(r[5]), puan: veliRaporSayi_(r[6]), davranislar: veliRaporDavranislar_(r[9])},
      yuzde: Math.min(100, veliRaporSayi_(r[7]))
    }));
  return {basarili: true, raporlar: raporlar};
}

/** ÖĞRETMEN İÇİN: Apps Script düzenleyicisinde çalıştırılır, sonucu "Yürütme günlüğü"nde görülür.
 *  Tablodaki hangi adın portal kaydıyla eşleşmediğini listeler. Tarayıcıya bilgi döndürmez. */
function veliRaporuEslesmeKontrolu() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VELI_RAPOR_SAYFASI_);
  if (!sh || sh.getLastRow() < 2) { Logger.log('VELI_RAPORLARI sayfası yok ya da boş.'); return; }
  const kayit = kayitSayfasi_();
  const kayitAdlari = new Set(kayit.getLastRow() < 2 ? [] :
    kayit.getRange(2, 2, kayit.getLastRow() - 1, 1).getDisplayValues().map(r => veliRaporAdNormal_(r[0])).filter(Boolean));
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, VELI_RAPOR_SUTUN_).getDisplayValues();
  const eslesmeyen = rows.filter(r => String(r[2]).trim() && !kayitAdlari.has(veliRaporAdNormal_(r[2])))
    .map(r => String(r[0]).trim() + ' → ' + String(r[2]).trim());
  Logger.log('Rapor satırı: ' + rows.length + ', eşleşmeyen: ' + eslesmeyen.length);
  eslesmeyen.forEach(s => Logger.log('EŞLEŞMEDİ: ' + s));
}
