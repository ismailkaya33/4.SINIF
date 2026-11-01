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
    const total=Number(r[6]),correct=Number(r[4]),wrong=Number(r[5]);
    if(!roster[no]||!id||!outcome||!Number.isSafeInteger(correct)||!Number.isSafeInteger(total)||total<1||correct<0||correct>total||!Number.isSafeInteger(wrong)||wrong<0||wrong>total||correct+wrong!==total)return;
    const key=String(r[0]).trim();
    if(!key||seen[key])return;
    seen[key]=true;
    results.push({no:no,id:id,outcome:outcome,correct:correct,total:total,at:r[10] instanceof Date?r[10].getTime():0,order:results.length});
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
  const allIds=['mat-kayipsayilar']; // İzlenebilir kayıtlı pilot etkinlikler
  results.forEach(function(x){if(allIds.indexOf(x.id)<0)allIds.push(x.id);});
  const activities=allIds.map(function(activityId){
    const attempted={};
    results.forEach(function(x){
      if(x.id===activityId){
        const current=attempted[x.no];
        if(!current || x.at>current.at || (x.at===current.at && x.order>current.order))attempted[x.no]=x;
      }
    });
    const studentStates=perStudent.map(function(st){
      const record=attempted[st.no];
      return {no:st.no,ad:st.ad,status:record?'Tamamlandı':'Henüz sonuç yok',
        correct:record?record.correct:null,total:record?record.total:null};
    });
    return {id:activityId,completed:Object.keys(attempted).length,waiting:perStudent.length-Object.keys(attempted).length,students:studentStates};
  });
  const selectedActivities=[
   'Turkce/ikilemeler.html','Turkce/pekistirme.html','Turkce/sozavcıları.html',
   'Matematik/cikarmaislemi.html','Fen/besinkasifleri.html','Sosyal/oyunzamani.html'
  ];
  const completionSheet=ss.getSheetByName('ETKINLIK_TAMAMLAMA');
  const completionRows=completionSheet&&completionSheet.getLastRow()>1
    ?completionSheet.getRange(2,1,completionSheet.getLastRow()-1,4).getDisplayValues():[];
  const declarations={};
  completionRows.forEach(function(row){
   const no=String(row[0]).trim(),activity=String(row[1]).trim(),kind=String(row[3]).trim();
   if(!roster[no]||selectedActivities.indexOf(activity)<0||kind!=='OGRENCI_BEYANI')return;
   if(!declarations[activity])declarations[activity]={};
   declarations[activity][no]=true;
  });
  const completionActivities=selectedActivities.map(function(activityId){
   const done=declarations[activityId]||{};
   const count=Object.keys(done).length;
   return {id:activityId,completed:count,waiting:Object.keys(roster).length-count,
    students:perStudent.map(function(st){return {no:st.no,ad:st.ad,status:done[st.no]?'Tamamladım bildirildi':'Henüz bildirim yok'};})};
  });
  return {studentCount:Object.keys(roster).length,recordCount:results.length,outcomes:outcomes,students:perStudent,activities:activities,completionActivities:completionActivities};
}
