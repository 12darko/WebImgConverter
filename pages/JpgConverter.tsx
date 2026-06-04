import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'JPG Dönüştürücü — PNG, WebP\'ye Çevir | WebImgConverter',
        description: 'JPG/JPEG görsellerinizi tek tıkla PNG veya WebP formatına dönüştürün. Toplu dönüştürme, yüksek kalite, ücretsiz.',
        h1: 'JPG / JPEG Dönüştürücü',
        feature1: 'PNG veya WebP', feature1Desc: 'JPG dosyanızı şeffaf PNG\'ye veya modern WebP formatına çevirin.',
        feature2: 'Toplu İşlem', feature2Desc: 'Onlarca JPG dosyasını tek seferde istediğiniz formata dönüştürün.',
        feature3: 'Modern Formatlar', feature3Desc: 'WebP ile %30 daha küçük dosyalar veya PNG ile şeffaf arka plan elde edin.',
        howTo: 'JPG Nasıl Dönüştürülür?',
        step1: 'JPG Yükle', step1Desc: 'Dosyalarınızı sürükleyin.',
        step2: 'Format Seç', step2Desc: 'PNG veya WebP seçin.',
        step3: 'İndir', step3Desc: 'Dönüştürülmüş dosyayı alın.'
    },
    en: {
        title: 'JPG Converter — Convert to PNG, WebP | WebImgConverter',
        description: 'Convert your JPG/JPEG images to PNG or WebP format with one click. Batch conversion, high quality, free.',
        h1: 'JPG / JPEG Converter',
        feature1: 'PNG or WebP', feature1Desc: 'Convert your JPG files to transparent PNG or modern WebP format.',
        feature2: 'Batch Processing', feature2Desc: 'Convert dozens of JPG files to your desired format at once.',
        feature3: 'Modern Formats', feature3Desc: 'Get 30% smaller files with WebP or transparent backgrounds with PNG.',
        howTo: 'How to Convert JPG?',
        step1: 'Upload JPG', step1Desc: 'Drag & drop your files.',
        step2: 'Choose Format', step2Desc: 'Select PNG or WebP.',
        step3: 'Download', step3Desc: 'Get your converted file.'
    },
    de: {
        title: 'JPG Konverter — In PNG, WebP Umwandeln | WebImgConverter',
        description: 'Konvertieren Sie Ihre JPG/JPEG-Bilder mit einem Klick in PNG oder WebP. Stapelkonvertierung, hohe Qualität, kostenlos.',
        h1: 'JPG / JPEG Konverter',
        feature1: 'PNG oder WebP', feature1Desc: 'Konvertieren Sie Ihre JPG-Dateien in transparentes PNG oder modernes WebP.',
        feature2: 'Stapelverarbeitung', feature2Desc: 'Konvertieren Sie dutzende JPG-Dateien auf einmal.',
        feature3: 'Moderne Formate', feature3Desc: '30% kleinere Dateien mit WebP oder transparente Hintergründe mit PNG.',
        howTo: 'Wie konvertiert man JPG?',
        step1: 'JPG hochladen', step1Desc: 'Dateien hierher ziehen.',
        step2: 'Format wählen', step2Desc: 'PNG oder WebP wählen.',
        step3: 'Herunterladen', step3Desc: 'Konvertierte Datei erhalten.'
    },
    fr: {
        title: 'Convertisseur JPG — Convertir en PNG, WebP | WebImgConverter',
        description: 'Convertissez vos images JPG/JPEG en PNG ou WebP en un clic. Conversion par lots, haute qualité, gratuit.',
        h1: 'Convertisseur JPG / JPEG',
        feature1: 'PNG ou WebP', feature1Desc: 'Convertissez vos fichiers JPG en PNG transparent ou en WebP moderne.',
        feature2: 'Traitement par Lots', feature2Desc: 'Convertissez des dizaines de fichiers JPG en une seule fois.',
        feature3: 'Formats Modernes', feature3Desc: 'Fichiers 30% plus petits avec WebP ou fonds transparents avec PNG.',
        howTo: 'Comment convertir du JPG ?',
        step1: 'Importer JPG', step1Desc: 'Glissez-déposez vos fichiers.',
        step2: 'Choisir Format', step2Desc: 'Sélectionnez PNG ou WebP.',
        step3: 'Télécharger', step3Desc: 'Obtenez votre fichier converti.'
    }
};

type LangKey = keyof typeof seoContent;

export default function JpgConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/jpg-converter" />
            </Helmet>
            <App
                defaultTool="jpg-converter"
                pageH1={t.h1}
                acceptTypes="image/jpeg,.jpg,.jpeg"
                formatBadges={['JPG', '→', 'PNG / WebP']}
                defaultOutputFormat="png"
                hideFormatSelector={false}
                allowedSettings={['format', 'quality', 'maxKb', 'grayscale']}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
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
                            <div className="text-4xl mb-4">🌐</div>
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
                <SeoContent pageType="jpg-converter" />
            </App>
        </>
    );
}
