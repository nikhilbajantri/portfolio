const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../../src/content');
const FEEDS_DIR = path.join(__dirname, '../../public/feeds');

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

function generateFeeds() {
  console.log('Generating RSS feeds...');
  
  if (!fs.existsSync(FEEDS_DIR)) {
    fs.mkdirSync(FEEDS_DIR, { recursive: true });
  }

  const articlesDir = path.join(CONTENT_DIR, 'writing');
  let items = [];

  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      const fileContent = fs.readFileSync(path.join(articlesDir, file), 'utf8');
      const { data } = parseFrontmatter(fileContent);
      if (data.draft === 'true' || data.draft === true) return;
      
      const slug = file.replace(/\.md$/, '');
      items.push({
        title: data.title || slug,
        description: data.description || '',
        published: new Date(data.published || Date.now()),
        url: `https://nikhilbajantri.dev/writing/${slug}`,
        category: data.category || 'Writing'
      });
    });
  }

  // Sort descending by date
  items.sort((a, b) => b.published.getTime() - a.published.getTime());

  const buildDateStr = new Date().toUTCString();

  // 1. RSS 2.0 Feed
  let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Nikhil Bajantri</title>
  <link>https://nikhilbajantri.dev</link>
  <description>A place to build, learn, write, and think in public.</description>
  <language>en-us</language>
  <pubDate>${buildDateStr}</pubDate>
  <lastBuildDate>${buildDateStr}</lastBuildDate>
  <atom:link href="https://nikhilbajantri.dev/feeds/rss.xml" rel="self" type="application/rss+xml" />
`;

  items.forEach(item => {
    rssXml += `  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.url}</link>
    <guid>${item.url}</guid>
    <pubDate>${item.published.toUTCString()}</pubDate>
    <description><![CDATA[${item.description}]]></description>
    <category>${item.category}</category>
  </item>
`;
  });

  rssXml += `</channel>
</rss>`;

  // 2. Atom Feed
  let atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Nikhil Bajantri</title>
  <subtitle>A place to build, learn, write, and think in public.</subtitle>
  <link href="https://nikhilbajantri.dev/feeds/atom.xml" rel="self"/>
  <link href="https://nikhilbajantri.dev/"/>
  <updated>${new Date().toISOString()}</updated>
  <id>https://nikhilbajantri.dev/</id>
  <author>
    <name>Nikhil Bajantri</name>
    <email>nikhilbajantri2604@gmail.com</email>
  </author>
`;

  items.forEach(item => {
    atomXml += `  <entry>
    <title><![CDATA[${item.title}]]></title>
    <link href="${item.url}"/>
    <id>${item.url}</id>
    <updated>${item.published.toISOString()}</updated>
    <summary><![CDATA[${item.description}]]></summary>
  </entry>
`;
  });

  atomXml += `</feed>`;

  // 3. JSON Feed
  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Nikhil Bajantri",
    home_page_url: "https://nikhilbajantri.dev",
    feed_url: "https://nikhilbajantri.dev/feeds/feed.json",
    description: "A place to build, learn, write, and think in public.",
    author: {
      name: "Nikhil Bajantri",
      url: "https://nikhilbajantri.dev"
    },
    items: items.map(item => ({
      id: item.url,
      url: item.url,
      title: item.title,
      summary: item.description,
      date_published: item.published.toISOString()
    }))
  };

  fs.writeFileSync(path.join(FEEDS_DIR, 'rss.xml'), rssXml);
  fs.writeFileSync(path.join(FEEDS_DIR, 'atom.xml'), atomXml);
  fs.writeFileSync(path.join(FEEDS_DIR, 'feed.json'), JSON.stringify(jsonFeed, null, 2));

  console.log(`Generated RSS feeds under public/feeds/ directory.`);
}

generateFeeds();
module.exports = { generateFeeds };
