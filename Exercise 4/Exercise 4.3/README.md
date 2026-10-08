# Exercise 4.3 – D3 setup

D3.js is loaded into the page and creates a responsive SVG canvas, then draws one
hard-coded test bar to check that everything works.

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.3/> (Swinburne login required)
- **Part of:** [Exercise 4 – Introduction to D3.js](../) · next: [Exercise 4.4](../Exercise%204.4/)

## Files

| File | What it does |
|---|---|
| `index.html` | The "Energy Consumption" page with a "TV Energy Consumption Bar Chart" section; loads D3 v7 from the CDN, then `main.js` |
| `main.js` | Selects `.responsive-svg-container`, appends an SVG with `viewBox="0 0 1200 1600"` and a 1px black border, then draws a blue 414 × 16 test rectangle at (10, 10) |
| `style.css` | Page styles; `.responsive-svg-container` centres the canvas and lets it resize with the window |

## Running locally

Open `index.html` in a browser (an internet connection is needed for D3).
