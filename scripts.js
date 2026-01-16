// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');

    // Fechar outros itens
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });

    // Toggle item atual
    faqItem.classList.toggle('active');
}

// Formulário de contato
async function handleSubmit(event) {
    event.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitButton = event.target.querySelector('.btn-submit');
    const form = event.target;

    // Desabilitar botão durante envio
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Pegar dados do formulário
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    };

    try {
        // Enviar e-mail usando FormSubmit
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
            // Mostrar mensagem de sucesso
            formMessage.textContent = 'Mensagem enviada com sucesso! Retornarei em breve.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Rastrear envio de formulário no Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    form_name: 'contact_form',
                    status: 'success'
                });
            }

            // Resetar formulário
            form.reset();
        } else {
            throw new Error('Erro ao enviar');
        }
    } catch (error) {
        // Mostrar mensagem de erro
        formMessage.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente ou use o WhatsApp.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';

        // Rastrear erro no Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                form_name: 'contact_form',
                status: 'error'
            });
        }
    }

    // Reabilitar botão
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar mensagem';

    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
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
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (!navbar.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Sistema de Roteamento
const routes = {
    '/': 'inicio',
    '/inicio': 'inicio',
    '/sobre': 'sobre',
    '/faq': 'faq',
    '/metodo': 'metodo',
    '/contato': 'contato'
};

function handleNavClick(event, path) {
    event.preventDefault();
    window.history.pushState({ path }, '', path);
    navigateTo(path);

    // Rastreamento de navegação no Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: path,
            page_title: document.title
        });
    }
}

function navigateTo(path) {
    const sectionId = routes[path] || 'inicio';
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Lidar com botão voltar do navegador
window.addEventListener('popstate', (event) => {
    const path = window.location.pathname || '/';
    navigateTo(path);
});

// Inicializar rota ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();

    // Verifica se veio de um 404 redirect com query parameter (GitHub Pages)
    const urlParams = new URLSearchParams(window.location.search);
    const routeParam = urlParams.get('route');

    let currentPath = window.location.pathname || '/';

    // Se vier com parâmetro route (do 404.html), usa esse
    if (routeParam && routes['/' + routeParam]) {
        currentPath = '/' + routeParam;
        // Limpa a URL removendo o query parameter
        window.history.replaceState({ path: currentPath }, '', currentPath);
    }

    // Se não for a raiz e tiver rota válida, navega
    if (currentPath !== '/' && routes[currentPath]) {
        setTimeout(() => {
            navigateTo(currentPath);
        }, 100);
    } else if (currentPath === '/') {
        window.history.replaceState({ path: '/' }, '', '/');
    }
});

// Também navegar se a página foi carregada com URL específica
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const routeParam = urlParams.get('route');

    let currentPath = window.location.pathname || '/';

    if (routeParam && routes['/' + routeParam]) {
        currentPath = '/' + routeParam;
    }

    if (currentPath !== '/' && routes[currentPath]) {
        navigateTo(currentPath);
    }
});