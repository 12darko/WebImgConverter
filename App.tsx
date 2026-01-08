import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
// @imgly/background-removal is dynamically imported when needed (lazy loading)
import { Dropzone } from './components/Dropzone';
import { AdBanner } from './components/AdBanner';
import { PremiumModal } from './components/PremiumModal';
import { ReferralWidget } from './components/ReferralWidget';
import { PaymentModal } from './components/PaymentModal';
import { LegalModal } from './components/LegalModal';
import { SupportModal } from './components/SupportModal';
import { CookieBanner } from './components/CookieBanner';
import { HistoryModal } from './components/HistoryModal'; // History Import

import { CompareSlider } from './components/CompareSlider';
import { AuthModal } from './components/AuthModal'; // Auth import
import { generateSmartFilename } from './services/aiNamingService';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';


import { supabase, getUserProfile, updateUserCredits, upgradeToPremium, incrementDailyStats } from './services/supabase'; // DB Services
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

import { encodeToBMP, encodeToTIFF, encodeToICO } from './utils/imageEncoders';

declare global {
  interface Window {
    heic2any: (options: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>;
  }
}

function BanaConvertApp() {
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

  // Modals
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Auth Modal
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false); // History Modal State

  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'contact'>('privacy');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

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
    const storedStats = localStorage.getItem('vormPixyzeStats');
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
      localStorage.setItem('vormPixyzeStats', JSON.stringify(stats));
    }
    // Note: DB updates happen explicitly via updateCredits calls, not useEffect sync to avoid loops
  }, [stats, session, isInitialized]);

  const handleFilesAdded = useCallback(async (newFiles: File[]) => {
    const tempFiles: FileItem[] = newFiles.map(file => ({
      id: uuidv4(),
      file,
      previewUrl: '',
      targetFormat: ConversionFormat.JPEG,
      quality: 1.0,
      rotation: 0,
      resizeScale: 1,
      isGrayscale: false,
      removeBackground: false,
      bgRemovalTolerance: 30,
      status: 'analyzing',
      errorMsg: ''
    }));

    setFiles(prev => [...tempFiles, ...prev]); // New files at top

    // Process previews sequentially to avoid memory spikes with HEIC
    for (const item of tempFiles) {
      try {
        let finalUrl = '';
        const lowerName = item.file.name.toLowerCase();
        const isHeic = lowerName.endsWith('.heic') || lowerName.endsWith('.heif');

        if (isHeic) {
          if (window.heic2any) {
            const convertedBlob = await window.heic2any({ blob: item.file, toType: 'image/jpeg', quality: 0.6 }); // Use lower quality for preview speed
            const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            finalUrl = URL.createObjectURL(blobToUse);
          } else {
            throw new Error("HEIC converter library missing");
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
  }, []);

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));
  const updateFileConfig = (id: string, key: keyof FileItem, value: any) => {
    // Tier check for Watermark (Pro+)
    if (key === 'watermarkText' && !hasFeatureAccess(stats.premiumTier, 'WATERMARK') && value) {
      setIsPremiumModalOpen(true);
      return;
    }
    setFiles(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  // --- ACTIONS ---

  const handleUpgradeClick = () => {
    if (!session) {
      setIsAuthModalOpen(true); // Require login for premium
      return;
    }
    setIsPremiumModalOpen(false);
    setIsPaymentModalOpen(true);
  };

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
    // Premium users also have credits deducted (no unlimited)
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

    // Helper to update progress
    const updateProgress = (progress: number) => {
      setFiles(prev => prev.map(f => f.id === id ? { ...f, conversionProgress: progress } : f));
    };

    setFiles(prev => prev.map(f => f.id === id ? { ...f, status: 'converting', conversionProgress: 0 } : f));

    // Allow UI to update before heavy processing
    setTimeout(async () => {
      try {
        let sourceUrl = item.previewUrl;

        if (item.removeBackground) {
          updateProgress(5); // Starting AI module load
          try {
            // Dynamic import - only loads the 24MB library when needed
            const { removeBackground } = await import('@imgly/background-removal');
            updateProgress(10); // AI module loaded, starting processing
            const blob = await removeBackground(item.previewUrl, {
              progress: (key: string, current: number, total: number) => {
                const percentage = 10 + Math.floor((current / total) * 40);
                // Ensure progress only increases
                setFiles(prev => {
                  const f = prev.find(x => x.id === id);
                  if (f && (f.conversionProgress || 0) < percentage) {
                    return prev.map(x => x.id === id ? { ...x, conversionProgress: percentage } : x);
                  }
                  return prev;
                });
              }
            });
            sourceUrl = URL.createObjectURL(blob);
          } catch (aiError) {
            console.error("AI BG Removal Failed:", aiError);
          }
        } else {
          // No AI - simulate gradual progress for UX
          updateProgress(15);
          await new Promise(r => setTimeout(r, 100)); // Small delay for visual feedback
          updateProgress(25);
        }

        updateProgress(35); // Loading image

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = sourceUrl;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });

        updateProgress(45); // Image loaded, creating canvas

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) throw new Error("Canvas context failed");

        // High Quality Settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        let targetWidth = Math.floor(img.width * item.resizeScale);
        let targetHeight = Math.floor(img.height * item.resizeScale);

        // Handle Rotation Logic
        if (item.rotation === 90 || item.rotation === 270) {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
        } else {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        // Apply Transforms
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);

        // Flip Logic
        const scaleX = item.isFlippedHorizontal ? -1 : 1;
        const scaleY = item.isFlippedVertical ? -1 : 1;
        ctx.scale(scaleX, scaleY);

        // Grayscale using Canvas Filter (Faster)
        if (item.isGrayscale) {
          ctx.filter = 'grayscale(100%)';
        }

        // Pre-fill white background for JPEG to prevent black background
        if (item.targetFormat === ConversionFormat.JPEG) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(-targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
        }

        updateProgress(55); // Canvas ready

        // Draw the image (Transparent or Original)
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.filter = 'none'; // Reset filter

        updateProgress(65); // Effects applied

        // --- WATERMARK (Pro+) ---
        if (hasFeatureAccess(stats.premiumTier, 'WATERMARK') && (item.watermarkText || item.watermarkLogo)) {
          // Reset transforms for watermark positioning
          ctx.setTransform(1, 0, 0, 1, 0, 0);

          const position = item.watermarkPosition || 'center';
          const padding = Math.min(canvas.width, canvas.height) * 0.03;

          // Calculate position coordinates
          let x = canvas.width / 2;
          let y = canvas.height / 2;

          switch (position) {
            case 'top-left':
              x = padding;
              y = padding;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              break;
            case 'top-right':
              x = canvas.width - padding;
              y = padding;
              ctx.textAlign = 'right';
              ctx.textBaseline = 'top';
              break;
            case 'bottom-left':
              x = padding;
              y = canvas.height - padding;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'bottom';
              break;
            case 'bottom-right':
              x = canvas.width - padding;
              y = canvas.height - padding;
              ctx.textAlign = 'right';
              ctx.textBaseline = 'bottom';
              break;
            default: // center
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
          }

          if (item.watermarkLogo) {
            const logoImg = new Image();
            logoImg.src = item.watermarkLogo;
            await new Promise((resolve) => { logoImg.onload = resolve; logoImg.onerror = resolve; });

            const logoWidth = canvas.width * 0.15;
            const logoHeight = logoWidth * (logoImg.height / logoImg.width);

            // Adjust logo position based on selected position
            let logoX = x - logoWidth / 2;
            let logoY = y - logoHeight / 2;
            if (position === 'top-left') { logoX = padding; logoY = padding; }
            else if (position === 'top-right') { logoX = canvas.width - logoWidth - padding; logoY = padding; }
            else if (position === 'bottom-left') { logoX = padding; logoY = canvas.height - logoHeight - padding; }
            else if (position === 'bottom-right') { logoX = canvas.width - logoWidth - padding; logoY = canvas.height - logoHeight - padding; }

            ctx.globalAlpha = 0.6;
            ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
            ctx.globalAlpha = 1.0;
          } else if (item.watermarkText) {
            // Calculate font size based on user selection (1-5 scale)
            const sizeMultiplier = [0.03, 0.05, 0.07, 0.09, 0.12][item.watermarkFontSize ? item.watermarkFontSize - 1 : 1];
            const fontSize = Math.max(16, Math.floor(canvas.width * sizeMultiplier));
            const fontFamily = item.watermarkFont || 'Arial';
            ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;

            // Use custom color or default white with black stroke for visibility
            const color = item.watermarkColor || '#ffffff';
            ctx.fillStyle = color;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(2, fontSize / 12);

            // Draw text with stroke first, then fill
            ctx.strokeText(item.watermarkText, x, y);
            ctx.fillText(item.watermarkText, x, y);
          }
        }

        // --- TARGET SIZE OPTIMIZATION (Binary Search / Reduction) ---
        // if targetSizeBytes is set... (logic implemented below)

        updateProgress(75); // Watermark done, creating blob

        let blob: Blob;
        let dataUrl: string;

        // Handle different output formats
        if (item.targetFormat === ConversionFormat.TIFF) {
          // Use custom TIFF encoder
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          blob = encodeToTIFF(imageData);
          dataUrl = URL.createObjectURL(blob);
        } else if (item.targetFormat === ConversionFormat.BMP) {
          // Use custom BMP encoder
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          blob = encodeToBMP(imageData);
          dataUrl = URL.createObjectURL(blob);
        } else if (item.targetFormat === ConversionFormat.ICO) {
          // Use custom ICO encoder for favicon
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          blob = encodeToICO(imageData);
          dataUrl = URL.createObjectURL(blob);
        } else {
          // Standard formats (JPEG, PNG, WEBP)
          const mimeType = item.targetFormat;

          blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((b) => {
              if (b) resolve(b);
              else reject(new Error("Blob creation failed"));
            }, mimeType, item.quality);
          });

          dataUrl = canvas.toDataURL(mimeType, item.quality);
        }

        // If ICO, we just save the PNG blob but name it .ico (simple method)
        // For real ICO structure, we'd need a library, but this works for most modern OS/browsers as "PNG-in-Icon"

        // --- TARGET SIZE OPTIMIZATION (Binary Search / Reduction) ---
        if (item.targetSizeBytes && item.targetSizeBytes > 0 && item.targetFormat === ConversionFormat.JPEG) {
          let currentQuality = item.quality;
          let attempts = 0;
          let currentBlob = blob;

          while (currentBlob.size > item.targetSizeBytes && currentQuality > 0.1 && attempts < 10) {
            currentQuality -= 0.1;
            dataUrl = canvas.toDataURL(item.targetFormat, currentQuality);
            currentBlob = await (await fetch(dataUrl)).blob();
            attempts++;
          }
          // Update blob to optimized one
          // Note: We can't re-assign const blob, so we use the result here
        }

        updateProgress(90); // Blob created
        await new Promise(r => setTimeout(r, 50)); // Small delay for visual feedback
        updateProgress(100); // Complete

        setFiles(prev => prev.map(f => f.id === id ? {
          ...f, status: 'done', convertedUrl: dataUrl, convertedBlob: blob, convertedSize: blob.size, conversionProgress: 100
        } : f));

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
      <div className="min-h-screen font-sans flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <svg className="w-16 h-16 animate-pulse" viewBox="0 0 100 100" fill="none">
            <defs><linearGradient id="logoGradLoad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
            <path d="M20 15 L40 75 L50 90 L60 75 L80 15 L65 15 L50 60 L35 15 Z" fill="url(#logoGradLoad)" />
          </svg>
          {/* Loading spinner */}
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-200 flex flex-col">
      {/* Modals */}
      {ENABLE_PREMIUM_SYSTEM && (
        <>
          <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} userId={session?.user?.id} currentTier={stats.premiumTier} isPremium={stats.isPremium} />
        </>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={() => { }} />

      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} initialTab={legalModalTab} />
      <HistoryModal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} />
      <CookieBanner />

      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => window.location.reload()}>
              <div className="absolute inset-0 bg-indigo-600 blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <svg className="relative w-10 h-10 drop-shadow-xl" viewBox="0 0 100 100" fill="none">
                <defs><linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                <path d="M20 15 L40 75 L50 90 L60 75 L80 15 L65 15 L50 60 L35 15 Z" fill="url(#logoGrad)" />
                <rect x="45" y="5" width="10" height="10" fill="#facc15" className="animate-bounce" style={{ animationDuration: '2s' }} />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white hidden sm:block">
              Vorm<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Pixyze</span>
            </h1>
          </div>



          <div className="flex items-center gap-6">

            {session ? (
              <div className="hidden md:flex items-center gap-4 mr-4">
                {/* Premium Badge with Tier */}
                {stats.isPremium && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30">
                    <span className="text-amber-400 text-xs font-bold uppercase">{stats.premiumTier || 'Premium'}</span>
                    {stats.premiumExpiryDate && (
                      <span className="text-amber-300/70 text-[10px] font-mono">
                        {Math.ceil((new Date(stats.premiumExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün
                      </span>
                    )}
                  </div>
                )}

                {/* History Button (Business Only) */}
                {stats.premiumTier === 'business' && (
                  <button
                    onClick={() => setIsHistoryModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-700/50 transition-colors"
                  >
                    <span className="text-lg">📜</span>
                    <span className="text-xs text-slate-300 font-medium hidden lg:inline">{t('feat_history') || 'Geçmiş'}</span>
                  </button>
                )}

                {/* Credits Display */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    {stats.isPremium ? '' : session.user.email?.split('@')[0]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold text-white">{stats.credits}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{t('credits_label')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-end mr-2">
                <button onClick={() => setIsAuthModalOpen(true)} className="text-xs text-indigo-400 hover:text-white underline">
                  {t('daily_credits')}: {stats.credits} (Giriş Yap)
                </button>
              </div>
            )}

            {/* Logout or Premium Button */}
            {session ? (
              <button onClick={handleSignOut} className="text-xs text-slate-500 hover:text-white">Çıkış</button>
            ) : null}

            {ENABLE_PREMIUM_SYSTEM && !stats.isPremium && (
              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-white font-bold text-sm shadow-lg overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] skew-x-12 group-hover:animate-[shimmer_1s_infinite]"></div>
                <span className="relative z-10">{t('premium_btn')}</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 mt-6">

        {/* Left: Upload & Files */}
        <div className="flex-1 flex flex-col gap-8">
          <section className="glass-panel rounded-2xl p-1 shadow-2xl animate-[fadeIn_0.5s]">
            <Dropzone
              onFilesAdded={handleFilesAdded}
              disabled={!stats.isPremium && stats.credits <= 0 && files.length === 0}
            />
          </section>

          <div className="space-y-4">
            {files.length > 0 && (
              <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-lg font-semibold text-white">{t('queue')} ({files.length})</h3>
                <div className="flex items-center gap-3">
                  {/* Batch Progress Bar - visible when converting multiple files */}
                  {files.length > 1 && files.some(f => f.status === 'converting') && (
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                        <span>📦 {t('batch_progress') || 'Toplu Dönüşüm'}</span>
                        <span className="font-mono text-indigo-400">
                          {files.filter(f => f.status === 'done').length}/{files.length}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                          style={{ width: `${(files.filter(f => f.status === 'done').length / files.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {/* Batch Convert All - visible when there are idle files */}
                  {files.some(f => f.status === 'idle') && (
                    <button
                      onClick={async () => {
                        const idleFiles = files.filter(f => f.status === 'idle');
                        for (const file of idleFiles) {
                          await convertImage(file.id);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg font-medium hover:from-indigo-400 hover:to-purple-400 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {t('convert_all_btn') || 'Tümünü Dönüştür'}
                    </button>
                  )}
                  {/* ZIP Download for Premium (Pro+) */}
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
                        saveAs(blob, 'VormPixyze_Images.zip');
                      }}
                      className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg font-medium hover:from-amber-400 hover:to-orange-400 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      ZIP İndir
                    </button>
                  )}
                  {/* Batch AI Rename - Premium Only (Pro+) */}
                  {hasFeatureAccess(stats.premiumTier, 'BATCH_AI') && files.some(f => f.status === 'idle' && !f.aiName) && (
                    <button
                      onClick={async () => {
                        const filesToRename = files.filter(f => f.status === 'idle' && !f.aiName);
                        for (const file of filesToRename) {
                          await handleAiRename(file.id);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-3 py-1.5 rounded-lg font-medium hover:from-violet-400 hover:to-fuchsia-400 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {t('batch_ai_rename') || 'Tümünü AI ile İsimlendir'}
                    </button>
                  )}
                  <button onClick={() => setFiles([])} className="text-xs text-red-400 hover:text-red-300">{t('clear_all')}</button>
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
                            className="bg-[#151f32] border border-slate-700/50 rounded-xl p-5 relative"
                            style={provided.draggableProps.style}
                          >
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="relative w-full lg:w-48 h-48 bg-[#0B0F19] rounded-lg border border-slate-700/50 flex items-center justify-center">
                                {file.status === 'analyzing' && !file.previewUrl ? (
                                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <img src={file.status === 'done' ? file.convertedUrl : file.previewUrl} className={`max-w-full max-h-full object-contain ${file.isGrayscale ? 'grayscale' : ''}`} style={{ transform: `rotate(${file.rotation}deg)` }} />
                                )}
                              </div>

                              <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 max-w-[85%]">
                                      <h4 className="font-medium text-slate-200 truncate" title={file.file.name}>
                                        {file.file.name}
                                      </h4>
                                      <span className="text-[10px] uppercase font-bold text-slate-500 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 shrink-0">
                                        {file.file.name.split('.').pop()}
                                      </span>
                                    </div>
                                    <button onClick={() => removeFile(file.id)} className="text-slate-600 hover:text-red-400 ml-2">✕</button>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  {file.aiName ? (
                                    <div className={`rounded-lg p-2 text-xs font-mono ${file.aiUsedFallback
                                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-100'
                                      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-100'
                                      }`}>
                                      <div className="flex items-center gap-2">
                                        <span>{file.aiUsedFallback ? '⚡' : '✨'} {file.aiName}</span>
                                      </div>
                                      {file.aiUsedFallback && (
                                        <div className="text-[10px] text-amber-400/70 mt-1">
                                          {t('ai_fallback_notice') || 'AI şu an kullanılamıyor, otomatik isim üretildi'}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <button onClick={() => handleAiRename(file.id)} disabled={file.status !== 'idle'} className="text-xs text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20">
                                      {file.status === 'analyzing' ? t('ai_rename_loading') : t('ai_rename_btn')}
                                    </button>
                                  )}
                                </div>

                                {file.status !== 'done' && (
                                  <div className="bg-slate-900/60 p-4 rounded-lg space-y-4">
                                    {/* Preset Profiles */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs text-slate-500">{t('preset_label') || 'Hazır Ayar:'}</span>
                                      <button
                                        onClick={() => {
                                          updateFileConfig(file.id, 'targetFormat', ConversionFormat.WEBP);
                                          updateFileConfig(file.id, 'quality', 0.8);
                                          updateFileConfig(file.id, 'resizeScale', 1);
                                        }}
                                        className="text-[10px] px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30"
                                      >
                                        🌐 {t('preset_web') || 'Web'}
                                      </button>
                                      <button
                                        onClick={() => {
                                          updateFileConfig(file.id, 'targetFormat', ConversionFormat.JPEG);
                                          updateFileConfig(file.id, 'quality', 0.85);
                                          updateFileConfig(file.id, 'resizeScale', 0.75);
                                        }}
                                        className="text-[10px] px-2 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                                      >
                                        📱 {t('preset_social') || 'Sosyal Medya'}
                                      </button>
                                      <button
                                        onClick={() => {
                                          updateFileConfig(file.id, 'targetFormat', ConversionFormat.PNG);
                                          updateFileConfig(file.id, 'quality', 1.0);
                                          updateFileConfig(file.id, 'resizeScale', 1);
                                        }}
                                        className="text-[10px] px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                                      >
                                        📦 {t('preset_archive') || 'Arşiv'}
                                      </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {/* Free Formats */}
                                      {[ConversionFormat.JPEG, ConversionFormat.PNG, ConversionFormat.WEBP].map(fmt => (
                                        <button key={fmt} onClick={() => updateFileConfig(file.id, 'targetFormat', fmt)} className={`text-xs px-3 py-1.5 rounded border ${file.targetFormat === fmt ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-600'}`}>
                                          {fmt.split('/')[1].toUpperCase()}
                                        </button>
                                      ))}
                                      {/* Premium Formats (Business tier) */}
                                      {[ConversionFormat.TIFF, ConversionFormat.BMP, ConversionFormat.ICO].map(fmt => {
                                        const canUse = hasFeatureAccess(stats.premiumTier, 'SPECIAL_FORMATS');
                                        return (
                                          <button
                                            key={fmt}
                                            onClick={() => canUse && updateFileConfig(file.id, 'targetFormat', fmt)}
                                            disabled={!canUse}
                                            title={canUse ? fmt.split('/')[1].toUpperCase() : 'Business özelliği'}
                                            className={`text-xs px-3 py-1.5 rounded border flex items-center gap-1 ${canUse
                                              ? file.targetFormat === fmt
                                                ? 'bg-indigo-600 border-indigo-500'
                                                : 'bg-slate-800 border-slate-600'
                                              : 'bg-slate-900/50 border-slate-700/50 text-slate-500 cursor-not-allowed opacity-60'
                                              }`}
                                          >
                                            {fmt.split('/')[1].toUpperCase()}
                                            {!canUse && <span className="text-amber-400">🔒</span>}
                                          </button>
                                        );
                                      })}
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                      <button onClick={() => updateFileConfig(file.id, 'rotation', (file.rotation + 90) % 360)} className="bg-slate-800 p-2 rounded text-xs border border-slate-700">{t('rotate')}: {file.rotation}°</button>
                                      <button onClick={() => updateFileConfig(file.id, 'isGrayscale', !file.isGrayscale)} className={`p-2 rounded text-xs border ${file.isGrayscale ? 'bg-slate-600' : 'bg-slate-800'}`}>{t('grayscale')}</button>

                                      {/* Quality Slider for JPEG/WEBP */}
                                      {(file.targetFormat === ConversionFormat.JPEG || file.targetFormat === ConversionFormat.WEBP) && (
                                        <select
                                          value={file.quality}
                                          onChange={(e) => updateFileConfig(file.id, 'quality', parseFloat(e.target.value))}
                                          className="bg-slate-800 text-xs border border-slate-700 rounded p-2 text-white"
                                        >
                                          <option value="1">100%</option><option value="0.75">75%</option><option value="0.5">50%</option><option value="0.25">25%</option>
                                        </select>
                                      )}
                                      {/* Flip Buttons */}
                                      <button onClick={() => updateFileConfig(file.id, 'isFlippedHorizontal', !file.isFlippedHorizontal)} className={`p-2 rounded text-xs border ${file.isFlippedHorizontal ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700'}`}>↔️ Flip H</button>
                                      <button onClick={() => updateFileConfig(file.id, 'isFlippedVertical', !file.isFlippedVertical)} className={`p-2 rounded text-xs border ${file.isFlippedVertical ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700'}`}>↕️ Flip V</button>

                                      {/* NEW: Target Size */}
                                      {file.targetFormat === ConversionFormat.JPEG && (
                                        <input
                                          type="number"
                                          placeholder="Max KB (Optional)"
                                          className="bg-slate-800 text-xs border border-slate-700 rounded p-2 w-full text-white placeholder-slate-500"
                                          onChange={(e) => updateFileConfig(file.id, 'targetSizeBytes', e.target.value ? parseInt(e.target.value) * 1024 : undefined)}
                                        />
                                      )}
                                    </div>

                                    {/* Estimated Size Display */}
                                    <div className="flex justify-end mt-2">
                                      <span className="text-[10px] text-slate-500 font-mono bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50">
                                        {t('estimated_size')}: <span className="text-emerald-400">{estimateFileSize(file)}</span>
                                      </span>
                                    </div>

                                    {/* NEW: Watermark (Premium) */}
                                    {(() => {
                                      const canUseWatermark = hasFeatureAccess(stats.premiumTier, 'WATERMARK');
                                      return (
                                        <div className={`space-y-2 p-3 rounded-lg ${canUseWatermark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-900/30 border border-slate-800/50'}`}>
                                          <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Watermark</span>
                                            {!canUseWatermark && <span className="text-amber-400">🔒 Pro+</span>}
                                          </div>

                                          {/* Text + Logo Row */}
                                          <div className="flex items-center gap-2">
                                            <input
                                              type="text"
                                              placeholder={file.watermarkLogo ? "Logo seçildi" : "Watermark metni..."}
                                              disabled={!canUseWatermark || !!file.watermarkLogo}
                                              value={file.watermarkText || ''}
                                              onChange={(e) => updateFileConfig(file.id, 'watermarkText', e.target.value)}
                                              className={`bg-slate-900 text-xs border border-slate-700 rounded p-2 flex-grow ${!canUseWatermark ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            />

                                            {/* Color Picker */}
                                            <input
                                              type="color"
                                              value={file.watermarkColor || '#ffffff'}
                                              onChange={(e) => updateFileConfig(file.id, 'watermarkColor', e.target.value)}
                                              disabled={!canUseWatermark}
                                              className={`w-8 h-8 rounded border border-slate-700 cursor-pointer ${!canUseWatermark ? 'opacity-50 pointer-events-none' : ''}`}
                                              title="Watermark Rengi"
                                            />

                                            {/* Logo Upload */}
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
                                                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded border border-red-500/20"
                                                  title="Logo Kaldır"
                                                >✕</button>
                                              ) : (
                                                <label
                                                  htmlFor={`logo-upload-${file.id}`}
                                                  className={`flex items-center p-2 rounded bg-slate-900 border border-slate-700 cursor-pointer hover:bg-slate-700 ${!canUseWatermark ? 'opacity-50 pointer-events-none' : ''}`}
                                                  title="Logo Yükle"
                                                >📷</label>
                                              )}
                                            </div>
                                          </div>

                                          {/* Position Selector */}
                                          {canUseWatermark && (file.watermarkText || file.watermarkLogo) && (
                                            <div className="flex items-center gap-1 flex-wrap">
                                              <span className="text-[10px] text-slate-500 mr-1">Pozisyon:</span>
                                              {(['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'] as const).map(pos => (
                                                <button
                                                  key={pos}
                                                  onClick={() => updateFileConfig(file.id, 'watermarkPosition', pos)}
                                                  className={`text-[10px] px-2 py-1 rounded ${file.watermarkPosition === pos || (!file.watermarkPosition && pos === 'center')
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
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

                                          {/* Font Size & Font Family (only for text watermark) */}
                                          {canUseWatermark && file.watermarkText && (
                                            <div className="flex items-center gap-3 flex-wrap">
                                              {/* Font Size */}
                                              <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-slate-500">Boyut:</span>
                                                {[1, 2, 3, 4, 5].map(size => (
                                                  <button
                                                    key={size}
                                                    onClick={() => updateFileConfig(file.id, 'watermarkFontSize', size)}
                                                    className={`text-[10px] w-6 h-6 rounded ${(file.watermarkFontSize || 2) === size
                                                      ? 'bg-indigo-600 text-white'
                                                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                      }`}
                                                  >{size}</button>
                                                ))}
                                              </div>

                                              {/* Font Family */}
                                              <select
                                                value={file.watermarkFont || 'Arial'}
                                                onChange={(e) => updateFileConfig(file.id, 'watermarkFont', e.target.value)}
                                                className="text-[10px] bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                                              >
                                                <option value="Arial">Arial</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Courier">Courier</option>
                                                <option value="Impact">Impact</option>
                                                <option value="Comic Sans MS">Comic Sans</option>
                                              </select>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })()}

                                    {
                                      file.targetFormat !== ConversionFormat.JPEG && (
                                        <div className="flex items-center gap-2">
                                          {(() => {
                                            const canUseRemoveBg = hasFeatureAccess(stats.premiumTier, 'REMOVE_BG');
                                            return (
                                              <button
                                                onClick={() => {
                                                  if (canUseRemoveBg) {
                                                    updateFileConfig(file.id, 'removeBackground', !file.removeBackground);
                                                  } else {
                                                    setIsPremiumModalOpen(true);
                                                  }
                                                }}

                                                className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all duration-300 font-medium ${file.removeBackground
                                                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50 text-pink-300 shadow-sm shadow-pink-500/20'
                                                  : canUseRemoveBg
                                                    ? 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400 hover:bg-slate-750'
                                                    : 'bg-slate-900/50 border-slate-700/50 text-slate-500 opacity-60'
                                                  }`}
                                              >
                                                <span className={file.removeBackground ? "animate-pulse" : "grayscale opacity-50"}>✨</span>
                                                {file.removeBackground ? 'AI BG Removed' : 'Remove BG'}
                                                {!canUseRemoveBg && <span className="text-amber-400 ml-1">🔒</span>}
                                              </button>
                                            );
                                          })()}
                                        </div>
                                      )
                                    }
                                  </div>
                                )}

                                <div className="mt-2 flex justify-end gap-3">
                                  {file.status === 'idle' && (
                                    <button onClick={() => convertImage(file.id)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/30">
                                      {t('convert_btn')}
                                    </button>
                                  )}
                                  {file.status === 'done' && (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => setCompareItem(file)}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-xs"
                                      >
                                        👁️ Compare
                                      </button>
                                      <a href={file.convertedUrl} download={`${file.aiName || file.file.name.split('.')[0]}.${file.targetFormat.split('/')[1]}`} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                                        {t('download_btn')} ({formatFileSize(file.convertedSize || 0)})
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {
                                file.status === 'converting' && (
                                  <div className="absolute inset-0 bg-slate-900/90 rounded-xl flex items-center justify-center z-20 flex-col gap-4 p-6">
                                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-indigo-300 text-sm font-medium">{t('processing')}</span>
                                    {/* Progress Bar */}
                                    <div className="w-full max-w-xs">
                                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>{t('progress') || 'İlerleme'}</span>
                                        <span className="font-mono text-indigo-400">{file.conversionProgress || 0}%</span>
                                      </div>
                                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                                          style={{ width: `${file.conversionProgress || 0}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          </div>

                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {files.length > 0 && <div className="mt-8"><AdBanner variant="horizontal" /></div>}

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
                        saveAs(content, "vormpixyze_images.zip");
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    📦 {t('download_all_zip') || 'Download All (ZIP)'}
                  </button>
                </div>
              )
            }
          </div>
        </div>

        {/* Right Sidebar */}
        < div className="w-full lg:w-80 flex flex-col gap-6" >
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <h4 className="text-indigo-400 font-bold mb-4">{t('pro_tips_title')}</h4>
            <ul className="text-sm text-slate-400 space-y-3">
              <li>• {t('tip_heic')}</li>
              <li>• {t('tip_seo')}</li>
              <li>• {t('tip_size')}</li>
            </ul>
          </div>

          <div className="sticky top-24 space-y-6">
            {!stats.isPremium && <ReferralWidget onReferralSuccess={() => handleReward(3)} userId={session?.user?.id} />}
            {!stats.isPremium && <AdBanner variant="box" className="w-full" />}
            {/* <AdBanner variant="vertical" className="hidden lg:flex" /> */}
          </div>
        </div>
      </main >

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        isPremium={stats.isPremium}
        userEmail={session?.user?.email}
      />



      {/* Spacer for fixed footer */}
      <div className="h-20 md:h-24"></div>

      {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-indigo-600/80 text-white shadow-lg">↑</button>}

      {/* Sticky Support Button */}
      <button
        onClick={() => setIsSupportModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap group-hover:ml-2 text-sm font-bold">
          {t('support_title') || 'Support'}
        </span>
      </button>

      {
        compareItem && compareItem.convertedUrl && (
          <CompareSlider
            originalUrl={compareItem.previewUrl}
            convertedUrl={compareItem.convertedUrl}
            onClose={() => setCompareItem(null)}
          />
        )
      }

      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800 bg-[#0B0F19] py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
          <span className="font-bold text-sm md:text-lg text-white">VormPixyze</span>
          <div className="flex gap-3 md:gap-6 text-xs md:text-sm text-slate-500">
            <button onClick={() => openLegal('privacy')} className="hover:text-indigo-400">{t('privacy')}</button>
            <button onClick={() => openLegal('terms')} className="hover:text-indigo-400">{t('terms')}</button>
            <button onClick={() => openLegal('contact')} className="hover:text-indigo-400">{t('contact')}</button>
          </div>

          <div className="text-slate-600 text-[10px] md:text-xs font-mono flex flex-col items-center md:items-end">
            <span>&copy; 2025 VormPixyze Inc.</span>
            <span className="hidden md:block text-[10px] opacity-70 mt-1">Powered by VibeOracle</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BanaConvertApp />
    </LanguageProvider>
  );
}