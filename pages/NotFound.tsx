import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function NotFoundPage() {
    const { language } = useLanguage();

    const content = {
        tr: {
            title: '404 - Sayfa Bulunamadı | VormPixyze',
            h1: 'Sayfa Bulunamadı',
            desc: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
            home: 'Ana Sayfaya Dön'
        },
        en: {
            title: '404 - Page Not Found | VormPixyze',
            h1: 'Page Not Found',
            desc: 'The page you are looking for does not exist or has been moved.',
            home: 'Return to Home'
        }
    };

    const t = language === 'tr' ? content.tr : content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 max-w-lg w-full shadow-2xl">
                    <div className="text-8xl mb-6">😕</div>
                    <h1 className="text-4xl font-bold text-white mb-4">{t.h1}</h1>
                    <p className="text-slate-400 text-lg mb-8">{t.desc}</p>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/25"
                    >
                        {t.home}
                    </Link>
                </div>
            </div>
        </>
    );
}
