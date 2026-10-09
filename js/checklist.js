const Checklist = (() => {
  const KEY = 'aituz-checklist';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function getItems() {
    const custom = load();
    return [...CHECKLIST_DEFAULT, ...custom];
  }

  function render() {
    const wrap = document.getElementById('checklist');
    if (!wrap) return;
    const checked = JSON.parse(localStorage.getItem(KEY + '-state') || '{}');
    wrap.innerHTML = getItems().map(item => {
      const label = item[i18n.lang] || item.uz;
      const isChecked = checked[item.id] ? 'checked' : '';
      return `<label>
        <input type="checkbox" data-id="${item.id}" ${isChecked}>
        <span>${label}</span>
      </label>`;
    }).join('');

    wrap.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        const state = JSON.parse(localStorage.getItem(KEY + '-state') || '{}');
        state[cb.dataset.id] = cb.checked;
        localStorage.setItem(KEY + '-state', JSON.stringify(state));
        updateProgress();
      });
    });

    updateProgress();
  }

  function updateProgress() {
    const wrap = document.getElementById('checklist');
    if (!wrap) return;
    const all = wrap.querySelectorAll('input[type=checkbox]');
    const done = wrap.querySelectorAll('input[type=checkbox]:checked');
    const pct = all.length ? (done.length / all.length) * 100 : 0;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = pct + '%';
    const txt = document.getElementById('checkProgress');
    if (txt) txt.textContent = `Tayyor: ${done.length} / ${all.length}`;
  }

  function clearAll() {
    localStorage.removeItem(KEY + '-state');
    render();
  }

  function addItem() {
    const name = prompt('Yangi narsa nomi:');
    if (!name) return;
    const custom = load();
    custom.push({ id: 'custom-' + Date.now(), uz: name, ru: name, en: name });
    save(custom);
    render();
  }

  function init() {
    render();
    document.getElementById('clearChecks')?.addEventListener('click', clearAll);
    document.getElementById('addCheckItem')?.addEventListener('click', addItem);
    document.addEventListener('langchange', render);
  }

  return { init, render };
})();