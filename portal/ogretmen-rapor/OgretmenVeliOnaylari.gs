/** 4/D AYRI öğretmen raporu projesine eklenir. Öğrenci projesine EKLENMEZ.
 * Veli onayları (KVKK): VELI_ONAYLARI sayfasını hazırlama ve özet. Sayfayı öğretmen elle doldurur (EVET / HAYIR).
 *   A OgrenciNo | B Ad | C Portal | D Sosyometri | E DavranisRaporu | F AyinYildizlari | G Not
 * Öğrenci projesindeki VeliOnaylari.gs "HAYIR" cevaplarını uygular.
 */
const OGR_VELI_ONAY_SAYFASI_ = 'VELI_ONAYLARI';
const OGR_VELI_ONAY_ALANLARI_ = [
  {id: 'Portal', ad: 'Portal kullanımı', sutun: 2},
  {id: 'Sosyometri', ad: 'Sınıf Arkadaşlarım (sosyometri)', sutun: 3},
  {id: 'DavranisRaporu', ad: 'Aylık davranış raporu', sutun: 4},
  {id: 'AyinYildizlari', ad: 'Ayın Yıldızları', sutun: 5}
];

function ogrVeliOnayTablosu_() {
  const id = PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if (!id) throw Error('OZEL_TABLO_ID yok.');
  return SpreadsheetApp.openById(id);
}

function ogrVeliOnayDegeri_(v) {
  const s = String(v || '').trim().toUpperCase().split('İ').join('I');
  if (s === 'HAYIR' || s === 'H') return 'HAYIR';
  if (s === 'EVET' || s === 'E') return 'EVET';
  return '';
}

/** {tabloVar, kayit: {no: {Portal:'EVET'|'HAYIR'|'', ...}}} */
function ogrVeliOnaylariOku_(ss) {
  const sh = ss.getSheetByName(OGR_VELI_ONAY_SAYFASI_);
  const kayit = {};
  if (sh && sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 6).getDisplayValues().forEach(function (r) {
      const no = String(r[0]).replace(/^'/, '').trim();
      if (!no) return;
      const k = {};
      OGR_VELI_ONAY_ALANLARI_.forEach(function (a) { k[a.id] = ogrVeliOnayDegeri_(r[a.sutun]); });
      kayit[no] = k;
    });
  }
  return {tabloVar: !!sh, kayit: kayit};
}

/** Kayıttaki (TEST hariç) öğrenciler: [{no, ad}] */
function ogrVeliOnayKadro_(ss) {
  const sh = ss.getSheetByName('Sayfa1');
  const rows = sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues() : [];
  return rows.filter(function (r) { return String(r[0]).trim() && String(r[1]).trim() && String(r[3]).trim().toUpperCase() !== 'TEST'; })
    .map(function (r) { return {no: String(r[0]).trim(), ad: String(r[1]).trim()}; })
    .sort(function (a, b) { return a.ad.localeCompare(b.ad, 'tr'); });
}

/** Panel özeti: her alan için evet / hayır / henüz gelmedi sayısı ve "hayır" diyenlerin adları. */
function ogretmenVeliOnaylari() {
  const ss = ogrVeliOnayTablosu_();
  const kadro = ogrVeliOnayKadro_(ss);
  const onay = ogrVeliOnaylariOku_(ss);
  return {
    tabloVar: onay.tabloVar,
    ogrenciSayisi: kadro.length,
    tablodaOlmayan: kadro.filter(function (o) { return !onay.kayit[o.no]; }).length,
    alanlar: OGR_VELI_ONAY_ALANLARI_.map(function (a) {
      const s = {id: a.id, ad: a.ad, evet: 0, hayir: 0, bos: 0, hayirAdlar: []};
      kadro.forEach(function (o) {
        const d = (onay.kayit[o.no] || {})[a.id] || '';
        if (d === 'EVET') s.evet++;
        else if (d === 'HAYIR') { s.hayir++; s.hayirAdlar.push(o.ad); }
        else s.bos++;
      });
      return s;
    })
  };
}

/** VELI_ONAYLARI sayfasını açar ya da eksik öğrencileri ekler. Var olan satırlara dokunmaz. */
function ogretmenVeliOnayTablosuHazirla() {
  const ss = ogrVeliOnayTablosu_();
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    let sh = ss.getSheetByName(OGR_VELI_ONAY_SAYFASI_);
    if (!sh) sh = ss.insertSheet(OGR_VELI_ONAY_SAYFASI_);
    if (sh.getLastRow() === 0) sh.appendRow(['OgrenciNo', 'Ad', 'Portal', 'Sosyometri', 'DavranisRaporu', 'AyinYildizlari', 'Not']);
    const onay = ogrVeliOnaylariOku_(ss);
    let eklenen = 0;
    ogrVeliOnayKadro_(ss).forEach(function (o) {
      if (onay.kayit[o.no]) return;
      sh.appendRow(["'" + o.no, o.ad, '', '', '', '', '']);
      eklenen++;
    });
    return {basarili: true, eklenen: eklenen};
  } finally { lock.releaseLock(); }
}
