const fs = require('fs');
const path = require('path');
const blogPath = path.join('pages', 'BlogArticle.tsx');
let content = fs.readFileSync(blogPath, 'utf8');

content = content.replace('const gorselFormat2025 = {', 'const gorselFormat2025: Record<string, any> = {');
content = content.replace('const topluGorselIsleme = {', 'const topluGorselIsleme: Record<string, any> = {');

fs.writeFileSync(blogPath, content);
console.log('Fixed TypeScript errors');
