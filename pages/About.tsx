import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { LegalFooter } from '../components/LegalFooter';

const content = {
    tr: {
        title: 'Hakkımızda - VormPixyze',
        description: 'VormPixyze, kullanıcı dostu ve hızlı görsel dönüştürme araçları sunan bir teknoloji girişimidir.',
        h1: 'Hakkımızda',
        mission: 'Misyonumuz',
        missionDesc: 'Karmaşık dosya formatlarını ve görsel düzenleme işlemlerini herkes için erişilebilir ve kolay hale getirmek.',
        story: 'Hikayemiz',
        storyDesc: '2025 yılında, HEIC ve WebP formatlarının yarattığı uyumluluk sorunlarına çözüm olarak doğduk. Bugün ise yapay zeka destekli araçlarımızla (arka plan silme, sıkıştırma) binlerce kullanıcıya hizmet veriyoruz. Ücretsiz temel araçlar ve profesyoneller için gelişmiş seçenekler sunuyoruz.',
        philosophy: 'Gizlilik Felsefemiz',
        philosophyText: 'VormPixyze, kullanıcı gizliliğini ön planda tutar. Geleneksel araçların aksine, görsellerinizi asla kalıcı olarak depolamayız. Çoğu işlem tarayıcınızda yapılırken, gelişmiş AI işlemleri geçici sunucularda anlık olarak tamamlanır ve silinir.',
        whyUs: 'Neden VormPixyze?',
        features: [
            { icon: '🔒', title: '%100 Gizlilik', desc: 'Dosyalarınız asla depolanmaz. İşlemler ya cihazınızda ya da geçici güvenli sunucularda anlık yapılır.' },
            { icon: '⚡', title: 'Işık Hızında', desc: 'WebAssembly teknolojisi ile saniyeler içinde yüzlerce görseli işleyin. Bekleme yok.' },
            { icon: '🎨', title: 'AI Teknolojisi', desc: 'Yapay zeka destekli arka plan silme ve akıllı dosya isimlendirme özellikleri.' },
            { icon: '💎', title: 'Premium Kalite', desc: 'Profesyonel düzeyde dönüşüm kalitesi, kayıpsız veya optimize sıkıştırma seçenekleri.' },
            { icon: '🌍', title: 'Çoklu Dil', desc: 'Türkçe, İngilizce, Almanca ve Fransızca dahil 4 dilde kullanıma hazır.' },
            { icon: '📱', title: 'Mobil Uyumlu', desc: 'iPhone, Android, tablet ve masaüstü dahil tüm cihazlarda kusursuz çalışır.' }
        ],
        techTitle: 'Teknolojimiz',
        techText: 'VormPixyze, en son web teknolojilerini kullanır:',
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
            { name: 'JPG/JPEG', desc: 'En yaygın fotoğraf formatı' },
            { name: 'PNG', desc: 'Şeffaflık destekli, kayıpsız format' },
            { name: 'WebP', desc: 'Google\'ın modern web formatı' },
            { name: 'AVIF', desc: 'Yeni nesil, yüksek sıkıştırmalı format' }
        ],
        team: 'Şirket Bilgileri',
        teamText: 'VormPixyze Inc., kullanıcı gizliliğini ön planda tutan bir yazılım şirketidir. Amacımız, insanların görsellerini güvenle dönüştürebilecekleri, ücretsiz ve kullanımı kolay araçlar sunmaktır.',
        contact: '📧 İletişim: support@vormpixyze.com',
        stats: 'Rakamlarla VormPixyze',
        statsItems: [
            { value: '10+', label: 'Format Desteği' },
            { value: '0', label: 'Veri Depolama' },
            { value: '100%', label: 'Gizlilik' },
            { value: '4', label: 'Dil Desteği' }
        ]
    },
    en: {
        title: 'About Us - VormPixyze',
        description: 'VormPixyze is a tech initiative providing user-friendly and fast image conversion tools.',
        h1: 'About Us',
        mission: 'Our Mission',
        missionDesc: 'To make complex file formats and image editing tasks accessible and easy for everyone.',
        story: 'Our Story',
        storyDesc: 'Founded in 2025 as a solution to HEIC and WebP compatibility issues. Today, we serve thousands of users with AI-powered tools like background removal and compression, offering free basic tools and advanced options for professionals.',
        philosophy: 'Our Privacy Philosophy',
        philosophyText: 'VormPixyze prioritizes user privacy. Unlike traditional tools, we never permanently store your files. Most processing happens in your browser, while advanced AI tasks are completed instantly on ephemeral servers and deleted immediately.',
        whyUs: 'Why VormPixyze?',
        features: [
            { icon: '🔒', title: '100% Privacy', desc: 'Your files are never stored. Operations happen either on your device or instantly on secure ephemeral servers.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Process hundreds of images in seconds with WebAssembly technology. No waiting.' },
            { icon: '🎨', title: 'AI Technology', desc: 'AI-powered background removal and smart file naming features.' },
            { icon: '💎', title: 'Premium Quality', desc: 'Professional-grade conversion quality with lossless or optimized compression options.' },
            { icon: '🌍', title: 'Multi-Language', desc: 'Available in 4 languages including English, Turkish, German, and French.' },
            { icon: '📱', title: 'Mobile Ready', desc: 'Works flawlessly on all devices including iPhone, Android, tablet, and desktop.' }
        ],
        techTitle: 'Our Technology',
        techText: 'VormPixyze uses cutting-edge web technologies:',
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
        teamText: 'VormPixyze Inc. is a software company that prioritizes user privacy. Our goal is to provide free and easy-to-use tools where people can safely convert their images.',
        contact: '📧 Contact: support@vormpixyze.com',
        stats: 'VormPixyze by Numbers',
        statsItems: [
            { value: '10+', label: 'Format Support' },
            { value: '0', label: 'Data Storage' },
            { value: '100%', label: 'Privacy' },
            { value: '4', label: 'Languages' }
        ]
    },
    de: {
        title: 'Über Uns | VormPixyze',
        description: 'Erfahren Sie mehr über VormPixyze. Unser datenschutzorientiertes Team entwickelt browserbasierte Bildwerkzeuge.',
        h1: 'Über Uns',
        mission: 'Unsere Mission',
        missionDesc: 'VormPixyze wurde gegründet, um Bildkonvertierung für alle zugänglich, schnell und sicher zu machen. Wir bieten die beste Benutzererfahrung und schützen dabei Ihre Privatsphäre.',
        story: 'Unsere Geschichte',
        storyDesc: 'Gegründet im Jahr 2025 als Lösung für HEIC- und WebP-Kompatibilitätsprobleme. Heute bedienen wir Tausende von Benutzern mit KI-gestützten Tools wie Hintergrundentfernung und Komprimierung und bieten kostenlose Basistools sowie erweiterte Optionen für Profis.',
        philosophy: 'Unsere Datenschutz-Philosophie',
        philosophyText: 'VormPixyze priorisiert die Privatsphäre der Benutzer. Im Gegensatz zu herkömmlichen Tools speichern wir Ihre Dateien niemals dauerhaft. Die meiste Verarbeitung erfolgt in Ihrem Browser, während fortgeschrittene KI-Aufgaben sofort auf temporären Servern erledigt und sofort gelöscht werden.',
        whyUs: 'Warum VormPixyze?',
        features: [
            { icon: '🔒', title: '100% Privatsphäre', desc: 'Ihre Dateien werden nie gespeichert. Die Verarbeitung erfolgt entweder auf Ihrem Gerät oder sofort auf sicheren temporären Servern.' },
            { icon: '⚡', title: 'Blitzschnell', desc: 'Verarbeiten Sie Hunderte von Bildern in Sekunden mit WebAssembly-Technologie.' },
            { icon: '🎨', title: 'KI-Technologie', desc: 'KI-gestützte Hintergrundentfernung und intelligente Dateibenennung.' },
            { icon: '💎', title: 'Premium-Qualität', desc: 'Konvertierungsqualität auf professionellem Niveau.' },
            { icon: '🌍', title: 'Mehrsprachig', desc: 'Verfügbar in 4 Sprachen.' },
            { icon: '📱', title: 'Mobil-optimiert', desc: 'Funktioniert einwandfrei auf allen Geräten.' }
        ],
        techTitle: 'Unsere Technologie',
        techText: 'VormPixyze nutzt modernste Web-Technologien:',
        techItems: [
            'WebAssembly (WASM) für native Geschwindigkeit',
            'React und TypeScript für moderne Oberfläche',
            'Erweiterte HEIC-Unterstützung mit Python Pillow-Heif',
            'On-Device-KI-Modelle für Hintergrundentfernung',
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
        teamText: 'VormPixyze Inc. ist ein Softwareunternehmen, das den Datenschutz der Benutzer priorisiert.',
        contact: '📧 Kontakt: support@vormpixyze.com',
        stats: 'VormPixyze in Zahlen',
        statsItems: [
            { value: '10+', label: 'Format-Unterstützung' },
            { value: '0', label: 'Datenspeicherung' },
            { value: '100%', label: 'Privatsphäre' },
            { value: '4', label: 'Sprachen' }
        ]
    },
    fr: {
        title: 'À Propos | VormPixyze',
        description: 'Découvrez VormPixyze. Notre équipe axée sur la confidentialité développe des outils d\'image basés sur navigateur.',
        h1: 'À Propos',
        mission: 'Notre Mission',
        missionDesc: 'VormPixyze a été fondé pour rendre la conversion d\'images accessible, rapide et sécurisée pour tous. Nous visons à fournir la meilleure expérience utilisateur tout en protégeant votre vie privée.',
        story: 'Notre Histoire',
        storyDesc: 'Fondé en 2025 comme solution aux problèmes de compatibilité HEIC et WebP. Aujourd\'hui, nous servons des milliers d\'utilisateurs avec des outils propulsés par l\'IA comme la suppression d\'arrière-plan et la compression, offrant des outils de base gratuits et des options avancées pour les professionnels.',
        philosophy: 'Notre Philosophie de Confidentialité',
        philosophyText: 'VormPixyze priorise la confidentialité des utilisateurs. Contrairement aux outils traditionnels, nous ne stockons jamais vos fichiers de manière permanente. La plupart des traitements se font dans votre navigateur, tandis que les tâches IA avancées sont effectuées instantanément sur des serveurs éphémères et supprimées immédiatement.',
        whyUs: 'Pourquoi VormPixyze?',
        features: [
            { icon: '🔒', title: '100% Confidentialité', desc: 'Vos fichiers ne sont jamais stockés. Les opérations se font soit sur votre appareil, soit instantanément sur des serveurs éphémères sécurisés.' },
            { icon: '⚡', title: 'Ultra Rapide', desc: 'Traitez des centaines d\'images en quelques secondes avec la technologie WebAssembly.' },
            { icon: '🎨', title: 'Technologie IA', desc: 'Suppression d\'arrière-plan et nommage intelligent de fichiers propulsés par l\'IA.' },
            { icon: '💎', title: 'Qualité Premium', desc: 'Qualité de conversion de niveau professionnel.' },
            { icon: '🌍', title: 'Multi-langues', desc: 'Disponible en 4 langues.' },
            { icon: '📱', title: 'Mobile-Ready', desc: 'Fonctionne parfaitement sur tous les appareils.' }
        ],
        techTitle: 'Notre Technologie',
        techText: 'VormPixyze utilise les dernières technologies web:',
        techItems: [
            'WebAssembly (WASM) pour un traitement à vitesse native',
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
        teamText: 'VormPixyze Inc. est une entreprise de logiciels qui priorise la confidentialité des utilisateurs.',
        contact: '📧 Contact: support@vormpixyze.com',
        stats: 'VormPixyze en Chiffres',
        statsItems: [
            { value: '10+', label: 'Support Formats' },
            { value: '0', label: 'Stockage de Données' },
            { value: '100%', label: 'Confidentialité' },
            { value: '4', label: 'Langues' }
        ]
    }
};

type LangKey = keyof typeof content;

export default function AboutPage() {
    const { language } = useLanguage();
    const activeLang = (typeof language === 'string' && (language.startsWith('tr') ? 'tr' : language.startsWith('de') ? 'de' : language.startsWith('fr') ? 'fr' : 'en')) as LangKey;
    const t = content[activeLang] || content.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
                <meta name="description" content={t.description} />
                <link rel="canonical" href="https://vormpixyze.com/about" />
            </Helmet>

            <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-200 font-sans">
                <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
                    <div className="max-w-4xl mx-auto px-4 h-16 flex items-center">
                        <Link to="/" className="text-xl font-bold text-white">
                            ← Vorm<span className="text-indigo-400">Pixyze</span>
                        </Link>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
                    <h1 className="text-4xl font-bold text-white">{t.h1}</h1>

                    {/* Mission Section */}
                    <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{t.mission}</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">{t.missionDesc}</p>
                    </section>

                    {/* Privacy Philosophy */}
                    <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-3">{t.philosophy}</h2>
                        <p className="text-slate-400 leading-relaxed">{t.philosophyText}</p>
                    </section>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {t.statsItems.map((stat, i) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-center">
                                <div className="text-3xl font-bold text-indigo-400">{stat.value}</div>
                                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Why Us */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6">{t.whyUs}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {t.features.map((feature, i) => (
                                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                                    <div className="text-3xl mb-3">{feature.icon}</div>
                                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Supported Formats */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">{t.supportedFormats}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {t.formats.map((format, i) => (
                                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
                                    <div className="font-bold text-white">{format.name}</div>
                                    <div className="text-xs text-slate-500 mt-1">{format.desc}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Company Info */}
                    <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <h2 className="text-xl font-bold text-white mb-3">{t.team}</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">{t.teamText}</p>
                        <p className="text-indigo-400 font-medium">{t.contact}</p>
                    </section>
                </main>

                <LegalFooter />
            </div>
        </>
    );
}
