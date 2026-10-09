const Budget = (() => {
  const FIELDS = ['transport', 'hotel', 'food', 'tickets', 'guide', 'souvenirs', 'other'];
  const STORAGE_KEY = 'aituz-budget';

  function readValues() {
    const obj = {};
    FIELDS.forEach(f => {
      const el = document.getElementById(f);
      obj[f] = el ? Number(el.value) || 0 : 0;
    });
    return obj;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readValues()));
  }

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      FIELDS.forEach(f => {
        const el = document.getElementById(f);
        if (el && data[f] != null) el.value = data[f];
      });
    } catch {}
  }

  function format(n, cur = 'UZS') {
    const rates = Currency.getRates();
    const symbols = { UZS: "so'm", USD: '$', EUR: '€', RUB: '₽' };
    if (cur === 'UZS') return new Intl.NumberFormat('uz-UZ').format(Math.round(n)) + " so'm";
    const val = (n / rates[cur]).toFixed(2);
    return `${symbols[cur]}${val}`;
  }

  function update() {
    const values = readValues();
    const total = Object.values(values).reduce((a, b) => a + b, 0);
    const el = document.getElementById('budgetTotal');
    if (!el) return;
    const cur = Currency.getCurrent();
    el.innerHTML = `<span>${i18n.t('totalLabel')}</span> <b>${format(total, cur)}</b>`;
  }

  function reset() {
    const defaults = { transport: 100000, hotel: 300000, food: 150000, tickets: 50000, guide: 0, souvenirs: 0, other: 0 };
    FIELDS.forEach(f => {
      const el = document.getElementById(f);
      if (el) el.value = defaults[f] ?? 0;
    });
    save(); update();
  }

  function exportCSV() {
    const values = readValues();
    let csv = 'Category,Amount (UZS)\n';
    FIELDS.forEach(f => { csv += `${f},${values[f]}\n`; });
    csv += `Total,${Object.values(values).reduce((a, b) => a + b, 0)}\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'travel-budget.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  function init() {
    load();
    FIELDS.forEach(f => {
      document.getElementById(f)?.addEventListener('input', () => { save(); update(); });
    });
    document.getElementById('resetBudget')?.addEventListener('click', reset);
    document.getElementById('exportBudget')?.addEventListener('click', exportCSV);
    update();
  }

  return { init, update, reset, exportCSV, readValues };
})();