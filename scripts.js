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

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Atualizar ano do footer
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();
    initTheme();
});

// Dark Theme Management
function toggleTheme() {
    const html = document.documentElement;
    const isDarkTheme = html.classList.contains('dark-theme');

    if (isDarkTheme) {
        html.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
    } else {
        html.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
    }
}

function initTheme() {
    // Verificar preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDarkTheme = savedTheme === 'dark' || (savedTheme === null && prefersDark);

    if (isDarkTheme) {
        document.documentElement.classList.add('dark-theme');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

function updateThemeIcon(isDark) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        if (isDark) {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        } else {
            themeToggle.classList.remove('fa-sun');
            themeToggle.classList.add('fa-moon');
        }
    }
}