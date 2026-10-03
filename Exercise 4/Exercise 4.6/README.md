# Exercise 4.6 – Scaling charts

D3 scales map the data to the space on screen, so all 25 bars now fit a smaller
500 × 600 canvas. A linear scale turns each model count into a bar width, and a band
scale spaces the brands evenly down the chart.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.6/> (Swinburne login required)
- **Part of:** [Exercise 4 – Introduction to D3.js](../) · previous: [4.5](../Exercise%204.5/) · next: [4.7](../Exercise%204.7/)

## Files

| File | What it does |
|---|---|
| `index.html` | The "TV Models by Brand" page; loads D3 v7 from the CDN, then `js/main.js` |
| `js/main.js` | Loads and sorts the CSV, then draws the bars with scales |
| `css/style.css` | Page styles and the responsive SVG container |
| `data/tvBrandCount.csv` | Number of TV models for each of 25 brands |

## What the code does

- The canvas shrinks to `viewBox="0 0 500 600"`.
- `d3.scaleLinear()` maps counts from 0–1,200 to bar widths of 0–400 pixels,
  leaving room for labels in Exercise 4.7.
- `d3.scaleBand()` maps the brand names to positions down the 600-pixel height,
  with `padding(0.2)` between bars; `bandwidth()` gives each bar's height.
- Each bar's `y` now comes from `yScale(d.brand)` and its width from
  `xScale(d.count)`.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%204/Exercise%204.6/>.
