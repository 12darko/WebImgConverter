export enum ConversionFormat {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  TIFF = 'image/tiff',     // Premium
  BMP = 'image/bmp',       // Premium
  ICO = 'image/x-icon',    // Premium
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
  bgRemovalTolerance: number; // 0 to 100 threshold

  // New Advanced Features
  targetSizeBytes?: number; // Desired max size in bytes
  watermarkText?: string;
  watermarkLogo?: string; // base64
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
}

export const MAX_FREE_CREDITS = 7;      // Günlük ücretsiz hak
export const SIGNUP_BONUS_CREDITS = 10; // İlk kayıt bonusu
export const REFERRAL_REWARD_CREDITS = 5; // Referans ödülü
export const COST_PER_CONVERT = 1;
export const COST_PER_AI_RENAME = 1;

// --- FEATURE FLAGS (SİSTEM KONTROLÜ) ---
// Premium sistemi aktif edilecekse bunu TRUE yapın.
// Şu an sadece reklam geliri istendiği için FALSE olarak ayarlandı.
export const ENABLE_PREMIUM_SYSTEM = true;
