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
                "name": "WebImgConverter",
                "url": "https://WebImgConverter.com",
                "description": "Free online image converter. Convert HEIC, WebP, PNG to JPG. AI background removal and image compression. Secure, fast, and privacy-focused.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://WebImgConverter.com/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            };
            break;

        case 'organization':
            schema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "WebImgConverter Inc.",
                "url": "https://WebImgConverter.com",
                "logo": "https://WebImgConverter.com/logo192.png",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "support@WebImgConverter.com",
                    "contactType": "customer service"
                },
                "sameAs": []
            };
            break;

        case 'tool':
            schema = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": data?.name || "WebImgConverter Image Converter",
                "description": data?.description || "Free online image conversion tool",
                "url": data?.url || "https://WebImgConverter.com",
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
                "headline": data?.name || "WebImgConverter Blog",
                "description": data?.description || "",
                "url": data?.url || "https://WebImgConverter.com/blog",
                "datePublished": data?.datePublished || new Date().toISOString(),
                "author": {
                    "@type": "Organization",
                    "name": "WebImgConverter Inc."
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "WebImgConverter Inc.",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://WebImgConverter.com/logo192.png"
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
