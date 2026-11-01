/* 4/D etkinlik sonucunu tek biçime dönüştürür.
 * Bu modül sonuç GÖNDERMEZ, oturum token'ına erişmez, öğrenci kimliği içermez.
 * Bu dosya tarayıcı tarafında veri biçimini denetler; gerçek kimlik doğrulaması Apps Script sunucusunda yapılır. */
export const RESULT_SCHEMA_VERSION = 1;
const INTEGER = v => Number.isSafeInteger(v);
export const ACTIVITY_CATALOG = Object.freeze({
  "mat-kayipsayilar": Object.freeze({
    activityId: "mat-kayipsayilar",
    subject: "Matematik",
    // Kazanım kodu öğretmen onayı gerektirir; üretim doğrulamasında sunucu kataloğu esas alınır.
    candidateOutcomeId: "M.4.1.3.4"
  })
});

export function normalizeActivityResult(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("Etkinlik sonucu nesne olmalıdır.");
  }
  const activityId = input.activityId;
  if (typeof activityId !== "string" || !Object.hasOwn(ACTIVITY_CATALOG, activityId)) {
    throw new TypeError("Bilinmeyen etkinlik.");
  }
  for (const key of ["correct", "wrong", "total", "wrongAttempts", "firstTry", "durationSeconds"]) {
    if (!INTEGER(input[key]) || input[key] < 0) {
      throw new TypeError(key + " geçersiz.");
    }
  }
  if (input.total < 1 || input.total > 1000 ||
      input.correct > input.total || input.wrong > input.total ||
      input.firstTry > input.correct || input.durationSeconds > 86400 ||
      input.wrongAttempts > 10000 || input.correct + input.wrong !== input.total) {
    throw new RangeError("Sonuç alanları birbiriyle uyumsuz.");
  }
  return Object.freeze({
    schemaVersion: RESULT_SCHEMA_VERSION,
    activityId,
    correct: input.correct,
    wrong: input.wrong,
    total: input.total,
    wrongAttempts: input.wrongAttempts,
    firstTry: input.firstTry,
    durationSeconds: input.durationSeconds
  });
}
