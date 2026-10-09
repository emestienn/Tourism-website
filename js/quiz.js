const Quiz = (() => {
  let idx = 0;
  let answers = [];

  function start() {
    idx = 0; answers = [];
    render();
  }

  function render() {
    const wrap = document.getElementById('quizCard');
    if (!wrap) return;

    if (idx >= QUIZ_QUESTIONS.length) return showResult();

    const q = QUIZ_QUESTIONS[idx];
    const pct = (idx / QUIZ_QUESTIONS.length) * 100;

    wrap.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${pct}%"></div></div>
      <div class="quiz-question">${q[i18n.lang] || q.uz}</div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button data-i="${i}">${o[i18n.lang] || o.uz}</button>`).join('')}
      </div>
      <p style="text-align:center;color:var(--muted);margin-top:16px;font-size:.85rem">
        ${idx + 1} / ${QUIZ_QUESTIONS.length}
      </p>
    `;

    wrap.querySelectorAll('.quiz-options button').forEach(btn => {
      btn.addEventListener('click', () => {
        answers.push(q.options[+btn.dataset.i].tags);
        idx++;
        render();
      });
    });
  }

  function score() {
    const flat = answers.flat();
    const cities = Object.entries(CITIES).map(([key, c]) => {
      let score = 0;
      c.tags.forEach(t => { if (flat.includes(t)) score += 2; });
      if (flat.includes('short') && key === 'tashkent') score += 1;
      if (flat.includes('comfort') || flat.includes('premium')) {
        score += c.dailyCost.comfort > 900000 ? 1 : 0;
      }
      return { key, city: c, score };
    });
    cities.sort((a, b) => b.score - a.score);
    return cities;
  }

  function showResult() {
    const wrap = document.getElementById('quizCard');
    const ranked = score();
    const best = ranked[0];
    wrap.innerHTML = `
      <div class="quiz-result">
        <div class="badge">🏆</div>
        <h3 style="margin-bottom:10px">Sizga eng mos: <span class="gradient">${best.city.name}</span></h3>
        <p style="color:var(--muted);margin-bottom:20px">
          ${best.city.region} • Eng yaxshi mavsum: ${best.city.bestSeason}
        </p>
        <div style="text-align:left;margin-top:20px">
          <h4 style="margin-bottom:10px">Boshqa mos variantlar:</h4>
          ${ranked.slice(1, 4).map(r => `
            <div style="padding:12px 16px;background:var(--bg-alt);border-radius:var(--r);margin-bottom:8px;display:flex;justify-content:space-between">
              <span>${r.city.name}</span>
              <small style="color:var(--muted)">${r.city.region}</small>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top:24px" id="quizRestart">Yana o'tish</button>
      </div>
    `;
    document.getElementById('quizRestart')?.addEventListener('click', start);
  }

  function init() {
    if (document.getElementById('quizCard')) start();
    document.addEventListener('langchange', () => { if (idx < QUIZ_QUESTIONS.length) render(); });
  }

  return { init, start };
})();