const fs = require('fs');
let content = fs.readFileSync('pages/About.tsx', 'utf8');

const regex = /\{ icon: '\?\?', title: /g;
let count = 0;
content = content.replace(regex, () => {
    // 0: lock, 2: AI, 3: Premium, 4: Lang, 5: Mobile
    const emojis = ['🔒', '🎨', '💎', '🌍', '📱'];
    const e = emojis[count % 5];
    count++;
    return `{ icon: '${e}', title: `;
});

content = content.replace(/\{ icon: '\?', title:/g, `{ icon: '⚡', title:`);

content = content.replace(/contact: '\?\? /g, `contact: '📧 `);

fs.writeFileSync('pages/About.tsx', content, 'utf8');
