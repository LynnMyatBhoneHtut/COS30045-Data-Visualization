const drawDonutChart = data => {
    // Set up chart dimensions (same width and height as the other charts)
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave some padding

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category)) // Map screen categories
        .range(d3.schemeSet2);                        // Use D3's category color scheme

    // Calculate angle for each slice using d3.pie
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null); // Disable sorting to maintain original data order

    // Arc generator: turns each slice's start/end angles into a path
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6) // Inner radius = 60% of available radius
        .outerRadius(radius * 1);  // Outer radius = 100% of available radius

    // Add the svg container (viewBox makes it responsive)
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);
        // .style("border", "1px solid black"); // uncomment to see the svg edges

    // Move (0,0) to the centre of the svg so the donut is centred
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Bind data and create the donut chart
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("class", "slice")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category)) // Use category for color
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Add labels in the middle of each slice
    innerChart
        .selectAll(".slice-label")
        .data(pie(data))
        .join("text")
        .attr("class", "slice-label")
        .text(d => d.data.Screensize_Category)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle");
};
