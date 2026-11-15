// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Kavram haritası: tek sayıda kutu (5), bilinmeyen simge (uyarı), örneksiz kutu.
Sketchnote.kavramHaritasi({
  baslik: 'BEŞ KUTU',
  giris: 'Tek sayıda kutu olunca sağ sütunda bir kutu eksik kalır; oklar yine doğru çizilmelidir.',
  merkez: ['BEŞ', 'KUTU'],
  kutular: [
    { ad: 'Çiçek', is: 'Birinci kutunun açıklaması.', ornek: 'gül, lale', simge: 'yildiz' },
    { ad: 'Ağaç', is: 'İkinci kutunun açıklaması.', simge: 'olmayan-simge' },
    { ad: 'Şehir', is: 'Üçüncü kutunun açıklaması.', ornek: 'İzmir, Iğdır' },
    { ad: 'Göl', is: 'Dördüncü kutunun açıklaması.', ornek: 'Van Gölü', simge: 'damla' },
    { ad: 'Üzüm', is: 'Beşinci kutunun açıklaması.', simge: 'portakal' },
  ],
  unutma: ['Tek sayıda kutu da çizilebilir.'],
});
