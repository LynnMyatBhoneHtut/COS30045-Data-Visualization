# Exercise 4 Hub · Site A

COS30045 Data Visualisation · Lynn Myat Bhone Htut

Exercises **4.3 to 4.7** in one site: a single D3 bar chart of TV models by
brand, built step by step and shown as five tabs. The site is an independent
clone of [`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/)
(same header and navigation, hero with the energy-scale strip, cards, FAQ
accordion and footer), with the original Exercise 4 D3 code running inside it.

The original exercise folders are untouched. Exercise 4.1 stays a standalone
page in [`Exercise 4/Exercise 4.1`](../Exercise%204/Exercise%204.1/).

## Pages

| Page | What it shows |
|---|---|
| `index.html` | Tabs for 4.3 set up D3 · 4.4 load the CSV · 4.5 bind and draw · 4.6 add scales · 4.7 add labels, each with a read-out panel and the key code; key numbers; FAQ |
| `data.html` | `tvBrandCount.csv` as a table, loaded live |
| `about.html` | Where every file came from and what changed |

## View it

`d3.csv()` loads files over HTTP, so open the site through a local web server,
as with the original exercises. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/exercise-4-site/>. VS Code's Live Server works
too. With GitHub Pages turned on for `main` (root), the site is at
`https://lynnmyatbhonehtut.github.io/COS30045-Data-Visualization/exercise-4-site/`.

## Folder structure

```
exercise-4-site/
├── index.html  data.html  about.html  README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css + an appended hub layer
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/                  site.js, faq.js (copied unchanged), tabs.js (from
│                            Exercise 3), theme.js, hub-readouts.js,
│                            data-table.js, data-page.js
├── data/tvBrandCount.csv    copied unchanged
└── js/ex4-3.js … ex4-7.js   one file per exercise
```

Nothing here loads a style, script or data file from outside this folder, so
it can be hosted on its own. Only the "Open original" buttons point back to
the original exercise folders.

## What changed in the D3 code

Every scale, data join, position, size, CSV path, row conversion and console
log is the original code. Lines that differ are marked `HUB:`.

| File | From | Changes |
|---|---|---|
| `js/ex4-3.js` | `Exercise 4/Exercise 4.3/main.js` | Wrapped in a function; draws into `#chart-4-3`; `"blue"` → `THEME.teal`; black debug border → dashed `.chart-canvas` outline |
| `js/ex4-4.js` … `ex4-6.js` | `Exercise 4/Exercise 4.x/js/main.js` | The same changes (each in its own container) |
| `js/ex4-7.js` | `Exercise 4/Exercise 4.7/js/main.js` | The same, plus classes on the two labels so they take the site's fonts |

The wrapping is needed because five exercises share one page here, and each
original file declares `svg` and `drawBarChart` at the top level.

`assets/js/theme.js` reads the colours from `styles.css`, so the D3 code uses
`THEME.teal` instead of a hard-coded colour.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-4-site/assets/css exercise-4-site/assets/js exercise-4-site/assets/img \
         exercise-4-site/data exercise-4-site/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-4-site/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" "Exercise 0.2/energy-webpage-v1/faq.js" exercise-4-site/assets/js/
cp -n "Exercise 4/Exercise 4.7/data/tvBrandCount.csv" exercise-4-site/data/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 5 Hub](../exercise-5-site/) · [Exercise 6 Hub](../exercise-6-site/)
- Originals: [4.3](../Exercise%204/Exercise%204.3/) ·
  [4.4](../Exercise%204/Exercise%204.4/) · [4.5](../Exercise%204/Exercise%204.5/) ·
  [4.6](../Exercise%204/Exercise%204.6/) · [4.7](../Exercise%204/Exercise%204.7/)

## Notes

- In 4.7 the label "spark electronics" is a few units wider than the 100-unit
  label space (in the original too). The hub lets the SVG draw past its edge so
  the first letter isn't cut off; the layout code is unchanged.
- Generative AI: this hub was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 4 work.
