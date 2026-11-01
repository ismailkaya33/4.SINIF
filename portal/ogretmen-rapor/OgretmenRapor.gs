/**
 * 4/D ÖĞRETMEN RAPORU — YALNIZCA AYRI, ÖĞRETMENE ÖZEL SCRIPT PROJESİ.
 *
 * ÖNEMLİ: Bunu öğrencilerin erişebileceği Apps Script projesine eklemeyin.
 * Rapor ayrı Apps Script projesinde çalışır. Bu projeyi öğrencilere paylaşmayın.
 * Yalnız öğretmen hesabından /dev üzerinden önizleme yapılmalıdır.
 */
const RAPOR_KAYIT_SAYFASI_='Sayfa1';
const RAPOR_SONUC_SAYFASI_='ETKINLIK_SONUCLARI';

function doGet() { return HtmlService.createHtmlOutputFromFile("OgretmenRapor").setTitle("4/D Ogretmen Raporu"); }
function ogretmenRaporVerisi() {
  const id=PropertiesService.getScriptProperties().getProperty("OZEL_TABLO_ID");
  if(!id||!/^[A-Za-z0-9_-]{20,}$/.test(id))throw Error("OZEL_TABLO_ID tanımlanmamış.");
  const ss=SpreadsheetApp.openById(id);
  if(!ss)throw Error('Rapor, özel öğrenci kayıt E-Tablosuna bağlı olmalıdır.');
  const kayit=ss.getSheetByName(RAPOR_KAYIT_SAYFASI_);
  const sonuc=ss.getSheetByName(RAPOR_SONUC_SAYFASI_);
  if(!kayit||!sonuc)throw Error('Sayfa1 veya ETKINLIK_SONUCLARI bulunamadı.');
  const pupils=kayit.getLastRow()>1
   ?kayit.getRange(2,1,kayit.getLastRow()-1,4).getDisplayValues():[];
  const roster={};
  pupils.forEach(function(r) {
    const no=String(r[0]).trim();
    if(!no||String(r[3]).trim().toUpperCase()==='TEST')return;
    roster[no]={no:no,ad:String(r[1]).trim()};
  });
  const rows=sonuc.getLastRow()>1
   ?sonuc.getRange(2,1,sonuc.getLastRow()-1,11).getValues():[];
  const results=[];
  const seen={};
  rows.forEach(function(r) {
    const no=String(r[1]).trim(),id=String(r[2]).trim(),outcome=String(r[3]).trim();
    const total=Number(r[6]),correct=Number(r[4]);
    if(!roster[no]||!id||!outcome||!Number.isSafeInteger(correct)||!Number.isSafeInteger(total)||total<1||correct<0||correct>total)return;
    const key=String(r[0]).trim();
    if(!key||seen[key])return;
    seen[key]=true;
    results.push({no:no,id:id,outcome:outcome,correct:correct,total:total,at:r[10] instanceof Date?r[10].toISOString():''});
  });
  const outcomeMap={};
  results.forEach(function(x) {
    const key=x.id+'|'+x.outcome;
    if(!outcomeMap[key])outcomeMap[key]={activityId:x.id,outcome:x.outcome,attempts:0,participants:{},correct:0,total:0};
    const v=outcomeMap[key];v.attempts++;v.participants[x.no]=true;v.correct+=x.correct;v.total+=x.total;
  });
  const outcomes=Object.keys(outcomeMap).map(function(k){
    const v=outcomeMap[k];
    return {activityId:v.activityId,outcome:v.outcome,attempts:v.attempts,participantCount:Object.keys(v.participants).length,correct:v.correct,total:v.total};
  });
  const perStudent=Object.keys(roster).map(function(no){
    const mine=results.filter(function(x){return x.no===no});
    const ids=[...new Set(mine.map(function(x){return x.id}))];
    return {no:no,ad:roster[no].ad,activityCount:ids.length,attemptCount:mine.length,correct:mine.reduce((n,x)=>n+x.correct,0),total:mine.reduce((n,x)=>n+x.total,0)};
  }).sort(function(a,b){return a.ad.localeCompare(b.ad,'tr')});
  return {studentCount:Object.keys(roster).length,recordCount:results.length,outcomes:outcomes,students:perStudent};
}
