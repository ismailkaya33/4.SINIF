/** Geçici test: canlı öğrenci verisi üretmez. Testi bir kez çalıştırdıktan sonra dosyayı kaldırabilirsiniz. */
function dortD_MisafirSonucTesti() {
  const login = ogrenciGirisiYap('TEST40');
  if (!login || !login.basarili || !login.misafir || !login.token) {
    throw new Error('MİSAFİR girişi açılamadı.');
  }
  const attemptId = 'pilot_' + Utilities.getUuid().replace(/-/g, '');
  const key = '0:mat-kayipsayilar:' + attemptId;
  let sonuc, tekrar, cikis;
  try {
    const payload = {
      activityId: 'mat-kayipsayilar', attemptId,
      correct: 8, wrong: 2, total: 10,
      wrongAttempts: 3, firstTry: 7, durationSeconds: 120
    };
    sonuc = etkinlikSonucuKaydet(login.token, payload);
    if (!sonuc || !sonuc.basarili) throw new Error('Sonuç kaydı başarısız: ' + JSON.stringify(sonuc));
    tekrar = etkinlikSonucuKaydet(login.token, payload);
    if (!tekrar || !tekrar.basarili || tekrar.tekrar !== true) {
      throw new Error('Aynı deneme iki kez kaydedilebilir görünüyor.');
    }
  } finally {
    cikis = cikisYap(login.token);
  }
  if (cikis !== true) throw new Error('Test oturumu silinemedi.');
  const gecersiz = etkinlikSonucuKaydet(login.token, {
    activityId: 'mat-kayipsayilar', attemptId: 'after_' + attemptId,
    correct: 8, wrong: 2, total: 10,
    wrongAttempts: 3, firstTry: 7, durationSeconds: 120
  });
  if (gecersiz && gecersiz.basarili) throw new Error('Çıkış sonrası sonuç kaydı kabul edildi.');
  Logger.log('TEST BAŞARILI: İlk kayıt, tekrar koruması ve çıkış sonrası ret doğrulandı.');
  Logger.log('ETKINLIK_SONUCLARI tablosunda test satırını elle temizleyebilirsiniz: ' + key);
}
