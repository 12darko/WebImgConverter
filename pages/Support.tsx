import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { SiteShell } from '../components/layout';
import { SearchInput } from '../components/ui/SearchInput';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { createSupportTicket } from '../services/supabase';

interface Category {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const Icon = (paths: React.ReactNode) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths}
    </svg>
);

const content = {
    tr: {
        metaTitle: 'Yardým Merkezi — WebImgConverter Destek',
        metaDesc: 'Bilgi bankamýzda arama yapýn veya WebImgConverter\'ý en iyi þekilde kullanmak için ihtiyacýnýz olan cevaplarý bulmak üzere kategorilere göz atýn.',
        ctaLabel: 'Hemen Baþla',
        heading: 'Size nasýl yardýmcý olabiliriz?',
        subheading: 'Bilgi bankamýzda arama yapýn veya WebImgConverter\'ý en iyi þekilde kullanmak için ihtiyacýnýz olan cevaplarý bulmak üzere kategorilere göz atýn.',
        searchPlaceholder: 'Makale, eðitim veya sorun giderme rehberi arayýn',
        categories: {
            'getting-started': { title: 'Baþlarken', description: 'Hesabýnýzý oluþturmak ve ilk projenizi baþlatmak için hýzlý rehberler.' },
            'account': { title: 'Hesap ve Faturalandýrma', description: 'Aboneliðinizi, ekip üyelerinizi ve ödeme yöntemlerinizi yönetin.' },
            'troubleshooting': { title: 'Sorun Giderme', description: 'Sýk karþýlaþýlan sorunlar, hata mesajlarý ve sistem durumu hakkýnda çözümler.' },
            'api': { title: 'API Entegrasyonu', description: 'Geliþtirici belgeleri, uç noktalar ve kimlik doðrulama rehberleri.' }
        },
        popularArticlesTitle: 'Popüler Makaleler',
        popularArticles: [
            { title: 'Çalýþma alanýnýza ekip üyeleri nasýl davet edilir?', href: '#' },
            { title: 'Aylýk fatura özetinizi anlama', href: '#' },
            { title: 'Projeleriniz için özel alan adlarý ayarlama', href: '#' },
            { title: 'Baðlantý zaman aþýmý sorunlarýný giderme', href: '#' }
        ],
        stillNeedHelp: 'Hâlâ yardýma mý ihtiyacýnýz var?',
        supportTeamReady: 'Destek ekibimiz size yardýmcý olmaya hazýr.',
        emailSupport: {
            title: 'E-posta Desteði',
            desc: 'Bize detaylý bir mesaj gönderin, 24 saat içinde size dönüþ yapalým.',
            btnOpen: 'E-posta Gönder',
            btnClose: 'Formu Kapat'
        },
        liveChat: {
            title: 'Canlý Sohbet',
            desc: 'Mesai saatleri içinde anýnda destek için bir müþteri temsilcisiyle doðrudan sohbet edin.',
            btn: 'Sohbeti Baþlat'
        },
        form: {
            title: 'Bize mesaj gönderin',
            email: 'E-posta Adresiniz',
            emailPlaceholder: 'siz@ornek.com',
            subject: 'Konu',
            subjectPlaceholder: 'Size nasýl yardýmcý olabiliriz?',
            message: 'Mesaj',
            messagePlaceholder: 'Sorununuzu veya sorunuzu açýklayýn...',
            success: 'Teþekkürler! Talebiniz alýndý. Size 24 saat içinde dönüþ yapacaðýz.',
            error: 'Talebiniz gönderilemedi. Lütfen tekrar deneyin veya doðrudan bize e-posta gönderin.',
            submit: 'Talebi Gönder',
            submitting: 'Gönderiliyor...'
        }
    },
    en: {
        metaTitle: 'Help Center — WebImgConverter Support',
        metaDesc: 'Search our knowledge base or browse categories below to find the answers you need to make the most of WebImgConverter.',
        ctaLabel: 'Get Started',
        heading: 'How can we help?',
        subheading: 'Search our knowledge base or browse categories below to find the answers you need to make the most out of WebImgConverter.',
        searchPlaceholder: 'Search for articles, tutorials, or troubleshooting',
        categories: {
            'getting-started': { title: 'Getting Started', description: 'Quick guides to set up your account and launch your first project.' },
            'account': { title: 'Account & Billing', description: 'Manage your subscription, team members, and payment methods.' },
            'troubleshooting': { title: 'Troubleshooting', description: 'Solutions to common issues, error messages, and system status.' },
            'api': { title: 'API Integration', description: 'Developer documentation, endpoints, and authentication guides.' }
        },
        popularArticlesTitle: 'Popular Articles',
        popularArticles: [
            { title: 'How to invite team members to your workspace', href: '#' },
            { title: 'Understanding your monthly billing statement', href: '#' },
            { title: 'Setting up custom domains for your projects', href: '#' },
            { title: 'Troubleshooting connection timeouts', href: '#' }
        ],
        stillNeedHelp: 'Still need help?',
        supportTeamReady: 'Our support team is ready to assist you.',
        emailSupport: {
            title: 'Email Support',
            desc: 'Send us a detailed message and we\'ll get back to you within 24 hours.',
            btnOpen: 'Send an Email',
            btnClose: 'Close Form'
        },
        liveChat: {
            title: 'Live Chat',
            desc: 'Chat directly with a support agent for immediate assistance during business hours.',
            btn: 'Start Chat'
        },
        form: {
            title: 'Send us a message',
            email: 'Your Email',
            emailPlaceholder: 'you@example.com',
            subject: 'Subject',
            subjectPlaceholder: 'How can we help?',
            message: 'Message',
            messagePlaceholder: 'Describe your issue or question...',
            success: 'Thanks! Your ticket was submitted. We\'ll get back to you within 24 hours.',
            error: 'Could not submit your ticket. Please try again or email us directly.',
            submit: 'Submit Ticket',
            submitting: 'Sending...'
        }
    },
    de: {
        metaTitle: 'Hilfe-Center — WebImgConverter Support',
        metaDesc: 'Durchsuchen Sie unsere Wissensdatenbank oder stöbern Sie in den Kategorien unten, um Antworten zu finden.',
        ctaLabel: 'Jetzt Starten',
        heading: 'Wie können wir helfen?',
        subheading: 'Durchsuchen Sie unsere Wissensdatenbank oder stöbern Sie in den Kategorien unten, um Antworten zu finden.',
        searchPlaceholder: 'Suchen Sie nach Artikeln, Tutorials oder Fehlerbehebung',
        categories: {
            'getting-started': { title: 'Erste Schritte', description: 'Kurzanleitungen zur Einrichtung Ihres Kontos und zum Start Ihres ersten Projekts.' },
            'account': { title: 'Konto & Abrechnung', description: 'Verwalten Sie Ihr Abonnement, Teammitglieder und Zahlungsmethoden.' },
            'troubleshooting': { title: 'Fehlerbehebung', description: 'Lösungen für häufige Probleme, Fehlermeldungen und Systemstatus.' },
            'api': { title: 'API-Integration', description: 'Entwicklerdokumentation, Endpunkte und Authentifizierungsleitfäden.' }
        },
        popularArticlesTitle: 'Beliebte Artikel',
        popularArticles: [
            { title: 'Wie man Teammitglieder in den Workspace einlädt', href: '#' },
            { title: 'Ihre monatliche Abrechnung verstehen', href: '#' },
            { title: 'Einrichten von benutzerdefinierten Domains für Ihre Projekte', href: '#' },
            { title: 'Fehlerbehebung bei Verbindungs-Timeouts', href: '#' }
        ],
        stillNeedHelp: 'Benötigen Sie noch Hilfe?',
        supportTeamReady: 'Unser Support-Team steht bereit, um Ihnen zu helfen.',
        emailSupport: {
            title: 'E-Mail-Support',
            desc: 'Senden Sie uns eine detaillierte Nachricht und wir melden uns innerhalb von 24 Stunden.',
            btnOpen: 'Eine E-Mail senden',
            btnClose: 'Formular schließen'
        },
        liveChat: {
            title: 'Live-Chat',
            desc: 'Chatten Sie während der Geschäftszeiten direkt mit einem Support-Mitarbeiter.',
            btn: 'Chat starten'
        },
        form: {
            title: 'Senden Sie uns eine Nachricht',
            email: 'Ihre E-Mail',
            emailPlaceholder: 'sie@beispiel.com',
            subject: 'Betreff',
            subjectPlaceholder: 'Wie können wir helfen?',
            message: 'Nachricht',
            messagePlaceholder: 'Beschreiben Sie Ihr Problem oder Ihre Frage...',
            success: 'Danke! Ihr Ticket wurde eingereicht. Wir melden uns innerhalb von 24 Stunden.',
            error: 'Ticket konnte nicht eingereicht werden. Bitte versuchen Sie es erneut.',
            submit: 'Ticket einreichen',
            submitting: 'Wird gesendet...'
        }
    },
    fr: {
        metaTitle: 'Centre d\'Aide — Support WebImgConverter',
        metaDesc: 'Recherchez dans notre base de connaissances ou parcourez les catégories ci-dessous pour trouver des réponses.',
        ctaLabel: 'Commencer',
        heading: 'Comment pouvons-nous vous aider ?',
        subheading: 'Recherchez dans notre base de connaissances ou parcourez les catégories ci-dessous pour trouver les réponses dont vous avez besoin.',
        searchPlaceholder: 'Rechercher des articles, tutoriels ou dépannage',
        categories: {
            'getting-started': { title: 'Pour Commencer', description: 'Guides rapides pour configurer votre compte et lancer votre premier projet.' },
            'account': { title: 'Compte & Facturation', description: 'Gérez votre abonnement, les membres de l\'équipe et les méthodes de paiement.' },
            'troubleshooting': { title: 'Dépannage', description: 'Solutions aux problèmes courants, messages d\'erreur et état du système.' },
            'api': { title: 'Intégration API', description: 'Documentation développeur, points de terminaison et guides d\'authentification.' }
        },
        popularArticlesTitle: 'Articles Populaires',
        popularArticles: [
            { title: 'Comment inviter des membres d\'équipe dans votre espace', href: '#' },
            { title: 'Comprendre votre relevé de facturation mensuel', href: '#' },
            { title: 'Configuration de domaines personnalisés pour vos projets', href: '#' },
            { title: 'Dépannage des délais de connexion', href: '#' }
        ],
        stillNeedHelp: 'Toujours besoin d\'aide ?',
        supportTeamReady: 'Notre équipe de support est prête à vous aider.',
        emailSupport: {
            title: 'Support par E-mail',
            desc: 'Envoyez-nous un message détaillé et nous vous répondrons dans les 24 heures.',
            btnOpen: 'Envoyer un e-mail',
            btnClose: 'Fermer le formulaire'
        },
        liveChat: {
            title: 'Chat en Direct',
            desc: 'Discutez directement avec un agent de support pendant les heures de bureau.',
            btn: 'Démarrer le Chat'
        },
        form: {
            title: 'Envoyez-nous un message',
            email: 'Votre E-mail',
            emailPlaceholder: 'vous@exemple.com',
            subject: 'Sujet',
            subjectPlaceholder: 'Comment pouvons-nous aider ?',
            message: 'Message',
            messagePlaceholder: 'Décrivez votre problème ou question...',
            success: 'Merci ! Votre billet a été soumis. Nous vous répondrons dans les 24 heures.',
            error: 'Impossible de soumettre votre billet. Veuillez réessayer.',
            submit: 'Soumettre',
            submitting: 'Envoi en cours...'
        }
    }
};

type LangKey = keyof typeof content;

const CATEGORIES: Category[] = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Quick guides to set up your account and launch your first project.',
        icon: Icon(<>
            <path d="M5 3l14 9-14 9V3z" />
        </>),
    },
    {
        id: 'account',
        title: 'Account & Billing',
        description: 'Manage your subscription, team members, and payment methods.',
        icon: Icon(<>
            <rect x="2" y="6" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
        </>),
    },
    {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Solutions to common issues, error messages, and system status.',
        icon: Icon(<>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </>),
    },
    {
        id: 'api',
        title: 'API Integration',
        description: 'Developer documentation, endpoints, and authentication guides.',
        icon: Icon(<>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </>),
    },
];

const ChevronRight = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const MailIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const ChatIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

import { useLanguage } from '../LanguageContext';

export default function SupportPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.tr;
    const navigate = useNavigate();
    const [showEmailForm, setShowEmailForm] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);
    const [submitResult, setSubmitResult] = React.useState<'success' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) return;
        setSubmitting(true);
        setSubmitResult(null);
        try {
            const result = await createSupportTicket(email, subject, message, false);
            setSubmitResult(result.success ? 'success' : 'error');
            if (result.success) {
                setSubject('');
                setMessage('');
                setEmail('');
            }
        } catch (err) {
            setSubmitResult('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel={t.ctaLabel} bg="white">
            <Helmet>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
                <link rel="canonical" href="https://webimgconverter.com/support" />
            </Helmet>

            <section className="bg-brand-50/30 dark:bg-brand-950/10 border-b border-slate-100 dark:border-slate-800/50">
                <div className="max-w-4xl mx-auto px-5 md:px-8 py-14 md:py-20">
                    <div className="text-center">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            {t.heading}
                        </h1>
                        <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
                            {t.subheading}
                        </p>
                        <div className="max-w-xl mx-auto">
                            <SearchInput
                                placeholder={t.searchPlaceholder}
                                sizeVariant="md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-5 md:px-8 py-12">
                {/* Category cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                    {CATEGORIES.map((c) => {
                        const localizedCat = t.categories[c.id as keyof typeof t.categories];
                        return (
                        <Link
                            key={c.id}
                            to={`#${c.id}`}
                            className="group block bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5 transition-all hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-card-hover"
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                                {c.icon}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1.5">{localizedCat?.title || c.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{localizedCat?.description || c.description}</p>
                        </Link>
                    )})}
                </div>

                {/* Popular articles */}
                <div className="max-w-3xl mx-auto mb-14">
                    <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-5">{t.popularArticlesTitle}</h2>
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl divide-y divide-slate-100 dark:divide-slate-700/50">
                        {t.popularArticles.map((a, i) => (
                            <a
                                key={i}
                                href={a.href}
                                className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group first:rounded-t-2xl last:rounded-b-2xl"
                            >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-slate-400 dark:text-slate-500 shrink-0">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white truncate">{a.title}</span>
                                </div>
                                <span className="text-slate-400 dark:text-slate-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 shrink-0">{ChevronRight}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Still need help? */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.stillNeedHelp}</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t.supportTeamReady}</p>
                    </div>Outfit

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Email Support */}
                        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                                {MailIcon}
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-1.5">{t.emailSupport.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                                {t.emailSupport.desc}
                            </p>
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setShowEmailForm(!showEmailForm)}
                            >
                                {showEmailForm ? t.emailSupport.btnClose : t.emailSupport.btnOpen}
                            </Button>
                        </div>

                        {/* Live Chat */}
                        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800/50 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4">
                                {ChatIcon}
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans mb-1.5">{t.liveChat.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                                {t.liveChat.desc}
                            </p>
                            <Button variant="primary" size="md">
                                {t.liveChat.btn}
                            </Button>
                        </div>
                    </div>

                    {/* Email Form */}
                    {showEmailForm && (
                        <form onSubmit={handleSubmit} className="mt-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6 space-y-4 animate-fadeIn">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t.form.title}</h3>
                            <Input
                                type="email"
                                label={t.form.email}
                                placeholder={t.form.emailPlaceholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label={t.form.subject}
                                placeholder={t.form.subjectPlaceholder}
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                            <Textarea
                                label={t.form.message}
                                placeholder={t.form.messagePlaceholder}
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            {submitResult === 'success' && (
                                <div className="text-xs text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/30 p-3 rounded-xl">
                                    {t.form.success}
                                </div>
                            )}
                            {submitResult === 'error' && (
                                <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-3 rounded-xl">
                                    {t.form.error}
                                </div>
                            )}
                            <Button type="submit" disabled={submitting} fullWidth>
                                {submitting ? t.form.submitting : t.form.submit}
                            </Button>
                        </form>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}
