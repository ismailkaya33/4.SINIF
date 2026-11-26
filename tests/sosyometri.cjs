// Sosyometri ("Sınıf Arkadaşlarım") portaldan KALDIRILDI (2026-11-26): öğrenci tarafı kapalı, panel yalnız eski sonuçları gösterir/siler.
// Sahte veri: gerçek öğrenci adı/kodu YOKTUR.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const disp=v=>v===undefined||v===null?'':v instanceof Date?'01.01.2026':String(v).replace(/^'/,'');
function makeSheet(rows){
 return {rows,getLastRow:()=>rows.length,
  getRange:(r,c,nr=1,nc=1)=>({
   getDisplayValues:()=>rows.slice(r-1,r-1+nr).map(x=>Array.from({length:nc},(_,j)=>disp(x[c-1+j]))),
   getValues:()=>rows.slice(r-1,r-1+nr).map(x=>Array.from({length:nc},(_,j)=>x[c-1+j])),
   setValue:v=>{rows[r-1][c-1]=v},
   setValues:vs=>vs.forEach((row,i)=>row.forEach((v,j)=>{rows[r-1+i][c-1+j]=v}))}),
  appendRow:r=>rows.push(r.slice()),deleteRow:n=>rows.splice(n-1,1)};
}
const sheets={Sayfa1:makeSheet([['No','Ad','Kod','Tur'],
 ['101','ADA YILMAZ','KOD001',''],['102','BORA KAYA','KOD002',''],['103','CEM ÖZ','KOD003',''],
 ['104','DENİZ ŞEN','KOD004',''],['105','EFE ARSLAN','KOD005',''],['106','FUNDA ÇAKIR','KOD006',''],
 ['140','DENEME HESABI','KOD040','TEST'],['107','İKİZ NUMARA','KOD007',''],['107','İKİZ NUMARA 2','KOD008','']])};
const ss={getSheetByName:n=>sheets[n]||null,insertSheet:n=>(sheets[n]=makeSheet([]))};
let locked=false;
const common={
 SpreadsheetApp:{getActiveSpreadsheet:()=>ss,openById:()=>ss},
 LockService:{getScriptLock:()=>({tryLock:()=>{locked=true;return true},waitLock:()=>{locked=true},releaseLock:()=>{locked=false}})},
 Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},
  computeDigest:(a,t)=>[...crypto.createHash('sha256').update(t,'utf8').digest()].map(b=>b>127?b-256:b),
  formatDate:()=>'14.11.2026'},
 PropertiesService:{getScriptProperties:()=>({getProperty:k=>k==='OZEL_TABLO_ID'?'sahte-tablo':null})}
};
// Öğrenci projesi
const sessions={'tok-ada':'101','tok-bora':'102','tok-test':'140'};
const fakeToken=k=>k; // biçim kontrolü sahte: yalnız bilinen anahtarlar geçerli
const student=vm.createContext({...common,
 oturumTokenGecerliBicimdeMi_:t=>typeof t==='string'&&t.startsWith('tok-'),
 oturumKaydi_:t=>sessions[t]?{no:sessions[t],row:2}:null,
 kayitNoIle_:no=>{const r=sheets.Sayfa1.rows.slice(1).filter(x=>x[0]===String(no));return r.length===1?{no:r[0][0],ad:r[0][1],misafir:r[0][3]==='TEST'}:null}});
vm.runInContext(['Kod.gs','VeliOnaylari.gs','Sosyometri.gs'].map(p=>fs.readFileSync('portal/appsscript/'+p,'utf8')).join('\n'),student);
// Öğretmen projesi (ayrı proje, aynı tablo)
const teacher=vm.createContext({...common});
vm.runInContext(['OgretmenVeliOnaylari.gs','OgretmenSosyometri.gs'].map(p=>fs.readFileSync('portal/ogretmen-rapor/'+p,'utf8')).join('\n'),teacher);

// vm içindeki dizi/nesneler başka "realm"den gelir; karşılaştırma için JSON ile düz nesneye çevrilir.
const J=x=>x===undefined?x:JSON.parse(JSON.stringify(x));
const wrap=ctx=>new Proxy({},{get:(_,k)=>typeof ctx[k]==='function'?(...a)=>J(ctx[k](...a)):ctx[k]});
const S=wrap(student),T=wrap(teacher);

const hepsi=x=>({grup:x,oyun:x,oturma:x,yardim:x});
const sorularJson=JSON.stringify({secim:3,sorular:[{id:'grup',metin:'G'},{id:'oyun',metin:'O'},{id:'oturma',metin:'Y'},{id:'yardim',metin:'Ya'}]});
// Eski veri: daha önce toplanmış bir tur ve cevapları (anket kaldırılmadan önce yazılmış gibi).
const kimlik='1763100000000';
sheets.SOSYOMETRI_TURLARI=makeSheet([['Kimlik','Baslik','SorularJSON','Durum','Olusturma'],["'"+kimlik,'Sınıf Arkadaşlarım (14.11.2026)',sorularJson,'YAYINDA','']]);
sheets.SOSYOMETRI=makeSheet([['Zaman','TurKimlik','OgrenciNo','CevaplarJSON','DuzeltmeSayisi'],
 ['',"'"+kimlik,'101',JSON.stringify({...hepsi(['102','103','104']),oyun:['102','105','106']}),1],
 ['',"'"+kimlik,'102',JSON.stringify(hepsi(['101','103','105'])),0],
 ['',"'"+kimlik,'140',JSON.stringify(hepsi(['101','102','103'])),0]]);
const satirSayisi=sheets.SOSYOMETRI.rows.length;
// 1) Öğrenci tarafı: tur YAYINDA görünse bile anket kapalı; cevap kaydedilmez.
for(const tok of ['tok-ada','tok-bora','tok-test','kotu']){
 const v=S.ogrenciSosyometri(tok);assert.equal(v.acik,false);assert.equal(v.arkadaslar,undefined);assert.equal(v.cevap,undefined);
 const r=S.sosyometriCevapla(tok,kimlik,hepsi(['a','b','c']));assert.equal(r.basarili,false);assert.match(r.mesaj,/kapatıldı/);
}
assert.equal(sheets.SOSYOMETRI.rows.length,satirSayisi,'Kaldırılan anket tabloya yazmaz');
// 2) Öğretmen: yeni tur hazırlanamaz, yeniden açılamaz; eski sonuçlar okunur.
assert.throws(()=>T.ogretmenSosyometriHazirla(),/kaldırıldı/);
assert.throws(()=>T.ogretmenSosyometriDurumDegistir(kimlik,'YAYINDA'),/kaldırıldı/);
assert.throws(()=>T.ogretmenSosyometriDurumDegistir(kimlik,'TASLAK'),/kaldırıldı/);
assert.equal(sheets.SOSYOMETRI_TURLARI.rows.length,2);
let turlar=J(T.ogretmenSosyometri());
const a=turlar.turlar[0].analiz,ad=i=>a.ogrenciler[i].ad,ix=n=>a.ogrenciler.findIndex(o=>o.ad===n);
assert.equal(turlar.ogrenciSayisi,6);
assert.equal(a.cevapSayisi,2);assert.equal(a.testCevapSayisi,1);assert.equal(a.duzeltmeSayisi,1);
assert.ok(!JSON.stringify(turlar).includes('"101"'),'Öğretmen yanıtında numara yok');
assert.deepEqual(a.sorular.grup.karsilikli.map(p=>p.map(ad).sort()),[['ADA YILMAZ','BORA KAYA']]);
assert.equal(a.sorular.grup.alinan[ix('CEM ÖZ')],2);
assert.deepEqual(a.sorular.oyun.secilmeyen.map(ad).sort(),['DENİZ ŞEN']);
assert.deepEqual(a.sorular.grup.secilmeyen.map(ad).sort(),['FUNDA ÇAKIR']);
assert.deepEqual(a.sorular.tumu.secilmeyen,[]);
const saf=T.sosyometriAnalizi_([{no:'1',ad:'A'},{no:'2',ad:'B'}],[['',"'9",'1',JSON.stringify({grup:['1','2','99']}),0]],'9',[{id:'grup'}],[]);
assert.deepEqual(Array.from(saf.sorular.grup.alinan),[0,1]);
// 3) KVKK: açıkken silme reddedilir; kapatılınca cevaplar kalıcı silinir.
assert.throws(()=>T.ogretmenSosyometriCevaplariniSil(kimlik),/kapatın/);
T.ogretmenSosyometriDurumDegistir(kimlik,'ARSIV');
assert.equal(T.ogretmenSosyometriCevaplariniSil(kimlik).silinen,3);
assert.equal(sheets.SOSYOMETRI.rows.length,1);
assert.match(sheets.SOSYOMETRI_TURLARI.rows[1][1],/cevaplar silindi/);
assert.equal(locked,false);
// 4) Sayfalar: öğrenci sayfasında sosyometri izi yok; panelde sonuç bölümü var, hazırla/yayımla düğmesi yok.
const portal=fs.readFileSync('portal/appsscript/OgrenciGiris_Guncel.html','utf8');
const rapor=fs.readFileSync('portal/ogretmen-rapor/OgretmenRapor.html','utf8');
for(const html of [portal,rapor])for(const b of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))new vm.Script(b[1]);
assert.ok(!/sosyo/i.test(portal),'Öğrenci sayfasında sosyometri kalmadı');
assert.match(rapor,/id='sociometryPanel'/);assert.match(rapor,/\.ogretmenSosyometri\(\)/);assert.match(rapor,/portaldan kaldırıldı/);
assert.ok(!/ogretmenSosyometriHazirla\(\)|Öğrencilere aç|Yeniden aç/.test(rapor),'Panelde açma düğmesi yok');
const sync=fs.readFileSync('.github/scripts/prepare-appsscript-sync.mjs','utf8');
assert.match(sync,/portal\/appsscript\/Sosyometri\.gs/,'Kilit dosyası eşitlenmeye devam eder (eski kod canlıda kalmasın)');
assert.equal(typeof S.ogretmenSosyometri,'undefined');assert.ok(!/OZEL_TABLO_ID|openById|SpreadsheetApp/.test(fs.readFileSync('portal/appsscript/Sosyometri.gs','utf8')));
console.log('PASS: sosyometri kaldırıldı — öğrenci tarafı kapalı ve yazmaz, öğretmen yeni tur açamaz, eski sonuç analizi, kapat + KVKK silme, sayfalarda iz yok.');