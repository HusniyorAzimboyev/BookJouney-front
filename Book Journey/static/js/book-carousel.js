// Book Carousel - Automatic slideshow with manual controls
class BookCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds per slide
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCarousel());
        } else {
            this.setupCarousel();
        }
    }
    
    setupCarousel() {
        const carousel = document.getElementById('bookCarousel');
        if (!carousel) return;
        
        // Get all slides and indicators
        this.slides = carousel.querySelectorAll('.carousel-slide');
        this.indicators = carousel.querySelectorAll('.carousel-indicator');
        
        if (this.slides.length === 0) return;
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Show first slide
        this.showSlide(0);
    }
    
    setupEventListeners() {
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
        
        // Pause on hover
        const carousel = document.getElementById('bookCarousel');
        carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.setupTouchSupport();
    }
    
    setupTouchSupport() {
        const carousel = document.getElementById('bookCarousel');
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide(); // Swipe left, go to next
                } else {
                    this.previousSlide(); // Swipe right, go to previous
                }
                this.restartAutoPlay();
            }
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach((slide, i) => {
            slide.style.opacity = '0';
            slide.style.transform = 'scale(0.95)';
        });
        
        // Update indicators
        this.indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white', 'w-8');
            } else {
                indicator.classList.remove('bg-white', 'w-8');
                indicator.classList.add('bg-white/50');
            }
        });
        
        // Show current slide with animation
        setTimeout(() => {
            this.slides[index].style.opacity = '1';
            this.slides[index].style.transform = 'scale(1)';
        }, 50);
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
    
    // Public methods for external control
    play() {
        this.startAutoPlay();
    }
    
    pause() {
        this.pauseAutoPlay();
    }
    
    next() {
        this.nextSlide();
        this.restartAutoPlay();
    }
    
    previous() {
        this.previousSlide();
        this.restartAutoPlay();
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    window.bookCarousel = new BookCarousel();
});

// Add CSS animations
const carouselStyles = `
<style>
.carousel-slide {
    transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}
    
.carousel-indicator {
    transition: all 0.3s ease;
}
    
.carousel-indicator:hover {
    transform: scale(1.2);
}
    
#bookCarousel {
    position: relative;
}
    
.carousel-container {
    position: relative;
    overflow: hidden;
}
    
/* Add loading animation */
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
    
.carousel-slide:first-child {
    animation: fadeIn 1s ease-out;
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', carouselStyles);
