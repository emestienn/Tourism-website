const Offline = (() => {
  function init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }

    // Offline banner
    const banner = document.createElement('div');
    banner.id = 'offlineBanner';
    banner.style.cssText = `
      position:fixed;bottom:0;left:0;right:0;padding:10px;
      background:var(--gold);color:var(--dark);text-align:center;
      font-weight:700;font-size:.85rem;z-index:1000;
      transform:translateY(100%);transition:transform .3s;
    `;
    banner.textContent = '📴 Offline rejim — ma\'lumotlar keshdan yuklanmoqda';
    document.body.appendChild(banner);

    function update() {
      banner.style.transform = navigator.onLine ? 'translateY(100%)' : 'translateY(0)';
    }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  return { init };
})();