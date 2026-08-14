const WHATSAPP_NUMBER = '5547991586284';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, gostaria de agendar uma sessão com a psicóloga Lucilena Vogel.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

function syncWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
        link.href = WHATSAPP_URL;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    if (!document.querySelector('.whatsapp-float')) {
        const floatButton = document.createElement('a');
        floatButton.className = 'whatsapp-float';
        floatButton.href = WHATSAPP_URL;
        floatButton.target = '_blank';
        floatButton.rel = 'noopener noreferrer';
        floatButton.setAttribute('aria-label', 'Falar no WhatsApp');
        floatButton.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
        document.body.appendChild(floatButton);
    }
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;

    const allFaqItems = document.querySelectorAll('.faq-item');

    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });

    faqItem.classList.toggle('active');
}

// Formulário de contato
async function handleSubmit(event) {
    event.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitButton = event.target.querySelector('.btn-submit');
    const form = event.target;

    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    };

    try {
        const response = await fetch('https://formsubmit.co/ajax/psilucilena@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || 'Não informado',
                message: formData.message,
                _subject: `Novo contato de ${formData.name}`,
                _template: 'table'
            })
        });

        if (response.ok) {
            formMessage.textContent = 'Mensagem enviada com sucesso! Retornarei em breve.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', { form_name: 'contact_form', status: 'success' });
            }
            form.reset();
        } else {
            throw new Error('Erro ao enviar');
        }
    } catch (error) {
        formMessage.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente ou use o WhatsApp.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', { form_name: 'contact_form', status: 'error' });
        }
    }

    submitButton.disabled = false;
    submitButton.textContent = 'Enviar mensagem';

    setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
}

// Menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks) navLinks.classList.toggle('active');
    if (menuToggle) menuToggle.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks) navLinks.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
}

document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.contains(event.target)) {
        closeMenu();
    }
});

// ── ROTEAMENTO (apenas para index.html) ─────────────────────────────────────
const routes = {
    '/': 'inicio',
    '/inicio': 'inicio',
    '/sobre': 'sobre',
    '/faq': 'faq',
    '/metodo': 'metodo',
    '/contato': 'contato'
};

const pageTitles = {
    '/': 'Psicóloga Lucilena Vogel | Terapia Cognitivo-Comportamental em Blumenau',
    '/inicio': 'Psicóloga Lucilena Vogel | Terapia Cognitivo-Comportamental em Blumenau',
    '/sobre': 'Sobre mim – Psicóloga Lucilena Vogel',
    '/faq': 'Dúvidas frequentes – Psicóloga Lucilena Vogel',
    '/metodo': 'Método de atendimento – Psicóloga Lucilena Vogel',
    '/contato': 'Contato – Psicóloga Lucilena Vogel'
};

function updatePageTitle(path) {
    document.title = pageTitles[path] || pageTitles['/'];
}

function handleNavClick(event, path) {
    if (path === '/blog' || path.startsWith('/blog/')) {
        return;
    }

    event.preventDefault();
    window.history.pushState({ path }, '', path);
    navigateTo(path);

    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', { page_path: path, page_title: document.title });
    }
}

function navigateTo(path) {
    const sectionId = routes[path] || 'inicio';
    const targetSection = document.getElementById(sectionId);
    updatePageTitle(path);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname || '/');
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    syncWhatsAppLinks();

    document.addEventListener('click', function(event) {
        const question = event.target.closest('.faq-question');
        if (question) {
            toggleFAQ(question);
        }

        const item = event.target.closest('.faq-item');
        if (item && !question && !event.target.closest('.faq-answer')) {
            const firstQuestion = item.querySelector('.faq-question');
            if (firstQuestion) toggleFAQ(firstQuestion);
        }
    });

    const revealItems = document.querySelectorAll('.section, .about-content, .faq-item, .contact-card, .method-card, .contact-form-container');
    revealItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 80}ms`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const urlParams = new URLSearchParams(window.location.search);
    const routeParam = urlParams.get('route');
    let currentPath = window.location.pathname || '/';

    if (routeParam && routes['/' + routeParam]) {
        currentPath = '/' + routeParam;
        window.history.replaceState({ path: currentPath }, '', currentPath);
    }

    if (currentPath !== '/' && routes[currentPath]) {
        setTimeout(() => navigateTo(currentPath), 100);
    } else if (currentPath === '/') {
        window.history.replaceState({ path: '/' }, '', '/');
        updatePageTitle('/');
    }
});