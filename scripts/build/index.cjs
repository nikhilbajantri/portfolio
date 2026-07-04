const { fork } = require('child_process');
const path = require('path');

const scripts = [
  'generate-search.cjs',
  'generate-rss.cjs',
  'generate-sitemap.cjs',
  'generate-robots.cjs',
  'generate-images.cjs',
  'generate-quality.cjs',
  'generate-health.cjs',
  'generate-manifest.cjs'
];

function runScript(index) {
  if (index >= scripts.length) {
    console.log('Pre-build sequence completed successfully.');
    process.exit(0);
  }

  const script = scripts[index];
  const scriptPath = path.join(__dirname, script);
  console.log(`Running: ${script}...`);

  const proc = fork(scriptPath);

  proc.on('close', code => {
    if (code !== 0) {
      console.error(`Script ${script} failed with exit code ${code}`);
      process.exit(code);
    }
    runScript(index + 1);
  });
}

runScript(0);
