const fs = require('fs');
let lines = fs.readFileSync('components/SeoContent.tsx', 'utf8').split('\n');

// Find the line index where the bad assignment starts
let badIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("seoData.tr['favicon-generator'] = ")) {
        badIndex = i;
        break;
    }
}

if (badIndex !== -1) {
    // Remove the bad line
    lines.splice(badIndex, 1);
    
    // Also remove empty lines or type LangKey around it if we want, but let's just write back the cleaned file
    fs.writeFileSync('components/SeoContent.tsx', lines.join('\n'));
    console.log("Cleaned up bad SEO line!");
} else {
    console.log("Bad line not found.");
}
