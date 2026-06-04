import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations';

type Language = 'tr' | 'en' | 'de' | 'fr';

interface LanguageContextType {
  language: Language;
  lang: Language; // Alias for convenience
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize from URL or Browser
  useEffect(() => {
    const urlLang = searchParams.get('lang');
    if (urlLang && ['tr', 'en', 'de', 'fr'].includes(urlLang)) {
      setLanguageState(urlLang as Language);
    } else {
      // Detect browser language
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (['tr', 'en', 'de', 'fr'].includes(browserLang)) {
        setLanguage(browserLang as Language);
      } else {
        // Fallback to English for any other international language
        setLanguage('en');
      }
    }
  }, []); // Run once on mount

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);

    // Update URL to reflect language (critical for sharing/SEQ)
    // Create new search params to avoid mutating directly
    const newParams = new URLSearchParams(searchParams);

    if (newLang === 'tr') {
      newParams.delete('lang'); // Default language needs no param
    } else {
      newParams.set('lang', newLang);
    }

    setSearchParams(newParams, { replace: true });
  };

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, lang: language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
