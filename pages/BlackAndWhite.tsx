import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Fotoğrafı Siyah Beyaz Yap - Ücretsiz Online | WebImgConverter',
        description: 'Görsellerinizi tek tıkla siyah beyaz (grayscale) formatına dönüştürün. Hızlı ve ücretsiz.',
        h1: 'Siyah Beyaz Filtre',
        dropzoneTitle: 'Siyah Beyaz Yapılacak Görselleri Buraya Sürükleyin',
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın',
        feature1: 'Anında Gri Tonlama', feature1Desc: 'Renkli resimlerinizi saniyeler içinde nostaljik ve şık gri tonlamaya çevirin.',
        feature2: 'Dramatik Detaylar', feature2Desc: 'Siyah beyaz filtre ile görsellerinizdeki kontrast ve detayları ön plana çıkarın.',
        feature3: 'Sınırsız Kullanım', feature3Desc: 'Herhangi bir dosya boyutu sınırlaması olmadan dilediğiniz kadar görseli dönüştürün.',
        howTo: 'Resim Nasıl Siyah Beyaz Yapılır?',
        step1: 'Görsel Yükle', step1Desc: 'Siyah beyaz yapmak istediğiniz dosyaları seçin.',
        step2: 'Filtreyi Uygula', step2Desc: 'Siyah-beyaz/gri tonlama filtresini aktif hale getirin.',
        step3: 'Kaydet', step3Desc: 'Dönüştürülmüş siyah beyaz görsellerinizi indirin.'
    },
    en: {
        title: 'Make Image Black and White Online - Free | WebImgConverter',
        description: 'Convert your colorful images to black and white (grayscale) with one click.',
        h1: 'Black & White Filter',
        dropzoneTitle: 'Drag & Drop Images for Grayscale Here',
        dropzoneDesc: 'Drag and drop your photos or click to select',
        feature1: 'Instant Grayscale', feature1Desc: 'Convert colorful images to nostalgic and stylish grayscale in seconds.',
        feature2: 'Dramatic Contrast', feature2Desc: 'Highlight details and contrast in your images using the black and white filter.',
        feature3: 'Unlimited Use', feature3Desc: 'Convert as many images as you want without any file size limits.',
        howTo: 'How to Make an Image Black and White?',
        step1: 'Upload Image', step1Desc: 'Select the files you want to make black and white.',
        step2: 'Apply Filter', step2Desc: 'Activate the black and white/grayscale filter.',
        step3: 'Save Image', step3Desc: 'Download your converted black and white images.'
    },
    de: {
        title: 'Bild Schwarz-Weiß Machen Online - Kostenlos | WebImgConverter',
        description: 'Konvertieren Sie Ihre Bilder mit einem Klick in Schwarz-Weiß (Graustufen).',
        h1: 'Schwarz-Weiß Filter',
        dropzoneTitle: 'Bilder für Graustufen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken',
        feature1: 'Sofortige Graustufen', feature1Desc: 'Konvertieren Sie Ihre farbigen Bilder in Sekunden in Schwarz-Weiß.',
        feature2: 'Dramatischer Kontrast', feature2Desc: 'Heben Sie Kontraste und Details mit dem Schwarz-Weiß-Filter hervor.',
        feature3: 'Unbegrenzte Nutzung', feature3Desc: 'Konvertieren Sie beliebig viele Bilder ohne Dateigrößenbeschränkungen.',
        howTo: 'Wie macht man ein Bild schwarz-weiß?',
        step1: 'Bild hochladen', step1Desc: 'Wählen Sie die Dateien aus, die Sie umwandeln möchten.',
        step2: 'Filter anwenden', step2Desc: 'Aktivieren Sie den Schwarz-Weiß-Filter.',
        step3: 'Speichern', step3Desc: 'Laden Sie Ihre fertigen Graustufenbilder herunter.'
    },
    fr: {
        title: 'Mettre une Image en Noir et Blanc en Ligne | WebImgConverter',
        description: 'Convertissez vos images colorées en noir et blanc (niveaux de gris) en un clic.',
        h1: 'Filtre Noir & Blanc',
        dropzoneTitle: 'Glissez les Images pour Noir et Blanc Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner',
        feature1: 'Niveaux de Gris Instantanés', feature1Desc: 'Convertissez vos images colorées en noir et blanc en quelques secondes.',
        feature2: 'Contraste Dramatique', feature2Desc: 'Mettez en valeur les contrastes et les détails de vos photos.',
        feature3: 'Utilisation Illimitée', feature3Desc: 'Convertissez autant d\'images que vous le souhaitez, sans limite.',
        howTo: 'Comment mettre une image en noir et blanc ?',
        step1: 'Importer l\'image', step1Desc: 'Sélectionnez les fichiers à convertir.',
        step2: 'Appliquer le filtre', step2Desc: 'Activez le filtre noir et blanc.',
        step3: 'Enregistrer', step3Desc: 'Téléchargez vos images en noir et blanc.'
    }
};

type LangKey = keyof typeof seoContent;

export default function BlackAndWhitePage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/black-and-white" />
            </Helmet>
            <App
                defaultTool="black-and-white"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['GRAYSCALE', 'B&W']}
                allowedSettings={['format', 'grayscale']}
                dropzoneTitle={t.dropzoneTitle}
                dropzoneDesc={t.dropzoneDesc}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🎭</div>
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
                <SeoContent pageType="black-and-white" />
            </App>
        </>
    );
}
