import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const registry=read('portal/appsscript/EtkinlikKayitDefteri.gs');
const results=read('portal/appsscript/EtkinlikSonuclari.gs');
const portal=read('portal/appsscript/OgrenciGiris_Guncel.html');
const assessment=read('Fen/besinlerdegerlendirme.html');
const teacher=read('portal/ogretmen-rapor/OgretmenRapor.gs');
const teacherHtml=read('portal/ogretmen-rapor/OgretmenRapor.html');
const game=read('test/oruntuler.html');
const context=vm.createContext({});
vm.runInContext(registry+'\n'+results,context);
const verify=vm.runInContext('etkinlikSonucuDogrula_',context);
const base={activityId:'mat-oruntuler',attemptId:'test_attempt_123456',correct:8,wrong:2,total:10,wrongAttempts:3,firstTry:6,durationSeconds:120};
assert.ok(verify(base),'Valid number-pattern result');
assert.equal(verify({...base,total:11}),null,'Inconsistent totals rejected');
assert.equal(verify({...base,activityId:'unknown-activity'}),null,'Unknown activity rejected');
assert.equal(verify({...base,firstTry:9}),null,'Invalid first attempts rejected');
assert.equal(verify({...base,durationSeconds:86401}),null,'Oversized duration rejected');
// 2026-11-08: oyun içi bitişi doğrulanan dört etkinlik uçtan uca kayıtlı olmalı.
const lateTracked=[
 ['tur-ikilemeler','Turkce/ikilemeler.html',{correct:16,wrong:0,total:16,wrongAttempts:4,firstTry:12}],
 ['mat-cikarmaislemi','Matematik/cikarmaislemi.html',{correct:16,wrong:0,total:16,wrongAttempts:2,firstTry:14}],
 ['fen-besinkasifleri','Fen/besinkasifleri.html',{correct:15,wrong:3,total:18,wrongAttempts:5,firstTry:15}],
 ['sos-oyunzamani','Sosyal/oyunzamani.html',{correct:18,wrong:0,total:18,wrongAttempts:3,firstTry:15}]
];
for(const [id,path,counts] of lateTracked){
 assert.ok(verify({...base,...counts,activityId:id,attemptId:'xx_'+'a'.repeat(32)}),'Server accepts '+id);
 assert.ok(portal.includes('"'+id+'":"https://ismailkaya33.github.io/4.SINIF/'+path+'"'),'Portal launches '+id+' in tracked frame');
 assert.ok(portal.includes('"'+path+'":"'+id+'"'),'Portal maps '+path+' to '+id);
 assert.ok(results.includes("'"+id+"':'"+path+"'"),'Progress maps '+id);
 assert.ok(teacher.includes('"'+id+'"'),'Teacher report lists '+id);
 assert.ok(teacherHtml.includes('"'+id+'":'),'Teacher report names '+id);
}
// Tek liste kuralı: bütün kod dosyaları portal/etkinlik-kayitlari.json ile aynı olmalı.
const {katalogFarklari}=await import('../../tools/katalog-esitle.mjs');
assert.deepEqual(katalogFarklari().farkli,[],'Activity catalog out of sync; run: node tools/katalog-esitle.mjs');
assert.match(results,/function ogrenciIlerlemeOzeti\(token\)/,'Private student progress API');
assert.match(registry,/fen-besinlerdegerlendirme/,'Registered food assessment');
assert.match(results,/function etkinlikSoruSonucuKaydet\(token, veri\)/,'Session-bound question result API');
assert.match(portal,/4d:question-answer/,'Parent receives question answer events');
assert.match(portal,/etkinlikSoruSonucuKaydet\(token,veri\)/,'Question answer saved using session');
assert.match(portal,/4d:question-ack/,'Question event acknowledgement');
assert.match(assessment,/activityId:\x27fen-besinlerdegerlendirme\x27/,'Assessment activity identifier');
assert.match(teacher,/ETKINLIK_SORU_SONUCLARI/,'Teacher report reads question sheet');
assert.match(teacherHtml,/id=\x22questionSections\x22/,'Teacher report renders question details');
assert.match(portal,/fen-besinlerdegerlendirme/,'Assessment is launchable inside the logged-in portal');
assert.match(results,/oturumKaydi_\(token\)/,'Progress session check');
assert.match(portal,/id="ilerlemePanel"/,'Student progress card');
assert.match(portal,/\.ogrenciIlerlemeOzeti\(token\)/,'Progress server call');
assert.match(portal,/function hosGeldinAdiGoster_\(ad\)/,'Student welcome header');
assert.match(portal,/id="oruntulerAc"/,'Launch button');
assert.match(portal,/mat-oruntuler/,'Registered activity');
assert.match(portal,/e\.origin\s*!==\s*"https:\/\/ismailkaya33\.github\.io"/,'Origin check');
assert.match(portal,/e\.source\s*!==\s*oyunCer\.contentWindow/,'Frame source check');
assert.match(portal,/etkinlikSonucuKaydet\(token,veri\)/,'Server submit');
assert.match(game,/type:'4d:activity-finished'/,'Completion message');
assert.match(game,/activityId:'mat-oruntuler'/,'Activity identity');
assert.match(game,/window\.addEventListener\('portal:reset'/,'Replay reset');
const blocks=[...game.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
assert.ok(blocks.length>=2);
for(const block of blocks)new Function(block[1]);
// Yeni etkinlikler kayitsiz yayimlanmasin; geri bildirim tipi tasarimda belirlensin.
const tracking=JSON.parse(read('portal/etkinlik-takip-politikasi.json'));
const known=new Map(tracking.mevcutEtkinlikler.map(x=>[x.konum,x]));
for(const entry of tracking.yeniEtkinlikler){
 assert.ok(['otomatik_sonuc','ogrenci_beyani'].includes(entry.takip),'Every new activity requires completion feedback: '+entry.konum);
 assert.ok(!known.has(entry.konum),'Duplicate activity: '+entry.konum);
 known.set(entry.konum,entry);
}
const linked=[...portal.matchAll(/href="https:\/\/ismailkaya33\.github\.io\/4\.SINIF\/([^"]+\.html)"/g)].map(x=>x[1]);
// Etkinlik olmayan bilgi sayfaları (veliler için KVKK aydınlatma metni ve onay formu) takip gerektirmez.
const bilgiSayfalari=new Set(['gizlilik.html','veli-onay-formu.html']);
for(const href of linked)assert.ok(known.has(href)||bilgiSayfalari.has(href),'Unregistered activity link: '+href);
assert.equal(tracking.gelecekEtkinlikTakibi,'zorunlu');
for(const entry of tracking.mevcutEtkinlikler)assert.ok(['secim_bekliyor','otomatik_sonuc','ogrenci_beyani','oyun_ici_bitis_dogrulamasi_bekliyor'].includes(entry.takip),'Invalid tracking option: '+entry.konum);
console.log('Integration smoke checks passed: result validation, trusted message bridge, replay, syntax.');
