import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '../layout';
import { ToolWorkspace } from '../tool/ToolWorkspace';
import { OutputFormat } from '../../services/toolEngine';
import { FormatOption } from '../tool/OptimizationSettingsPanel';
import { SeoContent, SeoPageType } from '../SeoContent';

interface RichFeature {
    icon: string;
    title: string;
    desc: string;
}

interface DetailPageScaffoldProps {
    /** Page metadata for SEO */
    seoTitle: string;
    seoDescription: string;
    canonical: string;
    /** Hero copy */
    h1: string;
    subtitle?: string;
    /** ToolWorkspace config */
    defaultFormat: OutputFormat;
    formats?: FormatOption[];
    accept?: string;
    dropzoneTitle?: string;
    dropzoneSubtitle?: string;
    /** Feature cards under workspace */
    features?: RichFeature[];
    featuresTitle?: string;
    /** "How to" steps */
    howToTitle?: string;
    steps?: { num: number; title: string; desc: string }[];
    /** Optional info text below */
    additionalContent?: React.ReactNode;
    /** SeoContent pageType key */
    seoContentType?: SeoPageType;
}

export const DetailPageScaffold: React.FC<DetailPageScaffoldProps> = ({
    seoTitle,
    seoDescription,
    canonical,
    h1,
    subtitle,
    defaultFormat,
    formats,
    accept,
    dropzoneTitle,
    dropzoneSubtitle,
    features,
    featuresTitle = 'Why use this tool?',
    howToTitle,
    steps,
    additionalContent,
    seoContentType,
}) => {
    const navigate = useNavigate();

    return (
        <SiteShell onCta={() => navigate('/tools')} ctaLabel="All Tools" bg="white">
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <link rel="canonical" href={canonical} />
            </Helmet>

            {/* Hero + Workspace */}
            <section className="bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                            {h1}
                        </h1>
                        {subtitle && (
                            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">{subtitle}</p>
                        )}
                    </div>
 
                    <ToolWorkspace
                        defaultFormat={defaultFormat}
                        formats={formats}
                        accept={accept}
                        dropzoneTitle={dropzoneTitle}
                        dropzoneSubtitle={dropzoneSubtitle}
                        onBatchClick={() => navigate('/pricing')}
                    />
                </div>
            </section>
 
            {/* Why use this */}
            {features && features.length > 0 && (
                <section className="bg-slate-50/40 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/50">
                    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
                        <div className="text-center mb-10">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {featuresTitle}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-card dark:shadow-none">
                                    <div className="text-2xl mb-3">{f.icon}</div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1.5">{f.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
 
            {/* How to steps */}
            {steps && steps.length > 0 && (
                <section className="bg-white dark:bg-slate-950">
                    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
                        <div className="text-center mb-10">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {howToTitle || 'How does it work?'}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {steps.map((s) => (
                                <div key={s.num} className="text-center">
                                    <div className="w-10 h-10 mx-auto rounded-full bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm mb-4">
                                        {s.num}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans mb-1.5">{s.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
 
            {/* Additional content slot */}
            {additionalContent}
 
            {/* SEO content */}
            {seoContentType && (
                <section className="bg-slate-50/40 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12 prose prose-slate prose-sm dark:prose-invert">
                        <SeoContent pageType={seoContentType} />
                    </div>
                </section>
            )}
        </SiteShell>
    );
};
