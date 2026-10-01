# Exercise 4 website · Site A

COS30045 Data Visualisation · Lynn Myat Bhone Htut

Exercises **4.3 to 4.7** combined into one page in the style of
[`Exercise 0.2/energy-webpage-v1`](../Exercise%200.2/energy-webpage-v1/) (same
header, navigation, colours, fonts and footer). Every exercise output is on the
page as soon as it loads, one section each, in order:

| Section | Exercise | What you see |
|---|---|---|
| 4.3 | D3 setup | The 1200 × 1600 canvas with its test bar |
| 4.4 | Load data from CSV | The empty canvas, plus the values the exercise logs to the console |
| 4.5 | D3 binding and drawing with data | One bar per brand, drawn in raw pixels |
| 4.6 | Scaling charts | The same bars sized with D3 scales on a 500 × 600 canvas |
| 4.7 | Adding labels | The finished bar chart with brand names and counts |

The links in the navigation bar jump to each section. Exercise 4.1 (Draw SVGs)
stays on its own page, unchanged, in
[`Exercise 4/Exercise 4.1`](../Exercise%204/Exercise%204.1/); the page links to it.
The original exercise folders are untouched.

## View it

`d3.csv()` loads files over HTTP, so open the page through a local web server,
as with the original exercises:

- **VS Code Live Server:** open the repository folder, click *Go Live*, then go
  to <http://127.0.0.1:5500/exercise-4-site/>.
- **Terminal:** from the repository root run `python3 -m http.server 8000`, then
  open <http://localhost:8000/exercise-4-site/>.

## Folder structure

```
exercise-4-site/
├── index.html               the page
├── README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css, unchanged, + a hub layer at the end
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/
│       ├── site.js          copied unchanged (footer year)
│       ├── theme.js         hands the stylesheet's colours to the D3 code
│       └── console-readout.js  shows the 4.4 console values on the page
├── data/tvBrandCount.csv    copied unchanged
└── js/ex4-3.js … ex4-7.js   the exercise code, one file per exercise
```

## What changed in the D3 code

Every scale, data join, position, size, CSV path, row conversion and console
log is the original code. Lines that differ are marked `HUB:`.

| File | From | Changes |
|---|---|---|
| `js/ex4-3.js` | `Exercise 4/Exercise 4.3/main.js` | Wrapped in a function; draws into `#chart-4-3`; `"blue"` → `THEME.teal`; black debug border → dashed `.chart-canvas` outline |
| `js/ex4-4.js` … `ex4-6.js` | `Exercise 4/Exercise 4.x/js/main.js` | The same changes, each in its own container |
| `js/ex4-7.js` | `Exercise 4/Exercise 4.7/js/main.js` | The same, plus classes on the two labels so they take the site's fonts |

The wrapping is needed because five exercises share one page here, and each
original file declares `svg` and `drawBarChart` at the top level.

## Rebuilding this folder safely

The reused files were copied with `cp -n`, which never overwrites anything:

```bash
mkdir -p exercise-4-site/assets/css exercise-4-site/assets/js exercise-4-site/assets/img \
         exercise-4-site/data exercise-4-site/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-4-site/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" exercise-4-site/assets/js/
cp -n "Exercise 4/Exercise 4.7/data/tvBrandCount.csv" exercise-4-site/data/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 5 website](../exercise-5-site/) · [Exercise 6 website](../exercise-6-site/)
- Originals: [4.1](../Exercise%204/Exercise%204.1/) · [4.3](../Exercise%204/Exercise%204.3/) ·
  [4.4](../Exercise%204/Exercise%204.4/) · [4.5](../Exercise%204/Exercise%204.5/) ·
  [4.6](../Exercise%204/Exercise%204.6/) · [4.7](../Exercise%204/Exercise%204.7/)

## Notes

- In 4.7 the label "spark electronics" is a few units wider than the 100-unit
  label space (in the original too). The page lets the SVG draw past its edge so
  the first letter isn't cut off; the layout code is unchanged.
- Generative AI: this page was assembled and restyled with the help of Claude
  (Anthropic). The D3 chart code is the author's own Exercise 4 work.
