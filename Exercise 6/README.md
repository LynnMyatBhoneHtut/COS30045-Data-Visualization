# Exercise 6 – Interactive Visualisations

Two interactive D3.js charts of the televisions on sale in Australia: a histogram of
labelled energy use that can be filtered by screen technology, and a scatterplot of
energy use against star rating with a tooltip that shows each model's screen size.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%206/> (Swinburne login required)
- **In the website's design:** [exercise-6_website](../exercise-6_website/), live at <https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-6_website/>

## What's on the page

| Part | Feature | How it works |
|---|---|---|
| 6.1 | Histogram | `d3.bin()` groups the 4,233 models into 14 bins of 200 kWh, from 0 to 2,800 kWh a year. The bins are then fixed, so filtered data falls into the same bins and every bar keeps its place. |
| 6.2 | Filters | Buttons for **All**, **LED**, **LCD** and **OLED**. Clicking one filters the data, re-bins it and moves the bars to their new heights with a 500 ms transition. The y-axis keeps its scale, so the groups compare directly. |
| 6.3 | Scatterplot | One dot per model: star rating along the x-axis, labelled energy use up the y-axis, coloured by screen technology with legend. The dots are 50% opaque so overlaps show where models cluster. |
| 6.4 | Tooltip | Hovering a dot shows that model's screen size in inches in a small box above it; the box fades out when the mouse leaves. |

Page headings: "Energy Consumption for different TV screen types and sizes" (6.1 and
6.2) and "Energy Consumption by Star Rating" (6.3 and 6.4).

## Files

```
Exercise 6/
├── index.html                 The page: filters, histogram, scatterplot and data source
├── css/
│   ├── base.css               General page styles and the filter buttons
│   └── visualisation.css      Styles shared by both charts: responsive SVG, axes, legend, tooltip
├── js/
│   ├── shared-constants.js    Sizes and margins, scales, the bin generator, colours and the filter list
│   ├── load-data.js           Loads the CSV, then draws the charts and sets up the interactions
│   ├── histogram.js           6.1: drawHistogram()
│   ├── interactions.js        6.2: populateFilters() and updateHistogram(); 6.4: createTooltip() and handleMouseEvents()
│   └── scatterplot.js         6.3: drawScatterplot()
└── data/
    └── Ex6_TVdata_withStar.csv   4,233 TV models
```

The scripts load in this order: `load-data.js`, `shared-constants.js`,
`interactions.js`, `histogram.js`, `scatterplot.js`. The tooltip is set up last, after
the scatterplot has been drawn.

## Data

`Ex6_TVdata_withStar.csv` has one row per TV model, with the columns `brand`,
`model`, `screenSize` (inches), `screenTech` (LED, LCD or OLED), `star` (star rating)
and `energyConsumption` (labelled kWh per year).

Source: [Energy Rating Data for household appliances – Televisions](https://www.energyrating.gov.au/), downloaded January 2026.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%206/>. D3 v7 is loaded from
`https://d3js.org/d3.v7.min.js` and the Roboto font from Google Fonts, so an
internet connection is needed.

## Reference

The exercise brief recommends Chapter 7 of Dufour and Meeks (2024) on interactive
visualisations.
