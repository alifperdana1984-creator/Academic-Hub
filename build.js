const fs = require("fs");
const path = require("path");

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.readdirSync(srcDir, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Replace placeholders with environment variables
const replacements = {
  __FIREBASE_API_KEY__: process.env.FIREBASE_API_KEY || "",
  __FIREBASE_AUTH_DOMAIN__: process.env.FIREBASE_AUTH_DOMAIN || "",
  __FIREBASE_PROJECT_ID__: process.env.FIREBASE_PROJECT_ID || "",
  __FIREBASE_STORAGE_BUCKET__: process.env.FIREBASE_STORAGE_BUCKET || "",
  __FIREBASE_MESSAGING_SENDER_ID__:
    process.env.FIREBASE_MESSAGING_SENDER_ID || "",
  __FIREBASE_APP_ID__: process.env.FIREBASE_APP_ID || "",
};

// Create dist directory
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

// List of HTML files to process
const htmlFiles = [
  "index.html",
  "announcements.html",
  "library.html",
  "documents.html",
  "messageboard.html",
  "AcademicStandards.html",
  "CambridgeExamsDashboard.html",
  "CambridgePathwaySimulator.html",
  "IslamicSchoolsPerformance.html",
  "PartnerSchoolsPerformance.html",
  "SchoolAppraisalsDashboard.html",
  "StaffSatisfactionSurvey.html",
  "StudentSatisfactionSurvey.html",
  "ParentSatisfactionSurvey.html",
  "EASE-I-AssessmentResults.html",
  "EASE-II-AssessmentResults.html",
  "A-EASE-I-AssessmentResults.html",
  "AcademicCalendar.html",
];

// Process each HTML file
htmlFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, "utf8");

    for (const [placeholder, value] of Object.entries(replacements)) {
      html = html.replace(new RegExp(placeholder, "g"), value);
    }

    fs.writeFileSync(path.join("dist", file), html);
    console.log(`Processed: ${file}`);
  }
});

// Copy auth-guard.js
if (fs.existsSync("auth-guard.js")) {
  fs.copyFileSync("auth-guard.js", "dist/auth-guard.js");
  console.log("Copied: auth-guard.js");
}

// Copy images folder if it exists
const imagesDir = "images";
if (fs.existsSync(imagesDir)) {
  const destImagesDir = "dist/images";
  copyDirRecursive(imagesDir, destImagesDir);
  console.log("Copied: images folder");
}

// Copy sections folder if it exists (JSON/PDF content for AcademicStandards page)
const sectionsDir = "Sections";
if (fs.existsSync(sectionsDir)) {
  const destSectionsDir = "dist/Sections";
  copyDirRecursive(sectionsDir, destSectionsDir);
  console.log("Copied: Sections folder");
}

console.log("\nBuild completed successfully!");
console.log("Environment variables:");
Object.keys(replacements).forEach((key) => {
  const value = replacements[key];
  console.log(`  ${key}: ${value ? "[SET]" : "[NOT SET]"}`);
});
