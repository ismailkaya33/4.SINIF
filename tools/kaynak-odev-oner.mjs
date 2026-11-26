#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

const kok = new URL('..', import.meta.url);
const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const dersler = { tr: 'Türkçe', mat: 'Matematik', fen: 'Fen Bilimleri', sos: 'Sosyal Bilgiler' };
const aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const oku = async yol => JSON.parse((await readFile(new URL(yol, kok), 'utf8')).replace(/^\uFEFF/, ''));
const yaz = (yol, veri) => writeFile(new URL(yol, kok), JSON.stringify(veri, null, 2) + '\n', 'utf8');
const tam = x => Number.isSafeInteger(x) && x >= 0;
const tarih = d => d.toISOString().slice(0, 10);
const gunEkle = (d, n) => new Date(d.getTime() + n * 86400000);
const aralik = (a, b) => a === b ? String(a) : `${a}–${b}`;

function secenekler(args) {
  const sonuc = {};
  const bayraklar = new Set(['yaz', 'ilerle', 'denetle']);
  const degerler = new Set(['baslangic', 'kadar', 'konu', 'hafta-sonu', 'baslik']);
  for (let i = 0; i < args.length; i++) {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(args[i]);
    if (!m || (!bayraklar.has(m[1]) && !degerler.has(m[1]))) throw Error(`Bilinmeyen seçenek: ${args[i]}`);
    const [, ad, deger] = m;
    if (Object.hasOwn(sonuc, ad)) throw Error(`Seçenek yinelenmiş: --${ad}`);
    if (bayraklar.has(ad)) {
      if (deger !== undefined) throw Error(`--${ad} değer almaz.`);
      sonuc[ad] = true;
    } else {
      const v = deger ?? args[++i];
      if (!v || v.startsWith('--')) throw Error(`--${ad} için değer gerekli.`);
      sonuc[ad] = v;
    }
  }
  return sonuc;
}

function eslemeler(metin, izinli, ad) {
  const sonuc = {};
  if (metin === undefined) return sonuc;
  for (const parca of metin.split(',')) {
    const m = /^([^=\s]+)=(\d+)$/.exec(parca.trim());
    if (!m || !izinli.includes(m[1]) || !tam(Number(m[2]))) throw Error(`--${ad} geçersiz: ${parca}`);
    if (Object.hasOwn(sonuc, m[1])) throw Error(`--${ad} içinde anahtar yinelenmiş: ${m[1]}`);
    sonuc[m[1]] = Number(m[2]);
  }
  return sonuc;
}

function denetle(veri) {
  const hatalar = [], uyarilar = [];
  const ids = Object.keys(dersler).flatMap(d => [`${d}-avci`, `${d}-oy`]);
  const kitaplar = Array.isArray(veri.kitaplar) ? veri.kitaplar : [];
  if (kitaplar.length !== 8) hatalar.push('Tam 8 kitap olmalı.');
  for (const id of ids) if (kitaplar.filter(k => k.id === id).length !== 1) hatalar.push(`${id}: tek bir kitap kaydı olmalı.`);
  for (const k of kitaplar) {
    if (!ids.includes(k.id)) hatalar.push(`Bilinmeyen kitap: ${k.id}`);
    if (k.ders !== dersler[k.id?.split('-')[0]] || k.tur !== (k.id?.endsWith('-avci') ? 'avci' : 'odev-yapraklari') || !k.ad) hatalar.push(`${k.id}: kitap bilgileri geçersiz.`);
    if (!tam(k.yanitAnahtari) || k.yanitAnahtari < 2) hatalar.push(`${k.id}: yanıt anahtarı geçersiz.`);
    if (!Array.isArray(k.bolumler) || !k.bolumler.length) { hatalar.push(`${k.id}: bölümler eksik.`); continue; }
    k.bolumler.forEach((b, i) => {
      if (!tam(b.bas) || b.bas < 1 || !tam(b.son) || b.son < b.bas || b.son >= k.yanitAnahtari || !b.konu?.trim()) hatalar.push(`${k.id}: ${i + 1}. bölüm geçersiz.`);
      if (i && b.bas !== k.bolumler[i - 1].son + 1) hatalar.push(`${k.id}: ${b.bas}. sayfa öncesinde boşluk, çakışma veya sıra hatası.`);
      if (b.yesilTest !== undefined && (k.tur !== 'avci' || b.karma || !Array.isArray(b.yesilTest) || b.yesilTest.length !== 2 || !b.yesilTest.every(tam) || b.yesilTest[0] < b.bas || b.yesilTest[0] > b.son || b.yesilTest[1] !== b.son)) hatalar.push(`${k.id}: ${b.bas}. sayfada yeşil test aralığı geçersiz.`);
      if (b.sayilmaz !== undefined && typeof b.sayilmaz !== 'boolean') hatalar.push(`${k.id}: ${b.bas}. sayfada sayilmaz geçersiz.`);
      if (b.dogrulanmali) uyarilar.push(`${k.id} s. ${aralik(b.bas, b.son)}: ${b.konu}${b.metin ? ` (${b.metin})` : ''}`);
    });
    if (k.bolumler.at(-1).son !== k.yanitAnahtari - 1) hatalar.push(`${k.id}: son bölüm yanıt anahtarından hemen önce bitmeli.`);
  }
  const haftalar = Array.isArray(veri.haftaSonu?.haftalar) ? veri.haftaSonu.haftalar : [];
  if (haftalar.length !== 35) hatalar.push('Hafta sonu: tam 35 hafta olmalı.');
  for (let i = 1; i <= 35; i++) {
    const kayitlar = haftalar.filter(h => h.hafta === i);
    if (kayitlar.length !== 1) hatalar.push(`Hafta sonu: ${i}. hafta eksik veya yinelenmiş.`);
    for (const h of kayitlar) {
      if (Object.values(dersler).some(d => typeof h[d] !== 'string' || !h[d].trim())) hatalar.push(`Hafta sonu: ${i}. haftanın ders konuları eksik.`);
      if (h.dogrulanmali) uyarilar.push(`Hafta sonu: ${i}. hafta`);
    }
  }
  return { hatalar, uyarilar };
}

// Sayılmayan okuma bölümleri sonraki konuya, karma testler önceki konuya bağlıdır.
// Yalnız doğrudan art arda gelen aynı konulu normal bölümler tek kota tüketir.
function bolumSonu(kitap, ilk, adet) {
  if (!adet) return ilk - 1;
  let sayilan = 0, son = ilk - 1, onceki;
  for (const b of kitap.bolumler) {
    if (b.son < ilk) continue;
    if (b.sayilmaz) { onceki = undefined; continue; }
    if (b.karma) {
      // Bekleyen sayilmaz bölümleri sonraki sayılan konu olmadan dahil etme.
      if (b.bas === son + 1 || b.bas <= ilk) son = b.son;
      onceki = undefined;
      continue;
    }
    if (b.konu !== onceki) {
      if (sayilan >= adet) break;
      sayilan++;
    }
    son = b.son;
    onceki = b.konu;
  }
  return son;
}

function sayfaMetni(sayfalar) {
  const araliklar = [];
  for (const s of [...new Set(sayfalar)].sort((a, b) => a - b)) {
    const son = araliklar.at(-1);
    if (son && son[1] + 1 === s) son[1] = s;
    else araliklar.push([s, s]);
  }
  return araliklar.map(([a, b]) => aralik(a, b)).join(', ');
}

// En az bir sayfa koşuluyla, saat oranındaki kotalara en yakın tam sayılar.
function paylastir(toplam, agirliklar) {
  if (toplam < agirliklar.length) return agirliklar.map((_, i) => i < toplam ? 1 : 0);
  const toplamSaat = agirliklar.reduce((a, b) => a + b, 0);
  const kotalar = agirliklar.map(s => toplam * s / toplamSaat);
  const paylar = agirliklar.map(() => 1);
  for (let kalan = toplam - paylar.length; kalan > 0; kalan--) {
    let en = 0;
    for (let i = 1; i < paylar.length; i++) if (kotalar[i] - paylar[i] > kotalar[en] - paylar[en] + 1e-10) en = i;
    paylar[en]++;
  }
  return paylar;
}

async function main() {
  const sec = secenekler(process.argv.slice(2));
  const veri = await oku('kaynak-kitap/kitaplar.json');
  const { hatalar, uyarilar } = denetle(veri);
  if (sec.denetle) {
    for (const u of uyarilar) console.log(`Doğrulanmalı: ${u}`);
    for (const h of hatalar) console.error(`Hata: ${h}`);
    console.log(hatalar.length ? `Denetim başarısız: ${hatalar.length} hata.` : `Denetim başarılı: 8 kitap, 35 hafta. Doğrulanmalı: ${uyarilar.length} kayıt.`);
    if (hatalar.length) process.exitCode = 1;
    return;
  }
  if (hatalar.length) throw Error(`Kitap haritası geçersiz; --denetle çalıştırın. ${hatalar.join(' ')}`);
  if (sec.ilerle && !sec.yaz) throw Error('--ilerle yalnız --yaz ile birlikte kullanılabilir.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sec.baslangic ?? '')) throw Error('--baslangic YYYY-AA-GG biçiminde zorunludur.');
  const bas = new Date(`${sec.baslangic}T00:00:00Z`);
  if (!Number.isFinite(bas.getTime()) || tarih(bas) !== sec.baslangic) throw Error('Başlangıç tarihi geçersiz.');
  if (bas.getUTCDay() !== 1) throw Error('Başlangıç tarihi Pazartesi olmalı.');
  if (sec['hafta-sonu'] && !['evet', 'hayir'].includes(sec['hafta-sonu'])) throw Error('--hafta-sonu evet veya hayir olmalı.');
  const kadar = eslemeler(sec.kadar, veri.kitaplar.map(k => k.id), 'kadar');
  const konu = { tr: 1, mat: 1, fen: 1, sos: 1, ...eslemeler(sec.konu, Object.keys(dersler), 'konu') };
  const [ilerleme, program] = await Promise.all([oku('kaynak-kitap/ilerleme.json'), oku('kaynak-kitap/ders-programi.json')]);
  if (!tam(ilerleme.haftaSonuSon) || ilerleme.haftaSonuSon > 35) throw Error('İlerlemedeki haftaSonuSon 0–35 arasında olmalı.');
  for (const [gun, dersSirasi] of Object.entries(program.gunler ?? {})) {
    if (!gunler.includes(gun) || !Array.isArray(dersSirasi) || dersSirasi.length !== 6 || dersSirasi.some(d => typeof d !== 'string' || !d.trim())) throw Error(`Ders programında geçersiz gün: ${gun}`);
  }
  const saatSayisi = (gun, ders) => (program.gunler?.[gun] ?? []).filter(d => d === ders).length;
  const cuma = gunEkle(bas, 4);
  const baslik = bas.getUTCMonth() === cuma.getUTCMonth()
    ? `${bas.getUTCDate()}–${cuma.getUTCDate()} ${aylar[cuma.getUTCMonth()]}`
    : `${bas.getUTCDate()} ${aylar[bas.getUTCMonth()]}–${cuma.getUTCDate()} ${aylar[cuma.getUTCMonth()]}`;
  const sonuc = {
    aciklama: "Öğrenci portalındaki 'Kaynak Kitap Ödevlerim' kartı. Her hafta tools/kaynak-odev-oner.mjs ile üretilir; 'bitis'ten sonra kart gizlenir.",
    baslik: sec.baslik ?? baslik, baslangic: tarih(bas), bitis: tarih(gunEkle(bas, 6)),
    paket: [],
    gunler: gunler.map((gun, i) => ({ gun, tarih: tarih(gunEkle(bas, i)), odevler: [] })), haftaSonu: null
  };
  const yeniSonlar = {};
  for (const [kod, ders] of Object.entries(dersler)) {
    const sayfalar = [];
    const kitaplar = veri.kitaplar.filter(k => k.ders === ders).sort((a, b) => Number(a.tur !== 'avci') - Number(b.tur !== 'avci'));
    for (const k of kitaplar) {
      const onceki = ilerleme.sonSayfa?.[k.id];
      if (!tam(onceki) || onceki < k.bolumler[0].bas - 1 || onceki >= k.yanitAnahtari) throw Error(`${k.id}: ilerlemedeki sonSayfa geçersiz.`);
      const sinir = kadar[k.id];
      if (sinir !== undefined && (sinir < onceki || sinir >= k.yanitAnahtari)) throw Error(`${k.id}: --kadar ${onceki}–${k.yanitAnahtari - 1} arasında olmalı.`);
      // Ders kotası 0 ise açık sayfa sınırı da o derse ödev oluşturmaz.
      const son = konu[kod] === 0 ? onceki : sinir ?? bolumSonu(k, onceki + 1, konu[kod]);
      if (son > onceki) yeniSonlar[k.id] = son;
      const kitapSayfalari = [], yesilSayfalar = [], konular = new Set();
      for (let s = onceki + 1; s <= son; s++) {
        const bolum = k.bolumler.find(b => b.bas <= s && s <= b.son);
        if (k.tur === 'avci') {
          kitapSayfalari.push(s);
          konular.add(bolum.konu);
          if (bolum.yesilTest && s >= bolum.yesilTest[0] && s <= bolum.yesilTest[1]) yesilSayfalar.push(s);
        } else sayfalar.push({ kitap: k, sayfa: s, konu: bolum.konu });
      }
      if (kitapSayfalari.length) sonuc.paket.push({ ders, kitap: k.ad, sayfa: sayfaMetni(kitapSayfalari), konu: [...konular].join(' / '), ...(yesilSayfalar.length ? { yesilTest: sayfaMetni(yesilSayfalar) } : {}) });
      if (k.bolumler.some(b => b.dogrulanmali && b.son > onceki && b.bas <= son)) console.error(`Uyarı: ${k.ad} için seçilen aralıkta doğrulanmalı bölüm var.`);
    }
    if (!sayfalar.length) continue;
    const dersGunleri = sonuc.gunler.filter(g => saatSayisi(g.gun, ders) > 0);
    if (!dersGunleri.length) throw Error(`${ders}: ödev var fakat ders programında uygun gün yok.`);
    const paylar = paylastir(sayfalar.length, dersGunleri.map(g => saatSayisi(g.gun, ders)));
    let imlec = 0;
    dersGunleri.forEach((g, i) => {
      const dilim = sayfalar.slice(imlec, imlec + paylar[i]);
      imlec += paylar[i];
      let grup;
      const gruplar = [];
      for (const p of dilim) {
        if (!grup || grup.kitap.id !== p.kitap.id || grup.son + 1 !== p.sayfa) {
          grup = { kitap: p.kitap, ilk: p.sayfa, son: p.sayfa, konular: new Set() };
          gruplar.push(grup);
        }
        grup.son = p.sayfa;
        grup.konular.add(p.konu);
      }
      for (const a of gruplar) g.odevler.push({ ders, kitap: a.kitap.ad, sayfa: aralik(a.ilk, a.son), konu: [...a.konular].join(' / ') });
    });
  }
  const siradaki = veri.haftaSonu.haftalar.find(h => h.hafta === ilerleme.haftaSonuSon + 1);
  const konular = siradaki && Object.fromEntries(Object.values(dersler).map(d => [d, siradaki[d]]));
  if (siradaki && sec['hafta-sonu'] !== 'hayir') sonuc.haftaSonu = { kitap: veri.haftaSonu.ad, sayfa: `${siradaki.hafta}. Hafta`, konular };
  if (sec.yaz) {
    await yaz('kaynak-odev.json', sonuc);
    if (sec.ilerle) {
      ilerleme.sonSayfa = { ...ilerleme.sonSayfa, ...yeniSonlar };
      if (sonuc.haftaSonu) ilerleme.haftaSonuSon = siradaki.hafta;
      // Öğretmenin bilgisayarının yerel takvim tarihi.
      const simdi = new Date();
      ilerleme.guncelleme = `${simdi.getFullYear()}-${String(simdi.getMonth() + 1).padStart(2, '0')}-${String(simdi.getDate()).padStart(2, '0')}`;
      await yaz('kaynak-kitap/ilerleme.json', ilerleme);
    }
  }
  console.log(JSON.stringify(sonuc, null, 2));
  console.log(`\n${sonuc.baslik}\nOkula getir (zımbalı, hafta boyunca ödev dosyasında)\nDers | Kitap | Sayfa | Konu | Yeşil test (sınıfta)`);
  for (const p of sonuc.paket) console.log(`${p.ders} | ${p.kitap} | ${p.sayfa} | ${p.konu} | ${p.yesilTest ?? '—'}`);
  if (!sonuc.paket.length) console.log('Paket yok');
  console.log('\nEv ödevi (gün gün)\nGün | Ders | Kitap | Sayfa | Konu');
  for (const g of sonuc.gunler) {
    if (!g.odevler.length) console.log(`${g.gun} | — | — | — | Ödev yok`);
    for (const o of g.odevler) console.log(`${g.gun} | ${o.ders} | ${o.kitap} | ${o.sayfa} | ${o.konu}`);
  }
  if (siradaki) {
    console.log(`\nSıradaki hafta sonu: ${siradaki.hafta}. Hafta (${sonuc.haftaSonu ? 'eklendi' : 'eklenmedi'})`);
    for (const [d, k] of Object.entries(konular)) console.log(`${d}: ${k}`);
    if (siradaki.dogrulanmali) console.log('Uyarı: Bu haftanın konuları doğrulanmalı.');
    console.log('İşlenmemiş konu varsa verilmez; karar öğretmenindir.');
  } else console.log('\nHafta sonu kitabındaki 35 hafta tamamlanmış; sıradaki yaprak yok.');
  if (sec.yaz) console.log(`\nkaynak-odev.json yazıldı.${sec.ilerle ? ' İlerleme güncellendi.' : ''}`);
}

main().catch(hata => { console.error(`Hata: ${hata.message}`); process.exitCode = 1; });
