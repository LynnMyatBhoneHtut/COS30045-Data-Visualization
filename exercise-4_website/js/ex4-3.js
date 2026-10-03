// ============================================================
// Exercise 4.3 - D3 set up
// (Exercise 4.2 practice code has been removed, as the brief asks.)
//
// Ported from: Exercise 4/Exercise 4.3/main.js
// Hub changes (marked "HUB:" below) - the D3 logic is unchanged:
//   1. Wrapped in a function so this file's `svg` cannot collide
//      with the other exercises that share this page.
//   2. Draws into its own container, #chart-4-3, instead of the
//      shared .responsive-svg-container class.
//   3. Theme styling: the black debug border becomes the dashed
//      .chart-canvas outline, and "blue" becomes the theme teal.
// ============================================================

(function () {   // HUB: private scope for this exercise

// Step 2: Create an SVG object inside the responsive container.
// The viewBox makes the SVG scale to the size of its parent div,
// so the canvas resizes when the window changes.
// The border just lets us see the canvas edges - remove it later.
const svg = d3.select("#chart-4-3")             // HUB: was ".responsive-svg-container"
    .append("svg")
        .attr("viewBox", "0 0 1200 1600")
        .attr("class", "chart-canvas");         // HUB: was .style("border", "1px solid black")

// Step 3: Add a test rectangle so we know the canvas works.
// These attributes are HARD-CODED for now. In Exercise 4.4 the
// width/position will come from the TV energy consumption CSV data.
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", THEME.teal);                  // HUB: was "blue"

})();
