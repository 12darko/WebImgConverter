import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ToolWorkspace } from '../components/tool/ToolWorkspace';
import { useLanguage } from '../LanguageContext';
import { SiteShell } from '../components/layout';
import { AdsterraNativeBanner } from '../components/ads/AdsterraNativeBanner';

const seoContent = {
    tr: {
        title: 'Görsel Boyutlandırma (Resize) - Ücretsiz Online | WebImgConverter',
        description: 'Fotoğraf ve görsellerinizin boyutlarını (en x boy) piksellerle değiştirin. Kalite kaybı olmadan JPG, PNG, WebP ve AVIF formatlarında kaydedin.',
        h1: 'Görsel Yeniden Boyutlandırma',
        desc: 'Saniyeler içinde fotoğraflarınızı istediğiniz çözünürlüğe (piksel) ayarlayın. Sosyal medya, web siteleri ve e-postalar için mükemmel boyutlar.',
    },
    en: {
        title: 'Free Image Resizer Online | WebImgConverter',
        description: 'Resize the dimensions (width x height) of your photos and images in pixels. Save as JPG, PNG, WebP, and AVIF without losing quality.',
        h1: 'Image Resizer',
        desc: 'Adjust your photos to any resolution (pixels) in seconds. Perfect dimensions for social media, websites, and emails.',
    },
    de: {
        title: 'Kostenloser Bildgrößenänderer Online | WebImgConverter',
        description: 'Ändern Sie die Abmessungen (Breite x Höhe) Ihrer Fotos und Bilder in Pixeln. Speichern Sie als JPG, PNG, WebP und AVIF ohne Qualitätsverlust.',
        h1: 'Bildgrößenänderer',
        desc: 'Passen Sie Ihre Fotos in Sekundenschnelle an jede Auflösung (Pixel) an. Perfekte Abmessungen für soziale Medien, Websites und E-Mails.',
    },
    fr: {
        title: 'Redimensionneur d\'Image Gratuit en Ligne | WebImgConverter',
        description: 'Redimensionnez les dimensions (largeur x hauteur) de vos photos et images en pixels. Enregistrez au format JPG, PNG, WebP et AVIF sans perte de qualité.',
        h1: 'Redimensionneur d\'Image',
        desc: 'Ajustez vos photos à n\'importe quelle résolution (pixels) en quelques secondes. Dimensions parfaites pour les réseaux sociaux, les sites web et les e-mails.',
    },
};

type LangKey = keyof typeof seoContent;

export default function ImageResizerPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = seoContent[activeLang] || seoContent['en'];

    return (
        <SiteShell bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://WebImgConverter.com/resize-image" />
            </Helmet>
            
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-10 md:py-16">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">{t.h1}</h1>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t.desc}</p>
                    </div>

                    <div className="mb-10">
                        <ToolWorkspace
                            defaultFormat="jpg"
                            dropzoneTitle={activeLang === 'tr' ? 'Görselleri Buraya Sürükleyin' : 'Drag & Drop Images Here'}
                            dropzoneSubtitle={activeLang === 'tr' ? 'veya tıklayıp bilgisayarınızdan seçin' : 'or click to browse from your computer'}
                        />
                    </div>

                    <div className="max-w-4xl mx-auto mt-12 mb-8">
                        <AdsterraNativeBanner />
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
