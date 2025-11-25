// ========================================
// SZNOPAX ALAPÍTVÁNY - Nonprofit Weboldal
// JavaScript Funkciók
// ========================================

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.textContent = '☰';
        });
    });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'alert alert-success';
            successMsg.textContent = '✓ Köszönjük az üzenetét! Hamarosan válaszolunk.';
            successMsg.style.cssText = `
                background-color: #4CAF50;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 1rem;
                animation: fadeInUp 0.5s ease-out;
            `;
            
            contactForm.parentNode.insertBefore(successMsg, contactForm);
            
            // Reset form
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    }

    // ===== FADE-IN ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .team-member, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // ===== ACTIVE NAV LINK =====
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ===== GALLERY LIGHTBOX EFFECT =====
function openGalleryItem(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
    `;
    
    lightbox.appendChild(img);
    lightbox.addEventListener('click', function() {
        lightbox.remove();
    });
    
    document.body.appendChild(lightbox);
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Start counter animation when stats section is visible
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target')) || 100;
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
});
