import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const tools = [
    { id: 'heic-to-jpg', path: '/heic-to-jpg', icon: '📱', gradient: 'from-pink-500 to-rose-500' },
    { id: 'png-to-jpg', path: '/png-to-jpg', icon: '🖼️', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'remove-background', path: '/remove-background', icon: '✨', gradient: 'from-purple-500 to-violet-500' },
    { id: 'compress-image', path: '/compress-image', icon: '📦', gradient: 'from-emerald-500 to-teal-500' },
];

const content = {
    tr: {
        title: 'VormPixyze - Ücretsiz Online Görsel Araçları',
        description: 'HEIC\'i JPG\'ye çevirin, arka plan silin, görselleri sıkıştırın. %100 tarayıcı tabanlı.',
        hero: 'Profesyonel Görsel Araçları',
        heroSub: 'Ücretsiz, Hızlı ve Güvenli',
        trustBadge: '🔒 %100 Tarayıcı Tabanlı • Dosyalar Sunucuya Yüklenmez',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'iPhone fotoğraflarını JPG\'ye çevirin' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'PNG\'leri küçük JPG\'lere dönüştürün' },
            'remove-background': { name: 'AI Arka Plan Silme', desc: 'Yapay zeka ile arka plan silin' },
            'compress-image': { name: 'Görsel Sıkıştırma', desc: 'Dosya boyutunu küçültün' },
        },
        startBtn: 'Başla →',
        allTools: '🛠️ 4 Profesyonel Araç • Tek Platform',
        features: {
            privacy: { title: '%100 Gizlilik', desc: 'Dosyalarınız sunucuya yüklenmez' },
            instant: { title: 'Anında Dönüşüm', desc: 'Saniyeler içinde dönüştürün' },
            ai: { title: 'AI Destekli', desc: 'Akıllı arka plan silme' },
        },
        testimonials: {
            title: 'Kullanıcılarımız Ne Diyor?',
            items: [
                { name: 'Ayşe K.', role: 'Fotoğrafçı', text: 'iPhone fotoğraflarımı saniyeler içinde dönüştürüyorum. Harika!' },
                { name: 'Mehmet T.', role: 'E-Ticaret', text: 'Ürün fotoğraflarından arka plan silmek çok kolay.' },
                { name: 'Zeynep A.', role: 'Blogger', text: 'Görsel sıkıştırma özelliği blog sayfamı hızlandırdı.' }
            ]
        },
        footer: { about: 'Hakkımızda', privacy: 'Gizlilik', terms: 'Şartlar', contact: 'İletişim' }
    },
    en: {
        title: 'VormPixyze - Free Online Image Tools',
        description: 'Convert HEIC to JPG, remove backgrounds, compress images. 100% browser-based.',
        hero: 'Professional Image Tools',
        heroSub: 'Free, Fast & Secure',
        trustBadge: '🔒 100% Browser-Based • Files Never Leave Your Device',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'Convert iPhone photos to JPG' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'Convert PNG to smaller JPGs' },
            'remove-background': { name: 'AI Background Removal', desc: 'Remove backgrounds with AI' },
            'compress-image': { name: 'Image Compression', desc: 'Reduce file size' },
        },
        startBtn: 'Start →',
        allTools: '🛠️ 4 Professional Tools • One Platform',
        features: {
            privacy: { title: '100% Private', desc: 'Files never leave your device' },
            instant: { title: 'Instant Conversion', desc: 'Convert in seconds' },
            ai: { title: 'AI-Powered', desc: 'Smart background removal' },
        },
        testimonials: {
            title: 'What Our Users Say',
            items: [
                { name: 'Sarah M.', role: 'Photographer', text: 'I convert my iPhone photos in seconds. Amazing!' },
                { name: 'John D.', role: 'E-Commerce', text: 'Removing backgrounds from product photos is so easy.' },
                { name: 'Emily R.', role: 'Blogger', text: 'Image compression sped up my blog pages.' }
            ]
        },
        footer: { about: 'About', privacy: 'Privacy', terms: 'Terms', contact: 'Contact' }
    },
    de: {
        title: 'VormPixyze - Kostenlose Online Bildwerkzeuge',
        description: 'HEIC in JPG konvertieren, Hintergründe entfernen, Bilder komprimieren. 100% browserbasiert.',
        hero: 'Professionelle Bildwerkzeuge',
        heroSub: 'Kostenlos, Schnell & Sicher',
        trustBadge: '🔒 100% Browserbasiert • Dateien verlassen nie Ihr Gerät',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'iPhone Fotos in JPG umwandeln' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'PNG in kleinere JPGs umwandeln' },
            'remove-background': { name: 'KI Hintergrund entfernen', desc: 'Hintergründe mit KI entfernen' },
            'compress-image': { name: 'Bildkomprimierung', desc: 'Dateigröße reduzieren' },
        },
        startBtn: 'Start →',
        allTools: '🛠️ 4 Profi-Werkzeuge • Eine Plattform',
        features: {
            privacy: { title: '100% Privat', desc: 'Dateien bleiben auf Ihrem Gerät' },
            instant: { title: 'Sofortige Umwandlung', desc: 'In Sekunden konvertieren' },
            ai: { title: 'KI-gestützt', desc: 'Intelligente Hintergrundentfernung' },
        },
        testimonials: {
            title: 'Was unsere Nutzer sagen',
            items: [
                { name: 'Anna K.', role: 'Fotografin', text: 'Ich konvertiere meine iPhone-Fotos in Sekunden. Großartig!' },
                { name: 'Thomas M.', role: 'E-Commerce', text: 'Hintergründe von Produktfotos zu entfernen ist so einfach.' },
                { name: 'Lisa B.', role: 'Bloggerin', text: 'Die Bildkomprimierung hat meine Blogseiten beschleunigt.' }
            ]
        },
        footer: { about: 'Über uns', privacy: 'Datenschutz', terms: 'AGB', contact: 'Kontakt' }
    },
    fr: {
        title: 'VormPixyze - Outils d\'images en ligne gratuits',
        description: 'Convertir HEIC en JPG, supprimer les arrière-plans, compresser les images. 100% basé sur le navigateur.',
        hero: 'Outils d\'images professionnels',
        heroSub: 'Gratuit, Rapide & Sécurisé',
        trustBadge: '🔒 100% Basé sur navigateur • Les fichiers ne quittent jamais votre appareil',
        tools: {
            'heic-to-jpg': { name: 'HEIC → JPG', desc: 'Convertir photos iPhone en JPG' },
            'png-to-jpg': { name: 'PNG → JPG', desc: 'Convertir PNG en JPG plus petits' },
            'remove-background': { name: 'Suppression d\'arrière-plan IA', desc: 'Supprimer les arrière-plans avec l\'IA' },
            'compress-image': { name: 'Compression d\'image', desc: 'Réduire la taille du fichier' },
        },
        startBtn: 'Commencer →',
        allTools: '🛠️ 4 Outils professionnels • Une plateforme',
        features: {
            privacy: { title: '100% Privé', desc: 'Les fichiers ne quittent jamais votre appareil' },
            instant: { title: 'Conversion instantanée', desc: 'Convertir en secondes' },
            ai: { title: 'Alimenté par l\'IA', desc: 'Suppression intelligente d\'arrière-plan' },
        },
        testimonials: {
            title: 'Ce que disent nos utilisateurs',
            items: [
                { name: 'Sophie L.', role: 'Photographe', text: 'Je convertis mes photos iPhone en quelques secondes. Incroyable!' },
                { name: 'Pierre D.', role: 'E-Commerce', text: 'Supprimer les arrière-plans des photos produits est si facile.' },
                { name: 'Marie R.', role: 'Blogueuse', text: 'La compression d\'images a accéléré mes pages de blog.' }
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

            <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans flex flex-col">
                {/* Header */}
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center">
                        <div className="flex items-center gap-3">
                            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                                <defs><linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                                <path d="M20 15 L40 75 L50 90 L60 75 L80 15 L65 15 L50 60 L35 15 Z" fill="url(#logoGrad)" />
                            </svg>
                            <span className="text-xl font-bold text-white">Vorm<span className="text-indigo-400">Pixyze</span></span>
                        </div>
                    </div>
                </nav>

                {/* Hero */}
                <main className="flex-1">
                    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
                        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                            <span>{t.trustBadge}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
                            <span>{t.allTools}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{t.hero}</h1>
                        <p className="text-lg text-slate-400 mb-10">{t.heroSub}</p>

                        {/* Tool Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                            {tools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={tool.path}
                                    className="group bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all text-left"
                                >
                                    <div className="text-2xl mb-2">{tool.icon}</div>
                                    <h3 className="text-sm font-bold text-white mb-1">{t.tools[tool.id].name}</h3>
                                    <p className="text-xs text-slate-400 mb-2">{t.tools[tool.id].desc}</p>
                                    <span className="text-indigo-400 text-xs font-medium">{t.startBtn}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">🔒</div>
                                <h3 className="font-bold text-white mb-1">{t.features.privacy.title}</h3>
                                <p className="text-sm text-slate-400">{t.features.privacy.desc}</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">⚡</div>
                                <h3 className="font-bold text-white mb-1">{t.features.instant.title}</h3>
                                <p className="text-sm text-slate-400">{t.features.instant.desc}</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="text-3xl mb-3">🎨</div>
                                <h3 className="font-bold text-white mb-1">{t.features.ai.title}</h3>
                                <p className="text-sm text-slate-400">{t.features.ai.desc}</p>
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

                {/* Footer */}
                <footer className="border-t border-slate-800 py-6 mt-auto">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
                            <Link to="/about" className="text-slate-400 hover:text-white transition-colors">{t.footer.about}</Link>
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
