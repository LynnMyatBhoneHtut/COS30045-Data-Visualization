# Exercise 5 – Bar, Line and Donut Charts

Three D3.js charts on one page: TV energy consumption and Australian electricity
spot prices.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%205/> (Swinburne login required)
- **In the website's design:** [exercise-5_website](../exercise-5_website/), live at <https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-5_website/>

> The copy on Mercury is a larger version of this exercise ("Exercise 5 -
> Multi-Chart Webpage") with two more charts: a scatter plot of star rating against
> energy use, and a donut of energy use by screen technology. Those two charts are
> not in this folder.

## Charts

| Exercise | Chart | What it shows |
|---|---|---|
| 5.1 | Vertical bar chart with axes | Average labelled energy consumption (kWh/year) of 55-inch TVs by screen technology, sorted from highest to lowest: LED 369, OLED 362, LCD 335 |
| 5.2 | Scatter plot and line chart | Average spot power price ($ per megawatt hour) in Australia, 1998–2024: from $41.50 in 1998 to a low of $30.25 in 2011 and a peak of $144.50 in 2022 |
| 5.3 | Donut chart | Proportion of small (770), medium (2,386) and large (1,352) TV models in the data set |

## Files

```
Exercise 5/
├── index.html              The page: one section per chart
├── css/style.css           Page and chart styles
├── js/
│   ├── bar-chart.js        5.1: drawBarChart() (band and linear scales, axes, value labels)
│   ├── line-chart.js       5.2: drawLineChart() (line generator plus a point for each year)
│   ├── donut-chart.js      5.3: drawDonutChart() (d3.pie and d3.arc, inner radius 60%)
│   └── load-data.js        Loads the three CSV files and calls the three draw functions
└── data/
    ├── Ex5_TV_energy_55inch.csv     Screen_Tech, Energy_Consumption
    ├── ARE_Spot_Prices.csv          Prices by region and the average, 1998–2024
    └── Ex5_TV_screensize_count.csv  Screensize_Category, Count
```

## How it works

- `load-data.js` reads each CSV with `d3.csv()` and a row-conversion function that
  turns the numbers from text into numbers, then calls the matching draw function.
- **5.1:** the bars are sorted from highest to lowest energy use. A band scale places
  the screen technologies and a linear scale sets the bar heights; each bar is
  labelled with its value in kWh.
- **5.2:** both scales are linear, because years and prices are continuous. The line
  uses `d3.line()` and each year also gets a circle, so the chart is a scatter plot
  and a line chart in one. The y-axis label is the chart's title and subtitle.
- **5.3:** `d3.pie()` turns the counts into angles and `d3.arc()` draws the slices,
  with each category's name in the middle of its slice. The categories keep their
  order from the CSV (large, medium, small), so each keeps the same position and
  colour.

The chart code is in functions, and `load-data.js` loads last, so each chart is drawn
only after its data has loaded.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%205/>. D3 v7 is loaded from
`https://d3js.org/d3.v7.min.js`, so an internet connection is needed.
