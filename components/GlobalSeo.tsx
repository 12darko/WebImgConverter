import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const GlobalSeo = () => {
    const location = useLocation();
    const { language } = useLanguage();

    // Base URL of the website
    const siteUrl = 'https://vormpixyze.com';

    // Construct current path without query parameters or language prefix (if any)
    const currentPath = location.pathname;

    // JSON-LD Structured Data for SoftwareApplication
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "VormPixyze",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Free online HEIC to JPG, WebP converter and AI photo background remover. Privacy-focused, secure server processing.",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
        }
    };

    return (
        <Helmet>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>

            {/* Hreflang Tags - Crucial for SEO in multi-language sites */}
            {/* x-default: Fallback for unmatched languages (English) */}
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${currentPath}`} />

            {/* Specific Languages - Pointing to the same URL since we detect language via JS/Browser, 
                BUT technically for pure SEO, separate URLs are better (e.g. /tr/..., /de/...).
                As we ensure maximum privacy and speed via our specialized servers,
                we tell Google "this page targets these languages".
                
                Note: Since we don't have /tr routes yet, we point all to the same URL. 
                Google might see this as duplicate, so often better to OMIT hreflang if URLs are identical,
                OR implement query parameter routing (e.g. ?lang=tr) which we did for Utilyra.
                
                Let's use the Query Parameter strategy like Utilyra for best effect!
            */}

            <link rel="alternate" hrefLang="en" href={`${siteUrl}${currentPath}?lang=en`} />
            <link rel="alternate" hrefLang="tr" href={`${siteUrl}${currentPath}?lang=tr`} />
            <link rel="alternate" hrefLang="de" href={`${siteUrl}${currentPath}?lang=de`} />
            <link rel="alternate" hrefLang="fr" href={`${siteUrl}${currentPath}?lang=fr`} />

            {/* Dynamic Canonical - If query param exists, canonical should usually point to clean URL or current lang URL.
                Standard practice: Canonical points to the "main" version (often English or without params).
                Here we set it to the clean non-param URL to consolidate power, 
                UNLESS we want to index language versions separately.
            */}
            <link rel="canonical" href={`${siteUrl}${currentPath}`} />

        </Helmet>
    );
};
