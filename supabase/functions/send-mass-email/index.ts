import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MassEmailRequest {
  subject: string;
  message: string;
  adminKey: string;
  sendTo: "rsvps" | "newsletter" | "all";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, message, adminKey, sendTo }: MassEmailRequest = await req.json();

    // Simple admin key verification (you should change this!)
    const expectedKey = Deno.env.get("ADMIN_ACCESS_KEY") || "aisocialklub2026";
    if (adminKey !== expectedKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let emails: string[] = [];

    if (sendTo === "rsvps" || sendTo === "all") {
      const { data: rsvps } = await supabase.from("rsvps").select("email");
      if (rsvps) {
        emails = [...emails, ...rsvps.map(r => r.email)];
      }
    }

    if (sendTo === "newsletter" || sendTo === "all") {
      const { data: subscribers } = await supabase.from("newsletter_subscribers").select("email");
      if (subscribers) {
        emails = [...emails, ...subscribers.map(s => s.email)];
      }
    }

    // Remove duplicates
    emails = [...new Set(emails)];

    console.log(`Sending mass email to ${emails.length} recipients`);

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No recipients found" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send emails in batches (Resend has rate limits)
    const batchSize = 50;
    let sentCount = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      const emailResponse = await resend.emails.send({
        from: "AI Social Klub <onboarding@resend.dev>",
        bcc: batch, // Use BCC for privacy
        to: ["noreply@aisocialklub.com"], // Placeholder to address
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f5f5; padding: 40px; }
              .container { max-width: 600px; margin: 0 auto; }
              h1 { color: #dc2626; font-size: 28px; margin-bottom: 20px; }
              p { line-height: 1.8; color: #a3a3a3; }
              .content { white-space: pre-wrap; }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #262626; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${subject}</h1>
              <div class="content">${message.replace(/\n/g, '<br>')}</div>
              <div class="footer">
                <p>The AI Social Klub • Baltimore, MD</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      console.log(`Batch ${i / batchSize + 1} sent:`, emailResponse);
      sentCount += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, sent: sentCount }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error sending mass email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
