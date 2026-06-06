import re

with open('translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# TR additions
tr_keys = '''    // Inline BG Remover & Security
    secure_processing: "Güvenli Sunucu İşleme",
    bg_remover_title: "Arka Plan Silici",
    bg_model_general: "Otomatik (En İyi)",
    bg_model_portrait: "Portre (Saç & İnsan)",
    bg_model_logo: "Logo & Metin (Keskin)",
    bg_remove_btn: "Arka Planı Sil",
    ai_processing: "Yapay Zeka İşliyor...",'''

# EN additions
en_keys = '''    // Inline BG Remover & Security
    secure_processing: "Secure Server Processing",
    bg_remover_title: "Background Remover",
    bg_model_general: "Auto (Best)",
    bg_model_portrait: "Portrait (Hair & People)",
    bg_model_logo: "Logo & Text (Sharp)",
    bg_remove_btn: "Remove Background",
    ai_processing: "AI is Processing...",'''

if 'bg_remover_title:' not in content:
    content = re.sub(r'(\s+)(privacy_policy_intro:)', r'\1' + tr_keys + r',\1\2', content, count=1)
    content = re.sub(r'(\s+)(privacy_policy_intro:)', r'\1' + en_keys + r',\1\2', content, count=1)
    
    with open('translations.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Translations added successfully.')
else:
    print('Translations already exist.')
