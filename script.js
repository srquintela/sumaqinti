// ===========================
// NAVIGATION ACTIVE STATE
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavigation();
    setupNewsletterForm();
    setupLanguageSwitcher();
    contactFormSetup();
});

function contactFormSetup() {
    const form = document.getElementById("contactForm");
    const messageBox = document.getElementById("formMessage");

    if (form && messageBox) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // prevent redirect
            messageBox.className = "form-message"; // reset
            messageBox.textContent = "Sending...";
            messageBox.style.display = "block";

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form)
                });

                if (response.ok) {
                    messageBox.textContent = "Message sent successfully!";
                    messageBox.classList.add("success");
                    form.reset();
                } else {
                    messageBox.textContent = "Something went wrong. Please try again.";
                    messageBox.classList.add("error");
                }
            } catch (error) {
                messageBox.textContent = "Network error. Please try again later.";
                messageBox.classList.add("error");
            }
        });
    }

}

function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').filter(p => p).join('/');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');

        // Check if this link matches the current page
        if (
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html') ||
            currentPage.includes(href.replace('./', '').replace('../', ''))
        ) {
            link.classList.add('active');
        }
    });
}

// ===========================
// LANGUAGE SWITCHER
// ===========================

function setupLanguageSwitcher() {
    const toggle = document.querySelector('.lang-toggle');
    const menu = document.querySelector('.lang-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        menu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lang-switcher')) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
        }
    });
}

// ===========================
// NEWSLETTER FORM
// ===========================

function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        const originalText = button.textContent;

        // Simulate form submission
        button.textContent = 'Subscribing...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Thanks for subscribing!';
            button.style.background = 'var(--success-color)';

            setTimeout(() => {
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// ===========================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ===========================

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===========================
// FADE IN ANIMATIONS ON SCROLL
// ===========================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe cards and sections
    document.querySelectorAll('.feature-card, .service-card, .article-card, .column').forEach(el => {
        observer.observe(el);
    });
}

if ('IntersectionObserver' in window) {
    observeElements();
}

// ===========================
// MOBILE MENU TOGGLE (Optional enhancement)
// ===========================

function setupMobileMenu() {
    // This is a placeholder for mobile menu functionality
    // You can enhance this with a hamburger menu if needed
    const navbar = document.querySelector('.navbar');

    // Adjust navbar on smaller screens
    if (window.innerWidth < 768) {
        // Mobile-specific behavior can be added here
    }
}

window.addEventListener('resize', setupMobileMenu);
setupMobileMenu();

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Track user scroll position (useful for analytics)
let scrollPosition = 0;
window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
});

// Get scroll position
function getScrollPosition() {
    return scrollPosition;
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
