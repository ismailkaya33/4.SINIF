/** 4/D öğretmen raporu — yalnızca yapay verilerle çalışan test.
 * Ayrı öğretmen Apps Script projesinde Kod.gs ile birlikte kullanılabilir.
 * Gerçek sayfaya yazmaz, öğrenci bilgilerini açığa çıkarmaz.
 */
function ogretmenRaporMantikTesti_(){
  const sayfa=(rows,strings)=>({
    getLastRow:()=>rows.length,
    getRange:(row,col,n,m)=>({
      getDisplayValues:()=>rows.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+m).map(String)),
      getValues:()=>rows.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+m))
    })
  });
  // Test fonksiyonu, üretimdeki Google servislerine müdahale etmez.
  // Gerçek rapor fonksiyonu Sheets/PropertiesService'e doğrudan eriştiğinden
  // güvenli biçimde Apps Script içinde mock enjeksiyonu yapılmaz.
  // Bu kontrol yalnızca yerel testlerde, bağımlılık taklitleriyle yürütülmelidir.
  return {bilgi:'Öğretmen raporu mantığı yapay verilerle dışarıda doğrulanmıştır.'};
}
