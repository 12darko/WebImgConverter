import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'AVIF Dönüştürücü — JPG, PNG, WebP\'ye Çevir | WebImgConverter',
        description: 'AVIF görsellerinizi JPG, PNG veya WebP formatına dönüştürün. Her yerde açılabilir formatlara tek tıkla geçin.',
        h1: 'AVIF Dönüştürücü',
        feature1: 'Çoklu Format', feature1Desc: 'AVIF dosyalarınızı JPG, PNG veya WebP\'ye tek bir araçla dönüştürün.',
        feature2: 'Evrensel Uyumluluk', feature2Desc: 'AVIF desteği olmayan tarayıcı ve programlarda açılabilir formatlara geçin.',
        feature3: 'Kalite Koruması', feature3Desc: 'AVIF\'in yüksek kalitesini hedef formata en az kayıpla aktarın.',
        howTo: 'AVIF Nasıl Dönüştürülür?',
        step1: 'AVIF Yükle', step1Desc: 'Dosyalarınızı sürükleyin.',
        step2: 'Format Seç', step2Desc: 'JPG, PNG veya WebP.',
        step3: 'İndir', step3Desc: 'Dönüştürülmüş dosyayı alın.'
    },
    en: {
        title: 'AVIF Converter — Convert to JPG, PNG, WebP | WebImgConverter',
        description: 'Convert your AVIF images to JPG, PNG, or WebP format. Switch to universally supported formats with one click.',
        h1: 'AVIF Converter',
        feature1: 'Multiple Formats', feature1Desc: 'Convert your AVIF files to JPG, PNG, or WebP with a single tool.',
        feature2: 'Universal Compatibility', feature2Desc: 'Switch to formats supported by all browsers and programs.',
        feature3: 'Quality Preserved', feature3Desc: 'Transfer AVIF\'s high quality to the target format with minimal loss.',
        howTo: 'How to Convert AVIF?',
        step1: 'Upload AVIF', step1Desc: 'Drag & drop your files.',
        step2: 'Choose Format', step2Desc: 'JPG, PNG, or WebP.',
        step3: 'Download', step3Desc: 'Get your converted file.'
    },
    de: {
        title: 'AVIF Konverter — In JPG, PNG, WebP Umwandeln | WebImgConverter',
        description: 'Konvertieren Sie Ihre AVIF-Bilder in JPG, PNG oder WebP. Wechseln Sie mit einem Klick zu universal unterstützten Formaten.',
        h1: 'AVIF Konverter',
        feature1: 'Mehrere Formate', feature1Desc: 'Konvertieren Sie AVIF-Dateien in JPG, PNG oder WebP mit einem einzigen Tool.',
        feature2: 'Universelle Kompatibilität', feature2Desc: 'Wechseln Sie zu Formaten, die von allen Browsern unterstützt werden.',
        feature3: 'Qualität Bewahrt', feature3Desc: 'Übertragen Sie die hohe Qualität von AVIF mit minimalem Verlust.',
        howTo: 'Wie konvertiert man AVIF?',
        step1: 'AVIF hochladen', step1Desc: 'Dateien hierher ziehen.',
        step2: 'Format wählen', step2Desc: 'JPG, PNG oder WebP.',
        step3: 'Herunterladen', step3Desc: 'Konvertierte Datei erhalten.'
    },
    fr: {
        title: 'Convertisseur AVIF — Convertir en JPG, PNG, WebP | WebImgConverter',
        description: 'Convertissez vos images AVIF en JPG, PNG ou WebP. Passez aux formats universels en un clic.',
        h1: 'Convertisseur AVIF',
        feature1: 'Formats Multiples', feature1Desc: 'Convertissez vos fichiers AVIF en JPG, PNG ou WebP avec un seul outil.',
        feature2: 'Compatibilité Universelle', feature2Desc: 'Passez aux formats supportés par tous les navigateurs et logiciels.',
        feature3: 'Qualité Préservée', feature3Desc: 'Transférez la haute qualité d\'AVIF avec une perte minimale.',
        howTo: 'Comment convertir du AVIF ?',
        step1: 'Importer AVIF', step1Desc: 'Glissez-déposez vos fichiers.',
        step2: 'Choisir Format', step2Desc: 'JPG, PNG ou WebP.',
        step3: 'Télécharger', step3Desc: 'Obtenez votre fichier converti.'
    }
};

type LangKey = keyof typeof seoContent;

export default function AvifConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/avif-converter" />
            </Helmet>
            <App
                defaultTool="avif-converter"
                pageH1={t.h1}
                acceptTypes="image/avif,.avif"
                formatBadges={['AVIF', '→', 'JPG / PNG / WebP']}
                defaultOutputFormat="jpg"
                hideFormatSelector={false}
                allowedSettings={['format', 'quality', 'maxKb', 'grayscale']}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">{t.howTo}</h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">1</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step1}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step1Desc}</p>
                            </div>
                            <div className="hidden md:block w-full h-0.5 bg-brand-200 dark:bg-brand-800 absolute top-1/2 -translate-y-1/2 -z-0"></div>
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">2</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step2}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step2Desc}</p>
                            </div>
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">3</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step3}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step3Desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <SeoContent pageType="avif-converter" />
            </App>
        </>
    );
}
