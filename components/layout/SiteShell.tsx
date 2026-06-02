import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { AuthModal } from '../AuthModal';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../LanguageContext';
import { AdSlot } from '../ads/AdSlot';
import { supabase } from '../../services/supabase';

interface SiteShellProps {
    children: React.ReactNode;
    onSignIn?: () => void;
    onCta?: () => void;
    ctaLabel?: string;
    showCta?: boolean;
    bg?: 'white' | 'subtle' | 'dotted' | 'grid';
}

export const SiteShell: React.FC<SiteShellProps> = ({
    children,
    onSignIn,
    onCta,
    ctaLabel,
    showCta,
    bg = 'white',
}) => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [session, setSession] = useState<any>(null);
    const navigate = useNavigate();
    const { language } = useLanguage();
    const activeLang = typeof language === 'string' && language.startsWith('tr') ? 'tr' : 
                      typeof language === 'string' && language.startsWith('de') ? 'de' : 
                      typeof language === 'string' && language.startsWith('fr') ? 'fr' : 'en';

    const bgClass =
        bg === 'subtle' ? 'bg-slate-50 dark:bg-slate-900 dark:text-white' :
            bg === 'dotted' ? 'bg-white bg-dotted dark:bg-slate-900 dark:text-white' :
                bg === 'grid' ? 'bg-white bg-grid-soft dark:bg-slate-900 dark:text-white' :
                    'bg-white dark:bg-slate-900 dark:text-white';

    const handleSignInClick = () => {
        if (onSignIn) {
            onSignIn();
        } else {
            setIsAuthOpen(true);
        }
    };

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className={`w-full min-h-screen flex flex-col ${bgClass}`}>
            <Helmet htmlAttributes={{ lang: activeLang }} />
            <SiteHeader onSignIn={handleSignInClick} onCta={onCta} ctaLabel={ctaLabel} showCta={showCta} session={session} />
            <AdSlot />
            <main className="flex-1 flex flex-col w-full relative z-10">
                {children}
            </main>
            <div className="w-full relative z-20 shrink-0 mt-auto">
                <AdSlot className="mb-8" />
                <SiteFooter />
            </div>
            <AuthModal 
                isOpen={isAuthOpen} 
                onClose={() => setIsAuthOpen(false)} 
                onSuccess={() => {
                    setIsAuthOpen(false);
                    navigate('/app');
                }} 
            />
        </div>
    );
};
