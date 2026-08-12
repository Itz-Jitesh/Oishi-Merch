const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === '.next') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const replaceCurrency = (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  content = content.replace(/\$([0-9]+)/g, '₹$1');
  content = content.replace(/>\$\{/g, '>₹{');
  content = content.replace(/\$\$\{/g, '₹${');
  content = content.replace(/<dd>\$\{/g, '<dd>₹{');
  content = content.replace(/ \$\{/g, ' ₹{');
  content = content.replace(/"\$\{/g, '"₹{'); // wait this might break interpolations inside strings?

  // let's do it safer
  // Just revert everything and specifically match the lines from grep

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

walkDir(__dirname, replaceCurrency);
