# Exercise 4.5 – D3 binding and drawing with data

The TV brand data is bound to SVG rectangles: D3 draws one blue bar per brand,
sorted from most to fewest models. The sizes are still raw pixels, so the bars fill
only the top part of the tall canvas; Exercise 4.6 adds scales.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.5/> (Swinburne login required)
- **Part of:** [Exercise 4 – Introduction to D3.js](../) · previous: [4.4](../Exercise%204.4/) · next: [4.6](../Exercise%204.6/)

## Files

| File | What it does |
|---|---|
| `index.html` | The "TV Models by Brand" page; loads D3 v7 from the CDN, then `js/main.js` |
| `js/main.js` | Loads and sorts the CSV (as in 4.4), then draws the bars in `drawBarChart()` |
| `css/style.css` | Page styles and the responsive SVG container |
| `data/tvBrandCount.csv` | Number of TV models for each of 25 brands |

## What the code does

- `selectAll("rect").data(data).join("rect")` creates one `<rect>` for each brand.
- Each bar is 20 pixels high with a 12-pixel gap, so its `y` position comes from its
  place in the sorted list: `i * (barHeight + spacing)`.
- Each bar's width is its model count in pixels (`width = d.count`), and every bar
  starts at `x = 0`.
- Each bar gets the classes `bar` and `bar-<count>`, so it is easy to find in the page.

## Running locally

`d3.csv()` needs a web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open
<http://localhost:8000/Exercise%204/Exercise%204.5/>.
