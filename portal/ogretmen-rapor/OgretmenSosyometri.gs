/** 4/D AYRI öğretmen raporu projesine eklenir. Öğrenci projesine EKLENMEZ.
 * Sosyometri ("Sınıf Arkadaşlarım") anketi: tur hazırlama, yayımlama/kapatma, sonuç analizi, kalıcı silme.
 * Sorular öğretmenin onayıyla belirlendi (2026-11-14): 4 soru, her soruda 3 seçim, kayıtlı, bir kez düzeltme.
 * Olumsuz seçim sorusu ("kiminle oturmak istemezsin") bilerek YOKTUR.
 */
const OGR_SOSYO_TUR_SAYFASI_ = 'SOSYOMETRI_TURLARI';
const OGR_SOSYO_CEVAP_SAYFASI_ = 'SOSYOMETRI';

const SOSYOMETRI_SABLONU_ = {
  baslik: 'Sınıf Arkadaşlarım',
  secim: 3,
  sorular: [
    {id: 'grup', metin: 'Grup çalışmasında kiminle çalışmak istersin?', simge: '🧩', kisa: 'Grup çalışması'},
    {id: 'oyun', metin: 'Teneffüste kiminle oynamak istersin?', simge: '⚽', kisa: 'Teneffüs'},
    {id: 'oturma', metin: 'Sınıfta kiminle yan yana oturmak istersin?', simge: '🪑', kisa: 'Yan yana oturma'},
    {id: 'yardim', metin: 'Bir dersi anlamadığında kimden yardım istersin?', simge: '🙋', kisa: 'Yardım isteme'}
  ]
};

function sosyoOgretmenTablosu_() {
  const id = PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if (!id) throw Error('OZEL_TABLO_ID yok.');
  return SpreadsheetApp.openById(id);
}

function sosyoOgrDurum_(v) {
  return String(v || '').trim().toUpperCase().replace(/̇/g, '')
    .replace(/Ş/g, 'S').replace(/İ/g, 'I').replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ö/g, 'O').replace(/Ç/g, 'C');
}

/** Saf hesap (testlenir). ogrenciler: [{no, ad}] (TEST hariç), satirlar: [[zaman, tur, no, json, duzeltme]].
 * Dönen yapıda öğrenci numarası yoktur; öğrenciler listedeki sırasıyla (i) anılır. */
function sosyometriAnalizi_(ogrenciler, satirlar, turKimlik, sorular, testNolar) {
  const sira = {};
  ogrenciler.forEach(function (o, i) { sira[o.no] = i; });
  const test = {};
  (testNolar || []).forEach(function (no) { test[String(no)] = true; });
  const cevaplar = {};
  let testCevap = 0, duzeltme = 0;
  satirlar.forEach(function (r) {
    if (String(r[1]).replace(/^'/, '').trim() !== turKimlik) return;
    const no = String(r[2]).replace(/^'/, '').trim();
    if (test[no]) { testCevap++; return; }
    if (sira[no] === undefined || cevaplar[no]) return;
    let c = null;
    try { c = JSON.parse(String(r[3])); } catch (e) { c = null; }
    if (!c || typeof c !== 'object') return;
    cevaplar[no] = c;
    if (Number(r[4]) > 0) duzeltme++;
  });
  const n = ogrenciler.length;
  const sonuc = {};
  const birlesik = {alinan: new Array(n).fill(0), secimler: [], karsilikli: [], secilmeyen: []};
  const birlesikCift = {}, birlesikKarsilikli = {};
  sorular.forEach(function (s) {
    const alinan = new Array(n).fill(0), secimler = [], var_ = {};
    Object.keys(cevaplar).forEach(function (no) {
      const kim = sira[no];
      const liste = Array.isArray(cevaplar[no][s.id]) ? cevaplar[no][s.id] : [];
      const gorulen = {};
      liste.forEach(function (hedefNo) {
        const h = sira[String(hedefNo)];
        if (h === undefined || h === kim || gorulen[h]) return;
        gorulen[h] = true;
        alinan[h]++;
        birlesik.alinan[h]++;
        secimler.push([kim, h]);
        var_[kim + '>' + h] = true;
        const anahtar = kim + '>' + h;
        if (!birlesikCift[anahtar]) { birlesikCift[anahtar] = true; birlesik.secimler.push([kim, h]); }
      });
    });
    const karsilikli = [];
    secimler.forEach(function (c) {
      if (c[0] < c[1] && var_[c[1] + '>' + c[0]]) {
        karsilikli.push([c[0], c[1]]);
        birlesikKarsilikli[c[0] + '-' + c[1]] = true;
      }
    });
    const secilmeyen = [];
    for (let i = 0; i < n; i++) if (!alinan[i]) secilmeyen.push(i);
    sonuc[s.id] = {alinan: alinan, secimler: secimler, karsilikli: karsilikli, secilmeyen: secilmeyen};
  });
  birlesik.karsilikli = Object.keys(birlesikKarsilikli).map(function (k) { return k.split('-').map(Number); });
  for (let i = 0; i < n; i++) if (!birlesik.alinan[i]) birlesik.secilmeyen.push(i);
  sonuc.tumu = birlesik;
  return {
    ogrenciler: ogrenciler.map(function (o) { return {ad: o.ad, cevapladi: !!cevaplar[o.no]}; }),
    cevapSayisi: Object.keys(cevaplar).length,
    testCevapSayisi: testCevap,
    duzeltmeSayisi: duzeltme,
    sorular: sonuc
  };
}

function sosyoKadro_(ss) {
  const kayit = ss.getSheetByName('Sayfa1');
  const rows = kayit && kayit.getLastRow() > 1 ? kayit.getRange(2, 1, kayit.getLastRow() - 1, 4).getDisplayValues() : [];
  const sayi = {}, ogrenciler = [], testNolar = [];
  // Velisi sosyometriye "HAYIR" diyen öğrenci analize hiç girmez (OgretmenVeliOnaylari.gs).
  const onay = ogrVeliOnaylariOku_(ss);
  const veliOnayi = {tabloVar: onay.tabloVar, hayir: 0, bekleyen: 0};
  rows.forEach(function (r) { const no = String(r[0]).trim(); if (no) sayi[no] = (sayi[no] || 0) + 1; });
  rows.forEach(function (r) {
    const no = String(r[0]).trim(), ad = String(r[1]).trim();
    if (!no || !ad || sayi[no] !== 1) return;
    if (String(r[3]).trim().toUpperCase() === 'TEST') { testNolar.push(no); return; }
    const d = (onay.kayit[no] || {}).Sosyometri || '';
    if (d === 'HAYIR') { veliOnayi.hayir++; return; }
    if (d !== 'EVET') veliOnayi.bekleyen++;
    ogrenciler.push({no: no, ad: ad});
  });
  ogrenciler.sort(function (a, b) { return a.ad.localeCompare(b.ad, 'tr'); });
  return {ogrenciler: ogrenciler, testNolar: testNolar, veliOnayi: veliOnayi};
}

function sosyoTurSayfasi_(ss) {
  let sh = ss.getSheetByName(OGR_SOSYO_TUR_SAYFASI_);
  if (!sh) sh = ss.insertSheet(OGR_SOSYO_TUR_SAYFASI_);
  if (sh.getLastRow() === 0) sh.appendRow(['Kimlik', 'Baslik', 'SorularJSON', 'Durum', 'Olusturma']);
  return sh;
}

/** Panelde turlar ve sonuçlar (en yeni üstte). TEST hesaplarının cevapları sayılmaz. */
function ogretmenSosyometri() {
  const ss = sosyoOgretmenTablosu_();
  const sh = ss.getSheetByName(OGR_SOSYO_TUR_SAYFASI_);
  const kadro = sosyoKadro_(ss);
  const cevapSh = ss.getSheetByName(OGR_SOSYO_CEVAP_SAYFASI_);
  const satirlar = cevapSh && cevapSh.getLastRow() > 1 ? cevapSh.getRange(2, 1, cevapSh.getLastRow() - 1, 5).getDisplayValues() : [];
  const turlar = (sh && sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 5).getDisplayValues() : [])
    .filter(function (r) { return /^[0-9]{13}$/.test(String(r[0]).trim()); })
    .reverse().slice(0, 10).map(function (r) {
      const kimlik = String(r[0]).trim();
      let tanim = null;
      try { tanim = JSON.parse(String(r[2])); } catch (e) { tanim = null; }
      const sorular = tanim && Array.isArray(tanim.sorular) ? tanim.sorular : [];
      const analiz = sosyometriAnalizi_(kadro.ogrenciler, satirlar, kimlik, sorular, kadro.testNolar);
      const kisaAd = {};
      SOSYOMETRI_SABLONU_.sorular.forEach(function (s) { kisaAd[s.id] = s.kisa; });
      return {
        kimlik: kimlik, baslik: String(r[1]), durum: sosyoOgrDurum_(r[3]), olusturma: String(r[4]),
        secim: Number(tanim && tanim.secim) || 3,
        sorular: sorular.map(function (s) { return {id: s.id, metin: s.metin, simge: s.simge || '', kisa: kisaAd[s.id] || s.metin}; }),
        analiz: analiz
      };
    });
  return {turlar: turlar, ogrenciSayisi: kadro.ogrenciler.length, veliOnayi: kadro.veliOnayi};
}

/** Şablondan TASLAK tur ekler. Açık (taslak/yayında) bir tur varken yenisi eklenmez. */
function ogretmenSosyometriHazirla() {
  const ss = sosyoOgretmenTablosu_();
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const sh = sosyoTurSayfasi_(ss);
    const n = sh.getLastRow() - 1;
    const rows = n > 0 ? sh.getRange(2, 1, n, 4).getDisplayValues() : [];
    if (rows.some(function (r) { const d = sosyoOgrDurum_(r[3]); return d === 'TASLAK' || d === 'YAYINDA'; })) {
      throw Error('Zaten hazırlanmış bir sosyometri anketi var. Önce onu kapatın.');
    }
    const onceki = rows.length ? Number(rows[rows.length - 1][0]) : 0;
    const kimlik = Math.max(Date.now(), Number.isSafeInteger(onceki) ? onceki + 1 : 0);
    const tarih = Utilities.formatDate(new Date(), 'Europe/Istanbul', 'dd.MM.yyyy');
    sh.appendRow(["'" + kimlik, SOSYOMETRI_SABLONU_.baslik + ' (' + tarih + ')',
      JSON.stringify({secim: SOSYOMETRI_SABLONU_.secim, sorular: SOSYOMETRI_SABLONU_.sorular.map(function (s) {
        return {id: s.id, metin: s.metin, simge: s.simge};
      })}), 'TASLAK', new Date()]);
    return {basarili: true};
  } finally { lock.releaseLock(); }
}

function ogretmenSosyometriDurumDegistir(kimlik, durum) {
  const hedef = String(kimlik || ''), yeni = String(durum || '').toUpperCase();
  if (!/^[0-9]{13}$/.test(hedef) || ['TASLAK', 'YAYINDA', 'ARSIV'].indexOf(yeni) < 0) throw Error('Anket veya durum geçersiz.');
  const sh = sosyoOgretmenTablosu_().getSheetByName(OGR_SOSYO_TUR_SAYFASI_);
  if (!sh) throw Error('SOSYOMETRI_TURLARI sayfası bulunamadı.');
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const n = sh.getLastRow() - 1; if (n < 1) throw Error('Anket bulunamadı.');
    const rows = sh.getRange(2, 1, n, 4).getDisplayValues();
    const i = rows.findIndex(function (r) { return String(r[0]).trim() === hedef; });
    if (i < 0) throw Error('Anket bulunamadı.');
    if (yeni === 'YAYINDA' && rows.some(function (r, j) { return j !== i && sosyoOgrDurum_(r[3]) === 'YAYINDA'; })) {
      throw Error('Başka bir sosyometri anketi yayında. Önce onu kapatın.');
    }
    sh.getRange(i + 2, 4).setValue(yeni);
    return {basarili: true, durum: yeni};
  } finally { lock.releaseLock(); }
}

/** KVKK: kapanmış (ARSIV) turun cevaplarını kalıcı siler. Tur satırı "silindi" notuyla kalır. */
function ogretmenSosyometriCevaplariniSil(kimlik) {
  const hedef = String(kimlik || '');
  if (!/^[0-9]{13}$/.test(hedef)) throw Error('Anket geçersiz.');
  const ss = sosyoOgretmenTablosu_();
  const turSh = ss.getSheetByName(OGR_SOSYO_TUR_SAYFASI_);
  if (!turSh || turSh.getLastRow() < 2) throw Error('Anket bulunamadı.');
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const turlar = turSh.getRange(2, 1, turSh.getLastRow() - 1, 4).getDisplayValues();
    const t = turlar.findIndex(function (r) { return String(r[0]).trim() === hedef; });
    if (t < 0) throw Error('Anket bulunamadı.');
    if (sosyoOgrDurum_(turlar[t][3]) !== 'ARSIV') throw Error('Önce anketi kapatın; yalnız kapanmış anketin cevapları silinir.');
    const sh = ss.getSheetByName(OGR_SOSYO_CEVAP_SAYFASI_);
    let silinen = 0;
    if (sh && sh.getLastRow() > 1) {
      const rows = sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues();
      for (let i = rows.length - 1; i >= 0; i--) {
        if (String(rows[i][0]).replace(/^'/, '').trim() === hedef) { sh.deleteRow(i + 2); silinen++; }
      }
    }
    const baslik = String(turlar[t][1]);
    if (baslik.indexOf('cevaplar silindi') < 0) turSh.getRange(t + 2, 2).setValue(baslik + ' — cevaplar silindi');
    return {basarili: true, silinen: silinen};
  } finally { lock.releaseLock(); }
}
