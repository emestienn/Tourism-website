const Weather = (() => {
  function seasonTemp(city) {
    const w = WEATHER[city];
    const m = new Date().getMonth();
    if (m >= 5 && m <= 7) return { label: 'Yoz', temp: w.summer, icon: '☀' };
    if (m >= 11 || m <= 1) return { label: 'Qish', temp: w.winter, icon: '❄' };
    if (m >= 2 && m <= 4) return { label: 'Bahor', temp: w.spring, icon: '🌸' };
    return { label: 'Kuz', temp: w.autumn, icon: '🍂' };
  }

  function render() {
    const grid = document.getElementById('weatherGrid');
    if (!grid) return;
    grid.innerHTML = Object.entries(WEATHER).map(([key, w]) => {
      const s = seasonTemp(key);
      const city = CITIES[key];
      if (!city) return '';
      return `<div class="weather-card">
        <div class="city-name">${city.name}</div>
        <div class="temp">${s.icon} ${s.temp}°C</div>
        <div class="season">${s.label} • ${w.best}</div>
      </div>`;
    }).join('');
  }

  return { init: render, render };
})();