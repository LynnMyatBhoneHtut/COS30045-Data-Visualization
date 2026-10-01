# builds/ — themed hub sites for Exercises 4 to 6

COS30045 Data Visualisation · Lynn Myat Bhone Htut

This folder adds review targets to the repository **without changing any
existing file**. Every exercise folder (`Exercise 0.2/energy-webpage-v1`,
`Exercise 4`, `Exercise 5`, `Exercise 6`, …) stays exactly as it was; the hubs
are new files that live only under `builds/`.

## The four targets

| Target | Open | What it shows |
|---|---|---|
| Exercise 4.1, standalone and unchanged | `../Exercise 4/Exercise 4.1/index.html` | The SVG house before and after, in its original folder |
| **Site A** · Exercise 4 hub | `exercise-4-site/index.html` | Exercises 4.3–4.7 as five tabs: setup, CSV, binding, scales, labels |
| **Site B** · Exercise 5 hub | `exercise-5-site/index.html` | 5.1 bar chart, 5.2 line chart, 5.3 donut chart as tabs |
| **Site C** · Exercise 6 hub | `exercise-6-site/index.html` | 6.1–6.2 histogram with filters, 6.3–6.4 scatterplot with tooltip |
| Landing page | `index.html` | Links to all four, plus the original folders |

Each hub is an independent clone of `Exercise 0.2/energy-webpage-v1`: the same
header and navigation (logo top-left, active-page highlight), hero with the
energy-scale strip, card grid, FAQ accordion and footer, with three pages:

- `index.html` (Home): the exercise charts in tabs, a read-out beside or below
  each chart, the key code for each step, key numbers and an FAQ
- `data.html` (Data): the CSV files behind the charts as tables
- `about.html` (About): where every file came from and what changed

## Folder structure

```
builds/
├── index.html                 landing page (links to the 4 targets)
├── README.md                  this file
├── assets/                    the landing page's own copy of the theme
│   ├── css/styles.css
│   ├── img/PowerIcon.png, favicon.png
│   └── js/site.js
│
├── exercise-4-site/           SITE A
│   ├── index.html  data.html  about.html
│   ├── assets/
│   │   ├── css/styles.css     the unified stylesheet (same file in every hub)
│   │   ├── img/PowerIcon.png  favicon.png
│   │   └── js/                site.js, faq.js (unchanged copies), tabs.js,
│   │                          theme.js, hub-readouts.js, data-table.js, data-page.js
│   ├── data/tvBrandCount.csv
│   └── js/ex4-3.js … ex4-7.js one ported file per exercise
│
├── exercise-5-site/           SITE B
│   ├── index.html  data.html  about.html
│   ├── assets/ (as above)
│   ├── data/ARE_Spot_Prices.csv, Ex5_TV_energy_55inch.csv, Ex5_TV_screensize_count.csv
│   └── js/bar-chart.js, line-chart.js, donut-chart.js, load-data.js
│
└── exercise-6-site/           SITE C
    ├── index.html  data.html  about.html
    ├── assets/ (as above)
    ├── data/Ex6_TVdata_withStar.csv
    └── js/shared-constants.js, load-data.js, interactions.js, histogram.js, scatterplot.js
```

Each hub folder is self-contained: copy `exercise-5-site/` anywhere and it still
works. Nothing in a hub loads a style, script or data file from outside its own
folder. The only links that leave a hub are the "Open original" buttons and the
"All sites" link, which need the whole repository to be served.

## How the theme is cloned

- **`assets/css/styles.css`** is the Exercise 0.2 `styles.css`, byte for byte,
  with a *hub layer* appended underneath (sections 10–18: chart tokens, tabs,
  chart cards, read-outs, D3 typography, filter buttons, tooltip, code panels,
  data tables, landing cards). The same file is copied into every hub.
- **`assets/js/theme.js`** reads the colour custom properties from that
  stylesheet and exposes them to the D3 code as `THEME.teal`, `THEME.ink`, …
  Change a colour once in the CSS and every chart follows.
- **`assets/js/tabs.js`** is the Exercise 3 story-tab script, adapted: tabs are
  matched by `data-tab`, and a link such as `exercise-4-site/index.html#ex-4-6`
  opens that exercise.

## What changed in the D3 code, and what did not

Every scale, data join, axis, generator, transition, interaction, CSV path and
row conversion is the original code. The lines that differ are marked `HUB:` in
each file.

| Hub file | Original | Changes |
|---|---|---|
| `exercise-4-site/js/ex4-3.js` … `ex4-7.js` | `Exercise 4/Exercise 4.x/js/main.js` (4.3: `main.js`) | Wrapped in a function so five exercises can share a page; own container (`#chart-4-x`); `"blue"` → `THEME.teal`; black debug border → dashed `.chart-canvas` outline; 4.7 labels get classes for the theme fonts |
| `exercise-5-site/js/bar-chart.js` | `Exercise 5/js/bar-chart.js` | `"green"` → `THEME.teal` |
| `exercise-5-site/js/line-chart.js` | `Exercise 5/js/line-chart.js` | Colour constants from the theme; title and subtitle classes; 2px card-coloured ring on each point |
| `exercise-5-site/js/donut-chart.js` | `Exercise 5/js/donut-chart.js` | Same `scaleOrdinal`, range is a light-to-dark teal ramp (screen size is ordered) instead of `schemeSet2`; label colour picked by contrast |
| `exercise-5-site/js/load-data.js` | `Exercise 5/js/load-data.js` | None (copied) |
| `exercise-6-site/js/shared-constants.js` | `Exercise 6/js/shared-constants.js` | `barColor` and `bodyBackgroundColor` from the theme |
| `exercise-6-site/js/scatterplot.js` | `Exercise 6/js/scatterplot.js` | Colour range from the theme instead of `schemeCategory10` |
| `exercise-6-site/js/interactions.js` | `Exercise 6/js/interactions.js` | Tooltip box in ink with amber text |
| `exercise-6-site/js/histogram.js`, `load-data.js` | `Exercise 6/js/` | None (copied) |

Unchanged copies: `PowerIcon.png`, `site.js`, `faq.js` (Exercise 0.2) and every
CSV file. `favicon.png` is a 64 px copy of `PowerIcon.png`.

### Colours

| Use | Colours | Why |
|---|---|---|
| Single-series marks (Exercises 4 and 5) | `--teal` `#0e6e6b` | The theme's own teal |
| Exercise 6 histogram | `--ink-soft` `#3d5163` | The original used a neutral grey so the bars don't suggest one screen type |
| Exercise 6 scatterplot (LED, LCD, OLED) | `#009894` · `#c07c00` · `#5b4fa8` | Checked for colour-blind separation (protanopia, deuteranopia) and at least 3:1 contrast on white |
| Exercise 5 donut (small → large) | `#62b6b0` → `#0e7f7a` → `#0b5f5c` | One hue, light to dark, because the sizes have an order |

## Run locally

`d3.csv()` loads files over HTTP, so open the pages through a local web server
(the same is true of the original exercises). From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/builds/>. D3 and the Google Fonts load from
their CDNs, exactly as in the originals, so an internet connection is needed.

## Host

With GitHub Pages turned on for the `main` branch (root folder), the landing
page is at
`https://lynnmyatbhonehtut.github.io/COS30045-Data-Visualization/builds/`
and each hub at `…/builds/exercise-4-site/` and so on.

## Commands: how this folder was added safely

Run from the repository root. `mkdir -p` never touches existing folders and
`cp -n` never overwrites an existing file, so these commands can only add.

```bash
cd ~/Documents/GitHub/COS30045-Data-Visualization

# 1. Start clean, and fingerprint every existing file
git status --short          # should print nothing
find . -path ./.git -prune -o -path ./builds -prune -o -type f -print0 \
  | sort -z | xargs -0 shasum -a 256 > /tmp/before.sha256

# 2. Create the new folders
for s in exercise-4-site exercise-5-site exercise-6-site; do
  mkdir -p "builds/$s/assets/css" "builds/$s/assets/js" "builds/$s/assets/img" \
           "builds/$s/data" "builds/$s/js"
done
mkdir -p builds/assets/css builds/assets/js builds/assets/img

# 3. Copy the pieces that are reused unchanged (-n: never overwrite)
for s in exercise-4-site exercise-5-site exercise-6-site; do
  cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" "builds/$s/assets/img/"
  cp -n "Exercise 0.2/energy-webpage-v1/site.js"       "builds/$s/assets/js/"
  cp -n "Exercise 0.2/energy-webpage-v1/faq.js"        "builds/$s/assets/js/"
done
cp -n "Exercise 0.2/energy-webpage-v1/PowerIcon.png" builds/assets/img/
cp -n "Exercise 0.2/energy-webpage-v1/site.js"       builds/assets/js/
cp -n "Exercise 4/Exercise 4.7/data/tvBrandCount.csv" builds/exercise-4-site/data/
cp -n "Exercise 5/data/"*.csv                          builds/exercise-5-site/data/
cp -n "Exercise 5/js/load-data.js"                     builds/exercise-5-site/js/
cp -n "Exercise 6/data/Ex6_TVdata_withStar.csv"        builds/exercise-6-site/data/
cp -n "Exercise 6/js/load-data.js" "Exercise 6/js/histogram.js" builds/exercise-6-site/js/

# 4. Everything else (pages, styles.css, theme.js, tabs.js, the ported chart
#    files) is a new file written straight into builds/.

# 5. Prove that nothing outside builds/ changed
find . -path ./.git -prune -o -path ./builds -prune -o -type f -print0 \
  | sort -z | xargs -0 shasum -a 256 | diff /tmp/before.sha256 - \
  && echo "originals untouched"
git status --short          # only line: ?? builds/
git diff --stat             # prints nothing: no tracked file was modified
```

## Commit and push

```bash
git switch -c hub-sites     # optional: keep the hubs on their own branch
git add builds
git commit -m "Add themed hub sites for Exercises 4-6 under builds/"
git push -u origin hub-sites    # or, to publish straight to main: git push origin main
```

`git push` needs this Mac to be signed in to GitHub (GitHub Desktop, or
`gh auth login`). Without git, the folder can also be uploaded on github.com
with **Add file → Upload files**, dragging in the whole `builds` folder.

## Notes

- The original `energy-webpage-v1` pages load their scripts from `assets/js/`
  and the favicon from `assets/img/`, but those files sit in the folder root, so
  the FAQ, calculator and footer-year scripts don't run there. The hubs use the
  `assets/` layout that folder's README describes, so the same scripts do run.
  The original was left as it is.
- In Exercise 4.7 the label "spark electronics" is a few units wider than the
  100-unit label space (in the original too). The hub lets that SVG draw past
  its edge so the first letter isn't cut off; the layout code is unchanged.
- Generative AI: the hub pages, the hub layer of the stylesheet and the helper
  scripts were assembled with the help of Claude (Anthropic). The D3 chart code
  is the author's own exercise work. Review the acknowledgement in the page
  footers against the unit's AI-use rules before submitting.
