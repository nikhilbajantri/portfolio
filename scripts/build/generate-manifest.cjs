const fs = require("fs");
const path = require("path");

function generateManifest() {
  console.log("Generating stats and manifest...");

  const generatedDir = path.join(__dirname, "../../public/generated");
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  const reportsDir = path.join(__dirname, "../../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Count files inside collections
  const countFilesIn = (dirName) => {
    const p = path.join(__dirname, "../../src/content", dirName);
    if (!fs.existsSync(p)) return 0;
    
    const countItems = (currentPath) => {
      let count = 0;
      const files = fs.readdirSync(currentPath);
      for (const file of files) {
        const full = path.join(currentPath, file);
        if (fs.statSync(full).isDirectory()) {
          count += countItems(full);
        } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
          count++;
        }
      }
      return count;
    };
    return countItems(p);
  };

  const articlesCount = countFilesIn("writing");
  const projectsCount = countFilesIn("projects");
  const notesCount = countFilesIn("notes");
  const booksCount = countFilesIn("books");
  const labsCount = countFilesIn("lab");
  const draftsCount = countFilesIn("drafts");

  const stats = {
    articles: articlesCount,
    projects: projectsCount,
    notes: notesCount,
    books: booksCount,
    labs: labsCount,
    drafts: draftsCount,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(path.join(generatedDir, "stats.json"), JSON.stringify(stats, null, 2), "utf-8");
  console.log("Generated public/generated/stats.json.");

  // Write content report
  const contentReport = `# Editorial Content Metrics

Generated on: ${new Date().toISOString()}

## Library Metrics
| Category | Total Count |
| :--- | :--- |
| Articles | ${articlesCount} |
| Projects | ${projectsCount} |
| Notes | ${notesCount} |
| Books | ${booksCount} |
| Labs | ${labsCount} |
| Drafts | ${draftsCount} |
`;

  fs.writeFileSync(path.join(reportsDir, "content.md"), contentReport, "utf-8");
  console.log("Generated reports/content.md.");
}

if (require.main === module) {
  generateManifest();
}

module.exports = generateManifest;
