import {existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {join, resolve, extname} from 'node:path';

const [target, remoteDir] = process.argv.slice(2);
if (!['student','teacher'].includes(target) || !remoteDir) throw Error('Invalid sync target');
const root=process.cwd(), dest=resolve(remoteDir);
const student=[
 ['portal/appsscript/Kod.gs','Kod'],
 ['portal/appsscript/GirisGuvenligi.gs','GirisGuvenligi'],
 ['portal/appsscript/OgrenciOturum.gs','OgrenciOturum'],
 ['portal/appsscript/OgrenciDuyurulari.gs','OgrenciDuyurulari'],
 ['portal/appsscript/OgrenciAnketleri.gs','OgrenciAnketleri'],
 ['portal/appsscript/EtkinlikKayitDefteri.gs','EtkinlikKayitDefteri'],
 ['portal/appsscript/EtkinlikSonuclari.gs','EtkinlikSonuclari'],
 ['portal/appsscript/OgrenciCalismaDurumu.gs','OgrenciCalismaDurumu'],
 ['portal/appsscript/VeliRaporu.gs','VeliRaporu'],
 ['portal/appsscript/AyinYildizlari.gs','AyinYildizlari'],
 ['portal/appsscript/Sosyometri.gs','Sosyometri'],
 ['portal/appsscript/VeliOnaylari.gs','VeliOnaylari'],
 ['portal/appsscript/OgrenciGiris_Guncel.html','OgrenciGiris']
];
const teacher=[
 ['portal/ogretmen-rapor/OgretmenRapor.gs','Kod'],
 ['portal/ogretmen-rapor/OgretmenDuyuruTaslak.gs','OgretmenDuyuruTaslak'],
 ['portal/ogretmen-rapor/OgretmenAnket.gs','OgretmenAnket'],
 ['portal/ogretmen-rapor/OgretmenSosyometri.gs','OgretmenSosyometri'],
 ['portal/ogretmen-rapor/OgretmenVeliOnaylari.gs','OgretmenVeliOnaylari'],
 ['portal/ogretmen-rapor/OgretmenRapor.html','OgretmenRapor']
];
const mapping=target==='student'?student:teacher;
if (!existsSync(join(dest,'appsscript.json'))) throw Error('Remote manifest missing: refuse to push.');
const remoteFiles=readdirSync(dest);
const safeNames=remoteFiles.filter(n=>/\.(?:gs|js|html)$/.test(n)).sort();
process.stdout.write('Remote Apps Script source filenames: '+safeNames.join(', ')+'\n');
const sourceFile=(name)=>{
 const f=join(root,name);
 if(!existsSync(f))throw Error('Missing source '+name);
 return readFileSync(f,'utf8');
};
const canonical=(value)=>value.normalize('NFKD').replace(/\p{M}/gu,'').replace(/ı/g,'i').replace(/İ/g,'I').toLowerCase();
const findFile=(base, ext)=>{
 const extensions=ext==='gs'?['gs','js']:[ext];
 const matches=remoteFiles.filter(f=>extensions.some(e=>canonical(f)===canonical(base+'.'+e)));
 if(matches.length>1)throw Error('Ambiguous source filename for '+base+': '+matches.join(', '));
 return matches[0];
};
for(const required of (target==='student'?['Kod','GirisGuvenligi','OgrenciOturum','OgrenciGiris']:['Kod','OgretmenRapor'])){
 const ext=required==='OgrenciGiris'||required==='OgretmenRapor'?'html':'gs';
 if(!findFile(required,ext))throw Error('Expected existing script file missing: '+required+'; found: '+safeNames.join(', ')+'. Verify script ID and filename.');
}
for(const [src, base] of mapping){
 const extension=extname(src)==='.html'?'html':'gs';
 const existing=findFile(base,extension);
 const filename=existing??base+'.'+(extension==='gs'?'js':'html');
 const source=sourceFile(src);
 if(!source.trim())throw Error('Blank source '+src);
 writeFileSync(join(dest,filename),source,'utf8');
 process.stdout.write('Prepared '+filename+'\n');
}
process.stdout.write('Preserved remote manifest and unlisted files. No deployment created.\n');
