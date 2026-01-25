import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'PNG to JPG Dönüştürücü - Ücretsiz Online | VormPixyze',
        description: 'PNG dosyalarınızı küçük boyutlu JPG formatına dönüştürün. %100 tarayıcı tabanlı, hızlı ve güvenli.',
        h1: 'PNG to JPG Dönüştürücü',
    },
    en: {
        title: 'Free PNG to JPG Converter Online | VormPixyze',
        description: 'Convert PNG files to smaller JPG format. 100% browser-based, fast and secure.',
        h1: 'PNG to JPG Converter',
    },
};

import { useLanguage } from '../LanguageContext';

export default function PngToJpgPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr')) ? 'tr' : 'en';
    const t = seoContent[activeLang];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/png-to-jpg" />
            </Helmet>
            <App
                defaultTool="png-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/png"
                formatBadges={['PNG', '→', 'JPG']}
                defaultOutputFormat="jpg"
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="text-4xl mb-4">📉</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Küçük Boyut' : 'Smaller Size'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'JPG sıkıştırması ile dosya boyutunu %80\'e kadar azaltın.' : 'Reduce file size up to 80% with efficient JPG compression.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="text-4xl mb-4">⬜</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Akıllı Arka Plan' : 'Smart BG'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Şeffaf alanlar otomatik olarak beyaza (veya seçilen renge) dönüşür.' : 'Transparent areas automatically become white (or custom color).'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Site Hızı' : 'Web Speed'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Web siteniz için en hızlı yüklenen format olan JPG\'ye geçin.' : 'Switch to JPG, the fastest loading format for photography.'}</p>
                        </div>
                    </div>

                    {/* Visual How-To Steps */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white text-center">
                            {language === 'tr' ? 'PNG Nasıl JPG Yapılır?' : 'How to Convert PNG to JPG?'}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {/* Step 1 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-orange-500/20">1</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'PNG Yükle' : 'Upload PNG'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Görselleri seçin.' : 'Select images.'}</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block w-full h-1 bg-slate-800 absolute top-8 -z-0"></div>
                            {/* Step 2 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-slate-800 border-2 border-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 bg-slate-900">2</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'Dönüştür' : 'Convert'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Tek tıkla JPG yapın.' : 'One click to JPG.'}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-emerald-500/20">3</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'Kaydet' : 'Save'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Yeni dosyayı indirin.' : 'Download new file.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="png-to-jpg" />
            </App>
        </>
    );
}
