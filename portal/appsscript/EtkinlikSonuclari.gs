/**
 * 4/D — Etkinlik sonuç kaydı (Apps Script için hazırlık).
 * Gizli veri içermez. GitHub'daki güncel sürüm canlıya henüz aktarılmamıştır.
 * Bağımlılıklar: Kod.gs (kayitNoIle_), OgrenciOturum.gs (oturumKaydi_).
 * Yalnız HtmlService üzerinden google.script.run ile çağrılması amaçlanır.
 */
const SONUC_SAYFASI_ADI_ = 'ETKINLIK_SONUCLARI';
const SONUC_MAX_SURE_SN_ = 86400;

function sonucSayfasi_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SONUC_SAYFASI_ADI_);
  if (!s) {
    s = ss.insertSheet(SONUC_SAYFASI_ADI_);
    s.appendRow(['KayitKimligi', 'OgrenciNo', 'Etkinlik', 'Kazanim', 'Dogru',
      'Yanlis', 'Toplam', 'YanlisDeneme', 'IlkDeneme', 'SureSaniye', 'KayitZamani']);
  }
  return s;
}

function etkinlikSonucuDogrula_(veri) {
  if (!veri || typeof veri !== 'object' || Array.isArray(veri)) return null;
  const id = String(veri.activityId || '');
  const izin = etkinlikTanimi_(id);
  if (!izin) return null;
  const fields = ['correct', 'wrong', 'total', 'wrongAttempts', 'firstTry', 'durationSeconds'];
  for (const f of fields) {
    if (!Number.isSafeInteger(veri[f]) || veri[f] < 0) return null;
  }
  if (veri.total < 1 || veri.total > izin.maxTotal ||
      veri.correct > veri.total || veri.wrong > veri.total ||
      veri.correct + veri.wrong !== veri.total ||
      veri.firstTry > veri.correct || veri.wrongAttempts > 10000 ||
      veri.durationSeconds > SONUC_MAX_SURE_SN_) return null;
  if (typeof veri.attemptId !== 'string' ||
      !/^[a-zA-Z0-9_-]{12,80}$/.test(veri.attemptId)) return null;
  return {id, izin, attemptId: veri.attemptId, correct: veri.correct,
    wrong: veri.wrong, total: veri.total, wrongAttempts: veri.wrongAttempts,
    firstTry: veri.firstTry, durationSeconds: veri.durationSeconds};
}

/**
 * Tarayıcıdan çağrılabilen uç nokta. Öğrenci kimliği istemciden ALINMAZ.
 * Token yalnızca parametrede kullanılır; tabloya/loga yazılmaz.
 */
function etkinlikSonucuKaydet(token, veri) {
  if (typeof token !== 'string' || token.length !== 73) return {basarili: false};
  const sonuc = etkinlikSonucuDogrula_(veri);
  if (!sonuc) return {basarili: false, mesaj: 'Geçersiz etkinlik sonucu.'};
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return {basarili: false, mesaj: 'Sistem meşgul.'};
  try {
    const oturum = oturumKaydi_(token);
    if (!oturum) return {basarili: false, mesaj: 'Oturum geçersiz.'};
    const ogrenci = kayitNoIle_(oturum.no);
    if (!ogrenci || !ogrenci.no) return {basarili: false, mesaj: 'Öğrenci bulunamadı.'};
    const sheet = sonucSayfasi_();
    // Çakışmaları öğrenci numarası + etkinlik + deneme kimliğiyle sınırla.
    const key = ogrenci.no + ':' + sonuc.id + ':' + sonuc.attemptId;
    const last = sheet.getLastRow();
    if (last > 1) {
      const keys = sheet.getRange(2, 1, last - 1, 1).getDisplayValues();
      if (keys.some(row => row[0] === key)) {
        return {basarili: true, tekrar: true};
      }
    }
    sheet.appendRow([key, ogrenci.no, sonuc.id, sonuc.izin.kazanim,
      sonuc.correct, sonuc.wrong, sonuc.total, sonuc.wrongAttempts,
      sonuc.firstTry, sonuc.durationSeconds, new Date()]);
    return {basarili: true, tekrar: false};
  } catch (e) {
    // Sunucu iç hatalarını / tablo içeriğini istemciye aktarma.
    return {basarili: false, mesaj: 'Kayıt sırasında hata oluştu.'};
  } finally {
    lock.releaseLock();
  }
}

/**
 * Kendi ilerlemem: yalnız geçerli oturumun öğrenci numarası ile filtreler.
 * MİSAFİR denemeleri öğretmen sınıf ortalamasına katılmaz.
 */

const SONUC_KANIT_SAYFASI_='ETKINLIK_KANITLARI';
const GOREV_KANITI_ETKINLIKLERI_=Object.freeze({
 'mat-toplamacikarma-1':Object.freeze({
  kazanim:'MAT.4.2.7',
  gorevler:Object.freeze(['q01','q02','q03','q05','q07','q08','q15','q17','q18','q19','q20','q22','q23','q24','q25','q26','q27','q28','q29','q30'])
 })
});
function etkinlikKanitiSayfasi_(){
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 let sheet=ss.getSheetByName(SONUC_KANIT_SAYFASI_);
 if(!sheet){
  sheet=ss.insertSheet(SONUC_KANIT_SAYFASI_);
  sheet.appendRow(['KayitKimligi','OgrenciNo','Etkinlik','Kazanim','DenemeKimligi','GorevKimligi','Durum','KayitZamani']);
 }
 return sheet;
}
/** Soru ayrıntıları, geçerli oturumdan alınan öğrenci numarasıyla saklanır. */
function etkinlikGorevKanitiKaydet(token,veri){
 if(typeof token!=='string'||token.length!==73||!veri||typeof veri!=='object'||Array.isArray(veri))return {basarili:false};
 const id=String(veri.activityId||''),tanim=GOREV_KANITI_ETKINLIKLERI_[id];
 if(!tanim||!etkinlikTanimi_(id)||typeof veri.attemptId!=='string'||
    !/^[a-zA-Z0-9_-]{12,80}$/.test(veri.attemptId)||
    !Number.isSafeInteger(veri.durationSeconds)||veri.durationSeconds<0||
    veri.durationSeconds>SONUC_MAX_SURE_SN_||!Array.isArray(veri.tasks)||
    veri.tasks.length!==tanim.gorevler.length)return {basarili:false,mesaj:'Geçersiz görev kanıtı.'};
 const seen={},tasks=[];
 for(const item of veri.tasks){
  if(!item||typeof item!=='object'||Array.isArray(item)||typeof item.taskId!=='string'||
     tanim.gorevler.indexOf(item.taskId)<0||seen[item.taskId]||
     ['success','wrong'].indexOf(item.status)<0)return {basarili:false,mesaj:'Geçersiz görev kanıtı.'};
  seen[item.taskId]=true;tasks.push({taskId:item.taskId,status:item.status});
 }
 if(tanim.gorevler.some(id=>!seen[id]))return {basarili:false,mesaj:'Eksik görev kanıtı.'};
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(10000))return {basarili:false,mesaj:'Sistem meşgul.'};
 try{
  const session=oturumKaydi_(token);
  if(!session)return {basarili:false,mesaj:'Oturum geçersiz.'};
  const pupil=kayitNoIle_(session.no);
  if(!pupil||!pupil.no)return {basarili:false,mesaj:'Öğrenci bulunamadı.'};
  const sheet=etkinlikKanitiSayfasi_(),last=sheet.getLastRow();
  const existing=new Set(last>1?sheet.getRange(2,1,last-1,1).getDisplayValues().map(r=>r[0]):[]);
  const rows=tasks.map(function(task){
   const key=String(pupil.no)+':'+id+':'+veri.attemptId+':'+task.taskId;
   return {key:key,values:[key,String(pupil.no),id,tanim.kazanim,veri.attemptId,
     task.taskId,task.status,new Date()]};
  }).filter(function(row){return !existing.has(row.key);});
  if(rows.length)sheet.getRange(sheet.getLastRow()+1,1,rows.length,8).setValues(rows.map(r=>r.values));
  return {basarili:true,tekrar:rows.length===0};
 }catch(e){return {basarili:false,mesaj:'Görev kanıtı kaydedilemedi.'};}
 finally{lock.releaseLock();}
}

function ogrenciIlerlemeOzeti(token) {
  const session = oturumKaydi_(token);
  if (!session) return {basarili:false};
  const student = kayitNoIle_(session.no);
  if (!student) return {basarili:false};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SONUC_SAYFASI_ADI_);
  if (!sheet || sheet.getLastRow() < 2)
    return {basarili:true,etkinlikSayisi:0,denemeSayisi:0,dogru:0,toplam:0,oran:0};
  const rows = sheet.getRange(2,2,sheet.getLastRow()-1,9).getValues();
  const unique = new Set();
  let attempts=0, correct=0, total=0;
  rows.forEach(function(r){
    if (String(r[0]).trim() !== String(student.no).trim()) return;
    const activity=String(r[1]).trim();
    const d=Number(r[3]), t=Number(r[5]);
    if (!etkinlikTanimi_(activity) || !Number.isSafeInteger(d) ||
        !Number.isSafeInteger(t) || t<1 || d<0 || d>t) return;
    unique.add(activity); attempts++; correct+=d; total+=t;
  });
  return {basarili:true,etkinlikSayisi:unique.size,denemeSayisi:attempts,
    dogru:correct,toplam:total,oran:total?Math.round(correct*100/total):0};
}
