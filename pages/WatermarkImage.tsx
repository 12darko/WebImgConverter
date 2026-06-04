import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Fotoğrafa Filigran Ekle - Ücretsiz Online | WebImgConverter',
        description: 'Görsellerinize metin veya logo ile filigran (watermark) ekleyin. Telif hakkınızı koruyun.',
        h1: 'Fotoğrafa Filigran Ekle',
        dropzoneTitle: 'Filigran Eklenecek Görselleri Buraya Sürükleyin',
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın',
        feature1: 'Metin ve Logo Filigranı', feature1Desc: 'Telif hakkı yazısı ekleyin veya kendi logonuzu görselin üzerine yerleştirin.',
        feature2: 'Şeffaflık Kontrolü', feature2Desc: 'Filigranın opaklığını ayarlayarak görselin önüne geçmesini önleyin.',
        feature3: 'Telif Hakkı Koruması', feature3Desc: 'Sosyal medya ve internette paylaşmadan önce görsellerinizi hırsızlığa karşı koruyun.',
        howTo: 'Fotoğrafa Filigran Nasıl Eklenir?',
        step1: 'Görsel Yükle', step1Desc: 'Filigran eklemek istediğiniz görselleri yükleyin.',
        step2: 'Filigranı Tasarla', step2Desc: 'Metin yazın veya logonuzu seçip şeffaflığı ayarlayın.',
        step3: 'Kaydet', step3Desc: 'Filigranı işlenmiş görsellerinizi anında indirin.'
    },
    en: {
        title: 'Add Watermark to Image Online - Free | WebImgConverter',
        description: 'Add text or logo watermark to your images to protect your copyright. Free and secure.',
        h1: 'Add Watermark to Image',
        dropzoneTitle: 'Drag & Drop Images for Watermark Here',
        dropzoneDesc: 'Drag and drop your photos or click to select',
        feature1: 'Text & Logo Watermark', feature1Desc: 'Add copyright text or overlay your own logo onto the image.',
        feature2: 'Opacity Control', feature2Desc: 'Adjust watermark opacity to keep it subtle and not block the image.',
        feature3: 'Copyright Protection', feature3Desc: 'Protect your images against theft before sharing them on social media and web.',
        howTo: 'How to Watermark an Image?',
        step1: 'Upload Image', step1Desc: 'Upload the images you want to watermark.',
        step2: 'Design Watermark', step2Desc: 'Write text or select logo, then adjust opacity.',
        step3: 'Save Image', step3Desc: 'Download your watermarked images instantly.'
    },
    de: {
        title: 'Wasserzeichen zu Bild Hinzufügen - Kostenlos | WebImgConverter',
        description: 'Fügen Sie Text- oder Logo-Wasserzeichen hinzu, um Ihr Urheberrecht zu schützen.',
        h1: 'Wasserzeichen Hinzufügen',
        dropzoneTitle: 'Bilder für Wasserzeichen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken',
        feature1: 'Text & Logo Wasserzeichen', feature1Desc: 'Fügen Sie Urheberrechtstext hinzu oder legen Sie Ihr eigenes Logo über das Bild.',
        feature2: 'Deckkraft-Kontrolle', feature2Desc: 'Passen Sie die Deckkraft des Wasserzeichens an, um es dezent zu halten.',
        feature3: 'Urheberschutz', feature3Desc: 'Schützen Sie Ihre Bilder vor Diebstahl, bevor Sie sie online teilen.',
        howTo: 'Wie fügt man ein Wasserzeichen hinzu?',
        step1: 'Bild hochladen', step1Desc: 'Wählen Sie das Bild aus, das Sie schützen möchten.',
        step2: 'Wasserzeichen gestalten', step2Desc: 'Schreiben Sie Text oder wählen Sie ein Logo und passen Sie die Transparenz an.',
        step3: 'Speichern', step3Desc: 'Laden Sie das geschützte Bild herunter.'
    },
    fr: {
        title: 'Ajouter un Filigrane à une Image en Ligne | WebImgConverter',
        description: 'Ajoutez un filigrane texte ou logo à vos images pour protéger vos droits d\'auteur.',
        h1: 'Ajouter un Filigrane',
        dropzoneTitle: 'Glissez les Images pour le Filigrane Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner',
        feature1: 'Filigrane Texte & Logo', feature1Desc: 'Ajoutez du texte de copyright ou superposez votre propre logo sur l\'image.',
        feature2: 'Contrôle d\'Opacité', feature2Desc: 'Ajustez l\'opacité du filigrane pour le garder subtil.',
        feature3: 'Protection du Droit', feature3Desc: 'Protégez vos images contre le vol avant de les partager sur le web.',
        howTo: 'Comment ajouter un filigrane ?',
        step1: 'Importer l\'image', step1Desc: 'Sélectionnez les images à protéger.',
        step2: 'Créer le filigrane', step2Desc: 'Écrivez un texte ou sélectionnez un logo et ajustez l\'opacité.',
        step3: 'Enregistrer', step3Desc: 'Téléchargez votre image filigranée.'
    }
};

type LangKey = keyof typeof seoContent;

export default function WatermarkImagePage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/watermark-image" />
            </Helmet>
            <App
                defaultTool="watermark-image"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['WATERMARK', 'TEXT', 'LOGO']}
                allowedSettings={['format', 'watermark']}
                dropzoneTitle={t.dropzoneTitle}
                dropzoneDesc={t.dropzoneDesc}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">✍️</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">👻</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔒</div>
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
                <SeoContent pageType="watermark-image" />
            </App>
        </>
    );
}
