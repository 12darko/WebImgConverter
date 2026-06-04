import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import App from '../AppMain';
import { SiteShell } from '../components/layout';
import { Button } from '../components/ui/Button';
import { ToolDropzone } from '../components/tool/ToolDropzone';
import { convertImage, buildOutputName, downloadBlob, OutputFormat } from '../services/toolEngine';
import { MAX_FREE_CREDITS } from '../types';
import { useLanguage, useLocalizedPath } from '../LanguageContext';
import { HomePageSchema } from '../components/StructuredData';
import { AdsterraNativeBanner } from '../components/ads/AdsterraNativeBanner';

const Icon = (paths: React.ReactNode) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths}
    </svg>
);

const ICONS = {
    privacy: Icon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />),
    speed: Icon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />),
    security: Icon(
        <>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </>
    ),
    optimization: Icon(
        <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </>
    )
};

const content = {
    tr: {
        metaTitle: 'WebImgConverter — Güvenli, Hızlı ve Yerel Görüntü İşleme.',
        metaDesc: 'HEIC, WebP, PNG, AVIF dosyalarını anında dönüştürün. Arkaplan temizleme, sıkıştırma ve yapay zeka araçları; tam gizlilik için güvenli sunucularımızda anında işlenir.',
        ctaConvert: 'Hemen Dönüştür',
        heroTitle1: 'Ücretsiz Görsel Dönüştürücü',
        heroTitle2: '& Arka Plan ',
        heroTitle3: 'Silici',
        heroDesc: 'Güçlü sunucu altyapımızı kullanarak, görüntülerinizi güvenle ve yüksek hızda dönüştürün. İşlem sonrası dosyalarınız kalıcı olarak silinir.',
        heroCta: 'Hemen Başla',
        dropzoneTitle: 'Görselleri Buraya Sürükleyin',
        dropzoneSubtitle: 'veya bilgisayarınızdan seçmek için tıklayın',
        whyTitle: 'Neden WebImgConverter Seçmelisiniz?',
        whyDesc: 'Modern iş akışları için üretilmiş profesyonel araçlar.',
        features: [
            { icon: 'privacy', title: 'Tam Gizlilik', description: 'Tüm işlemler gizlilik politikalarına uygun olarak güvenli sunucularımızda gerçekleşir ve anında silinir.' },
            { icon: 'speed', title: 'Sunucu Hızı', description: 'Özel sunucu altyapımızla yüksek hızda ve kesintisiz performans.' },
            { icon: 'security', title: 'Yüksek Güvenlik', description: 'Güvenli, şeffaf ve tamamen denetlenebilir modern bir mimariyle en baştan tasarlandı.' },
            { icon: 'optimization', title: 'Akıllı Optimizasyon', description: 'Görüntü kalitesinden ödün vermeden dosya boyutunu en aza indiren akıllı sıkıştırma algoritmaları.' }
        ],
        toolsTitle: 'Öne Çıkan Araçlar',
        toolsDesc: 'En popüler dönüştürme ve işleme araçlarımızla hemen başlayın.',
        toolsExplore: 'Tüm araçları keşfedin',
        tools: [
            { name: 'HEIC → JPG', path: '/heic-to-jpg', desc: 'iPhone fotoğraflarını evrensel JPG formatına dönüştürün' },
            { name: 'PNG → JPG', path: '/png-to-jpg', desc: 'PNG dosya boyutunu küçültün' },
            { name: 'WebP → JPG', path: '/webp-to-jpg', desc: 'Evrensel uyumluluk sağlayın' },
            { name: 'Arkaplan Silici', path: '/remove-background', desc: 'Yapay Zeka destekli arkaplan kaldırma' },
            { name: 'Görüntü Sıkıştırıcı', path: '/compress-image', desc: 'Akıllı kayıpsız sıkıştırma' },
            { name: 'Boyutlandırıcı', path: '/resize-image', desc: 'Görselleri piksel bazlı yeniden boyutlandırın' }
        ],
        finalTitle: 'Görüntüleri Dönüştürmeye Hazır mısınız?',
        finalDesc: 'Ücretsiz araçlar, kayıt olmanıza gerek yok. Toplu işleme ve gelişmiş özellikler için Pro\'ya geçebilirsiniz.',
        finalCta1: 'Ücretsiz Başla',
        finalCta2: 'Fiyatlandırmayı Gör',
        quickConvertTitle: 'Dosya Seçildi',
        quickConvertFormatLabel: 'Hedef Format',
        quickConvertBtn: 'Hemen Dönüştür',
        quickConvertingBtn: 'Dönüştürülüyor...',
        quickConvertSuccessBtn: 'Dönüştürüldü (Tekrar İndir)',
        quickConvertAdvanced: 'Gelişmiş ayarlar ve toplu işlem için Detaylı Araca Git →',
        quickConvertCancel: 'İptal Et'
    },
    en: {
        metaTitle: 'WebImgConverter — Secure, Fast, and Local Image Processing.',
        metaDesc: 'Instantly convert HEIC, WebP, PNG, AVIF files. Background removal, compression, and AI tools processed securely on our servers for total privacy.',
        ctaConvert: 'Convert Now',
        heroTitle1: 'Free Image Converter',
        heroTitle2: '& Background ',
        heroTitle3: 'Remover',
        heroDesc: 'Convert your images securely and at high speed using our powerful server infrastructure. Files are permanently deleted after processing.',
        heroCta: 'Get Started',
        dropzoneTitle: 'Drag & Drop Images Here',
        dropzoneSubtitle: 'or click to browse from your computer',
        whyTitle: 'Why Choose WebImgConverter?',
        whyDesc: 'Professional tools built for modern workflows.',
        features: [
            { icon: 'privacy', title: 'Total Privacy', description: 'All processing happens on our secure servers in compliance with privacy policies and files are deleted instantly.' },
            { icon: 'speed', title: 'Server Speed', description: 'High performance and uninterrupted processing with our dedicated server infrastructure.' },
            { icon: 'security', title: 'High Security', description: 'Designed from the ground up with a secure, transparent, and fully auditable modern architecture.' },
            { icon: 'optimization', title: 'Smart Optimization', description: 'Smart compression algorithms that minimize file size without compromising image quality.' }
        ],
        toolsTitle: 'Featured Tools',
        toolsDesc: 'Get started instantly with our most popular conversion and processing tools.',
        toolsExplore: 'Explore all tools',
        tools: [
            { name: 'HEIC → JPG', path: '/heic-to-jpg', desc: 'Convert iPhone photos to universal JPG format' },
            { name: 'PNG → JPG', path: '/png-to-jpg', desc: 'Reduce PNG file size' },
            { name: 'WebP → JPG', path: '/webp-to-jpg', desc: 'Ensure universal compatibility' },
            { name: 'Background Remover', path: '/remove-background', desc: 'AI-powered background removal' },
            { name: 'Image Compressor', path: '/compress-image', desc: 'Smart lossless compression' },
            { name: 'Image Resizer', path: '/resize-image', desc: 'Resize images by exact pixel dimensions' }
        ],
        finalTitle: 'Ready to Convert Images?',
        finalDesc: 'Free tools, no sign up required. You can upgrade to Pro for batch processing and advanced features.',
        finalCta1: 'Start for Free',
        finalCta2: 'View Pricing',
        quickConvertTitle: 'File Selected',
        quickConvertFormatLabel: 'Target Format',
        quickConvertBtn: 'Convert Now',
        quickConvertingBtn: 'Converting...',
        quickConvertSuccessBtn: 'Converted (Download Again)',
        quickConvertAdvanced: 'Go to Detailed Tool for advanced settings & batch processing →',
        quickConvertCancel: 'Cancel'
    },
    de: {
        metaTitle: 'WebImgConverter — Sichere, schnelle und lokale Bildverarbeitung.',
        metaDesc: 'Konvertieren Sie HEIC, WebP, PNG, AVIF sofort. Hintergrundentfernung, Komprimierung und KI-Tools werden sicher auf unseren Servern verarbeitet.',
        ctaConvert: 'Jetzt Konvertieren',
        heroTitle1: 'Kostenloser Bildkonverter',
        heroTitle2: '& Hintergrund',
        heroTitle3: 'entferner',
        heroDesc: 'Konvertieren Sie Ihre Bilder sicher und mit hoher Geschwindigkeit über unsere leistungsstarke Serverinfrastruktur.',
        heroCta: 'Jetzt Starten',
        dropzoneTitle: 'Bilder hierher ziehen',
        dropzoneSubtitle: 'oder klicken, um vom Computer auszuwählen',
        whyTitle: 'Warum WebImgConverter wählen?',
        whyDesc: 'Professionelle Werkzeuge für moderne Arbeitsabläufe.',
        features: [
            { icon: 'privacy', title: 'Absolute Privatsphäre', description: 'Die gesamte Verarbeitung erfolgt auf unseren sicheren Servern und Dateien werden sofort gelöscht.' },
            { icon: 'speed', title: 'Servergeschwindigkeit', description: 'Hohe Leistung mit unserer dedizierten Serverinfrastruktur.' },
            { icon: 'security', title: 'Hohe Sicherheit', description: 'Von Grund auf mit einer sicheren, transparenten und vollständig überprüfbaren modernen Architektur entwickelt.' },
            { icon: 'optimization', title: 'Smarte Optimierung', description: 'Intelligente Komprimierungsalgorithmen, die die Dateigröße ohne Qualitätsverlust minimieren.' }
        ],
        toolsTitle: 'Beliebte Werkzeuge',
        toolsDesc: 'Starten Sie sofort mit unseren beliebtesten Konvertierungs- und Verarbeitungstools.',
        toolsExplore: 'Alle Werkzeuge entdecken',
        tools: [
            { name: 'HEIC → JPG', path: '/heic-to-jpg', desc: 'Konvertieren Sie iPhone-Fotos in JPG' },
            { name: 'PNG → JPG', path: '/png-to-jpg', desc: 'PNG-Dateigröße reduzieren' },
            { name: 'WebP → JPG', path: '/webp-to-jpg', desc: 'Universelle Kompatibilität sicherstellen' },
            { name: 'Hintergrundentferner', path: '/remove-background', desc: 'KI-gestützte Hintergrundentfernung' },
            { name: 'Bildkomprimierer', path: '/compress-image', desc: 'Intelligente verlustfreie Komprimierung' },
            { name: 'Bildgrößenänderer', path: '/resize-image', desc: 'Ändern Sie die Bildgröße nach genauen Pixelmaßen' }
        ],
        finalTitle: 'Bereit, Bilder zu konvertieren?',
        finalDesc: 'Kostenlose Tools, keine Anmeldung erforderlich. Sie können auf Pro upgraden für Stapelverarbeitung und erweiterte Funktionen.',
        finalCta1: 'Kostenlos starten',
        finalCta2: 'Preise ansehen',
        quickConvertTitle: 'Datei ausgewählt',
        quickConvertFormatLabel: 'Zielformat',
        quickConvertBtn: 'Jetzt konvertieren',
        quickConvertingBtn: 'Konvertiert...',
        quickConvertSuccessBtn: 'Konvertiert (Erneut herunterladen)',
        quickConvertAdvanced: 'Zum erweiterten Tool für Stapelverarbeitung & Einstellungen →',
        quickConvertCancel: 'Abbrechen'
    },
    fr: {
        metaTitle: 'WebImgConverter — Traitement d\'images sécurisé, rapide et local.',
        metaDesc: 'Convertissez instantanément les fichiers HEIC, WebP, PNG, AVIF. Suppression d\'arrière-plan, compression et outils IA traités localement.',
        ctaConvert: 'Convertir',
        heroTitle1: 'Convertisseur d\'Image',
        heroTitle2: '& Suppresseur ',
        heroTitle3: 'de Fond',
        heroDesc: 'Plus de téléchargements ! Convertissez vos images en toute sécurité sans que vos données ne quittent votre appareil, grâce aux performances WebAssembly.',
        heroCta: 'Commencer',
        dropzoneTitle: 'Glissez et déposez vos images ici',
        dropzoneSubtitle: 'ou cliquez pour parcourir votre ordinateur',
        whyTitle: 'Pourquoi choisir WebImgConverter?',
        whyDesc: 'Outils professionnels conçus pour les flux de travail modernes.',
        features: [
            { icon: 'privacy', title: 'Confidentialité Totale', description: 'Vos fichiers ne quittent jamais votre appareil. Tout le traitement se fait directement avec la puissance de calcul de votre navigateur.' },
            { icon: 'speed', title: 'Vitesse WASM', description: 'Haute performance à la vitesse d\'une application native dans votre navigateur avec l\'infrastructure WebAssembly.' },
            { icon: 'security', title: 'Haute Sécurité', description: 'Conçu dès le départ avec une architecture moderne sécurisée, transparente et auditable.' },
            { icon: 'optimization', title: 'Optimisation Intelligente', description: 'Algorithmes de compression intelligents qui minimisent la taille du fichier sans compromettre la qualité.' }
        ],
        toolsTitle: 'Outils Populaires',
        toolsDesc: 'Commencez instantanément avec nos outils de conversion et de traitement les plus populaires.',
        toolsExplore: 'Découvrir tous les outils',
        tools: [
            { name: 'HEIC → JPG', path: '/heic-to-jpg', desc: 'Convertir les photos iPhone en JPG universel' },
            { name: 'PNG → JPG', path: '/png-to-jpg', desc: 'Réduire la taille du fichier PNG' },
            { name: 'WebP → JPG', path: '/webp-to-jpg', desc: 'Assurer une compatibilité universelle' },
            { name: 'Suppresseur de Fond', path: '/remove-background', desc: 'Suppression d\'arrière-plan par IA' },
            { name: 'Compresseur d\'Image', path: '/compress-image', desc: 'Compression intelligente sans perte' },
            { name: 'Redimensionneur', path: '/resize-image', desc: 'Redimensionner par dimensions exactes en pixels' }
        ],
        finalTitle: 'Prêt à convertir des images?',
        finalDesc: 'Outils gratuits, aucune inscription requise. Passez à Pro pour le traitement par lots et les fonctionnalités avancées.',
        finalCta1: 'Démarrer gratuitement',
        finalCta2: 'Voir les prix',
        quickConvertTitle: 'Fichier sélectionné',
        quickConvertFormatLabel: 'Format cible',
        quickConvertBtn: 'Convertir',
        quickConvertingBtn: 'Conversion...',
        quickConvertSuccessBtn: 'Converti (Télécharger à nouveau)',
        quickConvertAdvanced: 'Outil détaillé pour les paramètres avancés et le traitement par lots →',
        quickConvertCancel: 'Annuler'
    }
};

type LangKey = keyof typeof content;

export default function HomePage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.tr;
    const navigate = useNavigate();
    const localizedPath = useLocalizedPath();
    const [homeFiles, setHomeFiles] = useState<File[]>([]);
    const [targetFormat, setTargetFormat] = useState<OutputFormat>('jpg');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionSuccess, setConversionSuccess] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleFiles = (files: File[]) => {
        setHomeFiles(files);
        setConversionSuccess(false);
    };

    if (showAdvanced && homeFiles.length > 0) {
        return <App initialFiles={homeFiles} />;
    }

    // Determine if the user has enough credits
    const statsStr = localStorage.getItem('WebImgConverterStats');
    let currentCredits = MAX_FREE_CREDITS;
    let isPremium = false;
    
    if (statsStr) {
        try {
            const parsed = JSON.parse(statsStr);
            const today = new Date().toISOString().split('T')[0];
            if (parsed.lastResetDate !== today) {
                currentCredits = MAX_FREE_CREDITS;
            } else {
                currentCredits = parsed.credits;
            }
            isPremium = parsed.isPremium || parsed.premiumTier === 'business';
        } catch (e) { }
    }
    
    const hasEnoughCredits = isPremium || currentCredits >= homeFiles.length;

    return (
        <SiteShell bg="white" onCta={() => navigate(localizedPath('/tools'))} ctaLabel={t.ctaConvert}>
            <Helmet>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
                <link rel="canonical" href="https://webimgconverter.com/" />
            </Helmet>
            <HomePageSchema />

            {/* Hero */}
            <section className="bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Left: Heading + CTA */}
                        <div>
                            <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                                {t.heroTitle1}<br />
                                {t.heroTitle2}{' '}
                                <span className="text-brand-500 italic font-extrabold">{t.heroTitle3}</span>
                            </h1>
                            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                                {t.heroDesc}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button onClick={() => navigate(localizedPath('/app'))} size="lg">
                                    {t.heroCta}
                                </Button>
                            </div>
                        </div>

                        {/* Right: Dropzone teaser */}
                        <div className="min-h-[400px] flex flex-col justify-center">
                            {homeFiles.length === 0 ? (
                                <ToolDropzone
                                    onFiles={handleFiles}
                                    title={t.dropzoneTitle}
                                    subtitle={t.dropzoneSubtitle}
                                />
                            ) : (
                                <div className="bg-white/80 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl border border-white/40 dark:border-slate-700/50 p-8 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 dark:from-brand-900/20 to-white/10 dark:to-transparent pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                                                    {homeFiles.length > 1 ? `${homeFiles.length} ${t.quickConvertTitle.replace('1', '')}` : t.quickConvertTitle}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]">{homeFiles[0].name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-8">
                                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{t.quickConvertFormatLabel}</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['jpg', 'png', 'webp', 'avif'].map(fmt => (
                                                    <button 
                                                        key={fmt}
                                                        onClick={() => setTargetFormat(fmt as OutputFormat)}
                                                        className={`py-2.5 rounded-xl text-sm font-bold uppercase transition-all ${targetFormat === fmt ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-105' : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500'}`}
                                                    >
                                                        {fmt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <Button 
                                            fullWidth 
                                            size="lg"
                                            onClick={async () => {
                                                if (!hasEnoughCredits) {
                                                    alert(activeLang === 'tr' ? 'Yetersiz kredi! Lütfen daha fazla kredi için giriş yapın veya Premium alın.' : 'Insufficient credits! Please log in or upgrade to Premium.');
                                                    navigate(localizedPath('/pricing'));
                                                    return;
                                                }

                                                setIsConverting(true);
                                                try {
                                                    // Convert all files if multiple were dropped
                                                    for (const file of homeFiles) {
                                                        const result = await convertImage(file, {
                                                            targetFormat,
                                                            quality: 90,
                                                            lockAspectRatio: true,
                                                            removeMetadata: true
                                                        });
                                                        downloadBlob(result.blob, buildOutputName(file.name, targetFormat));
                                                    }
                                                    setConversionSuccess(true);
                                                    
                                                    // Deduct credits
                                                    if (!isPremium) {
                                                        const newCredits = Math.max(0, currentCredits - homeFiles.length);
                                                        const today = new Date().toISOString().split('T')[0];
                                                        const newStats = statsStr ? JSON.parse(statsStr) : {};
                                                        newStats.credits = newCredits;
                                                        newStats.lastResetDate = today;
                                                        localStorage.setItem('WebImgConverterStats', JSON.stringify(newStats));
                                                    }
                                                } catch(e) {
                                                    alert('Error: ' + (e as Error).message);
                                                } finally {
                                                    setIsConverting(false);
                                                }
                                            }}
                                            disabled={isConverting || !hasEnoughCredits}
                                        >
                                            {isConverting ? t.quickConvertingBtn : (!hasEnoughCredits ? (activeLang === 'tr' ? 'Kredi Yetersiz' : 'No Credits') : (conversionSuccess ? t.quickConvertSuccessBtn : t.quickConvertBtn))}
                                        </Button>

                                        <div className="mt-6 flex flex-col gap-3 text-center">
                                            <button onClick={() => setShowAdvanced(true)} className="text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                                                {t.quickConvertAdvanced}
                                            </button>
                                            <button onClick={() => { setHomeFiles([]); setConversionSuccess(false); }} className="text-xs text-slate-400 font-semibold hover:text-slate-600 transition-colors">
                                                {t.quickConvertCancel}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Ad Banner 1: After Hero */}
            <div className="max-w-4xl mx-auto px-5 mb-10">
                <AdsterraNativeBanner />
            </div>

            {/* Why Choose WebImgConverter */}
            <section className="bg-slate-50/40 dark:bg-slate-800/30 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                            {t.whyTitle}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t.whyDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {t.features.map((f, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 shadow-card">
                                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                                    {ICONS[f.icon as keyof typeof ICONS]}
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1.5">{f.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured tools */}
            <section className="bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
                    <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                                {t.toolsTitle}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{t.toolsDesc}</p>
                        </div>
                        <Link to={localizedPath('/tools')} className="text-sm font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1.5">
                            {t.toolsExplore}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {t.tools.map((tool, i) => (
                            <Link
                                key={tool.path}
                                to={localizedPath(tool.path === '/heic-to-jpg' ? '/heic-converter' : tool.path === '/png-to-jpg' ? '/png-converter' : tool.path === '/webp-to-jpg' ? '/webp-converter' : tool.path)}
                                className="group block bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-card-hover transition-all"
                            >
                                <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-1 group-hover:text-brand-600 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ad Banner 2: Before CTA */}
            <div className="max-w-4xl mx-auto px-5 mt-4 mb-14">
                <AdsterraNativeBanner />
            </div>

            {/* Final CTA Band */}
            <section className="bg-white dark:bg-slate-900">
                <div className="max-w-5xl mx-auto px-5 md:px-8 pb-14 md:pb-20">
                    <div className="bg-slate-900 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
                        <div className="relative">
                            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-4">
                                {t.finalTitle}
                            </h2>
                            <p className="text-sm md:text-base text-slate-300 mb-8 max-w-md mx-auto">
                                {t.finalDesc}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <Button onClick={() => navigate(localizedPath('/tools'))} size="lg">
                                    {t.finalCta1}
                                </Button>
                                <Button onClick={() => navigate(localizedPath('/pricing'))} variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                    {t.finalCta2}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
