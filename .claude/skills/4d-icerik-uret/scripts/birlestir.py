#!/usr/bin/env python3
"""Oyun iskeletine rapor motorunu gömer (tek dosya, çevrimdışı).

Kullanım:  python3 -I birlestir.py oyun_kaynak.html cikti.html
oyun_kaynak.html içinde  /*@@RAPOR_MOTORU@@*/  yer tutucusu olmalı.
"""
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
MOTOR = HERE.parent / 'assets' / 'rapor_motoru.js'
YER = '/*@@RAPOR_MOTORU@@*/'


def main(argv):
    try:  # Windows konsolunda Türkçe karakterler için
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    if len(argv) != 2:
        print(__doc__)
        return 2
    kaynak, cikti = Path(argv[0]), Path(argv[1])
    metin = kaynak.read_text(encoding='utf-8')
    if metin.count(YER) != 1:
        print(f'HATA: {kaynak} içinde {YER} tam bir kez bulunmalı (bulunan: {metin.count(YER)})')
        return 1
    motor = MOTOR.read_text(encoding='utf-8').replace('</script', '<\\/script')
    cikti.write_text(metin.replace(YER, motor), encoding='utf-8')
    print(f'Yazıldı: {cikti} ({cikti.stat().st_size / 1024:.0f} KB)')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
