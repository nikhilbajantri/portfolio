const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../../src/content');
const GENERATED_DIR = path.join(__dirname, '../../public/generated');

// Helper to parse basic YAML frontmatter using regex (no dependencies needed)
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: fileContent };
  
  const yamlStr = match[1];
  const content = fileContent.slice(match[0].length);
  const data = {};
  
  yamlStr.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length < 2) return;
    const key = parts[0].trim();
    let value = parts.slice(1).join(':').trim();
    
    // Clean string values
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (!isNaN(value) && value !== '') {
      value = Number(value);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      // Parse array
      value = value.slice(1, -1).split(',').map(item => {
        let val = item.trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        return val;
      }).filter(x => x !== '');
    }
    
    data[key] = value;
  });
  
  return { data, content };
}

// Recursively find all markdown files in a directory
function getMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  
  return results;
}

function generateSearchIndex() {
  console.log('Generating search index...');
  
  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }

  const collections = [
    { name: 'writing', category: 'article', urlPrefix: '/writing/' },
    { name: 'projects', category: 'project', urlPrefix: '/work/' },
    { name: 'notes', category: 'note', urlPrefix: '/notes/' },
    { name: 'knowledge', category: 'knowledge', urlPrefix: '/knowledge/' },
    { name: 'lab', category: 'lab', urlPrefix: '/lab/' }
  ];

  const searchItems = [];
  const tagCounts = {};

  collections.forEach(col => {
    const colDir = path.join(CONTENT_DIR, col.name);
    const files = getMarkdownFiles(colDir);

    files.forEach(file => {
      const relativePath = path.relative(colDir, file);
      const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
      const fileContent = fs.readFileSync(file, 'utf8');
      const { data, content } = parseFrontmatter(fileContent);

      if (data.draft) return; // skip drafts

      const title = data.title || slug;
      const description = data.description || '';
      const tags = data.tags || [];
      const priority = data.priority || 50;
      const aliases = data.aliases || [];
      const pinned = data.pinned || data.featured || false;

      // URL building
      let url = `${col.urlPrefix}${slug}`;
      if (col.category === 'project' && data.caseStudy) {
        url = data.caseStudy;
      }

      searchItems.push({
        id: data.id || `${col.category}-${slug}`,
        title,
        description,
        category: col.category,
        url,
        aliases,
        pinned,
        tags,
        priority
      });

      // Track popular tags
      tags.forEach(tag => {
        const cleanTag = tag.toLowerCase().trim();
        tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
      });
    });
  });

  // Sort search items by priority desc, then title asc
  searchItems.sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));

  const nowStr = new Date().toISOString();
  const searchJson = {
    version: 1,
    generatedAt: nowStr,
    lastIndexed: nowStr,
    items: searchItems
  };

  fs.writeFileSync(
    path.join(GENERATED_DIR, 'search-v1.json'),
    JSON.stringify(searchJson, null, 2)
  );
  console.log(`Generated search-v1.json with ${searchItems.length} items.`);

  // Write popular tags
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(entry => ({ tag: entry[0], count: entry[1] }));

  fs.writeFileSync(
    path.join(GENERATED_DIR, 'popular-tags.json'),
    JSON.stringify(popularTags, null, 2)
  );
  console.log(`Generated popular-tags.json with ${popularTags.length} tags.`);
}

generateSearchIndex();
module.exports = { generateSearchIndex };
