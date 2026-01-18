import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AdminRequest {
  adminKey: string;
  action: string;
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { adminKey, action, data }: AdminRequest = await req.json();

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

    // RSVPs
    if (action === "getRsvps") {
      const { data: rsvps, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(
        JSON.stringify({ rsvps }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Subscribers
    if (action === "getSubscribers") {
      const { data: subscribers, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(
        JSON.stringify({ subscribers }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Export CSV
    if (action === "exportCsv") {
      const { data: rsvps } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });
      const { data: subscribers } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });

      let rsvpCsv = "Name,Email,Phone,Date\n";
      rsvps?.forEach(r => { rsvpCsv += `"${r.name}","${r.email}","${r.phone}","${r.created_at}"\n`; });

      let subscriberCsv = "Email,Date\n";
      subscribers?.forEach(s => { subscriberCsv += `"${s.email}","${s.created_at}"\n`; });

      return new Response(
        JSON.stringify({ rsvpCsv, subscriberCsv }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // === EVENTS ===
    if (action === "getEvents") {
      const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      if (error) throw error;
      return new Response(
        JSON.stringify({ events }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "createEvent") {
      const { data: event, error } = await supabase
        .from("events")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return new Response(
        JSON.stringify({ event }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "updateEvent") {
      const { id, ...updateData } = data;
      const { data: event, error } = await supabase
        .from("events")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(
        JSON.stringify({ event }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "deleteEvent") {
      const { error } = await supabase.from("events").delete().eq("id", data.id);
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // === GALLERY ===
    if (action === "getGallery") {
      const { data: images, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return new Response(
        JSON.stringify({ images }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "createGalleryImage") {
      const { data: image, error } = await supabase
        .from("gallery_images")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return new Response(
        JSON.stringify({ image }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "deleteGalleryImage") {
      const { error } = await supabase.from("gallery_images").delete().eq("id", data.id);
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // === DRINK MENU ===
    if (action === "getDrinks") {
      const { data: drinks, error } = await supabase
        .from("drink_menu")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return new Response(
        JSON.stringify({ drinks }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "createDrink") {
      const { data: drink, error } = await supabase
        .from("drink_menu")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return new Response(
        JSON.stringify({ drink }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "updateDrink") {
      const { id, ...updateData } = data;
      const { data: drink, error } = await supabase
        .from("drink_menu")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(
        JSON.stringify({ drink }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "deleteDrink") {
      const { error } = await supabase.from("drink_menu").delete().eq("id", data.id);
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // === UPLOAD URL for gallery ===
    if (action === "getUploadUrl") {
      const fileName = `${Date.now()}-${data.fileName}`;
      const { data: signedData, error } = await supabase.storage
        .from("gallery")
        .createSignedUploadUrl(fileName);
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);
        
      return new Response(
        JSON.stringify({ signedUrl: signedData.signedUrl, path: signedData.path, publicUrl }),
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
