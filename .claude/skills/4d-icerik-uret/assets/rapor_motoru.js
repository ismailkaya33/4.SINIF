/* RaporMotoru v2 — 4/D portalına bağlı (her etkinliğin içine gömülür; tek dosya, çevrimdışı).
 *
 * Akış:
 *   RaporMotoru.init({oyunId, oyunAdi, kazanimlar:[{kod, ad}]})   oyun başında (ve "yeniden oyna"da)
 *   RaporMotoru.kaydet({...})                                       her maddeden sonra
 *   RaporMotoru.ekranCiz(el)                                        oyun sonunda: öğrenciye "Kazanım Karnem"
 *
 * Portal bağlantısı (öğrenci kodla giriş yaptıysa etkinlik portalın içinde açılır):
 *   - Her madde: {type:'4d:item-result'} mesajı (madde bazlı kazanım/yanılgı verisi)
 *   - Oyun sonu: {type:'4d:activity-finished'} mesajı, oyun başına BİR kez (mevcut sonuç kaydı)
 *   Sayfa portal dışında (kodsuz) açıldıysa mesajlar gitmez; karne yine gösterilir.
 *   Mesajı yalnızca portal kayıt listesinde (portal/etkinlik-kayitlari.json) olan etkinlikler için
 *   sunucu kaydeder; oyunId bu listedeki "id" ile aynı olmalı.
 *
 * Seviye eşikleri öğretmen panelindekiyle AYNI olmalı (ESIK, seviye).
 */
const RaporMotoru = (() => {
  const SURUM = 2;
  const ESIK = { ustalik: 0.85, gelisiyor: 0.6, ipucuUst: 0.25, minMadde: 3 };
  let meta = null, kayit = [], t0 = Date.now(), denemeKimligi = '', bitisGonderildi = false;

  function yeniKimlik() {
    let r = '';
    try { const a = new Uint8Array(12); crypto.getRandomValues(a); a.forEach(b => { r += b.toString(16).padStart(2, '0'); }); }
    catch (e) { r = Date.now().toString(36) + Math.random().toString(36).slice(2, 12); }
    return 'rm_' + r;
  }
  function portalaGonder(mesaj) {
    try { if (window.parent && window.parent !== window) window.parent.postMessage(mesaj, '*'); } catch (e) { /* portal yok */ }
  }

  /** m = {oyunId, oyunAdi, kazanimlar:[{kod, ad}]}  (kod = MEB kazanım kodu, ör. "M.4.1.2.3") */
  function init(m) {
    meta = { oyunId: String(m.oyunId), oyunAdi: String(m.oyunAdi), kazanimlar: m.kazanimlar.map(k => ({ kod: String(k.kod), ad: String(k.ad) })) };
    kayit = []; t0 = Date.now(); denemeKimligi = yeniKimlik(); bitisGonderildi = false;
  }

  /** r = {kazanim:kod, madde:id, yanilgi:'etiket'|'', ilkDenemeDogru:bool, deneme:n, ipucu:0-3,
   *       cozumGoruldu:bool, sureMs:n, tekrar:bool}   tekrar=true → seviye hesabına katılmaz */
  function kaydet(r) {
    const i = meta ? meta.kazanimlar.findIndex(k => k.kod === r.kazanim) : -1;
    if (i < 0) { console.warn('RaporMotoru: bilinmeyen kazanım', r.kazanim); return false; }
    const x = {
      k: i, m: String(r.madde || '').slice(0, 40), y: String(r.yanilgi || '').slice(0, 40),
      i: r.ilkDenemeDogru ? 1 : 0, d: Math.max(1, r.deneme | 0), h: Math.max(0, Math.min(3, r.ipucu | 0)),
      c: r.cozumGoruldu ? 1 : 0, s: Math.max(0, Math.round((r.sureMs || 0) / 1000)), r: r.tekrar ? 1 : 0
    };
    kayit.push(x);
    portalaGonder({ type: '4d:item-result', schemaVersion: 1, activityId: meta.oyunId, attemptId: denemeKimligi,
      kazanim: meta.kazanimlar[i].kod, madde: x.m, yanilgi: x.y, ilkDogru: x.i, deneme: x.d, ipucu: x.h,
      cozum: x.c, sureSn: x.s, tekrar: x.r });
    return true;
  }

  function seviye(a) {            // a: ilk kez sorulan madde kayıtları
    const n = a.length;
    if (n < ESIK.minMadde) return 'veri-az';
    const p = a.filter(x => x.i).length / n, h = a.filter(x => x.h > 0).length / n;
    if (p >= ESIK.ustalik && h <= ESIK.ipucuUst) return 'ustalasti';
    if (p >= ESIK.gelisiyor) return 'gelisiyor';
    return 'destek';
  }

  function ozet() {
    return meta.kazanimlar.map((k, idx) => {
      const hepsi = kayit.filter(x => x.k === idx), a = hepsi.filter(x => !x.r);
      const yan = {};
      hepsi.forEach(x => { if (x.y) yan[x.y] = (yan[x.y] || 0) + 1; });
      return {
        kod: k.kod, ad: k.ad, n: a.length, dogru: a.filter(x => x.i).length,
        p: a.length ? a.filter(x => x.i).length / a.length : null,
        ipucuOran: a.length ? a.filter(x => x.h > 0).length / a.length : 0,
        seviye: seviye(a), yanilgilar: yan
      };
    });
  }

  /** Oyun sonu: portaldaki mevcut sonuç kaydı için tek mesaj (çift gönderim yok). */
  function bitir() {
    if (!meta || bitisGonderildi) return;
    const a = kayit.filter(x => !x.r);
    if (!a.length) return;
    bitisGonderildi = true;
    const toplam = a.length, ilk = a.filter(x => x.i).length, cozulen = a.filter(x => !x.c).length;
    portalaGonder({ type: '4d:activity-finished', schemaVersion: 1, activityId: meta.oyunId, attemptId: denemeKimligi,
      correct: cozulen, wrong: toplam - cozulen, total: toplam,
      wrongAttempts: a.reduce((t, x) => t + (x.d - 1), 0), firstTry: Math.min(ilk, cozulen),
      durationSeconds: Math.min(86400, Math.round((Date.now() - t0) / 1000)) });
  }

  const ETIKET = {
    ustalasti: ['Harika! Bu konuyu iyi biliyorsun.', '#1b7f4b'],
    gelisiyor: ['Gelişiyorsun. Biraz daha tekrar iyi gelir.', '#b26a00'],
    destek: ['Bu konuyu birlikte tekrar edelim.', '#b3261e'],
    'veri-az': ['Bu konuda daha fazla soru çözmen gerek.', '#5b6470']
  };

  /** Öğrenciye olumlu dilli "Kazanım Karnem" ekranı; sonucu portala da gönderir. */
  function ekranCiz(el) {
    bitir();
    if (!document.getElementById('rm-css')) {
      const st = document.createElement('style'); st.id = 'rm-css';
      st.textContent = '.rm{font-family:system-ui,"Segoe UI",Roboto,Arial,sans-serif;max-width:720px;margin:0 auto;padding:16px;color:inherit}' +
        '.rm h2{margin:0 0 4px;font-size:1.5rem}.rm p{margin:4px 0 12px;opacity:.85}' +
        '.rm-k{border:1px solid #c9d1dc;border-radius:14px;padding:12px 14px;margin:10px 0}' +
        '.rm-k b{display:block;font-size:1.05rem}.rm-bar{height:14px;background:#e8ebf0;border-radius:8px;overflow:hidden;margin:8px 0}' +
        '.rm-bar i{display:block;height:100%;border-radius:8px}.rm-m{font-size:.95rem;font-weight:700}.rm-d{font-size:.9rem;opacity:.8}';
      document.head.appendChild(st);
    }
    const o = ozet();
    const guclu = o.filter(x => x.seviye === 'ustalasti').length, tekrar = o.filter(x => x.seviye === 'destek' || x.seviye === 'gelisiyor').length;
    let h = '<div class="rm"><h2>Kazanım Karnem</h2><p>' + esc(meta.oyunAdi) + '</p><p>' + guclu + ' konuda güçlüsün' +
      (tekrar ? ', ' + tekrar + ' konuyu tekrar edeceksin.' : '.') + '</p>';
    o.forEach(x => {
      const e = ETIKET[x.seviye], yuzde = x.p === null ? 0 : Math.round(x.p * 100);
      h += '<div class="rm-k"><b>' + esc(x.ad) + '</b><div class="rm-bar" role="img" aria-label="ilk denemede doğru: %' + yuzde + '"><i style="width:' + yuzde + '%;background:' + e[1] + '"></i></div>' +
        '<span class="rm-m" style="color:' + e[1] + '">' + e[0] + '</span> <span class="rm-d">(' + x.dogru + '/' + x.n + ' ilk denemede doğru)</span></div>';
    });
    h += '<p class="rm-d">' + (window.parent !== window ? 'Sonucun öğretmenine gönderildi.' : 'Sonucunun öğretmenine gitmesi için etkinliği öğrenci portalından aç.') + '</p></div>';
    el.innerHTML = h;
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

  return { init, kaydet, ozet, bitir, ekranCiz, seviye, ESIK, SURUM };
})();
