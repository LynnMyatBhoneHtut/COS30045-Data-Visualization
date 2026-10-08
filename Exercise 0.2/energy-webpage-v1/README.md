# Appliance Energy Consumption Website

Exercise 0.2 — COS30045 Data Visualisation, Swinburne University of Technology.

A small three-page website demonstrating HTML structure, external CSS styling
and vanilla JavaScript interactivity. Its design is the base for the later
exercises: Exercise 3 and the Exercise 4, 5 and 6 websites reuse it.

- **Author:** Lynn Myat Bhone Htut
- **Student ID:** 105973835
- **Repository:** [Exercise 0.2/energy-webpage-v1 on GitHub](https://github.com/LynnMyatBhoneHtut/COS30045-Data-Visualization/tree/main/Exercise%200.2/energy-webpage-v1)
- **Live site (Mercury):** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%200.2/energy-webpage-v1/> (Swinburne login required)

---

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Introduction, "Three things worth knowing" cards, the appliance energy calculator and an FAQ |
| Televisions | `televisions.html` | A model comparison table (screen, panel, power, yearly kWh and cost) with a **Calculate** button for each model, and notes on reading the numbers |
| About Us | `about.html` | Why the site exists, its scope, who built it, where the data comes from, what comes next and contact |

## Folder structure

```
energy-webpage-v1/
├── index.html        Home: intro content, energy calculator, FAQ accordion
├── televisions.html  Televisions: model comparison table
├── about.html        About Us: project background
├── styles.css        All styling for the site (no inline styles)
├── site.js           Footer year, used by every page
├── faq.js            FAQ accordion behaviour
├── calculator.js     Appliance energy calculator
├── PowerIcon.png     Site logo, links back to Home
└── README.md
```

## Features

| Requirement | Where it is implemented |
|---|---|
| Three HTML pages | `index.html`, `televisions.html`, `about.html` |
| Top navigation on all pages | `<header class="site-header">` in each page |
| Logo top-left, links to Home | `.nav__logo` wrapping `PowerIcon.png` |
| Hover effect on nav | `.nav__link:hover` in `styles.css` |
| Active page indicator | `aria-current="page"` styled by `.nav__link[aria-current="page"]` |
| FAQ hidden by default, toggled by JS | `.faq__answer[hidden]` + `faq.js` |
| External CSS only | `styles.css` |
| Footer with the current year and name | `<footer class="site-footer">` + `site.js` |
| Energy calculator (extension) | `#calculator` section + `calculator.js` |

## How the calculator works

The core formula is:

```
kWh per day = (watts × hours per day) ÷ 1000
```

A kilowatt-hour is 1000 watts drawn for one hour, so dividing watt-hours by
1000 converts to kWh. Monthly figures use 365 ÷ 12 = 30.42 days so that the
monthly and yearly results are consistent with each other.

- Every input is validated in JavaScript before any calculation runs. Invalid
  values add an `is-invalid` class and write a message into the `.field__error`
  span beside the field.
- Results are written into elements that already exist in the HTML using
  `textContent`, so each calculation replaces the previous one instead of
  appending a new set of results.
- The results panel is `aria-live="polite"` so screen readers announce updates.
- Each **Calculate** button on the Televisions page links to the calculator with
  that model's power rating, for example `index.html?watts=180#calculator`. The
  calculator reads that query string on load, so it still works correctly on a
  fresh page load or refresh.

## Running locally

No build step and no dependencies. Either open `index.html` in a browser, or
serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>. VS Code's Live Server works too.

## Generative AI acknowledgement

- **Tool used:** ChatGPT 3.0
- **What it was used for:** generating the SVG, content and logo, and the calculator logic
- **What I learned:** JavaScript logic for the calculator
