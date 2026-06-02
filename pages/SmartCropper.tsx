import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Akıllı Kırpıcı - Resimleri Otomatik Kırp | WebImgConverter',
        description: 'Resimlerinizi sosyal medya için veya istediğiniz boyutta otomatik kırpın.',
        h1: 'Akıllı Resim Kırpıcı',
        feature1: 'Sosyal Medya Uyumlu', feature1Desc: 'Instagram, YouTube, Twitter için tek tıkla en uygun boyutta (1:1, 16:9 vs.) kırpın.',
        feature2: 'Esnek Kullanım', feature2Desc: 'İster serbest modda manuel olarak, isterseniz hazır şablonlarla pratik bir şekilde kırpın.',
        feature3: 'Görsel Kalitesi', feature3Desc: 'Kırpma işleminde kalite kaybı yaşanmaz, orijinal çözünürlük korunur.',
        howTo: 'Resim Nasıl Kırpılır?',
        step1: 'Resim Yükle', step1Desc: 'Kırpmak istediğiniz dosyayı seçin.',
        step2: 'Alan Belirle', step2Desc: 'Tuval üzerinden kesmek istediğiniz alanı seçin.',
        step3: 'Uygula & İndir', step3Desc: 'Kırpılan resmi anında kaydedin.'
    },
    en: {
        title: 'Smart Image Cropper Online | WebImgConverter',
        description: 'Automatically crop your images for social media or custom sizes.',
        h1: 'Smart Image Cropper',
        feature1: 'Social Media Ready', feature1Desc: 'One-click crop for Instagram, YouTube, Twitter optimal sizes (1:1, 16:9 etc).',
        feature2: 'Flexible Use', feature2Desc: 'Crop manually in freeform mode or use convenient aspect ratio templates.',
        feature3: 'Visual Quality', feature3Desc: 'No quality loss during cropping, original resolution is preserved.',
        howTo: 'How to Crop an Image?',
        step1: 'Upload Image', step1Desc: 'Select the file to crop.',
        step2: 'Select Area', step2Desc: 'Use the canvas to select the crop region.',
        step3: 'Apply & Download', step3Desc: 'Save the cropped image instantly.'
    },
    de: {
        title: 'Smart Image Cropper Online | WebImgConverter',
        description: 'Schneiden Sie Ihre Bilder automatisch für soziale Medien oder benutzerdefinierte Größen zu.',
        h1: 'Intelligenter Bildzuschneider',
        feature1: 'Social Media', feature1Desc: 'Ein-Klick-Zuschnitt für optimale Größen (1:1, 16:9 usw.).',
        feature2: 'Flexibel', feature2Desc: 'Freies Zuschneiden oder praktische Vorlagen nutzen.',
        feature3: 'Hohe Qualität', feature3Desc: 'Kein Qualitätsverlust beim Zuschneiden.',
        howTo: 'Wie schneidet man ein Bild zu?',
        step1: 'Bild hochladen', step1Desc: 'Wählen Sie die Datei aus.',
        step2: 'Bereich wählen', step2Desc: 'Nutzen Sie die Leinwand zum Zuschneiden.',
        step3: 'Speichern', step3Desc: 'Das zugeschnittene Bild speichern.'
    },
    fr: {
        title: 'Recadreur d\'images intelligent en ligne | WebImgConverter',
        description: 'Recadrez automatiquement vos images pour les réseaux sociaux ou des tailles personnalisées.',
        h1: 'Recadreur d\'images intelligent',
        feature1: 'Médias Sociaux', feature1Desc: 'Recadrage en un clic pour les tailles optimales (1:1, 16:9 etc).',
        feature2: 'Flexible', feature2Desc: 'Recadrez librement ou utilisez des modèles pratiques.',
        feature3: 'Haute Qualité', feature3Desc: 'Aucune perte de qualité lors du recadrage.',
        howTo: 'Comment recadrer une image ?',
        step1: 'Télécharger', step1Desc: 'Sélectionnez le fichier à recadrer.',
        step2: 'Sélectionner', step2Desc: 'Utilisez la zone de sélection.',
        step3: 'Enregistrer', step3Desc: 'Sauvegardez l\'image recadrée.'
    }
};

type LangKey = keyof typeof seoContent;

export default function SmartCropperPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/smart-cropper" />
            </Helmet>
            <App
                defaultTool="crop"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['KIRP', '✂️']}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">📏</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
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
                <SeoContent pageType="crop" />
            </App>
        </>
    );
}
