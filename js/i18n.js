const TRANSLATIONS = {
  uz: {
    navPlanner: 'Rejalashtiruvchi', navExplore: 'Kashf et', navBudget: 'Budjet',
    navWeather: 'Ob-havo', navQuiz: 'Test', navAbout: 'Biz haqimizda',
    heroTag: 'SUN\'IY INTELLEKT YORDAMIDA',
    heroTitle: 'O\'zbekistonni aqlli kashf et',
    heroText: 'Shahar, kun va budjetni tanlang — biz sizga shaxsiy marshrut, xarajat hisobi va real tavsiyalar tayyorlaymiz.',
    ctaStart: 'Sayohatni boshlash', ctaExplore: 'Joyları ko\'rish',
    statCities: 'Shahar', statPlaces: 'Joylar', statLangs: 'Tillar', statFree: 'Bepul',
    assistantTag: 'SENING SAYOHAT YORDAMCHING',
    plannerTitle: 'Shaxsiy sayohat rejangni tuz ✨',
    plannerText: 'Shahar, kunlar, budjet va qiziqishlaringni tanla. AI senga optimal marshrut tuzadi.',
    cityLabel: 'Qaysi manzilga?', daysLabel: 'Necha kun?', travelersLabel: 'Necha kishi?',
    dailyBudgetLabel: 'Bir kunlik budjet (so\'m)', interestsLabel: 'Qiziqishlaring',
    startDateLabel: 'Boshlanish sanasi', makePlan: '✨ Rejamni tuz',
    intHistory: '🏛 Tarix', intNature: '🏔 Tabiat', intFood: '🍽 Gastronomiya',
    intAdventure: '🎒 Sarguzasht', intPhoto: '📸 Fotosurat', intShopping: '🛍 Shopping',
    resultEmpty: 'Formani to\'ldiring — marshrutingiz shu yerda paydo bo\'ladi.',
    exploreTag: 'KASHF ET', exploreTitle: 'Interaktiv xarita',
    exploreText: 'Shaharni tanlang — diqqatga sazovor joylarni xaritada ko\'ring.',
    searchPlaceholder: 'Joy qidirish...',
    fAll: 'Barchasi', fHistory: 'Tarixiy', fNature: 'Tabiat', fFood: 'Ovqat', fMuseum: 'Muzey',
    budgetTitle: '💰 Budjet kalkulyatori',
    budgetSubtitle: 'Xarajatlarni alohida hisoblang va valyutada ko\'ring.',
    costTitle: 'Xarajatlar', transportLabel: 'Transport', hotelLabel: 'Mehmonxona',
    foodLabel: 'Ovqatlanish', ticketsLabel: 'Chipta / muzey', guideLabel: 'Gid / ekskursiya',
    souvenirLabel: 'Sovg\'alar', otherLabel: 'Boshqa', totalLabel: 'Jami:',
    reset: 'Qayta boshlash', export: 'Eksport (CSV)',
    checkTitle: '🎒 Safar chek-listi', checkText: 'Tayyor bo\'lgan narsalarni belgilab bor.',
    clearChecks: 'Tozalash', addItem: '+ Qo\'shish',
    weatherTitle: '🌤 Ob-havo va eng yaxshi mavsum',
    weatherSubtitle: 'Shaharlar bo\'yicha oylik ob-havo ma\'lumoti va sayohat uchun tavsiya.',
    quizTag: 'AI TAVSIYA', quizTitle: 'Qaysi shahar senga mos?',
    quizText: '5 savolga javob ber — AI senga eng mos manzilni tavsiya qiladi.',
    aboutTitle: 'Nega AI Travel Uzbekistan?',
    aboutText: 'Bizning maqsad — O\'zbekistonni kashf etishni har bir kishi uchun oson, arzon va qulay qilish. Bir joyda: marshrut, budjet, ob-havo, xarita, valyuta va til. Internet yo\'q bo\'lsa ham ishlaydi.',
    f1t: 'AI marshrut', f1s: 'Qiziqishga mos reja',
    f2t: 'Real budjet', f2s: 'Aniq narxlar',
    f3t: '3 tilda', f3s: 'UZ / RU / EN',
    f4t: 'Offline', f4s: 'PWA qo\'llab-quvvatlash',
    footerText: 'O\'zbekistonni kashf etishning aqlli usuli.',
    footerNav: 'Bo\'limlar', footerContact: 'Aloqa',
  },
  ru: {
    navPlanner: 'Планировщик', navExplore: 'Исследовать', navBudget: 'Бюджет',
    navWeather: 'Погода', navQuiz: 'Тест', navAbout: 'О нас',
    heroTag: 'С ПОМОЩЬЮ ИИ',
    heroTitle: 'Откройте Узбекистан умно',
    heroText: 'Выберите город, дни и бюджет — мы подготовим маршрут, расчёт расходов и рекомендации.',
    ctaStart: 'Начать путешествие', ctaExplore: 'Смотреть места',
    statCities: 'Городов', statPlaces: 'Мест', statLangs: 'Языка', statFree: 'Бесплатно',
    assistantTag: 'ВАШ ПОМОЩНИК В ПУТЕШЕСТВИИ',
    plannerTitle: 'Составьте личный маршрут ✨',
    plannerText: 'Выберите город, дни, бюджет и интересы. ИИ составит оптимальный маршрут.',
    cityLabel: 'Куда едете?', daysLabel: 'Сколько дней?', travelersLabel: 'Сколько человек?',
    dailyBudgetLabel: 'Дневной бюджет (сум)', interestsLabel: 'Интересы',
    startDateLabel: 'Дата начала', makePlan: '✨ Составить план',
    intHistory: '🏛 История', intNature: '🏔 Природа', intFood: '🍽 Гастрономия',
    intAdventure: '🎒 Приключения', intPhoto: '📸 Фото', intShopping: '🛍 Шоппинг',
    resultEmpty: 'Заполните форму — маршрут появится здесь.',
    exploreTag: 'ИССЛЕДУЙТЕ', exploreTitle: 'Интерактивная карта',
    exploreText: 'Выберите город — смотрите достопримечательности на карте.',
    searchPlaceholder: 'Поиск места...',
    fAll: 'Все', fHistory: 'Исторические', fNature: 'Природа', fFood: 'Еда', fMuseum: 'Музеи',
    budgetTitle: '💰 Калькулятор бюджета',
    budgetSubtitle: 'Рассчитайте расходы и посмотрите в валюте.',
    costTitle: 'Расходы', transportLabel: 'Транспорт', hotelLabel: 'Отель',
    foodLabel: 'Питание', ticketsLabel: 'Билеты / музеи', guideLabel: 'Гид / экскурсия',
    souvenirLabel: 'Сувениры', otherLabel: 'Другое', totalLabel: 'Итого:',
    reset: 'Сбросить', export: 'Экспорт (CSV)',
    checkTitle: '🎒 Чек-лист путешествия', checkText: 'Отмечайте готовые пункты.',
    clearChecks: 'Очистить', addItem: '+ Добавить',
    weatherTitle: '🌤 Погода и лучший сезон',
    weatherSubtitle: 'Погода по городам и рекомендации для путешествий.',
    quizTag: 'РЕКОМЕНДАЦИЯ ИИ', quizTitle: 'Какой город вам подходит?',
    quizText: 'Ответьте на 5 вопросов — ИИ порекомендует направление.',
    aboutTitle: 'Почему AI Travel Uzbekistan?',
    aboutText: 'Наша цель — сделать путешествия по Узбекистану простыми, доступными и удобными. Всё в одном: маршрут, бюджет, погода, карта, валюта и язык. Работает даже без интернета.',
    f1t: 'ИИ маршрут', f1s: 'По вашим интересам',
    f2t: 'Реальный бюджет', f2s: 'Точные цены',
    f3t: '3 языка', f3s: 'UZ / RU / EN',
    f4t: 'Офлайн', f4s: 'PWA поддержка',
    footerText: 'Умный способ открыть Узбекистан.',
    footerNav: 'Разделы', footerContact: 'Контакты',
  },
  en: {
    navPlanner: 'Planner', navExplore: 'Explore', navBudget: 'Budget',
    navWeather: 'Weather', navQuiz: 'Quiz', navAbout: 'About',
    heroTag: 'POWERED BY AI',
    heroTitle: 'Discover Uzbekistan smart',
    heroText: 'Pick a city, days and budget — we\'ll build a personal route, cost breakdown and real tips.',
    ctaStart: 'Start your trip', ctaExplore: 'See places',
    statCities: 'Cities', statPlaces: 'Places', statLangs: 'Languages', statFree: 'Free',
    assistantTag: 'YOUR TRAVEL ASSISTANT',
    plannerTitle: 'Build your personal trip ✨',
    plannerText: 'Choose city, days, budget and interests. AI builds the optimal route.',
    cityLabel: 'Where to?', daysLabel: 'How many days?', travelersLabel: 'Travelers?',
    dailyBudgetLabel: 'Daily budget (UZS)', interestsLabel: 'Interests',
    startDateLabel: 'Start date', makePlan: '✨ Make my plan',
    intHistory: '🏛 History', intNature: '🏔 Nature', intFood: '🍽 Food',
    intAdventure: '🎒 Adventure', intPhoto: '📸 Photo', intShopping: '🛍 Shopping',
    resultEmpty: 'Fill the form — your route will appear here.',
    exploreTag: 'EXPLORE', exploreTitle: 'Interactive map',
    exploreText: 'Pick a city — see attractions on the map.',
    searchPlaceholder: 'Search place...',
    fAll: 'All', fHistory: 'Historical', fNature: 'Nature', fFood: 'Food', fMuseum: 'Museums',
    budgetTitle: '💰 Budget calculator',
    budgetSubtitle: 'Calculate costs and view in your currency.',
    costTitle: 'Costs', transportLabel: 'Transport', hotelLabel: 'Hotel',
    foodLabel: 'Food', ticketsLabel: 'Tickets / museums', guideLabel: 'Guide / tour',
    souvenirLabel: 'Souvenirs', otherLabel: 'Other', totalLabel: 'Total:',
    reset: 'Reset', export: 'Export (CSV)',
    checkTitle: '🎒 Travel checklist', checkText: 'Tick off what\'s ready.',
    clearChecks: 'Clear', addItem: '+ Add',
    weatherTitle: '🌤 Weather & best season',
    weatherSubtitle: 'Monthly weather by city and travel recommendation.',
    quizTag: 'AI RECOMMENDATION', quizTitle: 'Which city fits you?',
    quizText: 'Answer 5 questions — AI recommends the best destination.',
    aboutTitle: 'Why AI Travel Uzbekistan?',
    aboutText: 'Our goal is to make exploring Uzbekistan easy, affordable and convenient. All in one: route, budget, weather, map, currency and language. Works offline too.',
    f1t: 'AI route', f1s: 'Matched to interests',
    f2t: 'Real budget', f2s: 'Accurate prices',
    f3t: '3 languages', f3s: 'UZ / RU / EN',
    f4t: 'Offline', f4s: 'PWA ready',
    footerText: 'The smart way to discover Uzbekistan.',
    footerNav: 'Sections', footerContact: 'Contact',
  },
};

let currentLang = localStorage.getItem('lang') || 'uz';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyI18n();
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

window.i18n = { t, setLang, applyI18n, get lang() { return currentLang; } };