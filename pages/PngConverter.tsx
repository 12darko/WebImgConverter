import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'PNG Dönüştürücü - Ücretsiz Online | WebImgConverter',
        description: 'PNG dosyalarınızı küçük boyutlu JPG, WebP veya AVIF formatına dönüştürün. Şeffaf arka planları otomatik yönetir.',
        h1: 'PNG Dönüştürücü',
        feature1: 'Çoklu Format', feature1Desc: 'PNG dosyalarınızı JPG, WebP veya AVIF\'e tek araçla dönüştürün.',
        feature2: 'Akıllı Arka Plan', feature2Desc: 'Şeffaf alanlar seçtiğiniz çıktıya göre korunur veya dönüştürülür.',
        feature3: 'Site Hızı', feature3Desc: 'Modern formatlara geçerek web sitenizi hızlandırın.',
        howTo: 'PNG Nasıl Dönüştürülür?',
        step1: 'PNG Yükle', step1Desc: 'Görselleri seçin.',
        step2: 'Format Seç', step2Desc: 'JPG, WebP veya AVIF seçin.',
        step3: 'Kaydet', step3Desc: 'Yeni dosyayı indirin.'
    },
    en: {
        title: 'Free PNG Converter Online | WebImgConverter',
        description: 'Convert PNG files to smaller JPG, WebP, or AVIF format. Smart background handling.',
        h1: 'PNG Converter',
        feature1: 'Multiple Formats', feature1Desc: 'Convert PNG to JPG, WebP, or AVIF with one tool.',
        feature2: 'Smart Background', feature2Desc: 'Transparent areas are preserved or filled smartly.',
        feature3: 'Web Speed', feature3Desc: 'Switch to modern formats to speed up your website.',
        howTo: 'How to Convert PNG?',
        step1: 'Upload PNG', step1Desc: 'Select images.',
        step2: 'Choose Format', step2Desc: 'Select JPG, WebP, or AVIF.',
        step3: 'Save', step3Desc: 'Download new file.'
    },
    de: {
        title: 'Kostenloser PNG Konverter Online | WebImgConverter',
        description: 'Konvertieren Sie PNG-Dateien in JPG, WebP oder AVIF. Intelligente Hintergrundbehandlung.',
        h1: 'PNG Konverter',
        feature1: 'Mehrere Formate', feature1Desc: 'Konvertieren Sie PNG in JPG, WebP oder AVIF.',
        feature2: 'Intelligenter Hintergrund', feature2Desc: 'Transparente Bereiche werden intelligent behandelt.',
        feature3: 'Web-Geschwindigkeit', feature3Desc: 'Wechseln Sie zu modernen Formaten für mehr Geschwindigkeit.',
        howTo: 'Wie konvertiert man PNG?',
        step1: 'PNG hochladen', step1Desc: 'Bilder auswählen.',
        step2: 'Format wählen', step2Desc: 'JPG, WebP oder AVIF.',
        step3: 'Speichern', step3Desc: 'Neue Datei herunterladen.'
    },
    fr: {
        title: 'Convertisseur PNG Gratuit en Ligne | WebImgConverter',
        description: 'Convertissez des fichiers PNG en JPG, WebP ou AVIF. Gestion intelligente du fond.',
        h1: 'Convertisseur PNG',
        feature1: 'Formats Multiples', feature1Desc: 'Convertissez PNG en JPG, WebP ou AVIF avec un seul outil.',
        feature2: 'Fond intelligent', feature2Desc: 'Les zones transparentes sont préservées intelligemment.',
        feature3: 'Vitesse Web', feature3Desc: 'Passez aux formats modernes pour accélérer votre site.',
        howTo: 'Comment convertir un PNG?',
        step1: 'Télécharger PNG', step1Desc: 'Sélectionnez les images.',
        step2: 'Choisir Format', step2Desc: 'JPG, WebP ou AVIF.',
        step3: 'Enregistrer', step3Desc: 'Télécharger le nouveau fichier.'
    }
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function PngConverterPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/png-converter" />
            </Helmet>
            <App
                defaultTool="convert"
                pageH1={t.h1}
                acceptTypes="image/png"
                formatBadges={['PNG', '→', 'JPG / WebP / AVIF']}
                defaultOutputFormat="jpg"
                allowedSettings={['format', 'quality', 'maxKb', 'grayscale']}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">📉</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⬜</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

                    {/* Visual How-To Steps */}
                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">
                            {t.howTo}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {/* Step 1 */}
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">1</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step1}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step1Desc}</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block w-full h-0.5 bg-brand-200 dark:bg-brand-800 absolute top-1/2 -translate-y-1/2 -z-0"></div>
                            {/* Step 2 */}
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">2</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step2}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step2Desc}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">3</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step3}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step3Desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="png-converter" />
            </App>
        </>
    );
}
