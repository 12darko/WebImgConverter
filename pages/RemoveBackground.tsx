import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../App';

const seoContent = {
    tr: {
        title: 'AI Arka Plan Silme - Ücretsiz Online | VormPixyze',
        description: 'Yapay zeka ile fotoğraflarınızın arka planını tek tıkla silin. E-ticaret, profil fotoğrafları için mükemmel.',
        h1: 'AI Arka Plan Silme',
    },
    en: {
        title: 'Free AI Background Remover Online | VormPixyze',
        description: 'Remove photo backgrounds with AI in one click. Perfect for e-commerce, profile photos.',
        h1: 'AI Background Remover',
    },
};

export default function RemoveBackgroundPage() {
    const language = navigator.language.startsWith('tr') ? 'tr' : 'en';
    const t = seoContent[language];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/remove-background" />
            </Helmet>
            <App
                defaultTool="remove-background"
                pageH1={t.h1}
                acceptTypes="image/png, image/jpeg, image/webp"
                formatBadges={['JPG', 'PNG', 'WEBP']}
            />
        </>
    );
}
