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
