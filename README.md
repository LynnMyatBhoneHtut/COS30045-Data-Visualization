# COS30045 – Data Visualisation

Exercises and websites for **COS30045 Data Visualisation** at Swinburne University
of Technology, built with HTML, CSS, JavaScript and [D3.js](https://d3js.org/).

| | |
|---|---|
| **Student** | Lynn Myat Bhone Htut |
| **Student ID** | 105973835 |
| **GitHub repository** | <https://github.com/LynnMyatBhoneHtut/COS30045-Data-Visualization> |
| **Live site (Mercury)** | <https://mercury.swin.edu.au/cos30045/s105973835/> (Swinburne login required) |
| **Forked from** | [rishmaf/COS30045-Data-Visualization](https://github.com/rishmaf/COS30045-Data-Visualization), the unit's starter repository |

---

## Contents

### Exercises

| Exercise | What it is | Folder | Live on Mercury |
|---|---|---|---|
| 0.2 | Appliance Energy Consumption website: three pages, an energy calculator and an FAQ | [Exercise 0.2/energy-webpage-v1](Exercise%200.2/energy-webpage-v1/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%200.2/energy-webpage-v1/) |
| 3 | The same website with two data stories about TV running costs on its Televisions page | [Exercise 3](Exercise%203/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%203/) |
| 4 | Introduction to D3.js: an SVG house (4.1), then a bar chart built step by step (4.3–4.7) | [Exercise 4](Exercise%204/) | [4.1](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.1/) · [4.3](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.3/) · [4.4](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.4/) · [4.5](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.5/) · [4.6](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.6/) · [4.7](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.7/) |
| 5 | A bar chart, a line chart and a donut chart | [Exercise 5](Exercise%205/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%205/) |
| 6 | An interactive histogram with filters, and a scatterplot with tooltips | [Exercise 6](Exercise%206/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Exercise%206/) |

### Exercise websites

Exercises 4, 5 and 6 combined into the Appliance Energy Consumption website from
Exercise 0.2. Every page has the menu **Home · Televisions · About Us · Exercise N**,
and each site opens on its exercise charts.

| Website | What it shows | Folder | Live on Mercury |
|---|---|---|---|
| Exercise 4 website | Exercises 4.3–4.7 on one page | [exercise-4_website](exercise-4_website/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-4_website/) |
| Exercise 5 website | The bar, line and donut charts | [exercise-5_website](exercise-5_website/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-5_website/) |
| Exercise 6 website | The histogram with filters and the scatterplot with tooltips | [exercise-6_website](exercise-6_website/) | [Open](https://mercury.swin.edu.au/cos30045/s105973835/Submission/exercise-6_website/) |

The Mercury `Submission` folder also holds a copy of
[Exercise 4.1](https://mercury.swin.edu.au/cos30045/s105973835/Submission/Exercise%204.1/).

---

## Repository structure

```
COS30045-Data-Visualization/
├── Exercise 0.2/
│   └── energy-webpage-v1/   Appliance Energy Consumption website (HTML, CSS, JavaScript)
├── Exercise 3/              The website with two data stories on its Televisions page
├── Exercise 4/
│   ├── Exercise 4.1/        Draw SVGs: the SVG house, before and after
│   ├── Exercise 4.3/        D3 setup
│   ├── Exercise 4.4/        Load data from CSV
│   ├── Exercise 4.5/        D3 binding and drawing with data
│   ├── Exercise 4.6/        Scaling charts
│   └── Exercise 4.7/        Adding labels
├── Exercise 5/              Bar, line and donut charts
├── Exercise 6/              Interactive histogram and scatterplot
├── exercise-4_website/      Exercise 4 in the website's design
├── exercise-5_website/      Exercise 5 in the website's design
├── exercise-6_website/      Exercise 6 in the website's design
└── README.md
```

Every folder has its own README that lists its files.

## Running the pages locally

Pages that load CSV files with `d3.csv()` need a web server; they don't work when
opened straight from a folder. That covers Exercises 4.4–4.7, 5 and 6 and the
three websites.

- **VS Code Live Server:** open the repository folder, click **Go Live**, then open
  a page, for example <http://127.0.0.1:5500/exercise-5_website/>.
- **Terminal:** from the repository root run `python3 -m http.server 8000`, then
  open a page, for example <http://localhost:8000/Exercise%205/>.

## Tools and libraries

- HTML5, CSS3 and JavaScript
- [D3.js v7](https://d3js.org/), loaded from `https://d3js.org/d3.v7.min.js`
- Google Fonts: Archivo, IBM Plex Sans and IBM Plex Mono (website pages) and Roboto (Exercise 6)
- KNIME Analytics Platform (data preparation for Exercise 3)
- Visual Studio Code with Live Server, GitHub, and Swinburne's Mercury web server

## Data

| File | Used in | What it holds |
|---|---|---|
| `tvBrandCount.csv` | Exercises 4.4–4.7, Exercise 4 website | Number of TV models per brand: 25 brands, 4,240 models |
| `Ex5_TV_energy_55inch.csv` | Exercise 5, Exercise 5 website | Average labelled energy use of 55-inch TVs by screen technology (LCD, LED, OLED) |
| `Ex5_TV_screensize_count.csv` | Exercise 5, Exercise 5 website | Number of TV models that are small, medium and large |
| `ARE_Spot_Prices.csv` | Exercise 5, Exercise 5 website | Spot power prices ($ per megawatt hour) by region, 1998–2024, with the average used in the chart |
| `Ex6_TVdata_withStar.csv` | Exercise 6, Exercise 6 website | 4,233 TV models: brand, model, screen size and technology, star rating and labelled energy use |

The TV data in Exercises 3 and 6 comes from the Australian Government's
[Energy Rating](https://www.energyrating.gov.au/) register of televisions
(Exercise 6: downloaded January 2026; Exercise 3: accessed 15 February 2026).

## Generative AI acknowledgement

Each exercise declares its own use of generative AI; in short:

- **Exercise 0.2:** ChatGPT, for the SVG, content and logo, and the calculator logic.
- **Exercise 3:** Claude (Anthropic), for guidance on KNIME, the first HTML and CSS,
  parts of the README and a review of the story's structure. The analysis and every
  figure come from the author's own KNIME workflow.
- **Exercise websites:** assembled and restyled with Claude. The D3 chart code is the
  author's own exercise work.
- **READMEs:** this README and the folder READMEs were updated with help from Claude.

---

## About the unit

### Introduction

**COS30045: Data Visualisation** introduces the fundamental principles of
**information visualisation**, focusing on how data can be effectively communicated
through visual representations. Students learn design practices that support clear,
accurate and meaningful visual communication.

Throughout the unit, students explore different types of **information graphics and
visual representations**, and apply design principles grounded in **human perception
and cognition**. The unit emphasises both **critical evaluation of existing
visualisations** and the **creation of new visualisations** using real-world datasets.

Students develop practical skills in designing and building **web-based interactive
visualisations**, using modern web technologies and data visualisation libraries.

### Unit learning outcomes

By successfully completing this unit, students will be able to:

1. **Critically evaluate data visualisations** and propose improvements based on principles of human perception, cognition, and data visualisation design.
2. **Apply a structured design process** to create effective and meaningful visualisations.
3. **Conceptualise and iterate visualisation designs** using sketching and low-fidelity prototyping techniques.
4. **Create web-based interactive data visualisations** using real-world datasets.

### Graduate attributes

This unit contributes to the following **Swinburne Graduate Attributes**:

- **GA2 – Communication using different media**
- **GA5 – Information literacy**

### Topics covered

- Introduction to **data visualisation**
- Brief **history of data visualisation**
- **Data visualisation design guidelines** and graphical integrity
- **Visual variables** (marks and channels)
- **Visualisation critique**
- **User tasks** in visualisation usage
- **Data types and datasets**
- **Interaction techniques** (manipulating views, filtering)
- Arranging **tables, graphs, and maps**
- **Colour theory**
- **Human perception and cognition**
- **User research**
- Introduction to **Data Driven Documents (D3)**
