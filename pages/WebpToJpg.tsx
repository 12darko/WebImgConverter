import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'WebP to JPG/PNG Dönüştürücü - Ücretsiz Online | VormPixyze',
        description: 'WebP dosyalarını saniyeler içinde JPG veya PNG formatına dönüştürün. %100 tarayıcı tabanlı, dosyalarınız güvende. Tamamen ücretsiz.',
        h1: 'WebP to JPG/PNG Dönüştürücü',
    },
    en: {
        title: 'Free WebP to JPG/PNG Converter Online | VormPixyze',
        description: 'Convert WebP images to JPG or PNG format in seconds. 100% browser-based, your files stay private. Completely free.',
        h1: 'WebP to JPG/PNG Converter',
    },
    de: {
        title: 'Kostenloser WebP zu JPG/PNG Konverter Online | VormPixyze',
        description: 'Konvertieren Sie WebP-Bilder in Sekunden in JPG oder PNG. 100% browserbasiert, Ihre Dateien bleiben privat. Völlig kostenlos.',
        h1: 'WebP zu JPG/PNG Konverter',
    },
    fr: {
        title: 'Convertisseur WebP en JPG/PNG Gratuit en Ligne | VormPixyze',
        description: 'Convertissez des images WebP en JPG ou PNG en quelques secondes. 100% en navigateur, vos fichiers restent privés. Totalement gratuit.',
        h1: 'Convertisseur WebP en JPG/PNG',
    },
};

import { useLanguage } from '../LanguageContext';

type LangKey = keyof typeof seoContent;

export default function WebpToJpgPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr')) ? 'tr' : 'en';
    const t = seoContent[activeLang as LangKey] || seoContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/webp-to-jpg" />
            </Helmet>
            <App
                defaultTool="webp-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/webp, .webp"
                formatBadges={['WebP', '→', 'JPG/PNG']}
                defaultOutputFormat="jpg"
                hideFormatSelector={true}
                dropzoneTitle={language === 'tr' ? 'WebP Dosyalarını Buraya Sürükleyin' : 'Drag & Drop WebP Files Here'}
                dropzoneDesc={language === 'tr' ? 'WebP görsellerinizi sürükleyin veya seçin' : 'Drag and drop your WebP images or browse to upload'}
            />
            <SeoContent pageType="webp-to-jpg" />
        </>
    );
}
