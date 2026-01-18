import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RSVPEmailRequest {
  name: string;
  email: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone }: RSVPEmailRequest = await req.json();

    console.log(`Sending RSVP confirmation to ${email}`);

    // Send confirmation email to guest
    const guestEmailResponse = await resend.emails.send({
      from: "AI Social Klub <onboarding@resend.dev>",
      to: [email],
      subject: "RSVP Confirmed - AI Social Klub",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f5f5; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; }
            h1 { color: #dc2626; font-size: 28px; margin-bottom: 20px; }
            p { line-height: 1.8; color: #a3a3a3; }
            .highlight { color: #f5f5f5; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #262626; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome, ${name}!</h1>
            <p>Your RSVP for <span class="highlight">The AI Social Klub</span> has been confirmed.</p>
            <p>We're excited to have you join us for an unforgettable experience of brotherhood, games, drinks, and fellowship.</p>
            <p><strong class="highlight">Event Details:</strong><br>
            AI Game Night<br>
            January 18, 2026 @ 3PM<br>
            1041 West Baltimore St., Baltimore, MD</p>
            <p>See you there!</p>
            <div class="footer">
              <p>The AI Social Klub • Baltimore, MD</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Guest email sent:", guestEmailResponse);

    // Send notification to admin (you can change this email)
    const adminEmailResponse = await resend.emails.send({
      from: "AI Social Klub <onboarding@resend.dev>",
      to: ["admin@yourdomain.com"], // Change this to your email
      subject: `New RSVP: ${name}`,
      html: `
        <h2>New RSVP Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending RSVP email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
