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
    yildizlari_hazirla(ay, [k for _, k in kayitlar], hedef)


def kisa_ad(ad):
    """'AYŞE ERVA UYSAL' -> 'AYŞE ERVA U.' (soyadın yalnız baş harfi)."""
    parcalar = ad.split()
    return ad if len(parcalar) < 2 else " ".join(parcalar[:-1]) + " " + parcalar[-1][0] + "."


def onceki_ay_yuzdeleri(ay):
    """VeliRaporlari altındaki bir önceki ayın tablosundan {ad: yüzde} okur; yoksa boş döner."""
    if not os.path.isdir("VeliRaporlari"):
        return None, {}
    onceki = sorted(d for d in os.listdir("VeliRaporlari") if d < ay and re.match(r"\d{4}-\d{2} ", d))
    if not onceki:
        return None, {}
    dosya = os.path.join("VeliRaporlari", onceki[-1], "tabloya-yapistir.tsv")
    if not os.path.exists(dosya):
        return None, {}
    sonuc = {}
    with open(dosya, encoding="utf-8") as f:
        for satir in f.read().splitlines()[1:]:
            s = satir.split("\t")
            if len(s) > 7 and s[7].strip().isdigit():
                sonuc[s[2]] = int(s[7])
    return onceki[-1], sonuc


def yildizlari_hazirla(ay, kayitlar, hedef):
    """Ayın ilk üçü (net puan = olumlu − geliştirme) ve ayın en çok geliştireni (olumlu yüzdesi artışı)."""
    sirali = sorted(kayitlar, key=lambda k: (-(k["olumlu"][1] - k["gelistirme"][1]), -(k["yuzde"] or 0), k["ad"]))
    net = lambda k: k["olumlu"][1] - k["gelistirme"][1]
    satirlar = ["\t".join(["Ay", "Ödül", "Öğrenci", "Not", "Kayıt adı", "Durum"])]
    print(f"\nAYIN YILDIZLARI ({ay}) — net puan = olumlu − geliştirme")
    for i, k in enumerate(sirali[:5], 1):
        print(f"  {i}. {k['ad']}: net {net(k)} (olumlu {k['olumlu'][1]}, geliştirme {k['gelistirme'][1]}, %{k['yuzde']})")
    if net(sirali[2]) == net(sirali[3]):
        print("  UYARI: 3. ve 4. sırada eşitlik var; öğretmen karar vermeli.")
    for i, k in enumerate(sirali[:3], 1):
        satirlar.append("\t".join([ay, str(i), kisa_ad(k["ad"]), "", k["ad"], "YAYINDA"]))
    onceki_ad, onceki = onceki_ay_yuzdeleri(ay)
    ilk_uc = {k["ad"] for k in sirali[:3]}
    adaylar = [(k["yuzde"] - onceki[k["ad"]], k) for k in kayitlar
               if k["ad"] in onceki and k["ad"] not in ilk_uc and isinstance(k["yuzde"], int)]
    if adaylar:
        adaylar.sort(key=lambda x: (-x[0], x[1]["ad"]))
        print(f"EN ÇOK GELİŞEN ({onceki_ad} → {ay}, olumlu yüzdesi artışı):")
        for fark, k in adaylar[:3]:
            print(f"  {k['ad']}: %{onceki[k['ad']]} → %{k['yuzde']} ({fark:+d})")
        fark, k = adaylar[0]
        if fark > 0:
            satirlar.append("\t".join([ay, "GELİŞEN", kisa_ad(k["ad"]), f"%{onceki[k['ad']]} → %{k['yuzde']}", k["ad"], "YAYINDA"]))
    else:
        print("EN ÇOK GELİŞEN: önceki ayın tablosu yok, bu ay hesaplanamadı.")
    dosya = os.path.join(hedef, "yildizlar-yapistir.tsv")
    with open(dosya, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(satirlar) + "\n")
    print(f"Ayın Yıldızları dosyası: {dosya}")


if __name__ == "__main__":
    main()
