// KVKK veli onayları: "HAYIR" cevabı sosyometri, davranış raporu ve Ayın Yıldızları'nda uygulanır. Sahte veri.
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
 ['101','ADA YILMAZ','KOD001',''],['102','BORA KAYA','KOD002',''],['103','CEM ÖZ','KOD003',''],['104','DENİZ ŞEN','KOD004',''],
 ['140','DENEME HESABI','KOD040','TEST']])};
const ss={getSheetByName:n=>sheets[n]||null,insertSheet:n=>(sheets[n]=makeSheet([]))};
const common={
 SpreadsheetApp:{getActiveSpreadsheet:()=>ss,openById:()=>ss},
 LockService:{getScriptLock:()=>({tryLock:()=>true,waitLock:()=>{},releaseLock:()=>{}})},
 Utilities:{DigestAlgorithm:{},Charset:{},computeDigest:(a,t)=>[...crypto.createHash('sha256').update(t,'utf8').digest()].map(b=>b>127?b-256:b),formatDate:()=>'15.11.2026'},
 PropertiesService:{getScriptProperties:()=>({getProperty:()=>'sahte'})}
};
const sessions={'tok-ada':'101','tok-bora':'102','tok-cem':'103'};
const student=vm.createContext({...common,
 oturumTokenGecerliBicimdeMi_:t=>typeof t==='string'&&t.startsWith('tok-'),
 oturumKaydi_:t=>sessions[t]?{no:sessions[t],row:2}:null,
 kayitNoIle_:no=>{const r=sheets.Sayfa1.rows.slice(1).filter(x=>x[0]===String(no));return r.length===1?{no:r[0][0],ad:r[0][1],misafir:r[0][3]==='TEST'}:null}});
vm.runInContext(['Kod.gs','VeliRaporu.gs','AyinYildizlari.gs','VeliOnaylari.gs','Sosyometri.gs'].map(p=>fs.readFileSync('portal/appsscript/'+p,'utf8')).join('\n'),student);
const teacher=vm.createContext({...common});
vm.runInContext(['OgretmenVeliOnaylari.gs','OgretmenSosyometri.gs'].map(p=>fs.readFileSync('portal/ogretmen-rapor/'+p,'utf8')).join('\n'),teacher);
const J=x=>x===undefined?x:JSON.parse(JSON.stringify(x));
const wrap=ctx=>new Proxy({},{get:(_,k)=>typeof ctx[k]==='function'?(...a)=>J(ctx[k](...a)):ctx[k]});
const S=wrap(student),T=wrap(teacher);
// Apps Script her çağrıda yeni çalıştırma açar; testte önbelleği elle sıfırlarız.
const yeniCagri=()=>vm.runInContext('veliOnayOnbellek_=null',student);

// Değer okuma: büyük/küçük harf ve kısaltma
for(const [v,b] of [['HAYIR','HAYIR'],['hayır','HAYIR'],['Hayir','HAYIR'],[' h ','HAYIR'],['EVET','EVET'],['evet','EVET'],['E','EVET'],['','',],['belki','']])
 assert.equal(S.veliOnayDegeri_(v),b,'değer: '+v);

// Tablo yokken her şey eskisi gibi çalışır.
assert.equal(T.ogretmenVeliOnaylari().tabloVar,false);
T.ogretmenSosyometriHazirla();const kimlik=T.ogretmenSosyometri().turlar[0].kimlik;T.ogretmenSosyometriDurumDegistir(kimlik,'YAYINDA');
assert.equal(T.ogretmenSosyometri().veliOnayi.tabloVar,false);
assert.equal(S.ogrenciSosyometri('tok-ada').arkadaslar.length,3);

// Öğretmen tabloyu hazırlar: TEST hariç 4 satır; ikinci kez eksik yoksa satır eklenmez, var olan değerlere dokunmaz.
assert.equal(T.ogretmenVeliOnayTablosuHazirla().eklenen,4);
const onay=sheets.VELI_ONAYLARI.rows;
assert.deepEqual(J(onay[0]),['OgrenciNo','Ad','Portal','Sosyometri','DavranisRaporu','AyinYildizlari','Not']);
assert.ok(!onay.some(r=>disp(r[0])==='140'),'TEST hesabı tabloda yok');
const satir=no=>onay.find(r=>disp(r[0])===no);
satir('102')[3]='hayır';satir('102')[4]='HAYIR';satir('102')[5]='H';satir('101')[3]='EVET';satir('103')[3]='Evet';
assert.equal(T.ogretmenVeliOnayTablosuHazirla().eklenen,0);assert.equal(onay.length,5);assert.equal(satir('102')[3],'hayır');
sheets.Sayfa1.rows.push(['105','EFE ARSLAN','KOD005','']);
assert.equal(T.ogretmenVeliOnayTablosuHazirla().eklenen,1);
sheets.Sayfa1.rows.pop();onay.pop();

// Öğretmen özeti
const oz=T.ogretmenVeliOnaylari();
const sos=oz.alanlar.find(a=>a.id==='Sosyometri');
assert.equal(oz.ogrenciSayisi,4);assert.equal(sos.evet,2);assert.equal(sos.hayir,1);assert.equal(sos.bos,1);assert.deepEqual(sos.hayirAdlar,['BORA KAYA']);
assert.equal(oz.alanlar.find(a=>a.id==='Portal').bos,4);

// Sosyometri: Bora listede yok, kendisi kartı görmez ve cevap gönderemez.
yeniCagri();
const va=S.ogrenciSosyometri('tok-ada');
assert.deepEqual(va.arkadaslar.map(a=>a.ad),['CEM ÖZ','DENİZ ŞEN']);
assert.equal(va.secim,2,'Seçilebilecek kişi azsa seçim sayısı ona iner');
yeniCagri();
assert.equal(S.ogrenciSosyometri('tok-bora').acik,false);
const eskiId=S.sosyoArkadasKimligi_(kimlik,'101');
yeniCagri();
const r=S.sosyometriCevapla('tok-bora',kimlik,{grup:[eskiId],oyun:[eskiId],oturma:[eskiId],yardim:[eskiId]});
assert.equal(r.basarili,false);assert.equal(sheets.SOSYOMETRI,undefined);
// Ada'nın cevabı kaydedilir; öğretmen analizinde Bora yoktur, uyarı sayıları doğrudur.
yeniCagri();
const ids=va.arkadaslar.map(a=>a.id);
assert.equal(S.sosyometriCevapla('tok-ada',kimlik,{grup:ids,oyun:ids,oturma:ids,yardim:ids}).basarili,true);
const t=T.ogretmenSosyometri();
assert.deepEqual(t.turlar[0].analiz.ogrenciler.map(o=>o.ad),['ADA YILMAZ','CEM ÖZ','DENİZ ŞEN']);
assert.deepEqual(t.veliOnayi,{tabloVar:true,hayir:1,bekleyen:1});
assert.equal(t.ogrenciSayisi,3);

// Davranış raporu: Bora'nın raporu gösterilmez, Ada'nınki gösterilir.
sheets.VELI_RAPORLARI=makeSheet([['Ay','Dönem','Öğrenci','O','OP','G','GP','%','Olumlu','Geliştirme','Durum'],
 ['2026-10 Ekim','1–31 Ekim','ADA YILMAZ','5','5','1','1','83','ÖDEV +5','GÜRÜLTÜ -1','YAYINDA'],
 ['2026-10 Ekim','1–31 Ekim','BORA KAYA','4','4','0','0','100','ÖDEV +4','','YAYINDA']]);
yeniCagri();assert.equal(S.ogrenciAylikRaporlari('tok-ada').raporlar.length,1);
yeniCagri();assert.equal(S.ogrenciAylikRaporlari('tok-bora').raporlar.length,0);
yeniCagri();assert.equal(S.ogrenciAylikRaporlari('tok-cem').raporlar.length,0);

// Ayın Yıldızları: Bora'nın satırı kimseye gösterilmez.
sheets.AYIN_YILDIZLARI=makeSheet([['Ay','Ödül','Öğrenci','Not','Kayıt adı','Durum'],
 ['2026-10 Ekim','1','BORA K.','','BORA KAYA','YAYINDA'],['2026-10 Ekim','2','ADA Y.','','ADA YILMAZ','YAYINDA'],['2026-10 Ekim','3','CEM Ö.','','CEM ÖZ','YAYINDA']]);
for(const tok of ['tok-ada','tok-bora','tok-cem']){
 yeniCagri();const ay=S.ogrenciAyinYildizlari(tok).aylar[0];
 assert.deepEqual(ay.yildizlar.map(y=>y.ad),['ADA Y.','CEM Ö.'],'Bora gizli: '+tok);
}
// Onay geri gelince (EVET) yeniden görünür.
satir('102')[5]='EVET';yeniCagri();
assert.equal(S.ogrenciAyinYildizlari('tok-ada').aylar[0].yildizlar.length,3);

// Giriş ekranında aydınlatma metni bağlantısı; panelde onay bölümü; dağıtım listesinde yeni dosyalar.
const portal=fs.readFileSync('portal/appsscript/OgrenciGiris_Guncel.html','utf8');
const rapor=fs.readFileSync('portal/ogretmen-rapor/OgretmenRapor.html','utf8');
assert.match(portal,/href="https:\/\/ismailkaya33\.github\.io\/4\.SINIF\/gizlilik\.html"/);
assert.match(rapor,/id='consentPanel'/);assert.match(rapor,/\.ogretmenVeliOnaylari\(\)/);assert.match(rapor,/\.ogretmenVeliOnayTablosuHazirla\(\)/);
for(const b of rapor.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))new vm.Script(b[1]);
const sync=fs.readFileSync('.github/scripts/prepare-appsscript-sync.mjs','utf8');
assert.match(sync,/portal\/appsscript\/VeliOnaylari\.gs/);assert.match(sync,/portal\/ogretmen-rapor\/OgretmenVeliOnaylari\.gs/);
console.log('PASS: veli onayları — değer okuma, tablo hazırlama (TEST hariç, üzerine yazmaz), özet, sosyometri/davranış raporu/Ayın Yıldızları\'nda HAYIR uygulanır, geri alınınca görünür.');
