// Book Journey Admin Panel - Complete Management System
class AdminPanel {
    constructor() {
        this.ADMIN_PASSWORD = '329329';
        this.isLoggedIn = false;
        this.siteData = this.loadSiteData();
        
        this.init();
    }
    
    init() {
        this.setupLogin();
        this.checkAuthStatus();
    }
    
    loadSiteData() {
        const savedData = localStorage.getItem('bookJourneySiteData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        return {
            books: {
                uzbek: [
                    { id: 1, title: "O'tkan kunlar", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/otkan/150/200", genre: "Klassika", rating: 4.8, readers: 12500, trend: "+25%" },
                    { id: 2, title: "Mehrobdan chayon", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mehrobdan/150/200", genre: "Klassika", rating: 4.7, readers: 8300, trend: "+18%" },
                    { id: 3, title: "Yodgor", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/yodgor/150/200", genre: "Klassika", rating: 4.6, readers: 6700, trend: "+12%" },
                    { id: 4, title: "Mahbublar qissasi", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mahbublar/150/200", genre: "Klassika", rating: 4.5, readers: 5400, trend: "+8%" },
                    { id: 5, title: "Qiyomat qismati", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/qiyomat/150/200", genre: "Klassika", rating: 4.4, readers: 4200, trend: "+5%" }
                ],
                world: [
                    { id: 6, title: "Atomic Habits", author: "James Clear", cover: "https://picsum.photos/seed/atomic/150/200", genre: "Self-Help", rating: 4.9, readers: 45200, trend: "+32%" },
                    { id: 7, title: "The Alchemist", author: "Paulo Coelho", cover: "https://picsum.photos/seed/alchemist/150/200", genre: "Fiction", rating: 4.8, readers: 38700, trend: "+28%" },
                    { id: 8, title: "1984", author: "George Orwell", cover: "https://picsum.photos/seed/1984/150/200", genre: "Dystopian", rating: 4.7, readers: 31400, trend: "+15%" },
                    { id: 9, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", cover: "https://picsum.photos/seed/richdad/150/200", genre: "Finance", rating: 4.6, readers: 28900, trend: "+22%" },
                    { id: 10, title: "Mindset", author: "Carol Dweck", cover: "https://picsum.photos/seed/mindset/150/200", genre: "Psychology", rating: 4.5, readers: 25600, trend: "+18%" }
                ]
            },
            trending: {
                uzbekistan: [
                    { id: 1, title: "O'tkan kunlar", author: "Abdulla Qodiriy", readers: "12.5K", trend: "+25%", position: 1 },
                    { id: 2, title: "Mehrobdan chayon", author: "Abdulla Qodiriy", readers: "8.3K", trend: "+18%", position: 2 },
                    { id: 3, title: "Yodgor", author: "Abdulla Qodiriy", readers: "6.7K", trend: "+12%", position: 3 },
                    { id: 4, title: "Mahbublar qissasi", author: "Abdulla Qodiriy", readers: "5.4K", trend: "+8%", position: 4 },
                    { id: 5, title: "Qiyomat qismati", author: "Abdulla Qodiriy", readers: "4.2K", trend: "+5%", position: 5 }
                ],
                global: [
                    { id: 6, title: "Atomic Habits", author: "James Clear", readers: "45.2K", trend: "+32%", position: 1 },
                    { id: 7, title: "The Alchemist", author: "Paulo Coelho", readers: "38.7K", trend: "+28%", position: 2 },
                    { id: 8, title: "1984", author: "George Orwell", readers: "31.4K", trend: "+15%", position: 3 },
                    { id: 9, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", readers: "28.9K", trend: "+22%", position: 4 },
                    { id: 10, title: "Mindset", author: "Carol Dweck", readers: "25.6K", trend: "+18%", position: 5 }
                ]
            },
            challenge: {
                title: "30 Kunlik Challenge",
                description: "30 kunda 5 ta kitob o'qing, sovrinni qo'lga kiriting!",
                targetBooks: 5,
                targetDays: 30,
                participants: [
                    { id: 1, name: "Ali Karimov", books: 5, days: 25, avatar: "https://picsum.photos/seed/ali/40/40", rank: 1, status: "completed" },
                    { id: 2, name: "Dilnoza Rahimova", books: 4, days: 20, avatar: "https://picsum.photos/seed/dilnoza/40/40", rank: 2, status: "active" },
                    { id: 3, name: "Bekzod Tursunov", books: 5, days: 28, avatar: "https://picsum.photos/seed/bekzod/40/40", rank: 3, status: "completed" },
                    { id: 4, name: "Gulnora Soliyeva", books: 3, days: 15, avatar: "https://picsum.photos/seed/gulnora/40/40", rank: 4, status: "active" },
                    { id: 5, name: "Javlon Mirzaev", books: 4, days: 22, avatar: "https://picsum.photos/seed/javlon/40/40", rank: 5, status: "active" }
                ],
                prize: "Book Journey Premium 1 oy bepul foydalanish va maxsus badge",
                startDate: "2024-11-01",
                endDate: "2024-11-30"
            },
            users: {
                total: 5234,
                active: 3421,
                premium: 156,
                newThisMonth: 234
            },
            analytics: {
                totalBooksRead: 15678,
                totalReadingTime: 45678,
                averageRating: 4.6,
                mostPopularGenre: "Self-Help"
            }
        };
    }
    
    saveSiteData() {
        localStorage.setItem('bookJourneySiteData', JSON.stringify(this.siteData));
    }
    
    setupLogin() {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const passwordInput = document.getElementById('adminPassword');
                const icon = togglePassword.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        }
    }
    
    checkAuthStatus() {
        const authStatus = sessionStorage.getItem('adminAuth');
        if (authStatus === 'true') {
            this.isLoggedIn = true;
            this.showDashboard();
        }
    }
    
    handleLogin() {
        const password = document.getElementById('adminPassword').value;
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        if (password === this.ADMIN_PASSWORD) {
            this.isLoggedIn = true;
            sessionStorage.setItem('adminAuth', 'true');
            this.showDashboard();
        } else {
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'Noto\'g\'ri parol! Iltimos, qayta urinib ko\'ring.';
            
            // Shake animation
            const loginCard = document.getElementById('loginCard');
            loginCard.classList.add('animate-pulse');
            setTimeout(() => {
                loginCard.classList.remove('animate-pulse');
            }, 1000);
        }
    }
    
    showDashboard() {
        const loginCard = document.getElementById('loginCard');
        const dashboard = document.getElementById('adminDashboard');
        
        loginCard.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
        dashboard.innerHTML = this.createDashboardHTML();
        this.initializeDashboard();
    }
    
    createDashboardHTML() {
        return `
            <div class="min-h-screen">
                <!-- Admin Header -->
                <header class="bg-gray-900 border-b border-gray-800 shadow-2xl">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex items-center justify-between h-20">
                            <div class="flex items-center space-x-6">
                                <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <i class="fas fa-shield-alt text-white text-xl"></i>
                                </div>
                                <div>
                                    <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
                                    <p class="text-gray-400 text-sm">Book Journey Management System</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center space-x-6">
                                <div class="text-right">
                                    <p class="text-white text-sm font-medium">Admin</p>
                                    <p class="text-gray-400 text-xs">Full Access</p>
                                </div>
                                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <i class="fas fa-check text-white"></i>
                                </div>
                                <button onclick="adminPanel.logout()" class="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition flex items-center space-x-2">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span>Chiqish</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                
                <!-- Main Content -->
                <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <!-- Stats Overview -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
                        <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-400 text-sm font-medium">Jami foydalanuvchilar</p>
                                    <p class="text-3xl font-bold text-white mt-2">${this.siteData.users.total.toLocaleString()}</p>
                                    <div class="flex items-center mt-2 text-green-400 text-sm">
                                        <i class="fas fa-arrow-up mr-1"></i>
                                        <span>+${this.siteData.users.newThisMonth} bu oy</span>
                                    </div>
                                </div>
                                <div class="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-users text-blue-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-400 text-sm font-medium">Faol foydalanuvchilar</p>
                                    <p class="text-3xl font-bold text-white mt-2">${this.siteData.users.active.toLocaleString()}</p>
                                    <div class="flex items-center mt-2 text-blue-400 text-sm">
                                        <i class="fas fa-circle mr-1 text-xs"></i>
                                        <span>${Math.round(this.siteData.users.active / this.siteData.users.total * 100)}% aktiv</span>
                                    </div>
                                </div>
                                <div class="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-user-check text-green-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-400 text-sm font-medium">Premium foydalanuvchilar</p>
                                    <p class="text-3xl font-bold text-white mt-2">${this.siteData.users.premium}</p>
                                    <div class="flex items-center mt-2 text-purple-400 text-sm">
                                        <i class="fas fa-crown mr-1"></i>
                                        <span>${Math.round(this.siteData.users.premium / this.siteData.users.total * 100)}% premium</span>
                                    </div>
                                </div>
                                <div class="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-crown text-purple-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-400 text-sm font-medium">Challenge ishtirokchilari</p>
                                    <p class="text-3xl font-bold text-white mt-2">${this.siteData.challenge.participants.length}</p>
                                    <div class="flex items-center mt-2 text-orange-400 text-sm">
                                        <i class="fas fa-fire mr-1"></i>
                                        <span>30 kunlik challenge</span>
                                    </div>
                                </div>
                                <div class="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-trophy text-orange-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-gray-400 text-sm font-medium">Jami kitoblar</p>
                                    <p class="text-3xl font-bold text-white mt-2">${(this.siteData.books.uzbek.length + this.siteData.books.world.length)}</p>
                                    <div class="flex items-center mt-2 text-indigo-400 text-sm">
                                        <i class="fas fa-book mr-1"></i>
                                        <span>${this.siteData.books.uzbek.length} o'zbek + ${this.siteData.books.world.length} jahon</span>
                                    </div>
                                </div>
                                <div class="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                    <i class="fas fa-book-open text-indigo-400 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Navigation Tabs -->
                    <div class="bg-gray-800 rounded-2xl p-2 mb-10 border border-gray-700 shadow-xl">
                        <nav class="flex space-x-2">
                            <button onclick="adminPanel.showSection('books')" class="tab-btn active flex-1 px-6 py-3 rounded-xl text-white font-semibold transition flex items-center justify-center space-x-2">
                                <i class="fas fa-book"></i>
                                <span>Kitoblar</span>
                                <span class="bg-white/20 px-2 py-1 rounded-full text-xs">${this.siteData.books.uzbek.length + this.siteData.books.world.length}</span>
                            </button>
                            <button onclick="adminPanel.showSection('trending')" class="tab-btn flex-1 px-6 py-3 rounded-xl text-gray-400 hover:text-white font-semibold transition flex items-center justify-center space-x-2">
                                <i class="fas fa-fire"></i>
                                <span>Trending</span>
                                <span class="bg-white/10 px-2 py-1 rounded-full text-xs">10</span>
                            </button>
                            <button onclick="adminPanel.showSection('challenge')" class="tab-btn flex-1 px-6 py-3 rounded-xl text-gray-400 hover:text-white font-semibold transition flex items-center justify-center space-x-2">
                                <i class="fas fa-trophy"></i>
                                <span>Challenge</span>
                                <span class="bg-white/10 px-2 py-1 rounded-full text-xs">${this.siteData.challenge.participants.length}</span>
                            </button>
                            <button onclick="adminPanel.showSection('users')" class="tab-btn flex-1 px-6 py-3 rounded-xl text-gray-400 hover:text-white font-semibold transition flex items-center justify-center space-x-2">
                                <i class="fas fa-users"></i>
                                <span>Foydalanuvchilar</span>
                                <span class="bg-white/10 px-2 py-1 rounded-full text-xs">${this.siteData.users.total}</span>
                            </button>
                            <button onclick="adminPanel.showSection('analytics')" class="tab-btn flex-1 px-6 py-3 rounded-xl text-gray-400 hover:text-white font-semibold transition flex items-center justify-center space-x-2">
                                <i class="fas fa-chart-bar"></i>
                                <span>Analitika</span>
                                <span class="bg-white/10 px-2 py-1 rounded-full text-xs">📊</span>
                            </button>
                        </nav>
                    </div>
                    
                    <!-- Content Sections -->
                    <div id="contentArea">
                        ${this.createBooksSection()}
                    </div>
                </main>
            </div>
        `;
    }
    
    createBooksSection() {
        return `
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-white">📚 Kitoblar Boshqaruvi</h2>
                    <button onclick="adminPanel.showAddBookModal()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        <i class="fas fa-plus mr-2"></i>Yangi kitob qo'shish
                    </button>
                </div>
                
                <!-- Sub-tabs for Uzbek/World -->
                <div class="flex space-x-4 mb-6">
                    <button onclick="adminPanel.showBookCategory('uzbek')" class="book-tab-btn active px-4 py-2 bg-purple-600 text-white rounded-lg">
                        🇺🇿 O'zbek adabiyoti
                    </button>
                    <button onclick="adminPanel.showBookCategory('world')" class="book-tab-btn px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                        🌍 Jahon adabiyoti
                    </button>
                </div>
                
                <!-- Books Table -->
                <div class="overflow-x-auto">
                    <table class="w-full text-white">
                        <thead>
                            <tr class="border-b border-gray-700">
                                <th class="text-left py-3 px-4">Rasm</th>
                                <th class="text-left py-3 px-4">Nomi</th>
                                <th class="text-left py-3 px-4">Muallif</th>
                                <th class="text-left py-3 px-4">Janr</th>
                                <th class="text-left py-3 px-4">Reyting</th>
                                <th class="text-left py-3 px-4">O'quvchilar</th>
                                <th class="text-left py-3 px-4">Trend</th>
                                <th class="text-left py-3 px-4">Amallar</th>
                            </tr>
                        </thead>
                        <tbody id="booksTableBody">
                            ${this.generateBooksTableRows('uzbek')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    generateBooksTableRows(category) {
        const books = this.siteData.books[category];
        return books.map(book => `
            <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition">
                <td class="py-3 px-4">
                    <img src="${book.cover}" alt="${book.title}" class="w-12 h-16 object-cover rounded">
                </td>
                <td class="py-3 px-4 font-medium">${book.title}</td>
                <td class="py-3 px-4">${book.author}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">${book.genre}</span>
                </td>
                <td class="py-3 px-4">
                    <div class="flex items-center">
                        <i class="fas fa-star text-yellow-400 mr-1"></i>
                        ${book.rating}
                    </div>
                </td>
                <td class="py-3 px-4">${book.readers.toLocaleString()}</td>
                <td class="py-3 px-4">
                    <span class="text-green-400">${book.trend}</span>
                </td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button onclick="adminPanel.editBook(${book.id}, '${category}')" class="text-blue-400 hover:text-blue-300">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="adminPanel.deleteBook(${book.id}, '${category}')" class="text-red-400 hover:text-red-300">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    createTrendingSection() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Uzbekistan Trending -->
                <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-white">🇺🇿 O'zbekistonda Trend</h3>
                        <button onclick="adminPanel.editTrending('uzbekistan')" class="text-blue-400 hover:text-blue-300">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    <div class="space-y-3" id="uzbekTrendingList">
                        ${this.generateTrendingList('uzbekistan')}
                    </div>
                </div>
                
                <!-- Global Trending -->
                <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-bold text-white">🌍 Dunyo Trend</h3>
                        <button onclick="adminPanel.editTrending('global')" class="text-blue-400 hover:text-blue-300">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    <div class="space-y-3" id="globalTrendingList">
                        ${this.generateTrendingList('global')}
                    </div>
                </div>
            </div>
        `;
    }
    
    generateTrendingList(type) {
        const trending = this.siteData.trending[type];
        return trending.map((book, index) => `
            <div class="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div class="flex items-center space-x-3">
                    <span class="text-2xl font-bold text-gray-400">#${book.position}</span>
                    <div>
                        <h4 class="font-semibold text-white">${book.title}</h4>
                        <p class="text-sm text-gray-400">${book.author}</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-semibold text-white">${book.readers}</div>
                    <div class="text-sm text-green-400">${book.trend}</div>
                </div>
            </div>
        `).join('');
    }
    
    createChallengeSection() {
        const challenge = this.siteData.challenge;
        return `
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-white">🏆 Challenge Boshqaruvi</h2>
                    <button onclick="adminPanel.editChallenge()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <i class="fas fa-edit mr-2"></i>Tahrirlash
                    </button>
                </div>
                
                <!-- Challenge Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Nomi</h4>
                        <p class="text-white font-semibold">${challenge.title}</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Maqsad</h4>
                        <p class="text-white font-semibold">${challenge.targetBooks} kitob, ${challenge.targetDays} kun</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Ishtirokchilar</h4>
                        <p class="text-white font-semibold">${challenge.participants.length} kishi</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Sovrin</h4>
                        <p class="text-white font-semibold text-sm">${challenge.prize}</p>
                    </div>
                </div>
                
                <!-- Participants Table -->
                <div>
                    <h3 class="text-lg font-semibold text-white mb-4">Ishtirokchilar</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-white">
                            <thead>
                                <tr class="border-b border-gray-700">
                                    <th class="text-left py-3 px-4">Rank</th>
                                    <th class="text-left py-3 px-4">Ism</th>
                                    <th class="text-left py-3 px-4">Kitoblar</th>
                                    <th class="text-left py-3 px-4">Kunlar</th>
                                    <th class="text-left py-3 px-4">Holati</th>
                                    <th class="text-left py-3 px-4">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${challenge.participants.map(participant => `
                                    <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition">
                                        <td class="py-3 px-4">
                                            <span class="text-lg font-bold ${participant.rank <= 3 ? 'text-yellow-400' : 'text-gray-400'}">
                                                ${participant.rank <= 3 ? ['🥇', '🥈', '🥉'][participant.rank - 1] : `#${participant.rank}`}
                                            </span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <div class="flex items-center space-x-2">
                                                <img src="${participant.avatar}" alt="${participant.name}" class="w-8 h-8 rounded-full">
                                                <span>${participant.name}</span>
                                            </div>
                                        </td>
                                        <td class="py-3 px-4">${participant.books}</td>
                                        <td class="py-3 px-4">${participant.days}</td>
                                        <td class="py-3 px-4">
                                            <span class="px-2 py-1 ${participant.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'} rounded text-sm">
                                                ${participant.status === 'completed' ? 'Tugatgan' : 'Faol'}
                                            </span>
                                        </td>
                                        <td class="py-3 px-4">
                                            <div class="flex space-x-2">
                                                <button onclick="adminPanel.editParticipant(${participant.id})" class="text-blue-400 hover:text-blue-300">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button onclick="adminPanel.removeParticipant(${participant.id})" class="text-red-400 hover:text-red-300">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    createUsersSection() {
        return `
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 class="text-xl font-bold text-white mb-6">👥 Foydalanuvchilar Boshqaruvi</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Jami foydalanuvchilar</h4>
                        <p class="text-2xl font-bold text-white">${this.siteData.users.total.toLocaleString()}</p>
                        <p class="text-sm text-green-400">+${this.siteData.users.newThisMonth} bu oy</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Faol foydalanuvchilar</h4>
                        <p class="text-2xl font-bold text-white">${this.siteData.users.active.toLocaleString()}</p>
                        <p class="text-sm text-gray-400">${Math.round(this.siteData.users.active / this.siteData.users.total * 100)}% aktiv</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">Premium foydalanuvchilar</h4>
                        <p class="text-2xl font-bold text-white">${this.siteData.users.premium}</p>
                        <p class="text-sm text-gray-400">${Math.round(this.siteData.users.premium / this.siteData.users.total * 100)}% premium</p>
                    </div>
                    <div class="bg-gray-700/50 rounded-lg p-4">
                        <h4 class="text-gray-400 text-sm mb-2">O'rtacha reyting</h4>
                        <p class="text-2xl font-bold text-white">${this.siteData.analytics.averageRating}</p>
                        <p class="text-sm text-yellow-400">⭐ yuqori</p>
                    </div>
                </div>
                
                <div class="bg-gray-700/50 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-white mb-4">Tezkor amallar</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button class="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-envelope mr-2"></i>Barcha foydalanuvchilarga xat yuborish
                        </button>
                        <button class="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition">
                            <i class="fas fa-download mr-2"></i>Foydalanuvchilar ma'lumotlarini yuklab olish
                        </button>
                        <button class="bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition">
                            <i class="fas fa-chart-line mr-2"></i>Batafsil analitika
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createAnalyticsSection() {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 class="text-lg font-bold text-white mb-4">📊 O'qish Statistikasi</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Jami o'qilgan kitoblar</span>
                            <span class="text-white font-semibold">${this.siteData.analytics.totalBooksRead.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Jami o'qish vaqti (soat)</span>
                            <span class="text-white font-semibold">${this.siteData.analytics.totalReadingTime.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">O'rtacha reyting</span>
                            <span class="text-white font-semibold">${this.siteData.analytics.averageRating} ⭐</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Eng mashhur janr</span>
                            <span class="text-white font-semibold">${this.siteData.analytics.mostPopularGenre}</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h3 class="text-lg font-bold text-white mb-4">🎯 Sayt samaradorligi</h3>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Kunlik faol foydalanuvchilar</span>
                                <span class="text-white">1,234</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 65%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Challenge tugatish foizi</span>
                                <span class="text-white">42%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 42%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span class="text-gray-400">Premium konversiyasi</span>
                                <span class="text-white">3%</span>
                            </div>
                            <div class="w-full bg-gray-700 rounded-full h-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 3%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    initializeDashboard() {
        // Add tab switching styles
        const style = document.createElement('style');
        style.textContent = `
            .tab-btn.active {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            .book-tab-btn.active {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
        `;
        document.head.appendChild(style);
    }
    
    showSection(section) {
        const contentArea = document.getElementById('contentArea');
        const tabs = document.querySelectorAll('.tab-btn');
        
        // Update active tab
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update content
        switch(section) {
            case 'books':
                contentArea.innerHTML = this.createBooksSection();
                break;
            case 'trending':
                contentArea.innerHTML = this.createTrendingSection();
                break;
            case 'challenge':
                contentArea.innerHTML = this.createChallengeSection();
                break;
            case 'users':
                contentArea.innerHTML = this.createUsersSection();
                break;
            case 'analytics':
                contentArea.innerHTML = this.createAnalyticsSection();
                break;
        }
    }
    
    showBookCategory(category) {
        const tabs = document.querySelectorAll('.book-tab-btn');
        const tbody = document.getElementById('booksTableBody');
        
        // Update active tab
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update table
        tbody.innerHTML = this.generateBooksTableRows(category);
    }
    
    showAddBookModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">Yangi kitob qo'shish</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="addBookForm" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Kategoriya</label>
                                <select id="bookCategory" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                                    <option value="uzbek">O'zbek adabiyoti</option>
                                    <option value="world">Jahon adabiyoti</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Janr</label>
                                <input type="text" id="bookGenre" placeholder="Masalan: Klassika" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Kitob nomi</label>
                            <input type="text" id="bookTitle" placeholder="Kitob nomi..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Muallif</label>
                            <input type="text" id="bookAuthor" placeholder="Muallif nomi..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Rasm URL</label>
                            <input type="text" id="bookCover" placeholder="https://..." class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Reyting</label>
                                <input type="number" id="bookRating" min="0" max="5" step="0.1" placeholder="4.5" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">O'quvchilar</label>
                                <input type="number" id="bookReaders" placeholder="1000" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Trend</label>
                                <input type="text" id="bookTrend" placeholder="+15%" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div class="flex space-x-4 pt-4">
                            <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex-1">
                                <i class="fas fa-save mr-2"></i>Saqlash
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('addBookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewBook();
        });
    }
    
    addNewBook() {
        const category = document.getElementById('bookCategory').value;
        const newBook = {
            id: Date.now(),
            title: document.getElementById('bookTitle').value,
            author: document.getElementById('bookAuthor').value,
            cover: document.getElementById('bookCover').value || `https://picsum.photos/seed/book${Date.now()}/150/200`,
            genre: document.getElementById('bookGenre').value,
            rating: parseFloat(document.getElementById('bookRating').value) || 4.0,
            readers: parseInt(document.getElementById('bookReaders').value) || 1000,
            trend: document.getElementById('bookTrend').value || '+0%'
        };
        
        this.siteData.books[category].push(newBook);
        this.saveSiteData();
        
        // Close modal
        document.querySelector('.fixed').remove();
        
        // Refresh books section
        this.showSection('books');
        
        // Show success message
        this.showNotification('Kitob muvaffaqiyatli qo\'shildi!', 'success');
    }
    
    editBook(bookId, category) {
        const book = this.siteData.books[category].find(b => b.id === bookId);
        if (!book) return;
        
        // Create edit modal with pre-filled data
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">Kitobni tahrirlash</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editBookForm" class="space-y-4">
                        <input type="hidden" id="editBookId" value="${book.id}">
                        <input type="hidden" id="editBookCategory" value="${category}">
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Janr</label>
                                <input type="text" id="editBookGenre" value="${book.genre}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Reyting</label>
                                <input type="number" id="editBookRating" value="${book.rating}" min="0" max="5" step="0.1" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Kitob nomi</label>
                            <input type="text" id="editBookTitle" value="${book.title}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Muallif</label>
                            <input type="text" id="editBookAuthor" value="${book.author}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Rasm URL</label>
                            <input type="text" id="editBookCover" value="${book.cover}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">O'quvchilar</label>
                                <input type="number" id="editBookReaders" value="${book.readers}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Trend</label>
                                <input type="text" id="editBookTrend" value="${book.trend}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div class="flex space-x-4 pt-4">
                            <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex-1">
                                <i class="fas fa-save mr-2"></i>Saqlash
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('editBookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateBook();
        });
    }
    
    updateBook() {
        const bookId = parseInt(document.getElementById('editBookId').value);
        const category = document.getElementById('editBookCategory').value;
        const bookIndex = this.siteData.books[category].findIndex(b => b.id === bookId);
        
        if (bookIndex !== -1) {
            this.siteData.books[category][bookIndex] = {
                ...this.siteData.books[category][bookIndex],
                title: document.getElementById('editBookTitle').value,
                author: document.getElementById('editBookAuthor').value,
                cover: document.getElementById('editBookCover').value,
                genre: document.getElementById('editBookGenre').value,
                rating: parseFloat(document.getElementById('editBookRating').value),
                readers: parseInt(document.getElementById('editBookReaders').value),
                trend: document.getElementById('editBookTrend').value
            };
            
            this.saveSiteData();
            document.querySelector('.fixed').remove();
            this.showSection('books');
            this.showNotification('Kitob muvaffaqiyatli yangilandi!', 'success');
        }
    }
    
    deleteBook(bookId, category) {
        if (confirm('Bu kitobni o\'chirmoqchimisiz?')) {
            this.siteData.books[category] = this.siteData.books[category].filter(b => b.id !== bookId);
            this.saveSiteData();
            this.showSection('books');
            this.showNotification('Kitob o\'chirildi!', 'info');
        }
    }
    
    editTrending(type) {
        // Implementation for editing trending books
        this.showNotification('Trending tahrirlash funksiyasi tez orada qo\'shiladi!', 'info');
    }
    
    editChallenge() {
        const challenge = this.siteData.challenge;
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">Challenge ni tahrirlash</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editChallengeForm" class="space-y-4">
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Nomi</label>
                            <input type="text" id="challengeTitle" value="${challenge.title}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Tavsif</label>
                            <textarea id="challengeDescription" rows="3" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">${challenge.description}</textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Maqsad kitoblari</label>
                                <input type="number" id="targetBooks" value="${challenge.targetBooks}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Maqsad kunlari</label>
                                <input type="number" id="targetDays" value="${challenge.targetDays}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Sovrin</label>
                            <textarea id="challengePrize" rows="2" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">${challenge.prize}</textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Boshlanish sanasi</label>
                                <input type="date" id="startDate" value="${challenge.startDate}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Tugash sanasi</label>
                                <input type="date" id="endDate" value="${challenge.endDate}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div class="flex space-x-4 pt-4">
                            <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex-1">
                                <i class="fas fa-save mr-2"></i>Saqlash
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('editChallengeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateChallenge();
        });
    }
    
    updateChallenge() {
        this.siteData.challenge = {
            ...this.siteData.challenge,
            title: document.getElementById('challengeTitle').value,
            description: document.getElementById('challengeDescription').value,
            targetBooks: parseInt(document.getElementById('targetBooks').value),
            targetDays: parseInt(document.getElementById('targetDays').value),
            prize: document.getElementById('challengePrize').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value
        };
        
        this.saveSiteData();
        document.querySelector('.fixed').remove();
        this.showSection('challenge');
        this.showNotification('Challenge muvaffaqiyatli yangilandi!', 'success');
    }
    
    editParticipant(participantId) {
        const participant = this.siteData.challenge.participants.find(p => p.id === participantId);
        if (!participant) return;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-2xl max-w-md w-full">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-white">Ishtirokchini tahrirlash</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editParticipantForm" class="space-y-4">
                        <input type="hidden" id="participantId" value="${participant.id}">
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Ism</label>
                            <input type="text" id="participantName" value="${participant.name}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Kitoblar</label>
                                <input type="number" id="participantBooks" value="${participant.books}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                            <div>
                                <label class="block text-white/80 text-sm mb-2">Kunlar</label>
                                <input type="number" id="participantDays" value="${participant.days}" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-white/80 text-sm mb-2">Holati</label>
                            <select id="participantStatus" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                                <option value="active" ${participant.status === 'active' ? 'selected' : ''}>Faol</option>
                                <option value="completed" ${participant.status === 'completed' ? 'selected' : ''}>Tugatgan</option>
                            </select>
                        </div>
                        
                        <div class="flex space-x-4 pt-4">
                            <button type="submit" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex-1">
                                <i class="fas fa-save mr-2"></i>Saqlash
                            </button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                                Bekor qilish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('editParticipantForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateParticipant();
        });
    }
    
    updateParticipant() {
        const participantId = parseInt(document.getElementById('participantId').value);
        const participantIndex = this.siteData.challenge.participants.findIndex(p => p.id === participantId);
        
        if (participantIndex !== -1) {
            this.siteData.challenge.participants[participantIndex] = {
                ...this.siteData.challenge.participants[participantIndex],
                name: document.getElementById('participantName').value,
                books: parseInt(document.getElementById('participantBooks').value),
                days: parseInt(document.getElementById('participantDays').value),
                status: document.getElementById('participantStatus').value
            };
            
            // Re-sort by rank
            this.siteData.challenge.participants.sort((a, b) => {
                if (a.books !== b.books) return b.books - a.books;
                if (a.days !== b.days) return a.days - b.days;
                return 0;
            });
            
            // Update ranks
            this.siteData.challenge.participants.forEach((p, index) => {
                p.rank = index + 1;
            });
            
            this.saveSiteData();
            document.querySelector('.fixed').remove();
            this.showSection('challenge');
            this.showNotification('Ishtirokchi muvaffaqiyatli yangilandi!', 'success');
        }
    }
    
    removeParticipant(participantId) {
        if (confirm('Bu ishtirokchini o\'chirmoqchimisiz?')) {
            this.siteData.challenge.participants = this.siteData.challenge.participants.filter(p => p.id !== participantId);
            
            // Update ranks
            this.siteData.challenge.participants.forEach((p, index) => {
                p.rank = index + 1;
            });
            
            this.saveSiteData();
            this.showSection('challenge');
            this.showNotification('Ishtirokchi o\'chirildi!', 'info');
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
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300`;
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
    
    logout() {
        this.isLoggedIn = false;
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'index.html';
    }
}

// Initialize Admin Panel
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});
