import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Hakkımızda - WebImgConverter',
        description: 'WebImgConverter, kullanıcı dostu ve hızlı görsel dönüştürme araçları sunan bir teknoloji girişimidir.',
        h1: 'Hakkımızda',
        mission: 'Misyonumuz',
        missionDesc: 'Karmaşık dosya formatlarını ve görsel düzenleme işlemlerini herkes için erişilebilir ve kolay hale getirmek.',
        story: 'Hikayemiz',
        storyDesc: '2025 yılında, HEIC ve WebP formatlarının yarattığı uyumluluk sorunlarına çözüm olarak doğduk. Bugün ise yapay zeka destekli araçlarımızla (arka plan silme, sıkıştırma) binlerce kullanıcıya hizmet veriyoruz. Ücretsiz temel araçlar ve profesyoneller için gelişmiş seçenekler sunuyoruz.',
        philosophy: 'Gizlilik Felsefemiz',
        philosophyText: 'WebImgConverter, kullanıcı gizliliğini ön planda tutar. Geleneksel araçların aksine, görsellerinizi asla kalıcı olarak depolamayız. Tüm görsel ve yapay zeka işlemleri güvenli sunucularda anlık olarak tamamlanır ve anında silinir.',
        whyUs: 'Neden WebImgConverter?',
        features: [
            { icon: '🔒', title: '%100 Gizlilik', desc: 'Dosyalarınız asla kalıcı olarak depolanmaz. İşlemler güvenli sunucularda anlık yapılır ve hemen silinir.' },
            { icon: '⚡', title: 'Işık Hızında', desc: 'WebAssembly teknolojisi ile saniyeler içinde yüzlerce görseli işleyin. Bekleme yok.' },
            { icon: '🎨', title: 'AI Teknolojisi', desc: 'Yapay zeka destekli arka plan silme ve akıllı dosya isimlendirme özellikleri.' },
            { icon: '💎', title: 'Premium Kalite', desc: 'Profesyonel düzeyde dönüşüm kalitesi, kayıpsız veya optimize sıkıştırma seçenekleri.' },
            { icon: '🌍', title: 'Çoklu Dil', desc: 'Türkçe, İngilizce, Almanca ve Fransızca dahil 4 dilde kullanıma hazır.' },
            { icon: '📱', title: 'Mobil Uyumlu', desc: 'iPhone, Android, tablet ve masaüstü dahil tüm cihazlarda kusursuz çalışır.' }
        ],
        techTitle: 'Teknolojimiz',
        techText: 'WebImgConverter, en son web teknolojilerini kullanır:',
        techItems: [
            'WebAssembly (WASM) ile native hızında işlem',
            'React ve TypeScript ile modern arayüz',
            'Python Pillow-Heif ile gelişmiş HEIC desteği',
            'On-device AI modelleri ile arka plan silme',
            'Progressive Web App (PWA) desteği'
        ],
        supportedFormats: 'Desteklenen Formatlar',
        formats: [
            { name: 'HEIC/HEIF', desc: 'Apple iPhone ve iPad fotoğrafları' },
            { name: 'JPG/JPEG', desc: 'En yaygın fotoğraf formats' },
            { name: 'PNG', desc: 'Şeffaflık destekli, kayıpsız format' },
            { name: 'WebP', desc: 'Google\'ön modern web formats' },
            { name: 'AVIF', desc: 'Yeni nesil, yüksek sıkıştırmalı format' }
        ],
        team: 'Şirket Bilgileri',
        teamText: 'WebImgConverter Inc., kullanıcı gizliliğini ön planda tutan bir yazılım şirketidir. Amacımız, insanların görsellerini güvenle dönüştürebilecekleri, Ücretsiz ve kullanıma kolay araçlar sunmaktır.',
        contact: '📧 İletişim: support@WebImgConverter.com',
        stats: 'Rakamlarla WebImgConverter',
        statsItems: [
            { value: '10+', label: 'Format Desteği' },
            { value: '0', label: 'Veri Depolama' },
            { value: '100%', label: 'Gizlilik' },
            { value: '4', label: 'Dil Desteği' }
        ]
    },
    en: {
        title: 'About Us - WebImgConverter',
        description: 'WebImgConverter is a tech initiative providing user-friendly and fast image conversion tools.',
        h1: 'About Us',
        mission: 'Our Mission',
        missionDesc: 'To make complex file formats and image editing tasks accessible and easy for everyone.',
        story: 'Our Story',
        storyDesc: 'Founded in 2025 as a solution to HEIC and WebP compatibility issues. Today, we serve thousands of users with AI-powered tools like background removal and compression, offering free basic tools and advanced options for professionals.',
        philosophy: 'Our Privacy Philosophy',
        philosophyText: 'WebImgConverter prioritizes user privacy. Unlike traditional tools, we never permanently store your files. All visual and AI processing tasks are completed instantly on secure ephemeral servers and deleted immediately.',
        whyUs: 'Why WebImgConverter?',
        features: [
            { icon: '🔒', title: '100% Privacy', desc: 'Your files are never stored. Processing is done instantly on secure servers and deleted immediately.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Process hundreds of images in seconds with WebAssembly technology. No waiting.' },
            { icon: '🎨', title: 'AI Technology', desc: 'AI-powered background removal and smart file naming features.' },
            { icon: '💎', title: 'Premium Quality', desc: 'Professional-grade conversion quality with lossless or optimized compression options.' },
            { icon: '🌍', title: 'Multi-Language', desc: 'Available in 4 languages including English, Turkish, German, and French.' },
            { icon: '📱', title: 'Mobile Ready', desc: 'Works flawlessly on all devices including iPhone, Android, tablet, and desktop.' }
        ],
        techTitle: 'Our Technology',
        techText: 'WebImgConverter uses cutting-edge web technologies:',
        techItems: [
            'WebAssembly (WASM) for native-speed processing',
            'React and TypeScript for modern interface',
            'Advanced HEIC support with Python Pillow-Heif',
            'On-device AI models for background removal',
            'Progressive Web App (PWA) support'
        ],
        supportedFormats: 'Supported Formats',
        formats: [
            { name: 'HEIC/HEIF', desc: 'Apple iPhone and iPad photos' },
            { name: 'JPG/JPEG', desc: 'Most common photo format' },
            { name: 'PNG', desc: 'Transparency-enabled, lossless format' },
            { name: 'WebP', desc: 'Google\'s modern web format' },
            { name: 'AVIF', desc: 'Next-gen, high compression format' }
        ],
        team: 'Company Info',
        teamText: 'WebImgConverter Inc. is a software company that prioritizes user privacy. Our goal is to provide free and easy-to-use tools where people can safely convert their images.',
        contact: '📧 Contact: support@WebImgConverter.com',
        stats: 'WebImgConverter by Numbers',
        statsItems: [
            { value: '10+', label: 'Format Support' },
            { value: '0', label: 'Data Storage' },
            { value: '100%', label: 'Privacy' },
            { value: '4', label: 'Languages' }
        ]
    },
    de: {
        title: 'Über Uns | WebImgConverter',
        description: 'Erfahren Sie mehr Über WebImgConverter. Unser datenschutzorientiertes Team entwickelt sichere Bildwerkzeuge.',
        h1: 'Über Uns',
        mission: 'Unsere Mission',
        missionDesc: 'WebImgConverter wurde gegründet, um Bildkonvertierung for alle zugänglich, schnell und sicher zu machen. Wir bieten die beste Benutzererfahrung und schützen dabei Ihre Privatsphäre.',
        story: 'Unsere Geschichte',
        storyDesc: 'Gegründet im Jahr 2025 als Lösung for HEIC- und WebP-Kompatibilitätsprobleme. Heute bedienen wir Tausende von Benutzern mit KI-gestützten Tools wie Hintergrundentfernung und Komprimierung und bieten kostenlose Basistools sowie erweiterte Optionen for Profis.',
        philosophy: 'Unsere Datenschutz-Philosophie',
        philosophyText: 'WebImgConverter priorisiert die Privatsphäre der Benutzer. Im Gegensatz zu herkömmlichen Tools speichern wir Ihre Dateien niemals dauerhaft. Alle Verarbeitungs- und KI-Aufgaben werden sofort auf sicheren Servern erledigt und sofort gelöscht.',
        whyUs: 'Warum WebImgConverter?',
        features: [
            { icon: '🔒', title: '100% Privatsphäre', desc: 'Ihre Dateien werden nie gespeichert. Die Verarbeitung erfolgt entweder auf Ihrem Gerät oder sofort auf sicheren temporären Servern.' },
            { icon: '⚡', title: 'Blitzschnell', desc: 'Verarbeiten Sie Hunderte von Bildern in Sekunden mit WebAssembly-Technologie.' },
            { icon: '🎨', title: 'KI-Technologie', desc: 'KI-gestützte Hintergrundentfernung und intelligente Dateibenennung.' },
            { icon: '💎', title: 'Premium-Qualität', desc: 'Konvertierungsqualität auf professionellem Niveau.' },
            { icon: '🌍', title: 'Mehrsprachig', desc: 'Verfügbar in 4 Sprachen.' },
            { icon: '📱', title: 'Mobil-optimiert', desc: 'Funktioniert einwandfrei auf allen Geräten.' }
        ],
        techTitle: 'Unsere Technologie',
        techText: 'WebImgConverter nutzt modernste Web-Technologien:',
        techItems: [
            'WebAssembly (WASM) for native Geschwindigkeit',
            'React und TypeScript for moderne Oberfläche',
            'Erweiterte HEIC-Unterstützung mit Python Pillow-Heif',
            'On-Device-KI-Modelle for Hintergrundentfernung',
            'Progressive Web App (PWA) Unterstützung'
        ],
        supportedFormats: 'Unterstützte Formate',
        formats: [
            { name: 'HEIC/HEIF', desc: 'Apple iPhone und iPad Fotos' },
            { name: 'JPG/JPEG', desc: 'Häufigstes Fotoformat' },
            { name: 'PNG', desc: 'Transparenz-fähiges, verlustfreies Format' },
            { name: 'WebP', desc: 'Googles modernes Web-Format' },
            { name: 'AVIF', desc: 'Next-Gen, hochkomprimiertes Format' }
        ],
        team: 'Firmeninformationen',
        teamText: 'WebImgConverter Inc. ist ein Softwareunternehmen, das den Datenschutz der Benutzer priorisiert.',
        contact: '📧 Kontakt: support@WebImgConverter.com',
        stats: 'WebImgConverter in Zahlen',
        statsItems: [
            { value: '10+', label: 'Format-Unterstützung' },
            { value: '0', label: 'Datenspeicherung' },
            { value: '100%', label: 'Privatsphäre' },
            { value: '4', label: 'Sprachen' }
        ]
    },
    fr: {
        title: 'h Propos | WebImgConverter',
        description: 'Découvrez WebImgConverter. Notre équipe axée sur la confidentialité développe des outils d\'image basés sur navigateur.',
        h1: 'h Propos',
        mission: 'Notre Mission',
        missionDesc: 'WebImgConverter a été fondé pour rendre la conversion d\'images accessible, rapide et sécurisée pour tous. Nous visons h fournir la meilleure expérience utilisateur tout en protégeant votre vie privée.',
        story: 'Notre Histoire',
        storyDesc: 'Fondé en 2025 comme solution aux problèmes de compatibility HEIC et WebP. Aujourd\'hui, nous servons des milliers d\'utilisateurs avec des outils propulsés par l\'IA comme la suppression d\'arrière-plan et la compression, offrant des outils de base gratuits et des options avancées pour les professionnels.',
        philosophy: 'Notre Philosophie de Confidentialité',
        philosophyText: 'WebImgConverter priorise la confidentialité des utilisateurs. Contrairement aux outils traditionnels, nous ne stockons jamais vos fichiers de manière permanente. La plupart des traitements se font dans votre navigateur, tandis que les tâches IA avancées sont effectuées instantanément sur des serveurs éphémères et supprimées immédiatement.',
        whyUs: 'Pourquoi WebImgConverter?',
        features: [
            { icon: '🔒', title: '100% Confidentialité', desc: 'Vos fichiers ne sont jamais stockés. Les opérations se font soit sur votre appareil, soit instantanément sur des serveurs éphémères sécurisés.' },
            { icon: '⚡', title: 'Ultra Rapide', desc: 'Traitez des centaines d\'images en quelques secondes avec la technologie WebAssembly.' },
            { icon: '🎨', title: 'Technologie IA', desc: 'Suppression d\'arrière-plan et nommage intelligent de fichiers propulsés par l\'IA.' },
            { icon: '💎', title: 'Quality Premium', desc: 'Quality de conversion de niveau professionnel.' },
            { icon: '🌍', title: 'Multi-langues', desc: 'Disponible en 4 langues.' },
            { icon: '📱', title: 'Mobile-Ready', desc: 'Fonctionne parfaitement sur tous les appareils.' }
        ],
        techTitle: 'Notre Technologie',
        techText: 'WebImgConverter utilise les dernières technologies web:',
        techItems: [
            'WebAssembly (WASM) pour un traitement h vitesse native',
            'React et TypeScript pour une interface moderne',
            'Support HEIC avancé avec Python Pillow-Heif',
            'Modèles IA on-device pour la suppression d\'arrière-plan',
            'Support Progressive Web App (PWA)'
        ],
        supportedFormats: 'Formats Supportés',
        formats: [
            { name: 'HEIC/HEIF', desc: 'Photos Apple iPhone et iPad' },
            { name: 'JPG/JPEG', desc: 'Format photo le plus courant' },
            { name: 'PNG', desc: 'Format sans perte avec transparence' },
            { name: 'WebP', desc: 'Format web moderne de Google' },
            { name: 'AVIF', desc: 'Format nouvelle génération haute compression' }
        ],
        team: 'Informations Société',
        teamText: 'WebImgConverter Inc. est une entreprise de logiciels qui priorise la confidentialité des utilisateurs.',
        contact: '📧 Contact: support@WebImgConverter.com',
        stats: 'WebImgConverter en Chiffres',
        statsItems: [
            { value: '10+', label: 'Support Formats' },
            { value: '0', label: 'Stockage de Données' },
            { value: '100%', label: 'Confidentialité' },
            { value: '4', label: 'Langues' }
        ]
    }
};

type LangKey = keyof typeof content;

import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';

export default function AboutPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.tr;
    const navigate = useNavigate();
    const ctaLabel = activeLang === 'tr' ? 'Hemen Başla' : activeLang === 'de' ? 'Jetzt Starten' : activeLang === 'fr' ? 'Commencer' : 'Start Now';

    return (
        <SiteShell onCta={() => navigate('/')} ctaLabel={ctaLabel} bg="white">
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://webimgconverter.com/about" />
            </Helmet>

            <section className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-20">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">{t.h1}</h1>
                    <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">{t.description}</p>
                </div>

                {/* Mission Section */}
                <div className="bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/30 rounded-3xl p-8 md:p-12 mb-16 text-center shadow-sm">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-900 dark:text-brand-300 mb-4">{t.mission}</h2>
                    <p className="text-brand-800 dark:text-brand-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">{t.missionDesc}</p>
                </div>

                {/* Story and Philosophy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 shadow-card">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.story}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t.storyDesc}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 shadow-card">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t.philosophy}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t.philosophyText}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {t.statsItems.map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 text-center shadow-sm">
                            <div className="text-4xl font-serif font-extrabold text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Why Us */}
                <div className="mb-16">
                    <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">{t.whyUs}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t.features.map((feature, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 hover:shadow-card-hover hover:border-brand-300 dark:hover:border-brand-700 transition-all">
                                <div className="text-3xl mb-4 bg-brand-50 dark:bg-brand-900/30 w-12 h-12 flex items-center justify-center rounded-xl border border-brand-100 dark:border-brand-800/50">{feature.icon}</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technology and Formats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.techTitle}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{t.techText}</p>
                        <ul className="space-y-3">
                            {t.techItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 font-medium">
                                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t.supportedFormats}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {t.formats.map((format, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                                    <div className="font-mono text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 px-2 py-1 rounded shrink-0">{format.name}</div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">{format.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="bg-slate-900 dark:bg-slate-950/70 border border-slate-800 rounded-3xl p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl" />
                    <div className="relative">
                        <h2 className="font-serif text-2xl font-bold text-white mb-4">{t.team}</h2>
                        <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">{t.teamText}</p>
                        <div className="inline-block bg-white/10 border border-white/20 text-white font-medium px-4 py-2 rounded-xl backdrop-blur-sm">
                            {t.contact}
                        </div>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
