import { useEffect } from 'react';

const ScriptLoader = () => {
    useEffect(() => {
        const loadScripts = async () => {
            try {
                // FALLBACK IDs (From your removed index.html)
                // Analytics: G-ZXPCM2DWTX
                // AdSense: ca-pub-3889797797438326

                const analyticsId = 'G-ZXPCM2DWTX';
                const adSenseId = 'ca-pub-3889797797438326';

                // Load AdSense
                if (adSenseId && !document.querySelector(`script[src*="pagead2.googlesyndication.com"]`)) {
                    const script = document.createElement('script');
                    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`;
                    script.async = true;
                    script.crossOrigin = 'anonymous';
                    document.head.appendChild(script);
                }

                // Load Analytics (GA4)
                if (analyticsId && !document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
                    // Global Site Tag
                    const script = document.createElement('script');
                    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
                    script.async = true;
                    document.head.appendChild(script);

                    // Config Script with Default Denied
                    const configScript = document.createElement('script');
                    configScript.innerHTML = `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'analytics_storage': 'denied'
                        });
                        gtag('js', new Date());
                        gtag('config', '${analyticsId}');
                    `;
                    document.head.appendChild(configScript);
                }

            } catch (error) {
                console.error('Failed to load external scripts:', error);
            }
        };

        loadScripts();
    }, []);

    return null;
};

export default ScriptLoader;
