import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { SeoContent } from '../components/SeoContent';
import { useLanguage } from '../LanguageContext';

const seoContent = {
    tr: {
        title: 'Yapay Zeka Filigran Silici - Ücretsiz Online | WebImgConverter',
        description: 'Fotoğraflarınızdaki istenmeyen filigran, logo ve yazıları yapay zeka ile sihirli bir şekilde silin.',
        h1: 'AI Filigran Silici',
        feature1: 'Sihirli Fırça', feature1Desc: 'Sadece silmek istediğiniz bölgeyi boyayın, gerisini AI halletsin.',
        feature2: 'Kusursuz Onarım', feature2Desc: 'Filigranın altındaki dokuyu yapay zeka yeniden oluşturarak orijinal görünüm sağlar.',
        feature3: 'Sınırsız Kullanım', feature3Desc: 'Kurulum veya üyelik gerektirmeden tarayıcınız üzerinden ücretsiz kullanım.',
        howTo: 'Nasıl Çalışır?',
        step1: 'Görsel Yükle', step1Desc: 'Filigranlı görselinizi yükleyin.',
        step2: 'Boyayın', step2Desc: 'Fırça ile filigranın üzerini tamamen boyayın.',
        step3: 'Silin', step3Desc: 'Yapay zeka filigranı silsin ve temiz halini indirin.'
    },
    en: {
        title: 'Free AI Watermark Remover Online | WebImgConverter',
        description: 'Magically remove unwanted watermarks, logos, and text from your photos using AI.',
        h1: 'AI Watermark Remover',
        feature1: 'Magic Brush', feature1Desc: 'Just paint over the area you want to remove, AI handles the rest.',
        feature2: 'Flawless Inpainting', feature2Desc: 'AI reconstructs the texture under the watermark for an original look.',
        feature3: 'Unlimited Use', feature3Desc: 'Free to use directly in your browser without installation or signup.',
        howTo: 'How It Works',
        step1: 'Upload Image', step1Desc: 'Upload your watermarked image.',
        step2: 'Paint Over', step2Desc: 'Paint completely over the watermark with the brush.',
        step3: 'Remove', step3Desc: 'Let AI remove it and download the clean image.'
    },
    de: {
        title: 'Kostenloser AI Wasserzeichen-Entferner | WebImgConverter',
        description: 'Entfernen Sie magisch unerwünschte Wasserzeichen, Logos und Text aus Ihren Fotos mit KI.',
        h1: 'AI Wasserzeichen Entferner',
        feature1: 'Magischer Pinsel', feature1Desc: 'Übermalen Sie einfach den Bereich, die KI erledigt den Rest.',
        feature2: 'Makellose Reparatur', feature2Desc: 'KI rekonstruiert die Textur für ein originelles Aussehen.',
        feature3: 'Unbegrenzte Nutzung', feature3Desc: 'Kostenlose Nutzung direkt im Browser ohne Installation.',
        howTo: 'Wie es funktioniert',
        step1: 'Bild hochladen', step1Desc: 'Laden Sie Ihr Bild hoch.',
        step2: 'Übermalen', step2Desc: 'Übermalen Sie das Wasserzeichen komplett.',
        step3: 'Entfernen', step3Desc: 'Lassen Sie die KI arbeiten und laden Sie es herunter.'
    },
    fr: {
        title: 'Suppresseur de Filigrane IA Gratuit | WebImgConverter',
        description: 'Supprimez magiquement les filigranes, logos et textes indésirables de vos photos avec l\'IA.',
        h1: 'Suppresseur de Filigrane IA',
        feature1: 'Pinceau Magique', feature1Desc: 'Peignez simplement sur la zone, l\'IA gère le reste.',
        feature2: 'Réparation Parfaite', feature2Desc: 'L\'IA reconstruit la texture pour un aspect original.',
        feature3: 'Utilisation Illimitée', feature3Desc: 'Utilisation gratuite directement dans le navigateur.',
        howTo: 'Comment ça marche',
        step1: 'Télécharger image', step1Desc: 'Téléchargez votre image.',
        step2: 'Peindre sur', step2Desc: 'Peignez complètement sur le filigrane.',
        step3: 'Supprimer', step3Desc: 'Laissez l\'IA travailler et téléchargez.'
    }
};

type LangKey = keyof typeof seoContent;

export default function WatermarkRemoverPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/watermark-remover" />
            </Helmet>
            <App
                defaultTool="watermark-remover"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['AI', '✨', 'Clean']}
                defaultOutputFormat="jpg"
                hideFormatSelector={true}
                allowedSettings={['format']}
            >
                {/* Custom Rich Content for SEO Enrichment */}
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">

                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🪄</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
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
                {/* <SeoContent pageType="watermark-remover" /> */}
            </App>
        </>
    );
}
