# Psicóloga Lucilena Vogel - Site

Site profissional para psicóloga Lucilena Vogel com atendimento em Terapia Cognitivo-Comportamental (TCC).

## 🚀 Deployment no GitHub Pages

### 1. Configuração Inicial

1. Faça push do código para seu repositório GitHub
2. Vá para as **Settings** do repositório
3. Navegue até **Pages** (esquerda lateral)
4. Em "Source", selecione **Deploy from a branch**
5. Escolha a branch **main** (ou a que estiver usando)
6. Clique em **Save**

### 2. Ativar o Site

O site estará acessível em:
```
https://[seu-usuario].github.io/[nome-do-repositorio]
```

Ou se usar um domínio customizado:
```
https://psicolucilenavogel.com.br
```

### 3. Configurar Domínio Customizado (Opcional)

1. Vá para **Settings > Pages**
2. Em "Custom domain", digite seu domínio
3. Clique em **Save**
4. Configure os registros DNS no seu registrador:
   - **CNAME** apontando para `[usuario].github.io`

## 🔗 Roteamento SPA (Single Page Application)

O site usa roteamento do lado do cliente. As URLs funcionam da seguinte forma:

- `/` → Página inicial
- `/sobre` → Seção sobre
- `/faq` → Perguntas frequentes
- `/metodo` → Método de atendimento
- `/contato` → Formulário de contato

### Como Funciona

1. O arquivo `404.html` é acionado quando você tenta acessar `/sobre`, `/faq`, etc
2. Ele redireciona para `index.html` mantendo a rota como parâmetro
3. O `scripts.js` detecta o parâmetro e navega para a seção correta
4. O histórico do navegador funciona normalmente com os botões voltar/avançar

## 💻 Desenvolvimento Local

### Com Node.js
```bash
cd PsicoLucilenaVogel
node server.js
```
Acesse: `http://localhost:5500`

### Com Live Server (VS Code)
Instale a extensão "Live Server" e clique em "Go Live"

## 📁 Estrutura do Projeto

```
PsicoLucilenaVogel/
├── index.html           # Arquivo principal
├── styles.css          # Estilos personalizados
├── scripts.js          # Lógica e roteamento
├── manifest.json       # PWA manifest
├── 404.html           # Página de erro para SPA routing
├── _config.yml        # Configuração Jekyll/GitHub Pages
├── robots.txt         # Regras para crawlers
├── sitemap.xml        # Mapa do site
├── server.js          # Servidor Node.js (local)
├── package.json       # Dependências Node.js
├── .htaccess          # Configuração Apache
└── assets/            # Imagens e recursos
    ├── logo/
    ├── profile/
    └── icon/
```

## 🔍 SEO & Performance

- ✅ Meta tags otimizadas para Google
- ✅ Structured Data (Schema.org JSON-LD)
- ✅ Open Graph para redes sociais
- ✅ Lazy loading de imagens
- ✅ Sitemap e robots.txt configurados
- ✅ Google Analytics integrado
- ✅ PWA ready (manifest.json)

## 📊 Monitoramento

### Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione seu domínio
3. Valide a propriedade
4. Envie o sitemap: `/sitemap.xml`

### Google Analytics
Já configurado com ID: `G-Y3WPG6992F`

## 🛠️ Troubleshooting

### URLs não funcionam no GitHub Pages
- Verifique se o `404.html` está no repositório
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Aguarde até 5 minutos para as mudanças propagarem

### Imagens não aparecem
- Verifique se os arquivos estão na pasta `assets/`
- Confirme os caminhos das imagens em `index.html`

### Analytics não funciona
- Verifique se tem acesso à internet
- Confirme o ID do GA em `index.html`

## 📝 Licença

MIT License - Todos os direitos reservados à Psicóloga Lucilena Vogel (CRP 12/25849)

## 📧 Contato

- Email: psilucilena@gmail.com
- Instagram: @psicolucilenavogel
- WhatsApp: https://wa.link/s099k9
