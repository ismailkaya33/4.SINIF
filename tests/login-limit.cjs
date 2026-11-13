// Giriş sınırı: başarılı girişler sayılmaz; yanlış kod ve toplu tahmin sınırlanır. Sahte veri, gerçek kod yok.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const props=new Map();let now=1700000000000;
const KAYITLI=new Set(['AAA111','BBB222']);
const ctx=vm.createContext({
  PropertiesService:{getScriptProperties:()=>({getProperty:k=>props.has(k)?props.get(k):null,setProperty:(k,v)=>props.set(k,v),deleteProperty:k=>props.delete(k)})},
  ozet_:s=>'h'+s
});
vm.runInContext(fs.readFileSync('portal/appsscript/GirisGuvenligi.gs','utf8'),ctx);
function giris(kod){
  const c=ctx.girisKontrol_(kod,now);
  if(!c.izin)return 'kilit';
  if(!KAYITLI.has(kod)){ctx.hataliGirisiKaydet_(c);return 'hata';}
  ctx.basariliGirisTemizle_(c);return 'ok';
}
// 1) 300 başarılı giriş (sınıfça art arda + yenilemeler) kimseyi kilitlemez
for(let i=0;i<300;i++)assert.equal(giris(i%2?'AAA111':'BBB222'),'ok');
// 2) aynı yanlış kod 5 kez → o kod kilitlenir, doğru kodlar çalışır
for(let i=0;i<5;i++)assert.equal(giris('ZZZ999'),'hata');
assert.equal(giris('ZZZ999'),'kilit');
assert.equal(giris('AAA111'),'ok');
// 3) başarılı giriş kendi kodunun hata sayacını sıfırlar
assert.equal(giris('CCC333'),'hata');KAYITLI.add('CCC333');assert.equal(giris('CCC333'),'ok');
assert.equal(props.has('k_hCCC333'),false);
// 4) farklı kodlarla toplu tahmin: 60 yanlış denemede tüm giriş 5 dk durur
now+=6*60*1000;props.clear();
for(let i=0;i<60;i++)assert.equal(giris('X'+String(i).padStart(5,'0')),'hata');
assert.equal(giris('AAA111'),'kilit');
// 5) pencere dolunca tekrar açılır
now+=5*60*1000;assert.equal(giris('AAA111'),'ok');
console.log('PASS: 300 başarılı giriş kilitlemez, aynı yanlış kod 5 kezde durur, başarılı giriş sayacı temizler, 60 farklı yanlış denemede toplu sınır, 5 dk sonra açılır.');
