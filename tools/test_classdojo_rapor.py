"""classdojo-rapor.py için testler. YALNIZ SENTETİK veri kullanır (gerçek öğrenci adı/PDF yok).

Çalıştırma (proje klasöründe):  python -I tools/test_classdojo_rapor.py
"""
import importlib.util
import os
import sys
import tempfile

sys.stdout.reconfigure(encoding="utf-8")
YOL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "classdojo-rapor.py")
spec = importlib.util.spec_from_file_location("classdojo_rapor", YOL)
cr = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cr)

BASARILI = 0


def test(ad):
    def sar(f):
        global BASARILI
        f()
        BASARILI += 1
        print(f"  ok  {ad}")
        return f
    return sar


def sayfa(ad="ÖRNEK ÖĞRENCİ", olumlu=(("Derse katılım", 2), ("Yardımlaşma", 1)), gelisme=(("Ödev eksik", -1),),
          yuzde=75, ay="Ekim", toplam_olumlu=None, baslik_olumlu="Olumlu"):
    p = sum(abs(x) for _, x in olumlu) if toplam_olumlu is None else toplam_olumlu
    g = sum(abs(x) for _, x in gelisme)
    satirlar = [f"Kime: {ad} ve ailesi", f"1 {ay} 2026 ile 31 {ay} 2026 arasına ait rapor", baslik_olumlu,
                f"{len(olumlu)} awards (+{p} points)"]
    satirlar += [f"{n} {'+' if x > 0 else ''}{x}" for n, x in olumlu]
    satirlar += ["Geliştirmesi gerekenler", f"{len(gelisme)} awards (-{g} points)"]
    satirlar += [f"{n} {x}" for n, x in gelisme]
    satirlar += [f"{yuzde}%"]
    return "\n".join(satirlar)


def kayit(ad, olumlu_puan, gelisme_puan=0, yuzde=50):
    return {"ad": ad, "baslangic": "1 Kasım 2026", "bitis": "30 Kasım 2026", "yuzde": yuzde,
            "olumlu": [1, olumlu_puan, []], "gelistirme": [1, gelisme_puan, []]}


def yildiz_calistir(kayitlar, onceki_tsv=None):
    """Geçici klasörde çalışır; önceki ay TSV'si verilirse oraya yazar. (uyarilar, yildiz_satirlari) döner."""
    eski = os.getcwd()
    with tempfile.TemporaryDirectory() as d:
        os.chdir(d)
        try:
            ay = "2026-11 Kasım"
            os.makedirs(os.path.join("VeliRaporlari", ay))
            if onceki_tsv:
                os.makedirs(os.path.join("VeliRaporlari", "2026-10 Ekim"))
                with open(os.path.join("VeliRaporlari", "2026-10 Ekim", "tabloya-yapistir.tsv"), "w", encoding="utf-8") as f:
                    f.write("\t".join(cr.BASLIK) + "\n")
                    for ad, y in onceki_tsv.items():
                        f.write("\t".join(["2026-10 Ekim", "x", ad, "1", "1", "0", "0", str(y), "", "", "YAYINDA"]) + "\n")
            sys_stdout, sys.stdout = sys.stdout, open(os.devnull, "w", encoding="utf-8")
            try:
                uyarilar = cr.yildizlari_hazirla(ay, kayitlar, os.path.join("VeliRaporlari", ay))
            finally:
                sys.stdout.close()
                sys.stdout = sys_stdout
            with open(os.path.join("VeliRaporlari", ay, "yildizlar-yapistir.tsv"), encoding="utf-8") as f:
                satirlar = [s.split("\t") for s in f.read().splitlines()[1:]]
            return uyarilar, satirlar
        finally:
            os.chdir(eski)


@test("normal sayfa doğru okunur")
def _():
    k = cr.sayfa_oku(sayfa())
    assert k["ad"] == "ÖRNEK ÖĞRENCİ" and k["yuzde"] == 75
    assert k["olumlu"][1] == 3 and k["gelistirme"][1] == 1 and len(k["olumlu"][2]) == 2


@test("puan toplamı tutmazsa durur")
def _():
    try:
        cr.sayfa_oku(sayfa(toplam_olumlu=9))
    except ValueError:
        return
    raise AssertionError("hata bekleniyordu")


@test("ad/tarih yoksa durur")
def _():
    try:
        cr.sayfa_oku("rastgele metin")
    except ValueError:
        return
    raise AssertionError("hata bekleniyordu")


@test("İngilizce ay adı anlaşılır hata verir")
def _():
    try:
        cr.ay_etiketi("1 October 2026")
    except ValueError as h:
        assert "Türkçe" in str(h)
        return
    raise AssertionError("hata bekleniyordu")


@test("ay etiketi")
def _():
    assert cr.ay_etiketi("1 Kasım 2026") == "2026-11 Kasım"


@test("kısa ad: soyadın baş harfi; tek kelime değişmez")
def _():
    assert cr.kisa_ad("ÖRNEK İKİ ADLI") == "ÖRNEK İKİ A."
    assert cr.kisa_ad("TEKAD") == "TEKAD"


@test("Türkçe alfabe sırası (Ç, C'den sonra; Ş, S'den sonra)")
def _():
    assert sorted(["ŞA", "SA", "ÇA", "CA"], key=cr.tr_sirala) == ["CA", "ÇA", "SA", "ŞA"]


@test("ilk üç net puana göre seçilir, eşitlik yoksa uyarı yok")
def _():
    ks = [kayit(f"ÖĞRENCİ {c}", p) for c, p in zip("ABCDEFGHIJKL", [30, 25, 20, 15, 14, 13, 12, 11, 10, 9, 8, 7])]
    uy, sat = yildiz_calistir(ks)
    assert [s[1] for s in sat[:3]] == ["1", "2", "3"] and sat[0][4] == "ÖĞRENCİ A"
    assert not [u for u in uy if "eşit" in u]


@test("1.–2. eşitliği öğretmene bildirilir")
def _():
    ks = [kayit("ÖĞRENCİ A", 30), kayit("ÖĞRENCİ B", 30), kayit("ÖĞRENCİ C", 20), kayit("ÖĞRENCİ D", 10)]
    uy, _ = yildiz_calistir(ks)
    assert any("1. ve 2." in u for u in uy)


@test("3.–4. eşitliği (ödül sınırı) bildirilir")
def _():
    ks = [kayit("ÖĞRENCİ A", 30), kayit("ÖĞRENCİ B", 25), kayit("ÖĞRENCİ C", 20), kayit("ÖĞRENCİ D", 20)]
    uy, _ = yildiz_calistir(ks)
    assert any("3. ve 4." in u and "ödül sınırı" in u for u in uy)


@test("10.–11. eşitliğinde Onur Listesi 7'den fazla olur")
def _():
    puan = [50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 10, 5]
    ks = [kayit(f"ÖĞRENCİ {c}", p) for c, p in zip("ABCDEFGHIJKL", puan)]
    _, sat = yildiz_calistir(ks)
    assert len([s for s in sat if s[1] == "ONUR"]) == 8


@test("4'ten az öğrencide çökmez")
def _():
    _, sat = yildiz_calistir([kayit("ÖĞRENCİ A", 5), kayit("ÖĞRENCİ B", 3), kayit("ÖĞRENCİ C", 1)])
    assert len(sat) == 3


@test("GELİŞEN: ilk üç hariç en çok artan; önceki ay yoksa yazılmaz")
def _():
    ks = [kayit("ÖĞRENCİ A", 30, yuzde=90), kayit("ÖĞRENCİ B", 25, yuzde=90), kayit("ÖĞRENCİ C", 20, yuzde=90),
          kayit("ÖĞRENCİ D", 10, yuzde=80), kayit("ÖĞRENCİ E", 9, yuzde=70)]
    _, sat = yildiz_calistir(ks)
    assert not [s for s in sat if s[1] == "GELİŞEN"]
    _, sat = yildiz_calistir(ks, {"ÖĞRENCİ A": 10, "ÖĞRENCİ B": 10, "ÖĞRENCİ C": 10, "ÖĞRENCİ D": 50, "ÖĞRENCİ E": 60})
    gel = [s for s in sat if s[1] == "GELİŞEN"]
    assert len(gel) == 1 and gel[0][4] == "ÖĞRENCİ D"


@test("GELİŞEN eşitliği bildirilir")
def _():
    ks = [kayit("ÖĞRENCİ A", 30), kayit("ÖĞRENCİ B", 25), kayit("ÖĞRENCİ C", 20),
          kayit("ÖĞRENCİ D", 10, yuzde=80), kayit("ÖĞRENCİ E", 9, yuzde=80)]
    uy, _ = yildiz_calistir(ks, {"ÖĞRENCİ A": 50, "ÖĞRENCİ B": 50, "ÖĞRENCİ C": 50, "ÖĞRENCİ D": 60, "ÖĞRENCİ E": 60})
    assert any("GELİŞEN için eşitlik" in u for u in uy)


@test("GELİŞEN: artış yoksa satır yazılmaz")
def _():
    ks = [kayit("ÖĞRENCİ A", 30), kayit("ÖĞRENCİ B", 25), kayit("ÖĞRENCİ C", 20), kayit("ÖĞRENCİ D", 10, yuzde=50)]
    _, sat = yildiz_calistir(ks, {"ÖĞRENCİ A": 50, "ÖĞRENCİ B": 50, "ÖĞRENCİ C": 50, "ÖĞRENCİ D": 60})
    assert not [s for s in sat if s[1] == "GELİŞEN"]


@test("önceki ayda olmayan ad bildirilir")
def _():
    ks = [kayit("ÖĞRENCİ A", 30), kayit("ÖĞRENCİ B", 25), kayit("ÖĞRENCİ C", 20), kayit("YENİ ÖĞRENCİ", 10)]
    uy, _ = yildiz_calistir(ks, {"ÖĞRENCİ A": 50, "ÖĞRENCİ B": 50, "ÖĞRENCİ C": 50})
    assert any("YENİ ÖĞRENCİ" in u for u in uy)


@test("TSV başlık sütun sayısı 11 (portal VELI_RAPORLARI ile aynı)")
def _():
    assert len(cr.BASLIK) == 11


print(f"PASS: {BASARILI} test")
