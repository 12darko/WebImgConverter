import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../components/layout';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BillingToggle } from '../components/ui/BillingToggle';

interface PlanFeature {
    text: string;
    included?: boolean;
}

interface Plan {
    id: 'starter' | 'pro' | 'business';
    name: string;
    description: string;
    monthlyPrice: number | string;
    annualPrice: number | string;
    priceSuffix?: string;
    cta: string;
    ctaVariant: 'primary' | 'secondary';
    popular?: boolean;
    features: PlanFeature[];
}

const PLANS: Plan[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Temel dönüştürme ve günlük kullanım için.',
        monthlyPrice: 0,
        annualPrice: 0,
        priceSuffix: '/ay',
        cta: 'Ücretsiz Başla',
        ctaVariant: 'secondary',
        features: [
            { text: 'Günlük 50 Kredi' },
            { text: 'Temel formatlar (JPG, PNG, PDF)' },
            { text: 'Arkaplan Temizleme' },
            { text: 'Standart Destek' },
        ],
    },
    {
        id: 'pro',
        name: 'Pro+',
        description: 'Profesyonel iş akışları ve yoğun kullanım için.',
        monthlyPrice: 29,
        annualPrice: 23,
        priceSuffix: '/ay',
        cta: 'Pro+\'a Geç',
        ctaVariant: 'primary',
        popular: true,
        features: [
            { text: 'Sınırsız Kredi' },
            { text: 'Reklamsız Deneyim' },
            { text: 'Öncelikli Yapay Zeka (AI) İşlemleri' },
            { text: 'Toplu İşleme (50+)' },
            { text: 'Toplu ZIP İndirme' },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        description: 'Büyük ölçekli operasyonlar için özel çözümler.',
        monthlyPrice: 'Özel',
        annualPrice: 'Özel',
        cta: 'Satışla İletişime Geç',
        ctaVariant: 'secondary',
        features: [
            { text: 'Tüm Premium Özellikler' },
            { text: 'İşlem Kayıtları (Activity Log)' },
            { text: 'Google Drive\'a Kaydetme' },
            { text: 'Özel 7/24 Destek' },
            { text: 'Özel API İstek Sınırları' },
        ],
    },
];

const FAQ = [
    {
        q: 'Planımı daha sonra değiştirebilir miyim?',
        a: 'Kesinlikle. İstediğiniz zaman hesap ayarlarınızdan planınızı yükseltebilir veya düşürebilirsiniz. Ücretlendirme gün bazlı (prorated) hesaplanacaktır.',
    },
    {
        q: 'Kredi sistemi nasıl çalışır?',
        a: 'Her dosya dönüştürme, arkaplan silme veya yapay zeka ile isimlendirme işlemi 1 kredi harcar.',
    },
    {
        q: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        a: 'Tüm popüler kredi kartlarını ve PayPal\'ı kabul ediyoruz. Business planlar için faturalı ödeme imkanı da sunuyoruz.',
    },
    {
        q: 'Dosyalarım ne kadar güvende?',
        a: 'Banka düzeyinde şifreleme kullanıyoruz. Dosyalarınız güvenli sunucularda işlenir ve işlem tamamlandıktan hemen sonra kalıcı olarak silinir.',
    },
];

const CheckIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

interface PricingCardProps {
    plan: Plan;
    billing: 'monthly' | 'annually';
    onCta: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, billing, onCta }) => {
    const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    const isCustom = typeof price === 'string';

    return (
        <div
            className={[
                'relative bg-white dark:bg-slate-800/50 border rounded-3xl p-7 flex flex-col',
                plan.popular
                    ? 'border-slate-900 dark:border-brand-500/50 shadow-pop ring-1 ring-slate-900 dark:ring-brand-500/30'
                    : 'border-slate-200 dark:border-slate-700/50 shadow-card',
            ].join(' ')}
        >
            {plan.popular && (
                <div className="absolute -top-3 right-7">
                    <Badge tone="dark">En Popüler</Badge>
                </div>
            )}

            <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-6">
                {isCustom ? (
                    <div className="font-serif text-4xl font-extrabold text-slate-900 dark:text-white">{price}</div>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span className="font-serif text-5xl font-extrabold text-slate-900 dark:text-white">${price}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{plan.priceSuffix}</span>
                    </div>
                )}
            </div>

            <Button
                onClick={onCta}
                variant={plan.ctaVariant === 'primary' ? 'primary' : 'secondary'}
                fullWidth
                size="md"
            >
                {plan.cta}
            </Button>

            <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center">
                            {CheckIcon}
                        </span>
                        <span>{f.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function PricingPage() {
    const navigate = useNavigate();
    const [billing, setBilling] = React.useState<'monthly' | 'annually'>('monthly');

    const handleCta = (planId: Plan['id']) => {
        if (planId === 'starter') {
            navigate('/app');
        } else if (planId === 'pro') {
            navigate('/app?upgrade=pro');
        } else {
            navigate('/support?topic=enterprise');
        }
    };

    return (
        <SiteShell onCta={() => navigate('/app')} ctaLabel="Hemen Başla" bg="white">
            <Helmet>
                <title>Fiyatlandırma — Basit ve Şeffaf Planlar | WebImgConverter</title>
                <meta name="description" content="İş akışınıza en uygun planı seçin. Görüntü dönüştürme, sıkıştırma ve yapay zeka araçları için Starter, Pro+ ve Business planlarımız." />
                <link rel="canonical" href="https://WebImgConverter.com/pricing" />
            </Helmet>

            <section className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
                {/* Hero */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        Basit, şeffaf fiyatlandırma.
                    </h1>
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                        İş akışınıza en uygun planı seçin. Dosyalarınızı ışık hızında dönüştürmeye ve işlemeye hemen başlayın.
                    </p>
                </div>

                {/* Billing toggle */}
                <div className="flex justify-center mb-10">
                    <BillingToggle value={billing} onChange={setBilling} />
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
                    {PLANS.map((p) => (
                        <PricingCard key={p.id} plan={p} billing={billing} onCta={() => handleCta(p.id)} />
                    ))}
                </div>

                {/* FAQ */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-10">
                        Sıkça Sorulan Sorular
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {FAQ.map((item, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-5">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-2">{item.q}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
