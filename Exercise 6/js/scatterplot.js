const drawScatterplot = (data) => {

    // Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    // Create an inner chart group with margins
    // (innerChartS is declared in shared-constants.js, so it is not declared again here)
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up x and y scales (declared in shared-constants.js)
    const maxStar = d3.max(data, d => d.star); // max star rating for xScaleS domain
    const maxEng = d3.max(data, d => d.energyConsumption); // max energy consumption for yScaleS domain

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth]);

    yScaleS
        .domain([0, maxEng])
        .range([innerHeight, 0])
        .nice();

    // Set up colour scale: a different hue for each screen technology
    colorScale
        .domain(data.map(d => d.screenTech)) // Get unique screenTech values
        .range(d3.schemeCategory10); // Use a predefined color scheme

    // Draw the circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("fill", d => colorScale(d.screenTech))
        .attr("opacity", 0.5); // less opaque so overlapping circles are easier to see

    // Add bottom and left axis
    const bottomAxis = d3.axisBottom(xScaleS);
    const leftAxis = d3.axisLeft(yScaleS);

    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChartS
        .append("g")
        .call(leftAxis);

    // Add axis labels
    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Star Rating")
        .attr("x", width - margin.right)
        .attr("y", height - 6)
        .attr("text-anchor", "end");

    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", margin.left - 35)
        .attr("y", margin.top - 15)
        .attr("text-anchor", "start");

    // Add a legend for the color scale
    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`); // Position the legend

    // Loop through the color scale domain to create legend entries
    colorScale.domain().forEach((screenTech, i) => {

        // Create a group for each legend entry
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`); // Space rows vertically

        // Add a colored rectangle for each screenTech
        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        // Add text next to the rectangle
        legendRow.append("text")
            .attr("class", "legend-label")
            .attr("x", 20) // Position text to the right of the rectangle
            .attr("y", 10) // Align text with the rectangle
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech); // Display the screenTech value
    });
};
