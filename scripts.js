// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
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
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
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

function handleNavClick(event, path) {
    // Blog é página separada — deixa o href funcionar normalmente
    if (path === '/blog' || path.startsWith('/blog/')) {
        return; // não chama preventDefault
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
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname || '/');
});

document.addEventListener('DOMContentLoaded', function() {
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
    }
});