// Book Journey - Modern Interactive JavaScript

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
let mobileMenu = null;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 bg-white z-40 md:hidden';
        mobileMenu.innerHTML = `
            <div class="flex flex-col p-6 space-y-6">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-book-open text-2xl text-purple-600"></i>
                        <span class="text-xl font-bold text-gradient">Book Journey</span>
                    </div>
                    <button id="closeMobileMenu" class="text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="flex flex-col space-y-4">
                    <a href="#home" class="text-gray-700 hover:text-purple-600 transition text-lg">Bosh sahifa</a>
                    <a href="#features" class="text-gray-700 hover:text-purple-600 transition text-lg">Imkoniyatlar</a>
                    <a href="#books" class="text-gray-700 hover:text-purple-600 transition text-lg">Kitoblar</a>
                    <a href="#about" class="text-gray-700 hover:text-purple-600 transition text-lg">Biz haqimizda</a>
                    <button class="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition w-fit">
                        Kirish
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(mobileMenu);
        
        // Close menu functionality
        document.getElementById('closeMobileMenu').addEventListener('click', closeMobileMenu);
        
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    } else {
        mobileMenu.style.display = 'flex';
    }
    });
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Books data
const booksData = [
    {
        title: "Alchemist",
        author: "Paulo Coelho",
        cover: "https://picsum.photos/seed/alchemist/200/300",
        rating: 4.8,
        price: "Bepul"
    },
    {
        title: "1984",
        author: "George Orwell",
        cover: "https://picsum.photos/seed/1984/200/300",
        rating: 4.7,
        price: "Bepul"
    },
    {
        title: "Little Prince",
        author: "Antoine de Saint",
        cover: "https://picsum.photos/seed/prince/200/300",
        rating: 4.9,
        price: "Bepul"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        cover: "https://picsum.photos/seed/pride/200/300",
        rating: 4.6,
        price: "Bepul"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://picsum.photos/seed/gatsby/200/300",
        rating: 4.5,
        price: "Bepul"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        cover: "https://picsum.photos/seed/mockingbird/200/300",
        rating: 4.8,
        price: "Bepul"
    },
    {
        title: "Animal Farm",
        author: "George Orwell",
        cover: "https://picsum.photos/seed/animalfarm/200/300",
        rating: 4.4,
        price: "Bepul"
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        cover: "https://picsum.photos/seed/brave/200/300",
        rating: 4.3,
        price: "Bepul"
    }
];

// Load books dynamically
function loadBooks() {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return; // guard: page may not include a #booksGrid container
    console.log(booksData);
    booksData.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105';
        bookCard.style.animationDelay = `${index * 0.1}s`;
        
        bookCard.innerHTML = `
            <div class="relative">
                <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover">
                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span class="text-sm font-semibold text-purple-600">${book.price}</span>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
                <p class="text-gray-600 text-sm mb-2">${book.author}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400 text-sm"></i>
                        <span class="text-sm font-medium">${book.rating}</span>
                    </div>
                    <button class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition">
                        O'qish
                    </button>
                </div>
            </div>
        `;
        
        // Add animation
        bookCard.style.opacity = '0';
        bookCard.style.transform = 'translateY(20px)';
        
        booksGrid.appendChild(bookCard);
        
        // Animate in
        setTimeout(() => {
            bookCard.style.transition = 'all 0.5s ease';
            bookCard.style.opacity = '1';
            bookCard.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
        
        // Add click event
        bookCard.addEventListener('click', () => {
            showBookDetails(book);
        });
    });
}

// Show book details modal
function showBookDetails(book) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
            <div class="relative">
                <button id="closeModal" class="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition z-10">
                    <i class="fas fa-times text-gray-700"></i>
                </button>
                <img src="${book.cover}" alt="${book.title}" class="w-full h-64 object-cover rounded-t-2xl">
            </div>
            <div class="p-8">
                <h2 class="text-3xl font-bold mb-2">${book.title}</h2>
                <p class="text-xl text-gray-600 mb-4">${book.author}</p>
                <div class="flex items-center space-x-4 mb-6">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span class="font-semibold">${book.rating}</span>
                    </div>
                    <span class="text-gray-400">|</span>
                    <span class="text-purple-600 font-semibold">${book.price}</span>
                </div>
                <p class="text-gray-600 mb-6">
                    Bu ajoyib kitob sizni yangi dunyoga olib boradi. Katta sarguzashtlar 
                    va qiziqarli hikoyalar sizni kutmoqda. Kitobni o'qib chiqib, o'z fikrlaringizni 
                    boshqa o'quvchilar bilan baham ko'ring.
                </p>
                <div class="flex space-x-4">
                    <button class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex-1">
                        <i class="fas fa-book-open mr-2"></i>
                        Hozir o'qish
                    </button>
                    <button class="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition">
                        <i class="fas fa-heart mr-2"></i>
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Scroll animations
function handleScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.floating');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (scrolled > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    
    // Observe elements for animation
    document.querySelectorAll('.book-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Search functionality
function addSearchFeature() {
    const searchSection = document.createElement('section');
    searchSection.className = 'py-20 bg-gradient-to-r from-purple-50 to-pink-50';
    searchSection.innerHTML = `
        <div class="container mx-auto px-6">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold mb-6">Kitob qidiring</h2>
                <div class="relative">
                    <input 
                        type="text" 
                        id="searchInput"
                        placeholder="Kitob nomi yoki muallif..." 
                        class="w-full px-6 py-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500 text-lg"
                    >
                    <button id="searchBtn" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white w-10 h-10 rounded-full hover:bg-purple-700 transition">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div id="searchResults" class="mt-8 grid md:grid-cols-3 gap-4"></div>
            </div>
        </div>
    `;
    
    // Insert after hero section
    const heroSection = document.getElementById('home');
    heroSection.parentNode.insertBefore(searchSection, heroSection.nextSibling);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = booksData.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );
        
        searchResults.innerHTML = results.map(book => `
            <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <div class="flex items-center space-x-4">
                    <img src="${book.cover}" alt="${book.title}" class="w-16 h-20 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-semibold">${book.title}</h4>
                        <p class="text-sm text-gray-600">${book.author}</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <span class="text-sm text-yellow-500">★ ${book.rating}</span>
                            <span class="text-sm text-purple-600 font-semibold">${book.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-500 col-span-3">Hech narsa topilmadi</p>';
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Real-time search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
}

// Add search feature after page load
setTimeout(addSearchFeature, 1000);
