import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { SeoContent } from '../components/SeoContent';
import { HomePageSchema } from '../components/StructuredData';

// Secondary tools (HEIC and WebP are now featured as hero cards)
const tools = [
    { id: 'png-to-jpg', path: '/png-to-jpg', icon: '🖼️', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'remove-background', path: '/remove-background', icon: '✨', gradient: 'from-purple-500 to-violet-500' },
    { id: 'compress-image', path: '/compress-image', icon: '📦', gradient: 'from-emerald-500 to-teal-500' },
];

const content = {
    tr: {
        title: 'HEIC & WebP Çevirici - Ücretsiz Online | VormPixyze',
        description: 'HEIC ve WebP dosyalarını saniyeler içinde JPG/PNG\'ye çevirin. Hızlı, güvenli ve ücretsiz.',
        hero: 'Görsellerinizi Anında Dönüştürün',
        heroSub: 'HEIC ve WebP dosyalarını saniyeler içinde JPG\'ye çevirin. Yükleme yok, bekleme yok.',
        trustBadge: '🔒 Güvenli İşlem • Gizlilik Öncelikli',
        toolsTitle: 'Diğer Araçlar',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'iPhone fotoğraflarını JPG\'ye çevirin' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'PNG\'leri küçük JPG\'lere dönüştürün' },
            'webp-to-jpg': { name: 'WebP → JPG', desc: 'WebP dosyalarını JPG/PNG\'ye çevirin' },
            'remove-background': { name: 'Arka Plan Sil', desc: 'Yapay zeka ile arka planı kaldırın' },
            'compress-image': { name: 'Görsel Küçült', desc: 'Kalite bozmadan boyut küçültün' },
        },
        cta: 'HEIC Çevirmeye Başla',
        features: {
            privacy: { title: 'Gizlilik Öncelikli', desc: 'Dosyalarınız güvenle işlenir ve saklanmaz' },
            instant: { title: 'Anında Sonuç', desc: 'WASM teknolojisi ile ışık hızında dönüşüm' },
            ai: { title: 'Yüksek Kalite', desc: 'Görüntü kalitesini koruyarak dönüştürün' },
        },
        testimonials: {
            title: 'Kullanıcı Yorumları',
            items: [
                { name: 'Ayşe K.', role: 'Fotoğrafçı', text: 'iPhone\'dan bilgisayara fotoğraf atarken yaşadığım HEIC sorununu saniyede çözdü.' },
                { name: 'Mehmet T.', role: 'E-Ticaret', text: 'Toplu dönüştürme özelliği inanılmaz hızlı çalışıyor.' },
                { name: 'Zeynep A.', role: 'Tasarımcı', text: 'Hem HEIC çevirip hem de arka plan silebilmesi harika.' }
            ]
        },
        footer: { about: 'Hakkımızda', privacy: 'Gizlilik', terms: 'Şartlar', contact: 'İletişim' }
    },
    en: {
        title: 'Free HEIC & WebP to JPG Converter | VormPixyze',
        description: 'Convert HEIC and WebP images to JPG instantly. Secure, fast, and free.',
        hero: 'Convert Images Instantly',
        heroSub: 'Transform HEIC and WebP files to JPG/PNG in seconds. No uploads, no waiting.',
        trustBadge: '🔒 Secure Processing • Privacy First',
        toolsTitle: 'More Tools',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'Convert iPhone photos to JPG' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'Convert PNG to optimized JPG' },
            'webp-to-jpg': { name: 'WebP → JPG', desc: 'Convert WebP images to JPG/PNG' },
            'remove-background': { name: 'Remove BG', desc: 'Remove image backgrounds instantly' },
            'compress-image': { name: 'Compress', desc: 'Reduce file size without quality loss' },
        },
        cta: 'Start Converting HEIC',
        features: {
            privacy: { title: 'Privacy First', desc: 'Files are processed securely and never stored' },
            instant: { title: 'Lightning Fast', desc: 'Powered by WebAssembly technology' },
            ai: { title: 'High Quality', desc: 'Maintain original image quality' },
        },
        testimonials: {
            title: 'User Reviews',
            items: [
                { name: 'Sarah M.', role: 'Photographer', text: 'Fixed my iPhone HEIC compatibility issues instantly. great tool!' },
                { name: 'John D.', role: 'Developer', text: 'Love that it handles files securely without permanent storage.' },
                { name: 'Emily R.', role: 'Content Creator', text: 'The batch conversion feature is a lifesaver.' }
            ]
        },
        footer: { about: 'About', privacy: 'Privacy', terms: 'Terms', contact: 'Contact' }
    },
    de: {
        title: 'Kostenloser HEIC in JPG Konverter | VormPixyze',
        description: 'Konvertieren Sie iPhone HEIC-Fotos sofort in JPG. Sicher, schnell und kostenlos.',
        hero: 'HEIC sofort in JPG umwandeln',
        heroSub: 'Der schnellste Weg, iPhone-Fotos zu konvertieren. Kein Hochladen.',
        trustBadge: '🔒 Sichere Verarbeitung • Privatsphäre Zuerst',
        toolsTitle: 'Mehr Werkzeuge',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'iPhone Fotos in JPG umwandeln' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'PNG in optimiertes JPG umwandeln' },
            'webp-to-jpg': { name: 'WebP → JPG', desc: 'WebP-Bilder in JPG/PNG umwandeln' },
            'remove-background': { name: 'Hintergrund', desc: 'Hintergründe sofort entfernen' },
            'compress-image': { name: 'Komprimieren', desc: 'Dateigröße ohne Qualitätsverlust' },
        },
        cta: 'HEIC Konvertierung Starten',
        features: {
            privacy: { title: 'Privatsphäre', desc: 'Dateien werden sicher verarbeitet' },
            instant: { title: 'Blitzschnell', desc: 'Angetrieben durch WebAssembly' },
            ai: { title: 'Hohe Qualität', desc: 'Originalqualität beibehalten' },
        },
        testimonials: {
            title: 'Nutzerbewertungen',
            items: [
                { name: 'Anna K.', role: 'Fotografin', text: 'Hat meine HEIC-Probleme sofort gelöst. Tolles Tool!' },
                { name: 'Thomas M.', role: 'Entwickler', text: 'Super, dass es offline funktioniert und nichts hochlädt.' },
                { name: 'Lisa B.', role: 'Designerin', text: 'Die Stapelverarbeitung spart mir so viel Zeit.' }
            ]
        },
        footer: { about: 'Über uns', privacy: 'Datenschutz', terms: 'AGB', contact: 'Kontakt' }
    },
    fr: {
        title: 'Convertisseur HEIC en JPG Gratuit | VormPixyze',
        description: 'Convertissez instantanément vos photos HEIC iPhone en JPG. Sécurisé, rapide et gratuit.',
        hero: 'Convertir HEIC en JPG Instantanément',
        heroSub: 'Le moyen le plus rapide de convertir des photos iPhone. Pas de téléchargement.',
        trustBadge: '🔒 Traitement Sécurisé • Priorité Vie Privée',
        toolsTitle: 'Plus d\'outils',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'Convertir photos iPhone en JPG' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'Convertir PNG en JPG optimisé' },
            'webp-to-jpg': { name: 'WebP → JPG', desc: 'Convertir images WebP en JPG/PNG' },
            'remove-background': { name: 'Détourer', desc: 'Supprimer l\'arrière-plan instantanément' },
            'compress-image': { name: 'Compresser', desc: 'Réduire la taille sans perte' },
        },
        cta: 'Commencer la conversion',
        features: {
            privacy: { title: 'Vie Privée', desc: 'Les fichiers sont traités en toute sécurité' },
            instant: { title: 'Ultra Rapide', desc: 'Propulsé par la technologie WebAssembly' },
            ai: { title: 'Haute Qualité', desc: 'Conservez la qualité originale' },
        },
        testimonials: {
            title: 'Avis Utilisateurs',
            items: [
                { name: 'Sophie L.', role: 'Photographe', text: 'A résolu mes problèmes de compatibilité HEIC instantanément.' },
                { name: 'Pierre D.', role: 'Développeur', text: 'J\'adore que ça marche hors ligne sans upload.' },
                { name: 'Marie R.', role: 'Créatrice', text: 'La conversion par lot est un vrai gain de temps.' }
            ]
        },
        footer: { about: 'À propos', privacy: 'Confidentialité', terms: 'Conditions', contact: 'Contact' }
    },
};

type ContentKey = keyof typeof content;

export default function HomePage() {
    const { language } = useLanguage();
    const t = content[language as ContentKey] || content.en;
    const [stats, setStats] = React.useState({ totalConversions: 0, totalUsers: 0 });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const { getTotalStats } = await import('../services/supabase');
                const data = await getTotalStats();
                setStats(data);
            } catch (error) {
                console.log('Stats fetch optional, continuing without:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/" />
            </Helmet>
            <HomePageSchema />

            <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex flex-col">
                {/* Header */}
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                                <defs><linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                                <path d="M20 15 L40 75 L50 90 L60 75 L80 15 L65 15 L50 60 L35 15 Z" fill="url(#logoGrad)" />
                            </svg>
                            <span className="text-xl font-bold text-white">Vorm<span className="text-indigo-400">Pixyze</span></span>
                        </div>
                        <Link to="/blog" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                            📝 Blog
                        </Link>
                    </div>
                </nav>

                {/* Hero */}
                <main className="flex-1">

                    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center relative overflow-hidden">

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -z-10"></div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                {t.hero}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t.heroSub}
                        </p>

                        {/* ===== HERO CONVERTER CARDS ===== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                            {/* HEIC to JPG - Primary Card */}
                            <Link
                                to="/heic-to-jpg"
                                className="group relative overflow-hidden bg-gradient-to-br from-pink-600/20 to-rose-600/20 border-2 border-pink-500/30 rounded-3xl p-8 hover:border-pink-400/60 transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-pink-500/20"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 opacity-20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                                <div className="relative z-10">
                                    <div className="text-6xl mb-4">📱</div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 group-hover:text-pink-300 transition-colors">
                                        HEIC → JPG
                                    </h2>
                                    <p className="text-lg text-slate-300 mb-4">{t.tools['heic-to-jpg'].desc}</p>
                                    <div className="inline-flex items-center gap-2 text-pink-400 font-semibold group-hover:gap-3 transition-all">
                                        <span>{language === 'tr' ? 'Hemen Başla' : 'Start Now'}</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>

                            {/* WebP to JPG - Primary Card */}
                            <Link
                                to="/webp-to-jpg"
                                className="group relative overflow-hidden bg-gradient-to-br from-emerald-600/20 to-green-600/20 border-2 border-emerald-500/30 rounded-3xl p-8 hover:border-emerald-400/60 transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-emerald-500/20"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 to-green-500 opacity-20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                                <div className="relative z-10">
                                    <div className="text-6xl mb-4">🌐</div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                                        WebP → JPG
                                    </h2>
                                    <p className="text-lg text-slate-300 mb-4">{t.tools['webp-to-jpg'].desc}</p>
                                    <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
                                        <span>{language === 'tr' ? 'Hemen Başla' : 'Start Now'}</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Trust Badge (Simplified) */}
                        <div className="flex justify-center items-center gap-2 text-slate-500 text-sm mb-16">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>{t.trustBadge}</span>
                        </div>

                        {/* More Tools Section */}
                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-white mb-8">{t.toolsTitle}</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                                {tools.map((tool) => (
                                    <Link
                                        key={tool.id}
                                        to={tool.path}
                                        className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-all text-left hover:bg-slate-800/50"
                                    >
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{t.tools[tool.id].name}</h3>
                                        <p className="text-xs text-slate-400">{t.tools[tool.id].desc}</p>
                                    </Link>
                                ))}

                                {/* Advanced Mode - Special Card */}
                                <Link
                                    to="/app"
                                    className="group bg-gradient-to-br from-amber-600/10 to-orange-600/10 border-2 border-amber-500/30 rounded-xl p-5 hover:border-amber-400/60 transition-all text-left hover:bg-amber-900/20 hover:shadow-lg hover:shadow-amber-500/10"
                                >
                                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚙️</div>
                                    <h3 className="text-sm font-bold text-amber-400 mb-1 group-hover:text-amber-300 transition-colors">
                                        {language === 'tr' ? 'Gelişmiş Mod' : language === 'de' ? 'Erweiterter Modus' : language === 'fr' ? 'Mode Avancé' : 'Advanced Mode'}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {language === 'tr' ? 'Tüm formatlar ve özellikler' : language === 'de' ? 'Alle Formate & Funktionen' : language === 'fr' ? 'Tous les formats' : 'All formats & features'}
                                    </p>
                                </Link>
                            </div>
                        </div>

                        {/* Animated Format Showcase */}
                        <section className="mt-16 py-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>

                            {/* Floating Format Badges */}
                            <div className="relative flex flex-wrap justify-center gap-4 md:gap-6">
                                {[
                                    { from: 'HEIC', to: 'JPG', color: 'from-pink-500 to-rose-600', delay: '0s' },
                                    { from: 'PNG', to: 'WEBP', color: 'from-blue-500 to-cyan-600', delay: '0.1s' },
                                    { from: 'AVIF', to: 'PNG', color: 'from-emerald-500 to-teal-600', delay: '0.2s' },
                                    { from: 'WEBP', to: 'JPG', color: 'from-purple-500 to-violet-600', delay: '0.3s' },
                                    { from: 'SVG', to: 'PNG', color: 'from-orange-500 to-amber-600', delay: '0.4s' },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative"
                                        style={{ animationDelay: item.delay }}
                                    >
                                        <div className={`
                                            bg-gradient-to-br ${item.color} 
                                            px-5 py-3 rounded-xl 
                                            flex items-center gap-3
                                            transform hover:scale-110 hover:-translate-y-1
                                            transition-all duration-300 ease-out
                                            shadow-lg hover:shadow-2xl
                                            cursor-default
                                            animate-pulse-slow
                                        `}>
                                            <span className="text-white font-bold text-sm">{item.from}</span>
                                            <span className="text-white/80 text-lg animate-bounce-x">→</span>
                                            <span className="text-white font-bold text-sm">{item.to}</span>
                                        </div>

                                        {/* Glow Effect */}
                                        <div className={`
                                            absolute inset-0 bg-gradient-to-br ${item.color} 
                                            rounded-xl blur-xl opacity-30 
                                            group-hover:opacity-50 transition-opacity
                                            -z-10
                                        `}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats - Only Format Support for now */}
                            <div className="mt-10 flex justify-center">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                                        10+
                                    </div>
                                    <div className="text-xs md:text-sm text-slate-400 mt-1">
                                        {language === 'tr' ? 'Format Desteği' : language === 'de' ? 'Formate' : language === 'fr' ? 'Formats' : 'Formats'}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </main>

                <SeoContent pageType="home" />

                {/* Footer */}
                <footer className="border-t border-slate-800 py-6 mt-auto">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
                            <Link to="/about" className="text-slate-400 hover:text-white transition-colors">{t.footer.about}</Link>
                            <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
                            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">{t.footer.privacy}</Link>
                            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">{t.footer.terms}</Link>
                            <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">{t.footer.contact}</Link>
                        </div>
                        <div className="text-center text-slate-500 text-sm">
                            © 2025 VormPixyze Inc.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
