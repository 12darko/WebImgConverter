import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// Web Worker for HD Background Removal
// rembg-webgpu is dynamically imported when needed (WebGPU accelerated)
// TODO: Future - Add server-side alternative (free API like Hugging Face Spaces) for higher quality
import { Dropzone } from './components/Dropzone';
import { AdBanner } from './components/AdBanner';
import { PremiumModal } from './components/PremiumModal';
import { ReferralWidget } from './components/ReferralWidget';

import { LegalModal } from './components/LegalModal';
import { SupportModal } from './components/SupportModal';
import { CookieBanner } from './components/CookieBanner';
import ScriptLoader from './components/ScriptLoader';
import { HistoryModal } from './components/HistoryModal'; // History Import
import { CropModal } from './components/CropModal'; // Crop Import
import { InlineCrop } from './components/tool/InlineCrop';
import { InlineBgRemover } from './components/tool/InlineBgRemover';

import { CompareSlider } from './components/CompareSlider';
import { AuthModal } from './components/AuthModal'; // Auth import
import { SeoContent } from './components/SeoContent';
import { Logo } from './components/layout/Logo';
import { SiteFooter } from './components/layout/SiteFooter';
import { generateSmartFilename } from './services/aiNamingService';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';


import { supabase, getUserProfile, updateUserCredits, upgradeToPremium, incrementDailyStats, activateSiteAccount } from './services/supabase'; // DB Services
import { logConversion } from './services/historyService'; // History Service
import { LanguageProvider, useLanguage } from './LanguageContext';
import {
  FileItem,
  ConversionFormat,
  UserStats,
  MAX_FREE_CREDITS,
  COST_PER_CONVERT,
  COST_PER_AI_RENAME,
  ENABLE_PREMIUM_SYSTEM,
  hasFeatureAccess
} from './types';

import { serverConversionService } from './services/serverConversionService';

interface AppProps {
  defaultTool?: string;
  pageH1?: string;
  acceptTypes?: string;
  formatBadges?: string[];
  defaultOutputFormat?: string;
  hideFormatSelector?: boolean;
  dropzoneTitle?: string;
  dropzoneDesc?: string;
  children?: React.ReactNode;
  conversionHandler?: (file: File) => Promise<Blob>;
  initialFiles?: File[];
}

function BanaConvertApp(props: AppProps = {}) {
  const { defaultTool, pageH1, acceptTypes, formatBadges, defaultOutputFormat, hideFormatSelector, dropzoneTitle, dropzoneDesc, children, conversionHandler } = props;
  const { t, language, setLanguage } = useLanguage();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [compareItem, setCompareItem] = useState<FileItem | null>(null);

  // Auth & User State
  const [session, setSession] = useState<any>(null);
  const [stats, setStats] = useState<UserStats>({
    credits: MAX_FREE_CREDITS,
    isPremium: false,
    lastResetDate: new Date().toISOString().split('T')[0]
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // Google referrer detection for Simple Mode
  const [isSimpleMode, setIsSimpleMode] = useState(false);
  useEffect(() => {
    const referrer = document.referrer || '';
    const params = new URLSearchParams(window.location.search);
    if (referrer.includes('google.') || params.get('simple') === 'true') {
      setIsSimpleMode(true);
    }
  }, []);

  // Modals
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);


  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Auth Modal
  const [isActivating, setIsActivating] = useState(false); // Activation State
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // History Modal State
  const [isCropModalOpen, setIsCropModalOpen] = useState(false); // Crop Modal State
  const [currentCropFileId, setCurrentCropFileId] = useState<string | null>(null);

  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'contact'>('privacy');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  
  const [initFilesHandled, setInitFilesHandled] = useState(false);



  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Reset stats when user logs out to fix ui bug
  useEffect(() => {
    if (!session) {
      setStats(prev => ({
        ...prev,
        isPremium: false,
        premiumTier: undefined,
        // Only reset credits if they look bogus (like the 99999 from premium test)
        credits: prev.credits > 1000 ? MAX_FREE_CREDITS : prev.credits
      }));
    }
  }, [session]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFiles(items);
  };

  // 1. Initialize Session & Stats
  useEffect(() => {
    let isInitializing = true; // Flag to skip SIGNED_IN during page load

    // RELIABLE APPROACH: Use getSession for initial load
    const initialize = async () => {
      console.log('[Auth] Initializing...');
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        console.log('[Auth] Session found, loading profile...');
        try {
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            setStats(profile);
            console.log('[Auth] Profile loaded:', profile.credits, profile.isPremium);
          } else {
            console.error('[Auth] Profile returned null');
          }
        } catch (err) {
          console.error('[Auth] Profile load error:', err);
        }
      } else {
        console.log('[Auth] No session, loading local stats');
        loadLocalStats();
      }
      setIsInitialized(true);
      isInitializing = false; // Initialization complete
      console.log('[Auth] Initialization complete');
    };

    initialize();

    // Listen for SUBSEQUENT auth changes only (not initial load)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] Event:', event);

      // Skip INITIAL_SESSION - we already handled it above
      if (event === 'INITIAL_SESSION') {
        console.log('[Auth] Skipping INITIAL_SESSION (already handled)');
        return;
      }

      // Skip SIGNED_IN during initialization - getSession handles initial load
      if (event === 'SIGNED_IN' && isInitializing) {
        console.log('[Auth] Skipping SIGNED_IN during init (getSession handles it)');
        return;
      }

      setSession(session);

      if (event === 'SIGNED_OUT') {
        // Reset to free user stats on logout
        const freeStats: UserStats = {
          credits: MAX_FREE_CREDITS,
          isPremium: false,
          lastResetDate: new Date().toISOString().split('T')[0],
          premiumTier: undefined,
          premiumExpiryDate: undefined,
          dailyLimit: MAX_FREE_CREDITS
        };
        setStats(freeStats);
        const consent = localStorage.getItem('cookieConsent');
        localStorage.clear();
        if (consent) localStorage.setItem('cookieConsent', consent);
        console.log('[Auth] Logged out - reset to free stats');
      } else if (event === 'SIGNED_IN' && session) {
        // Fresh login (OAuth callback AFTER init) - load profile
        console.log('[Auth] Fresh sign in (post-init), loading profile...');
        try {
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            setStats(profile);
            console.log('[Auth] Profile loaded after sign in:', profile.credits);
          }
        } catch (err) {
          console.error('[Auth] Profile load error after sign in:', err);
        }
      } else if (event === 'TOKEN_REFRESHED' && session) {
        // Token refreshed - reload profile to ensure fresh data
        console.log('[Auth] Token refreshed, reloading profile...');
        const profile = await getUserProfile(session.user.id);
        if (profile) setStats(profile);
      }
    });

    // Scroll listener
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const loadLocalStats = () => {
    const storedStats = localStorage.getItem('WebImgConverterStats');
    if (storedStats) {
      const parsed: UserStats = JSON.parse(storedStats);
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastResetDate !== today && !parsed.isPremium) {
        setStats({ ...parsed, credits: MAX_FREE_CREDITS, lastResetDate: today });
      } else {
        setStats(parsed);
      }
    }
  };



  // Handle sign out - reset to free user stats
  // Handle sign out - Force Reset UI
  const handleSignOut = async () => {
    // 1. Force Reset UI immediately
    setSession(null);
    setStats({
      credits: MAX_FREE_CREDITS,
      isPremium: false,
      lastResetDate: new Date().toISOString().split('T')[0],
      premiumTier: undefined,
      premiumExpiryDate: undefined,
      dailyLimit: MAX_FREE_CREDITS
    });

    // 2. Clear all local data (Brute force logout)
    const consent = localStorage.getItem('cookieConsent');
    localStorage.clear();
    if (consent) localStorage.setItem('cookieConsent', consent);
    sessionStorage.clear();
    setIsInitialized(true);

    // 3. Call API quietly
    try {
      await supabase.auth.signOut();
    } catch (e) { console.error(e); }
  };

  // Referral Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      localStorage.setItem('pending_ref', refCode);
    }

    if (session && localStorage.getItem('pending_ref')) {
      const pendingRef = localStorage.getItem('pending_ref');
      if (pendingRef && pendingRef !== session.user.id) {
        import('./services/supabase').then(({ processReferral }) => {
          processReferral(session.user.id, pendingRef).then((success) => {
            if (success) {
              console.log('Referral processed successfully');
            }
            localStorage.removeItem('pending_ref');
          });
        });
      }
    }
  }, [session]);

  // Sync Local changes to DB or Storage
  useEffect(() => {
    if (!session && isInitialized) {
      localStorage.setItem('WebImgConverterStats', JSON.stringify(stats));
    }
    // Note: DB updates happen explicitly via updateCredits calls, not useEffect sync to avoid loops
  }, [stats, session, isInitialized]);

  const handleFilesAdded = useCallback(async (newFiles: File[]) => {
    const tempFiles: FileItem[] = newFiles.map(file => ({
      id: uuidv4(),
      file,
      previewUrl: '',
      targetFormat: defaultTool === 'remove-background' ? ConversionFormat.PNG : ConversionFormat.JPEG,
      quality: 1.0,
      rotation: 0,
      resizeScale: 1,
      isGrayscale: false,
      removeBackground: defaultTool === 'remove-background',
      useHDModel: false, // Default to standard (fast) model
      bgRemovalTolerance: 30,
      status: 'analyzing',
      errorMsg: ''
    }));

    setFiles(prev => {
      const newFilesList = [...tempFiles, ...prev];
      // Automatically open the settings panel for the first added file to improve UX
      if (newFilesList.length > 0 && !expandedFileId) {
        setExpandedFileId(newFilesList[0].id);
      }
      return newFilesList;
    }); // New files at top

    // Process previews sequentially to avoid memory spikes with HEIC
    for (const item of tempFiles) {
      try {
        let finalUrl = '';
        const lowerName = item.file.name.toLowerCase();
        const isHeic = lowerName.endsWith('.heic') || lowerName.endsWith('.heif');
        const isAvif = lowerName.endsWith('.avif');
        const isSvg = lowerName.endsWith('.svg');

        // File size limit (50MB)
        if (item.file.size > 50 * 1024 * 1024) {
          setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Dosya çok büyük (Max 50MB)' } : f));
          continue;
        }

        // Business tier check for AVIF/SVG
        if (isAvif || isSvg) {
          if (!hasFeatureAccess(stats.premiumTier, 'ADVANCED_INPUTS')) {
            setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Business Plan Gerekli (AVIF/SVG)' } : f));
            continue;
          }
        }

        // Preview Logic - Server-side HEIC preview could be added, but for now we might rely on browser support or placeholder
        // For HEIC, we might need a quick server preview endpoint or just use a generic icon until converted.
        // HOWEVER, to keep it simple, we will try to use server conversion for preview if it's HEIC.

        if (isHeic) {
          // For HEIC, we immediately request a small JPG preview from server
          try {
            // We can blindly use the convertHeic service for a preview
            const previewBlob = await serverConversionService.convertHeic(item.file, 'jpg');
            finalUrl = URL.createObjectURL(previewBlob);
          } catch (e) {
            console.error("HEIC Preview Failed", e);
            finalUrl = ''; // Or a placeholder image
          }
        } else {
          finalUrl = URL.createObjectURL(item.file);
        }

        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, previewUrl: finalUrl, status: 'idle' } : f));
      } catch (error) {
        console.error("Preview generation error:", error);
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', errorMsg: 'Format desteklenmiyor' } : f));
      }
    }
  }, []); // handleFilesAdded dependencies are empty since it uses functional state updates

  useEffect(() => {
    if (props.initialFiles && props.initialFiles.length > 0 && !initFilesHandled) {
      handleFilesAdded(props.initialFiles);
      setInitFilesHandled(true);
    }
  }, [props.initialFiles, handleFilesAdded, initFilesHandled]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const updateFileConfig = (id: string, key: keyof FileItem, value: any) => {
    // Tier check for Watermark (Pro+)
    if (key === 'watermarkText' && !hasFeatureAccess(stats.premiumTier, 'WATERMARK') && value) {
      setIsPremiumModalOpen(true);
      return;
    }
    setFiles(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  // --- ACTIONS ---



  const handlePaymentSuccess = async () => {
    setStats(prev => ({ ...prev, isPremium: true, credits: 99999 }));
    if (session) {
      await upgradeToPremium(session.user.id);
    }
  };

  const handleReward = async (amount: number) => {
    const newCredits = stats.credits + amount;
    setStats(prev => ({ ...prev, credits: newCredits }));
    if (session) {
      await updateUserCredits(session.user.id, newCredits);
    }
  };



  const openLegal = (tab: 'privacy' | 'terms' | 'contact') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Estimate output file size based on format, quality, and scale
  const estimateFileSize = (file: FileItem): string => {
    if (!file.file) return '~';
    const originalSize = file.file.size;
    const scaleSquared = file.resizeScale * file.resizeScale; // Area scales quadratically

    // Format compression ratios (approximate)
    let formatRatio = 1;
    switch (file.targetFormat) {
      case ConversionFormat.JPEG:
        formatRatio = 0.15 * file.quality; // JPEG highly compresses
        break;
      case ConversionFormat.PNG:
        formatRatio = 0.7; // PNG lossless, usually larger
        break;
      case ConversionFormat.WEBP:
        formatRatio = 0.1 * file.quality; // WEBP very efficient
        break;
    }

    const estimatedBytes = Math.max(originalSize * scaleSquared * formatRatio, 10000); // Min 10KB
    return '~' + formatFileSize(estimatedBytes);
  };

  const deductCredit = async (cost: number) => {
    // Business users have UNLIMITED credits
    if (stats.premiumTier === 'business') return true;

    if (stats.credits < cost) return false;

    const newCredits = stats.credits - cost;
    setStats(prev => ({ ...prev, credits: newCredits }));

    if (session) {
      await updateUserCredits(session.user.id, newCredits);
    }
    return true;
  };

  // --- ROBUST CONVERSION ENGINE ---
  const convertImage = async (id: string) => {
    const item = files.find(f => f.id === id);
    if (!item) return;

    if (!(await deductCredit(COST_PER_CONVERT))) {
      setIsPremiumModalOpen(true);
      return;
    }

    // Helper to yield to UI (allows React to batch and render updates)
    const yieldToUI = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

    // Helper to update progress and yield
    const updateProgress = async (progress: number) => {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, conversionProgress: progress } : f));
      await yieldToUI();
    };

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting', conversionProgress: 0 } : f));

    // Allow UI to update before heavy processing
    setTimeout(async () => {
      try {
        let sourceUrl = item.previewUrl;

        if (item.removeBackground) {
          await updateProgress(5); // Starting AI module load

          try {
            await updateProgress(20);
            
            // Server-side AI call
            const bgBlob = await serverConversionService.removeBackground(
              item.file,
              stats.isPremium ? 'premium' : 'free',
              item.bgModel || 'birefnet-massive'
            );

            if (!bgBlob) throw new Error("Background removal failed");

            await updateProgress(50);
            sourceUrl = URL.createObjectURL(bgBlob);

          } catch (bgError: any) {
            console.error("Background Removal Failed:", bgError);
            throw bgError;
          }
        } else {
          // No AI - yield to let UI update
          await updateProgress(15);
          await updateProgress(25);
        }

        // --- SERVER SIDE CONVERSION ---
        let blob: Blob;
        let dataUrl: string = '';

        // Determine operation type
        const lowerName = item.file.name.toLowerCase();
        const isHeicInput = lowerName.endsWith('.heic') || lowerName.endsWith('.heif');
        const isCompression = defaultTool === 'compress-image';

        // 1. Get Source Blob (either original or BG removed)
        let sourceBlob = item.file;
        if (item.removeBackground && sourceUrl.startsWith('blob:')) {
          sourceBlob = await fetch(sourceUrl).then(r => r.blob()) as File;
        }

        // 2. Perform Server Operation
        // PRIORITY: Use custom conversion handler if provided (e.g. HeicToJpg page specific logic)
        if (conversionHandler && isHeicInput && !item.removeBackground) {
          blob = await conversionHandler(sourceBlob as File);
        }
        else if (isHeicInput && !item.removeBackground) {
          // HEIC Conversion default
          blob = await serverConversionService.convertHeic(sourceBlob as File,
            item.targetFormat === ConversionFormat.PNG ? 'png' :
              item.targetFormat === ConversionFormat.WEBP ? 'webp' : 'jpg'
          );
        } else if (isCompression) {
          // Compression
          blob = await serverConversionService.compressImage(sourceBlob as File, Math.floor(item.quality * 100));
        } else if (!item.removeBackground) {
          // Format Conversion (e.g. WebP -> JPG)
          // Only if not BG removal (BG removal returns PNG already)
          blob = await serverConversionService.convertFormat(sourceBlob as File,
            item.targetFormat === ConversionFormat.PNG ? 'png' :
              item.targetFormat === ConversionFormat.WEBP ? 'webp' : 'jpg'
          );
        } else {
          // BG Removal result is already a blob (PNG). 
          // If user wants different format, we could convert it too.
          // For now, let's assume if BG removed, we respect that blob or convert format if needed.
          if (item.targetFormat !== ConversionFormat.PNG) {
            blob = await serverConversionService.convertFormat(sourceBlob as File,
              item.targetFormat === ConversionFormat.WEBP ? 'webp' : 'jpg'
            );
          } else {
            blob = sourceBlob;
          }
        }

        dataUrl = URL.createObjectURL(blob);

        // --- SERVER SIDE POST-PROCESSING (Watermark) ---
        // Replace client-side Canvas with server API call
        if (hasFeatureAccess(stats.premiumTier, 'WATERMARK') && item.watermarkText) {
            await updateProgress(85); // Watermarking
            try {
               blob = await serverConversionService.watermarkImage(
                 new File([blob], "temp.jpg", { type: blob.type }), 
                 item.watermarkText, 
                 item.targetFormat.split('/')[1] || 'jpg'
               );
               dataUrl = URL.createObjectURL(blob);
            } catch (err) {
               console.error("Server Watermark Failed:", err);
            }
        }

        await updateProgress(90); // Blob created
        await updateProgress(100); // Complete

        setFiles(prev => prev.map(f => f.id === id ? {
          ...f, status: 'done', convertedUrl: dataUrl, convertedBlob: blob, convertedSize: blob.size, conversionProgress: 100
        } : f));

        // Auto-download for single-file crop tool
        if (defaultTool === 'crop') {
          setTimeout(() => {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${item.aiName || item.file.name.split('.')[0]}_cropped.${item.targetFormat.split('/')[1]}`;
            a.click();
          }, 500);
        }

        // LOG HISTORY (Business Tier Only)
        if (stats.premiumTier === 'business') {
          logConversion(stats.premiumTier, {
            file_name: item.file.name,
            file_size: item.file.size,
            converted_size: blob.size,
            format: item.targetFormat
          });
        }

        if (stats.isPremium || await deductCredit(COST_PER_CONVERT)) {
          // Track global stats (fire and forget)
          incrementDailyStats();
        }

      } catch (err) {
        console.error("Conversion Error:", err);
        setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error', errorMsg: t('error_generic'), conversionProgress: 0 } : f));
      }
    }, 100);
  };

  const handleAiRename = async (id: string) => {
    const item = files.find(f => f.id === id);
    if (!item) return;

    if (!(await deductCredit(COST_PER_AI_RENAME))) {
      setIsPremiumModalOpen(true);
      return;
    }

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'analyzing' } : f));

    try {
      const result = await generateSmartFilename(item.file);
      setFiles(prev => prev.map(f => f.id === id ? {
        ...f,
        status: 'idle',
        aiName: result.filename,
        aiUsedFallback: result.usedFallback
      } : f));
    } catch (err) {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'error', errorMsg: 'AI Busy' } : f));
    }
  };

  // Show loading screen while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <svg className="w-16 h-16 animate-pulse" viewBox="0 0 100 100" fill="none">
            <defs><linearGradient id="logoGradLoad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" /></linearGradient></defs>
            <path d="M20 15 L40 75 L50 90 L60 75 L80 15 L65 15 L50 60 L35 15 Z" fill="url(#logoGradLoad)" />
          </svg>
          {/* Loading spinner */}
          <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (stats.requiresActivation && session?.user) {
    return (
      <div className="min-h-screen font-sans flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-800 mx-4">
          <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">WebImgConverter'a Hoş Geldiniz!</h2>
          <p className="text-slate-400 mb-6">
            VibOracle ekosisteminin bir parçası olarak WebImgConverter hesabınızı aktifleştirerek platforma özel günlük ücretsiz kredilerinizi hemen kullanmaya başlayabilirsiniz.
          </p>
          <button
            onClick={async () => {
              setIsActivating(true);
              try {
                const newStats = await activateSiteAccount(session.user.id);
                setStats(newStats);
              } catch (err) {
                console.error('Activation failed:', err);
                alert('Aktivasyon sırasında bir hata oluştu.');
              } finally {
                setIsActivating(false);
              }
            }}
            disabled={isActivating}
            className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 text-white rounded-xl font-medium transition-all disabled:opacity-50"
          >
            {isActivating ? 'Aktifleştiriliyor...' : 'Hesabımı Aktifleştir'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full min-h-screen font-sans text-slate-900 dark:text-slate-100 bg-app-grid dark:bg-slate-950 flex flex-col">
      {/* Modals */}
      <ScriptLoader />
      {ENABLE_PREMIUM_SYSTEM && (
        <>
          <>
            <PremiumModal
              isOpen={isPremiumModalOpen}
              onClose={() => setIsPremiumModalOpen(false)}
              userId={session?.user?.id}
              currentTier={stats.premiumTier}
              isPremium={stats.isPremium}
              onLoginRequired={() => setIsAuthModalOpen(true)}
            />
          </>
        </>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={() => { }} />

      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} initialTab={legalModalTab} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} />

      {/* Crop Modal with tier check */}
      {isCropModalOpen && currentCropFileId && (
        <CropModal
          isOpen={isCropModalOpen}
          onClose={() => { setIsCropModalOpen(false); setCurrentCropFileId(null); }}
          imageUrl={files.find(f => f.id === currentCropFileId)?.previewUrl || ''}
          onCropComplete={(cropData) => {
            setFiles(prev => prev.map(f => f.id === currentCropFileId ? { ...f, cropData: { ...cropData, unit: 'px' } } : f));
            setIsCropModalOpen(false);
            setCurrentCropFileId(null);
          }}
        />
      )}

      <CookieBanner />

      {/* Navbar */}
      {!isSimpleMode && (
        <nav className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 shadow-sm dark:shadow-none backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center gap-3">
              <Logo size={32} />
            </Link>

            {/* Middle: Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/tools" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Araçlar</Link>
              <Link to="/pricing" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Fiyatlandırma</Link>
              <Link to="/blog" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Blog</Link>
            </div>

            {/* Right: Auth & CTA */}
            <div className="flex items-center gap-5">
              {session ? (
                <>
                  <Link to="/profile" className="hidden lg:flex flex-col items-end group">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[100px] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {session.user.email?.split('@')[0]}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{stats.premiumTier === 'business' ? '∞' : stats.credits}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">{t('credits_label')}</span>
                    </div>
                  </Link>
                  {stats.isPremium && (
                     <div className="hidden sm:flex items-center gap-2 bg-brand-50 dark:bg-brand-950/20 px-2 py-1 rounded-md border border-brand-100 dark:border-brand-900/50">
                       <span className="text-brand-600 dark:text-brand-400 text-[10px] font-bold uppercase">{stats.premiumTier}</span>
                     </div>
                  )}
                  <button onClick={handleSignOut} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors hidden sm:block">Çıkış</button>
                </>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors hidden sm:block">
                  Giriş Yap
                </button>
              )}

              <button
                onClick={() => {
                  const dropzone = document.querySelector('input[type="file"]') as HTMLInputElement;
                  if (dropzone) dropzone.click();
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 rounded-lg text-white font-bold text-sm shadow-sm dark:shadow-none transition-colors whitespace-nowrap"
              >
                Hemen Dönüştür
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 mt-6 flex flex-col" style={{ flexGrow: 1, flexShrink: 0, minHeight: '60vh' }}>
        <div className="flex-1 flex flex-col gap-8">

          {/* Central Workspace: Upload & Files */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-brand-700 dark:text-brand-350 text-xs font-medium bg-brand-50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/50 rounded-full px-4 py-2 mx-auto shadow-sm dark:shadow-none">
              <span className="text-brand-500 dark:text-brand-400">🔒</span>
              <span>{language === 'tr' ? 'Güvenli İşlem • Gizlilik Öncelikli' : 'Secure Processing • Privacy First'}</span>
            </div>

            {((defaultTool === 'crop' || defaultTool === 'remove-background') && files.length > 0) ? (
              <div className="animate-[fadeIn_0.5s]">
                {defaultTool === 'crop' ? (
                  <InlineCrop 
                    imageUrl={files[0].previewUrl} 
                    onCropComplete={(cropData) => { 
                      updateFileConfig(files[0].id, 'cropData', { ...cropData, unit: 'px' });
                      setTimeout(() => convertImage(files[0].id), 100);
                    }} 
                    onCancel={() => removeFile(files[0].id)} 
                  />
                ) : (
                  <InlineBgRemover 
                    file={files[0]} 
                    onProcess={() => convertImage(files[0].id)} 
                    onCancel={() => removeFile(files[0].id)} 
                    onDownload={() => {
                      const f = files[0];
                      if (!f.convertedUrl) return;
                      const a = document.createElement('a');
                      a.href = f.convertedUrl;
                      a.download = `${f.aiName || f.file.name.split('.')[0]}.${f.targetFormat.split('/')[1]}`;
                      a.click();
                    }}
                    onModelChange={(model) => updateFileConfig(files[0].id, 'bgModel', model)}
                  />
                )}
              </div>
            ) : (
              <>
                <section className="glass-panel dark:bg-slate-900/40 dark:border-slate-800 rounded-2xl p-1 shadow-2xl dark:shadow-none animate-[fadeIn_0.5s]">
                  <Dropzone
                    onFilesAdded={handleFilesAdded}
                    disabled={!stats.isPremium && stats.credits <= 0 && files.length === 0}
                    acceptTypes={acceptTypes}
                    formatBadges={formatBadges}
                    title={dropzoneTitle}
                    description={dropzoneDesc}
                  />
                </section>

                <div className="space-y-4">
                  {files.length > 0 && (
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('queue')} <span className="text-sm font-normal text-slate-400 dark:text-slate-500">({files.length})</span></h3>
                  <div className="flex items-center gap-2">
                    {/* Batch Progress */}
                    {files.length > 1 && files.some(f => f.status === 'converting') && (
                      <div className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none flex items-center gap-3 min-w-[180px]">
                        <div className="flex-1">
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 transition-all duration-500 rounded-full" style={{ width: `${(files.filter(f => f.status === 'done').length / files.length) * 100}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-mono text-brand-600 dark:text-brand-400 font-bold">{files.filter(f => f.status === 'done').length}/{files.length}</span>
                      </div>
                    )}
                    {/* Convert All */}
                    {files.some(f => f.status === 'idle') && (
                      <button
                        onClick={async () => { for (const file of files.filter(f => f.status === 'idle')) { await convertImage(file.id); } }}
                        className="flex items-center gap-1.5 text-xs bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm dark:shadow-none"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        {t('convert_all_btn') || 'Convert All'}
                      </button>
                    )}
                    {/* ZIP Download */}
                    {hasFeatureAccess(stats.premiumTier, 'ZIP_DOWNLOAD') && files.some(f => f.status === 'done') && (
                      <button
                        onClick={async () => {
                          const JSZip = (await import('jszip')).default;
                          const { saveAs } = await import('file-saver');
                          const zip = new JSZip();
                          files.filter(f => f.status === 'done' && f.convertedBlob).forEach((file, idx) => {
                            const ext = file.targetFormat.split('/')[1];
                            const name = file.aiName || file.file.name.replace(/\.[^/.]+$/, '');
                            zip.file(`${name}_${idx + 1}.${ext}`, file.convertedBlob!);
                          });
                          const blob = await zip.generateAsync({ type: 'blob' });
                          saveAs(blob, 'WebImgConverter_Images.zip');
                        }}
                        className="flex items-center gap-1.5 text-xs bg-amber-500 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500 text-white px-3 py-2 rounded-lg font-bold transition-colors shadow-sm dark:shadow-none"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        ZIP
                      </button>
                    )}
                    {/* Batch AI Rename */}
                    {hasFeatureAccess(stats.premiumTier, 'BATCH_AI') && files.some(f => f.status === 'idle' && !f.aiName) && (
                      <button
                        onClick={async () => { for (const file of files.filter(f => f.status === 'idle' && !f.aiName)) { await handleAiRename(file.id); } }}
                        className="flex items-center gap-1.5 text-xs bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/20 dark:hover:bg-brand-900/30 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-900/50 px-3 py-2 rounded-lg font-bold transition-colors shadow-sm dark:shadow-none"
                      >
                        ✨ AI
                      </button>
                    )}
                    <button onClick={() => setFiles([])} className="text-xs text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-450 font-medium transition-colors">{t('clear_all')}</button>
                  </div>
                </div>
              )}

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="files">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {files.map((file, index) => (
                        <Draggable key={file.id} draggableId={file.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-slate-700/80 transition-shadow relative overflow-hidden"
                              style={provided.draggableProps.style}
                            >
                              {/* Main Row: Thumbnail | Info | Format | Actions */}
                              <div className="flex items-center gap-4 p-4">
                                {/* Compact Thumbnail */}
                                <div className="relative w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                                  {file.status === 'analyzing' && !file.previewUrl ? (
                                    <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <img src={file.status === 'done' ? file.convertedUrl : file.previewUrl} className={`max-w-full max-h-full object-contain dark:brightness-90 dark:opacity-90 ${file.isGrayscale ? 'grayscale' : ''}`} style={{ transform: `rotate(${file.rotation}deg)` }} />
                                  )}
                                </div>

                                {/* File Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm" title={file.file.name}>{file.file.name}</h4>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
                                      {file.file.name.split('.').pop()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-slate-400 dark:text-slate-500">{(file.file.size / 1024).toFixed(0)} KB</span>
                                    {file.aiName && (
                                      <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">✨ {file.aiName}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Inline Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                  {file.status === 'idle' && (
                                    <>
                                      {/* Settings Toggle */}
                                      <button
                                        onClick={() => setExpandedFileId(expandedFileId === file.id ? null : file.id)}
                                        className={`px-4 py-2 flex items-center gap-2 rounded-xl border-2 text-sm font-bold transition-all ${expandedFileId === file.id ? 'bg-brand-50 dark:bg-brand-950/30 border-brand-400 dark:border-brand-600 text-brand-700 dark:text-brand-300 shadow-inner' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 hover:shadow-md'}`}
                                        title="Options"
                                      >
                                        <span>⚙️</span>
                                        <span className="hidden sm:inline">{language === 'tr' ? 'Gelişmiş Ayarlar' : 'Advanced Options'}</span>
                                        <svg className={`w-4 h-4 transition-transform duration-300 ${expandedFileId === file.id ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                      </button>
                                      {/* Convert */}
                                      <button onClick={() => convertImage(file.id)} className="bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md shadow-brand-500/20 dark:shadow-none transition-all hover:scale-105 active:scale-95">
                                        {t('convert_btn')}
                                      </button>
                                    </>
                                  )}
                                  {file.status === 'done' && (
                                    <div className="flex items-center gap-2">
                                      <button onClick={() => setCompareItem(file)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm transition-colors" title="Compare">👁️</button>
                                      <a href={file.convertedUrl} download={`${file.aiName || file.file.name.split('.')[0]}.${file.targetFormat.split('/')[1]}`} className="bg-brand-600 hover:bg-brand-500 dark:bg-brand-600 dark:hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-sm dark:shadow-none transition-colors">
                                        ↓ {formatFileSize(file.convertedSize || 0)}
                                      </a>
                                      {/* Save to Drive */}
                                      {(() => {
                                        const canSaveToDrive = hasFeatureAccess(stats.premiumTier, 'CLOUD_STORAGE');
                                        return (
                                          <button
                                            onClick={async () => {
                                              if (!canSaveToDrive) { setIsPremiumModalOpen(true); return; }
                                              if (file.convertedBlob) {
                                                const { saveToGoogleDrive, loadGoogleDriveAPI } = await import('./services/googleDriveService');
                                                await loadGoogleDriveAPI();
                                                const filename = `${file.aiName || file.file.name.split('.')[0]}.${file.targetFormat.split('/')[1]}`;
                                                const result = await saveToGoogleDrive(file.convertedBlob, filename);
                                                if (result.success) alert('✅ Saved to Google Drive!');
                                                else alert('❌ Save failed: ' + result.error);
                                              }
                                            }}
                                            className={`p-2 rounded-lg text-sm transition-colors ${canSaveToDrive ? 'bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-450 border border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'}`}
                                            title="Save to Drive"
                                          >☁️{!canSaveToDrive && <span className="text-amber-500 ml-0.5">🔒</span>}</button>
                                        );
                                      })()}
                                    </div>
                                  )}
                                  {/* Remove */}
                                  <button onClick={() => removeFile(file.id)} className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/15 transition-colors text-sm">✕</button>
                                </div>
                              </div>
                              {/* Advanced Settings Panel (Collapsible) */}
                              {expandedFileId === file.id && file.status !== 'done' && (
                                <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 space-y-4 animate-[fadeIn_0.2s]">
                                  {/* Format Selector */}
                                  <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{language === 'tr' ? 'Format Seçimi' : 'Target Format'}</span>
                                    <div className="flex flex-wrap gap-2">
                                      {/* Free Formats */}
                                      {[ConversionFormat.JPEG, ConversionFormat.PNG, ConversionFormat.WEBP].map(fmt => (
                                        <button key={fmt} onClick={() => updateFileConfig(file.id, 'targetFormat', fmt)} className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${file.targetFormat === fmt ? 'bg-brand-600 border-brand-500 text-white shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500'}`}>
                                          {fmt.split('/')[1].toUpperCase()}
                                        </button>
                                      ))}
                                      {/* Premium Formats (Business tier) */}
                                      {[ConversionFormat.TIFF, ConversionFormat.BMP, ConversionFormat.ICO, ConversionFormat.AVIF, ConversionFormat.SVG].map(fmt => {
                                        const canUse = hasFeatureAccess(stats.premiumTier, 'SPECIAL_FORMATS');
                                        return (
                                          <button
                                            key={fmt}
                                            onClick={() => canUse && updateFileConfig(file.id, 'targetFormat', fmt)}
                                            disabled={!canUse}
                                            title={canUse ? fmt.split('/')[1].toUpperCase() : 'Business Feature'}
                                            className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1 font-medium transition-colors ${canUse
                                              ? file.targetFormat === fmt
                                                ? 'bg-brand-600 border-brand-500 text-white shadow-sm'
                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 dark:hover:border-brand-500'
                                              : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                              }`}
                                          >
                                            {fmt.split('/')[1].toUpperCase()}
                                            {!canUse && <span className="text-amber-500 ml-0.5">🔒</span>}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {/* Rotate */}
                                    <button onClick={() => updateFileConfig(file.id, 'rotation', (file.rotation + 90) % 360)} className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">{t('rotate')}: {file.rotation}°</button>
                                    
                                    {/* Grayscale */}
                                    <button onClick={() => updateFileConfig(file.id, 'isGrayscale', !file.isGrayscale)} className={`p-2 rounded-lg text-xs font-medium border transition-colors ${file.isGrayscale ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'}`}>{t('grayscale')}</button>

                                    {/* Quality Slider for JPEG/WEBP */}
                                    {(file.targetFormat === ConversionFormat.JPEG || file.targetFormat === ConversionFormat.WEBP) && (
                                      <select
                                        value={file.quality}
                                        onChange={(e) => updateFileConfig(file.id, 'quality', parseFloat(e.target.value))}
                                        className="bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg p-2 focus:ring-2 focus:ring-brand-500 outline-none"
                                      >
                                        <option value="1">100% Quality</option><option value="0.75">75% Quality</option><option value="0.5">50% Quality</option><option value="0.25">25% Quality</option>
                                      </select>
                                    )}

                                    {/* Flip Buttons */}
                                    <div className="flex gap-2">
                                      <button onClick={() => updateFileConfig(file.id, 'isFlippedHorizontal', !file.isFlippedHorizontal)} className={`flex-1 p-2 rounded-lg text-xs font-medium border transition-colors ${file.isFlippedHorizontal ? 'bg-brand-50 dark:bg-brand-950/20 border-brand-200 dark:border-brand-850 text-brand-700 dark:text-brand-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>↔️ Flip</button>
                                      <button onClick={() => updateFileConfig(file.id, 'isFlippedVertical', !file.isFlippedVertical)} className={`flex-1 p-2 rounded-lg text-xs font-medium border transition-colors ${file.isFlippedVertical ? 'bg-brand-50 dark:bg-brand-950/20 border-brand-200 dark:border-brand-850 text-brand-700 dark:text-brand-300' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>↕️ Flip</button>
                                    </div>
                                    
                                    {/* Target Size */}
                                    {file.targetFormat === ConversionFormat.JPEG && (
                                      <input
                                        type="number"
                                        placeholder="Max KB"
                                        className="bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-700 rounded-lg p-2 w-full placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none"
                                        onChange={(e) => updateFileConfig(file.id, 'targetSizeBytes', e.target.value ? parseInt(e.target.value) * 1024 : undefined)}
                                      />
                                    )}

                                    {/* Crop Button with Pro+ tier check */}
                                    {(() => {
                                      const canCrop = hasFeatureAccess(stats.premiumTier, 'CROP');
                                      return (
                                        <button
                                          onClick={() => {
                                            if (canCrop) {
                                              setCurrentCropFileId(file.id);
                                              setIsCropModalOpen(true);
                                            } else {
                                              setIsPremiumModalOpen(true);
                                            }
                                          }}
                                          className={`text-xs px-3 py-1.5 rounded-lg border flex justify-center items-center gap-1 font-medium transition-colors ${canCrop
                                            ? file.cropData
                                              ? 'bg-brand-50 dark:bg-brand-950/20 border-brand-200 dark:border-brand-850 text-brand-700 dark:text-brand-300'
                                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                                            }`}
                                        >
                                          ✂️ {file.cropData ? 'Cropped' : 'Crop'}
                                          {!canCrop && <span className="text-amber-500">🔒</span>}
                                        </button>
                                      );
                                    })()}
                                    
                                    {/* Remove BG */}
                                    {file.targetFormat !== ConversionFormat.JPEG && (() => {
                                        const canUseRemoveBg = hasFeatureAccess(stats.premiumTier, 'REMOVE_BG');
                                        return (
                                          <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
                                            <button
                                              onClick={() => {
                                                if (canUseRemoveBg) {
                                                  // Auto-switch to PNG to preserve transparency if background is removed
                                                  const isTurningOn = !file.removeBackground;
                                                  
                                                  // Find the specific file to check its current state
                                                  setFiles(prev => prev.map(f => {
                                                    if (f.id === file.id) {
                                                      return {
                                                        ...f,
                                                        removeBackground: isTurningOn,
                                                        targetFormat: isTurningOn ? ConversionFormat.PNG : f.targetFormat
                                                      };
                                                    }
                                                    return f;
                                                  }));
                                                } else {
                                                  setIsPremiumModalOpen(true);
                                                }
                                              }}
                                              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center justify-center gap-1 font-medium transition-colors w-full ${file.removeBackground
                                                ? 'bg-brand-50 dark:bg-brand-950/20 border-brand-200 dark:border-brand-850 text-brand-700 dark:text-brand-300'
                                                : canUseRemoveBg
                                                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-650 cursor-not-allowed'
                                                }`}
                                            >
                                              <span className={file.removeBackground ? "" : "grayscale opacity-50"}>✨</span>
                                              {file.removeBackground ? 'BG Removed' : 'Remove BG'}
                                              {!canUseRemoveBg && <span className="text-amber-500 ml-0.5">🔒</span>}
                                            </button>
                                            
                                            {/* AI Model Selector when BG Removal is enabled */}
                                            {file.removeBackground && (
                                              <select
                                                value={file.bgModel || 'birefnet-massive'}
                                                onChange={(e) => updateFileConfig(file.id, 'bgModel', e.target.value)}
                                                className="bg-brand-50 dark:bg-brand-950/30 text-[11px] font-medium text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 rounded-lg p-1.5 focus:ring-2 focus:ring-brand-500 outline-none w-full"
                                              >
                                                <option value="birefnet-massive">🤖 Otomatik (En İyi)</option>
                                                <option value="birefnet-portrait">🧑 Portre Modu (İnsan & Saç)</option>
                                                <option value="bria-rmbg">🎨 Logo & Metin (Keskin)</option>

                                              </select>
                                            )}
                                          </div>
                                        );
                                      })()}
                                  </div>

                                  {/* Watermark Section */}
                                  {(() => {
                                    const canUseWatermark = hasFeatureAccess(stats.premiumTier, 'WATERMARK');
                                    return (
                                      <div className={`space-y-2 p-3 rounded-xl border ${canUseWatermark ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60'}`}>
                                        <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                                          <span>💧 Watermark</span>
                                          {!canUseWatermark && <span className="text-amber-500 text-[10px]">🔒 Pro+</span>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="text"
                                            placeholder={file.watermarkLogo ? "Logo Selected" : "Watermark Text..."}
                                            disabled={!canUseWatermark || !!file.watermarkLogo}
                                            value={file.watermarkText || ''}
                                            onChange={(e) => updateFileConfig(file.id, 'watermarkText', e.target.value)}
                                            className={`bg-slate-50 dark:bg-slate-900 text-xs border border-slate-200 dark:border-slate-700 rounded-lg p-2 flex-grow focus:ring-2 focus:ring-brand-500 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 ${!canUseWatermark ? 'opacity-50 cursor-not-allowed' : ''}`}
                                          />
                                          <input
                                            type="color"
                                            value={file.watermarkColor || '#ffffff'}
                                            onChange={(e) => updateFileConfig(file.id, 'watermarkColor', e.target.value)}
                                            disabled={!canUseWatermark}
                                            className={`w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer p-0 bg-transparent overflow-hidden ${!canUseWatermark ? 'opacity-50 pointer-events-none' : ''}`}
                                          />
                                          <div className="relative">
                                            <input
                                              type="file"
                                              id={`logo-upload-${file.id}`}
                                              className="hidden"
                                              accept="image/png, image/jpeg"
                                              disabled={!canUseWatermark}
                                              onChange={(e) => {
                                                const logoFile = e.target.files?.[0];
                                                if (logoFile) {
                                                  const reader = new FileReader();
                                                  reader.onload = (ev) => {
                                                    updateFileConfig(file.id, 'watermarkLogo', ev.target?.result as string);
                                                    updateFileConfig(file.id, 'watermarkText', undefined);
                                                  };
                                                  reader.readAsDataURL(logoFile);
                                                }
                                              }}
                                            />
                                            {file.watermarkLogo ? (
                                              <button
                                                onClick={() => updateFileConfig(file.id, 'watermarkLogo', undefined)}
                                                className="bg-red-50 dark:bg-red-950/15 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 dark:border-red-900/40 transition-colors text-xs"
                                              >✕</button>
                                            ) : (
                                              <label
                                                htmlFor={`logo-upload-${file.id}`}
                                                className={`flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-sm ${!canUseWatermark ? 'opacity-50 pointer-events-none' : ''}`}
                                              >📷</label>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {canUseWatermark && (file.watermarkText || file.watermarkLogo) && (
                                          <div className="flex items-center gap-1 flex-wrap mt-2">
                                            <span className="text-[10px] text-slate-500 font-medium mr-1">Position:</span>
                                            {(['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'] as const).map(pos => (
                                              <button
                                                key={pos}
                                                onClick={() => updateFileConfig(file.id, 'watermarkPosition', pos)}
                                                className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${file.watermarkPosition === pos || (!file.watermarkPosition && pos === 'center')
                                                  ? 'bg-brand-600 text-white shadow-sm'
                                                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-450 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                  }`}
                                              >
                                                {pos === 'top-left' && '↖'}
                                                {pos === 'top-right' && '↗'}
                                                {pos === 'center' && '⊙'}
                                                {pos === 'bottom-left' && '↙'}
                                                {pos === 'bottom-right' && '↘'}
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })()}
                                  
                                  {/* Estimated Size Display */}
                                  <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800/60 pt-3 mt-3">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{language === 'tr' ? 'Tahmini Boyut' : 'Est. Size'}: <span className="font-mono text-brand-600 font-semibold">{estimateFileSize(file)}</span></span>
                                    <button onClick={() => setExpandedFileId(null)} className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-medium">{language === 'tr' ? 'Kapat' : 'Close'}</button>
                                  </div>
                                </div>
                              )}
                              {
                                    file.status === 'converting' && (
                                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20 flex-col gap-4 p-6">
                                        <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-brand-600 text-sm font-bold">{t('processing')}</span>
                                        {/* Progress Bar */}
                                        <div className="w-full max-w-xs">
                                          <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                                            <span>{t('progress') || 'İlerleme'}</span>
                                            <span className="font-mono text-brand-600">{file.conversionProgress || 0}%</span>
                                          </div>
                                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                              className="h-full bg-gradient-to-r from-brand-500 to-teal-400 transition-all duration-300 ease-out"
                                            style={{ width: `${file.conversionProgress || 0}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )
                                }
                                </div>

                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {files.length > 0 && !hasFeatureAccess(stats.premiumTier, 'NO_ADS') && <div className="mt-8"><AdBanner variant="horizontal" /></div>}

              {
                files.some(f => f.status === 'done') && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={async () => {
                        const JSZip = (await import('jszip')).default;
                        const { saveAs } = (await import('file-saver'));
                        const zip = new JSZip();

                        let count = 0;
                        for (const file of files) {
                          if (file.status === 'done' && file.convertedBlob) {
                            const fileName = `${file.aiName || file.file.name.split('.')[0]}.${file.targetFormat.split('/')[1]}`;
                            zip.file(fileName, file.convertedBlob);
                            count++;
                          }
                        }

                        if (count > 0) {
                          const content = await zip.generateAsync({ type: "blob" });
                          saveAs(content, "WebImgConverter_images.zip");
                        }
                      }}
                      className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-500/20 dark:shadow-none flex items-center gap-2 transition-transform hover:scale-105"
                    >
                      📦 {t('download_all_zip') || 'Download All (ZIP)'}
                    </button>
                  </div>
                )
              }
          </div>
          </>
        )}
          </div>
        </div>
      </main>

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        isPremium={stats.isPremium}
        userEmail={session?.user?.email}
      />





      {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-500 transition-colors">↑</button>}


      {
        compareItem && compareItem.convertedUrl && (
          <CompareSlider
            originalUrl={compareItem.previewUrl}
            convertedUrl={compareItem.convertedUrl}
            onClose={() => setCompareItem(null)}
          />
        )
      }

      {/* Injected Content (e.g. SEO Text) */}
      {props.children && (
        <div className="max-w-7xl mx-auto px-4 w-full mb-12">
          {props.children}
        </div>
      )}
      
      <div className="w-full bg-app-grid border-t border-slate-100 dark:border-slate-800/50 shrink-0" style={{ marginTop: 'auto' }}>
        <SiteFooter />
      </div>
    </div>
  );
}

export default function App(props: AppProps = {}) {
  return (
    <LanguageProvider>
      <BanaConvertApp {...props}>
        {props.children}
      </BanaConvertApp>
    </LanguageProvider>
  );
}