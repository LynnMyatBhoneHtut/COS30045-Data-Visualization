// ============================================================
// COS30045 - Energy Consumption website
// Exercise 4.3: responsive SVG canvas
// Exercise 4.4: load and type data from CSV
// Exercise 4.5: bind the data and draw the bars
// ============================================================

// ---- Exercise 4.3 ----
const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .style("border", "1px solid black");

// ---- Exercise 4.4: load the data ----
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count      // the + converts the text "44" into the number 44
    };
}).then(data => {

    console.log(data);
    console.log("rows:", data.length);
    console.log("max count:", d3.max(data, d => d.count));
    console.log("min count:", d3.min(data, d => d.count));
    console.log("extent [min, max]:", d3.extent(data, d => d.count));

    // Sort from most models to fewest so the bars step down neatly
    data.sort((a, b) => d3.descending(a.count, b.count));

    // Pass the clean data to the chart function
    drawBarChart(data);
});

// ============================================================
// Exercise 4.5 - draw the bar chart
// ============================================================
const drawBarChart = data => {

    // Step 2: thickness of each bar, and the gap between bars
    const barHeight = 20;
    const spacing = 12;

    svg
        // Step 1: BIND the data to rectangles.
        // selectAll finds the (currently empty) set of rects,
        // .data() attaches one data object to each,
        // .join() creates one <rect> per row of data.
        .selectAll("rect")
        .data(data)
        .join("rect")

        // A class named after the count value, so bars can be
        // styled or inspected easily in the DOM.
        .attr("class", d => "bar bar-" + d.count)

        // Step 3: position each bar.
        // x is always 0 - every bar starts at the left edge.
        .attr("x", 0)
        // y uses the bar's INDEX (i) in the data set:
        // bar 0 at y=0, bar 1 one bar+gap down, bar 2 two down, etc.
        .attr("y", (d, i) => i * (barHeight + spacing))

        // Step 2: size and colour.
        // width comes from the DATA, height is the fixed constant.
        .attr("width", d => d.count)
        .attr("height", barHeight)
        .attr("fill", "blue");
};
