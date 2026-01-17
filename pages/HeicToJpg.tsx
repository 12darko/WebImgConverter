import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';

const seoContent = {
    tr: {
        title: 'HEIC to JPG Dönüştürücü - Ücretsiz Online | VormPixyze',
        description: 'iPhone HEIC fotoğraflarını saniyeler içinde JPG formatına dönüştürün. %100 tarayıcı tabanlı, dosyalarınız güvende.',
        h1: 'HEIC to JPG Dönüştürücü',
    },
    en: {
        title: 'Free HEIC to JPG Converter Online | VormPixyze',
        description: 'Convert iPhone HEIC photos to JPG format in seconds. 100% browser-based, your files stay private.',
        h1: 'HEIC to JPG Converter',
    },
};

import { SeoContent } from '../components/SeoContent';

export default function HeicToJpgPage() {
    const language = navigator.language.startsWith('tr') ? 'tr' : 'en';
    const t = seoContent[language];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/heic-to-jpg" />
            </Helmet>
            <App
                defaultTool="heic-to-jpg"
                pageH1={t.h1}
                acceptTypes=".heic, .heif"
                formatBadges={['HEIC', '→', 'JPG']}
                defaultOutputFormat="jpg"
                hideFormatSelector={true}
                dropzoneTitle={language === 'tr' ? 'HEIC Dosyalarını Buraya Sürükleyin' : 'Drag & Drop HEIC Files Here'}
                dropzoneDesc={language === 'tr' ? 'iPhone fotoğraflarınızı (HEIC/HEIF) sürükleyin veya seçin' : 'Drag and drop your iPhone photos (HEIC/HEIF) or browse to upload'}
            />
            <SeoContent pageType="heic-to-jpg" />
        </>
    );
}
