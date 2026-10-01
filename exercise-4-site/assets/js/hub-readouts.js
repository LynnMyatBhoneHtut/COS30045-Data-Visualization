/* ============================================================
   hub-readouts.js — Exercise 4 hub
   ------------------------------------------------------------
   Fills the read-out panels and key-number cards on index.html.
   It loads tvBrandCount.csv on its own, with the same row
   conversion the exercises use, so the exercise files stay
   exactly as they were apart from their container and colours.
   Every element with data-readout="name" gets the value below.
   ============================================================ */

(function () {
  "use strict";

  var comma = d3.format(",");
  var oneDecimal = d3.format(".1f");
  var twoDecimals = d3.format(".2f");
  var percent = d3.format(".0%");

  function fill(name, text) {
    document.querySelectorAll('[data-readout="' + name + '"]').forEach(function (el) {
      el.textContent = text;
    });
  }

  d3.csv("data/tvBrandCount.csv", function (d) {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(function (data) {
    var total = d3.sum(data, function (d) { return d.count; });
    var max = d3.max(data, function (d) { return d.count; });
    var min = d3.min(data, function (d) { return d.count; });
    var extent = d3.extent(data, function (d) { return d.count; });

    var sorted = data.slice().sort(function (a, b) {
      return d3.descending(a.count, b.count);
    });
    var top = sorted[0];
    var topThree = d3.sum(sorted.slice(0, 3), function (d) { return d.count; });

    // ---- Exercise 4.4: what main.js logs to the console ----
    fill("rows", comma(data.length));
    fill("max", comma(max));
    fill("min", comma(min));
    fill("extent", "[" + extent[0] + ", " + extent[1] + "]");
    fill("top-brand", top.brand);

    // ---- Exercise 4.5: raw pixel drawing (barHeight 20, spacing 12) ----
    var lastBarBottom = (data.length - 1) * (20 + 12) + 20;
    fill("bars", comma(data.length));
    fill("widest-raw", comma(max) + " of 1,200");
    fill("height-used", comma(lastBarBottom) + " of 1,600");

    // ---- Exercise 4.6: the same scales main.js builds ----
    var x46 = d3.scaleLinear().domain([0, 1200]).range([0, 400]);
    var y46 = d3.scaleBand()
      .domain(sorted.map(function (d) { return d.brand; }))
      .range([0, 600])
      .padding(0.2);
    fill("bandwidth", twoDecimals(y46.bandwidth()));
    fill("widest-scaled", oneDecimal(x46(max)) + " of 500");

    // ---- Exercise 4.7: labelled layout ----
    var x47 = d3.scaleLinear().domain([0, 1200]).range([0, 340]);
    fill("groups", comma(data.length) + " <g>");
    fill("bar-end", oneDecimal(100 + x47(max)) + " of 500");

    // ---- Key numbers ----
    fill("brand-count", comma(data.length));
    fill("model-total", comma(total));
    fill("top-count", comma(top.count));
    fill("top-share", percent(top.count / total));
    fill("top-three-share", percent(topThree / total));
  }).catch(function (error) {
    console.error("Read-outs: could not load tvBrandCount.csv", error);
  });
})();
