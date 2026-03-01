// Admin PDF Management System
class AdminPDFManagement {
    constructor() {
        this.init();
    }

    init() {
        this.createAdminPDFSection();
        this.loadAllPDFs();
        this.setupEventListeners();
    }

    createAdminPDFSection() {
        const adminContainer = document.querySelector('.admin-dashboard');
        if (!adminContainer) return;

        const pdfSection = document.createElement('div');
        pdfSection.className = 'admin-section mb-8';
        pdfSection.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">
                        <i class="fas fa-file-pdf text-red-600 mr-2"></i>
                        PDF Boshqaruvi
                    </h2>
                    <div class="flex space-x-2">
                        <button onclick="refreshPDFList()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-sync-alt mr-2"></i>Yangilash
                        </button>
                        <button onclick="exportPDFData()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-download mr-2"></i>Eksport
                        </button>
                    </div>
                </div>

                <!-- Statistics -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-purple-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="bg-purple-600 rounded-lg p-3 mr-3">
                                <i class="fas fa-file-alt text-white"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-purple-900" id="totalPDFs">0</div>
                                <div class="text-sm text-purple-600">Jami PDFlar</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="bg-blue-600 rounded-lg p-3 mr-3">
                                <i class="fas fa-users text-white"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-blue-900" id="totalUsers">0</div>
                                <div class="text-sm text-blue-600">Foydalanuvchilar</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="bg-green-600 rounded-lg p-3 mr-3">
                                <i class="fas fa-hdd text-white"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-green-900" id="totalSize">0 MB</div>
                                <div class="text-sm text-green-600">Umumiy hajm</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4">
                        <div class="flex items-center">
                            <div class="bg-yellow-600 rounded-lg p-3 mr-3">
                                <i class="fas fa-clock text-white"></i>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-yellow-900" id="todayUploads">0</div>
                                <div class="text-sm text-yellow-600">Bugun yuklangan</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Qidirish</label>
                            <input type="text" id="pdfSearchInput" placeholder="Kitob nomi yoki muallif..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kategoriya</label>
                            <select id="pdfCategoryFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">Barchasi</option>
                                <option value="klassika">Klassika</option>
                                <option value="drama">Drama</option>
                                <option value="roman">Roman</option>
                                <option value="sheirlar">She'rlar</option>
                                <option value="hikoya">Hikoya</option>
                                <option value="fantastika">Fantastika</option>
                                <option value="detektiv">Detektiv</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Til</label>
                            <select id="pdfLanguageFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">Barchasi</option>
                                <option value="uz">O'zbek</option>
                                <option value="ru">Rus</option>
                                <option value="en">Ingliz</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select id="pdfStatusFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option value="">Barchasi</option>
                                <option value="active">Faol</option>
                                <option value="pending">Kutilmoqda</option>
                                <option value="rejected">Rad etilgan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- PDF Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onclick="sortPDFs('title')">
                                    Kitob <i class="fas fa-sort ml-1"></i>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onclick="sortPDFs('author')">
                                    Muallif <i class="fas fa-sort ml-1"></i>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategoriya
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hajm
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onclick="sortPDFs('uploadDate')">
                                    Yuklangan <i class="fas fa-sort ml-1"></i>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Foydalanuvchi
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amallar
                                </th>
                            </tr>
                        </thead>
                        <tbody id="pdfTableBody" class="bg-white divide-y divide-gray-200">
                            <!-- PDF rows will be loaded here -->
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div id="pdfEmptyState" class="hidden text-center py-12">
                    <i class="fas fa-file-pdf text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">Hali hech qanday PDF yuklanmagan</p>
                </div>
            </div>
        `;

        adminContainer.appendChild(pdfSection);
    }

    loadAllPDFs() {
        const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        this.updateStatistics(pdfs);
        this.displayPDFs(pdfs);
    }

    updateStatistics(pdfs) {
        // Total PDFs
        document.getElementById('totalPDFs').textContent = pdfs.length;

        // Unique users
        const uniqueUsers = [...new Set(pdfs.map(pdf => pdf.uploadedBy))];
        document.getElementById('totalUsers').textContent = uniqueUsers.length;

        // Total size
        const totalSize = pdfs.reduce((sum, pdf) => sum + pdf.fileSize, 0);
        document.getElementById('totalSize').textContent = this.formatFileSize(totalSize);

        // Today's uploads
        const today = new Date().toDateString();
        const todayUploads = pdfs.filter(pdf => 
            new Date(pdf.uploadDate).toDateString() === today
        ).length;
        document.getElementById('todayUploads').textContent = todayUploads;
    }

    displayPDFs(pdfs) {
        const tbody = document.getElementById('pdfTableBody');
        const emptyState = document.getElementById('pdfEmptyState');

        if (pdfs.length === 0) {
            tbody.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        tbody.innerHTML = pdfs.map(pdf => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <i class="fas fa-file-pdf text-red-600 mr-3"></i>
                        <div>
                            <div class="text-sm font-medium text-gray-900">${pdf.bookInfo.title}</div>
                            <div class="text-sm text-gray-500">${pdf.fileName}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${pdf.bookInfo.author}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        ${pdf.bookInfo.category}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${this.formatFileSize(pdf.fileSize)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${new Date(pdf.uploadDate).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${pdf.uploadedBy}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${this.getStatusClass(pdf.status)}">
                        ${this.getStatusText(pdf.status)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="viewAdminPDF('${pdf.id}')" class="text-blue-600 hover:text-blue-900" title="Ko'rish">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="downloadAdminPDF('${pdf.id}')" class="text-green-600 hover:text-green-900" title="Yuklash">
                            <i class="fas fa-download"></i>
                        </button>
                        <button onclick="editPDFStatus('${pdf.id}')" class="text-yellow-600 hover:text-yellow-900" title="Statusni o'zgartirish">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteAdminPDF('${pdf.id}')" class="text-red-600 hover:text-red-900" title="O'chirish">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getStatusClass(status) {
        const classes = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
    }

    getStatusText(status) {
        const texts = {
            active: 'Faol',
            pending: 'Kutilmoqda',
            rejected: 'Rad etilgan'
        };
        return texts[status] || status;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    setupEventListeners() {
        // Search
        document.getElementById('pdfSearchInput')?.addEventListener('input', () => this.filterPDFs());
        
        // Filters
        document.getElementById('pdfCategoryFilter')?.addEventListener('change', () => this.filterPDFs());
        document.getElementById('pdfLanguageFilter')?.addEventListener('change', () => this.filterPDFs());
        document.getElementById('pdfStatusFilter')?.addEventListener('change', () => this.filterPDFs());
    }

    filterPDFs() {
        const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        const searchTerm = document.getElementById('pdfSearchInput')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('pdfCategoryFilter')?.value || '';
        const languageFilter = document.getElementById('pdfLanguageFilter')?.value || '';
        const statusFilter = document.getElementById('pdfStatusFilter')?.value || '';

        const filteredPDFs = pdfs.filter(pdf => {
            const matchesSearch = !searchTerm || 
                pdf.bookInfo.title.toLowerCase().includes(searchTerm) ||
                pdf.bookInfo.author.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || pdf.bookInfo.category === categoryFilter;
            const matchesLanguage = !languageFilter || pdf.bookInfo.language === languageFilter;
            const matchesStatus = !statusFilter || pdf.status === statusFilter;

            return matchesSearch && matchesCategory && matchesLanguage && matchesStatus;
        });

        this.displayPDFs(filteredPDFs);
    }
}

// Admin PDF Management Functions
function refreshPDFList() {
    if (window.adminPDFManagement) {
        window.adminPDFManagement.loadAllPDFs();
        showToast('PDF ro\'yxati yangilandi', 'success');
    }
}

function exportPDFData() {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    
    // Create CSV data
    const headers = ['ID', 'Kitob nomi', 'Muallif', 'Kategoriya', 'Til', 'Hajm', 'Yuklagan', 'Sana', 'Status'];
    const csvData = pdfs.map(pdf => [
        pdf.id,
        pdf.bookInfo.title,
        pdf.bookInfo.author,
        pdf.bookInfo.category,
        pdf.bookInfo.language,
        window.adminPDFManagement.formatFileSize(pdf.fileSize),
        pdf.uploadedBy,
        new Date(pdf.uploadDate).toLocaleDateString(),
        pdf.status
    ]);

    // Convert to CSV
    const csvContent = [headers, ...csvData]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdf_data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    showToast('Ma\'lumotlar eksport qilindi', 'success');
}

function viewAdminPDF(pdfId) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    const pdf = pdfs.find(p => p.id == pdfId);
    if (pdf) {
        alert(`PDF ko'rish: ${pdf.bookInfo.title}\n\nBu funksiya server tomonidan amalga oshiriladi.`);
    }
}

function downloadAdminPDF(pdfId) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    const pdf = pdfs.find(p => p.id == pdfId);
    if (pdf) {
        alert(`PDF yuklash: ${pdf.bookInfo.title}\n\nBu funksiya server tomonidan amalga oshiriladi.`);
    }
}

function editPDFStatus(pdfId) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    const pdf = pdfs.find(p => p.id == pdfId);
    if (pdf) {
        const newStatus = prompt('Statusni tanlang (active/pending/rejected):', pdf.status);
        if (newStatus && ['active', 'pending', 'rejected'].includes(newStatus)) {
            pdf.status = newStatus;
            localStorage.setItem('bookJourney_pdfs', JSON.stringify(pdfs));
            if (window.adminPDFManagement) {
                window.adminPDFManagement.loadAllPDFs();
            }
            showToast('Status yangilandi', 'success');
        }
    }
}

function deleteAdminPDF(pdfId) {
    if (confirm('Bu PDFni o\'chirishga aminmisiz? Bu amal orqaga qaytarilmaydi.')) {
        let pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        pdfs = pdfs.filter(p => p.id != pdfId);
        localStorage.setItem('bookJourney_pdfs', JSON.stringify(pdfs));
        
        if (window.adminPDFManagement) {
            window.adminPDFManagement.loadAllPDFs();
        }
        
        showToast('PDF muvaffaqiyatli o\'chirildi', 'success');
    }
}

function sortPDFs(field) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    
    pdfs.sort((a, b) => {
        if (field === 'title') {
            return a.bookInfo.title.localeCompare(b.bookInfo.title);
        } else if (field === 'author') {
            return a.bookInfo.author.localeCompare(b.bookInfo.author);
        } else if (field === 'uploadDate') {
            return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
        return 0;
    });
    
    if (window.adminPDFManagement) {
        window.adminPDFManagement.displayPDFs(pdfs);
    }
}

// Initialize admin PDF management
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on admin page
    if (window.location.pathname.includes('admin.html') || document.querySelector('.admin-dashboard')) {
        window.adminPDFManagement = new AdminPDFManagement();
    }
});
