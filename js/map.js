const MapModule = (() => {
  let map, markers = [], currentFilter = 'all', searchTerm = '';

  function init() {
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;

    map = L.map('map', { scrollWheelZoom: false }).setView([41.3775, 64.5853], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap', maxZoom: 18,
    }).addTo(map);

    renderPlaces();
    bindControls();
  }

  function bindControls() {
    document.getElementById('placeSearch')?.addEventListener('input', e => {
      searchTerm = e.target.value.toLowerCase();
      renderPlaces();
    });
    document.querySelectorAll('#filterChips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        renderPlaces();
      });
    });
  }

  function renderPlaces() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    const list = document.getElementById('placesList');
    if (list) list.innerHTML = '';

    const filtered = PLACES.filter(p => {
      const matchFilter = currentFilter === 'all' || p.type === currentFilter;
      const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm);
      return matchFilter && matchSearch;
    });

    filtered.forEach(p => {
      const m = L.marker([p.lat, p.lng]).addTo(map)
        .bindPopup(`<b>${p.name}</b><br><small>${p.desc}</small><br>★ ${p.rating}`);
      markers.push(m);

      if (list) {
        const card = document.createElement('div');
        card.className = 'place-card';
        card.innerHTML = `
          <h4>${p.name} <span class="rating">★ ${p.rating}</span></h4>
          <small>${p.desc}</small>
        `;
        card.addEventListener('click', () => {
          map.flyTo([p.lat, p.lng], 14, { duration: 1 });
          m.openPopup();
        });
        list.appendChild(card);
      }
    });

    if (markers.length) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }
  }

  return { init, renderPlaces };
})();