// Öğrenci takip özeti: geride kalan / desteğe ihtiyacı olabilir mantığı. Sahte veri (Öğrenci A, B, C).
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/../portal/ogretmen-rapor/OgretmenRapor.html','utf8');
const m=html.match(/function ogrenciOzeti[\s\S]*?\n}\n/);assert(m,'ogrenciOzeti bulunamadı');
const ctx={};vm.createContext(ctx);vm.runInContext(m[0]+';this.f=ogrenciOzeti',ctx);
const S=[
 {no:'1',ad:'Öğrenci A',activityCount:4,correct:9,total:10},
 {no:'2',ad:'Öğrenci B',activityCount:1,correct:2,total:10},
 {no:'3',ad:'Öğrenci C',activityCount:0,correct:0,total:0}];
let o=ctx.f(S,4);
assert.equal(o.geride.join(),'2,3');assert.equal(o.destek.join(),'2');
assert.equal(o.cards.length,2);assert.equal(o.cards[0].s.no,'3');
assert.ok(Math.abs(o.sinifOran-11/20)<1e-9);
o=ctx.f(S,0);assert.equal(o.geride.length,0);assert.equal(o.cards.length,1);
o=ctx.f([],3);assert.equal(o.sinifOran,null);
// .gs çıktısında lastAt/lastId alanları
assert.match(fs.readFileSync(__dirname+'/../portal/ogretmen-rapor/OgretmenRapor.gs','utf8'),/lastAt:son\?son\.at:0/);
console.log('ogrenci-ozet OK');
