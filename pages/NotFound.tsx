import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function NotFoundPage() {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const content = {
        tr: {
            title: '404 - Sayfa Bulunamadı | WebImgConverter',
            h1: 'Sayfa Bulunamadı',
            desc: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
            home: 'Ana Sayfaya Dön'
        },
        en: {
            title: '404 - Page Not Found | WebImgConverter',
            h1: 'Page Not Found',
            desc: 'The page you are looking for does not exist or has been moved.',
            home: 'Return to Home'
        },
        de: {
            title: '404 - Seite nicht gefunden | WebImgConverter',
            h1: 'Seite nicht gefunden',
            desc: 'Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.',
            home: 'Zurück zur Startseite'
        },
        fr: {
            title: '404 - Page Non Trouvée | WebImgConverter',
            h1: 'Page Non Trouvée',
            desc: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
            home: 'Retour à l\'Accueil'
        }
    };
    
    const links = {
        tr: { tools: 'Araçlar', blog: 'Blog', contact: 'İletişim' },
        en: { tools: 'Tools', blog: 'Blog', contact: 'Contact' },
        de: { tools: 'Werkzeuge', blog: 'Blog', contact: 'Kontakt' },
        fr: { tools: 'Outils', blog: 'Blog', contact: 'Contact' }
    };

    const activeLang = typeof language === 'string' && language.startsWith('tr') ? 'tr' : 
                      typeof language === 'string' && language.startsWith('de') ? 'de' : 
                      typeof language === 'string' && language.startsWith('fr') ? 'fr' : 'en';
    const t = content[activeLang as keyof typeof content] || content.tr;

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel="Ana Sayfaya Dön" bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <section className="min-h-[70vh] flex flex-col items-center justify-center px-5 md:px-8 py-12 text-center">
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-10 md:p-16 max-w-lg w-full shadow-card dark:shadow-none backdrop-blur-sm">
                    <div className="text-7xl md:text-8xl mb-6 select-none">😕</div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t.h1}</h1>
                    <p className="text-base text-slate-500 dark:text-slate-400 mb-10">{t.desc}</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center h-12 md:h-14 px-8 text-base md:text-lg font-bold text-white bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500 rounded-xl hover:bg-brand-700 hover:shadow-brand transition-all w-full sm:w-auto"
                        >
                            {t.home}
                        </button>
                        <Link
                            to="/tools"
                            className="inline-flex items-center justify-center h-12 md:h-14 px-8 text-base md:text-lg font-bold text-slate-700 bg-slate-100 dark:text-slate-200 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all w-full sm:w-auto"
                        >
                            {links[activeLang as keyof typeof links].tools}
                        </Link>
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <Link to="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">{links[activeLang as keyof typeof links].blog}</Link>
                        <Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400">{links[activeLang as keyof typeof links].contact}</Link>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
