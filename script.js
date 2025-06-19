// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});

// Job Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobItems = document.querySelectorAll('.job-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.textContent.toLowerCase();

            jobItems.forEach(item => {
                const jobInfo = item.querySelector('.job-info');
                const department = jobInfo.querySelector('.job-department').textContent.toLowerCase();
                const location = jobInfo.querySelector('.job-location').textContent.toLowerCase();

                if (filterValue === 'all' || 
                    department.includes(filterValue) || 
                    location.includes(filterValue) ||
                    (filterValue === 'netherlands' && location.includes('nld')) ||
                    (filterValue === 'germany' && location.includes('deu')) ||
                    (filterValue === 'operations' && department.includes('operations')) ||
                    (filterValue === 'quality' && department.includes('quality'))) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeInUp 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Language Selector Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-selector');
    
    if (languageSelector) {
        languageSelector.addEventListener('click', function(e) {
            e.preventDefault();
            // This would typically open a language selection dropdown
            console.log('Language selector clicked');
            // You can implement dropdown functionality here
        });
    }
});

// Card Hover Effects and Animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.info-card, .position-card, .job-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Form Validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Button Click Animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Search Functionality (if search is added)
function filterJobs(searchTerm) {
    const jobItems = document.querySelectorAll('.job-item');
    const term = searchTerm.toLowerCase();

    jobItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const department = item.querySelector('.job-department').textContent.toLowerCase();
        const location = item.querySelector('.job-location').textContent.toLowerCase();

        if (title.includes(term) || department.includes(term) || location.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Loading State Management
function showLoadingState(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoadingState(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        showNotification('Link copied to clipboard!', 'success');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showNotification('Failed to copy link', 'error');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Performance Optimization - Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
});

// Print Styles Handler
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections for printing
    const collapsedElements = document.querySelectorAll('.collapsed');
    collapsedElements.forEach(el => {
        el.classList.add('print-expanded');
    });
});

window.addEventListener('afterprint', function() {
    // Restore collapsed state after printing
    const expandedElements = document.querySelectorAll('.print-expanded');
    expandedElements.forEach(el => {
        el.classList.remove('print-expanded');
    });
});

// Analytics Events (placeholder for actual analytics implementation)
function trackEvent(category, action, label) {
    // This would integrate with your analytics platform
    console.log('Event tracked:', { category, action, label });
    
    // Example for Google Analytics
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Track button clicks for analytics
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('Button', 'Click', buttonText);
        });
    });
});

// Cookie Consent (if needed)
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Show cookie consent banner
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>This website uses cookies to ensure you get the best experience.</p>
                <button class="btn-primary accept-cookies">Accept</button>
                <button class="btn-secondary decline-cookies">Decline</button>
            </div>
        `;
        document.body.appendChild(banner);
        
        // Handle consent
        banner.querySelector('.accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.remove();
        });
        
        banner.querySelector('.decline-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            banner.remove();
        });
    }
}

// Excipients Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the excipients page
    if (!window.location.pathname.includes('excipients')) return;

    // Search functionality
    const searchInput = document.getElementById('excipient-search');
    const searchBtn = document.querySelector('.search-btn');
    const filterOptions = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    const productCards = document.querySelectorAll('.product-card');
    
    // Search functionality
    if (searchInput && searchBtn) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (searchTerm === '' || productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update results count
            const resultsHeader = document.querySelector('.results-header h1');
            if (resultsHeader) {
                resultsHeader.textContent = `Excipients (${visibleCount})`;
            }
            
            if (searchTerm) {
                trackEvent('Excipients', 'Search', searchTerm);
            }
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        searchInput.addEventListener('input', performSearch);
    }
    
    // Filter functionality
    filterOptions.forEach(option => {
        option.addEventListener('change', function() {
            const activeFilters = Array.from(filterOptions)
                .filter(opt => opt.checked)
                .map(opt => opt.value);
            
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const category = card.dataset.category;
                const func = card.dataset.function;
                
                const shouldShow = activeFilters.length === 0 || 
                    activeFilters.includes(category) || 
                    activeFilters.includes(func);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update filter count display
            const filterToggle = document.querySelector('.filter-toggle span');
            if (filterToggle) {
                filterToggle.textContent = `Show filters (${activeFilters.length})`;
            }
            
            // Update results count
            const resultsHeader = document.querySelector('.results-header h1');
            if (resultsHeader) {
                resultsHeader.textContent = `Excipients (${visibleCount})`;
            }
            
            if (activeFilters.length > 0) {
                showNotification(`Applied ${activeFilters.length} filter(s)`, 'info');
                trackEvent('Excipients', 'Filter Applied', activeFilters.join(', '));
            }
        });
    });
    
    // View toggle functionality
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            trackEvent('Excipients', 'View Changed', view);
            showNotification(`Switched to ${view} view`, 'info');
        });
    });
    
    // Pagination functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled || this.innerHTML.includes('chevron')) return;
            
            pageButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const pageNum = this.textContent;
            trackEvent('Excipients', 'Page Change', pageNum);
            showNotification(`Page ${pageNum} loaded`, 'info');
        });
    });
    
    // Formulation tool button
    const formulationBtn = document.querySelector('.formulation-tool-btn');
    if (formulationBtn) {
        formulationBtn.addEventListener('click', function() {
            trackEvent('Excipients', 'Formulation Tool', 'Opened');
            showNotification('Opening formulation tool...', 'info');
            // Add actual formulation tool functionality here
        });
    }
    
    // Product card hover tracking
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            trackEvent('Excipients', 'Product Interest', productName);
        });
    });
    
    // Legacy product finder functionality (if it exists)
    const finderSearch = document.querySelector('.finder-search');
    const finderReset = document.querySelector('.finder-reset');
    
    if (finderSearch) {
        finderSearch.addEventListener('click', function() {
            const application = document.getElementById('application')?.value;
            const functionType = document.getElementById('function')?.value;
            const dosage = document.getElementById('dosage')?.value;
            
            // Simulate search functionality
            let searchCriteria = [];
            if (application) searchCriteria.push(`Application: ${application}`);
            if (functionType) searchCriteria.push(`Function: ${functionType}`);
            if (dosage) searchCriteria.push(`Dosage Form: ${dosage}`);
            
            if (searchCriteria.length > 0) {
                showNotification(`Searching for products with criteria: ${searchCriteria.join(', ')}`, 'info');
                trackEvent('Excipients', 'Product Finder Search', searchCriteria.join(', '));
            } else {
                showNotification('Please select at least one search criterion', 'error');
            }
        });
    }
    
    if (finderReset) {
        finderReset.addEventListener('click', function() {
            document.getElementById('application').value = '';
            document.getElementById('function').value = '';
            document.getElementById('dosage').value = '';
            showNotification('Search filters reset', 'info');
            trackEvent('Excipients', 'Product Finder', 'Reset');
        });
    }
    
    // Option cards click tracking (if they exist)
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.option-link');
                if (link) {
                    const optionType = this.querySelector('h3').textContent;
                    trackEvent('Excipients', 'Option Card Click', optionType);
                    
                    // Add visual feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            }
        });
    });
});

// Category Cards Interaction
document.addEventListener('DOMContentLoading', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #0066cc';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = '';
        });
        
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                const categoryName = this.querySelector('h3').textContent;
                trackEvent('Excipients', 'Category Interest', categoryName);
            }
        });
    });
});

// Initialize cookie consent on page load
// document.addEventListener('DOMContentLoaded', showCookieConsent);

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the contact page
    if (!window.location.pathname.includes('contact')) return;

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                company: formData.get('company'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                privacy: formData.get('privacy'),
                newsletter: formData.get('newsletter')
            };
            
            // Validate required fields
            if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message || !data.privacy) {
                showNotification('Please fill in all required fields and accept the privacy policy.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // In a real application, this would send data to a server
                console.log('Contact form submitted:', data);
                
                // Track the event
                trackEvent('Contact', 'Form Submission', data.subject);
                
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 2000);
        });
        
        // Track field interactions for analytics
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                trackEvent('Contact', 'Field Focus', this.name);
            });
        });
        
        // Real-time email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        this.style.borderColor = '#dc3545';
                        showNotification('Please enter a valid email address.', 'error');
                    } else {
                        this.style.borderColor = '#28a745';
                    }
                }
            });
        }
        
        // Character counter for message field
        const messageField = document.getElementById('message');
        if (messageField) {
            const maxLength = 1000;
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: #666; margin-top: 0.25rem;';
            messageField.parentNode.appendChild(counter);
            
            function updateCounter() {
                const remaining = maxLength - messageField.value.length;
                counter.textContent = `${remaining} characters remaining`;
                if (remaining < 100) {
                    counter.style.color = '#dc3545';
                } else if (remaining < 200) {
                    counter.style.color = '#ffc107';
                } else {
                    counter.style.color = '#666';
                }
            }
            
            messageField.addEventListener('input', updateCounter);
            messageField.setAttribute('maxlength', maxLength);
            updateCounter();
        }
    }
    
    // Track clicks on contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const methodType = this.querySelector('h4').textContent;
            trackEvent('Contact', 'Contact Method Click', methodType);
        });
    });
    
    // Track clicks on quick links
    const quickLinks = document.querySelectorAll('.quick-link-card');
    quickLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkTitle = this.querySelector('h4').textContent;
            trackEvent('Contact', 'Quick Link Click', linkTitle);
        });
    });
    
    // Track offices button click
    const officesBtn = document.querySelector('.offices-btn');
    if (officesBtn) {
        officesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            trackEvent('Contact', 'Offices Button Click', 'Offices & Distributors');
            showNotification('Opening offices and distributors overview...', 'info');
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Form auto-save functionality (optional)
    const formFields = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formFields.forEach(field => {
        // Load saved data
        const savedValue = localStorage.getItem(`contact_${field.name}`);
        if (savedValue && field.type !== 'checkbox') {
            field.value = savedValue;
        } else if (savedValue && field.type === 'checkbox') {
            field.checked = savedValue === 'true';
        }
        
        // Save data on change
        field.addEventListener('change', function() {
            if (this.type === 'checkbox') {
                localStorage.setItem(`contact_${this.name}`, this.checked);
            } else {
                localStorage.setItem(`contact_${this.name}`, this.value);
            }
        });
    });
    
    // Clear saved form data after successful submission
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            setTimeout(() => {
                // Clear saved form data after successful submission
                formFields.forEach(field => {
                    localStorage.removeItem(`contact_${field.name}`);
                });
            }, 2500);
        });
    }
});

// Utility function to copy contact information to clipboard
function copyContactInfo(type) {
    let textToCopy = '';
    
    switch(type) {
        case 'address':
            textToCopy = 'Klever Strasse 187, 47574 Goch, Germany';
            break;
        case 'phone':
            textToCopy = '+49 2823 9288770';
            break;
        case 'email':
            textToCopy = 'info@txpharma.com';
            break;
    }
    
    if (textToCopy) {
        copyToClipboard(textToCopy);
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`, 'success');
        trackEvent('Contact', 'Info Copied', type);
    }
}

// Internationalization (i18n) System
const translations = {
    en: {
        // Navigation
        'nav.about': 'About',
        'nav.excipients': 'Excipients',
        'nav.contact': 'Contact us',
        
        // Breadcrumb
        'breadcrumb.home': 'Home',
        'breadcrumb.about': 'About',
        'breadcrumb.excipients': 'Excipients',
        'breadcrumb.contact': 'Contact us',
        
        // Careers Page
        'careers.title': 'Careers',
        'careers.subtitle': '<strong>Imagine the work you do has a real impact in the lives of millions around the world</strong>.',
        'careers.description': 'That\'s what we do at TX Pharma. As one of the global leaders in excipients manufacturing, we are much more than a supplier to pharmaceutical companies. We are a true partner and innovator in the industry, responsible for life-changing technologies.',
        'careers.working.title': 'Working at TX Pharma',
        'careers.working.link': 'Learn more',
        'careers.facts.title': 'Key facts',
        'careers.facts.link': 'Learn more',
        'careers.positions.title': 'Open positions',
        'careers.positions.subtitle': 'Ready to take the next step in your career?',
        'careers.yourcareer.title': 'Your career at TX Pharma',
        'careers.yourcareer.description': 'International work environment, flexibility, great work-life balance, open culture and continuous learning and development are just a few of the benefits we offer. Join us and be part of a young, dynamic company.',
        'careers.yourcareer.button': 'Apply for our open positions',
        'careers.internships.title': 'Internships',
        'careers.internships.description': 'Are you looking for a challenging yet rewarding internship or apprenticeship to build your network, gain key experience in the Pharma Industry and start your career in the best way possible?',
        'careers.internships.button': 'Check our open internships',
        'careers.openings.title': 'Current Openings',
        'careers.filter.all': 'All',
        'careers.apply': 'Apply Now',
        
        // About Page
        'about.title': 'About TX Pharma',
        'about.subtitle': 'Leading innovation in pharmaceutical excipients',
        'about.intro.title': 'Who we are',
        'about.intro.description': 'TX Pharma is a global leader in pharmaceutical excipients, dedicated to improving lives through innovative solutions. We partner with pharmaceutical companies worldwide to deliver high-quality excipients that enable the development of life-changing medications.',
        'about.access.journey': 'Our Journey',
        'about.access.values': 'Our Values',
        'about.access.leadership': 'Leadership Team',
        'about.access.experts': 'Our Experts',
        'about.access.portfolio': 'Product Portfolio',
        
        // Excipients Page
        'excipients.title': 'Excipients',
        'excipients.search.placeholder': 'Search excipients',
        'excipients.filter.title': 'Filter',
        'excipients.filter.show': 'Show filters',
        'excipients.formulation.title': 'Find your ideal excipient',
        'excipients.formulation.button': 'Formulation Tool',
        'excipients.category.oral': 'Oral Solid Dose',
        'excipients.category.inhalation': 'Inhalation',
        'excipients.category.biopharma': 'Biopharma',
        'excipients.category.nutraceuticals': 'Nutraceuticals',
        'excipients.function.filler': 'Filler/Diluent',
        'excipients.function.binder': 'Binder',
        'excipients.function.disintegrant': 'Disintegrant',
        'excipients.function.lubricant': 'Lubricant',
        
        // Contact Page
        'contact.title': 'Contact us',
        'contact.section.title': 'Contact us',
        'contact.office.title': 'Corporate head office',
        'contact.offices.title': 'Offices Worldwide',
        'contact.offices.description': 'Get in touch with your nearest office',
        'contact.offices.button': 'Offices & Distributors overview',
        'contact.form.title': 'Send us a message',
        'contact.form.firstname': 'First Name',
        'contact.form.lastname': 'Last Name',
        'contact.form.email': 'Email',
        'contact.form.company': 'Company',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.privacy': 'I agree to the Privacy Policy and consent to the processing of my personal data',
        'contact.form.newsletter': 'I would like to receive newsletters and updates from TX Pharma',
        'contact.form.submit': 'Send Message',
        'contact.method.email.title': 'Email us',
        'contact.method.phone.title': 'Call us',
        'contact.method.visit.title': 'Visit us',
        'contact.links.title': 'Quick Links',
        'contact.links.products': 'Product Information',
        'contact.links.about': 'About TX Pharma',
        'contact.links.careers': 'Career Opportunities',
        'contact.links.support': 'Technical Support',
        
        // Footer
        'footer.about': 'About us',
        'footer.products': 'Products',
        'footer.support': 'Support',
        'footer.follow': 'Follow us',
        'footer.copyright': '© 2024 TX Pharma. All rights reserved.'
    },
    cn: {
        // Navigation
        'nav.about': '关于我们',
        'nav.excipients': '药用辅料',
        'nav.contact': '联系我们',
        
        // Breadcrumb
        'breadcrumb.home': '首页',
        'breadcrumb.about': '关于我们',
        'breadcrumb.excipients': '药用辅料',
        'breadcrumb.contact': '联系我们',
        
        // Careers Page
        'careers.title': '职业发展',
        'careers.subtitle': '<strong>想象一下您的工作对全世界数百万人的生活产生真正的影响</strong>。',
        'careers.description': '这就是我们TX制药所做的。作为全球领先的药用辅料制造商之一，我们不仅仅是制药公司的供应商。我们是行业中真正的合作伙伴和创新者，致力于改变生活的技术。',
        'careers.working.title': '在TX制药工作',
        'careers.working.link': '了解更多',
        'careers.facts.title': '关键事实',
        'careers.facts.link': '了解更多',
        'careers.positions.title': '招聘职位',
        'careers.positions.subtitle': '准备好在职业生涯中迈出下一步了吗？',
        'careers.yourcareer.title': '您在TX制药的职业生涯',
        'careers.yourcareer.description': '国际化工作环境、灵活性、良好的工作与生活平衡、开放的文化以及持续的学习和发展机会，这些只是我们提供的众多福利中的一部分。加入我们，成为年轻、充满活力的公司的一员。',
        'careers.yourcareer.button': '申请我们的开放职位',
        'careers.internships.title': '实习机会',
        'careers.internships.description': '您是否正在寻找一个具有挑战性但又有回报的实习或学徒机会，以建立您的人际网络，在制药行业获得关键经验，并以最佳方式开始您的职业生涯？',
        'careers.internships.button': '查看我们的实习机会',
        'careers.openings.title': '当前职位空缺',
        'careers.filter.all': '全部',
        'careers.apply': '立即申请',
        
        // About Page
        'about.title': '关于TX制药',
        'about.subtitle': '引领药用辅料创新',
        'about.intro.title': '我们是谁',
        'about.intro.description': 'TX制药是全球领先的药用辅料制造商，致力于通过创新解决方案改善生活。我们与全球制药公司合作，提供高质量的辅料，助力开发改变生活的药物。',
        'about.access.journey': '我们的历程',
        'about.access.values': '我们的价值观',
        'about.access.leadership': '领导团队',
        'about.access.experts': '我们的专家',
        'about.access.portfolio': '产品组合',
        
        // Excipients Page
        'excipients.title': '药用辅料',
        'excipients.search.placeholder': '搜索辅料',
        'excipients.filter.title': '筛选',
        'excipients.filter.show': '显示筛选器',
        'excipients.formulation.title': '找到您的理想辅料',
        'excipients.formulation.button': '配方工具',
        'excipients.category.oral': '口服固体制剂',
        'excipients.category.inhalation': '吸入制剂',
        'excipients.category.biopharma': '生物制药',
        'excipients.category.nutraceuticals': '营养保健品',
        'excipients.function.filler': '填充剂/稀释剂',
        'excipients.function.binder': '粘合剂',
        'excipients.function.disintegrant': '崩解剂',
        'excipients.function.lubricant': '润滑剂',
        
        // Contact Page
        'contact.title': '联系我们',
        'contact.section.title': '联系我们',
        'contact.office.title': '公司总部',
        'contact.offices.title': '全球办事处',
        'contact.offices.description': '联系您最近的办事处',
        'contact.offices.button': '办事处与经销商概览',
        'contact.form.title': '给我们留言',
        'contact.form.firstname': '姓',
        'contact.form.lastname': '名',
        'contact.form.email': '邮箱',
        'contact.form.company': '公司',
        'contact.form.subject': '主题',
        'contact.form.message': '消息',
        'contact.form.privacy': '我同意隐私政策并同意处理我的个人数据',
        'contact.form.newsletter': '我希望接收TX制药的新闻通讯和更新',
        'contact.form.submit': '发送消息',
        'contact.method.email.title': '邮件联系',
        'contact.method.phone.title': '电话联系',
        'contact.method.visit.title': '拜访我们',
        'contact.links.title': '快速链接',
        'contact.links.products': '产品信息',
        'contact.links.about': '关于TX制药',
        'contact.links.careers': '职业机会',
        'contact.links.support': '技术支持',
        
        // Footer
        'footer.about': '关于我们',
        'footer.products': '产品',
        'footer.support': '支持',
        'footer.follow': '关注我们',
        'footer.copyright': '© 2024 TX制药。保留所有权利。'
    }
};

// Language management
let currentLanguage = localStorage.getItem('language') || 'en';

function translateElement(element, key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        const translation = translations[currentLanguage][key];
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
            element.placeholder = translation;
        } else if (element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.innerHTML = translation;
        }
    }
}

function translatePage() {
    // Update language indicator
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = currentLanguage.toUpperCase();
    }
    
    // Update active state of language options
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === currentLanguage) {
            option.classList.add('active');
        }
    });
    
    // Translate all elements with data-i18n attributes
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        translateElement(element, key);
    });
    
    // Handle specific page elements that need special translation
    const pageSpecificTranslations = {
        'contact.html': translateContactPage,
        'excipients.html': translateExcipientsPage,
        'about.html': translateAboutPage
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    if (pageSpecificTranslations[currentPage]) {
        pageSpecificTranslations[currentPage]();
    }
    
    // Store language preference
    localStorage.setItem('language', currentLanguage);
    
    // Track language change
    trackEvent('Language', 'Change', currentLanguage);
}

function translateContactPage() {
    if (!window.location.pathname.includes('contact')) return;
    
    // Translate form placeholders and labels
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect && currentLanguage === 'cn') {
        const options = subjectSelect.querySelectorAll('option');
        const chineseOptions = [
            '请选择主题',
            '一般咨询',
            '技术支持',
            '销售咨询',
            '合作伙伴',
            '职业机会'
        ];
        options.forEach((option, index) => {
            if (index < chineseOptions.length) {
                option.textContent = chineseOptions[index];
            }
        });
    } else if (subjectSelect && currentLanguage === 'en') {
        const options = subjectSelect.querySelectorAll('option');
        const englishOptions = [
            'Please select a subject',
            'General Inquiry',
            'Technical Support',
            'Sales Inquiry',
            'Partnership',
            'Career Opportunities'
        ];
        options.forEach((option, index) => {
            if (index < englishOptions.length) {
                option.textContent = englishOptions[index];
            }
        });
    }
    
    // Translate message placeholder
    const messageField = document.getElementById('message');
    if (messageField) {
        const placeholder = currentLanguage === 'cn' ? '请描述您的询问...' : 'Please describe your inquiry...';
        messageField.placeholder = placeholder;
    }
}

function translateExcipientsPage() {
    if (!window.location.pathname.includes('excipients')) return;
    
    // Add any excipients-specific translations here
    const searchInput = document.getElementById('excipient-search');
    if (searchInput) {
        const placeholder = currentLanguage === 'cn' ? '搜索辅料' : 'Search excipients';
        searchInput.placeholder = placeholder;
    }
}

function translateAboutPage() {
    if (!window.location.pathname.includes('about')) return;
    
    // Add any about-specific translations here
}

// Language selector functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('languageSelector');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (languageSelector) {
        // Toggle dropdown
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageSelector.classList.remove('active');
        });
        
        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const selectedLang = this.dataset.lang;
                if (selectedLang !== currentLanguage) {
                    currentLanguage = selectedLang;
                    translatePage();
                    showNotification(
                        currentLanguage === 'cn' ? '语言已切换为中文' : 'Language switched to English',
                        'success'
                    );
                }
                
                languageSelector.classList.remove('active');
            });
        });
    }
    
    // Initial page translation
    translatePage();
    
    // Re-translate page when DOM content changes (for dynamic content)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const elementsToTranslate = node.querySelectorAll('[data-i18n]');
                        elementsToTranslate.forEach(element => {
                            const key = element.getAttribute('data-i18n');
                            translateElement(element, key);
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Utility function to get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Utility function to set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        translatePage();
        return true;
    }
    return false;
}

// Excipients Page Pagination Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only run on excipients page
    if (!window.location.pathname.includes('excipients')) return;
    
    const PRODUCTS_PER_PAGE = 6;
    let currentPage = 1;
    
    const productsGrid = document.getElementById('products-grid');
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageNumbers = document.getElementById('page-numbers');
    
    if (!productsGrid) return;
    
    function initializePagination() {
        const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const totalProducts = productCards.length;
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
        
        // Hide pagination if products <= 6
        if (totalProducts <= PRODUCTS_PER_PAGE) {
            pagination.style.display = 'none';
            showAllProducts();
            return;
        }
        
        // Show pagination if products > 6
        pagination.style.display = 'flex';
        setupPagination(totalPages);
        showPage(1);
    }
    
    function setupPagination(totalPages) {
        // Clear existing page numbers
        pageNumbers.innerHTML = '';
        
        // Create page number buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-btn';
            pageBtn.textContent = i;
            pageBtn.setAttribute('data-page', i);
            
            if (i === 1) {
                pageBtn.classList.add('active');
            }
            
            pageBtn.addEventListener('click', function() {
                const page = parseInt(this.getAttribute('data-page'));
                goToPage(page);
            });
            
            pageNumbers.appendChild(pageBtn);
        }
        
        // Setup prev/next buttons
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(productsGrid.querySelectorAll('.product-card').length / PRODUCTS_PER_PAGE);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
        
        updatePaginationButtons(totalPages);
    }
    
    function goToPage(page) {
        currentPage = page;
        showPage(page);
        updatePaginationButtons();
        
        // Scroll to top of products grid
        productsGrid.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    function showPage(page) {
        const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        
        productCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function showAllProducts() {
        const productCards = productsGrid.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    function updatePaginationButtons(totalPages) {
        if (!pagination || pagination.style.display === 'none') return;
        
        const productCards = productsGrid.querySelectorAll('.product-card');
        const calculatedTotalPages = totalPages || Math.ceil(productCards.length / PRODUCTS_PER_PAGE);
        
        // Update prev button
        prevBtn.disabled = currentPage === 1;
        
        // Update next button
        nextBtn.disabled = currentPage === calculatedTotalPages;
        
        // Update page number buttons
        const pageButtons = pageNumbers.querySelectorAll('.page-btn');
        pageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.getAttribute('data-page')) === currentPage) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize pagination on page load
    initializePagination();
    
    // Re-initialize if products are dynamically added/removed
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.target === productsGrid) {
                initializePagination();
            }
        });
    });
    
    observer.observe(productsGrid, {
        childList: true
    });
}); 