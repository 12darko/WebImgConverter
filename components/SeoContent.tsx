import React from 'react';
import { useLanguage } from '../LanguageContext';

export type SeoPageType = 'home' | 'heic-to-jpg' | 'png-to-jpg' | 'webp-to-jpg' | 'remove-background' | 'compress-image';

interface SeoContentProps {
    pageType?: SeoPageType;
}

const seoData = {
    tr: {
        'home': {
            title: "Tüm Görsel Araçları Tek Yerde - VormPixyze",
            intro: "VormPixyze, görsel dönüştürme ve düzenleme ihtiyaçlarınız için geliştirdiğimiz güvenli ve ücretsiz bir araç setidir. HEIC'ten JPG'e, WebP dönüştürmeye, arka plan silmeden dosya küçültmeye kadar her şey burada.",
            whyTitle: "Neden VormPixyze?",
            features: [
                { title: "🔒 Gizlilik Öncelikli", desc: "Dosyalarınız güvende. İşlemler cihazınızda veya güvenli sunucularımızda anlık yapılır." },
                { title: "⚡ Işık Hızında İşlem", desc: "WebAssembly teknolojisi ile saniyeler içinde binlerce görseli işleyin." },
                { title: "📱 Tüm Cihazlar Uyumlu", desc: "Windows, Mac, iPhone veya Android fark etmez, her yerden erişin." },
                { title: "🤖 Yapay Zeka Desteği", desc: "Arka plan silme ve akıllı isimlendirme için en yeni AI modelleri." }
            ],
            faq: [
                { q: "VormPixyze ücretsiz mi?", a: "Evet, temel araçların tamamı ücretsizdir. Profesyonel özellikler için uygun fiyatlı planlarımız mevcuttur." },
                { q: "Dosyalarım çalınır mı?", a: "Hayır, gizliliğiniz önceliğimizdir. Dosyalarınız asla kalıcı olarak depolanmaz ve işlem sonrası silinir." },
                { q: "Hangi formatları destekliyorsunuz?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF formatlarını destekliyoruz. İstediğiniz formata dönüştürebilirsiniz." },
                { q: "Mobil cihazlarda çalışır mı?", a: "Evet, iPhone, Android ve tablet dahil tüm modern tarayıcılarda sorunsuz çalışır." },
                { q: "Toplu dönüştürme yapabilir miyim?", a: "Evet, tek seferde 100+ dosya yükleyebilir ve hepsini aynı anda dönüştürebilirsiniz." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC Dosyasını JPG'ye Çevirme Rehberi",
            intro: "VormPixyze, Apple'ın modern fotoğraf formatı olan HEIC dosyalarını saniyeler içinde JPG, PNG veya WEBP formatlarına dönüştürmenizi sağlar. iPhone ve iPad'de çektiğiniz fotoğrafları Windows, Android ve web sitelerinde sorunsuzca kullanın.",
            whyTitle: "HEIC Dönüştürme Rehberi",
            features: [
                { title: "Neden HEIC'i JPG'ye Çevirmeliyim?", desc: "HEIC formatı yüksek sıkıştırma sunsa da uyumluluk sorunu yaşatır. JPG en evrensel formattır." },
                { title: "Toplu Dönüştürme", desc: "Yüzlerce iPhone fotoğrafını tek seferde yükleyin ve dönüştürün." },
                { title: "Kalite Kaybı Yok", desc: "Profesyonel sıkıştırma algoritmaları ile orijinal kaliteyi koruyoruz." },
                { title: "HEIF Desteği", desc: "HEIC ve HEIF her ikisi de desteklenir. Live Photo'lar JPG'ye çevrilir." }
            ],
            faq: [
                { q: "Windows'ta HEIC nasıl açılır?", a: "Windows için eklenti satın almanıza gerek yok, VormPixyze ile JPG'ye çevirip hemen açabilirsiniz." },
                { q: "Kalite bozulur mu?", a: "Hayır, en iyi sıkıştırma algoritmaları ile görsel kalitesini koruyoruz." },
                { q: "HEIC nedir?", a: "HEIC (High Efficiency Image Container), Apple'ın iOS 11'den itibaren kullandığı modern görsel formatıdır. JPG'ye kıyasla %50 daha küçük dosya boyutu sunar." },
                { q: "iPhone fotoğraflarımı nasıl aktarırım?", a: "iPhone'unuzu AirDrop, iCloud veya kablo ile bilgisayara bağlayın, HEIC dosyalarını VormPixyze'a sürükleyin." },
                { q: "Toplu HEIC dönüştürme yapabilir miyim?", a: "Evet, tek seferde 100+ HEIC dosyası yükleyebilir ve hepsini JPG'ye çevirebilirsiniz." }
            ]
        },
        'png-to-jpg': {
            title: "PNG'den JPG'ye Dönüştürme - Şeffaflık ve Boyut",
            intro: "Büyük boyutlu PNG dosyalarınızı web uyumlu, optimize edilmiş JPG formatına dönüştürün. Saydam arka planları otomatik olarak beyaz veya siyah yapabilirsiniz.",
            whyTitle: "PNG mi JPG mi?",
            features: [
                { title: "Daha Küçük Dosya Boyutu", desc: "PNG dosyaları kayıpsız olduğu için çok yer kaplar. JPG ile %80'e varan sıkıştırma sağlayın." },
                { title: "Web Uyumluluğu", desc: "Web siteniz için en hızlı yüklenen format JPG'dir." },
                { title: "Şeffaflık Kontrolü", desc: "PNG'nin şeffaf alanlarını istediğiniz renge (beyaz/siyah) dönüştürün." },
                { title: "Renk Profili", desc: "sRGB renk profili ile her ekranda tutarlı renkler." }
            ],
            faq: [
                { q: "Saydamlık (Transparanlık) ne olur?", a: "JPG saydamlığı desteklemez. Çevirirken arka plan otomatik olarak beyaz yapılır." },
                { q: "Hangi durumlarda PNG kullanmalıyım?", a: "Eğer logonuz veya grafiğinizde saydamlık varsa PNG kullanın, fotoğraf ise JPG'ye çevirin." },
                { q: "PNG ve JPG arasındaki fark nedir?", a: "PNG kayıpsız sıkıştırma ve şeffaflık sunar, JPG ise daha küçük dosya boyutu sağlar. Fotoğraflar için JPG, grafikler için PNG idealdir." },
                { q: "Web sitesi için hangisi daha iyi?", a: "Fotoğraflar için JPG, logolar ve ikonlar için PNG kullanın. WebP ise her ikisinin avantajlarını birleştirir." },
                { q: "Arka plan rengini seçebilir miyim?", a: "Evet, şeffaf PNG'leri JPG'ye çevirirken beyaz, siyah veya özel bir arka plan rengi seçebilirsiniz." }
            ]
        },
        'webp-to-jpg': {
            title: "WebP Dosyalarını JPG ve PNG Yapma",
            intro: "Google'ın geliştirdiği WebP formatını, her yerde açılabilen JPG veya PNG formatına çevirin. Web'den indirdiğiniz görselleri Photoshop ve diğer araçlarda kullanın.",
            whyTitle: "WebP Dönüştürme Hakkında",
            features: [
                { title: "Evrensel Uyumluluk", desc: "WebP her editörde açılmayabilir. JPG ve PNG her yerde çalışır." },
                { title: "Tersine Dönüşüm", desc: "WebP'den eski formatlara dönüşüm yaparken kaliteyi maksimumda tutarız." },
                { title: "Animasyonlu WebP", desc: "Animasyonlu WebP dosyalarının ilk karesini çıkarabiliriz." },
                { title: "Şeffaflık Koruma", desc: "WebP'den PNG'ye çevirirken şeffaflık korunur." }
            ],
            faq: [
                { q: "WebP nedir?", a: "WebP, Google tarafından web sitelerini hızlandırmak için geliştirilen yeni nesil bir görsel formatıdır." },
                { q: "Dönüştürme hızlı mı?", a: "Evet, tarayıcı teknolojimiz sayesinde saniyede onlarca dosyayı çevirebilirsiniz." },
                { q: "WebP'yi neden JPG'ye çevirmeliyim?", a: "Photoshop, eski tarayıcılar ve bazı uygulamalar WebP'yi desteklemez. JPG evrensel uyumluluk sağlar." },
                { q: "Kalite kaybı olur mu?", a: "Minimum kalite kaybı ile dönüşüm yapıyoruz. İstediğiniz kalite seviyesini ayarlayabilirsiniz." },
                { q: "WebP animasyonları destekleniyor mu?", a: "Animasyonlu WebP dosyalarını statik JPG'ye çevirebilirsiniz. Her kare için ayrı dosya da oluşturulabilir." }
            ]
        },
        'remove-background': {
            title: "Yapay Zeka ile Arka Plan Silme (Remove BG)",
            intro: "Fotoğraflarınızın arka planını tek bir tıkla, saniyeler içinde silin. Ürün fotoğrafları, portreler ve logolar için mükemmel temizlik.",
            whyTitle: "AI Arka Plan Temizleyici",
            features: [
                { title: "Otomatik Algılama", desc: "Hangi objenin önde olduğunu yapay zeka anlar ve saç teline kadar detaylı kesim yapar." },
                { title: "Şeffaf PNG Çıktısı", desc: "Sonuçları saydam PNG olarak indirip tasarımlarınızda kullanın." },
                { title: "E-Ticaret Optimizasyonu", desc: "Ürün fotoğraflarınızı beyaz arka plana geçirin, satışları artırın." },
                { title: "Sosyal Medya", desc: "Profil fotoğrafları ve içerik için arka planları anında temizleyin." }
            ],
            faq: [
                { q: "Bu özellik ücretli mi?", a: "Temel kullanım ücretsizdir. Yüksek çözünürlüklü ve sınırsız işlem için Premium'a geçebilirsiniz." },
                { q: "Hangi fotolarda iyi çalışır?", a: "Net bir özneye (insan, araba, ürün) sahip fotolarda en iyi sonucu verir." },
                { q: "Saç ve kürk gibi detayları algılar mı?", a: "Evet, yapay zekamız saç telleri, kürk ve karmaşık kenarları piksel hassasiyetinde algılar." },
                { q: "Çıktı formatı nedir?", a: "Şeffaf PNG olarak indirilir. İsterseniz JPG formatında beyaz arka planla da alabilirsiniz." },
                { q: "Toplu arka plan silme yapabilir miyim?", a: "Evet, birden fazla fotoğraf yükleyerek hepsinin arka planını aynı anda silebilirsiniz." }
            ]
        },
        'compress-image': {
            title: "Görsel Sıkıştırma ve Boyut Küçültme",
            intro: "JPG, PNG ve WebP dosyalarınızın boyutunu kalite kaybetmeden %90'a kadar küçültün. Web sitenizi hızlandırın, depolama alanından tasarruf edin.",
            whyTitle: "Akıllı Sıkıştırma",
            features: [
                { title: "Kayıplı ve Kayıpsız Seçenekler", desc: "İster maksimum kaliteyi koruyun, ister maksimum sıkıştırma yapın." },
                { title: "Toplu İşlem", desc: "Klasör dolusu fotoğrafı tek seferde sıkıştırın." },
                { title: "Web Performansı", desc: "Core Web Vitals skorlarınızı iyileştirin, SEO sıralamanızı yükseltin." },
                { title: "Önizleme", desc: "Sıkıştırma sonucunu indirmeden önce karşılaştırın." }
            ],
            faq: [
                { q: "Görüntü kalitesi bozulur mu?", a: "Gözle görülmeyecek seviyede optimizasyon yapıyoruz. Piksellenme olmaz." },
                { q: "Hangi formatları küçültebilirim?", a: "JPG, PNG, WebP ve HEIC dosyalarını destekliyoruz." },
                { q: "Ne kadar sıkıştırma mümkün?", a: "Dosya türüne bağlı olarak %50-90 arası boyut küçültme sağlanabilir." },
                { q: "Web sitesi hızı için ne kadar önemli?", a: "Görsel boyutları sayfa yüklenme süresinin %60'ından fazlasını oluşturur. Sıkıştırma kritik öneme sahiptir." },
                { q: "Orijinal dosyam değişir mi?", a: "Hayır, orijinal dosyanız korunur. Yeni sıkıştırılmış versiyonu ayrıca indirirsiniz." }
            ]
        }
    },
    en: {
        'home': {
            title: "All Image Tools in One Place - VormPixyze",
            intro: "VormPixyze is a secure and free toolkit for all your image conversion and editing needs. From HEIC to JPG, WebP conversion, background removal to compression, it's all here.",
            whyTitle: "Why VormPixyze?",
            features: [
                { title: "🔒 Privacy First", desc: "Your files are safe. Processing happens on your device or securely in the cloud." },
                { title: "⚡ Lightning Fast", desc: "Process thousands of images in seconds with WebAssembly." },
                { title: "📱 Cross-Platform", desc: "Works on Windows, Mac, iPhone, or Android seamlessly." },
                { title: "🤖 AI Powered", desc: "Latest AI models for background removal and smart naming." }
            ],
            faq: [
                { q: "Is VormPixyze free?", a: "Yes, all basic tools are free. Affordable plans are available for pro features." },
                { q: "Are my files safe?", a: "Yes, privacy is our priority. Files are never permanently stored and are deleted immediately after processing." },
                { q: "What formats do you support?", a: "We support HEIC, HEIF, JPG, PNG, WebP, AVIF formats. Convert to any format you need." },
                { q: "Does it work on mobile?", a: "Yes, works flawlessly on all modern browsers including iPhone, Android, and tablets." },
                { q: "Can I batch convert?", a: "Yes, upload 100+ files at once and convert them all simultaneously." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC to JPG Conversion Guide",
            intro: "VormPixyze lets you convert Apple's modern HEIC photo format to JPG, PNG, or WEBP in seconds. Use photos from your iPhone and iPad on Windows, Android, and websites seamlessly.",
            whyTitle: "HEIC Conversion Guide",
            features: [
                { title: "Why Convert HEIC to JPG?", desc: "HEIC offers high compression but lacks compatibility. JPG is universal." },
                { title: "Batch Conversion", desc: "Upload and convert hundreds of iPhone photos at once." },
                { title: "No Quality Loss", desc: "Professional compression algorithms preserve original quality." },
                { title: "HEIF Support", desc: "Both HEIC and HEIF are supported. Live Photos convert to JPG." }
            ],
            faq: [
                { q: "How to open HEIC on Windows?", a: "No need to buy extensions, convert to JPG with VormPixyze and open instantly." },
                { q: "Does quality suffer?", a: "No, we preserve visual quality with top compression algorithms." },
                { q: "What is HEIC?", a: "HEIC (High Efficiency Image Container) is Apple's modern image format since iOS 11. It offers 50% smaller file size than JPG." },
                { q: "How do I transfer iPhone photos?", a: "Connect your iPhone via AirDrop, iCloud, or cable, then drag HEIC files to VormPixyze." },
                { q: "Can I batch convert HEIC?", a: "Yes, upload 100+ HEIC files at once and convert them all to JPG." }
            ]
        },
        'png-to-jpg': {
            title: "Convert PNG to JPG - Transparency & Size",
            intro: "Convert large PNG files to web-optimized JPG format. Automatically handles transparent backgrounds by turning them white or black.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Smaller File Size", desc: "PNGs can be huge. JPG offers up to 80% better compression." },
                { title: "Web Compatibility", desc: "JPG is the fastest loading format for photographs on websites." },
                { title: "Transparency Control", desc: "Convert PNG transparent areas to your desired color (white/black)." },
                { title: "Color Profile", desc: "sRGB color profile for consistent colors on every screen." }
            ],
            faq: [
                { q: "What happens to transparency?", a: "JPG does not support transparency. Backgrounds become white automatically." },
                { q: "When to use PNG?", a: "Use PNG for logos with transparency, JPG for photographs." },
                { q: "What's the difference between PNG and JPG?", a: "PNG offers lossless compression and transparency, while JPG provides smaller file sizes. JPG for photos, PNG for graphics." },
                { q: "Which is better for websites?", a: "Use JPG for photos, PNG for logos and icons. WebP combines benefits of both." },
                { q: "Can I choose background color?", a: "Yes, when converting transparent PNGs to JPG, you can select white, black, or a custom background color." }
            ]
        },
        'webp-to-jpg': {
            title: "Convert WebP Files to JPG & PNG",
            intro: "Convert Google's WebP format to universally compatible JPG or PNG. Use web-downloaded images in Photoshop and other tools.",
            whyTitle: "About WebP Conversion",
            features: [
                { title: "Universal Compatibility", desc: "WebP doesn't open everywhere. JPG and PNG do." },
                { title: "Reverse Conversion", desc: "We maintain max quality when converting back from WebP." },
                { title: "Animated WebP", desc: "Extract the first frame from animated WebP files." },
                { title: "Transparency Preserved", desc: "Transparency is preserved when converting WebP to PNG." }
            ],
            faq: [
                { q: "What is WebP?", a: "WebP is a next-gen format by Google for faster websites." },
                { q: "Is conversion fast?", a: "Yes, our browser technology converts dozens of files per second." },
                { q: "Why convert WebP to JPG?", a: "Photoshop, older browsers, and some apps don't support WebP. JPG provides universal compatibility." },
                { q: "Will there be quality loss?", a: "Minimal quality loss with our conversion. You can adjust the quality level as desired." },
                { q: "Are WebP animations supported?", a: "You can convert animated WebP files to static JPG. Separate files for each frame can also be created." }
            ]
        },
        'remove-background': {
            title: "AI Background Remover",
            intro: "Remove image backgrounds with a single click in seconds. Perfect for products, portraits, and logos.",
            whyTitle: "AI Background Cleaning",
            features: [
                { title: "Auto Detection", desc: "AI understands the subject and makes precise cuts." },
                { title: "Transparent PNG", desc: "Download results as transparent PNGs for your designs." },
                { title: "E-Commerce Ready", desc: "Switch product photos to white background, boost sales." },
                { title: "Social Media", desc: "Instantly clean backgrounds for profile photos and content." }
            ],
            faq: [
                { q: "Is this free?", a: "Basic use is free. Upgrade for high-res and unlimited batching." },
                { q: "What photos work best?", a: "Photos with clear subjects (people, cars, products) work best." },
                { q: "Does it detect hair and fur details?", a: "Yes, our AI detects hair strands, fur, and complex edges with pixel precision." },
                { q: "What's the output format?", a: "Downloaded as transparent PNG. You can also get JPG with white background." },
                { q: "Can I batch remove backgrounds?", a: "Yes, upload multiple photos and remove all backgrounds simultaneously." }
            ]
        },
        'compress-image': {
            title: "Image Compressor & Resizer",
            intro: "Reduce JPG, PNG, and WebP file sizes by up to 90% without quality loss. Speed up your website and save storage.",
            whyTitle: "Smart Compression",
            features: [
                { title: "Lossy & Lossless", desc: "Choose between maximum quality or maximum compression." },
                { title: "Batch Processing", desc: "Compress folder loads of images at once." },
                { title: "Web Performance", desc: "Improve Core Web Vitals scores, boost SEO rankings." },
                { title: "Preview", desc: "Compare compression results before downloading." }
            ],
            faq: [
                { q: "Will quality drop?", a: "We optimize visibly lossless. No pixelation." },
                { q: "Supported formats?", a: "JPG, PNG, WebP, and HEIC supported." },
                { q: "How much compression is possible?", a: "Depending on file type, 50-90% file size reduction is achievable." },
                { q: "How important is this for website speed?", a: "Images account for over 60% of page load time. Compression is critical." },
                { q: "Does my original file change?", a: "No, your original file is preserved. You download a new compressed version separately." }
            ]
        }
    },
    de: {
        'home': {
            title: "Alle Bildwerkzeuge an einem Ort - VormPixyze",
            intro: "VormPixyze ist ein sicheres und kostenloses Toolkit für alle Ihre Bildkonvertierungs- und Bearbeitungsbedürfnisse.",
            whyTitle: "Warum VormPixyze?",
            features: [
                { title: "🔒 Privatsphäre zuerst", desc: "Ihre Dateien sind sicher. Die Verarbeitung erfolgt auf Ihrem Gerät oder sicher in der Cloud." },
                { title: "⚡ Blitzschnell", desc: "Verarbeiten Sie Tausende von Bildern in Sekunden." },
                { title: "📱 Plattformübergreifend", desc: "Funktioniert auf Windows, Mac, iPhone oder Android." },
                { title: "🤖 KI-gestützt", desc: "Neueste KI-Modelle für Hintergrundentfernung." }
            ],
            faq: [
                { q: "Ist VormPixyze kostenlos?", a: "Ja, alle grundlegenden Tools sind kostenlos." },
                { q: "Sind meine Dateien sicher?", a: "Ja, Dateien werden niemals dauerhaft gespeichert und sofort gelöscht." },
                { q: "Welche Formate werden unterstützt?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF Formate werden unterstützt." },
                { q: "Funktioniert es auf Mobilgeräten?", a: "Ja, funktioniert einwandfrei auf allen modernen Browsern." },
                { q: "Kann ich Stapelverarbeitung durchführen?", a: "Ja, laden Sie 100+ Dateien auf einmal hoch." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC zu JPG Konvertierungsanleitung",
            intro: "VormPixyze ermöglicht die Konvertierung von Apples modernem HEIC-Fotoformat in JPG, PNG oder WEBP in Sekunden.",
            whyTitle: "HEIC Konvertierungsanleitung",
            features: [
                { title: "Warum HEIC zu JPG konvertieren?", desc: "HEIC bietet hohe Komprimierung, aber mangelnde Kompatibilität." },
                { title: "Stapelverarbeitung", desc: "Laden Sie Hunderte von iPhone-Fotos auf einmal hoch." },
                { title: "Kein Qualitätsverlust", desc: "Professionelle Komprimierungsalgorithmen erhalten die Originalqualität." },
                { title: "HEIF-Unterstützung", desc: "Sowohl HEIC als auch HEIF werden unterstützt." }
            ],
            faq: [
                { q: "Wie öffnet man HEIC auf Windows?", a: "Keine Erweiterungen nötig, mit VormPixyze in JPG konvertieren und sofort öffnen." },
                { q: "Leidet die Qualität?", a: "Nein, wir erhalten die visuelle Qualität mit Top-Algorithmen." },
                { q: "Was ist HEIC?", a: "HEIC ist Apples modernes Bildformat seit iOS 11 mit 50% kleinerer Dateigröße als JPG." },
                { q: "Wie übertrage ich iPhone-Fotos?", a: "Verbinden Sie Ihr iPhone über AirDrop, iCloud oder Kabel." },
                { q: "Kann ich HEIC stapelweise konvertieren?", a: "Ja, laden Sie 100+ HEIC-Dateien auf einmal hoch." }
            ]
        },
        'png-to-jpg': {
            title: "PNG zu JPG konvertieren - Transparenz & Größe",
            intro: "Konvertieren Sie große PNG-Dateien in weboptimiertes JPG-Format.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Kleinere Dateigröße", desc: "PNGs können riesig sein. JPG bietet bis zu 80% bessere Komprimierung." },
                { title: "Web-Kompatibilität", desc: "JPG ist das schnellste Ladeformat für Fotos auf Websites." }
            ],
            faq: [
                { q: "Was passiert mit der Transparenz?", a: "JPG unterstützt keine Transparenz. Hintergründe werden automatisch weiß." },
                { q: "Wann PNG verwenden?", a: "Verwenden Sie PNG für Logos mit Transparenz, JPG für Fotos." },
                { q: "Unterschied zwischen PNG und JPG?", a: "PNG bietet verlustfreie Komprimierung und Transparenz, JPG kleinere Dateien." },
                { q: "Welches ist besser für Websites?", a: "JPG für Fotos, PNG für Logos und Icons." },
                { q: "Kann ich die Hintergrundfarbe wählen?", a: "Ja, wählen Sie weiß, schwarz oder eine benutzerdefinierte Farbe." }
            ]
        },
        'webp-to-jpg': {
            title: "WebP-Dateien zu JPG & PNG konvertieren",
            intro: "Konvertieren Sie Googles WebP-Format in universell kompatibles JPG oder PNG.",
            whyTitle: "Über WebP-Konvertierung",
            features: [
                { title: "Universelle Kompatibilität", desc: "WebP öffnet sich nicht überall. JPG und PNG schon." },
                { title: "Rückkonvertierung", desc: "Wir erhalten maximale Qualität bei der Konvertierung von WebP." }
            ],
            faq: [
                { q: "Was ist WebP?", a: "WebP ist ein Next-Gen-Format von Google für schnellere Websites." },
                { q: "Ist die Konvertierung schnell?", a: "Ja, unsere Browser-Technologie konvertiert Dutzende von Dateien pro Sekunde." },
                { q: "Warum WebP zu JPG konvertieren?", a: "Photoshop und ältere Browser unterstützen WebP nicht." },
                { q: "Gibt es Qualitätsverlust?", a: "Minimaler Qualitätsverlust mit unserer Konvertierung." },
                { q: "Werden WebP-Animationen unterstützt?", a: "Sie können animierte WebP-Dateien in statisches JPG konvertieren." }
            ]
        },
        'remove-background': {
            title: "KI Hintergrundentferner",
            intro: "Entfernen Sie Bildhintergründe mit einem Klick in Sekunden. Perfekt für Produkte, Porträts und Logos.",
            whyTitle: "KI Hintergrundbereinigung",
            features: [
                { title: "Auto-Erkennung", desc: "KI versteht das Motiv und macht präzise Schnitte." },
                { title: "Transparentes PNG", desc: "Laden Sie Ergebnisse als transparente PNGs herunter." }
            ],
            faq: [
                { q: "Ist das kostenlos?", a: "Grundlegende Nutzung ist kostenlos. Upgrade für High-Res und unbegrenzte Stapelverarbeitung." },
                { q: "Welche Fotos funktionieren am besten?", a: "Fotos mit klaren Motiven (Menschen, Autos, Produkte)." },
                { q: "Erkennt es Haare und Fell?", a: "Ja, unsere KI erkennt Haarsträhnen und Fell mit Pixelgenauigkeit." },
                { q: "Was ist das Ausgabeformat?", a: "Heruntergeladen als transparentes PNG." },
                { q: "Kann ich Stapel-Hintergrundentfernung durchführen?", a: "Ja, laden Sie mehrere Fotos hoch und entfernen Sie alle Hintergründe gleichzeitig." }
            ]
        },
        'compress-image': {
            title: "Bildkomprimierer & Größenänderer",
            intro: "Reduzieren Sie JPG, PNG und WebP Dateigrößen um bis zu 90% ohne Qualitätsverlust.",
            whyTitle: "Intelligente Komprimierung",
            features: [
                { title: "Verlustbehaftet & Verlustfrei", desc: "Wählen Sie zwischen maximaler Qualität oder maximaler Komprimierung." },
                { title: "Stapelverarbeitung", desc: "Komprimieren Sie Ordner voller Bilder auf einmal." }
            ],
            faq: [
                { q: "Sinkt die Qualität?", a: "Wir optimieren sichtbar verlustfrei. Keine Pixelierung." },
                { q: "Unterstützte Formate?", a: "JPG, PNG, WebP und HEIC unterstützt." },
                { q: "Wie viel Komprimierung ist möglich?", a: "Je nach Dateityp ist eine 50-90%ige Größenreduzierung erreichbar." },
                { q: "Wie wichtig ist das für Website-Geschwindigkeit?", a: "Bilder machen über 60% der Seitenladezeit aus." },
                { q: "Ändert sich meine Originaldatei?", a: "Nein, Ihre Originaldatei bleibt erhalten." }
            ]
        }
    },
    fr: {
        'home': {
            title: "Tous les outils d'image en un seul endroit - VormPixyze",
            intro: "VormPixyze est une boîte à outils sécurisée et gratuite pour tous vos besoins de conversion et d'édition d'images.",
            whyTitle: "Pourquoi VormPixyze?",
            features: [
                { title: "🔒 Priorité Vie Privée", desc: "Vos fichiers sont en sécurité. Le traitement se fait sur votre appareil ou de manière sécurisée dans le cloud." },
                { title: "⚡ Ultra rapide", desc: "Traitez des milliers d'images en quelques secondes." },
                { title: "📱 Multi-plateforme", desc: "Fonctionne sur Windows, Mac, iPhone ou Android." },
                { title: "🤖 Propulsé par l'IA", desc: "Derniers modèles IA pour la suppression d'arrière-plan." }
            ],
            faq: [
                { q: "VormPixyze est-il gratuit?", a: "Oui, tous les outils de base sont gratuits." },
                { q: "Mes fichiers sont-ils en sécurité?", a: "Oui, les fichiers ne sont jamais stockés de manière permanente et sont supprimés immédiatement." },
                { q: "Quels formats sont pris en charge?", a: "HEIC, HEIF, JPG, PNG, WebP, AVIF sont pris en charge." },
                { q: "Fonctionne-t-il sur mobile?", a: "Oui, fonctionne parfaitement sur tous les navigateurs modernes." },
                { q: "Puis-je convertir par lot?", a: "Oui, téléchargez plus de 100 fichiers à la fois." }
            ]
        },
        'heic-to-jpg': {
            title: "Guide de conversion HEIC vers JPG",
            intro: "VormPixyze vous permet de convertir le format photo moderne HEIC d'Apple en JPG, PNG ou WEBP en quelques secondes.",
            whyTitle: "Guide de conversion HEIC",
            features: [
                { title: "Pourquoi convertir HEIC en JPG?", desc: "HEIC offre une haute compression mais manque de compatibilité." },
                { title: "Conversion par lot", desc: "Téléchargez et convertissez des centaines de photos iPhone à la fois." },
                { title: "Pas de perte de qualité", desc: "Les algorithmes professionnels préservent la qualité originale." },
                { title: "Support HEIF", desc: "HEIC et HEIF sont tous deux pris en charge." }
            ],
            faq: [
                { q: "Comment ouvrir HEIC sur Windows?", a: "Pas besoin d'acheter d'extensions, convertissez en JPG avec VormPixyze." },
                { q: "La qualité souffre-t-elle?", a: "Non, nous préservons la qualité visuelle avec les meilleurs algorithmes." },
                { q: "Qu'est-ce que HEIC?", a: "HEIC est le format d'image moderne d'Apple depuis iOS 11 avec 50% de taille de fichier en moins." },
                { q: "Comment transférer les photos iPhone?", a: "Connectez votre iPhone via AirDrop, iCloud ou câble." },
                { q: "Puis-je convertir HEIC par lot?", a: "Oui, téléchargez plus de 100 fichiers HEIC à la fois." }
            ]
        },
        'png-to-jpg': {
            title: "Convertir PNG en JPG - Transparence & Taille",
            intro: "Convertissez de gros fichiers PNG en format JPG optimisé pour le web.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Taille de fichier plus petite", desc: "Les PNG peuvent être énormes. JPG offre jusqu'à 80% de meilleure compression." },
                { title: "Compatibilité web", desc: "JPG est le format le plus rapide pour les photos sur les sites web." }
            ],
            faq: [
                { q: "Qu'advient-il de la transparence?", a: "JPG ne supporte pas la transparence. Les arrière-plans deviennent blancs automatiquement." },
                { q: "Quand utiliser PNG?", a: "Utilisez PNG pour les logos avec transparence, JPG pour les photos." },
                { q: "Différence entre PNG et JPG?", a: "PNG offre une compression sans perte et la transparence, JPG des fichiers plus petits." },
                { q: "Lequel est meilleur pour les sites web?", a: "JPG pour les photos, PNG pour les logos et icônes." },
                { q: "Puis-je choisir la couleur d'arrière-plan?", a: "Oui, choisissez blanc, noir ou une couleur personnalisée." }
            ]
        },
        'webp-to-jpg': {
            title: "Convertir fichiers WebP en JPG & PNG",
            intro: "Convertissez le format WebP de Google en JPG ou PNG universellement compatible.",
            whyTitle: "À propos de la conversion WebP",
            features: [
                { title: "Compatibilité universelle", desc: "WebP ne s'ouvre pas partout. JPG et PNG oui." },
                { title: "Conversion inverse", desc: "Nous maintenons la qualité maximale lors de la conversion de WebP." }
            ],
            faq: [
                { q: "Qu'est-ce que WebP?", a: "WebP est un format de nouvelle génération de Google pour des sites web plus rapides." },
                { q: "La conversion est-elle rapide?", a: "Oui, notre technologie navigateur convertit des dizaines de fichiers par seconde." },
                { q: "Pourquoi convertir WebP en JPG?", a: "Photoshop et les anciens navigateurs ne supportent pas WebP." },
                { q: "Y aura-t-il une perte de qualité?", a: "Perte de qualité minimale avec notre conversion." },
                { q: "Les animations WebP sont-elles supportées?", a: "Vous pouvez convertir des fichiers WebP animés en JPG statique." }
            ]
        },
        'remove-background': {
            title: "Suppresseur d'arrière-plan IA",
            intro: "Supprimez les arrière-plans d'images en un clic en quelques secondes. Parfait pour les produits, portraits et logos.",
            whyTitle: "Nettoyage d'arrière-plan IA",
            features: [
                { title: "Détection auto", desc: "L'IA comprend le sujet et fait des coupes précises." },
                { title: "PNG transparent", desc: "Téléchargez les résultats en PNG transparents pour vos designs." }
            ],
            faq: [
                { q: "C'est gratuit?", a: "L'utilisation de base est gratuite. Passez à Premium pour haute résolution et lots illimités." },
                { q: "Quelles photos fonctionnent le mieux?", a: "Photos avec des sujets clairs (personnes, voitures, produits)." },
                { q: "Détecte-t-il les cheveux et la fourrure?", a: "Oui, notre IA détecte les mèches de cheveux et la fourrure avec précision au pixel." },
                { q: "Quel est le format de sortie?", a: "Téléchargé en PNG transparent." },
                { q: "Puis-je supprimer les arrière-plans par lot?", a: "Oui, téléchargez plusieurs photos et supprimez tous les arrière-plans simultanément." }
            ]
        },
        'compress-image': {
            title: "Compresseur & Redimensionneur d'images",
            intro: "Réduisez les tailles de fichiers JPG, PNG et WebP jusqu'à 90% sans perte de qualité.",
            whyTitle: "Compression intelligente",
            features: [
                { title: "Avec et sans perte", desc: "Choisissez entre qualité maximale ou compression maximale." },
                { title: "Traitement par lot", desc: "Compressez des dossiers entiers d'images à la fois." }
            ],
            faq: [
                { q: "La qualité baisse-t-elle?", a: "Nous optimisons sans perte visible. Pas de pixelisation." },
                { q: "Formats supportés?", a: "JPG, PNG, WebP et HEIC supportés." },
                { q: "Quelle compression est possible?", a: "Selon le type de fichier, une réduction de 50-90% est réalisable." },
                { q: "Importance pour la vitesse du site?", a: "Les images représentent plus de 60% du temps de chargement de page." },
                { q: "Mon fichier original change-t-il?", a: "Non, votre fichier original est préservé." }
            ]
        }
    }
};

type LangKey = keyof typeof seoData;

export const SeoContent = ({ pageType = 'heic-to-jpg' }: SeoContentProps) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;

    const content = seoData[activeLang]?.[pageType] || seoData['en'][pageType];

    return (
        <section className="bg-slate-900 border-t border-slate-800 py-16 px-4 md:px-8 mt-20">
            <div className="max-w-4xl mx-auto space-y-12 text-slate-300">

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">{content.title}</h2>
                    <p className="leading-relaxed text-lg">
                        {content.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.features.map((feature, idx) => (
                        <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">
                        {activeLang === 'tr' ? 'Sıkça Sorulan Sorular (SSS)' : activeLang === 'de' ? 'Häufig gestellte Fragen (FAQ)' : activeLang === 'fr' ? 'Questions Fréquemment Posées (FAQ)' : 'Frequently Asked Questions'}
                    </h3>

                    <div className="space-y-4">
                        {content.faq.map((item, idx) => (
                            <div key={idx} className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
                                <h4 className="font-semibold text-indigo-400 mb-2">{item.q}</h4>
                                <p className="text-slate-400">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
