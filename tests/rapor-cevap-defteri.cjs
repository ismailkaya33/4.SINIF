const fs=require('fs'),vm=require('vm'),assert=require('assert');const F=process.argv[2]||require('path').join(__dirname,'..','portal','ogretmen-rapor','OgretmenRapor.gs');
const vals={Sayfa1:[['No','Ad','x','Tur'],['7','Ali Y','',''],['8','Ayşe K','',''],['40','TEST','','TEST']],
 ETKINLIK_SONUCLARI:[['h'],['7:sos-gecmistebiz-sinav:a','7','sos-gecmistebiz-sinav','k',10,6,16,0,9,30,new Date(1)],['8:tur-ikilemeler:b','8','tur-ikilemeler','k',3,1,4,1,2,30,new Date(2)]],
 ETKINLIK_CEVAPLARI:[['h'],['7:sos-gecmistebiz-sinav:s1','7','sos-gecmistebiz-sinav','s1',1,1,'',new Date(5)],['7:sos-gecmistebiz-sinav:s2','7','sos-gecmistebiz-sinav','s2',1,0,'',new Date(6)],
  ['7:sos-gecmistebiz-sinav:s3','7','sos-gecmistebiz-sinav','s3',0,0,'',new Date(7)],['7:sos-gecmistebiz-sinav:s1','7','sos-gecmistebiz-sinav','s1',0,0,'',new Date(8)],
  ['8:fen-kuvvetin-etkileri:k1-1','8','fen-kuvvetin-etkileri','k1-1',1,0,'',new Date(9)],['40:sos-gecmistebiz-sinav:s1','40','sos-gecmistebiz-sinav','s1',1,1,'',new Date(9)]]};
function sh(n){const v=vals[n];if(!v)return null;return{getLastRow:()=>v.length,getRange:(r,c,nr,nc)=>({getDisplayValues:()=>v.slice(r-1,r-1+nr).map(x=>x.slice(c-1,c-1+nc).map(y=>y instanceof Date?'d':String(y))),getValues:()=>v.slice(r-1,r-1+nr).map(x=>x.slice(c-1,c-1+nc))})}}
const ctx={PropertiesService:{getScriptProperties:()=>({getProperty:()=>'A'.repeat(30)})},SpreadsheetApp:{openById:()=>({getSheetByName:sh})},HtmlService:{},Number,Object,String,Array,JSON,Date,Math,Set};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(F,'utf8')+';this.R=ogretmenRaporVerisi();',ctx);
const R=ctx.R,act=id=>R.activities.find(a=>a.id===id),st=(id,no)=>act(id).students.find(s=>s.no===no);
const g=st('sos-gecmistebiz-sinav','7');
assert.deepStrictEqual([g.correct,g.wrong,g.blank,g.total],[1,2,13,16],'değerlendirme: ilk cevap kesin, boş=16-3, eski kayıt yerine defter '+JSON.stringify(g));
assert(/^Yarım \(3\/16/.test(g.status),g.status);
const k=st('fen-kuvvetin-etkileri','8');assert.deepStrictEqual([k.correct,k.wrong,k.blank,k.total],[1,0,19,20],'etkinlik: 2. denemede doğru = doğru');
const i=st('tur-ikilemeler','8');assert(i.status==='Tamamlandı'&&i.correct===3&&i.total===4,'eski kayıt sürüyor');
assert(!act('sos-gecmistebiz-sinav').students.some(s=>s.no==='40'),'TEST görünmez');
console.log('Öğretmen raporu testleri geçti:',g.status,'|',k.status);
