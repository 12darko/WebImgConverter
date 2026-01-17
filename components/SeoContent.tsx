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
            intro: "VormPixyze, görsel dönüştürme ve düzenleme ihtiyaçlarınız için geliştirdiğimiz %100 tarayıcı tabanlı, güvenli ve ücretsiz bir araç setidir. HEIC'ten JPG'e, WebP dönüştürmeye, arka plan silmeden dosya küçültmeye kadar her şey burada.",
            whyTitle: "Neden VormPixyze?",
            features: [
                { title: "🔒 İstemci Taraflı Gizlilik", desc: "Dosyalarınız asla sunucuya yüklenmez, her şey cihazınızda biter." },
                { title: "⚡ Işık Hızında İşlem", desc: "WebAssembly teknolojisi ile saniyeler içinde binlerce görseli işleyin." },
                { title: "📱 Tüm Cihazlar Uyumlu", desc: "Windows, Mac, iPhone veya Android fark etmez, her yerden erişin." },
                { title: "🤖 Yapay Zeka Desteği", desc: "Arka plan silme ve akıllı isimlendirme için en yeni AI modelleri." }
            ],
            faq: [
                { q: "VormPixyze ücretsiz mi?", a: "Evet, temel araçların tamamı ücretsizdir. Profesyonel özellikler için uygun fiyatlı planlarımız mevcuttur." },
                { q: "Dosyalarım çalınır mı?", a: "Hayır, sunucularımıza dosya yüklemesi yapılmaz. Tüm işlem sizin bilgisayarınızda gerçekleşir." }
            ]
        },
        'heic-to-jpg': {
            title: "HEIC Dosyasını JPG'ye Çevirme ve AI Araçları",
            intro: "VormPixyze, modern fotoğraf formatı olan HEIC dosyalrını saniyeler içinde JPG, PNG veya WEBP formatlarına dönüştürmenizi sağlar. Apple cihazlarınızda çektiğiniz fotoğrafları Windows ve Android'de sorunsuzca kullanın.",
            whyTitle: "HEIC Dönüştürme Rehberi",
            features: [
                { title: "Neden HEIC'i JPG'ye Çevirmeliyim?", desc: "HEIC formatı yüksek sıkıştırma sunsa da uyumluluk sorunu yaşatır. JPG en evrensel formattır." },
                { title: "Toplu Dönüştürme", desc: "Yüzlerce iPhone fotoğrafını tek seferde yükleyin ve dönüştürün." }
            ],
            faq: [
                { q: "Windows'ta HEIC nasıl açılır?", a: "Windows için eklenti satın almanıza gerek yok, VormPixyze ile JPG'ye çevirip hemen açabilirsiniz." },
                { q: "Kalite bozulur mu?", a: "Hayır, en iyi sıkıştırma algoritmaları ile görsel kalitesini koruyoruz." }
            ]
        },
        'png-to-jpg': {
            title: "PNG'den JPG'ye Dönüştürme - Şeffaflık ve Boyut",
            intro: "Büyük boyutlu PNG dosyalarınızı web uyumlu, optimize edilmiş JPG formatına dönüştürün. Saydam arka planları otomatik olarak beyaz veya siyah yapabilirsiniz.",
            whyTitle: "PNG mi JPG mi?",
            features: [
                { title: "Daha Küçük Dosya Boyutu", desc: "PNG dosyaları kayıpsız olduğu için çok yer kaplar. JPG ile %80'e varan sıkıştırma sağlayın." },
                { title: "Web Uyumluluğu", desc: "Web siteniz için en hızlı yüklenen format JPG'dir." }
            ],
            faq: [
                { q: "Saydamlık (Transparanlık) ne olur?", a: "JPG saydamlığı desteklemez. Çevirirken arka plan otomatik olarak beyaz yapılır." },
                { q: "Hangi durumlarda PNG kullanmalıyım?", a: "Eğer logonuz veya grafiğinizde saydamlık varsa PNG kullanın, fotoğraf ise JPG'ye çevirin." }
            ]
        },
        'webp-to-jpg': {
            title: "WebP Dosyalarını JPG ve PNG Yapma",
            intro: "Google'ın geliştirdiği WebP formatını, her yerde açılabilen JPG veya PNG formatına çevirin. Web'den indirdiğiniz görselleri Photoshop ve diğer araçlarda kullanın.",
            whyTitle: "WebP Dönüştürme Hakkında",
            features: [
                { title: "Evrensel Uyumluluk", desc: "WebP her editörde açılmayabilir. JPG ve PNG her yerde çalışır." },
                { title: "Tersine Dönüşüm", desc: "WebP'den eski formatlara dönüşüm yaparken kaliteyi maksimumda tutarız." }
            ],
            faq: [
                { q: "WebP nedir?", a: "WebP, Google tarafından web sitelerini hızlandırmak için geliştirilen yeni nesil bir görsel formatıdır." },
                { q: "Dönüştürme hızlı mı?", a: "Evet, tarayıcı teknolojimiz sayesinde saniyede onlarca dosyayı çevirebilirsiniz." }
            ]
        },
        'remove-background': {
            title: "Yapay Zeka ile Arka Plan Silme (Remove BG)",
            intro: "Fotoğraflarınızın arka planını tek bir tıkla, saniyeler içinde silin. Ürün fotoğrafları, portreler ve logolar için mükemmel temizlik.",
            whyTitle: "AI Arka Plan Temizleyici",
            features: [
                { title: "Otomatik Algılama", desc: "Hangi objenin önde olduğunu yapay zeka anlar ve saç teline kadar detaylı kesim yapar." },
                { title: "Şeffaf PNG Çıktısı", desc: "Sonuçları saydam PNG olarak indirip tasarımlarınızda kullanın." }
            ],
            faq: [
                { q: "Bu özellik ücretli mi?", a: "Temel kullanım ücretsizdir. Yüksek çözünürlüklü ve sınırsız işlem için Premium'a geçebilirsiniz." },
                { q: "Hangi fotolarda iyi çalışır?", a: "Net bir özneye (insan, araba, ürün) sahip fotolarda en iyi sonucu verir." }
            ]
        },
        'compress-image': {
            title: "Görsel Sıkıştırma ve Boyut Küçültme",
            intro: "JPG, PNG ve WebP dosyalarınızın boyutunu kalite kaybetmeden %90'a kadar küçültün. Web sitenizi hızlandırın, depolama alanından tasarruf edin.",
            whyTitle: "Akıllı Sıkıştırma",
            features: [
                { title: "Kayıplı ve Kayıpsız Seçenekler", desc: "İster maksimum kaliteyi koruyun, ister maksimum sıkıştırma yapın." },
                { title: "Toplu İşlem", desc: "Klasör dolusu fotoğrafı tek seferde sıkıştırın." }
            ],
            faq: [
                { q: "Görüntü kalitesi bozulur mu?", a: "Gözle görülmeyecek seviyede optimizasyon yapıyoruz. Piksellenme olmaz." },
                { q: "Hangi formatları küçültebilirim?", a: "JPG, PNG, WebP ve HEIC dosyalarını destekliyoruz." }
            ]
        }
    },
    en: {
        'home': {
            title: "All Image Tools in One Place - VormPixyze",
            intro: "VormPixyze is a 100% browser-based, secure, and free toolkit for all your image conversion and editing needs. From HEIC to JPG, WebP conversion, background removal to compression, it's all here.",
            whyTitle: "Why VormPixyze?",
            features: [
                { title: "🔒 Client-Side Privacy", desc: "Files effectively never leave your device." },
                { title: "⚡ Lightning Fast", desc: "Process thousands of images in seconds with WebAssembly." },
                { title: "📱 Cross-Platform", desc: "Works on Windows, Mac, iPhone, or Android seamlessly." },
                { title: "🤖 AI Powered", desc: "Latest AI models for background removal and smart naming." }
            ],
            faq: [
                { q: "Is VormPixyze free?", a: "Yes, all basic tools are free. Affordable plans are available for pro features." },
                { q: "Are my files safe?", a: "Yes, files are not uploaded to our servers. Processing happens on your device." }
            ]
        },
        'heic-to-jpg': {
            title: "Convert HEIC files to JPG and AI Tools",
            intro: "VormPixyze allows you to convert modern HEIC files to JPG, PNG, or WEBP formats in seconds. Use photos taken on Apple devices on Windows and Android without issues.",
            whyTitle: "HEIC Conversion Guide",
            features: [
                { title: "Why Convert HEIC to JPG?", desc: "HEIC offers high compression but lacks compatibility. JPG is universal." },
                { title: "Batch Conversion", desc: "Upload and convert hundreds of iPhone photos at once." }
            ],
            faq: [
                { q: "How to open HEIC on Windows?", a: "No need to buy extensions, convert to JPG with VormPixyze and open instantly." },
                { q: "Does quality suffer?", a: "No, we preserve visual quality with top compression algorithms." }
            ]
        },
        'png-to-jpg': {
            title: "Convert PNG to JPG - Transparency & Size",
            intro: "Convert large PNG files to web-optimized JPG format. Automatically handles transparent backgrounds by turning them white or black.",
            whyTitle: "PNG vs JPG?",
            features: [
                { title: "Smaller File Size", desc: "PNGs can be huge. JPG offers up to 80% better compression." },
                { title: "Web Compatibility", desc: "JPG is the fastest loading format for photographs on websites." }
            ],
            faq: [
                { q: "What happens to transparency?", a: "JPG does not support transparency. Backgrounds become white automatically." },
                { q: "When to use PNG?", a: "Use PNG for logos with transparency, JPG for photographs." }
            ]
        },
        'webp-to-jpg': {
            title: "Convert WebP Files to JPG & PNG",
            intro: "Convert Google's WebP format to universally compatible JPG or PNG. Use web-downloaded images in Photoshop and other tools.",
            whyTitle: "About WebP Conversion",
            features: [
                { title: "Universal Compatibility", desc: "WebP doesn't open everywhere. JPG and PNG do." },
                { title: "Reverse Conversion", desc: "We maintain max quality when converting back from WebP." }
            ],
            faq: [
                { q: "What is WebP?", a: "WebP is a next-gen format by Google for faster websites." },
                { q: "Is conversion fast?", a: "Yes, our browser technology converts dozens of files per second." }
            ]
        },
        'remove-background': {
            title: "AI Background Remover",
            intro: "Remove image backgrounds with a single click in seconds. Perfect for products, portraits, and logos.",
            whyTitle: "AI Background Cleaning",
            features: [
                { title: "Auto Detection", desc: "AI understands the subject and makes precise cuts." },
                { title: "Transparent PNG", desc: "Download results as transparent PNGs for your designs." }
            ],
            faq: [
                { q: "Is this free?", a: "Basic use is free. Upgrade for high-res and unlimited batching." },
                { q: "What photos work best?", a: "Photos with clear subjects (people, cars, products) work best." }
            ]
        },
        'compress-image': {
            title: "Image Compressor & Resizer",
            intro: "Reduce JPG, PNG, and WebP file sizes by up to 90% without quality loss. Speed up your website and save storage.",
            whyTitle: "Smart Compression",
            features: [
                { title: "Lossy & Lossless", desc: "Choose between maximum quality or maximum compression." },
                { title: "Batch Processing", desc: "Compress folder loads of images at once." }
            ],
            faq: [
                { q: "Will quality drop?", a: "We optimize visibly lossless. No pixelation." },
                { q: "Supported formats?", a: "JPG, PNG, WebP, and HEIC supported." }
            ]
        }
    }
};

export const SeoContent = ({ pageType = 'heic-to-jpg' }: SeoContentProps) => {
    // Default to EN if lang not found, default to 'heic-to-jpg' if type not found
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr')) ? 'tr' : 'en';

    const content = seoData[activeLang][pageType] || seoData['en'][pageType];

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
                        {activeLang === 'tr' ? 'Sıkça Sorulan Sorular (SSS)' : 'Frequently Asked Questions'}
                    </h3>

                    <div className="space-y-4">
                        {content.faq.map((item, idx) => (
                            <div key={idx}>
                                <h4 className="font-semibold text-indigo-400">{item.q}</h4>
                                <p>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
