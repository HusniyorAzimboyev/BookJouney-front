// Literature Catalog System - Book Management and User Reading Lists
class LiteratureCatalog {
    constructor() {
        this.currentCategory = 'all';
        this.currentFilter = '';
        this.currentSort = 'popular';
        this.booksPerPage = 12;
        this.currentPage = 1;
        this.isLoading = false;
        this.books = [];
        
        this.userBooks = this.loadUserBooks();
        this.usingApi = (window.CONFIG && window.CONFIG.FEATURES && window.CONFIG.FEATURES.ENABLE_BOOK_CATALOG) && (typeof apiService !== 'undefined');
        this.apiPageData = { next: null, previous: null, count: 0 };
        
        this.init();
    }
    
    // Transform API book object to expected format
    transformApiBook(apiBook) {
        return {
            id: apiBook.id,
            title: apiBook.title,
            author: apiBook.author || 'Unknown Author',
            cover: apiBook.cover || 'https://via.placeholder.com/200x300?text=No+Cover',
            genre: apiBook.genre || 'Unknown',
            rating: 4.5, // Default rating since API doesn't provide
            readers: Math.floor(Math.random() * 50000) + 1000, // Random readers count
            trend: `+${Math.floor(Math.random() * 30)}%`, // Random trend
            type: 'api', // Mark as from API
            year: new Date().getFullYear().toString(),
            pages: apiBook.pages || 0,
            description: apiBook.description || '',
            price: apiBook.price || 0,
            stock: apiBook.stock || 0,
            active_sale: apiBook.active_sale || false,
            pdf: apiBook.pdf || null
        };
    }
    
    async loadBooksFromStorage() {
        // Try to load from API first
        if (typeof apiService !== 'undefined') {
            try {
                this.isLoading = true;
                const response = await apiService.getBooks(1, 100);
                
                if (response.success && response.books && response.books.length > 0) {
                    console.log(`Loaded ${response.books.length} books from API`);
                    return response.books.map(book => this.transformApiBook(book));
                }
            } catch (error) {
                console.error('Error loading books from API:', error);
            } finally {
                this.isLoading = false;
            }
        }
        
        // Fallback to localStorage if API fails
        const adminData = localStorage.getItem('bookJourneySiteData');
        if (adminData) {
            const data = JSON.parse(adminData);
            return [
                ...data.books.uzbek.map(book => ({...book, type: 'uzbek'})),
                ...data.books.world.map(book => ({...book, type: 'world'}))
            ];
        }
        
        // Default books if no admin data
        return [
            // Uzbek Literature
            { id: 1, title: "O'tkan kunlar", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/otkan/200/300", genre: "Klassika", rating: 4.8, readers: 12500, trend: "+25%", type: "uzbek", year: "1926" },
            { id: 2, title: "Mehrobdan chayon", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mehrobdan/200/300", genre: "Klassika", rating: 4.7, readers: 8300, trend: "+18%", type: "uzbek", year: "1929" },
            { id: 3, title: "Yodgor", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/yodgor/200/300", genre: "Klassika", rating: 4.6, readers: 6700, trend: "+12%", type: "uzbek", year: "1924" },
            { id: 4, title: "Mahbublar qissasi", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mahbublar/200/300", genre: "Klassika", rating: 4.5, readers: 5400, trend: "+8%", type: "uzbek", year: "1925" },
            { id: 5, title: "Qiyomat qismati", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/qiyomat/200/300", genre: "Klassika", rating: 4.4, readers: 4200, trend: "+5%", type: "uzbek", year: "1926" },
            { id: 6, title: "Oybek to'plami", author: "Oybek", cover: "https://picsum.photos/seed/oybek/200/300", genre: "She'rlar", rating: 4.7, readers: 9800, trend: "+15%", type: "uzbek", year: "1965" },
            { id: 7, title: "Kunlar", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/kunlar/200/300", genre: "Hikoya", rating: 4.6, readers: 7600, trend: "+10%", type: "uzbek", year: "1922" },
            
            // World Literature
            { id: 8, title: "Atomic Habits", author: "James Clear", cover: "https://picsum.photos/seed/atomic/200/300", genre: "Self-Help", rating: 4.9, readers: 45200, trend: "+32%", type: "world", year: "2018" },
            { id: 9, title: "The Alchemist", author: "Paulo Coelho", cover: "https://picsum.photos/seed/alchemist/200/300", genre: "Fiction", rating: 4.8, readers: 38700, trend: "+28%", type: "world", year: "1988" },
            { id: 10, title: "1984", author: "George Orwell", cover: "https://picsum.photos/seed/1984/200/300", genre: "Dystopian", rating: 4.7, readers: 31400, trend: "+15%", type: "world", year: "1949" },
            { id: 11, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", cover: "https://picsum.photos/seed/richdad/200/300", genre: "Finance", rating: 4.6, readers: 28900, trend: "+22%", type: "world", year: "1997" },
            { id: 12, title: "Mindset", author: "Carol Dweck", cover: "https://picsum.photos/seed/mindset/200/300", genre: "Psychology", rating: 4.5, readers: 25600, trend: "+18%", type: "world", year: "2006" },
            { id: 13, title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://picsum.photos/seed/gatsby/200/300", genre: "Klassika", rating: 4.4, readers: 23400, trend: "+12%", type: "world", year: "1925" },
            { id: 14, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://picsum.photos/seed/mockingbird/200/300", genre: "Roman", rating: 4.8, readers: 31200, trend: "+20%", type: "world", year: "1960" },
            { id: 15, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://picsum.photos/seed/pride/200/300", genre: "Roman", rating: 4.7, readers: 28700, trend: "+16%", type: "world", year: "1813" },
            { id: 16, title: "The Catcher in the Rye", author: "J.D. Salinger", cover: "https://picsum.photos/seed/catcher/200/300", genre: "Roman", rating: 4.3, readers: 19800, trend: "+8%", type: "world", year: "1951" },
            { id: 17, title: "Brave New World", author: "Aldous Huxley", cover: "https://picsum.photos/seed/brave/200/300", genre: "Fantastika", rating: 4.6, readers: 22300, trend: "+14%", type: "world", year: "1932" },
            { id: 18, title: "The Lord of the Rings", author: "J.R.R. Tolkien", cover: "https://picsum.photos/seed/lotr/200/300", genre: "Fantastika", rating: 4.9, readers: 45600, trend: "+25%", type: "world", year: "1954" }
        ];
    }
    
    loadUserBooks() {
        const saved = localStorage.getItem('userReadingList');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveUserBooks() {
        localStorage.setItem('userReadingList', JSON.stringify(this.userBooks));
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadInitialBooks();
        this.addStyles();
    }
    
    async loadInitialBooks() {
        if (this.usingApi) {
            await this.fetchPage(this.currentPage);
        } else {
            this.books = await this.loadBooksFromStorage();
            this.displayBooks();
        }
    }

    // Fetch a specific page from the API and normalize results
    async fetchPage(page = 1) {
        if (!this.usingApi) return;
        console.debug('[Catalog] fetchPage', page);
        this.showLoading(true);
        try {
            this.isLoading = true;
            const resp = await apiService.getBooks(page, this.booksPerPage);
            console.debug('[Catalog] fetchPage response', resp);
            if (resp && resp.success) {
                const apiBooks = resp.books || (resp.data && resp.data.results) || resp.data || [];
                this.books = (apiBooks || []).map(b => this.transformApiBook(b));
                this.apiPageData.next = resp.next || null;
                this.apiPageData.previous = resp.previous || null;
                this.apiPageData.count = resp.count || (Array.isArray(resp.books) ? resp.books.length : 0);
                this.currentPage = page;
                this.displayBooks();
            } else {
                console.warn('No books returned from API', resp);
                // fallback to local
                this.books = await this.loadBooksFromStorage();
                this.displayBooks();
            }
        } catch (err) {
            console.error('Error fetching page from API:', err);
            this.books = await this.loadBooksFromStorage();
            this.displayBooks();
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .category-btn {
                @apply text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200;
            }
            .category-btn.active {
                @apply bg-purple-600 text-white hover:bg-purple-700;
            }
            .book-card {
                @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer;
            }
            .book-card:hover {
                transform: translateY(-4px);
            }
            .reading-badge {
                @apply absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('literatureSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilter = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.displayBooks();
            });
        }
        
        // Genre filter
        const genreFilter = document.getElementById('genreFilter');
        if (genreFilter) {
            genreFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.currentPage = 1;
                this.displayBooks();
            });
        }
        
        // Sort functionality
        const sortBy = document.getElementById('sortBy');
        if (sortBy) {
            sortBy.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.displayBooks();
            });
        }
    }
    
    
    showLiteratureCategory(category, clickedElement) {
        this.currentCategory = category;
        this.currentPage = 1;

        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));

        // If caller provided the clicked element, use it; otherwise try to find a matching button
        if (clickedElement && clickedElement.classList) {
            clickedElement.classList.add('active');
        } else {
            // best-effort: find first button that contains the category text or matches the previous active
            const btn = Array.from(document.querySelectorAll('.category-btn')).find(b => {
                return b.getAttribute('onclick')?.includes(`showLiteratureCategory('${category}')`);
            });
            if (btn) btn.classList.add('active');
        }

        this.displayBooks();
    }
    
    getFilteredBooks() {
        let filteredBooks = [...this.books];
        
        // Filter by category
        if (this.currentCategory === 'uzbek') {
            filteredBooks = filteredBooks.filter(book => book.type === 'uzbek');
        } else if (this.currentCategory === 'world') {
            filteredBooks = filteredBooks.filter(book => book.type === 'world');
        } else if (this.currentCategory === 'my-books') {
            return this.userBooks;
        }
        
        // Filter by search term
        if (this.currentFilter) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(this.currentFilter) ||
                book.author.toLowerCase().includes(this.currentFilter) ||
                book.genre.toLowerCase().includes(this.currentFilter)
            );
        }
        
        // Filter by genre
        const genreFilter = document.getElementById('genreFilter')?.value;
        if (genreFilter) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase() === genreFilter.toLowerCase()
            );
        }
        
        // Sort books
        filteredBooks.sort((a, b) => {
            switch (this.currentSort) {
                case 'popular':
                    return b.readers - a.readers;
                case 'newest':
                    return (b.year || 0) - (a.year || 0);
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
        return filteredBooks;
    }
    
    displayBooks() {
        const booksGrid = document.getElementById('literatureBooksGrid');
        if (!booksGrid) return;
        // clicking empty grid area moves to next page; avoid when clicking a card
        booksGrid.onclick = (e) => {
            if (e.target === booksGrid) {
                this.goToNextPage();
            }
        };
        
        const filteredBooks = this.getFilteredBooks();
        let booksToShow;
        if (this.usingApi) {
            // API already returns one page of results; no additional slicing
            booksToShow = filteredBooks;
        } else {
            const startIndex = (this.currentPage - 1) * this.booksPerPage;
            const endIndex = startIndex + this.booksPerPage;
            booksToShow = filteredBooks.slice(startIndex, endIndex);
        }
        
        if (booksToShow.length === 0) {
            booksGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                    <p class="text-xl text-gray-500">Kitoblar topilmadi</p>
                </div>
            `;
            return;
        }
        
        booksGrid.innerHTML = booksToShow.map(book => this.createBookCard(book)).join('');
        
        // Render pagination controls (prev/next arrows)
        this.renderPaginationControls(filteredBooks.length);
    }

    renderPaginationControls(totalFilteredCount = 0) {
        let container = document.getElementById('literaturePagination');
        if (!container) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = `\n                <div id="literaturePagination" class="flex items-center justify-center space-x-4 mt-6">\n                    <button id="literaturePrevBtn" class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">◀</button>\n                    <span id="literaturePageInfo" class="text-sm text-gray-600"></span>\n                    <button id="literatureNextBtn" class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">▶</button>\n                </div>\n            `;
            const booksGrid = document.getElementById('literatureBooksGrid');
            if (booksGrid && booksGrid.parentNode) {
                booksGrid.parentNode.insertBefore(wrapper, booksGrid.nextSibling);
            } else {
                document.body.appendChild(wrapper);
            }
            container = document.getElementById('literaturePagination');
        }

        const prevBtn = document.getElementById('literaturePrevBtn');
        const nextBtn = document.getElementById('literatureNextBtn');
        const pageInfo = document.getElementById('literaturePageInfo');

        if (prevBtn) prevBtn.onclick = (e) => { e.preventDefault(); this.goToPreviousPage(); };
        if (nextBtn) nextBtn.onclick = (e) => { e.preventDefault(); this.goToNextPage(); };

        const staticPrev = document.getElementById('staticPrevArrow');
        const staticNext = document.getElementById('staticNextArrow');

        // attach click handlers so arrows are functional
        if (staticPrev) staticPrev.onclick = () => this.goToPreviousPage();
        if (staticNext) staticNext.onclick = () => this.goToNextPage();

        if (this.usingApi) {
            const hasPrev = !!this.apiPageData.previous;
            const hasNext = !!this.apiPageData.next;
            if (prevBtn) prevBtn.disabled = !hasPrev;
            if (nextBtn) nextBtn.disabled = !hasNext;
            if (pageInfo) pageInfo.textContent = `Sahifa ${this.currentPage}`;
            if (staticPrev) staticPrev.classList.toggle('text-black', hasPrev);
            if (staticPrev) staticPrev.classList.toggle('text-gray-400', !hasPrev);
            if (staticNext) staticNext.classList.toggle('text-black', hasNext);
            if (staticNext) staticNext.classList.toggle('text-gray-400', !hasNext);
        } else {
            const totalPages = Math.max(1, Math.ceil(totalFilteredCount / this.booksPerPage));
            const hasPrev = this.currentPage > 1;
            const hasNext = this.currentPage < totalPages;
            if (prevBtn) prevBtn.disabled = !hasPrev;
            if (nextBtn) nextBtn.disabled = !hasNext;
            if (pageInfo) pageInfo.textContent = `Sahifa ${this.currentPage} / ${totalPages}`;
            if (staticPrev) staticPrev.classList.toggle('text-black', hasPrev);
            if (staticPrev) staticPrev.classList.toggle('text-gray-400', !hasPrev);
            if (staticNext) staticNext.classList.toggle('text-black', hasNext);
            if (staticNext) staticNext.classList.toggle('text-gray-400', !hasNext);
        }
    }

    showLoading(show) {
        const ov = document.getElementById('loadingOverlay');
        if (ov) ov.style.display = show ? 'flex' : 'none';
    }

    goToNextPage() {
        console.debug('[Catalog] goToNextPage currentPage=', this.currentPage, 'apiPageData.next=', this.apiPageData.next);
        if (this.usingApi) {
            if (!this.apiPageData.next) return;
            const nextPage = this.currentPage + 1;
            console.debug('[Catalog] requesting page', nextPage);
            this.fetchPage(nextPage);
        } else {
            const filteredBooks = this.getFilteredBooks();
            const totalPages = Math.max(1, Math.ceil(filteredBooks.length / this.booksPerPage));
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayBooks();
            }
        }
    }

    goToPreviousPage() {
        console.debug('[Catalog] goToPreviousPage currentPage=', this.currentPage, 'apiPageData.previous=', this.apiPageData.previous);
        if (this.usingApi) {
            if (!this.apiPageData.previous) return;
            const prevPage = Math.max(1, this.currentPage - 1);
            console.debug('[Catalog] requesting page', prevPage);
            this.fetchPage(prevPage);
        } else {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayBooks();
            }
        }
    }
    
    createBookCard(book) {
        const isInUserBooks = this.userBooks.some(userBook => userBook.id === book.id);
        const progress = isInUserBooks ? this.userBooks.find(userBook => userBook.id === book.id).progress : 0;
        
        return `
            <div class="book-card overflow-hidden" onclick="literatureCatalog.showBookDetails(${book.id})">
                <div class="relative">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover">
                    ${progress > 0 ? `<div class="reading-badge">${progress}% o'qilmoqda</div>` : ''}
                    <div class="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ${book.type === 'uzbek' ? '🇺🇿' : '🌍'}
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-1 text-gray-800 line-clamp-1">${book.title}</h3>
                    <p class="text-gray-600 text-sm mb-2">${book.author}</p>
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center space-x-2">
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">${book.genre}</span>
                            <div class="flex items-center">
                                <i class="fas fa-star text-yellow-400 text-sm"></i>
                                <span class="text-sm text-gray-700 ml-1">${book.rating}</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-gray-500">${book.readers.toLocaleString()} o'quvchi</div>
                            <div class="text-xs text-green-600 font-semibold">${book.trend}</div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <button onclick="event.stopPropagation(); literatureCatalog.toggleBookInList(${book.id})" 
                                class="px-4 py-2 ${isInUserBooks ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'} text-white rounded-lg text-sm font-medium transition">
                            ${isInUserBooks ? '🗑️ Ro\'yxatdan olib tashlash' : '📚 Ro\'yxatga qo\'shish'}
                        </button>
                        <button onclick="event.stopPropagation(); literatureCatalog.showBookDetails(${book.id})" 
                                class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition">
                            🔍 Batafsil
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    toggleBookInList(bookId) {
        const existingIndex = this.userBooks.findIndex(book => book.id === bookId);
        
        if (existingIndex > -1) {
            // Remove from user books
            this.userBooks.splice(existingIndex, 1);
            this.showNotification('Kitob ro\'yxatdan olib tashlandi', 'info');
        } else {
            // Add to user books
            const book = this.books.find(b => b.id === bookId);
            if (book) {
                this.userBooks.push({
                    ...book,
                    addedDate: new Date().toISOString(),
                    progress: 0,
                    status: 'want-to-read'
                });
                this.showNotification('Kitob ro\'yxatga qo\'shildi', 'success');
            }
        }
        
        this.saveUserBooks();
        this.displayBooks();
    }
    
    showBookDetails(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;
        
        const userBook = this.userBooks.find(ub => ub.id === bookId);
        const progress = userBook ? userBook.progress || 0 : 0;
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="relative">
                    <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition z-10">
                        <i class="fas fa-times text-gray-600"></i>
                    </button>
                    <div class="grid md:grid-cols-2">
                        <div>
                            <img src="${book.cover}" alt="${book.title}" class="w-full h-96 object-cover">
                        </div>
                        <div class="p-8">
                            <div class="flex items-center space-x-2 mb-4">
                                <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                                    ${book.type === 'uzbek' ? '🇺🇿 O\'zbek' : '🌍 Jahon'}
                                </span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                                    ${book.genre}
                                </span>
                            </div>
                            
                            <h2 class="text-3xl font-bold text-gray-800 mb-2">${book.title}</h2>
                            <p class="text-xl text-gray-600 mb-4">${book.author}</p>
                            
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <div class="text-sm text-gray-500">Reyting</div>
                                    <div class="flex items-center">
                                        <i class="fas fa-star text-yellow-400"></i>
                                        <span class="text-lg font-semibold ml-1">${book.rating}</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">O'quvchilar</div>
                                    <div class="text-lg font-semibold">${book.readers.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">Yili</div>
                                    <div class="text-lg font-semibold">${book.year || 'Noma\'lum'}</div>
                                </div>
                                <div>
                                    <div class="text-sm text-gray-500">Trend</div>
                                    <div class="text-lg font-semibold text-green-600">${book.trend}</div>
                                </div>
                            </div>
                            
                            ${progress > 0 ? `
                                <div class="mb-6">
                                    <div class="flex justify-between text-sm mb-2">
                                        <span class="text-gray-600">O'qish progressi</span>
                                        <span class="font-semibold">${progress}%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-3">
                                        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            <div class="flex space-x-3">
                                <button onclick="literatureCatalog.startReading(${book.id})" class="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex-1">
                                    <i class="fas fa-book-open mr-2"></i>
                                    O'qishni boshlash
                                </button>
                                <button onclick="literatureCatalog.toggleBookInList(${book.id})" class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                                    ${userBook ? '🗑️ Ro\'yxatdan olib tashlash' : '📚 Ro\'yxatga qo\'shish'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    startReading(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;
        
        const userBook = this.userBooks.find(ub => ub.id === bookId);
        if (userBook) {
            userBook.status = 'reading';
            userBook.startDate = new Date().toISOString();
            userBook.progress = 0;
        } else {
            this.userBooks.push({
                ...book,
                addedDate: new Date().toISOString(),
                status: 'reading',
                startDate: new Date().toISOString(),
                progress: 0
            });
        }
        
        this.saveUserBooks();
        this.showNotification(`"${book.title}" kitobini o'qishni boshladingiz!`, 'success');
        document.querySelector('.fixed')?.remove();
        this.displayBooks();
    }
    
    loadMoreBooks() {
        if (this.usingApi) {
            // request next page from API
            const nextPage = this.currentPage + 1;
            this.fetchPage(nextPage);
        } else {
            this.currentPage++;
            this.displayBooks();
        }
    }
    
    showNotification(message, type = 'info') {
        const colors = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500'
        };
        
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
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
}

// Global functions for onclick handlers
let literatureCatalog;
document.addEventListener('DOMContentLoaded', async () => {
    literatureCatalog = new LiteratureCatalog();
});

function showLiteratureCategory(category, el) {
    literatureCatalog.showLiteratureCategory(category, el);
}

function loadMoreBooks() {
    literatureCatalog.loadMoreBooks();
}
