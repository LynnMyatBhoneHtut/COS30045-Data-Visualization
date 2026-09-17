// ============================================================
// COS30045 - Energy Consumption website
// Exercise 4.3: responsive SVG canvas
// Exercise 4.4: load and type data from CSV
// Exercise 4.5: bind the data and draw the bars
// Exercise 4.6: add scales so the chart fits any svg size
// ============================================================

// ---- Exercise 4.3 / 4.6 ----
// The viewBox is now only 500 wide. The widest count (1096) would run
// straight off the canvas without a scale - that is what 4.6 fixes.
// Height dropped from 1600 to 600 so the chart is not unreasonably long.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 500 600")
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

    drawBarChart(data);
});

// ============================================================
// Exercise 4.5 / 4.6 - draw the bar chart using scales
// ============================================================
const drawBarChart = data => {

    // ---- Exercise 4.5 (no longer needed once scales are in) ----
    // const barHeight = 20;
    // const barSpacing = 12;

    // ---- Step 1: LINEAR scale for the count (continuous data) ----
    // domain = the range of values IN THE DATA (0 up to just above our max)
    // range  = the pixels available on screen (kept under the 500 viewBox
    //          width, leaving ~100px spare for labels in Exercise 4.7)
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    // ---- Step 2: BAND scale for the brands (discrete/categorical data) ----
    // domain = the list of category names
    // range  = the vertical space to divide between them
    // padding = the gap between bars (0 = bars touch, 0.2 = 20% gap)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 600])
        .padding(0.2);

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => "bar bar-" + d.count)

        // x still starts at the left edge
        .attr("x", 0)
        // y now comes from the band scale, using the brand name as the key
        .attr("y", d => yScale(d.brand))

        // width is the count PUT THROUGH the linear scale, not raw pixels
        .attr("width", d => xScale(d.count))
        // thickness is whatever the band scale worked out per category
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue");
};
