import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'WebP Dönüştürücü — JPG, PNG\'ye Çevir | WebImgConverter',
        description: 'WebP görsellerinizi tek tıkla JPG veya PNG formatına dönüştürün. Toplu dönüştürme, yüksek kalite, ücretsiz.',
        h1: 'WebP Dönüştürücü',
        feature1: 'JPG veya PNG', feature1Desc: 'WebP dosyanızı istediğiniz çıktı formatına anında çevirin.',
        feature2: 'Toplu İşlem', feature2Desc: 'Yüzlerce WebP dosyasını tek seferde dönüştürün, vakit kaybetmeyin.',
        feature3: 'Sıfır Kalite Kaybı', feature3Desc: 'Akıllı algoritmalarla görsel bozulmadan format değiştirin.',
        howTo: 'WebP Nasıl Dönüştürülür?',
        step1: 'WebP Yükle', step1Desc: 'Dosyalarınızı sürükleyin.',
        step2: 'Format Seç', step2Desc: 'JPG veya PNG seçin.',
        step3: 'İndir', step3Desc: 'Dönüştürülmüş dosyayı alın.'
    },
    en: {
        title: 'WebP Converter — Convert to JPG, PNG | WebImgConverter',
        description: 'Convert your WebP images to JPG or PNG format with one click. Batch conversion, high quality, free.',
        h1: 'WebP Converter',
        feature1: 'JPG or PNG', feature1Desc: 'Instantly convert your WebP files to your desired output format.',
        feature2: 'Batch Processing', feature2Desc: 'Convert hundreds of WebP files at once without wasting time.',
        feature3: 'Zero Quality Loss', feature3Desc: 'Change formats without visible quality degradation using smart algorithms.',
        howTo: 'How to Convert WebP?',
        step1: 'Upload WebP', step1Desc: 'Drag & drop your files.',
        step2: 'Choose Format', step2Desc: 'Select JPG or PNG.',
        step3: 'Download', step3Desc: 'Get your converted file.'
    },
    de: {
        title: 'WebP Konverter — In JPG, PNG Umwandeln | WebImgConverter',
        description: 'Konvertieren Sie Ihre WebP-Bilder mit einem Klick in JPG oder PNG. Stapelkonvertierung, hohe Qualität, kostenlos.',
        h1: 'WebP Konverter',
        feature1: 'JPG oder PNG', feature1Desc: 'Konvertieren Sie Ihre WebP-Dateien sofort in Ihr gewünschtes Format.',
        feature2: 'Stapelverarbeitung', feature2Desc: 'Konvertieren Sie hunderte WebP-Dateien auf einmal.',
        feature3: 'Null Qualitätsverlust', feature3Desc: 'Formatwechsel ohne sichtbare Qualitätsminderung.',
        howTo: 'Wie konvertiert man WebP?',
        step1: 'WebP hochladen', step1Desc: 'Dateien hierher ziehen.',
        step2: 'Format wählen', step2Desc: 'JPG oder PNG wählen.',
        step3: 'Herunterladen', step3Desc: 'Konvertierte Datei erhalten.'
    },
    fr: {
        title: 'Convertisseur WebP — Convertir en JPG, PNG | WebImgConverter',
        description: 'Convertissez vos images WebP en JPG ou PNG en un clic. Conversion par lots, haute qualité, gratuit.',
        h1: 'Convertisseur WebP',
        feature1: 'JPG ou PNG', feature1Desc: 'Convertissez instantanément vos fichiers WebP dans le format de votre choix.',
        feature2: 'Traitement par Lots', feature2Desc: 'Convertissez des centaines de fichiers WebP en une seule fois.',
        feature3: 'Zéro Perte de Qualité', feature3Desc: 'Changez de format sans dégradation visible de la qualité.',
        howTo: 'Comment convertir du WebP ?',
        step1: 'Importer WebP', step1Desc: 'Glissez-déposez vos fichiers.',
        step2: 'Choisir Format', step2Desc: 'Sélectionnez JPG ou PNG.',
        step3: 'Télécharger', step3Desc: 'Obtenez votre fichier converti.'
    }
};

type LangKey = keyof typeof seoContent;

export default function WebpConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/webp-converter" />
            </Helmet>
            <App
                defaultTool="webp-converter"
                pageH1={t.h1}
                acceptTypes="image/webp,.webp"
                formatBadges={['WEBP', '→', 'JPG / PNG']}
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
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
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
                <SeoContent pageType="webp-converter" />
            </App>
        </>
    );
}
