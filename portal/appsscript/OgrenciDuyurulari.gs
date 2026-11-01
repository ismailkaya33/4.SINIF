/** 4/D öğrenci projesi: sadece doğrulanmış oturuma duyuru OKUMA. */
const DUYURU_SAYFASI_='DUYURULAR';
function ogrenciDuyurulari(token){
  const oturum=oturumKaydi_(token);
  if(!oturum || !kayitNoIle_(oturum.no)) return {basarili:false,duyurular:[]};
  const sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DUYURU_SAYFASI_);
  if(!sh)return {basarili:true,duyurular:[]};
  const count=Math.max(0,sh.getLastRow()-1);
  if(!count)return {basarili:true,duyurular:[]};
  const rows=sh.getRange(2,1,count,5).getValues(),now=Date.now();
  const list=rows.filter(r=>String(r[3]).toUpperCase()==='YAYINDA')
    .filter(r=>!r[4]||(r[4] instanceof Date&&Number.isFinite(r[4].getTime())&&r[4].getTime()>=now))
    .sort((a,b)=>(Number(b[0])||0)-(Number(a[0])||0)).slice(0,20)
    .map(r=>({baslik:String(r[1]).slice(0,120),metin:String(r[2]).slice(0,1500)}));
  return {basarili:true,duyurular:list};
}
