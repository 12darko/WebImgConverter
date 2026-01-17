import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Initialize GA4 - Replace with your Measurement ID
// Ideally, fetch this from env vars: import.meta.env.VITE_GA_MEASUREMENT_ID
const GA_MEASUREMENT_ID = 'G-ZXPCM2DWTX'; // Default placeholder from index.html

export const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Initialize if not already initialized
        if (!window.ga_initialized) {
            ReactGA.initialize(GA_MEASUREMENT_ID);
            window.ga_initialized = true;
        }

        // Send pageview with the current path
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }, [location]);

    return null;
};

// Add global type for initialization flag
declare global {
    interface Window {
        ga_initialized?: boolean;
    }
}
