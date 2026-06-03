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
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın'
    },
    en: {
        title: 'Rotate and Flip Image Online - Free | WebImgConverter',
        description: 'Flip your images horizontally/vertically or rotate them at any angle. Free, fast, and secure.',
        h1: 'Rotate & Flip Image',
        dropzoneTitle: 'Drag & Drop Images to Rotate Here',
        dropzoneDesc: 'Drag and drop your photos or click to select'
    },
    de: {
        title: 'Bild Drehen und Spiegeln Online - Kostenlos | WebImgConverter',
        description: 'Spiegeln Sie Ihre Bilder horizontal/vertikal oder drehen Sie sie. Kostenlos, schnell und sicher.',
        h1: 'Bild Drehen & Spiegeln',
        dropzoneTitle: 'Bilder zum Drehen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken'
    },
    fr: {
        title: 'Faire Pivoter et Retourner une Image en Ligne | WebImgConverter',
        description: 'Retournez vos images ou faites-les pivoter sous n\'importe quel angle. Gratuit, rapide et sécurisé.',
        h1: 'Pivoter & Retourner l\'Image',
        dropzoneTitle: 'Glissez les Images à Pivoter Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner'
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
                <SeoContent pageType="rotate-image" />
            </App>
        </>
    );
}
