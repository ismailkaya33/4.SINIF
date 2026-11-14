// Sosyometri ("Sınıf Arkadaşlarım"): öğrenci API'si + öğretmen paneli aynı sahte tablo üzerinde uçtan uca.
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
// 1) Tur yokken kart görünmez; geçersiz oturum reddedilir.
assert.equal(S.ogrenciSosyometri('tok-ada').acik,false);
assert.equal(S.ogrenciSosyometri('kotu').basarili,false);
assert.equal(S.ogrenciSosyometri('tok-yok').basarili,false);
assert.deepEqual(JSON.parse(JSON.stringify(T.ogretmenSosyometri().turlar)),[]);
// 2) Öğretmen hazırlar: TASLAK, öğrenci görmez; ikinci hazırlık reddedilir.
T.ogretmenSosyometriHazirla();assert.equal(locked,false);
assert.throws(()=>T.ogretmenSosyometriHazirla(),/Zaten/);
let turlar=T.ogretmenSosyometri().turlar;assert.equal(turlar.length,1);assert.equal(turlar[0].durum,'TASLAK');
const kimlik=turlar[0].kimlik;assert.match(kimlik,/^[0-9]{13}$/);
assert.equal(S.ogrenciSosyometri('tok-ada').acik,false);
// 3) Yayımlanınca öğrenci 4 soruyu, 3 seçimi ve kendisi/TEST/çift numara hariç arkadaşları görür.
T.ogretmenSosyometriDurumDegistir(kimlik,'YAYINDA');
const v=S.ogrenciSosyometri('tok-ada');
assert.equal(v.acik,true);assert.equal(v.secim,3);assert.equal(v.cevapladi,false);assert.equal(v.duzeltebilir,true);
assert.deepEqual(v.sorular.map(s=>s.id),['grup','oyun','oturma','yardim']);
assert.deepEqual(v.arkadaslar.map(a=>a.ad),['BORA KAYA','CEM ÖZ','DENİZ ŞEN','EFE ARSLAN','FUNDA ÇAKIR']);
const json=JSON.stringify(v);
for(const gizli of ['ADA YILMAZ','DENEME HESABI','İKİZ','KOD00','"101"','"102"','"no"'])assert.ok(!json.includes(gizli),'Tarayıcıya gitmemeli: '+gizli);
v.arkadaslar.forEach(a=>{assert.deepEqual(Object.keys(a).sort(),['ad','id']);assert.match(a.id,/^[0-9a-f]{16}$/)});
const id=ad=>v.arkadaslar.find(a=>a.ad===ad).id;
const uc=[id('BORA KAYA'),id('CEM ÖZ'),id('DENİZ ŞEN')];
const hepsi=x=>({grup:x,oyun:x,oturma:x,yardim:x});
// 4) Hatalı cevaplar kaydedilmez.
const kotu=[
 hepsi(uc.slice(0,2)),                              // eksik seçim
 hepsi([uc[0],uc[0],uc[1]]),                        // aynı kişi iki kez
 hepsi([uc[0],uc[1],'ffffffffffffffff']),           // bilinmeyen kimlik
 hepsi([uc[0],uc[1],'101']),                        // numara gönderilemez
 {grup:uc,oyun:uc,oturma:uc},                       // eksik soru
 {...hepsi(uc),fazla:uc},                           // fazla soru
 hepsi([uc[0],uc[1],uc[2],id('EFE ARSLAN')]),       // fazla seçim
 null,[]];
for(const c of kotu)assert.equal(S.sosyometriCevapla('tok-ada',kimlik,c).basarili,false);
assert.equal(S.sosyometriCevapla('tok-ada','123',hepsi(uc)).basarili,false);
assert.equal(S.sosyometriCevapla('kotu',kimlik,hepsi(uc)).basarili,false);
assert.equal(sheets.SOSYOMETRI,undefined,'Hatalı cevapta sayfa bile açılmamalı');
// Kendini seçemez: Bora'nın listesindeki Ada kimliği Ada'nın kendi listesinde yoktur.
const vb=S.ogrenciSosyometri('tok-bora');
assert.ok(!vb.arkadaslar.some(a=>a.ad==='BORA KAYA'));
const adaKimligi=vb.arkadaslar.find(a=>a.ad==='ADA YILMAZ').id;
assert.equal(S.sosyometriCevapla('tok-ada',kimlik,hepsi([adaKimligi,uc[0],uc[1]])).basarili,false);
// 5) Geçerli cevap: numaralarla tek satır; bir kez düzeltme; üçüncü deneme reddedilir.
let r=S.sosyometriCevapla('tok-ada',kimlik,hepsi(uc));
assert.equal(r.basarili,true);assert.equal(r.duzeltebilir,true);assert.equal(locked,false);
assert.equal(sheets.SOSYOMETRI.rows.length,2);
assert.deepEqual(JSON.parse(sheets.SOSYOMETRI.rows[1][3]).grup,['102','103','104']);
assert.equal(disp(sheets.SOSYOMETRI.rows[1][2]),'101');
let tekrar=S.ogrenciSosyometri('tok-ada');
assert.equal(tekrar.cevapladi,true);assert.equal(tekrar.duzeltebilir,true);assert.deepEqual(tekrar.cevap.grup,uc);
const yeni=[id('BORA KAYA'),id('EFE ARSLAN'),id('FUNDA ÇAKIR')];
r=S.sosyometriCevapla('tok-ada',kimlik,{...hepsi(uc),oyun:yeni});
assert.equal(r.basarili,true);assert.equal(r.duzeltebilir,false);
assert.equal(sheets.SOSYOMETRI.rows.length,2,'Düzeltme yeni satır açmaz');
assert.deepEqual(JSON.parse(sheets.SOSYOMETRI.rows[1][3]).oyun,['102','105','106']);assert.equal(sheets.SOSYOMETRI.rows[1][4],1);
r=S.sosyometriCevapla('tok-ada',kimlik,hepsi(yeni));
assert.equal(r.basarili,false);assert.match(r.mesaj,/değiştirdin/);
tekrar=S.ogrenciSosyometri('tok-ada');assert.equal(tekrar.cevapladi,true);assert.equal(tekrar.duzeltebilir,false);
// Bora'nın görünümünde Ada'nın cevabı yoktur.
assert.equal(S.ogrenciSosyometri('tok-bora').cevap,null);
// 6) Bora Ada'yı seçer (karşılıklı); TEST hesabı da cevaplar ama sonuca katılmaz.
const bid=ad=>vb.arkadaslar.find(a=>a.ad===ad).id;
assert.equal(S.sosyometriCevapla('tok-bora',kimlik,hepsi([bid('ADA YILMAZ'),bid('CEM ÖZ'),bid('EFE ARSLAN')])).basarili,true);
const vt=S.ogrenciSosyometri('tok-test');
assert.equal(vt.arkadaslar.length,6);
assert.equal(S.sosyometriCevapla('tok-test',kimlik,hepsi(vt.arkadaslar.slice(0,3).map(a=>a.id))).basarili,true);
// 7) Öğretmen sonuçları.
turlar=JSON.parse(JSON.stringify(T.ogretmenSosyometri()));
const a=turlar.turlar[0].analiz,ad=i=>a.ogrenciler[i].ad,ix=n=>a.ogrenciler.findIndex(o=>o.ad===n);
assert.equal(turlar.ogrenciSayisi,6);
assert.equal(a.cevapSayisi,2);assert.equal(a.testCevapSayisi,1);assert.equal(a.duzeltmeSayisi,1);
assert.ok(!JSON.stringify(turlar).includes('"101"'),'Öğretmen yanıtında da numara yok');
assert.deepEqual(a.sorular.grup.karsilikli.map(p=>p.map(ad).sort()),[['ADA YILMAZ','BORA KAYA']]);
assert.deepEqual(a.sorular.oyun.karsilikli.map(p=>p.map(ad).sort()),[['ADA YILMAZ','BORA KAYA']]);
assert.equal(a.sorular.grup.alinan[ix('CEM ÖZ')],2);
assert.equal(a.sorular.oyun.alinan[ix('CEM ÖZ')],1);
assert.deepEqual(a.sorular.oyun.secilmeyen.map(ad).sort(),['DENİZ ŞEN']);
assert.deepEqual(a.sorular.grup.secilmeyen.map(ad).sort(),['FUNDA ÇAKIR']);
assert.deepEqual(a.sorular.tumu.secilmeyen,[],'Her öğrenci en az bir soruda seçildi');
assert.equal(a.sorular.tumu.alinan[ix('CEM ÖZ')],2*4-1);
assert.equal(a.sorular.tumu.karsilikli.length,1);
assert.deepEqual(a.ogrenciler.filter(o=>o.cevapladi).map(o=>o.ad).sort(),['ADA YILMAZ','BORA KAYA']);
// Saf analiz: kendini seçme ve bilinmeyen numara sayılmaz.
const saf=T.sosyometriAnalizi_([{no:'1',ad:'A'},{no:'2',ad:'B'}],[['',"'9",'1',JSON.stringify({grup:['1','2','99']}),0]],'9',[{id:'grup'}],[]);
assert.deepEqual(Array.from(saf.sorular.grup.alinan),[0,1]);
// 8) Kapanınca öğrenci göremez ve cevaplayamaz; yayındayken silme reddedilir.
assert.throws(()=>T.ogretmenSosyometriCevaplariniSil(kimlik),/kapatın/);
T.ogretmenSosyometriDurumDegistir(kimlik,'ARSIV');
assert.equal(S.ogrenciSosyometri('tok-ada').acik,false);
assert.equal(S.sosyometriCevapla('tok-bora',kimlik,hepsi([bid('ADA YILMAZ'),bid('CEM ÖZ'),bid('EFE ARSLAN')])).basarili,false);
// 9) Yeni tur: önceki tur cevapları yenisine karışmaz; aynı anda iki tur yayımlanamaz.
T.ogretmenSosyometriHazirla();
const ikinci=T.ogretmenSosyometri().turlar[0].kimlik;assert.notEqual(ikinci,kimlik);
T.ogretmenSosyometriDurumDegistir(ikinci,'YAYINDA');
assert.throws(()=>T.ogretmenSosyometriDurumDegistir(kimlik,'YAYINDA'),/Başka/);
const v2=S.ogrenciSosyometri('tok-ada');assert.equal(v2.cevapladi,false);assert.ok(v2.arkadaslar[0].id!==v.arkadaslar[0].id,'Kimlikler tura özel');
assert.equal(S.sosyometriCevapla('tok-ada',ikinci,hepsi(v2.arkadaslar.slice(0,3).map(a=>a.id))).basarili,true);
// 10) KVKK: kapalı turun cevapları kalıcı silinir, diğer tur etkilenmez.
const once=sheets.SOSYOMETRI.rows.length;
const sil=T.ogretmenSosyometriCevaplariniSil(kimlik);assert.equal(sil.silinen,3);
assert.equal(sheets.SOSYOMETRI.rows.length,once-3);
assert.ok(sheets.SOSYOMETRI.rows.slice(1).every(x=>disp(x[1])===ikinci));
assert.match(sheets.SOSYOMETRI_TURLARI.rows[1][1],/cevaplar silindi/);
assert.equal(locked,false);
// 11) Sayfaların betikleri sözdizimi açısından geçerli ve yeni işlevler bağlı.
const portal=fs.readFileSync('portal/appsscript/OgrenciGiris_Guncel.html','utf8');
const rapor=fs.readFileSync('portal/ogretmen-rapor/OgretmenRapor.html','utf8');
for(const html of [portal,rapor])for(const b of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))new vm.Script(b[1]);
assert.match(portal,/id="sosyometriAlani"/);assert.match(portal,/\.ogrenciSosyometri\(token\)/);assert.match(portal,/\.sosyometriCevapla\(token,v\.tur\.kimlik,veri\)/);
assert.equal((portal.match(/anketleriYukle\(\);sosyometriYukle\(\);/g)||[]).length,2,'Girişte ve sayfa yenilemede yüklenir');
assert.match(portal,/sosyoIstekSirasi\+\+;document\.getElementById\("sosyometriAlani"\)\.replaceChildren\(\)/,'Çıkışta temizlenir');
assert.match(rapor,/id='sociometryPanel'/);assert.match(rapor,/\.ogretmenSosyometri\(\)/);
const sync=fs.readFileSync('.github/scripts/prepare-appsscript-sync.mjs','utf8');
assert.match(sync,/portal\/appsscript\/Sosyometri\.gs/);assert.match(sync,/portal\/ogretmen-rapor\/OgretmenSosyometri\.gs/);
// Öğrenci projesinde öğretmen işlevi yok (başkasının cevabını okuyan öğrenci API'si olmamalı).
assert.equal(typeof S.ogretmenSosyometri,'undefined');assert.ok(!/OZEL_TABLO_ID|openById/.test(fs.readFileSync('portal/appsscript/Sosyometri.gs','utf8')));
console.log('PASS: sosyometri — tur/yayın, sınıf listesi gizliliği, doğrulama, tek cevap + bir düzeltme, TEST hariç analiz, karşılıklı/seçilmeyen, tur ayrımı, KVKK silme, sayfa sözdizimi.');
