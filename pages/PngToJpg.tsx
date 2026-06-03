import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'PNG to JPG Dönüştürücü - Ücretsiz Online | WebImgConverter',
        description: 'PNG dosyalarınızı küçük boyutlu JPG formatına dönüştürün. Sunucu tabanlı güvenli işlem, dosyalarınız saklanmaz.',
        h1: 'PNG to JPG Dönüştürücü',
        feature1: 'Küçük Boyut', feature1Desc: 'JPG sıkıştırması ile dosya boyutunu %80\'e kadar azaltın.',
        feature2: 'Akıllı Arka Plan', feature2Desc: 'Şeffaf alanlar otomatik olarak beyaza (veya seçilen renge) dönüşür.',
        feature3: 'Site Hızı', feature3Desc: 'Web siteniz için en hızlı yüklenen format olan JPG\'ye geçin.',
        howTo: 'PNG Nasıl JPG Yapılır?',
        step1: 'PNG Yükle', step1Desc: 'Görselleri seçin.',
        step2: 'Dönüştür', step2Desc: 'Tek tıkla JPG yapın.',
        step3: 'Kaydet', step3Desc: 'Yeni dosyayı indirin.'
    },
    en: {
        title: 'Free PNG to JPG Converter Online | WebImgConverter',
        description: 'Convert PNG files to smaller JPG format. Secure server processing, files never stored.',
        h1: 'PNG to JPG Converter',
        feature1: 'Smaller Size', feature1Desc: 'Reduce file size up to 80% with efficient JPG compression.',
        feature2: 'Smart BG', feature2Desc: 'Transparent areas automatically become white (or custom color).',
        feature3: 'Web Speed', feature3Desc: 'Switch to JPG, the fastest loading format for photography.',
        howTo: 'How to Convert PNG to JPG?',
        step1: 'Upload PNG', step1Desc: 'Select images.',
        step2: 'Convert', step2Desc: 'One click to JPG.',
        step3: 'Save', step3Desc: 'Download new file.'
    },
    de: {
        title: 'Kostenloser PNG zu JPG Konverter Online | WebImgConverter',
        description: 'Konvertieren Sie PNG-Dateien in kleineres JPG-Format. Sichere Serververarbeitung, Dateien werden nicht gespeichert.',
        h1: 'PNG zu JPG Konverter',
        feature1: 'Kleinere Größe', feature1Desc: 'Reduzieren Sie die Dateigröße um bis zu 80% mit effizienter JPG-Komprimierung.',
        feature2: 'Intelligenter Hintergrund', feature2Desc: 'Transparente Bereiche werden automatisch weiß.',
        feature3: 'Web-Geschwindigkeit', feature3Desc: 'Wechseln Sie zu JPG, dem schnellsten Format.',
        howTo: 'Wie konvertiert man PNG zu JPG?',
        step1: 'PNG hochladen', step1Desc: 'Bilder auswählen.',
        step2: 'Konvertieren', step2Desc: 'Ein Klick zu JPG.',
        step3: 'Speichern', step3Desc: 'Neue Datei herunterladen.'
    },
    fr: {
        title: 'Convertisseur PNG en JPG Gratuit en Ligne | WebImgConverter',
        description: 'Convertissez des fichiers PNG en format JPG plus petit. Traitement serveur sécurisé, fichiers jamais stockés.',
        h1: 'Convertisseur PNG en JPG',
        feature1: 'Taille réduite', feature1Desc: 'Réduisez la taille du fichier jusqu\'à 80% avec une compression JPG efficace.',
        feature2: 'Fond intelligent', feature2Desc: 'Les zones transparentes deviennent automatiquement blanches.',
        feature3: 'Vitesse Web', feature3Desc: 'Passez au JPG, le format le plus rapide.',
        howTo: 'Comment convertir PNG en JPG?',
        step1: 'Télécharger PNG', step1Desc: 'Sélectionnez les images.',
        step2: 'Convertir', step2Desc: 'Un clic vers JPG.',
        step3: 'Enregistrer', step3Desc: 'Télécharger le nouveau fichier.'
    }
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function PngToJpgPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/png-to-jpg" />
            </Helmet>
            <App
                defaultTool="png-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/png"
                formatBadges={['PNG', '→', 'JPG']}
                defaultOutputFormat="jpg"
                allowedSettings={['quality', 'maxKb', 'grayscale']}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">

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

                <SeoContent pageType="png-to-jpg" />
            </App>
        </>
    );
}
