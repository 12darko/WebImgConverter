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
    // 1. Check if ?lang=XX parameter exists to migrate old links smoothly
    const urlLangParam = searchParams.get('lang');
    if (urlLangParam && ['tr', 'en', 'de', 'fr'].includes(urlLangParam)) {
       const basePath = location.pathname;
       const newUrl = urlLangParam === 'tr' ? basePath : `/${urlLangParam}${basePath === '/' ? '' : basePath}`;
       
       setLanguageState(urlLangParam as Language);
       
       const newParams = new URLSearchParams(searchParams);
       newParams.delete('lang');
       
       navigate({ pathname: newUrl, search: newParams.toString() }, { replace: true });
       return;
    }

    // 2. Check path-based language (/en/...)
    const pathParts = location.pathname.split('/');
    const firstPart = pathParts[1];
    
    if (['en', 'de', 'fr'].includes(firstPart)) {
      setLanguageState(firstPart as Language);
    } else {
      // 3. No explicit language in URL (defaults to Turkish).
      // If user is hitting the root domain directly, auto-detect language.
      if (location.pathname === '/') {
          const browserLang = navigator.language.slice(0, 2).toLowerCase();
          if (['en', 'de', 'fr'].includes(browserLang)) {
            setLanguageState(browserLang as Language);
            navigate(`/${browserLang}`, { replace: true });
          } else if (browserLang !== 'tr') {
            setLanguageState('en'); // Fallback to English
            navigate('/en', { replace: true });
          } else {
            setLanguageState('tr');
          }
      } else {
          setLanguageState('tr');
      }
    }
  }, []); // Run once on mount

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);

    const pathParts = location.pathname.split('/');
    const firstPart = pathParts[1];
    
    let newPath = location.pathname;
    
    // Remove existing language prefix if any
    if (['en', 'de', 'fr'].includes(firstPart)) {
       pathParts.splice(1, 1);
       newPath = pathParts.join('/') || '/';
    }
    
    // Add new language prefix if not TR
    if (newLang !== 'tr') {
       newPath = `/${newLang}${newPath === '/' ? '' : newPath}`;
    }
    
    navigate({ pathname: newPath, search: location.search });
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

export const useLocalizedPath = () => {
  const { language } = useLanguage();
  return (path: string) => {
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (language === 'tr') return cleanPath;
    return `/${language}${cleanPath === '/' ? '' : cleanPath}`;
  };
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
