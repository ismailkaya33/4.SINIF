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
    if ay not in AYLAR:
        raise ValueError(f"Ay adı tanınmadı: '{ay}'. ClassDojo raporu Türkçe dilde indirilmeli.")
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
    try:
        aylar = {ay_etiketi(k["baslangic"]) for _, k in kayitlar}
    except ValueError as hata:
        print(f"HATA: {hata}")
        sys.exit(1)
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


TR_ALFABE = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"


def tr_sirala(ad):
    """Türkçe alfabe sırası için anahtar (Ç, Ş, Ö... Z'den sonraya düşmesin)."""
    return [TR_ALFABE.find(h) if h in TR_ALFABE else 100 + ord(h) for h in ad.upper()]


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


def net(k):
    return k["olumlu"][1] - k["gelistirme"][1]


def esitlik_uyarilari(sirali):
    """İlk dörtte yan yana eşit net puanlar için öğretmene uyarı metinleri (hesap değişmez)."""
    uyarilar = []
    for i in range(min(3, len(sirali) - 1)):
        if net(sirali[i]) == net(sirali[i + 1]):
            neden = "ödül sınırı" if i == 2 else "sıralama"
            uyarilar.append(f"{i + 1}. ve {i + 2}. sırada eşit net puan ({net(sirali[i])}) — {neden}; öğretmen karar vermeli.")
    return uyarilar


def yildizlari_hazirla(ay, kayitlar, hedef):
    """Ayın ilk üçü (net puan = olumlu − geliştirme) ve ayın en çok geliştireni (olumlu yüzdesi artışı)."""
    sirali = sorted(kayitlar, key=lambda k: (-net(k), -(k["yuzde"] or 0), tr_sirala(k["ad"])))
    uyarilar = []
    satirlar = ["\t".join(["Ay", "Ödül", "Öğrenci", "Not", "Kayıt adı", "Durum"])]
    print(f"\nAYIN YILDIZLARI ({ay}) — net puan = olumlu − geliştirme")
    for i, k in enumerate(sirali[:5], 1):
        print(f"  {i}. {k['ad']}: net {net(k)} (olumlu {k['olumlu'][1]}, geliştirme {k['gelistirme'][1]}, %{k['yuzde']})")
    uyarilar += esitlik_uyarilari(sirali)
    for i, k in enumerate(sirali[:3], 1):
        satirlar.append("\t".join([ay, str(i), kisa_ad(k["ad"]), "", k["ad"], "YAYINDA"]))
    # Onur Listesi: 4.–10. sıra, SIRASIZ ve PUANSIZ (alfabetik). 10. ile eşit puanlılar da girer.
    if len(sirali) > 3:
        sinir = net(sirali[min(9, len(sirali) - 1)])
        onur = [k for i, k in enumerate(sirali[3:], 3) if i < 10 or net(k) == sinir]
        onur.sort(key=lambda k: tr_sirala(k["ad"]))
        print(f"ONUR LİSTESİ (4.–10. sıra, alfabetik, puansız): {len(onur)} öğrenci"
              + (" — 10. sırada eşitlik olduğu için 7'den fazla" if len(onur) > 7 else ""))
        for k in onur:
            print(f"  {k['ad']}")
            satirlar.append("\t".join([ay, "ONUR", kisa_ad(k["ad"]), "", k["ad"], "YAYINDA"]))
    onceki_ad, onceki = onceki_ay_yuzdeleri(ay)
    secilen, gelisen_uyarilari = gelisen_sec(kayitlar, sirali[:3], onceki)
    uyarilar += gelisen_uyarilari
    if secilen:
        fark, k = secilen[0]
        print(f"EN ÇOK GELİŞEN ({onceki_ad} → {ay}, olumlu yüzdesi artışı):")
        for f_, k_ in secilen[:3]:
            print(f"  {k_['ad']}: %{onceki[k_['ad']]} → %{k_['yuzde']} ({f_:+d})")
        if fark > 0:
            satirlar.append("\t".join([ay, "GELİŞEN", kisa_ad(k["ad"]), f"%{onceki[k['ad']]} → %{k['yuzde']}", k["ad"], "YAYINDA"]))
    elif not onceki:
        print("EN ÇOK GELİŞEN: önceki ayın tablosu yok, bu ay hesaplanamadı.")
    dosya = os.path.join(hedef, "yildizlar-yapistir.tsv")
    with open(dosya, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(satirlar) + "\n")
    print(f"Ayın Yıldızları dosyası: {dosya}")
    if uyarilar:
        print("\nÖĞRETMEN KONTROLÜ GEREKİYOR:")
        for u in uyarilar:
            print(f"  UYARI: {u}")
    return uyarilar


def gelisen_sec(kayitlar, ilk_uc_kayit, onceki):
    """GELİŞEN adaylarını (artışa göre sıralı) ve öğretmen uyarılarını döndürür. Ödül mantığı değişmez:
    ilk üç hariç, olumlu yüzdesi en çok artan; yalnız artış > 0 ise TSV'ye yazılır."""
    uyarilar = []
    if not onceki:
        return [], uyarilar
    ilk_uc = {k["ad"] for k in ilk_uc_kayit}
    bu_ay = {k["ad"] for k in kayitlar}
    eslesmeyen = sorted(bu_ay - set(onceki), key=tr_sirala)
    if eslesmeyen:
        uyarilar.append(f"Önceki ayın tablosunda bulunmayan {len(eslesmeyen)} ad var (yeni öğrenci ya da ad yazımı değişmiş "
                        f"olabilir); GELİŞEN hesabına katılmadılar: {', '.join(eslesmeyen)}")
    adaylar = [(k["yuzde"] - onceki[k["ad"]], k) for k in kayitlar
               if k["ad"] in onceki and k["ad"] not in ilk_uc and isinstance(k["yuzde"], int)]
    adaylar.sort(key=lambda x: (-x[0], tr_sirala(x[1]["ad"])))
    if len(adaylar) > 1 and adaylar[0][0] > 0 and adaylar[0][0] == adaylar[1][0]:
        esit = [k["ad"] for f, k in adaylar if f == adaylar[0][0]]
        uyarilar.append(f"GELİŞEN için eşitlik (+{adaylar[0][0]} puan): {', '.join(esit)}. Dosyaya alfabetik ilk yazıldı; "
                        "öğretmen karar vermeli, gerekirse tablodaki adı değiştirin.")
    return adaylar, uyarilar


if __name__ == "__main__":
    main()
