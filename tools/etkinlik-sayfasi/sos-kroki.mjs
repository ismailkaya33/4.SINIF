// Defter notu: Sosyal/DefterNotlari/sos-kroki-1..2.png — kazanım kodu doğrulanmalı
const KROKI = `<svg viewBox="0 0 320 210" style="width:100%;display:block">
  <rect x="1" y="1" width="318" height="208" fill="#fff" stroke="#555"/>
  <rect x="0" y="96" width="320" height="18" fill="#e4e4e4"/><rect x="150" y="0" width="18" height="210" fill="#e4e4e4"/>
  <text x="60" y="108" font-size="9" fill="#444">Lale Caddesi</text><text x="163" y="190" font-size="9" fill="#444" transform="rotate(-90 163 190)">Çınar Sokak</text>
  <g><circle cx="45" cy="40" r="9" fill="#bbb" stroke="#111"/><circle cx="70" cy="55" r="9" fill="#bbb" stroke="#111"/><circle cx="95" cy="35" r="9" fill="#bbb" stroke="#111"/><text x="70" y="82" font-size="10" text-anchor="middle" font-weight="700">PARK</text></g>
  <g><rect x="205" y="25" width="60" height="40" fill="#fff" stroke="#111" stroke-width="1.6"/><line x1="235" y1="25" x2="235" y2="8" stroke="#111"/><path d="M235 8 h14 l-4 4 l4 4 h-14z" fill="#111"/><text x="235" y="82" font-size="10" text-anchor="middle" font-weight="700">OKUL</text></g>
  <g><rect x="45" y="130" width="50" height="35" fill="#fff" stroke="#111" stroke-width="1.6"/><path d="M70 137 v21 M59.5 147.5 h21" stroke="#111" stroke-width="4"/><text x="70" y="182" font-size="10" text-anchor="middle" font-weight="700">SAĞLIK OCAĞI</text></g>
  <g><rect x="190" y="130" width="34" height="30" fill="#777" stroke="#111"/><text x="207" y="176" font-size="10" text-anchor="middle" font-weight="700">MARKET</text></g>
  <g><path d="M240 160 l17 -16 l17 16 v22 h-34z" fill="#fff" stroke="#111" stroke-width="1.6"/><text x="257" y="198" font-size="10" text-anchor="middle" font-weight="700">EV</text></g>
  <g><line x1="298" y1="40" x2="298" y2="12" stroke="#111" stroke-width="2"/><path d="M298 8 l-6 10 h12z" fill="#111"/><text x="298" y="52" font-size="11" text-anchor="middle" font-weight="700">K</text></g>
</svg>`;
export default {
  ders: 'Sosyal', baslik: 'Kroki',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Kroki nedir?', kutu: ['kuşbakışı', 'ölçü', 'simgelerle', 'yön oku', 'açıklama kutusu'], maddeler: [
      'Kroki, bir yerin [kuşbakışı] (yukarıdan) görünüşünün [ölçü] kullanılmadan yaklaşık olarak çizilmiş hâlidir.',
      'Krokide yerler ve eşyalar basit [simgelerle] gösterilir.',
      'Krokide kuzeyi göstermek için [yön oku] çizilir.',
      'Simgelerin ne anlama geldiği [açıklama kutusu] nda gösterilir.',
    ] },
    { tur: 'tablo', genis: true, baslik: 'Resim, kroki, harita', yonerge: 'Her özelliğin hangisine ait olduğunu işaretle (✓). Birden fazla olabilir.', ortala: true, basliklar: ['Özellik', 'Resim', 'Kroki', 'Harita'], genislik: ['46%', '18%', '18%', '18%'], satirYuk: '7mm', satirlar: [
      ['Kuşbakışı çizilir.', '', '?✓', '?✓'], ['Ölçek (ölçü) kullanılır.', '', '', '?✓'], ['Renk ve ayrıntılar bolca bulunur.', '?✓', '', ''], ['Simgeler kullanılır.', '', '?✓', '?✓'], ['Yön oku bulunur.', '', '?✓', '?✓'],
    ] },
    { tur: 'html', baslik: 'Mahalle krokisi', yonerge: 'Krokiyi incele, sonraki soruları cevapla.', html: KROKI },
    { tur: 'tablo', baslik: 'Krokiye göre cevapla', basliklar: ['Soru', 'Cevap'], genislik: ['62%', '38%'], satirlar: [
      ['Okul, parkın hangi yönündedir?', '[doğu]'], ['Sağlık ocağı, okulun hangi yönündedir?', '[güneybatı]'], ['Market, parkın hangi yönündedir?', '[güneydoğu]'], ['Evden okula gitmek için hangi yöne gidilir?', '[kuzey]'], ['Park ile sağlık ocağını hangi cadde ayırır?', '[Lale Caddesi]'],
    ] },
    { tur: 'coktan', genis: true, baslik: 'Doğru seçeneği işaretle', sorular: [{ s: 'Hangisi kroki için doğrudur?', sec: ['Ölçek kullanılarak çizilir', 'Kuşbakışı ve ölçüsüz çizilir', 'Yandan bakılarak çizilir'], d: 1 }, { s: 'Krokide simgelerin anlamı nerede yazılır?', sec: ['Yön okunda', 'Açıklama kutusunda', 'Başlıkta'], d: 1 }] },
  ], [
    { tur: 'eslestir', genis: true, baslik: 'Kroki çizerken', yonerge: 'Adımları doğru sıraya koymak için kutulara 1, 2, 3, 4 yaz.', ciftler: [
      ['Çizeceğim yeri yukarıdan bakıyormuş gibi düşünürüm.', '1'], ['Önemli yerleri ve eşyaları simgelerle çizerim.', '2'], ['Kuzeyi gösteren yön okunu eklerim.', '3'], ['Simgelerin anlamını açıklama kutusuna yazarım.', '4'],
    ] },
    { tur: 'html', genis: true, baslik: 'Sınıfının krokisini çiz', yonerge: 'Sınıfını kuşbakışı düşün. Tahta, kapı, pencere, sıralar ve öğretmen masasını simgelerle çiz. Yön okunu ve açıklama kutusunu ekle.', html: '<div style="display:grid;grid-template-columns:1fr 34mm;gap:2mm"><div style="height:70mm;border:1px solid #777;background-image:linear-gradient(#e6e6e6 1px,transparent 1px),linear-gradient(90deg,#e6e6e6 1px,transparent 1px);background-size:5mm 5mm"></div><div style="border:1px solid #777;padding:1.5mm;font-size:9pt"><b>Açıklama kutusu</b><div style="border-bottom:1px solid #999;height:8mm"></div><div style="border-bottom:1px solid #999;height:8mm"></div><div style="border-bottom:1px solid #999;height:8mm"></div><div style="border-bottom:1px solid #999;height:8mm"></div><div style="border-bottom:1px solid #999;height:8mm"></div><div style="border-bottom:1px solid #999;height:8mm"></div></div></div>', anahtarHtml: '<p class="ornek">Öğrencinin çizimi: kuşbakışı, simgeler, yön oku ve açıklama kutusu var mı? Tahta, kapı ve pencerelerin yönleri doğru mu?</p>' },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Krokide eşyaların renklerini ve desenlerini ayrıntılı çizeriz.', false],
      ['Kroki çizerken kuşbakışı bakarız.', true],
      ['Kroki, bir yere nasıl gidileceğini anlatmak için kullanılabilir.', true],
      ['Krokide yön oku olmaz.', false],
    ] },
    { tur: 'kelimeavi', baslik: 'Kelime avı', boyut: 9, kelimeler: ['kroki', 'simge', 'yön', 'harita', 'resim', 'kuzey', 'ölçek'] },
    { tur: 'yaz', baslik: 'Düşün', sorular: [
      { s: 'Arkadaşın evine ilk kez gelecek. Ona neden kroki çizmek işini kolaylaştırır?', satir: 4, cevap: 'Kroki yolu ve önemli yerleri kısa ve anlaşılır gösterir; kaybolmadan gelir.' },
    ] },
  ]],
};
