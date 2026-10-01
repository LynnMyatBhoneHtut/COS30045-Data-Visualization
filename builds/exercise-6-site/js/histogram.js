const drawHistogram = (data) => {
    // Set the dimensions and margins of the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`); // Responsive SVG

    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Get the bins for our data set using the bin generator
    const bins = binGenerator(data); // save the bins into an array
    console.log(bins); // Log the bins to the console for debugging

    // Calculate the minimum and maximum energy consumption values from the bins to set the xScale domain
    const minEng = bins[0].x0; // lower bound of the first bin
    const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin

    // Calculate the maximum length of the bins to set the yScale domain
    const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength);

    // Fix the bin generator to these same bins (0-200, 200-400, ... 2600-2800).
    // When a filter is applied in Exercise 6.2, the filtered data is binned
    // into exactly the same bins, so each bar keeps its position on the x-axis.
    binGenerator
        .domain([minEng, maxEng])
        .thresholds(bins.map(d => d.x0).slice(1));

    // Set the domains and ranges for the x and y scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Use the nice() method to round the y-axis values to a more human-readable format

    // Draw the bars of the histogram
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) // Set the stroke color gives appearance of gap between bars
        .attr("stroke-width", 2);

    // Add the x and y axis (same pattern as Exercise 5.1)
    const bottomAxis = d3.axisBottom(xScale);
    const leftAxis = d3.axisLeft(yScale);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .call(leftAxis);

    // Add axis labels
    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", width - margin.right)
        .attr("y", height - 6)
        .attr("text-anchor", "end");

    svg
        .append("text")
        .attr("class", "axis-label")
        .text("Frequency")
        .attr("x", margin.left - 35)
        .attr("y", margin.top - 15)
        .attr("text-anchor", "start");
};
