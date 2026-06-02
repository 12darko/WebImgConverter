import React, { useEffect, useRef } from 'react';

// To use this, you need your AdSense Publisher ID and Slot ID.
// For Adsterra, you usually get a script URL. 
// We will use placeholders for now, which you can replace with your actual keys.

const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX"; // Replace with your AdSense Client ID
const ADSTERRA_SRC = "//www.highperformanceformat.com/YOUR_ADSTERRA_KEY/invoke.js"; // Replace with your Adsterra SRC

export const AdSlot: React.FC<{ className?: string, slotId?: string }> = ({ className = '', slotId = "1234567890" }) => {
    const network = import.meta.env.VITE_AD_NETWORK || 'false';

    useEffect(() => {
        if (network === 'adsense') {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, [network]);

    if (network === 'false' || !network) return null;

    // We do not add borders, backgrounds or min-heights here.
    // If the ad blocker blocks the ad, or the script doesn't return an ad,
    // this container will naturally collapse to 0px height, hiding itself.
    return (
        <div className={`w-full flex justify-center items-center my-4 ${className}`}>
            <div className="w-full max-w-4xl relative flex justify-center">
                
                {network === 'adsterra' && (
                    <div id="container-adsterra">
                        {/* 
                          When you get your actual Adsterra script, paste it here.
                          It usually looks like: <script type="text/javascript" src="//plXXXXXX.com/xx/yy/zz.js"></script>
                        */}
                    </div>
                )}

                {network === 'adsense' && (
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', textAlign: 'center' }}
                        data-ad-client={ADSENSE_CLIENT}
                        data-ad-slot={slotId}
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                )}
            </div>
        </div>
    );
};
