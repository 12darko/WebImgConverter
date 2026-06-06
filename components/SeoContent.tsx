import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

import seoDataTr from './seoData_tr';
import seoDataEn from './seoData_en';

export type SeoPageType = 
    | 'home' 
    | 'heic-converter' 
    | 'png-converter' 
    | 'webp-converter' 
    | 'jpg-converter' 
    | 'avif-converter' 
    | 'remove-background' 
    | 'compress-image' 
    | 'svg-converter' 
    | 'crop' 
    | 'favicon-generator' 
    | 'rotate-image' 
    | 'watermark-image' 
    | 'watermark-remover'
    | 'black-and-white' 
    | 'image-resizer';

interface SeoContentProps {
    pageType?: SeoPageType;
}

const seoData = {
    tr: seoDataTr,
    en: seoDataEn
};

type LangKey = keyof typeof seoData;

export const SeoContent = ({ pageType = 'heic-converter' }: SeoContentProps) => {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && language.startsWith('tr') ? 'tr' : 'en') as LangKey;

    const content = seoData[activeLang]?.[pageType] || seoData['en'][pageType];

    if (!content) {
        return null;
    }

    // Generate FAQPage Schema.org JSON-LD
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (content.faq || []).map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <section className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 py-16 px-4 md:px-8 mt-20">
            {/* FAQPage Schema.org for rich snippets */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-12 text-slate-600 dark:text-slate-400">

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{content.title}</h2>
                    <p className="leading-relaxed text-lg whitespace-pre-line">
                        {content.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(content.features || []).map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-card transition-shadow">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {activeLang === 'tr' ? 'Sıkça Sorulan Sorular (SSS)' : 'Frequently Asked Questions'}
                    </h3>

                    <div className="space-y-4">
                        {(content.faq || []).map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-start gap-2">
                                    <span className="text-brand-500 font-bold">Q.</span>
                                    <span>{item.q}</span>
                                </h4>
                                <p className="text-sm leading-relaxed pl-6">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
