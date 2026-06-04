const fs = require('fs');
let content = fs.readFileSync('components/SeoContent.tsx', 'utf8');

const missingTR = `
        'favicon-generator': {
            title: "Favicon Oluşturucu: Siteniz İçin Profesyonel İkonlar (.ico)",
            intro: "WebImgConverter Favicon Oluşturucu ile PNG, JPG veya SVG görsellerinizi saniyeler içinde tüm modern tarayıcılar ile uyumlu standart .ico formatına dönüştürün. Web sitenizin profesyonel görünümünü tamamlamak ve marka bilinirliğinizi artırmak için yüksek kaliteli ikon dosyaları oluşturmak artık çok daha kolay. Gelişmiş dönüştürme motorumuz, görselinizi çoklu çözünürlüklerde (16x16, 32x32, 48x48) tek bir .ico dosyasında birleştirerek her cihazda net görünüm sağlar.",
            whyTitle: "Neden Favicon Kullanmalısınız?",
            features: [
                { title: "Marka Bilinirliği ve Profesyonellik", desc: "Kullanıcıların tarayıcı sekmelerinde, yer imlerinde (bookmarks) ve arama geçmişinde sitenizi logonuz sayesinde çok daha kolay bulmalarını sağlayın." },
                { title: "Tüm Tarayıcılarla Tam Uyumluluk", desc: "Eski Internet Explorer sürümlerinden en yeni Chrome, Safari ve Firefox sürümlerine kadar eksiksiz destek." },
                { title: "Çoklu Çözünürlük Desteği", desc: "Sistemimiz standart web için 16x16, retina ekranlar için 32x32 piksellik versiyonları otomatik oluşturup birleştirir." }
            ],
            faq: [
                { q: "Hangi formatları yükleyebilirim?", a: "Sistemimiz PNG, JPG, WebP, AVIF ve SVG formatlarındaki görsellerinizi kabul eder ve kayıpsız bir şekilde .ico dosyasına çevirir." },
                { q: "Arka planı şeffaf yapabilir miyim?", a: "Eğer yüklediğiniz görselin (örneğin PNG veya SVG) şeffaf bir arka planı varsa, dönüştürülen favicon dosyasında da bu şeffaflık tamamen korunur." },
                { q: "SEO'ya faydası var mıdır?", a: "Evet. Arama motorları (Google vb.) favicon dosyalarını indeksler ve arama sonuçlarında site başlığınızın yanında gösterir. Bu da tıklanma oranınızı (CTR) artırır." }
            ]
        },
        'watermark-image': {
            title: "Fotoğraflara Filigran Ekleme: Dijital Eserlerinizi Koruyun",
            intro: "Görsellerinizin izinsiz kullanılmasını ve kopyalanmasını önlemek veya sadece marka kimliğinizi vurgulamak için fotoğraflarınıza kolayca metin veya logo filigranı (watermark) ekleyin. WebImgConverter'ın yerel işlem gücü sayesinde yüzlerce fotoğrafınızı sunucuya yüklemeden, anında damgalayın.",
            whyTitle: "Neden Filigran Eklemelisiniz?",
            features: [
                { title: "Telif Hakkı Koruması", desc: "Dijital hırsızlığa karşı eserlerinizi koruyun. Fotoğraflarınızı çalanların veya izinsiz kullananların işini imkansız hale getirin." },
                { title: "Marka Görünürlüğü", desc: "Fotoğraflarınız sosyal medyada veya diğer web sitelerinde paylaşıldığında, logonuz sayesinde markanız her yere ulaşsın." }
            ],
            faq: [
                { q: "Kalite bozulur mu?", a: "Hayır, fotoğraflarınızın üzerine eklenen filigran orijinal kaliteyi hiçbir şekilde etkilemez. Dışa aktarım yüksek kalitede yapılır." },
                { q: "Yüzlerce fotoğrafa aynı anda eklenebilir mi?", a: "Evet. Toplu dönüştürme özelliği sayesinde tek bir seferde binlerce görsele aynı konumda filigran ekleyebilirsiniz." }
            ]
        },
        'rotate-image': {
            title: "Resim Döndürme: Görsellerinizi İstediğiniz Açıya Getirin",
            intro: "Ters çekilmiş, yan duran veya yanlış yönlendirmeye sahip fotoğraflarınızı tek tıkla 90 derece sağa, sola döndürün veya yatay/dikey olarak çevirin (flip).",
            whyTitle: "Resimleri Neden Döndürmelisiniz?",
            features: [
                { title: "Hızlı Düzeltme", desc: "Telefon kameralarının hatalı algıladığı yön (EXIF orientation) problemlerini pikselleri bozmadan anında düzeltin." }
            ],
            faq: [
                { q: "Görselin boyutu veya kalitesi değişir mi?", a: "Sadece yön bilgisi ve piksel matrisi döndürülür, bu sebeple kalite kesinlikle düşmez." }
            ]
        },
        'black-and-white': {
            title: "Siyah Beyaz Fotoğraf Yapma aracı: Nostaljik Bir Hava",
            intro: "Renkli fotoğraflarınızı tek tıkla yüksek kaliteli siyah beyaz (grayscale) görsellere dönüştürün. Dramatik etkiler, nostaljik temalar veya profesyonel tasarım ihtiyaçları için mükemmel tonlama.",
            whyTitle: "Neden Siyah Beyaz?",
            features: [
                { title: "Odaklanma ve Dramatik Etki", desc: "Renklerin dikkat dağıtıcı etkisinden kurtulup ana konuya, ışığa ve kompozisyona odaklanın." }
            ],
            faq: [
                { q: "Geri alınabilir mi?", a: "Araç orijinal dosyanıza dokunmaz, yeni bir dosya indirirsiniz. Orijinal dosyanız renkli kalır." }
            ]
        },
        'image-resizer': {
            title: "Görsel Yeniden Boyutlandırma (Image Resizer)",
            intro: "Fotoğraflarınızın en ve boy (genişlik/yükseklik) değerlerini tam olarak istediğiniz piksel değerlerine ayarlayın. İster belirli bir platformun kısıtlamalarına uymak, ister web siteniz için boyutları standartlaştırmak isteyin, bu araç görsellerinizi mükemmel ölçülere getirir.",
            whyTitle: "Neden Boyutlandırma Yapmalısınız?",
            features: [
                { title: "Platform Gereksinimleri", desc: "Instagram, YouTube, Twitter gibi platformların spesifik görsel boyutu (örneğin 1920x1080 veya 1080x1080) kurallarına saniyeler içinde uyun." },
                { title: "Sayfa Yüklenme Hızı", desc: "Sitenizde 500x500 piksel gösterilecek bir alanı 4000x4000 piksel yüklemek yerine, tam boyutuna getirerek ciddi tasarruf sağlayın." }
            ],
            faq: [
                { q: "En-boy oranı (Aspect Ratio) bozulur mu?", a: 'Hayır, "En/Boy Oranını Koru" (Lock Aspect Ratio) seçeneğini işaretlerseniz görseliniz sünmez veya basılmaz.' }
            ]
        },`;

const missingEN = `
        'favicon-generator': {
            title: "Favicon Generator: Professional Icons for Your Website (.ico)",
            intro: "Convert your PNG, JPG, or SVG images to standard .ico format compatible with all modern browsers in seconds using the WebImgConverter Favicon Generator. Creating high-quality icon files to complete your website's professional look and increase brand awareness is now much easier. Our advanced conversion engine merges your image into multiple resolutions (16x16, 32x32, 48x48) in a single .ico file, ensuring crisp display on every device.",
            whyTitle: "Why Use a Favicon?",
            features: [
                { title: "Brand Awareness & Professionalism", desc: "Make it much easier for users to find your site in browser tabs, bookmarks, and search history thanks to your logo." },
                { title: "Full Compatibility with All Browsers", desc: "Complete support from older versions of Internet Explorer to the latest versions of Chrome, Safari, and Firefox." },
                { title: "Multi-Resolution Support", desc: "Our system automatically generates and merges 16x16 versions for standard web and 32x32 versions for retina displays." }
            ],
            faq: [
                { q: "What formats can I upload?", a: "Our system accepts PNG, JPG, WebP, AVIF, and SVG formats and converts them losslessly to an .ico file." },
                { q: "Can I make the background transparent?", a: "If the image you upload (e.g., PNG or SVG) has a transparent background, this transparency is fully preserved in the converted favicon file." },
                { q: "Does it help with SEO?", a: "Yes. Search engines (like Google) index favicon files and display them next to your site title in search results, increasing your Click-Through Rate (CTR)." }
            ]
        },
        'watermark-image': {
            title: "Add Watermark to Photos: Protect Your Digital Assets",
            intro: "Easily add text or logo watermarks to your photos to prevent unauthorized use and copying of your images, or simply to emphasize your brand identity. Stamp hundreds of photos instantly without uploading them to a server, thanks to WebImgConverter's local processing power.",
            whyTitle: "Why Should You Add a Watermark?",
            features: [
                { title: "Copyright Protection", desc: "Protect your works against digital theft. Make it impossible for those who steal or use your photos without permission." },
                { title: "Brand Visibility", desc: "When your photos are shared on social media or other websites, your brand reaches everywhere thanks to your logo." }
            ],
            faq: [
                { q: "Will the quality degrade?", a: "No, the watermark added to your photos does not affect the original quality in any way. Export is done in high quality." },
                { q: "Can I add it to hundreds of photos at once?", a: "Yes. With the batch conversion feature, you can add watermarks to thousands of images in the same position at once." }
            ]
        },
        'rotate-image': {
            title: "Rotate Image: Adjust Your Images to Any Angle",
            intro: "Rotate your upside-down, sideways, or misoriented photos 90 degrees right, left, or flip them horizontally/vertically with a single click.",
            whyTitle: "Why Rotate Images?",
            features: [
                { title: "Quick Fix", desc: "Instantly fix orientation (EXIF orientation) problems incorrectly detected by phone cameras without distorting pixels." }
            ],
            faq: [
                { q: "Will the size or quality of the image change?", a: "Only the orientation information and pixel matrix are rotated, so the quality will absolutely not drop." }
            ]
        },
        'black-and-white': {
            title: "Black and White Photo Maker: A Nostalgic Touch",
            intro: "Convert your color photos into high-quality black and white (grayscale) images with a single click. Perfect toning for dramatic effects, nostalgic themes, or professional design needs.",
            whyTitle: "Why Black and White?",
            features: [
                { title: "Focus and Dramatic Effect", desc: "Get rid of the distracting effect of colors and focus on the main subject, light, and composition." }
            ],
            faq: [
                { q: "Is it reversible?", a: "The tool does not touch your original file; you download a new file. Your original file remains in color." }
            ]
        },
        'image-resizer': {
            title: "Image Resizer",
            intro: "Set the width and height values of your photos exactly to the pixel values you want. Whether you want to comply with the restrictions of a specific platform or standardize dimensions for your website, this tool brings your images to perfect dimensions.",
            whyTitle: "Why Resize?",
            features: [
                { title: "Platform Requirements", desc: "Comply with specific image size rules (e.g., 1920x1080 or 1080x1080) of platforms like Instagram, YouTube, Twitter in seconds." },
                { title: "Page Load Speed", desc: "Save significantly by resizing an image to its exact size instead of loading a 4000x4000 pixel image in an area that will be displayed as 500x500 pixels on your site." }
            ],
            faq: [
                { q: "Will the aspect ratio be distorted?", a: 'No, if you check the "Lock Aspect Ratio" option, your image will not stretch or squash.' }
            ]
        },`;

const missingDE = `
        'favicon-generator': {
            title: "Favicon-Generator: Professionelle Icons für Ihre Website (.ico)",
            intro: "Konvertieren Sie Ihre PNG-, JPG- oder SVG-Bilder mit dem WebImgConverter Favicon-Generator in Sekunden in das standardmäßige .ico-Format, das mit allen modernen Browsern kompatibel ist.",
            whyTitle: "Warum ein Favicon verwenden?",
            features: [
                { title: "Markenbekanntheit", desc: "Erleichtern Sie es Benutzern erheblich, Ihre Seite in Browser-Tabs und Lesezeichen anhand Ihres Logos zu finden." },
                { title: "Volle Kompatibilität", desc: "Vollständige Unterstützung von älteren Versionen des Internet Explorers bis hin zu den neuesten Chrome- und Safari-Versionen." }
            ],
            faq: [
                { q: "Welche Formate kann ich hochladen?", a: "Unser System akzeptiert PNG, JPG, WebP, AVIF und SVG." },
                { q: "Hilft es bei SEO?", a: "Ja. Suchmaschinen indexieren Favicons und zeigen sie in den Suchergebnissen an." }
            ]
        },
        'watermark-image': {
            title: "Wasserzeichen zu Fotos hinzufügen",
            intro: "Fügen Sie Ihren Fotos ganz einfach Text- oder Logo-Wasserzeichen hinzu, um unbefugte Nutzung zu verhindern.",
            whyTitle: "Warum ein Wasserzeichen hinzufügen?",
            features: [
                { title: "Urheberrechtsschutz", desc: "Schützen Sie Ihre Werke vor digitalem Diebstahl." }
            ],
            faq: [
                { q: "Verschlechtert sich die Qualität?", a: "Nein, das Wasserzeichen beeinträchtigt die Originalqualität in keiner Weise." }
            ]
        },
        'rotate-image': {
            title: "Bild drehen",
            intro: "Drehen Sie Ihre auf dem Kopf stehenden oder seitlichen Fotos mit einem Klick um 90 Grad oder spiegeln Sie sie.",
            whyTitle: "Warum Bilder drehen?",
            features: [
                { title: "Schnelle Korrektur", desc: "Beheben Sie sofort Probleme mit der Ausrichtung (EXIF-Ausrichtung)." }
            ],
            faq: [
                { q: "Ändert sich die Qualität?", a: "Nur die Ausrichtung wird geändert, die Qualität bleibt erhalten." }
            ]
        },
        'black-and-white': {
            title: "Schwarz-Weiß-Bilder erstellen",
            intro: "Konvertieren Sie Ihre Farbfotos mit einem einzigen Klick in hochwertige Schwarz-Weiß-Bilder.",
            whyTitle: "Warum Schwarz-Weiß?",
            features: [
                { title: "Fokus und dramatischer Effekt", desc: "Konzentrieren Sie sich auf das Hauptmotiv und die Lichtverhältnisse." }
            ],
            faq: [
                { q: "Wird die Originaldatei überschrieben?", a: "Nein, Sie laden eine neue Datei herunter." }
            ]
        },
        'image-resizer': {
            title: "Bildgröße ändern (Image Resizer)",
            intro: "Passen Sie die Breite und Höhe Ihrer Fotos genau auf die gewünschten Pixelwerte an.",
            whyTitle: "Warum die Größe ändern?",
            features: [
                { title: "Plattformanforderungen", desc: "Erfüllen Sie die Größenregeln von Plattformen wie Instagram oder YouTube." },
                { title: "Ladezeit der Seite", desc: "Sparen Sie Bandbreite, indem Sie Bilder auf die exakt benötigte Größe skalieren." }
            ],
            faq: [
                { q: "Wird das Seitenverhältnis verzerrt?", a: 'Nein, wenn Sie "Seitenverhältnis beibehalten" wählen.' }
            ]
        },`;

const missingFR = `
        'favicon-generator': {
            title: "Générateur de Favicon : Icônes professionnelles pour votre site (.ico)",
            intro: "Convertissez vos images PNG, JPG ou SVG au format .ico standard en quelques secondes avec le Générateur de Favicon WebImgConverter.",
            whyTitle: "Pourquoi utiliser un Favicon ?",
            features: [
                { title: "Notoriété de la marque", desc: "Aidez les utilisateurs à trouver facilement votre site dans les onglets du navigateur grâce à votre logo." },
                { title: "Compatibilité totale", desc: "Pris en charge par tous les navigateurs modernes." }
            ],
            faq: [
                { q: "Quels formats puis-je télécharger ?", a: "PNG, JPG, WebP, AVIF et SVG sont acceptés." }
            ]
        },
        'watermark-image': {
            title: "Ajouter un filigrane aux photos",
            intro: "Ajoutez facilement des filigranes de texte ou de logo à vos photos pour empêcher toute utilisation non autorisée.",
            whyTitle: "Pourquoi ajouter un filigrane ?",
            features: [
                { title: "Protection des droits d'auteur", desc: "Protégez vos œuvres contre le vol numérique." }
            ],
            faq: [
                { q: "La qualité va-t-elle se dégrader ?", a: "Non, la qualité originale est entièrement préservée." }
            ]
        },
        'rotate-image': {
            title: "Pivoter l'image",
            intro: "Faites pivoter vos photos à 90 degrés ou retournez-les d'un simple clic.",
            whyTitle: "Pourquoi pivoter ?",
            features: [
                { title: "Correction rapide", desc: "Corrigez instantanément les problèmes d'orientation EXIF." }
            ],
            faq: [
                { q: "La qualité est-elle conservée ?", a: "Oui, la rotation se fait sans perte de pixels." }
            ]
        },
        'black-and-white': {
            title: "Convertir en Noir et Blanc",
            intro: "Transformez vos photos couleur en images en niveaux de gris de haute qualité.",
            whyTitle: "Pourquoi le noir et blanc ?",
            features: [
                { title: "Effet dramatique", desc: "Concentrez-vous sur le sujet principal et la composition." }
            ],
            faq: [
                { q: "Est-ce réversible ?", a: "L'outil crée un nouveau fichier, l'original reste en couleur." }
            ]
        },
        'image-resizer': {
            title: "Redimensionner l'image",
            intro: "Ajustez la largeur et la hauteur de vos photos aux valeurs exactes en pixels.",
            whyTitle: "Pourquoi redimensionner ?",
            features: [
                { title: "Exigences de la plateforme", desc: "Respectez les règles de taille spécifiques d'Instagram, YouTube, etc." }
            ],
            faq: [
                { q: "Les proportions seront-elles déformées ?", a: 'Non, utilisez l\'option "Verrouiller les proportions".' }
            ]
        },`;

content = content.replace(/'crop': \{/, missingTR + "\n        'crop': {");
content = content.replace(/'crop': \{/, missingEN + "\n        'crop': {");
content = content.replace(/'crop': \{/, missingDE + "\n        'crop': {");
content = content.replace(/'crop': \{/, missingFR + "\n        'crop': {");

fs.writeFileSync('components/SeoContent.tsx', content);
console.log("Success! Added proper full SEO content for missing tools to all 4 languages.");
