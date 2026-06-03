export enum ConversionFormat {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  TIFF = 'image/tiff',     // Premium
  BMP = 'image/bmp',       // Premium
  ICO = 'image/x-icon',    // Premium
  AVIF = 'image/avif',     // Business
  SVG = 'image/svg+xml',   // Business
}

export interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
  targetFormat: ConversionFormat;
  quality: number; // 0.1 to 1.0

  // Advanced Processing Options
  rotation: 0 | 90 | 180 | 270;
  resizeScale: 1 | 0.75 | 0.5 | 0.25;
  isGrayscale: boolean;
  removeBackground: boolean; // Simple white-bg removal for PNG/WEBP
  bgModel?: 'birefnet-general' | 'birefnet-portrait' | 'birefnet-dis'; // AI model selection
  useHDModel: boolean; // Deprecated
  bgRemovalTolerance: number; // 0 to 100 threshold

  // New Advanced Features
  targetSizeBytes?: number; // Desired max size in bytes
  watermarkText?: string;
  watermarkLogo?: string; // base64
  watermarkPosition?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  watermarkColor?: string; // hex color
  watermarkFontSize?: number; // 1-5 (small to large)
  watermarkFont?: 'Arial' | 'Georgia' | 'Courier' | 'Impact' | 'Comic Sans MS';
  cropData?: { x: number; y: number; width: number; height: number; unit: string };
  isFlippedHorizontal?: boolean;
  isFlippedVertical?: boolean;

  status: 'idle' | 'converting' | 'analyzing' | 'done' | 'error';
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedSize?: number; // bytes
  aiName?: string;
  aiUsedFallback?: boolean; // True if AI failed and fallback naming was used
  conversionProgress?: number; // 0-100 progress percentage
  errorMsg?: string;
}

export interface UserStats {
  credits: number;
  isPremium: boolean;
  lastResetDate: string; // YYYY-MM-DD
  premiumExpiryDate?: string; // YYYY-MM-DD (Premium bitiş tarihi)
  dailyLimit?: number; // Günlük yenilenme limiti (Free için 7, Premium için 30/100/vs)
  premiumTier?: 'starter' | 'pro' | 'business'; // Premium seviyesi
  requiresActivation?: boolean; // Site activation flag
}

export const MAX_FREE_CREDITS = 25;     // Günlük ücretsiz hak (kullanıcı çekmek için artırıldı)
export const SIGNUP_BONUS_CREDITS = 10; // İlk kayıt bonusu
export const REFERRAL_REWARD_CREDITS = 5; // Referans ödülü
export const COST_PER_CONVERT = 1;
export const COST_PER_AI_RENAME = 1;

// --- FEATURE FLAGS (SİSTEM KONTROLÜ) ---
// Premium sistemi aktif edilecekse bunu TRUE yapın.
// Şu an sadece reklam geliri istendiği için FALSE olarak ayarlandı.
export const ENABLE_PREMIUM_SYSTEM = true;

// --- TIER LEVEL SYSTEM ---
// Each tier unlocks progressively more features
// 0 = Free, 1 = Starter, 2 = Pro, 3 = Business
export const TIER_LEVELS: Record<string, number> = {
  'free': 0,
  'starter': 1,
  'pro': 2,
  'business': 3
};

// Get numeric tier level from tier name
export const getTierLevel = (tier?: string): number => {
  if (!tier) return 0;
  return TIER_LEVELS[tier.toLowerCase()] || 0;
};

// Feature requirements (minimum tier level needed)
export const FEATURE_REQUIREMENTS = {
  NO_ADS: 1,           // Starter+ (reklam kaldırma hala premium)
  REMOVE_BG: 0,        // Free (Everyone can use)
  WATERMARK: 0,        // Free (kullanıcı toplamak için açıldı)
  AI_RENAME: 0,        // Free (kullanıcı toplamak için açıldı)
  ZIP_DOWNLOAD: 0,     // Free (kullanıcı toplamak için açıldı)
  BATCH_AI: 0,         // Free (kullanıcı toplamak için açıldı)
  CROP: 0,             // Free (kullanıcı toplamak için açıldı)
  SPECIAL_FORMATS: 0,  // Free (kullanıcı toplamak için açıldı)
  ADVANCED_INPUTS: 0,  // Free (kullanıcı toplamak için açıldı)
  CLOUD_STORAGE: 0,    // Free (kullanıcı toplamak için açıldı)
  HISTORY: 0,          // Free (kullanıcı toplamak için açıldı)
};

// Check if user has access to a feature
export const hasFeatureAccess = (userTier: string | undefined, feature: keyof typeof FEATURE_REQUIREMENTS): boolean => {
  const userLevel = getTierLevel(userTier);
  return userLevel >= FEATURE_REQUIREMENTS[feature];
};
