/* ============================================================
   calculator.js — Appliance Energy Calculator
   ------------------------------------------------------------
   Vanilla JavaScript only. No libraries.

   What it does:
     - reads three user inputs (watts, hours per day, c/kWh)
     - validates them and shows friendly errors next to the field
     - calculates daily / monthly / yearly kWh and yearly cost
     - writes the results into the existing results panel, so the
       panel is UPDATED rather than duplicated
     - recalculates live as the user types

   Formula used throughout:
     kWh per day = (watts x hours per day) / 1000
   A kilowatt-hour is 1000 watts drawn for one hour, so dividing
   watt-hours by 1000 converts to kWh. Months are treated as
   365 / 12 = 30.42 days so the monthly and yearly figures agree.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- 1. Grab the elements we need from the DOM ------------
  var form       = document.getElementById('calc-form');
  if (!form) return; // this page has no calculator

  var applianceSelect = document.getElementById('appliance');
  var wattsInput      = document.getElementById('watts');
  var hoursInput      = document.getElementById('hours');
  var priceInput      = document.getElementById('price');
  var resetButton     = document.getElementById('calc-reset');

  var resultsPanel = document.getElementById('results');
  var emptyMessage = document.getElementById('results-empty');
  var resultsList  = document.getElementById('results-list');

  var DAYS_PER_MONTH = 365 / 12;   // 30.4167
  var DAYS_PER_YEAR  = 365;

  // ---- 2. Appliance presets --------------------------------
  // Placeholder wattages. Replace with real values from the
  // Exercise 1 data set when you have it.
  var PRESETS = {
    'tv-led-55':      120,
    'tv-oled-65':     180,
    'fridge':          150,
    'washing-machine': 500,
    'aircon':         2000
  };

  // ---- 3. Event handling -----------------------------------

  // Choosing an appliance fills in its wattage for the user.
  applianceSelect.addEventListener('change', function () {
    var preset = PRESETS[applianceSelect.value];
    if (preset) {
      wattsInput.value = preset;
    }
    calculate();
  });

  // Recalculate whenever any number changes.
  [wattsInput, hoursInput, priceInput].forEach(function (input) {
    input.addEventListener('input', calculate);
  });

  // The form has a submit button, so catch submit and stop the
  // page from reloading.
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    calculate();
  });

  resetButton.addEventListener('click', function () {
    form.reset();
    clearErrors();
    showEmptyState();
  });

  // ---- 4. Validation ---------------------------------------
  // Returns a number if valid, or null if not. Also writes the
  // error message under the field it belongs to.
  function readNumber(input, min, max, label) {
    var raw = input.value.trim();
    var errorBox = document.getElementById(input.id + '-error');

    if (raw === '') {
      setError(input, errorBox, 'Enter ' + label + '.');
      return null;
    }

    var value = Number(raw);

    if (Number.isNaN(value)) {
      setError(input, errorBox, label + ' must be a number.');
      return null;
    }
    if (value < min) {
      setError(input, errorBox, label + ' must be at least ' + min + '.');
      return null;
    }
    if (value > max) {
      setError(input, errorBox, label + ' cannot be more than ' + max + '.');
      return null;
    }

    clearError(input, errorBox);
    return value;
  }

  function setError(input, errorBox, message) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    if (errorBox) errorBox.textContent = message;
  }

  function clearError(input, errorBox) {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    if (errorBox) errorBox.textContent = '';
  }

  function clearErrors() {
    [wattsInput, hoursInput, priceInput].forEach(function (input) {
      clearError(input, document.getElementById(input.id + '-error'));
    });
  }

  // ---- 5. The calculation ----------------------------------
  function calculate() {
    var watts = readNumber(wattsInput, 1, 10000, 'a power rating in watts');
    var hours = readNumber(hoursInput, 0, 24, 'hours of use per day');
    var cents = readNumber(priceInput, 1, 200, 'a price in cents per kWh');

    // If any field failed validation, keep the panel in its
    // empty state rather than showing half-finished numbers.
    if (watts === null || hours === null || cents === null) {
      showEmptyState();
      return;
    }

    var dailyKwh   = (watts * hours) / 1000;
    var monthlyKwh = dailyKwh * DAYS_PER_MONTH;
    var yearlyKwh  = dailyKwh * DAYS_PER_YEAR;

    var pricePerKwh = cents / 100;          // cents -> dollars
    var monthlyCost = monthlyKwh * pricePerKwh;
    var yearlyCost  = yearlyKwh * pricePerKwh;

    render({
      dailyKwh: dailyKwh,
      monthlyKwh: monthlyKwh,
      yearlyKwh: yearlyKwh,
      monthlyCost: monthlyCost,
      yearlyCost: yearlyCost
    });
  }

  // ---- 6. Updating the page --------------------------------
  // Writes into elements that already exist, so results are
  // replaced each time instead of being appended.
  function render(r) {
    emptyMessage.hidden = true;
    resultsList.hidden = false;

    setText('out-daily',   r.dailyKwh.toFixed(2) + ' kWh');
    setText('out-monthly', r.monthlyKwh.toFixed(1) + ' kWh');
    setText('out-yearly',  r.yearlyKwh.toFixed(0) + ' kWh');
    setText('out-cost-month', formatMoney(r.monthlyCost));
    setText('out-cost-year',  formatMoney(r.yearlyCost));
  }

  function showEmptyState() {
    emptyMessage.hidden = false;
    resultsList.hidden = true;
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function formatMoney(amount) {
    return '$' + amount.toFixed(2);
  }

  // ---- 7. Optional preset from the Televisions page --------
  // televisions.html links here as index.html?watts=180#calculator
  // Reading the query string means the calculator still works
  // correctly on a normal page load or refresh.
  var params = new URLSearchParams(window.location.search);
  if (params.has('watts')) {
    wattsInput.value = params.get('watts');
  }

  // Run once on load so the panel matches the starting values.
  calculate();
});
