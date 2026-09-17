// ============================================================
// COS30045 - Energy Consumption website
// Exercise 4.3: responsive SVG canvas
// Exercise 4.4: load and type data from CSV
// Exercise 4.5: bind the data and draw the bars
// Exercise 4.6: add scales so the chart fits any svg size
// Exercise 4.7: add labels using <g> groups
// ============================================================

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

    data.sort((a, b) => d3.descending(a.count, b.count));

    drawBarChart(data);
});

// ============================================================
// Exercise 4.5 / 4.6 / 4.7 - draw the labelled bar chart
// ============================================================
const drawBarChart = data => {

    // ---- Step 1: make room for the labels ----
    // The bars no longer start at x = 0. This constant reserves 100px
    // on the left for the brand names.
    const labelSpace = 100;

    // ---- Exercise 4.6: scales ----
    // Range max kept at 340 so that labelSpace + longest bar + the count
    // text all still fit inside the 500-wide viewBox.
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 340]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 600])
        .padding(0.2);

    // ---- Step 2: one <g> group per row of data ----
    // The group holds the bar AND its two labels, so they move together.
    // translate() positions the whole group at the right height, which
    // means everything inside it is drawn relative to that point.
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
            .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // ---- Step 3: the bars go back in, inside the group ----
    barAndLabel
        .append("rect")
            .attr("class", d => "bar bar-" + d.count)
            .attr("x", labelSpace)
            // y is 0 because the GROUP already positions this row.
            // Leaving yScale(d.brand) here would apply the offset twice.
            .attr("y", 0)
            .attr("width", d => xScale(d.count))
            .attr("height", yScale.bandwidth())
            .attr("fill", "blue");

    // ---- Step 4: the brand name, right-justified beside the bar ----
    barAndLabel
        .append("text")
            .text(d => d.brand)
            .attr("x", labelSpace - 10)              // 10px gap before the bar
            .attr("y", yScale.bandwidth() / 2 + 4)   // vertically centred
            // text-anchor "end" puts the END of the text at x, so all the
            // brand names line up neatly on their right edge.
            .attr("text-anchor", "end")
            .style("font-size", "13px");

    // ---- Step 5: the count value, just past the end of the bar ----
    barAndLabel
        .append("text")
            .text(d => d.count)
            .attr("x", d => labelSpace + xScale(d.count) + 5)
            .attr("y", yScale.bandwidth() / 2 + 4)
            .style("font-size", "13px");
};
