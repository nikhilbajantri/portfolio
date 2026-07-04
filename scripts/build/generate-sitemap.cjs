const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../../src/content');
const PAGES_DIR = path.join(__dirname, '../../src/pages');
const PUBLIC_DIR = path.join(__dirname, '../../public');

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {} };
  const yamlStr = match[1];
  const data = {};
  yamlStr.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length < 2) return;
    const key = parts[0].trim();
    let value = parts.slice(1).join(':').trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    data[key] = value;
  });
  return { data };
}

function generateSitemap() {
  console.log('Generating sitemap...');
  
  const urls = [
    'https://nikhilbajantri.dev/',
    'https://nikhilbajantri.dev/writing',
    'https://nikhilbajantri.dev/work',
    'https://nikhilbajantri.dev/reading',
    'https://nikhilbajantri.dev/about',
    'https://nikhilbajantri.dev/now',
    'https://nikhilbajantri.dev/uses',
    'https://nikhilbajantri.dev/principles',
    'https://nikhilbajantri.dev/notes',
    'https://nikhilbajantri.dev/knowledge',
    'https://nikhilbajantri.dev/lab',
    'https://nikhilbajantri.dev/about/resume'
  ];

  // Add dynamic items from content folders
  const collections = [
    { name: 'writing', urlPrefix: 'https://nikhilbajantri.dev/writing/' },
    { name: 'projects', urlPrefix: 'https://nikhilbajantri.dev/work/' },
    { name: 'notes', urlPrefix: 'https://nikhilbajantri.dev/notes/' },
    { name: 'knowledge', urlPrefix: 'https://nikhilbajantri.dev/knowledge/' },
    { name: 'lab', urlPrefix: 'https://nikhilbajantri.dev/lab/' }
  ];

  collections.forEach(col => {
    const colDir = path.join(CONTENT_DIR, col.name);
    if (fs.existsSync(colDir)) {
      const files = fs.readdirSync(colDir).filter(f => f.endsWith('.md'));
      files.forEach(file => {
        const fileContent = fs.readFileSync(path.join(colDir, file), 'utf8');
        const { data } = parseFrontmatter(fileContent);
        if (data.draft === 'true' || data.draft === true) return;
        
        const slug = file.replace(/\.md$/, '');
        urls.push(`${col.urlPrefix}${slug}`);
      });
    }
  });

  const nowStr = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  urls.forEach(url => {
    sitemapXml += `  <url>
    <loc>${url}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url === 'https://nikhilbajantri.dev/' ? '1.0' : '0.8'}</priority>
  </url>
`;
  });

  sitemapXml += `</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml);
  console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
}

generateSitemap();
module.exports = { generateSitemap };
