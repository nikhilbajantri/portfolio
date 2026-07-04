const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../../public');

function generateRobots() {
  console.log('Generating robots.txt...');
  
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: https://nikhilbajantri.dev/sitemap.xml
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt);
  console.log('Generated robots.txt successfully.');
}

generateRobots();
module.exports = { generateRobots };
