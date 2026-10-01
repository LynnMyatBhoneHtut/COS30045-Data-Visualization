/* ============================================================
   hub-readouts.js — Exercise 5 hub
   ------------------------------------------------------------
   Fills the read-out strips and key-number cards on index.html.
   It loads the three CSVs on its own, with the same column names
   the exercise uses, so load-data.js and the chart files stay
   exactly as they were apart from their colours.
   Every element with data-readout="name" gets the value below.
   ============================================================ */

(function () {
  "use strict";

  var comma = d3.format(",");
  var dollars = d3.format("$,.2f");
  var share = d3.format(".1%");
  var wholeShare = d3.format(".0%");
  var change = d3.format("+.0%");

  function fill(name, text) {
    document.querySelectorAll('[data-readout="' + name + '"]').forEach(function (el) {
      el.textContent = text;
    });
  }

  // ---- 5.1: 55-inch TVs by screen technology ----
  d3.csv("data/Ex5_TV_energy_55inch.csv", function (d) {
    return {
      Screen_Tech: d.Screen_Tech,
      Energy_Consumption: +d.Energy_Consumption
    };
  }).then(function (data) {
    data.forEach(function (d) {
      fill("energy-" + d.Screen_Tech, Math.round(d.Energy_Consumption) + " kWh");
    });
    var max = d3.max(data, function (d) { return d.Energy_Consumption; });
    var min = d3.min(data, function (d) { return d.Energy_Consumption; });
    fill("energy-spread", Math.round(max - min) + " kWh");
  }).catch(function (error) {
    console.error("Read-outs: could not load Ex5_TV_energy_55inch.csv", error);
  });

  // ---- 5.2: average spot price ----
  d3.csv("data/ARE_Spot_Prices.csv", function (d) {
    return {
      year: +d["Year"],
      averagePrice: +d["Average Price (notTas-Snowy)"]
    };
  }).then(function (data) {
    var first = data[0];
    var last = data[data.length - 1];
    var peak = data.reduce(function (a, b) { return b.averagePrice > a.averagePrice ? b : a; });
    var low = data.reduce(function (a, b) { return b.averagePrice < a.averagePrice ? b : a; });

    fill("price-first-year", first.year);
    fill("price-first", dollars(first.averagePrice));
    fill("price-last-year", last.year);
    fill("price-last", dollars(last.averagePrice));
    fill("price-peak-year", peak.year);
    fill("price-peak", dollars(peak.averagePrice));
    fill("price-low-year", low.year);
    fill("price-low", dollars(low.averagePrice));
    fill("price-change", change(last.averagePrice / first.averagePrice - 1));
  }).catch(function (error) {
    console.error("Read-outs: could not load ARE_Spot_Prices.csv", error);
  });

  // ---- 5.3: screen size categories ----
  d3.csv("data/Ex5_TV_screensize_count.csv", function (d) {
    return {
      Screensize_Category: d.Screensize_Category,
      Count: +d.Count
    };
  }).then(function (data) {
    var total = d3.sum(data, function (d) { return d.Count; });
    data.forEach(function (d) {
      fill("size-" + d.Screensize_Category, comma(d.Count) + " · " + share(d.Count / total));
      fill("size-" + d.Screensize_Category + "-share", wholeShare(d.Count / total));
    });
    fill("size-total", comma(total));
  }).catch(function (error) {
    console.error("Read-outs: could not load Ex5_TV_screensize_count.csv", error);
  });
})();
