# Exercise 6 website · Site C

COS30045 Data Visualisation · Lynn Myat Bhone Htut

The Exercise 6 interactive charts combined into one page in the style of
[`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/) (same
header, navigation, colours, fonts and footer). Both charts are on the page as
soon as it loads, with the headings and descriptions from the original page:

| Section | Chart |
|---|---|
| 6.1 · 6.2 Energy Consumption for different TV screen types and sizes | Histogram of labelled energy use, with All / LED / LCD / OLED filter buttons |
| 6.3 · 6.4 Energy Consumption by Star Rating | Scatterplot of energy use against star rating; hover a dot to see its screen size |

The links in the navigation bar jump to each chart. The original
[`Exercise 6`](../Exercise%206/) folder is untouched.

## View it

`d3.csv()` loads files over HTTP, so open the page through a local web server,
as with the original exercise:

- **VS Code Live Server:** open the repository folder, click *Go Live*, then go
  to <http://127.0.0.1:5500/exercise-6-site/>.
- **Terminal:** from the repository root run `python3 -m http.server 8000`, then
  open <http://localhost:8000/exercise-6-site/>.

## Folder structure

```
exercise-6-site/
├── index.html               the page
├── README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css, unchanged, + a hub layer at the end
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/
│       ├── site.js          copied unchanged (footer year)
│       └── theme.js         hands the stylesheet's colours to the D3 code
├── data/Ex6_TVdata_withStar.csv   copied unchanged
└── js/                      shared-constants.js, load-data.js, interactions.js,
                             histogram.js, scatterplot.js (the exercise code)
```

## What changed in the D3 code

Sizes, margins, scales, bins, the filter logic, the 500 ms transition, the
tooltip's position and text, the CSV path and the script order are the
original code. Lines that differ are marked `HUB:`.

| File | From | Changes |
|---|---|---|
| `js/shared-constants.js` | `Exercise 6/js/shared-constants.js` | `barColor` and `bodyBackgroundColor` come from the theme |
| `js/scatterplot.js` | `Exercise 6/js/scatterplot.js` | Colour range from the theme instead of `d3.schemeCategory10` |
| `js/interactions.js` | `Exercise 6/js/interactions.js` | Tooltip drawn in ink with amber text |
| `js/histogram.js`, `js/load-data.js` | `Exercise 6/js/` | None, copied unchanged |

`assets/js/theme.js` reads the colours from `styles.css`. The scatterplot's
three colours (LED `#009894`, LCD `#c07c00`, OLED `#5b4fa8`) were checked for
colour-blind separation and contrast on white.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-6-site/assets/css exercise-6-site/assets/js exercise-6-site/assets/img \
         exercise-6-site/data exercise-6-site/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-6-site/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" exercise-6-site/assets/js/
cp -n "Exercise 6/data/Ex6_TVdata_withStar.csv" exercise-6-site/data/
cp -n "Exercise 6/js/load-data.js" "Exercise 6/js/histogram.js" exercise-6-site/js/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 4 website](../exercise-4-site/) · [Exercise 5 website](../exercise-5-site/)
- Original: [Exercise 6](../Exercise%206/)

## Notes

- Data source: Energy Rating Data for household appliances – Televisions
  (energyrating.gov.au), downloaded January 2026.
- Generative AI: this page was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 6 work.
