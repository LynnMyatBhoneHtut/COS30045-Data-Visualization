/* ============================================================
   console-readout.js — Exercise 4.4 on the hub page
   ------------------------------------------------------------
   Exercise 4.4 loads the CSV and writes what it finds to the
   console; it doesn't draw anything yet. This file shows those
   same values on the page, next to the 4.4 canvas. It loads
   tvBrandCount.csv on its own with the same row conversion, so
   js/ex4-4.js stays as it was.
   ============================================================ */

(function () {
  "use strict";

  function fill(name, text) {
    var el = document.querySelector('[data-console="' + name + '"]');
    if (el) el.textContent = text;
  }

  d3.csv("data/tvBrandCount.csv", function (d) {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(function (data) {
    var extent = d3.extent(data, function (d) { return d.count; });
    var sorted = data.slice().sort(function (a, b) {
      return d3.descending(a.count, b.count);
    });

    fill("rows", data.length);
    fill("max", d3.max(data, function (d) { return d.count; }));
    fill("min", d3.min(data, function (d) { return d.count; }));
    fill("extent", "[" + extent[0] + ", " + extent[1] + "]");
    fill("first", sorted[0].brand);
  }).catch(function (error) {
    console.error("Could not load tvBrandCount.csv", error);
  });
})();
