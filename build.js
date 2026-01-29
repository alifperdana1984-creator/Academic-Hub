const fs = require('fs');
const path = require('path');

// Read the source HTML
let html = fs.readFileSync('index.html', 'utf8');

// Replace placeholders with environment variables
const replacements = {
  '__FIREBASE_API_KEY__': process.env.FIREBASE_API_KEY || '',
  '__FIREBASE_AUTH_DOMAIN__': process.env.FIREBASE_AUTH_DOMAIN || '',
  '__FIREBASE_PROJECT_ID__': process.env.FIREBASE_PROJECT_ID || '',
  '__FIREBASE_STORAGE_BUCKET__': process.env.FIREBASE_STORAGE_BUCKET || '',
  '__FIREBASE_MESSAGING_SENDER_ID__': process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  '__FIREBASE_APP_ID__': process.env.FIREBASE_APP_ID || '',
};

for (const [placeholder, value] of Object.entries(replacements)) {
  html = html.replace(new RegExp(placeholder, 'g'), value);
}

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write the processed HTML
fs.writeFileSync('dist/index.html', html);

// Copy images folder if it exists
const imagesDir = 'images';
if (fs.existsSync(imagesDir)) {
  const destImagesDir = 'dist/images';
  if (!fs.existsSync(destImagesDir)) {
    fs.mkdirSync(destImagesDir, { recursive: true });
  }

  fs.readdirSync(imagesDir).forEach(file => {
    fs.copyFileSync(
      path.join(imagesDir, file),
      path.join(destImagesDir, file)
    );
  });
}

console.log('Build completed successfully!');
console.log('Environment variables injected:');
Object.keys(replacements).forEach(key => {
  const value = replacements[key];
  console.log(`  ${key}: ${value ? '[SET]' : '[NOT SET]'}`);
});
