import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
    type: 'website' | 'organization' | 'tool' | 'article';
    data?: {
        name?: string;
        description?: string;
        url?: string;
        datePublished?: string;
        author?: string;
    };
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
    let schema: object;

    switch (type) {
        case 'website':
            schema = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "VormPixyze",
                "url": "https://vormpixyze.com",
                "description": "Free online image converter. Convert HEIC, WebP, PNG to JPG. AI background removal and image compression. 100% browser-based, secure.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://vormpixyze.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            };
            break;

        case 'organization':
            schema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "VormPixyze Inc.",
                "url": "https://vormpixyze.com",
                "logo": "https://vormpixyze.com/logo192.png",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@vormpixyze.com",
                    "contactType": "customer service"
                },
                "sameAs": []
            };
            break;

        case 'tool':
            schema = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": data?.name || "VormPixyze Image Converter",
                "description": data?.description || "Free online image conversion tool",
                "url": data?.url || "https://vormpixyze.com",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "1250"
                }
            };
            break;

        case 'article':
            schema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": data?.name || "VormPixyze Blog",
                "description": data?.description || "",
                "url": data?.url || "https://vormpixyze.com/blog",
                "datePublished": data?.datePublished || new Date().toISOString(),
                "author": {
                    "@type": "Organization",
                    "name": "VormPixyze Inc."
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "VormPixyze Inc.",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://vormpixyze.com/logo192.png"
                    }
                }
            };
            break;

        default:
            schema = {};
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

// Pre-built schemas for common pages
export const HomePageSchema = () => (
    <>
        <StructuredData type="website" />
        <StructuredData type="organization" />
    </>
);

export const ToolPageSchema: React.FC<{ name: string; description: string; url: string }> = ({ name, description, url }) => (
    <StructuredData type="tool" data={{ name, description, url }} />
);

export const ArticleSchema: React.FC<{ name: string; description: string; url: string; datePublished: string }> = ({ name, description, url, datePublished }) => (
    <StructuredData type="article" data={{ name, description, url, datePublished }} />
);
