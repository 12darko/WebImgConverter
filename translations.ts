
export const translations = {
  tr: {
    // Navbar
    daily_credits: "Günlük Haklar",
    credits_label: "Kalan Kredi",
    premium_btn: "Premium'a Geç",

    // Dropzone
    drop_title: "Resimleri Yükle",
    drop_desc: "HEIC (iPhone), JPG, PNG veya WEBP dosyalarını buraya sürükleyin.",
    drop_limit: "Günlük Limit Doldu",
    drop_limit_desc: "Hak kazanmak için sağdaki reklamı izleyin veya yarını bekleyin.",

    // File Card
    queue: "İşlem Kuyruğu",
    clear_all: "Tümünü Temizle",
    loading: "Yükleniyor...",
    processing: "İşleniyor...",
    progress: "İlerleme",
    estimated_size: "Tahmini Boyut",
    format: "Format:",
    ai_rename_btn: "AI ile İsimlendir",
    ai_rename_loading: "AI Düşünüyor...",
    ai_fallback_notice: "AI şu an kullanılamıyor, otomatik isim üretildi",
    batch_ai_rename: "Tümünü AI ile İsimlendir",
    logo_uploaded: "Logo Yüklendi",
    target_format: "HEDEF FORMAT:",
    rotate: "Döndür",
    resize: "Boyut",
    grayscale: "Siyah/Beyaz",
    bg_remove: "BG Temizle (Beta)",
    convert_btn: "Dönüştür & İyileştir",
    convert_all_btn: "Tümünü Dönüştür",
    download_btn: "İndir",
    completed: "Tamamlandı!",
    error_generic: "Hata oluştu",
    preset_label: "Hazır Ayar:",
    preset_web: "Web",
    preset_social: "Sosyal Medya",
    preset_archive: "Arşiv",

    // Sidebar
    pro_tips_title: "Profesyonel İpuçları",
    tip_heic: "iPhone HEIC fotoğraflarını anında JPG'e çevirin.",
    tip_seo: "Dosyalarınız %100 güvenli şekilde tarayıcınızda işlenir.",
    tip_size: "Dosya boyutunu kalite bozulmadan küçültün.",

    // Referral
    ref_title: "Daha Fazla Hak Kazan",
    ref_desc: "VormPixyze'ı arkadaşlarınla paylaş, her kayıtta +5 Kredi kazan!",
    ref_btn: "Linki Kopyala & Paylaş",
    ref_success: "Link Kopyalandı! (Kayıt olunca kazanacaksın)",

    // Premium Modal
    prem_title: "Premium'a Yükselt",
    prem_subtitle: "Profesyonel araçlara sınırsız erişim sağlayın.",
    prem_feature_1: "Limitsiz günlük dosya dönüştürme",
    prem_feature_2: "Tamamen reklamsız deneyim",
    prem_feature_3: "Sınırsız AI Dosya İsimlendirme",
    prem_feature_4: "Toplu ZIP indirme özelliği",
    prem_price_btn: "Premium'a Geç (₺29.99/Ay)",
    prem_no_thanks: "Hayır, teşekkürler",
    premium_plans_title: "Premium Planlar",
    premium_plans_subtitle: "İhtiyacınıza uygun planı seçin",

    // Premium Plans
    plan_starter: "Starter",
    plan_pro: "Pro",
    plan_business: "Business",
    price_mo: "/ay",
    feat_credits_30: "Günlük 30 Kredi",
    feat_credits_100: "Günlük 100 Kredi",
    feat_credits_unlimited: "Günlük 300 Kredi",
    feat_remove_bg: "Arkaplan Temizleme",
    feat_no_ads: "Reklamsız Deneyim",
    feat_priority_ai: "Öncelikli AI İşleme",
    feat_zip_download: "ZIP İndirme",
    feat_batch_ai: "Toplu AI İsimlendirme",
    feat_watermark: "Filigran Ekleme",
    feat_special_formats: "Özel Formatlar (BMP, TIFF)",
    feat_all_prem: "Tüm Premium Özellikler",
    feat_support_247: "7/24 Destek",
    feat_batch_50: "Toplu İşleme (50+)",
    feat_watermark_custom: "Özel Filigran Düzenleme",
    feat_history: "İşlem Kayıtları",
    btn_select_starter: "Starter'ı Seç",
    btn_select_pro: "Pro'yu Seç",
    btn_select_business: "Business'ı Seç",
    popular_badge: "POPÜLER",
    maybe_later: "Hayır, belki sonra",

    // Footer Links & Legal
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    contact: "İletişim",
    footer_text: "Tüm Hakları Saklıdır.",
    close: "Kapat",

    // Cookie Banner
    cookie_message: "Size daha iyi bir deneyim sunmak ve reklamları kişiselleştirmek için çerezleri (cookies) kullanıyoruz.",
    cookie_accept: "Kabul Et",
    cookie_decline: "Reddet",

    // Legal Content Titles
    privacy_title: "VormPixyze Gizlilik Politikası",
    terms_title: "Kullanım Koşulları ve Yasal Uyarı",
    // Support Modal
    support_title: "Destek",
    support_subject: "KONU",
    support_subject_placeholder: "Sorunu kısaca anlatın...",
    support_message: "MESAJ",
    support_message_placeholder: "Size nasıl yardımcı olabiliriz?",
    support_premium_msg: "Premium üye olarak öncelikli destek alıyorsunuz!",
    cancel: "İptal",
    send_email: "E-posta Gönder",

    contact_title: "İletişim ve Destek",

    // Legal Content Bodies (Detailed)
    privacy_content: `Son Güncelleme: ${new Date().toLocaleDateString('tr-TR')}

1. VERİ İŞLEME VE GÜVENLİK
VormPixyze olarak gizliliğinize en üst düzeyde önem veriyoruz. Web sitemiz "Client-Side Processing" (İstemci Taraflı İşleme) teknolojisi kullanmaktadır. Bu, yüklediğiniz resimlerin sunucularımıza ASLA gönderilmediği ve kalıcı olarak depolanmadığı anlamına gelir. Tüm dönüştürme, yeniden boyutlandırma ve düzenleme işlemleri doğrudan sizin tarayıcınızda (bilgisayarınızda veya telefonunuzda) gerçekleşir.

2. ÇEREZLER VE YEREL DEPOLAMA (LOCAL STORAGE)
Size daha iyi bir deneyim sunmak için tarayıcınızın "LocalStorage" özelliğini kullanıyoruz. Bu, günlük kullanım haklarınızı, dil tercihlerinizi ve premium durumunuzu hatırlamamızı sağlar.
Ayrıca, Google AdSense aracılığıyla sunulan reklamlar, ilgi alanlarınıza göre reklam göstermek amacıyla çerezler (cookies) kullanabilir.

3. ÜÇÜNCÜ TARAF HİZMETLERİ
- Google AdSense: Reklam gösterimi için kullanılır.
- Google Gemini AI: Eğer "AI İsimlendirme" özelliğini kullanırsanız, sadece o anki görselin verisi analiz için Google sunucularına geçici olarak gönderilir ve işlem bitince silinir.

4. KVKK VE GDPR UYUMU
Sitemiz herhangi bir kişisel kimlik bilgisi (Ad, Soyad, TC Kimlik No vb.) toplamaz ve saklamaz. Tamamen anonim olarak hizmet verir.

5. İŞLEM KAYITLARI (BUSINESS TIER)
Premium Business kullanıcıları için sunulan İşlem Kayıtları özelliği, yalnızca dosya adı ve tarih gibi işlem metadatalarını (dosyanın kendisini değil) saklar. Bu veriler veritabanı verimliliği ve gizlilik ilkemiz gereği 7 gün saklandıktan sonra otomatik olarak ve kalıcı şekilde silinir.`,

    terms_content: `1. HİZMETİN KULLANIMI
VormPixyze.com ("Site") adresini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Bu site, resim dosyalarını dönüştürmek ve düzenlemek amacıyla sunulan bir araçtır.

2. TELİF HAKLARI VE SORUMLULUK REDDİ
- Kullanıcı Sorumluluğu: Siteye yüklediğiniz, dönüştürdüğünüz ve indirdiğiniz tüm dosyaların yasal sorumluluğu size aittir.
- Telif Hakkı İhlali: Telif hakkı size ait olmayan, izinsiz kopyalanmış veya yasa dışı içerik barındıran görselleri dönüştürmek yasaktır.
- VormPixyze, kullanıcıların işlediği içeriklerden dolayı sorumlu tutulamaz. Hizmet sağlayıcı olarak içeriğe müdahale etmiyor ve saklamıyoruz.

3. GARANTİ REDDİ
Hizmet "OLDUĞU GİBİ" (AS-IS) sunulmaktadır. VormPixyze, dönüştürme işlemlerinin %100 hatasız olacağını, sitenin kesintisiz çalışacağını veya belirli bir amaca tam uygunluğunu garanti etmez.

4. DEĞİŞİKLİKLER
Yönetim, hizmet şartlarını, ücretlendirme politikalarını veya site özelliklerini önceden haber vermeksizin değiştirme hakkını saklı tutar.`,

    contact_content: `Her türlü soru ve öneriniz için bize ulaşabilirsiniz.

E-posta:
support@vormpixyze.com

Adres:
İstanbul / TÜRKİYE

Çalışma Saatleri:
Pazartesi - Cuma: 09:00 - 18:00 (TSİ)`
  },
  en: {
    // Navbar
    daily_credits: "Daily Credits",
    credits_label: "Credits Left",
    premium_btn: "Go Premium",

    // Dropzone
    drop_title: "Upload Images",
    drop_desc: "Drag & drop HEIC (iPhone), JPG, PNG or WEBP files here.",
    drop_limit: "Daily Limit Reached",
    drop_limit_desc: "Watch the ad on the right to earn credits or wait until tomorrow.",

    // File Card
    queue: "Process Queue",
    clear_all: "Clear All",
    loading: "Loading...",
    processing: "Processing...",
    progress: "Progress",
    estimated_size: "Estimated Size",
    format: "Format:",
    ai_rename_btn: "AI Rename",
    ai_rename_loading: "AI Thinking...",
    ai_fallback_notice: "AI unavailable, auto-generated name used",
    batch_ai_rename: "AI Rename All",
    logo_uploaded: "Logo Uploaded",
    target_format: "TARGET FORMAT:",
    rotate: "Rotate",
    resize: "Resize",
    grayscale: "Grayscale",
    bg_remove: "Remove BG (Beta)",
    convert_btn: "Convert & Enhance",
    convert_all_btn: "Convert All",
    download_btn: "Download",
    completed: "Completed!",
    error_generic: "Error occurred",
    preset_label: "Preset:",
    preset_web: "Web",
    preset_social: "Social Media",
    preset_archive: "Archive",

    // Sidebar
    pro_tips_title: "Pro Tips",
    tip_heic: "Instantly convert iPhone HEIC photos to JPG.",
    tip_seo: "Files are processed 100% securely in your browser.",
    tip_size: "Reduce file size without losing quality.",

    // Referral
    ref_title: "Earn More Credits",
    ref_desc: "Share VormPixyze with friends. Get +5 Credits for every signup!",
    ref_btn: "Copy Link & Share",
    ref_success: "Link Copied! (Credits awarded on signup)",

    // Premium Modal
    prem_title: "Upgrade to Premium",
    prem_subtitle: "Get unlimited access to professional tools.",
    prem_feature_1: "Unlimited daily file conversions",
    prem_feature_2: "Completely ad-free experience",
    prem_feature_3: "Unlimited AI File Renaming",
    prem_feature_4: "Bulk ZIP download feature",
    prem_price_btn: "Go Premium ($4.99/Mo)",
    prem_no_thanks: "No, thanks",
    premium_plans_title: "Premium Plans",
    premium_plans_subtitle: "Choose the plan that suits you best",

    // Premium Plans
    plan_starter: "Starter",
    plan_pro: "Pro",
    plan_business: "Business",
    price_mo: "/mo",
    feat_credits_30: "30 Credits Daily",
    feat_credits_100: "100 Credits Daily",
    feat_credits_unlimited: "300 Credits Daily",
    feat_remove_bg: "Remove Background",
    feat_no_ads: "No Ads",
    feat_priority_ai: "Priority AI Processing",
    feat_zip_download: "ZIP Download",
    feat_batch_ai: "Bulk AI Rename",
    feat_watermark: "Watermarking",
    feat_special_formats: "Special Formats (BMP, TIFF)",
    feat_all_prem: "All Premium Features",
    feat_support_247: "24/7 Support",
    feat_batch_50: "Batch Processing (50+)",
    feat_watermark_custom: "Custom Watermark Editing",
    feat_history: "Activity Log",
    btn_select_starter: "Select Starter",
    btn_select_pro: "Select Pro",
    btn_select_business: "Select Business",
    popular_badge: "POPULAR",
    maybe_later: "No thanks, maybe later",

    // Footer Links & Legal
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    footer_text: "All Rights Reserved.",
    close: "Close",

    // Cookie Banner
    cookie_message: "We use cookies to improve your experience and deliver personalized ads.",
    cookie_accept: "Accept",
    cookie_decline: "Decline",

    // Legal Content Titles
    privacy_title: "VormPixyze Privacy Policy",
    terms_title: "Terms of Service & Disclaimer",
    // Support Modal
    support_title: "Support",
    support_subject: "SUBJECT",
    support_subject_placeholder: "Briefly describe the issue...",
    support_message: "MESSAGE",
    support_message_placeholder: "How can we help you?",
    support_premium_msg: "As a Premium member, your ticket gets Priority Support!",
    cancel: "Cancel",
    send_email: "Send Email",

    contact_title: "Contact & Support",

    // Legal Content Bodies (Detailed)
    privacy_content: `Last Updated: ${new Date().toLocaleDateString('en-US')}

1. DATA PROCESSING & SECURITY
At VormPixyze, we take your privacy seriously. Our website utilizes "Client-Side Processing" technology. This means the images you upload are NEVER sent to our servers for storage. All conversion, resizing, and editing operations happen locally within your browser (on your computer or phone).

2. COOKIES & LOCAL STORAGE
We use your browser's "LocalStorage" feature to enhance your experience by remembering your daily usage credits, language preferences, and premium status.
Additionally, we use third-party services like Google AdSense, which may use cookies to serve personalized ads based on your interests.

3. THIRD-PARTY SERVICES
- Google AdSense: Used for displaying advertisements.
- Google Gemini AI: If you use the "AI Rename" feature, only the specific image data is temporarily sent to Google servers for analysis and is not stored permanently.

4. GDPR & CCPA COMPLIANCE
Our site does not collect or store personally identifiable information (Name, Email, ID, etc.). We operate as a completely anonymous tool.

5. ACTIVITY LOG (BUSINESS TIER)
The Activity Log feature provided for Premium Business users stores only processing metadata (filename, date, etc.), NOT the files themselves. In accordance with database efficiency and our privacy principles, this data is automatically and permanently deleted after 7 days.`,

    terms_content: `1. ACCEPTANCE OF TERMS
By accessing and using VormPixyze.com ("Site"), you agree to comply with these Terms of Service. This site is a tool provided for image conversion and editing purposes.

2. COPYRIGHT & DISCLAIMER
- User Responsibility: You are solely responsible for the files you upload, convert, and download.
- Copyright Infringement: You agree not to convert or distribute copyrighted materials for which you do not own the rights or have permission.
- VormPixyze is not responsible for user-generated content. As a service provider, we do not monitor or store your content.

3. WARRANTY DISCLAIMER
The service is provided "AS IS". VormPixyze does not guarantee that the conversion process will be error-free, that the site will operate uninterrupted, or that it will meet specific requirements.

4. MODIFICATIONS
We reserve the right to modify these terms, pricing policies, or site features at any time without prior notice.`,

    contact_content: `For any questions or suggestions, please contact us.

Email:
support@vormpixyze.com

Address:
Istanbul / TURKEY

Business Hours:
Monday - Friday: 09:00 - 18:00 (GMT+3)`
  },
  de: {
    // Navbar
    daily_credits: "Günlük Haklar",
    credits_label: "Kalan Kredi",
    premium_btn: "Premium'a Geç",

    // Dropzone
    drop_title: "Bilder hochladen",
    drop_desc: "HEIC, JPG, PNG oder WEBP Dateien hierher ziehen.",
    drop_limit: "Tageslimit erreicht",
    drop_limit_desc: "Schau dir die Werbung an oder warte bis morgen.",

    // File Card
    queue: "Warteschlange",
    clear_all: "Alle löschen",
    loading: "Laden...",
    processing: "Verarbeiten...",
    progress: "Fortschritt",
    estimated_size: "Geschätzte Größe",
    format: "Format:",
    ai_rename_btn: "KI Umbenennen",
    ai_rename_loading: "KI denkt...",
    ai_fallback_notice: "KI nicht verfügbar, automatischer Name genutzt",
    batch_ai_rename: "Alle umbenennen (KI)",
    logo_uploaded: "Logo hochgeladen",
    target_format: "ZIELFORMAT:",
    rotate: "Drehen",
    resize: "Größe",
    grayscale: "Graustufen",
    bg_remove: "Hintergrund entfernen",
    convert_btn: "Konvertieren",
    convert_all_btn: "Alle konvertieren",
    download_btn: "Herunterladen",
    completed: "Fertig!",
    error_generic: "Fehler aufgetreten",
    preset_label: "Profil:",
    preset_web: "Web",
    preset_social: "Social Media",
    preset_archive: "Archiv",

    // Sidebar
    pro_tips_title: "Profi-Tipps",
    tip_heic: "Konvertiere iPhone HEIC Fotos sofort in JPG.",
    tip_seo: "Dateien werden sicher im Browser verarbeitet.",
    tip_size: "Reduziere Dateigröße ohne Qualitätsverlust.",

    // Referral
    ref_title: "Mehr Credits verdienen",
    ref_desc: "Teile VormPixyze mit Freunden. +5 Credits pro Anmeldung!",
    ref_btn: "Link kopieren & teilen",
    ref_success: "Link kopiert! (Credits bei Anmeldung)",

    // Premium Modal
    prem_title: "Upgrade auf Premium",
    prem_subtitle: "Unbegrenzter Zugang zu Profi-Tools.",
    prem_feature_1: "Unbegrenzte Konvertierungen",
    prem_feature_2: "Komplett werbefrei",
    prem_feature_3: "Unbegrenzte KI-Umbenennung",
    prem_feature_4: "Massen-ZIP-Download",
    prem_price_btn: "Premium holen ($4.99/Monat)",
    prem_no_thanks: "Nein, danke",
    premium_plans_title: "Premium Pläne",
    premium_plans_subtitle: "Wählen Sie den Plan, der zu Ihnen passt",

    // Premium Plans
    plan_starter: "Starter",
    plan_pro: "Pro",
    plan_business: "Business",
    price_mo: "/Mon.",
    feat_credits_30: "30 Credits/Tag",
    feat_credits_100: "100 Credits/Tag",
    feat_credits_unlimited: "300 Credits/Tag",
    feat_remove_bg: "Hintergrund entfernen",
    feat_no_ads: "Keine Werbung",
    feat_priority_ai: "Priorisierte KI",
    feat_zip_download: "ZIP-Download",
    feat_batch_ai: "Massen-KI-Umbenennung",
    feat_watermark: "Wasserzeichen",
    feat_special_formats: "Spezielle Formate (BMP, TIFF)",
    feat_all_prem: "Alle Premium-Funktionen",
    feat_support_247: "24/7 Support",
    feat_batch_50: "Stapelverarbeitung (50+)",
    feat_watermark_custom: "Benutzerdefiniertes Wasserzeichen",
    feat_history: "Aktivitätsprotokoll",
    btn_select_starter: "Starter wählen",
    btn_select_pro: "Pro wählen",
    btn_select_business: "Business wählen",
    popular_badge: "BELIEBT",
    maybe_later: "Nein, vielleicht später",

    // Footer Links & Legal
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    contact: "Kontakt",
    footer_text: "Alle Rechte vorbehalten.",
    close: "Schließen",

    // Cookie Banner
    cookie_message: "Wir verwenden Cookies für ein besseres Erlebnis.",
    cookie_accept: "Akzeptieren",
    cookie_decline: "Ablehnen",

    // Legal (Keep EN for now)
    privacy_title: "Privacy Policy",
    terms_title: "Terms of Service",
    contact_title: "Contact & Support",
    privacy_content: "See English version for detailed legal text.",
    terms_content: "See English version for detailed legal text.",
    contact_content: "Email: support@vormpixyze.com",

    // Support Modal
    support_title: "Support",
    support_subject: "BETREFF",
    support_subject_placeholder: "Beschreiben Sie das Problem kurz...",
    support_message: "NACHRICHT",
    support_message_placeholder: "Wie können wir helfen?",
    support_premium_msg: "Als Premium-Mitglied erhalten Sie priorisierten Support!",
    cancel: "Abbrechen",
    send_email: "E-Mail senden",
  },
  fr: {
    // Navbar
    daily_credits: "Crédits du jour",
    credits_label: "Crédits restants",
    premium_btn: "Passer Premium",

    // Dropzone
    drop_title: "Télécharger des images",
    drop_desc: "Glissez vos fichiers HEIC, JPG, PNG ou WEBP ici.",
    drop_limit: "Limite quotidienne atteinte",
    drop_limit_desc: "Regardez la pub ou attendez demain.",

    // File Card
    queue: "File d'attente",
    clear_all: "Tout effacer",
    loading: "Chargement...",
    processing: "Traitement...",
    progress: "Progression",
    estimated_size: "Taille estimée",
    format: "Format :",
    ai_rename_btn: "Renommer (IA)",
    ai_rename_loading: "IA réfléchit...",
    ai_fallback_notice: "IA indisponible, nom auto utilisé",
    batch_ai_rename: "Tout renommer (IA)",
    logo_uploaded: "Logo téléchargé",
    target_format: "FORMAT CIBLE :",
    rotate: "Pivoter",
    resize: "Taille",
    grayscale: "Noir & Blanc",
    bg_remove: "Supprimer le fond",
    convert_btn: "Convertir",
    convert_all_btn: "Tout convertir",
    download_btn: "Télécharger",
    completed: "Terminé !",
    error_generic: "Erreur survenue",
    preset_label: "Profil :",
    preset_web: "Web",
    preset_social: "Réseaux sociaux",
    preset_archive: "Archive",

    // Sidebar
    pro_tips_title: "Conseils Pro",
    tip_heic: "Convertissez instantanément les photos HEIC iPhone en JPG.",
    tip_seo: "Les fichiers sont traités en toute sécurité dans votre navigateur.",
    tip_size: "Réduisez la taille du fichier sans perte de qualité.",

    // Referral
    ref_title: "Gagnez plus de crédits",
    ref_desc: "Partagez VormPixyze. +5 Crédits par inscription !",
    ref_btn: "Copier le lien",
    ref_success: "Lien copié ! (Crédits à l'inscription)",

    // Premium Modal
    prem_title: "Passer à Premium",
    prem_subtitle: "Accès illimité aux outils professionnels.",
    prem_feature_1: "Conversions illimitées",
    prem_feature_2: "Expérience sans publicité",
    prem_feature_3: "Renommage IA illimité",
    prem_feature_4: "Téléchargement ZIP en masse",
    prem_price_btn: "Passer Premium ($4.99/Mois)",
    prem_no_thanks: "Non merci",
    premium_plans_title: "Plans Premium",
    premium_plans_subtitle: "Choisissez le plan qui vous convient le mieux",

    // Premium Plans
    plan_starter: "Starter",
    plan_pro: "Pro",
    plan_business: "Business",
    price_mo: "/mois",
    feat_credits_30: "30 Crédits par jour",
    feat_credits_100: "100 Crédits par jour",
    feat_credits_unlimited: "300 Crédits par jour",
    feat_remove_bg: "Suppression du fond",
    feat_no_ads: "Pas de publicité",
    feat_priority_ai: "Traitement IA prioritaire",
    feat_zip_download: "Téléchargement ZIP",
    feat_batch_ai: "Renommage IA en masse",
    feat_watermark: "Filigrane",
    feat_special_formats: "Formats spéciaux (BMP, TIFF)",
    feat_all_prem: "Toutes les fonctions Premium",
    feat_support_247: "Support 24/7",
    feat_batch_50: "Traitement par lot (50+)",
    feat_watermark_custom: "Filigrane Personnalisé",
    feat_history: "Journal d'activité",
    btn_select_starter: "Choisir Starter",
    btn_select_pro: "Choisir Pro",
    btn_select_business: "Choisir Business",
    popular_badge: "POPULAIRE",
    maybe_later: "Non merci, plus tard",

    // Footer Links & Legal
    privacy: "Confidentialité",
    terms: "Conditions",
    contact: "Contact",
    footer_text: "Tous droits réservés.",
    close: "Fermer",

    // Cookie Banner
    cookie_message: "Nous utilisons des cookies pour une meilleure expérience.",
    cookie_accept: "Accepter",
    cookie_decline: "Refuser",

    // Legal (Keep EN for now)
    privacy_title: "Privacy Policy",
    terms_title: "Terms of Service",
    contact_title: "Contact & Support",
    privacy_content: "See English version for detailed legal text.",
    terms_content: "See English version for detailed legal text.",
    contact_content: "Email: support@vormpixyze.com",

    // Support Modal
    support_title: "Support",
    support_subject: "SUJET",
    support_subject_placeholder: "Décrivez brièvement le problème...",
    support_message: "MESSAGE",
    support_message_placeholder: "Comment pouvons-nous vous aider ?",
    support_premium_msg: "En tant que membre Premium, vous bénéficiez d'un support prioritaire !",
    cancel: "Annuler",
    send_email: "Envoyer l'email",
  }
};
