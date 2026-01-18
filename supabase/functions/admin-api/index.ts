import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminRequest {
  adminKey: string;
  action: "getRsvps" | "getSubscribers" | "exportCsv";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { adminKey, action }: AdminRequest = await req.json();

    // Simple admin key verification
    const expectedKey = Deno.env.get("ADMIN_ACCESS_KEY") || "aisocialklub2026";
    if (adminKey !== expectedKey) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (action === "getRsvps") {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ rsvps: data }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "getSubscribers") {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ subscribers: data }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "exportCsv") {
      const { data: rsvps } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: subscribers } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      // Create CSV content
      let rsvpCsv = "Name,Email,Phone,Date\n";
      if (rsvps) {
        rsvps.forEach(r => {
          rsvpCsv += `"${r.name}","${r.email}","${r.phone}","${r.created_at}"\n`;
        });
      }

      let subscriberCsv = "Email,Date\n";
      if (subscribers) {
        subscribers.forEach(s => {
          subscriberCsv += `"${s.email}","${s.created_at}"\n`;
        });
      }

      return new Response(
        JSON.stringify({ rsvpCsv, subscriberCsv }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Admin API error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
