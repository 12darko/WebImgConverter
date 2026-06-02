import { createClient } from '@supabase/supabase-js';
import { UserStats, MAX_FREE_CREDITS } from '../types';

// VibOracle Unified Supabase — Ortak veritabanı
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing! Check .env.local');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const SITE_KEY = 'vormpixize';

const syncSiteActivation = async (userId: string, defaultCredits: number) => {
  // Merkezi helper yoksa aktivasyon kırılmasın.
  const { error } = await supabase.rpc('ensure_site_credits', {
    p_user_id: userId,
    p_site: SITE_KEY,
    p_default_credits: defaultCredits
  });
  if (error) {
    console.warn(`[activation] ensure_site_credits unavailable for ${SITE_KEY}:`, error.message);
  }
};

/**
 * Kullanıcının profil bilgilerini (kredi, premium durumu) çeker.
 * Eğer günü geçmişse kredileri sıfırlar.
 */
export const getUserProfile = async (userId: string): Promise<UserStats | null> => {
  console.log('[getUserProfile] START, userId:', userId);
  try {
    // Wait for auth token to propagate to Supabase client
    // This fixes the race condition where SIGNED_IN fires before auth is ready
    await new Promise(resolve => setTimeout(resolve, 200));

    console.log('[getUserProfile] Making DB query...');

    // Add timeout to catch hanging queries
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Profile fetch timed out after 5 seconds')), 5000)
    );

    const fetchProfile = supabase
      .from('site_credits')
      .select('*')
      .eq('user_id', userId)
      .eq('site', SITE_KEY)
      .single();

    const { data, error } = await Promise.race([fetchProfile, timeout]) as { data: any; error: any };

    console.log('[getUserProfile] DB query completed. Error:', error?.code, 'Data exists:', !!data);

    if (error) {
      // If profile not found (PGRST116), prompt for explicit activation
      if (error.code === 'PGRST116') {
        console.log('[getUserProfile] Profile not found, requiring explicit activation.');
        return {
          credits: 0,
          isPremium: false,
          lastResetDate: new Date().toISOString().split('T')[0],
          requiresActivation: true
        };
      }
      throw error;
    }

    if (data) {
      console.log('[Profile] Raw data from DB:', JSON.stringify(data));

      // Normalize date formats (handle both DATE and TIMESTAMP from PostgreSQL)
      const today = new Date().toISOString().split('T')[0];
      const dbLastResetDate = (data.last_reset_date || '').toString().split('T')[0];
      const dbExpiryDate = data.premium_expiry_date ? data.premium_expiry_date.toString().split('T')[0] : null;

      // Premium Süre Kontrolü
      if (data.is_premium && dbExpiryDate && dbExpiryDate < today) {
        console.log('[Profile] Premium expired:', dbExpiryDate, '< today:', today);
        await supabase.from('site_credits').update({ is_premium: false, daily_limit: 7 }).eq('user_id', userId).eq('site', SITE_KEY);
        data.is_premium = false;
        data.daily_limit = 7;
      }

      // Günlük kredi kontrolü - only reset if date is DIFFERENT
      console.log('[Profile] Date check - DB:', dbLastResetDate, 'Today:', today, 'Match:', dbLastResetDate === today);

      if (dbLastResetDate !== today) {
        const limit = data.daily_limit || MAX_FREE_CREDITS;
        console.log('[Profile] Daily reset triggered. New credits:', limit);
        await resetDailyCredits(userId, limit);
        return {
          credits: limit,
          isPremium: data.is_premium,
          lastResetDate: today,
          premiumExpiryDate: data.premium_expiry_date,
          dailyLimit: data.daily_limit,
          premiumTier: data.premium_tier
        };
      }

      // No reset needed, return current values
      console.log('[Profile] Returning existing data. Credits:', data.credits, 'IsPremium:', data.is_premium);
      return {
        credits: data.credits,
        isPremium: data.is_premium,
        lastResetDate: data.last_reset_date,
        premiumExpiryDate: data.premium_expiry_date,
        dailyLimit: data.daily_limit,
        premiumTier: data.premium_tier
      };
    }
    return null;
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
};

/**
 * Kullanıcının kredisini günceller (azaltır veya artırır).
 */
export const updateUserCredits = async (userId: string, newAmount: number) => {
  const { error } = await supabase
    .from('site_credits')
    .update({ credits: newAmount })
    .eq('user_id', userId)
    .eq('site', SITE_KEY);

  if (error) console.error('Error updating credits:', error);
};

/**
 * Referans işlemini güvenli şekilde yapar (tek seferlik)
 * Sadece yeni kullanıcı daha önce refer edilmemişse çalışır
 */
export const processReferral = async (newUserId: string, referrerId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('process_referral', {
      new_user_id: newUserId,
      referrer_id: referrerId
    });

  if (error) {
    console.error('Referral processing failed:', error);
    return false;
  }

  return data === true;
};

/**
 * Günlük kredileri MAX_FREE_CREDITS'e resetler ve tarihi günceller.
 */
export const resetDailyCredits = async (userId: string, limit: number = MAX_FREE_CREDITS) => {
  const today = new Date().toISOString().split('T')[0];
  await supabase
    .from('site_credits')
    .update({ credits: limit, last_reset_date: today })
    .eq('user_id', userId)
    .eq('site', SITE_KEY);
};

/**
 * Kullanıcıyı Premium yapar.
 */
export const upgradeToPremium = async (userId: string) => {
  const { error } = await supabase
    .from('site_credits')
    .update({ is_premium: true })
    .eq('user_id', userId)
    .eq('site', SITE_KEY);

  if (error) console.error('Error upgrading to premium:', error);
};

/**
 * Google ile Giriş Yap (OAuth)
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Giriş bitince kullanıcıyı ana sayfaya geri at
      redirectTo: window.location.origin
    }
  });

  if (error) throw error;
  return data;
};

/**
 * Global Günlük Dönüştürme Sayacını Artırır (RPC)
 */
export const incrementDailyStats = async () => {
  const { error } = await supabase.rpc('increment_daily_stats');
  if (error) console.error("Stats increment error:", error);
};

/**
 * Toplam dönüşüm istatistiklerini getirir
 */
export const getTotalStats = async (): Promise<{ totalConversions: number; totalUsers: number }> => {
  try {
    // daily_stats tablosundan toplam dönüşüm sayısını al
    const { data: statsData, error: statsError } = await supabase
      .from('vormpixize_daily_stats')
      .select('total_conversions')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    // profiles tablosundan toplam kullanıcı sayısını al
    const { count: userCount, error: userError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (statsError || userError) {
      console.error('Stats fetch error:', statsError || userError);
      return { totalConversions: 0, totalUsers: 0 };
    }

    return {
      totalConversions: statsData?.total_conversions || 0,
      totalUsers: userCount || 0
    };
  } catch (error) {
    console.error('getTotalStats error:', error);
    return { totalConversions: 0, totalUsers: 0 };
  }
};

/**
 * Destek talebi oluşturur (support_tickets tablosuna kayıt atar)
 */
export const createSupportTicket = async (email: string, subject: string, message: string, isPremium: boolean): Promise<{ success: boolean; error?: any }> => {
  try {
    const { error } = await supabase
      .from('support_tickets')
      .insert([
        {
          email: email || 'anonymous',
          subject: subject,
          message: message,
          is_premium: isPremium,
          site: 'vormpixize',
          user_id: (await supabase.auth.getUser()).data.user?.id || null
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Support ticket error:', error);
    return { success: false, error };
  }
};

/**
 * Kullanıcı WebImgConverter platformunu ilk kez aktifleştirdiğinde çağrılır.
 */
export const activateSiteAccount = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const newProfile = {
    user_id: userId,
    credits: MAX_FREE_CREDITS,
    is_premium: false,
    daily_limit: MAX_FREE_CREDITS,
    last_reset_date: today,
    site: SITE_KEY
  };

  // Idempotent activation: tekrar çağrıda conflict yerine deterministik güncelleme.
  const { error } = await supabase
    .from('site_credits')
    .upsert(newProfile, { onConflict: 'user_id,site' });
  if (error) throw error;

  await syncSiteActivation(userId, MAX_FREE_CREDITS);
  
  return {
    credits: MAX_FREE_CREDITS,
    isPremium: false,
    lastResetDate: today,
    dailyLimit: MAX_FREE_CREDITS,
    requiresActivation: false
  };
};