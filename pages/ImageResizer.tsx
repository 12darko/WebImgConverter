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
        dropSub: 'veya tıklayıp bilgisayarınızdan seçin',
        feature1: 'Hassas Piksel Kontrolü', feature1Desc: 'Görsellerinizi tam olarak istediğiniz piksel genişliği ve yüksekliğinde yeniden boyutlandırın.',
        feature2: 'En-Boy Oranı Kilidi', feature2Desc: 'En-boy oranını kilitleyerek görsellerinizin esnemesini veya bozulmasını önleyin.',
        feature3: 'Çoklu Format Çıktısı', feature3Desc: 'Yeniden boyutlandırdığınız görselleri JPG, PNG, WebP veya AVIF olarak kaydedin.',
        howTo: 'Görsel Nasıl Boyutlandırılır?',
        step1: 'Görsel Yükle', step1Desc: 'Boyutlandırmak istediğiniz dosyaları seçin.',
        step2: 'Boyutları Ayarla', step2Desc: 'Genişlik, yükseklik ve oran kilidini ayarlayın.',
        step3: 'İndir', step3Desc: 'Yeniden boyutlandırılmış resmi indirin.'
    },
    en: {
        title: 'Free Image Resizer Online | WebImgConverter',
        description: 'Resize the dimensions (width x height) of your photos and images in pixels. Save as JPG, PNG, WebP, and AVIF without losing quality.',
        h1: 'Image Resizer',
        desc: 'Adjust your photos to any resolution (pixels) in seconds. Perfect dimensions for social media, websites, and emails.',
        dropTitle: 'Drag & Drop Images Here',
        dropSub: 'or click to browse from your computer',
        feature1: 'Precise Pixel Control', feature1Desc: 'Resize your images to the exact pixel width and height you need.',
        feature2: 'Aspect Ratio Lock', feature2Desc: 'Lock the aspect ratio to prevent your images from stretching or distorting.',
        feature3: 'Multi-Format Output', feature3Desc: 'Save your resized images in JPG, PNG, WebP, or AVIF formats.',
        howTo: 'How to Resize an Image?',
        step1: 'Upload Image', step1Desc: 'Select the images you want to resize.',
        step2: 'Set Dimensions', step2Desc: 'Adjust the width, height, and ratio lock.',
        step3: 'Download', step3Desc: 'Download your resized image instantly.'
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
                <link rel="canonical" href="https://webimgconverter.com/resize-image" />
            </Helmet>
            
            <App
                defaultTool="image-resizer"
                pageH1={t.h1}
                dropzoneTitle={t.dropTitle}
                dropzoneDesc={t.dropSub}
                allowedSettings={['format', 'quality', 'width', 'height', 'lockAspectRatio']}
            >
                <div className="max-w-4xl mx-auto space-y-16 px-4 md:px-8 pb-20 mt-16">
                    {/* Unique Feature Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">📐</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature1}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature1Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature2}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature2Desc}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-card hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.feature3}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.feature3Desc}</p>
                        </div>
                    </div>

                    {/* Visual How-To Steps */}
                    <div className="space-y-8 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/40 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white text-center">
                            {t.howTo}
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">1</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step1}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step1Desc}</p>
                            </div>
                            <div className="hidden md:block w-full h-0.5 bg-brand-200 dark:bg-brand-800 absolute top-1/2 -translate-y-1/2 -z-0"></div>
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">2</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step2}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step2Desc}</p>
                            </div>
                            <div className="flex-1 text-center relative z-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-800 rounded-xl flex items-center justify-center text-xl font-bold text-brand-600 dark:text-brand-400 mx-auto mb-4">3</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{t.step3}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t.step3Desc}</p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mt-6">
                        <AdsterraNativeBanner />
                    </div>
                </div>
                <SeoContent pageType="image-resizer" />
            </App>
        </>
    );
}
