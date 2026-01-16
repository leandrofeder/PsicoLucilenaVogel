const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;

const server = http.createServer((req, res) => {
    // Remove trailing slash
    let filePath = req.url === '/' ? '/index.html' : req.url;

    // Remove query strings
    filePath = filePath.split('?')[0];

    // Construct the full file path
    filePath = path.join(__dirname, filePath);

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();

    // MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.woff2': 'application/font-woff2',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve index.html (for SPA routing)
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Sorry, check with the site admin for error: ' + err);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`📝 SPA routing configurado - acesse /sobre, /faq, /metodo, /contato`);
    console.log(`⚠️  Pressione Ctrl+C para parar o servidor\n`);
});