import React, { useEffect, useRef } from 'react';

export const AdsterraNativeBanner = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent multiple injections in React strict mode or re-renders
        if (!bannerRef.current) return;
        if (bannerRef.current.innerHTML !== '') return;

        // Create the script element provided by Adsterra
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.dataset.cfasync = 'false';
        script.src = '//smelthrsfranz.com/c827139fb2381f55690cb3134b118940/invoke.js';
        
        bannerRef.current.appendChild(script);
        
        // The script expects a container with this exact ID to render the native ads
        const container = document.createElement('div');
        container.id = 'container-c827139fb2381f55690cb3134b118940';
        bannerRef.current.appendChild(container);
        
        // Cleanup function
        return () => {
            if (bannerRef.current) {
                bannerRef.current.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="w-full flex justify-center items-center my-6 min-h-[100px] bg-transparent">
            <div ref={bannerRef} className="w-full max-w-4xl" />
        </div>
    );
};
