/** 4/D öğrenci projesi: sadece doğrulanmış oturuma duyuru OKUMA. */
const DUYURU_SAYFASI_='DUYURULAR';
/** "Yayında", "YAYINDA ", "Arşiv" gibi elle yazılmış durumları tek biçime getirir. */
function duyuruDurumuNormal_(v){
  return String(v||'').trim().toUpperCase().replace(/̇/g,'')
    .replace(/Ş/g,'S').replace(/İ/g,'I').replace(/Ğ/g,'G').replace(/Ü/g,'U').replace(/Ö/g,'O').replace(/Ç/g,'C');
}
function ogrenciDuyurulari(token){
  const oturum=oturumKaydi_(token);
  if(!oturum || !kayitNoIle_(oturum.no)) return {basarili:false,duyurular:[]};
  const sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DUYURU_SAYFASI_);
  if(!sh)return {basarili:true,duyurular:[]};
  const count=Math.max(0,sh.getLastRow()-1);
  if(!count)return {basarili:true,duyurular:[]};
  const rows=sh.getRange(2,1,count,5).getValues(),now=Date.now();
  const list=rows.filter(r=>duyuruDurumuNormal_(r[3])==='YAYINDA')
    .filter(r=>!r[4]||(r[4] instanceof Date&&Number.isFinite(r[4].getTime())&&r[4].getTime()>=now))
    .sort((a,b)=>(Number(b[0])||0)-(Number(a[0])||0)).slice(0,20)
    .map(r=>{
      const z=Number(r[0]);
      return {baslik:r[1] instanceof Date ? Utilities.formatDate(r[1], 'Europe/Istanbul', 'dd.MM.yyyy') : String(r[1]).slice(0,120),
        metin:String(r[2]).slice(0,1500),
        // Kimlik, duyurunun eklendiği anın zaman damgasıdır; tarih rozetinde kullanılır.
        zaman:Number.isSafeInteger(z)&&z>1e12&&z<=now+864e5?z:0};
    });
  return {basarili:true,duyurular:list};
}
