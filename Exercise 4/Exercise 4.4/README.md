# Exercise 4.4 – Load data from CSV

D3 loads `tvBrandCount.csv`, the number of TV models each brand sells in Australia.
The data is checked, sorted and written to the browser console; nothing is drawn
yet, so the canvas stays empty. The bars are added in Exercise 4.5.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.4/> (Swinburne login required)
- **Part of:** [Exercise 4 – Introduction to D3.js](../) · previous: [4.3](../Exercise%204.3/) · next: [4.5](../Exercise%204.5/)

## Files

| File | What it does |
|---|---|
| `index.html` | The "TV Models by Brand" page; loads D3 v7 from the CDN, then `js/main.js` |
| `js/main.js` | Creates the 1200 × 1600 SVG canvas (from 4.3), then loads the CSV with `d3.csv()` |
| `css/style.css` | Page styles and the responsive SVG container |
| `data/tvBrandCount.csv` | 25 rows with the columns `brand` and `count` |

## What the code does

1. `d3.csv("data/tvBrandCount.csv", …)` reads the file with a row-conversion
   function that turns `count` from text into a number (`+d.count`).
2. It logs the data, the number of rows (25), the largest and smallest counts
   (1,096 and 24) and their extent with `d3.max`, `d3.min` and `d3.extent`.
3. It sorts the brands from most to fewest models with `d3.descending`.
4. It passes the sorted data to `drawBarChart()`, which for now only logs how many
   brands it received.

Open the browser's developer console to see the output.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%204/Exercise%204.4/>.
