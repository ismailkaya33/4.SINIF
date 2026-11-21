// Defter notu: Sosyal/DefterNotlari/sos-yonler-1..2.png — kazanım kodu doğrulanmalı
const YONLER = [['K', 0], ['KD', 45], ['D', 90], ['GD', 135], ['G', 180], ['GB', 225], ['B', 270], ['KB', 315]];
function yonGulu(anahtar) {
  const parca = YONLER.map(([ad, a]) => {
    const r = a * Math.PI / 180, ana = ad.length === 1, u = ana ? 62 : 48;
    const x = 100 + Math.sin(r) * u, y = 100 - Math.cos(r) * u, lx = 100 + Math.sin(r) * 84, ly = 100 - Math.cos(r) * 84;
    const yaz = ad === 'K' || anahtar;
    return `<line x1="100" y1="100" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#111" stroke-width="${ana ? 2.4 : 1.2}"/>` +
      `<rect x="${(lx - 13).toFixed(1)}" y="${(ly - 9).toFixed(1)}" width="26" height="18" rx="3" fill="#fff" stroke="#555"/>` +
      (yaz ? `<text x="${lx.toFixed(1)}" y="${(ly + 4.5).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${ad === 'K' ? '#111' : '#c00'}">${ad}</text>` : '');
  }).join('');
  return `<svg viewBox="0 0 200 200" style="width:62mm;display:block;margin:0 auto">${parca}<circle cx="100" cy="100" r="5" fill="#111"/></svg>`;
}
export default {
  ders: 'Sosyal', baslik: 'Yönler',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Ana yönler ve ara yönler', kutu: ['kuzey', 'güney', 'doğu', 'batı', 'ara yönler', 'kuzeydoğu', 'güneybatı'], maddeler: [
      'Dört ana yön [kuzey] , [güney] , [doğu] ve [batı] dır.',
      'İki ana yönün arasında kalan yönlere [ara yönler] denir.',
      'Kuzey ile doğunun arasındaki yön [kuzeydoğu] , güney ile batının arasındaki yön [güneybatı] dır.',
    ] },
    { tur: 'html', baslik: 'Yön gülünü tamamla', yonerge: 'Boş kutulara yönlerin kısaltmasını yaz.', html: yonGulu(false), anahtarHtml: yonGulu(true) },
    { tur: 'tablo', baslik: 'Kısaltmalar', ortala: true, basliklar: ['Yön', 'Kısaltma'], satirlar: [
      ['kuzeydoğu', '[KD]'], ['güneydoğu', '[GD]'], ['[kuzeybatı]', 'KB'], ['güneybatı', '[GB]'], ['[batı]', 'B'],
    ] },
    { tur: 'bosluk', genis: true, baslik: 'Yön bulma yolları', kutu: ['doğudan', 'batıdan', 'kuzeyi', 'güneyi', 'Kutup Yıldızı', 'pusula'], maddeler: [
      'Güneş sabahları [doğudan] doğar, akşamları [batıdan] batar.',
      'Sabah yüzümüzü Güneş\'e dönüp kollarımızı açarsak sol kolumuz [kuzeyi] , sağ kolumuz [güneyi] gösterir.',
      '[pusula] nın kırmızı ucu her zaman kuzeyi gösterir.',
      'Öğle vakti gölgemiz [kuzeyi] gösterir.',
      'Geceleri [Kutup Yıldızı] kuzeyi gösterir.',
    ] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Kuzeyin tam karşısı güneydir.', true],
      ['Akşam Güneş\'e bakan biri doğuya bakıyordur.', false],
      ['Haritalarda kuzey genellikle yukarıdadır.', true],
      ['Kuzeydoğunun tam karşısı güneybatıdır.', true],
      ['Bulutlu bir günde Güneş\'le yön bulmak kolaydır.', false],
    ] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Sınıfımızda yönler', yonerge: 'Sınıfında tahtanın kuzeyde olduğunu düşün. Aşağıdakilerin hangi yönde olduğunu kendi sınıfına bakarak yaz.', basliklar: ['Sınıftaki yer/eşya', 'Bulunduğu yön'], genislik: ['55%', '45%'], satirlar: [
      ['Tahta', 'kuzey'], ['Kapı', '?Sınıfa göre değişir (örnek: güney)'], ['Pencereler', '?Sınıfa göre değişir (örnek: batı)'], ['Öğretmen masası', '?Sınıfa göre değişir'], ['Benim sıram', '?Sınıfa göre değişir'],
    ], satirYuk: '8mm' },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [
      { s: 'Sabah okul bahçesinde Güneş\'e bakan Ali\'nin arkası hangi yöndedir?', sec: ['Doğu', 'Batı', 'Kuzey'], d: 1 },
      { s: 'Kuzeye doğru yürüyen Elif sağa dönerse hangi yöne gider?', sec: ['Doğuya', 'Batıya', 'Güneye'], d: 0 },
      { s: 'Güneydoğuya bakan biri tam arkasına dönerse hangi yöne bakar?', sec: ['Kuzeybatıya', 'Kuzeydoğuya', 'Güneybatıya'], d: 0 },
      { s: 'Hangisi gece yön bulmaya yardımcı olur?', sec: ['Gölge', 'Kutup Yıldızı', 'Güneş'], d: 1 },
    ] },
    { tur: 'yaz', genis: true, baslik: 'Yön tarifi', sorular: [
      { s: 'Evinden okuluna nasıl gittiğini yön adlarını kullanarak (kuzeye yürü, doğuya dön…) anlat.', satir: 3, cevap: 'Öğrencinin kendi cevabı; en az iki yön adı doğru kullanılmalı.' },
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 10, kelimeler: ['kuzey', 'güney', 'doğu', 'batı', 'pusula', 'gölge', 'yıldız'] },
    { tur: 'bosluk', baslik: 'Bilmece', maddeler: ['Sabah beni önüne alırsan arkan [batı] olur.', 'Kırmızı ucum hep [kuzeyi] gösterir. Ben [pusula] yım.', 'Gece gökyüzünde parlarım, kuzeyi gösteririm. Ben [Kutup Yıldızı] yım.'] },
  ]],
};
