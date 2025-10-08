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
// TESTIMONIALS CAROUSEL FUNCTIONALITY
// =============================================================================

/**
 * Manages the testimonials carousel with navigation and animations
 */
class TestimonialsManager {
    constructor() {
        this.currentTestimonial = 0;
        this.totalTestimonials = testimonials.length;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showTestimonial(0);
        this.activateInitialTestimonial();
    }

    setupEventListeners() {
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextTestimonial();
            } else if (e.key === 'ArrowLeft') {
                this.previousTestimonial();
            }
        });
    }

    // Update side avatars display
    updateSideAvatars() {
        const leftIndex = (this.currentTestimonial - 1 + this.totalTestimonials) % this.totalTestimonials;
        const rightIndex = (this.currentTestimonial + 1) % this.totalTestimonials;
        
        const leftAvatar = document.getElementById('leftAvatar');
        const rightAvatar = document.getElementById('rightAvatar');
        
        if (leftAvatar) leftAvatar.src = testimonials[leftIndex].sideAvatar;
        if (rightAvatar) rightAvatar.src = testimonials[rightIndex].sideAvatar;
    }

    // Update main testimonial content
    updateMainTestimonial() {
        const current = testimonials[this.currentTestimonial];
        
        const mainAvatar = document.getElementById('mainAvatar');
        const mainName = document.getElementById('mainName');
        const mainLocation = document.getElementById('mainLocation');
        const mainText = document.getElementById('mainText');
        
        if (mainAvatar) mainAvatar.src = current.avatar;
        if (mainName) mainName.textContent = current.name;
        if (mainLocation) mainLocation.textContent = current.location;
        if (mainText) mainText.textContent = current.text;
    }

    // Update navigation dots
    updateDots() {
        const dotsContainer = document.getElementById('dotsContainer');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalTestimonials; i++) {
            const dot = document.createElement('div');
            dot.className = i === this.currentTestimonial ? 'dot active' : 'dot';
            dot.addEventListener('click', () => this.goToTestimonial(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Main function to display a testimonial
    showTestimonial(index) {
        this.currentTestimonial = index;
        this.updateMainTestimonial();
        this.updateSideAvatars();
        this.updateDots();
    }

    // Navigation functions
    nextTestimonial() {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.totalTestimonials;
        this.showTestimonial(this.currentTestimonial);
    }

    previousTestimonial() {
        this.currentTestimonial = (this.currentTestimonial - 1 + this.totalTestimonials) % this.totalTestimonials;
        this.showTestimonial(this.currentTestimonial);
    }

    goToTestimonial(index) {
        this.showTestimonial(index);
    }

    // Activate initial testimonial with animation
    activateInitialTestimonial() {
        setTimeout(() => {
            const testimonialCard = document.querySelector('.testimonial-card');
            if (testimonialCard) {
                testimonialCard.classList.add('active');
            }
        }, 300);
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
// CONTACT FORM FUNCTIONALITY
// =============================================================================

/**
 * Manages contact form validation and submission
 */
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('successMessage');
        this.contactInput = document.querySelector("#contactNumber");
        this.iti = null;
        this.init();
    }

    init() {
        this.setupInternationalTelephoneInput();
        this.setupFormEventListeners();
    }

    // Setup international telephone input
    setupInternationalTelephoneInput() {
        if (this.contactInput) {
            this.iti = window.intlTelInput(this.contactInput, {
                initialCountry: "auto",
                geoIpLookup: function(callback) {
                    fetch("https://ipapi.co/json")
                        .then((res) => res.json())
                        .then((data) => callback(data.country_code))
                        .catch(() => callback("us"));
                },
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17/build/js/utils.js"
            });
        }
    }

    setupFormEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupInputValidation();
        }
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    // Validate all form fields
    validateForm() {
        let isValid = true;
        const formGroups = this.form.querySelectorAll('.form-group');
        
        // Reset previous errors
        formGroups.forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.classList.remove('show');
        });

        // Validate individual fields
        if (!this.validateTextField('firstName')) isValid = false;
        if (!this.validateTextField('lastName')) isValid = false;
        if (!this.validateEmailField('email')) isValid = false;
        if (!this.validatePhoneField()) isValid = false;
        if (!this.validateTextField('message')) isValid = false;

        return isValid;
    }

    validateTextField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            this.showError(field);
            return false;
        }
        return true;
    }

    validateEmailField(fieldId) {
        const field = document.getElementById(fieldId);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!field || !field.value.trim() || !emailRegex.test(field.value)) {
            this.showError(field);
            return false;
        }
        return true;
    }

    validatePhoneField() {
        if (!this.iti || !this.iti.isValidNumber()) {
            this.showError(this.contactInput);
            return false;
        }
        return true;
    }

    // Show error for specific input field
    showError(input) {
        if (!input) return;
        
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) errorMsg.classList.add('show');
        }
    }

    // Submit form data
    submitForm() {
        const submitBtn = this.form.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send a Message';
            }

            this.logFormData();
        }, 1500);
    }

    // Show success message
    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');
            
            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }
    }

    // Log form data (for debugging)
    logFormData() {
        const formData = {
            firstName: document.getElementById('firstName')?.value,
            lastName: document.getElementById('lastName')?.value,
            email: document.getElementById('email')?.value,
            contactNumber: this.iti ? this.iti.getNumber() : '',
            message: document.getElementById('message')?.value
        };
        console.log('Formulario enviado:', formData);
    }

    // Setup real-time input validation
    setupInputValidation() {
        const inputs = [
            document.getElementById('firstName'),
            document.getElementById('lastName'), 
            document.getElementById('email'),
            document.getElementById('contactNumber'),
            document.getElementById('message')
        ];

        inputs.forEach(input => {
            if (input) {
                input.addEventListener('input', () => this.clearError(input));
            }
        });
    }

    // Clear error state for input field
    clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) errorMsg.classList.remove('show');
        }
    }
}

// =============================================================================
// FEATURES ORBIT FUNCTIONALITY
// =============================================================================

/**
 * Manages the features orbit carousel
 */
class FeaturesOrbitManager {
    constructor() {
        this.currentFeature = 0;
        this.centerFeature = document.getElementById('centerFeature');
        this.orbitFeatures = document.querySelectorAll('.orbit-feature');
        this.navigation = document.getElementById('featuresNavigation');
        this.autoRotateInterval = null;
        this.init();
    }

    init() {
        this.createNavigation();
        this.setupEventListeners();
        this.startAutoRotate();
    }

    // Create navigation dots
    createNavigation() {
        if (!this.navigation) return;

        this.navigation.innerHTML = '';
        
        features.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'nav-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.changeFeature(index));
            this.navigation.appendChild(dot);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Orbit feature click listeners
        this.orbitFeatures.forEach((orbit, index) => {
            orbit.addEventListener('click', () => this.changeFeature(index));
        });

        // Pause auto-rotate on interaction
        const container = document.querySelector('.features-orbit-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoRotate());
            container.addEventListener('mouseleave', () => this.startAutoRotate());
        }
    }

    // Change to specific feature
    changeFeature(index) {
        this.currentFeature = index;
        const feature = features[index];

        // Exit animation
        if (this.centerFeature) {
            this.centerFeature.style.opacity = '0';
            this.centerFeature.style.transform = 'scale(0.9)';
        }

        setTimeout(() => {
            this.updateCenterFeature(feature);
            this.updateActiveStates(index);
            
            // Entry animation
            if (this.centerFeature) {
                this.centerFeature.style.opacity = '1';
                this.centerFeature.style.transform = 'scale(1)';
            }
        }, 300);
    }

    // Update center feature content
    updateCenterFeature(feature) {
        if (!this.centerFeature) return;

        this.centerFeature.innerHTML = `
            <div class="feature-icon-large">
                <i class="${feature.icon}"></i>
            </div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            <ul class="feature-benefits">
                ${feature.benefits.map(benefit => 
                    `<li><i class="fas fa-check-circle"></i> ${benefit}</li>`
                ).join('')}
            </ul>
        `;
    }

    // Update active states for orbits and dots
    updateActiveStates(index) {
        // Update orbit features
        this.orbitFeatures.forEach((orbit, i) => {
            orbit.classList.toggle('active', i === index);
        });

        // Update navigation dots
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto-rotate features
    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            this.currentFeature = (this.currentFeature + 1) % features.length;
            this.changeFeature(this.currentFeature);
        }, 5000);
    }

    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
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