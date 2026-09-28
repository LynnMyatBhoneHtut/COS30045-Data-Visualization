const drawScatterPlot = data => {
    // Set up inner chart margins and dimensions (same as the other charts)
    const margin = { top: 50, right: 200, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the svg container (viewBox makes it responsive)
    const svg = d3.select("#scatter-plot")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    // Star rating and energy are both continuous numbers, so both use scaleLinear.
    // Star ratings run from 1 to 8, so pad the domain by half a star each side
    // so the first and last columns of dots don't sit on the axes.
    const xScale = d3.scaleLinear()
        .domain([0.5, 8.5])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .range([innerHeight, 0])
        .nice();

    // Colour scale: one colour per screen technology
    const techs = ["led", "lcd", "oled"];
    const color = d3.scaleOrdinal()
        .domain(techs)
        .range(d3.schemeTableau10);

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickValues(d3.range(1, 9)) // one tick per whole star: 1, 2, ... 8
        .tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    // Add axes
    innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Add axis labels
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Energy Consumption (kWh/year)")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("text-anchor", "start");

    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Star Rating")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 42)
        .attr("text-anchor", "end");

    // Draw one circle per TV model.
    // There are about 4,500 TVs but only 13 different star ratings, so many dots
    // overlap. A low opacity makes the crowded areas show up as darker patches.
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "scatter-point")
        .attr("r", 3)
        .attr("cx", d => xScale(d.star))
        .attr("cy", d => yScale(d.energy))
        .attr("fill", d => color(d.tech))
        .attr("fill-opacity", 0.35);

    // Legend in the right-hand margin
    const legend = innerChart
        .append("g")
        .attr("transform", `translate(${innerWidth + 30}, 0)`);

    const legendItems = legend
        .selectAll("g")
        .data(techs)
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${i * 26})`);

    legendItems
        .append("circle")
        .attr("r", 7)
        .attr("cx", 7)
        .attr("cy", 0)
        .attr("fill", d => color(d));

    legendItems
        .append("text")
        .attr("class", "legend-label")
        .text(d => d.toUpperCase())
        .attr("x", 22)
        .attr("y", 0)
        .attr("dominant-baseline", "middle");
};
