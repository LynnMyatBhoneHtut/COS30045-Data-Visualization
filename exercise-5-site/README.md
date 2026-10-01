# Exercise 5 Hub · Site B

COS30045 Data Visualisation · Lynn Myat Bhone Htut

The three Exercise 5 charts in one site, shown as tabs: **5.1** a vertical bar
chart of 55-inch TV energy use by screen technology, **5.2** a line chart of
the average Australian spot power price from 1998 to 2024, and **5.3** a donut
chart of TV models by screen size. The site is an independent clone of
[`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/)
(same header and navigation, hero with the energy-scale strip, cards, FAQ
accordion and footer), with the original Exercise 5 D3 code running inside it.

The original [`Exercise 5`](../Exercise%205/) folder is untouched.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Tabs for 5.1, 5.2 and 5.3, each with a read-out strip and the key code; key numbers; FAQ |
| `data.html` | The three CSV files as tables, loaded live |
| `about.html` | Where every file came from and what changed |

## View it

`d3.csv()` loads files over HTTP, so open the site through a local web server,
as with the original exercises. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/exercise-5-site/>. VS Code's Live Server works
too. With GitHub Pages turned on for `main` (root), the site is at
`https://lynnmyatbhonehtut.github.io/COS30045-Data-Visualization/exercise-5-site/`.

## Folder structure

```
exercise-5-site/
├── index.html  data.html  about.html  README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css + an appended hub layer
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/                  site.js, faq.js (copied unchanged), tabs.js (from
│                            Exercise 3), theme.js, hub-readouts.js,
│                            data-table.js, data-page.js
├── data/                    ARE_Spot_Prices.csv, Ex5_TV_energy_55inch.csv,
│                            Ex5_TV_screensize_count.csv (copied unchanged)
└── js/                      bar-chart.js, line-chart.js, donut-chart.js,
                             load-data.js
```

Nothing here loads a style, script or data file from outside this folder, so
it can be hosted on its own. Only the "Open original" buttons point back to
the original exercise folder.

## What changed in the D3 code

Margins, viewBoxes, scales, axes, the line and pie generators, the CSV paths
and the row conversions are the original code. Lines that differ are marked
`HUB:`.

| File | From | Changes |
|---|---|---|
| `js/bar-chart.js` | `Exercise 5/js/bar-chart.js` | `"green"` → `THEME.teal` |
| `js/line-chart.js` | `Exercise 5/js/line-chart.js` | Colour constants from the theme; title and subtitle classes; a 2px card-coloured ring on each point |
| `js/donut-chart.js` | `Exercise 5/js/donut-chart.js` | Same `d3.scaleOrdinal()`, but its range is one teal ramp, light to dark, because screen size is ordered (was `d3.schemeSet2`); label colour picked by contrast |
| `js/load-data.js` | `Exercise 5/js/load-data.js` | None, copied unchanged |

`assets/js/theme.js` reads the colours from `styles.css`, so the D3 code uses
`THEME.teal` instead of a hard-coded colour. The donut ramp
(`#62b6b0` → `#0e7f7a` → `#0b5f5c`) was checked for even steps and contrast.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-5-site/assets/css exercise-5-site/assets/js exercise-5-site/assets/img \
         exercise-5-site/data exercise-5-site/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-5-site/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" "Exercise 0.2/energy-webpage-v1/faq.js" exercise-5-site/assets/js/
cp -n "Exercise 5/data/"*.csv exercise-5-site/data/
cp -n "Exercise 5/js/load-data.js" exercise-5-site/js/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 4 Hub](../exercise-4-site/) · [Exercise 6 Hub](../exercise-6-site/)
- Original: [Exercise 5](../Exercise%205/)

## Notes

- Generative AI: this hub was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 5 work.
