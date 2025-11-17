// ======================= CUSTOM CURSOR =======================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

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
    for (let i = 0; i < numberOfFlowers; i++) {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        flower.style.left = rect.left + rect.width / 2 + 'px';
        flower.style.top = rect.top + rect.height / 2 + 'px';
        flower.style.setProperty('--random-x', (Math.random() - 0.5) * 400 + 'px');
        flower.style.setProperty('--random-rotate', Math.random() * 500 + 'deg');
        flower.style.animationDelay = `${i * 0.1}s`;

        for (let j = 0; j < 5; j++) {
            const petal = document.createElement('div');
            petal.className = 'falling-petal';
            flower.appendChild(petal);
        }

        const center = document.createElement('div');
        center.className = 'falling-center';
        flower.appendChild(center);

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 3000);
    }
}

// ======================= MENU FULLSCREEN =======================
const menuToggle = document.getElementById('menuToggle');
const menuFull = document.querySelector('.menu-fullscreen');
const navLinksFull = document.querySelectorAll('.menu-fullscreen li a');

if (menuToggle && menuFull) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuFull.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

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
    for (let i = 0; i < numberOfBarks; i++) {
        const bark = document.createElement('div');
        bark.className = 'bark';
        bark.textContent = barkWords[Math.floor(Math.random() * barkWords.length)];
        bark.style.left = rect.left + rect.width / 2 + 'px';
        bark.style.top = rect.top + 'px';
        bark.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        bark.style.animationDelay = `${i * 0.15}s`;
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
    cvButton.addEventListener('click', () => {
        cvButton.style.opacity = '0';
        cvButton.style.pointerEvents = 'none';
        dogDelivery.style.display = 'block';
        setTimeout(() => dogDelivery.classList.add('running'), 100);
        setTimeout(() => {
            const rect = dogDelivery.getBoundingClientRect();
            createBarkEffect(rect);
        }, 2000);
    });

    dogDelivery.addEventListener('click', () => {
        downloadCV();
        thankYouMessage.classList.add('show');
        createSakuraRain();
        for (let i = 0; i < 3; i++) setTimeout(() => {
            const rect = dogDelivery.getBoundingClientRect();
            createBarkEffect(rect);
        }, i * 300);

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