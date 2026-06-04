import React from 'react';
import { Helmet } from 'react-helmet-async';
import App from '../AppMain';
import { useLanguage } from '../LanguageContext';
import { AdsterraNativeBanner } from '../components/ads/AdsterraNativeBanner';
import { SeoContent } from '../components/SeoContent';

const seoContent = {
    tr: {
        title: 'Görsel Boyutlandırma (Resize) - Ücretsiz Online | WebImgConverter',
        description: 'Fotoğraf ve görsellerinizin boyutlarını (en x boy) piksellerle değiştirin. Kalite kaybı olmadan JPG, PNG, WebP ve AVIF formatlarında kaydedin.',
        h1: 'Görsel Yeniden Boyutlandırma',
        desc: 'Saniyeler içinde fotoğraflarınızı istediğiniz çözünürlüğe (piksel) ayarlayın. Sosyal medya, web siteleri ve e-postalar için mükemmel boyutlar.',
        dropTitle: 'Görselleri Buraya Sürükleyin',
        dropSub: 'veya tıklayıp bilgisayarınızdan seçin'
    },
    en: {
        title: 'Free Image Resizer Online | WebImgConverter',
        description: 'Resize the dimensions (width x height) of your photos and images in pixels. Save as JPG, PNG, WebP, and AVIF without losing quality.',
        h1: 'Image Resizer',
        desc: 'Adjust your photos to any resolution (pixels) in seconds. Perfect dimensions for social media, websites, and emails.',
        dropTitle: 'Drag & Drop Images Here',
        dropSub: 'or click to browse from your computer'
    },
};

type LangKey = keyof typeof seoContent;

export default function ImageResizerPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr') ? 'tr' : 'en') as LangKey;
    const t = seoContent[activeLang] || seoContent['en'];

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/resize-image" />
            </Helmet>
            
            <App
                defaultTool="image-resizer"
                pageH1={t.h1}
                dropzoneTitle={t.dropTitle}
                dropzoneDesc={t.dropSub}
                allowedSettings={['format', 'quality', 'width', 'height', 'lockAspectRatio']}
            >
                <div className="max-w-4xl mx-auto mt-6">
                    <AdsterraNativeBanner />
                </div>
                <SeoContent pageType="image-resizer" />
            </App>
        </>
    );
}
