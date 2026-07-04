const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../src/pages');
const OUTPUT_FILE = path.join(__dirname, '../public/search-index.json');

// Rich metadata overrides configuration
const metadataOverrides = {
  "/work/dailydine": {
    id: "project-dailydine",
    category: "project",
    aliases: ["dd", "reservation", "booking", "seating"],
    pinned: true,
    tags: ["postgres", "restaurant", "booking", "startup", "architecture", "docker", "concurrency"],
    year: 2026,
    status: "Active"
  },
  "/work/xeliq": {
    id: "project-xeliq",
    category: "project",
    aliases: ["xq", "travel", "creator", "offline"],
    pinned: true,
    tags: ["swift", "ios", "sqlite", "sync", "media", "pipeline", "mobile"],
    year: 2026,
    status: "Active"
  },
  "/work/codebud": {
    id: "project-codebud",
    category: "project",
    aliases: ["cb", "keycloak", "rbac", "auth"],
    pinned: true,
    tags: ["keycloak", "auth", "security", "middleware", "rbac", "typescript"],
    year: 2025,
    status: "Production"
  },
  "/work/great-british-doner": {
    id: "project-gbd",
    category: "project",
    aliases: ["gbd", "sanity", "cms"],
    pinned: false,
    tags: ["nextjs", "sanity", "cms", "seo", "restaurant", "isr"],
    year: 2025,
    status: "Production"
  },
  "/work/shiktra-technologies": {
    id: "project-shiktra",
    category: "project",
    aliases: ["st", "corporate", "branding"],
    pinned: false,
    tags: ["nextjs", "react", "tailwind", "design-system"],
    year: 2025,
    status: "Client Delivery"
  },
  "/work/ivytree-essex": {
    id: "project-ivytree",
    category: "project",
    aliases: ["ie", "educational", "school"],
    pinned: false,
    tags: ["nextjs", "strapi", "postgresql", "enrollment"],
    year: 2024,
    status: "Production"
  },
  "/work/doqtra": {
    id: "project-doqtra",
    category: "project",
    aliases: ["dq", "clinical", "medical"],
    pinned: false,
    tags: ["nextjs", "tailwind", "compliance", "diagnostics"],
    year: 2024,
    status: "Client Delivery"
  },
  "/work/42-holborn": {
    id: "project-holborn",
    category: "project",
    aliases: ["holborn", "wp", "wordpress"],
    pinned: false,
    tags: ["wordpress", "php", "mysql", "custom-theme"],
    year: 2023,
    status: "Maintained"
  },
  "/work/ssosc": {
    id: "project-ssosc",
    category: "project",
    aliases: ["ssosc", "open-source", "community"],
    pinned: false,
    tags: ["nextjs", "github-api", "community", "hackathon"],
    year: 2024,
    status: "Maintained"
  },
  "/work/hisabprox": {
    id: "project-hisabprox",
    category: "project",
    aliases: ["hp", "invoice", "billing"],
    pinned: false,
    tags: ["typescript", "react", "pdfkit", "local-storage", "offline-first"],
    year: 2024,
    status: "Archived"
  },
  "/writing/why-small-systems-win": {
    id: "article-why-small-systems-win",
    category: "article",
    aliases: ["small-systems", "simplicity", "minimalism"],
    pinned: true,
    tags: ["architecture", "minimalism", "databases", "scaling"],
    year: 2026
  },
  "/knowledge": {
    id: "page-knowledge",
    category: "knowledge",
    aliases: ["library", "books", "papers", "references"],
    pinned: true,
    tags: ["systems", "security", "databases", "networking", "distributed-systems", "ai"]
  },
  "/lab": {
    id: "page-lab",
    category: "lab",
    aliases: ["experiments", "sandbox", "visualizer"],
    pinned: true,
    tags: ["interactive", "teaching", "visualizer", "handshake", "jwt"]
  },
  "/lab/jwt-visualizer": {
    id: "lab-jwt-visualizer",
    category: "lab",
    aliases: ["jwt", "decoder", "tokens"],
    pinned: false,
    tags: ["auth", "security", "jwt", "encoding", "cryptography"]
  },
  "/lab/tcp-handshake": {
    id: "lab-tcp-handshake",
    category: "lab",
    aliases: ["tcp", "handshake", "sockets"],
    pinned: false,
    tags: ["networking", "tcp", "sockets", "connection", "packets"]
  }
};

// Recursive file walker
function getAstroFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      getAstroFiles(fullPath, files);
    } else if (file.endsWith('.astro')) {
      files.push(fullPath);
    }
  });
  return files;
}

function generateIndex() {
  console.log("Generating search index...");
  const files = getAstroFiles(PAGES_DIR);
  const items = [];

  files.forEach(filePath => {
    // Determine relative URL
    let relPath = path.relative(PAGES_DIR, filePath).replace(/\\/g, '/');
    
    // Ignore dynamic / index-specific pages that are not content routes
    if (relPath.startsWith('rss.xml.js') || relPath.startsWith('api/') || relPath.startsWith('components/')) {
      return;
    }

    // Map to clean URL
    let url = '/' + relPath.replace(/\.astro$/, '');
    if (url.endsWith('/index')) {
      url = url.slice(0, -6);
    }
    if (url === '/index') {
      url = '/';
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse Title from Layout or Heading
    let title = '';
    const layoutTitleMatch = content.match(/<Layout\s+title="([^"]+)"/);
    if (layoutTitleMatch) {
      title = layoutTitleMatch[1];
    } else {
      // Fallback: title capitalize from filename
      const baseName = path.basename(filePath, '.astro');
      title = baseName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    // Parse Description
    let description = '';
    const descMatch = content.match(/<p\s+class="[^"]*text-(?:base|sm)[^"]*(?:text-\[#A1A1AA\]|italic)[^"]*">([\s\S]*?)<\/p>/i);
    if (descMatch) {
      description = descMatch[1].replace(/["']/g, '').trim().replace(/\n\s*/g, ' ');
    }

    // Default category based on directory
    let category = "page";
    if (url.startsWith('/work/')) {
      category = "project";
    } else if (url.startsWith('/writing/')) {
      category = "article";
    } else if (url.startsWith('/notes')) {
      category = "note";
    } else if (url.startsWith('/lab/')) {
      category = "lab";
    } else if (url === '/knowledge') {
      category = "knowledge";
    } else if (url === '/lab') {
      category = "lab";
    }

    // Reading time calculation
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(words / 200));

    // Base Item
    const id = `${category}-${path.basename(filePath, '.astro')}`;
    const baseItem = {
      id,
      title,
      description,
      category,
      url,
      aliases: [],
      pinned: false,
      tags: [],
      readingTime,
      priority: 0
    };

    // Apply metadata overrides if matched
    const overrides = metadataOverrides[url];
    if (overrides) {
      Object.assign(baseItem, overrides);
    }

    items.push(baseItem);
  });

  // Write JSON output with Version 1 stamp wrapper
  const searchIndexOutput = {
    version: "v1",
    timestamp: new Date().toISOString(),
    items
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(searchIndexOutput, null, 2));
  console.log(`Successfully generated search index containing ${items.length} items at ${OUTPUT_FILE}`);
}

generateIndex();
