# Appliance Energy Consumption AU

A data story about what the energy label on a television actually tells you — and what it doesn't.

Built for **COS30045 Data Visualisation**, Swinburne University of Technology.
Author: Lynn Myat Bhone Htut

**Live site:** `<add your GitHub Pages URL>`

---

## Data Story

### The question

Australian televisions carry an energy label showing a star rating and an annual
energy consumption figure in kWh. The star rating is the most visually prominent
element, and most shoppers read it as an answer to "how much power will this use?"

It isn't. A television is rated against other televisions *of the same screen
size*, so the rating answers a narrower question: is this an efficient set for its
size? A four-star 85-inch television and a four-star 32-inch television describe
two completely different electricity bills.

This story sets out to show that gap, and to point readers at the number on the
label that actually predicts what they will pay.

### Who is the audience?

The primary audience is **an Australian consumer who is about to buy a
television** — someone who has already decided roughly what size they want and is
choosing between models in a shop or on a retailer's website.

Characteristics that shaped the design:

- **Not technical.** They are not reading a research paper. They will not work
  through a regression table. Every figure on the site is expressed in dollars per
  year or dollars over ten years, because that is the unit they already think in.
- **Time-poor and skimming.** They are making one decision, quickly. The site is a
  single scrolling page with a headline figure at the top, so somebody who reads
  only the first screen still leaves with the main point.
- **Already committed to a size.** This is the assumption that drove the whole
  structure. Telling someone who wants a 65-inch television to buy a 50-inch is
  advice they will not take. So after establishing that size drives energy use,
  the story deliberately pivots to the choice that remains *within* a size class.
- **Price-sensitive at the register, not over time.** They will compare purchase
  prices carefully and ignore running costs entirely, because running costs are
  invisible at the point of sale.

A secondary audience is anyone interested in how energy labelling schemes
communicate — but the site is written for the shopper.

### What do they want to know?

In priority order:

1. **What will this television cost me to run?** The question they are not
   currently asking, and the one the story exists to make askable.
2. **Am I being misled by the star rating?** Whether the number they already trust
   is doing the job they think it is.
3. **How much does the choice actually matter?** A difference of a few dollars a
   year is not worth acting on. A difference of $2,618 over ten years is.
4. **What do I do differently next time?** A concrete action they can take while
   standing in front of a shelf.

### Design guidelines drafted from that audience

- Lead with a dollar figure, not a methodology.
- One idea per panel, each with a single chart or table.
- Never show kWh without immediately converting it to dollars.
- Use real, named, currently-available models rather than hypothetical examples.
- Close with three actions short enough to remember on the way to the shop.
- Contextualise every visualisation in prose — no chart is left to speak for itself.

### The narrative arc

| Panel | Role | Content |
|---|---|---|
| Hero | The issue | Two identical televisions, $2,618 apart in running cost |
| 1 | Demonstrate the issue | Median running cost rises with screen size: $38 (32") → $148 (65") → $255 (85") |
| 2 | The twist | Within a single size, 701 available 65" models range from $99 to $363 a year |
| 3 | The explanation | Star rating correlates with energy use at only −0.51, against 0.86 for screen size |
| 4 | Make it concrete | Two real Samsung 65" sets: 6 stars / $101 a year vs 1 star / $363 a year |
| 5 | The payoff | Cumulative cost over ten years, diverging to $2,618 |
| — | Recommendation | Read the kWh, compare within your size, multiply by ten |

Storyboards for the narrative and for the user's journey through the site are in
`docs/storyboards/`.

---

## About the data

### Data source

**Energy Rating Product Registration Database**, published by the Australian
Government Department of Climate Change, Energy, the Environment and Water
(energyrating.gov.au). Accessed **15 February 2026**.

The database is the public register of every appliance approved for sale in
Australia under the Greenhouse and Energy Minimum Standards (GEMS) Act 2012. The
television subset used here contains approximately 4,700 registered models, with
fields covering brand, model number, screen size in centimetres, screen
technology, labelled energy consumption in kWh/year, star rating, availability
status, and markets sold in.

The data is published under an open licence for public reuse.

### Data processing

All preparation was done in **KNIME Analytics Platform**. The workflow is
available in this repository at `docs/knime/`.

Steps applied:

1. **Import** — CSV Reader, ~4,700 rows.
2. **Column filtering** — retained brand, model number, screen size, screen
   technology, labelled energy consumption, star rating and availability status.
3. **Cleaning** — string cleaning and replacement to normalise inconsistent
   screen-technology labels (for example variations of "LCD (LED)").
4. **Unit conversion** — screen size converted from centimetres to inches
   (× 0.393701) and rounded to the nearest whole inch, because Australian buyers
   and retailers discuss televisions in inches.
5. **Categorisation** — a size band column derived from the inch figure:
   small (≤ 43"), medium (44–65"), large (≥ 66").
6. **Cost calculation** — annual running cost derived as
   `labelled energy consumption (kWh/year) × $0.32`, and ten-year cost as the
   annual figure × 10.
7. **Aggregation** — medians by size and by star rating; correlations between
   screen size and energy use, and between star rating and energy use.
8. **Export** — the summary tables behind each chart are in `assets/data/` as CSV.

Where the story quotes a "median" rather than a "mean", that is deliberate: the
distribution of energy consumption is right-skewed by a small number of very large
and very high-consumption models, and the median better represents what a typical
buyer would encounter.

### Privacy

The dataset contains **no personal information**. Every record describes a product
model, not a person, a household, or a purchase. There are no individuals to
identify or re-identify, and no aggregation performed here could expose one.

Manufacturer and brand names are commercial identifiers already published on a
government register and printed on retail packaging, so naming specific models
raises no privacy concern.

No analytics, cookies, or tracking of any kind are used on the website. No visitor
data is collected.

### Accuracy and limitations

Several limitations are worth stating plainly, because the story quotes precise
dollar figures that could otherwise be read as more certain than they are.

- **Labelled consumption is a laboratory figure, not real-world usage.** It is
  measured under the standardised GEMS test procedure, with a defined content
  sequence and default picture settings. Actual consumption varies with viewing
  hours, brightness settings, ambient light, and whether features such as HDR are
  in use. The figures are valid for *comparing* models, which is what this story
  does, but should not be read as a prediction of any individual household's bill.
- **The electricity tariff is a single assumed rate.** All costs use 32 c/kWh.
  Real tariffs vary by state, retailer, plan, and time of use, and change over
  time. A reader in a different market should rescale the figures proportionally.
- **Ten-year costs assume no change.** They hold the tariff constant and assume the
  set is used at the labelled rate for a decade. Both are simplifications.
- **The register lists approved models, not sales.** A model being registered does
  not mean it is stocked, popular, or still in production. Counts such as "701
  different 65-inch televisions" describe the registered field, not what a shopper
  will actually find in a store.
- **Duplicate registrations exist.** The same physical panel is sometimes
  registered multiple times under different model suffixes for different retailers
  or markets, which slightly inflates model counts.
- **Correlation is not causation, and the correlations are summary measures.** The
  −0.51 between star rating and energy use reflects that stars are normalised by
  screen size; it is evidence for the story's argument, not a causal claim.
- **Screen size anomalies.** A small number of records have screen sizes that sit
  in unusual gaps between standard panel sizes. These were checked against model
  numbers, which usually encode size in inches, and retained where consistent.

### Ethics

- **Selecting two models is a rhetorical choice.** The Samsung comparison in Panel
  4 is not a randomly drawn pair. The QA65QN900BW is an 8K flagship, and a
  meaningful share of its consumption is the cost of that technology rather than
  poor engineering. The site says so explicitly rather than leaving the reader with
  the impression that the two sets are equivalent products. Presenting the extremes
  without that caveat would have been misleading.
- **Naming brands.** Real models are named because abstract examples are easy to
  dismiss, and the data is a public register. No claim is made that Samsung is a
  worse manufacturer than any other; both examples are Samsung specifically to hold
  brand constant and isolate the variable being discussed.
- **The framing is persuasive, and openly so.** This is an advocacy piece with a
  recommendation, not a neutral report. Charts use honest axes, all start at zero
  where a bar chart demands it, and no scale is truncated to exaggerate a
  difference. The argument is made through selection and emphasis, which is
  disclosed here.
- **Not financial advice.** The site does not tell anyone which television to buy,
  and running cost is only one factor among picture quality, features, warranty and
  purchase price.
- **The star rating scheme is not attacked.** The story's position is that the
  rating is widely *misread*, not that it is badly designed. Within a size class it
  does exactly what it was built to do, and the site says so.

---

## AI Declaration

Generative AI tools were used in producing this project. Their use is set out below.

| Tool | How it was used |
|---|---|
| Claude (Anthropic) | Guidance on KNIME node selection and configuration during data preparation; scaffolding the initial HTML and CSS for the website; drafting and structuring sections of this README; reviewing the narrative arc of the data story |
| `<add others if used>` | `<describe>` |

**What the AI tools did not do:**

- They did not perform the analysis. All figures quoted on the site and in this
  README were produced by my own KNIME workflow from the source dataset.
- They did not generate or alter any data.
- They did not make the editorial decisions — the choice of audience, the narrative
  structure, which comparison to feature, and what to recommend are mine.

**Verification:** every statistic in the story was read directly from my executed
KNIME nodes rather than accepted from AI output. The cost calculations were checked
by hand (for example, 1,135 kWh × $0.32 = $363.20 per year, × 10 = $3,632).

---

## Repository structure

```
/
├── index.html              Home
├── televisions.html        The data story
├── about.html              About us
├── assets/
│   ├── css/styles.css
│   ├── js/site.js
│   ├── img/                Charts and site images
│   └── data/               Summary CSVs behind each chart
├── docs/
│   ├── storyboards/        Story arc and user journey storyboards
│   └── knime/              KNIME workflow (.knwf)
└── README.md
```

## Running locally

No build step. Clone the repository and open `index.html` in a browser, or serve
the folder with any static server.
