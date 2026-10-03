# Exercise 4.1 – Draw SVGs

An SVG drawing of a house, shown before and after customisation. The left panel is
the original house; the right panel is the customised "Sunset Cottage". Changes
include moving components (the sun and the tree), changing fill colours (sky, roof,
door), adding a stroke to the house, and adding new items (sun rays and a bush).

- **Live on Mercury:** <https://mercury.swin.edu.au/cos30045/s105973835/Exercise%204/Exercise%204.1/> (a copy is also in [Submission](https://mercury.swin.edu.au/cos30045/s105973835/Submission/Exercise%204.1/))
- **Part of:** [Exercise 4 – Introduction to D3.js](../)

## Files

| File | What it is |
|---|---|
| `index.html` | The page: both houses as inline SVG (`viewBox="0 0 600 520"`), the annotated image, the table of changes and the page styles |
| `house_annotated.png` | The customised house with coordinate callouts on every changed component, showing its position and size after the change |

## Summary of changes

| Element | Before | After | Type of change |
|---|---|---|---|
| Sky `<rect>` | #87CEEB light blue | #FDB24C sunset orange | Changed fill colour |
| Sun `<circle>` | cx=515, cy=85 · yellow | cx=150, cy=110 · orange | Moved + changed fill colour |
| Sun rays `<line>` | None | 8 rays around the sun | Added new items (strokes) |
| Tree `<line>` + `<ellipse>` | x=110 (left) · #228B22 | x=500 (right) · #1F7A1F | Moved + changed fill colour |
| Bush `<ellipse>` | None | cx=115, cy=445, green | Added new item |
| House body `<rect>` | No stroke | stroke #3E2611, width 4 | Added stroke |
| Roof `<polygon>` | #A0522D sienna | #7A2E1E dark red | Changed fill colour |
| Door `<rect>` | #5C3317 brown | #3E5F82 blue | Changed fill colour |
| Garden path `<path>` | Narrow, #D2B48C | Widened curve, #C8A24B | Reshaped + changed fill colour |
| Windows group `<g>` | frame #5C3317 · translate(_, 285) | frame #1B3A5C · translate(_, 290) | Changed stroke + moved (translate) |
| Label `<text>` | "My House", #111 | "Sunset Cottage", #fff | Changed content + fill colour |

## Running locally

Open `index.html` in a browser. It needs no server and no libraries.
