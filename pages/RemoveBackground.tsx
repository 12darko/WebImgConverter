import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'AI Arka Plan Silme - Ücretsiz Online | VormPixyze',
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
        title: 'Free AI Background Remover Online | VormPixyze',
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
        title: 'Kostenloser AI Hintergrund-Entferner Online | VormPixyze',
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
        title: 'Suppression d\'arrière-plan AI Gratuit | VormPixyze',
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
                <link rel="canonical" href="https://vormpixyze.com/remove-background" />
            </Helmet>
            <App
                defaultTool="remove-background"
                pageH1={t.h1}
                acceptTypes="image/png, image/jpeg, image/webp"
                formatBadges={['JPG', 'PNG', 'WEBP']}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/30 transition-colors">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Hassas Kesim' : 'Precise Cutout'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Saç telleri ve kürk gibi zor detayları bile AI ile mükemmel ayırır.' : 'AI handles hair, fur, and complex edges with pixel-perfect precision.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/30 transition-colors">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Hediye Krediler' : 'Daily Gift Credits'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Her gün yenilenen hediye kredilerle ücretsiz deneme imkanı. Kredi kartı gerekmez.' : 'Try for free with daily renewed gift credits. No credit card required.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/30 transition-colors">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

                    {/* Visual How-To Steps */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white text-center">
                            {language === 'tr' ? 'Nasıl Çalışır?' : 'How to Remove Background?'}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {/* Step 1 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-violet-500/20">1</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'Görsel Yükle' : 'Upload Image'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'JPG, PNG veya WebP sürükle bırak.' : 'Drag & drop any JPG, PNG or WebP.'}</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block w-full h-1 bg-slate-800 absolute top-8 -z-0"></div>
                            {/* Step 2 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-slate-800 border-2 border-violet-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 bg-slate-900">2</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'AI İşleme' : 'AI Processing'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Otomatik olarak süje algılanır ve kesilir.' : 'Automatic subject detection and cutout.'}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-emerald-500/20">3</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'İndir' : 'Download'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Şeffaf PNG olarak kaydet.' : 'Save as transparent PNG.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="remove-background" />
            </App>
        </>
    );
}
