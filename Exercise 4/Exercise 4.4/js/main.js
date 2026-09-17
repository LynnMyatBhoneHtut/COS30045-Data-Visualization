// ============================================================
// COS30045 - Energy Consumption website
// Exercise 4.3: responsive SVG canvas
// Exercise 4.4: load and type data from CSV
// ============================================================

// ---- Exercise 4.3 ----
// Create an SVG inside the responsive container. The viewBox makes the
// canvas scale with the window. The border shows the canvas boundary
// while we are building - remove it for the final visualisation.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .style("border", "1px solid black");

// ---- Exercise 4.4 ----
// Step 1: read the CSV with a row-conversion function.
// Column names below MUST match the CSV header exactly (brand, count).
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count      // the + converts the text "44" into the number 44
    };
}).then(data => {

    // Step 2: check the data loaded and that count is a number, not a string
    console.log(data);

    // Step 3: basic facts about the data set
    console.log("rows:", data.length);
    console.log("max count:", d3.max(data, d => d.count));
    console.log("min count:", d3.min(data, d => d.count));
    console.log("extent [min, max]:", d3.extent(data, d => d.count));

    // Sort from most models to fewest so the bar chart reads clearly
    data.sort((a, b) => d3.descending(a.count, b.count));
    console.log("sorted:", data);

    // Pass the clean data to the chart function (must be inside .then)
    drawBarChart(data);
});

// ---- Placeholder for Exercise 4.5 ----
// Replace this with the real bar-chart code in the next exercise.
function drawBarChart(data) {
    console.log("drawBarChart received", data.length, "brands");
}
