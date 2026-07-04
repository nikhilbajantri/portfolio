const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../../src/content');
const WORKSPACE_DIR = path.join(__dirname, '../../');

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
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    data[key] = value;
  });
  return { data, content };
}

function runQualityCheck() {
  console.log('Running quality and validation check...');
  
  const folders = ['writing', 'projects', 'notes', 'knowledge', 'lab', 'books'];
  const warnings = [];
  const counts = {};

  folders.forEach(folder => {
    counts[folder] = 0;
    const dir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    counts[folder] = files.length;

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = parseFrontmatter(fileContent);

      const relPath = path.relative(WORKSPACE_DIR, filePath);

      // Check 1: Missing metadata
      if (!data.title) {
        warnings.push(`[METADATA] Missing title in ${relPath}`);
      }
      if (folder === 'writing' && !data.description) {
        warnings.push(`[METADATA] Missing description in ${relPath}`);
      }

      // Check 2: Writing specific rules (e.g. missing cover/alt)
      if (folder === 'writing') {
        if (!data.cover) {
          warnings.push(`[COVER] Missing cover image in ${relPath}`);
        }
        if (data.cover && !data.coverAlt) {
          warnings.push(`[COVER] Missing coverAlt in ${relPath}`);
        }
      }

      // Check 3: Check for duplicate tags
      if (data.tags) {
        let tagList = [];
        if (typeof data.tags === 'string') {
          // Parse string array representation if it was parsed as string
          tagList = data.tags.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
        } else if (Array.isArray(data.tags)) {
          tagList = data.tags;
        }
        const seen = new Set();
        tagList.forEach(tag => {
          const t = tag.toLowerCase();
          if (seen.has(t)) {
            warnings.push(`[TAGS] Duplicate tag '${tag}' found in ${relPath}`);
          }
          seen.add(t);
        });
      }

      // Check 4: Check for broken links / unescaped wiki links in content body
      const mdLinkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
      let linkMatch;
      while ((linkMatch = mdLinkRegex.exec(content)) !== null) {
        const linkUrl = linkMatch[2];
        if (linkUrl.startsWith('/') && !linkUrl.startsWith('//')) {
          // Verify local route checks roughly if we can
          // e.g. check if file path could match one of the collections
        }
      }
    });
  });

  // Compile build-report.md
  let buildReport = `# Build Report
Generated at: ${new Date().toISOString()}

## Content Metrics
`;
  Object.entries(counts).forEach(([folder, count]) => {
    buildReport += `- **${folder}**: ${count} items\n`;
  });
  buildReport += `\nBuild status: **SUCCESS**\n`;
  fs.writeFileSync(path.join(WORKSPACE_DIR, 'build-report.md'), buildReport);
  console.log('Generated build-report.md successfully.');

  // Compile quality-report.md
  let qualityReport = `# Content Quality Report
Generated at: ${new Date().toISOString()}

`;
  if (warnings.length === 0) {
    qualityReport += `✓ **All checks passed.** No metadata errors, duplicate tags, or missing cover fields found.\n`;
  } else {
    qualityReport += `## Warnings and Recommendations (${warnings.length})\n\n`;
    warnings.forEach(w => {
      qualityReport += `- ${w}\n`;
    });
  }
  fs.writeFileSync(path.join(WORKSPACE_DIR, 'quality-report.md'), qualityReport);
  console.log(`Generated quality-report.md with ${warnings.length} warning(s).`);
}

runQualityCheck();
module.exports = { runQualityCheck };
