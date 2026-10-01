/* ============================================================
   data-page.js — Exercise 6 hub, data.html
   ------------------------------------------------------------
   Loads Ex6_TVdata_withStar.csv with the same row conversion as
   load-data.js, then shows a summary by screen technology and the
   first rows of the file.
   ============================================================ */

(function () {
  "use strict";

  var comma = d3.format(",");
  var oneDecimal = d3.format(".1f");
  var share = d3.format(".1%");
  var PREVIEW_ROWS = 25;

  var summaryHolder = document.getElementById("table-summary");
  var rowsHolder = document.getElementById("table-rows");

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
    // Screen types in the order they first appear, which is also the
    // order the scatterplot's colour scale uses.
    var order = Array.from(new Set(data.map(function (d) { return d.screenTech; })));

    var summary = order.map(function (tech, i) {
      var group = data.filter(function (d) { return d.screenTech === tech; });
      return {
        tech: tech,
        key: "key--series-" + (i + 1),
        count: group.length,
        share: group.length / data.length,
        median: d3.median(group, function (d) { return d.energyConsumption; }),
        mean: d3.mean(group, function (d) { return d.energyConsumption; }),
        star: d3.mean(group, function (d) { return d.star; })
      };
    });
    summary.push({
      tech: "All screens",
      key: "",
      count: data.length,
      share: 1,
      median: d3.median(data, function (d) { return d.energyConsumption; }),
      mean: d3.mean(data, function (d) { return d.energyConsumption; }),
      star: d3.mean(data, function (d) { return d.star; })
    });

    renderDataTable(summaryHolder, summary, [
      { label: "Screen technology", key: "tech", rowHeader: true,
        swatch: function (row) { return row.key; } },
      { label: "Models", key: "count", numeric: true, format: comma },
      { label: "Share", key: "share", numeric: true, format: share },
      { label: "Median kWh/year", key: "median", numeric: true, format: comma },
      { label: "Mean kWh/year", key: "mean", numeric: true, format: oneDecimal },
      { label: "Mean stars", key: "star", numeric: true, format: oneDecimal }
    ], "Summary of Ex6_TVdata_withStar.csv by screen technology. Colour keys match the scatterplot.");

    renderDataTable(rowsHolder, data.slice(0, PREVIEW_ROWS), [
      { label: "Brand", key: "brand" },
      { label: "Model", key: "model", rowHeader: true },
      { label: "Screen (in)", key: "screenSize", numeric: true },
      { label: "Technology", key: "screenTech" },
      { label: "Stars", key: "star", numeric: true },
      { label: "kWh/year", key: "energyConsumption", numeric: true, format: comma }
    ], "The first " + PREVIEW_ROWS + " of " + comma(data.length) + " rows, in file order.");
  }).catch(function (error) {
    console.error(error);
    renderDataError(summaryHolder, "data/Ex6_TVdata_withStar.csv");
    rowsHolder.textContent = "";
  });
})();
