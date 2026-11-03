/** 4/D - Defter notu tamamlandi bildirimi; kullanicinin kimligi oturumdan gelir. */
const DEFTER_NOTLARI_ = Object.freeze({
 'Turkce':['atasozleri.png','deyimler.png','gercekmecaz.png','ikilemeler.jpeg','metninbolumleri.png','pekistirme.JPG'],
 'Matematik':['cikarmadaverilmeyen.png','cikarmadefternotu.png','toplama.png','toplamacikarmaproblemleri.png','zihindencikarma.png','zihindentoplama.png'],
 'Fen':['besinler1.png','besinler2.png','besinler3.png','besinlerintazeligi.png','besinlerisaklama.png'],
 'Sosyal':['ailemcocuk.jpg','ailetarihi.png','cocukoyun.png','farkliliklarimizvesaygi.png','mersinkultur.png','millikultur.png','millimucadele1.png','millimucadele2.png','millimucadele3.png','millimucadele4.png','millimucadele5.png','millimucadele6.png','millimucadele7.png']
});
const DEFTER_DURUM_SAYFA_='DEFTER_TAMAMLAMA';
function defterNotuStandart_(id) {
 if (id==='Turkce/atasozleri.jpeg') return 'Turkce/atasozleri.png';
 if (id==='Turkce/deyimler.jpeg') return 'Turkce/deyimler.png';
 return id;
}
function defterNotuGecerli_(id) {
 if (typeof id!=='string') return false;
 const canonical=defterNotuStandart_(id),items=canonical.split('/');
 return items.length===2 && Object.prototype.hasOwnProperty.call(DEFTER_NOTLARI_,items[0]) &&
    DEFTER_NOTLARI_[items[0]].indexOf(items[1])!==-1;
}
function defterDurumSayfasi_() {
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 let sheet=ss.getSheetByName(DEFTER_DURUM_SAYFA_);
 if (!sheet) {
  sheet=ss.insertSheet(DEFTER_DURUM_SAYFA_);
  sheet.appendRow(['OgrenciNo','NotKimligi','TamamlamaZamani']);
 }
 return sheet;
}
/** Bu bildirimin anlamı "öğrenci yazdığını beyan etti"dir; öğretmen doğrulaması değildir. */
function defterNotuTamamla(token,id) {
 if(!oturumTokenGecerliBicimdeMi_(token)||!defterNotuGecerli_(id))return {basarili:false};
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(10000))return {basarili:false};
 try{
  const session=oturumKaydi_(token);
  if(!session)return {basarili:false};
  const pupil=kayitNoIle_(session.no);
  if(!pupil)return {basarili:false};
  const sheet=defterDurumSayfasi_();
  const canonical=defterNotuStandart_(id);
  const rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,2).getDisplayValues():[];
  if(rows.some(r=>String(r[0])===String(pupil.no)&&defterNotuStandart_(r[1])===canonical))return {basarili:true,tekrar:true};
  sheet.appendRow([String(pupil.no),canonical,new Date()]);
  return {basarili:true,tekrar:false};
 }catch(e){return {basarili:false}}finally{lock.releaseLock()}
}
function defterNotuDurumum(token) {
 if(!oturumTokenGecerliBicimdeMi_(token))return {basarili:false};
 const session=oturumKaydi_(token);
 if(!session)return {basarili:false};
 const pupil=kayitNoIle_(session.no);
 if(!pupil)return {basarili:false};
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 const sheet=ss.getSheetByName(DEFTER_DURUM_SAYFA_);
 const done=[];
 if(sheet&&sheet.getLastRow()>1){
  const rows=sheet.getRange(2,1,sheet.getLastRow()-1,2).getDisplayValues();
  rows.forEach(r=>{if(String(r[0])===String(pupil.no)&&defterNotuGecerli_(r[1]))done.push(defterNotuStandart_(r[1]))});
 }
 return {basarili:true,tamamlananlar:[...new Set(done)]};
}

/** Pilot: yalnız öğretmenin seçtiği mevcut altı etkinlik.
 * İşaret öğrenci beyanıdır; otomatik puan / doğru-yanlış sonucu değildir.
 */
const SECILI_ETKINLIKLER_ = Object.freeze([
 'Turkce/ikilemeler.html',
 'Turkce/pekistirme.html',
 'Turkce/sozavcıları.html',
 'Matematik/cikarmaislemi.html',
 'Fen/besinkasifleri.html',
 'Sosyal/oyunzamani.html',
 'Matematik/dogalsayilardegerlendirme.html',
 'Matematik/toplamacikarmaproblem1.html',
 'Matematik/toplamacikarmaproblem2.html',
 'Insanhaklari/insanolmasorumlulugu.html',
 'Trafik/yayaolaraktrafikkurallarietkinligi.html',
]);
const ETKINLIK_BEYAN_SAYFASI_='ETKINLIK_TAMAMLAMA';
function seciliEtkinlikMi_(id) {
 return typeof id==='string' && SECILI_ETKINLIKLER_.indexOf(id)!==-1;
}
function etkinlikBeyanSayfasi_() {
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 let sheet=ss.getSheetByName(ETKINLIK_BEYAN_SAYFASI_);
 if(!sheet){
  sheet=ss.insertSheet(ETKINLIK_BEYAN_SAYFASI_);
  sheet.appendRow(['OgrenciNo','EtkinlikKimligi','TamamlamaZamani','KayitTuru']);
 }
 return sheet;
}
function seciliEtkinlikTamamla(token,id) {
 if(!oturumTokenGecerliBicimdeMi_(token)||!seciliEtkinlikMi_(id))return {basarili:false};
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(10000))return {basarili:false};
 try {
  const record=oturumKaydi_(token);
  if(!record)return {basarili:false};
  const pupil=kayitNoIle_(record.no);
  if(!pupil)return {basarili:false};
  const sheet=etkinlikBeyanSayfasi_();
  const rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,2).getDisplayValues():[];
  if(rows.some(r=>String(r[0])===String(pupil.no)&&r[1]===id))return {basarili:true,tekrar:true};
  sheet.appendRow([String(pupil.no),id,new Date(),'OGRENCI_BEYANI']);
  return {basarili:true,tekrar:false};
 }catch(e){return {basarili:false}}finally{lock.releaseLock()}
}
function seciliEtkinlikDurumum(token) {
 if(!oturumTokenGecerliBicimdeMi_(token))return {basarili:false};
 const record=oturumKaydi_(token);
 if(!record)return {basarili:false};
 const pupil=kayitNoIle_(record.no);
 if(!pupil)return {basarili:false};
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ETKINLIK_BEYAN_SAYFASI_);
 const done=[];
 if(sheet&&sheet.getLastRow()>1){
  sheet.getRange(2,1,sheet.getLastRow()-1,2).getDisplayValues().forEach(r=>{
   if(String(r[0])===String(pupil.no)&&seciliEtkinlikMi_(r[1]))done.push(r[1]);
  });
 }
 return {basarili:true,tamamlananlar:[...new Set(done)]};
}
