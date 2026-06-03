import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'WebP to JPG/PNG Dönüştürücü - Ücretsiz Online | WebImgConverter',
        description: 'WebP dosyalarını saniyeler içinde JPG veya PNG formatına dönüştürün. Sunucu tabanlı güvenli işlem, dosyalarınız saklanmaz.',
        h1: 'WebP to JPG/PNG Dönüştürücü',
        feature1: 'Evrensel Uyum', feature1Desc: 'WebP açılmayan her yerde (Photoshop, eski PC) JPG kullanın.',
        feature2: 'Anında Çeviri', feature2Desc: 'Güçlü sunucularımızla saniyede 50+ görsel dönüştürün.',
        feature3: 'Kalite Koruma', feature3Desc: 'Akıllı algoritmamız ile görsel bozulmadan format değiştirin.',
        howTo: 'WebP Nasıl JPG Yapılır?',
        step1: 'WebP Seç', step1Desc: 'Dosyaları sürükleyin.',
        step2: 'Format Ayarla', step2Desc: 'JPG veya PNG seçin.',
        step3: 'Hemen İndir', step3Desc: 'Dönüştürülenleri al.',
        dropzoneTitle: 'WebP Dosyalarını Buraya Sürükleyin',
        dropzoneDesc: 'WebP görsellerinizi sürükleyin veya seçin'
    },
    en: {
        title: 'Free WebP to JPG/PNG Converter Online | WebImgConverter',
        description: 'Convert WebP images to JPG or PNG format in seconds. Secure server processing, your files stay private.',
        h1: 'WebP to JPG/PNG Converter',
        feature1: 'Universal Compat', feature1Desc: 'Make WebP images usable in Photoshop, older devices, and everywhere else.',
        feature2: 'Instant Convert', feature2Desc: 'Convert 50+ images per second using powerful secure servers.',
        feature3: 'Quality First', feature3Desc: 'Smart algorithms ensure zero visible quality loss during conversion.',
        howTo: 'How to Convert WebP to JPG?',
        step1: 'Select WebP', step1Desc: 'Drag & drop files.',
        step2: 'Set Format', step2Desc: 'Choose JPG or PNG.',
        step3: 'Download Now', step3Desc: 'Get converted files.',
        dropzoneTitle: 'Drag & Drop WebP Files Here',
        dropzoneDesc: 'Drag and drop your WebP images or browse to upload'
    },
    de: {
        title: 'Kostenloser WebP zu JPG/PNG Konverter Online | WebImgConverter',
        description: 'Konvertieren Sie WebP-Bilder in Sekunden in JPG oder PNG. Sichere Serververarbeitung, Ihre Dateien bleiben privat.',
        h1: 'WebP zu JPG/PNG Konverter',
        feature1: 'Universelle Kompatibilität', feature1Desc: 'Machen Sie WebP in Photoshop und älteren Geräten nutzbar.',
        feature2: 'Sofortige Konvertierung', feature2Desc: 'Konvertieren Sie 50+ Bilder pro Sekunde mit unseren Servern.',
        feature3: 'Höchste Qualität', feature3Desc: 'Intelligente Algorithmen ohne sichtbaren Qualitätsverlust.',
        howTo: 'Wie konvertiert man WebP in JPG?',
        step1: 'WebP auswählen', step1Desc: 'Dateien hierher ziehen.',
        step2: 'Format festlegen', step2Desc: 'Wählen Sie JPG oder PNG.',
        step3: 'Jetzt herunterladen', step3Desc: 'Konvertierte Dateien erhalten.',
        dropzoneTitle: 'WebP-Dateien hierher ziehen',
        dropzoneDesc: 'WebP-Bilder hierher ziehen oder auswählen'
    },
    fr: {
        title: 'Convertisseur WebP en JPG/PNG Gratuit en Ligne | WebImgConverter',
        description: 'Convertissez des images WebP en JPG ou PNG en quelques secondes. Traitement sécurisé sur serveur, vos fichiers restent privés.',
        h1: 'Convertisseur WebP en JPG/PNG',
        feature1: 'Compatibilité Universelle', feature1Desc: 'Rendez les images WebP utilisables dans Photoshop et les anciens appareils.',
        feature2: 'Conversion Instantanée', feature2Desc: 'Convertissez 50+ images par seconde avec nos serveurs.',
        feature3: 'Qualité Optimale', feature3Desc: 'Algorithmes intelligents sans perte de qualité visible.',
        howTo: 'Comment convertir WebP en JPG ?',
        step1: 'Sélectionner WebP', step1Desc: 'Glissez et déposez vos fichiers.',
        step2: 'Définir Format', step2Desc: 'Choisissez JPG ou PNG.',
        step3: 'Télécharger', step3Desc: 'Obtenez les fichiers convertis.',
        dropzoneTitle: 'Glissez et déposez vos fichiers WebP ici',
        dropzoneDesc: 'Glissez et déposez vos images WebP ou parcourez'
    }
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function WebpToJpgPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/webp-to-jpg" />
            </Helmet>
            <App
                defaultTool="webp-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/webp"
                formatBadges={['WEBP', '→', 'JPG']}
                defaultOutputFormat="jpg"
                allowedSettings={['quality', 'maxKb', 'grayscale']}
                hideFormatSelector={true}
                dropzoneTitle={t.dropzoneTitle}
                dropzoneDesc={t.dropzoneDesc}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🎨</div>
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

                <SeoContent pageType="webp-to-jpg" />
            </App>
        </>
    );
}
