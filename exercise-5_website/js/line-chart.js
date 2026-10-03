// Ported from: Exercise 5/js/line-chart.js
// Hub changes (marked "HUB:") - the D3 logic is unchanged:
//   1. The four colour constants come from the theme.
//   2. The title and subtitle get theme classes (Archivo heading,
//      IBM Plex Mono label) instead of a light-weight system font.
//   3. Each point gets a 2px ring in the card colour so it stays
//      readable where it sits on the line.

const drawLineChart = data => {
    // Set up inner chart margins and dimensions.
    // Same width, height, left, right and bottom as the bar chart, with a
    // taller top margin to fit the chart title and subtitle.
    const margin = { top: 90, right: 200, bottom: 50, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Colours for this chart's design
    const lineColour = THEME.teal;      // HUB: was "#000" (black line and points)
    const axisColour = THEME.rule;      // HUB: was "#ccc" (light grey axis lines and ticks)
    const textColour = THEME.inkSoft;   // HUB: was "#888" (grey tick labels and subtitle)
    const titleColour = THEME.ink;      // HUB: was "#555" (dark grey title)

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
        .range([innerHeight, 0])
        .nice(); // round the top of the axis up to a whole tick (160)

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")); // format ticks as integers using "d" (2000, not 2,000)

    const leftAxis = d3.axisLeft(yScale);

    // Add axes
    const xAxis = innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    const yAxis = innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // Style both axes: light grey lines and grey labels
    [xAxis, yAxis].forEach(axis => {
        axis.selectAll("path, line").attr("stroke", axisColour);
        axis.selectAll("text")
            .attr("fill", textColour)
            .style("font-size", "14px");
    });
    xAxis.selectAll("text").attr("dy", "1.2em"); // a little more space below the x-axis

    // Add chart title and subtitle (also acts as the y-axis label)
    innerChart
        .append("text")
        .attr("class", "chart-title")            // HUB: theme heading font
        .text("Average spot price")
        .attr("x", -margin.left + 10)
        .attr("y", -55)
        .attr("text-anchor", "start")
        .attr("fill", titleColour)
        .style("font-size", "30px");             // HUB: .style("font-weight", "300") removed; the class sets 800

    innerChart
        .append("text")
        .attr("class", "chart-subtitle")         // HUB: theme data font
        .text("$ PER MEGAWATT HOUR")
        .attr("x", -margin.left + 10)
        .attr("y", -30)
        .attr("text-anchor", "start")
        .attr("fill", textColour)
        .style("font-size", "14px");             // HUB: letter-spacing moved to styles.css

    // Line generator: turns each data point into x, y coordinates via the scales.
    // d3.line() draws straight lines between points by default (d3.curveLinear).
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // Draw the line
    innerChart
        .append("path")
        .attr("class", "line")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", lineColour)
        .style("stroke-width", "4px") // style (not attr) so it overrides the .line rule in style.css
        .attr("stroke-linejoin", "round");

    // Draw the data points (scatter plot) on top of the line
    innerChart
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "point")
        .attr("r", 7)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", lineColour)
        .attr("stroke", THEME.card)              // HUB: 2px ring in the card colour
        .attr("stroke-width", 2);
};
