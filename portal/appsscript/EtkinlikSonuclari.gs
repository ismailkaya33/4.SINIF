/**
 * 4/D — Etkinlik sonuç kaydı.
 * Gizli veri içermez. Bağımlılıklar: Kod.gs (kayitNoIle_), OgrenciOturum.gs (oturumKaydi_).
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
function ogrenciIlerlemeOzeti(token) {
  const session = oturumKaydi_(token);
  if (!session) return {basarili:false};
  const student = kayitNoIle_(session.no);
  if (!student) return {basarili:false};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SONUC_SAYFASI_ADI_);
  const rows = sheet && sheet.getLastRow() > 1 ? sheet.getRange(2,2,sheet.getLastRow()-1,9).getValues() : [];
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
  // A result and a completion declaration for the same activity count once.
  /* KATALOG BASLA: ilerleme-yollari — elle değiştirmeyin, portal/etkinlik-kayitlari.json dosyasını düzenleyin */
const paths = {
    'mat-dogalsayilar-degerlendirme':'Matematik/dogalsayilardegerlendirme.html',
    'mat-toplamacikarma-1':'Matematik/toplamacikarmaproblem1.html',
    'mat-toplamacikarma-2':'Matematik/toplamacikarmaproblem2.html',
    'insan-sorumluluk':'Insanhaklari/insanolmasorumlulugu.html',
    'trafik-yaya':'Trafik/yayaolaraktrafikkurallarietkinligi.html',
    'fen-besinlerdegerlendirme':'Fen/besinlerdegerlendirme.html',
    'tur-ikilemeler':'Turkce/ikilemeler.html',
    'mat-cikarmaislemi':'Matematik/cikarmaislemi.html',
    'fen-besinkasifleri':'Fen/besinkasifleri.html',
    'sos-oyunzamani':'Sosyal/oyunzamani.html',
    'insan-farkliyasamlar':'Insanhaklari/farkliyasamlar.html',
    'mat-cikarmadatahmin':'Matematik/cikarmadatahmin.html',
    'mat-toplama-problemleri-sinav':'Matematik/mat-toplama-problemleri-sinav.html',
    'sos-konum':'Sosyal/konumkasifi.html',
    'tur-atasozu-deyim-sinav':'Turkce/tur-atasozu-deyim-sinav.html',
    'tur-cikarim-baslik':'Turkce/cikarimbaslik.html',
    'trafik-oyunaraclari':'Trafik/oyunaraclari.html',
    'tur-tablo-grafik':'Turkce/kantindedektifi.html'
  };
/* KATALOG BITIR: ilerleme-yollari */
  const available = new Set(SECILI_ETKINLIKLER_);
  Object.keys(SONUC_IZINLI_ETKINLIKLER_).forEach(id=>available.add(paths[id]||id));
  const completed = new Set([...unique].map(id=>paths[id]||id));
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  function ownIds(name) {
    const sh=ss.getSheetByName(name);
    return sh && sh.getLastRow()>1 ? sh.getRange(2,1,sh.getLastRow()-1,2).getDisplayValues()
      .filter(r=>String(r[0]).trim()===String(student.no).trim()).map(r=>r[1]) : [];
  }
  ownIds(ETKINLIK_BEYAN_SAYFASI_).forEach(id=>{if(available.has(id))completed.add(id)});
  const notes=new Set(ownIds(DEFTER_DURUM_SAYFA_).filter(defterNotuGecerli_).map(defterNotuStandart_));
  const noteTotal=Object.keys(DEFTER_NOTLARI_).reduce((n,dir)=>n+DEFTER_NOTLARI_[dir].length,0);
  const taskTotal=available.size+noteTotal, taskDone=completed.size+notes.size;
  return {basarili:true,etkinlikSayisi:completed.size,denemeSayisi:attempts,
    defterSayisi:notes.size,tamamlananCalisma:taskDone,toplamCalisma:taskTotal,
    tamamlamaOrani:taskTotal?Math.round(taskDone*100/taskTotal):0,
    dogru:correct,toplam:total,oran:total?Math.round(correct*100/total):0,
    kaydedilenEtkinlikler:[...unique]};
}


/** Soru bazlı değerlendirme yanıtları; öğrenci numarası yalnız oturumdan çözülür. */
const ETKINLIK_SORU_SONUCLARI_SAYFASI_ = 'ETKINLIK_SORU_SONUCLARI';
const FEN_BESINLER_DEGERLENDIRME_ID_ = 'fen-besinlerdegerlendirme';
function etkinlikSoruSonucuKaydet(token, veri) {
  if (typeof token !== 'string' || token.length !== 73 || !veri || typeof veri !== 'object' || Array.isArray(veri) ||
      veri.activityId !== FEN_BESINLER_DEGERLENDIRME_ID_ || typeof veri.attemptId !== 'string' ||
      !/^[A-Za-z0-9_-]{12,80}$/.test(veri.attemptId) ||
      !Number.isSafeInteger(veri.question) || veri.question < 1 || veri.question > 200 ||
      !Array.isArray(veri.choices) || veri.choices.length < 1 || veri.choices.length > 20 ||
      veri.choices.some(function(x){return !['correct','wrong','unanswered'].includes(x)})) return {basarili:false};
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return {basarili:false};
  try {
    const session = oturumKaydi_(token);
    if (!session) return {basarili:false};
    const pupil = kayitNoIle_(session.no);
    if (!pupil || !pupil.no) return {basarili:false};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(ETKINLIK_SORU_SONUCLARI_SAYFASI_);
    if (!sheet) {
      sheet = ss.insertSheet(ETKINLIK_SORU_SONUCLARI_SAYFASI_);
      sheet.appendRow(['KayitKimligi','OgrenciNo','Etkinlik','DenemeKimligi','SoruNo','SecimGecmisi','GuncellemeZamani']);
    }
    const key = String(pupil.no)+':'+veri.activityId+':'+veri.attemptId+':'+veri.question;
    const last = sheet.getLastRow();
    const keys = last > 1 ? sheet.getRange(2,1,last-1,1).getDisplayValues() : [];
    const row = keys.findIndex(function(r){return r[0]===key;});
    const record = [key,String(pupil.no),veri.activityId,veri.attemptId,veri.question,JSON.stringify(veri.choices),new Date()];
    if (row >= 0) sheet.getRange(row+2,1,1,7).setValues([record]);
    else sheet.appendRow(record);
    return {basarili:true};
  } catch (e) { return {basarili:false}; }
  finally { lock.releaseLock(); }
}
