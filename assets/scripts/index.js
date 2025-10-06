// =============================================================================
// QR CODE EXPANSION FUNCTIONALITY
// =============================================================================

/**
 * Handles QR code expansion and collapse functionality
 */
class QRCodeManager {
    constructor() {
        this.qrImages = document.querySelectorAll('.qr-download');
        this.qrExpanded = document.getElementById('qr-expanded');
        this.expandedQrImage = document.getElementById('expanded-qr');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add click listeners to all QR images
        this.qrImages.forEach(image => {
            image.addEventListener('click', (event) => {
                this.expandQR(event.target.src);
            });
        });

        // Add click listener to close expanded QR
        if (this.qrExpanded) {
            this.qrExpanded.addEventListener('click', (event) => {
                if (event.target === this.qrExpanded) {
                    this.collapseQR();
                }
            });
        }
    }

    expandQR(qrSrc) {
        if (this.expandedQrImage) {
            this.expandedQrImage.src = qrSrc;
        }
        if (this.qrExpanded) {
            this.qrExpanded.style.display = 'flex';
        }
    }

    collapseQR() {
        if (this.qrExpanded) {
            this.qrExpanded.style.display = 'none';
        }
    }
}

// =============================================================================
// HOW IT WORKS SECTION FUNCTIONALITY
// =============================================================================

/**
 * Manages the step expansion and animation in the How It Works section
 */
class HowItWorksManager {
    constructor() {
        this.steps = document.querySelectorAll('.step');
        this.phoneImage = document.getElementById('step-image');
        this.init();
    }

    init() {
        this.setupStepAnimations();
    }

    // Toggle step expansion state
    toggleStep(stepElement, imageName) {
        // Collapse all other steps
        this.steps.forEach(step => {
            if (step !== stepElement) {
                step.classList.remove('expanded');
            }
        });

        // Toggle current step
        stepElement.classList.toggle('expanded');

        // Update phone image if provided
        if (this.phoneImage && imageName) {
            this.phoneImage.src = `assets/images/section/how-it-works/${imageName}`;
        }
    }

    // Animate steps on page load
    setupStepAnimations() {
        this.steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(30px)';

            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
}

// =============================================================================
// PRICING SECTION FUNCTIONALITY
// =============================================================================

/**
 * Manages pricing toggle and animations
 */
class PricingManager {
    constructor() {
        this.isYearly = false;
        this.init();
    }

    /**
     * Initializes the manager, setting up animations and effects.
     */
    init() {
        this.setupCardAnimations();
        this.setupParallaxEffect();
    }

    /**
     * Toggles the billing period between yearly and monthly.
     * @param {HTMLElement} element - The billing toggle element.
     */
    toggleBilling(element) {
        this.isYearly = !this.isYearly;
        element.classList.toggle('active');
        
        // Update pricing based on the selected billing period
        if (window.languageManager) {
            window.languageManager.updatePricingPrices(this.isYearly);
        }
    }

    /**
     * Sets up animations for pricing cards when they enter the viewport.
     */
    setupCardAnimations() {
        const cards = document.querySelectorAll('.pricing-card');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    this.animateCard(entry.target, index);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach((card) => observer.observe(card));
    }

    animateCard(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(80px)';

        setTimeout(() => {
            card.style.transition = 'all 3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200); 
    }

    /**
     * Sets up a parallax effect on decorative shapes based on mouse movement.
     */
    setupParallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.decorative-shape-pricing');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                this.applyParallaxEffect(shape, index, mouseX, mouseY);
            });
        });
    }

    applyParallaxEffect(shape, index, mouseX, mouseY) {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    }
}

// =============================================================================
// CONTENT NAVIGATION FUNCTIONALITY
// =============================================================================

/**
 * Manages content section navigation
 */
class ContentNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFeatureCardHover();
    }

    // Show content section based on navigation
    showContent(section) {
        const cards = document.querySelectorAll('.content-card');
        const buttons = document.querySelectorAll('.nav-btn');
        
        // Remove active class from all cards and buttons
        cards.forEach(card => card.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to target section and button
        const targetSection = document.getElementById(section);
        const targetButton = event.target.closest('.nav-btn');
        
        if (targetSection) targetSection.classList.add('active');
        if (targetButton) targetButton.classList.add('active');
    }

    // Setup hover effects for feature cards
    setupFeatureCardHover() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255, 255, 255, 0.08)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
    }
}

// =============================================================================
// GLOBAL FUNCTIONS (called from HTML)
// =============================================================================

// Global function to toggle step in How It Works section
function toggleStep(stepElement, imageName) {
    window.howItWorksManager.toggleStep(stepElement, imageName);
}

// Global function for testimonial navigation
function nextTestimonial() {
    window.testimonialsManager.nextTestimonial();
}

function previousTestimonial() {
    window.testimonialsManager.previousTestimonial();
}

function goToTestimonial(index) {
    window.testimonialsManager.goToTestimonial(index);
}

// Global function for pricing toggle
function toggleBilling(element) {
    window.pricingManager.toggleBilling(element);
}

// Global function for content navigation
function showContent(section) {
    window.contentNavigationManager.showContent(section);
}

// Global function for feature orbit navigation
function changeFeature(index) {
    window.featuresOrbitManager.changeFeature(index);
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers and make them globally accessible
    window.qrCodeManager = new QRCodeManager();
    window.howItWorksManager = new HowItWorksManager();
    window.testimonialsManager = new TestimonialsManager();
    window.pricingManager = new PricingManager();
    window.contentNavigationManager = new ContentNavigationManager();
    window.contactFormManager = new ContactFormManager();
    window.featuresOrbitManager = new FeaturesOrbitManager();
});

// QR Code functionality (original implementation for compatibility)
const qrImages = document.querySelectorAll('.qr-download');
const qrExpanded = document.getElementById('qr-expanded');
const expandedQrImage = document.getElementById('expanded-qr');

qrImages.forEach(image => {
    image.addEventListener('click', (event) => {
        const qrSrc = event.target.src;
        expandedQrImage.src = qrSrc;
        qrExpanded.style.display = 'flex';
    });
});

qrExpanded.addEventListener('click', (event) => {
    if (event.target === qrExpanded) {
        qrExpanded.style.display = 'none';
    }
});

// Steps animation (original implementation for compatibility)
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(30px)';

        setTimeout(() => {
            step.style.transition = 'all 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 200);
    });
});

// Testimonials functionality (original implementation for compatibility)
let currentTestimonial = 0;
const totalTestimonials = testimonials.length;

function updateSideAvatars() {
    const leftIndex = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    const rightIndex = (currentTestimonial + 1) % totalTestimonials;
    
    document.getElementById('leftAvatar').src = testimonials[leftIndex].sideAvatar;
    document.getElementById('rightAvatar').src = testimonials[rightIndex].sideAvatar;
}

function updateMainTestimonial() {
    const current = testimonials[currentTestimonial];
    
    document.getElementById('mainAvatar').src = current.avatar;
    document.getElementById('mainName').textContent = current.name;
    document.getElementById('mainLocation').textContent = current.location;
    document.getElementById('mainText').textContent = current.text;
}

function updateDots() {
    const dotsContainer = document.getElementById('dotsContainer');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = i === currentTestimonial ? 'dot active' : 'dot';
        dot.onclick = () => goToTestimonial(i);
        dotsContainer.appendChild(dot);
    }
}

function showTestimonial(index) {
    currentTestimonial = index;
    updateMainTestimonial();
    updateSideAvatars();
    updateDots();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextTestimonial();
    } else if (e.key === 'ArrowLeft') {
        previousTestimonial();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    showTestimonial(0);
    setTimeout(() => {
        document.querySelector('.testimonial-card').classList.add('active');
    }, 300);
});

// Pricing functionality (original implementation for compatibility)
let isYearly = false;

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.decorative-shape-pricing');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Content navigation (original implementation for compatibility)
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
});

// Features orbit functionality (original implementation for compatibility)
let currentFeature = 0;
const centerFeature = document.getElementById('centerFeature');
const orbitFeatures = document.querySelectorAll('.orbit-feature');
const navigation = document.getElementById('featuresNavigation');

features.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => changeFeature(index));
    navigation.appendChild(dot);
});

const navDots = document.querySelectorAll('.nav-dot');

let autoRotate = setInterval(() => {
    currentFeature = (currentFeature + 1) % features.length;
    changeFeature(currentFeature);
}, 5000);

const container = document.querySelector('.features-orbit-container');
container.addEventListener('mouseenter', () => clearInterval(autoRotate));
container.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
        currentFeature = (currentFeature + 1) % features.length;
        changeFeature(currentFeature);
    }, 5000);
});