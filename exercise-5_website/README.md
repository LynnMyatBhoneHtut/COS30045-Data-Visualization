# Exercise 5 website · Site B

COS30045 Data Visualisation · Lynn Myat Bhone Htut

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-5_website/> (Swinburne login required)
- **Source on GitHub:** [exercise-5_website](https://github.com/LynnMyatBhoneHtut/COS30045-Data-Visualization/tree/main/exercise-5_website)

The three Exercise 5 charts combined into one page in the style of
[`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/) (same
header, navigation, colours, fonts and footer). All three charts are on the
page as soon as it loads, with the headings and descriptions from the original
page:

| Section | Chart |
|---|---|
| 5.1 Vertical Bar Chart with Axis | Average energy use of 55-inch TVs by screen technology |
| 5.2 Scatter Plot and Line Chart | Average Australian spot power price, 1998–2024 |
| 5.3 Donut Chart | TV models by screen size (small, medium, large) |

The "Jump to" links under the title go to each chart. The original
[`Exercise 5`](../Exercise%205/) folder's code is unchanged.

## Pages

The menu on every page is **Home · Televisions · About Us · Exercise 5**, the
same backbone as Exercise 0.2:

| Menu item | File | What it is |
|---|---|---|
| Home | `home.html` | Exercise 0.2 `index.html` (with the calculator) |
| Televisions | `televisions.html` | Exercise 0.2 `televisions.html` |
| About Us | `about.html` | Exercise 0.2 `about.html` |
| Exercise 5 | `index.html` | The exercise charts (opens first) |

The three Exercise 0.2 pages are copied unchanged except for file paths
(`assets/…`), the Home link (`home.html`) and the extra Exercise 5 menu item.

## View it

`d3.csv()` loads files over HTTP, so open the page through a local web server,
as with the original exercise:

- **VS Code Live Server:** open the repository folder, click *Go Live*, then go
  to <http://127.0.0.1:5500/exercise-5_website/>.
- **Terminal:** from the repository root run `python3 -m http.server 8000`, then
  open <http://localhost:8000/exercise-5_website/>.

## Folder structure

```
exercise-5_website/
├── index.html               the exercise charts (opens first)
├── home.html  televisions.html  about.html   from Exercise 0.2
├── README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css, unchanged, + a hub layer at the end
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/
│       ├── site.js, faq.js, calculator.js   copied unchanged from Exercise 0.2
│       └── theme.js         hands the stylesheet's colours to the D3 code
├── data/                    ARE_Spot_Prices.csv, Ex5_TV_energy_55inch.csv,
│                            Ex5_TV_screensize_count.csv (copied unchanged)
└── js/                      bar-chart.js, line-chart.js, donut-chart.js,
                             load-data.js (the exercise code)
```

## What changed in the D3 code

Margins, viewBoxes, scales, axes, the line and pie generators, the CSV paths,
the row conversions and the script order are the original code. Lines that
differ are marked `HUB:`.

| File | From | Changes |
|---|---|---|
| `js/bar-chart.js` | `Exercise 5/js/bar-chart.js` | `"green"` → `THEME.teal` |
| `js/line-chart.js` | `Exercise 5/js/line-chart.js` | Colour constants from the theme; title and subtitle classes; a 2px card-coloured ring on each point |
| `js/donut-chart.js` | `Exercise 5/js/donut-chart.js` | Same `d3.scaleOrdinal()`, but its range is one teal ramp, light to dark, because screen size is ordered (was `d3.schemeSet2`); label colour picked by contrast |
| `js/load-data.js` | `Exercise 5/js/load-data.js` | None, copied unchanged |

`assets/js/theme.js` reads the colours from `styles.css`, so the D3 code uses
`THEME.teal` instead of a hard-coded colour.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-5_website/assets/css exercise-5_website/assets/js exercise-5_website/assets/img \
         exercise-5_website/data exercise-5_website/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-5_website/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" exercise-5_website/assets/js/
cp -n "Exercise 5/data/"*.csv exercise-5_website/data/
cp -n "Exercise 5/js/load-data.js" exercise-5_website/js/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 4 website](../exercise-4_website/) · [Exercise 6 website](../exercise-6_website/)
- Original: [Exercise 5](../Exercise%205/)

## Notes

- Generative AI: this page was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 5 work.
