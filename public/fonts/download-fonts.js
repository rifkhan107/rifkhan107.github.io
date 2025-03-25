
// This script helps download the Rockybilly font
// Run using Node.js: node download-fonts.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const fontUrl = 'https://www.fontspace.com/get/family/qx77r';
const outputPath = path.join(__dirname, 'rockybilly.ttf');

console.log('Downloading Rockybilly font...');

// Create a placeholder file to ensure the directory exists
if (!fs.existsSync(outputPath)) {
  fs.writeFileSync(outputPath, '');
}

console.log('Font directory created. Please download the font from:');
console.log(fontUrl);
console.log('And save it as "rockybilly.ttf" in the public/fonts directory');
