// Book Journey Premium - Professional Features
class PremiumBookJourney {
    constructor() {
        this.currentUser = {
            name: "Azizbek Karimov",
            username: "@azizbek_reader",
            avatar: "https://picsum.photos/seed/user/120/120",
            location: "Toshkent, O'zbekiston",
            bio: "📖 Kitobsever, tech enthusiast, va doimiy o'rganuvchi. Motivatsion va psixologiya kitoblarini yaxshi ko'raman.",
            stats: {
                booksRead: 127,
                favorites: 45,
                bookmarks: 23,
                readingStreak: 18,
                pagesRead: 1247,
                readingTime: 186,
                rating: 4.8,
                achievements: 15,
                joinDate: "2023-03-15"
            },
            goals: {
                yearly: { current: 52, target: 50 },
                monthly: { current: 4, target: 4 },
                streak: { current: 342, target: 365 }
            },
            currentlyReading: [
                {
                    title: "Atomic Habits",
                    author: "James Clear",
                    cover: "https://picsum.photos/seed/current1/200/300",
                    progress: 68,
                    currentPage: 156,
                    totalPages: 230,
                    timeLeft: "4 soat",
                    genre: "Self-Help",
                    startDate: "2024-11-01"
                },
                {
                    title: "The Psychology of Money",
                    author: "Morgan Housel",
                    cover: "https://picsum.photos/seed/current2/200/300",
                    progress: 45,
                    currentPage: 89,
                    totalPages: 200,
                    timeLeft: "6 soat",
                    genre: "Finance",
                    startDate: "2024-11-10"
                },
                {
                    title: "Deep Work",
                    author: "Cal Newport",
                    cover: "https://picsum.photos/seed/current3/200/300",
                    progress: 23,
                    currentPage: 52,
                    totalPages: 226,
                    timeLeft: "8 soat",
                    genre: "Productivity",
                    startDate: "2024-11-15"
                }
            ],
            library: this.generateLibrary(),
            preferences: {
                theme: 'dark',
                language: 'uz',
                readingSpeed: 245,
                preferredGenres: ['motivation', 'psychology', 'business', 'tech'],
                notifications: true,
                voiceSettings: {
                    gender: 'male',
                    speed: 1.0,
                    pitch: 1.0
                }
            }
        };
        
        this.challengeParticipants = [
            { name: "Ali Karimov", books: 5, days: 25, avatar: "https://picsum.photos/seed/ali/40/40", rank: 1 },
            { name: "Dilnoza Rahimova", books: 4, days: 20, avatar: "https://picsum.photos/seed/dilnoza/40/40", rank: 2 },
            { name: "Bekzod Tursunov", books: 5, days: 28, avatar: "https://picsum.photos/seed/bekzod/40/40", rank: 3 },
            { name: "Gulnora Soliyeva", books: 3, days: 15, avatar: "https://picsum.photos/seed/gulnora/40/40", rank: 4 },
            { name: "Javlon Mirzaev", books: 4, days: 22, avatar: "https://picsum.photos/seed/javlon/40/40", rank: 5 }
        ];
        
        this.init();
    }
    
    init() {
        this.initializeAOS();
        this.initializeCharts();
        this.loadLibrary();
        this.loadLeaderboard();
        this.setupEventListeners();
        this.initializeTheme();
        this.startRealTimeUpdates();
    }
    
    initializeAOS() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    initializeCharts() {
        // Reading Analytics Chart
        const readingCtx = document.getElementById('readingChart');
        if (readingCtx) {
            new Chart(readingCtx, {
                type: 'line',
                data: {
                    labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
                    datasets: [{
                        label: 'O\'qilgan kitoblar',
                        data: [3, 4, 5, 3, 6, 4, 5, 7, 4, 6, 5, 8],
                        borderColor: 'rgb(147, 51, 234)',
                        backgroundColor: 'rgba(147, 51, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
        
        // Genre Analysis Chart
        const genreCtx = document.getElementById('genreChart');
        if (genreCtx) {
            new Chart(genreCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Motivatsiya', 'Psixologiya', 'Biznes', 'Texnologiya', 'Fikriy', 'Boshqa'],
                    datasets: [{
                        data: [35, 25, 20, 10, 7, 3],
                        backgroundColor: [
                            'rgba(147, 51, 234, 0.8)',
                            'rgba(236, 72, 153, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(251, 146, 60, 0.8)',
                            'rgba(107, 114, 128, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#ffffff' }
                        }
                    }
                }
            });
        }
        
        // Reading Speed Chart
        const speedCtx = document.getElementById('speedChart');
        if (speedCtx) {
            new Chart(speedCtx, {
                type: 'bar',
                data: {
                    labels: ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'],
                    datasets: [{
                        label: 'Sahifa/soat',
                        data: [220, 245, 238, 260, 255, 280, 265],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
        
        // Monthly Progress Chart
        const monthlyCtx = document.getElementById('monthlyChart');
        if (monthlyCtx) {
            new Chart(monthlyCtx, {
                type: 'line',
                data: {
                    labels: ['1-hafta', '2-hafta', '3-hafta', '4-hafta'],
                    datasets: [{
                        label: 'O\'qilgan sahifalar',
                        data: [320, 450, 380, 520],
                        borderColor: 'rgb(34, 197, 94)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: '#ffffff' }
                        }
                    },
                    scales: {
                        y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        },
                        x: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'rgba(255, 255, 255, 0.1)' }
                        }
                    }
                }
            });
        }
    }
    
    generateLibrary() {
        const books = [
            { title: "Atomic Habits", author: "James Clear", cover: "https://picsum.photos/seed/book1/150/200", status: "reading", rating: 5, genre: "Self-Help" },
            { title: "The Alchemist", author: "Paulo Coelho", cover: "https://picsum.photos/seed/book2/150/200", status: "completed", rating: 4, genre: "Fiction" },
            { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", cover: "https://picsum.photos/seed/book3/150/200", status: "completed", rating: 5, genre: "Finance" },
            { title: "1984", author: "George Orwell", cover: "https://picsum.photos/seed/book4/150/200", status: "planned", rating: 0, genre: "Fiction" },
            { title: "Mindset", author: "Carol Dweck", cover: "https://picsum.photos/seed/book5/150/200", status: "completed", rating: 4, genre: "Psychology" },
            { title: "The Lean Startup", author: "Eric Ries", cover: "https://picsum.photos/seed/book6/150/200", status: "reading", rating: 0, genre: "Business" },
            { title: "Sapiens", author: "Yuval Noah Harari", cover: "https://picsum.photos/seed/book7/150/200", status: "planned", rating: 0, genre: "History" },
            { title: "Deep Work", author: "Cal Newport", cover: "https://picsum.photos/seed/book8/150/200", status: "reading", rating: 0, genre: "Productivity" },
            { title: "The Psychology of Money", author: "Morgan Housel", cover: "https://picsum.photos/seed/book9/150/200", status: "reading", rating: 0, genre: "Finance" },
            { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "https://picsum.photos/seed/book10/150/200", status: "completed", rating: 5, genre: "Psychology" },
            { title: "The 7 Habits", author: "Stephen Covey", cover: "https://picsum.photos/seed/book11/150/200", status: "completed", rating: 4, genre: "Self-Help" },
            { title: "Zero to One", author: "Peter Thiel", cover: "https://picsum.photos/seed/book12/150/200", status: "planned", rating: 0, genre: "Business" }
        ];
        
        // Add more books to reach 127
        for (let i = 13; i <= 127; i++) {
            books.push({
                title: `Book ${i}`,
                author: `Author ${i}`,
                cover: `https://picsum.photos/seed/book${i}/150/200`,
                status: ["completed", "reading", "planned"][Math.floor(Math.random() * 3)],
                rating: Math.floor(Math.random() * 5) + 1,
                genre: ["Self-Help", "Fiction", "Business", "Psychology", "Finance", "History", "Productivity"][Math.floor(Math.random() * 7)]
            });
        }
        
        return books;
    }
    
    loadLibrary() {
        const libraryGrid = document.getElementById('libraryGrid');
        if (!libraryGrid) return;
        
        libraryGrid.innerHTML = this.currentUser.library.map(book => `
            <div class="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition cursor-pointer transform hover:scale-105" data-aos="fade-up">
                <div class="relative mb-3">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover rounded-lg">
                    ${book.status === 'reading' ? '<div class="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>' : ''}
                    ${book.rating > 0 ? `<div class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">${book.rating}⭐</div>` : ''}
                </div>
                <h4 class="text-white font-semibold text-sm mb-1 line-clamp-1">${book.title}</h4>
                <p class="text-white/60 text-xs mb-2">${book.author}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs px-2 py-1 bg-white/20 rounded-full text-white">${book.genre}</span>
                    <span class="text-xs text-white/60">${this.getStatusText(book.status)}</span>
                </div>
            </div>
        `).join('');
    }
    
    getStatusText(status) {
        const statusMap = {
            'completed': '✅ Tugatilgan',
            'reading': '📖 O\'qilayotgan',
            'planned': '📅 Rejalashtirilgan'
        };
        return statusMap[status] || status;
    }
    
    loadLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        leaderboardList.innerHTML = this.challengeParticipants.map((participant, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
            return `
                <div class="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition">
                    <div class="flex items-center space-x-4">
                        <span class="text-2xl">${medal}</span>
                        <img src="${participant.avatar}" alt="${participant.name}" class="w-10 h-10 rounded-full">
                        <div>
                            <h4 class="text-white font-semibold">${participant.name}</h4>
                            <p class="text-white/60 text-sm">${participant.books} kitob • ${participant.days} kun</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-white font-bold">#${participant.rank}</div>
                        <div class="text-white/60 text-xs">Rank</div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    setupEventListeners() {
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // User Profile Dropdown
        const userProfile = document.getElementById('userProfile');
        if (userProfile) {
            userProfile.addEventListener('click', () => this.toggleUserMenu());
        }
        
        // Notifications
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => this.showNotifications());
        }
        
        // AI Search
        const aiSearchBtn = document.getElementById('aiSearchBtn');
        if (aiSearchBtn) {
            aiSearchBtn.addEventListener('click', () => this.performAISearch());
        }
        
        // Join Challenge
        const joinChallengeBtn = document.getElementById('joinChallengeBtn');
        if (joinChallengeBtn) {
            joinChallengeBtn.addEventListener('click', () => this.joinChallenge());
        }
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Navbar Scroll Effect
        window.addEventListener('scroll', () => this.handleNavbarScroll());
    }
    
    toggleTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-moon text-xl"></i>';
            this.currentUser.preferences.theme = 'light';
        } else {
            html.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
            this.currentUser.preferences.theme = 'dark';
        }
        
        localStorage.setItem('theme', this.currentUser.preferences.theme);
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun text-xl"></i>';
        }
    }
    
    toggleMobileMenu() {
        // Implementation for mobile menu
        this.showNotification('Mobile menu feature coming soon!');
    }
    
    toggleUserMenu() {
        // Implementation for user menu
        this.showNotification('User menu feature coming soon!');
    }
    
    showNotifications() {
        const notifications = [
            { title: "Yangi challenge boshlandi!", message: "30 kunlik 5 ta kitob challenge", time: "5 daqiqa oldin", type: "info" },
            { title: "Dilnoza kitobni tugatdi", message: "'Atomic Habits' ni o'qib tugatdi", time: "15 daqiqa oldin", type: "social" },
            { title: "Sizning yutuqingiz!", message: "18 kunlik o'qish seriyasi", time: "1 soat oldin", type: "achievement" }
        ];
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">🔔 Bildirgishlar</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-white/60 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-4">
                        ${notifications.map(notification => `
                            <div class="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition cursor-pointer">
                                <div class="flex items-start space-x-3">
                                    <div class="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i class="fas fa-${this.getNotificationIcon(notification.type)} text-purple-400"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-white font-semibold text-sm">${notification.title}</h4>
                                        <p class="text-white/60 text-sm">${notification.message}</p>
                                        <p class="text-white/40 text-xs mt-1">${notification.time}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    getNotificationIcon(type) {
        const icons = {
            'info': 'info-circle',
            'social': 'users',
            'achievement': 'trophy',
            'reminder': 'bell'
        };
        return icons[type] || 'bell';
    }
    
    performAISearch() {
        const searchInput = document.getElementById('aiSearchInput');
        const recommendationsDiv = document.getElementById('aiRecommendations');
        const query = searchInput.value.trim();
        
        if (!query) {
            this.showNotification('Iltimos, qidiruv so\'rovini kiriting', 'warning');
            return;
        }
        
        // Show loading state
        recommendationsDiv.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                <p class="text-white/60 mt-4">AI tavsiyalarni tayyorlayapti...</p>
            </div>
        `;
        
        // Simulate AI processing
        setTimeout(() => {
            const recommendations = this.generateAIRecommendations(query);
            this.displayAIRecommendations(recommendations);
        }, 2000);
    }
    
    generateAIRecommendations(query) {
        const allBooks = [
            { title: "Atomic Habits", author: "James Clear", reason: "Kichik o'zgarishlar katta natijalarga olib keladi", match: 95, cover: "https://picsum.photos/seed/ai1/200/300" },
            { title: "The Alchemist", author: "Paulo Coelho", reason: "Hayotiy sarguzashtlar va ma'naviyat haqida", match: 92, cover: "https://picsum.photos/seed/ai2/200/300" },
            { title: "Mindset", author: "Carol Dweck", reason: "O'rganish qobiliyatini rivojlantirish", match: 88, cover: "https://picsum.photos/seed/ai3/200/300" },
            { title: "Deep Work", author: "Cal Newport", reason: "Diqqatni jamlash va samaradorlik", match: 85, cover: "https://picsum.photos/seed/ai4/200/300" },
            { title: "The Psychology of Money", author: "Morgan Housel", reason: "Moliyaviy aql va boylik psixologiyasi", match: 82, cover: "https://picsum.photos/seed/ai5/200/300" },
            { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", reason: "Qaror qabul qilish psixologiyasi", match: 78, cover: "https://picsum.photos/seed/ai6/200/300" }
        ];
        
        // Filter based on query keywords
        return allBooks.filter(book => {
            const searchText = `${book.title} ${book.author} ${book.reason}`.toLowerCase();
            const queryLower = query.toLowerCase();
            
            return searchText.includes(queryLower) || 
                   queryLower.includes('motivatsion') && book.reason.includes('o\'zgarish') ||
                   queryLower.includes('hayotiy') && book.reason.includes('sarguzasht') ||
                   queryLower.includes('qisqa') && book.title.length < 20;
        }).slice(0, 3);
    }
    
    displayAIRecommendations(recommendations) {
        const recommendationsDiv = document.getElementById('aiRecommendations');
        
        if (recommendations.length === 0) {
            recommendationsDiv.innerHTML = '<div class="col-span-3 text-center text-white/60">Afsuski, mos kitob topilmadi</div>';
            return;
        }
        
        recommendationsDiv.innerHTML = recommendations.map((book, index) => `
            <div class="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition cursor-pointer transform hover:scale-105" 
                 style="animation: fadeInUp 0.5s ease ${index * 0.2}s both">
                <div class="relative mb-4">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-48 object-cover rounded-lg">
                    <div class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${book.match}% mos
                    </div>
                </div>
                <h4 class="text-white font-bold text-lg mb-2">${book.title}</h4>
                <p class="text-white/60 text-sm mb-3">${book.author}</p>
                <p class="text-purple-300 text-sm mb-4">${book.reason}</p>
                <div class="flex space-x-2">
                    <button onclick="premiumJourney.showBookDetails('${book.title}')" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex-1 text-sm">
                        <i class="fas fa-book-open mr-2"></i>O'qish
                    </button>
                    <button class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition text-sm">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    showBookDetails(title) {
        const book = this.currentUser.library.find(b => b.title === title) || 
                     this.generateAIRecommendations("").find(b => b.title === title);
        
        if (!book) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition z-10">
                        <i class="fas fa-times text-gray-700"></i>
                    </button>
                    <div class="grid md:grid-cols-2">
                        <div>
                            <img src="${book.cover}" alt="${book.title}" class="w-full h-96 object-cover rounded-l-2xl">
                        </div>
                        <div class="p-8">
                            <h2 class="text-3xl font-bold text-white mb-4">${book.title}</h2>
                            <p class="text-xl text-white/60 mb-6">${book.author || "Noma'lum muallif"}</p>
                            
                            <div class="flex items-center space-x-6 mb-6">
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <span class="text-white font-semibold">${book.rating || 4.5}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-book text-purple-400"></i>
                                    <span class="text-white">${book.genre || "General"}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <i class="fas fa-clock text-green-400"></i>
                                    <span class="text-white">6 soat</span>
                                </div>
                            </div>
                            
                            <div class="mb-8">
                                <h3 class="text-lg font-semibold text-white mb-3">Tavsif</h3>
                                <p class="text-white/80 leading-relaxed">
                                    Bu ajoyib kitob sizni yangi dunyoga olib boradi. Katta sarguzashtlar va qiziqarli hikoyalar 
                                    sizni kutmoqda. Kitobni o'qib chiqib, o'z fikrlaringizni boshqa o'quvchilar bilan baham ko'ring.
                                    Har bir sahifa yangi bilim va tajriba beradi.
                                </p>
                            </div>
                            
                            <div class="mb-8">
                                <h3 class="text-lg font-semibold text-white mb-3">🎤 Ovozli o'qish</h3>
                                <div class="bg-white/10 rounded-xl p-4">
                                    <div class="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label class="block text-sm text-white/60 mb-2">Ovoz</label>
                                            <select class="w-full px-3 py-2 bg-white/20 text-white rounded-lg">
                                                <option>Erkak ovozi</option>
                                                <option>Ayol ovozi</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-sm text-white/60 mb-2">Tezlik</label>
                                            <input type="range" min="0.5" max="2" step="0.1" value="1" class="w-full accent-purple-500">
                                        </div>
                                    </div>
                                    <button class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full">
                                        <i class="fas fa-play mr-2"></i>O'qishni boshlash
                                    </button>
                                </div>
                            </div>
                            
                            <div class="flex space-x-4">
                                <button class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex-1">
                                    <i class="fas fa-book-reader mr-2"></i>
                                    Hozir o'qish
                                </button>
                                <button class="bg-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition">
                                    <i class="fas fa-bookmark mr-2"></i>
                                    Saqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    joinChallenge() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-900 rounded-2xl max-w-md w-full p-8">
                <h2 class="text-2xl font-bold text-white mb-6">🏆 Challenge'ga Qo'shilish</h2>
                
                <div class="space-y-6">
                    <div class="bg-white/10 rounded-xl p-4">
                        <h3 class="text-lg font-semibold text-white mb-3">Challenge qoidalari:</h3>
                        <ul class="space-y-2 text-white/80">
                            <li class="flex items-start space-x-2">
                                <i class="fas fa-check text-green-400 mt-1"></i>
                                <span>30 kun ichida 5 ta kitob o'qing</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <i class="fas fa-check text-green-400 mt-1"></i>
                                <span>Har bir kitob haqida qisqa izoh qoldiring</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <i class="fas fa-check text-green-400 mt-1"></i>
                                <span>Boshqa ishtirokchilarni qo'llab-quvvatlang</span>
                            </li>
                            <li class="flex items-start space-x-2">
                                <i class="fas fa-check text-green-400 mt-1"></i>
                                <span>Eng faol o'quvchi sovrinni oladi</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-white mb-2">🏆 Sovrin</div>
                            <p class="text-white/80">G'oliblar Book Journey Premium 1 oy bepul foydalanish va maxsus badge oladi</p>
                        </div>
                    </div>
                </div>
                
                <div class="flex space-x-4 mt-8">
                    <button onclick="premiumJourney.confirmJoinChallenge(this)" class="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex-1">
                        Qo'shilish
                    </button>
                    <button onclick="this.closest('.fixed').remove()" class="border-2 border-gray-600 text-gray-400 px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                        Bekor qilish
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    confirmJoinChallenge(button) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Qo\'shilmoqda...';
        
        setTimeout(() => {
            // Add user to participants
            this.challengeParticipants.push({
                name: this.currentUser.name,
                books: 0,
                days: 0,
                avatar: this.currentUser.avatar,
                rank: this.challengeParticipants.length + 1
            });
            
            this.loadLeaderboard();
            this.showNotification('Challenge\'ga muvaffaqiyatli qo\'shildingiz! 🎉', 'success');
            button.closest('.fixed').remove();
        }, 1500);
    }
    
    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/80');
        } else {
            navbar.classList.remove('bg-black/80');
        }
    }
    
    showNotification(message, type = 'info') {
        const colors = {
            'success': 'bg-green-500',
            'warning': 'bg-yellow-500',
            'error': 'bg-red-500',
            'info': 'bg-blue-500'
        };
        
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(200%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            // Update reading time
            this.currentUser.stats.readingTime += 0.1;
            
            // Update streak if needed
            const now = new Date();
            const lastReadDate = new Date(this.currentUser.stats.lastReadDate || now);
            const daysDiff = Math.floor((now - lastReadDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === 1) {
                this.currentUser.stats.readingStreak++;
            }
            
            // Random notifications
            if (Math.random() < 0.1) {
                const messages = [
                    "Dilnoza yangi kitob boshladi",
                    "Bekzod challenge'da oldinga chiqdi",
                    "Gulnora kitob sharhi yozdi",
                    "Javlon yangi yutuq qo'lga kiritdi"
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                // Update notification badge
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'block';
                }
            }
        }, 60000); // Update every minute
    }
    
    // Export user data
    exportUserData() {
        const dataStr = JSON.stringify(this.currentUser, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `book-journey-data-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    // Import user data
    importUserData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.currentUser = { ...this.currentUser, ...data };
                this.showNotification('Ma\'lumotlar muvaffaqiyat import qilindi!', 'success');
                location.reload(); // Reload to update UI
            } catch (error) {
                this.showNotification('Import xatoligi: Noto\'g\'ri fayl formati', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize Premium Features
let premiumJourney;
document.addEventListener('DOMContentLoaded', () => {
    premiumJourney = new PremiumBookJourney();
    
    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('aiSearchInput')?.focus();
        }
        
        // Ctrl/Cmd + D for dark mode toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            premiumJourney.toggleTheme();
        }
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
