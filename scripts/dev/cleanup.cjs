const fs = require("fs");
const path = require("path");

console.log("Running development workspace cleanup...");
const cachePath = path.join(__dirname, "../../.cache");
if (fs.existsSync(cachePath)) {
  fs.rmSync(cachePath, { recursive: true, force: true });
  console.log("Cleared build caches.");
}
console.log("Cleanup complete.");
