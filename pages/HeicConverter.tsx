import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';
import { useLanguage } from '../LanguageContext';

const seoContent = {
    tr: {
        title: 'HEIC Dönüştürücü - Ücretsiz Online | WebImgConverter',
        description: 'iPhone HEIC fotoğraflarını saniyeler içinde JPG, PNG veya WebP formatına dönüştürün. Çoklu format desteği.',
        h1: 'HEIC Dönüştürücü',
    },
    en: {
        title: 'Free HEIC Converter Online | WebImgConverter',
        description: 'Convert iPhone HEIC photos to JPG, PNG, or WebP format in seconds. Multi-format support.',
        h1: 'HEIC Converter',
    },
    de: {
        title: 'Kostenloser HEIC Konverter Online | WebImgConverter',
        description: 'Konvertieren Sie iPhone HEIC-Fotos in JPG, PNG oder WebP. Mehrformat-Unterstützung.',
        h1: 'HEIC Konverter',
    },
    fr: {
        title: 'Convertisseur HEIC Gratuit en Ligne | WebImgConverter',
        description: 'Convertissez vos photos iPhone HEIC en JPG, PNG ou WebP en quelques secondes.',
        h1: 'Convertisseur HEIC',
    },
};

const richContent = {
    tr: {
        features: [
            { icon: '📱', title: 'iPhone Uyumlu', desc: 'iOS 11+ cihazlarda çekilen tüm HEIC/HEIF fotoğrafları saniyede JPG\'ye dönüştürün.' },
            { icon: '⚡', title: 'Toplu Dönüştürme', desc: 'Tek seferde 100+ HEIC dosyasını yükleyin ve hepsini JPG\'ye çevirin.' },
            { icon: '🎨', title: 'Kalite Koruma', desc: 'Akıllı sıkıştırma ile görsel kalitesini %100 korurken dosya boyutunu optimize edin.' },
        ],
        howToTitle: 'HEIC Nasıl JPG\'ye Çevrilir?',
        steps: [
            { num: 1, title: 'HEIC Yükle', desc: 'iPhone fotoğraflarınızı sürükleyin.' },
            { num: 2, title: 'Dönüştür', desc: 'Otomatik JPG\'ye çevrilir.' },
            { num: 3, title: 'İndir', desc: 'JPG dosyalarınızı indirin.' },
        ],
        whyTitle: 'Neden HEIC\'i JPG\'ye Çevirmelisiniz?',
        whyText: 'HEIC (High Efficiency Image Container), Apple\'ın iOS 11\'den itibaren kullandığı modern görsel formatıdır. HEIC, JPG\'ye kıyasla %50\'ye varan alan tasarrufu sağlar ancak Windows, Android ve birçok uygulama tarafından desteklenmez. WebImgConverter ile iPhone fotoğraflarınızı evrensel JPG formatına dönüştürerek her yerde kullanabilirsiniz.',
        compatTitle: 'HEIC Uyumluluk Sorunları',
        compatItems: [
            'Windows Fotoğraflar uygulaması HEIC açamaz',
            'Android cihazlar HEIC desteklemez',
            'Photoshop ve GIMP için eklenti gerekir',
            'Web siteleri HEIC kabul etmez',
            'E-posta ekleri açılamayabilir',
        ],
    },
    en: {
        features: [
            { icon: '📱', title: 'iPhone Compatible', desc: 'Convert all HEIC/HEIF photos from iOS 11+ devices to JPG instantly.' },
            { icon: '⚡', title: 'Batch Convert', desc: 'Upload 100+ HEIC files at once and convert them all to JPG.' },
            { icon: '🎨', title: 'Quality Preserved', desc: 'Smart compression maintains 100% visual quality while optimizing file size.' },
        ],
        howToTitle: 'How to Convert HEIC to JPG?',
        steps: [
            { num: 1, title: 'Upload HEIC', desc: 'Drag your iPhone photos.' },
            { num: 2, title: 'Convert', desc: 'Auto-converts to JPG.' },
            { num: 3, title: 'Download', desc: 'Get your JPG files.' },
        ],
        whyTitle: 'Why Convert HEIC to JPG?',
        whyText: 'HEIC (High Efficiency Image Container) is Apple\'s modern image format used since iOS 11. While HEIC saves up to 50% storage compared to JPG, it\'s not supported by Windows, Android, and many applications. With WebImgConverter, convert your iPhone photos to universal JPG format for use anywhere.',
        compatTitle: 'HEIC Compatibility Issues',
        compatItems: [
            'Windows Photos app cannot open HEIC',
            'Android devices don\'t support HEIC',
            'Photoshop and GIMP require plugins',
            'Websites don\'t accept HEIC uploads',
            'Email attachments may not open',
        ],
    },
    de: {
        features: [
            { icon: '📱', title: 'iPhone Kompatibel', desc: 'Konvertieren Sie alle HEIC/HEIF-Fotos von iOS 11+ Geräten sofort in JPG.' },
            { icon: '⚡', title: 'Stapelverarbeitung', desc: 'Laden Sie 100+ HEIC-Dateien auf einmal hoch und konvertieren Sie alle in JPG.' },
            { icon: '🎨', title: 'Qualität Erhalten', desc: 'Intelligente Komprimierung erhält 100% visuelle Qualität bei optimierter Dateigröße.' },
        ],
        howToTitle: 'Wie konvertiert man HEIC zu JPG?',
        steps: [
            { num: 1, title: 'HEIC Hochladen', desc: 'Ziehen Sie Ihre iPhone-Fotos.' },
            { num: 2, title: 'Konvertieren', desc: 'Automatische JPG-Umwandlung.' },
            { num: 3, title: 'Herunterladen', desc: 'Laden Sie Ihre JPGs herunter.' },
        ],
        whyTitle: 'Warum HEIC zu JPG konvertieren?',
        whyText: 'HEIC (High Efficiency Image Container) ist Apples modernes Bildformat seit iOS 11. Während HEIC bis zu 50% Speicher im Vergleich zu JPG spart, wird es von Windows, Android und vielen Anwendungen nicht unterstützt. Mit WebImgConverter konvertieren Sie Ihre iPhone-Fotos in das universelle JPG-Format.',
        compatTitle: 'HEIC Kompatibilitätsprobleme',
        compatItems: [
            'Windows Fotos kann HEIC nicht öffnen',
            'Android-Geräte unterstützen HEIC nicht',
            'Photoshop und GIMP benötigen Plugins',
            'Websites akzeptieren keine HEIC-Uploads',
            'E-Mail-Anhänge können nicht geöffnet werden',
        ],
    },
    fr: {
        features: [
            { icon: '📱', title: 'Compatible iPhone', desc: 'Convertissez instantanément toutes les photos HEIC/HEIF des appareils iOS 11+.' },
            { icon: '⚡', title: 'Conversion par Lot', desc: 'Téléchargez 100+ fichiers HEIC à la fois et convertissez-les tous en JPG.' },
            { icon: '🎨', title: 'Qualité Préservée', desc: 'Compression intelligente maintenant 100% de qualité visuelle avec taille optimisée.' },
        ],
        howToTitle: 'Comment convertir HEIC en JPG?',
        steps: [
            { num: 1, title: 'Télécharger HEIC', desc: 'Glissez vos photos iPhone.' },
            { num: 2, title: 'Convertir', desc: 'Conversion auto en JPG.' },
            { num: 3, title: 'Télécharger', desc: 'Obtenez vos fichiers JPG.' },
        ],
        whyTitle: 'Pourquoi convertir HEIC en JPG?',
        whyText: 'HEIC (High Efficiency Image Container) est le format d\'image moderne d\'Apple utilisé depuis iOS 11. Bien que HEIC économise jusqu\'à 50% de stockage par rapport au JPG, il n\'est pas pris en charge par Windows, Android et de nombreuses applications. Avec WebImgConverter, convertissez vos photos iPhone au format JPG universel.',
        compatTitle: 'Problèmes de Compatibilité HEIC',
        compatItems: [
            'Windows Photos ne peut pas ouvrir HEIC',
            'Les appareils Android ne supportent pas HEIC',
            'Photoshop et GIMP nécessitent des plugins',
            'Les sites web n\'acceptent pas les uploads HEIC',
            'Les pièces jointes email peuvent ne pas s\'ouvrir',
        ],
    },
};

type LangKey = keyof typeof seoContent;

export default function HeicConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent['en'];
    const r = richContent[activeLang] || richContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/heic-converter" />
            </Helmet>
            <App
                defaultTool="convert"
                pageH1={t.h1}
                acceptTypes="image/heic,image/heif,.heic,.heif"
                formatBadges={['HEIC', '→', 'JPG / PNG / WebP']}
                defaultOutputFormat="jpg"
                allowedSettings={['format', 'quality', 'maxKb', 'grayscale', 'rotate', 'flip', 'crop']}
                hideFormatSelector={false} // Allow selecting format for server conversion
                conversionHandler={async (file) => {
                    const { serverConversionService } = await import('../services/serverConversionService');
                    return serverConversionService.convertHeic(file, 'jpg');
                }}
                dropzoneTitle={activeLang === 'tr' ? 'HEIC Dosyalarını Buraya Sürükleyin' : activeLang === 'de' ? 'HEIC-Dateien hierher ziehen' : activeLang === 'fr' ? 'Glissez les fichiers HEIC ici' : 'Drag & Drop HEIC Files Here'}
                dropzoneDesc={activeLang === 'tr' ? 'iPhone fotoğraflarınızı (HEIC/HEIF) sürükleyin veya seçin' : activeLang === 'de' ? 'Ziehen Sie Ihre iPhone-Fotos (HEIC/HEIF) oder wählen Sie sie aus' : activeLang === 'fr' ? 'Glissez vos photos iPhone (HEIC/HEIF) ou sélectionnez-les' : 'Drag and drop your iPhone photos (HEIC/HEIF) or browse to upload'}
            >
                {/* Rich Content for SEO - Feature Cards */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {r.features.map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">{r.howToTitle}</h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {r.steps.map((step, idx) => (
                                <div key={idx} className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">
                                        {step.num}
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
                                </div>
                            ))}
                            {/* Connection Line */}
                            <div className="hidden md:block w-full h-0.5 bg-brand-200 dark:bg-brand-800 absolute top-1/2 -translate-y-1/2 -z-0"></div>
                        </div>
                    </div>

                    {/* Why Convert Section */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{r.whyTitle}</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{r.whyText}</p>

                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">{r.compatTitle}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {r.compatItems.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <span className="text-rose-500 font-bold">✗</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-slate-800 dark:text-white">HEIC</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Giriş Formatı' : activeLang === 'de' ? 'Eingabeformat' : activeLang === 'fr' ? 'Format d\'entrée' : 'Input Format'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">JPG</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Çıkış Formatı' : activeLang === 'de' ? 'Ausgabeformat' : activeLang === 'fr' ? 'Format de sortie' : 'Output Format'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Toplu Dosya' : activeLang === 'de' ? 'Stapel-Dateien' : activeLang === 'fr' ? 'Fichiers par lot' : 'Batch Files'}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">0</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{activeLang === 'tr' ? 'Veri Saklama' : activeLang === 'de' ? 'Datenspeicherung' : activeLang === 'fr' ? 'Stockage de données' : 'Data Storage'}</div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="heic-converter" />
            </App>
        </>
    );
}
