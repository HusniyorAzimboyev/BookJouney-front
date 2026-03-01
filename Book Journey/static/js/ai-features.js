// Book Journey AI Features - Advanced Interactive JavaScript

// AI Search with Smart Recommendations
class AISearchEngine {
    constructor() {
        this.aiRecommendations = [
            {
                title: "Atomic Habits",
                author: "James Clear",
                reason: "Misol uchun kichik o'zgarishlar katta natijalarga olib keladi",
                cover: "https://picsum.photos/seed/atomic/200/300",
                rating: 4.8,
                match: 95
            },
            {
                title: "Alkimyogar",
                author: "Paulo Coelho", 
                reason: "Hayotiy sarguzashtlar va ma'naviyat haqida motivatsion kitob",
                cover: "https://picsum.photos/seed/alchemist/200/300",
                rating: 4.9,
                match: 92
            },
            {
                title: "O'tkan kunlar",
                author: "Abdulla Qodiriy",
                reason: "O'zbek adabiyotining cho'qqisi, hayotiy darslar",
                cover: "https://picsum.photos/seed/otkan/200/300",
                rating: 4.7,
                match: 88
            }
        ];
        
        this.init();
    }
    
    init() {
        const searchBtn = document.getElementById('aiSearchBtn');
        const searchInput = document.getElementById('aiSearchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performAISearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.performAISearch();
                }
            });
        }
    }
    
    performAISearch() {
        const input = document.getElementById('aiSearchInput');
        const query = input.value.trim();
        const resultsDiv = document.getElementById('aiRecommendations');
        
        if (!query) {
            resultsDiv.innerHTML = '<p class="text-gray-500 col-span-3 text-center">Iltimos, qidiruv so\'rovini kiriting</p>';
            return;
        }
        
        // Show loading state
        resultsDiv.innerHTML = `
            <div class="col-span-3 text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p class="text-gray-500 mt-2">AI tavsiyalarni tayyorlayapti...</p>
            </div>
        `;
        
        // Simulate AI processing
        setTimeout(() => {
            this.displayAIRecommendations(query);
        }, 1500);
    }
    
    displayAIRecommendations(query) {
        const resultsDiv = document.getElementById('aiRecommendations');
        
        // Filter recommendations based on query
        const filtered = this.aiRecommendations.filter(book => {
            const searchText = `${book.title} ${book.author} ${book.reason}`.toLowerCase();
            return searchText.includes(query.toLowerCase()) || 
                   query.toLowerCase().includes('motivatsion') ||
                   query.toLowerCase().includes('hayotiy') ||
                   query.toLowerCase().includes('qisqa');
        });
        
        if (filtered.length === 0) {
            resultsDiv.innerHTML = '<p class="text-gray-500 col-span-3 text-center">Afsuski, mos kitob topilmadi</p>';
            return;
        }
        
        resultsDiv.innerHTML = filtered.map((book, index) => `
            <div class="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" 
                 style="animation: fadeInUp 0.5s ease ${index * 0.1}s both">
                <div class="relative mb-3">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-32 object-cover rounded-lg">
                    <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        ${book.match}% mos
                    </div>
                </div>
                <h4 class="font-semibold text-sm mb-1">${book.title}</h4>
                <p class="text-xs text-gray-600 mb-2">${book.author}</p>
                <p class="text-xs text-purple-600 mb-2 line-clamp-2">${book.reason}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400 text-xs"></i>
                        <span class="text-xs">${book.rating}</span>
                    </div>
                    <button class="bg-purple-600 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-700 transition" onclick="aiFeatures.openBookDetails('${book.title}')">
                        O'qish
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    openBookDetails(title) {
        const book = this.aiRecommendations.find(b => b.title === title);
        if (book) {
            showBookDetails(book);
        }
    }
}

// Text-to-Speech Engine
class TextToSpeechEngine {
    constructor() {
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPlaying = false;
        this.currentVoice = null;
        this.speechRate = 1.0;
        
        this.init();
    }
    
    init() {
        // Load voices
        this.loadVoices();
        
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synthesis.getVoices();
        this.maleVoice = this.voices.find(voice => voice.name.includes('Male') || voice.lang.includes('uz'));
        this.femaleVoice = this.voices.find(voice => voice.name.includes('Female') || voice.name.includes('Zira'));
        
        if (!this.maleVoice) this.maleVoice = this.voices[0];
        if (!this.femaleVoice) this.femaleVoice = this.voices[1] || this.voices[0];
    }
    
    speak(text, options = {}) {
        if (this.isPlaying) {
            this.stop();
            return;
        }
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        const voice = options.gender === 'female' ? this.femaleVoice : this.maleVoice;
        if (voice) this.currentUtterance.voice = voice;
        
        // Set rate
        this.currentUtterance.rate = options.rate || this.speechRate;
        this.currentUtterance.pitch = options.pitch || 1;
        this.currentUtterance.volume = options.volume || 1;
        
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            this.updatePlayButton(true);
        };
        
        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.updatePlayButton(false);
        };
        
        this.synthesis.speak(this.currentUtterance);
    }
    
    stop() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
            this.isPlaying = false;
            this.updatePlayButton(false);
        }
    }
    
    updatePlayButton(playing) {
        const playBtn = document.getElementById('playBtn');
        if (playBtn) {
            playBtn.innerHTML = playing ? 
                '<i class="fas fa-pause"></i>' : 
                '<i class="fas fa-play"></i>';
        }
    }
    
    createTTSControls(bookContent) {
        return `
            <div class="bg-purple-50 rounded-xl p-4 mb-4">
                <h4 class="font-semibold mb-3">🎤 Ovozli o'qish</h4>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Ovoz</label>
                        <select id="voiceSelect" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                            <option value="male">Erkak ovozi</option>
                            <option value="female">Ayol ovozi</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tezlik</label>
                        <input type="range" id="speedControl" min="0.5" max="2" step="0.1" value="1" 
                               class="w-full accent-purple-600">
                        <div class="text-center text-sm text-gray-600">
                            <span id="speedValue">1.0x</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button id="playBtn" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex-1">
                        <i class="fas fa-play mr-2"></i>O'qishni boshlash
                    </button>
                    <button id="downloadAudio" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        <i class="fas fa-download mr-2"></i>Yuklab olish
                    </button>
                </div>
            </div>
        `;
    }
}

// Personal Recommendation System
class PersonalRecommendationSystem {
    constructor() {
        this.userPreferences = {
            genres: [],
            lastRead: null,
            language: 'uz',
            readingHistory: []
        };
        
        this.weeklyRecommendations = [];
        this.init();
    }
    
    init() {
        this.setupUserPreferences();
        this.generateWeeklyRecommendations();
    }
    
    setupUserPreferences() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showPreferencesModal());
        }
    }
    
    showPreferencesModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-8">
                    <h2 class="text-3xl font-bold mb-6">👤 Shaxsiy Tavsiyalar</h2>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Qaysi janrlar yoqadi?</label>
                            <div class="grid grid-cols-2 gap-3">
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="motivation" class="genre-checkbox">
                                    <span>Motivatsiya</span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="fiction" class="genre-checkbox">
                                    <span>Badiiy</span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="history" class="genre-checkbox">
                                    <span>Tarix</span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="psychology" class="genre-checkbox">
                                    <span>Psixologiya</span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="business" class="genre-checkbox">
                                    <span>Biznes</span>
                                </label>
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" value="classic" class="genre-checkbox">
                                    <span>Klassika</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Oxirgi o'qigan kitobingiz?</label>
                            <input type="text" id="lastRead" placeholder="Kitob nomi..." 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Qaysi tilda o'qiysiz?</label>
                            <select id="language" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                                <option value="uz">O'zbekcha</option>
                                <option value="ru">Ruscha</option>
                                <option value="en">Inglizcha</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4 mt-8">
                        <button id="savePreferences" class="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex-1">
                            Saqlash
                        </button>
                        <button id="closePreferences" class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition">
                            Bekor qilish
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Event listeners
        document.getElementById('savePreferences').addEventListener('click', () => {
            this.saveUserPreferences();
            modal.remove();
        });
        
        document.getElementById('closePreferences').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    saveUserPreferences() {
        const genres = Array.from(document.querySelectorAll('.genre-checkbox:checked')).map(cb => cb.value);
        const lastRead = document.getElementById('lastRead').value;
        const language = document.getElementById('language').value;
        
        this.userPreferences = {
            genres,
            lastRead,
            language,
            readingHistory: [...this.userPreferences.readingHistory]
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
        this.generateWeeklyRecommendations();
        this.showNotification('Tavsiyalar saqlandi! Haftalik tavsiyalar tayyor.');
    }
    
    generateWeeklyRecommendations() {
        const allBooks = [
            { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "business" },
            { title: "The Power of Habit", author: "Charles Duhigg", genre: "psychology" },
            { title: "1984", author: "George Orwell", genre: "fiction" },
            { title: "Sapiens", author: "Yuval Noah Harari", genre: "history" },
            { title: "Mindset", author: "Carol Dweck", genre: "motivation" }
        ];
        
        this.weeklyRecommendations = allBooks.filter(book => 
            this.userPreferences.genres.includes(book.genre)
        ).slice(0, 3);
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
        notification.textContent = message;
        
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

// AI Book Summary Generator
class AISummaryGenerator {
    constructor() {
        this.summaries = [
            {
                title: "Atomic Habits",
                videoUrl: "https://picsum.photos/seed/atomic-video/400/225",
                quotes: [
                    "Kichik harakatlar katta o'zgarishlarni keltirib chiqaradi",
                    "Odatlar - bu o'z-o'zini takrorlaydigan xatti-harakatlar",
                    "1% yaxshilanish kuniga - yiliga 37 barobar yaxshilanish"
                ],
                pdfUrl: "#"
            },
            {
                title: "Alkimyogar",
                videoUrl: "https://picsum.photos/seed/alchemist-video/400/225",
                quotes: [
                    "Agar bir narsa haqiqatan ham orzu qilingan bo'lsa, butun olam unga yordam beradi",
                    "Qo'rquv - bu eng katta to'siq",
                    "Yo'l - maqsabdan muhimroqdir"
                ],
                pdfUrl: "#"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.loadSummaries();
    }
    
    loadSummaries() {
        const summaryCards = document.getElementById('summaryCards');
        if (!summaryCards) return;
        
        summaryCards.innerHTML = this.summaries.map((summary, index) => `
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                 style="animation: fadeInUp 0.5s ease ${index * 0.2}s both">
                <div class="relative">
                    <img src="${summary.videoUrl}" alt="${summary.title} Summary" class="w-full h-48 object-cover">
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button class="bg-white/90 w-16 h-16 rounded-full flex items-center justify-center hover:bg-white transition transform hover:scale-110"
                                onclick="aiFeatures.playSummaryVideo('${summary.title}')">
                            <i class="fas fa-play text-purple-600 text-xl ml-1"></i>
                        </button>
                    </div>
                    <div class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        1:00
                    </div>
                </div>
                
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-4">${summary.title}</h3>
                    
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2 text-purple-600">📝 10 ta muhim iqtibos</h4>
                        <div class="space-y-2 max-h-32 overflow-y-auto">
                            ${summary.quotes.map(quote => `
                                <div class="bg-gray-50 p-2 rounded-lg text-sm italic">
                                    "${quote}"
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex-1 text-sm"
                                onclick="aiFeatures.downloadSummary('${summary.title}')">
                            <i class="fas fa-download mr-2"></i>PDF yuklab olish
                        </button>
                        <button class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm"
                                onclick="aiFeatures.shareSummary('${summary.title}')">
                            <i class="fas fa-share mr-2"></i>Ulashish
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    playSummaryVideo(title) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="relative max-w-4xl w-full">
                <button class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="bg-black rounded-lg overflow-hidden">
                    <div class="aspect-video flex items-center justify-center">
                        <img src="https://picsum.photos/seed/${title}-video/800/450" alt="${title} Video" class="w-full h-full object-contain">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="text-center text-white">
                                <i class="fas fa-play-circle text-6xl mb-4"></i>
                                <p class="text-xl">${title} - AI Summary</p>
                                <p class="text-sm opacity-75">1 daqiqalik video mavhum</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    downloadSummary(title) {
        // Simulate PDF download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${title}-summary.pdf`;
        link.click();
        
        aiFeatures.personalSystem.showNotification(`${title} konspekti yuklab olindi!`);
    }
    
    shareSummary(title) {
        if (navigator.share) {
            navigator.share({
                title: `${title} - AI Summary`,
                text: `1 daqiqalik video va 10 ta muhim iqtibos`,
                url: window.location.href
            });
        } else {
            aiFeatures.personalSystem.showNotification('Link nusxalandi!');
        }
    }
}

// Challenge System
class ChallengeSystem {
    constructor() {
        this.participants = [
            { name: "Ali Karimov", books: 4, days: 25 },
            { name: "Dilnoza Rahimova", books: 3, days: 20 },
            { name: "Bekzod Tursunov", books: 5, days: 28 },
            { name: "Gulnora Soliyeva", books: 2, days: 15 }
        ];
        
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.setupChallenge();
        this.loadLeaderboard();
    }
    
    setupChallenge() {
        const joinBtn = document.getElementById('joinChallengeBtn');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => this.joinChallenge());
        }
    }
    
    joinChallenge() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-md w-full p-8">
                <h2 class="text-2xl font-bold mb-6">🏆 Challenge'ga Qo'shilish</h2>
                
                <div class="space-y-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Ismingiz</label>
                        <input type="text" id="userName" placeholder="Ismingizni kiriting..." 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                    </div>
                    
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">Challenge qoidalari:</h3>
                        <ul class="text-sm space-y-1">
                            <li>✅ 30 kun ichida 5 ta kitob o'qing</li>
                            <li>✅ Har bir kitob haqida qisqa izoh qoldiring</li>
                            <li>✅ Eng faol o'quvchi sovrinni oladi</li>
                        </ul>
                    </div>
                </div>
                
                <div class="flex space-x-4">
                    <button id="confirmJoin" class="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex-1">
                        Qo'shilish
                    </button>
                    <button id="cancelJoin" class="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition">
                        Bekor qilish
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('confirmJoin').addEventListener('click', () => {
            const userName = document.getElementById('userName').value.trim();
            if (userName) {
                this.addParticipant(userName);
                modal.remove();
                aiFeatures.personalSystem.showNotification('Challenge\'ga muvaffaqiyatli qo\'shildingiz!');
            }
        });
        
        document.getElementById('cancelJoin').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    addParticipant(userName) {
        this.currentUser = {
            name: userName,
            books: 0,
            days: 0,
            joined: true
        };
        
        this.participants.push(this.currentUser);
        this.loadLeaderboard();
        localStorage.setItem('challengeUser', JSON.stringify(this.currentUser));
    }
    
    loadLeaderboard() {
        const leaderboardList = document.getElementById('leaderboardList');
        if (!leaderboardList) return;
        
        // Sort by books read
        const sorted = [...this.participants].sort((a, b) => b.books - a.books);
        
        leaderboardList.innerHTML = sorted.slice(0, 5).map((participant, index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
            const isCurrentUser = this.currentUser && participant.name === this.currentUser.name;
            
            return `
                <div class="flex items-center justify-between p-3 bg-white/10 rounded-lg ${isCurrentUser ? 'ring-2 ring-yellow-400' : ''}">
                    <div class="flex items-center space-x-3">
                        <span class="text-2xl">${medal}</span>
                        <span class="font-semibold ${isCurrentUser ? 'text-yellow-400' : ''}">${participant.name}</span>
                    </div>
                    <div class="flex items-center space-x-4 text-sm">
                        <span>📚 ${participant.books} kitob</span>
                        <span>📅 ${participant.days} kun</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Main AI Features Controller
class AIFeaturesController {
    constructor() {
        this.aiSearch = new AISearchEngine();
        this.tts = new TextToSpeechEngine();
        this.personalSystem = new PersonalRecommendationSystem();
        this.summaryGenerator = new AISummaryGenerator();
        this.challengeSystem = new ChallengeSystem();
        
        this.loadLiteratureSections();
        this.loadTrendingSections();
        this.initMobileMenu();
    }
    
    loadLiteratureSections() {
        // Uzbek Literature
        const uzbekBooks = [
            { title: "O'tkan kunlar", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/otkan/150/200" },
            { title: "Mehrobdan chayon", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mehrobdan/150/200" },
            { title: "Yodgor", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/yodgor/150/200" },
            { title: "Mahbublar qissasi", author: "Abdulla Qodiriy", cover: "https://picsum.photos/seed/mahbublar/150/200" }
        ];
        
        const uzbekBooksDiv = document.getElementById('uzbekBooks');
        if (uzbekBooksDiv) {
            uzbekBooksDiv.innerHTML = uzbekBooks.map(book => `
                <div class="bg-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-32 object-cover rounded mb-2">
                    <h5 class="font-semibold text-sm">${book.title}</h5>
                    <p class="text-xs text-gray-600">${book.author}</p>
                </div>
            `).join('');
        }
        
        // World Literature
        const worldBooks = [
            { title: "1984", author: "George Orwell", cover: "https://picsum.photos/seed/1984/150/200" },
            { title: "Brave New World", author: "Aldous Huxley", cover: "https://picsum.photos/seed/brave/150/200" },
            { title: "Fahrenheit 451", author: "Ray Bradbury", cover: "https://picsum.photos/seed/fahrenheit/150/200" },
            { title: "Animal Farm", author: "George Orwell", cover: "https://picsum.photos/seed/animal/150/200" }
        ];
        
        const worldBooksDiv = document.getElementById('worldBooks');
        if (worldBooksDiv) {
            worldBooksDiv.innerHTML = worldBooks.map(book => `
                <div class="bg-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-32 object-cover rounded mb-2">
                    <h5 class="font-semibold text-sm">${book.title}</h5>
                    <p class="text-xs text-gray-600">${book.author}</p>
                </div>
            `).join('');
        }
    }
    
    loadTrendingSections() {
        // Uzbekistan Trending
        const uzbekTrending = [
            { title: "O'tkan kunlar", author: "Abdulla Qodiriy", readers: "12.5K", trend: "+25%" },
            { title: "Mehrobdan chayon", author: "Abdulla Qodiriy", readers: "8.3K", trend: "+18%" },
            { title: "Yodgor", author: "Abdulla Qodiriy", readers: "6.7K", trend: "+12%" }
        ];
        
        const uzbekTrendingDiv = document.getElementById('uzbekTrending');
        if (uzbekTrendingDiv) {
            uzbekTrendingDiv.innerHTML = uzbekTrending.map((book, index) => `
                <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div class="text-2xl font-bold text-gray-400">#${index + 1}</div>
                    <div class="flex-1">
                        <h5 class="font-semibold">${book.title}</h5>
                        <p class="text-sm text-gray-600">${book.author}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-semibold">${book.readers}</div>
                        <div class="text-xs text-green-600">${book.trend}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // World Trending
        const worldTrending = [
            { title: "Atomic Habits", author: "James Clear", readers: "45.2K", trend: "+32%" },
            { title: "The Alchemist", author: "Paulo Coelho", readers: "38.7K", trend: "+28%" },
            { title: "1984", author: "George Orwell", readers: "31.4K", trend: "+15%" }
        ];
        
        const worldTrendingDiv = document.getElementById('worldTrending');
        if (worldTrendingDiv) {
            worldTrendingDiv.innerHTML = worldTrending.map((book, index) => `
                <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div class="text-2xl font-bold text-gray-400">#${index + 1}</div>
                    <div class="flex-1">
                        <h5 class="font-semibold">${book.title}</h5>
                        <p class="text-sm text-gray-600">${book.author}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-semibold">${book.readers}</div>
                        <div class="text-xs text-green-600">${book.trend}</div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        let mobileMenu = null;
        
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
                            <a href="#ai-search" class="text-gray-700 hover:text-purple-600 transition text-lg">AI Qidiruv</a>
                            <a href="#literature" class="text-gray-700 hover:text-purple-600 transition text-lg">Adabiyot</a>
                            <a href="#trending" class="text-gray-700 hover:text-purple-600 transition text-lg">Trend</a>
                            <a href="#challenge" class="text-gray-700 hover:text-purple-600 transition text-lg">Challenge</a>
                            <button class="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition w-fit">
                                Kirish
                            </button>
                        </div>
                    </div>
                `;
                document.body.appendChild(mobileMenu);
                
                document.getElementById('closeMobileMenu').addEventListener('click', () => {
                    mobileMenu.remove();
                    mobileMenu = null;
                });
                
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.remove();
                        mobileMenu = null;
                    });
                });
            } else {
                mobileMenu.style.display = 'flex';
            }
        });
    }
}

// Book details modal function
function showBookDetails(book) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative">
                <button class="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition z-10"
                        onclick="this.closest('.fixed').remove()">
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
                    ${book.match ? `<span class="text-purple-600 font-semibold">${book.match}% mos</span>` : ''}
                </div>
                
                ${aiFeatures.tts.createTTSControls(`"${book.title}" kitobi ${book.author} tomonidan yozilgan. Bu kitob haqida ma'lumot...`)}
                
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
    
    // Setup TTS controls
    setTimeout(() => {
        const playBtn = document.getElementById('playBtn');
        const voiceSelect = document.getElementById('voiceSelect');
        const speedControl = document.getElementById('speedControl');
        const speedValue = document.getElementById('speedValue');
        
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                const text = `"${book.title}" kitobi ${book.author} tomonidan yozilgan. Bu kitob haqida ma'lumot...`;
                const gender = voiceSelect?.value || 'male';
                const rate = parseFloat(speedControl?.value || 1);
                
                aiFeatures.tts.speak(text, { gender, rate });
            });
        }
        
        if (speedControl && speedValue) {
            speedControl.addEventListener('input', () => {
                speedValue.textContent = speedControl.value + 'x';
                aiFeatures.tts.speechRate = parseFloat(speedControl.value);
            });
        }
        
        if (document.getElementById('downloadAudio')) {
            document.getElementById('downloadAudio').addEventListener('click', () => {
                aiFeatures.personalSystem.showNotification('Audio fayl yuklab olindi!');
            });
        }
    }, 100);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add CSS animations
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
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
let aiFeatures;
document.addEventListener('DOMContentLoaded', () => {
    aiFeatures = new AIFeaturesController();
    
    // Smooth scrolling
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
    
    // Scroll animations
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('nav');
        
        if (scrolled > 50) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
    
    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
