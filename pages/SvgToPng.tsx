import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'SVG to PNG Dönüştürücü - Ücretsiz Online | WebImgConverter',
        description: 'Vektörel SVG grafiklerinizi yüksek çözünürlüklü PNG dosyalarına ücretsiz dönüştürün.',
        h1: 'SVG to PNG Dönüştürücü',
        feature1: 'Yüksek Çözünürlük', feature1Desc: 'Vektörlerinizi piksellenmeden, istediğiniz boyutta net PNG\'lere dönüştürün.',
        feature2: 'Şeffaflık Desteği', feature2Desc: 'SVG\'deki şeffaf (saydam) arka planlar PNG\'ye kayıpsız aktarılır.',
        feature3: 'Anında İşlem', feature3Desc: 'Güçlü sunucularımızda saniyeler içinde dönüşüm.',
        howTo: 'SVG Nasıl PNG Yapılır?',
        step1: 'SVG Yükle', step1Desc: 'Vektör dosyanızı seçin.',
        step2: 'Çözünürlük Seç', step2Desc: 'İhtiyacınıza göre boyut belirleyin.',
        step3: 'İndir', step3Desc: 'Yeni PNG dosyanızı kaydedin.'
    },
    en: {
        title: 'Free SVG to PNG Converter Online | WebImgConverter',
        description: 'Convert your vector SVG graphics to high-resolution PNG files for free.',
        h1: 'SVG to PNG Converter',
        feature1: 'High Resolution', feature1Desc: 'Convert vectors to crisp PNGs at any size without pixelation.',
        feature2: 'Transparency', feature2Desc: 'Transparent backgrounds in SVG are preserved losslessly in PNG.',
        feature3: 'Instant Processing', feature3Desc: 'Conversion happens in seconds on our fast servers.',
        howTo: 'How to Convert SVG to PNG?',
        step1: 'Upload SVG', step1Desc: 'Select your vector file.',
        step2: 'Choose Size', step2Desc: 'Set dimensions as needed.',
        step3: 'Download', step3Desc: 'Save your new PNG file.'
    },
    de: {
        title: 'Kostenloser SVG zu PNG Konverter Online | WebImgConverter',
        description: 'Konvertieren Sie Ihre Vektor-SVG-Grafiken kostenlos in hochauflösende PNG-Dateien.',
        h1: 'SVG zu PNG Konverter',
        feature1: 'Hohe Auflösung', feature1Desc: 'Konvertieren Sie Vektoren in gestochen scharfe PNGs in jeder Größe.',
        feature2: 'Transparenz', feature2Desc: 'Transparente Hintergründe bleiben im PNG verlustfrei erhalten.',
        feature3: 'Sofortige Verarbeitung', feature3Desc: 'Konvertierung in Sekunden.',
        howTo: 'Wie konvertiert man SVG zu PNG?',
        step1: 'SVG hochladen', step1Desc: 'Vektordatei auswählen.',
        step2: 'Größe wählen', step2Desc: 'Abmessungen nach Bedarf festlegen.',
        step3: 'Herunterladen', step3Desc: 'Neue PNG-Datei speichern.'
    },
    fr: {
        title: 'Convertisseur SVG en PNG Gratuit en Ligne | WebImgConverter',
        description: 'Convertissez gratuitement vos graphiques vectoriels SVG en fichiers PNG haute résolution.',
        h1: 'Convertisseur SVG en PNG',
        feature1: 'Haute Résolution', feature1Desc: 'Convertissez des vecteurs en PNG nets à n\'importe quelle taille.',
        feature2: 'Transparence', feature2Desc: 'Les fonds transparents sont préservés sans perte.',
        feature3: 'Traitement Instantané', feature3Desc: 'Conversion en quelques secondes.',
        howTo: 'Comment convertir SVG en PNG?',
        step1: 'Télécharger SVG', step1Desc: 'Sélectionnez le fichier vectoriel.',
        step2: 'Choisir la taille', step2Desc: 'Définir les dimensions.',
        step3: 'Télécharger', step3Desc: 'Enregistrer le fichier PNG.'
    }
};

type LangKey = keyof typeof seoContent;

export default function SvgToPngPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/svg-to-png" />
            </Helmet>
            <App
                defaultTool="svg-to-png"
                pageH1={t.h1}
                acceptTypes="image/svg+xml,.svg"
                formatBadges={['SVG', '→', 'PNG']}
                defaultOutputFormat="png"
                hideFormatSelector={true}
                hideAdvancedSettings={true}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✨</div>
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

                <SeoContent pageType="svg-to-png" />
            </App>
        </>
    );
}
