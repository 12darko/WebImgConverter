import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const LEMON_WEBHOOK_SECRET = Deno.env.get("LEMON_WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Helper to verify Lemon Squeezy signature
const verifySignature = async (secret: string, body: string, signature: string): Promise<boolean> => {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
    );

    // Convert hex signature to Uint8Array
    const signatureBytes = new Uint8Array(
        signature.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );

    return crypto.subtle.verify(
        "HMAC",
        key,
        signatureBytes,
        encoder.encode(body)
    );
};

serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const signature = req.headers.get("x-signature");
        if (!signature || !LEMON_WEBHOOK_SECRET) {
            return new Response("Missing signature or secret", { status: 400 });
        }

        const rawBody = await req.text();
        const isValid = await verifySignature(LEMON_WEBHOOK_SECRET, rawBody, signature);

        if (!isValid) {
            return new Response("Invalid signature", { status: 401 });
        }

        const payload = JSON.parse(rawBody);
        const eventName = payload.meta.event_name;
        const data = payload.data;

        console.log(`Received event: ${eventName}`);

        // Adjust based on your product logic. Usually 'order_created' or 'subscription_created'.
        if (eventName === "order_created" || eventName === "subscription_created") {
            const customData = payload.meta.custom_data;
            const userId = customData?.user_id;

            if (userId) {
                console.log(`Upgrading user ${userId} to Premium...`);

                const { error } = await supabase
                    .from("profiles")
                    .update({ is_premium: true })
                    .eq("id", userId);

                if (error) {
                    console.error("Supabase update error:", error);
                    return new Response("Database update failed", { status: 500 });
                }

                return new Response("User upgraded successfully", { status: 200 });
            } else {
                console.warn("No user_id found in custom_data");
                // Still return 200 to acknowledge receipt
                return new Response("No user_id provided", { status: 200 });
            }
        }

        return new Response("Event ignored", { status: 200 });

    } catch (err) {
        console.error("Webhook processing error:", err);
        return new Response(`Internal Server Error: ${err.message}`, { status: 500 });
    }
});
