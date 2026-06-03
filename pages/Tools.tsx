import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';
import { SearchInput } from '../components/ui/SearchInput';
import { Badge } from '../components/ui/Badge';

interface ToolDef {
    id: string;
    name: string;
    description: string;
    path: string;
    badge: 'FREE' | 'NEW' | 'PRO';
    icon: React.ReactNode;
    keywords: string[];
}

const Icon = (paths: React.ReactNode) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths}
    </svg>
);

const content = {
    tr: {
        metaTitle: 'Tüm Araçlar — WebImgConverter',
        metaDesc: 'WebImgConverter\'daki tüm görüntü işleme araçlarını keşfedin: dönüştürme, sıkıştırma, kırpma, arkaplan silme ve daha fazlası.',
        heading: 'Tüm Araçları Keşfedin',
        subheading: 'Hassas görüntü işleme parmaklarınızın ucunda. Dijital varlıklarınızı dönüştürmek, optimize etmek ve iyileştirmek için mükemmel aracı bulun.',
        searchPlaceholder: 'Araçlara, MIME türüne, JPEG veya PNG\'ye göre arayın',
        notFound: (query: string) => `"${query}" araması ile eşleşen araç bulunamadı. Lütfen başka bir kelime deneyin.`,
        badgeNew: 'YENİ',
        tools: {
            'svg-to-png': { name: 'SVG\'den PNG\'ye', description: 'Vektör (SVG) grafiklerinizi kullanıma hazır, yüksek çözünürlüklü raster (PNG) formatına dönüştürün.' },
            'avif-to-webp': { name: 'AVIF Dönüştürücü', description: 'AVIF dosyalarınızı JPG, PNG veya WebP formatına dönüştürün. Çıktı formatını siz seçin.' },
            'image-compressor': { name: 'Görüntü Sıkıştırıcı', description: 'Akıllı algoritmalarla gözle görülür kalite kaybı yaşamadan dosya boyutlarını ciddi oranda küçültün.' },
            'png-to-jpg': { name: 'PNG\'den JPG\'ye', description: 'Transparan PNG dosyalarınızı akıllı beyaz arkaplan dolgusu ile hızlı ve optimize edilmiş JPG\'lere dönüştürün.' },
            'smart-cropper': { name: 'Akıllı Kırpıcı', description: 'Özneleri otomatik olarak algılayın ve resimleri sosyal medya veya küçük resim boyutlarına (thumbnail) uygun şekilde kırpın.' },
            'favicon-generator': { name: 'Favicon Oluşturucu', description: 'Web siteniz için saniyeler içinde mükemmel favicon (ICO) dosyaları oluşturun.' },
            'background-remover': { name: 'Arkaplan Silici', description: 'Portreler ve ürün fotoğrafları için gelişmiş Yapay Zeka kullanarak arka planları anında kaldırın.' },
            'rotate-image': { name: 'Görsel Döndür', description: 'Görsellerinizi yatay/dikey çevirin veya istediğiniz açıda döndürün.' },
            'watermark-image': { name: 'Filigran Ekle', description: 'Görsellerinize metin veya logo ile filigran (watermark) ekleyin.' },
            'black-and-white': { name: 'Siyah Beyaz Yap', description: 'Görsellerinizi tek tıkla siyah beyaz (grayscale) formatına dönüştürün.' },
            'webp-converter': { name: 'WebP Dönüştürücü', description: 'WebP dosyalarınızı JPG veya PNG formatına çevirin. Çıktı formatını kendiniz seçin, tek araçla her şey.' },
            'jpg-converter': { name: 'JPG Dönüştürücü', description: 'JPG/JPEG dosyalarınızı PNG veya WebP formatına çevirin. Şeffaf PNG ya da modern WebP, karar sizin.' }
        }
    },
    en: {
        metaTitle: 'All Tools — WebImgConverter',
        metaDesc: 'Explore all image processing tools on WebImgConverter: conversion, compression, cropping, background removal, and more.',
        heading: 'Explore All Tools',
        subheading: 'Precise image processing at your fingertips. Find the perfect tool to convert, optimize, and enhance your digital assets.',
        searchPlaceholder: 'Search by tools, MIME type, JPEG or PNG',
        notFound: (query: string) => `No tools found matching "${query}". Please try another word.`,
        badgeNew: 'NEW',
        tools: {
            'svg-to-png': { name: 'SVG to PNG', description: 'Convert your vector (SVG) graphics to ready-to-use, high-resolution raster (PNG) format.' },
            'avif-to-webp': { name: 'AVIF Converter', description: 'Convert your AVIF files to JPG, PNG, or WebP. You choose the output format.' },
            'image-compressor': { name: 'Image Compressor', description: 'Significantly reduce file sizes without noticeable quality loss using smart algorithms.' },
            'png-to-jpg': { name: 'PNG to JPG', description: 'Quickly convert your transparent PNG files to optimized JPGs with a smart white background fill.' },
            'smart-cropper': { name: 'Smart Cropper', description: 'Automatically detect subjects and crop images perfectly for social media or thumbnails.' },
            'favicon-generator': { name: 'Favicon Generator', description: 'Generate perfect favicon (ICO) files for your website in seconds.' },
            'background-remover': { name: 'Background Remover', description: 'Instantly remove backgrounds using advanced AI for portraits and product photos.' },
            'rotate-image': { name: 'Rotate Image', description: 'Flip your images horizontally/vertically or rotate them at any angle.' },
            'watermark-image': { name: 'Watermark Image', description: 'Add text or logo watermark to your images to protect your copyright.' },
            'black-and-white': { name: 'Black & White', description: 'Convert your colorful images to black and white (grayscale) with one click.' },
            'webp-converter': { name: 'WebP Converter', description: 'Convert WebP files to JPG or PNG format. You pick the output — one tool, all formats.' },
            'jpg-converter': { name: 'JPG Converter', description: 'Convert JPG/JPEG files to PNG or WebP format. Transparent PNG or modern WebP, your call.' }
        }
    },
    de: {
        metaTitle: 'Alle Werkzeuge — WebImgConverter',
        metaDesc: 'Entdecken Sie alle Bildverarbeitungswerkzeuge auf WebImgConverter: Konvertierung, Komprimierung, Zuschneiden, Hintergrundentfernung und mehr.',
        heading: 'Alle Werkzeuge entdecken',
        subheading: 'Präzise Bildverarbeitung auf Knopfdruck. Finden Sie das perfekte Werkzeug, um Ihre digitalen Assets zu konvertieren und zu optimieren.',
        searchPlaceholder: 'Suchen Sie nach Werkzeugen, MIME-Typ, JPEG oder PNG',
        notFound: (query: string) => `Keine Werkzeuge für "${query}" gefunden. Bitte versuchen Sie ein anderes Wort.`,
        badgeNew: 'NEU',
        tools: {
            'svg-to-png': { name: 'SVG zu PNG', description: 'Konvertieren Sie Ihre Vektor- (SVG) Grafiken in ein gebrauchsfertiges, hochauflösendes Rasterformat (PNG).' },
            'avif-to-webp': { name: 'AVIF Konverter', description: 'Konvertieren Sie AVIF-Dateien in JPG, PNG oder WebP. Sie wählen das Ausgabeformat.' },
            'image-compressor': { name: 'Bildkomprimierer', description: 'Reduzieren Sie Dateigrößen erheblich ohne merklichen Qualitätsverlust durch intelligente Algorithmen.' },
            'png-to-jpg': { name: 'PNG zu JPG', description: 'Konvertieren Sie Ihre transparenten PNG-Dateien schnell in optimierte JPGs mit intelligenter weißer Hintergrundfüllung.' },
            'smart-cropper': { name: 'Smart Cropper', description: 'Erkennen Sie Motive automatisch und schneiden Sie Bilder perfekt für soziale Medien oder Thumbnails zu.' },
            'favicon-generator': { name: 'Favicon Generator', description: 'Erstellen Sie in Sekundenschnelle perfekte Favicon (ICO)-Dateien für Ihre Website.' },
            'background-remover': { name: 'Hintergrundentferner', description: 'Entfernen Sie Hintergründe sofort mit fortschrittlicher KI für Porträts und Produktfotos.' },
            'rotate-image': { name: 'Bild Drehen', description: 'Spiegeln Sie Ihre Bilder horizontal/vertikal oder drehen Sie sie.' },
            'watermark-image': { name: 'Wasserzeichen', description: 'Fügen Sie Text- oder Logo-Wasserzeichen hinzu, um Ihr Urheberrecht zu schützen.' },
            'black-and-white': { name: 'Schwarz-Weiß', description: 'Konvertieren Sie Ihre Bilder mit einem Klick in Schwarz-Weiß (Graustufen).' },
            'webp-converter': { name: 'WebP Konverter', description: 'Konvertieren Sie WebP-Dateien in JPG oder PNG. Sie wählen das Ausgabeformat — ein Tool für alles.' },
            'jpg-converter': { name: 'JPG Konverter', description: 'Konvertieren Sie JPG/JPEG in PNG oder WebP. Transparentes PNG oder modernes WebP — Ihre Wahl.' }
        }
    },
    fr: {
        metaTitle: 'Tous les Outils — WebImgConverter',
        metaDesc: 'Découvrez tous les outils de traitement d\'images sur WebImgConverter : conversion, compression, recadrage, suppression d\'arrière-plan et plus.',
        heading: 'Découvrir Tous les Outils',
        subheading: 'Le traitement d\'images précis à portée de main. Trouvez l\'outil parfait pour convertir, optimiser et améliorer vos actifs numériques.',
        searchPlaceholder: 'Rechercher par outils, type MIME, JPEG ou PNG',
        notFound: (query: string) => `Aucun outil trouvé pour "${query}". Veuillez essayer un autre mot.`,
        badgeNew: 'NOUVEAU',
        tools: {
            'svg-to-png': { name: 'SVG en PNG', description: 'Convertissez vos graphiques vectoriels (SVG) au format raster (PNG) haute résolution prêt à l\'emploi.' },
            'avif-to-webp': { name: 'Convertisseur AVIF', description: 'Convertissez vos fichiers AVIF en JPG, PNG ou WebP. Vous choisissez le format de sortie.' },
            'image-compressor': { name: 'Compresseur d\'Image', description: 'Réduisez considérablement la taille des fichiers sans perte de qualité notable grâce à des algorithmes intelligents.' },
            'png-to-jpg': { name: 'PNG en JPG', description: 'Convertissez rapidement vos fichiers PNG transparents en JPG optimisés avec un remplissage de fond blanc intelligent.' },
            'smart-cropper': { name: 'Recadrage Intelligent', description: 'Détectez automatiquement les sujets et recadrez parfaitement les images pour les médias sociaux ou les miniatures.' },
            'favicon-generator': { name: 'Générateur de Favicon', description: 'Générez des fichiers favicon (ICO) parfaits pour votre site web en quelques secondes.' },
            'background-remover': { name: 'Suppresseur de Fond', description: 'Supprimez instantanément les arrière-plans en utilisant l\'IA avancée pour les portraits et les photos de produits.' },
            'rotate-image': { name: 'Pivoter l\'Image', description: 'Retournez vos images ou faites-les pivoter sous n\'importe quel angle.' },
            'watermark-image': { name: 'Filigrane', description: 'Ajoutez un filigrane texte ou logo à vos images pour protéger vos droits d\'auteur.' },
            'black-and-white': { name: 'Noir et Blanc', description: 'Convertissez vos images colorées en noir et blanc (niveaux de gris) en un clic.' },
            'webp-converter': { name: 'Convertisseur WebP', description: 'Convertissez vos fichiers WebP en JPG ou PNG. Vous choisissez — un outil, tous les formats.' },
            'jpg-converter': { name: 'Convertisseur JPG', description: 'Convertissez vos fichiers JPG/JPEG en PNG ou WebP. PNG transparent ou WebP moderne, à vous de choisir.' }
        }
    }
};

type LangKey = keyof typeof content;

const TOOLS: ToolDef[] = [
    {
        id: 'svg-to-png',
        name: 'svg-to-png',
        description: 'svg-to-png',
        path: '/svg-to-png',
        badge: 'FREE',
        icon: Icon(<>
            <path d="M4 4h16v16H4z" />
            <path d="M8 8l3 3m0 0l-3 3m3-3h5" />
        </>),
        keywords: ['svg', 'png', 'vector', 'raster'],
    },
    {
        id: 'avif-to-webp',
        name: 'avif-to-webp',
        description: 'avif-to-webp',
        path: '/avif-converter',
        badge: 'FREE',
        icon: Icon(<>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 12l3 3 7-7" />
        </>),
        keywords: ['avif', 'webp', 'jpg', 'png', 'modern', 'converter'],
    },
    {
        id: 'webp-converter',
        name: 'webp-converter',
        description: 'webp-converter',
        path: '/webp-converter',
        badge: 'FREE',
        icon: Icon(<>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="m10 13-2 2 2 2" />
            <path d="m14 17 2-2-2-2" />
        </>),
        keywords: ['webp', 'jpg', 'png', 'convert', 'converter'],
    },
    {
        id: 'jpg-converter',
        name: 'jpg-converter',
        description: 'jpg-converter',
        path: '/jpg-converter',
        badge: 'FREE',
        icon: Icon(<>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M8 13h2.5a1.5 1.5 0 0 1 0 3H8v-3z" />
            <path d="M16 17v-4" />
        </>),
        keywords: ['jpg', 'jpeg', 'png', 'webp', 'convert', 'converter'],
    },
    {
        id: 'image-compressor',
        name: 'image-compressor',
        description: 'image-compressor',
        path: '/compress-image',
        badge: 'FREE',
        icon: Icon(<>
            <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
            <path d="M3 8V5a2 2 0 0 1 2-2h3" />
            <path d="M3 16v3a2 2 0 0 0 2 2h3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            <line x1="9" y1="12" x2="15" y2="12" />
        </>),
        keywords: ['compress', 'optimize', 'shrink'],
    },
    {
        id: 'png-to-jpg',
        name: 'png-to-jpg',
        description: 'png-to-jpg',
        path: '/png-to-jpg',
        badge: 'FREE',
        icon: Icon(<>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </>),
        keywords: ['png', 'jpg', 'jpeg', 'transparency'],
    },
    {
        id: 'smart-cropper',
        name: 'smart-cropper',
        description: 'smart-cropper',
        path: '/smart-cropper',
        badge: 'NEW',
        icon: Icon(<>
            <path d="M6 2v14a2 2 0 0 0 2 2h14" />
            <path d="M18 22V8a2 2 0 0 0-2-2H2" />
        </>),
        keywords: ['crop', 'aspect ratio', 'thumbnail'],
    },
    {
        id: 'favicon-generator',
        name: 'favicon-generator',
        description: 'favicon-generator',
        path: '/favicon-generator',
        badge: 'NEW',
        icon: Icon(<>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <polyline points="12 22 12 12" />
            <polyline points="22 8.5 12 12" />
            <polyline points="2 8.5 12 12" />
        </>),
        keywords: ['favicon', 'ico', 'icon', 'website', 'logo'],
    },
    {
        id: 'background-remover',
        name: 'background-remover',
        description: 'background-remover',
        path: '/remove-background',
        badge: 'FREE',
        icon: Icon(<>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
        </>),
        keywords: ['background', 'remove', 'transparent', 'ai'],
    },
    {
        id: 'rotate-image',
        name: 'rotate-image',
        description: 'rotate-image',
        path: '/rotate-image',
        badge: 'NEW',
        icon: Icon(<>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
        </>),
        keywords: ['rotate', 'flip', 'spin'],
    },
    {
        id: 'watermark-image',
        name: 'watermark-image',
        description: 'watermark-image',
        path: '/watermark-image',
        badge: 'NEW',
        icon: Icon(<>
            <path d="M12 2v20" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </>),
        keywords: ['watermark', 'copyright', 'stamp', 'logo'],
    },
    {
        id: 'black-and-white',
        name: 'black-and-white',
        description: 'black-and-white',
        path: '/black-and-white',
        badge: 'NEW',
        icon: Icon(<>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 1 0 20z" />
        </>),
        keywords: ['black', 'white', 'grayscale', 'filter'],
    },
];

import { useLanguage } from '../LanguageContext';

const ToolCard: React.FC<{ tool: ToolDef; t: typeof content.en }> = ({ tool, t }) => {
    const localizedTool = t.tools[tool.id as keyof typeof t.tools];
    return (
        <Link
            to={tool.path}
            className="group block bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 transition-all hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-card-hover"
        >
            <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                    {tool.icon}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors font-sans">
                            {localizedTool.name}
                        </h3>
                        <Badge tone={tool.badge === 'NEW' ? 'brand' : 'mint'}>
                            {tool.badge === 'NEW' ? t.badgeNew : tool.badge}
                        </Badge>
                    </div>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{localizedTool.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default function ToolsPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.tr;
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');

    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return TOOLS;
        return TOOLS.filter((tool) => {
            const localizedTool = t.tools[tool.id as keyof typeof t.tools];
            return localizedTool.name.toLowerCase().includes(q) ||
                localizedTool.description.toLowerCase().includes(q) ||
                tool.keywords.some((k) => k.includes(q));
        });
    }, [query, t]);

    return (
        <SiteShell onCta={() => navigate('/')} bg="white">
            <Helmet>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
                <link rel="canonical" href="https://WebImgConverter.com/tools" />
            </Helmet>

            <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        {t.heading}
                    </h1>
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                        {t.subheading}
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-10">
                    <SearchInput
                        placeholder={t.searchPlaceholder}
                        onSearch={setQuery}
                        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((tool) => <ToolCard key={tool.id} tool={tool} t={t} />)}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">
                        {t.notFound(query)}
                    </div>
                )}
            </section>
        </SiteShell>
    );
}
