document.addEventListener('DOMContentLoaded', () => {
  // Language first
  i18n.applyI18n();

  // Populate cities
  const citySelect = document.getElementById('city');
  if (citySelect) {
    citySelect.innerHTML = Object.entries(CITIES)
      .map(([k, c]) => `<option value="${k}">${c.name}</option>`)
      .join('');
  }

  // Default start date = today
  const sd = document.getElementById('startDate');
  if (sd) sd.valueAsDate = new Date();

  // Init modules
  Theme.init();
  Budget.init();
  Currency.init();
  Weather.init();
  Checklist.init();
  MapModule.init();
  Quiz.init();
  Offline.init();

  // Interests chips
  const interests = new Set();
  document.querySelectorAll('#interests .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const v = chip.dataset.value;
      if (interests.has(v)) { interests.delete(v); chip.classList.remove('active'); }
      else { interests.add(v); chip.classList.add('active'); }
    });
  });

  // Form submit
  document.getElementById('travelForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const plan = Planner.buildPlan({
      city: document.getElementById('city').value,
      days: Number(document.getElementById('days').value),
      travelers: Number(document.getElementById('travelers').value),
      budgetPerDay: Number(document.getElementById('budget').value),
      interests: [...interests],
      startDate: document.getElementById('startDate').value,
    });
    Planner.render(document.getElementById('result'), plan);
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Language switch
  document.getElementById('langSwitch')?.addEventListener('change', e => {
    i18n.setLang(e.target.value);
    // re-render dynamic parts
    Checklist.render();
    Weather.render();
  });

  // Menu toggle
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('open');
  });
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mainNav').classList.remove('open'));
  });

  // Scroll progress + header shadow + back to top
  const progress = document.getElementById('scrollProgress');
  const header = document.querySelector('.site-header');
  const backtop = document.querySelector('.backtop');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = pct + '%';
    header?.classList.toggle('scrolled', h.scrollTop > 20);
    backtop?.classList.toggle('show', h.scrollTop > 500);
  }, { passive: true });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section-head, .card, .feature, .weather-card').forEach(el => {
    el.classList.add('reveal');
    io.observe(el);
  });

  // Counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur + '+';
    }, 25);
  });

  // Hero parallax (orbs drift toward the pointer, background pans on scroll)
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const heroOrbs = hero?.querySelector('.hero-orbs');
  const heroBg = hero?.querySelector('.hero-bg');
  if (hero && heroOrbs && !reduceMotion) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroOrbs.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    });
    hero.addEventListener('pointerleave', () => { heroOrbs.style.transform = ''; });

    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY, hero.offsetHeight);
      if (heroBg) heroBg.style.transform = `translateY(${offset * 0.25}px)`;
    }, { passive: true });
  }

  // Loader hide
  setTimeout(() => document.getElementById('loader')?.classList.add('done'), 600);
});