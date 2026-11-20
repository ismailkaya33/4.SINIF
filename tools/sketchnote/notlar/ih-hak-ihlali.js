// İnsan Hakları, Yurttaşlık ve Demokrasi — Haklarım kısıtlanırsa (10–11. hafta).
// Kazanımlar (yıllık plandan): Y.4.2.4 hissettiklerini ifade eder; Y.4.2.5 çözümde üstlenebileceği sorumluluklar.
// Kazanım kodu sayfaya yazılmaz. Görsel 1 ve 2 kodla çizilir (resim yuvası yok).
// Pedagojik denetim (2026-11-20): acil kutusunda yalnız 112; misilleme parantezle açıklandı.
Sketchnote.defterNotu({
  baslik: 'HAKLARIM KISITLANIRSA',
  bloklar: [
    { konu: '1. Hak ihlali ve hakkın kısıtlanması' },
    { madde: 'Her çocuğun **hakları** vardır: oyun oynama, eğitim, özel hayata saygı, eşit davranılma, düşüncesini söyleme.' },
    { madde: 'Bir hakkın haksız yere çiğnenmesine **hak ihlali**, haksız yere sınırlanmasına **hakkın kısıtlanması** denir.' },
    { ornek: 'Büyük çocuklar salıncağı hiç bırakmıyor → **oyun hakkı** kısıtlanıyor' },
    { ornek: 'Günlüğüm izinsiz okunuyor → **özel hayata saygı** hakkım ihlal ediliyor' },
    { ornek: '“Yenisin, aday olamazsın” deniyor → **seçilme hakkım** kısıtlanıyor' },
    { dikkat: 'Başkalarının hakkını koruyan **kurallar** ihlal değildir. Kütüphanedeki sessizlik kuralı herkesin okuma hakkını korur.' },

    { konu: '2. Hissettiklerimi uygun yolla ifade ederim' },
    { madde: 'Hakkımız kısıtlanınca **üzülebilir, kızabilir, kırılabilir** ya da **haksızlığa uğramış** hissedebiliriz. Bu duygular **doğaldır**.' },
    { madde: 'Önemli olan duygumuzu **kimseyi kırmadan**, sakin ve açık söylemektir. Bunun yolu **Ben dili**dir.', birlikte: true },
    { ara: 'Ben dili formülü' },
    { ornek: 'Ben … **hissediyorum**, çünkü … . … **istiyorum**.' },
    { gorsel: 1, metin: ['**Kırıcı söz**, bağırmak ve **sen dili** sorunu büyütür.', 'Duyguyu **içine atmak** da sorunu çözmez; kimse durumu öğrenemez.'] },

    { konu: '3. Çözümde üstlenebileceğim sorumluluklar' },
    { adim: [
      '**Fark et:** Hangi hakkım kısıtlanıyor? Yoksa bu bir kural mı?',
      '**Sakin kal**, duygunu Ben diliyle anlat.',
      '**Çözüm öner:** Kuralı hatırlat, sırayla yapmayı öner.',
      'Çözülmezse **güvendiğin bir yetişkine** başvur.'] },
    { madde: 'Başkasının hakkı kısıtlanıyorsa **seyirci kalmam**: arkadaşımı oyuna katarım, kuralı hatırlatırım.' },
    { madde: 'Sorun kalıcıysa **öneri** veririm. Örnek: okul yönetimine girişe rampa yapılması için yazılı öneri.' },
    { dikkat: '**Susmak**, **misilleme** (aynısını yapıp karşılık vermek) ve kavgayla **sorunu büyütmek** çözüm değildir.' },

    { konu: '4. Kime başvurabilirim?' },
    { gorsel: 2, metin: ['Hakkım kısıtlandığında **güvendiğim bir yetişkine** anlatırım.', '**Yardım istemek** ispiyonculuk değildir; hakkımı korumaktır.', 'Tehlike varsa beklemeden **hemen** haber veririm.'] },
  ],

  gorseller: [
    // 1 — Sen dili / Ben dili
    { ad: 'Sen dili mi, Ben dili mi?', ciz(S) {
      const { rc, o, ekle, yazi, paragraf } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      const panel = (x, baslik, renk, metin, isaret, etiket, dolgu) => {
        yazi(x + 125, 50, baslik, 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(renk) });
        ekle(rc.rectangle(x + 10, 66, 230, 150, o({ fill: S.r(dolgu), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1, strokeWidth: 2 })));
        ekle(rc.polygon([[x + 60, 215], [x + 92, 215], [x + 66, 246]], o({ fill: '#fff', fillStyle: 'solid', strokeWidth: 2 })));
        paragraf(x + 24, 100, metin, 21, 204, 28, { fill: S.m(R.lacivert) });
        const cx = x + 70;
        ekle(rc.circle(cx, 282, 42, o({ strokeWidth: 2 })));
        ekle(rc.line(cx, 303, cx, 330, o({ strokeWidth: 2.4 })));
        ekle(rc.line(cx - 22, 312, cx + 22, 312, o({ strokeWidth: 2.4 })));
        ekle(rc.line(cx, 330, cx - 14, 352, o({ strokeWidth: 2.4 }))); ekle(rc.line(cx, 330, cx + 14, 352, o({ strokeWidth: 2.4 })));
        yazi(cx + 44, 296, isaret, 34, { class: 'kalin', fill: S.m(renk) });
        yazi(cx + 44, 330, etiket, 19, { class: 'kalin', fill: S.m(renk) });
      };
      panel(0, 'SEN DİLİ', R.kirmizi, '“Sen hep öne geçiyorsun, çok bencilsin!”', '✗', 'suçlar, kırar', '#ffc8dd');
      ekle(rc.line(255, 30, 255, 345, o({ strokeWidth: 1.6, strokeLineDash: [8, 8] })));
      panel(260, 'BEN DİLİ', R.yesil, '“Sıram geçilince haksızlığa uğramış hissediyorum. Lütfen sıraya gir.”', '✓', 'duygu + istek', '#b7e4c7');
    } },
    // 2 — Kime başvurabilirim?
    { ad: 'Kime başvurabilirim?', ciz(S) {
      const { rc, o, ekle, yazi, paragraf, ok } = S, R = Sketchnote.R, SARI = Sketchnote.SARI, MAVI = Sketchnote.MAVI;
      yazi(255, 36, 'Kime Başvurabilirim?', 26, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.lacivert) });
      const kutu = (x, y, ad, metin, renk) => {
        ekle(rc.rectangle(x, y, 196, 104, o({ fill: S.r(renk), fillStyle: 'hachure', hachureGap: 10, fillWeight: 1, strokeWidth: 2 })));
        yazi(x + 98, y + 30, ad, 21, { class: 'kalin', 'text-anchor': 'middle', fill: S.m(R.kirmizi) });
        paragraf(x + 98, y + 58, metin, 19, 176, 24, { 'text-anchor': 'middle' });
      };
      kutu(12, 54, 'OKULDA', 'öğretmen, rehber öğretmen, müdür', '#bde0fe');
      kutu(302, 54, 'EVDE', 'ailem ya da bana bakan yetişkin', '#ffe08a');
      kutu(12, 244, 'DIŞARIDA', 'servis, park ya da kütüphane görevlisi', '#b7e4c7');
      kutu(302, 244, 'TEHLİKEDEYSEM', '112', '#ffc8dd');
      ekle(rc.circle(255, 200, 92, o({ fill: S.r(SARI), fillStyle: 'hachure', hachureGap: 7, strokeWidth: 2.6 })));
      yazi(255, 210, 'BEN', 28, { class: 'kalin', 'text-anchor': 'middle' });
      const r = S.renkli ? MAVI : '#111';
      ok([[222, 172], [214, 160], [208, 162]], r); ok([[288, 172], [296, 160], [302, 162]], r);
      ok([[222, 228], [214, 240], [208, 246]], r); ok([[288, 228], [296, 240], [302, 246]], r);
    } },
  ],
});
