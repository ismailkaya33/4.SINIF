// Defter notu: Sosyal/DefterNotlari/ailetarihi.png — kazanım: SB.4.2.1 (tools/defter-kazanim.json)
const AGAC = (anahtar) => {
  const k = (x, y, ad, yaz) => `<rect x="${x}" y="${y}" width="92" height="30" rx="5" fill="#fff" stroke="#111" stroke-width="1.3"/><text x="${x + 46}" y="${y + 12}" font-size="9" text-anchor="middle" fill="#555">${ad}</text>${anahtar && yaz ? `<text x="${x + 46}" y="${y + 25}" font-size="9" text-anchor="middle" fill="#c00">${yaz}</text>` : `<line x1="${x + 8}" y1="${y + 25}" x2="${x + 84}" y2="${y + 25}" stroke="#999"/>`}`;
  const c = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} V${(y1 + y2) / 2} H${x2} V${y2}" fill="none" stroke="#111"/>`;
  return `<svg viewBox="0 0 420 150" style="width:100%;display:block">
    ${k(4, 4, 'Babaannem', 'ad')}${k(104, 4, 'Dedem', 'ad')}${k(224, 4, 'Anneannem', 'ad')}${k(324, 4, 'Dedem', 'ad')}
    ${c(96, 19, 100, 19)}${c(316, 19, 320, 19)}
    <line x1="96" y1="19" x2="104" y2="19" stroke="#111"/><line x1="316" y1="19" x2="324" y2="19" stroke="#111"/>
    ${c(100, 19, 100, 60)}${c(320, 19, 320, 60)}
    ${k(54, 60, 'Babam', 'ad')}${k(274, 60, 'Annem', 'ad')}
    <line x1="146" y1="75" x2="274" y2="75" stroke="#111"/>${c(210, 75, 210, 112)}
    ${k(164, 112, 'BEN', 'ad')}
  </svg>`;
};
export default {
  ders: 'Sosyal', baslik: 'Aile Tarihim',
  sayfalar: [[
    { tur: 'bosluk', genis: true, baslik: 'Hatırlayalım', kutu: ['aile ağacı', 'aile büyüklerimizden', 'fotoğraf', 'belgeler', 'kronolojik'], maddeler: [
      'Ailemizi oluşturan kişileri ve aralarındaki akrabalık bağını gösteren şemaya [aile ağacı] denir.',
      'Aile tarihimizi öğrenmek için [aile büyüklerimizden] bilgi alırız.',
      'Eski [fotoğraf] lar, mektuplar, karneler ve kimlik kartları gibi [belgeler] aile tarihimizin kanıtlarıdır.',
      'Olayları oluş sırasına göre dizmeye [kronolojik] sıralama denir.',
    ] },
    { tur: 'html', genis: true, baslik: 'Aile ağacımı tamamla', yonerge: 'Kutulara aile büyüklerinin adlarını yaz.', html: AGAC(false), anahtarHtml: '<p class="ornek">Öğrenci kutulara aile büyüklerinin adlarını yazar. Babanın anne-babası babaanne-dede, annenin anne-babası anneanne-dede olarak doğru yerleştirilmeli.</p>' },
    { tur: 'eslestir', genis: true, baslik: 'Akrabalık bağları', ciftler: [
      ['Babamın annesi', 'babaanne'], ['Annemin annesi', 'anneanne'], ['Babamın kız kardeşi', 'hala'], ['Annemin kız kardeşi', 'teyze'], ['Babamın erkek kardeşi', 'amca'], ['Annemin erkek kardeşi', 'dayı'],
    ], fazla: ['kuzen'] },
    { tur: 'dy', genis: true, baslik: 'Doğru mu, yanlış mı?', yonerge: 'Doğruysa D, yanlışsa Y yaz.', maddeler: [
      ['Aile ağacında en altta en yaşlı aile bireyleri yer alır.', false],
      ['Eski fotoğraflar aile tarihimizi öğrenmemize yardım eder.', true],
      ['Kronolojik sıralamada olaylar oluş sırasına göre dizilir.', true],
    ] },
  ], [
    { tur: 'tablo', genis: true, baslik: 'Zaman şeridi', yonerge: 'Olayları oluş sırasına göre 1\'den 5\'e kadar numaralandır.', basliklar: ['Olay', 'Sıra'], genislik: ['80%', '20%'], ortala: false, satirlar: [
      ['Okula başladım.', '[3]'], ['Annem ile babam evlendi.', '[1]'], ['4. sınıfa geçtim.', '[5]'], ['Ben doğdum.', '[2]'], ['Kardeşim doğdu.', '[4]'],
    ] },
    { tur: 'siniflandir', genis: true, baslik: 'Aile tarihini öğrenme kaynakları', yonerge: 'Hangileri aile tarihimizi öğrenmemize yardım eder?', kelimeler: ['dedemin askerlik fotoğrafı', 'anneannemin anıları', 'eski bir mektup', 'bir çizgi film', 'babamın ilkokul karnesi', 'yarınki hava durumu'], gruplar: [
      { ad: 'Yardım eder ✓', uyeler: ['dedemin askerlik fotoğrafı', 'anneannemin anıları', 'eski bir mektup', 'babamın ilkokul karnesi'] },
      { ad: 'Yardım etmez ✗', uyeler: ['bir çizgi film', 'yarınki hava durumu'] },
    ] },
    { tur: 'tablo', genis: true, baslik: 'Aile büyüğümle görüşme', yonerge: 'Bir aile büyüğüne sor, cevapları yaz.', basliklar: ['Soru', 'Cevap'], genislik: ['45%', '55%'], satirlar: [
      ['Nerede ve ne zaman doğdun?', ''], ['Çocukluğunda yaşadığın ev nasıldı?', ''], ['Ailemizde nesilden nesile aktarılan bir eşya var mı?', ''], ['Hatırladığın önemli bir aile olayı nedir?', ''],
    ], satirYuk: '11mm' },
    { tur: 'yaz', genis: true, baslik: 'Aile hikâyem', sorular: [
      { s: 'Görüşmede öğrendiğin en ilginç aile anısını iki üç cümleyle yaz.', satir: 3, cevap: 'Öğrencinin kendi cevabı.' },
    ] },
  ]],
};
