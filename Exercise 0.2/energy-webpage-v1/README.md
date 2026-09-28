# Appliance Energy Consumption Website

Exercise 0.2 — COS30045 Data Visualisation, Swinburne University of Technology.

A small three-page website demonstrating HTML structure, external CSS styling
and vanilla JavaScript interactivity. It will be extended with D3.js
visualisations in the Week 3 and Week 4 exercises.

**Author:** *Lynn Myat Bhone Htut*
**Student ID:** *105973835*
**Repository:** **

---

## Folder structure

```
/
  index.html          Home — intro content, energy calculator, FAQ accordion
  televisions.html    Televisions — placeholder model comparison table
  about.html          About Us — project background
  assets/
    css/styles.css    All styling for the site (no inline styles)
    js/site.js        Footer year, shared by every page
    js/faq.js         FAQ accordion behaviour
    js/calculator.js  Appliance energy calculator
    img/PowerIcon.png Site logo, links back to Home
    img/favicon.png   Browser tab icon
  README.md
```

## Features

| Requirement | Where it is implemented |
|---|---|
| Three HTML pages | `index.html`, `televisions.html`, `about.html` |
| Top navigation on all pages | `<header class="site-header">` in each page |
| Logo top-left, links to Home | `.nav__logo` wrapping `PowerIcon.png` |
| Hover effect on nav | `.nav__link:hover` in `styles.css` |
| Active page indicator | `aria-current="page"` styled by `.nav__link[aria-current="page"]` |
| FAQ hidden by default, toggled by JS | `.faq__answer[hidden]` + `assets/js/faq.js` |
| External CSS only | `assets/css/styles.css` |
| Footer with year, name, GenAI note | `<footer class="site-footer">` + `assets/js/site.js` |
| Energy calculator (extension) | `#calculator` section + `assets/js/calculator.js` |

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
- The Televisions page links to `index.html?watts=180#calculator`. The
  calculator reads that query string on load, so it still works correctly on a
  fresh page load or a refresh.

## Running locally

No build step and no dependencies. Either open `index.html` in a browser, or
serve the folder:

```bash
python3 -m http.server 8000
```

Then visit 
## Before you submit

- [ ] Replace `assets/img/PowerIcon.png` with the logo supplied in the unit materials
- [ ] Replace **Your Name Here** in all three page footers and in this README
- [ ] Check the `--amber`, `--ink` and `--teal` values at the top of `styles.css`
      match the actual logo colours
- [ ] Replace the placeholder figures with data from Exercise 1
- [ ] Add your own reflection on the use of Generative AI (see below)

## Generative AI acknowledgement

*Replace this section with your own honest account. Your unit requires you to
declare AI use and to reflect critically on it.*

Suggested structure:

- **Tool used:**ChatGPT 3.0
- **What it was used for:** Generate SVG , content and Logo calculator logic
- **What you changed:** the parts you rewrote, simplified or corrected yourself
- **What you learned:** JavaScript Logic aboutcalculator 
