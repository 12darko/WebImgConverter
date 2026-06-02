import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'box';
  onWatchAd?: () => void;
  // Google AdSense Props
  adClient?: string; // ca-pub-XXXXXXXXXXXXXXXX
  adSlot?: string;   // 1234567890
  adFormat?: 'auto' | 'fluid' | 'rectangle';
  // Adsterra Props
  adNetwork?: 'adsense' | 'adsterra';
  adsterraKey?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  className = '',
  variant = 'horizontal',
  onWatchAd,
  adClient = 'ca-pub-3889797797438326', // User verified
  adSlot = '9506043591', // User provided "Banner" slot
  adFormat = 'auto',
  adNetwork,
  adsterraKey
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const activeAdNetwork = adNetwork || import.meta.env.VITE_AD_NETWORK || 'adsense';

  const sizeClasses = {
    horizontal: 'h-28 w-full',
    vertical: 'w-full h-[600px]',
    box: 'w-full h-[250px]'
  };

  const minHeightStyles = {
    horizontal: '112px',
    vertical: '600px',
    box: '250px'
  };

  useEffect(() => {
    // Sadece "Real Ad" modundaysak (yani onWatchAd yoksa) reklamı yükle
    if (!onWatchAd) {
      if (activeAdNetwork === 'adsterra' && containerRef.current) {
        // Adsterra implementation
        containerRef.current.innerHTML = '';
        const activeKey = adsterraKey || import.meta.env.VITE_ADSTERRA_KEY || "default_adsterra_key";
        
        const scriptOptions = document.createElement('script');
        scriptOptions.type = 'text/javascript';
        scriptOptions.innerHTML = `
          atOptions = {
            'key' : '${activeKey}',
            'format' : 'iframe',
            'height' : ${variant === 'horizontal' ? 90 : variant === 'box' ? 250 : 600},
            'width' : ${variant === 'vertical' ? 160 : variant === 'box' ? 300 : 728},
            'params' : {}
          };
        `;
        
        const scriptSrc = document.createElement('script');
        scriptSrc.type = 'text/javascript';
        scriptSrc.src = `//www.highperformanceformat.com/${activeKey}/invoke.js`;
        
        containerRef.current.appendChild(scriptOptions);
        containerRef.current.appendChild(scriptSrc);
      } else if (activeAdNetwork === 'adsense' && adRef.current) {
        const loadAd = () => {
          if (adRef.current) {
            try {
              if (adRef.current.offsetParent === null) {
                return;
              }
              const adsbygoogle = (window as any).adsbygoogle || [];
              if (!adRef.current.getAttribute('data-adsbygoogle-status') && adRef.current.innerHTML === "") {
                adsbygoogle.push({});
              }
            } catch (e) {
              console.error("AdSense error:", e);
            }
          }
        };

        const timer = setTimeout(loadAd, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [onWatchAd, activeAdNetwork, adsterraKey, variant]);

  // MODE 1: REWARDED AD (Simülasyon - +1 Hak Kazandıran Buton)
  if (onWatchAd) {
    return (
      <div className={`relative group overflow-hidden bg-slate-900 border border-slate-700/50 rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-lg ${className}`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-50"></div>
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl"></div>

        <div className="absolute top-2 right-2 flex gap-1">
          <span className="bg-slate-800 text-[9px] px-1.5 py-0.5 rounded text-slate-500 font-bold tracking-wider border border-slate-700">SPONSOR</span>
        </div>

        <div className="z-10 flex flex-col items-center w-full">
          <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-3 text-brand-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-300 font-bold text-sm mb-1">Ücretsiz Hak Kazan</p>
          <p className="text-slate-500 text-xs mb-4">Kısa bir reklam izleyerek dönüştürme hakkı kazan.</p>

          <button
            onClick={onWatchAd}
            className="w-full group/btn relative overflow-hidden rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Reklamı İzle (+1)
            </span>
          </button>
        </div>
      </div>
    );
  }

  // MODE 2: REAL AD (AdSense or Adsterra)
  if (activeAdNetwork === 'adsterra') {
    return (
      <div className={`w-full flex justify-center my-6 ${className}`}>
        <div ref={containerRef} className={`w-full flex justify-center overflow-hidden ${sizeClasses[variant]}`} style={{ minHeight: minHeightStyles[variant] }}>
          {/* Ad Scripts injected here */}
        </div>
      </div>
    );
  }

  // Google AdSense
  return (
    <div
      className={`relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden ${sizeClasses[variant]} ${className}`}
      style={{ minHeight: minHeightStyles[variant] }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};