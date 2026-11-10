// Haftalık hatırlatma için ham bilgi: yıllık plana göre bu hafta + gelecek hafta,
// ve her ders için portalda (icerik-katalogu.json) ve DefterNotlari klasöründe ne var.
// Kullanım: node tools/haftalik-hatirlatma.mjs [YYYY-AA-GG]   (tarih verilmezse bugün)
// Önce: node tools/yillik-plan-oku.mjs   (YillikPlan/yillik-plan.json oluşur)
import { readFileSync, readdirSync, existsSync } from 'node:fs';

const PLAN = 'YillikPlan/yillik-plan.json';
if (!existsSync(PLAN)) { console.error(`${PLAN} yok. Önce: node tools/yillik-plan-oku.mjs`); process.exit(1); }
const plan = JSON.parse(readFileSync(PLAN, 'utf8'));
const katalog = JSON.parse(readFileSync('icerik-katalogu.json', 'utf8')).icerikler;

const PORTAL = { 'Türkçe': 'Turkce', 'Matematik': 'Matematik', 'Fen Bilimleri': 'Fen', 'Sosyal Bilgiler': 'Sosyal', 'İnsan Hakları': 'Insanhaklari', 'Trafik Güvenliği': 'Trafik' };
const AYLAR = ['oca', 'şub', 'mar', 'nis', 'may', 'haz', 'tem', 'ağu', 'eyl', 'eki', 'kas', 'ara'];

// "30 Kasım-4 Aralık" → 2026-11-30 (Eylül–Aralık 2026, Ocak–Haziran 2027)
function baslangic(t) {
  const gun = t.match(/\d+/); if (!gun) return null;
  const k = t.toLocaleLowerCase('tr');
  let ay = -1, en = Infinity;
  AYLAR.forEach((a, i) => { const p = k.indexOf(a); if (p >= 0 && p < en) { en = p; ay = i; } });
  if (ay < 0) return null;
  return new Date(Date.UTC(ay >= 8 ? 2026 : 2027, ay, +gun[0]));
}

// Takvim: her hafta numarası için derslerin en sık verdiği başlangıç günü
const oy = new Map();
for (const h of Object.values(plan.dersler).flat()) {
  const d = baslangic(h.tarih); if (!d) continue;
  const m = oy.get(h.hafta) || new Map(); const key = d.toISOString().slice(0, 10);
  m.set(key, (m.get(key) || 0) + 1); oy.set(h.hafta, m);
}
const takvim = [...oy].map(([hafta, m]) => ({ hafta, bas: [...m].sort((a, b) => b[1] - a[1])[0][0] })).sort((a, b) => a.hafta - b.hafta);

const bugun = process.argv[2] ? new Date(process.argv[2] + 'T00:00:00Z') : new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
const gunEkle = (s, n) => new Date(Date.parse(s) + n * 864e5);
// Bu hafta: başlangıcı bugünden önce/bugün olan son hafta; cuma geçtiyse tatil sayılır
let bu = [...takvim].reverse().find(w => Date.parse(w.bas) <= bugun);
const tatilde = bu && bugun > gunEkle(bu.bas, 6);
const sonraki = takvim.find(w => Date.parse(w.bas) > bugun);

const fmt = s => new Date(s).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', timeZone: 'UTC' });
console.log(`Bugün: ${fmt(bugun)}`);
if (bu && !tatilde) console.log(`Bu hafta: ${bu.hafta}. hafta (${fmt(bu.bas)} haftası)`);
else console.log(`Bu hafta okul haftası değil (tatil)${bu ? `; son okul haftası ${bu.hafta}. hafta` : ''}.`);
if (sonraki) console.log(`Sıradaki: ${sonraki.hafta}. hafta (${fmt(sonraki.bas)} haftası)`);

const haftalar = [bu && !tatilde ? bu.hafta : null, sonraki?.hafta].filter(Boolean);
const kisalt = (s, n = 110) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

for (const [ders, liste] of Object.entries(plan.dersler)) {
  console.log(`\n### ${ders}${PORTAL[ders] ? '' : '  (portalda klasörü yok)'}`);
  for (const n of haftalar) {
    const w = liste.find(x => x.hafta === n); if (!w) { console.log(`  ${n}. hafta: planda yok`); continue; }
    console.log(`  ${n}. hafta — ${w.birim || ''}${w.metin ? ' — Metin: ' + w.metin : ''}`);
    if (w.kazanimlar.length) w.kazanimlar.forEach(k => console.log(`    • ${k.kod} ${kisalt(k.ad)}`));
    else if (w.devam) console.log(`    • (devam) ${w.devam.kod} ${kisalt(w.devam.ad || '')}`);
  }
  const klasor = PORTAL[ders]; if (!klasor) continue;
  const ici = katalog.filter(k => k.yol.startsWith(klasor + '/'));
  console.log(`  Portaldaki içerikler (${ici.length}): ` + ici.map(k => `${k.ad}${k.gizli ? ' [gizli]' : ''}`).join(' · '));
  const dn = `${klasor}/DefterNotlari`;
  const defter = existsSync(dn) ? readdirSync(dn).filter(f => !/^desktop\.ini$/i.test(f)) : [];
  console.log(`  Defter notları (${defter.length}): ${defter.join(' · ') || '—'}`);
}
