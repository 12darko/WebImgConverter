import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Fotoğraf Döndür ve Çevir - Ücretsiz Online | WebImgConverter',
        description: 'Görsellerinizi yatay/dikey çevirin veya istediğiniz açıda döndürün. Ücretsiz, hızlı ve güvenli.',
        h1: 'Fotoğraf Döndür & Çevir',
        dropzoneTitle: 'Döndürülecek Görselleri Buraya Sürükleyin',
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın',
        feature1: '360 Derece Döndürme', feature1Desc: 'Görsellerinizi saat yönünde veya tersine dilediğiniz açıyla serbestçe döndürün.',
        feature2: 'Yatay ve Dikey Aynalama', feature2Desc: 'Tek tıkla görsellerinizi yatayda veya dikeyde simetrik olarak çevirin.',
        feature3: 'Kalite Koruma', feature3Desc: 'Döndürme işlemi sırasında piksellerde bozulma olmaz, orijinal kalite korunur.',
        howTo: 'Görsel Nasıl Döndürülür?',
        step1: 'Görsel Yükle', step1Desc: 'Çevirmek veya döndürmek istediğiniz resimleri yükleyin.',
        step2: 'Yönü Ayarla', step2Desc: 'Açı seçin veya yatay/dikey çevirme butonlarını kullanın.',
        step3: 'İndir', step3Desc: 'Yeni yönüyle kaydedilen görselinizi indirin.'
    },
    en: {
        title: 'Rotate and Flip Image Online - Free | WebImgConverter',
        description: 'Flip your images horizontally/vertically or rotate them at any angle. Free, fast, and secure.',
        h1: 'Rotate & Flip Image',
        dropzoneTitle: 'Drag & Drop Images to Rotate Here',
        dropzoneDesc: 'Drag and drop your photos or click to select',
        feature1: '360 Degree Rotation', feature1Desc: 'Rotate your images freely at any angle clockwise or counterclockwise.',
        feature2: 'Horizontal & Vertical Flip', feature2Desc: 'Symmetrically flip your images horizontally or vertically in one click.',
        feature3: 'Quality Preserved', feature3Desc: 'No pixel degradation during rotation, original quality is preserved.',
        howTo: 'How to Rotate an Image?',
        step1: 'Upload Image', step1Desc: 'Upload the images you want to flip or rotate.',
        step2: 'Adjust Orientation', step2Desc: 'Choose angle or use horizontal/vertical flip buttons.',
        step3: 'Download', step3Desc: 'Download your newly oriented image.'
    },
    de: {
        title: 'Bild Drehen und Spiegeln Online - Kostenlos | WebImgConverter',
        description: 'Spiegeln Sie Ihre Bilder horizontal/vertikal oder drehen Sie sie. Kostenlos, schnell und sicher.',
        h1: 'Bild Drehen & Spiegeln',
        dropzoneTitle: 'Bilder zum Drehen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken',
        feature1: '360-Grad-Drehung', feature1Desc: 'Drehen Sie Ihre Bilder frei in jedem Winkel im oder gegen den Uhrzeigersinn.',
        feature2: 'Horizontal & Vertikal Spiegeln', feature2Desc: 'Spiegeln Sie Ihre Bilder mit einem Klick horizontal oder vertikal.',
        feature3: 'Qualität Bewahrt', feature3Desc: 'Kein Qualitätsverlust bei der Drehung, Originalqualität bleibt erhalten.',
        howTo: 'Wie dreht man ein Bild?',
        step1: 'Bild hochladen', step1Desc: 'Wählen Sie die Bilder aus, die Sie drehen möchten.',
        step2: 'Ausrichtung anpassen', step2Desc: 'Wählen Sie den Winkel oder nutzen Sie die Spiegeln-Buttons.',
        step3: 'Herunterladen', step3Desc: 'Laden Sie das gedrehte Bild herunter.'
    },
    fr: {
        title: 'Faire Pivoter et Retourner une Image en Ligne | WebImgConverter',
        description: 'Retournez vos images ou faites-les pivoter sous n\'importe quel angle. Gratuit, rapide et sécurisé.',
        h1: 'Pivoter & Retourner l\'Image',
        dropzoneTitle: 'Glissez les Images à Pivoter Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner',
        feature1: 'Rotation à 360 Degrés', feature1Desc: 'Faites pivoter vos images librement sous n\'importe quel angle.',
        feature2: 'Retournement Horizontal & Droit', feature2Desc: 'Retournez vos images horizontalement ou verticalement en un clic.',
        feature3: 'Qualité Préservée', feature3Desc: 'Aucune dégradation de la qualité lors de la rotation.',
        howTo: 'Comment faire pivoter une image ?',
        step1: 'Télécharger l\'image', step1Desc: 'Sélectionnez les images à pivoter.',
        step2: 'Ajuster l\'orientation', step2Desc: 'Choisissez l\'angle ou utilisez les boutons de retournement.',
        step3: 'Télécharger', step3Desc: 'Téléchargez votre image orientée.'
    }
};

type LangKey = keyof typeof seoContent;

export default function RotateImagePage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/rotate-image" />
            </Helmet>
            <App
                defaultTool="rotate-image"
                pageH1={t.h1}
                acceptTypes="image/*"
                formatBadges={['ROTATE', 'FLIP']}
                allowedSettings={['format', 'rotate', 'flip']}
                dropzoneTitle={t.dropzoneTitle}
                dropzoneDesc={t.dropzoneDesc}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">↕️</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">💎</div>
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
                <SeoContent pageType="rotate-image" />
            </App>
        </>
    );
}
