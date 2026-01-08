import { supabase } from './supabase';

export interface ConversionRecord {
    id?: string;
    file_name: string;
    file_size: number;
    converted_size: number;
    format: string;
    created_at?: string;
}

/**
 * Logs a conversion to the history table if the user is on the Business tier.
 * @param tier The user's current premium tier.
 * @param record The conversion details to log.
 */
export const logConversion = async (tier: string | undefined, record: ConversionRecord) => {
    // STRICT GATING: Only Business tier allows history logging
    if (tier !== 'business') return;

    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('conversion_history')
            .insert([{
                user_id: user.id,
                file_name: record.file_name,
                file_size: record.file_size,
                converted_size: record.converted_size,
                format: record.format
            }]);

        if (error) {
            console.error('Failed to log conversion history:', error);
        }
    } catch (err) {
        console.error('Error in logConversion:', err);
    }
};

/**
 * Fetches the user's conversion history.
 * Ordered by most recent first.
 */
export const getHistory = async (): Promise<ConversionRecord[]> => {
    try {
        const { data, error } = await supabase
            .from('conversion_history')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error('Error fetching history:', err);
        return [];
    }
};

/**
 * Clears the user's entire history manually.
 */
export const clearHistory = async (): Promise<boolean> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { error } = await supabase
            .from('conversion_history')
            .delete()
            .eq('user_id', user.id);

        if (error) throw error;
        return true;
    } catch (err) {
        console.error('Error clearing history:', err);
        return false;
    }
};
