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
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın'
    },
    en: {
        title: 'Make Image Black and White Online - Free | WebImgConverter',
        description: 'Convert your colorful images to black and white (grayscale) with one click.',
        h1: 'Black & White Filter',
        dropzoneTitle: 'Drag & Drop Images for Grayscale Here',
        dropzoneDesc: 'Drag and drop your photos or click to select'
    },
    de: {
        title: 'Bild Schwarz-Weiß Machen Online - Kostenlos | WebImgConverter',
        description: 'Konvertieren Sie Ihre Bilder mit einem Klick in Schwarz-Weiß (Graustufen).',
        h1: 'Schwarz-Weiß Filter',
        dropzoneTitle: 'Bilder für Graustufen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken'
    },
    fr: {
        title: 'Mettre une Image en Noir et Blanc en Ligne | WebImgConverter',
        description: 'Convertissez vos images colorées en noir et blanc (niveaux de gris) en un clic.',
        h1: 'Filtre Noir & Blanc',
        dropzoneTitle: 'Glissez les Images pour Noir et Blanc Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner'
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
                <link rel="canonical" href="https://WebImgConverter.com/black-and-white" />
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
                <SeoContent pageType="black-and-white" />
            </App>
        </>
    );
}
