// Optimized JavaScript for Performance - Nellys Portfolio
// Using modern ES6+ features, debouncing, and lazy loading

<<<<<<< Updated upstream
// ======================= UTILITIES =======================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ======================= CUSTOM CURSOR (Desktop Only) =======================
const initCursor = () => {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    const updateCursor = throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }, 16); // ~60fps
    
    document.addEventListener('mousemove', updateCursor, { passive: true });
    
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorFollower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(1.5)', { passive: true });
        el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', ''), { passive: true });
=======
if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        mouseX = e.clientX;
        mouseY = e.clientY;
>>>>>>> Stashed changes
    });
};

<<<<<<< Updated upstream
// ======================= SMOOTH SCROLL =======================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                const menuToggle = document.getElementById('menuToggle');
                const menuFull = document.querySelector('.menu-fullscreen');
                if (menuToggle && menuFull) {
                    menuToggle.classList.remove('active');
                    menuFull.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
};

// ======================= SAKURA FLOWERS =======================
const createFallingFlowers = (rect) => {
    const fragment = document.createDocumentFragment();
    const numberOfFlowers = 20; // Reduced for performance
    
=======
    function animateCursor() {
        cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
        cursorFollower.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ======================= SMOOTH SCROLL =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ======================= FLORES SAKURA =======================
const sakuraLogo = document.querySelector('.sakura-logo');
if (sakuraLogo) {
    const logoRect = sakuraLogo.getBoundingClientRect(); // calcular solo 1 vez
    sakuraLogo.addEventListener('click', () => createFallingFlowers(logoRect));
}

function createFallingFlowers(rect) {
    const numberOfFlowers = 30;
>>>>>>> Stashed changes
    for (let i = 0; i < numberOfFlowers; i++) {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.style.left = rect.left + rect.width / 2 + 'px';
        flower.style.top = rect.top + rect.height / 2 + 'px';
        flower.style.setProperty('--random-x', (Math.random() - 0.5) * 400 + 'px');
        flower.style.setProperty('--random-rotate', Math.random() * 500 + 'deg');
<<<<<<< Updated upstream
        flower.style.animationDelay = `${i * 0.05}s`;
        
        // Create petals
=======
        flower.style.animationDelay = `${i * 0.1}s`;

>>>>>>> Stashed changes
        for (let j = 0; j < 5; j++) {
            const petal = document.createElement('div');
            petal.className = 'falling-petal';
            flower.appendChild(petal);
        }
        
        const center = document.createElement('div');
        center.className = 'falling-center';
        flower.appendChild(center);
        
        fragment.appendChild(flower);
        setTimeout(() => flower.remove(), 2500);
    }
    
    document.body.appendChild(fragment);
};

<<<<<<< Updated upstream
const initSakuraLogo = () => {
    const sakuraLogo = document.querySelector('.sakura-logo');
    if (!sakuraLogo) return;
    
    let lastClick = 0;
    sakuraLogo.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastClick < 1000) return; // Debounce
        lastClick = now;
        
        const rect = sakuraLogo.getBoundingClientRect();
        createFallingFlowers(rect);
    });
};
=======
// ======================= MENU FULLSCREEN =======================
const menuToggle = document.getElementById('menuToggle');
const menuFull = document.querySelector('.menu-fullscreen');
const navLinksFull = document.querySelectorAll('.menu-fullscreen li a');
>>>>>>> Stashed changes

// ======================= MENU FULLSCREEN =======================
const initMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuFull = document.querySelector('.menu-fullscreen');
    const navLinksFull = document.querySelectorAll('.menu-fullscreen li a');
    
    if (!menuToggle || !menuFull) return;
    
    const toggleMenu = () => {
        const isActive = menuToggle.classList.toggle('active');
        menuFull.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', isActive);
    };
    
    menuToggle.addEventListener('click', toggleMenu);
    navLinksFull.forEach(link => link.addEventListener('click', toggleMenu));
};

<<<<<<< Updated upstream
// ======================= DOG DELIVERY & CV =======================
const barkWords = ['¡GUAU!', '¡WOOF!', '¡ARF!', '🦴', '❤️'];

const createBarkEffect = (rect) => {
    const fragment = document.createDocumentFragment();
    const numberOfBarks = 3;
    
=======
    navLinksFull.forEach(link => link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menuFull.classList.remove('active');
        document.body.classList.remove('menu-open');
    }));
}

// ======================= PERRITO LADRANDO =======================
const dogContainer = document.querySelector('.dog-delivery');
const cv_btn = document.querySelector('.dog');
const barkWords = ['¡GUAU!', '¡WOOF!', '¡ARF!', '🦴', '❤️'];

function createBarkEffect(rect) {
    const numberOfBarks = 3;
>>>>>>> Stashed changes
    for (let i = 0; i < numberOfBarks; i++) {
        const bark = document.createElement('div');
        bark.className = 'bark';
        bark.textContent = barkWords[Math.floor(Math.random() * barkWords.length)];
        bark.style.left = rect.left + rect.width / 2 + 'px';
        bark.style.top = rect.top + 'px';
        bark.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        bark.style.animationDelay = `${i * 0.15}s`;
<<<<<<< Updated upstream
        fragment.appendChild(bark);
        setTimeout(() => bark.remove(), 2000);
    }
    
    document.body.appendChild(fragment);
};

const createSakuraRain = () => {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < 20; i++) { // Reduced for performance
        setTimeout(() => {
            const sakura = document.createElement('div');
            sakura.className = 'sakura-cv';
            
            for (let j = 0; j < 5; j++) {
                const petal = document.createElement('div');
                petal.className = 'sakura-petal-cv';
                petal.style.transform = `rotate(${j * 72}deg) translateY(-5px)`;
                sakura.appendChild(petal);
            }
            
            sakura.style.left = Math.random() * 100 + '%';
            sakura.style.top = '-50px';
            sakura.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            document.body.appendChild(sakura);
            setTimeout(() => sakura.remove(), 4000);
        }, i * 80);
    }
};

const downloadCV = () => {
    const cvUrl = 'pdf/cv_git.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'cv_git.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const initCVDelivery = () => {
    const cvButton = document.getElementById('cvButton');
    const dogDelivery = document.getElementById('dogDelivery');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (!cvButton || !dogDelivery || !thankYouMessage) return;
    
=======
        document.body.appendChild(bark);
        setTimeout(() => bark.remove(), 2000);
    }
}

if (dogContainer) {
    dogContainer.addEventListener('click', () => {
        const rect = dogContainer.getBoundingClientRect();
        createBarkEffect(rect);
    });
}

if (cv_btn) {
    cv_btn.addEventListener('mouseover', () => {
        const dialogo = document.createElement('div');
        dialogo.className = 'dialogo';
        dialogo.textContent = '¡Haz click para descargar!';
        document.body.appendChild(dialogo);
        setTimeout(() => dialogo.remove(), 1000);
    });
}

// ======================= CV DELIVERY =======================
const cvButton = document.getElementById('cvButton');
const dogDelivery = document.getElementById('dogDelivery');
const thankYouMessage = document.getElementById('thankYouMessage');

if (cvButton && dogDelivery && thankYouMessage) {
>>>>>>> Stashed changes
    cvButton.addEventListener('click', () => {
        cvButton.style.opacity = '0';
        cvButton.style.pointerEvents = 'none';
        dogDelivery.style.display = 'block';
<<<<<<< Updated upstream
        
        requestAnimationFrame(() => {
            dogDelivery.classList.add('running');
        });
        
=======
        setTimeout(() => dogDelivery.classList.add('running'), 100);
>>>>>>> Stashed changes
        setTimeout(() => {
            const rect = dogDelivery.getBoundingClientRect();
            createBarkEffect(rect);
        }, 2000);
    });
    
    dogDelivery.addEventListener('click', () => {
        downloadCV();
        thankYouMessage.style.display = 'block';
        requestAnimationFrame(() => {
            thankYouMessage.classList.add('show');
        });
        createSakuraRain();
<<<<<<< Updated upstream
        
        // Multiple barks
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rect = dogDelivery.getBoundingClientRect();
                createBarkEffect(rect);
            }, i * 300);
        }
        
        // Dog exits
=======
        for (let i = 0; i < 3; i++) setTimeout(() => {
            const rect = dogDelivery.getBoundingClientRect();
            createBarkEffect(rect);
        }, i * 300);

>>>>>>> Stashed changes
        setTimeout(() => {
            dogDelivery.style.left = '120%';
            setTimeout(() => {
                dogDelivery.style.display = 'none';
                dogDelivery.classList.remove('running');
                dogDelivery.style.left = '-200px';
                cvButton.style.opacity = '1';
                cvButton.style.pointerEvents = 'auto';
            }, 2000);
        }, 1500);
<<<<<<< Updated upstream
        
        // Hide thank you message
        setTimeout(() => {
            thankYouMessage.classList.remove('show');
            setTimeout(() => {
                thankYouMessage.style.display = 'none';
            }, 500);
        }, 3000);
    });
};

// ======================= SCROLL REVEAL ANIMATION =======================
const initScrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => revealObserver.observe(reveal));
};

// ======================= EMAILJS FORM =======================
const initContactForm = () => {
    // Wait for EmailJS to load
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded yet');
        return;
    }
    
    emailjs.init("RKV08n414RJKfVher");
    
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-status");
    
    if (!form || !feedback) return;
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
        feedback.textContent = "";
        
        try {
            await emailjs.sendForm("service_portfolio", "template_contact", form);
            feedback.textContent = "¡Mensaje enviado con éxito! 🎉";
            feedback.style.color = "var(--magenta)";
            form.reset();
            createSakuraRain();
        } catch (error) {
            feedback.textContent = "Ocurrió un error. Por favor, intenta de nuevo.";
            feedback.style.color = "red";
            console.error("EmailJS error:", error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
};

// ======================= CLOSE THANK YOU MESSAGE =======================
window.closeThankYouMessage = () => {
    const thankYouMessage = document.getElementById('thankYouMessage');
    if (thankYouMessage) {
        thankYouMessage.classList.remove('show');
        setTimeout(() => {
            thankYouMessage.style.display = 'none';
        }, 500);
    }
};

// ======================= SAKURA RAIN ON HIGHLIGHT HOVER =======================
const initHighlightEffect = () => {
    const highlight = document.querySelector('.highlight');
    if (!highlight) return;
    
    let lastRain = 0;
    const debouncedRain = () => {
        const now = Date.now();
        if (now - lastRain < 2000) return; // Debounce 2s
        lastRain = now;
        createSakuraRain();
    };
    
    highlight.addEventListener('mouseover', debouncedRain, { passive: true });
};

// ======================= LAZY LOAD IMAGES =======================
const initLazyLoad = () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// ======================= INIT ALL =======================
const init = () => {
    // Core functionality
    initSmoothScroll();
    initMenu();
    initScrollReveal();
    initLazyLoad();
    
    // Interactive features
    initSakuraLogo();
    initCVDelivery();
    initHighlightEffect();
    
    // Desktop only
    if (window.innerWidth >= 768) {
        initCursor();
    }
    
    // EmailJS - wait for script to load
    if (typeof emailjs !== 'undefined') {
        initContactForm();
    } else {
        window.addEventListener('load', () => {
            setTimeout(initContactForm, 1000);
        });
    }
};

// ======================= DOM READY =======================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ======================= PERFORMANCE MONITORING (Optional) =======================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn('Long task detected:', entry.name, entry.duration);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Silently fail if not supported
    }
}
=======

        setTimeout(() => {
            thankYouMessage.classList.remove('show');
        }, 2000);
    });
}
// ======================= DESCARGAR CV =======================
function downloadCV() {
    const cvUrl = 'pdf/cv_git.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'cv_git.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ======================= SAKURA RAIN =======================
let lastRain = 0;

function createSakuraRain() {
    const now = Date.now();
    if (now - lastRain < 1000) return;
    lastRain = now;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sakura = document.createElement('div');
            sakura.className = 'sakura-cv';
            for (let j = 0; j < 5; j++) {
                const petal = document.createElement('div');
                petal.className = 'sakura-petal-cv';
                petal.style.transform = `rotate(${j * 72}deg) translateY(-5px)`;
                sakura.appendChild(petal);
            }
            sakura.style.left = Math.random() * 100 + '%';
            sakura.style.top = '-50px';
            sakura.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
            document.body.appendChild(sakura);
            setTimeout(() => sakura.remove(), 4000);
        }, i * 100);
    }
}

// ======================= HIGHLIGHT HOVER =======================
const highlight = document.querySelector('.highlight');
if (highlight) highlight.addEventListener('mouseover', createSakuraRain);

// ======================= FORMULARIO EMAILJS =======================
emailjs.init("RKV08n414RJKfVher");

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Enviando...";
    feedback.style.color = "#000";

    try {
        await emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", form);
        feedback.textContent = "¡Mensaje enviado con éxito!";
        feedback.style.color = "green";
        form.reset();
    } catch (error) {
        feedback.textContent = "Ocurrió un error al enviar el mensaje.";
        feedback.style.color = "red";
        console.error("EmailJS error:", error);
    }
});
>>>>>>> Stashed changes
