const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const tr_keys = `    // Inline BG Remover & Security
    secure_processing: "Güvenli Sunucu İşleme",
    bg_remover_title: "Arka Plan Silici",
    bg_model_general: "Otomatik (En İyi)",
    bg_model_portrait: "Portre (Saç & İnsan)",
    bg_model_logo: "Logo & Metin (Keskin)",
    bg_remove_btn: "Arka Planı Sil",
    ai_processing: "Yapay Zeka İşliyor...",`;

const en_keys = `    // Inline BG Remover & Security
    secure_processing: "Secure Server Processing",
    bg_remover_title: "Background Remover",
    bg_model_general: "Auto (Best)",
    bg_model_portrait: "Portrait (Hair & People)",
    bg_model_logo: "Logo & Text (Sharp)",
    bg_remove_btn: "Remove Background",
    ai_processing: "AI is Processing...",`;

if (!content.includes('bg_remover_title:')) {
    content = content.replace(/(\s+)(privacy_policy_intro:)/, '$1' + tr_keys + ',$1$2');
    content = content.replace(/(\s+)(privacy_policy_intro:)/, '$1' + en_keys + ',$1$2');
    fs.writeFileSync('translations.ts', content, 'utf8');
    console.log('Translations added successfully.');
} else {
    console.log('Translations already exist.');
}
