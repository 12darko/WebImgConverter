import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';

const seoContent = {
    tr: {
        title: 'Gemini Filigran Silici - Ücretsiz AI Filigran Kaldırma | WebImgConverter',
        description: 'Google Gemini AI görsellerindeki filigranları tek tıkla sihirli bir şekilde silin. Otomatik ve ücretsiz araç.',
        h1: 'Gemini Filigran Silici',
        feature1: 'Tek Tıkla Silme', feature1Desc: 'Gemini filigranını otomatik tanır ve tek tıkla saniyeler içinde siler.',
        feature2: 'Orijinal Kalite', feature2Desc: 'Resmin kalitesini bozmadan, sadece filigran bölgesini kusursuz onarır.',
        feature3: 'Ücretsiz & Hızlı', feature3Desc: 'Hiçbir kurulum gerektirmeden tarayıcı üzerinden anında kullanım.',
        howTo: 'Nasıl Çalışır?',
        step1: 'Görsel Yükle', step1Desc: 'Gemini ile ürettiğiniz görseli yükleyin.',
        step2: 'Sil Butonuna Bas', step2Desc: '"Gemini Filigranı" modunu seçin ve sil butonuna tıklayın.',
        step3: 'İndir', step3Desc: 'Yapay zeka filigranı silsin ve temiz halini hemen indirin.'
    },
    en: {
        title: 'Gemini Watermark Remover - Free AI Tool | WebImgConverter',
        description: 'Magically remove Google Gemini AI watermarks from your images with one click. Free and automatic.',
        h1: 'Gemini Watermark Remover',
        feature1: '1-Click Removal', feature1Desc: 'Automatically detects Gemini watermark and removes it in seconds.',
        feature2: 'Original Quality', feature2Desc: 'Flawlessly inpaints the watermark area without losing image quality.',
        feature3: 'Free & Fast', feature3Desc: 'Use instantly in your browser without any installation.',
        howTo: 'How It Works',
        step1: 'Upload Image', step1Desc: 'Upload your Gemini-generated image.',
        step2: 'Click Remove', step2Desc: 'Select "Gemini Watermark" mode and click remove.',
        step3: 'Download', step3Desc: 'Let AI remove it and download the clean image.'
    },
    de: {
        title: 'Gemini Wasserzeichen-Entferner - Kostenloses KI-Tool',
        description: 'Entfernen Sie Google Gemini KI-Wasserzeichen aus Ihren Bildern mit einem Klick. Kostenlos und automatisch.',
        h1: 'Gemini Wasserzeichen Entferner',
        feature1: '1-Klick Entfernung', feature1Desc: 'Erkennt das Wasserzeichen automatisch und entfernt es in Sekunden.',
        feature2: 'Originalqualität', feature2Desc: 'Repariert den Bereich makellos, ohne Qualitätsverlust.',
        feature3: 'Kostenlos & Schnell', feature3Desc: 'Sofort im Browser nutzen, ohne Installation.',
        howTo: 'Wie es funktioniert',
        step1: 'Bild hochladen', step1Desc: 'Laden Sie Ihr Gemini-Bild hoch.',
        step2: 'Entfernen klicken', step2Desc: 'Wählen Sie "Gemini Wasserzeichen" und klicken Sie auf Entfernen.',
        step3: 'Herunterladen', step3Desc: 'KI erledigt den Rest, laden Sie das Bild herunter.'
    },
    fr: {
        title: 'Suppresseur de Filigrane Gemini - Outil IA Gratuit',
        description: 'Supprimez magiquement les filigranes Google Gemini IA de vos images en un clic. Gratuit et automatique.',
        h1: 'Suppresseur de Filigrane Gemini',
        feature1: 'Suppression en 1 clic', feature1Desc: 'Détecte et supprime automatiquement le filigrane en quelques secondes.',
        feature2: 'Qualité Originale', feature2Desc: 'Répare parfaitement la zone sans perte de qualité.',
        feature3: 'Gratuit & Rapide', feature3Desc: 'Utilisation instantanée dans le navigateur, sans installation.',
        howTo: 'Comment ça marche',
        step1: 'Télécharger l\'image', step1Desc: 'Téléchargez votre image Gemini.',
        step2: 'Cliquez sur Supprimer', step2Desc: 'Sélectionnez "Filigrane Gemini" et cliquez.',
        step3: 'Télécharger', step3Desc: 'L\'IA fait le reste, téléchargez votre image propre.'
    }
};

type LangKey = keyof typeof seoContent;

export default function GeminiWatermarkRemoverPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/gemini-watermark-remover" />
            </Helmet>
            <App
                defaultTool="gemini-watermark-remover"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['Gemini', '✨', 'AI']}
                defaultOutputFormat="jpg"
                hideFormatSelector={true}
                allowedSettings={['format']}
                initialMode="gemini"
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🪄</div>
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
            </App>
        </>
    );
}
