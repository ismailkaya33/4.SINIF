/** 4/D AYRI öğretmen raporu projesine eklenir. Öğrenci projesine EKLENMEZ. */
function duyuruTablosunuHazirla() {
  const id=PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if(!id)throw Error('OZEL_TABLO_ID yok.');
  const ss=SpreadsheetApp.openById(id);
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try {
    let sh=ss.getSheetByName('DUYURULAR');
    if(!sh)sh=ss.insertSheet('DUYURULAR');
    if(sh.getLastRow()===0)sh.appendRow(['Kimlik','Baslik','Metin','Durum','BitisTarihi']);
    return {basarili:true,sayfa:'DUYURULAR'};
  } finally {lock.releaseLock();}
}
function duyuruEkleOgretmen(baslik,metin,bitisTarihi) {
  const title=String(baslik||'').trim(),body=String(metin||'').trim();
  if(!title||title.length>120||!body||body.length>1500)throw Error('Başlık veya metin geçersiz.');
  const id=PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if(!id)throw Error('OZEL_TABLO_ID yok.');
  const sh=SpreadsheetApp.openById(id).getSheetByName('DUYURULAR');
  if(!sh)throw Error('DUYURULAR sayfası yok. Önce öğretmen tarafından oluşturulmalı.');
  let expiry='';
  if(bitisTarihi){const d=new Date(bitisTarihi);if(!Number.isFinite(d.getTime()))throw Error('Tarih geçersiz.');expiry=d;}
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try {const next=Date.now();sh.appendRow([next,title,body,'TASLAK',expiry]);return {basarili:true,durum:'TASLAK'};}
  finally{lock.releaseLock();}
}
// Güvenlik: yeni duyuru TASLAK olarak kaydedilir; öğretmen E-Tablodaki durumu
// YAYINDA yapana kadar öğrenciler tarafından okunmaz.

/** Özel öğretmen projesinde mevcut duyuruları listeler. */
function ogretmenDuyuruListesi() {
  const id=PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if(!id)throw Error('OZEL_TABLO_ID yok.');
  const sh=SpreadsheetApp.openById(id).getSheetByName('DUYURULAR');
  if(!sh)return [];
  const n=sh.getLastRow()-1;
  if(n<1)return [];
  return sh.getRange(2,1,n,5).getValues().reverse().slice(0,50).map(function(r){
    return {kimlik:String(r[0]),baslik:String(r[1]),metin:String(r[2]),durum:String(r[3]),
      bitis:r[4] instanceof Date?r[4].toISOString().slice(0,10):''};
  });
}
/** Öğretmen yetkili ayrı projede durum değişimi; kayıt kimliğiyle tam eşleşme. */
function ogretmenDuyuruDurumDegistir(kimlik,durum) {
  const hedef=String(kimlik||''),yeni=String(durum||'').toUpperCase();
  if(!/^[0-9]{13}$/.test(hedef)||!['TASLAK','YAYINDA','ARSIV'].includes(yeni))
    throw Error('Duyuru veya durum geçersiz.');
  const id=PropertiesService.getScriptProperties().getProperty('OZEL_TABLO_ID');
  if(!id)throw Error('OZEL_TABLO_ID yok.');
  const sh=SpreadsheetApp.openById(id).getSheetByName('DUYURULAR');
  if(!sh)throw Error('DUYURULAR sayfası bulunamadı.');
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try {
    const n=sh.getLastRow()-1;if(n<1)throw Error('Duyuru bulunamadı.');
    const keys=sh.getRange(2,1,n,1).getDisplayValues();
    const i=keys.findIndex(r=>String(r[0]).trim()===hedef);
    if(i<0)throw Error('Duyuru bulunamadı.');
    sh.getRange(i+2,4).setValue(yeni);
    return {basarili:true,durum:yeni};
  } finally {lock.releaseLock();}
}
