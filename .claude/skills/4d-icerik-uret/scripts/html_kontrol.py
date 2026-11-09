#!/usr/bin/env python3
"""Tek dosyalık HTML etkinlik/oyun için hızlı statik kontrol.

Kullanım:  python3 -I html_kontrol.py index.html [diger.html ...]

Kontroller sezgiseldir: bulunan her şey kesin hata, bulunmayan her şey
kesin doğru demek değildir. Oyunu ayrıca tarayıcıda dokunma/fare/klavye ile
denemek gerekir. Çıkış kodu: HATA varsa 1, yoksa 0.
"""
import re
import sys
from pathlib import Path

EXT_PATTERNS = [
    (r'<script[^>]+src\s*=\s*["\']\s*(?:https?:)?//[^"\']+', 'harici <script>'),
    (r'<link[^>]+href\s*=\s*["\']\s*(?:https?:)?//[^"\']+', 'harici <link> (stil/font)'),
    (r'<img[^>]+src\s*=\s*["\']\s*(?:https?:)?//[^"\']+', 'harici görsel'),
    (r'@import\s+(?:url\()?\s*["\']?\s*(?:https?:)?//[^)"\';]+', '@import ile harici stil'),
    (r'url\(\s*["\']?\s*(?:https?:)?//[^)"\']+', 'CSS url() ile harici kaynak'),
]


def line_of(text, pos):
    return text.count('\n', 0, pos) + 1


def check(path):
    text = Path(path).read_text(encoding='utf-8', errors='replace')
    out = []  # (seviye, mesaj)

    # 1) Dış bağımlılık (çevrimdışı sınıfta bozulur)
    for pat, ad in EXT_PATTERNS:
        for m in re.finditer(pat, text, re.I):
            url = re.search(r'(?:https?:)?//[^\s"\')]+', m.group(0))
            out.append(('HATA', f'{ad}: {url.group(0) if url else m.group(0)[:80]} (satır {line_of(text, m.start())})'))

    # 2) Temel sayfa ayarları
    if not re.search(r'<meta[^>]+name\s*=\s*["\']viewport', text, re.I):
        out.append(('HATA', 'viewport meta etiketi yok (telefonda düzgün görünmez)'))
    if not re.search(r'<html[^>]+lang\s*=\s*["\']tr', text, re.I):
        out.append(('UYARI', '<html lang="tr"> yok'))
    if not re.search(r'<meta[^>]+charset', text, re.I):
        out.append(('UYARI', 'charset (UTF-8) meta etiketi yok, Türkçe karakter bozulabilir'))

    # 3) Kayıt
    uses_ls = 'localStorage' in text
    if uses_ls:
        unsafe = 0
        for m in re.finditer(r'localStorage\s*\.', text):
            before = text[max(0, m.start() - 400):m.start()]
            if 'try' not in before:
                unsafe += 1
        if unsafe:
            out.append(('UYARI', f'{unsafe} localStorage erişimi try/catch içinde görünmüyor (depolama kapalıysa çökebilir)'))
    else:
        out.append(('UYARI', 'localStorage kullanılmıyor: sayfa yenilenince ilerleme/rekor kaybolur'))

    # 4) Girdi yolları
    has_pointer = re.search(r'pointerdown|pointermove|touchstart|touchmove|mousedown|mousemove|onclick|\.click\b|addEventListener\(\s*["\']click', text)
    has_key = re.search(r'keydown|keyup|keypress', text)
    if not has_pointer:
        out.append(('UYARI', 'dokunma/fare olayı bulunamadı'))
    if not has_key:
        out.append(('BİLGİ', 'klavye olayı yok (akıllı tahtada/klavyeyle kullanım için düşün)'))
    if has_pointer and has_key:
        out.append(('BİLGİ', 'Dokunma, fare ve klavye yolları aynı durum değişkenlerini güncelliyor mu? Elle dene.'))

    # 5) Canvas / animasyon
    if re.search(r'getContext\(\s*["\']2d', text):
        if 'devicePixelRatio' not in text:
            out.append(('BİLGİ', 'canvas devicePixelRatio ile ölçeklenmiyor (yüksek çözünürlüklü ekranda bulanık olabilir)'))
    if 'requestAnimationFrame' in text and 'visibilitychange' not in text:
        out.append(('BİLGİ', 'sekme gizlenince otomatik duraklatma (visibilitychange) yok'))
    if 'prefers-reduced-motion' not in text and re.search(r'@keyframes|animation\s*:', text):
        out.append(('BİLGİ', 'prefers-reduced-motion desteği yok'))

    # 6) Seçenek karıştırma (sezgisel)
    if not re.search(r'shuffle|shuf\s*\(|Math\.random\(\)\s*-\s*0?\.5|sort\(\s*\(\)\s*=>\s*Math\.random', text, re.I):
        out.append(('UYARI', 'karıştırma (shuffle) kodu bulunamadı: seçenek sırası sabitse doğru cevap konumu tahmin edilebilir'))
    else:
        out.append(('BİLGİ', 'Karıştırma kodu var, ama seçeneklerin kendisinin karıştığını doğrula (kart/soru sırası ≠ şık sırası).'))

    # 6b) Öğretmen raporu / kazanım analizi
    if 'RaporMotoru' not in text:
        out.append(('UYARI', 'RaporMotoru yok: sonuç portala/öğretmen paneline gitmez (assets/rapor_motoru.js). Oyunlar klasörü için gerekmez.'))
    else:
        if 'RaporMotoru.kaydet' not in text:
            out.append(('UYARI', 'RaporMotoru gömülü ama kaydet() hiç çağrılmıyor: rapor boş çıkar'))
        if 'ekranCiz' not in text and 'RaporMotoru.bitir' not in text:
            out.append(('UYARI', 'RaporMotoru.ekranCiz() / bitir() çağrılmıyor: sonuç portala gitmez, karne görünmez'))
        if '4d:activity-finished' not in text:
            out.append(('HATA', 'Gömülü rapor motoru eski sürüm (portal köprüsü yok): assets/rapor_motoru.js v2 ile yeniden birleştir'))
        m = re.search(r"\bid\s*:\s*['\"]([^'\"]+)['\"]", text)
        if m and m.group(1) == 'ornek-iskelet':
            out.append(('HATA', 'OYUN.id hâlâ örnek değer: portal kayıt listesindeki gerçek kimliği yaz'))

    # 7) Engelleyici pencereler
    for fn in ('alert', 'confirm', 'prompt'):
        if re.search(r'(?<![\w.])' + fn + r'\s*\(', text):
            out.append(('UYARI', f'{fn}() kullanılıyor; gömülü/ekran paylaşımı ortamlarında engellenebilir'))

    # 8) Erişilebilirlik / ölçek
    if re.search(r'user-scalable\s*=\s*no', text, re.I):
        out.append(('BİLGİ', 'user-scalable=no: yakınlaştırmayı kapatıyor, yalnızca oyun alanı için gerekliyse kalsın'))

    size_kb = len(text.encode('utf-8')) / 1024
    out.append(('BİLGİ', f'dosya boyutu {size_kb:.0f} KB'))
    return out


def main(paths):
    try:  # Windows konsolunda Türkçe karakterler için
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    if not paths:
        print(__doc__)
        return 2
    exit_code = 0
    for p in paths:
        print(f'\n=== {Path(p).name} ===')
        results = check(p)
        for sev in ('HATA', 'UYARI', 'BİLGİ'):
            for s, msg in results:
                if s == sev:
                    print(f'  [{sev}] {msg}')
        if any(s == 'HATA' for s, _ in results):
            exit_code = 1
        if not any(s in ('HATA', 'UYARI') for s, _ in results):
            print('  Otomatik kontrolde sorun görünmedi (elle test yine gerekli).')
    return exit_code


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
