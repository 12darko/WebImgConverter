import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';

const seoContent = {
    tr: {
        title: 'Görsel Sıkıştırma - Ücretsiz Online | VormPixyze',
        description: 'Görsellerinizi kalite kaybı olmadan sıkıştırın. Web için optimize edilmiş küçük dosya boyutları.',
        h1: 'Görsel Sıkıştırma',
    },
    en: {
        title: 'Free Image Compressor Online | VormPixyze',
        description: 'Compress images without losing quality. Web-optimized smaller file sizes.',
        h1: 'Image Compressor',
    },
};

export default function CompressImagePage() {
    const language = navigator.language.startsWith('tr') ? 'tr' : 'en';
    const t = seoContent[language];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/compress-image" />
            </Helmet>
            <App
                defaultTool="compress-image"
                pageH1={t.h1}
                acceptTypes="image/png, image/jpeg, image/webp"
                formatBadges={['JPG', 'PNG', 'WEBP']}
                hideFormatSelector={true}
            />
        </>
    );
}
