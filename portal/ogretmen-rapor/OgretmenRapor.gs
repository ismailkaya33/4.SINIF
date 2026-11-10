/**
 * 4/D ÖĞRETMEN RAPORU — YALNIZCA AYRI, ÖĞRETMENE ÖZEL SCRIPT PROJESİ.
 *
 * ÖNEMLİ: Bunu öğrencilerin erişebileceği Apps Script projesine eklemeyin.
 * Rapor ayrı Apps Script projesinde çalışır. Bu projeyi öğrencilere paylaşmayın.
 * Yalnız öğretmen hesabından /dev üzerinden önizleme yapılmalıdır.
 */
const RAPOR_KAYIT_SAYFASI_='Sayfa1';
const RAPOR_SONUC_SAYFASI_='ETKINLIK_SONUCLARI';
const RAPOR_DERS_ICERIKLERI_ = [{"ders":"Türkçe","icerikler":[{"ad":"Ana Fikir ve Ana Duygu Dedektifi","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/anafikiranaduygu.html"},{"ad":"Dil Muhafızları","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/dilkoruyucusu.html"},{"ad":"Sözcüklerin Doğru Yazımı","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/dogrusunuyaz.html"},{"ad":"Eş Sesli Sözcükler","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/essesli.html"},{"ad":"Eş Sesli Sözcükler 2","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/essesli2.html"},{"ad":"Eş ve Zıt Anlamlılar","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/eszitanlam.html"},{"ad":"Gerçek Mecaz ve Terim Anlam","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/gercekmecazterim.html"},{"ad":"Gerçek Mecaz ve Terim Anlam 2","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/gercekmecazterim2.html"},{"ad":"Harf ve Hece Bilgisi","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/harfhece.html"},{"ad":"Hikaye Dedektifi","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/hikayededektifi.html"},{"ad":"İkileme Dedektifi","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/ikilemeler.html"},{"ad":"Metnin Konusunu Bul","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/metninkonusu.html"},{"ad":"Metnin Mimarları","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/metinmimarlari.html"},{"ad":"Metnin Bölümleri","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/metninbolumleri.html"},{"ad":"Noktalama İşaretleri","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/noktalamaisaretleri.html"},{"ad":"Pekiştirme Dedektifi 1","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/pekistirme.html"},{"ad":"Atasözleri ve Deyimler","url":"https://ismailkaya33.github.io/4.SINIF/Turkce/sozavcıları.html"}]},{"ders":"Matematik","icerikler":[{"ad":"Sayı Örüntüleri","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/oruntuler.html"},{"ad":"Sayılar","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/sayilar.html"},{"ad":"Sayıları Karşılaştırma ve Sıralama","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/sayilarikarsilastirsirala.html"},{"ad":"Sayı Problemleri Atölyesi","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/sayiproblemleri.html"},{"ad":"Toplama Yapalım","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/toplama.html"},{"ad":"Yuvarlama Macerası 1","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/yuvarlama.html"},{"ad":"Yuvarlama Macerası 2","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/yuvarlama2.html"},{"ad":"Zihinden Toplama Ustaları","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/zihindentoplama.html"},{"ad":"Zihinden Çıkarma Ustaları","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/zihindencikarma.html"},{"ad":"Çıkarma Dedektifleri","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/cikarmaislemi.html"},{"ad":"Çıkarma İşleminde Verilmeyen Sayılar","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/kayipsayilar.html"},{"ad":"Doğal Sayılar Ünite Değerlendirme","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/dogalsayilardegerlendirme.html"},{"ad":"Toplama ve Çıkarma Problemleri 1","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/toplamacikarmaproblem1.html"},{"ad":"Toplama ve Çıkarma Problemleri 2","url":"https://ismailkaya33.github.io/4.SINIF/Matematik/toplamacikarmaproblem2.html"}]},{"ders":"Fen Bilimleri","icerikler":[{"ad":"Besin Kaşifleri: Görev Haritası","url":"https://ismailkaya33.github.io/4.SINIF/Fen/besinkasifleri.html"},{"ad":"Besin Akademisi","url":"https://ismailkaya33.github.io/4.SINIF/Fen/besinakademisi.html"},{"ad":"Dünya'nın Hareketleri 1","url":"https://ismailkaya33.github.io/4.SINIF/Fen/dunyaninhareketleri2.html"},{"ad":"Dünya'nın Hareketleri 2","url":"https://ismailkaya33.github.io/4.SINIF/Fen/dunyaninhareketleri3.html"},{"ad":"Fosil Keşfi 1","url":"https://ismailkaya33.github.io/4.SINIF/Fen/fosiller.html"},{"ad":"Fosil Keşfi 2","url":"https://ismailkaya33.github.io/4.SINIF/Fen/fosiller2.html"},{"ad":"🌍 Gece, Gündüz ve Saatler (3B Simülasyon)","url":"https://ismailkaya33.github.io/4.SINIF/Fen/gecegunduz3d.html"},{"ad":"Madenler 1","url":"https://ismailkaya33.github.io/4.SINIF/Fen/madenler.html"},{"ad":"Madenler 2","url":"https://ismailkaya33.github.io/4.SINIF/Fen/madenler2.html"},{"ad":"F.4.1 Ünite Değerlendirme Testi","url":"https://ismailkaya33.github.io/4.SINIF/Fen/unitedegerlendirme1.html"},{"ad":"Besinler: Ünite Değerlendirme","url":"https://ismailkaya33.github.io/4.SINIF/Fen/besinlerdegerlendirme.html"}]},{"ders":"Sosyal Bilgiler","icerikler":[{"ad":"Aile Tarihi","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/ailetarihi.html"},{"ad":"Kendini Onun Yerine Koy","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/kendinionunyerinekoy.html"},{"ad":"Milli Kültür Öğeleri","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/millikultur.html"},{"ad":"Milli Mücadele Dönemi","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/millimucadele.html"},{"ad":"İlgi, İhtiyaç ve Yeteneklerimiz","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/ilgiihtiyacyetenek.html"},{"ad":"Geçmişten Günümüze Çocuk Oyunları","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/oyunzamani.html"},{"ad":"Kurtuluş Yolu — Tarihin İzinde","url":"https://ismailkaya33.github.io/4.SINIF/Sosyal/kurtulus.html"}]},{"ders":"İnsan Hakları","icerikler":[{"ad":"Hak Özgürlük ve Sorumluluk","url":"https://ismailkaya33.github.io/4.SINIF/Insanhaklari/hakozgurluksorumluluk.html"},{"ad":"Bilinçli Vatandaş Kasabası","url":"https://ismailkaya33.github.io/4.SINIF/Insanhaklari/hakozgurluksorumluluk2.html"},{"ad":"Yetişkinler ve Çocuklar","url":"https://ismailkaya33.github.io/4.SINIF/Insanhaklari/cocukveyetiskinfarklar.html"},{"ad":"İnsan Olma Sorumluluğu","url":"https://ismailkaya33.github.io/4.SINIF/Insanhaklari/insanolmasorumlulugu.html"}]},{"ders":"Trafik Güvenliği","icerikler":[{"ad":"Temel Kavramlar","url":"https://ismailkaya33.github.io/4.SINIF/Trafik/temelkavramlar.html"},{"ad":"Yaya Olarak Trafik Kuralları","url":"https://ismailkaya33.github.io/4.SINIF/Trafik/yayaolaraktrafikkurallarietkinligi.html"}]},{"ders":"Oyunlar","icerikler":[{"ad":"Uzaylı Toplama Macerası 2D 🚀","url":"https://ismailkaya33.github.io/4.SINIF/Oyunlar/toplamaoyun.html"},{"ad":"Maden Kâşifi 💎","url":"https://ismailkaya33.github.io/4.SINIF/Oyunlar/madenkasifi.html"},{"ad":"Çarpma Kahramanları","url":"https://ismailkaya33.github.io/4.SINIF/Oyunlar/carpmakahramanlari.html"},{"ad":"Ördek Avcısı – Çarpım Tablosu Macerası 🦆","url":"https://ismailkaya33.github.io/4.SINIF/Oyunlar/carpmaordekvurma.html"}]}];

function doGet() { return HtmlService.createHtmlOutputFromFile("OgretmenRapor").setTitle("4/D Ogretmen Raporu"); }
function ogretmenRaporVerisi() {
  const id=PropertiesService.getScriptProperties().getProperty("OZEL_TABLO_ID");
  if(!id||!/^[A-Za-z0-9_-]{20,}$/.test(id))throw Error("OZEL_TABLO_ID tanımlanmamış.");
  const ss=SpreadsheetApp.openById(id);
  if(!ss)throw Error('Rapor, özel öğrenci kayıt E-Tablosuna bağlı olmalıdır.');
  const kayit=ss.getSheetByName(RAPOR_KAYIT_SAYFASI_);
  const sonuc=ss.getSheetByName(RAPOR_SONUC_SAYFASI_);
  if(!kayit||!sonuc)throw Error('Sayfa1 veya ETKINLIK_SONUCLARI bulunamadı.');
  const pupils=kayit.getLastRow()>1
   ?kayit.getRange(2,1,kayit.getLastRow()-1,4).getDisplayValues():[];
  const roster={};
  pupils.forEach(function(r) {
    const no=String(r[0]).trim();
    if(!no||String(r[3]).trim().toUpperCase()==='TEST')return;
    roster[no]={no:no,ad:String(r[1]).trim()};
  });
  const rows=sonuc.getLastRow()>1
   ?sonuc.getRange(2,1,sonuc.getLastRow()-1,11).getValues():[];
  const results=[];
  const seen={};
  rows.forEach(function(r) {
    const no=String(r[1]).trim(),id=String(r[2]).trim(),outcome=String(r[3]).trim();
    const total=Number(r[6]),correct=Number(r[4]),wrong=Number(r[5]);
    if(!roster[no]||!id||!outcome||!Number.isSafeInteger(correct)||!Number.isSafeInteger(total)||total<1||correct<0||correct>total||!Number.isSafeInteger(wrong)||wrong<0||wrong>total||correct+wrong!==total)return;
    const key=String(r[0]).trim();
    if(!key||seen[key])return;
    seen[key]=true;
    const wrongAttempts=Number(r[7]),firstTry=Number(r[8]);
    results.push({no:no,id:id,outcome:outcome,correct:correct,total:total,
      wrongAttempts:Number.isSafeInteger(wrongAttempts)&&wrongAttempts>=0?wrongAttempts:null,
      firstTry:Number.isSafeInteger(firstTry)&&firstTry>=0&&firstTry<=total?firstTry:null,
      at:r[10] instanceof Date?r[10].getTime():0,order:results.length});
  });
  // Zorlanılan etkinlikler: ilk denemede doğru oranı en düşük olan etkinlik en üstte.
  const difficultyMap={};
  results.forEach(function(x){
    if(!difficultyMap[x.id])difficultyMap[x.id]={activityId:x.id,attempts:0,participants:{},firstTry:0,firstTryTotal:0,wrongAttempts:0,wrongAttemptCount:0};
    const v=difficultyMap[x.id];v.attempts++;v.participants[x.no]=true;
    if(x.firstTry!==null){v.firstTry+=x.firstTry;v.firstTryTotal+=x.total;}
    if(x.wrongAttempts!==null){v.wrongAttempts+=x.wrongAttempts;v.wrongAttemptCount++;}
  });
  const difficulty=Object.keys(difficultyMap).map(function(k){
    const v=difficultyMap[k];
    return {activityId:v.activityId,attempts:v.attempts,participantCount:Object.keys(v.participants).length,
      firstTryRate:v.firstTryTotal?v.firstTry/v.firstTryTotal:null,
      avgWrongAttempts:v.wrongAttemptCount?v.wrongAttempts/v.wrongAttemptCount:null};
  }).sort(function(a,b){
    const ar=a.firstTryRate===null?2:a.firstTryRate,br=b.firstTryRate===null?2:b.firstTryRate;
    return ar-br||(b.avgWrongAttempts||0)-(a.avgWrongAttempts||0);
  });
  const outcomeMap={};
  results.forEach(function(x) {
    const key=x.id+'|'+x.outcome;
    if(!outcomeMap[key])outcomeMap[key]={activityId:x.id,outcome:x.outcome,attempts:0,participants:{},correct:0,total:0};
    const v=outcomeMap[key];v.attempts++;v.participants[x.no]=true;v.correct+=x.correct;v.total+=x.total;
  });
  const outcomes=Object.keys(outcomeMap).map(function(k){
    const v=outcomeMap[k];
    return {activityId:v.activityId,outcome:v.outcome,attempts:v.attempts,participantCount:Object.keys(v.participants).length,correct:v.correct,total:v.total};
  });
  const perStudent=Object.keys(roster).map(function(no){
    const mine=results.filter(function(x){return x.no===no});
    const ids=[...new Set(mine.map(function(x){return x.id}))];
    return {no:no,ad:roster[no].ad,activityCount:ids.length,attemptCount:mine.length,correct:mine.reduce((n,x)=>n+x.correct,0),total:mine.reduce((n,x)=>n+x.total,0)};
  }).sort(function(a,b){return a.ad.localeCompare(b.ad,'tr')});
  /* KATALOG BASLA: rapor-etkinlik-kimlikleri — elle değiştirmeyin, portal/etkinlik-kayitlari.json dosyasını düzenleyin */
const allIds=["mat-kayipsayilar","mat-oruntuler","mat-dogalsayilar-degerlendirme","mat-toplamacikarma-1","mat-toplamacikarma-2","insan-sorumluluk","trafik-yaya","fen-besinlerdegerlendirme","tur-ikilemeler","mat-cikarmaislemi","fen-besinkasifleri","sos-oyunzamani","insan-farkliyasamlar","mat-cikarmadatahmin","mat-toplama-problemleri-sinav"]; // İzlenebilir etkinlikler
/* KATALOG BITIR: rapor-etkinlik-kimlikleri */
  results.forEach(function(x){if(allIds.indexOf(x.id)<0)allIds.push(x.id);});
  const activities=allIds.map(function(activityId){
    const attempted={};
    results.forEach(function(x){
      if(x.id===activityId){
        const current=attempted[x.no];
        if(!current || x.at>current.at || (x.at===current.at && x.order>current.order))attempted[x.no]=x;
      }
    });
    const studentStates=perStudent.map(function(st){
      const record=attempted[st.no];
      return {no:st.no,ad:st.ad,status:record?'Tamamlandı':'Henüz sonuç yok',
        correct:record?record.correct:null,total:record?record.total:null};
    });
    return {id:activityId,completed:Object.keys(attempted).length,waiting:perStudent.length-Object.keys(attempted).length,students:studentStates};
  });
  /* KATALOG BASLA: rapor-secili-etkinlikler — elle değiştirmeyin, portal/etkinlik-kayitlari.json dosyasını düzenleyin */
const selectedActivities=["Turkce/ikilemeler.html","Turkce/pekistirme.html","Turkce/sozavcıları.html","Matematik/cikarmaislemi.html","Fen/besinkasifleri.html","Fen/besinlerdegerlendirme.html","Sosyal/oyunzamani.html","Sosyal/kurtulus.html","Oyunlar/carpmaordekvurma.html","Matematik/dogalsayilardegerlendirme.html","Matematik/toplamacikarmaproblem1.html","Matematik/toplamacikarmaproblem2.html","Insanhaklari/insanolmasorumlulugu.html","Trafik/yayaolaraktrafikkurallarietkinligi.html","Insanhaklari/farkliyasamlar.html","Matematik/cikarmadatahmin.html","Matematik/mat-toplama-problemleri-sinav.html"];
/* KATALOG BITIR: rapor-secili-etkinlikler */
  const completionSheet=ss.getSheetByName('ETKINLIK_TAMAMLAMA');
  const completionRows=completionSheet&&completionSheet.getLastRow()>1
    ?completionSheet.getRange(2,1,completionSheet.getLastRow()-1,4).getDisplayValues():[];
  const declarations={};
  completionRows.forEach(function(row){
   const no=String(row[0]).trim(),activity=String(row[1]).trim(),kind=String(row[3]).trim();
   if(!roster[no]||selectedActivities.indexOf(activity)<0||kind!=='OGRENCI_BEYANI')return;
   if(!declarations[activity])declarations[activity]={};
   declarations[activity][no]=true;
  });
  const completionActivities=selectedActivities.map(function(activityId){
   const done=declarations[activityId]||{};
   const count=Object.keys(done).length;
   return {id:activityId,completed:count,waiting:Object.keys(roster).length-count,
    students:perStudent.map(function(st){return {no:st.no,ad:st.ad,status:done[st.no]?'Tamamladım bildirildi':'Henüz bildirim yok'};})};
  });
  const notebookCatalog={
    'Turkce':[['atasozleri.png','Atasözleri'],['deyimler.png','Deyimler'],['gercekmecaz.png','Gerçek, Mecaz ve Terim Anlam'],['ikilemeler.jpeg','İkilemeler'],['metninbolumleri.png','Metnin Bölümleri'],['pekistirme.JPG','Pekiştirme']],
    'Matematik':[['cikarmadaverilmeyen.png','Çıkarma İşleminde Verilmeyenler'],['cikarmadefternotu.png','Çıkarma İşlemi'],['toplama.png','Toplama'],['toplamacikarmaproblemleri.png','Toplama ve Çıkarma Problemleri'],['zihindencikarma.png','Zihinden Çıkarma'],['zihindentoplama.png','Zihinden Toplama']],
    'Fen':[['besinler1.png','Besinler 1'],['besinler2.png','Besinler 2'],['besinler3.png','Besinler 3'],['besinlerintazeligi.png','Besinlerin Tazeliği'],['besinlerisaklama.png','Besinleri Saklama']],
    'Sosyal':[['ailemcocuk.jpg','Ailem ve Çocuk'],['ailetarihi.png','Aile Tarihi'],['cocukoyun.png','Çocuk Oyunları'],['farkliliklarimizvesaygi.png','Farklılıklara Saygı'],['mersinkultur.png','Mersin Kültürü'],['millikultur.png','Millî Kültür'],['millimucadele1.png','Millî Mücadele 1'],['millimucadele2.png','Millî Mücadele 2'],['millimucadele3.png','Millî Mücadele 3'],['millimucadele4.png','Millî Mücadele 4'],['millimucadele5.png','Millî Mücadele 5'],['millimucadele6.png','Millî Mücadele 6'],['millimucadele7.png','Millî Mücadele 7']]
  };
  const notebookNames={'Turkce':'Türkçe','Matematik':'Matematik','Fen':'Fen Bilimleri','Sosyal':'Sosyal Bilgiler'};
  const notebookItems=[];
  Object.keys(notebookCatalog).forEach(function(dir){
    notebookCatalog[dir].forEach(function(row){notebookItems.push({id:dir+'/'+row[0],title:notebookNames[dir]+' • '+row[1]});});
  });
  const notebookSheet=ss.getSheetByName('DEFTER_TAMAMLAMA');
  const notebookRows=notebookSheet&&notebookSheet.getLastRow()>1
    ?notebookSheet.getRange(2,1,notebookSheet.getLastRow()-1,2).getDisplayValues():[];
  const notebookDone={};
  const allowedNotes={};
  notebookItems.forEach(function(note){allowedNotes[note.id]=true;});
  notebookRows.forEach(function(row){
    const no=String(row[0]).trim(),rawId=String(row[1]).trim();
    const id=rawId==='Turkce/atasozleri.jpeg'?'Turkce/atasozleri.png':rawId==='Turkce/deyimler.jpeg'?'Turkce/deyimler.png':rawId;
    if(!roster[no]||!allowedNotes[id])return;
    if(!notebookDone[id])notebookDone[id]={};
    notebookDone[id][no]=true;
  });
  const notebooks=notebookItems.map(function(note){
    const done=notebookDone[note.id]||{},finished=[],notYet=[];
    perStudent.forEach(function(st){(done[st.no]?finished:notYet).push(st.ad);});
    return {id:note.id,title:note.title,completed:finished.length,
      waiting:notYet.length,completedStudents:finished,waitingStudents:notYet};
  });
  const questionSheet=ss.getSheetByName('ETKINLIK_SORU_SONUCLARI');
  const questionRows=questionSheet&&questionSheet.getLastRow()>1?questionSheet.getRange(2,1,questionSheet.getLastRow()-1,7).getValues():[];
  const questionResults=[];
  questionRows.forEach(function(row){
    const no=String(row[1]).trim(),activity=String(row[2]).trim(),attempt=String(row[3]).trim(),question=Number(row[4]);
    if(!roster[no]||activity!=='fen-besinlerdegerlendirme'||!/^[A-Za-z0-9_-]{12,80}$/.test(attempt)||!Number.isSafeInteger(question)||question<1||question>200)return;
    let choices;try{choices=JSON.parse(String(row[5]));}catch(e){return;}
    if(!Array.isArray(choices)||!choices.length||choices.length>20||choices.some(function(x){return !['correct','wrong','unanswered'].includes(x)}))return;
    questionResults.push({ad:roster[no].ad,attemptId:attempt.slice(-8),question:question,choices:choices});
  });
  questionResults.sort(function(a,b){return a.ad.localeCompare(b.ad,'tr')||a.attemptId.localeCompare(b.attemptId)||a.question-b.question;});
  return {studentCount:Object.keys(roster).length,recordCount:results.length,
    dersIcerikleri:RAPOR_DERS_ICERIKLERI_,outcomes:outcomes,difficulty:difficulty,students:perStudent,activities:activities,
    completionActivities:completionActivities,notebooks:notebooks,questionResults:questionResults};
}
