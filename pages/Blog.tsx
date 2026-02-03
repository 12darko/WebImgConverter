import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const blogContent = {
    tr: {
        title: 'Blog & Rehberler | VormPixyze',
        description: 'HEIC, WebP, PNG dönüştürme rehberleri, görsel optimizasyonu ipuçları ve daha fazlası.',
        heading: 'Blog & Rehberler',
        subtitle: 'Görsel dönüştürme ve optimizasyon hakkında bilmeniz gereken her şey.',
        articles: [
            {
                slug: 'heic-nedir',
                title: 'HEIC Nedir? iPhone Fotoğraf Formatı Rehberi',
                excerpt: 'Apple\'ın HEIC formatı nedir, neden kullanılır ve Windows\'ta nasıl açılır? iPhone fotoğraflarınızı nasıl yöneteceğinizi öğrenin.',
                readTime: '5 dk',
                category: 'Rehber',
                date: '2025-01-15',
                content: `
                    <h2>HEIC Nedir?</h2>
                    <p>HEIC (High Efficiency Image Container), Apple'ın iOS 11'den itibaren iPhone ve iPad'lerde varsayılan fotoğraf formatı olarak kullandığı modern bir görsel formatıdır. HEIC, HEIF (High Efficiency Image Format) standardının Apple tarafından kullanılan uzantısıdır.</p>
                    
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
                    <p>VormPixyze ile HEIC dosyalarınızı ücretsiz ve güvenli bir şekilde JPG'ye çevirebilirsiniz:</p>
                    <ol>
                        <li>VormPixyze.com adresine gidin</li>
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
                    <p>Bu ayar daha fazla depolama alanı kullanır ancak uyumluluk sorunlarını önler.</p>
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
                    <p>WebP, Google tarafından 2010 yılında geliştirilen modern bir görsel formatıdır. Hem kayıplı hem kayıpsız sıkıştırma, şeffaflık ve hatta animasyon desteği sunar.</p>
                    
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
                    <p>Web siteniz için WebP kullanın, ama JPG fallback ekleyin. Sosyal medya ve e-posta için JPG tercih edin. VormPixyze ile her iki format arasında kolayca dönüşüm yapabilirsiniz.</p>
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
                    <p>Görseller, web sayfalarının ortalama ağırlığının %50-60'ını oluşturur. Büyük görseller:</p>
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
                    <p>Google'ın Core Web Vitals metrikleri için görsel optimizasyonu kritiktir:</p>
                    <ul>
                        <li><strong>LCP (Largest Contentful Paint):</strong> Hero görseller optimize edilmeli</li>
                        <li><strong>CLS (Cumulative Layout Shift):</strong> Görsel boyutları belirtilmeli</li>
                    </ul>
                    
                    <h2>VormPixyze ile Sıkıştırma</h2>
                    <p>VormPixyze'in görsel sıkıştırma aracı ile tüm bu optimizasyonları tek tıkla yapabilirsiniz. Dosyalarınız sunucuya yüklenmez, gizliliğiniz korunur.</p>
                `
            },
            {
                slug: 'arka-plan-silme-ipuclari',
                title: 'AI Arka Plan Silme: Profesyonel Sonuçlar İçin İpuçları',
                excerpt: 'Yapay zeka ile arka plan silme nasıl çalışır? En iyi sonuçları almak için ipuçları ve kullanım senaryoları.',
                readTime: '5 dk',
                category: 'AI Araçları',
                date: '2025-01-01',
                content: `
                    <h2>AI Arka Plan Silme Nasıl Çalışır?</h2>
                    <p>Modern yapay zeka modelleri, görüntülerdeki objeleri segmente ederek ön planı arka plandan ayırır. VormPixyze, on-device AI modelleri kullanarak bu işlemi doğrudan tarayıcınızda gerçekleştirir.</p>
                    
                    <h2>En İyi Sonuçlar İçin</h2>
                    <ul>
                        <li><strong>Net Özne:</strong> Ön plandaki kişi veya nesne net ve odaklanmış olmalı</li>
                        <li><strong>Kontrast:</strong> Özne ile arka plan arasında renk kontrastı olması yardımcı olur</li>
                        <li><strong>Aydınlatma:</strong> Düzgün aydınlatma daha iyi kenar algılama sağlar</li>
                        <li><strong>Çözünürlük:</strong> Yüksek çözünürlüklü görseller daha detaylı kesim verir</li>
                    </ul>
                    
                    <h2>Kullanım Senaryoları</h2>
                    <h3>E-Ticaret</h3>
                    <p>Ürün fotoğraflarını beyaz veya şeffaf arka plana geçirmek. Amazon, Trendyol gibi platformlar genellikle beyaz arka plan ister.</p>
                    
                    <h3>Sosyal Medya</h3>
                    <p>Profil fotoğrafları, Instagram paylaşımları ve YouTube thumbnail'ları için temiz arka planlar.</p>
                    
                    <h3>Portre Fotoğrafçılığı</h3>
                    <p>Stüdyo çekimi olmadan profesyonel arka planlar oluşturma.</p>
                    
                    <h2>Saç ve Karmaşık Kenarlar</h2>
                    <p>VormPixyze'in AI modeli, saç telleri ve kürk gibi karmaşık kenarları piksel hassasiyetinde tanır. Ancak en iyi sonuç için öznenin saçları net görünmeli ve arka planla karışmamalıdır.</p>
                `
            }
        ],
        readMore: 'Devamını Oku',
        backToHome: '← Ana Sayfaya Dön'
    },
    en: {
        title: 'Blog & Guides | VormPixyze',
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
                    <p>With VormPixyze, you can convert your HEIC files to JPG for free and securely:</p>
                    <ol>
                        <li>Go to VormPixyze.com</li>
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
                    <p>Modern AI models segment objects in images to separate the foreground from the background. VormPixyze uses on-device AI models to perform this process directly in your browser.</p>
                    
                    <h2>For Best Results</h2>
                    <ul>
                        <li><strong>Clear Subject:</strong> The person or object in the foreground should be clear and focused</li>
                        <li><strong>Contrast:</strong> Color contrast between subject and background helps</li>
                        <li><strong>Lighting:</strong> Even lighting provides better edge detection</li>
                        <li><strong>Resolution:</strong> High-resolution images give more detailed cuts</li>
                    </ul>
                `
            }
        ],
        readMore: 'Read More',
        backToHome: '← Back to Home'
    },
    de: {
        title: 'Blog & Anleitungen | VormPixyze',
        description: 'HEIC, WebP, PNG Konvertierungsanleitungen, Bildoptimierungstipps und mehr.',
        heading: 'Blog & Anleitungen',
        subtitle: 'Alles was Sie über Bildkonvertierung und -optimierung wissen müssen.',
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
                excerpt: 'Ist WebP oder JPG besser für Web-Bilder? Leistungs-, Qualitäts- und Kompatibilitätsvergleich.',
                readTime: '7 Min',
                category: 'Vergleich',
                date: '2025-01-10',
                content: '<h2>Was ist WebP?</h2><p>WebP ist ein modernes Bildformat, das 2010 von Google entwickelt wurde.</p>'
            }
        ],
        readMore: 'Weiterlesen',
        backToHome: '← Zurück zur Startseite'
    },
    fr: {
        title: 'Blog & Guides | VormPixyze',
        description: 'Guides de conversion HEIC, WebP, PNG, conseils d\'optimisation d\'images et plus.',
        heading: 'Blog & Guides',
        subtitle: 'Tout ce que vous devez savoir sur la conversion et l\'optimisation d\'images.',
        articles: [
            {
                slug: 'quest-ce-que-heic',
                title: 'Qu\'est-ce que HEIC? Guide complet du format photo iPhone',
                excerpt: 'Qu\'est-ce que le format HEIC d\'Apple, pourquoi est-il utilisé et comment l\'ouvrir sur Windows?',
                readTime: '5 min',
                category: 'Guide',
                date: '2025-01-15',
                content: '<h2>Qu\'est-ce que HEIC?</h2><p>HEIC (High Efficiency Image Container) est un format d\'image moderne qu\'Apple utilise comme format photo par défaut sur iPhone et iPad depuis iOS 11.</p>'
            },
            {
                slug: 'webp-vs-jpg',
                title: 'WebP vs JPG: Quel format utiliser?',
                excerpt: 'WebP ou JPG est-il meilleur pour les images web? Comparaison de performance, qualité et compatibilité.',
                readTime: '7 min',
                category: 'Comparaison',
                date: '2025-01-10',
                content: '<h2>Qu\'est-ce que WebP?</h2><p>WebP est un format d\'image moderne développé par Google en 2010.</p>'
            }
        ],
        readMore: 'Lire la suite',
        backToHome: '← Retour à l\'accueil'
    }
};

type LangKey = keyof typeof blogContent;

export default function BlogPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = blogContent[activeLang] || blogContent.en;

    const categoryColors: Record<string, string> = {
        'Rehber': 'bg-blue-500/20 text-blue-400',
        'Guide': 'bg-blue-500/20 text-blue-400',
        'Anleitung': 'bg-blue-500/20 text-blue-400',
        'Karşılaştırma': 'bg-purple-500/20 text-purple-400',
        'Comparison': 'bg-purple-500/20 text-purple-400',
        'Vergleich': 'bg-purple-500/20 text-purple-400',
        'Comparaison': 'bg-purple-500/20 text-purple-400',
        'SEO': 'bg-emerald-500/20 text-emerald-400',
        'AI Araçları': 'bg-pink-500/20 text-pink-400',
        'AI Tools': 'bg-pink-500/20 text-pink-400',
    };

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/blog" />
            </Helmet>

            <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-200 font-sans">
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-white">
                            ← Vorm<span className="text-indigo-400">Pixyze</span>
                        </Link>
                    </div>
                </nav>

                <main className="max-w-5xl mx-auto px-4 py-12 flex-1">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">{t.heading}</h1>
                        <p className="text-slate-400 text-lg">{t.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {t.articles.map((article, idx) => (
                            <article key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all group">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-slate-700 text-slate-300'}`}>
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-slate-500">{article.readTime}</span>
                                        <span className="text-xs text-slate-600">•</span>
                                        <span className="text-xs text-slate-500">{article.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                        {article.excerpt}
                                    </p>
                                    <Link
                                        to={`/blog/${article.slug}`}
                                        className="inline-flex items-center text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
                                    >
                                        {t.readMore} →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {activeLang === 'tr' ? 'Hemen Dönüştürmeye Başlayın' : activeLang === 'de' ? 'Jetzt mit der Konvertierung beginnen' : activeLang === 'fr' ? 'Commencez à convertir maintenant' : 'Start Converting Now'}
                        </h2>
                        <p className="text-slate-400 mb-6">
                            {activeLang === 'tr' ? 'Tüm araçlarımız ücretsiz ve gizlilik odaklıdır.' : activeLang === 'de' ? 'Alle unsere Tools sind kostenlos und datenschutzorientiert.' : activeLang === 'fr' ? 'Tous nos outils sont gratuits et axés sur la confidentialité.' : 'All our tools are free and privacy-focused.'}
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
                        >
                            {t.backToHome}
                        </Link>
                    </div>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
