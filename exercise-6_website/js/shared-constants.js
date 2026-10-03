// Ported from: Exercise 6/js/shared-constants.js
// Hub change (marked "HUB:"): the two colours come from the theme.
// Everything else - sizes, margins, scales, the bin generator and the
// filter list - is the original code.

// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// set up inner chart variable for scatterplot
let innerChartS;

// set up tooltip dimensions
const tooltipWidth = 65;
const tooltipHeight = 32;

// Set up colors accessible globally
const barColor = THEME.inkSoft;            // HUB: was "#606464" (a neutral grey; now the theme's slate)
const bodyBackgroundColor = THEME.card;    // HUB: was "#fffaf0" - the charts now sit on a white card

// set up the histogram scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Set up the scatterplot scales and color scale
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption

// Array of filter options for screen types
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];
