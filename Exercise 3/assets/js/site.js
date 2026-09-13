/* ============================================================
   site.js — small helpers used on every page
   ------------------------------------------------------------
   Keeps the footer copyright year current without editing the
   HTML each January. The HTML contains a hard-coded year as a
   fallback, so the footer still reads correctly if JavaScript
   is unavailable.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
