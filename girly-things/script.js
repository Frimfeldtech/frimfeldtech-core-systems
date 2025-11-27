/* ============================================
   GIRLY THINGS - INTERACTIVE SCRIPT
   "No tan girly, sí tan cosas"
   ============================================ */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for section reveals
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all sections with reveal animation
document.querySelectorAll('.section-reveal').forEach(section => {
    sectionObserver.observe(section);
});

// Animate stats counter
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString('es-ES');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('es-ES');
        }
    };

    updateCounter();
};

// Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Form validation and submission
const newsletterForm = document.getElementById('newsletter-form');
const formSuccess = document.getElementById('form-success');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        let isValid = true;

        if (name === '') {
            showError('name-error', 'Por favor ingresa tu nombre');
            isValid = false;
        }

        if (email === '') {
            showError('email-error', 'Por favor ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Por favor ingresa un email válido');
            isValid = false;
        }

        if (!isValid) return;

        // Simulate form submission
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Enviando...</span>';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Success animation
            formSuccess.classList.add('show');
            newsletterForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);

            // Optional: Send to analytics or backend
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'Newsletter Secreta'
                });
            }

            console.log('Newsletter signup:', { name, email, message });
        }, 1500);
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu toggle (basic implementation)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Add parallax effect to hero background
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Add AOS-like data attributes functionality
const elementsWithAOS = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            aosObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

elementsWithAOS.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    aosObserver.observe(element);
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'pulse 0.5s ease 3';
    console.log('🎉 ¡Has encontrado el código secreto! Bienvenida al club ultra VIP de Girly things.');

    // Create confetti effect
    const colors = ['#FF005C', '#6D28D9', '#8B5CF6'];
    for (let i = 0; i < 50; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    document.body.appendChild(confetti);

    const fallDuration = 3000 + Math.random() * 2000;
    const fallDistance = window.innerHeight + 20;
    const drift = (Math.random() - 0.5) * 200;

    confetti.animate([
        {
            transform: 'translateY(0) translateX(0) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translateY(${fallDistance}px) translateX(${drift}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0
        }
    ], {
        duration: fallDuration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.duration.toFixed(2), 'ms');
        }
    });

    // Uncomment to enable performance monitoring
    // perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// Log initialization
console.log('%c✨ Girly things ✨', 'color: #FF005C; font-size: 24px; font-weight: bold;');
console.log('%cNo tan girly, sí tan cosas', 'color: #6D28D9; font-size: 14px;');
console.log('%c💌 ¿Te gustaría colaborar? Escríbenos a hola@girlythings.com', 'color: #F5F5F5; font-size: 12px;');
