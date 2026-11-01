/** 4/D - Defter notu tamamlandi bildirimi; kullanicinin kimligi oturumdan gelir. */
const DEFTER_NOTLARI_ = Object.freeze({
 'Turkce':['atasozleri.jpeg','deyimler.jpeg','gercekmecaz.png','ikilemeler.jpeg','metninbolumleri.png','pekistirme.JPG'],
 'Matematik':['cikarmadaverilmeyen.png','cikarmadefternotu.png','toplama.png','zihindencikarma.png','zihindentoplama.png'],
 'Fen':['besinler1.png','besinler2.png','besinler3.png','besinlerintazeligi.png','besinlerisaklama.png'],
 'Sosyal':['ailemcocuk.jpg','ailetarihi.png','cocukoyun.png','farkliliklarimizvesaygi.png','mersinkultur.png','millikultur.png']
});
const DEFTER_DURUM_SAYFA_='DEFTER_TAMAMLAMA';
function defterNotuGecerli_(id) {
 if (typeof id!=='string') return false;
 const items=id.split('/');
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
  const rows=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,2).getDisplayValues():[];
  if(rows.some(r=>String(r[0])===String(pupil.no)&&r[1]===id))return {basarili:true,tekrar:true};
  sheet.appendRow([String(pupil.no),id,new Date()]);
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
  rows.forEach(r=>{if(String(r[0])===String(pupil.no)&&defterNotuGecerli_(r[1]))done.push(r[1])});
 }
 return {basarili:true,tamamlananlar:[...new Set(done)]};
}
