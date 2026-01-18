import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Users, Send, Eye, EyeOff, Calendar, Image, Wine, Plus, Trash2, Edit2, X } from "lucide-react";
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

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  is_active: boolean;
}

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

interface Drink {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: boolean;
  display_order: number;
}

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  
  const [activeTab, setActiveTab] = useState<"rsvps" | "subscribers" | "events" | "gallery" | "drinks" | "email">("rsvps");
  
  // Mass email state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [sendTo, setSendTo] = useState<"rsvps" | "newsletter" | "all">("all");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDrinkModal, setShowDrinkModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);

  // Form states
  const [eventForm, setEventForm] = useState({ title: "", description: "", event_date: "", location: "", image_url: "" });
  const [drinkForm, setDrinkForm] = useState({ name: "", description: "", price: "", category: "cocktails" });
  const [uploading, setUploading] = useState(false);

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
      
      // Fetch all data
      await Promise.all([
        fetchSubscribers(),
        fetchEvents(),
        fetchGallery(),
        fetchDrinks()
      ]);
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    const { data } = await supabase.functions.invoke("admin-api", { body: { adminKey, action: "getSubscribers" } });
    setSubscribers(data?.subscribers || []);
  };

  const fetchEvents = async () => {
    const { data } = await supabase.functions.invoke("admin-api", { body: { adminKey, action: "getEvents" } });
    setEvents(data?.events || []);
  };

  const fetchGallery = async () => {
    const { data } = await supabase.functions.invoke("admin-api", { body: { adminKey, action: "getGallery" } });
    setGalleryImages(data?.images || []);
  };

  const fetchDrinks = async () => {
    const { data } = await supabase.functions.invoke("admin-api", { body: { adminKey, action: "getDrinks" } });
    setDrinks(data?.drinks || []);
  };

  const exportCsv = async (type: "rsvps" | "subscribers") => {
    try {
      const { data } = await supabase.functions.invoke("admin-api", { body: { adminKey, action: "exportCsv" } });
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
        body: { adminKey, subject: emailSubject, message: emailMessage, sendTo }
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

  // Event handlers
  const handleSaveEvent = async () => {
    try {
      if (editingEvent) {
        await supabase.functions.invoke("admin-api", {
          body: { adminKey, action: "updateEvent", data: { id: editingEvent.id, ...eventForm, is_active: true } }
        });
      } else {
        await supabase.functions.invoke("admin-api", {
          body: { adminKey, action: "createEvent", data: { ...eventForm, is_active: true } }
        });
      }
      await fetchEvents();
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm({ title: "", description: "", event_date: "", location: "", image_url: "" });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await supabase.functions.invoke("admin-api", { body: { adminKey, action: "deleteEvent", data: { id } } });
    await fetchEvents();
  };

  // Gallery handlers
  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      // Get signed upload URL
      const { data: urlData } = await supabase.functions.invoke("admin-api", {
        body: { adminKey, action: "getUploadUrl", data: { fileName: file.name } }
      });

      // Upload file
      await fetch(urlData.signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      });

      // Save to gallery
      await supabase.functions.invoke("admin-api", {
        body: { adminKey, action: "createGalleryImage", data: { image_url: urlData.publicUrl, title: file.name } }
      });

      await fetchGallery();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.functions.invoke("admin-api", { body: { adminKey, action: "deleteGalleryImage", data: { id } } });
    await fetchGallery();
  };

  // Drink handlers
  const handleSaveDrink = async () => {
    try {
      const drinkData = { ...drinkForm, price: parseFloat(drinkForm.price) || 0, is_available: true };
      if (editingDrink) {
        await supabase.functions.invoke("admin-api", {
          body: { adminKey, action: "updateDrink", data: { id: editingDrink.id, ...drinkData } }
        });
      } else {
        await supabase.functions.invoke("admin-api", {
          body: { adminKey, action: "createDrink", data: drinkData }
        });
      }
      await fetchDrinks();
      setShowDrinkModal(false);
      setEditingDrink(null);
      setDrinkForm({ name: "", description: "", price: "", category: "cocktails" });
    } catch (error) {
      console.error("Error saving drink:", error);
    }
  };

  const handleDeleteDrink = async (id: string) => {
    if (!confirm("Delete this drink?")) return;
    await supabase.functions.invoke("admin-api", { body: { adminKey, action: "deleteDrink", data: { id } } });
    await fetchDrinks();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div className="max-w-md w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-3xl text-foreground mb-8 text-center lowercase">admin access</h1>
          <div className="relative mb-6">
            <input
              type={showKey ? "text" : "password"}
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full bg-transparent border border-foreground/30 px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button onClick={authenticate} disabled={loading} className="btn-primary w-full">
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-4xl text-foreground mb-8 lowercase">admin dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { icon: Users, count: rsvps.length, label: "RSVPs" },
              { icon: Mail, count: subscribers.length, label: "Subscribers" },
              { icon: Calendar, count: events.length, label: "Events" },
              { icon: Image, count: galleryImages.length, label: "Gallery" },
              { icon: Wine, count: drinks.length, label: "Drinks" }
            ].map(({ icon: Icon, count, label }) => (
              <div key={label} className="bg-secondary p-4 border border-border">
                <div className="flex items-center gap-3">
                  <Icon className="text-primary" size={24} />
                  <div>
                    <p className="text-2xl font-serif text-foreground">{count}</p>
                    <p className="text-muted-foreground text-xs">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["rsvps", "subscribers", "events", "gallery", "drinks", "email"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors ${
                  activeTab === tab ? "bg-primary text-white" : "border border-foreground/30 hover:bg-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* RSVPs Tab */}
          {activeTab === "rsvps" && (
            <div className="bg-secondary border border-border overflow-x-auto">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-serif text-xl lowercase">rsvp list</h2>
                <button onClick={() => exportCsv("rsvps")} className="btn-outline inline-flex items-center gap-2 text-sm">
                  <Download size={16} /> Export CSV
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Email</th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Phone</th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.length > 0 ? rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="p-4 text-foreground">{rsvp.name}</td>
                      <td className="p-4 text-muted-foreground">{rsvp.email}</td>
                      <td className="p-4 text-muted-foreground">{rsvp.phone}</td>
                      <td className="p-4 text-muted-foreground text-sm">{new Date(rsvp.created_at).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No RSVPs yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === "subscribers" && (
            <div className="bg-secondary border border-border overflow-x-auto">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-serif text-xl lowercase">subscriber list</h2>
                <button onClick={() => exportCsv("subscribers")} className="btn-outline inline-flex items-center gap-2 text-sm">
                  <Download size={16} /> Export CSV
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Email</th>
                    <th className="text-left p-4 text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? subscribers.map((sub) => (
                    <tr key={sub.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="p-4 text-foreground">{sub.email}</td>
                      <td className="p-4 text-muted-foreground text-sm">{new Date(sub.created_at).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={2} className="p-8 text-center text-muted-foreground">No subscribers yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="bg-secondary border border-border">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-serif text-xl lowercase">events</h2>
                <button onClick={() => { setEditingEvent(null); setEventForm({ title: "", description: "", event_date: "", location: "", image_url: "" }); setShowEventModal(true); }} className="btn-primary inline-flex items-center gap-2 text-sm">
                  <Plus size={16} /> Add Event
                </button>
              </div>
              <div className="grid gap-4 p-4">
                {events.length > 0 ? events.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-background border border-border">
                    {event.image_url && <img src={event.image_url} alt={event.title} className="w-24 h-24 object-cover" />}
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                      <p className="text-primary text-sm mt-1">{new Date(event.event_date).toLocaleDateString()} • {event.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingEvent(event); setEventForm({ title: event.title, description: event.description || "", event_date: event.event_date.split("T")[0], location: event.location || "", image_url: event.image_url || "" }); setShowEventModal(true); }} className="p-2 hover:bg-secondary"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteEvent(event.id)} className="p-2 hover:bg-secondary text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-muted-foreground py-8">No events yet</p>
                )}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="bg-secondary border border-border">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-serif text-xl lowercase">gallery</h2>
                <label className="btn-primary inline-flex items-center gap-2 text-sm cursor-pointer">
                  <Plus size={16} /> {uploading ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploading} />
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {galleryImages.length > 0 ? galleryImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img src={img.image_url} alt={img.title || "Gallery image"} className="w-full aspect-square object-cover" />
                    <button onClick={() => handleDeleteGalleryImage(img.id)} className="absolute top-2 right-2 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )) : (
                  <p className="col-span-full text-center text-muted-foreground py-8">No images yet</p>
                )}
              </div>
            </div>
          )}

          {/* Drinks Tab */}
          {activeTab === "drinks" && (
            <div className="bg-secondary border border-border">
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-serif text-xl lowercase">drink menu</h2>
                <button onClick={() => { setEditingDrink(null); setDrinkForm({ name: "", description: "", price: "", category: "cocktails" }); setShowDrinkModal(true); }} className="btn-primary inline-flex items-center gap-2 text-sm">
                  <Plus size={16} /> Add Drink
                </button>
              </div>
              <div className="grid gap-2 p-4">
                {drinks.length > 0 ? drinks.map((drink) => (
                  <div key={drink.id} className="flex items-center justify-between p-4 bg-background border border-border">
                    <div>
                      <h3 className="font-serif text-foreground">{drink.name}</h3>
                      <p className="text-muted-foreground text-sm">{drink.description}</p>
                      <p className="text-primary text-sm">${drink.price?.toFixed(2)} • {drink.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingDrink(drink); setDrinkForm({ name: drink.name, description: drink.description || "", price: drink.price?.toString() || "", category: drink.category }); setShowDrinkModal(true); }} className="p-2 hover:bg-secondary"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteDrink(drink.id)} className="p-2 hover:bg-secondary text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-muted-foreground py-8">No drinks yet</p>
                )}
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === "email" && (
            <div className="bg-secondary border border-border p-6">
              <h2 className="font-serif text-xl lowercase mb-6">send mass email</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Send To</label>
                  <select value={sendTo} onChange={(e) => setSendTo(e.target.value as any)} className="w-full bg-background border border-foreground/30 px-4 py-3 text-foreground focus:outline-none focus:border-primary">
                    <option value="all">All Contacts ({rsvps.length + subscribers.length})</option>
                    <option value="rsvps">RSVPs Only ({rsvps.length})</option>
                    <option value="newsletter">Newsletter Subscribers Only ({subscribers.length})</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Subject</label>
                  <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject..." className="w-full bg-background border border-foreground/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</label>
                  <textarea value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} placeholder="Write your message..." rows={6} className="w-full bg-background border border-foreground/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
                </div>
                {sendResult && <p className={`text-sm ${sendResult.includes("Error") ? "text-red-500" : "text-green-500"}`}>{sendResult}</p>}
                <button onClick={sendMassEmail} disabled={sending} className="btn-primary inline-flex items-center gap-2">
                  <Send size={16} /> {sending ? "Sending..." : "Send Email"}
                </button>
                <p className="text-xs text-muted-foreground mt-4">Note: To send emails to external recipients, verify your domain at resend.com/domains</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">{editingEvent ? "Edit Event" : "Add Event"}</h3>
              <button onClick={() => setShowEventModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows={3} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground resize-none" />
              <input type="date" value={eventForm.event_date} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <input type="text" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <input type="text" placeholder="Image URL (optional)" value={eventForm.image_url} onChange={(e) => setEventForm({ ...eventForm, image_url: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <button onClick={handleSaveEvent} className="btn-primary w-full">Save Event</button>
            </div>
          </div>
        </div>
      )}

      {/* Drink Modal */}
      {showDrinkModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">{editingDrink ? "Edit Drink" : "Add Drink"}</h3>
              <button onClick={() => setShowDrinkModal(false)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Drink Name" value={drinkForm.name} onChange={(e) => setDrinkForm({ ...drinkForm, name: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <textarea placeholder="Description" value={drinkForm.description} onChange={(e) => setDrinkForm({ ...drinkForm, description: e.target.value })} rows={2} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground resize-none" />
              <input type="number" step="0.01" placeholder="Price" value={drinkForm.price} onChange={(e) => setDrinkForm({ ...drinkForm, price: e.target.value })} className="w-full bg-transparent border border-foreground/30 px-4 py-3 text-foreground" />
              <select value={drinkForm.category} onChange={(e) => setDrinkForm({ ...drinkForm, category: e.target.value })} className="w-full bg-background border border-foreground/30 px-4 py-3 text-foreground">
                <option value="cocktails">Cocktails</option>
                <option value="wine">Wine</option>
                <option value="beer">Beer</option>
                <option value="spirits">Spirits</option>
                <option value="non-alcoholic">Non-Alcoholic</option>
              </select>
              <button onClick={handleSaveDrink} className="btn-primary w-full">Save Drink</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
