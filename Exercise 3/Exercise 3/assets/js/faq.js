/* ============================================================
   faq.js — accordion behaviour for the FAQ section
   ------------------------------------------------------------
   How it works:
     1. Each question is a <button> with aria-controls pointing
        at the id of its answer panel.
     2. Every panel starts with the [hidden] attribute, so the
        answers are hidden by default even if JavaScript is off.
     3. Clicking a question toggles [hidden] and flips the
        aria-expanded value, which the CSS uses to rotate the
        "+" marker.
   Using a real <button> means keyboard users get Enter/Space
   support for free — no extra key handling needed.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var questions = document.querySelectorAll('.faq__question');

  questions.forEach(function (question) {
    question.addEventListener('click', function () {
      var panelId = question.getAttribute('aria-controls');
      var panel = document.getElementById(panelId);
      if (!panel) return;

      var isOpen = question.getAttribute('aria-expanded') === 'true';

      // Close every panel first so only one answer is open at a
      // time (classic accordion behaviour).
      closeAll();

      // If the clicked one was closed, open it.
      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  function closeAll() {
    questions.forEach(function (q) {
      q.setAttribute('aria-expanded', 'false');
      var p = document.getElementById(q.getAttribute('aria-controls'));
      if (p) p.hidden = true;
    });
  }
});
