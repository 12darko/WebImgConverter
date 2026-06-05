import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const blogContent = {
    tr: {
        title: 'Blog & Rehberler | WebImgConverter',
        description: 'HEIC, WebP, PNG dönüştürme rehberleri, görsel optimizasyonu ipuçları ve daha fazlası.',
        heading: 'Blog & Rehberler',
        subtitle: 'Görsel dönüştürme ve optimizasyon hakkında bilmeniz gereken her key.',
        articles: [
            {
                slug: 'heic-nedir',
                title: 'HEIC Nedir? iPhone Fotoğraf Formats Rehberi',
                excerpt: 'Apple\'ön HEIC formats nedir, neden kullanılır ve Windows\'ta nasıl açılır? iPhone fotoğraflarınızı nasıl yöneteceğinizi öğrenin.',
                readTime: '5 dk',
                category: 'Rehber',
                date: '2025-01-15',
                content: `
                    <h2>HEIC Nedir?</h2>
                    <p>HEIC (High Efficiency Image Container), Apple'ön iOS 11'den itibaren iPhone ve iPad'lerde varsayılan fotoğraf formats olarak kullandığı modern bir görsel formatıdır. HEIC, HEIF (High Efficiency Image Format) standardının Apple tarafından kullanılan uzantısıdır.</p>
                    
                    <h2>HEIC'in Avantajları</h2>
                    <ul>
                        <li><strong>Daha Küçük Dosya Boyutu:</strong> HEIC, JPG'ye kıyasla %50'ye varan daha küçük dosya boyutu sunar, aynı kalitede.</li>
                        <li><strong>Daha İyi Renk Derinliği:</strong> 16-bit renk derinliği ile daha zengin renkler.</li>
                        <li><strong>Live Photos Desteği:</strong> Hem fotoğraf hem de video tek dosyada saklanabilir.</li>
                        <li><strong>Çoklu Görsel:</strong> Burst modunda çekilen fotoğraflar tek HEIC dosyasında tutulabilir.</li>
                    </ul>
                    
                    <h2>HEIC'in Dezavantajları</h2>
                    <ul>
                        <li><strong>Uyumluluk:</strong> Windows, Android ve birçok uygulama HEIC'i doğrudan açamaz.</li>
                        <li><strong>Web Uyumu:</strong> Web siteleri genellikle HEIC dosyalarını kabul etmez.</li>
                        <li><strong>Eklenti Gereksinimi:</strong> Photoshop gibi editörler için eklenti gerekebilir.</li>
                    </ul>
                    
                    <h2>HEIC'i JPG'ye Nasıl Çeviririm?</h2>
                    <p>WebImgConverter ile HEIC dosyalarınızı Ücretsiz ve güvenli bir şekilde JPG'ye çevirebilirsiniz:</p>
                    <ol>
                        <li>WebImgConverter.com adresine gidin</li>
                        <li>HEIC to JPG aracını seçin</li>
                        <li>Dosyalarınızı sürükleyip bırakın</li>
                        <li>Otomatik olarak JPG'ye dönüştürülür</li>
                        <li>İndirin ve kullanın</li>
                    </ol>
                    
                    <h2>iPhone Ayarlarında HEIC Nasıl Kapatılır?</h2>
                    <p>İleriye dönük JPG formatında fotoğraf çekmek için:</p>
                    <ol>
                        <li>Ayarlar > Kamera > Formatlar</li>
                        <li>"En Uyumlu" seçeneğini seçin</li>
                    </ol>
                    <p>Bu ayar daha fazla depolama alanı kullanır ancak uyumluluk sorunlarına önler.</p>
                `
            },
            {
                slug: 'webp-vs-jpg',
                title: 'WebP vs JPG: Hangi Format Ne Zaman Kullanılmalı?',
                excerpt: 'Web görselleri için WebP mi JPG mi daha iyi? Performans, kalite ve uyumluluk karşılaştırması.',
                readTime: '7 dk',
                category: 'Karşılaştırma',
                date: '2025-01-10',
                content: `
                    <h2>WebP Nedir?</h2>
                    <p>WebP, Google tarafından 2010 yılında geliştirilen modern bir görsel formatıdır. Hem kayıplı hem kayıpsız sıkıştırma, Şeffaflık ve hatta animasyon desteği sunar.</p>
                    
                    <h2>Dosya Boyutu Karşılaştırması</h2>
                    <ul>
                        <li><strong>WebP:</strong> JPG'ye göre %25-35 daha küçük dosya boyutu (aynı kalitede)</li>
                        <li><strong>WebP:</strong> PNG'ye göre %26 daha küçük (kayıpsız modda)</li>
                        <li><strong>JPG:</strong> Daha büyük ama evrensel uyumluluk</li>
                    </ul>
                    
                    <h2>Ne Zaman WebP Kullanmalı?</h2>
                    <ul>
                        <li>Web sitesi performansı kritik olduğunda</li>
                        <li>Modern tarayıcıları hedeflediğinizde</li>
                        <li>Şeffaflık + küçük dosya boyutu gerektiğinde</li>
                        <li>CDN ve modern hosting kullanırken</li>
                    </ul>
                    
                    <h2>Ne Zaman JPG Kullanmalı?</h2>
                    <ul>
                        <li>Maksimum uyumluluk gerektiğinde</li>
                        <li>E-posta ekleri için</li>
                        <li>Eski sistemlerle çalışırken</li>
                        <li>Baskı için (print)</li>
                    </ul>
                    
                    <h2>Tarayıcı Desteği</h2>
                    <p>WebP artık tüm modern tarayıcılarda destekleniyor: Chrome, Firefox, Safari (macOS Big Sur+), Edge. Ancak Internet Explorer ve eski Safari sürümleri desteklemiyor.</p>
                    
                    <h2>Sonuç</h2>
                    <p>Web siteniz için WebP kullanın, ama JPG fallback ekleyin. Sosyal medya ve e-posta için JPG tercih edin. WebImgConverter ile her iki format arasında kolayca dönüşüm yapabilirsiniz.</p>
                `
            },
            {
                slug: 'gorsel-sikistirma-rehberi',
                title: 'Görsel Sıkıştırma: Kalite Kaybı Olmadan Boyut Küçültme',
                excerpt: 'Web sitenizi hızlandırmak için görsel sıkıştırma teknikleri. SEO ve Core Web Vitals için kritik ipuçları.',
                readTime: '6 dk',
                category: 'SEO',
                date: '2025-01-05',
                content: `
                    <h2>Neden Görsel Sıkıştırma Önemli?</h2>
                    <p>Görseller, web sayfalarının ortalama ağırlığının %50-60'Inc oluşturur. Büyük görseller:</p>
                    <ul>
                        <li>Sayfa yüklenme süresini artırır</li>
                        <li>Mobil kullanıcıları kaybettirir</li>
                        <li>Google sıralamalarını olumsuz etkiler</li>
                        <li>Hosting maliyetlerini yükseltir</li>
                    </ul>
                    
                    <h2>Kayıplı vs Kayıpsız Sıkıştırma</h2>
                    <h3>Kayıplı (Lossy)</h3>
                    <ul>
                        <li>Dosya boyutunu %50-90 azaltabilir</li>
                        <li>Bazı görsel veri kaybedilir</li>
                        <li>Web fotoğrafları için ideal</li>
                    </ul>
                    <h3>Kayıpsız (Lossless)</h3>
                    <ul>
                        <li>Orijinal kalite %100 korunur</li>
                        <li>Daha az sıkıştırma (%10-30)</li>
                        <li>Arşivleme ve baskı için ideal</li>
                    </ul>
                    
                    <h2>Optimal Sıkıştırma Ayarları</h2>
                    <table>
                        <tr><th>Kullanım</th><th>Kalite</th><th>Format</th></tr>
                        <tr><td>Web Fotoğrafları</td><td>%80-85</td><td>WebP veya JPG</td></tr>
                        <tr><td>Thumbnail</td><td>%70-75</td><td>WebP veya JPG</td></tr>
                        <tr><td>Logo/İkon</td><td>Kayıpsız</td><td>PNG veya SVG</td></tr>
                        <tr><td>E-ticaret Ürün</td><td>%85-90</td><td>WebP veya JPG</td></tr>
                    </table>
                    
                    <h2>Core Web Vitals ve Görseller</h2>
                    <p>Google'ön Core Web Vitals metrikleri için görsel optimizasyonu kritiktir:</p>
                    <ul>
                        <li><strong>LCP (Largest Contentful Paint):</strong> Hero görseller optimize edilmeli</li>
                        <li><strong>CLS (Cumulative Layout Shift):</strong> Görsel boyutları belirtilmeli</li>
                    </ul>
                    
                    <h2>WebImgConverter ile Sıkıştırma</h2>
                    <p>WebImgConverter'in görsel sıkıştırma aracı ile tüm bu optimizasyonları tek tıkla yapabilirsiniz. Dosyalarınız sunucuya yüklenmez, gizliliğiniz korunur.</p>
                `
            },
            {
                slug: 'arka-plan-silme-ipuclari',
                title: 'AI Arka Plan Silme: Profesyonel Sonuçlar için ipuçları',
                excerpt: 'Yapay zeka ile arka plan silme nasıl çalışır? En iyi sonuçları almak için ipuçları ve kullanım senaryoları.',
                readTime: '5 dk',
                category: 'AI Araçları',
                date: '2025-01-01',
                content: `
                    <h2>AI Arka Plan Silme Nasıl çalışır?</h2>
                    <p>Modern yapay zeka modelleri, görüntülerdeki objeleri segmente ederek ön planı arka plandan ayırır. WebImgConverter, güçlü AI modelleri kullanarak bu işlemi bulut sunucularında saniyeler içinde gerçekleştirir.</p>
                    
                    <h2>En İyi Sonuçlar için</h2>
                    <ul>
                        <li><strong>Net Özne:</strong> ön plandaki kişi veya nesne net ve odaklanmış olmalı</li>
                        <li><strong>Kontrast:</strong> Özne ile arka plan arasında renk kontrastı olması yardımcı olur</li>
                        <li><strong>Aydınlatma:</strong> Düzgün aydınlatma daha iyi kenar algılama sağlar</li>
                        <li><strong>Çözünürlük:</strong> Yüksek çözünürlüklü görseller daha detaylı kesim verir</li>
                    </ul>
                    
                    <h2>Kullanım Senaryoları</h2>
                    <h3>E-Ticaret</h3>
                    <p>Ürün fotoğraflarını beyaz veya şeffaf arka plana getirmek. Amazon, Trendyol gibi platformlar genellikle beyaz arka plan ister.</p>
                    
                    <h3>Sosyal Medya</h3>
                    <p>Profil fotoğrafları, Instagram paylaşımları ve YouTube thumbnail'ları için temiz arka planlar.</p>
                    
                    <h3>Portre Fotoğrafçılığı</h3>
                    <p>Stüdyo çekimi olmadan profesyonel arka planlar oluşturma.</p>
                    
                    <h2>Saç ve Karmaşık Kenarlar</h2>
                    <p>WebImgConverter'in AI modeli, saç telleri ve kürk gibi karmaşık kenarları piksel hassasiyetinde tanır. Ancak en iyi sonuç için öznenin saçları net görünmeli ve arka planla karışmamalıdır.</p>
                `
            },
            {
                slug: 'svg-vs-png',
                title: 'SVG vs PNG: Vektör mx Piksel mi? doğru Format Seçimi',
                excerpt: 'Logo ve ikon tasarımlarınız için SVG mi PNG mi Kullanmalısınız? Her iki formatın güçlü ve zayıf yönlerini karşılaştırıyoruz.',
                readTime: '6 dk',
                category: 'Karşılaştırma',
                date: '2025-02-10',
                content: ''
            },
            {
                slug: 'e-ticaret-gorsel-rehberi',
                title: 'E-Ticaret için Görsel Hazırlama: Satışı Artıran Fotoğraf Teknikleri',
                excerpt: 'Amazon, Trendyol ve Hepsiburada için Ürün fotoğraflarınızı profesyonelce optimize edin. Beyaz arka plan, boyut standartları ve sıkıştırma ipuçları.',
                readTime: '8 dk',
                category: 'Rehber',
                date: '2025-02-05',
                content: ''
            },
            {
                slug: '2025-gorsel-format-rehberi',
                title: '2025 Görsel Format Rehberi: AVIF, WebP, HEIC ve JPG Karşılaştırması',
                excerpt: 'Yeni nesil görsel formatları arasında hangisi sizin için en doğru seçim? Kapsamlı teknik Karşılaştırma ve kullanım senaryoları.',
                readTime: '10 dk',
                category: 'Rehber',
                date: '2025-03-01',
                content: ''
            },
            {
                slug: 'toplu-gorsel-isleme',
                title: 'Toplu Görsel işleme: 100+ dosyayı Saniyede Dönüştürmenin Yolları',
                excerpt: 'Yüzlerce fotoğrafı tek seferde dönüştürün, yeniden boyutlandırın ve sıkıştırın. Profesyonel is Aktif için zamandan tasarruf ipuçları.',
                readTime: '5 dk',
                category: 'ipuçları',
                date: '2025-03-15',
                content: ''
            }
        ],
        readMore: 'Devamını Oku',
        backToHome: 'h Ana Sayfaya Dön'
    },
    en: {
        title: 'Blog & Guides | WebImgConverter',
        description: 'HEIC, WebP, PNG conversion guides, image optimization tips and more.',
        heading: 'Blog & Guides',
        subtitle: 'Everything you need to know about image conversion and optimization.',
        articles: [
            {
                slug: 'what-is-heic',
                title: 'What is HEIC? Complete iPhone Photo Format Guide',
                excerpt: 'What is Apple\'s HEIC format, why is it used, and how to open it on Windows? Learn how to manage your iPhone photos.',
                readTime: '5 min',
                category: 'Guide',
                date: '2025-01-15',
                content: `
                    <h2>What is HEIC?</h2>
                    <p>HEIC (High Efficiency Image Container) is a modern image format that Apple has used as the default photo format on iPhone and iPad since iOS 11. HEIC is Apple's extension of the HEIF (High Efficiency Image Format) standard.</p>
                    
                    <h2>Advantages of HEIC</h2>
                    <ul>
                        <li><strong>Smaller File Size:</strong> HEIC offers up to 50% smaller file size compared to JPG at the same quality.</li>
                        <li><strong>Better Color Depth:</strong> 16-bit color depth for richer colors.</li>
                        <li><strong>Live Photos Support:</strong> Both photo and video can be stored in a single file.</li>
                        <li><strong>Multiple Images:</strong> Burst mode photos can be kept in a single HEIC file.</li>
                    </ul>
                    
                    <h2>Disadvantages of HEIC</h2>
                    <ul>
                        <li><strong>Compatibility:</strong> Windows, Android, and many applications cannot open HEIC directly.</li>
                        <li><strong>Web Compatibility:</strong> Websites generally do not accept HEIC files.</li>
                        <li><strong>Plugin Required:</strong> Editors like Photoshop may require plugins.</li>
                    </ul>
                    
                    <h2>How to Convert HEIC to JPG?</h2>
                    <p>With WebImgConverter, you can convert your HEIC files to JPG for free and securely:</p>
                    <ol>
                        <li>Go to WebImgConverter.com</li>
                        <li>Select the HEIC to JPG tool</li>
                        <li>Drag and drop your files</li>
                        <li>Automatically converted to JPG</li>
                        <li>Download and use</li>
                    </ol>
                `
            },
            {
                slug: 'webp-vs-jpg',
                title: 'WebP vs JPG: Which Format Should You Use?',
                excerpt: 'Is WebP or JPG better for web images? Performance, quality, and compatibility comparison.',
                readTime: '7 min',
                category: 'Comparison',
                date: '2025-01-10',
                content: `
                    <h2>What is WebP?</h2>
                    <p>WebP is a modern image format developed by Google in 2010. It offers both lossy and lossless compression, transparency, and even animation support.</p>
                    
                    <h2>File Size Comparison</h2>
                    <ul>
                        <li><strong>WebP:</strong> 25-35% smaller than JPG (at same quality)</li>
                        <li><strong>WebP:</strong> 26% smaller than PNG (lossless mode)</li>
                        <li><strong>JPG:</strong> Larger but universal compatibility</li>
                    </ul>
                    
                    <h2>When to Use WebP?</h2>
                    <ul>
                        <li>When website performance is critical</li>
                        <li>When targeting modern browsers</li>
                        <li>When transparency + small file size is needed</li>
                        <li>When using CDN and modern hosting</li>
                    </ul>
                    
                    <h2>When to Use JPG?</h2>
                    <ul>
                        <li>When maximum compatibility is needed</li>
                        <li>For email attachments</li>
                        <li>When working with legacy systems</li>
                        <li>For print</li>
                    </ul>
                `
            },
            {
                slug: 'image-compression-guide',
                title: 'Image Compression: Reduce Size Without Quality Loss',
                excerpt: 'Image compression techniques to speed up your website. Critical tips for SEO and Core Web Vitals.',
                readTime: '6 min',
                category: 'SEO',
                date: '2025-01-05',
                content: `
                    <h2>Why is Image Compression Important?</h2>
                    <p>Images make up 50-60% of the average web page weight. Large images:</p>
                    <ul>
                        <li>Increase page load time</li>
                        <li>Cause mobile users to leave</li>
                        <li>Negatively impact Google rankings</li>
                        <li>Increase hosting costs</li>
                    </ul>
                    
                    <h2>Lossy vs Lossless Compression</h2>
                    <h3>Lossy</h3>
                    <ul>
                        <li>Can reduce file size by 50-90%</li>
                        <li>Some visual data is lost</li>
                        <li>Ideal for web photos</li>
                    </ul>
                    <h3>Lossless</h3>
                    <ul>
                        <li>Original quality 100% preserved</li>
                        <li>Less compression (10-30%)</li>
                        <li>Ideal for archiving and print</li>
                    </ul>
                `
            },
            {
                slug: 'background-removal-tips',
                title: 'AI Background Removal: Tips for Professional Results',
                excerpt: 'How does AI background removal work? Tips and use cases for getting the best results.',
                readTime: '5 min',
                category: 'AI Tools',
                date: '2025-01-01',
                content: `
                    <h2>How Does AI Background Removal Work?</h2>
                    <p>Modern AI models segment objects in images to separate the foreground from the background. WebImgConverter uses powerful AI models to perform this process in seconds on cloud servers.</p>
                    
                    <h2>For Best Results</h2>
                    <ul>
                        <li><strong>Clear Subject:</strong> The person or object in the foreground should be clear and focused</li>
                        <li><strong>Contrast:</strong> Color contrast between subject and background helps</li>
                        <li><strong>Lighting:</strong> Even lighting provides better edge detection</li>
                        <li><strong>Resolution:</strong> High-resolution images give more detailed cuts</li>
                    </ul>
                `
            },
            {
                slug: 'svg-vs-png',
                title: 'SVG vs PNG: Vector or Pixel? Choosing the Right Format',
                excerpt: 'Should you use SVG or PNG for your logos and icons? We compare the strengths and weaknesses of both formats.',
                readTime: '6 min',
                category: 'Comparison',
                date: '2025-02-10',
                content: ''
            },
            {
                slug: 'ecommerce-image-guide',
                title: 'E-Commerce Image Preparation: Photo Techniques That Boost Sales',
                excerpt: 'Professionally optimize your product photos for Amazon, Shopify, and Etsy. White background, size standards, and compression tips.',
                readTime: '8 min',
                category: 'Guide',
                date: '2025-02-05',
                content: ''
            },
            {
                slug: '2025-image-format-guide',
                title: '2025 Image Format Guide: AVIF, WebP, HEIC & JPG Compared',
                excerpt: 'Which next-gen image format is right for you? Comprehensive technical comparison and real-world use cases.',
                readTime: '10 min',
                category: 'Guide',
                date: '2025-03-01',
                content: ''
            },
            {
                slug: 'batch-image-processing',
                title: 'Batch Image Processing: Convert 100+ Files in Seconds',
                excerpt: 'Convert, resize, and compress hundreds of photos at once. Time-saving tips for professional workflows.',
                readTime: '5 min',
                category: 'Tips',
                date: '2025-03-15',
                content: ''
            }
        ],
        readMore: 'Read More',
        backToHome: 'h Back to Home'
    },
    de: {
        title: 'Blog & Anleitungen | WebImgConverter',
        description: 'HEIC, WebP, PNG Konvertierungsanleitungen, Bildoptimierungstipps und mehr.',
        heading: 'Blog & Anleitungen',
        subtitle: 'Alles was Sie Über Bildkonvertierung und -optimierung wissen müssen.',
        articles: [
            {
                slug: 'was-ist-heic',
                title: 'Was ist HEIC? Vollständiger iPhone Fotoformat-Leitfaden',
                excerpt: 'Was ist Apples HEIC-Format, warum wird es verwendet und wie öffnet man es unter Windows?',
                readTime: '5 Min',
                category: 'Anleitung',
                date: '2025-01-15',
                content: '<h2>Was ist HEIC?</h2><p>HEIC (High Efficiency Image Container) ist ein modernes Bildformat, das Apple seit iOS 11 als Standard-Fotoformat auf iPhone und iPad verwendet.</p>'
            },
            {
                slug: 'webp-vs-jpg',
                title: 'WebP vs JPG: Welches Format sollten Sie verwenden?',
                excerpt: 'Ist WebP oder JPG besser for Web-Bilder? Leistungs-, Qualitäts- und Kompatibilitätsvergleich.',
                readTime: '7 Min',
                category: 'Vergleich',
                date: '2025-01-10',
                content: '<h2>Was ist WebP?</h2><p>WebP ist ein modernes Bildformat, das 2010 von Google entwickelt wurde.</p>'
            },
            {
                slug: 'gorsel-sikistirma-rehberi',
                title: 'Bildkomprimierung: Große reduzieren ohne Qualitätsverlust',
                excerpt: 'Bildkomprimierungstechniken zur Beschleunigung Ihrer Website. Kritische Tipps for SEO und Core Web Vitals.',
                readTime: '6 Min',
                category: 'SEO',
                date: '2025-01-05',
                content: ''
            },
            {
                slug: 'arka-plan-silme-ipuclari',
                title: 'KI-Hintergrundentfernung: Tipps for professionelle Ergebnisse',
                excerpt: 'Wie funktioniert die KI-Hintergrundentfernung? Tipps und Anwendungsfälle for beste Ergebnisse.',
                readTime: '5 Min',
                category: 'KI-Tools',
                date: '2025-01-01',
                content: ''
            },
            {
                slug: 'svg-vs-png',
                title: 'SVG vs PNG: Vektor oder Pixel? Die richtige Formatwahl',
                excerpt: 'Sollten Sie SVG oder PNG for Ihre Logos und Icons verwenden? Wir vergleichen die Stärken und Schwächen beider Formate.',
                readTime: '6 Min',
                category: 'Vergleich',
                date: '2025-02-10',
                content: ''
            },
            {
                slug: 'e-commerce-bilder',
                title: 'E-Commerce Bildvorbereitung: Fototechniken die den Umsatz steigern',
                excerpt: 'Optimieren Sie Ihre Produktfotos professionell for Amazon und Shopify. Weißer Hintergrund, Größenstandards und Komprimierungstipps.',
                readTime: '8 Min',
                category: 'Anleitung',
                date: '2025-02-05',
                content: ''
            },
            {
                slug: '2025-bildformat-guide',
                title: '2025 Bildformat-Guide: AVIF, WebP, HEIC & JPG im Vergleich',
                excerpt: 'Welches Bildformat der neuen Generation ist das richtige for Sie? Umfassender technischer Vergleich.',
                readTime: '10 Min',
                category: 'Anleitung',
                date: '2025-03-01',
                content: ''
            },
            {
                slug: 'stapel-bildverarbeitung',
                title: 'Stapel-Bildverarbeitung: 100+ Dateien in Sekunden konvertieren',
                excerpt: 'Konvertieren, skalieren und komprimieren Sie Hunderte von Fotos gleichzeitig. Zeitsparende Tipps.',
                readTime: '5 Min',
                category: 'Tipps',
                date: '2025-03-15',
                content: ''
            }
        ],
        readMore: 'Weiterlesen',
        backToHome: 'h Zurück zur Startseite'
    },
    fr: {
        title: 'Blog & Guides | WebImgConverter',
        description: 'Guides de conversion HEIC, WebP, PNG, conseils d\'optimisation d\'images et plus.',
        heading: 'Blog & Guides',
        subtitle: 'Tout ce que vous devez savoir sur la conversion et l\'optimisation d\'images.',
        articles: [
            {
                slug: 'quest-ce-que-heic',
                title: 'Qu\'est-ce que HEIC? Guide complet du format photo iPhone',
                excerpt: 'Qu\'est-ce que le format HEIC d\'Apple, pourquoi est-il utilise et comment l\'ouvrir sur Windows?',
                readTime: '5 min',
                category: 'Guide',
                date: '2025-01-15',
                content: '<h2>Qu\'est-ce que HEIC?</h2><p>HEIC (High Efficiency Image Container) est un format d\'image moderne qu\'Apple utilise comme format photo par défaut sur iPhone et iPad depuis iOS 11.</p>'
            },
            {
                slug: 'webp-vs-jpg',
                title: 'WebP vs JPG: Quel format utiliser?',
                excerpt: 'WebP ou JPG est-il meilleur pour les images web? Comparaison de performance, quality et compatibility.',
                readTime: '7 min',
                category: 'Comparaison',
                date: '2025-01-10',
                content: '<h2>Qu\'est-ce que WebP?</h2><p>WebP est un format d\'image moderne développe par Google en 2010.</p>'
            },
            {
                slug: 'gorsel-sikistirma-rehberi',
                title: 'Compression d\'images : Réduire la taille sans perte de quality',
                excerpt: 'Techniques de compression d\'images pour accélérer votre site web. Conseils critiques pour le SEO et Core Web Vitals.',
                readTime: '6 min',
                category: 'SEO',
                date: '2025-01-05',
                content: ''
            },
            {
                slug: 'arka-plan-silme-ipuclari',
                title: 'Suppression d\'arrière-plan IA : Conseils pour des résultats professionnels',
                excerpt: 'Comment fonctionne la suppression d\'arrière-plan par IA ? Conseils et cas d\'utilisation pour de meilleurs résultats.',
                readTime: '5 min',
                category: 'Outils IA',
                date: '2025-01-01',
                content: ''
            },
            {
                slug: 'svg-vs-png',
                title: 'SVG vs PNG : Vecteur ou Pixel ? Choisir le bon format',
                excerpt: 'Devez-vous utiliser SVG ou PNG pour vos logos et icônes ? Nous comparons les forces et faiblesses des deux formats.',
                readTime: '6 min',
                category: 'Comparaison',
                date: '2025-02-10',
                content: ''
            },
            {
                slug: 'guide-images-ecommerce',
                title: 'Préparation d\'images e-commerce : Techniques photo qui boostent les ventes',
                excerpt: 'Optimisez professionnellement vos photos de produits pour Amazon et Shopify. Fond blanc, standards de taille et conseils.',
                readTime: '8 min',
                category: 'Guide',
                date: '2025-02-05',
                content: ''
            },
            {
                slug: 'guide-formats-2025',
                title: 'Guide des formats d\'image 2025 : AVIF, WebP, HEIC et JPG comparés',
                excerpt: 'Quel format d\'image nouvelle génération est fait pour vous ? Comparaison technique complete.',
                readTime: '10 min',
                category: 'Guide',
                date: '2025-03-01',
                content: ''
            },
            {
                slug: 'traitement-images-lot',
                title: 'Traitement d\'images par lot : Convertir 100+ fichiers en secondes',
                excerpt: 'Convertissez, redimensionnez et compressez des centaines de photos en une fois. Conseils pour gagner du temps.',
                readTime: '5 min',
                category: 'Astuces',
                date: '2025-03-15',
                content: ''
            }
        ],
        readMore: 'Lire la suite',
        backToHome: 'h Retour h l\'accueil'
    }
};

type LangKey = keyof typeof blogContent;

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function BlogPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = blogContent[activeLang] || blogContent.tr;
    const navigate = useNavigate();

    const categoryColors: Record<string, string> = {
        'Rehber': 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50',
        'Guide': 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50',
        'Anleitung': 'bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/50',
        'Karşılaştırma': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50',
        'Comparison': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50',
        'Vergleich': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50',
        'Comparaison': 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50',
        'SEO': 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50',
        'AI Araçları': 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50',
        'AI Tools': 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50',
        'KI-Tools': 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50',
        'Outils IA': 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50',
        'ipuçları': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50',
        'Tips': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50',
        'Tipps': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50',
        'Astuces': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50',
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const articlesPerPage = 6;
    const totalPages = Math.ceil(t.articles.length / articlesPerPage);
    const currentArticles = t.articles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    // Scroll to top when page changes
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel="Hemen Başla" bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/blog" />
            </Helmet>

            <section className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{t.heading}</h1>
                    <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    {currentArticles.map((article, idx) => (
                        <article key={idx} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 md:p-8 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-700 transition-all group cursor-pointer" onClick={() => navigate(`/blog/${article.slug}`)}>
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[article.category] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                                    {article.category}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{article.readTime}</span>
                                <span className="text-xs text-slate-300 dark:text-slate-700">h</span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{article.date}</span>
                            </div>
                            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                                {article.title}
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                                {article.excerpt}
                            </p>
                            <Link
                                to={`/blog/${article.slug}`}
                                className="inline-flex items-center text-brand-600 dark:text-brand-400 text-sm font-bold hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                            >
                                {t.readMore} <span className="ml-1 group-hover:translate-x-1 transition-transform">h</span>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mb-20">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous Page"
                        >
                            h
                        </button>
                        
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                                    currentPage === i + 1 
                                        ? 'bg-brand-600 text-white border-transparent' 
                                        : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next Page"
                        >
                            h
                        </button>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-slate-900 dark:bg-slate-950/70 border border-slate-800 rounded-3xl p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
                    <div className="relative">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
                            {activeLang === 'tr' ? 'Hemen Dönüştürmeye Başlayın' : activeLang === 'de' ? 'Jetzt mit der Konvertierung beginnen' : activeLang === 'fr' ? 'Commencez h convertir maintenant' : 'Start Converting Now'}
                        </h2>
                        <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                            {activeLang === 'tr' ? 'Tüm araçlarımız Ücretsiz ve gizlilik odaklıdır.' : activeLang === 'de' ? 'Alle unsere Tools sind kostenlos und datenschutzorientiert.' : activeLang === 'fr' ? 'Tous nos outils sont gratuits et axés sur la confidentialité.' : 'All our tools are free and privacy-focused.'}
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center h-12 md:h-14 px-8 text-base md:text-lg font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 transition-colors"
                        >
                            {t.backToHome}
                        </button>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
