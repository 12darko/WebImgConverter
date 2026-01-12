import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';

const seoContent = {
    tr: {
        title: 'PNG to JPG Dönüştürücü - Ücretsiz Online | VormPixyze',
        description: 'PNG dosyalarınızı küçük boyutlu JPG formatına dönüştürün. %100 tarayıcı tabanlı, hızlı ve güvenli.',
        h1: 'PNG to JPG Dönüştürücü',
    },
    en: {
        title: 'Free PNG to JPG Converter Online | VormPixyze',
        description: 'Convert PNG files to smaller JPG format. 100% browser-based, fast and secure.',
        h1: 'PNG to JPG Converter',
    },
};

export default function PngToJpgPage() {
    const language = navigator.language.startsWith('tr') ? 'tr' : 'en';
    const t = seoContent[language];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/png-to-jpg" />
            </Helmet>
            <App
                defaultTool="png-to-jpg"
                pageH1={t.h1}
                acceptTypes="image/png"
                formatBadges={['PNG', '→', 'JPG']}
                defaultOutputFormat="jpg"
            />
        </>
    );
}
