// Real API: exchangerate.host (fallback: statik)
const Currency = (() => {
  let rates = { UZS: 1, USD: 12850, EUR: 13900, RUB: 140 };
  let current = localStorage.getItem('currency') || 'UZS';

  async function fetchRates() {
    try {
      const res = await fetch('https://api.exchangerate.host/latest?base=UZS&symbols=USD,EUR,RUB');
      const data = await res.json();
      if (data?.rates) {
        // API returns UZS -> X, we need X -> UZS
        if (data.rates.USD) rates.USD = 1 / data.rates.USD;
        if (data.rates.EUR) rates.EUR = 1 / data.rates.EUR;
        if (data.rates.RUB) rates.RUB = 1 / data.rates.RUB;
        updateWidget();
      }
    } catch {
      // Use fallback static rates
    }
  }

  function updateWidget() {
    const el = document.getElementById('usdRate');
    if (el) el.textContent = new Intl.NumberFormat('uz-UZ').format(Math.round(rates.USD));
  }

  function getRates() { return rates; }
  function getCurrent() { return current; }

  function setCurrent(cur) {
    current = cur;
    localStorage.setItem('currency', cur);
    document.querySelectorAll('#currencyToggle button').forEach(b =>
      b.classList.toggle('active', b.dataset.cur === cur));
    Budget.update();
  }

  function init() {
    document.querySelectorAll('#currencyToggle button').forEach(b => {
      b.addEventListener('click', () => setCurrent(b.dataset.cur));
    });
    setCurrent(current);
    updateWidget();
    fetchRates();
    setInterval(fetchRates, 1000 * 60 * 60); // hourly
  }

  return { init, getRates, getCurrent, setCurrent };
})();