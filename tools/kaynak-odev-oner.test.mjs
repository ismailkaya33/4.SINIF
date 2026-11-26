import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';

// Yazma ve ilerletme sınamaları yalnız geçici proje kopyasında çalışır.
const kok = new URL('..', import.meta.url);
const alan = await mkdtemp(new URL('.kaynak-test-', kok));
const kitapYolu = resolve(alan, 'kaynak-kitap/kitaplar.json');
const ilerlemeYolu = resolve(alan, 'kaynak-kitap/ilerleme.json');
const programYolu = resolve(alan, 'kaynak-kitap/ders-programi.json');
const dosyalar = ['kitaplar.json', 'ilerleme.json', 'ders-programi.json'];
const orijinaller = await Promise.all(dosyalar.map(f => readFile(new URL(`kaynak-kitap/${f}`, kok), 'utf8')));
const [harita, ilerleme, program] = orijinaller.map(s => JSON.parse(s));
const yaz = (p, v) => writeFile(p, JSON.stringify(v), 'utf8');
let kontrol = 0;
function calistir(args, kod = 0) {
  const r = spawnSync(process.execPath, [resolve(alan, 'tools/kaynak-odev-oner.mjs'), ...args], { cwd: fileURLToPath(kok), encoding: 'utf8' });
  assert.equal(r.status, kod, `${args.join(' ')}\n${r.stderr}\n${r.stdout}`);
  kontrol++;
  return r;
}
const tarih = ['--baslangic', '2026-11-30'];
function plan(args = []) {
  const r = calistir([...tarih, ...args]);
  return { sonuc: JSON.parse(r.stdout.split('\n\n')[0]), cikti: r.stdout };
}
const sonlar = sonuc => {
  const birlesik = {};
  for (const o of [...sonuc.paket, ...sonuc.gunler.flatMap(g => g.odevler)]) {
    for (const aralik of o.sayfa.split(', ')) {
      const sayilar = aralik.split('–').map(Number);
      const tumu = Array.from({ length: sayilar.at(-1) - sayilar[0] + 1 }, (_, i) => sayilar[0] + i);
      (birlesik[o.kitap] ??= []).push(...tumu);
    }
  }
  return birlesik;
};
try {
  await mkdir(resolve(alan, 'tools'));
  await mkdir(resolve(alan, 'kaynak-kitap'));
  await copyFile(new URL('kaynak-odev-oner.mjs', import.meta.url), resolve(alan, 'tools/kaynak-odev-oner.mjs'));
  await Promise.all(dosyalar.map((f, i) => writeFile(resolve(alan, `kaynak-kitap/${f}`), orijinaller[i])));
  calistir(['--denetle']);
  const { sonuc, cikti } = plan(['--konu', 'tr=1,mat=2,fen=0,sos=2', '--kadar', 'mat-oy=42']);
  assert.equal(sonuc.baslik, '30 Kasım–4 Aralık');
  assert.equal(sonuc.bitis, '2026-12-06');
  assert.equal(sonuc.haftaSonu.sayfa, '8. Hafta');
  assert.deepEqual(sonlar(sonuc), {
    'Türkçe Avcı': [81, 82, 83, 84, 85, 86],
    'Matematik Avcı': [85, 86, 87, 88, 89, 90, 91, 92],
    'Sosyal Avcı': [29, 30, 31, 32],
    'Sosyal Ödev Yaprakları': [21, 22, 23, 24],
    'Matematik Ödev Yaprakları': [41, 42],
    'Türkçe Ödev Yaprakları': [35, 36, 37, 38, 39, 40]
  });
  assert.deepEqual(sonuc.paket, [
    { ders: 'Türkçe', kitap: 'Türkçe Avcı', sayfa: '81–86', konu: 'Cümle Bilgisi', yesilTest: '85–86' },
    { ders: 'Matematik', kitap: 'Matematik Avcı', sayfa: '85–92', konu: 'Doğal Sayılarla Çarpma İşlemi / Çarpanların Yeri ve Sonuç', yesilTest: '87–88, 91–92' },
    { ders: 'Sosyal Bilgiler', kitap: 'Sosyal Avcı', sayfa: '29–32', konu: 'Yön Bulma Yöntemleri / Kroki', yesilTest: '30, 32' }
  ]);
  assert(sonuc.gunler.flatMap(g => g.odevler).every(o => o.kitap.endsWith('Ödev Yaprakları')));
  assert.deepEqual(sonuc.gunler.map(g => g.odevler.find(o => o.ders === 'Türkçe').sayfa), ['35–36', '37', '38', '39', '40']);
  assert.deepEqual(sonuc.gunler.map(g => g.odevler.find(o => o.ders === 'Sosyal Bilgiler')?.sayfa), [undefined, undefined, '21–23', undefined, '24']);
  assert.equal(sonuc.gunler[0].odevler[0].konu, 'Okuma – Anlama');
  assert.match(cikti, /Okula getir \(zımbalı, hafta boyunca ödev dosyasında\)/);
  assert.match(cikti, /Ev ödevi \(gün gün\)/);
  // Kota sıfırsa ders ve açık sayfa sınırı ödev oluşturmaz; boş günler kalır.
  const bos = plan(['--konu', 'tr=0,mat=0,fen=0,sos=0', '--kadar', 'tr-avci=86', '--hafta-sonu', 'hayir']);
  assert(bos.sonuc.gunler.every(g => g.odevler.length === 0));
  assert.deepEqual(bos.sonuc.paket, []);
  assert.equal(bos.sonuc.haftaSonu, null);
  assert.match(bos.cikti, /Sıradaki hafta sonu: 8\. Hafta \(eklenmedi\)/);
  // Günlerden az sayfa ilk güne verilir; bir sayfalık ödev sonraki güne taşmaz.
  const az = plan(['--konu', 'tr=1,mat=0,fen=0,sos=0', '--kadar', 'tr-avci=81,tr-oy=35']).sonuc;
  assert.equal(az.gunler[0].odevler[0].sayfa, '35');
  assert.deepEqual(az.paket, [{ ders: 'Türkçe', kitap: 'Türkçe Avcı', sayfa: '81', konu: 'Cümle Bilgisi' }]);
  assert(az.gunler.slice(1).every(g => g.odevler.length === 0));
  const kirpik = plan(['--konu', 'tr=1,mat=0,fen=0,sos=0', '--kadar', 'tr-avci=85']).sonuc;
  assert.equal(kirpik.paket[0].yesilTest, '85');
  // Sayılmayan okuma sonraki konuya aittir; kota sonunda veya kitap sonunda alınmaz.
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-oy': 32 } });
  assert.deepEqual(sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc)['Türkçe Ödev Yaprakları'], [33, 34]);
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-oy': 37 } });
  assert.deepEqual(sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc)['Türkçe Ödev Yaprakları'], [38, 39, 40]);
  // Aynı konu okuma bölümüyle ayrılmışsa ayrı sayılır.
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-oy': 28 } });
  assert.deepEqual(sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc)['Türkçe Ödev Yaprakları'], [29, 30]);
  const sonOkuma = structuredClone(harita);
  sonOkuma.kitaplar.find(k => k.id === 'tr-oy').bolumler.at(-1).sayilmaz = true;
  await yaz(kitapYolu, sonOkuma);
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-oy': 88 } });
  assert.equal(sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc)['Türkçe Ödev Yaprakları'], undefined);
  await yaz(kitapYolu, harita);
  // Gün sayısı korunur; bilinmeyen dersler dağıtımı etkilemez.
  const fen = plan(['--konu', 'tr=0,mat=0,fen=1,sos=0']).sonuc;
  assert.deepEqual(fen.paket, [{ ders: 'Fen Bilimleri', kitap: 'Fen Avcı', sayfa: '31–34', konu: 'Kuvvetin Cisimler Üzerindeki Etkileri', yesilTest: '34' }]);
  assert.deepEqual(fen.gunler.map(g => g.odevler[0]?.sayfa), [undefined, '19', undefined, '20–22', undefined]);
  // Kalan bölüm bir sayılır, hemen ardından gelen iki karma test de eklenir.
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-avci': 90 } });
  const karma = sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc);
  assert.deepEqual(karma['Türkçe Avcı'], [91, 92, 93, 94]);
  // Sıradaki bölüm zaten karma ise yeni konu kotasını tüketmez.
  await yaz(ilerlemeYolu, { ...ilerleme, sonSayfa: { ...ilerleme.sonSayfa, 'tr-avci': 92 } });
  assert.deepEqual(sonlar(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0']).sonuc)['Türkçe Avcı'], [93, 94, 95, 96, 97, 98, 99, 100]);
  await yaz(ilerlemeYolu, ilerleme);
  for (const args of [[], ['--baslangic', '2026-12-01'], ['--baslangic', '2026-02-30'], [...tarih, '--ilerle'], [...tarih, '--kadar', 'tr-avci=239'], [...tarih, '--kadar', 'tr-avci=79'], [...tarih, '--konu', 'tr=-1'], [...tarih, '--konu', 'bilinmeyen=1'], [...tarih, '--hafta-sonu', 'belki'], [...tarih, '--bilinmeyen']]) calistir(args, 1);
  // Harita boşluğu, çakışması, aralık hatası ve eksik hafta reddedilir.
  for (const boz of [v => v.kitaplar[0].bolumler[1].bas++, v => v.kitaplar[0].bolumler[1].bas--, v => v.kitaplar[0].bolumler[0].son = 239, v => v.haftaSonu.haftalar.pop(), v => v.kitaplar[0].bolumler[0].yesilTest = [6, 12], v => v.kitaplar[1].bolumler[0].yesilTest = [3, 4], v => v.kitaplar[0].bolumler.find(b => b.karma).yesilTest = [49, 49]]) {
    const bozuk = structuredClone(harita);
    boz(bozuk);
    await yaz(kitapYolu, bozuk);
    calistir(['--denetle'], 1);
  }
  await yaz(kitapYolu, harita);
  // --denetle diğer iki dosyayı okumaz.
  await writeFile(ilerlemeYolu, 'geçersiz');
  await writeFile(programYolu, 'geçersiz');
  calistir(['--denetle']);
  await yaz(ilerlemeYolu, { ...ilerleme, haftaSonuSon: 35 });
  await yaz(programYolu, program);
  assert.equal(plan().sonuc.haftaSonu, null);
  // Tüm kitapların sonuna gelindiğinde sayfa veya hafta taşması olmaz.
  await yaz(ilerlemeYolu, { ...ilerleme, haftaSonuSon: 35, sonSayfa: Object.fromEntries(harita.kitaplar.map(k => [k.id, k.yanitAnahtari - 1])) });
  const bitti = plan().sonuc;
  assert(bitti.gunler.every(g => !g.odevler.length));
  assert.deepEqual(bitti.paket, []);
  await yaz(ilerlemeYolu, ilerleme);
  const uygunGunYok = structuredClone(program);
  for (const [gun, dersler] of Object.entries(uygunGunYok.gunler)) uygunGunYok.gunler[gun] = dersler.map(d => d === 'Türkçe' ? 'Müzik' : d);
  await yaz(programYolu, uygunGunYok);
  calistir(tarih, 1);
  // Yalnız paket varsa günlük ders aranmaz.
  assert.equal(plan(['--konu', 'tr=1,mat=0,fen=0,sos=0', '--kadar', 'tr-oy=34']).sonuc.paket[0].sayfa, '81–86');
  const bozukProgram = structuredClone(program);
  bozukProgram.gunler.Pazartesi = { 'Türkçe': 2 };
  await yaz(programYolu, bozukProgram);
  calistir(tarih, 1);
  await yaz(programYolu, program);
  // Yalnız --yaz ilerlemeyi değiştirmez; --ilerle atanan sayfaları ilerletir.
  plan(['--yaz']);
  assert.deepEqual(JSON.parse(await readFile(ilerlemeYolu, 'utf8')), ilerleme);
  const sonPlan = plan(['--konu', 'tr=1,mat=2,fen=0,sos=2', '--kadar', 'mat-oy=42', '--yaz', '--ilerle']).sonuc;
  assert.deepEqual(JSON.parse(await readFile(resolve(alan, 'kaynak-odev.json'), 'utf8')), sonPlan);
  const yeni = JSON.parse(await readFile(ilerlemeYolu, 'utf8'));
  assert.deepEqual(yeni.sonSayfa, { 'tr-avci': 86, 'tr-oy': 40, 'mat-avci': 92, 'mat-oy': 42, 'fen-avci': 30, 'fen-oy': 18, 'sos-avci': 32, 'sos-oy': 24 });
  assert.equal(yeni.haftaSonuSon, 8);
  assert.match(yeni.guncelleme, /^\d{4}-\d{2}-\d{2}$/);
  // Gerçek proje dosyalarının tamamı aynı kalmalı.
  for (let i = 0; i < dosyalar.length; i++) assert.equal(await readFile(new URL(`kaynak-kitap/${dosyalar[i]}`, kok), 'utf8'), orijinaller[i]);
  console.log(`Başarılı: ${kontrol} komut çalıştırması ve seçim, dağıtım, hata, dosya yazma kontrolleri.`);
} finally {
  const guvenliKok = resolve(fileURLToPath(kok));
  if (!resolve(alan).startsWith(guvenliKok + sep)) throw Error('Geçici test klasörü proje dışında; temizlenmedi.');
  await rm(alan, { recursive: true, force: true });
}
