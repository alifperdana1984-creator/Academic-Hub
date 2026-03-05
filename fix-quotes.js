const fs = require('fs');
const file = 'AcademicStandards.html';
let content = fs.readFileSync(file, 'utf8');
const before = (content.match(/[\u201C\u201D]/g) || []).length;
content = content.replace(/[\u201C\u201D]/g, '"');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed ' + before + ' curly quotes -> straight quotes');
