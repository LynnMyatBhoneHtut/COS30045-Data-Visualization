// Ported from: Exercise 6/js/interactions.js
// Hub changes (marked "HUB:") - the filter and tooltip logic is unchanged:
//   the tooltip is drawn like the site's read-out panels (ink box,
//   amber IBM Plex Mono text) instead of grey with heavy white text.
//   The filter buttons keep their classes ("filter", "active");
//   styles.css gives them the theme's button look.

// ============================================================
// Exercise 6.2 - Filters for the histogram
// ============================================================
const populateFilters = (data) => {

    // Add the filter buttons using the information in filters_screen (shared-constants.js)
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)

        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

            // If the clicked filter is not already active, update the active state of the filters
            if (!d.isActive) {
                // make sure button clicked is not already active
                filters_screen.forEach(filter => {
                    filter.isActive = d.id === filter.id ? true : false;
                });

                // update the filter buttons based on which one was clicked
                d3.selectAll("#filters_screen .filter")
                    .classed("active", filter => filter.id === d.id ? true : false);

                // update the histogram with the filtered data
                updateHistogram(d.id, data);
            }
        });

    // Update the histogram so it only shows the selected data
    const updateHistogram = (filterId, data) => {

        // 1. Filter the data (no filter when "all" is selected)
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        // 2. Use the filtered data to update the bins
        const updatedBins = binGenerator(updatedData);

        // 3. Use the updated bins to redraw the histogram bars with a transition
        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
            .duration(500)
            .ease(d3.easeCubicInOut)
            .attr("y", d => yScale(d.length))
            .attr("height", d => innerHeight - yScale(d.length));
    };
};

// ============================================================
// Exercise 6.4 - Tooltip for the scatterplot
// ============================================================
const createTooltip = () => {

    // Append tooltip to innerChartS, hidden to start with (opacity 0)
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", THEME.ink)             // HUB: was barColor
        .attr("fill-opacity", 0.92);         // HUB: was 0.75, so the amber text stays crisp over the dots

    // Append tooltip text
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", THEME.amber)           // HUB: was "white"
        .style("font-weight", 600);          // HUB: was 900 (IBM Plex Mono is loaded at 400 and 600)
};

// Function to react to mouse events (outside of createTooltip)
const handleMouseEvents = () => {

    // Select all the circles in the scatterplot
    innerChartS.selectAll("circle")

        // Mouse enters a circle: show the tooltip above it
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // 1. Update the text in the tooltip with the screen size
            d3.select(".tooltip text")
                .text(d.screenSize);

            // 2. Get the position of the circle
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // 3. Move the tooltip above the circle and fade it in
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })

        // Mouse leaves a circle: hide the tooltip and move it out of the way
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // 4. Make the tooltip transparent and move it below the chart
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`);
        });
};
