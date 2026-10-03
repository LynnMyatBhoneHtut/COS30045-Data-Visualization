# Exercise 4 website · Site A

COS30045 Data Visualisation · Lynn Myat Bhone Htut

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-4_website/> (Swinburne login required)
- **Source on GitHub:** [exercise-4_website](https://github.com/LynnMyatBhoneHtut/COS30045-Data-Visualization/tree/main/exercise-4_website)

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

The "Jump to" links under the title go to each section. Exercise 4.1 (Draw SVGs)
stays on its own page in [`Exercise 4/Exercise 4.1`](../Exercise%204/Exercise%204.1/);
the page links to it. The original exercise code is unchanged.

## Pages

The menu on every page is **Home · Televisions · About Us · Exercise 4**, the
same backbone as Exercise 0.2:

| Menu item | File | What it is |
|---|---|---|
| Home | `home.html` | Exercise 0.2 `index.html` (with the calculator) |
| Televisions | `televisions.html` | Exercise 0.2 `televisions.html` |
| About Us | `about.html` | Exercise 0.2 `about.html` |
| Exercise 4 | `index.html` | The exercise charts (opens first) |

The three Exercise 0.2 pages are copied unchanged except for file paths
(`assets/…`), the Home link (`home.html`) and the extra Exercise 4 menu item.

## View it

`d3.csv()` loads files over HTTP, so open the page through a local web server,
as with the original exercises:

- **VS Code Live Server:** open the repository folder, click *Go Live*, then go
  to <http://127.0.0.1:5500/exercise-4_website/>.
- **Terminal:** from the repository root run `python3 -m http.server 8000`, then
  open <http://localhost:8000/exercise-4_website/>.

## Folder structure

```
exercise-4_website/
├── index.html               the exercise charts (opens first)
├── home.html  televisions.html  about.html   from Exercise 0.2
├── README.md
├── assets/
│   ├── css/styles.css       Exercise 0.2 styles.css, unchanged, + a hub layer at the end
│   ├── img/PowerIcon.png    copied unchanged; favicon.png is a 64 px copy
│   └── js/
│       ├── site.js, faq.js, calculator.js   copied unchanged from Exercise 0.2
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
mkdir -p exercise-4_website/assets/css exercise-4_website/assets/js exercise-4_website/assets/img \
         exercise-4_website/data exercise-4_website/js
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" exercise-4_website/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js" exercise-4_website/assets/js/
cp -n "Exercise 4/Exercise 4.7/data/tvBrandCount.csv" exercise-4_website/data/
git status --short    # only the new folder appears; no existing file is modified
```

## Related

- [Exercise 5 website](../exercise-5_website/) · [Exercise 6 website](../exercise-6_website/)
- Originals: [4.1](../Exercise%204/Exercise%204.1/) · [4.3](../Exercise%204/Exercise%204.3/) ·
  [4.4](../Exercise%204/Exercise%204.4/) · [4.5](../Exercise%204/Exercise%204.5/) ·
  [4.6](../Exercise%204/Exercise%204.6/) · [4.7](../Exercise%204/Exercise%204.7/)
