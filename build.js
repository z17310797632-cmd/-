const fs = require("fs");
const path = require("path");

const root = __dirname;
const outDir = path.join(root, "dist");

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of ["index.html", "portfolio-template.html", "assets"]) {
  copyRecursive(path.join(root, entry), path.join(outDir, entry));
}

console.log("Static portfolio copied to dist/");
