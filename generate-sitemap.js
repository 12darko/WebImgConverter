import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://vormpixyze.com';

// Define all static routes
const routes = [
    '/',
    '/heic-to-jpg',
    '/png-to-jpg',
    '/webp-to-jpg',
    '/remove-background',
    '/compress-image',
    '/app',
    '/about',
    '/privacy',
    '/terms',
    '/contact'
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;

    const publicDir = path.resolve(__dirname, 'public');

    // Ensure public dir exists
    if (!fs.existsSync(publicDir)) {
        try {
            fs.mkdirSync(publicDir, { recursive: true });
        } catch (e) {
            console.error('Failed to create public directory:', e);
        }
    }

    // Write files
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    const robotsPath = path.join(publicDir, 'robots.txt');

    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Generated sitemap at ${sitemapPath}`);

    fs.writeFileSync(robotsPath, robotsTxt);
    console.log(`Generated robots.txt at ${robotsPath}`);
};

generateSitemap();
