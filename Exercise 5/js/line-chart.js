const drawLineChart = data => {
    // Set up inner chart margins and dimensions (same as the bar chart)
    const margin = { top: 50, right: 200, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the svg container (viewBox makes it responsive)
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales (both continuous, so both scaleLinear)
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year)) // [1998, 2024]
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")); // format ticks as integers using "d" (2000, not 2,000)

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

    // Add y-axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Average Price ($ per mWh)")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("text-anchor", "start");

    // Area generator: fills the space under the line
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(innerHeight)
        .y1(d => yScale(d.averagePrice))
        .curve(d3.curveStep);

    innerChart
        .append("path")
        .attr("class", "area")
        .attr("d", areaGenerator(data))
        .attr("fill", "green")
        .attr("fill-opacity", 0.17);

    // Line generator: turns each data point into x, y coordinates via the scales
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveStep);

    // Draw the line
    innerChart
        .append("path")
        .attr("class", "line")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green");

    // Draw the data points (scatter plot)
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "point")
        .attr("r", 5)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "green");

    // Label the line at its last data point
    const lastPoint = data[data.length - 1];
    innerChart
        .append("text")
        .attr("class", "line-label")
        .text("Average Price ($ per mWh)")
        .attr("x", xScale(lastPoint.year) + 12)
        .attr("y", yScale(lastPoint.averagePrice))
        .attr("dominant-baseline", "middle")
        .attr("fill", "green");
};
