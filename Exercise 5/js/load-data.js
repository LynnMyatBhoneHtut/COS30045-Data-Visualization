// ---------- Exercise 5.1: Vertical bar chart ----------
// Load the 55-inch TV data (mean energy consumption by screen technology)
d3.csv("data/Ex5_TV_energy_55inch.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech,               // string
        Energy_Consumption: +d.Energy_Consumption // convert string to number
    };
}).then(data => {
    // Check the data has loaded as strings and numbers
    console.log(data);

    // Sort from highest to lowest energy consumption
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

    // Draw the bar chart
    drawBarChart(data);
}).catch(error => {
    console.error("Error loading the TV energy CSV file:", error);
});

// ---------- Exercise 5.2: Scatter plot and line chart ----------
// Load the Australian spot power prices (1998-2024)
d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d["Year"],                                // number, not string: line charts need continuous data
        averagePrice: +d["Average Price (notTas-Snowy)"] // exact column header from the csv
    };
}).then(data => {
    // Check the data has loaded as numbers
    console.log(data);

    // Draw the line chart
    drawLineChart(data);
}).catch(error => {
    console.error("Error loading the spot price CSV file:", error);
});

// ---------- Exercise 5.3: Donut chart ----------
// Load the number of TV models in each screen size category
d3.csv("data/Ex5_TV_screensize_count.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category, // string
        Count: +d.Count                             // convert string to number
    };
}).then(data => {
    // Check the data has loaded as strings and numbers
    console.log(data);

    // No sort here: the categories keep the order they have in the table
    // (large, medium, small), so each category keeps the same slice position
    // and colour. A donut shows parts of a whole, so sorting by size
    // is not needed to read it.

    // Draw the donut chart
    drawDonutChart(data);
}).catch(error => {
    console.error("Error loading the screen size CSV file:", error);
});
