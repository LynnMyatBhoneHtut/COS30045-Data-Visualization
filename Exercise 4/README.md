# Exercise 4 – Introduction to D3.js

Exercise 4 introduces **D3.js**, a JavaScript library for building data
visualisations on the web. Exercise 4.1 draws with SVG by hand. Exercises 4.3 to
4.7 then build one D3 bar chart of TV models by brand, one step at a time; each
step is a separate folder with its own page.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/> (Swinburne login required)
- **All steps on one page:** [exercise-4_website](../exercise-4_website/), live at <https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-4_website/>

## Exercises

| Exercise | Folder | What it shows | Live |
|---|---|---|---|
| 4.1 – Draw SVGs | [Exercise 4.1](Exercise%204.1/) | An SVG house before and after customisation, with a table of the 11 changes | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.1/) |
| 4.3 – D3 setup | [Exercise 4.3](Exercise%204.3/) | D3 creates a responsive 1200 × 1600 SVG canvas and draws one test bar | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.3/) |
| 4.4 – Load data from CSV | [Exercise 4.4](Exercise%204.4/) | `d3.csv()` loads `tvBrandCount.csv`, converts the counts to numbers, sorts them and writes them to the console; the canvas stays empty | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.4/) |
| 4.5 – D3 binding and drawing with data | [Exercise 4.5](Exercise%204.5/) | The data is bound to rectangles: one bar per brand, sized in raw pixels | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.5/) |
| 4.6 – Scaling charts | [Exercise 4.6](Exercise%204.6/) | A linear scale sizes the bars and a band scale spaces them, on a 500 × 600 canvas | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.6/) |
| 4.7 – Adding labels | [Exercise 4.7](Exercise%204.7/) | The finished bar chart, with each brand's name and number of models | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.7/) |

Each folder has its own README with its files and detail.

## Folder structure

```
Exercise 4/
├── Exercise 4.1/   index.html, house_annotated.png
├── Exercise 4.3/   index.html, main.js, style.css
├── Exercise 4.4/   index.html, js/main.js, css/style.css, data/tvBrandCount.csv
├── Exercise 4.5/   (same layout as 4.4)
├── Exercise 4.6/   (same layout as 4.4)
├── Exercise 4.7/   (same layout as 4.4)
└── README.md
```

## Data

`tvBrandCount.csv` (in the `data/` folder of 4.4 to 4.7) counts how many TV models
each brand sells in Australia: 25 brands and 4,240 models in all. Samsung has the
most (1,096), followed by Kogan (788) and LG (677).

## Running locally

Exercises 4.1 and 4.3 open directly in a browser. Exercises 4.4 to 4.7 load the CSV
with `d3.csv()`, so they need a local web server: use VS Code's Live Server, or run
`python3 -m http.server 8000` from the repository root and open, for example,
<http://localhost:8000/Exercise%204/Exercise%204.7/>. D3 v7 is loaded from
`https://d3js.org/d3.v7.min.js`, so an internet connection is needed.
