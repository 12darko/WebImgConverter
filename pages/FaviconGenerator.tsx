import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Favicon Oluşturucu - Ücretsiz Online | WebImgConverter',
        description: 'Web siteniz için saniyeler içinde mükemmel favicon (ICO) dosyaları oluşturun.',
        h1: 'Favicon Oluşturucu',
        feature1: 'Çoklu Boyutlar', feature1Desc: 'Tüm tarayıcılara uygun 16x16, 32x32, 48x48 gibi standart boyutları otomatik içerir.',
        feature2: 'Gerçek ICO Formatı', feature2Desc: 'Sadece uzantısı değişmiş PNG değil, gerçek ve geçerli ICO formatında çıktı alırsınız.',
        feature3: 'Hızlı ve Kolay', feature3Desc: 'Logonuzu yükleyin ve saniyeler içinde sitenize eklemeye hazır favicon dosyanızı indirin.',
        howTo: 'Favicon Nasıl Oluşturulur?',
        step1: 'Logo Yükle', step1Desc: 'PNG veya JPG logonuzu seçin.',
        step2: 'Çevir', step2Desc: 'Sistem otomatik boyutlandırır.',
        step3: 'İndir', step3Desc: 'ICO dosyanızı sitenize ekleyin.'
    },
    en: {
        title: 'Free Favicon Generator Online | WebImgConverter',
        description: 'Generate perfect favicon (ICO) files for your website in seconds.',
        h1: 'Favicon Generator',
        feature1: 'Multiple Sizes', feature1Desc: 'Automatically includes standard sizes like 16x16, 32x32, and 48x48 for all browsers.',
        feature2: 'True ICO Format', feature2Desc: 'Get a real, valid ICO file, not just a renamed PNG.',
        feature3: 'Fast & Easy', feature3Desc: 'Upload your logo and download your ready-to-use favicon in seconds.',
        howTo: 'How to Generate a Favicon?',
        step1: 'Upload Logo', step1Desc: 'Select your PNG or JPG logo.',
        step2: 'Convert', step2Desc: 'System automatically resizes it.',
        step3: 'Download', step3Desc: 'Add the ICO file to your site.'
    },
    de: {
        title: 'Kostenloser Favicon-Generator Online | WebImgConverter',
        description: 'Erstellen Sie in Sekundenschnelle perfekte Favicon (ICO)-Dateien für Ihre Website.',
        h1: 'Favicon-Generator',
        feature1: 'Mehrere Größen', feature1Desc: 'Beinhaltet automatisch Standardgrößen wie 16x16, 32x32 und 48x48 für alle Browser.',
        feature2: 'Echtes ICO-Format', feature2Desc: 'Erhalten Sie eine echte, gültige ICO-Datei, nicht nur ein umbenanntes PNG.',
        feature3: 'Schnell & Einfach', feature3Desc: 'Laden Sie Ihr Logo hoch und laden Sie Ihr Favicon in Sekunden herunter.',
        howTo: 'Wie erstellt man ein Favicon?',
        step1: 'Logo hochladen', step1Desc: 'PNG oder JPG auswählen.',
        step2: 'Konvertieren', step2Desc: 'System passt Größe automatisch an.',
        step3: 'Herunterladen', step3Desc: 'ICO-Datei zur Seite hinzufügen.'
    },
    fr: {
        title: 'Générateur de Favicon Gratuit en Ligne | WebImgConverter',
        description: 'Générez des fichiers favicon (ICO) parfaits pour votre site web en quelques secondes.',
        h1: 'Générateur de Favicon',
        feature1: 'Tailles Multiples', feature1Desc: 'Inclut automatiquement les tailles standard comme 16x16, 32x32 pour tous les navigateurs.',
        feature2: 'Vrai Format ICO', feature2Desc: 'Obtenez un vrai fichier ICO valide, pas juste un PNG renommé.',
        feature3: 'Rapide et Facile', feature3Desc: 'Téléchargez votre logo et téléchargez votre favicon prêt à l\'emploi en quelques secondes.',
        howTo: 'Comment générer un Favicon?',
        step1: 'Télécharger le Logo', step1Desc: 'Sélectionnez votre PNG ou JPG.',
        step2: 'Convertir', step2Desc: 'Le système redimensionne automatiquement.',
        step3: 'Télécharger', step3Desc: 'Ajoutez le fichier ICO à votre site.'
    }
};

type LangKey = keyof typeof seoContent;

export default function FaviconGeneratorPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/favicon-generator" />
            </Helmet>
            <App
                defaultTool="favicon-generator"
                pageH1={t.title}
                acceptTypes="image/png,image/jpeg,image/webp,image/heic,image/heif"
                formatBadges={['PNG', 'JPG', 'WEBP']}
                defaultOutputFormat="image/x-icon"
                hideFormatSelector={true}
                hideAdvancedSettings={true}
                allowedSettings={[]}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">📐</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

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
                <SeoContent pageType="favicon-generator" />
            </App>
        </>
    );
}
