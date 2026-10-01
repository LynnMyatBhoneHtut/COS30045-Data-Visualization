/* ============================================================
   data-page.js — Exercise 4 hub, data.html
   ------------------------------------------------------------
   Loads the CSV the exercises use and shows it as a table, with
   the same row conversion and the same descending sort as the
   charts, so the table reads in the same order as Exercise 4.7.
   ============================================================ */

(function () {
  "use strict";

  var holder = document.getElementById("table-brands");
  if (!holder) return;

  var comma = d3.format(",");
  var share = d3.format(".1%");

  d3.csv("data/tvBrandCount.csv", function (d) {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(function (data) {
    var total = d3.sum(data, function (d) { return d.count; });

    data.sort(function (a, b) {
      return d3.descending(a.count, b.count);
    });

    renderDataTable(holder, data, [
      { label: "Rank", numeric: true, value: function (row, i) { return i + 1; } },
      { label: "Brand", key: "brand", rowHeader: true },
      { label: "Models", key: "count", numeric: true, format: comma },
      { label: "Share of models", numeric: true,
        value: function (row) { return row.count / total; }, format: share }
    ], "tvBrandCount.csv: " + data.length + " brands, " + comma(total) +
       " models in total, sorted from most to fewest.");
  }).catch(function (error) {
    console.error(error);
    renderDataError(holder, "data/tvBrandCount.csv");
  });
})();
