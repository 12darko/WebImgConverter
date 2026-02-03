import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

// Blog article content database
const articleDatabase: Record<string, Record<string, {
    title: string;
    description: string;
    date: string;
    readTime: string;
    category: string;
    content: string;
}>> = {
    'heic-nedir': {
        tr: {
            title: 'HEIC Nedir? iPhone Fotoğraf Formatı Rehberi',
            description: 'Apple\'ın HEIC formatı nedir, neden kullanılır ve Windows\'ta nasıl açılır? iPhone fotoğraflarınızı nasıl yöneteceğinizi öğrenin.',
            date: '2025-01-15',
            readTime: '5 dk',
            category: 'Rehber',
            content: `
## HEIC Nedir?

HEIC (High Efficiency Image Container), Apple'ın iOS 11'den itibaren iPhone ve iPad'lerde varsayılan fotoğraf formatı olarak kullandığı modern bir görsel formatıdır. HEIC, HEIF (High Efficiency Image Format) standardının Apple tarafından kullanılan uzantısıdır.

## HEIC'in Avantajları

### Daha Küçük Dosya Boyutu
HEIC, JPG'ye kıyasla **%50'ye varan daha küçük dosya boyutu** sunar, aynı kalitede. Bu, iPhone'unuzda daha fazla fotoğraf saklayabileceğiniz anlamına gelir.

### Daha İyi Renk Derinliği
16-bit renk derinliği ile daha zengin, daha canlı renkler elde edersiniz. Özellikle günbatımı ve doğa fotoğraflarında fark belirgin.

### Live Photos Desteği
Hem fotoğraf hem de video tek bir HEIC dosyasında saklanabilir. Bu, Live Photos özelliğinin çalışmasını sağlar.

### Çoklu Görsel Desteği
Burst modunda çekilen fotoğraflar tek HEIC dosyasında tutulabilir, depolama alanından tasarruf sağlar.

## HEIC'in Dezavantajları

### Uyumluluk Sorunları
- **Windows:** Windows Fotoğraflar uygulaması HEIC'i varsayılan olarak açamaz
- **Android:** Android cihazlar HEIC formatını desteklemez
- **Photoshop:** Eklenti gerektirir
- **Web Siteleri:** Çoğu site HEIC dosyalarını kabul etmez

### E-posta ve Paylaşım
HEIC dosyalarını e-posta ile gönderdiğinizde, alıcı açamayabilir.

## HEIC'i JPG'ye Nasıl Çevirirsiniz?

VormPixyze ile HEIC dosyalarınızı ücretsiz ve güvenli bir şekilde JPG'ye çevirebilirsiniz:

1. **VormPixyze.com** adresine gidin
2. **HEIC to JPG** aracını seçin
3. HEIC dosyalarınızı **sürükleyip bırakın**
4. Otomatik olarak JPG'ye dönüştürülür
5. **İndirin** ve kullanın

Tüm işlem tarayıcınızda gerçekleşir, dosyalarınız sunucuya yüklenmez.

## iPhone'da HEIC Nasıl Kapatılır?

İleriye dönük JPG formatında fotoğraf çekmek için:

1. **Ayarlar** > **Kamera** > **Formatlar**
2. **"En Uyumlu"** seçeneğini seçin

Bu ayar daha fazla depolama alanı kullanır ancak uyumluluk sorunlarını önler.

## Sonuç

HEIC, Apple kullanıcıları için harika bir format - daha küçük dosyalar, daha iyi kalite. Ancak paylaşım ve uyumluluk için JPG'ye dönüştürmeniz gerekebilir. VormPixyze ile bu işlemi saniyeler içinde, ücretsiz ve güvenli bir şekilde yapabilirsiniz.
            `
        },
        en: {
            title: 'What is HEIC? Complete iPhone Photo Format Guide',
            description: 'What is Apple\'s HEIC format, why is it used, and how to open it on Windows? Learn how to manage your iPhone photos.',
            date: '2025-01-15',
            readTime: '5 min',
            category: 'Guide',
            content: `
## What is HEIC?

HEIC (High Efficiency Image Container) is a modern image format that Apple has used as the default photo format on iPhone and iPad since iOS 11. HEIC is Apple's extension of the HEIF (High Efficiency Image Format) standard.

## Advantages of HEIC

### Smaller File Size
HEIC offers **up to 50% smaller file size** compared to JPG at the same quality. This means you can store more photos on your iPhone.

### Better Color Depth
With 16-bit color depth, you get richer, more vibrant colors. The difference is especially noticeable in sunset and nature photos.

### Live Photos Support
Both photo and video can be stored in a single HEIC file. This enables the Live Photos feature to work.

### Multiple Image Support
Burst mode photos can be kept in a single HEIC file, saving storage space.

## Disadvantages of HEIC

### Compatibility Issues
- **Windows:** Windows Photos app cannot open HEIC by default
- **Android:** Android devices don't support HEIC format
- **Photoshop:** Requires a plugin
- **Websites:** Most sites don't accept HEIC uploads

## How to Convert HEIC to JPG?

With VormPixyze, you can convert your HEIC files to JPG for free and securely:

1. Go to **VormPixyze.com**
2. Select the **HEIC to JPG** tool
3. **Drag and drop** your HEIC files
4. Automatically converted to JPG
5. **Download** and use

All processing happens in your browser - your files are never uploaded to servers.

## Conclusion

HEIC is a great format for Apple users - smaller files, better quality. However, you may need to convert to JPG for sharing and compatibility. With VormPixyze, you can do this in seconds, for free and securely.
            `
        }
    },
    'what-is-heic': {
        en: {
            title: 'What is HEIC? Complete iPhone Photo Format Guide',
            description: 'What is Apple\'s HEIC format, why is it used, and how to open it on Windows? Learn how to manage your iPhone photos.',
            date: '2025-01-15',
            readTime: '5 min',
            category: 'Guide',
            content: `
## What is HEIC?

HEIC (High Efficiency Image Container) is a modern image format that Apple has used as the default photo format on iPhone and iPad since iOS 11.

## Key Benefits

- **50% smaller** file size compared to JPG
- **16-bit color** depth for richer colors
- **Live Photos** support
- **Burst mode** photos in single file

## The Problem

Despite its benefits, HEIC has compatibility issues:
- Windows cannot open HEIC natively
- Android doesn't support HEIC
- Most websites reject HEIC uploads
- Photoshop requires plugins

## Solution: Convert with VormPixyze

Convert HEIC to JPG instantly and securely with VormPixyze. 100% browser-based, your files never leave your device.
            `
        },
        tr: {
            title: 'HEIC Nedir? iPhone Fotoğraf Formatı Rehberi',
            description: 'Apple\'ın HEIC formatı nedir, neden kullanılır ve Windows\'ta nasıl açılır?',
            date: '2025-01-15',
            readTime: '5 dk',
            category: 'Rehber',
            content: `## HEIC Nedir?\n\nHEIC, Apple'ın iOS 11'den beri kullandığı modern fotoğraf formatıdır.`
        }
    },
    'webp-vs-jpg': {
        tr: {
            title: 'WebP vs JPG: Hangi Format Ne Zaman Kullanılmalı?',
            description: 'Web görselleri için WebP mi JPG mi daha iyi? Performans, kalite ve uyumluluk karşılaştırması.',
            date: '2025-01-10',
            readTime: '7 dk',
            category: 'Karşılaştırma',
            content: `
## WebP Nedir?

WebP, Google tarafından 2010 yılında geliştirilen modern bir görsel formatıdır. Hem kayıplı hem kayıpsız sıkıştırma, şeffaflık ve hatta animasyon desteği sunar.

## Dosya Boyutu Karşılaştırması

| Format | Boyut Farkı | Şeffaflık | Animasyon |
|--------|-------------|-----------|-----------|
| WebP | Referans | ✓ | ✓ |
| JPG | %25-35 daha büyük | ✗ | ✗ |
| PNG | %26 daha büyük | ✓ | ✗ |

## Ne Zaman WebP Kullanmalı?

- Web sitesi performansı kritik olduğunda
- Modern tarayıcıları hedeflediğinizde
- Şeffaflık + küçük dosya boyutu gerektiğinde
- CDN ve modern hosting kullanırken

## Ne Zaman JPG Kullanmalı?

- Maksimum uyumluluk gerektiğinde
- E-posta ekleri için
- Eski sistemlerle çalışırken
- Baskı (print) için

## Tarayıcı Desteği

WebP artık tüm modern tarayıcılarda destekleniyor:
- ✓ Chrome
- ✓ Firefox
- ✓ Safari (macOS Big Sur+)
- ✓ Edge
- ✗ Internet Explorer

## Sonuç

**Web siteniz için:** WebP kullanın, ama JPG fallback ekleyin.
**Sosyal medya ve e-posta için:** JPG tercih edin.

VormPixyze ile her iki format arasında kolayca dönüşüm yapabilirsiniz.
            `
        },
        en: {
            title: 'WebP vs JPG: Which Format Should You Use?',
            description: 'Is WebP or JPG better for web images? Performance, quality, and compatibility comparison.',
            date: '2025-01-10',
            readTime: '7 min',
            category: 'Comparison',
            content: `
## What is WebP?

WebP is a modern image format developed by Google in 2010. It offers both lossy and lossless compression, transparency, and even animation support.

## File Size Comparison

| Format | Size Difference | Transparency | Animation |
|--------|-----------------|--------------|-----------|
| WebP | Reference | ✓ | ✓ |
| JPG | 25-35% larger | ✗ | ✗ |
| PNG | 26% larger | ✓ | ✗ |

## When to Use WebP?

- When website performance is critical
- When targeting modern browsers
- When transparency + small file size is needed
- When using CDN and modern hosting

## When to Use JPG?

- When maximum compatibility is needed
- For email attachments
- When working with legacy systems
- For print

## Conclusion

**For your website:** Use WebP with JPG fallback.
**For social media and email:** Prefer JPG.

Convert between formats easily with VormPixyze.
            `
        }
    },
    'gorsel-sikistirma-rehberi': {
        tr: {
            title: 'Görsel Sıkıştırma: Kalite Kaybı Olmadan Boyut Küçültme',
            description: 'Web sitenizi hızlandırmak için görsel sıkıştırma teknikleri. SEO ve Core Web Vitals için kritik ipuçları.',
            date: '2025-01-05',
            readTime: '6 dk',
            category: 'SEO',
            content: `
## Neden Görsel Sıkıştırma Önemli?

Görseller, web sayfalarının ortalama ağırlığının **%50-60'ını** oluşturur. Büyük görseller:

- Sayfa yüklenme süresini artırır
- Mobil kullanıcıları kaybettirir
- Google sıralamalarını olumsuz etkiler
- Hosting maliyetlerini yükseltir

## Kayıplı vs Kayıpsız Sıkıştırma

### Kayıplı (Lossy)
- Dosya boyutunu **%50-90** azaltabilir
- Bazı görsel veri kaybedilir
- Web fotoğrafları için ideal

### Kayıpsız (Lossless)
- Orijinal kalite **%100** korunur
- Daha az sıkıştırma (%10-30)
- Arşivleme ve baskı için ideal

## Optimal Sıkıştırma Ayarları

| Kullanım | Kalite | Format |
|----------|--------|--------|
| Web Fotoğrafları | %80-85 | WebP veya JPG |
| Thumbnail | %70-75 | WebP veya JPG |
| Logo/İkon | Kayıpsız | PNG veya SVG |
| E-ticaret Ürün | %85-90 | WebP veya JPG |

## Core Web Vitals ve Görseller

Google'ın Core Web Vitals metrikleri için görsel optimizasyonu kritiktir:

- **LCP (Largest Contentful Paint):** Hero görseller optimize edilmeli
- **CLS (Cumulative Layout Shift):** Görsel boyutları width/height ile belirtilmeli

## VormPixyze ile Sıkıştırma

VormPixyze'in görsel sıkıştırma aracı ile tüm bu optimizasyonları tek tıkla yapabilirsiniz. Dosyalarınız sunucuya yüklenmez, gizliliğiniz korunur.
            `
        },
        en: {
            title: 'Image Compression: Reduce Size Without Quality Loss',
            description: 'Image compression techniques to speed up your website. Critical tips for SEO and Core Web Vitals.',
            date: '2025-01-05',
            readTime: '6 min',
            category: 'SEO',
            content: `
## Why is Image Compression Important?

Images make up **50-60%** of the average web page weight. Large images:

- Increase page load time
- Cause mobile users to leave
- Negatively impact Google rankings
- Increase hosting costs

## Lossy vs Lossless Compression

### Lossy
- Can reduce file size by **50-90%**
- Some visual data is lost
- Ideal for web photos

### Lossless
- Original quality **100%** preserved
- Less compression (10-30%)
- Ideal for archiving and print

## Optimal Compression Settings

| Use Case | Quality | Format |
|----------|---------|--------|
| Web Photos | 80-85% | WebP or JPG |
| Thumbnails | 70-75% | WebP or JPG |
| Logo/Icon | Lossless | PNG or SVG |
| E-commerce Product | 85-90% | WebP or JPG |

## Compress with VormPixyze

With VormPixyze's image compression tool, you can do all these optimizations with one click. Your files are never uploaded to servers.
            `
        }
    },
    'image-compression-guide': {
        en: {
            title: 'Image Compression: Reduce Size Without Quality Loss',
            description: 'Image compression techniques to speed up your website.',
            date: '2025-01-05',
            readTime: '6 min',
            category: 'SEO',
            content: `## Why Compress?\n\nImages make up 50-60% of web page weight. Optimize them for better performance.`
        },
        tr: {
            title: 'Görsel Sıkıştırma Rehberi',
            description: 'Görsel sıkıştırma teknikleri.',
            date: '2025-01-05',
            readTime: '6 dk',
            category: 'SEO',
            content: `## Neden Sıkıştırma?\n\nGörseller web sayfalarının %50-60'ını oluşturur.`
        }
    },
    'arka-plan-silme-ipuclari': {
        tr: {
            title: 'AI Arka Plan Silme: Profesyonel Sonuçlar İçin İpuçları',
            description: 'Yapay zeka ile arka plan silme nasıl çalışır? En iyi sonuçları almak için ipuçları.',
            date: '2025-01-01',
            readTime: '5 dk',
            category: 'AI Araçları',
            content: `
## AI Arka Plan Silme Nasıl Çalışır?

Modern yapay zeka modelleri, görüntülerdeki objeleri **segmente** ederek ön planı arka plandan ayırır. VormPixyze, on-device AI modelleri kullanarak bu işlemi doğrudan tarayıcınızda gerçekleştirir.

## En İyi Sonuçlar İçin İpuçları

### 1. Net Özne
Ön plandaki kişi veya nesne net ve odaklanmış olmalı. Bulanık fotoğraflar zayıf sonuç verir.

### 2. Kontrast
Özne ile arka plan arasında renk kontrastı olması yardımcı olur. Beyaz giysi + beyaz arka plan zor kesim demektir.

### 3. Aydınlatma
Düzgün aydınlatma daha iyi kenar algılama sağlar. Sert gölgeler kesimi zorlaştırabilir.

### 4. Çözünürlük
Yüksek çözünürlüklü görseller daha detaylı kesim verir. En az 1000x1000 piksel önerilir.

## Kullanım Senaryoları

### E-Ticaret
Ürün fotoğraflarını beyaz veya şeffaf arka plana geçirmek. Amazon, Trendyol gibi platformlar genellikle beyaz arka plan ister.

### Sosyal Medya
Profil fotoğrafları, Instagram paylaşımları ve YouTube thumbnail'ları için temiz arka planlar.

### Portre Fotoğrafçılığı
Stüdyo çekimi olmadan profesyonel arka planlar oluşturma.

## Saç ve Karmaşık Kenarlar

VormPixyze'in AI modeli, saç telleri ve kürk gibi karmaşık kenarları **piksel hassasiyetinde** tanır. Ancak:
- Öznenin saçları net görünmeli
- Saç arka planla aynı renk olmamalı
- Rüzgarlı saç daha zor kesim demektir

## Sonuç

AI arka plan silme artık herkes için erişilebilir. VormPixyze ile ücretsiz, güvenli ve profesyonel sonuçlar alabilirsiniz.
            `
        },
        en: {
            title: 'AI Background Removal: Tips for Professional Results',
            description: 'How does AI background removal work? Tips for getting the best results.',
            date: '2025-01-01',
            readTime: '5 min',
            category: 'AI Tools',
            content: `
## How Does AI Background Removal Work?

Modern AI models **segment** objects in images to separate the foreground from the background. VormPixyze uses on-device AI models to perform this directly in your browser.

## Tips for Best Results

### 1. Clear Subject
The person or object in the foreground should be clear and focused.

### 2. Contrast
Color contrast between subject and background helps.

### 3. Lighting
Even lighting provides better edge detection.

### 4. Resolution
High-resolution images give more detailed cuts. At least 1000x1000 pixels recommended.

## Use Cases

### E-Commerce
Switch product photos to white or transparent background.

### Social Media
Clean backgrounds for profile photos and thumbnails.

### Portrait Photography
Create professional backgrounds without studio shoots.

## Conclusion

AI background removal is now accessible to everyone. Get free, secure, and professional results with VormPixyze.
            `
        }
    },
    'background-removal-tips': {
        en: {
            title: 'AI Background Removal: Tips for Professional Results',
            description: 'How does AI background removal work? Tips for getting the best results.',
            date: '2025-01-01',
            readTime: '5 min',
            category: 'AI Tools',
            content: `## AI Background Removal\n\nModern AI models segment objects to separate foreground from background.`
        },
        tr: {
            title: 'AI Arka Plan Silme İpuçları',
            description: 'Yapay zeka ile arka plan silme ipuçları.',
            date: '2025-01-01',
            readTime: '5 dk',
            category: 'AI Araçları',
            content: `## AI Arka Plan Silme\n\nModern AI modelleri objeleri segmente eder.`
        }
    }
};

type LangKey = 'tr' | 'en';

export default function BlogArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr') ? 'tr' : 'en') as LangKey;

    const article = slug && articleDatabase[slug] ? articleDatabase[slug][activeLang] || articleDatabase[slug]['en'] : null;

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-slate-200">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-slate-400 mb-6">{activeLang === 'tr' ? 'Makale bulunamadı' : 'Article not found'}</p>
                <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
                    ← {activeLang === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
                </Link>
            </div>
        );
    }

    const categoryColors: Record<string, string> = {
        'Rehber': 'bg-blue-500/20 text-blue-400',
        'Guide': 'bg-blue-500/20 text-blue-400',
        'Karşılaştırma': 'bg-purple-500/20 text-purple-400',
        'Comparison': 'bg-purple-500/20 text-purple-400',
        'SEO': 'bg-emerald-500/20 text-emerald-400',
        'AI Araçları': 'bg-pink-500/20 text-pink-400',
        'AI Tools': 'bg-pink-500/20 text-pink-400',
    };

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((line, idx) => {
                if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-xl font-semibold text-white mt-6 mb-3">{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4 text-slate-300">{line.replace('- ', '')}</li>;
                }
                if (line.startsWith('| ')) {
                    return null; // Skip table rows for simplicity
                }
                if (line.trim() === '') {
                    return <br key={idx} />;
                }
                // Handle bold text
                const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                return <p key={idx} className="text-slate-300 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: boldText }} />;
            });
    };

    return (
        <>
            <Helmet>
                <title>{article.title} | VormPixyze Blog</title>
                <meta name="description" content={article.description} />
                <link rel="canonical" href={`https://vormpixyze.com/blog/${slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.description} />
                <meta property="article:published_time" content={article.date} />
            </Helmet>

            <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-200 font-sans">
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
                        <Link to="/blog" className="text-xl font-bold text-white">
                            ← Vorm<span className="text-indigo-400">Pixyze</span> <span className="text-slate-500 text-sm font-normal ml-2">Blog</span>
                        </Link>
                    </div>
                </nav>

                <main className="max-w-3xl mx-auto px-4 py-12 flex-1">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-slate-700 text-slate-300'}`}>
                                {article.category}
                            </span>
                            <span className="text-sm text-slate-500">{article.readTime}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-sm text-slate-500">{article.date}</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
                        <p className="text-lg text-slate-400">{article.description}</p>
                    </header>

                    {/* Article Content */}
                    <article className="prose prose-invert max-w-none">
                        {renderContent(article.content)}
                    </article>

                    {/* CTA */}
                    <div className="mt-12 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {activeLang === 'tr' ? 'Hemen Deneyin' : 'Try It Now'}
                        </h2>
                        <p className="text-slate-400 mb-6">
                            {activeLang === 'tr' ? 'Ücretsiz, güvenli ve hızlı görsel dönüştürme.' : 'Free, secure, and fast image conversion.'}
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
                        >
                            {activeLang === 'tr' ? 'VormPixyze\'ı Aç' : 'Open VormPixyze'}
                        </Link>
                    </div>

                    {/* Back to Blog */}
                    <div className="mt-8 text-center">
                        <Link to="/blog" className="text-indigo-400 hover:text-indigo-300">
                            ← {activeLang === 'tr' ? 'Tüm Makalelere Dön' : 'Back to All Articles'}
                        </Link>
                    </div>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
