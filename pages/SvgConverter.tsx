import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'SVG Dönüştürücü - JPG, PNG, WebP Yap | WebImgConverter',
        description: 'Vektör SVG dosyalarınızı kolayca JPG, PNG veya WebP formatına çevirin. Çözünürlük kaybı olmadan şeffaflığı korur.',
        h1: 'SVG Dönüştürücü',
        feature1: 'Ölçeklenebilir Çıktı', feature1Desc: 'Vektörleri dilediğiniz boyutta yüksek kaliteli raster görsellere dönüştürün.',
        feature2: 'Şeffaflık Desteği', feature2Desc: 'Orijinal SVG şeffaflığı dönüştürülen dosyada tam olarak korunur.',
        feature3: 'Tarayıcı Uyumluluğu', feature3Desc: 'Modern tarayıcılarda sorunsuz ve hızlı dönüştürme işlemi.',
        howTo: 'SVG Nasıl Dönüştürülür?',
        step1: 'SVG Yükle', step1Desc: 'Dosyaları seçin.',
        step2: 'Format Seç', step2Desc: 'JPG, PNG veya WebP seçin.',
        step3: 'Kaydet', step3Desc: 'Yeni dosyayı indirin.'
    },
    en: {
        title: 'SVG Converter - Convert to JPG, PNG, WebP | WebImgConverter',
        description: 'Easily convert vector SVG files to high-resolution JPG, PNG, or WebP format. Preserves transparency without quality loss.',
        h1: 'SVG Converter',
        feature1: 'Scalable Output', feature1Desc: 'Convert vectors into high-quality images at any dimension you desire.',
        feature2: 'Transparency Support', feature2Desc: 'Original SVG transparency is perfectly retained in the converted file.',
        feature3: 'Browser Compatibility', feature3Desc: 'Seamless and fast conversion process across all modern browsers.',
        howTo: 'How to Convert SVG?',
        step1: 'Upload SVG', step1Desc: 'Select files.',
        step2: 'Choose Format', step2Desc: 'Select JPG, PNG, or WebP.',
        step3: 'Save', step3Desc: 'Download new file.'
    },
    de: {
        title: 'SVG Konverter - in JPG, PNG, WebP | WebImgConverter',
        description: 'Vektor-SVG-Dateien einfach in JPG, PNG oder WebP konvertieren. Bewahrt Transparenz ohne Qualitätsverlust.',
        h1: 'SVG Konverter',
        feature1: 'Skalierbare Ausgabe', feature1Desc: 'Konvertieren Sie Vektoren in hochwertige Bilder in jeder gewünschten Größe.',
        feature2: 'Transparenz', feature2Desc: 'Die ursprüngliche SVG-Transparenz bleibt erhalten.',
        feature3: 'Browser-Kompatibilität', feature3Desc: 'Nahtlose und schnelle Konvertierung.',
        howTo: 'Wie konvertiert man SVG?',
        step1: 'SVG hochladen', step1Desc: 'Dateien auswählen.',
        step2: 'Format wählen', step2Desc: 'JPG, PNG oder WebP wählen.',
        step3: 'Speichern', step3Desc: 'Neue Datei herunterladen.'
    },
    fr: {
        title: 'Convertisseur SVG - en JPG, PNG, WebP | WebImgConverter',
        description: 'Convertissez des fichiers SVG vectoriels en JPG, PNG ou WebP. Préserve la transparence sans perte de qualité.',
        h1: 'Convertisseur SVG',
        feature1: 'Sortie Évolutive', feature1Desc: 'Convertissez des vecteurs en images de haute qualité à n\'importe quelle dimension.',
        feature2: 'Transparence', feature2Desc: 'La transparence SVG d\'origine est conservée.',
        feature3: 'Compatibilité Navigateur', feature3Desc: 'Processus de conversion transparent et rapide.',
        howTo: 'Comment convertir un SVG ?',
        step1: 'Télécharger SVG', step1Desc: 'Sélectionnez des fichiers.',
        step2: 'Choisir Format', step2Desc: 'Sélectionnez JPG, PNG ou WebP.',
        step3: 'Enregistrer', step3Desc: 'Télécharger le fichier.',
        dropzoneTitle: 'Déposez votre SVG ici',
        dropzoneDesc: 'Ou cliquez pour choisir des fichiers'
    }
};

type LangKey = keyof typeof seoContent;

export default function SvgConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/svg-converter" />
            </Helmet>
            <App
                defaultTool="convert"
                pageH1={t.h1}
                acceptTypes=".svg"
                formatBadges={['SVG', '→', 'JPG / PNG / WebP']}
                defaultOutputFormat="png"
                allowedSettings={['format', 'quality', 'maxKb', 'grayscale']}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">
                            {t.howTo}
                        </h2>
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
                <SeoContent pageType="svg-converter" />
            </App>
        </>
    );
}
