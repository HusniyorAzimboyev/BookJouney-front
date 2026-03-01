// Scroll Animations - Fade in elements as they come into view
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Set up Intersection Observer
        this.setupIntersectionObserver();
        
        // Add scroll-based navbar effects
        this.setupNavbarEffects();
        
        // Initial check for elements already in view
        this.checkElementsOnLoad();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element comes into view
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);
        
        // Observe all elements with animation classes
        this.observeElements();
    }
    
    observeElements() {
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
        );
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    setupNavbarEffects() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add background blur when scrolling down
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    checkElementsOnLoad() {
        // Check if any elements are already in viewport on page load
        const elements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in'
        );
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add dynamic animations for book cards
    animateBookCards() {
        const bookCards = document.querySelectorAll('#literatureBooksGrid .book-card');
        
        bookCards.forEach((card, index) => {
            // Add staggered animation
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }
    
    // Animate statistics counters
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when element is visible
            this.observer.observe(counter);
            counter.addEventListener('visible', updateCounter);
        });
    }
    
    // Add parallax effect to hero section
    setupParallax() {
        const heroSection = document.getElementById('home');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = heroSection.querySelectorAll('.floating');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Add typing effect for hero text
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '3px solid #667eea';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            // Start typing when element is visible
            this.observer.observe(element);
            element.addEventListener('visible', typeWriter);
        });
    }
    
    // Add hover effects for interactive elements
    setupHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            '.book-card, .category-btn, .premium-gradient'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add smooth reveal for sections
    setupSectionReveal() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            
            this.observer.observe(section);
            
            section.addEventListener('visible', () => {
                section.style.transition = `all 0.8s ease-out ${index * 0.2}s`;
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimations = new ScrollAnimations();
    
    // Make it globally accessible for other scripts
    window.scrollAnimations = scrollAnimations;
    
    // Re-observe elements when new content is loaded
    window.reobserveElements = () => {
        scrollAnimations.observeElements();
    };
    
    // Add CSS for scrolled navbar
    const style = document.createElement('style');
    style.textContent = `
        #navbar.scrolled {
            background: rgba(255, 255, 255, 0.95) !important;
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .fade-in.visible,
        .slide-in-left.visible,
        .slide-in-right.visible,
        .scale-in.visible {
            opacity: 1;
            transform: translateY(0) translateX(0) scale(1);
        }
        
        /* Smooth transitions for all animated elements */
        .fade-in, .slide-in-left, .slide-in-right, .scale-in {
            will-change: opacity, transform;
        }
        
        /* Performance optimization */
        @media (prefers-reduced-motion: reduce) {
            .fade-in, .slide-in-left, .slide-in-right, .scale-in {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
});
