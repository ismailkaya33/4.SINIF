// TEST ÖRNEĞİ — gerçek ders notu değildir; tools/sketchnote/test/calistir.mjs kullanır.
// Serbest düzen (Sketchnote.ciz): eskiden araç "Sketchnote.ciz is not a function" diye duruyordu.
Sketchnote.ciz(S => {
  S.yazi(620, 200, 'SERBEST DÜZEN: çığ, şiir, ödül', 60, { class: 'kalin', 'text-anchor': 'middle' });
  S.cerceve(200, 300, 840, 300);
  S.ok([[300, 700], [600, 760], [900, 700]]);
  S.simge.ampul(620, 1000);
  S.paragraf(200, 400, 'Serbest düzende yazı, çerçeve, ok ve simgeler doğrudan çizilir.', 34, 800, 44);
});
