class LanguageManager {
    constructor() {
        this.currentLanguage = this.getSavedLanguage() || 'en';
        this.translations = {};
        this.init();
    }

    // Initialize the language manager
    async init() {
        await this.loadTranslations();
        this.setupLanguageSelector();
        this.applyTranslations();
    }

    // Get saved language from localStorage
    getSavedLanguage() {
        return localStorage.getItem('preferredLanguage');
    }

    // Save language preference to localStorage
    saveLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }

    // Load translations from JSON files
    async loadTranslations() {
        try {
            const response = await fetch(`assets/i18n/${this.currentLanguage}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English if error occurs
            if (this.currentLanguage !== 'en') {
                this.currentLanguage = 'en';
                await this.loadTranslations();
            }
        }
    }

    // Set up language selector dropdown
    setupLanguageSelector() {
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    // Change application language
    async changeLanguage(lang) {
        if (lang !== this.currentLanguage) {
            this.currentLanguage = lang;
            await this.loadTranslations();
            this.applyTranslations();
            this.saveLanguage(lang);
            
            // Dispatch custom event for other components to update
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
    }

    // Apply translations to all elements with data-i18n attribute
    applyTranslations() {
        this.applyElementTranslations();
        this.applyPlaceholderTranslations();
        this.applyAriaLabelTranslations();
        this.updateFeaturesContent();
        this.updatePricingDisplay();
    }

    // Apply translations to regular elements
    applyElementTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (!translation) return;

            this.applyTranslationToElement(element, key, translation);
        });
    }

    // Apply translations to placeholder attributes
    applyPlaceholderTranslations() {
        const elements = document.querySelectorAll('[data-i18n-placeholder]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    // Apply translations to aria-label attributes
    applyAriaLabelTranslations() {
        const elements = document.querySelectorAll('[data-i18n-aria-label]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            const translation = this.getTranslation(key);
            
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });
    }

    // Apply translation to specific element based on type and content
    applyTranslationToElement(element, key, translation) {
        // Special cases with complex structure
        if (key === 'hero.title') {
            this.applyHeroTitleTranslation(element);
            return;
        }

        // General cases
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (this.shouldUseHTML(element, translation)) {
            element.innerHTML = translation;
        } else {
            element.textContent = translation;
        }
    }

    // Determine if translation should use innerHTML
    shouldUseHTML(element, translation) {
        // 1. Element has explicit data-i18n-html attribute
        if (element.hasAttribute('data-i18n-html')) {
            return true;
        }
        
        // 2. Translation is an object (special cases like hero.title)
        if (typeof translation === 'object') {
            return true;
        }
        
        // 3. Translation contains HTML tags
        if (typeof translation === 'string' && this.containsHTML(translation)) {
            return true;
        }
        
        return false;
    }

    // Detect if text contains HTML tags
    containsHTML(text) {
        if (typeof text !== 'string') return false;
        const htmlPattern = /<[a-z][\s\S]*>/i;
        return htmlPattern.test(text);
    }

    // Special handling for hero title with colored spans
    applyHeroTitleTranslation(element) {
        const translation = this.getTranslation('hero.title');
        
        if (translation) {
            element.innerHTML = `
                ${translation.part1} 
                <span style="color: var(--secondary-color);">${translation.highlight1}</span>
                ${translation.part2} 
                <span style="color: var(--secondary-color);">${translation.highlight2}</span>
                ${translation.part3} 
                <span style="color: var(--tertiary-color);">${translation.highlight3}</span>
            `;
        }
    }

    // Get translation by key path
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return null;
            }
            value = value[k];
        }
        
        return value;
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // =========================================================================
    // FEATURES SECTION MANAGEMENT
    // =========================================================================

    // Update features content after language change
    updateFeaturesContent() {
        const featuresData = this.getFeaturesData();
        this.renderOrbitFeatures(featuresData);
        this.updateCenterFeature(featuresData[0], 0); // Show first feature by default
        this.renderFeaturesNavigation(featuresData);
    }

    // Get features data from current language translations
    getFeaturesData() {
        const featuresTranslations = this.getTranslation('features.sections');
        return [
            {
                icon: 'fas fa-users',
                key: 'studyGroups',
                ...featuresTranslations.studyGroups
            },
            {
                icon: 'fas fa-comments',
                key: 'realTimeChat',
                ...featuresTranslations.realTimeChat
            },
            {
                icon: 'fas fa-video',
                key: 'videoCalls',
                ...featuresTranslations.videoCalls
            },
            {
                icon: 'fas fa-file-alt',
                key: 'documentSharing',
                ...featuresTranslations.documentSharing
            },
            {
                icon: 'fas fa-brain',
                key: 'interactiveQuizzes',
                ...featuresTranslations.interactiveQuizzes
            },
            {
                icon: 'fas fa-user-circle',
                key: 'customizeProfile',
                ...featuresTranslations.customizeProfile
            },
            {
                icon: 'fas fa-trophy',
                key: 'earnBadges',
                ...featuresTranslations.earnBadges
            },
            {
                icon: 'fas fa-chart-line',
                key: 'progressTracking',
                ...featuresTranslations.progressTracking
            }
        ];
    }

    // Render orbit features around the center
    renderOrbitFeatures(features) {
        const orbitContainer = document.getElementById('orbitFeatures');
        if (!orbitContainer) return;

        orbitContainer.innerHTML = features.map((feature, index) => `
            <div class="orbit-feature ${index === 0 ? 'active' : ''}" data-feature="${index}">
                <i class="${feature.icon}"></i>
                <span>${feature.title}</span>
            </div>
        `).join('');

        this.addOrbitFeaturesEventListeners(features);
    }

    // Add event listeners to orbit features
    addOrbitFeaturesEventListeners(features) {
        const orbitFeatures = document.querySelectorAll('.orbit-feature');
        orbitFeatures.forEach((orbitFeature, index) => {
            orbitFeature.addEventListener('click', () => {
                this.updateCenterFeature(features[index], index);
                
                // Update active classes
                orbitFeatures.forEach(f => f.classList.remove('active'));
                orbitFeature.classList.add('active');
                
                // Update navigation active state
                this.updateNavigationActiveState(index);
            });
        });
    }

    // Update center feature display
    updateCenterFeature(feature, index) {
        const centerFeature = document.getElementById('centerFeature');
        if (!centerFeature) return;

        const titleElement = document.getElementById('centerFeatureTitle');
        const descriptionElement = document.getElementById('centerFeatureDescription');
        const benefitsElement = document.getElementById('centerFeatureBenefits');

        if (titleElement) titleElement.textContent = feature.title;
        if (descriptionElement) descriptionElement.textContent = feature.description;
        
        if (benefitsElement) {
            benefitsElement.innerHTML = feature.benefits.map(benefit => 
                `<li><i class="fas fa-check-circle"></i> ${benefit}</li>`
            ).join('');
        }

        // Update icon
        const iconElement = centerFeature.querySelector('.feature-icon-large i');
        if (iconElement) {
            iconElement.className = feature.icon;
        }
        
        // Update navigation active state
        this.updateNavigationActiveState(index);
    }

    // Update active state in navigation
    updateNavigationActiveState(activeIndex) {
        const navDots = document.querySelectorAll('.nav-dot');
        const orbitFeatures = document.querySelectorAll('.orbit-feature');
        
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
        
        orbitFeatures.forEach((feature, index) => {
            feature.classList.toggle('active', index === activeIndex);
        });
    }

    // Render features navigation dots
    renderFeaturesNavigation(features) {
        const navigationContainer = document.getElementById('featuresNavigation');
        if (!navigationContainer) return;

        navigationContainer.innerHTML = features.map((_, index) => `
            <button class="nav-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
        `).join('');

        this.addNavigationEventListeners(features);
    }

    // Add event listeners to navigation dots
    addNavigationEventListeners(features) {
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.updateCenterFeature(features[index], index);
            });
        });
    }

    // =========================================================================
    // PRICING SECTION MANAGEMENT
    // =========================================================================

    // Update pricing display based on toggle state
    updatePricingDisplay() {
        const toggleSwitch = document.querySelector('.toggle-switch');
        const isYearly = toggleSwitch ? toggleSwitch.classList.contains('yearly') : false;
        
        this.updatePricingPrices(isYearly);
    }

    // Update pricing values based on billing period
    updatePricingPrices(isYearly) {
        const periodType = isYearly ? 'yearly' : 'monthly';
        
        this.updateFreePlanPrice(periodType);
        this.updatePremiumPlanPrice(periodType);
    }

    // Update free plan pricing
    updateFreePlanPrice(periodType) {
        const freePrice = document.querySelector('.pricing-card:not(.premium) .price');
        const freePeriod = document.querySelector('.pricing-card:not(.premium) .price-period');
        
        if (freePrice) {
            freePrice.textContent = this.getTranslation(`pricing.plans.free.price.${periodType}`);
        }
    }

    // Update premium plan pricing
    updatePremiumPlanPrice(periodType) {
        const premiumOldPrice = document.querySelector('.pricing-card.premium .old-price');
        const premiumCurrentPrice = document.querySelector('.pricing-card.premium .price');
        const premiumPeriod = document.querySelector('.pricing-card.premium .price-period');
        
        if (premiumOldPrice) {
            premiumOldPrice.textContent = this.getTranslation(`pricing.plans.premium.oldPrice.${periodType}`);
        }
        if (premiumCurrentPrice) {
            premiumCurrentPrice.textContent = this.getTranslation(`pricing.plans.premium.price.${periodType}`);
        }
        if (premiumPeriod) {
            premiumPeriod.textContent = this.getTranslation(`pricing.plans.premium.period.${periodType}`);
        }
    }
}

// Initialize language manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Global function to change language from other scripts
window.changeLanguage = function(lang) {
    if (window.languageManager) {
        window.languageManager.changeLanguage(lang);
    }
};

// Global function to get translation by key
window.translate = function(key) {
    if (window.languageManager) {
        return window.languageManager.getTranslation(key);
    }
    return key;
};