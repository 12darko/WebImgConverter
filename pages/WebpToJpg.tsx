import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'WebP to JPG/PNG Dönüştürücü - Ücretsiz Online | VormPixyze',
        description: 'WebP dosyalarını saniyeler içinde JPG veya PNG formatına dönüştürün. Sunucu tabanlı güvenli işlem, dosyalarınız saklanmaz.',
        h1: 'WebP to JPG/PNG Dönüştürücü',
    },
    en: {
        title: 'Free WebP to JPG/PNG Converter Online | VormPixyze',
        description: 'Convert WebP images to JPG or PNG format in seconds. Secure server processing, your files stay private.',
        h1: 'WebP to JPG/PNG Converter',
    },
    de: {
        title: 'Kostenloser WebP zu JPG/PNG Konverter Online | VormPixyze',
        description: 'Konvertieren Sie WebP-Bilder in Sekunden in JPG oder PNG. Sichere Serververarbeitung, Ihre Dateien bleiben privat.',
        h1: 'WebP zu JPG/PNG Konverter',
    },
    fr: {
        title: 'Convertisseur WebP en JPG/PNG Gratuit en Ligne | VormPixyze',
        description: 'Convertissez des images WebP en JPG ou PNG en quelques secondes. Traitement sécurisé sur serveur, vos fichiers restent privés.',
        h1: 'Convertisseur WebP en JPG/PNG',
    },
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function WebpToJpgPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr')) ? 'tr' : 'en';
    const t = seoContent[activeLang as LangKey] || seoContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/webp-to-jpg" />
            </Helmet>
            <App
                defaultTool="webp-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/webp, .webp"
                formatBadges={['WebP', '→', 'JPG/PNG']}
                defaultOutputFormat="jpg"
                hideFormatSelector={true}
                dropzoneTitle={language === 'tr' ? 'WebP Dosyalarını Buraya Sürükleyin' : 'Drag & Drop WebP Files Here'}
                dropzoneDesc={language === 'tr' ? 'WebP görsellerinizi sürükleyin veya seçin' : 'Drag and drop your WebP images or browse to upload'}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Evrensel Uyum' : 'Universal Compat'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'WebP açılmayan her yerde (Photoshop, eski PC) JPG kullanın.' : 'Make WebP images usable in Photoshop, older devices, and everywhere else.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Anında Çeviri' : 'Instant Convert'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Güçlü sunucularımızla saniyede 50+ görsel dönüştürün.' : 'Convert 50+ images per second using powerful secure servers.'}</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold text-white mb-2">{language === 'tr' ? 'Kalite Koruma' : 'Quality First'}</h3>
                            <p className="text-slate-400 text-sm">{language === 'tr' ? 'Akıllı algoritmamız ile görsel bozulmadan format değiştirin.' : 'Smart algorithms ensure zero visible quality loss during conversion.'}</p>
                        </div>
                    </div>

                    {/* Visual How-To Steps */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-white text-center">
                            {language === 'tr' ? 'WebP Nasıl JPG Yapılır?' : 'How to Convert WebP to JPG?'}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            {/* Step 1 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-blue-500/20">1</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'WebP Seç' : 'Select WebP'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Dosyaları sürükleyin.' : 'Drag & drop files.'}</p>
                            </div>
                            {/* Arrow */}
                            <div className="hidden md:block w-full h-1 bg-slate-800 absolute top-8 -z-0"></div>
                            {/* Step 2 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-slate-800 border-2 border-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 bg-slate-900">2</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'Format Ayarla' : 'Set Format'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'JPG veya PNG seçin.' : 'Choose JPG or PNG.'}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex-1 text-center relative z-10">
                                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-emerald-500/20">3</div>
                                <h3 className="font-semibold text-white mb-1">{language === 'tr' ? 'Hemen İndir' : 'Download Now'}</h3>
                                <p className="text-slate-500 text-sm">{language === 'tr' ? 'Dönüştürülenleri al.' : 'Get converted files.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <SeoContent pageType="webp-to-jpg" />
            </App>
        </>
    );
}
