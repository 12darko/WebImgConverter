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

    if (error) throw error;

    if (data) {
      // Günlük kredi kontrolü
      const today = new Date().toISOString().split('T')[0];
      if (data.last_reset_date !== today && !data.is_premium) {
        // Yeni gün, kredileri sıfırla (Client tarafında beklemeden DB'de güncelle)
        await resetDailyCredits(userId);
        return { ...data, credits: MAX_FREE_CREDITS, last_reset_date: today };
      }
      return data as UserStats;
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
export const resetDailyCredits = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  await supabase
    .from('profiles')
    .update({ credits: MAX_FREE_CREDITS, last_reset_date: today })
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