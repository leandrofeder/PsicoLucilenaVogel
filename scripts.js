/**
 * Psicóloga Lucilena Vogel — Main Scripts
 * Handles: routing, navigation, FAQ toggle, scroll reveal, WhatsApp integration
 */

'use strict';

// ── Constants ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '5547991586284';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, gostaria de agendar uma sessão com a psicóloga Lucilena Vogel.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// ── WhatsApp Links ───────────────────────────────────────────────────────────
function syncWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
        link.href = WHATSAPP_URL;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Create floating WhatsApp button if not present
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

// ── FAQ Toggle ───────────────────────────────────────────────────────────────
function initFAQ() {
    document.addEventListener('click', function (event) {
        const question = event.target.closest('.faq-question');
        if (!question) return;

        const faqItem = question.closest('.faq-item');
        if (!faqItem) return;

        const isActive = faqItem.classList.contains('active');
        const answer = faqItem.querySelector('.faq-answer');

        // Close all other items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const btn = item.querySelector('.faq-question');
                const ans = item.querySelector('.faq-answer');
                if (btn) btn.setAttribute('aria-expanded', 'false');
                if (ans) ans.setAttribute('aria-hidden', 'true');
            }
        });

        // Toggle current item
        faqItem.classList.toggle('active');
        question.setAttribute('aria-expanded', !isActive);
        if (answer) answer.setAttribute('aria-hidden', isActive);
    });

    // Keyboard support for FAQ items
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            const question = event.target.closest('.faq-question');
            if (question) {
                event.preventDefault();
                question.click();
            }
        }
    });
}

// ── Contact Form ─────────────────────────────────────────────────────────────
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
            formMessage.textContent = 'Mensagem enviada com sucesso. Retornarei em breve.';
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

    setTimeout(() => {
        if (formMessage) formMessage.style.display = 'none';
    }, 5000);
}

// ── Menu Toggle ──────────────────────────────────────────────────────────────
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks) navLinks.classList.toggle('active');
    if (menuToggle) {
        menuToggle.classList.toggle('active');
        const isOpen = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu de navegação');
    }
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks) navLinks.classList.remove('active');
    if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('navLinks');
    if (navbar && navLinks && navLinks.classList.contains('active') && !navbar.contains(event.target)) {
        closeMenu();
    }
});

// Close menu on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

// ── Navbar Scroll Effect ─────────────────────────────────────────────────────
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;

    function updateNavbar() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// ── Scroll Reveal ────────────────────────────────────────────────────────────
function initScrollReveal() {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const revealElements = document.querySelectorAll('.section, .about-content, .faq-item, .contact-card, .method-card');

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Stagger delay: 50ms between items, max 250ms
        const delay = Math.min(index * 50, 250);
        el.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
}

// ── Routing (SPA-like navigation for index.html) ─────────────────────────────
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
    if (path === '/blog' || (path && path.startsWith('/blog/'))) {
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
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname || '/');
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ── Initialization ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, 0);

    syncWhatsAppLinks();
    initFAQ();
    initNavbarScroll();
    initScrollReveal();

    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Handle initial route
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

window.addEventListener('pageshow', function () {
    window.scrollTo(0, 0);
});
