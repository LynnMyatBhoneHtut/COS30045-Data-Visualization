# Exercise 6 Hub · Site C

COS30045 Data Visualisation · Lynn Myat Bhone Htut

The Exercise 6 interactive charts in one site, shown as two tabs: **6.1–6.2**
a histogram of labelled TV energy use with filter buttons for screen
technology, and **6.3–6.4** a scatterplot of energy use against star rating
with a screen-size tooltip. The site is an independent clone of
[`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/)
(same header and navigation, hero with the energy-scale strip, cards, FAQ
accordion and footer), with the original Exercise 6 D3 code running inside it.

The original [`Exercise 6`](../Exercise%206/) folder is untouched.

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Tabs for 6.1–6.2 and 6.3–6.4, each with a read-out strip (the histogram's follows the filter) and the key code; key numbers; FAQ |
| `data.html` | A summary of `Ex6_TVdata_withStar.csv` by screen technology and its first 25 rows, loaded live |
| `about.html` | Where every file came from and what changed |

## View it

`d3.csv()` loads files over HTTP, so open the site through a local web server,
as with the original exercises. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/exercise-6-site/>. VS Code's Live Server works
too. With GitHub Pages turned on for `main` (root), the site is at
`https://lynnmyatbhonehtut.github.io/COS30045-Data-Visualization/exercise-6-site/`.

## Folder structure

```
exercise-6-site/
├── index.html  data.html  about.html  README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css + an appended hub layer
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/                  site.js, faq.js (copied unchanged), tabs.js (from
│                            Exercise 3), theme.js, hub-readouts.js,
│                            data-table.js, data-page.js
├── data/Ex6_TVdata_withStar.csv   copied unchanged
└── js/                      shared-constants.js, load-data.js, interactions.js,
                             histogram.js, scatterplot.js
```

Nothing here loads a style, script or data file from outside this folder, so
it can be hosted on its own. Only the "Open original" buttons point back to
the original exercise folder.

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
colour-blind separation and contrast on white. `assets/js/hub-readouts.js`
also mirrors the filter buttons' `active` class as `aria-pressed` for screen
readers, without changing the original filter code.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-6-site/assets/css exercise-6-site/assets/js exercise-6-site/assets/img \
         exercise-6-site/data exercise-6-site/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-6-site/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" "Exercise 0.2/energy-webpage-v1/faq.js" exercise-6-site/assets/js/
cp -n "Exercise 6/data/Ex6_TVdata_withStar.csv" exercise-6-site/data/
cp -n "Exercise 6/js/load-data.js" "Exercise 6/js/histogram.js" exercise-6-site/js/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 4 Hub](../exercise-4-site/) · [Exercise 5 Hub](../exercise-5-site/)
- Original: [Exercise 6](../Exercise%206/)

## Notes

- Data source: Energy Rating Data for household appliances – Televisions
  (energyrating.gov.au), downloaded January 2026.
- Generative AI: this hub was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 6 work.
