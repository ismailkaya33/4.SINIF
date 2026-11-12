// Kazanım haritası: yıllık plandaki her kazanım için etkinlik / değerlendirme / defter notu var mı?
// Kullanım: node tools/kazanim-haritasi.mjs [YYYY-AA-GG]   → Baski/kazanim-haritasi.html (yalnız bu bilgisayarda)
// Kaynaklar: YillikPlan/yillik-plan.json, icerik-katalogu.json, ders klasörlerindeki .html dosyalarında geçen
// kazanım kodları (RaporMotoru 'kazanimlar' listesi vb.), tools/defter-kazanim.json (defter notu → kazanım eşleşmesi).
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';

const plan = JSON.parse(readFileSync('YillikPlan/yillik-plan.json', 'utf8'));
const katalog = JSON.parse(readFileSync('icerik-katalogu.json', 'utf8')).icerikler;
const defterEs = existsSync('tools/defter-kazanim.json') ? JSON.parse(readFileSync('tools/defter-kazanim.json', 'utf8')).eslesme : {};
const DERS = { 'Türkçe': 'Turkce', 'Matematik': 'Matematik', 'Fen Bilimleri': 'Fen', 'Sosyal Bilgiler': 'Sosyal', 'İnsan Hakları': 'Insanhaklari', 'Trafik Güvenliği': 'Trafik' };
const AYLAR = ['oca', 'şub', 'mar', 'nis', 'may', 'haz', 'tem', 'ağu', 'eyl', 'eki', 'kas', 'ara'];
const kod = s => s.replace(/\.$/, '');
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

// --- takvim (haftalik-hatirlatma.mjs ile aynı mantık) ---
function baslangic(t) {
  const gun = t.match(/\d+/); if (!gun) return null;
  const k = t.toLocaleLowerCase('tr'); let ay = -1, en = Infinity;
  AYLAR.forEach((a, i) => { const p = k.indexOf(a); if (p >= 0 && p < en) { en = p; ay = i; } });
  return ay < 0 ? null : new Date(Date.UTC(ay >= 8 ? 2026 : 2027, ay, +gun[0]));
}
const oy = new Map();
for (const h of Object.values(plan.dersler).flat()) {
  const d = baslangic(h.tarih); if (!d) continue;
  const m = oy.get(h.hafta) || new Map(), key = d.toISOString().slice(0, 10); m.set(key, (m.get(key) || 0) + 1); oy.set(h.hafta, m);
}
const takvim = [...oy].map(([hafta, m]) => ({ hafta, bas: [...m].sort((a, b) => b[1] - a[1])[0][0] })).sort((a, b) => a.hafta - b.hafta);
const bugun = process.argv[2] ? new Date(process.argv[2] + 'T00:00:00Z') : new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
const buHafta = ([...takvim].reverse().find(w => Date.parse(w.bas) <= bugun) || { hafta: 0 }).hafta;

// --- etkinliklerdeki kazanım kodları ---
const KOD_RE = /\b(?:T|M|F|SB|Y|TG)\.4(?:\.\d+){2,3}\b/g;
const etk = new Map();   // kod → [{ad, yol, gizli, deg}]
for (const [ders, klasor] of Object.entries(DERS)) {
  if (!existsSync(klasor)) continue;
  for (const f of readdirSync(klasor).filter(f => f.endsWith('.html'))) {
    const yol = `${klasor}/${f}`, k = katalog.find(x => x.yol === yol);
    const metin = readFileSync(yol, 'utf8');
    const kodlar = new Set((metin.match(KOD_RE) || []).map(kod));
    for (const c of kodlar) {
      const l = etk.get(c) || []; l.push({ ad: k?.ad || f, yol, gizli: !!k?.gizli, deg: !!k?.degerlendirme || /sinav|degerlendirme/i.test(f), katalogda: !!k }); etk.set(c, l);
    }
  }
}
// --- defter notları ---
const defter = new Map(), eslesmeyen = [];
for (const klasor of Object.values(DERS)) {
  const dn = `${klasor}/DefterNotlari`; if (!existsSync(dn)) continue;
  for (const f of readdirSync(dn).filter(f => /\.(png|jpe?g|webp)$/i.test(f))) {
    const yol = `${dn}/${f}`, kodlar = defterEs[yol];
    if (!kodlar) { eslesmeyen.push(yol); continue; }
    kodlar.forEach(c => { const l = defter.get(c) || []; l.push(f); defter.set(c, l); });
  }
}

// --- tablo ---
let ozet = [], govde = '';
for (const [ders] of Object.entries(DERS)) {
  const haftalar = plan.dersler[ders] || [];
  const kaz = new Map();
  for (const h of haftalar) for (const k of h.kazanimlar || []) {
    const c = kod(k.kod); const v = kaz.get(c) || { ad: k.ad, haftalar: [] }; v.haftalar.push(h.hafta); kaz.set(c, v);
  }
  let satir = '', say = { tam: 0, eksik: 0, gelecek: 0 };
  for (const [c, v] of [...kaz].sort((a, b) => Math.min(...a[1].haftalar) - Math.min(...b[1].haftalar))) {
    const ilk = Math.min(...v.haftalar), e = (etk.get(c) || []), etkinlik = e.filter(x => !x.deg), deg = e.filter(x => x.deg), d = defter.get(c) || [];
    const gecti = ilk <= buHafta, yakin = ilk > buHafta && ilk <= buHafta + 2;
    // Öğretmen kararı: Türkçe dinleme (T.4.1) ve konuşma (T.4.2) sınıfta/kitaptan yapılır, portal etkinliği beklenmez.
    const sinifta = /^T\.4\.[12]\./.test(c);
    const durum = sinifta ? 'sinif' : etkinlik.length ? 'tam' : gecti ? 'eksik' : yakin ? 'yakin' : 'gelecek';
    if (durum === 'tam') say.tam++; else if (durum === 'eksik') say.eksik++; else if (durum !== 'sinif') say.gelecek++;
    const hucre = (l, f, bos = '—') => l.length ? '<td class="v">' + l.map(f).join('<br>') + '</td>' : '<td class="y">' + bos + '</td>';
    satir += `<tr class="${durum}"><td class="h">${v.haftalar.length > 3 ? ilk + '.–' + Math.max(...v.haftalar) + '.' : v.haftalar.join(', ') + '.'}</td>` +
      `<td><b>${esc(c)}</b><br><span class="ad">${esc(v.ad)}</span></td>` +
      hucre(etkinlik, x => '✔ ' + esc(x.ad) + (x.gizli ? ' <i>(gizli)</i>' : '') + (x.katalogda ? '' : ' <i>(katalogda yok)</i>'), sinifta ? 'sınıfta' : '—') +
      hucre(deg, x => '✔ ' + esc(x.ad) + (x.gizli ? ' <i>(gizli)</i>' : '')) +
      hucre(d, x => '✔ ' + esc(x), '<span title="Eşleşmesi yazılmamış not olabilir">?</span>') + '</tr>';
  }
  ozet.push(`<div class="oz"><b>${esc(ders)}</b><span class="t">${say.tam} tam</span><span class="e">${say.eksik} eksik</span><span class="g">${say.gelecek} sırada</span></div>`);
  govde += `<h2>${esc(ders)}</h2><table><tr><th>Hafta</th><th>Kazanım</th><th>Etkinlik</th><th>Değerlendirme</th><th>Defter notu</th></tr>${satir}</table>`;
}

const tarih = bugun.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>4/D Kazanım Haritası</title><style>
body{font:15px/1.4 "Segoe UI",system-ui,sans-serif;margin:0;background:#f6f7fb;color:#1f2a44}
main{max-width:1100px;margin:0 auto;padding:16px}
h1{margin:4px 0}h2{margin:26px 0 8px;padding:6px 12px;background:#1f2a44;color:#fff;border-radius:10px;font-size:1.15rem}
.bilgi{color:#5b6782;margin:4px 0 12px}
.ozet{display:flex;flex-wrap:wrap;gap:8px}.oz{background:#fff;border-radius:12px;padding:8px 12px;box-shadow:0 2px 6px #0001;display:flex;gap:8px;align-items:center}
.oz span{border-radius:999px;padding:1px 9px;font-size:.85rem;font-weight:700}.t{background:#d9f5e4;color:#11663a}.e{background:#ffe0dc;color:#9b2a1d}.g{background:#eceff5;color:#5b6782}
.lej{display:flex;gap:12px;flex-wrap:wrap;margin:10px 0;font-size:.9rem}.lej i{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:4px}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px #0001}
th{background:#eef1f8;text-align:left;padding:6px 8px;font-size:.85rem}td{padding:6px 8px;border-top:1px solid #eef1f8;vertical-align:top;font-size:.9rem}
td.h{white-space:nowrap;color:#5b6782}.ad{color:#5b6782;font-size:.85rem}td.y{color:#b0b7c6;text-align:center}
tr.tam{background:#f3fcf6}tr.eksik{background:#fff5f3}tr.yakin{background:#fffaea}tr.gelecek td,tr.sinif td{color:#8a93a6}tr.sinif td.y{color:#b0b7c6!important;font-weight:400!important}
tr.eksik td.y{color:#c0392b;font-weight:800}tr.yakin td.y{color:#b07d00;font-weight:800}
@media print{body{background:#fff}h2{break-after:avoid}tr{break-inside:avoid}}
</style></head><body><main>
<h1>4/D Kazanım Haritası</h1>
<div class="bilgi">${tarih} · Bu hafta: ${buHafta}. hafta · Kaynak: yıllık plan + sitedeki etkinlikler + defter notları.
Etkinlik eşleşmesi, etkinlik dosyasında yazılı kazanım koduna göre yapılır; kodu yazılı olmayan etkinlikler burada görünmez (doğrulanmalı).</div>
<div class="ozet">${ozet.join('')}</div>
<div class="lej"><span><i style="background:#d9f5e4"></i>Etkinliği var</span><span><i style="background:#ffe0dc"></i>Haftası geçti, eksik var</span>
<span><i style="background:#fff3c4"></i>2 hafta içinde gelecek, etkinlik yok</span><span><i style="background:#eceff5"></i>Daha sonra / Türkçe dinleme-konuşma (sınıfta)</span>
<span>Defter notu sütununda <b>?</b> = eşleşmesi yazılmamış, var olabilir</span></div>
${govde}
<h2>Kazanımı belirtilmemiş defter notları (${eslesmeyen.length})</h2>
<p class="bilgi">Bunlar portalda var ama hangi kazanıma ait olduğu <code>tools/defter-kazanim.json</code> dosyasına yazılmamış.
Öğretmen söylerse eklenir; kod uydurulmaz.</p><ul>${eslesmeyen.map(y => '<li>' + esc(y) + '</li>').join('')}</ul>
</main></body></html>`;
mkdirSync('Baski', { recursive: true });
writeFileSync('Baski/kazanim-haritasi.html', html);
console.log('Yazıldı: Baski/kazanim-haritasi.html · bu hafta ' + buHafta + ' · eşleşmeyen defter notu ' + eslesmeyen.length);
