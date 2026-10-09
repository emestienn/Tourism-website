// AI marshrut generatori — masofa, vaqt, qiziqish va budjetga qarab
const Planner = (() => {
  function haversine(a, b) {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const la1 = a.lat * Math.PI / 180;
    const la2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  // Eng yaqin qo'shni bo'yicha greedy route (TSP approximation)
  function optimizeRoute(places) {
    if (places.length < 2) return places.slice();
    const route = [places[0]];
    const rest = places.slice(1);
    while (rest.length) {
      const last = route[route.length - 1];
      let bestIdx = 0, bestDist = Infinity;
      rest.forEach((p, i) => {
        const d = haversine(last, p);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      route.push(rest.splice(bestIdx, 1)[0]);
    }
    return route;
  }

  function pickPlaces(cityKey, interests, maxPerDay) {
    let pool = PLACES.filter(p => p.city === cityKey);
    if (interests && interests.length) {
      pool.sort((a, b) => {
        const aMatch = interests.includes(a.type) ? 1 : 0;
        const bMatch = interests.includes(b.type) ? 1 : 0;
        return bMatch - aMatch || b.rating - a.rating;
      });
    } else {
      pool.sort((a, b) => b.rating - a.rating);
    }
    return pool.slice(0, maxPerDay);
  }

  function buildPlan({ city, days, travelers, budgetPerDay, interests, startDate }) {
    const cityInfo = CITIES[city];
    if (!cityInfo) return null;

    const perDay = 3; // 3 ta asosiy joy / kun
    const totalPlaces = Math.min(days * perDay, 12);
    const chosen = pickPlaces(city, interests, totalPlaces);
    const route = optimizeRoute(chosen);

    // Kunlarga bo'lish
    const dayPlans = [];
    for (let d = 0; d < days; d++) {
      const slice = route.slice(d * perDay, (d + 1) * perDay);
      if (!slice.length) break;
      dayPlans.push({ day: d + 1, places: slice });
    }

    // Xarajat
    const totalBudget = budgetPerDay * days * travelers;
    const breakdown = {
      transport: Math.round(totalBudget * 0.20),
      hotel: Math.round(totalBudget * 0.35),
      food: Math.round(totalBudget * 0.25),
      tickets: Math.round(totalBudget * 0.12),
      other: Math.round(totalBudget * 0.08),
    };

    // Vaqt
    const totalDistance = route.reduce((sum, p, i) => {
      if (i === 0) return 0;
      return sum + haversine(route[i-1], p);
    }, 0);

    // Tavsiya
    const season = cityInfo.bestSeason;
    const warning = totalPlaces < days * perDay
      ? 'Bu shaharda barcha kunlarni to\'ldirish uchun joy yetarli emas. Qo\'shni shaharni qo\'shishni o\'ylab ko\'ring.'
      : null;

    // Sana
    const startD = startDate ? new Date(startDate) : new Date();
    const endD = new Date(startD);
    endD.setDate(endD.getDate() + days - 1);

    return {
      cityInfo, dayPlans, breakdown, totalBudget,
      totalDistance: totalDistance.toFixed(1),
      season, warning, travelers,
      startDate: startD.toLocaleDateString(),
      endDate: endD.toLocaleDateString(),
      route,
    };
  }

  function formatMoney(n) {
    return new Intl.NumberFormat('uz-UZ').format(n) + ' so\'m';
  }

  function render(container, plan) {
    if (!plan) {
      container.innerHTML = `<div class="result-empty">
        <div class="result-empty-icon">🗺</div>
        <p>${i18n.t('resultEmpty')}</p>
      </div>`;
      return;
    }

    const { cityInfo, dayPlans, breakdown, totalBudget, totalDistance, season, warning, travelers, startDate, endDate } = plan;

    let html = `
      <div style="animation:fadeUp .5s both">
        <h3 style="margin-bottom:6px">${cityInfo.name}</h3>
        <p style="color:var(--muted);font-size:.9rem;margin-bottom:20px">
          ${startDate} — ${endDate} • ${travelers} kishi • ${cityInfo.region}
        </p>
    `;

    if (warning) {
      html += `<div style="padding:12px 16px;background:rgba(217,164,65,.15);border-left:4px solid var(--gold);border-radius:var(--r);margin-bottom:18px;font-size:.9rem">⚠ ${warning}</div>`;
    }

    dayPlans.forEach(({ day, places }) => {
      html += `<div class="day-plan">
        <h4>📅 ${day}-kun</h4>
        <ul>`;
      places.forEach(p => {
        html += `<li><b>${p.name}</b> <span style="color:var(--gold)">★${p.rating}</span><br>
          <small style="color:var(--muted)">${p.desc}</small></li>`;
      });
      html += `</ul></div>`;
    });

    html += `
      <div class="result-summary">
        <div class="summary-item"><b>${formatMoney(totalBudget)}</b><small>Umumiy budjet</small></div>
        <div class="summary-item"><b>${totalDistance} km</b><small>Umumiy masofa</small></div>
        <div class="summary-item"><b>${dayPlans.length}</b><small>Kun</small></div>
        <div class="summary-item"><b>${season}</b><small>Eng yaxshi mavsum</small></div>
      </div>

      <h4 style="margin:24px 0 12px">💸 Xarajat taqsimoti</h4>
      <div class="result-summary">
        <div class="summary-item"><b>${formatMoney(breakdown.transport)}</b><small>Transport</small></div>
        <div class="summary-item"><b>${formatMoney(breakdown.hotel)}</b><small>Mehmonxona</small></div>
        <div class="summary-item"><b>${formatMoney(breakdown.food)}</b><small>Ovqat</small></div>
        <div class="summary-item"><b>${formatMoney(breakdown.tickets)}</b><small>Chiptalar</small></div>
        <div class="summary-item"><b>${formatMoney(breakdown.other)}</b><small>Boshqa</small></div>
      </div>

      <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap">
        <button class="btn btn-primary small" id="printPlan">🖨 Chop etish</button>
        <button class="btn btn-outline small" id="sharePlan">🔗 Ulashish</button>
      </div>
    </div>`;

    container.innerHTML = html;

    document.getElementById('printPlan')?.addEventListener('click', () => window.print());
    document.getElementById('sharePlan')?.addEventListener('click', async () => {
      const text = `${cityInfo.name} — ${dayPlans.length} kunlik sayohat rejasi (AI Travel UZ)`;
      if (navigator.share) {
        try { await navigator.share({ title: 'AI Travel UZ', text }); } catch {}
      } else {
        await navigator.clipboard.writeText(text);
        alert('Nusxa olindi!');
      }
    });
  }

  return { buildPlan, render, optimizeRoute, haversine };
})();