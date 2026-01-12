import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const links = {
    tr: {
        home: 'Ana Sayfa',
        about: 'Hakkımızda',
        privacy: 'Gizlilik',
        terms: 'Şartlar',
        contact: 'İletişim'
    },
    en: {
        home: 'Home',
        about: 'About',
        privacy: 'Privacy',
        terms: 'Terms',
        contact: 'Contact'
    },
    de: {
        home: 'Startseite',
        about: 'Über uns',
        privacy: 'Datenschutz',
        terms: 'AGB',
        contact: 'Kontakt'
    },
    fr: {
        home: 'Accueil',
        about: 'À propos',
        privacy: 'Confidentialité',
        terms: 'Conditions',
        contact: 'Contact'
    }
};

type LanguageKey = keyof typeof links;

export const LegalFooter: React.FC = () => {
    const { language } = useLanguage();
    const t = links[language as LanguageKey] || links.en;

    return (
        <footer className="border-t border-slate-800 py-6 mt-auto">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
                    <Link to="/" className="text-slate-400 hover:text-white transition-colors">{t.home}</Link>
                    <Link to="/about" className="text-slate-400 hover:text-white transition-colors">{t.about}</Link>
                    <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">{t.privacy}</Link>
                    <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">{t.terms}</Link>
                    <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">{t.contact}</Link>
                </div>
                <div className="text-center text-slate-500 text-sm">
                    © 2025 VormPixyze Inc.
                </div>
            </div>
        </footer>
    );
};
