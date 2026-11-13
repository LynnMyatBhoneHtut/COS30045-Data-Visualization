# Exercise 4.7 – Adding labels

The finished bar chart of TV models by brand. Each bar sits in an SVG `<g>` group
with two labels: the brand name to its left and the number of models at its end.
Samsung lists the most models (1,096), followed by Kogan (788) and LG (677).

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.7/> (Swinburne login required)
- **Part of:** [Exercise 4 – Introduction to D3.js](../) · previous: [4.6](../Exercise%204.6/)

## Files

| File | What it does |
|---|---|
| `index.html` | The "TV Models by Brand" page; loads D3 v7 from the CDN, then `js/main.js` |
| `js/main.js` | Loads and sorts the CSV, then draws the labelled bar chart |
| `css/style.css` | Page styles and the responsive SVG container |
| `data/tvBrandCount.csv` | Number of TV models for each of 25 brands |

## What the code does

- `labelSpace = 100` reserves 100 pixels on the left for the brand names, so the
  bars start at `x = 100`.
- The linear scale maps counts from 0–1,200 to 0–340 pixels, so the label space,
  the longest bar and its count all fit the 500-wide canvas.
- `selectAll("g").data(data).join("g")` creates one group per brand, moved into
  place with `translate(0, yScale(d.brand))`; the bar and both labels are drawn
  inside it.
- The brand name is right-aligned 10 pixels before the bar (`text-anchor: end`),
  and the count sits 5 pixels after the end of the bar.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%204/Exercise%204.7/>.
