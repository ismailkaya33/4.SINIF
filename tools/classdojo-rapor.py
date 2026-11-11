"""ClassDojo aylık raporundan portal tablosu için satır hazırlar.

Kullanım (proje klasöründe):
    python -I tools/classdojo-rapor.py "ClassDojo Reports for ....pdf"
    python -I tools/classdojo-rapor.py "ClassDojo Reports for ....pdf" --bol   (isteğe bağlı: öğrenci başına PDF)

Çıktılar (hepsi VeliRaporlari/ altında, GitHub'a GİTMEZ):
    VeliRaporlari/<yyyy-aa Ay>/tabloya-yapistir.tsv -> portal tablosundaki VELI_RAPORLARI sayfasına yapıştırılır
    VeliRaporlari/<yyyy-aa Ay>/<ÖĞRENCİ ADI>.pdf   -> yalnız --bol verilirse (öğretmen artık istemiyor; rapor portalda)

Gerekli: pip install pypdf
"""
import os
import re
import sys

from pypdf import PdfReader, PdfWriter

AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
         "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
BASLIK = ["Ay", "Dönem", "Öğrenci", "Olumlu sayısı", "Olumlu puan", "Geliştirme sayısı",
          "Geliştirme puanı", "Yüzde", "Olumlu davranışlar", "Geliştirmesi gerekenler", "Durum"]
DAVRANIS = re.compile(r"^(.+?)\s+([+-]\d+)$")
TOPLAM = re.compile(r"^(\d+)\s+awards?\s+\(([+-]?\d+)\s+points?\)$", re.I)


def sayfa_oku(metin):
    satirlar = [s.strip() for s in metin.splitlines() if s.strip()]
    duz = " ".join(satirlar)
    ad = re.search(r"Kime:\s*(.+?)\s+ve\s+", duz)
    donem = re.search(r"(\d{1,2} \S+ \d{4}) ile (\d{1,2} \S+ \d{4}) arasına", duz)
    yuzde = re.search(r"(?:^|\s)(\d{1,3})%", duz)
    if not ad or not donem:
        raise ValueError("Sayfada ad ya da tarih bulunamadı")
    bolumler = {"olumlu": [0, 0, []], "gelistirme": [0, 0, []]}
    simdiki = None
    for s in satirlar:
        if s == "Olumlu" and simdiki is None:
            simdiki = "olumlu"
            continue
        if s.startswith("Geliştirmesi gerek"):
            simdiki = "gelistirme"
            continue
        if simdiki is None or re.fullmatch(r"\d{1,3}%", s):
            if re.fullmatch(r"\d{1,3}%", s):
                simdiki = "bitti"
            continue
        if simdiki == "bitti":
            continue
        t = TOPLAM.match(s)
        if t:
            bolumler[simdiki][0] = int(t.group(1))
            bolumler[simdiki][1] = abs(int(t.group(2)))
            continue
        d = DAVRANIS.match(s)
        if d:
            bolumler[simdiki][2].append(f"{d.group(1).strip()} {d.group(2)}")
    for anahtar, (_, puan, liste) in bolumler.items():
        toplam = sum(abs(int(x.rsplit(" ", 1)[1])) for x in liste)
        if toplam != puan:
            raise ValueError(f"{anahtar} puanları tutmuyor ({toplam} != {puan})")
    return {
        "ad": ad.group(1).strip(),
        "baslangic": donem.group(1), "bitis": donem.group(2),
        "yuzde": int(yuzde.group(1)) if yuzde else "",
        "olumlu": bolumler["olumlu"], "gelistirme": bolumler["gelistirme"],
    }


def ay_etiketi(baslangic):
    gun, ay, yil = baslangic.split()
    return f"{yil}-{AYLAR.index(ay) + 1:02d} {ay}"


def guvenli_dosya_adi(ad):
    return re.sub(r'[<>:"/\\|?*]', "", ad).strip() or "adsiz"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    argumanlar = [a for a in sys.argv[1:] if a != "--bol"]
    bol = "--bol" in sys.argv[1:]
    if len(argumanlar) != 1:
        print(__doc__)
        sys.exit(2)
    okuyucu = PdfReader(argumanlar[0])
    kayitlar = []
    for i, sayfa in enumerate(okuyucu.pages, 1):
        try:
            kayitlar.append((sayfa, sayfa_oku(sayfa.extract_text() or "")))
        except ValueError as hata:
            print(f"HATA: {i}. sayfa okunamadı: {hata}")
            sys.exit(1)
    aylar = {ay_etiketi(k["baslangic"]) for _, k in kayitlar}
    if len(aylar) != 1:
        print("HATA: PDF'te birden fazla dönem var:", aylar)
        sys.exit(1)
    ay = aylar.pop()
    adlar = [k["ad"] for _, k in kayitlar]
    if len(adlar) != len(set(adlar)):
        print("HATA: aynı ad iki kez geçiyor")
        sys.exit(1)
    hedef = os.path.join("VeliRaporlari", ay)
    os.makedirs(hedef, exist_ok=True)
    satirlar = ["\t".join(BASLIK)]
    for sayfa, k in kayitlar:
        if bol:
            yazici = PdfWriter()
            yazici.add_page(sayfa)
            with open(os.path.join(hedef, guvenli_dosya_adi(k["ad"]) + ".pdf"), "wb") as f:
                yazici.write(f)
        o, g = k["olumlu"], k["gelistirme"]
        satirlar.append("\t".join(str(x) for x in [
            ay, f"{k['baslangic']} – {k['bitis']}", k["ad"], o[0], o[1], g[0], -g[1] if g[1] else 0,
            k["yuzde"], " | ".join(o[2]), " | ".join(g[2]), "YAYINDA"]))
    tsv = os.path.join(hedef, "tabloya-yapistir.tsv")
    with open(tsv, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(satirlar) + "\n")
    print(f"Tamam: {ay} | {len(kayitlar)} öğrenci | klasör: {hedef}" + (" | öğrenci PDF'leri bölündü" if bol else ""))
    print(f"Tabloya yapıştırılacak dosya: {tsv}")


if __name__ == "__main__":
    main()
