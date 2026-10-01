/* ============================================================
   data-page.js — Exercise 5 hub, data.html
   ------------------------------------------------------------
   Loads the three CSVs the charts use and shows each one as a
   table. Blank cells in the spot-price file (Tasmania before
   2005, Snowy after 2007) are shown as a dash.
   ============================================================ */

(function () {
  "use strict";

  var comma = d3.format(",");
  var oneDecimal = d3.format(".1f");
  var price = d3.format(",.2~f");
  var share = d3.format(".1%");

  // ---- 5.1: Ex5_TV_energy_55inch.csv ----
  var energyHolder = document.getElementById("table-energy");
  d3.csv("data/Ex5_TV_energy_55inch.csv", function (d) {
    return {
      Screen_Tech: d.Screen_Tech,
      Energy_Consumption: +d.Energy_Consumption
    };
  }).then(function (data) {
    data.sort(function (a, b) { return b.Energy_Consumption - a.Energy_Consumption; });
    renderDataTable(energyHolder, data, [
      { label: "Screen technology", key: "Screen_Tech", rowHeader: true,
        format: function (v) { return v.toUpperCase(); } },
      { label: "Average energy (kWh/year)", key: "Energy_Consumption", numeric: true, format: oneDecimal }
    ], "Ex5_TV_energy_55inch.csv: average labelled energy consumption of 55-inch TVs, sorted highest first as in the chart.");
  }).catch(function (error) {
    console.error(error);
    renderDataError(energyHolder, "data/Ex5_TV_energy_55inch.csv");
  });

  // ---- 5.2: ARE_Spot_Prices.csv ----
  var priceHolder = document.getElementById("table-prices");
  var regions = [
    ["Queensland ($ per megawatt hour)", "QLD"],
    ["New South Wales ($ per megawatt hour)", "NSW"],
    ["Victoria ($ per megawatt hour)", "VIC"],
    ["South Australia ($ per megawatt hour)", "SA"],
    ["Tasmania ($ per megawatt hour)", "TAS"],
    ["Snowy ($ per megawatt hour)", "Snowy"],
    ["Average Price (notTas-Snowy)", "Average*"]
  ];

  function numberOrBlank(text) {
    return text === "" || text === undefined ? "" : +text;
  }

  d3.csv("data/ARE_Spot_Prices.csv").then(function (data) {
    var columns = [{ label: "Year", key: "Year", rowHeader: true }].concat(
      regions.map(function (r) {
        return {
          label: r[1],
          numeric: true,
          value: function (row) { return numberOrBlank(row[r[0]]); },
          format: price
        };
      })
    );
    renderDataTable(priceHolder, data, columns,
      "ARE_Spot_Prices.csv: average spot power price by region, $ per megawatt hour. " +
      "*Average of QLD, NSW, VIC and SA, the column the line chart plots.");
  }).catch(function (error) {
    console.error(error);
    renderDataError(priceHolder, "data/ARE_Spot_Prices.csv");
  });

  // ---- 5.3: Ex5_TV_screensize_count.csv ----
  var sizeHolder = document.getElementById("table-sizes");
  var rampKey = { small: "key--ramp-1", medium: "key--ramp-2", large: "key--ramp-3" };

  d3.csv("data/Ex5_TV_screensize_count.csv", function (d) {
    return {
      Screensize_Category: d.Screensize_Category,
      Count: +d.Count
    };
  }).then(function (data) {
    var total = d3.sum(data, function (d) { return d.Count; });
    renderDataTable(sizeHolder, data, [
      { label: "Screen size", key: "Screensize_Category", rowHeader: true,
        swatch: function (row) { return rampKey[row.Screensize_Category] || ""; } },
      { label: "Models", key: "Count", numeric: true, format: comma },
      { label: "Share", numeric: true, value: function (row) { return row.Count / total; }, format: share }
    ], "Ex5_TV_screensize_count.csv: " + comma(total) + " models in three size categories, in the CSV's order (the order the donut uses).");
  }).catch(function (error) {
    console.error(error);
    renderDataError(sizeHolder, "data/Ex5_TV_screensize_count.csv");
  });
})();
