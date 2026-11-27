// 4/D — "Portaldaki her etkinliğin sonucu öğretmen panelinde görünür" kuralının denetimi (öğretmenin kararı 2026-11-27).
//
// Kullanım (depo klasöründe, main dalında):
//   node tools/sonuc-takip-kontrol.mjs            -> tabloyu yazar; kurala aykırı yeni etkinlik varsa hata kodu 1
//   node tools/sonuc-takip-kontrol.mjs --hepsi    -> eski (kural öncesi) takipsiz etkinlikleri de tek tek listeler
//
// Ne bakar? icerik-katalogu.json'daki her etkinlik (Oyunlar ve gizli olanlar hariç) için:
//   1. Dosya oyun sonunda '4d:activity-finished' mesajı gönderiyor mu?
//   2. Mesajdaki etkinlik kimliği (activityId / OYUN.id) portal takip listesinde (portal dalı:
//      portal/etkinlik-kayitlari.json) bu dosyanın kimliğiyle aynı mı?
//   3. Sonuç "her görev doğru çözülürse" şartına bağlı mı? (geçilen görev sonucu engellememeli; uyarı)
//   4. Soru soru kayıt (cevap defteri, '4d:answer') var mı? (yoksa bilgi; MIMARI.md "Cevap defteri")
// Portal dalı "git fetch" ile alınır; internet yoksa eldeki kopya kullanılır.
import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const KOK = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORTAL_DALI = 'hazirlik/kazanim-takibi-20261101';
// Bu tarihten (dahil) sonra eklenen etkinlik takipsiz kalamaz. Öncekiler "eski" sayılır, yalnız listelenir.
const KURAL_TARIHI = '2026-11-28';
const hepsi = process.argv.includes('--hepsi');

const git = (...a) => execFileSync('git', a, {cwd: KOK, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
function portalListesi() {
  try { git('fetch', '-q', 'origin', `${PORTAL_DALI}:refs/remotes/origin/${PORTAL_DALI}`); } catch (e) { /* çevrimdışı */ }
  try { return JSON.parse(git('show', `origin/${PORTAL_DALI}:portal/etkinlik-kayitlari.json`)); }
  catch (e) { throw Error('Portal takip listesi okunamadı (origin/' + PORTAL_DALI + '). İnternet bağlantısını kontrol edin.'); }
}

const katalog = JSON.parse(readFileSync(join(KOK, 'icerik-katalogu.json'), 'utf8'));
const portal = portalListesi();
const takip = new Map(portal.otomatikSonuc.map(e => [e.yol, e.id]));

function kimlikler(s) {
  const k = new Set();
  for (const r of [/activityId\s*:\s*['"]([a-z0-9-]{3,60})['"]/g, /(?:ACTIVITY_ID|DORTD_ACTIVITY)\s*=\s*['"]([a-z0-9-]{3,60})['"]/g]) for (const m of s.matchAll(r)) k.add(m[1]);
  const oyun = /const OYUN\s*=\s*\{\s*["']?id["']?\s*:\s*["']([a-z0-9-]{3,60})["']/.exec(s);
  if (oyun) k.add(oyun[1]);
  return k;
}
// Sonuç mesajı "her görev başarılı" şartına bağlıysa (geçilen görev varken sonuç hiç gitmez) uyarı verir.
function tamDogruSarti(s) {
  return /\.every\(\s*\w+\s*=>\s*\w+\.status\s*===?\s*['"](success|done)['"]\s*\)/.test(s) ||
    /\.some\(\s*\w+\s*=>\s*\w+\.status\s*!==?\s*['"](success|done)['"]\s*\)[\s)]*return/.test(s);
}

const satirlar = [], hatalar = [], eskiler = [];
for (const it of katalog.icerikler) {
  const yol = it.yol;
  if (!yol || yol.startsWith('Oyunlar/') || it.gizli === true || !yol.endsWith('.html')) continue;
  const yeni = String(it.eklenme || '') >= KURAL_TARIHI;
  if (!existsSync(join(KOK, yol))) { satirlar.push([yol, 'DOSYA YOK']); if (yeni) hatalar.push(yol); continue; }
  const s = readFileSync(join(KOK, yol), 'utf8');
  const mesaj = s.includes('4d:activity-finished'), id = takip.get(yol), ids = kimlikler(s);
  let durum;
  if (!mesaj && !id) { durum = 'SONUÇ KODU YOK'; if (!yeni) { eskiler.push(yol); if (!hepsi) continue; } }
  else if (!mesaj) durum = 'TAKİPTE AMA SONUÇ KODU YOK';
  else if (!id) durum = 'SONUÇ KODU VAR, TAKİP LİSTESİNDE YOK (' + [...ids].join(',') + ')';
  else if (ids.size && !ids.has(id)) durum = 'KİMLİK UYUŞMUYOR: listede ' + id + ', dosyada ' + [...ids].join(',');
  else durum = 'TAMAM' + (s.includes('4d:answer') ? '' : ' · cevap defteri YOK (soru soru kayıt/geri yükleme eklenmeli)') + (tamDogruSarti(s) ? ' (uyarı: sonuç "her görev doğru" şartına bağlı olabilir, geçme ile dene)' : '');
  satirlar.push([yol, durum]);
  if (!durum.startsWith('TAMAM') && (yeni || mesaj || id)) hatalar.push(yol);
}

const gen = Math.max(...satirlar.map(r => r[0].length));
for (const [y, d] of satirlar) console.log(y.padEnd(gen) + '  ' + d);
if (eskiler.length && !hepsi) console.log(`\n${eskiler.length} eski etkinlikte sonuç kodu yok (kural öncesi; öğrenci "bitirdim" bildirimiyle izlenir). Liste için --hepsi.`);
if (hatalar.length) {
  console.log('\nKURALA AYKIRI (' + hatalar.length + '): ' + hatalar.join(', '));
  console.log('Düzeltme: sonuç kodu yoksa ekleyin (rapor motoru); takipte değilse 4d-etkinlik-takibe-al ile listeye alın.');
  process.exit(1);
}
console.log('\nKural tamam: sonuç kodu olan her etkinlik portal takip listesinde, kimlikler uyuşuyor.');
