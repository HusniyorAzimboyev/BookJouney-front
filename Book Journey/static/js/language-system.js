// Multi-Language System for Book Journey
class LanguageSystem {
    constructor() {
        this.currentLanguage = 'uz'; // Default: Uzbek
        this.translations = {
            uz: {
                // Navigation
                'nav.home': 'Bosh sahifa',
                'nav.ai_search': 'AI Qidiruv',
                'nav.literature': 'Adabiyot',
                'nav.trending': 'Trend',
                'nav.challenge': 'Challenge',
                'nav.login': 'Kirish',
                'nav.admin': 'Admin',
                
                // Hero Section
                'hero.platform': 'Zamonaviy Platforma',
                'hero.title1': 'AI bilan',
                'hero.title2': 'Kitoblar Dunyosi',
                'hero.description': 'Book Journey - sun\'iy intellekt tomonidan boshqariladigan zamonaviy platforma. Aqlli tavsiyalar, ovozli o\'qish va shaxsiy tahlillar.',
                'hero.start': 'Boshlash',
                'hero.demo': 'Demo',
                'hero.books': 'Kitoblar',
                'hero.users': 'Foydalanuvchilar',
                'hero.rating': 'O\'rtacha reyting',
                'hero.ai_tips': 'AI Tavsiyalar',
                'hero.voice': 'Ovozli O\'qish',
                'hero.analytics': 'Analitika',
                
                // AI Search
                'ai.title': 'Sun\'iy Intellekt Tavsiyalari',
                'ai.subtitle': 'AI sizga eng mos kitoblarni topadi',
                'ai.placeholder': 'Menga motivatsion, qisqa va hayotiy kitob kerak. Ishga tayyorlanayotganman, kundalik ruhiy holatnimni yaxshilashim kerak...',
                'ai.search': 'AI Izlash',
                'ai.label': 'Nima qidirmoqchisiz?',
                
                // Literature
                'literature.title': 'O\'zbek + Jahon Adabiyoti',
                'literature.subtitle': 'Har qanday adabiyotdan zavqlaning',
                'literature.all': 'Barchasi',
                'literature.uzbek': 'O\'zbek',
                'literature.world': 'Jahon',
                'literature.my_books': 'Mening Kitoblarim',
                'literature.search': 'Kitoblar qidirish...',
                'literature.filter': 'Filter',
                'literature.load_more': 'Yana yuklash',
                'literature.genres': {
                    all: 'Barcha janrlar',
                    klassika: 'Klassika',
                    drama: 'Drama',
                    roman: 'Roman',
                    sheirlar: 'She\'rlar',
                    hikoya: 'Hikoya',
                    fantastika: 'Fantastika',
                    detektiv: 'Detektiv'
                },
                'literature.sort': {
                    popular: 'Eng mashhur',
                    newest: 'Eng yangi',
                    rating: 'Reyting bo\'yicha',
                    name: 'Nomi bo\'yicha'
                },
                
                // AI Summary
                'ai_summary.title': 'AI Book Summary',
                'ai_summary.subtitle': '1 daqiqalik video va 10 ta muhim iqtibos',
                
                // Trending
                'trending.title': 'Trending Bo\'lim',
                'trending.subtitle': 'O\'zbekistonda va dunyo bo\'yicha eng ko\'p o\'qilayotgan kitoblar',
                'trending.uzbek': 'O\'zbekistonda Trend',
                'trending.world': 'Dunyo Trend',
                
                // Challenge
                'challenge.title': '30 Kunlik Challenge',
                'challenge.subtitle': '30 kunda 5 ta kitob o\'qing, sovrinni qo\'lga kiriting!',
                'challenge.books': 'Kitob',
                'challenge.days': 'Kun',
                'challenge.prize': 'Sovrin',
                'challenge.join': 'Challenge\'ga Qo\'shilish',
                'challenge.leaderboard': 'Eng faol o\'quvchilar',
                
                // About
                'about.title': 'Biz Haqimizda',
                'about.description1': 'Book Journey 2024-yilda tashkil etilgan bo\'lib, kitobseverlar uchun zamonaviy va qulay platforma yaratish maqsadida ish boshlaganmiz.',
                'about.description2': 'Bizning maqsadimiz - kitob o\'qish madaniyatini rivojlantirish va har bir kishi uchun qulay kitoblar dunyosini yaratish.',
                'about.countries': 'Mamlakatlar',
                
                // Footer
                'footer.quick_links': 'Tezkor havolalar',
                'footer.help': 'Yordam',
                'footer.newsletter': 'Yangiliklar',
                'footer.newsletter_text': 'Eng so\'nggi yangiliklar va takliflardan xabardor bo\'ling',
                'footer.email_placeholder': 'Emailingiz...',
                'footer.subscribe': 'Obuna',
                'footer.copyright': '© 2026 Book Journey. Barcha huquqlar himoyalangan.',
                'footer.made_in': 'Made with in Uzbekistan',
                'footer.admin_panel': 'Admin Panel',
                
                // Common
                'common.loading': 'Yuklanmoqda...',
                'common.error': 'Xatolik yuz berdi',
                'common.success': 'Muvaffaqiyatli',
                'common.close': 'Yopish'
            },
            
            ru: {
                // Navigation
                'nav.home': 'Главная',
                'nav.ai_search': 'AI Поиск',
                'nav.literature': 'Литература',
                'nav.trending': 'Тренды',
                'nav.challenge': 'Челлендж',
                'nav.login': 'Войти',
                'nav.admin': 'Админ',
                
                // Hero Section
                'hero.platform': 'Современная Платформа',
                'hero.title1': 'С ИИ',
                'hero.title2': 'Мир Книг',
                'hero.description': 'Book Journey - управляемая искусственным интеллектом современная платформа. Умные рекомендации, голосовое чтение и персональный анализ.',
                'hero.start': 'Начать',
                'hero.demo': 'Демо',
                'hero.books': 'Книги',
                'hero.users': 'Пользователи',
                'hero.rating': 'Средний рейтинг',
                'hero.ai_tips': 'AI Рекомендации',
                'hero.voice': 'Голосовое чтение',
                'hero.analytics': 'Аналитика',
                
                // AI Search
                'ai.title': 'Рекомендации ИИ',
                'ai.subtitle': 'ИИ найдет для вас наиболее подходящие книги',
                'ai.placeholder': 'Мне нужна мотивационная, короткая и жизненная книга. Готовлюсь к работе, нужно улучшить свое душевное состояние...',
                'ai.search': 'AI Поиск',
                'ai.label': 'Что вы ищете?',
                
                // Literature
                'literature.title': 'Узбекская + Мировая Литература',
                'literature.subtitle': 'Наслаждайтесь любой литературой',
                'literature.all': 'Все',
                'literature.uzbek': 'Узбекская',
                'literature.world': 'Мировая',
                'literature.my_books': 'Мои книги',
                'literature.search': 'Поиск книг...',
                'literature.filter': 'Фильтр',
                'literature.load_more': 'Загрузить еще',
                'literature.genres': {
                    all: 'Все жанры',
                    klassika: 'Классика',
                    drama: 'Драма',
                    roman: 'Роман',
                    sheirlar: 'Стихи',
                    hikoya: 'Рассказ',
                    fantastika: 'Фантастика',
                    detektiv: 'Детектив'
                },
                'literature.sort': {
                    popular: 'Самые популярные',
                    newest: 'Самые новые',
                    rating: 'По рейтингу',
                    name: 'По названию'
                },
                
                // AI Summary
                'ai_summary.title': 'AI Сводка Книги',
                'ai_summary.subtitle': '1-минутное видео и 10 важных цитат',
                
                // Trending
                'trending.title': 'Раздел Трендов',
                'trending.subtitle': 'Самые читаемые книги в Узбекистане и мире',
                'trending.uzbek': 'Тренды в Узбекистане',
                'trending.world': 'Мировые тренды',
                
                // Challenge
                'challenge.title': '30-дневный Челлендж',
                'challenge.subtitle': 'Прочитайте 5 книг за 30 дней, получите приз!',
                'challenge.books': 'Книга',
                'challenge.days': 'День',
                'challenge.prize': 'Приз',
                'challenge.join': 'Присоединиться к челленджу',
                'challenge.leaderboard': 'Самые активные читатели',
                
                // About
                'about.title': 'О Нас',
                'about.description1': 'Book Journey была основана в 2024 году с целью создания современной и удобной платформы для любителей книг.',
                'about.description2': 'Наша миссия - развивать культуру чтения книг и создавать удобный мир книг для каждого человека.',
                'about.countries': 'Страны',
                
                // Footer
                'footer.quick_links': 'Быстрые ссылки',
                'footer.help': 'Помощь',
                'footer.newsletter': 'Новости',
                'footer.newsletter_text': 'Будьте в курсе последних новостей и предложений',
                'footer.email_placeholder': 'Ваш email...',
                'footer.subscribe': 'Подписаться',
                'footer.copyright': '© 2026 Book Journey. Все права защищены.',
                'footer.made_in': 'Сделано в Узбекистане',
                'footer.admin_panel': 'Панель администратора',
                
                // Common
                'common.loading': 'Загрузка...',
                'common.error': 'Произошла ошибка',
                'common.success': 'Успешно',
                'common.close': 'Закрыть'
            },
            
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.ai_search': 'AI Search',
                'nav.literature': 'Literature',
                'nav.trending': 'Trending',
                'nav.challenge': 'Challenge',
                'nav.login': 'Login',
                'nav.admin': 'Admin',
                
                // Hero Section
                'hero.platform': 'Modern Platform',
                'hero.title1': 'With AI',
                'hero.title2': 'Book World',
                'hero.description': 'Book Journey - AI-powered modern platform. Smart recommendations, voice reading, and personal analytics.',
                'hero.start': 'Get Started',
                'hero.demo': 'Demo',
                'hero.books': 'Books',
                'hero.users': 'Users',
                'hero.rating': 'Average Rating',
                'hero.ai_tips': 'AI Recommendations',
                'hero.voice': 'Voice Reading',
                'hero.analytics': 'Analytics',
                
                // AI Search
                'ai.title': 'AI Recommendations',
                'ai.subtitle': 'AI finds the most suitable books for you',
                'ai.placeholder': 'I need a motivational, short and life-changing book. I\'m preparing for work, need to improve my daily mental state...',
                'ai.search': 'AI Search',
                'ai.label': 'What are you looking for?',
                
                // Literature
                'literature.title': 'Uzbek + World Literature',
                'literature.subtitle': 'Enjoy any type of literature',
                'literature.all': 'All',
                'literature.uzbek': 'Uzbek',
                'literature.world': 'World',
                'literature.my_books': 'My Books',
                'literature.search': 'Search books...',
                'literature.filter': 'Filter',
                'literature.load_more': 'Load More',
                'literature.genres': {
                    all: 'All Genres',
                    klassika: 'Classic',
                    drama: 'Drama',
                    roman: 'Novel',
                    sheirlar: 'Poetry',
                    hikoya: 'Story',
                    fantastika: 'Fantasy',
                    detektiv: 'Detective'
                },
                'literature.sort': {
                    popular: 'Most Popular',
                    newest: 'Newest',
                    rating: 'By Rating',
                    name: 'By Name'
                },
                
                // AI Summary
                'ai_summary.title': 'AI Book Summary',
                'ai_summary.subtitle': '1-minute video and 10 important quotes',
                
                // Trending
                'trending.title': 'Trending Section',
                'trending.subtitle': 'Most read books in Uzbekistan and worldwide',
                'trending.uzbek': 'Trending in Uzbekistan',
                'trending.world': 'World Trends',
                
                // Challenge
                'challenge.title': '30-Day Challenge',
                'challenge.subtitle': 'Read 5 books in 30 days, get the prize!',
                'challenge.books': 'Book',
                'challenge.days': 'Day',
                'challenge.prize': 'Prize',
                'challenge.join': 'Join Challenge',
                'challenge.leaderboard': 'Most Active Readers',
                
                // About
                'about.title': 'About Us',
                'about.description1': 'Book Journey was founded in 2024 with the goal of creating a modern and convenient platform for book lovers.',
                'about.description2': 'Our mission is to develop the culture of reading books and create a convenient world of books for every person.',
                'about.countries': 'Countries',
                
                // Footer
                'footer.quick_links': 'Quick Links',
                'footer.help': 'Help',
                'footer.newsletter': 'Newsletter',
                'footer.newsletter_text': 'Stay updated with the latest news and offers',
                'footer.email_placeholder': 'Your email...',
                'footer.subscribe': 'Subscribe',
                'footer.copyright': '© 2026 Book Journey. All rights reserved.',
                'footer.made_in': 'Made with in Uzbekistan',
                'footer.admin_panel': 'Admin Panel',
                
                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error occurred',
                'common.success': 'Success',
                'common.close': 'Close'
            }
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setupSystem(), 100);
            });
        } else {
            setTimeout(() => this.setupSystem(), 100);
        }
    }
    
    setupSystem() {
        this.setupNavigationLanguageSelector();
        this.translatePage();
        this.setupEventListeners();
        
        // Load saved language preference
        const savedLanguage = localStorage.getItem('bookJourney_language');
        if (savedLanguage && this.translations[savedLanguage]) {
            this.currentLanguage = savedLanguage;
            this.updateLanguageSelector();
            this.translatePage();
        }
        
        console.log('Language system initialized with language:', this.currentLanguage);
    }
    
    setupNavigationLanguageSelector() {
        // Find the navigation language selector
        const navSelector = document.querySelector('.flex.items-center.space-x-1.bg-white');
        if (navSelector) {
            this.languageSelector = navSelector;
            this.updateLanguageSelector();
        }
    }
    
    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl p-2 flex items-center space-x-2';
        selector.innerHTML = `
            <button class="language-btn px-3 py-2 rounded text-sm font-medium transition-all duration-200" data-lang="uz">UZ</button>
            <button class="language-btn px-3 py-2 rounded text-sm font-medium transition-all duration-200" data-lang="ru">RU</button>
            <button class="language-btn px-3 py-2 rounded text-sm font-medium transition-all duration-200" data-lang="en">EN</button>
        `;
        
        document.body.appendChild(selector);
        this.languageSelector = selector;
        this.updateLanguageSelector();
    }
    
    updateLanguageSelector() {
        if (!this.languageSelector) return;
        
        const buttons = this.languageSelector.querySelectorAll('.language-btn');
        buttons.forEach(btn => {
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('bg-purple-600', 'text-white');
                btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            } else {
                btn.classList.remove('bg-purple-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            }
        });
    }
    
    setupEventListeners() {
        // Setup event listeners for navigation language selector
        const navButtons = document.querySelectorAll('.language-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.dataset.lang;
                if (lang) {
                    this.changeLanguage(lang);
                }
            });
        });
        
        // Also setup for floating selector if it exists
        if (this.languageSelector) {
            const buttons = this.languageSelector.querySelectorAll('.language-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.changeLanguage(btn.dataset.lang);
                });
            });
        }
    }
    
    changeLanguage(lang) {
        console.log('Changing language to:', lang);
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('bookJourney_language', lang);
            this.updateLanguageSelector();
            this.translatePage();
            this.showToast(`Language changed to ${this.getLanguageName(lang)}`, 'success');
            console.log('Language successfully changed to:', lang);
        } else {
            console.error('Language not found:', lang);
        }
    }
    
    getLanguageName(lang) {
        const names = {
            uz: 'Uzbek',
            ru: 'Russian',
            en: 'English'
        };
        return names[lang] || lang;
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Handle placeholder attributes separately
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.dataset.translatePlaceholder;
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Update page title and meta description
        this.updatePageMeta();
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Update select options
        this.updateSelectOptions();
        
        // Update mobile menu if exists
        this.updateMobileMenu();
    }
    
    updateSelectOptions() {
        // Update genre filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            const genres = this.getTranslation('literature.genres');
            if (genres) {
                genreFilter.innerHTML = '';
                genreFilter.innerHTML = `<option value="">${genres.all}</option>`;
                genreFilter.innerHTML += `<option value="klassika">${genres.klassika}</option>`;
                genreFilter.innerHTML += `<option value="drama">${genres.drama}</option>`;
                genreFilter.innerHTML += `<option value="roman">${genres.roman}</option>`;
                genreFilter.innerHTML += `<option value="sheirlar">${genres.sheirlar}</option>`;
                genreFilter.innerHTML += `<option value="hikoya">${genres.hikoya}</option>`;
                genreFilter.innerHTML += `<option value="fantastika">${genres.fantastika}</option>`;
                genreFilter.innerHTML += `<option value="detektiv">${genres.detektiv}</option>`;
            }
        }
        
        // Update sort filter
        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            const sortOptions = this.getTranslation('literature.sort');
            if (sortOptions) {
                sortBy.innerHTML = '';
                sortBy.innerHTML += `<option value="popular">${sortOptions.popular}</option>`;
                sortBy.innerHTML += `<option value="newest">${sortOptions.newest}</option>`;
                sortBy.innerHTML += `<option value="rating">${sortOptions.rating}</option>`;
                sortBy.innerHTML += `<option value="name">${sortOptions.name}</option>`;
            }
        }
    }
    
    updateMobileMenu() {
        if (window.buttonManager && window.buttonManager.mobileMenu) {
            const mobileLinks = window.buttonManager.mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                const text = link.textContent.trim();
                const key = this.getMobileMenuKey(text);
                if (key) {
                    const translation = this.getTranslation(key);
                    if (translation) {
                        link.textContent = translation;
                    }
                }
            });
        }
    }
    
    getMobileMenuKey(text) {
        const mapping = {
            'Bosh sahifa': 'nav.home',
            'AI Qidiruv': 'nav.ai_search', 
            'Adabiyot': 'nav.literature',
            'Trend': 'nav.trending',
            'Challenge': 'nav.challenge',
            'Главная': 'nav.home',
            'AI Поиск': 'nav.ai_search',
            'Литература': 'nav.literature',
            'Тренды': 'nav.trending',
            'Челлендж': 'nav.challenge',
            'Home': 'nav.home',
            'AI Search': 'nav.ai_search',
            'Literature': 'nav.literature',
            'Trending': 'nav.trending',
            'Challenge': 'nav.challenge'
        };
        return mapping[text] || null;
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }
    
    updatePageMeta() {
        const titles = {
            uz: 'Book Journey - Kitoblar Olami',
            ru: 'Book Journey - Мир Книг',
            en: 'Book Journey - Book World'
        };
        
        const descriptions = {
            uz: 'Zamonaviy kitoblar platformasi - har bir kishi uchun qulay kitoblar dunyosi',
            ru: 'Современная платформа книг - удобный мир книг для каждого',
            en: 'Modern book platform - convenient world of books for everyone'
        };
        
        document.title = titles[this.currentLanguage];
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = descriptions[this.currentLanguage];
    }
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        toast.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    window.languageSystem = new LanguageSystem();
});

// Make translate function globally available
window.translate = function(key) {
    if (window.languageSystem) {
        return window.languageSystem.getTranslation(key);
    }
    return key;
};
