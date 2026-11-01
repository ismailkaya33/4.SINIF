/**
 * 4/D — Sonuç kaydı doğrulama testleri. Gerçek öğrenci verisi kullanmaz.
 * EtkinlikSonuclari.gs ile AYNI Apps Script projesinde, yalnız öğretmen
 * düzenleyiciden "sonucDogrulamaTestiniCalistir" fonksiyonunu çalıştırır.
 * E-Tabloya yazmaz, bir öğrencinin oturumunu açmaz.
 */
function sonucDogrulamaTestiniCalistir() {
  const temel={
    activityId:'mat-kayipsayilar',attemptId:'test_attempt_123456',
    correct:8,wrong:2,total:10,wrongAttempts:3,firstTry:6,durationSeconds:120
  };
  const denemeler=[
    ['normal sonuç',{},true],
    ['bilinmeyen etkinlik',{activityId:'yetkisiz-etkinlik'},false],
    ['bozuk deneme kimliği',{attemptId:'1'},false],
    ['eksik toplam',{total:11},false],
    ['ondalıklı sonuç',{correct:8.5},false],
    ['negatif deneme',{wrongAttempts:-1},false],
    ['aşırı süre',{durationSeconds:86401},false],
    ['aşırı ilk deneme',{firstTry:9},false],
    ['azami süre',{durationSeconds:86400},true]
  ];
  const hatalar=[];
  denemeler.forEach(function(senaryo){
    const veri=Object.assign({},temel,senaryo[1]);
    const gercek=Boolean(etkinlikSonucuDogrula_(veri));
    if(gercek!==senaryo[2])hatalar.push(senaryo[0]);
  });
  if(hatalar.length)throw Error('Sonuç doğrulama testleri başarısız: '+hatalar.join(', '));
  return {basarili:true,testSayisi:denemeler.length};
}
