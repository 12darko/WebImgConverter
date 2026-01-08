import { createClient } from '@supabase/supabase-js';
import { UserStats, MAX_FREE_CREDITS } from '../types';

// ÖNEMLİ: Bu bilgileri Supabase Paneli -> Project Settings -> API kısmından alacaksınız.
// Güvenlik için bunları .env dosyasına veya Vercel Environment Variables kısmına eklemelisiniz.
// Şimdilik demo için placeholder kullanıyoruz.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Kullanıcının profil bilgilerini (kredi, premium durumu) çeker.
 * Eğer günü geçmişse kredileri sıfırlar.
 */
export const getUserProfile = async (userId: string): Promise<UserStats | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // If profile not found (PGRST116), create a default one
      if (error.code === 'PGRST116') {
        console.log('Profile not found, creating default...');
        const today = new Date().toISOString().split('T')[0];

        // Get user email safely
        const { data: { user } } = await supabase.auth.getUser();

        const newProfile = {
          id: userId,
          email: user?.email || '',
          credits: MAX_FREE_CREDITS,
          is_premium: false,
          daily_limit: MAX_FREE_CREDITS,
          last_reset_date: today
        };

        const { error: insertError } = await supabase.from('profiles').insert([newProfile]);

        if (insertError) {
          console.error('Failed to create default profile:', insertError);
          return null;
        }

        return {
          credits: MAX_FREE_CREDITS,
          isPremium: false,
          lastResetDate: today,
          premiumExpiryDate: undefined,
          dailyLimit: MAX_FREE_CREDITS,
          premiumTier: undefined
        };
      }
      throw error;
    }

    if (data) {
      // ... existing logic ...
      // Premium Süre Kontrolü
      const today = new Date().toISOString().split('T')[0];

      if (data.is_premium && data.premium_expiry_date && data.premium_expiry_date < today) {
        // Süresi dolmuş, Premium'u iptal et
        await supabase.from('profiles').update({ is_premium: false, daily_limit: 7 }).eq('id', userId);
        data.is_premium = false;
        data.daily_limit = 7;
      }

      // Günlük kredi kontrolü
      if (data.last_reset_date !== today) {
        const limit = data.daily_limit || MAX_FREE_CREDITS;
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
      // Map snake_case to camelCase
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
    .from('profiles')
    .update({ credits: newAmount })
    .eq('id', userId);

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
    .from('profiles')
    .update({ credits: limit, last_reset_date: today })
    .eq('id', userId);
};

/**
 * Kullanıcıyı Premium yapar.
 */
export const upgradeToPremium = async (userId: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ is_premium: true })
    .eq('id', userId);

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