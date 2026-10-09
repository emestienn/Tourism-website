const Theme = (() => {
  function apply(mode) {
    document.body.classList.toggle('night', mode === 'night');
    localStorage.setItem('theme', mode);
    const icon = document.querySelector('#themeToggle .theme-icon');
    if (icon) icon.textContent = mode === 'night' ? '☀' : '🌙';
  }

  function init() {
    const saved = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');
    apply(saved);
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      const next = document.body.classList.contains('night') ? 'day' : 'night';
      apply(next);
    });
  }

  return { init, apply };
})();