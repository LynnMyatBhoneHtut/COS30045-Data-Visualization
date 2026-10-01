/* ============================================================
   tabs.js — exercise tabs
   ------------------------------------------------------------
   Adapted from the Exercise 3 story tabs (assets/js/tabs.js in
   the Exercise 3 folder). Same WAI-ARIA tabs pattern:
     - click a tab, or use the arrow keys, to switch exercises
     - Home and End jump to the first and last tab
     - the open tab is written to the URL (index.html#ex-4-6),
       so a link or a refresh reopens the same exercise
   Changes from Exercise 3: tabs are matched by data-tab instead
   of data-story, and opening a tab from the URL scrolls the tab
   strip into view instead of jumping to the top of the page.
   ============================================================ */

(function () {
  "use strict";

  var tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  var tabs = Array.prototype.slice.call(
    tablist.querySelectorAll('[role="tab"]')
  );
  if (tabs.length === 0) return;

  function panelFor(tab) {
    return document.getElementById(tab.getAttribute("aria-controls"));
  }

  function activate(tab, options) {
    var opts = options || {};

    tabs.forEach(function (t) {
      var isSelected = t === tab;
      var panel = panelFor(t);

      t.setAttribute("aria-selected", isSelected ? "true" : "false");
      t.tabIndex = isSelected ? 0 : -1;
      if (panel) panel.hidden = !isSelected;
    });

    if (opts.focus) tab.focus();

    // Reflect the choice in the URL without adding a history entry,
    // so refreshing or sharing the link reopens the same exercise.
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + tab.dataset.tab);
    }
  }

  function tabFromHash() {
    var requested = window.location.hash.replace("#", "");
    if (!requested) return null;
    return tabs.filter(function (t) {
      return t.dataset.tab === requested;
    })[0] || null;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(tab);
    });

    tab.addEventListener("keydown", function (event) {
      var index = tabs.indexOf(tab);
      var next = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = tabs[(index + 1) % tabs.length];
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = tabs[(index - 1 + tabs.length) % tabs.length];
          break;
        case "Home":
          next = tabs[0];
          break;
        case "End":
          next = tabs[tabs.length - 1];
          break;
        default:
          return;
      }

      event.preventDefault();
      activate(next, { focus: true });
    });
  });

  // Open the exercise named in the URL, e.g. index.html#ex-4-6,
  // and bring the tab strip into view.
  var match = tabFromHash();
  if (match) {
    activate(match);
    var section = tablist.closest("section");
    if (section) section.scrollIntoView();
  }

  // Links inside the page (for example the step list in the hero)
  // change the hash; follow them.
  window.addEventListener("hashchange", function () {
    var target = tabFromHash();
    if (target) {
      activate(target);
      var section = tablist.closest("section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  });
})();
