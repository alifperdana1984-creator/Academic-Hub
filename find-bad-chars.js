const fs = require('fs');
const lines = fs.readFileSync('AcademicStandards.html', 'utf8').split('\n');
lines.forEach((line, i) => {
  for (const ch of line) {
    const code = ch.charCodeAt(0);
    if (code > 127 && code !== 0x2026 && code !== 0xA9 && code !== 0xB0 && code !== 0x2019 && code !== 0x2018) {
      console.log('Line ' + (i + 1) + ': U+' + code.toString(16).toUpperCase() + ' (' + JSON.stringify(ch) + ') | ' + line.trim().slice(0, 100));
    }
  }
});
