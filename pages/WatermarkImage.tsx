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
        dropzoneDesc: 'Fotoğraflarınızı sürükleyin veya seçmek için tıklayın'
    },
    en: {
        title: 'Add Watermark to Image Online - Free | WebImgConverter',
        description: 'Add text or logo watermark to your images to protect your copyright. Free and secure.',
        h1: 'Add Watermark to Image',
        dropzoneTitle: 'Drag & Drop Images for Watermark Here',
        dropzoneDesc: 'Drag and drop your photos or click to select'
    },
    de: {
        title: 'Wasserzeichen zu Bild Hinzufügen - Kostenlos | WebImgConverter',
        description: 'Fügen Sie Text- oder Logo-Wasserzeichen hinzu, um Ihr Urheberrecht zu schützen.',
        h1: 'Wasserzeichen Hinzufügen',
        dropzoneTitle: 'Bilder für Wasserzeichen hierher ziehen',
        dropzoneDesc: 'Bilder hierher ziehen oder zum Auswählen klicken'
    },
    fr: {
        title: 'Ajouter un Filigrane à une Image en Ligne | WebImgConverter',
        description: 'Ajoutez un filigrane texte ou logo à vos images pour protéger vos droits d\'auteur.',
        h1: 'Ajouter un Filigrane',
        dropzoneTitle: 'Glissez les Images pour le Filigrane Ici',
        dropzoneDesc: 'Glissez vos photos ou cliquez pour sélectionner'
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
                <SeoContent pageType="watermark-image" />
            </App>
        </>
    );
}
