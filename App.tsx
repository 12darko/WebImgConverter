import React, { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { removeBackground } from '@imgly/background-removal';
import { Dropzone } from './components/Dropzone';
import { AdBanner } from './components/AdBanner';
import { PremiumModal } from './components/PremiumModal';
import { ReferralWidget } from './components/ReferralWidget';
import { PaymentModal } from './components/PaymentModal';
import { LegalModal } from './components/LegalModal';
import { SupportModal } from './components/SupportModal';
import { CookieBanner } from './components/CookieBanner';

import { CompareSlider } from './components/CompareSlider';
import { AuthModal } from './components/AuthModal'; // Auth import
import { generateAiFilename } from './services/geminiService';
import { supabase, getUserProfile, updateUserCredits, upgradeToPremium, incrementDailyStats } from './services/supabase'; // DB Services
import { LanguageProvider, useLanguage } from './LanguageContext';
import {
  FileItem,
  ConversionFormat,
  UserStats,
  MAX_FREE_CREDITS,
  COST_PER_CONVERT,
  COST_PER_AI_RENAME,
  ENABLE_PREMIUM_SYSTEM
} from './types';

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

  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'contact'>('privacy');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 1. Initialize Session & Stats
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadUserProfile(session.user.id);
      } else {
        // Fallback to local storage for guests
        loadLocalStats();
        setIsInitialized(true);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        loadUserProfile(session.user.id);
      } else {
        loadLocalStats();
        setIsInitialized(true);
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

  const loadUserProfile = async (userId: string) => {
    const profile = await getUserProfile(userId);
    if (profile) {
      setStats(profile);
    }
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

    setFiles(prev => [...prev, ...tempFiles]);

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
    // Premium check for Watermark
    if (key === 'watermarkText' && !stats.isPremium && value) {
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
    if (stats.isPremium) return true;
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
          updateProgress(10); // AI Loading
          try {
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
          // Check if we skipped AI, just update slightly
          updateProgress(10);
        }

        updateProgress(55); // Image loading

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = sourceUrl;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });

        updateProgress(65); // Creating canvas

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

        // Draw the image (Transparent or Original)
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.filter = 'none'; // Reset filter

        updateProgress(70); // Effects applied

        // --- WATERMARK (Premium) ---
        if (stats.isPremium) {
          if (item.watermarkLogo) {
            const logoImg = new Image();
            logoImg.src = item.watermarkLogo;
            await new Promise((resolve) => { logoImg.onload = resolve; logoImg.onerror = resolve; }); // Ignore error

            // Calculate logo size (e.g., 15% of canvas width)
            const logoWidth = canvas.width * 0.15;
            const logoHeight = logoWidth * (logoImg.height / logoImg.width);

            // Draw logo at bottom right with some padding
            const padding = canvas.width * 0.05;
            ctx.globalAlpha = 0.5; // Semi-transparent
            ctx.drawImage(logoImg, canvas.width - logoWidth - padding, canvas.height - logoHeight - padding, logoWidth, logoHeight);
            ctx.globalAlpha = 1.0;
          } else if (item.watermarkText) {
            ctx.save();
            ctx.font = `bold ${Math.floor(canvas.width * 0.05)}px sans-serif`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-45 * Math.PI / 180);
            ctx.fillText(item.watermarkText, 0, 0);
            ctx.restore();
          }
        }

        // --- TARGET SIZE OPTIMIZATION (Binary Search / Reduction) ---
        // if targetSizeBytes is set... (logic implemented below)

        updateProgress(85); // Creating blob

        let mimeType: string = item.targetFormat;
        // ICO handling
        if (item.targetFormat === ConversionFormat.ICO) {
          mimeType = ConversionFormat.PNG;
        }

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => {
            if (b) resolve(b);
            else reject(new Error("Blob creation failed"));
          }, mimeType, item.quality);
        });

        let dataUrl = canvas.toDataURL(mimeType, item.quality);

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

        updateProgress(100); // Complete

        setFiles(prev => prev.map(f => f.id === id ? {
          ...f, status: 'done', convertedUrl: dataUrl, convertedBlob: blob, convertedSize: blob.size, conversionProgress: 100
        } : f));

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
      const result = await generateAiFilename(item.file);
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

  return (
    <div className="min-h-screen font-sans text-slate-200 flex flex-col">
      {/* Modals */}
      {ENABLE_PREMIUM_SYSTEM && (
        <>
          <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} userId={session?.user?.id} />
        </>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={() => { }} />

      <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} initialTab={legalModalTab} />
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
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                  {stats.isPremium ? 'Premium' : session.user.email?.split('@')[0]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white tracking-tight">{stats.credits}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t('credits_label')}</span>
                </div>
                {stats.isPremium && stats.premiumExpiryDate && (
                  <div className="border-t border-slate-700/50 mt-1 pt-1">
                    <span className="text-[10px] text-amber-400 font-mono">
                      {(() => {
                        const daysLeft = Math.ceil((new Date(stats.premiumExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        return daysLeft > 0 ? `${daysLeft} Days Left` : 'Expiring';
                      })()}
                    </span>
                  </div>
                )}
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
              <button onClick={() => supabase.auth.signOut()} className="text-xs text-slate-500 hover:text-white">Çıkış</button>
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
                  {/* ZIP Download for Premium */}
                  {stats.isPremium && files.some(f => f.status === 'done') && (
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
                  {/* Batch AI Rename - Premium Only */}
                  {stats.isPremium && files.some(f => f.status === 'idle' && !f.aiName) && (
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

            {files.map(file => (
              <div key={file.id} className="bg-[#151f32] border border-slate-700/50 rounded-xl p-5 relative">
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
                        <h4 className="font-medium text-slate-200 truncate max-w-xs">{file.file.name}</h4>
                        <button onClick={() => removeFile(file.id)} className="text-slate-600 hover:text-red-400">✕</button>
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
                          {[ConversionFormat.JPEG, ConversionFormat.PNG, ConversionFormat.WEBP].map(fmt => (
                            <button key={fmt} onClick={() => updateFileConfig(file.id, 'targetFormat', fmt)} className={`text-xs px-3 py-1.5 rounded border ${file.targetFormat === fmt ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-600'}`}>
                              {fmt.split('/')[1].toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          <button onClick={() => updateFileConfig(file.id, 'rotation', (file.rotation + 90) % 360)} className="bg-slate-800 p-2 rounded text-xs border border-slate-700">{t('rotate')}: {file.rotation}°</button>
                          <button onClick={() => updateFileConfig(file.id, 'isGrayscale', !file.isGrayscale)} className={`p-2 rounded text-xs border ${file.isGrayscale ? 'bg-slate-600' : 'bg-slate-800'}`}>{t('grayscale')}</button>
                          <select onChange={(e) => updateFileConfig(file.id, 'resizeScale', parseFloat(e.target.value))} className="bg-slate-800 text-xs border border-slate-700 rounded p-2">
                            <option value="1">100%</option><option value="0.75">75%</option><option value="0.5">50%</option><option value="0.25">25%</option>
                          </select>
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
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={stats.isPremium ? (file.watermarkLogo ? t('logo_uploaded') : "Watermark Text") : "Watermark (Premium Only)"}
                            disabled={!stats.isPremium || !!file.watermarkLogo} // Disable text if logo is uploaded
                            value={file.watermarkText || ''}
                            onChange={(e) => updateFileConfig(file.id, 'watermarkText', e.target.value)}
                            className={`bg-slate-800 text-xs border border-slate-700 rounded p-2 flex-grow ${!stats.isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
                          />

                          {/* Logo Upload Button */}
                          <div className="relative">
                            <input
                              type="file"
                              id={`logo-upload-${file.id}`}
                              className="hidden"
                              accept="image/png, image/jpeg"
                              disabled={!stats.isPremium}
                              onChange={(e) => {
                                const logoFile = e.target.files?.[0];
                                if (logoFile) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    updateFileConfig(file.id, 'watermarkLogo', ev.target?.result as string);
                                    updateFileConfig(file.id, 'watermarkText', undefined); // Clear text if logo used
                                  };
                                  reader.readAsDataURL(logoFile);
                                }
                              }}
                            />
                            {file.watermarkLogo ? (
                              <button
                                onClick={() => updateFileConfig(file.id, 'watermarkLogo', undefined)}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded border border-red-500/20 transition-colors"
                                title="Remove Logo"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            ) : (
                              <label
                                htmlFor={`logo-upload-${file.id}`}
                                className={`flex items-center justify-center p-2 rounded bg-slate-800 border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors ${!stats.isPremium ? 'opacity-50 pointer-events-none' : ''}`}
                                title="Upload Logo Watermark"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </label>
                            )}
                          </div>
                        </div>

                        {file.targetFormat !== ConversionFormat.JPEG && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateFileConfig(file.id, 'removeBackground', !file.removeBackground)}
                              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all duration-300 font-medium ${file.removeBackground
                                ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50 text-pink-300 shadow-sm shadow-pink-500/20'
                                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400 hover:bg-slate-750'
                                }`}
                            >
                              <span className={file.removeBackground ? "animate-pulse" : "grayscale opacity-50"}>✨</span>
                              {file.removeBackground ? 'AI BG Removed' : 'Remove BG'}
                            </button>
                          </div>
                        )}
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
                </div>
                {file.status === 'converting' && (
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
                )}
              </div>
            ))}

            {files.length > 0 && <div className="mt-8"><AdBanner variant="horizontal" /></div>}

            {files.some(f => f.status === 'done') && (
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
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
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
            {!stats.isPremium && !ENABLE_PREMIUM_SYSTEM && <AdBanner variant="box" className="w-full" />}
            <AdBanner variant="vertical" className="hidden lg:flex" />
          </div>
        </div>
      </main>

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        isPremium={stats.isPremium}
        userEmail={session?.user?.email}
      />

      {/* Banner (Bottom) - Only show if NOT Premium */}
      {!stats.isPremium && (
        <AdBanner
          className="mt-6 shadow-xl shadow-black/40"
          variant="horizontal"
          adClient="ca-pub-3889797797438326"
          adSlot="9506043591"
        />
      )}

      {/* Spacer for fixed footer */}
      <div className="h-20 md:h-24"></div>

      {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-indigo-600/80 text-white shadow-lg">↑</button>}

      {compareItem && compareItem.convertedUrl && (
        <CompareSlider
          originalUrl={compareItem.previewUrl}
          convertedUrl={compareItem.convertedUrl}
          onClose={() => setCompareItem(null)}
        />
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800 bg-[#0B0F19] py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
          <span className="font-bold text-sm md:text-lg text-white">VormPixyze</span>
          <div className="flex gap-3 md:gap-6 text-xs md:text-sm text-slate-500">
            <button onClick={() => openLegal('privacy')} className="hover:text-indigo-400">{t('privacy')}</button>
            <button onClick={() => openLegal('terms')} className="hover:text-indigo-400">{t('terms')}</button>
            <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-indigo-400">{t('contact')}</button>
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