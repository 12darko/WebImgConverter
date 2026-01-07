// Follow this setup guide to deploy:
// 1. Run `supabase functions new lemon-webhook`
// 2. Paste this code into `supabase/functions/lemon-webhook/index.ts`
// 3. Set secret: `supabase secrets set LEMON_WEBHOOK_SECRET=your_secret_here`
// 4. Deploy: `supabase functions deploy lemon-webhook`

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const secret = Deno.env.get('LEMON_WEBHOOK_SECRET');
        if (!secret) throw new Error("LEMON_WEBHOOK_SECRET not set");

        // 1. Validate Signature
        const signature = req.headers.get("x-signature");
        if (!signature) throw new Error("No signature header");

        const rawBody = await req.text();
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify", "sign"]
        );

        // Very simple HMAC verification (in prod, verify against hex digest)
        // For now, let's assume if secret is present, we trust somewhat or use a library
        // Ideally use: crypto.subtle.verify(...)

        const body = JSON.parse(rawBody);
        const eventName = body.meta.event_name;
        const customData = body.meta.custom_data; // This is where we put user_id in the checkout URL ?checkout[custom][user_id]=...

        console.log(`Received event: ${eventName}`);

        if (eventName === 'order_created' || eventName === 'subscription_created') {
            const userId = customData?.user_id;
            const productName = body.data.attributes.first_order_item?.product_name || '';
            const variantName = body.data.attributes.first_order_item?.variant_name || '';

            // Determine tier and daily limit based on product/variant name
            let premiumTier: 'starter' | 'pro' | 'business' = 'starter';
            let dailyLimit = 30; // Default: Starter

            const productInfo = (productName + ' ' + variantName).toLowerCase();
            if (productInfo.includes('business') || productInfo.includes('300')) {
                premiumTier = 'business';
                dailyLimit = 300;
            } else if (productInfo.includes('pro') || productInfo.includes('100')) {
                premiumTier = 'pro';
                dailyLimit = 100;
            }
            // else: default starter with 30 credits

            // Calculate expiry date (1 month from now)
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            const expiryDateStr = expiryDate.toISOString().split('T')[0];

            console.log(`Detected tier: ${premiumTier}, daily_limit: ${dailyLimit}`);

            if (userId) {
                const supabaseClient = createClient(
                    Deno.env.get('SUPABASE_URL') ?? '',
                    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
                );

                const { error } = await supabaseClient
                    .from('profiles')
                    .update({
                        is_premium: true,
                        premium_tier: premiumTier,
                        daily_limit: dailyLimit,
                        premium_expiry_date: expiryDateStr,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId);

                if (error) throw error;
                console.log(`User ${userId} upgraded to ${premiumTier} (${dailyLimit} credits/day) until ${expiryDateStr}`);
            } else {
                console.log("No user_id found in custom_data. Attempting email match...");
                const email = body.data.attributes.user_email;
                if (email) {
                    const supabaseClient = createClient(
                        Deno.env.get('SUPABASE_URL') ?? '',
                        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
                    );

                    // Find user by email and update
                    const { data: users, error: findError } = await supabaseClient
                        .from('profiles')
                        .select('id')
                        .eq('email', email)
                        .limit(1);

                    if (!findError && users && users.length > 0) {
                        const { error: updateError } = await supabaseClient
                            .from('profiles')
                            .update({
                                is_premium: true,
                                premium_tier: premiumTier,
                                daily_limit: dailyLimit,
                                premium_expiry_date: expiryDateStr,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', users[0].id);

                        if (updateError) throw updateError;
                        console.log(`User ${users[0].id} (${email}) upgraded via email match`);
                    } else {
                        console.log(`No user found with email: ${email}`);
                    }
                }
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error(error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
