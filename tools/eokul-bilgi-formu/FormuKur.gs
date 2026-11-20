/**
 * 4/D — e-Okul Öğrenci Bilgi Formu (Google Form kurucu)
 * ------------------------------------------------------------------
 * Okulun kâğıt "Öğrenci Bilgi Formu"nun dijital hâli.
 *
 *   formuKur()           → Veli formunu ve yalnız öğretmenin göreceği cevap
 *                          tablosunu kurar. BİR KEZ çalıştırılır.
 *   kontrolGuncelle()    → Her yeni (ya da düzeltilen) cevapta kendiliğinden
 *                          çalışır; tablodaki "Kontrol" ve "e-Okul Kartı"
 *                          sayfalarını günceller. Elle de çalıştırılabilir.
 *   baglantilariGoster() → Form ve tablo bağlantılarını yeniden yazar.
 *
 * Gizlilik: Bu kodda hiçbir öğrenci bilgisi yoktur. Cevaplar yalnız
 * öğretmenin kendi Google Drive'ında durur. e-Okul'a giriş bitince form ve
 * tablo Drive'dan silinir (formun açıklamasında velilere böyle söz verildi).
 */

var SINIF = '4/D';
var FORM_ADI = '4/D Öğrenci Bilgi Formu (e-Okul)';
var TABLO_ADI = '4/D Öğrenci Bilgi Formu — Cevaplar (GİZLİ)';
var KARDES_EN_FAZLA = 7;
var SAAT_DILIMI = 'Europe/Istanbul';

var EVET_HAYIR = ['Hayır', 'Evet'];
var OGRENIM = ['Okuma-yazma bilmiyor', 'Okur-yazar', 'İlkokul', 'Ortaokul', 'Lise',
  'Ön lisans', 'Lisans (üniversite)', 'Yüksek lisans', 'Doktora'];
var KARDES_OGRENIM = ['Okula başlamadı', 'Okul öncesi (anaokulu)', 'İlkokul', 'Ortaokul',
  'Lise', 'Üniversite', 'Mezun / çalışıyor', 'Okula gitmiyor'];
var KAN = ['0 Rh+', '0 Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', 'Bilmiyorum'];
var GELIR = ['Çok iyi', 'İyi', 'Orta', 'Düşük', 'Çok kötü', 'Belirtmek istemiyorum'];
var VELI_ANNE = 'Anne';
var VELI_BABA = 'Baba';
var VELI_DIGER = 'Diğer (dede, teyze, vasi vb.)';

var DESEN = {
  tc: { d: '^[1-9][0-9]{10}$', m: '11 haneli T.C. kimlik numarasını boşluksuz yazın.' },
  cep: { d: '^05[0-9]{9}$', m: 'Cep numarasını başında 0 ile, boşluksuz yazın. Örnek: 05321234567' },
  tel: { d: '^0[0-9]{10}$', m: 'Numarayı alan koduyla, başında 0 ile, boşluksuz yazın. Örnek: 03241234567' }
};

/* ---------- Soru başlıkları (tablodaki sütun adları da bunlar) ---------- */

var T = {
  ad: 'Öğrencinin adı soyadı',
  no: 'Okul numarası',
  tc: 'Öğrencinin T.C. kimlik no',
  dYer: 'Doğum yeri',
  dTar: 'Doğum tarihi',
  nKayit: 'Nüfus cüzdanı seri / kayıt no',
  nVer: 'Nüfus cüzdanı veriliş tarihi',
  kan: 'Kan grubu',
  din: 'Dini (isteğe bağlı)',
  kiminle: 'Öğrenci kiminle oturuyor?',
  ev: 'Oturduğunuz ev',
  oda: 'Öğrencinin kendi odası var mı?',
  isinma: 'Ev ne ile ısınıyor?',
  ulasim: 'Öğrenci okula nasıl geliyor?',
  calisma: 'Öğrenci bir işte çalışıyor mu?',
  aileDisi: 'Aile dışında kalan var mı?',
  boy: 'Boyu (cm)',
  kilo: 'Kilosu (kg)',
  sehit: 'Şehit çocuğu mu?',
  yurtdisi: 'Yurt dışından mı geldi?',
  koruma: 'Devlet koruması altında mı? (koruyucu aile, sevgi evleri; eski adıyla SHÇEK)',
  gelir: 'Aile gelir durumu (isteğe bağlı)',
  ozur: 'Engel / özür türü (varsa)',
  kaza: 'Geçirdiği kaza (varsa)',
  ameliyat: 'Geçirdiği ameliyat (varsa)',
  protez: 'Kullandığı protez ya da cihaz (gözlük, işitme cihazı vb.)',
  hastalik: 'Geçirdiği önemli hastalık (varsa)',
  surekliHastalik: 'Öğrencinin sürekli hastalığı (varsa)',
  ilac: 'Sürekli kullandığı ilaç (varsa)',
  veliKim: 'Öğrencinin velisi kim?',
  sms: "SMS'lerin gideceği cep numarası",
  vAd: 'Velinin adı soyadı',
  vYakin: 'Velinin öğrenciye yakınlığı',
  vTc: 'Velinin T.C. kimlik no',
  vCep: 'Velinin cep telefonu',
  acilAd: 'Acil durumda ulaşılacak kişi (veli dışında): adı soyadı ve yakınlığı',
  acilTel: 'Acil durumda ulaşılacak kişinin telefonu',
  adres: 'Ev adresi',
  kardesSayisi: 'Kardeş sayısı (öğrencinin kendisi dahil)',
  kardesVar: 'Öğrencinin kendisinden başka kardeşi var mı?',
  dolduran: 'Formu dolduran velinin adı soyadı',
  onay: 'Onay'
};

function ebeveynT_(g, y) {
  return {
    ad: g + ' adı soyadı',
    tc: g + ' T.C. kimlik no',
    sag: y + ' hayatta mı?',
    birlikte: y + ' öğrenciyle birlikte mi yaşıyor?',
    ogrenim: g + ' öğrenim durumu',
    meslek: g + ' mesleği',
    eposta: g + ' e-posta adresi (varsa)',
    hastalik: g + ' sürekli hastalığı (varsa)',
    engel: g + ' engel durumu (varsa)',
    cep: g + ' cep telefonu',
    ev: g + ' ev telefonu (varsa)',
    is: g + ' iş telefonu (varsa)'
  };
}
var TB = ebeveynT_('Babanın', 'Baba');
var TA = ebeveynT_('Annenin', 'Anne');

function kardesT_(k) {
  return {
    ad: k + '. kardeşin adı soyadı',
    dTar: k + '. kardeşin doğum tarihi',
    ogrenim: k + '. kardeşin öğrenim durumu',
    hastalik: k + '. kardeşin sürekli hastalığı (varsa)',
    birlikte: k + '. kardeş öğrenciyle birlikte mi yaşıyor?',
    devam: 'Başka kardeşi daha var mı? (' + k + '. kardeşten sonra)'
  };
}

/* ======================= 1) FORMU KUR ======================= */

function formuKur() {
  var props = PropertiesService.getScriptProperties();
  if (props.getProperty('FORM_ID')) {
    throw new Error('Form zaten kurulmuş. Bağlantılar için "baglantilariGoster" fonksiyonunu çalıştırın.');
  }

  var form = FormApp.create(FORM_ADI);
  formOlustur_(form);

  var ss = SpreadsheetApp.create(TABLO_ADI);
  tabloSayfalariniHazirla_(ss);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  props.setProperties({ FORM_ID: form.getId(), TABLO_ID: ss.getId() });
  cevapSayfasiniAdlandir_(ss.getId());

  ScriptApp.newTrigger('kontrolGuncelle').forForm(form).onFormSubmit().create();
  kontrolGuncelle();
  baglantilariGoster();
}

function formOlustur_(form) {
  form.setDescription(
    'Bu form, okulumuzun istediği "Öğrenci Bilgi Formu"nun dijital hâlidir. Bilgiler, ' +
    SINIF + ' sınıf öğretmeni tarafından MEB e-Okul sistemine girilmek için toplanır.\n\n' +
    '• Cevapları yalnızca sınıf öğretmeni görür; başka velilere ya da internette açık bir yere gitmez.\n' +
    '• Bilgiler e-Okul\'a girildikten sonra bu formun cevapları silinir.\n' +
    '• Yıldızlı (*) sorular zorunludur. Din, gelir durumu ve sağlık soruları isteğe bağlıdır; boş bırakabilirsiniz.\n' +
    '• Her öğrenci için formu bir kez doldurun. Kardeşi de bu sınıftaysa her biri için ayrı doldurun.\n\n' +
    'Doldurmak yaklaşık 10 dakika sürer. Kimlik kartlarınızı yanınızda bulundurmanız işinizi kolaylaştırır.'
  );
  form.setConfirmationMessage(
    'Teşekkürler! Bilgileriniz öğretmene ulaştı. Bir yanlışlık fark ederseniz ' +
    '"Yanıtınızı düzenleyin" bağlantısından düzeltebilirsiniz.'
  );
  form.setCollectEmail(false);
  form.setAllowResponseEdits(true);
  form.setPublishingSummary(false);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);

  // --- Öğrenci bilgileri (ilk sayfa) ---
  form.addSectionHeaderItem().setTitle('ÖĞRENCİ BİLGİLERİ');
  metin_(form, T.ad, { zorunlu: true });
  metin_(form, T.no, { zorunlu: true, tamSayi: true, yardim: 'Bilmiyorsanız öğrenciye sorun ya da öğretmene yazın.' });
  metin_(form, T.tc, { zorunlu: true, desen: DESEN.tc });
  metin_(form, T.dYer, { zorunlu: true, yardim: 'İl / ilçe' });
  tarih_(form, T.dTar, true);
  metin_(form, T.nKayit, { yardim: 'Yeni kimlik kartında "Seri No"; eski nüfus cüzdanında "Cilt / Aile sıra / Sıra no". Bilmiyorsanız boş bırakın.' });
  tarih_(form, T.nVer, false);
  liste_(form, T.kan, KAN, true);
  metin_(form, T.din, { yardim: 'İstemiyorsanız boş bırakın.' });

  // --- Genel bilgiler ---
  sayfa_(form, 'GENEL BİLGİLER', '');
  secim_(form, T.kiminle, ['Anne ve babasıyla', 'Annesiyle', 'Babasıyla', 'Akrabasıyla'], true, true);
  secim_(form, T.ev, ['Kira', 'Kendi evimiz', 'Lojman', 'Akraba evi'], true, true);
  secim_(form, T.oda, EVET_HAYIR, true, false);
  secim_(form, T.isinma, ['Doğal gaz (kombi)', 'Merkezi sistem', 'Soba', 'Klima / elektrikli ısıtıcı'], true, true);
  secim_(form, T.ulasim, ['Yürüyerek', 'Okul servisiyle', 'Aile aracıyla', 'Toplu taşımayla'], true, true);
  secim_(form, T.calisma, EVET_HAYIR, true, false);
  secim_(form, T.aileDisi, EVET_HAYIR, true, false);
  metin_(form, T.boy, { tamSayi: true, yardim: 'Yaklaşık olabilir. Örnek: 140' });
  metin_(form, T.kilo, { tamSayi: true, yardim: 'Yaklaşık olabilir. Örnek: 35' });
  secim_(form, T.sehit, EVET_HAYIR, true, false);
  secim_(form, T.yurtdisi, EVET_HAYIR, true, false);
  secim_(form, T.koruma, EVET_HAYIR, true, false);
  secim_(form, T.gelir, GELIR, false, false);

  // --- Sağlık (tamamı isteğe bağlı) ---
  sayfa_(form, 'SAĞLIK BİLGİLERİ', 'Bu sayfadaki soruların hepsi isteğe bağlıdır. Yoksa boş bırakın.');
  metin_(form, T.ozur, {});
  metin_(form, T.kaza, {});
  metin_(form, T.ameliyat, {});
  metin_(form, T.protez, {});
  metin_(form, T.hastalik, {});
  metin_(form, T.surekliHastalik, {});
  metin_(form, T.ilac, {});

  // --- Veli ---
  sayfa_(form, 'VELİ BİLGİLERİ', '');
  var veliKim = form.addMultipleChoiceItem().setTitle(T.veliKim).setRequired(true);
  metin_(form, T.sms, { zorunlu: true, desen: DESEN.cep, yardim: 'Okulun e-Okul SMS\'leri bu numaraya gelir.' });

  var digerVeliSayfa = sayfa_(form, 'VELİ BİLGİLERİ (anne-baba dışında)', 'Veli anne ya da baba değilse doldurulur.');
  metin_(form, T.vAd, { zorunlu: true });
  metin_(form, T.vYakin, { zorunlu: true, yardim: 'Örnek: dedesi, teyzesi, vasisi' });
  metin_(form, T.vTc, { zorunlu: true, desen: DESEN.tc });
  metin_(form, T.vCep, { zorunlu: true, desen: DESEN.cep });

  // --- Baba / Anne ---
  var babaSayfa = sayfa_(form, 'BABA BİLGİLERİ', '');
  ebeveynSorulari_(form, TB);
  sayfa_(form, 'ANNE BİLGİLERİ', '');
  ebeveynSorulari_(form, TA);

  veliKim.setChoices([
    veliKim.createChoice(VELI_ANNE, babaSayfa),
    veliKim.createChoice(VELI_BABA, babaSayfa),
    veliKim.createChoice(VELI_DIGER, digerVeliSayfa)
  ]);

  // --- Ulaşılacak kişi + adres ---
  sayfa_(form, 'VELİ DIŞINDA ULAŞILACAK KİŞİ VE EV ADRESİ', '');
  metin_(form, T.acilAd, { zorunlu: true, yardim: 'Örnek: Ayşe Yılmaz (teyzesi)' });
  metin_(form, T.acilTel, { zorunlu: true, desen: DESEN.cep });
  form.addParagraphTextItem().setTitle(T.adres).setRequired(true)
    .setHelpText('Mahalle, cadde/sokak, bina no, daire no, ilçe / il');

  // --- Kardeşler ---
  sayfa_(form, 'KARDEŞ BİLGİLERİ', '');
  metin_(form, T.kardesSayisi, { zorunlu: true, aralik: [1, 20], yardim: 'Tek çocuksa 1 yazın.' });
  var kardesVar = form.addMultipleChoiceItem().setTitle(T.kardesVar).setRequired(true);

  var kardesSayfalari = [];
  var devamSorulari = [];
  for (var k = 1; k <= KARDES_EN_FAZLA; k++) {
    var kt = kardesT_(k);
    kardesSayfalari.push(sayfa_(form, k + '. KARDEŞ', k === KARDES_EN_FAZLA
      ? KARDES_EN_FAZLA + '\'den fazla kardeş varsa kalanları öğretmene yazınız.' : ''));
    metin_(form, kt.ad, { zorunlu: true });
    tarih_(form, kt.dTar, true);
    liste_(form, kt.ogrenim, KARDES_OGRENIM, true);
    metin_(form, kt.hastalik, {});
    secim_(form, kt.birlikte, ['Birlikte', 'Ayrı'], true, false);
    if (k < KARDES_EN_FAZLA) {
      devamSorulari.push(form.addMultipleChoiceItem().setTitle(kt.devam).setRequired(true));
    }
  }

  // --- Onay ---
  var onaySayfa = sayfa_(form, 'ONAY', '');
  metin_(form, T.dolduran, { zorunlu: true });
  form.addCheckboxItem().setTitle(T.onay).setRequired(true)
    .setChoiceValues(['Bilgileri kontrol ettim, doğrudur.']);

  kardesVar.setChoices([
    kardesVar.createChoice('Evet', kardesSayfalari[0]),
    kardesVar.createChoice('Hayır', onaySayfa)
  ]);
  for (var i = 0; i < devamSorulari.length; i++) {
    devamSorulari[i].setChoices([
      devamSorulari[i].createChoice('Evet', kardesSayfalari[i + 1]),
      devamSorulari[i].createChoice('Hayır', onaySayfa)
    ]);
  }

  // Yeni Google Forms yayın ayarı (varsa): formu yayımla ve cevap kabul et.
  if (typeof form.setPublished === 'function') form.setPublished(true);
  form.setAcceptingResponses(true);
}

function ebeveynSorulari_(form, t) {
  metin_(form, t.ad, { zorunlu: true });
  metin_(form, t.tc, { desen: DESEN.tc, yardim: 'Biliyorsanız yazın. Veli bu kişiyse mutlaka yazın.' });
  secim_(form, t.sag, ['Hayatta', 'Vefat etti'], true, false);
  secim_(form, t.birlikte, ['Birlikte', 'Ayrı'], true, false);
  liste_(form, t.ogrenim, OGRENIM, false);
  metin_(form, t.meslek, {});
  metin_(form, t.eposta, { eposta: true });
  metin_(form, t.hastalik, {});
  metin_(form, t.engel, {});
  metin_(form, t.cep, { desen: DESEN.cep });
  metin_(form, t.ev, { desen: DESEN.tel });
  metin_(form, t.is, { desen: DESEN.tel });
}

/* ---------- Form yardımcıları ---------- */

function metin_(form, baslik, o) {
  o = o || {};
  var it = form.addTextItem().setTitle(baslik);
  if (o.yardim) it.setHelpText(o.yardim);
  if (o.zorunlu) it.setRequired(true);
  var v = null;
  if (o.desen) {
    v = FormApp.createTextValidation().setHelpText(o.desen.m).requireTextMatchesPattern(o.desen.d).build();
  } else if (o.aralik) {
    v = FormApp.createTextValidation().setHelpText('Sayı yazın (' + o.aralik[0] + '–' + o.aralik[1] + ').')
      .requireNumberBetween(o.aralik[0], o.aralik[1]).build();
  } else if (o.tamSayi) {
    v = FormApp.createTextValidation().setHelpText('Yalnız rakam yazın.').requireWholeNumber().build();
  } else if (o.eposta) {
    v = FormApp.createTextValidation().setHelpText('Geçerli bir e-posta adresi yazın.').requireTextIsEmail().build();
  }
  if (v) it.setValidation(v);
  return it;
}

function secim_(form, baslik, secenekler, zorunlu, diger) {
  var it = form.addMultipleChoiceItem().setTitle(baslik).setChoiceValues(secenekler).setRequired(!!zorunlu);
  if (diger) it.showOtherOption(true);
  return it;
}

function liste_(form, baslik, secenekler, zorunlu) {
  return form.addListItem().setTitle(baslik).setChoiceValues(secenekler).setRequired(!!zorunlu);
}

function tarih_(form, baslik, zorunlu) {
  return form.addDateItem().setTitle(baslik).setRequired(!!zorunlu);
}

function sayfa_(form, baslik, aciklama) {
  var p = form.addPageBreakItem().setTitle(baslik);
  if (aciklama) p.setHelpText(aciklama);
  return p;
}

/* ======================= 2) TABLO ======================= */

var SAYFA_KONTROL = 'Kontrol';
var SAYFA_KART = 'e-Okul Kartı';
var SAYFA_VERI = 'Veri';
var KART_ILK_SATIR = 4;

function tabloSayfalariniHazirla_(ss) {
  var kontrol = ss.getSheets()[0].setName(SAYFA_KONTROL);
  var kart = ss.insertSheet(SAYFA_KART);
  var veri = ss.insertSheet(SAYFA_VERI);

  var satirlar = kartSatirlari_({});
  var gerekenSutun = satirlar.length + 2;
  if (veri.getMaxColumns() < gerekenSutun) {
    veri.insertColumnsAfter(veri.getMaxColumns(), gerekenSutun - veri.getMaxColumns());
  }
  var basliklar = ['Öğrenci', 'Kontrol edilecekler'].concat(satirlar.map(function (s) { return s[0]; }));
  veri.getRange(1, 1, 1, basliklar.length).setValues([basliklar]).setFontWeight('bold');
  veri.hideSheet();

  // e-Okul Kartı: üstte öğrenci seçme kutusu, altta e-Okul sırasıyla alanlar.
  kart.getRange('A1').setValue('Öğrenci seçin →').setFontWeight('bold');
  kart.getRange('B1').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(veri.getRange('A2:A500'), true)
      .setAllowInvalid(false).build()
  ).setBackground('#fff4c2').setFontWeight('bold');
  kart.getRange('A2').setValue('Kontrol edilecekler').setFontWeight('bold');
  kart.getRange('B2').setFontColor('#b3261e').setWrap(true);

  var r = KART_ILK_SATIR;
  for (var i = 0; i < satirlar.length; i++, r++) {
    var etiket = satirlar[i][0];
    if (satirlar[i].length === 1) {
      kart.getRange(r, 1, 1, 2).setBackground('#1f3a5f').setFontColor('#ffffff').setFontWeight('bold');
    }
    kart.getRange(r, 1).setValue(etiket);
  }
  kartFormulleriniYaz_(kart);
  kart.setColumnWidth(1, 260);
  kart.setColumnWidth(2, 420);
  kart.setFrozenRows(2);

  // Kontrol sayfası başlıkları
  kontrol.getRange(2, 1, 1, 6).setValues([[
    'Okul No', 'Öğrenci', 'Son gönderim', 'Kaç kez gönderildi', 'Kontrol edilecekler', "e-Okul'a girildi"
  ]]).setFontWeight('bold').setBackground('#e8eef6');
  kontrol.setFrozenRows(2);
  kontrol.setColumnWidth(2, 200);
  kontrol.setColumnWidth(3, 130);
  kontrol.setColumnWidth(5, 420);
}

/** Türkçe tablolarda formül ayracı ";" olabilir; tablonun kabul ettiği ayracı deneyerek bulur. */
function formulAyraci_(sayfa) {
  var h = sayfa.getRange('D1');
  h.setFormula('=IF(1=1,1,0)');
  SpreadsheetApp.flush();
  var hatali = String(h.getDisplayValue()).charAt(0) === '#';
  h.clearContent();
  return hatali ? ';' : ',';
}

function kartFormulu_(sutun, a) {
  return '=IF($B$1=""' + a + '""' + a + 'IFERROR(INDEX(' + SAYFA_VERI + '!$2:$500' + a + 'MATCH($B$1' + a +
    SAYFA_VERI + '!$A$2:$A$500' + a + '0)' + a + sutun + ')' + a + '""))';
}

function kartFormulleriniYaz_(kart) {
  var a = formulAyraci_(kart);
  kart.getRange('B2').setFormula(kartFormulu_(2, a));
  var satirlar = kartSatirlari_({});
  for (var i = 0; i < satirlar.length; i++) {
    var hucre = kart.getRange(KART_ILK_SATIR + i, 2);
    if (satirlar[i].length === 1) hucre.clearContent();
    else hucre.setFormula(kartFormulu_(i + 3, a));
  }
}

/** Kurulu tabloda e-Okul Kartı formüllerini yeniden yazar (#ERROR! düzeltmesi). */
function kartiOnar() {
  var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('TABLO_ID'));
  kartFormulleriniYaz_(ss.getSheetByName(SAYFA_KART));
  console.log('e-Okul Kartı formülleri yeniden yazıldı.');
}

function cevapSayfasiniAdlandir_(tabloId) {
  for (var deneme = 0; deneme < 10; deneme++) {
    SpreadsheetApp.flush();
    var ss = SpreadsheetApp.openById(tabloId);
    var bagli = ss.getSheets().filter(function (s) { return !!s.getFormUrl(); })[0];
    if (bagli) {
      bagli.setName('Cevaplar (ham)');
      ss.setActiveSheet(bagli);
      ss.moveActiveSheet(ss.getNumSheets());
      ss.setActiveSheet(ss.getSheetByName(SAYFA_KONTROL));
      return;
    }
    Utilities.sleep(1500);
  }
}

/* ======================= 3) KONTROL GÜNCELLE ======================= */

function kontrolGuncelle() {
  var kilit = LockService.getScriptLock();
  if (!kilit.tryLock(30000)) return;
  try {
    var props = PropertiesService.getScriptProperties();
    var form = FormApp.openById(props.getProperty('FORM_ID'));
    var ss = SpreadsheetApp.openById(props.getProperty('TABLO_ID'));

    var ogrenciler = sonCevaplar_(form.getResponses().map(cevapNesnesi_));
    var kontrol = ss.getSheetByName(SAYFA_KONTROL);
    var veri = ss.getSheetByName(SAYFA_VERI);

    // Önceki "girildi" işaretlerini koru
    var girildi = {};
    var son = kontrol.getLastRow();
    if (son >= 3) {
      kontrol.getRange(3, 1, son - 2, 6).getValues().forEach(function (s) {
        girildi[String(s[0])] = s[5] === true;
      });
      kontrol.getRange(3, 1, son - 2, 6).clearContent().clearDataValidations().clearFormat();
    }
    var sonVeri = veri.getLastRow();
    if (sonVeri >= 2) veri.getRange(2, 1, sonVeri - 1, veri.getLastColumn()).clearContent();

    kontrol.getRange('A1').setValue(
      SINIF + ' Öğrenci Bilgi Formu — gelen form: ' + ogrenciler.length +
      ' öğrenci  ·  son güncelleme: ' + Utilities.formatDate(new Date(), SAAT_DILIMI, 'dd.MM.yyyy HH:mm')
    ).setFontWeight('bold');

    if (!ogrenciler.length) return;

    var kontrolSatir = ogrenciler.map(function (c) {
      return [c[T.no] || '?', c[T.ad] || '', c.__zaman, c.__kac, eksikler_(c).join(' • ') || 'Sorun yok',
        girildi[String(c[T.no] || '?')] === true];
    });
    kontrol.getRange(3, 1, kontrolSatir.length, 6).setValues(kontrolSatir);
    kontrol.getRange(3, 6, kontrolSatir.length, 1).insertCheckboxes();
    kontrol.getRange(3, 5, kontrolSatir.length, 1).setWrap(true);

    var veriSatir = ogrenciler.map(function (c) {
      return [anahtar_(c), eksikler_(c).join(' • ') || 'Sorun yok'].concat(
        kartSatirlari_(c).map(function (s) { return s.length === 1 ? '' : String(s[1] == null ? '' : s[1]); })
      );
    });
    var hedef = veri.getRange(2, 1, veriSatir.length, veriSatir[0].length);
    hedef.setNumberFormat('@');
    hedef.setValues(veriSatir);
  } finally {
    kilit.releaseLock();
  }
}

function baglantilariGoster() {
  var props = PropertiesService.getScriptProperties();
  var form = FormApp.openById(props.getProperty('FORM_ID'));
  var ss = SpreadsheetApp.openById(props.getProperty('TABLO_ID'));
  var kisa = form.getPublishedUrl();
  try { kisa = form.shortenFormUrl(kisa); } catch (e) { /* kısaltılamazsa uzun bağlantı */ }
  console.log('VELİLERE GÖNDERİLECEK BAĞLANTI: ' + kisa);
  console.log('Formu düzenlemek için: ' + form.getEditUrl());
  console.log('Cevap tablosu (yalnız siz): ' + ss.getUrl());
}

/* ---------- Saf yardımcılar (Google'a bağlı değil, bilgisayarda test edilir) ---------- */

function cevapNesnesi_(r) {
  var c = {};
  r.getItemResponses().forEach(function (ir) {
    var v = ir.getResponse();
    c[ir.getItem().getTitle()] = Array.isArray(v) ? v.join(', ') : v;
  });
  c.__zaman = Utilities.formatDate(r.getTimestamp(), SAAT_DILIMI, 'dd.MM.yyyy HH:mm');
  return c;
}

/** Aynı okul numarasıyla birden çok gönderim varsa en sonuncusunu tutar. */
function sonCevaplar_(liste) {
  var harita = {};
  var sira = [];
  liste.forEach(function (c) {
    var no = String(c[T.no] || '').trim();
    var key = no || ('?' + (c[T.ad] || ''));
    var onceki = harita[key];
    c.__kac = onceki ? onceki.__kac + 1 : 1;
    if (!onceki) sira.push(key);
    harita[key] = c;
  });
  return sira.map(function (k) { return harita[k]; }).sort(function (a, b) {
    return (Number(a[T.no]) || 9999) - (Number(b[T.no]) || 9999);
  });
}

function anahtar_(c) {
  return (c[T.no] || '?') + ' – ' + (c[T.ad] || '');
}

function tcGecerli_(tc) {
  tc = String(tc || '').trim();
  if (!/^[1-9][0-9]{10}$/.test(tc)) return false;
  var d = tc.split('').map(Number);
  var tek = d[0] + d[2] + d[4] + d[6] + d[8];
  var cift = d[1] + d[3] + d[5] + d[7];
  if ((((tek * 7 - cift) % 10) + 10) % 10 !== d[9]) return false;
  var top = 0;
  for (var i = 0; i < 10; i++) top += d[i];
  return top % 10 === d[10];
}

function tarihTr_(s) {
  s = String(s || '');
  var m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? m[3] + '.' + m[2] + '.' + m[1] : s;
}

function veliBilgisi_(c) {
  var kim = c[T.veliKim] || '';
  if (kim === VELI_ANNE) return { kim: 'Anne', ad: c[TA.ad], tc: c[TA.tc] };
  if (kim === VELI_BABA) return { kim: 'Baba', ad: c[TB.ad], tc: c[TB.tc] };
  if (kim) return { kim: c[T.vYakin] ? 'Diğer (' + c[T.vYakin] + ')' : 'Diğer', ad: c[T.vAd], tc: c[T.vTc] };
  return { kim: '', ad: '', tc: '' };
}

function girilenKardes_(c) {
  var n = 0;
  for (var k = 1; k <= KARDES_EN_FAZLA; k++) if (c[kardesT_(k).ad]) n++;
  return n;
}

/** e-Okul'a girerken bakılacak sıra (kâğıt formun sırası). Tek elemanlı satır = bölüm başlığı. */
function kartSatirlari_(c) {
  var v = veliBilgisi_(c);
  var s = [
    ['ÖĞRENCİ BİLGİLERİ'],
    ['T.C. Kimlik No', c[T.tc]],
    ['Sınıfı', SINIF],
    ['No', c[T.no]],
    ['Adı Soyadı', c[T.ad]],
    ['Doğum Yeri', c[T.dYer]],
    ['Doğum Tarihi', tarihTr_(c[T.dTar])],
    ['Nüfus Cüzd. Kayıt No', c[T.nKayit]],
    ['Nüfus Cüzd. Veriliş Tarihi', tarihTr_(c[T.nVer])],
    ['Kan Grubu', c[T.kan]],
    ['Dini', c[T.din]],
    ['GENEL BİLGİLER'],
    ['Kiminle Oturuyor', c[T.kiminle]],
    ['Evi Kira mı?', c[T.ev]],
    ['Kendi Odası Var mı?', c[T.oda]],
    ['Ev Ne İle Isınıyor?', c[T.isinma]],
    ['Okula Nasıl Geliyor?', c[T.ulasim]],
    ['Bir İşte Çalışıyor mu?', c[T.calisma]],
    ['Aile Dışında Kalan Var mı?', c[T.aileDisi]],
    ['Boy (cm)', c[T.boy]],
    ['Kilo (kg)', c[T.kilo]],
    ['Özür Türü', c[T.ozur]],
    ['Şehit Çocuğu', c[T.sehit]],
    ['Yurt Dışından Geldi', c[T.yurtdisi]],
    ['Gündüzlü', 'Evet'],
    ['Burslu', '---'],
    ['SHÇEK (Devlet koruması)', c[T.koruma]],
    ['Aile Gelir Durumu', c[T.gelir]],
    ['Geçirdiği Kaza', c[T.kaza]],
    ['Geçirdiği Ameliyat', c[T.ameliyat]],
    ['Kullandığı Protez', c[T.protez]],
    ['Geçirdiği Hastalık', c[T.hastalik]],
    ['Sürekli Hastalığı', c[T.surekliHastalik]],
    ['Sürekli Kullandığı İlaç', c[T.ilac]],
    ['Kardeş Sayısı (kendisi dahil)', c[T.kardesSayisi]],
    ['VELİ BİLGİLERİ'],
    ['Velisi Kim?', v.kim],
    ['Veli Adı Soyadı', v.ad],
    ['Veli T.C. Kimlik No', v.tc],
    ['SMS No (Cep)', c[T.sms]]
  ];
  [['BABA BİLGİLERİ', TB], ['ANNE BİLGİLERİ', TA]].forEach(function (p) {
    var t = p[1];
    s.push([p[0]],
      ['Adı Soyadı', c[t.ad]],
      ['T.C. Kimlik No', c[t.tc]],
      ['Öğrenim Durumu', c[t.ogrenim]],
      ['Mesleği', c[t.meslek]],
      ['E-Posta Adresi', c[t.eposta]],
      ['Sağ/Ölü', c[t.sag] === 'Hayatta' ? 'Sağ' : (c[t.sag] === 'Vefat etti' ? 'Ölü' : c[t.sag])],
      ['Birlikte/Ayrı', c[t.birlikte]],
      ['Sürekli Hastalığı', c[t.hastalik]],
      ['Engel Durumu', c[t.engel]],
      ['Ev Telefonu', c[t.ev]],
      ['Cep Telefonu', c[t.cep]],
      ['İş Telefonu', c[t.is]]);
  });
  s.push(['VELİ DIŞINDA ULAŞILACAK KİŞİ'],
    ['Ad-Soyad (Yakınlık)', c[T.acilAd]],
    ['Telefonu', c[T.acilTel]],
    ['EV ADRESİ'],
    ['Ev Adresi', c[T.adres]]);
  for (var k = 1; k <= KARDES_EN_FAZLA; k++) {
    var kt = kardesT_(k);
    s.push([k + '. KARDEŞ'],
      ['Adı-Soyadı', c[kt.ad]],
      ['Doğum Tarihi', tarihTr_(c[kt.dTar])],
      ['Öğrenim Durumu', c[kt.ogrenim]],
      ['Sürekli Hastalığı', c[kt.hastalik]],
      ['Birlikte-Ayrı', c[kt.birlikte]]);
  }
  s.push(['FORMU DOLDURAN'], ['Veli Ad Soyad', c[T.dolduran]], ['Gönderim', c.__zaman]);
  return s;
}

/** Öğretmenin e-Okul'a girmeden önce bakması gerekenler. */
function eksikler_(c) {
  var e = [];
  if (!tcGecerli_(c[T.tc])) e.push('Öğrencinin TC numarası hatalı');
  var v = veliBilgisi_(c);
  if (!v.tc) e.push('Velinin TC numarası yazılmamış');
  else if (!tcGecerli_(v.tc)) e.push('Velinin TC numarası hatalı');
  if (c[TB.tc] && !tcGecerli_(c[TB.tc]) && v.kim !== 'Baba') e.push('Babanın TC numarası hatalı');
  if (c[TA.tc] && !tcGecerli_(c[TA.tc]) && v.kim !== 'Anne') e.push('Annenin TC numarası hatalı');
  if (v.kim === 'Anne' && c[TA.sag] === 'Vefat etti') e.push('Veli "Anne" seçilmiş ama anne vefat etti işaretli');
  if (v.kim === 'Baba' && c[TB.sag] === 'Vefat etti') e.push('Veli "Baba" seçilmiş ama baba vefat etti işaretli');

  var yil = Number(String(c[T.dTar] || '').slice(0, 4));
  if (yil && (yil < 2014 || yil > 2018)) e.push('Doğum yılı ' + yil + ' — kontrol edin');

  var sayi = Number(c[T.kardesSayisi]);
  if (sayi) {
    var beklenen = sayi - 1;
    var girilen = girilenKardes_(c);
    if (beklenen > KARDES_EN_FAZLA && girilen === KARDES_EN_FAZLA) {
      e.push((beklenen - KARDES_EN_FAZLA) + ' kardeşin bilgisi formda yok (7\'den fazla)');
    } else if (beklenen !== girilen) {
      e.push('Kardeş sayısı ' + sayi + ' yazılmış ama ' + girilen + ' kardeş bilgisi girilmiş');
    }
  }
  if (c.__kac > 1) e.push('Form ' + c.__kac + ' kez gönderilmiş, en sonuncusu gösteriliyor');
  return e;
}
