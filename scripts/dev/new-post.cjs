const fs = require("fs");
const path = require("path");

const title = process.argv[2] || "New Post";
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const template = `---
id: "${slug}"
title: "${title}"
description: "A summary of the post..."
published: "${new Date().toISOString().split("T")[0]}"
category: "Engineering"
tags: []
draft: true
status: "Draft"
version: 1
revision: 1
---

Start writing here...
`;

const dest = path.join(__dirname, `../../src/content/writing/${slug}.md`);
fs.writeFileSync(dest, template, "utf-8");
console.log(`Created new post template: ${dest}`);
