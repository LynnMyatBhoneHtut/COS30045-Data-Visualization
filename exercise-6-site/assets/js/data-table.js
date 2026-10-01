/* ============================================================
   data-table.js — renders CSV rows into the theme's .data-table
   ------------------------------------------------------------
   Used by data.html. Every value is written with textContent,
   so nothing in a CSV can inject markup into the page.

   renderDataTable(container, rows, columns, caption)
     container  a DOM element (the table is appended inside it)
     rows       an array of objects, e.g. the result of d3.csv
     columns    one object per column:
                  key        the CSV column to show
                  label      the header text
                  numeric    true to right-align the column
                  format     optional function(value, row) -> text
                  value      optional function(row, index) -> value
                             (used instead of key, e.g. for a rank)
                  rowHeader  true to make this column the row header
                  swatch     optional function(row) -> colour key class
     caption    text for the <caption>
   ============================================================ */

function renderDataTable(container, rows, columns, caption) {
  var table = document.createElement("table");
  table.className = "data-table";

  if (caption) {
    var cap = document.createElement("caption");
    cap.textContent = caption;
    table.appendChild(cap);
  }

  // Header row
  var thead = document.createElement("thead");
  var headRow = document.createElement("tr");
  columns.forEach(function (col) {
    var th = document.createElement("th");
    th.scope = "col";
    th.textContent = col.label;
    if (col.numeric) th.className = "num";
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Body rows
  var tbody = document.createElement("tbody");
  rows.forEach(function (row, i) {
    var tr = document.createElement("tr");
    columns.forEach(function (col) {
      var cell = document.createElement(col.rowHeader ? "th" : "td");
      if (col.rowHeader) cell.scope = "row";

      var raw = typeof col.value === "function" ? col.value(row, i) : row[col.key];
      var empty = raw === undefined || raw === null || raw === "" ||
                  (typeof raw === "number" && isNaN(raw));

      if (col.swatch) {
        var key = document.createElement("span");
        key.className = "key " + col.swatch(row);
        key.setAttribute("aria-hidden", "true");
        cell.appendChild(key);
      }

      cell.appendChild(document.createTextNode(
        empty ? "—" : (col.format ? col.format(raw, row) : String(raw))
      ));

      var classes = [];
      if (col.numeric) classes.push("num");
      if (empty) classes.push("muted");
      if (classes.length) cell.className = classes.join(" ");

      tr.appendChild(cell);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  var scroller = document.createElement("div");
  scroller.className = "table-scroll";
  scroller.appendChild(table);

  container.textContent = "";
  container.appendChild(scroller);
  return table;
}

// Writes an error into a table container if a CSV fails to load
// (usually because the page was opened from the file system
// instead of a local web server).
function renderDataError(container, file) {
  container.textContent = "";
  var p = document.createElement("p");
  p.className = "note";
  p.textContent = "Could not load " + file + ". Serve the folder with a local web " +
    "server (for example: python3 -m http.server) instead of opening the file directly.";
  container.appendChild(p);
}
