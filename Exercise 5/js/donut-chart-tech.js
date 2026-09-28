const drawTechDonutChart = data => {
    // Set up chart dimensions (same as the screen size donut chart)
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave some padding

    // Colour scale: same technology colours as the scatter plot
    const color = d3.scaleOrdinal()
        .domain(["led", "lcd", "oled"])
        .range(d3.schemeTableau10);

    // Total energy of all TVs, used to work out each slice's percentage
    const total = d3.sum(data, d => d.totalEnergy);

    // Calculate angle for each slice using d3.pie
    const pie = d3.pie()
        .value(d => d.totalEnergy)
        .sort(null); // Keep the order of the data (sorted largest to smallest)

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6) // Inner radius = 60% of available radius
        .outerRadius(radius * 1);  // Outer radius = 100% of available radius

    // Add the svg container
    const svg = d3.select("#donut-chart-tech")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Move (0,0) to the centre of the svg so the donut is centred
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Bind data and create the donut slices
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("class", "slice")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.tech))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Label each slice with its technology and share of total energy
    const format = d3.format(".0%");
    innerChart
        .selectAll(".slice-label")
        .data(pie(data))
        .join("text")
        .attr("class", "slice-label")
        .text(d => `${d.data.tech.toUpperCase()} ${format(d.data.totalEnergy / total)}`)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle");

    // Show the combined total in the hole of the donut
    innerChart
        .append("text")
        .attr("class", "donut-total")
        .text(d3.format(",")(total))
        .attr("y", -8)
        .attr("text-anchor", "middle");

    innerChart
        .append("text")
        .attr("class", "donut-total-label")
        .text("kWh/year, all TVs")
        .attr("y", 20)
        .attr("text-anchor", "middle");
};
