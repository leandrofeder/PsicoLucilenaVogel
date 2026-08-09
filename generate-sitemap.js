const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.psicolucilenavogel.com.br';
const POSTS_DIR = path.join(__dirname, 'posts');
const OUTPUT_FILE = path.join(__dirname, 'sitemap.xml');

function formatDate(dateString) {
    if (!dateString) return new Date().toISOString().split('T')[0];
    return dateString.split('T')[0];
}

function buildUrlEntry({ loc, lastmod, changefreq, priority, news }) {
    const lines = [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`
    ];

    if (news) {
        lines.push('    <news:news>');
        lines.push('      <news:publication>');
        lines.push('        <news:name>Blog | Psicóloga Lucilena Vogel</news:name>');
        lines.push('        <news:language>pt</news:language>');
        lines.push('      </news:publication>');
        lines.push(`      <news:publication_date>${news.publicationDate}</news:publication_date>`);
        lines.push(`      <news:title>${news.title}</news:title>`);
        lines.push('    </news:news>');
    }

    lines.push('  </url>');
    return lines.join('\n');
}

function generateSitemap() {
    if (!fs.existsSync(POSTS_DIR)) {
        throw new Error('Diretório posts não encontrado: ' + POSTS_DIR);
    }

    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.json'));
    const urls = [
        buildUrlEntry({
            loc: `${SITE_URL}/`,
            lastmod: formatDate(new Date().toISOString()),
            changefreq: 'monthly',
            priority: '1.0'
        }),
        buildUrlEntry({
            loc: `${SITE_URL}/blog`,
            lastmod: formatDate(new Date().toISOString()),
            changefreq: 'weekly',
            priority: '0.8'
        })
    ];

    files.sort().forEach(file => {
        const slug = path.basename(file, '.json');
        const filePath = path.join(POSTS_DIR, file);
        const raw = fs.readFileSync(filePath, 'utf8');
        let data = {};

        try {
            data = JSON.parse(raw);
        } catch (err) {
            console.warn(`Aviso: não foi possível ler JSON do post ${file}. Ignorando.`);
            return;
        }

        const lastmod = formatDate(data.date || new Date().toISOString());
        const title = data.title || slug;

        urls.push(buildUrlEntry({
            loc: `${SITE_URL}/blog/${slug}`,
            lastmod,
            changefreq: 'monthly',
            priority: '0.7',
            news: {
                publicationDate: lastmod,
                title
            }
        }));
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls.join('\n')}\n</urlset>\n`;
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');
    console.log(`Sitemap gerado em: ${OUTPUT_FILE}`);
}

if (require.main === module) {
    try {
        generateSitemap();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
