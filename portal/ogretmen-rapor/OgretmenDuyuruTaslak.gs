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
  if(bitisTarihi){
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(bitisTarihi));
    if(!match)throw Error('Tarih geçersiz.');
    const y=Number(match[1]),m=Number(match[2]),day=Number(match[3]);
    const d=new Date(y,m-1,day,23,59,59,999);
    if(d.getFullYear()!==y||d.getMonth()!==m-1||d.getDate()!==day)throw Error('Tarih geçersiz.');
    expiry=d;
  }
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try {
    const last=sh.getLastRow(),previous=last>1?Number(sh.getRange(last,1).getValue()):0;
    const next=Math.max(Date.now(),Number.isSafeInteger(previous)?previous+1:0);
    const safeText=v=>/^[=+@\-\t\r]/.test(v)?"'"+v:v;
    sh.appendRow([next,safeText(title),safeText(body),'TASLAK',expiry]);
    return {basarili:true,durum:'TASLAK'};
  }
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
      bitis:r[4] instanceof Date&&Number.isFinite(r[4].getTime())?[r[4].getFullYear(),String(r[4].getMonth()+1).padStart(2,'0'),String(r[4].getDate()).padStart(2,'0')].join('-'):''};
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
