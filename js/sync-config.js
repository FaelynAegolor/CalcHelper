/* CalcHelper — where the activity summary gets sent.
   =====================================================================
   Fill these two in after you deploy the Apps Script (tools/apps-script/README.md
   walks through it). Leave ENDPOINT as an empty string and nothing is ever sent —
   the site then behaves exactly as it did before.

   Both values end up in the published JavaScript, so treat them as public:
   the TOKEN stops casual junk being posted to your Sheet, it does not make the
   endpoint secret. Nobody can read the Sheet with them — the endpoint only writes.
   ===================================================================== */
window.CH = window.CH || {};
window.CH.syncConfig = {
  ENDPOINT: '',          // <-- the only thing left to fill in: the /exec URL from step 4
  TOKEN: 'H8YJYTEnpfKrvWCNTDKkBKuCbstn3iDMXEfGuAmM',   // already matches Code.gs
  MIN_INTERVAL_MIN: 10   // never send more often than this while she is working
};
