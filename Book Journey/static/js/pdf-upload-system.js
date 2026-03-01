// PDF Upload System for Book Journey
class PDFUploadSystem {
    constructor() {
        this.maxFileSize = 50 * 1024 * 1024; // 50MB max file size
        this.allowedTypes = ['application/pdf'];
        this.uploadProgress = {};
        this.init();
    }

    init() {
        this.createPDFUploadModal();
        this.setupEventListeners();
        this.loadUserPDFs();
    }

    createPDFUploadModal() {
        const modal = document.createElement('div');
        modal.id = 'pdfUploadModal';
        modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl font-bold text-gray-900" data-translate="pdf.upload_title">PDF Yuklash</h3>
                        <button onclick="closePDFUploadModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>
                
                <div class="p-6">
                    <!-- Upload Area -->
                    <div id="pdfDropZone" class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                        <div class="flex flex-col items-center">
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                            <p class="text-lg font-medium text-gray-700 mb-2" data-translate="pdf.drag_drop">PDF faylni bu yerga torting yoki tanlang</p>
                            <p class="text-sm text-gray-500 mb-4" data-translate="pdf.max_size">Maksimal hajm: 50MB</p>
                            <input type="file" id="pdfFileInput" accept=".pdf" class="hidden" />
                            <button onclick="document.getElementById('pdfFileInput').click()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                <i class="fas fa-folder-open mr-2"></i>
                                <span data-translate="pdf.select_file">Fayl tanlash</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Book Information Form -->
                    <div id="pdfBookInfo" class="hidden mt-6 space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="pdf.book_title">Kitob nomi</label>
                                <input type="text" id="pdfBookTitle" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Kitob nomini kiriting...">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="pdf.book_author">Muallif</label>
                                <input type="text" id="pdfBookAuthor" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Muallif nomini kiriting...">
                            </div>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="pdf.book_category">Kategoriya</label>
                                <select id="pdfBookCategory" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                    <option value="">Kategoriyani tanlang</option>
                                    <option value="klassika">Klassika</option>
                                    <option value="drama">Drama</option>
                                    <option value="roman">Roman</option>
                                    <option value="sheirlar">She'rlar</option>
                                    <option value="hikoya">Hikoya</option>
                                    <option value="fantastika">Fantastika</option>
                                    <option value="detektiv">Detektiv</option>
                                    <option value="biznes">Biznes</option>
                                    <option value="psixologiya">Psixologiya</option>
                                    <option value="tarix">Tarix</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="pdf.book_language">Til</label>
                                <select id="pdfBookLanguage" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                    <option value="uz">O'zbek</option>
                                    <option value="ru">Rus</option>
                                    <option value="en">Ingliz</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2" data-translate="pdf.book_description">Tavsif</label>
                            <textarea id="pdfBookDescription" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Kitob haqida qisqacha ma'lumot..."></textarea>
                        </div>
                        
                        <!-- Upload Progress -->
                        <div id="uploadProgress" class="hidden">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700" data-translate="pdf.uploading">Yuklanmoqda...</span>
                                <span id="uploadPercentage" class="text-sm font-medium text-purple-600">0%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div id="uploadProgressBar" class="bg-purple-600 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex justify-end space-x-3 pt-4">
                            <button onclick="closePDFUploadModal()" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <span data-translate="pdf.cancel">Bekor qilish</span>
                            </button>
                            <button onclick="uploadPDF()" class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                <i class="fas fa-upload mr-2"></i>
                                <span data-translate="pdf.upload">Yuklash</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    setupEventListeners() {
        // File input change
        const fileInput = document.getElementById('pdfFileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files[0]));
        }

        // Drag and drop
        const dropZone = document.getElementById('pdfDropZone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('border-purple-500', 'bg-purple-50');
            });

            dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-purple-500', 'bg-purple-50');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-purple-500', 'bg-purple-50');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            });
        }
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        if (!this.allowedTypes.includes(file.type)) {
            this.showToast('Faqat PDF fayllar yuklanishi mumkin', 'error');
            return;
        }

        // Validate file size
        if (file.size > this.maxFileSize) {
            this.showToast('Fayl hajmi 50MB dan oshmasligi kerak', 'error');
            return;
        }

        // Show book information form
        document.getElementById('pdfBookInfo').classList.remove('hidden');
        
        // Store selected file
        this.selectedFile = file;
        
        // Update drop zone to show selected file
        const dropZone = document.getElementById('pdfDropZone');
        dropZone.innerHTML = `
            <div class="flex flex-col items-center">
                <i class="fas fa-file-pdf text-4xl text-purple-600 mb-4"></i>
                <p class="text-lg font-medium text-gray-700 mb-2">${file.name}</p>
                <p class="text-sm text-gray-500">${this.formatFileSize(file.size)}</p>
                <button onclick="document.getElementById('pdfFileInput').click()" class="mt-4 text-purple-600 hover:text-purple-700 transition-colors">
                    <i class="fas fa-exchange-alt mr-2"></i>
                    Boshqa fayl tanlash
                </button>
            </div>
        `;
    }

    async uploadPDF() {
        if (!this.selectedFile) {
            this.showToast('Iltimos, avval fayl tanlang', 'error');
            return;
        }

        // Get book information
        const bookInfo = {
            title: document.getElementById('pdfBookTitle').value,
            author: document.getElementById('pdfBookAuthor').value,
            category: document.getElementById('pdfBookCategory').value,
            language: document.getElementById('pdfBookLanguage').value,
            description: document.getElementById('pdfBookDescription').value
        };

        // Validate required fields
        if (!bookInfo.title || !bookInfo.author || !bookInfo.category) {
            this.showToast('Iltimos, barcha kerakli maydonlarni to\'ldiring', 'error');
            return;
        }

        // Show progress
        document.getElementById('uploadProgress').classList.remove('hidden');
        
        try {
            // Create FormData
            const formData = new FormData();
            formData.append('pdfFile', this.selectedFile);
            formData.append('bookInfo', JSON.stringify(bookInfo));
            formData.append('uploadedBy', this.getCurrentUser());
            formData.append('uploadDate', new Date().toISOString());

            // Simulate upload progress
            await this.simulateUpload();

            // Save to localStorage (in real app, this would be server upload)
            const pdfData = {
                id: Date.now(),
                fileName: this.selectedFile.name,
                fileSize: this.selectedFile.size,
                bookInfo: bookInfo,
                uploadedBy: this.getCurrentUser(),
                uploadDate: new Date().toISOString(),
                status: 'active'
            };

            this.savePDFData(pdfData);
            
            // Show success message
            this.showToast('PDF muvaffaqiyatli yuklandi!', 'success');
            
            // Close modal and reset
            setTimeout(() => {
                closePDFUploadModal();
                this.resetUploadForm();
                this.loadUserPDFs();
            }, 1500);

        } catch (error) {
            console.error('Upload error:', error);
            this.showToast('Yuklashda xatolik yuz berdi', 'error');
        }
    }

    async simulateUpload() {
        const progressBar = document.getElementById('uploadProgressBar');
        const percentageText = document.getElementById('uploadPercentage');
        
        for (let i = 0; i <= 100; i += 5) {
            await new Promise(resolve => setTimeout(resolve, 100));
            progressBar.style.width = i + '%';
            percentageText.textContent = i + '%';
        }
    }

    savePDFData(pdfData) {
        // Get existing PDFs
        let pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        
        // Add new PDF
        pdfs.push(pdfData);
        
        // Save to localStorage
        localStorage.setItem('bookJourney_pdfs', JSON.stringify(pdfs));
    }

    loadUserPDFs() {
        const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        const userPDFs = pdfs.filter(pdf => pdf.uploadedBy === this.getCurrentUser());
        
        this.displayUserPDFs(userPDFs);
    }

    displayUserPDFs(pdfs) {
        const container = document.getElementById('userPDFsContainer');
        if (!container) return;

        if (pdfs.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-file-pdf text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">Hali hech qanday PDF yuklanmagan</p>
                </div>
            `;
            return;
        }

        container.innerHTML = pdfs.map(pdf => `
            <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${pdf.bookInfo.title}</h4>
                        <p class="text-sm text-gray-600">${pdf.bookInfo.author}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">${pdf.bookInfo.category}</span>
                            <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">${pdf.bookInfo.language}</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-2">${this.formatFileSize(pdf.fileSize)}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="viewPDF('${pdf.id}')" class="text-blue-600 hover:text-blue-700">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="downloadPDF('${pdf.id}')" class="text-green-600 hover:text-green-700">
                            <i class="fas fa-download"></i>
                        </button>
                        ${this.canDeletePDF(pdf) ? `
                            <button onclick="deletePDF('${pdf.id}')" class="text-red-600 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    canDeletePDF(pdf) {
        const currentUser = this.getCurrentUser();
        return pdf.uploadedBy === currentUser || currentUser === 'admin';
    }

    getCurrentUser() {
        // In real app, this would get from authentication system
        return localStorage.getItem('bookJourney_currentUser') || 'user';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    resetUploadForm() {
        this.selectedFile = null;
        document.getElementById('pdfFileInput').value = '';
        document.getElementById('pdfBookTitle').value = '';
        document.getElementById('pdfBookAuthor').value = '';
        document.getElementById('pdfBookCategory').value = '';
        document.getElementById('pdfBookLanguage').value = 'uz';
        document.getElementById('pdfBookDescription').value = '';
        document.getElementById('pdfBookInfo').classList.add('hidden');
        document.getElementById('uploadProgress').classList.add('hidden');
        document.getElementById('uploadProgressBar').style.width = '0%';
        document.getElementById('uploadPercentage').textContent = '0%';
        
        // Reset drop zone
        const dropZone = document.getElementById('pdfDropZone');
        dropZone.innerHTML = `
            <div class="flex flex-col items-center">
                <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p class="text-lg font-medium text-gray-700 mb-2">PDF faylni bu yerga torting yoki tanlang</p>
                <p class="text-sm text-gray-500 mb-4">Maksimal hajm: 50MB</p>
                <input type="file" id="pdfFileInput" accept=".pdf" class="hidden" />
                <button onclick="document.getElementById('pdfFileInput').click()" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <i class="fas fa-folder-open mr-2"></i>
                    Fayl tanlash
                </button>
            </div>
        `;
        
        // Re-setup event listeners
        this.setupEventListeners();
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

// Global functions
function openPDFUploadModal() {
    const modal = document.getElementById('pdfUploadModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closePDFUploadModal() {
    const modal = document.getElementById('pdfUploadModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (window.pdfUploadSystem) {
            window.pdfUploadSystem.resetUploadForm();
        }
    }
}

function uploadPDF() {
    if (window.pdfUploadSystem) {
        window.pdfUploadSystem.uploadPDF();
    }
}

function viewPDF(pdfId) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    const pdf = pdfs.find(p => p.id == pdfId);
    if (pdf) {
        // In real app, this would open PDF viewer
        alert(`PDF ko'rish: ${pdf.bookInfo.title}\n\nBu funksiya server tomonidan amalga oshiriladi.`);
    }
}

function downloadPDF(pdfId) {
    const pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
    const pdf = pdfs.find(p => p.id == pdfId);
    if (pdf) {
        // In real app, this would trigger download
        alert(`PDF yuklash: ${pdf.bookInfo.title}\n\nBu funksiya server tomonidan amalga oshiriladi.`);
    }
}

function deletePDF(pdfId) {
    if (confirm('Bu PDFni o\'chirishga aminmisiz?')) {
        let pdfs = JSON.parse(localStorage.getItem('bookJourney_pdfs') || '[]');
        pdfs = pdfs.filter(p => p.id != pdfId);
        localStorage.setItem('bookJourney_pdfs', JSON.stringify(pdfs));
        
        if (window.pdfUploadSystem) {
            window.pdfUploadSystem.loadUserPDFs();
        }
        
        showToast('PDF muvaffaqiyatli o\'chirildi', 'success');
    }
}

// Initialize PDF upload system
document.addEventListener('DOMContentLoaded', () => {
    window.pdfUploadSystem = new PDFUploadSystem();
});
