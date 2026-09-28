const drawBarChart = data => {
    // Set up inner chart margins and dimensions
    const margin = { top: 50, right: 200, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add the svg container (viewBox makes it responsive)
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`);
        // .style("border", "1px solid black"); // uncomment to see the svg edges

    // Create inner chart group and apply margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        // a little headroom above the tallest bar so its value label fits
        .domain([0, d3.max(data, d => d.Energy_Consumption) * 1.07])
        .range([innerHeight, 0]);

    // Create axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickSize(0)                      // remove tick marks on the x-axis
        .tickPadding(12)
        .tickFormat(d => d.toUpperCase()); // lcd -> LCD
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

    // Add axis label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -20)
        .attr("text-anchor", "start");

    // Add bars
    innerChart
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("fill", "green");

    // Add value labels on top of each bar
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 6)
        .attr("text-anchor", "middle");
};
