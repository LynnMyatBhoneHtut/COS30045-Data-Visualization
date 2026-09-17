// ============================================================
// Exercise 4.3 - D3 set up
// (Exercise 4.2 practice code has been removed, as the brief asks.)
// ============================================================

// Step 2: Create an SVG object inside the responsive container.
// The viewBox makes the SVG scale to the size of its parent div,
// so the canvas resizes when the window changes.
// The border just lets us see the canvas edges - remove it later.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .style("border", "1px solid black");

// Step 3: Add a test rectangle so we know the canvas works.
// These attributes are HARD-CODED for now. In Exercise 4.4 the
// width/position will come from the TV energy consumption CSV data.
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
