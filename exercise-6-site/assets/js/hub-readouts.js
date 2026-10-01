/* ============================================================
   hub-readouts.js — Exercise 6 hub
   ------------------------------------------------------------
   Fills the read-out strips and key-number cards on index.html,
   and keeps the histogram read-out in step with the filter
   buttons. It loads the CSV on its own, with the same row
   conversion as load-data.js, and only listens to the buttons:
   the original filter, histogram and tooltip code is untouched.
   ============================================================ */

(function () {
  "use strict";

  var comma = d3.format(",");
  var percent = d3.format(".0%");

  function fill(name, text) {
    document.querySelectorAll('[data-readout="' + name + '"]').forEach(function (el) {
      el.textContent = text;
    });
  }

  // ---- Accessibility: mirror the "active" class as aria-pressed ----
  // interactions.js marks the selected filter with the "active" class.
  // Screen readers need aria-pressed for the same state, so a watcher
  // copies it across whenever the buttons are created or change.
  var filterBox = document.getElementById("filters_screen");

  function syncPressed() {
    if (!filterBox) return;
    filterBox.querySelectorAll(".filter").forEach(function (button) {
      button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
    });
  }

  if (filterBox && "MutationObserver" in window) {
    new MutationObserver(syncPressed).observe(filterBox, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  d3.csv("data/Ex6_TVdata_withStar.csv", function (d) {
    return {
      brand: d.brand,
      model: d.model,
      screenSize: +d.screenSize,
      screenTech: d.screenTech,
      energyConsumption: +d.energyConsumption,
      star: +d.star
    };
  }).then(function (data) {
    var energy = function (d) { return d.energyConsumption; };

    // ---- Histogram: the same default bins histogram.js starts from ----
    var bins = d3.bin().value(energy)(data);
    fill("bins", bins.length + " × " + comma(bins[0].x1 - bins[0].x0) + " kWh");

    function showFilter(id) {
      var subset = id === "all" ? data : data.filter(function (d) { return d.screenTech === id; });
      fill("filter-name", id === "all" ? "All screens" : id);
      fill("filter-count", comma(subset.length));
      fill("filter-median", comma(d3.median(subset, energy)) + " kWh");
    }
    showFilter("all");

    if (filterBox) {
      // Runs after interactions.js has moved the "active" class,
      // because the click bubbles up from the button to this box.
      filterBox.addEventListener("click", function () {
        var active = filterBox.querySelector(".filter.active");
        if (active) showFilter(d3.select(active).datum().id);
      });
    }

    // ---- Scatterplot: counts per screen type, in colour-scale order ----
    // scatterplot.js builds its colour domain from the order each
    // screen type first appears in the data, so the keys follow suit.
    var order = Array.from(new Set(data.map(function (d) { return d.screenTech; })));
    var counts = d3.rollup(data, function (v) { return v.length; }, function (d) { return d.screenTech; });

    order.forEach(function (tech, i) {
      fill("tech-" + tech, comma(counts.get(tech)));
      document.querySelectorAll('[data-key="' + tech + '"]').forEach(function (key) {
        key.className = "key key--series-" + (i + 1);
      });
    });

    var stars = d3.extent(data, function (d) { return d.star; });
    fill("star-range", stars[0] + " to " + stars[1]);

    // ---- Key numbers ----
    var led = counts.get("LED") || 0;
    fill("model-total", comma(data.length));
    fill("led-share", percent(led / data.length));
    fill("median-all", comma(d3.median(data, energy)) + " kWh");
  }).catch(function (error) {
    console.error("Read-outs: could not load Ex6_TVdata_withStar.csv", error);
  });
})();
