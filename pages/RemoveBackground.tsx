import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'AI Arka Plan Silme - Ücretsiz Online | VormPixyze',
        description: 'Yapay zeka ile fotoğraflarınızın arka planını tek tıkla silin. E-ticaret, profil fotoğrafları için mükemmel.',
        h1: 'AI Arka Plan Silme',
    },
    en: {
        title: 'Free AI Background Remover Online | VormPixyze',
        description: 'Remove photo backgrounds with AI in one click. Perfect for e-commerce, profile photos.',
        h1: 'AI Background Remover',
    },
};

import { useLanguage } from '../LanguageContext';

export default function RemoveBackgroundPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr')) ? 'tr' : 'en';
    const t = seoContent[activeLang];

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
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Tamamen Ücretsiz' : '100% Free'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Kredi yok, abonelik yok. Sınırsız sayıda görselin arka planını silin.' : 'No credits, no subscriptions. Remove backgrounds from unlimited images.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-violet-500/30 transition-colors">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Gizli ve Güvenli' : 'Private & Secure'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Fotoğraflar sunucuya gitmez. Her şey tarayıcınızda işlenir.' : 'Photos represent never uploaded. Processing happens entirely in your browser.'}</p>
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
