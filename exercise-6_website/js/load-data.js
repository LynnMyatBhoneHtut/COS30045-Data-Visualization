// Load the CSV file with a row conversion function
d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert screenSize to a number
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energyConsumption to a number
    star: +d.star // Convert to number
})).then(data => {
    // Log the processed data to the console
    console.log(data);

    // Call functions after data is loaded
    drawHistogram(data);   // Exercise 6.1
    populateFilters(data); // Exercise 6.2
    drawScatterplot(data); // Exercise 6.3

    // Exercise 6.4: called last, so the scatterplot is already drawn
    // and has data in it before the tooltip is activated
    createTooltip();
    handleMouseEvents();

}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
