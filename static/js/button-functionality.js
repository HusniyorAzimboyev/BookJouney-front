// Complete Button Functionality for Book Journey
class ButtonManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoginButton();
        this.setupNavigationButtons();
        this.setupHeroButtons();
        this.setupLiteratureButtons();
        this.setupFooterButtons();
        this.setupModalButtons();
        this.setupSearchButtons();
        this.setupFilterButtons();
        this.setupAIButtons();
        this.setupMobileMenu();
    }

    // Login Button Functionality
    setupLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-md w-full transform transition-all">
                <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-black">Tizimga kirish</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="loginForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" placeholder="email@example.com">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Parol</label>
                            <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" placeholder="••••••••">
                        </div>
                        <div class="flex items-center justify-between">
                            <label class="flex items-center">
                                <input type="checkbox" class="mr-2">
                                <span class="text-sm text-gray-600">Eslab qolish</span>
                            </label>
                            <a href="#" class="text-sm text-purple-600 hover:underline">Parolni unutdingiz?</a>
                        </div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                            Kirish
                        </button>
                        <div class="text-center text-sm text-gray-600">
                            Hisobingiz yo'qmi? <a href="#" class="text-purple-600 hover:underline">Ro'yxatdan o'tish</a>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Form submission
        modal.querySelector('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.showToast('Muvaffaqiyatli kirildi!', 'success');
            modal.remove();
        });
    }

    // Navigation Buttons
    setupNavigationButtons() {
        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Hero Section Buttons
    setupHeroButtons() {
        // Boshlash button - find by text content to support older browsers
        const startBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Boshlash'));
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.showToast('Book Journey ga xush kelibsiz!', 'success');
                // Scroll to literature section
                const literatureSection = document.getElementById('literature');
                if (literatureSection) {
                    literatureSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Demo button - find by text
        const demoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Demo'));
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.showDemoModal();
            });
        }
    }

    showDemoModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-black">Book Journey Demo</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="bg-purple-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-2">🤖 AI Tavsiyalar</h3>
                            <p class="text-gray-600">Sun'iy intellekt sizga shaxsiy tavsiyalar beradi</p>
                        </div>
                        <div class="bg-blue-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-2">📚 10K+ Kitoblar</h3>
                            <p class="text-gray-600">O'zbek va jahon adabiyotining eng yaxshilari</p>
                        </div>
                        <div class="bg-green-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-2">🎯 30 Kunlik Challenge</h3>
                            <p class="text-gray-600">30 kunda 5 ta kitob o'qing, sovrinni qo'lga kiriting!</p>
                        </div>
                        <div class="bg-pink-50 p-6 rounded-lg">
                            <h3 class="font-semibold text-lg mb-2">📊 Progress Tracking</h3>
                            <p class="text-gray-600">O'qish progressingizni kuzatib boring</p>
                        </div>
                    </div>
                    
                    <div class="mt-8 flex space-x-4">
                        <button class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition" onclick="this.closest('.fixed').remove()">
                            Demo ni boshlash
                        </button>
                        <button class="flex-1 border border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition" onclick="this.closest('.fixed').remove()">
                            Yopish
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Literature Section Buttons
    setupLiteratureButtons() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('bg-purple-600', 'text-white');
                    b.classList.add('text-black');
                });
                
                // Add active class to clicked button
                btn.classList.add('bg-purple-600', 'text-white');
                btn.classList.remove('text-black');
                
                const category = btn.textContent.trim();
                this.showToast(`${category} kategoriyasi tanlandi`, 'info');
                
                // Here you would typically filter the books
                this.filterBooksByCategory(category);
            });
        });

        // Load more button
        const loadMoreBtn = document.querySelector('button:has(i.fa-plus)');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.showToast('Yana kitoblar yuklanmoqda...', 'info');
                // Simulate loading more books
                setTimeout(() => {
                    this.showToast('12 ta yangi kitob yuklandi', 'success');
                }, 1000);
            });
        }
    }

    filterBooksByCategory(category) {
        // This would integrate with the literature catalog
        console.log(`Filtering books by category: ${category}`);
        // The actual filtering is handled by literature-catalog.js
    }

    // Footer Buttons
    setupFooterButtons() {
        // Newsletter subscription
        const newsletterForm = document.querySelector('footer form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                if (email) {
                    this.showToast('Yangiliklarga obuna bo\'ldingiz!', 'success');
                    newsletterForm.reset();
                }
            });
        }

        // Admin button (already handled by onclick attribute)
        // Social media buttons
        document.querySelectorAll('footer a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Ijtimoiy tarmoq sahifasi ochiladi', 'info');
            });
        });
    }

    // Modal Buttons
    setupModalButtons() {
        // Close modal buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal') || 
                e.target.closest('.close-modal')) {
                const modal = e.target.closest('.fixed');
                if (modal) modal.remove();
            }
        });

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fixed') && 
                e.target.classList.contains('inset-0')) {
                e.target.remove();
            }
        });
    }

    // Search Buttons
    setupSearchButtons() {
        // Literature search
        const searchInput = document.getElementById('literatureSearch');
        const searchBtn = document.querySelector('button:has(i.fa-filter)');
        
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value);
                }
            });

            // Real-time search with debounce
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(searchInput.value);
                }, 300);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchValue = searchInput ? searchInput.value : '';
                this.performSearch(searchValue);
            });
        }
    }

    performSearch(query) {
        if (query.length < 2) {
            this.showToast('Iltimos, kamida 2 ta harf kiriting', 'warning');
            return;
        }
        this.showToast(`"${query}" uchun qidiruv amalga oshirilmoqda...`, 'info');
        // Actual search is handled by literature-catalog.js
    }

    // Filter Buttons
    setupFilterButtons() {
        // Genre filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            genreFilter.addEventListener('change', () => {
                const genre = genreFilter.value;
                if (genre) {
                    this.showToast(`${genre} janri tanlandi`, 'info');
                }
            });
        }

        // Sort filter
        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            sortBy.addEventListener('change', () => {
                const sort = sortBy.value;
                this.showToast(`Kitoblar ${sortBy.options[sortBy.selectedIndex].text} bo'yicha saralandi`, 'info');
            });
        }
    }

    // AI Search Buttons
    setupAIButtons() {
        const aiSearchBtn = document.getElementById('aiSearchBtn');
        const aiSearchInput = document.getElementById('aiSearchInput');
        
        if (aiSearchBtn) {
            aiSearchBtn.addEventListener('click', () => {
                const query = aiSearchInput ? aiSearchInput.value.trim() : '';
                if (query.length < 5) {
                    this.showToast("Iltimos, batafsil so'rov kiriting (kamida 5 ta harf)", 'warning');
                    return;
                }
                this.performAISearch(query);
            });
        }

        if (aiSearchInput) {
            aiSearchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    aiSearchBtn.click();
                }
            });
        }
    }

    performAISearch(query) {
        this.showToast('AI qidiruv amalga oshirilmoqda...', 'info');
        
        // Simulate AI processing
        setTimeout(() => {
            this.showToast('AI siz uchun 3 ta kitob topdi!', 'success');
            // The actual AI search is handled by ai-features.js
        }, 1500);
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        let mobileMenu = null;

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                if (!mobileMenu) {
                    this.createMobileMenu();
                } else {
                    this.toggleMobileMenu();
                }
            });
        }
    }

    createMobileMenu() {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 bg-white z-50 md:hidden';
        mobileMenu.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="flex justify-between items-center p-6 border-b">
                    <div class="flex items-center space-x-2">
                        <div class="w-10 h-10 logo-container rounded-lg flex items-center justify-center">
                            <div class="w-6 h-6 logo-inner rounded flex items-center justify-center">
                                <span class="logo-text text-purple-600 font-bold text-sm">BJ</span>
                            </div>
                        </div>
                        <span class="text-xl font-bold text-gradient">Book Journey</span>
                    </div>
                    <button class="close-mobile-menu text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <nav class="flex-1 p-6 space-y-4">
                    <a href="#home" class="block text-lg text-gray-700 hover:text-purple-600 transition">Bosh sahifa</a>
                    <a href="#ai-search" class="block text-lg text-gray-700 hover:text-purple-600 transition">AI Qidiruv</a>
                    <a href="#literature" class="block text-lg text-gray-700 hover:text-purple-600 transition">Adabiyot</a>
                    <a href="#trending" class="block text-lg text-gray-700 hover:text-purple-600 transition">Trend</a>
                    <a href="#challenge" class="block text-lg text-gray-700 hover:text-purple-600 transition">Challenge</a>
                    <button class="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition w-full">
                        Kirish
                    </button>
                </nav>
            </div>
        `;

        document.body.appendChild(mobileMenu);

        // Close menu functionality
        mobileMenu.querySelector('.close-mobile-menu').addEventListener('click', () => {
            mobileMenu.remove();
            window.mobileMenu = null;
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.remove();
                window.mobileMenu = null;
            });
        });

        window.mobileMenu = mobileMenu;
    }

    // Toast notification system
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

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize button functionality
document.addEventListener('DOMContentLoaded', () => {
    window.buttonManager = new ButtonManager();
});

// Make showToast globally available
window.showToast = function(message, type) {
    if (window.buttonManager) {
        window.buttonManager.showToast(message, type);
    }
};
