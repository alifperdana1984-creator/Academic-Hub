const fs = require('fs');
const path = require('path');

// Replace placeholders with environment variables
const replacements = {
  '__FIREBASE_API_KEY__': process.env.FIREBASE_API_KEY || '',
  '__FIREBASE_AUTH_DOMAIN__': process.env.FIREBASE_AUTH_DOMAIN || '',
  '__FIREBASE_PROJECT_ID__': process.env.FIREBASE_PROJECT_ID || '',
  '__FIREBASE_STORAGE_BUCKET__': process.env.FIREBASE_STORAGE_BUCKET || '',
  '__FIREBASE_MESSAGING_SENDER_ID__': process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  '__FIREBASE_APP_ID__': process.env.FIREBASE_APP_ID || '',
};

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// List of HTML files to process
const htmlFiles = [
  'index.html',
  'AcademicStandards.html',
  'CambridgeExamsDashboard.html',
  'CambridgePathwaySimulator.html',
  'IslamicSchoolsPerformance.html',
  'PartnerSchoolsPerformance.html',
  'SchoolAppraisalsDashboard.html',
  'StaffSatisfactionSurvey.html',
  'StudentSatisfactionSurvey.html',
  'ParentSatisfactionSurvey.html',
];

// Process each HTML file
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    for (const [placeholder, value] of Object.entries(replacements)) {
      html = html.replace(new RegExp(placeholder, 'g'), value);
    }

    fs.writeFileSync(path.join('dist', file), html);
    console.log(`Processed: ${file}`);
  }
});

// Copy auth-guard.js
if (fs.existsSync('auth-guard.js')) {
  fs.copyFileSync('auth-guard.js', 'dist/auth-guard.js');
  console.log('Copied: auth-guard.js');
}

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
  console.log('Copied: images folder');
}

console.log('\nBuild completed successfully!');
console.log('Environment variables:');
Object.keys(replacements).forEach(key => {
  const value = replacements[key];
  console.log(`  ${key}: ${value ? '[SET]' : '[NOT SET]'}`);
});
