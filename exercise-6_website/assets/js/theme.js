/* ============================================================
   theme.js — hands the site's colours to the D3 code
   ------------------------------------------------------------
   The colours live once, as custom properties at the top of
   assets/css/styles.css (sections 1 and 10). D3 sets colours as
   SVG attributes, so this file reads those properties when the
   page loads and exposes them as THEME.teal, THEME.ink and so on.
   Change a colour in the stylesheet and every chart follows.

   Load it after d3 and before any chart script.
   ============================================================ */

const THEME = (function () {
  var styles = getComputedStyle(document.documentElement);

  // Read one custom property, falling back to the Exercise 0.2
  // value if the stylesheet has not loaded for some reason.
  function token(name, fallback) {
    var value = styles.getPropertyValue(name).trim();
    return value || fallback;
  }

  // WCAG relative luminance of a #rrggbb colour.
  function luminance(hex) {
    var n = parseInt(hex.replace("#", ""), 16);
    var channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
      c = c / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function contrast(a, b) {
    var la = luminance(a);
    var lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  var theme = {
    // Section 1 of styles.css (the Exercise 0.2 tokens)
    ink:       token("--ink", "#14202b"),
    inkSoft:   token("--ink-soft", "#3d5163"),
    amber:     token("--amber", "#f2a20c"),
    amberDeep: token("--amber-deep", "#c07c00"),
    teal:      token("--teal", "#0e6e6b"),
    red:       token("--red", "#b3321f"),
    paper:     token("--paper", "#eef1f3"),
    card:      token("--card", "#ffffff"),
    rule:      token("--rule", "#c9d2d6"),

    fontDisplay: token("--font-display", "Archivo, sans-serif"),
    fontBody:    token("--font-body", "'IBM Plex Sans', sans-serif"),
    fontData:    token("--font-data", "'IBM Plex Mono', monospace"),

    // Section 10: three categorical slots, always used in this order
    series: [
      token("--series-1", "#009894"),
      token("--series-2", "#c07c00"),
      token("--series-3", "#5b4fa8")
    ],

    // Section 10: one teal ramp, light to dark, for ordered categories
    ramp: [
      token("--ramp-1", "#62b6b0"),
      token("--ramp-2", "#0e7f7a"),
      token("--ramp-3", "#0b5f5c")
    ]
  };

  // Text that sits on a coloured fill (a donut slice, the tooltip)
  // uses whichever of white or ink contrasts more with that fill.
  theme.textOn = function (fill) {
    return contrast(fill, "#ffffff") >= contrast(fill, theme.ink) ? "#ffffff" : theme.ink;
  };

  return theme;
})();
