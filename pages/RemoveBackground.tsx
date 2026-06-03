import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'AI Arka Plan Silme - Ücretsiz Online | WebImgConverter',
        description: 'Yapay zeka ile fotoğraflarınızın arka planını tek tıkla silin. E-ticaret, profil fotoğrafları için mükemmel.',
        h1: 'AI Arka Plan Silme',
        feature1: 'Hassas Kesim', feature1Desc: 'Saç telleri ve kürk gibi zor detayları bile AI ile mükemmel ayırır.',
        feature2: 'Hediye Krediler', feature2Desc: 'Her gün yenilenen hediye kredilerle ücretsiz deneme imkanı. Kredi kartı gerekmez.',
        feature3: 'Yüksek Performans', feature3Desc: 'Güçlü yapay zeka sunucularımızda saniyeler içinde işlenir. En iyi kalite garantisi.',
        howTo: 'Nasıl Çalışır?',
        step1: 'Görsel Yükle', step1Desc: 'JPG, PNG veya WebP sürükle bırak.',
        step2: 'AI İşleme', step2Desc: 'Otomatik olarak süje algılanır ve kesilir.',
        step3: 'İndir', step3Desc: 'Şeffaf PNG olarak kaydet.'
    },
    en: {
        title: 'Free AI Background Remover Online | WebImgConverter',
        description: 'Remove photo backgrounds with AI in one click. Perfect for e-commerce, profile photos.',
        h1: 'AI Background Remover',
        feature1: 'Precise Cutout', feature1Desc: 'AI handles hair, fur, and complex edges with pixel-perfect precision.',
        feature2: 'Free Daily Credits', feature2Desc: 'Try for free with daily renewed gift credits. No credit card required.',
        feature3: 'High Performance', feature3Desc: 'Processed in seconds on our powerful AI servers. Best quality guaranteed.',
        howTo: 'How to Remove Background?',
        step1: 'Upload Image', step1Desc: 'Drag & drop any JPG, PNG or WebP.',
        step2: 'AI Processing', step2Desc: 'Automatic subject detection and cutout.',
        step3: 'Download', step3Desc: 'Save as transparent PNG.'
    },
    de: {
        title: 'Kostenloser AI Hintergrund-Entferner Online | WebImgConverter',
        description: 'Entfernen Sie Foto-Hintergründe mit KI in einem Klick. Perfekt für E-Commerce und Profilfotos.',
        h1: 'AI Hintergrund-Entferner',
        feature1: 'Präziser Schnitt', feature1Desc: 'KI handhabt Haare, Fell und komplexe Kanten mit Pixel-Perfektion.',
        feature2: 'Tägliche Geschenkgutschriften', feature2Desc: 'Kostenlos testen mit täglichen Credits. Keine Kreditkarte erforderlich.',
        feature3: 'Hohe Leistung', feature3Desc: 'Sekundenschnelle Verarbeitung auf unseren leistungsstarken KI-Servern.',
        howTo: 'Wie funktioniert es?',
        step1: 'Bild hochladen', step1Desc: 'JPG, PNG oder WebP ziehen.',
        step2: 'KI-Verarbeitung', step2Desc: 'Automatische Motiverkennung.',
        step3: 'Herunterladen', step3Desc: 'Als transparentes PNG speichern.'
    },
    fr: {
        title: 'Suppression d\'arrière-plan AI Gratuit | WebImgConverter',
        description: 'Supprimez les arrière-plans de photos avec l\'IA en un clic. Parfait pour l\'e-commerce.',
        h1: 'Suppression d\'arrière-plan AI',
        feature1: 'Découpe précise', feature1Desc: 'L\'IA gère les cheveux et les bords complexes avec précision.',
        feature2: 'Crédits Gratuits', feature2Desc: 'Essai gratuit avec crédits quotidiens. Pas de carte de crédit.',
        feature3: 'Haute Performance', feature3Desc: 'Traité en quelques secondes sur nos puissants serveurs IA.',
        howTo: 'Comment ça marche?',
        step1: 'Télécharger image', step1Desc: 'Glissez JPG, PNG ou WebP.',
        step2: 'Traitement IA', step2Desc: 'Détection automatique du sujet.',
        step3: 'Télécharger', step3Desc: 'Enregistrer en PNG transparent.'
    }
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function RemoveBackgroundPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/remove-background" />
            </Helmet>
            <App
                defaultTool="remove-background"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['AI', '→', 'PNG']}
                defaultOutputFormat="png"
                hideFormatSelector={true}
                allowedSettings={['format', 'crop']}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⚡</div>
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

                <SeoContent pageType="remove-background" />
            </App>
        </>
    );
}
