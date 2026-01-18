import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Users, Send, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"rsvps" | "subscribers">("rsvps");
  
  // Mass email state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendTo, setSendTo] = useState<"rsvps" | "newsletter" | "all">("all");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  const authenticate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-api", {
        body: { adminKey, action: "getRsvps" }
      });

      if (error || data.error) {
        alert("Invalid admin key");
        return;
      }

      setIsAuthenticated(true);
      setRsvps(data.rsvps || []);
      
      // Also fetch subscribers
      const subResult = await supabase.functions.invoke("admin-api", {
        body: { adminKey, action: "getSubscribers" }
      });
      setSubscribers(subResult.data?.subscribers || []);
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = async (type: "rsvps" | "subscribers") => {
    try {
      const { data } = await supabase.functions.invoke("admin-api", {
        body: { adminKey, action: "exportCsv" }
      });

      const csv = type === "rsvps" ? data.rsvpCsv : data.subscriberCsv;
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const sendMassEmail = async () => {
    if (!emailSubject || !emailMessage) {
      alert("Please enter subject and message");
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("send-mass-email", {
        body: { 
          adminKey, 
          subject: emailSubject, 
          message: emailMessage,
          sendTo 
        }
      });

      if (error || data.error) {
        setSendResult(`Error: ${error?.message || data.error}`);
      } else {
        setSendResult(`Successfully sent to ${data.sent} recipients!`);
        setEmailSubject("");
        setEmailMessage("");
      }
    } catch (error: any) {
      setSendResult(`Error: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div 
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl text-foreground mb-8 text-center lowercase">admin access</h1>
          
          <div className="relative mb-6">
            <input
              type={showKey ? "text" : "password"}
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full bg-transparent border border-foreground/30 px-4 py-3 pr-12
                         text-foreground placeholder:text-muted-foreground 
                         focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button
            onClick={authenticate}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl text-foreground mb-8 lowercase">admin dashboard</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-secondary p-6 border border-border">
              <div className="flex items-center gap-4">
                <Users className="text-primary" size={32} />
                <div>
                  <p className="text-3xl font-serif text-foreground">{rsvps.length}</p>
                  <p className="text-muted-foreground text-sm">Total RSVPs</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary p-6 border border-border">
              <div className="flex items-center gap-4">
                <Mail className="text-primary" size={32} />
                <div>
                  <p className="text-3xl font-serif text-foreground">{subscribers.length}</p>
                  <p className="text-muted-foreground text-sm">Newsletter Subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("rsvps")}
              className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors
                ${activeTab === "rsvps" ? "bg-primary text-white" : "border border-foreground/30 hover:bg-secondary"}`}
            >
              RSVPs
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-6 py-2 text-sm tracking-wider uppercase transition-colors
                ${activeTab === "subscribers" ? "bg-primary text-white" : "border border-foreground/30 hover:bg-secondary"}`}
            >
              Newsletter
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-secondary border border-border mb-12 overflow-x-auto">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="font-serif text-xl lowercase">
                {activeTab === "rsvps" ? "rsvp list" : "subscriber list"}
              </h2>
              <button
                onClick={() => exportCsv(activeTab)}
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {activeTab === "rsvps" ? (
                    <>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Email</th>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Phone</th>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Email</th>
                      <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === "rsvps" ? (
                  rsvps.length > 0 ? rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="p-4 text-foreground">{rsvp.name}</td>
                      <td className="p-4 text-muted-foreground">{rsvp.email}</td>
                      <td className="p-4 text-muted-foreground">{rsvp.phone}</td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No RSVPs yet</td></tr>
                  )
                ) : (
                  subscribers.length > 0 ? subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="p-4 text-foreground">{sub.email}</td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={2} className="p-8 text-center text-muted-foreground">No subscribers yet</td></tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Mass Email Section */}
          <div className="bg-secondary border border-border p-6">
            <h2 className="font-serif text-xl lowercase mb-6">send mass email</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Send To
                </label>
                <select
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value as any)}
                  className="w-full bg-background border border-foreground/30 px-4 py-3 
                             text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="all">All Contacts ({rsvps.length + subscribers.length})</option>
                  <option value="rsvps">RSVPs Only ({rsvps.length})</option>
                  <option value="newsletter">Newsletter Subscribers Only ({subscribers.length})</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject..."
                  className="w-full bg-background border border-foreground/30 px-4 py-3 
                             text-foreground placeholder:text-muted-foreground 
                             focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full bg-background border border-foreground/30 px-4 py-3 
                             text-foreground placeholder:text-muted-foreground 
                             focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {sendResult && (
                <p className={`text-sm ${sendResult.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {sendResult}
                </p>
              )}

              <button
                onClick={sendMassEmail}
                disabled={sending}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Send size={16} />
                {sending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
