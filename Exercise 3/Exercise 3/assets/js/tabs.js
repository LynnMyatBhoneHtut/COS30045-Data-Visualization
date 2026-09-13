/* ============================================================
   STORY TABS
   Append to the end of assets/js/site.js
   Implements the WAI-ARIA tabs pattern: arrow keys move between
   tabs, Home and End jump to the ends, and the active story is
   reflected in the URL so it can be linked to directly.
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
    // so refreshing or sharing the link reopens the same story.
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + tab.dataset.story);
    }

    if (opts.scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(tab, { scroll: true });
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

  // Open the story named in the URL, e.g. televisions.html#story2
  var requested = window.location.hash.replace("#", "");
  if (requested) {
    var match = tabs.filter(function (t) {
      return t.dataset.story === requested;
    })[0];
    if (match) activate(match);
  }
})();
