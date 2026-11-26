/** 4/D öğrenci projesi: Sosyometri ("Sınıf Arkadaşlarım") anketi KALDIRILDI (öğretmenin kararı 2026-11-26).
 *
 * Öğrenci sayfasında anket kartı yoktur. Bu dosya yalnız güvenlik kilidi olarak durur:
 * eski sayfası açık kalmış bir tarayıcı bu işlevleri çağırırsa anket "kapalı" görünür ve cevap kaydedilmez.
 * (GitHub → Apps Script eşitlemesi listede olmayan dosyayı silmediği için dosya boşaltılmadı, kilit olarak bırakıldı.)
 *
 * Toplanmış cevaplar öğretmenin özel tablosundaki SOSYOMETRI sayfasında durur; öğretmen panelinden
 * okunur ve rapor bittikten sonra panelden kalıcı silinir (portal/SOSYOMETRI_KVKK_NOTU.md).
 */
function ogrenciSosyometri(token) {
  return {basarili: true, acik: false};
}

function sosyometriCevapla(token, turKimlik, cevaplar) {
  return {basarili: false, mesaj: 'Bu anket kapatıldı.'};
}
