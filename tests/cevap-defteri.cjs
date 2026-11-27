const fs=require('fs'),vm=require('vm'),assert=require('assert');const K=process.argv[2]||require('path').join(__dirname,'..','portal','appsscript');
function sheet(){const rows=[];return {rows,appendRow:r=>rows.push(r.map(String)),getLastRow:()=>rows.length,
 getRange(a,c,nr,nc){if(typeof a==='string')return{setNumberFormat(){}};const R=a;return{
  getDisplayValues:()=>rows.slice(R-1,R-1+nr).map(r=>r.slice(c-1,c-1+nc)),
  createTextFinder(t){return{matchCase(){return this},findAll:()=>rows.map((r,i)=>[r,i]).slice(R-1,R-1+nr).filter(([r])=>r[0].includes(t)).map(([r,i])=>({getRow:()=>i+1,getValue:()=>r[0]}))}}}}}}
const sheets={};const ctx={SpreadsheetApp:{getActiveSpreadsheet:()=>({getSheetByName:n=>sheets[n]||null,insertSheet:n=>(sheets[n]=sheet())})},
 LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})},Number,Object,String,Array,JSON,Date,
 oturumKaydi_:t=>t==='T'.repeat(73)?{no:'7'}:t==='U'.repeat(73)?{no:'17'}:null,kayitNoIle_:no=>({no})};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(K+'/EtkinlikKayitDefteri.gs','utf8')+fs.readFileSync(K+'/EtkinlikSonuclari.gs','utf8'),ctx);
const T='T'.repeat(73),U='U'.repeat(73),A='sos-gecmistebiz-sinav';
let r=ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s1',correct:true,firstTry:true});assert(r.basarili&&!r.kilitli);
r=ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s1',correct:false,firstTry:false});assert(r.basarili&&r.kilitli&&r.kayit.correct===true,'kilit');
r=ctx.etkinlikCevabiKaydet(U,{activityId:A,questionId:'s1',correct:false,firstTry:false});assert(r.basarili&&!r.kilitli,'başka öğrenci (17 ⊃ 7)');
r=ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s2',correct:false,firstTry:false,answer:'B'});assert(r.basarili);
assert(!ctx.etkinlikCevabiKaydet(T,{activityId:'yok-boyle',questionId:'s1',correct:true,firstTry:true}).basarili,'izinsiz etkinlik');
assert(!ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s 1',correct:true,firstTry:true}).basarili,'geçersiz kimlik');
assert(!ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s3',correct:false,firstTry:true}).basarili,'ilk doğru ama çözülmemiş olamaz');
assert(!ctx.etkinlikCevabiKaydet('x',{activityId:A,questionId:'s3',correct:true,firstTry:true}).basarili,'token');
for(let i=3;i<=16;i++)ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s'+i,correct:true,firstTry:true});
assert(!ctx.etkinlikCevabiKaydet(T,{activityId:A,questionId:'s99',correct:true,firstTry:true}).basarili,'soru sayısı sınırı 16');
const m=ctx.etkinlikCevaplarim(T,A);assert(m.basarili&&m.cevaplar.length===16&&m.cevaplar[1].answer==='B',JSON.stringify(m));
assert(ctx.etkinlikCevaplarim(U,A).cevaplar.length===1,'yalnız kendi cevapları');
console.log('Sunucu cevap defteri testleri geçti:',sheets.ETKINLIK_CEVAPLARI.rows.length-1,'satır');
